import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "../services/product.service";
import type { ProductFormDTO } from "../dtos/product.dto";

// o categoryId faz parte da queryKey: cada filtro tem o seu próprio cache
export function useProducts(categoryId?: string) {
    return useQuery({
        queryKey: ['products', categoryId],
        queryFn: () => ProductService.listAll(categoryId)
    })
}

// invalidar ['products'] recarrega todas as listas de produtos (com ou sem filtro)
export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (product: ProductFormDTO) => ProductService.create(product),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        }
    })
}

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, product }: { id: string, product: ProductFormDTO }) =>
            ProductService.update(id, product),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        }
    })
}

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => ProductService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        }
    })
}
