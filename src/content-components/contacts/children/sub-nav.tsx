import { PersonFillAdd, PersonVcardFill } from "react-bootstrap-icons";
import { NavItem } from "../../../common/interfaces";
import { SubNavWrapper } from "../../common/sub-nav-wrapper";

const NAV_ITEMS: NavItem[] = [
    {
        key: 'all',
        icon: <PersonVcardFill size={24} className="text-warning" />,
        label: 'Contacts',
        requiredGroups: [],
    },
    {
        key: 'add',
        icon: <PersonFillAdd size={24} className="text-success" />,
        label: 'Add Contact',
        requiredGroups: [],
    },
];

interface ContactsSubNavProps {
    
}

export function ContactsSubNav({

}: ContactsSubNavProps) {

    return (
        <SubNavWrapper
            data={NAV_ITEMS}
            renderOpts={(data) => (
                <ul className="nav flex-row gap-3">
                    {data.map(item => (
                        <li className="nav-item" key={item.key}>
                            <a
                                className="nav-link"
                                onClick={() => {}}
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
