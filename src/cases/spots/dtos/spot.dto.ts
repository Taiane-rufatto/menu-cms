export interface SpotDTO {
    id: string;
    name: string;
    active: boolean;
}

// dados enviados para a API ao cadastrar ou editar (tudo menos o id)
export type SpotFormDTO = Omit<SpotDTO, 'id'>;
