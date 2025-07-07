import { MultiSelectOption } from "../../../common/interfaces";
import { Config } from "../../../config";

export const groupOptions: MultiSelectOption[] = [
    { value: 'chapter_manager', label: 'Chapter Manager' },
    { value: 'contact_admin', label: 'Contact Admin' },
    { value: 'exoneree_admin', label: `${Config.USER_TYPE_SINGLE} Admin` },
    { value: 'knowledge_admin', label: 'Knowledge Admin' },
    { value: 'member_admin', label: `${Config.MEMBER_TYPE_SINGLE} Admin` }
];

export const FullfillerOptions:MultiSelectOption[] = [
    { value: 'housing', label: 'Chapter Manager' },
    { value: 'contact_admin', label: 'Contact Admin' },
    { value: 'exoneree_admin', label: `${Config.USER_TYPE_SINGLE} Admin` },
    { value: 'knowledge_admin', label: 'Knowledge Admin' },
    { value: 'member_admin', label: `${Config.MEMBER_TYPE_SINGLE} Admin` }
]