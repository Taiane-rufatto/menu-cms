import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ORDER_STATUS_LABEL, ORDER_STATUS_LIST, type OrderStatus } from "../dtos/order.dto";

interface OrderStatusSelectProps {
    value: OrderStatus;
    disabled: boolean;
    onChange: (status: OrderStatus) => void;
}

// as transições são livres: qualquer status pode ir para qualquer outro
export function OrderStatusSelect({ value, disabled, onChange }: OrderStatusSelectProps) {

    const items = ORDER_STATUS_LIST.map((status) => ({ value: status, label: ORDER_STATUS_LABEL[status] }));

    return (
        <Select items={items} value={value} disabled={disabled}
            onValueChange={(newValue) => newValue && onChange(newValue)}>
            <SelectTrigger className="w-40">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
