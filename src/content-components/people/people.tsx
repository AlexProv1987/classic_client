import { useState } from "react"
import { PeopleSubNav } from "./children/sub-nav"
import { PeopleContent } from "./ts/types"
import { Users } from "./children/users"
import { Members } from "./children/members"
import { FutureMembers } from "./children/pending-members"

const renderView = (content: string) => {
    switch (content) {
        case 'users':
            return <Users />;
        case 'members':
            return <Members />;
        case 'future_members':
            return <FutureMembers />;
        default:
            return null;
    }
};

export const People = () => {
    const [peopleContent, setPeopleContent] = useState<PeopleContent>('users')
    return (
        <div>
            <PeopleSubNav
                set_content={setPeopleContent}
            />
            {renderView(peopleContent)}
        </div>
    )
}