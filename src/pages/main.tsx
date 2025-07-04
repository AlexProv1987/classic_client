import { useState } from "react"
import { ContentFrame } from "../components/content-frame"
import { NavFrame } from "../components/nav-frame"
import { ContentOpts } from "../common/types"

//we will check mobile here and instead make a callback to populate the nav bar - maybe i kinda wanna do desktop/tablet only
export const Main = () => {

    const [currentContent,setCurrentContect] = useState<ContentOpts>('home')

    return (
        <div className='row'>

            {/**Nav Frame**/}
            <div className='col col-md-2 border border-danger sidebar'>
                <NavFrame 
                set_content={setCurrentContect}
                />
            </div>

            {/**Content Frame**/}
            <div className='col col-md-10 border border-danger p-0 content' >
                <ContentFrame 
                value={currentContent}
                />
            </div>
        </div>
    )
}