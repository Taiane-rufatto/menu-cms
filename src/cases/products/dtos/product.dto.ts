import type { CategoryDTO } from "@/cases/categories/dtos/category.dto";

export interface ProductDTO {
  id: string;
  name: string;
  description?: string | null;
  price: string | number; // o Postgres devolve o numeric como texto
  active: boolean;
  picture?: string | null;
  vegetarian: boolean;
  isNew: boolean;
  category: CategoryDTO | null;
}

// dados enviados para a API: a categoria vai só pelo id
export interface ProductFormDTO {
  name: string;
  description?: string;
  price: number;
  active: boolean;
  picture?: string;
  vegetarian: boolean;
  isNew: boolean;
  categoryId: string | null;
}
