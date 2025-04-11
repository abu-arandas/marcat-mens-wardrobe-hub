
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
    id: "prod1",
    name: "Classic Oxford Shirt",
    price: 79.99,
    description: "A timeless oxford shirt made from premium cotton with a comfortable regular fit.",
    storeId: "store1",
    storeName: "Elite Menswear",
    colors: [
      {
        color: "Blue",
        colorCode: "#1a73e8",
        images: [
          "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?q=80&w=500&auto=format&fit=crop"
        ],
        sizes: [
          { size: "S", quantity: 12 },
          { size: "M", quantity: 18 },
          { size: "L", quantity: 15 },
          { size: "XL", quantity: 10 }
        ]
      },
      {
        color: "White",
        colorCode: "#ffffff",
        images: [
          "https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=500&auto=format&fit=crop"
        ],
        sizes: [
          { size: "S", quantity: 8 },
          { size: "M", quantity: 15 },
          { size: "L", quantity: 20 },
          { size: "XL", quantity: 12 }
        ]
      }
    ],
    category: "Shirts",
    tags: ["formal", "business", "cotton"],
    rating: 4.7,
    isCommission: false,
    isOffer: false
  },
  {
    id: "prod2",
    name: "Slim Fit Chinos",
    price: 89.99,
    discountPrice: 69.99,
    description: "Modern slim fit chinos perfect for both casual and semi-formal occasions.",
    storeId: "store1",
    storeName: "Elite Menswear",
    colors: [
      {
        color: "Khaki",
        colorCode: "#c3b091",
        images: [
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=500&auto=format&fit=crop"
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
        colorCode: "#1a3a5a",
        images: [
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1552331704-0d8a8fa3683b?q=80&w=500&auto=format&fit=crop"
        ],
        sizes: [
          { size: "30", quantity: 8 },
          { size: "32", quantity: 12 },
          { size: "34", quantity: 15 },
          { size: "36", quantity: 10 }
        ]
      }
    ],
    category: "Pants",
    tags: ["casual", "slim-fit", "cotton"],
    rating: 4.5,
    isCommission: false,
    isOffer: true
  },
  {
    id: "prod3",
    name: "Leather Chelsea Boots",
    price: 199.99,
    description: "Premium leather Chelsea boots with elastic side panels and pull tabs.",
    storeId: "store3",
    storeName: "Gentleman's Closet",
    colors: [
      {
        color: "Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1611694154358-29087833f438?q=80&w=500&auto=format&fit=crop"
        ],
        sizes: [
          { size: "8", quantity: 6 },
          { size: "9", quantity: 8 },
          { size: "10", quantity: 10 },
          { size: "11", quantity: 7 },
          { size: "12", quantity: 5 }
        ]
      },
      {
        color: "Brown",
        colorCode: "#8b4513",
        images: [
          "https://images.unsplash.com/photo-1605812860427-4024433a70fd?q=80&w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1635767798638-3665e0f9510e?q=80&w=500&auto=format&fit=crop"
        ],
        sizes: [
          { size: "8", quantity: 5 },
          { size: "9", quantity: 9 },
          { size: "10", quantity: 12 },
          { size: "11", quantity: 8 },
          { size: "12", quantity: 6 }
        ]
      }
    ],
    category: "Footwear",
    tags: ["boots", "leather", "formal"],
    rating: 4.9,
    isCommission: true,
    isOffer: false
  },
  {
    id: "prod4",
    name: "Performance Athletic Tee",
    price: 39.99,
    discountPrice: 29.99,
    description: "Moisture-wicking athletic t-shirt perfect for workouts and sports.",
    storeId: "store4",
    storeName: "Fitness Apparel Co.",
    colors: [
      {
        color: "Red",
        colorCode: "#dc3545",
        images: [
          "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500&auto=format&fit=crop"
        ],
        sizes: [
          { size: "S", quantity: 15 },
          { size: "M", quantity: 20 },
          { size: "L", quantity: 18 },
          { size: "XL", quantity: 14 }
        ]
      },
      {
        color: "Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1571945153237-4929e783af4a?q=80&w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1608853144824-d4895e3e05d8?q=80&w=500&auto=format&fit=crop"
        ],
        sizes: [
          { size: "S", quantity: 12 },
          { size: "M", quantity: 22 },
          { size: "L", quantity: 20 },
          { size: "XL", quantity: 16 }
        ]
      },
      {
        color: "Blue",
        colorCode: "#007bff",
        images: [
          "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?q=80&w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=500&auto=format&fit=crop"
        ],
        sizes: [
          { size: "S", quantity: 10 },
          { size: "M", quantity: 18 },
          { size: "L", quantity: 16 },
          { size: "XL", quantity: 12 }
        ]
      }
    ],
    category: "Activewear",
    tags: ["sport", "gym", "performance"],
    rating: 4.6,
    isCommission: false,
    isOffer: true
  },
  {
    id: "prod5",
    name: "Wool Blend Overcoat",
    price: 249.99,
    description: "Elegant wool blend overcoat with a tailored fit and premium lining.",
    storeId: "store3",
    storeName: "Gentleman's Closet",
    colors: [
      {
        color: "Charcoal",
        colorCode: "#36454f",
        images: [
          "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?q=80&w=500&auto=format&fit=crop"
        ],
        sizes: [
          { size: "S", quantity: 5 },
          { size: "M", quantity: 10 },
          { size: "L", quantity: 12 },
          { size: "XL", quantity: 8 }
        ]
      },
      {
        color: "Camel",
        colorCode: "#c19a6b",
        images: [
          "https://images.unsplash.com/photo-1608744882201-52a7f7f3dd60?q=80&w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=500&auto=format&fit=crop"
        ],
        sizes: [
          { size: "S", quantity: 4 },
          { size: "M", quantity: 8 },
          { size: "L", quantity: 10 },
          { size: "XL", quantity: 7 }
        ]
      }
    ],
    category: "Outerwear",
    tags: ["winter", "formal", "coat"],
    rating: 4.8,
    isCommission: true,
    isOffer: false
  },
  {
    id: "prod6",
    name: "Urban Cargo Pants",
    price: 69.99,
    description: "Versatile cargo pants with multiple pockets and durable construction.",
    storeId: "store2",
    storeName: "Urban Threads",
    colors: [
      {
        color: "Olive",
        colorCode: "#556b2f",
        images: [
          "https://images.unsplash.com/photo-1584865288642-42078afe6942?q=80&w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1518754744527-2031588feda6?q=80&w=500&auto=format&fit=crop"
        ],
        sizes: [
          { size: "30", quantity: 12 },
          { size: "32", quantity: 18 },
          { size: "34", quantity: 15 },
          { size: "36", quantity: 10 }
        ]
      },
      {
        color: "Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1580256081112-e49377338b7f?q=80&w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=500&auto=format&fit=crop"
        ],
        sizes: [
          { size: "30", quantity: 14 },
          { size: "32", quantity: 20 },
          { size: "34", quantity: 16 },
          { size: "36", quantity: 12 }
        ]
      }
    ],
    category: "Pants",
    tags: ["casual", "urban", "streetwear"],
    rating: 4.4,
    isCommission: false,
    isOffer: false
  }
];

export const featuredProducts = products.slice(0, 3);
export const offerProducts = products.filter(product => product.isOffer);
export const commissionProducts = products.filter(product => product.isCommission);
