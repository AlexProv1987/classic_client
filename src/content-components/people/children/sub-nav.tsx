import { PeopleFill, PersonBadge, PersonFill, PersonPlus, PersonRaisedHand } from "react-bootstrap-icons";
import { PeopleContent } from "../ts/types";
import { Config } from "../../../config";

interface PeopleSubNavProps {
    set_content: React.Dispatch<React.SetStateAction<PeopleContent>>;
}

export const PeopleSubNav: React.FC<PeopleSubNavProps> = (props) => {
    return (
        <nav className="navbar navbar-expand-lg secondary-nav">
            <div className="container-fluid d-flex justify-content-center align-items-center">
                <ul className="navbar-nav d-flex flex-row gap-3">
                    <li className="nav-item">
                        <a style={{ cursor: 'pointer' }} className="nav-link" onClick={() => props.set_content('users')}>
                            <span><PersonFill size={24} /></span> {`${Config.USER_TYPE_PLURAL}`}
                        </a>
                    </li>
                    <li className="nav-item">
                        <a style={{ cursor: 'pointer' }} className="nav-link" onClick={() => props.set_content('members')}>
                            <PersonBadge size={24} /> {`${Config.MEMBER_TYPE_PLURAL}`}
                        </a>
                    </li>
                    <li className="nav-item">
                        <a style={{ cursor: 'pointer' }} className="nav-link" onClick={() => props.set_content('future_members')}>
                            <PersonRaisedHand size={24} /> {`${Config.FUTURE_MEMBER_TYPE_PLURAL}`}
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}