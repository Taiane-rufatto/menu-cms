import { cn } from "@/lib/utils"
import { NavLink } from "react-router-dom"
import { ClipboardList, LayoutGrid, MapPin, Utensils } from "lucide-react"

// itens do menu de navegação entre as áreas do CMS
const menuItems = [
    { to: "/categories", label: "Categorias", icon: LayoutGrid },
    { to: "/products", label: "Produtos", icon: Utensils },
    { to: "/spots", label: "Mesas", icon: MapPin },
    { to: "/guest-checks", label: "Comandas", icon: ClipboardList },
]

export function MenuNav() {
    return (
        <nav className="w-full">
            <ul className="overflow-hidden rounded-xl border border-border/70">
                {menuItems.map((item) => (
                    <li key={item.to}>
                        <NavLink
                            to={item.to}
                            className={({ isActive }) => cn(
                                'flex w-full items-center gap-3 px-5 py-4',
                                'font-menu text-lg font-semibold uppercase tracking-tight',
                                'rounded-xl border border-transparent transition-colors duration-200',
                                'hover:text-[#B86A2C]',
                                isActive
                                    ? ['border-[#B86A2C]', 'bg-primary/5', 'text-[#B86A2C]']
                                    : 'text-foreground'
                            )}
                        >
                            <item.icon className="size-6" />
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
