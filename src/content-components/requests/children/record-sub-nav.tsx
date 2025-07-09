import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional stylin
import { sessionManager } from "../../../utils/session-manager";
interface RecordNavProps {
    handle_submit: (caller: 'update' | 'save' | 'me') => void,
    handle_assign: () => void,
    request_type_value: string,
}

export const RecordNav: React.FC<RecordNavProps> = (props) => {
    return (
        <div className="d-flex align-items-center justify-content-end pt-1">
            {sessionManager.hasFullfillmentRole(props.request_type_value) &&
                <Tippy content="Assign to yourself" delay={[250, 100]} placement="bottom">
                    <button onClick={() => props.handle_assign()} className="btn btn-outline-primary btn-sm me-2">Assign To Me</button>
                </Tippy>
            }
            <Tippy content="Update and go back" delay={[250, 100]} placement="bottom">
                <button onClick={() => props.handle_submit('update')} className="btn btn-outline-primary btn-sm me-2">Update</button>
            </Tippy>
        </div>
    )
}