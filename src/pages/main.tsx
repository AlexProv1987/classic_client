import { useState } from "react";
import { ContentOpts } from "../common/types";
import { NavFrame } from "../components/nav-frame";
import { ContentFrame } from "../components/content-frame";
import { ChevronRight, PersonArmsUp } from "react-bootstrap-icons";
import { NavBar } from "../components/nav";

export const Main: React.FC = () => {
    const [currentContent, setCurrentContent] = useState<ContentOpts>("contacts");
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="d-flex">
            <NavFrame
                set_content={setCurrentContent}
                collapsed={sidebarCollapsed}
                toggleCollapsed={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {sidebarCollapsed && (
                <div
                    style={{
                        position: "fixed",
                        top: "20px",
                        left: "0px",
                        zIndex: 1050,
                        backgroundColor: "#343a40",
                        padding: "6px 8px",
                        borderTopRightRadius: "4px",
                        borderBottomRightRadius: "4px",
                        cursor: "pointer",
                    }}
                    onClick={() => setSidebarCollapsed(false)}
                >
                    <ChevronRight size={20} color="white" />
                </div>
            )}

            <div
                className="content-area"
                style={{
                    flexGrow: 1,
                    marginLeft: sidebarCollapsed ? "0" : "250px",
                    transition: "margin-left 0.4s ease",
                }}
            >
                <ContentFrame value={currentContent} />
            </div>
        </div>
    );
}