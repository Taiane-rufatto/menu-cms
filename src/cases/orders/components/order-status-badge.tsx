import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS_LABEL, type OrderStatus } from "../dtos/order.dto";

// uma cor diferente para cada status
const STATUS_COLOR: Record<OrderStatus, string> = {
    NEW: 'bg-blue-600 text-white',
    PREPARING: 'bg-amber-500 text-white',
    READY: 'bg-green-600 text-white',
    DELIVERED: 'bg-gray-500 text-white',
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
    return (
        <Badge className={STATUS_COLOR[status]}>
            {ORDER_STATUS_LABEL[status]}
        </Badge>
    )
}
