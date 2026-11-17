import { useOrders } from "@/cases/orders/hooks/use-order";
import { KanbanColumn } from "@/cases/orders/components/kanban-column";
import { ORDER_STATUS_LIST } from "@/cases/orders/dtos/order.dto";
import { QueryState } from "@/components/shared/query-state";

export function KanbanPage() {

    const { data = [], isLoading, isError } = useOrders();

    // mostra só os pedidos das comandas que ainda estão abertas
    const orders = data.filter((order) => order.guestCheck?.status === 'OPENED');

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold uppercase">Pedidos - Kanban</h2>

            <QueryState
                isLoading={isLoading}
                isError={isError}
                isEmpty={orders.length === 0}
                emptyMessage="Nenhum pedido nas comandas abertas."
            />

            {orders.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                    {ORDER_STATUS_LIST.map((status) => (
                        <KanbanColumn
                            key={status}
                            status={status}
                            orders={orders.filter((order) => order.status === status)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
