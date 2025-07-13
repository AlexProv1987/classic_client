import { PersonBadge, PersonFill, PersonRaisedHand } from "react-bootstrap-icons";
import { PeopleContent } from "../ts/types";
import { Config } from "../../../config";
import { sessionManager } from "../../../utils/session-manager";
import { NavItem } from "../../../common/interfaces";
import { SubNavWrapper } from "../../common/sub-nav-wrapper";

const NAV_ITEMS: NavItem<PeopleContent>[] = [
    {
        key: 'users',
        icon: <PersonFill size={24} className="text-warning" />,
        label: Config.USER_TYPE_PLURAL,
        requiredGroups: ['chapter_manager', 'exoneree_admin'],
    },
    {
        key: 'members',
        icon: <PersonBadge size={24} className="text-success" />,
        label: Config.MEMBER_TYPE_PLURAL,
        requiredGroups: ['member_admin', 'chapter_manager'],
    },
    {
        key: 'future_members',
        icon: <PersonRaisedHand size={24} className="text-danger" />,
        label: Config.FUTURE_MEMBER_TYPE_PLURAL,
        requiredGroups: ['member_admin', 'chapter_manager'],
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
        <SubNavWrapper
            data={NAV_ITEMS}
            renderOpts={(data) => (
                <ul className="nav flex-row gap-3">
                    {data
                        .filter(item => item.requiredGroups.some(group => userGroups.includes(group)))
                        .map(item => (
                            <li className="nav-item" key={item.key}>
                                <a
                                    className="nav-link"
                                    onClick={() => set_content(item.key)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {item.icon} {item.label}
                                </a>
                            </li>
                        ))}
                </ul>
            )}
        />
    );
}