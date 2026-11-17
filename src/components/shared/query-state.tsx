import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Inbox, Loader2 } from "lucide-react";

interface QueryStateProps {
    isLoading: boolean;
    isError: boolean;
    isEmpty: boolean;
    emptyMessage: string;
}

// mostra o estado da leitura: carregando, erro ou lista vazia.
// retorna null quando há dados, e aí a tela mostra a tabela normalmente.
export function QueryState({ isLoading, isError, isEmpty, emptyMessage }: QueryStateProps) {

    if (isLoading) {
        return (
            <Alert>
                <Loader2 className="animate-spin" />
                <AlertTitle>Carregando...</AlertTitle>
            </Alert>
        )
    }

    if (isError) {
        return (
            <Alert variant="destructive">
                <AlertCircle />
                <AlertTitle>Erro ao carregar os dados</AlertTitle>
                <AlertDescription>Verifique se a API está rodando e tente novamente.</AlertDescription>
            </Alert>
        )
    }

    if (isEmpty) {
        return (
            <Alert>
                <Inbox />
                <AlertTitle>{emptyMessage}</AlertTitle>
            </Alert>
        )
    }

    return null;
}
