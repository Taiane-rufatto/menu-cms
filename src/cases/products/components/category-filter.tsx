import { useCategories } from "@/cases/categories/hooks/use-category";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategoryFilterProps {
    value: string; // 'all' = todas as categorias
    onChange: (categoryId: string) => void;
}

// select de filtro alimentado pelas categorias da API
export function CategoryFilter({ value, onChange }: CategoryFilterProps) {

    const { data: categories = [] } = useCategories();

    // lista usada pelo Select para mostrar o nome (label) do item escolhido
    const items = [
        { value: 'all', label: 'Todas as categorias' },
        ...categories.map((category) => ({ value: category.id, label: category.name })),
    ];

    return (
        <Select items={items} value={value} onValueChange={(newValue) => onChange(newValue ?? 'all')}>
            <SelectTrigger className="w-60">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
