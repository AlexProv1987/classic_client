import { ArrowLeftCircle, CaretLeftFill } from "react-bootstrap-icons"
import { RequestObject } from "../../interface"
import { OverlayTrigger, Tooltip } from "react-bootstrap"

interface RecordNavProps {
    set_selected: React.Dispatch<React.SetStateAction<RequestObject | null>>,
}

export const RecordNav = () => {
    const handleBack = () => {

    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                            <Tooltip id="tooltip-inline">
                                Back
                            </Tooltip>
                        }>
                        <li style={{ cursor: 'pointer' }}>
                            <ArrowLeftCircle size={30} />
                        </li>
                    </OverlayTrigger>
                </ul>
            </div>
            <div className="d-flex">
                <button className="btn btn-outline-primary" type='submit'>Search</button>
            </div>
        </nav>
    )
}