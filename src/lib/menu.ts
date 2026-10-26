export const imageSlug = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

export const dishImage = (menuId: string, dishName: string) =>
  `/images/menus/${menuId}/${imageSlug(dishName)}.webp`;

export const sectionId = (menuId: string, index: number) => `${menuId}-section-${index}`;

export const noPhotoSections = new Set(['De la barra', 'Vinos y bebidas', 'Vinos de cerca', 'La tetera']);
