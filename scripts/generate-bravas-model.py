"""Generate an illustrative, true-size GLB of patatas bravas for AR testing.

Coordinates are metres, with Y up. The ceramic plate is 24 cm across.
"""

from pathlib import Path
import math
import random

import numpy as np
import trimesh
from PIL import Image


OUT = Path('public/models/patatas-bravas.glb')
OUT.parent.mkdir(parents=True, exist_ok=True)
rng = random.Random(24)
scene = trimesh.Scene()
photo = Image.open('public/images/menus/bar/patatas-bravas.webp').convert('RGB')


def material(name, rgb, roughness=0.8):
    return trimesh.visual.material.PBRMaterial(
        name=name,
        baseColorFactor=[*rgb, 1.0],
        metallicFactor=0.0,
        roughnessFactor=roughness,
        doubleSided=True,
    )


def add(mesh, name, rgb, roughness=0.8, uv=None):
    if uv is None:
        mesh.visual = trimesh.visual.TextureVisuals(material=material(name, rgb, roughness))
    else:
        textured = material(name, [1.0, 1.0, 1.0], roughness)
        textured.baseColorTexture = photo
        mesh.visual = trimesh.visual.TextureVisuals(uv=uv, material=textured)
    scene.add_geometry(mesh, node_name=name, geom_name=name)


def lathe(profile, segments=96):
    vertices = []
    for radius, height in profile:
        for segment in range(segments):
            angle = 2 * math.pi * segment / segments
            vertices.append([radius * math.cos(angle), height, radius * math.sin(angle)])
    faces = []
    for ring in range(len(profile) - 1):
        for segment in range(segments):
            next_segment = (segment + 1) % segments
            a = ring * segments + segment
            b = ring * segments + next_segment
            c = (ring + 1) * segments + segment
            d = (ring + 1) * segments + next_segment
            faces.extend([[a, c, b], [b, c, d]])
    return trimesh.Trimesh(vertices=vertices, faces=faces, process=True)


plate = lathe([
    (0.001, 0.000), (0.074, 0.000), (0.094, 0.004),
    (0.111, 0.020), (0.120, 0.028), (0.120, 0.035),
    (0.113, 0.038), (0.105, 0.028), (0.087, 0.013), (0.001, 0.011),
])
add(plate, 'Cazuela de barro - 24 cm', [0.39, 0.16, 0.085], 0.55)

# A subtly darker ring inside the serving area helps the shallow form read in AR.
inner_ring = lathe([(0.078, 0.012), (0.091, 0.016), (0.098, 0.022)])
add(inner_ring, 'Esmalte interior', [0.28, 0.10, 0.05], 0.42)

positions = []
for i in range(19):
    radius = math.sqrt(rng.random()) * 0.075
    angle = rng.uniform(0, 2 * math.pi)
    x, z = radius * math.cos(angle), radius * math.sin(angle)
    base_y = 0.031 + rng.uniform(0.0, 0.012)
    size = [rng.uniform(0.011, 0.017), rng.uniform(0.009, 0.015), rng.uniform(0.011, 0.017)]
    potato = trimesh.creation.icosphere(subdivisions=2, radius=1.0)
    vertices = np.asarray(potato.vertices).copy()
    # Rounded cuboids, irregular like fried potato chunks.
    vertices = np.sign(vertices) * np.abs(vertices) ** 0.47
    vertices *= np.array(size)
    potato.vertices = vertices
    patch_u = rng.uniform(0.31, 0.70)
    patch_v = rng.uniform(0.31, 0.64)
    uv = np.column_stack([
        patch_u + vertices[:, 0] / size[0] * 0.022,
        patch_v + vertices[:, 2] / size[2] * 0.022,
    ])
    potato.apply_transform(trimesh.transformations.rotation_matrix(rng.uniform(-0.6, 0.6), [0, 1, 0]))
    potato.apply_translation([x, base_y, z])
    add(potato, f'Patata dorada {i + 1}', [0.72, 0.41, 0.14], 0.8, uv=uv)
    positions.append((x, base_y, z, size))


def sauce_blob(x, y, z, sx, sz, rgb, name):
    blob = trimesh.creation.icosphere(subdivisions=2, radius=1.0)
    blob.apply_scale([sx, 0.0022, sz])
    blob.apply_translation([x, y, z])
    add(blob, name, rgb, 0.42)


for i, (x, y, z, size) in enumerate(positions):
    top = y + size[1] * 0.95
    if i % 3 != 1:
        sauce_blob(x + rng.uniform(-0.003, 0.003), top, z,
                   size[0] * rng.uniform(0.6, 0.95), size[2] * rng.uniform(0.5, 0.85),
                   [0.52, 0.085 + rng.uniform(0, 0.07), 0.025], f'Salsa brava {i + 1}')
    if i % 4 == 0:
        sauce_blob(x - 0.002, top + 0.003, z + 0.002,
                   size[0] * 0.53, size[2] * 0.41,
                   [0.93, 0.86, 0.72], f'Alioli {i + 1}')

# Small green parsley leaves identify another visible ingredient from above.
for i in range(17):
    radius = rng.uniform(0.015, 0.075)
    angle = rng.uniform(0, 2 * math.pi)
    leaf = trimesh.creation.icosphere(subdivisions=1, radius=1.0)
    leaf.apply_scale([rng.uniform(0.002, 0.004), 0.0007, rng.uniform(0.003, 0.005)])
    leaf.apply_transform(trimesh.transformations.rotation_matrix(angle, [0, 1, 0]))
    leaf.apply_translation([radius * math.cos(angle), 0.067, radius * math.sin(angle)])
    add(leaf, f'Perejil {i + 1}', [0.15, 0.28 + rng.uniform(0, 0.12), 0.07], 0.9)

OUT.write_bytes(scene.export(file_type='glb'))
print(f'{OUT}: {OUT.stat().st_size / 1024:.0f} KiB, bounds={scene.bounds.tolist()}')
