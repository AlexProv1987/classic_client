import React from "react";

import { Book, FileEarmarkBreak, FilePlus } from "react-bootstrap-icons";
import { NavItem } from "../../../common/interfaces";
import { SubNavWrapper } from "../../common/sub-nav-wrapper";
import { KnowledgeContent } from "../ts/types";

const NAV_ITEMS: NavItem<KnowledgeContent>[] = [
    {
        key: 'kb',
        icon: <Book size={24} className="text-primary" />,
        label: 'Knowledge Bases',
        requiredGroups: [],
    },
    {
        key: 'kb_articles',
        icon: <FileEarmarkBreak size={24} className="text-secondary" />,
        label: 'Knowledge Articles',
        requiredGroups: [],
    },
    {
        key: 'add_knowledge_base_article',
        icon: <FilePlus size={24} className="text-success" />,
        label: 'Add Article',
        requiredGroups: [],
    },
];

interface KnowledgeSubNavProps {
    filter_setter: React.Dispatch<React.SetStateAction<KnowledgeContent>>,
}

export function KnowledgeSubNav({
    filter_setter
}: KnowledgeSubNavProps) {

    return (
        <SubNavWrapper
            data={NAV_ITEMS}
            renderOpts={(data) => (
                <ul className="nav flex-row gap-3">
                    {data.map(item => (
                        <li className="nav-item" key={item.key}>
                            <a
                                className="nav-link text-muted"
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
