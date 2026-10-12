const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding restaurant database...');

  // 1. Clean existing records (optional, or upsert)
  await prisma.menuItem.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Admin User
  const passwordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      name: 'Chef Michel & Admin',
      email: 'admin@restaurant.com',
      password: passwordHash,
      role: 'ADMIN',
    },
  });
  console.log(`Created admin user: ${admin.email}`);

  // 3. Categories
  const categoriesData = [
    { name: 'Breakfast', type: 'FOOD', order: 1 },
    { name: 'Appetizers', type: 'FOOD', order: 2 },
    { name: 'Main Courses', type: 'FOOD', order: 3 },
    { name: 'Burgers', type: 'FOOD', order: 4 },
    { name: 'Pizza', type: 'FOOD', order: 5 },
    { name: 'Pasta', type: 'FOOD', order: 6 },
    { name: 'Sandwiches', type: 'FOOD', order: 7 },
    { name: 'Salads', type: 'FOOD', order: 8 },
    { name: 'Desserts', type: 'FOOD', order: 9 },
    { name: 'Coffee & Hot Drinks', type: 'DRINK', order: 10 },
    { name: 'Fresh Juices & Smoothies', type: 'DRINK', order: 11 },
    { name: 'Signature Mocktails & Cocktails', type: 'DRINK', order: 12 },
    { name: 'Soft Drinks & Water', type: 'DRINK', order: 13 },
  ];

  const categoryMap = {};
  for (const cat of categoriesData) {
    const created = await prisma.category.create({ data: cat });
    categoryMap[cat.name] = created.id;
  }
  console.log(`Created ${categoriesData.length} categories.`);

  // 4. Menu Items
  const menuItems = [
    // Breakfast
    {
      name: 'Royal Eggs Benedict',
      description: 'Poached farm eggs on toasted artisanal brioche with smoked beef ham, silky hollandaise sauce, and microgreens.',
      price: 480,
      imageUrl: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Brioche bread, Poached eggs, Smoked ham, Hollandaise butter sauce, Chives, Paprika',
      available: true,
      featured: true,
      categoryName: 'Breakfast',
    },
    {
      name: 'Avocado Tartine & Feta',
      description: 'Crushed Hass avocado on sourdough toast with creamy crumbled feta, heirloom cherry tomatoes, radish, and balsamic glaze.',
      price: 390,
      imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Organic sourdough, Hass avocado, Feta cheese, Cherry tomatoes, Lemon zest, Balsamic glaze, Chia seeds',
      available: true,
      featured: false,
      categoryName: 'Breakfast',
    },
    {
      name: 'Brioche French Toast with Berries',
      description: 'Thick sliced golden brioche soaked in vanilla custard, served with macerated wild berries, whipped cream, and pure maple syrup.',
      price: 420,
      imageUrl: 'https://images.unsplash.com/photo-1484723091739-0045e28a9b49?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Brioche, Eggs, Cream, Madagascar vanilla, Strawberries, Blueberries, Maple syrup, Mint',
      available: true,
      featured: false,
      categoryName: 'Breakfast',
    },

    // Appetizers
    {
      name: 'Crispy Calamari Fritti',
      description: 'Tender calamari rings dusted with spiced semolina and fried golden, served with house garlic saffron aioli and charred lemon.',
      price: 520,
      imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Fresh calamari, Spiced semolina flour, Garlic saffron aioli, Fresh lemon, Sea salt, Parsley',
      available: true,
      featured: true,
      categoryName: 'Appetizers',
    },
    {
      name: 'Truffle Mushroom Bruschetta',
      description: 'Grilled country bread topped with roasted wild forest mushrooms, thyme, truffle oil, and shaved aged Parmesan.',
      price: 440,
      imageUrl: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Artisan baguette, Cremini & Shiitake mushrooms, Black truffle oil, Thyme, Garlic, Parmesan cheese',
      available: true,
      featured: false,
      categoryName: 'Appetizers',
    },
    {
      name: 'Burrata Caprese with Pesto',
      description: 'Creamy Italian Burrata cheese served with heirloom tomatoes, fragrant basil pesto, cracked black pepper, and aged Modena glaze.',
      price: 560,
      imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22524?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Fresh Burrata, Heirloom beefsteak tomatoes, Genovese pesto, Extra virgin olive oil, Aged balsamic',
      available: true,
      featured: true,
      categoryName: 'Appetizers',
    },

    // Main Courses
    {
      name: 'Pan-Seared Ribeye Steak',
      description: 'Prime cut 300g ribeye steak basted in rosemary garlic butter, served with truffle potato purée and red wine reduction.',
      price: 980,
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Prime beef ribeye, French butter, Fresh rosemary, Garlic cloves, Sea salt, Truffle potato purée, Red wine jus',
      available: true,
      featured: true,
      categoryName: 'Main Courses',
    },
    {
      name: 'Herb Crusted Atlantic Salmon',
      description: 'Fresh salmon fillet with a crispy herb crust, served over asparagus spears, baby crushed potatoes, and lemon caper butter sauce.',
      price: 890,
      imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Atlantic salmon, Panko breadcrumbs, Fresh dill, Lemon caper butter, Charred asparagus, Olive oil',
      available: true,
      featured: true,
      categoryName: 'Main Courses',
    },
    {
      name: 'Slow-Braised Lamb Shank',
      description: 'Melt-in-mouth lamb shank braised in rich burgundy wine, root vegetables, and herbs, resting on saffron risotto.',
      price: 920,
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Tender lamb shank, Burgundy wine, Carrots, Celery, Rosemary, Saffron risotto, Lamb reduction',
      available: true,
      featured: false,
      categoryName: 'Main Courses',
    },

    // Burgers
    {
      name: 'Burgundy Truffle Beef Burger',
      description: 'Double smashed Angus beef patties, melted aged cheddar, caramelized red onion jam, black truffle mayo, on a brioche bun.',
      price: 540,
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Angus beef patty, Aged Cheddar, Caramelized onions, Truffle aioli, Brioche bun, Wild rocket, Pickles',
      available: true,
      featured: true,
      categoryName: 'Burgers',
    },
    {
      name: 'Crispy Buttermilk Chicken Burger',
      description: 'Golden fried chicken breast tossed in smoked paprika, crunchy house slaw, spicy chipotle mayo, and pickled cucumbers.',
      price: 490,
      imageUrl: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Buttermilk fried chicken, Purple cabbage slaw, Pickles, Chipotle mayo, Brioche bun',
      available: true,
      featured: false,
      categoryName: 'Burgers',
    },
    {
      name: 'Smoked Portobello & Halloumi Burger',
      description: 'Grilled portobello mushroom cap, seared Cypriot halloumi cheese, roasted red pepper relish, and garlic aioli.',
      price: 460,
      imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Portobello mushroom, Seared Halloumi cheese, Roasted bell pepper relish, Baby spinach, Brioche bun',
      available: true,
      featured: false,
      categoryName: 'Burgers',
    },

    // Pizza
    {
      name: 'Tartufo & Wild Mushroom Pizza',
      description: 'Stone-baked artisan dough, creamy mozzarella, wild forest mushrooms, fresh rosemary, black truffle cream, and fresh thyme.',
      price: 580,
      imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Slow fermented sourdough crust, Fior di latte mozzarella, Porcini mushrooms, Truffle cream, Thyme',
      available: true,
      featured: true,
      categoryName: 'Pizza',
    },
    {
      name: 'Prosciutto e Rucola Pizza',
      description: 'San Marzano tomato base, fresh mozzarella, finished out of the oven with dry-cured Italian prosciutto, baby arugula, and shaved parmesan.',
      price: 610,
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
      ingredients: 'San Marzano tomato sauce, Mozzarella, Prosciutto di Parma, Wild arugula, Shaved Parmigiano Reggiano',
      available: true,
      featured: false,
      categoryName: 'Pizza',
    },
    {
      name: 'Margherita Burrata Speciale',
      description: 'Neapolitan style pizza with San Marzano tomatoes, whole creamy burrata in the center, fresh basil leaves, and cold-pressed olive oil.',
      price: 540,
      imageUrl: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
      ingredients: 'San Marzano tomatoes, Fresh Burrata, Fior di latte, Basil, Extra virgin olive oil',
      available: true,
      featured: false,
      categoryName: 'Pizza',
    },

    // Pasta
    {
      name: 'Penne alla Vodka & Smoked Bacon',
      description: 'Al dente penne pasta tossed in a creamy tomato vodka blush sauce with crispy pancetta, garlic, and fresh pecorino.',
      price: 520,
      imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3d5d62817d2?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Bronze cut penne, San Marzano tomatoes, Heavy cream, Pancetta bacon, Shallots, Pecorino Romano',
      available: true,
      featured: true,
      categoryName: 'Pasta',
    },
    {
      name: 'Fettuccine Al Tartufo & Wild Mushrooms',
      description: 'House-made ribbon fettuccine with sautéed wild forest mushrooms in a velvety white wine butter sauce and aromatic truffle essence.',
      price: 560,
      imageUrl: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Egg fettuccine pasta, Wild mushrooms, French butter, White wine, Garlic, Parmesan, Truffle carpaccio',
      available: true,
      featured: false,
      categoryName: 'Pasta',
    },

    // Sandwiches
    {
      name: 'Grilled Steak & Caramelized Onion Panini',
      description: 'Thinly sliced tenderloin beef, melted provolone cheese, sweet caramelized onions, and grain mustard on toasted ciabatta.',
      price: 470,
      imageUrl: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Ciabatta bread, Tenderloin beef strips, Provolone cheese, Caramelized red onions, Whole grain mustard',
      available: true,
      featured: false,
      categoryName: 'Sandwiches',
    },
    {
      name: 'Smoked Salmon & Herbed Cream Cheese Bagel',
      description: 'Toasted sesame bagel layered with whipped dill cream cheese, wild smoked salmon, capers, thinly sliced red onion, and cucumber.',
      price: 490,
      imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Sesame bagel, Smoked Atlantic salmon, Cream cheese, Fresh dill, Red onion, Capers, Cucumber',
      available: true,
      featured: true,
      categoryName: 'Sandwiches',
    },

    // Salads
    {
      name: 'Charred Chicken Caesar Salad',
      description: 'Crisp romaine hearts, herb-marinated grilled chicken breast, garlic herb croutons, crispy bacon bits, and aged parmesan dressing.',
      price: 430,
      imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Romaine lettuce, Grilled chicken breast, Artisan croutons, Caesar dressing, Parmigiano Reggiano',
      available: true,
      featured: false,
      categoryName: 'Salads',
    },
    {
      name: 'Mediterranean Quinoa & Pomegranate Salad',
      description: 'Fluffy rainbow quinoa, Persian cucumbers, Kalamata olives, cherry tomatoes, mint, toasted pistachios, and tangy pomegranate vinaigrette.',
      price: 410,
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Organic quinoa, Kalamata olives, Cucumbers, Fresh mint, Pistachios, Pomegranate seeds, Olive oil',
      available: true,
      featured: false,
      categoryName: 'Salads',
    },

    // Desserts
    {
      name: 'Decadent Valrhona Chocolate Fondant',
      description: 'Warm molten chocolate cake made with dark Valrhona 70% cocoa, with a flowing center, served with house vanilla bean gelato.',
      price: 360,
      imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Valrhona 70% dark chocolate, Farm butter, Eggs, Madagascar vanilla bean gelato, Raspberry coulis',
      available: true,
      featured: true,
      categoryName: 'Desserts',
    },
    {
      name: 'Traditional Venetian Tiramisu',
      description: 'Espresso-soaked ladyfingers layered with airy whipped mascarpone cream, dusted generously with Belgian cocoa powder.',
      price: 340,
      imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Savoiardi ladyfingers, Ethiopian Arabica espresso, Mascarpone, Egg yolks, Marsala wine, Cocoa powder',
      available: true,
      featured: true,
      categoryName: 'Desserts',
    },
    {
      name: 'Madagascar Vanilla Bean Panna Cotta',
      description: 'Silky smooth set cream infused with pure vanilla bean specks, finished with a tart passion fruit and mango coulis.',
      price: 310,
      imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Double cream, Milk, Madagascar vanilla bean, Gelatin, Passion fruit, Alfonso mango',
      available: true,
      featured: false,
      categoryName: 'Desserts',
    },

    // Drinks - Coffee & Hot Drinks
    {
      name: 'Signature Yirgacheffe Pour-Over',
      description: 'Single-origin Ethiopian Yirgacheffe specialty coffee brewed to perfection with vibrant floral jasmine notes, bergamot, and sweet peach finish.',
      price: 190,
      imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Specialty Grade 1 Yirgacheffe Arabica beans, Filtered mineral water',
      available: true,
      featured: true,
      categoryName: 'Coffee & Hot Drinks',
    },
    {
      name: 'Velvet Vanilla Bean Latte',
      description: 'Rich double espresso paired with micro-foamed steamed whole milk and natural house-infused vanilla bean syrup with latte art.',
      price: 210,
      imageUrl: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Espresso roast, Whole fresh milk, Natural vanilla bean syrup, Cinnamon dust',
      available: true,
      featured: false,
      categoryName: 'Coffee & Hot Drinks',
    },
    {
      name: 'Artisan Hot Chocolate with Marshmallow',
      description: 'Melted Belgian milk and dark chocolate blended with steamed cream, topped with toasted house marshmallow and shaved cocoa.',
      price: 230,
      imageUrl: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Belgian dark chocolate, Steamed whole milk, Vanilla marshmallow, Cocoa nibs',
      available: true,
      featured: false,
      categoryName: 'Coffee & Hot Drinks',
    },

    // Drinks - Fresh Juices & Smoothies
    {
      name: 'Burgundy Glow Antioxidant Juice',
      description: 'Cold-pressed fresh beetroot, crisp green apple, ginger root, pomegranate, and lime for a vibrant healthy boost.',
      price: 240,
      imageUrl: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Fresh beetroot, Granny Smith apple, Fresh ginger, Pomegranate seeds, Key lime',
      available: true,
      featured: true,
      categoryName: 'Fresh Juices & Smoothies',
    },
    {
      name: 'Tropical Mango Passion Smoothie',
      description: 'Sun-ripened mango chunks blended with passionfruit pulp, Greek yogurt, and a touch of organic acacia honey.',
      price: 260,
      imageUrl: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Ripe mango, Passionfruit puree, Greek yogurt, Acacia honey, Crushed ice',
      available: true,
      featured: false,
      categoryName: 'Fresh Juices & Smoothies',
    },

    // Drinks - Signature Mocktails & Cocktails
    {
      name: 'Burgundy Velvet Berry Spritz (Mocktail)',
      description: 'House blackberry and rosemary reduction shaken with fresh lemon juice, topped with sparkling elderflower tonic and mint.',
      price: 280,
      imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Blackberries, Fresh rosemary, Lemon juice, Elderflower tonic, Crushed ice, Mint sprig',
      available: true,
      featured: true,
      categoryName: 'Signature Mocktails & Cocktails',
    },
    {
      name: 'Classic Mojito Royale',
      description: 'Muddled fresh spearmint leaves, organic cane sugar, freshly squeezed lime juice, club soda, and aromatic bitters.',
      price: 290,
      imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Fresh mint leaves, Lime wedges, Pure cane sugar, Club soda, Angostura bitters',
      available: true,
      featured: false,
      categoryName: 'Signature Mocktails & Cocktails',
    },

    // Drinks - Soft Drinks & Water
    {
      name: 'Sparkling San Pellegrino (750ml)',
      description: 'Finely carbonated Italian natural mineral water served chilled with your choice of lemon or lime slices.',
      price: 180,
      imageUrl: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Natural sparkling mineral water, Lemon twist',
      available: true,
      featured: false,
      categoryName: 'Soft Drinks & Water',
    },
    {
      name: 'Craft Botanical Ginger Ale',
      description: 'Spiced craft ginger ale with natural ginger root extract, lemongrass, and subtle hints of citrus.',
      price: 150,
      imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Sparkling water, Natural ginger root, Lemongrass, Pure cane sugar',
      available: true,
      featured: false,
      categoryName: 'Soft Drinks & Water',
    },
  ];

  for (const item of menuItems) {
    const categoryId = categoryMap[item.categoryName];
    if (categoryId) {
      await prisma.menuItem.create({
        data: {
          name: item.name,
          description: item.description,
          price: item.price,
          imageUrl: item.imageUrl,
          ingredients: item.ingredients,
          available: item.available,
          featured: item.featured,
          categoryId: categoryId,
        },
      });
    }
  }

  console.log(`Created ${menuItems.length} menu items successfully.`);
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
