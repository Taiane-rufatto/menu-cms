import axios from "axios";

// pega a mensagem de erro que o NestJS devolve (ex.: "Categoria não encontrada")
export function getErrorMessage(error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
        const message = error.response.data.message;
        // o class-validator devolve uma lista de mensagens
        return Array.isArray(message) ? message.join(', ') : message;
    }
    return 'Não foi possível concluir a operação.';
}
