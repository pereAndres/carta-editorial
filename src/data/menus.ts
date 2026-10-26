export type MenuTag = {
  label: string;
  kind: 'vegetarian' | 'allergen' | 'spicy' | 'share' | 'seasonal';
};

export type Dish = {
  name: string;
  description: string;
  price?: string;
  halfPrice?: string;
  origin?: string;
  pieces?: string;
  tags?: MenuTag[];
};

export type MenuSection = {
  title: string;
  note?: string;
  items: Dish[];
};

export type RestaurantMenu = {
  id: string;
  tabLabel: string;
  shortLabel: string;
  eyebrow: string;
  name: string;
  subtitle: string;
  intro: string;
  style: string;
  sections: MenuSection[];
  wines?: {
    name: string;
    origin: string;
    grapes: string;
    note: string;
    moment: string;
    glass: string;
    bottle: string;
  }[];
  special?: {
    label: string;
    title: string;
    description: string;
    price: string;
    details: string[];
  };
};

const vegetarian: MenuTag = { label: 'Vegetariano', kind: 'vegetarian' };
const share: MenuTag = { label: 'Al centro', kind: 'share' };
const seasonal: MenuTag = { label: 'De temporada', kind: 'seasonal' };

export const menus: RestaurantMenu[] = [
  {
    id: 'bar',
    tabLabel: 'Bar',
    shortLabel: '01 · El bar',
    eyebrow: 'Bar de tapas · Desde 1987',
    name: 'La Buena Sombra',
    subtitle: 'Una barra, muchas historias.',
    intro: 'Tapas de las de siempre, hechas sin prisa y pensadas para pedir otra ronda.',
    style: 'taberna',
    sections: [
      {
        title: 'Para abrir boca',
        note: 'El primer brindis siempre viene con algo.',
        items: [
          { name: 'Gilda de la casa', description: 'Anchoa del Cantábrico, piparra y aceituna gordal.', price: '3,50 €', tags: [{ label: 'Contiene pescado', kind: 'allergen' }] },
          { name: 'Aceitunas aliñadas', description: 'Naranja, tomillo y un punto de guindilla.', price: '4 €', tags: [vegetarian] },
          { name: 'Pan con tomate', description: 'Pan de coca tostado, tomate de colgar y aceite nuevo.', price: '5,50 €', tags: [vegetarian] },
        ],
      },
      {
        title: 'Tapas frías',
        items: [
          { name: 'Ensaladilla rusa', description: 'Patata, zanahoria, bonito y mayonesa de la casa.', price: '9 €', halfPrice: '5,50 €', tags: [{ label: 'Contiene pescado y huevo', kind: 'allergen' }] },
          { name: 'Boquerones en vinagre', description: 'Con patatas chips y perejil fresco.', price: '10 €', tags: [{ label: 'Contiene pescado', kind: 'allergen' }] },
          { name: 'Tomate aliñado', description: 'Cebolla tierna, aceitunas y aceite de arbequina.', price: '8 €', tags: [vegetarian] },
        ],
      },
      {
        title: 'Tapas calientes',
        note: 'Recién hechas. Mejor compartirlas.',
        items: [
          { name: 'Patatas bravas', description: 'Doble salsa: brava casera y alioli suave.', price: '8,50 €', halfPrice: '5 €', tags: [vegetarian, { label: 'Contiene huevo', kind: 'allergen' }] },
          { name: 'Croquetas de jamón', description: 'Bechamel cremosa, crujiente por fuera. 4 unidades.', price: '11 €', halfPrice: '6 €', tags: [{ label: 'Contiene gluten y lácteos', kind: 'allergen' }] },
          { name: 'Tortilla poco hecha', description: 'Con cebolla confitada y pan tostado.', price: '10 €', tags: [{ label: 'Contiene huevo y gluten', kind: 'allergen' }] },
        ],
      },
      {
        title: 'Raciones y bocadillos',
        items: [
          { name: 'Calamares a la romana', description: 'Limón y mayonesa de lima.', price: '15 €', tags: [share, { label: 'Contiene moluscos, huevo y gluten', kind: 'allergen' }] },
          { name: 'Bocadillo de calamares', description: 'Pan crujiente, calamares y mayonesa de lima.', price: '12 €', tags: [{ label: 'Contiene moluscos, huevo y gluten', kind: 'allergen' }] },
          { name: 'Bocadillo de tortilla', description: 'Tortilla de patata, pimiento verde y pan de barra.', price: '9,50 €', tags: [{ label: 'Contiene huevo y gluten', kind: 'allergen' }] },
        ],
      },
      {
        title: 'Algo dulce',
        items: [
          { name: 'Flan de huevo', description: 'Con nata montada a mano.', price: '6 €', tags: [{ label: 'Contiene huevo y lácteos', kind: 'allergen' }] },
          { name: 'Tarta de queso', description: 'Horneada, cremosa y con base de galleta.', price: '7 €', tags: [{ label: 'Contiene gluten y lácteos', kind: 'allergen' }] },
        ],
      },
      {
        title: 'De la barra',
        note: 'Por copa o para brindar en la mesa.',
        items: [
          { name: 'Vermut de grifo', description: 'Rojo, con sifón y una aceituna.', price: '4,50 €' },
          { name: 'Caña bien tirada', description: 'Rubia y fresca, 25 cl.', price: '3,20 €' },
          { name: 'Vino de la casa', description: 'Tinto o blanco, servido por copa.', price: '4,50 €' },
        ],
      },
    ],
  },
  {
    id: 'mediterraneo',
    tabLabel: 'Mediterráneo',
    shortLabel: '02 · La mesa',
    eyebrow: 'Cocina mediterránea · Mercado y temporada',
    name: 'Casa Salina',
    subtitle: 'El Mediterráneo, servido en la mesa.',
    intro: 'Cocina de mercado para compartir, con el arroz al centro y el producto en su mejor momento.',
    style: 'mediterraneo',
    special: {
      label: 'De lunes a viernes · Mediodía',
      title: 'Menú del día',
      description: 'Un paseo por el mercado: primero, segundo, postre o café y pan.',
      price: '24 €',
      details: ['Dos primeros y dos segundos a elegir', 'Agua incluida', 'Arroces disponibles de lunes a viernes'],
    },
    sections: [
      {
        title: 'Para poner en medio',
        items: [
          { name: 'Pan de coca y tomate', description: 'Aceite de oliva virgen extra y sal de escamas.', price: '6 €', tags: [vegetarian] },
          { name: 'Burrata y melocotón', description: 'Albahaca, almendra tostada y vinagreta de miel.', price: '16 €', tags: [vegetarian, { label: 'Contiene lácteos y frutos secos', kind: 'allergen' }] },
          { name: 'Croquetas de gamba roja', description: 'Bechamel de marisco y ralladura de limón. 4 unidades.', price: '14 €', tags: [{ label: 'Contiene crustáceos, gluten y lácteos', kind: 'allergen' }] },
        ],
      },
      {
        title: 'Huerta de temporada',
        items: [
          { name: 'Tomates de variedades', description: 'Albahaca, cebolla dulce y aceite de la finca.', price: '15 €', tags: [vegetarian, seasonal] },
          { name: 'Berenjena a la brasa', description: 'Yogur de oveja, miel y hierbas frescas.', price: '14 €', tags: [vegetarian, { label: 'Contiene lácteos', kind: 'allergen' }] },
        ],
      },
      {
        title: 'Arroces',
        note: 'Mínimo para dos personas · Precio por persona.',
        items: [
          { name: 'Arroz seco de marisco', description: 'Gamba, sepia y caldo hecho cada mañana.', price: '24 €', tags: [share, { label: 'Contiene crustáceos y moluscos', kind: 'allergen' }] },
          { name: 'Arroz meloso de setas', description: 'Setas de temporada, tomillo y queso curado.', price: '21 €', tags: [share, vegetarian, seasonal, { label: 'Contiene lácteos', kind: 'allergen' }] },
        ],
      },
      {
        title: 'Del mar',
        items: [
          { name: 'Lubina a la donostiarra', description: 'Patata panadera, ajo y vinagre de Jerez.', price: '26 €', tags: [{ label: 'Contiene pescado', kind: 'allergen' }] },
          { name: 'Calamar a la plancha', description: 'Ensalada de hinojo, limón y aceite de perejil.', price: '22 €', tags: [{ label: 'Contiene moluscos', kind: 'allergen' }] },
        ],
      },
      {
        title: 'De la tierra',
        items: [
          { name: 'Pollo de corral al limón', description: 'Patatas asadas y jugo de tomillo.', price: '22 €' },
          { name: 'Secreto ibérico', description: 'Pimientos asados y salsa de romero.', price: '25 €' },
        ],
      },
      {
        title: 'Postres de casa',
        items: [
          { name: 'Crema catalana', description: 'Con azúcar quemado al momento.', price: '7 €', tags: [{ label: 'Contiene huevo y lácteos', kind: 'allergen' }] },
          { name: 'Fruta de temporada', description: 'Con sorbete de limón y hierbabuena.', price: '7 €', tags: [vegetarian, seasonal] },
        ],
      },
      {
        title: 'Vinos y bebidas',
        items: [
          { name: 'Blanco de la casa', description: 'Fresco, con notas cítricas. Por copa.', price: '5 €' },
          { name: 'Tinto de la casa', description: 'Fruta madura y final especiado. Por copa.', price: '5 €' },
          { name: 'Agua con gas', description: '50 cl.', price: '3,50 €' },
        ],
      },
    ],
  },
  {
    id: 'producto',
    tabLabel: 'Producto local',
    shortLabel: '03 · El origen',
    eyebrow: 'Cocina de producto · Costa y montaña',
    name: 'L’Alzina',
    subtitle: 'El paisaje cambia. La carta también.',
    intro: 'Una cocina contemporánea construida alrededor de pequeños productores y una despensa cercana.',
    style: 'producto',
    sections: [
      {
        title: 'Primer gesto',
        note: 'Pequeños bocados de bienvenida.',
        items: [
          { name: 'Pan de masa madre', description: 'Harina de trigo antiguo del Empordà y mantequilla ahumada.', price: '6 €', origin: 'Empordà', tags: [{ label: 'Producto local', kind: 'seasonal' }, { label: 'Contiene gluten y lácteos', kind: 'allergen' }] },
          { name: 'Bocado de temporada', description: 'Una pieza vegetal que cambia con la cosecha.', price: '8 €', tags: [vegetarian, seasonal] },
        ],
      },
      {
        title: 'Huerta cercana',
        items: [
          { name: 'Guisantes lágrima', description: 'Caldo de hierbas, menta y almendra tierna.', price: '19 €', origin: 'Maresme', tags: [vegetarian, seasonal, { label: 'Contiene frutos secos', kind: 'allergen' }] },
          { name: 'Calabacín a la brasa', description: 'Requesón de oveja, piñones y hoja de higuera.', price: '17 €', origin: 'Baix Empordà', tags: [vegetarian, seasonal, { label: 'Contiene lácteos y frutos secos', kind: 'allergen' }] },
        ],
      },
      {
        title: 'Costa',
        items: [
          { name: 'Gamba roja de Palamós', description: 'A la brasa, jugo de sus cabezas y limón.', price: '32 €', origin: 'Palamós', tags: [{ label: 'Origen · Palamós', kind: 'seasonal' }, { label: 'Contiene crustáceos', kind: 'allergen' }] },
          { name: 'Pescado del día', description: 'Pesca de lonja, hinojo y fondo ligero de roca.', price: '29 €', origin: 'Costa Brava', tags: [{ label: 'Origen · Costa Brava', kind: 'seasonal' }, { label: 'Contiene pescado', kind: 'allergen' }] },
        ],
      },
      {
        title: 'Interior',
        items: [
          { name: 'Cordero de pasto', description: 'Cocción lenta, berenjena y jugo de tomillo.', price: '31 €', origin: 'Girona', tags: [{ label: 'Origen · Girona', kind: 'seasonal' }] },
          { name: 'Pato de l’Empordà', description: 'Manzana asada, apio nabo y salsa de su asado.', price: '28 €', origin: 'Empordà', tags: [{ label: 'Origen · Empordà', kind: 'seasonal' }] },
        ],
      },
      {
        title: 'Quesos artesanos',
        items: [
          { name: 'Selección de tres quesos', description: 'De oveja, cabra y vaca; membrillo de la casa.', price: '16 €', tags: [{ label: 'Contiene lácteos', kind: 'allergen' }] },
        ],
      },
      {
        title: 'Final dulce',
        items: [
          { name: 'Manzana, leche y miel', description: 'Manzana asada, helado de leche de oveja y miel local.', price: '12 €', tags: [seasonal, { label: 'Contiene lácteos', kind: 'allergen' }] },
          { name: 'Chocolate y aceite', description: 'Chocolate negro, aceite de oliva nuevo y sal.', price: '12 €', tags: [vegetarian] },
        ],
      },
      {
        title: 'Vinos de cerca',
        items: [
          { name: 'Blanco de mínima intervención', description: 'Empordà · Macabeo y garnacha blanca. Por copa.', price: '8 €' },
          { name: 'Tinto de finca', description: 'Garnacha de viñas viejas. Por copa.', price: '9 €' },
        ],
      },
    ],
  },
  {
    id: 'michelin',
    tabLabel: 'Degustación',
    shortLabel: '04 · El recorrido',
    eyebrow: 'Cocina de autor · Menú degustación',
    name: 'Umbral',
    subtitle: 'Ocho momentos. Un paisaje.',
    intro: 'Un recorrido por el litoral y la huerta, contado en pequeños pases y servido a su ritmo.',
    style: 'michelin',
    special: {
      label: 'Menú de temporada · 8 pases',
      title: 'El paisaje cercano',
      description: 'Una secuencia completa de aperitivos, platos principales y final dulce. El menú se sirve a mesa completa.',
      price: '145 € / persona',
      details: ['Maridaje de vinos · 85 €', 'Maridaje sin alcohol · 48 €', 'Indícanos cualquier restricción alimentaria al reservar'],
    },
    wines: [
      { name: 'Burbuja de bienvenida', origin: 'Penedès', grapes: 'Xarel·lo · Macabeo', note: 'Fresco y delicado, para abrir el recorrido.', moment: 'La huerta', glass: '14 €', bottle: '68 €' },
      { name: 'Blanco atlántico', origin: 'Rías Baixas', grapes: 'Albariño', note: 'Cítrico y salino, junto a los pases de mar.', moment: 'El mar', glass: '13 €', bottle: '62 €' },
      { name: 'Tinto de montaña', origin: 'Priorat', grapes: 'Garnacha', note: 'Fruta madura y profundidad para la brasa.', moment: 'Brasa y tierra', glass: '16 €', bottle: '78 €' },
      { name: 'Final de Jerez', origin: 'Jerez', grapes: 'Pedro Ximénez', note: 'Una copa pequeña para acompañar el chocolate.', moment: 'El final', glass: '12 €', bottle: '58 €' },
    ],
    sections: [
      {
        title: 'El recorrido',
        note: 'Pases servidos en secuencia · La composición evoluciona con la temporada.',
        items: [
          { name: '01 · Bienvenida del huerto', description: 'Tres bocados vegetales para abrir el recorrido.', tags: [vegetarian, seasonal] },
          { name: '02 · Tomate y memoria', description: 'Tomate fermentado, agua de tomate y hierbas frescas.', tags: [vegetarian, seasonal] },
          { name: '03 · Costa en crudo', description: 'Pescado azul, cítrico y aceite verde.', tags: [{ label: 'Contiene pescado', kind: 'allergen' }] },
          { name: '04 · Un arroz de mar', description: 'Arroz cremoso, fondo de crustáceos y azafrán.', tags: [{ label: 'Contiene crustáceos', kind: 'allergen' }] },
          { name: '05 · El pescado y la brasa', description: 'Pesca del día, caldo tostado y hoja de temporada.', tags: [seasonal, { label: 'Contiene pescado', kind: 'allergen' }] },
          { name: '06 · Tierra lenta', description: 'Carne de pasto, raíz asada y jugo de cocción.', tags: [] },
          { name: '07 · Antes del final', description: 'Granizado de manzana verde, apio y flores.', tags: [vegetarian] },
          { name: '08 · Dulce paisaje', description: 'Chocolate, aceite de oliva y sal de hierbas.', tags: [vegetarian] },
        ],
      },
    ],
  },
  {
    id: 'canton',
    tabLabel: 'Cantonés',
    shortLabel: '05 · La casa de té',
    eyebrow: 'Cocina cantonesa · Dim sum y platos al centro',
    name: 'Casa Wong',
    subtitle: 'Pequeños bocados. Una mesa compartida.',
    intro: 'Dim sum hecho a mano, platos al centro y una tetera que no deja de pasar.',
    style: 'canton',
    sections: [
      {
        title: 'Dim sum · 蒸点心',
        note: 'Cestas al vapor · 3 unidades por pedido.',
        items: [
          { name: 'Har gow', description: 'Empanadillas translúcidas de langostino y bambú.', price: '9 €', pieces: '3 piezas', tags: [{ label: 'Contiene crustáceos', kind: 'allergen' }] },
          { name: 'Siu mai', description: 'Cerdo, gamba y seta shiitake.', price: '8 €', pieces: '3 piezas', tags: [{ label: 'Contiene crustáceos', kind: 'allergen' }] },
          { name: 'Cheung fun', description: 'Rollitos de arroz al vapor con salsa de soja dulce.', price: '10 €', pieces: '3 piezas', tags: [{ label: 'Contiene soja', kind: 'allergen' }] },
          { name: 'Bao de setas', description: 'Panecillo al vapor relleno de setas y cebolleta.', price: '8 €', pieces: '3 piezas', tags: [vegetarian] },
        ],
      },
      {
        title: 'Entrantes y sopas',
        items: [
          { name: 'Pepino machacado', description: 'Ajo, vinagre negro y sésamo tostado.', price: '8 €', tags: [vegetarian, { label: 'Contiene sésamo', kind: 'allergen' }] },
          { name: 'Sopa wonton', description: 'Wontons de cerdo y gamba en caldo claro.', price: '12 €', tags: [{ label: 'Contiene crustáceos y gluten', kind: 'allergen' }] },
          { name: 'Costilla char siu', description: 'Cerdo asado, miel y especias cantonesas.', price: '16 €', tags: [share, { label: 'Contiene soja', kind: 'allergen' }] },
        ],
      },
      {
        title: 'De la cocina',
        note: 'Platos pensados para pedir al centro.',
        items: [
          { name: 'Pollo al jengibre y cebolleta', description: 'Pollo de corral, aceite aromático y arroz blanco.', price: '19 €', tags: [share, { label: 'Contiene soja', kind: 'allergen' }] },
          { name: 'Ternera con brócoli chino', description: 'Salteado al wok con salsa de ostra.', price: '21 €', tags: [share, { label: 'Contiene moluscos y soja', kind: 'allergen' }] },
          { name: 'Tofu con setas shiitake', description: 'Tofu sedoso, setas y salsa ligera de soja.', price: '17 €', tags: [share, vegetarian, { label: 'Contiene soja', kind: 'allergen' }] },
        ],
      },
      {
        title: 'Arroces y noodles',
        items: [
          { name: 'Arroz frito cantonés', description: 'Huevo, gambas, guisantes y cebolleta.', price: '16 €', tags: [share, { label: 'Contiene crustáceos y huevo', kind: 'allergen' }] },
          { name: 'Noodles de huevo al wok', description: 'Verduras crujientes y salsa de soja oscura.', price: '15 €', tags: [share, vegetarian, { label: 'Contiene gluten, huevo y soja', kind: 'allergen' }] },
        ],
      },
      {
        title: 'Algo dulce',
        items: [
          { name: 'Tarta de huevo cantonesa', description: 'Pasta hojaldrada y crema de huevo suave.', price: '7 €', tags: [{ label: 'Contiene gluten, huevo y lácteos', kind: 'allergen' }] },
          { name: 'Mango y tapioca', description: 'Mango fresco, tapioca y leche de coco.', price: '8 €', tags: [vegetarian] },
        ],
      },
      {
        title: 'La tetera',
        items: [
          { name: 'Jazmín', description: 'Té verde floral, servido en tetera.', price: '5 €' },
          { name: 'Oolong tostado', description: 'Té semioxidado de aroma profundo.', price: '6 €' },
          { name: 'Pu-erh añejo', description: 'Té fermentado, oscuro y terroso.', price: '7 €' },
        ],
      },
    ],
  },
];
