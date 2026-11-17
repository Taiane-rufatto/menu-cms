import { api } from "@/lib/axios"
import type { ProductDTO, ProductFormDTO } from "../dtos/product.dto"

const ENDPOINT = "/products"

export const ProductService = {

    // se receber o categoryId, a API devolve só os produtos daquela categoria
    async listAll(categoryId?: string): Promise<ProductDTO[]> {
        const result = await api.get<ProductDTO[]>(ENDPOINT, {
            params: { categoryId }
        })
        return result.data
    },

    async create(product: ProductFormDTO): Promise<ProductDTO> {
        const result = await api.post<ProductDTO>(ENDPOINT, product)
        return result.data
    },

    async update(id: string, product: ProductFormDTO): Promise<ProductDTO> {
        const result = await api.patch<ProductDTO>(`${ENDPOINT}/${id}`, product)
        return result.data
    },

    async delete(id: string): Promise<void> {
        await api.delete(`${ENDPOINT}/${id}`)
    }
}
