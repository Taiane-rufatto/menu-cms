import { useDraggable } from "@dnd-kit/core";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateTime } from "@/lib/format";
import type { OrderDTO } from "../dtos/order.dto";

interface KanbanCardProps {
    order: OrderDTO;
}

// cartão do pedido no Kanban: mesa, itens e horário
export function KanbanCard({ order }: KanbanCardProps) {

    // useDraggable deixa o cartão "arrastável"; o id do cartão é o id do pedido
    const { setNodeRef, listeners, attributes, transform, isDragging } = useDraggable({ id: order.id });

    // enquanto arrasta, o cartão acompanha o mouse
    const style = transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : undefined;

    return (
        <Card
            size="sm"
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={isDragging ? 'z-10 cursor-grabbing opacity-80 shadow-lg' : 'cursor-grab'}
        >
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
