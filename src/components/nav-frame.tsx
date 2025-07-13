import { ReactElement } from "react";
import {
    BookHalf,
    ClipboardCheck,
    Compass,
    Grid3x3Gap,
    House,
    People,
    PersonLinesFill,
    ChevronLeft,
    ChevronRight,
} from "react-bootstrap-icons";
import { sessionManager } from "../utils/session-manager";
import { ContentOpts } from "../common/types";

interface NavFrameProps {
    set_content: React.Dispatch<React.SetStateAction<ContentOpts>>;
    collapsed: boolean;
    toggleCollapsed: () => void;
}

interface Navigation {
    name: string;
    value: ContentOpts;
    icon: ReactElement;
    submenus: Navigation[] | null;
    accessible: boolean;
    order: number;
}

export const NavFrame: React.FC<NavFrameProps> = ({ set_content, collapsed, toggleCollapsed }) => {
    const groups = sessionManager.getGroups();

    const navigation: Navigation[] = [
        { name: "Home", value: "home", icon: <House size={24} />, submenus: null, accessible: true, order: 100 },
        { name: "Requests", value: "requests", icon: <ClipboardCheck size={24} />, submenus: null, accessible: groups.includes("chapter_manager") || groups.includes("fullfiller"), order: 200 },
        { name: "People", value: "people", icon: <People size={24} />, submenus: null, accessible: ["chapter_manager", "member_admin", "exoneree_admin"].some((r) => groups.includes(r)), order: 300 },
        { name: "Knowledge", value: "knowledge", icon: <BookHalf size={24} />, submenus: null, accessible: groups.includes("chapter_manager") || groups.includes("knowledge_admin"), order: 400 },
        { name: "Contacts", value: "contacts", icon: <PersonLinesFill size={24} />, submenus: null, accessible: groups.includes("chapter_manager") || groups.includes("contact_admin"), order: 500 },
        { name: "Portal", value: "portal", icon: <Grid3x3Gap size={24} />, submenus: null, accessible: true, order: 600 },
    ];

    return (
        <div
            className="bg-dark text-white p-3 position-fixed top-0 start-0  sidebar"
            style={{
                height: "100vh",
                width: "250px",
                zIndex: 1040,
                transition: "transform 0.4s ease",
                transform: collapsed ? "translateX(-100%)" : "translateX(0)",
            }}
        >
            {/* Only show toggle when NOT collapsed */}
            {!collapsed && (
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center text-white text-decoration-none">
                        <Compass size={30} color="skyblue" className="me-2" />
                        <h2 className="m-0 d-flex align-items-center">Apps</h2>
                    </div>
                    <div
                        role="button"
                        style={{
                            cursor: "pointer",
                            backgroundColor: "#343a40",
                            padding: "4px 6px",
                            borderRadius: "4px",
                        }}
                        onClick={toggleCollapsed}
                    >
                        <ChevronLeft size={18} />
                    </div>
                </div>
            )}

            {!collapsed && (
                <>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto">
                        {navigation
                            .filter((nav) => nav.accessible)
                            .sort((a, b) => a.order - b.order)
                            .map((nav) => (
                                <li key={nav.value} className="nav-item">
                                    <a
                                        className="nav-link d-flex align-items-center text-white"
                                        role="button"
                                        onClick={() => set_content(nav.value)}
                                    >
                                        <span className="me-2">{nav.icon}</span>
                                        {nav.name}
                                    </a>
                                </li>
                            ))}
                    </ul>
                    <hr />
                </>
            )}
        </div>
    );
};
