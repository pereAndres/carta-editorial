import type { Dish } from '../data/menus';

const names: Record<string, string> = {
  gluten: 'Cereales con gluten',
  crustáceos: 'Crustáceos',
  huevo: 'Huevo',
  pescado: 'Pescado',
  cacahuetes: 'Cacahuetes',
  soja: 'Soja',
  lácteos: 'Leche',
  leche: 'Leche',
  'frutos secos': 'Frutos de cáscara',
  apio: 'Apio',
  mostaza: 'Mostaza',
  sésamo: 'Sésamo',
  sulfitos: 'Sulfitos',
  altramuces: 'Altramuces',
  moluscos: 'Moluscos',
};

export function exampleAllergens(dish: Dish): string[] {
  const labels = dish.tags
    ?.filter((tag) => tag.kind === 'allergen')
    .flatMap((tag) => tag.label.replace(/^Contiene\s+/i, '').split(/,\s*|\s+y\s+/i))
    .map((label) => names[label.toLowerCase().trim()] ?? label.trim()) ?? [];
  return [...new Set(labels)];
}
