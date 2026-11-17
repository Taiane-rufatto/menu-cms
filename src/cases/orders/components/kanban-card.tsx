import { Card, CardContent } from "@/components/ui/card";
import { formatDateTime } from "@/lib/format";
import type { OrderDTO } from "../dtos/order.dto";

interface KanbanCardProps {
    order: OrderDTO;
}

// cartão do pedido no Kanban: mesa, itens e horário
export function KanbanCard({ order }: KanbanCardProps) {
    return (
        <Card size="sm">
            <CardContent className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <strong>{order.guestCheck?.spot.name}</strong>
                    <span className="text-xs text-muted-foreground">{formatDateTime(order.createdAt)}</span>
                </div>
                <ul className="text-sm">
                    {order.items.map((item) => (
                        <li key={item.id}>{item.quantity}x {item.product.name}</li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}
