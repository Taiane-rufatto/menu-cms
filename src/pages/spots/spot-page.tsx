import { useState } from "react";
import { Plus } from "lucide-react";
import { useCreateSpot, useDeleteSpot, useSpots, useUpdateSpot } from "@/cases/spots/hooks/use-spot";
import { SpotTable } from "@/cases/spots/components/spot-table";
import { SpotFormDialog } from "@/cases/spots/components/spot-form-dialog";
import type { SpotDTO, SpotFormDTO } from "@/cases/spots/dtos/spot.dto";
import { QueryState } from "@/components/shared/query-state";
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog";
import { FeedbackAlert, type Feedback } from "@/components/shared/feedback-alert";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/error-message";

export function SpotPage() {

    const { data: spots = [], isLoading, isError } = useSpots();
    const createSpot = useCreateSpot();
    const updateSpot = useUpdateSpot();
    const deleteSpot = useDeleteSpot();

    const [formOpen, setFormOpen] = useState(false);
    const [editing, setEditing] = useState<SpotDTO | null>(null);
    const [deleting, setDeleting] = useState<SpotDTO | null>(null);
    const [feedback, setFeedback] = useState<Feedback | null>(null);

    function openNew() {
        setEditing(null);
        setFormOpen(true);
    }

    function openEdit(spot: SpotDTO) {
        setEditing(spot);
        setFormOpen(true);
    }

    function showSuccess(message: string) {
        setFeedback({ type: 'success', message });
        setFormOpen(false);
    }

    function showError(error: unknown) {
        setFeedback({ type: 'error', message: getErrorMessage(error) });
        setFormOpen(false);
    }

    function handleSave(data: SpotFormDTO) {
        if (editing) {
            updateSpot.mutate({ id: editing.id, spot: data }, {
                onSuccess: () => showSuccess('Mesa atualizada.'),
                onError: showError,
            });
        } else {
            createSpot.mutate(data, {
                onSuccess: () => showSuccess('Mesa cadastrada.'),
                onError: showError,
            });
        }
    }

    // só exclui depois que o usuário confirma no diálogo
    function handleConfirmDelete() {
        if (!deleting) return;

        deleteSpot.mutate(deleting.id, {
            onSuccess: () => setFeedback({ type: 'success', message: 'Mesa excluída.' }),
            onError: (error) => setFeedback({ type: 'error', message: getErrorMessage(error) }),
        });
        setDeleting(null);
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold uppercase">Mesas</h2>
                <Button onClick={openNew}><Plus /> Nova mesa</Button>
            </div>

            <FeedbackAlert feedback={feedback} />

            <QueryState
                isLoading={isLoading}
                isError={isError}
                isEmpty={spots.length === 0}
                emptyMessage="Nenhuma mesa cadastrada."
            />

            {spots.length > 0 && (
                <SpotTable
                    spots={spots}
                    onEdit={openEdit}
                    onDelete={setDeleting}
                />
            )}

            {formOpen && (
                <SpotFormDialog
                    spot={editing}
                    isSaving={createSpot.isPending || updateSpot.isPending}
                    onClose={() => setFormOpen(false)}
                    onSubmit={handleSave}
                />
            )}

            <ConfirmDeleteDialog
                open={deleting !== null}
                itemName={deleting?.name ?? ''}
                onCancel={() => setDeleting(null)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    )
}
