import { useState } from "react";
import { Plus } from "lucide-react";
import { useCategories, useCreateCategory, useDeleteCategory, useUpdateCategory } from "@/cases/categories/hooks/use-category";
import { CategoryTable } from "@/cases/categories/components/category-table";
import { CategoryFormDialog } from "@/cases/categories/components/category-form-dialog";
import type { CategoryDTO, CategoryFormDTO } from "@/cases/categories/dtos/category.dto";
import { QueryState } from "@/components/shared/query-state";
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog";
import { FeedbackAlert, type Feedback } from "@/components/shared/feedback-alert";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/error-message";

export function CategoryPage() {

    const { data: categories = [], isLoading, isError } = useCategories();
    const createCategory = useCreateCategory();
    const updateCategory = useUpdateCategory();
    const deleteCategory = useDeleteCategory();

    const [formOpen, setFormOpen] = useState(false);
    const [editing, setEditing] = useState<CategoryDTO | null>(null);
    const [deleting, setDeleting] = useState<CategoryDTO | null>(null);
    const [feedback, setFeedback] = useState<Feedback | null>(null);

    function openNew() {
        setEditing(null);
        setFormOpen(true);
    }

    function openEdit(category: CategoryDTO) {
        setEditing(category);
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

    function handleSave(data: CategoryFormDTO) {
        if (editing) {
            updateCategory.mutate({ id: editing.id, category: data }, {
                onSuccess: () => showSuccess('Categoria atualizada.'),
                onError: showError,
            });
        } else {
            createCategory.mutate(data, {
                onSuccess: () => showSuccess('Categoria cadastrada.'),
                onError: showError,
            });
        }
    }

    // só exclui depois que o usuário confirma no diálogo
    function handleConfirmDelete() {
        if (!deleting) return;

        deleteCategory.mutate(deleting.id, {
            onSuccess: () => setFeedback({ type: 'success', message: 'Categoria excluída.' }),
            onError: (error) => setFeedback({ type: 'error', message: getErrorMessage(error) }),
        });
        setDeleting(null);
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold uppercase">Categorias</h2>
                <Button onClick={openNew}><Plus /> Nova categoria</Button>
            </div>

            <FeedbackAlert feedback={feedback} />

            <QueryState
                isLoading={isLoading}
                isError={isError}
                isEmpty={categories.length === 0}
                emptyMessage="Nenhuma categoria cadastrada."
            />

            {categories.length > 0 && (
                <CategoryTable
                    categories={categories}
                    onEdit={openEdit}
                    onDelete={setDeleting}
                />
            )}

            {formOpen && (
                <CategoryFormDialog
                    category={editing}
                    isSaving={createCategory.isPending || updateCategory.isPending}
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
