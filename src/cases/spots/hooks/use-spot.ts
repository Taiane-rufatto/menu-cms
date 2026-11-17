import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SpotService } from "../services/spot.service";
import type { SpotFormDTO } from "../dtos/spot.dto";

export function useSpots() {
    return useQuery({
        queryKey: ['spots'],
        queryFn: SpotService.listAll,
    })
}

export function useCreateSpot() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (spot: SpotFormDTO) => SpotService.create(spot),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['spots'] })
        }
    })
}

export function useUpdateSpot() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, spot }: { id: string, spot: SpotFormDTO }) =>
            SpotService.update(id, spot),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['spots'] })
        }
    })
}

export function useDeleteSpot() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => SpotService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['spots'] })
        }
    })
}
