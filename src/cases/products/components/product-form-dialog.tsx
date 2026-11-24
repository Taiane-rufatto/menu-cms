import { useState } from "react";
import { useCategories } from "@/cases/categories/hooks/use-category";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ProductDTO, ProductFormDTO } from "../dtos/product.dto";

interface ProductFormDialogProps {
    product: ProductDTO | null; // null = cadastro, preenchido = edição
    isSaving: boolean;
    onClose: () => void;
    onSubmit: (data: ProductFormDTO) => void;
}

export function ProductFormDialog({ product, isSaving, onClose, onSubmit }: ProductFormDialogProps) {

    // categorias do select vêm da API
    const { data: categories = [] } = useCategories();

    const [name, setName] = useState(product?.name ?? '');
    const [description, setDescription] = useState(product?.description ?? '');
    const [price, setPrice] = useState(product ? String(product.price) : '');
    const [picture, setPicture] = useState(product?.picture ?? '');
    const [categoryId, setCategoryId] = useState(product?.category?.id ?? '');
    const [active, setActive] = useState(product?.active ?? true);
    const [vegetarian, setVegetarian] = useState(product?.vegetarian ?? false);
    const [isNew, setIsNew] = useState(product?.isNew ?? false);
    const [error, setError] = useState('');

    // só as categorias ativas: o backend não aceita produto em categoria inativa
    const categoryItems = categories
        .filter((category) => category.active)
        .map((category) => ({ value: category.id, label: category.name }));

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        // validação mínima antes de enviar para a API
        if (name.trim() === '') {
            setError('O nome é obrigatório.');
            return;
        }
        if (!(Number(price) > 0)) {
            setError('O preço deve ser maior que zero.');
            return;
        }
        if (categoryId === '') {
            setError('Escolha uma categoria.');
            return;
        }

        onSubmit({
            name: name.trim(),
            description: description.trim(),
            price: Number(price),
            picture: picture.trim() || undefined,
            categoryId,
            active,
            vegetarian,
            isNew,
        });
    }

    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{product ? 'Editar produto' : 'Novo produto'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Nome *</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="price">Preço (R$) *</Label>
                            <Input id="price" type="number" step="0.01" min="0" value={price}
                                onChange={(e) => setPrice(e.target.value)} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Categoria *</Label>
                            <Select items={categoryItems} value={categoryId}
                                onValueChange={(value) => setCategoryId(value ?? '')}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categoryItems.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="picture">URL da imagem</Label>
                        <Input id="picture" value={picture} onChange={(e) => setPicture(e.target.value)} placeholder="https://..." />
                    </div>

                    <div className="flex gap-6">
                        <Label className="flex items-center gap-2">
                            <Checkbox checked={active} onCheckedChange={(checked) => setActive(checked)} />
                            Ativo
                        </Label>
                        <Label className="flex items-center gap-2">
                            <Checkbox checked={vegetarian} onCheckedChange={(checked) => setVegetarian(checked)} />
                            Vegetariano
                        </Label>
                        <Label className="flex items-center gap-2">
                            <Checkbox checked={isNew} onCheckedChange={(checked) => setIsNew(checked)} />
                            Novidade
                        </Label>
                    </div>

                    {error && <p className="text-sm text-destructive">{error}</p>}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
                        <Button type="submit" disabled={isSaving}>
                            {isSaving ? 'Salvando...' : 'Salvar'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
