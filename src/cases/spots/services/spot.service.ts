import { api } from "@/lib/axios";
import type { SpotDTO, SpotFormDTO } from "../dtos/spot.dto";

const ENDPOINT = "/spots";

export const SpotService = {

    async listAll(): Promise<SpotDTO[]> {
        const result = await api.get<SpotDTO[]>(ENDPOINT)
        return result.data;
    },

    async create(spot: SpotFormDTO): Promise<SpotDTO> {
        const result = await api.post<SpotDTO>(ENDPOINT, spot)
        return result.data;
    },

    async update(id: string, spot: SpotFormDTO): Promise<SpotDTO> {
        const result = await api.patch<SpotDTO>(`${ENDPOINT}/${id}`, spot)
        return result.data;
    },

    async delete(id: string): Promise<void> {
        await api.delete(`${ENDPOINT}/${id}`)
    }
}
