export interface Category {
  id: string;
  name: string;
  typeImg: string;
}
export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  taxes?: number;
}
export interface CreateProductDTO extends Omit<Product, 'id' | 'category'>{
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO>{}

//Otra forma de tipado para el update, pero no se usa con el objetivo de no repetir código
  //   export interface UpdateProductDTO {
  //   title?: string;
  //   price?: number;
  //   images?: string[];
  //   description?: string;
  //   category?: number;
  // }

//No usamos este tipado para no repetir código.
// export interface CreateProductDTO {
//   title: string;
//   price: number;
//   images: string[];
//   description: string;
//   category: number;
// }
