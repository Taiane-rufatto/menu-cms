import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getGuestCheckTotal, useGuestCheck } from "@/cases/guest-checks/hooks/use-guest-check";
import { OrderCard } from "@/cases/orders/components/order-card";
import { QueryState } from "@/components/shared/query-state";
import { Button } from "@/components/ui/button";
import { formatDateTime, formatPrice } from "@/lib/format";

export function GuestCheckDetailPage() {

    // id da comanda que vem na URL: /guest-checks/:id
    const { id = '' } = useParams();
    const navigate = useNavigate();

    const { data: guestCheck, isLoading, isError } = useGuestCheck(id);

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
                        <OrderCard key={order.id} order={order} number={index + 1} />
                    ))}
                </>
            )}
        </div>
    )
}
