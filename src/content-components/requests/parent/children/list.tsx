import { EyeFill, Eyeglasses } from "react-bootstrap-icons"
import { RequestObject } from "../../interface"

interface RequestListProps {
    records: RequestObject[]
    set_record: React.Dispatch<React.SetStateAction<RequestObject | null>>,
}
export const RequestList = (props: RequestListProps) => {
    return (

        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th><Eyeglasses /></th>
                    <th>Type</th>
                    <th>Requested For</th>
                    <th>Assignee</th>
                    <th>Status</th>
                    <th>Updated</th>
                </tr>
            </thead>
            <tbody>
                {props.records.length === 0 ? (
                    <tr>
                        <td colSpan={4} className="text-center text-muted">
                            No requests found.
                        </td>
                    </tr>
                ) : (
                    props.records.map((record) => (
                        <tr key={record.id}>
                            <td onClick={() => props.set_record(record)} style={{ cursor: 'pointer' }}><EyeFill /></td>
                            <td>{record.request_type}</td>
                            <td>{`${record.exoneree_reltn.first_name} ${record.exoneree_reltn.last_name}`}</td>
                            <td>{record.assigned_to || '--None--'}</td>
                            <td>{record.get_status_display || 'Pending'}</td>
                            <td> {(() => {
                                const [year, month, day] = record.updated.split('T')[0].split('-');
                                return `${parseInt(month)}/${parseInt(day)}/${year}`;
                            })()}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>

    )
}