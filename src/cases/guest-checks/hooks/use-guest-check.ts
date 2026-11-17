import { useQuery } from "@tanstack/react-query";
import { GuestCheckService } from "../services/guest-check.service";
import type { GuestCheckDTO } from "../dtos/guest-check.dto";

export function useOpenedGuestChecks() {
    return useQuery({
        queryKey: ['guest-checks', 'opened'],
        queryFn: GuestCheckService.listOpened,
    })
}

export function useGuestCheck(id: string) {
    return useQuery({
        queryKey: ['guest-checks', id],
        queryFn: () => GuestCheckService.findOne(id),
        enabled: !!id
    })
}

// valor total acumulado da comanda = soma dos totais dos pedidos
export function getGuestCheckTotal(guestCheck: GuestCheckDTO) {
    return guestCheck.orders.reduce((sum, order) => sum + Number(order.total), 0)
}
