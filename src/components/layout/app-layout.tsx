import { Header } from "./header";
import { MenuNav } from "./menu-nav";
import { Outlet } from "react-router-dom";

export function AppLayout() {
    return (
        <>
            <Header />

            <div className="mx-auto flex w-full max-w-6xl gap-6 py-8 px-6">

                <aside className="flex w-56 shrink-0 flex-col gap-4">
                    <MenuNav />
                </aside>

                <main className="min-w-0 flex-1 border-t border-[#CFC7BA]/70 pt-6 pb-6">
                    <Outlet />
                </main>

            </div>
        </>
    )
}
