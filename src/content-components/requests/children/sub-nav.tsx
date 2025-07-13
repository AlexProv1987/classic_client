import React from "react";
import { FilterType } from "../ts/type"
import { InboxFill, PersonCheckFill, PersonFillX } from "react-bootstrap-icons";
import { NavItem } from "../../../common/interfaces";
import { SubNavWrapper } from "../../common/sub-nav-wrapper";

const NAV_ITEMS: NavItem<FilterType>[] = [
    {
        key: 'all',
        icon: <InboxFill size={24} className="text-warning" />,
        label: 'Open',
        requiredGroups: [],
    },
    {
        key: 'with',
        icon: <PersonCheckFill size={24} className="text-success" />,
        label: 'Assigned',
        requiredGroups: [],
    },
    {
        key: 'without',
        icon: <PersonFillX size={24} className="text-danger" />,
        label: 'UnAssigned',
        requiredGroups: [],
    },
];

interface RequestSubNavProps {
    filter_setter: React.Dispatch<React.SetStateAction<FilterType>>,
}

export function RequestSubNav({
    filter_setter
}: RequestSubNavProps) {

    return (
        <SubNavWrapper
            data={NAV_ITEMS}
            renderOpts={(data) => (
                <ul className="nav flex-row gap-3">
                    {data.map(item => (
                        <li className="nav-item" key={item.key}>
                            <a
                                className="nav-link"
                                onClick={() => filter_setter(item.key)}
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
