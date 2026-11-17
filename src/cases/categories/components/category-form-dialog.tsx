import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CategoryDTO, CategoryFormDTO } from "../dtos/category.dto";

interface CategoryFormDialogProps {
    category: CategoryDTO | null; // null = cadastro, preenchido = edição
    isSaving: boolean;
    onClose: () => void;
    onSubmit: (data: CategoryFormDTO) => void;
}

// o diálogo só é montado quando abre, então o useState já começa com os dados da categoria
export function CategoryFormDialog({ category, isSaving, onClose, onSubmit }: CategoryFormDialogProps) {

    const [name, setName] = useState(category?.name ?? '');
    const [icon, setIcon] = useState(category?.icon ?? '');
    const [displayOrder, setDisplayOrder] = useState(String(category?.displayOrder ?? 0));
    const [active, setActive] = useState(category?.active ?? true);
    const [error, setError] = useState('');

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault(); // não deixa a página recarregar

        // validação mínima antes de enviar para a API
        if (name.trim() === '') {
            setError('O nome é obrigatório.');
            return;
        }
        if (Number(displayOrder) < 0) {
            setError('A ordem não pode ser negativa.');
            return;
        }

        onSubmit({
            name: name.trim(),
            icon: icon.trim() || null,
            displayOrder: Number(displayOrder),
            active,
        });
    }

    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{category ? 'Editar categoria' : 'Nova categoria'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Nome *</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="icon">URL do ícone</Label>
                        <Input id="icon" value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="https://..." />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="displayOrder">Ordem de exibição</Label>
                        <Input id="displayOrder" type="number" min={0} value={displayOrder}
                            onChange={(e) => setDisplayOrder(e.target.value)} />
                    </div>

                    <Label className="flex items-center gap-2">
                        <Checkbox checked={active} onCheckedChange={(checked) => setActive(checked)} />
                        Ativa
                    </Label>

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
