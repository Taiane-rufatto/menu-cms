import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CategoryService } from "../services/category.service";
import type { CategoryFormDTO } from "../dtos/category.dto";

// leitura: lista todas as categorias
export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: CategoryService.listAll
    })
}

// gravação: cadastra e, se der certo, invalida a lista para ela ser buscada de novo
export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (category: CategoryFormDTO) => CategoryService.create(category),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        }
    })
}

export function useUpdateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, category }: { id: string, category: CategoryFormDTO }) =>
            CategoryService.update(id, category),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        }
    })
}

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => CategoryService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        }
    })
}
