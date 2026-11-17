import { useCategories } from "@/cases/categories/hooks/use-category";
import { CategoryTable } from "@/cases/categories/components/category-table";
import { QueryState } from "@/components/shared/query-state";

export function CategoryPage() {

    const { data: categories = [], isLoading, isError } = useCategories();

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold uppercase">Categorias</h2>

            <QueryState
                isLoading={isLoading}
                isError={isError}
                isEmpty={categories.length === 0}
                emptyMessage="Nenhuma categoria cadastrada."
            />

            {categories.length > 0 && (
                <CategoryTable
                    categories={categories}
                    onEdit={() => {}}
                    onDelete={() => {}}
                />
            )}
        </div>
    )
}
