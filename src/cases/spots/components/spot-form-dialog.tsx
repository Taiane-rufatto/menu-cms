import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SpotDTO, SpotFormDTO } from "../dtos/spot.dto";

interface SpotFormDialogProps {
    spot: SpotDTO | null; // null = cadastro, preenchido = edição
    isSaving: boolean;
    onClose: () => void;
    onSubmit: (data: SpotFormDTO) => void;
}

export function SpotFormDialog({ spot, isSaving, onClose, onSubmit }: SpotFormDialogProps) {

    const [name, setName] = useState(spot?.name ?? '');
    const [active, setActive] = useState(spot?.active ?? true);
    const [error, setError] = useState('');

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (name.trim() === '') {
            setError('O nome é obrigatório.');
            return;
        }

        onSubmit({ name: name.trim(), active });
    }

    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{spot ? 'Editar mesa' : 'Nova mesa'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Nome *</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)}
                            maxLength={60} placeholder="Ex.: Mesa 01" />
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
