import { ArrowLeft, ArrowLeftCircle } from "react-bootstrap-icons"
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional stylin
import { sessionManager } from "../../../utils/session-manager";
interface RecordNavProps {
    set_selected: () => void,
    handle_submit: (caller: 'update' | 'save' | 'me') => void,
    handle_assign: () => void,
    request_type_value: string,
}

export const RecordNav: React.FC<RecordNavProps> = (props) => {
    return (
        <nav className="navbar navbar-expand-lg  border-bottom secondary-nav">
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav ms-2">
                    <Tippy content="Back" delay={[250, 100]} placement="bottom">
                        <div
                            className="d-flex justify-content-center align-items-center rounded-circle nav-icon-gradient"
                            style={{ width: '40px', height: '40px', cursor: 'pointer' }}
                            onClick={() => props.set_selected()}
                        >
                            <ArrowLeft size={20} />
                        </div>
                    </Tippy>
                </div>
            </div>
            <div className="d-flex">
                {sessionManager.hasFullfillmentRole(props.request_type_value) &&
                    <Tippy content="Assign to yourself" delay={[250, 100]} placement="bottom">
                        <button onClick={() => props.handle_assign()} className="btn btn-outline-primary btn-sm me-2">Assign To Me</button>
                    </Tippy>
                }
                <Tippy content="Update and go back" delay={[250, 100]} placement="bottom">
                    <button onClick={() => props.handle_submit('update')} className="btn btn-outline-primary btn-sm me-2">Update</button>
                </Tippy>
                <Tippy content="Save and Stay here" delay={[250, 100]} placement="bottom">
                    <button onClick={() => props.handle_submit('save')} className="btn btn-outline-primary btn-sm me-2">Save</button>
                </Tippy>
            </div>
        </nav>
    )
}