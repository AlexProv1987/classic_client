import { ContentFrame } from "../components/content-frame"
import { NavFrame } from "../components/nav-frame"

//we will check mobile here and instead make a callback to populate the nav bar - maybe i kinda wanna do desktop/tablet only
export const Main = () => {
    return (
        <div className='row'>

            {/**Nav Frame**/}
            <div className='col col-md-2 border border-danger text-bg-dark'>
                <NavFrame />
            </div>

            {/**Content Frame**/}
            <div className='col col-md-10 border border-danger'>
                <ContentFrame />
            </div>
        </div>
    )
}