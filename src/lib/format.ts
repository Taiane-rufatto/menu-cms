// formata um valor em reais: 12.5 -> "R$ 12,50"
export function formatPrice(value: string | number) {
    return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// formata data e hora: "17/11/2026, 14:30"
export function formatDateTime(value: string) {
    return new Date(value).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
}
