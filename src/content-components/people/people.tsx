import { useState } from "react"
import { PeopleSubNav } from "./children/sub-nav"
import { PeopleContent } from "./ts/types"

export const People = () => {
    const [peopleContent,setPeopleContent] = useState<PeopleContent>('users')
    return(
        <div>
        <PeopleSubNav
        set_content={setPeopleContent}
        />
        <p>I am for people</p>
        </div>
    )
}