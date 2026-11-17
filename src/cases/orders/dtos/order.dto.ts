import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import type { SpotDTO } from "@/cases/spots/dtos/spot.dto";

// mesmos valores do enum OrderStatus do backend
export type OrderStatus = 'NEW' | 'PREPARING' | 'READY' | 'DELIVERED';

// rótulo que aparece na tela para cada status
export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
    NEW: 'Novo',
    PREPARING: 'Em preparo',
    READY: 'Pronto',
    DELIVERED: 'Entregue',
}

// lista dos status na ordem (usada no select e nas colunas do Kanban)
export const ORDER_STATUS_LIST: OrderStatus[] = ['NEW', 'PREPARING', 'READY', 'DELIVERED'];

export interface OrderItemDTO {
    id: string;
    product: ProductDTO;
    quantity: number;
    price: string | number;
    subtotal: string | number;
}

export interface OrderDTO {
    id: string;
    createdAt: string;
    total: string | number;
    status: OrderStatus;
    items: OrderItemDTO[];
    // vem preenchida na rota /orders (usada no Kanban)
    guestCheck?: {
        id: string;
        status: 'OPENED' | 'CLOSED';
        spot: SpotDTO;
    };
}
