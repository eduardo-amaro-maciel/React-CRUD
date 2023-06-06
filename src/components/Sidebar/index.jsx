import { memo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BiBuilding, BiUser, } from "react-icons/bi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

const menuItem = [
    {
        path: '/users',
        name: 'Usuarios',
        icon: <BiUser />
    },
    {
        path: '/companies',
        name: 'Empresas',
        icon: <BiBuilding />
    },
    {
        path: '/all',
        name: 'Usuarios e Empresas',
        icon: <AiOutlineUsergroupAdd />
    },
]

export default memo(function Sidebar({ children }) {
    const location = useLocation();
    const activeMenuItem = menuItem.find(item => item.path === location.pathname);
    const activeMenuName = activeMenuItem ? activeMenuItem.name : '';

    return (
        <div className="flex w-screen">
            <div className="relative select-none bg-primary">
                <div className="w-80 text-sm h-screen overflow-y-scroll overflow-x-hidden scroll-2 bg-shadow flex flex-col">
                    <div className="py-6">
                        <img src="/img/logo.png" alt="Logo Contato Seguro - Canal de Ética" className="max-w-[190px] w-full m-auto" />
                    </div>
                    <div className="flex flex-auto flex-col gap-3">
                    {
                        menuItem.map((item, index) => (
                            <NavLink to={item.path} key={index} className={({ isActive, isPending }) => "flex items-center gap-3 px-8 py-1 border-l-[5px] " + (isActive ? "border-l-black" : "border-l-transparent")}>
                                {({ isActive, isPending }) => (
                                    <>
                                        <div className={"text-xl " + (isActive ? "text-black font-extrabold " : "text-gray")}>
                                            {item.icon}
                                        </div>
                                        <div className={"text-base " + (isActive ? "text-black font-extrabold" : "text-gray")}>
                                            {item.name}
                                        </div>
                                    </>
                                )}
                            </NavLink>
                        ))
                    }
                    </div>
                </div>
            </div>
            <div className="scroll-1 h-screen overflow-y-scroll duration-300 bg-gray-50 w-full p-12">
                <h1 className="mb-10 font-bold text-4xl">{activeMenuName}</h1>
                <main className="bg-primary p-5 rounded-xl">{children}</main>
            </div>
        </div>
    )
})
