"""Build the 15 cm AR prototype from COLMAP's textured mesh of the supplied photos.

The glossy white plate did not produce enough photogrammetry points to form a
surface, so its 15 x 15 cm shape is modeled separately. The food geometry and
texture come from the multi-view reconstruction of the real photographs.
"""

from pathlib import Path
import math

import numpy as np
import trimesh


SOURCE = Path('design/research/reconstruction/dense/textured/mesh.ply')
OUT = Path('public/models/plato-real-15cm.glb')
PLATE_SIDE_METRES = 0.15
PLATE_SIDE_RECONSTRUCTION_UNITS = 8.0
TABLE_CENTRE_XY = np.array([0.26, -0.65])

mesh = trimesh.load(SOURCE, process=False)
xyz = np.asarray(mesh.vertices)

# Fit the tabletop from points outside the food, then remove that backdrop.
table = xyz[(xyz[:, 0] < -2.5) | (xyz[:, 1] > 3.0)]
table_slope_x, table_slope_y, table_offset = np.linalg.lstsq(
    np.column_stack([table[:, :2], np.ones(len(table))]), table[:, 2], rcond=None
)[0]
table_z = table_slope_x * xyz[:, 0] + table_slope_y * xyz[:, 1] + table_offset
food_faces = mesh.faces[np.all((xyz[:, 2] - table_z)[mesh.faces] < -0.08, axis=1)]
used_vertices, remapped = np.unique(food_faces.reshape(-1), return_inverse=True)

right = np.array([1.0, 0.0, table_slope_x])
right /= np.linalg.norm(right)
up = np.array([table_slope_x, table_slope_y, -1.0])
up /= np.linalg.norm(up)
forward = np.cross(right, up)
origin = np.array([
    TABLE_CENTRE_XY[0], TABLE_CENTRE_XY[1],
    table_slope_x * TABLE_CENTRE_XY[0] + table_slope_y * TABLE_CENTRE_XY[1] + table_offset,
])
metres_per_unit = PLATE_SIDE_METRES / PLATE_SIDE_RECONSTRUCTION_UNITS
food_vertices = (xyz[used_vertices] - origin) @ np.column_stack([right, up, forward])
food_vertices *= metres_per_unit

food_texture = trimesh.visual.TextureVisuals(
    uv=np.asarray(mesh.visual.uv)[used_vertices],
    material=mesh.visual.material,
)
food = trimesh.Trimesh(
    vertices=food_vertices,
    faces=remapped.reshape(-1, 3),
    visual=food_texture,
    process=False,
)


def rounded_square_ring(half_width: float, height: float, segments: int = 96):
    result = []
    for index in range(segments):
        angle = index * 2 * math.pi / segments
        cosine, sine = math.cos(angle), math.sin(angle)
        x = math.copysign(abs(cosine) ** 0.35, cosine) * half_width
        z = math.copysign(abs(sine) ** 0.35, sine) * half_width
        result.append([x, height, z])
    return result


profile = [
    (0.001, 0.000),
    (0.062, 0.000),
    (0.073, 0.001),
    (0.075, 0.004),
    (0.072, 0.007),
    (0.062, 0.006),
    (0.055, 0.004),
    (0.001, 0.004),
]
segments = 96
plate_vertices = np.asarray([
    vertex for width, height in profile
    for vertex in rounded_square_ring(width, height, segments)
])
plate_faces = []
for ring in range(len(profile) - 1):
    for index in range(segments):
        next_index = (index + 1) % segments
        a, b = ring * segments + index, ring * segments + next_index
        c, d = (ring + 1) * segments + index, (ring + 1) * segments + next_index
        plate_faces.extend([[a, c, b], [b, c, d]])
plate = trimesh.Trimesh(vertices=plate_vertices, faces=plate_faces, process=False)
plate.visual = trimesh.visual.TextureVisuals(material=trimesh.visual.material.PBRMaterial(
    name='Cerámica blanca · 15 × 15 cm',
    baseColorFactor=[0.94, 0.95, 0.94, 1.0],
    metallicFactor=0.0,
    roughnessFactor=0.34,
    doubleSided=True,
))

# The reflective meat underside has little usable stereo detail. A restrained
# dark support fills the gaps beneath the photographed upper surface.
support = trimesh.creation.icosphere(subdivisions=3, radius=1.0)
support.apply_scale([0.021, 0.007, 0.016])
support.apply_translation([0.0, 0.009, 0.0])
support.visual = trimesh.visual.TextureVisuals(material=trimesh.visual.material.PBRMaterial(
    name='Base oscura del alimento',
    baseColorFactor=[0.07, 0.035, 0.02, 1.0],
    metallicFactor=0.0,
    roughnessFactor=0.83,
    doubleSided=True,
))

scene = trimesh.Scene()
scene.add_geometry(plate, geom_name='Plato blanco de 15 cm')
scene.add_geometry(support, geom_name='Base de apoyo del alimento')
scene.add_geometry(food, geom_name='Comida reconstruida de fotografías reales')
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_bytes(scene.export(file_type='glb'))
print(f'{OUT}: {OUT.stat().st_size / 1024 / 1024:.2f} MiB')
print(f'Food: {len(food.faces)} textured faces, bounds {food.bounds.tolist()}')
print(f'Complete model bounds: {scene.bounds.tolist()}')
