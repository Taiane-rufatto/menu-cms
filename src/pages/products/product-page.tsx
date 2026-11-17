import { useState } from "react";
import { Plus } from "lucide-react";
import { useCreateProduct, useDeleteProduct, useProducts, useUpdateProduct } from "@/cases/products/hooks/use-product";
import { ProductTable } from "@/cases/products/components/product-table";
import { CategoryFilter } from "@/cases/products/components/category-filter";
import { ProductFormDialog } from "@/cases/products/components/product-form-dialog";
import type { ProductDTO, ProductFormDTO } from "@/cases/products/dtos/product.dto";
import { QueryState } from "@/components/shared/query-state";
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog";
import { FeedbackAlert, type Feedback } from "@/components/shared/feedback-alert";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/error-message";

export function ProductPage() {

    // categoria escolhida no filtro ('all' = sem filtro)
    const [categoryId, setCategoryId] = useState('all');

    const { data: products = [], isLoading, isError } = useProducts(
        categoryId === 'all' ? undefined : categoryId
    );
    const createProduct = useCreateProduct();
    const updateProduct = useUpdateProduct();
    const deleteProduct = useDeleteProduct();

    const [formOpen, setFormOpen] = useState(false);
    const [editing, setEditing] = useState<ProductDTO | null>(null);
    const [deleting, setDeleting] = useState<ProductDTO | null>(null);
    const [feedback, setFeedback] = useState<Feedback | null>(null);

    function openNew() {
        setEditing(null);
        setFormOpen(true);
    }

    function openEdit(product: ProductDTO) {
        setEditing(product);
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

    function handleSave(data: ProductFormDTO) {
        if (editing) {
            updateProduct.mutate({ id: editing.id, product: data }, {
                onSuccess: () => showSuccess('Produto atualizado.'),
                onError: showError,
            });
        } else {
            createProduct.mutate(data, {
                onSuccess: () => showSuccess('Produto cadastrado.'),
                onError: showError,
            });
        }
    }

    // só exclui depois que o usuário confirma no diálogo
    function handleConfirmDelete() {
        if (!deleting) return;

        deleteProduct.mutate(deleting.id, {
            onSuccess: () => setFeedback({ type: 'success', message: 'Produto excluído.' }),
            onError: (error) => setFeedback({ type: 'error', message: getErrorMessage(error) }),
        });
        setDeleting(null);
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold uppercase">Produtos</h2>
                <Button onClick={openNew}><Plus /> Novo produto</Button>
            </div>

            <FeedbackAlert feedback={feedback} />

            <CategoryFilter value={categoryId} onChange={setCategoryId} />

            <QueryState
                isLoading={isLoading}
                isError={isError}
                isEmpty={products.length === 0}
                emptyMessage="Nenhum produto encontrado."
            />

            {products.length > 0 && (
                <ProductTable
                    products={products}
                    onEdit={openEdit}
                    onDelete={setDeleting}
                />
            )}

            {formOpen && (
                <ProductFormDialog
                    product={editing}
                    isSaving={createProduct.isPending || updateProduct.isPending}
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
