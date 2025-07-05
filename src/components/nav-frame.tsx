import { useEffect, useState } from "react";
import { sessionManager } from "../utils/session-manager";
import logo from '../logo.svg'
import { ContentOpts } from "../common/types";

interface NavFrameProps {
    set_content: React.Dispatch<React.SetStateAction<ContentOpts>>;
};

interface Navigation {
    name: string,
    value: ContentOpts,
    icon: string,
    submenus: Navigation[] | null,
    accessible: boolean,
    order: number,
}

export const NavFrame = (props: NavFrameProps) => {
    const [navigation, setNavigation] = useState<Navigation[]>([
        { name: 'Home', value: 'home', icon: 'test', submenus: null, accessible: false, order: 100 },
        { name: 'Requests', value: 'requests', icon: 'test', submenus: null, accessible: false, order: 200 },
        { name: 'People', value: 'people', icon: 'test', submenus: null, accessible: false, order: 300 },
        { name: 'Knowledge', value: 'knowledge', icon: 'test', submenus: null, accessible: false, order: 400 },
        { name: 'Contacts', value: 'contacts', icon: 'test', submenus: null, accessible: false, order: 500 },
         { name: 'Portal', value: 'portal', icon: 'test', submenus: null, accessible: false, order: 500 },
    ])

    useEffect(() => {
        setNavigation(setUpNavigation())
        //get focused knowledge base based on chapter in session
    }, []);

    const setUpNavigation = (): Navigation[] => {
        const updatedNavigation = navigation.map((item) => {
            const updatedNavigation = { ...item };
            const groups = sessionManager.getGroups();
            switch (updatedNavigation.name) {
                case 'requests':
                    if (
                        (groups.includes('chapter_manager')) ||
                        groups.includes('fullfiller')
                    ) {
                        updatedNavigation.accessible = true;
                    }
                    break;
                case 'people':
                    if ((groups.includes('chapter_manager')) ||
                        groups.includes('member_admin') ||
                        groups.includes('exoneree_admin')
                    ) {
                        updatedNavigation.accessible = true;
                    }
                    break;
                case 'knowledge':
                    if (
                        (groups.includes('chapter_manager')) ||
                        groups.includes('knowledge_admin')
                    ) {
                        updatedNavigation.accessible = true;
                    }
                    break;
                case 'contacts':
                    if (
                        (groups.includes('chapter_manager')) ||
                        groups.includes('contact_admin')
                    ) {
                        updatedNavigation.accessible = true;
                    }
                    break;
                default:
                    break;
            }
            return updatedNavigation;
        });
        return updatedNavigation;
    }

    return (
        <div className="d-flex flex-column justify-content-between" style={{ height: '100vh' }}>
            <div>
                <a className="pt-3 d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-4"> <img src={logo} alt="Bootstrap" width="40" height="40"/>Navigator</span>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    {navigation
                        .sort((a, b) => a.order - b.order)
                        .map((nav) => {
                            return (
                                <li key={nav.value} className="nav-item">
                                    <a
                                        className="nav-link d-flex justify-content-between align-items-center text-white"
                                        role="button"
                                        onClick={() => props.set_content(nav.value)}>
                                        {nav.name}
                                    </a>
                                </li>
                            )
                        })}
                </ul>
                <hr />
            </div>
        </div>
    )
}