import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { getGuestCheckTotal, useOpenedGuestChecks } from "@/cases/guest-checks/hooks/use-guest-check";
import { QueryState } from "@/components/shared/query-state";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDateTime, formatPrice } from "@/lib/format";

// comandas não são criadas pelo CMS: o backend abre no primeiro pedido da mesa
export function GuestCheckPage() {

    const navigate = useNavigate();
    const { data: guestChecks = [], isLoading, isError } = useOpenedGuestChecks();

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold uppercase">Comandas em aberto</h2>

            <QueryState
                isLoading={isLoading}
                isError={isError}
                isEmpty={guestChecks.length === 0}
                emptyMessage="Nenhuma comanda aberta no momento."
            />

            {guestChecks.length > 0 && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Mesa</TableHead>
                            <TableHead>Aberta em</TableHead>
                            <TableHead>Pedidos</TableHead>
                            <TableHead>Total acumulado</TableHead>
                            <TableHead className="text-right">Detalhe</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {guestChecks.map((guestCheck) => (
                            <TableRow key={guestCheck.id}>
                                <TableCell className="font-medium">{guestCheck.spot.name}</TableCell>
                                <TableCell>{formatDateTime(guestCheck.createdAt)}</TableCell>
                                <TableCell>{guestCheck.orders.length}</TableCell>
                                <TableCell>{formatPrice(getGuestCheckTotal(guestCheck))}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm"
                                        onClick={() => navigate(`/guest-checks/${guestCheck.id}`)}>
                                        <Eye /> Ver pedidos
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}
