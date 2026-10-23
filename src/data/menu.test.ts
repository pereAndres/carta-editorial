import { describe, expect, it } from 'vitest';
import { beverages, dishes, tastingMenu } from './menu';
describe('carta Materia Viva', () => {
  it('mantiene platos identificables y completos', () => {
    expect(new Set(dishes.map((dish) => dish.slug)).size).toBe(dishes.length);
    dishes.forEach((dish) => { expect(dish.price).toBeGreaterThan(0); expect(dish.ingredients.length).toBeGreaterThan(0); expect(dish.allergens.length).toBeGreaterThan(0); expect(dish.pairing).not.toHaveLength(0); });
  });
  it('ofrece las dos selecciones de bebida y siete pases', () => {
    expect(beverages.filter((drink) => drink.kind === 'vino')).toHaveLength(6);
    expect(beverages.filter((drink) => drink.kind === 'sin alcohol')).toHaveLength(4);
    expect(tastingMenu.dishes).toHaveLength(7);
  });
});
