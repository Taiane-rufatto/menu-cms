import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmDeleteDialogProps {
    open: boolean;
    itemName: string;
    onCancel: () => void;
    onConfirm: () => void;
}

// diálogo de confirmação usado antes de excluir qualquer registro
export function ConfirmDeleteDialog({ open, itemName, onCancel, onConfirm }: ConfirmDeleteDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tem certeza que deseja excluir "{itemName}"? Essa ação não pode ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={onConfirm}>
                        Excluir
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
