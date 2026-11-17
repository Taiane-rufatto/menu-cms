import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";

// mensagem mostrada depois de cadastrar, editar, excluir ou alterar status
export interface Feedback {
    type: 'success' | 'error';
    message: string;
}

interface FeedbackAlertProps {
    feedback: Feedback | null;
}

export function FeedbackAlert({ feedback }: FeedbackAlertProps) {

    if (!feedback) {
        return null;
    }

    if (feedback.type === 'error') {
        return (
            <Alert variant="destructive">
                <AlertCircle />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{feedback.message}</AlertDescription>
            </Alert>
        )
    }

    return (
        <Alert className="border-green-600 text-green-700">
            <CheckCircle2 />
            <AlertTitle>Sucesso</AlertTitle>
            <AlertDescription className="text-green-700">{feedback.message}</AlertDescription>
        </Alert>
    )
}
