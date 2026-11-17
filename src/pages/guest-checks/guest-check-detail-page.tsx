import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getGuestCheckTotal, useGuestCheck } from "@/cases/guest-checks/hooks/use-guest-check";
import { OrderCard } from "@/cases/orders/components/order-card";
import { useUpdateOrderStatus } from "@/cases/orders/hooks/use-order";
import { ORDER_STATUS_LABEL, type OrderStatus } from "@/cases/orders/dtos/order.dto";
import { FeedbackAlert, type Feedback } from "@/components/shared/feedback-alert";
import { QueryState } from "@/components/shared/query-state";
import { Button } from "@/components/ui/button";
import { formatDateTime, formatPrice } from "@/lib/format";
import { getErrorMessage } from "@/lib/error-message";

export function GuestCheckDetailPage() {

    // id da comanda que vem na URL: /guest-checks/:id
    const { id = '' } = useParams();
    const navigate = useNavigate();

    const { data: guestCheck, isLoading, isError } = useGuestCheck(id);
    const updateStatus = useUpdateOrderStatus();
    const [feedback, setFeedback] = useState<Feedback | null>(null);

    // grava o novo status na API; o hook invalida as consultas e a tela atualiza sozinha
    function handleStatusChange(orderId: string, status: OrderStatus) {
        updateStatus.mutate({ id: orderId, status }, {
            onSuccess: () => setFeedback({ type: 'success', message: `Status alterado para "${ORDER_STATUS_LABEL[status]}".` }),
            onError: (error) => setFeedback({ type: 'error', message: getErrorMessage(error) }),
        });
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => navigate('/guest-checks')}>
                    <ArrowLeft />
                </Button>
                <h2 className="text-2xl font-semibold uppercase">
                    Comanda {guestCheck ? `- ${guestCheck.spot.name}` : ''}
                </h2>
            </div>

            <FeedbackAlert feedback={feedback} />

            <QueryState
                isLoading={isLoading}
                isError={isError}
                isEmpty={guestCheck !== undefined && guestCheck.orders.length === 0}
                emptyMessage="Esta comanda ainda não tem pedidos."
            />

            {guestCheck && (
                <>
                    <div className="flex gap-8 text-sm">
                        <p>Aberta em: <strong>{formatDateTime(guestCheck.createdAt)}</strong></p>
                        <p>Total acumulado: <strong>{formatPrice(getGuestCheckTotal(guestCheck))}</strong></p>
                    </div>

                    {guestCheck.orders.map((order, index) => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            number={index + 1}
                            isSaving={updateStatus.isPending}
                            onStatusChange={(status) => handleStatusChange(order.id, status)}
                        />
                    ))}
                </>
            )}
        </div>
    )
}
