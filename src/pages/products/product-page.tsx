import { useState } from "react";
import { useProducts } from "@/cases/products/hooks/use-product";
import { ProductTable } from "@/cases/products/components/product-table";
import { CategoryFilter } from "@/cases/products/components/category-filter";
import { QueryState } from "@/components/shared/query-state";

export function ProductPage() {

    // categoria escolhida no filtro ('all' = sem filtro)
    const [categoryId, setCategoryId] = useState('all');

    const { data: products = [], isLoading, isError } = useProducts(
        categoryId === 'all' ? undefined : categoryId
    );

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold uppercase">Produtos</h2>
            </div>

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
                    onEdit={() => {}}
                    onDelete={() => {}}
                />
            )}
        </div>
    )
}
