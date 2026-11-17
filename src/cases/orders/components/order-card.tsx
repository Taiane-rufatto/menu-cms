import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDateTime, formatPrice } from "@/lib/format";
import type { OrderDTO } from "../dtos/order.dto";
import { OrderStatusBadge } from "./order-status-badge";

interface OrderCardProps {
    order: OrderDTO;
    number: number; // número do pedido dentro da comanda (1, 2, 3...)
}

// mostra um pedido com seus itens, o total e o status
export function OrderCard({ order, number }: OrderCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                    Pedido {number} <span className="text-sm font-normal text-muted-foreground">({formatDateTime(order.createdAt)})</span>
                </CardTitle>
                <OrderStatusBadge status={order.status} />
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Produto</TableHead>
                            <TableHead>Quantidade</TableHead>
                            <TableHead>Preço unitário</TableHead>
                            <TableHead className="text-right">Subtotal</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {order.items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.product.name}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{formatPrice(item.price)}</TableCell>
                                <TableCell className="text-right">{formatPrice(item.subtotal)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <p className="text-right font-semibold">Total do pedido: {formatPrice(order.total)}</p>
            </CardContent>
        </Card>
    )
}
