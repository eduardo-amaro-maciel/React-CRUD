import Sidebar from "../Sidebar"

export default function LayoutDashBoard({ children }) {

    return (
        <Sidebar>
            {children}
        </Sidebar>
    )
} 