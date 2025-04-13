import { Product, Store } from "../types";

export const stores: Store[] = [
  {
    id: "store1",
    name: "Elite Menswear",
    logo: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=200&auto=format&fit=crop",
    description: "Premium clothing for the modern gentleman.",
    rating: 4.8,
    productCount: 120
  },
  {
    id: "store2",
    name: "Urban Threads",
    logo: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=200&auto=format&fit=crop",
    description: "Contemporary streetwear and casual styles.",
    rating: 4.5,
    productCount: 85
  },
  {
    id: "store3",
    name: "Gentleman's Closet",
    logo: "https://images.unsplash.com/photo-1500643752441-4dc90cda350a?q=80&w=200&auto=format&fit=crop",
    description: "Classic suits and formal wear for any occasion.",
    rating: 4.7,
    productCount: 67
  },
  {
    id: "store4",
    name: "Fitness Apparel Co.",
    logo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=200&auto=format&fit=crop",
    description: "Performance wear for active lifestyles.",
    rating: 4.6,
    productCount: 92
  }
];

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Oxford Shirt",
    price: 49.99,
    description: "A timeless oxford shirt perfect for any occasion.",
    storeId: "store1",
    storeName: "Classic Menswear",
    colors: [
      {
        color: "Blue",
        colorCode: "#2563eb",
        images: [
          "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1625&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1625&auto=format&fit=crop"
        ],
        sizes: [
          { size: "S", quantity: 10 },
          { size: "M", quantity: 15 },
          { size: "L", quantity: 20 },
          { size: "XL", quantity: 10 }
        ]
      },
      {
        color: "White",
        colorCode: "#ffffff",
        images: [
          "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1374&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1374&auto=format&fit=crop"
        ],
        sizes: [
          { size: "S", quantity: 8 },
          { size: "M", quantity: 12 },
          { size: "L", quantity: 15 },
          { size: "XL", quantity: 8 }
        ]
      }
    ],
    category: "shirts",
    tags: ["formal", "business", "classic"],
    rating: 4.5,
    isCommission: false,
    isOffer: false
  },
  {
    id: "2",
    name: "Slim Fit Chinos",
    price: 59.99,
    discountPrice: 49.99,
    description: "Comfortable and stylish chinos with a modern slim fit.",
    storeId: "store1",
    storeName: "Classic Menswear",
    colors: [
      {
        color: "Khaki",
        colorCode: "#d4b996",
        images: [
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1374&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1374&auto=format&fit=crop"
        ],
        sizes: [
          { size: "30", quantity: 10 },
          { size: "32", quantity: 15 },
          { size: "34", quantity: 12 },
          { size: "36", quantity: 8 }
        ]
      },
      {
        color: "Navy",
        colorCode: "#172554",
        images: [
          "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1470&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1470&auto=format&fit=crop"
        ],
        sizes: [
          { size: "30", quantity: 8 },
          { size: "32", quantity: 12 },
          { size: "34", quantity: 10 },
          { size: "36", quantity: 6 }
        ]
      }
    ],
    category: "pants",
    tags: ["casual", "business casual"],
    rating: 4.2,
    isCommission: false,
    isOffer: true
  },
  {
    id: "3",
    name: "Premium Leather Dress Shoes",
    price: 129.99,
    description: "Handcrafted leather dress shoes for a sophisticated look.",
    storeId: "store2",
    storeName: "Luxury Footwear",
    colors: [
      {
        color: "Brown",
        colorCode: "#7c4a30",
        images: [
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1480&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1480&auto=format&fit=crop"
        ],
        sizes: [
          { size: "8", quantity: 5 },
          { size: "9", quantity: 8 },
          { size: "10", quantity: 10 },
          { size: "11", quantity: 7 },
          { size: "12", quantity: 4 }
        ]
      },
      {
        color: "Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1470&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1470&auto=format&fit=crop"
        ],
        sizes: [
          { size: "8", quantity: 6 },
          { size: "9", quantity: 9 },
          { size: "10", quantity: 12 },
          { size: "11", quantity: 8 },
          { size: "12", quantity: 5 }
        ]
      }
    ],
    category: "footwear",
    tags: ["formal", "business", "luxury"],
    rating: 4.7,
    isCommission: true,
    isOffer: false
  },
  {
    id: "4",
    name: "Wool Blend Overcoat",
    price: 199.99,
    discountPrice: 159.99,
    description: "A sophisticated wool blend overcoat to keep you warm and stylish.",
    storeId: "store3",
    storeName: "Urban Outfitters",
    colors: [
      {
        color: "Charcoal",
        colorCode: "#36454f",
        images: [
          "https://images.unsplash.com/photo-1578948856697-db91d246b7b8?q=80&w=1374&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1578948856697-db91d246b7b8?q=80&w=1374&auto=format&fit=crop"
        ],
        sizes: [
          { size: "S", quantity: 4 },
          { size: "M", quantity: 7 },
          { size: "L", quantity: 8 },
          { size: "XL", quantity: 5 }
        ]
      },
      {
        color: "Camel",
        colorCode: "#c19a6b",
        images: [
          "https://images.unsplash.com/photo-1608063615781-e2ef8c73d114?q=80&w=1374&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1608063615781-e2ef8c73d114?q=80&w=1374&auto=format&fit=crop"
        ],
        sizes: [
          { size: "S", quantity: 3 },
          { size: "M", quantity: 6 },
          { size: "L", quantity: 7 },
          { size: "XL", quantity: 4 }
        ]
      }
    ],
    category: "outerwear",
    tags: ["winter", "formal", "business"],
    rating: 4.8,
    isCommission: false,
    isOffer: true
  },
  {
    id: "5",
    name: "Performance Running Jacket",
    price: 89.99,
    description: "Lightweight, water-resistant running jacket for all your outdoor activities.",
    storeId: "store4",
    storeName: "Active Gear",
    colors: [
      {
        color: "Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1374&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1374&auto=format&fit=crop"
        ],
        sizes: [
          { size: "S", quantity: 10 },
          { size: "M", quantity: 15 },
          { size: "L", quantity: 12 },
          { size: "XL", quantity: 8 }
        ]
      },
      {
        color: "Red",
        colorCode: "#dc2626",
        images: [
          "https://plus.unsplash.com/premium_photo-1682095740098-28d6d60ca022?q=80&w=1374&auto=format&fit=crop",
          "https://plus.unsplash.com/premium_photo-1682095740098-28d6d60ca022?q=80&w=1374&auto=format&fit=crop"
        ],
        sizes: [
          { size: "S", quantity: 8 },
          { size: "M", quantity: 12 },
          { size: "L", quantity: 10 },
          { size: "XL", quantity: 6 }
        ]
      }
    ],
    category: "activewear",
    tags: ["sports", "running", "performance"],
    rating: 4.6,
    isCommission: false,
    isOffer: false
  },
  {
    id: "6",
    name: "Leather Watch",
    price: 149.99,
    description: "Classic leather watch with a modern twist.",
    storeId: "store5",
    storeName: "Time Pieces",
    colors: [
      {
        color: "Brown Leather",
        colorCode: "#8b4513",
        images: [
          "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1498&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1498&auto=format&fit=crop"
        ],
        sizes: [
          { size: "One Size", quantity: 15 }
        ]
      },
      {
        color: "Black Leather",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1394&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1394&auto=format&fit=crop"
        ],
        sizes: [
          { size: "One Size", quantity: 12 }
        ]
      }
    ],
    category: "accessories",
    tags: ["watches", "formal", "gifts"],
    rating: 4.9,
    isCommission: true,
    isOffer: false
  }
];

export const featuredProducts = products.slice(0, 3);
export const offerProducts = products.filter(product => product.isOffer);
export const commissionProducts = products.filter(product => product.isCommission);
