import { useState } from "react"
import { ContentFrame } from "../components/content-frame"
import { NavFrame } from "../components/nav-frame"
import { ContentOpts } from "../common/types"

//we will check mobile here and instead make a callback to populate the nav bar - maybe i kinda wanna do desktop/tablet only
export const Main: React.FC = () => {
    //DONT FORGET TO CHANGE THIS BACK
    const [currentContent,setCurrentContect] = useState<ContentOpts>('people')

    return (
        <div className='row'>

            {/**Nav Frame**/}
            <div className='col col-md-2 sidebar'>
                <NavFrame 
                set_content={setCurrentContect}
                />
            </div>

            {/**Content Frame**/}
            <div className='col col-md-10 p-0 content' >
                <ContentFrame 
                value={currentContent}
                />
            </div>
        </div>
    )
}