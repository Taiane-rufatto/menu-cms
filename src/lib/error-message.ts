import axios from "axios";

// pega a mensagem de erro que o NestJS devolve (ex.: "Categoria não encontrada")
export function getErrorMessage(error: unknown) {
    if (axios.isAxiosError(error)) {
        // erro 500: o NestJS devolve "Internal server error" (em inglês).
        // costuma acontecer ao excluir um registro que está sendo usado (ex.: categoria com produtos)
        if (error.response?.status === 500) {
            return 'Erro no servidor. Se for uma exclusão, verifique se o registro não está sendo usado em outro cadastro.';
        }

        if (error.response?.data?.message) {
            const message = error.response.data.message;
            // o class-validator devolve uma lista de mensagens
            return Array.isArray(message) ? message.join(', ') : message;
        }
    }
    return 'Não foi possível concluir a operação.';
}
