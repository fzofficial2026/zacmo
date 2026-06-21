export const mockProducts = [
  {
    id: 'prod_1',
    name: 'ZACMO Electric Hoodie',
    price: 120.00,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop',
    description: 'Premium heavyweight cotton hoodie featuring the signature ZACMO electric red lightning bolt across the chest.',
    colors: ['Black', 'White'],
    sizes: ['S', 'M', 'L', 'XL'],
    featured: true,
  },
  {
    id: 'prod_2',
    name: 'Void Cargo Pants',
    price: 150.00,
    image: 'https://images.unsplash.com/photo-1624378439575-d1ead6bb24b5?q=80&w=1000&auto=format&fit=crop',
    description: 'Tactical cargo pants with subtle red stitching and deep utility pockets.',
    colors: ['Black'],
    sizes: ['28', '30', '32', '34', '36'],
    featured: true,
  },
  {
    id: 'prod_3',
    name: 'Lightning Strike Tee',
    price: 55.00,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop',
    description: 'Oversized fit tee with a glowing red lightning motif on the back.',
    colors: ['Black', 'White'],
    sizes: ['S', 'M', 'L', 'XL'],
    featured: true,
  },
  {
    id: 'prod_4',
    name: 'Neon Edge Sneakers',
    price: 180.00,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop',
    description: 'Futuristic silhouette with a red glowing sole designed for urban environments.',
    colors: ['Black/Red'],
    sizes: ['8', '9', '10', '11', '12'],
    featured: false,
  }
];

export const mockReels = [
  {
    id: 'reel_1',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    productLink: 'prod_1',
    likes: 1240,
    title: 'Electric Hoodie in the wild ⚡'
  },
  {
    id: 'reel_2',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    productLink: 'prod_2',
    likes: 890,
    title: 'Cargo Pants check 🖤'
  },
  {
    id: 'reel_3',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    productLink: 'prod_3',
    likes: 2100,
    title: 'Streetwear essentials 🔥'
  }
];
