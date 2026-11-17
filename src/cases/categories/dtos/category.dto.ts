export interface CategoryDTO {
    id: string;
    name: string;
    icon?: string | null;
    displayOrder: number;
    active: boolean;
}

// dados enviados para a API ao cadastrar ou editar (tudo menos o id)
export type CategoryFormDTO = Omit<CategoryDTO, 'id'>;
