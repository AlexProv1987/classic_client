import { useState } from "react"
import { PeopleSubNav } from "./children/sub-nav"
import { PeopleContent } from "./ts/types"
import { Users } from "./children/users"
import { Members } from "./children/members"
import { FutureMembers } from "./children/pending-members"

export const People = () => {
    const [peopleContent, setPeopleContent] = useState<PeopleContent>('users')

    const renderView = () => {
        switch (peopleContent) {
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

    return (
        <div>
            <PeopleSubNav
                set_content={setPeopleContent}
            />
            {renderView()}
        </div>
    )
}