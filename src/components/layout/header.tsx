import logomarca from "@/assets/logomarca.svg";

export function Header() {

    return (
        <header className="bg-transparent">
            <div className="mx-auto flex w-full items-center justify-between px-6 py-4">
                <img src={logomarca} className="h-auto w-48" />
                <span className="font-menu text-lg font-semibold uppercase text-brand">
                    Painel do Restaurante
                </span>
            </div>
        </header>
    )
}
