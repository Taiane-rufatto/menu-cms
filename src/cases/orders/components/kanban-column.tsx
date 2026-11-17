import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { ORDER_STATUS_LABEL, type OrderDTO, type OrderStatus } from "../dtos/order.dto";
import { KanbanCard } from "./kanban-card";
import { OrderStatusBadge } from "./order-status-badge";

interface KanbanColumnProps {
    status: OrderStatus;
    orders: OrderDTO[];
}

// uma coluna do Kanban para cada status
export function KanbanColumn({ status, orders }: KanbanColumnProps) {

    // useDroppable deixa a coluna receber cartões; o id da coluna é o status
    const { setNodeRef, isOver } = useDroppable({ id: status });

    return (
        <div
            ref={setNodeRef}
            className={cn(
                'flex min-h-96 flex-col gap-3 rounded-xl border bg-muted/40 p-3',
                isOver && 'border-primary bg-primary/10'
            )}
        >
            <div className="flex items-center justify-between">
                <OrderStatusBadge status={status} />
                <span className="text-sm text-muted-foreground">{orders.length}</span>
            </div>

            {orders.map((order) => (
                <KanbanCard key={order.id} order={order} />
            ))}

            {orders.length === 0 && (
                <p className="text-center text-xs text-muted-foreground">Nenhum pedido {ORDER_STATUS_LABEL[status].toLowerCase()}</p>
            )}
        </div>
    )
}
