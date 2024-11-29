
export interface Cart {
    cartId: number;
    productId: number;
    product?: Product;  // product object should be included to access price
    Quantity: number | null;
  }
  
  export interface Product {
    productId: number;
    name: string;
    Price: number;
    imageUrl: string;  // Ensure image URL is included if available
  }
  
  
    