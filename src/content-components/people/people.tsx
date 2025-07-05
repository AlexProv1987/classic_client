import { useState } from "react"
import { PeopleSubNav } from "./children/sub-nav"
import { PeopleContent } from "./ts/types"
import { Users } from "./children/users"
import './css/people.css'
export const People = () => {
    const [peopleContent,setPeopleContent] = useState<PeopleContent>('users')
    return(
        <div>
        <PeopleSubNav
        set_content={setPeopleContent}
        />
        <Users />
        </div>
    )
}