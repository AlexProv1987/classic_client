import { PersonFillAdd } from "react-bootstrap-icons";
import { NavItem } from "../../../common/interfaces";
import { SubNavWrapper } from "../../common/sub-nav-wrapper";

const NAV_ITEMS: NavItem[] = [
    {
        key: 'add',
        icon: <PersonFillAdd size={24} className="text-success" />,
        label: 'Add Contact',
        requiredGroups: [],
    },
];

interface ContactsSubNavProps {
    handle_show: () => void
}

export function ContactsSubNav({
    handle_show
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
                                onClick={() => handle_show()}
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
