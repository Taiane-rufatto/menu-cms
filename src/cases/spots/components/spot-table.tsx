import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import type { SpotDTO } from "../dtos/spot.dto";

interface SpotTableProps {
    spots: SpotDTO[];
    onEdit: (spot: SpotDTO) => void;
    onDelete: (spot: SpotDTO) => void;
}

export function SpotTable({ spots, onEdit, onDelete }: SpotTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Situação</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {spots.map((spot) => (
                    <TableRow key={spot.id}>
                        <TableCell className="font-medium">{spot.name}</TableCell>
                        <TableCell>
                            {spot.active ? (
                                <Badge>Ativa</Badge>
                            ) : (
                                <Badge variant="secondary">Inativa</Badge>
                            )}
                        </TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => onEdit(spot)}>
                                <Pencil />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => onDelete(spot)}>
                                <Trash2 className="text-destructive" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
