import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatPrice } from "@/lib/format";
import { ImageOff, Pencil, Trash2 } from "lucide-react";
import type { ProductDTO } from "../dtos/product.dto";

interface ProductTableProps {
    products: ProductDTO[];
    onEdit: (product: ProductDTO) => void;
    onDelete: (product: ProductDTO) => void;
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Imagem</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Indicadores</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell>
                            {product.picture ? (
                                <img src={product.picture} className="size-12 rounded-md object-cover" />
                            ) : (
                                <ImageOff className="size-8 text-muted-foreground" />
                            )}
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category?.name ?? 'Sem categoria'}</TableCell>
                        <TableCell>{formatPrice(product.price)}</TableCell>
                        <TableCell className="flex gap-1">
                            {product.vegetarian && <Badge className="bg-green-600 text-white">Vegetariano</Badge>}
                            {product.isNew && <Badge className="bg-blue-600 text-white">Novidade</Badge>}
                            {!product.active && <Badge variant="secondary">Inativo</Badge>}
                        </TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => onEdit(product)}>
                                <Pencil />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => onDelete(product)}>
                                <Trash2 className="text-destructive" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
