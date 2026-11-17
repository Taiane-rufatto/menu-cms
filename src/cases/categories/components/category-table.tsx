import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Utensils } from "lucide-react";
import type { CategoryDTO } from "../dtos/category.dto";

interface CategoryTableProps {
    categories: CategoryDTO[];
    onEdit: (category: CategoryDTO) => void;
    onDelete: (category: CategoryDTO) => void;
}

export function CategoryTable({ categories, onEdit, onDelete }: CategoryTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Ícone</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Ordem</TableHead>
                    <TableHead>Situação</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.map((category) => (
                    <TableRow key={category.id}>
                        <TableCell>
                            {category.icon ? (
                                <img src={category.icon} className="size-8" />
                            ) : (
                                <Utensils className="size-8 text-brand" />
                            )}
                        </TableCell>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{category.displayOrder}</TableCell>
                        <TableCell>
                            {category.active ? (
                                <Badge>Ativa</Badge>
                            ) : (
                                <Badge variant="secondary">Inativa</Badge>
                            )}
                        </TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => onEdit(category)}>
                                <Pencil />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => onDelete(category)}>
                                <Trash2 className="text-destructive" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
