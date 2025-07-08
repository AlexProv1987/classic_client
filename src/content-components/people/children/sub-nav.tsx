import { PersonBadge, PersonFill, PersonRaisedHand } from "react-bootstrap-icons";
import { PeopleContent } from "../ts/types";
import { Config } from "../../../config";
import { sessionManager } from "../../../utils/session-manager";
import { PeopleNavItem } from "../ts/interfaces";

const NAV_ITEMS: PeopleNavItem[] = [
    {
        key: 'users',
        icon: <PersonFill size={24} />,
        label: Config.USER_TYPE_PLURAL,
        requiredGroups: ['chapter_manager', 'exoneree_admin'],
    },
    {
        key: 'members',
        icon: <PersonBadge size={24} />,
        label: Config.MEMBER_TYPE_PLURAL,
        requiredGroups: ['member_admin', 'chapter_manager'],
    },
    {
        key: 'future_members',
        icon: <PersonRaisedHand size={24} />,
        label: Config.FUTURE_MEMBER_TYPE_PLURAL,
        requiredGroups: ['member_admin','chapter_manager'],
    },
];

interface PeopleSubNavProps {
    set_content: React.Dispatch<React.SetStateAction<PeopleContent>>;
}

export function PeopleSubNav({
    set_content
}: PeopleSubNavProps) {
    const userGroups = sessionManager.getGroups();
    return (
        <nav className="navbar navbar-expand-lg secondary-nav">
            <div className="container-fluid d-flex justify-content-center align-items-center">
                <ul className="navbar-nav d-flex flex-row gap-3">
                    {NAV_ITEMS.filter(item => item.requiredGroups.some(group => userGroups.includes(group)))
                        .map(item => (
                            <li className="nav-item" key={item.key}>
                                <a className="nav-link" onClick={() => set_content(item.key)} style={{ cursor: 'pointer' }}>
                                    {item.icon} {item.label}
                                </a>
                            </li>
                        ))}
                </ul>
            </div>
        </nav>
    )
}