import { useState } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useOrders, useUpdateOrderStatus } from "@/cases/orders/hooks/use-order";
import { KanbanColumn } from "@/cases/orders/components/kanban-column";
import { ORDER_STATUS_LABEL, ORDER_STATUS_LIST, type OrderStatus } from "@/cases/orders/dtos/order.dto";
import { QueryState } from "@/components/shared/query-state";
import { FeedbackAlert, type Feedback } from "@/components/shared/feedback-alert";
import { getErrorMessage } from "@/lib/error-message";

export function KanbanPage() {

    const { data = [], isLoading, isError } = useOrders();

    // mostra só os pedidos das comandas que ainda estão abertas
    const orders = data.filter((order) => order.guestCheck?.status === 'OPENED');

    const updateStatus = useUpdateOrderStatus();
    const [feedback, setFeedback] = useState<Feedback | null>(null);

    // chamado quando o usuário solta o cartão
    function handleDragEnd(event: DragEndEvent) {
        // active = cartão arrastado (id do pedido) / over = coluna onde soltou (status)
        if (!event.over) return;

        const orderId = String(event.active.id);
        const newStatus = event.over.id as OrderStatus;
        const order = orders.find((o) => o.id === orderId);

        // soltou na mesma coluna: não precisa chamar a API
        if (!order || order.status === newStatus) return;

        // grava o novo status na API; ao terminar, o hook invalida ['orders'] e o Kanban recarrega
        updateStatus.mutate({ id: orderId, status: newStatus }, {
            onSuccess: () => setFeedback({ type: 'success', message: `Pedido movido para "${ORDER_STATUS_LABEL[newStatus]}".` }),
            onError: (error) => setFeedback({ type: 'error', message: getErrorMessage(error) }),
        });
    }

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold uppercase">Pedidos - Kanban</h2>

            <FeedbackAlert feedback={feedback} />

            <QueryState
                isLoading={isLoading}
                isError={isError}
                isEmpty={orders.length === 0}
                emptyMessage="Nenhum pedido nas comandas abertas."
            />

            {orders.length > 0 && (
                <DndContext onDragEnd={handleDragEnd}>
                    <div className="grid grid-cols-4 gap-3">
                        {ORDER_STATUS_LIST.map((status) => (
                            <KanbanColumn
                                key={status}
                                status={status}
                                orders={orders.filter((order) => order.status === status)}
                            />
                        ))}
                    </div>
                </DndContext>
            )}
        </div>
    )
}
