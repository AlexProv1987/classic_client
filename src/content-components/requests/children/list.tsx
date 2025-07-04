import { ArrowLeftCircle, ArrowRightCircle, EyeFill, Eyeglasses } from "react-bootstrap-icons"
import { RequestObject } from "../ts/interface"
import { Table } from "react-bootstrap"
import Tippy from "@tippyjs/react"

interface RequestListProps {
    records: RequestObject[]
    set_record: React.Dispatch<React.SetStateAction<RequestObject | null>>,
}
export const RequestList = (props: RequestListProps) => {
    console.log(props.records)
    return (
        <>
             <Table striped bordered hover responsive="sm">
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
                                <Tippy content="View" delay={[250, 100]} placement="bottom">
                                <td onClick={() => props.set_record(record)} style={{ cursor: 'pointer' }}><EyeFill /></td>
                                </Tippy>
                                <td>{record.request_type}</td>
                                <td>{`${record.exoneree_reltn.first_name} ${record.exoneree_reltn.last_name}`}</td>
                                <td>{record.fullfiller && `${record.fullfiller.user_first_name} ${record.fullfiller.user_last_name}` || '--None--'}</td>
                                <td>{record.get_status_display || 'Pending'}</td>
                                <td> {(() => {
                                    const [year, month, day] = record.updated.split('T')[0].split('-');
                                    return `${parseInt(month)}/${parseInt(day)}/${year}`;
                                })()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>

            <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
                <Tippy content="Previous Page" delay={[250, 100]} placement="bottom">
                    <ArrowLeftCircle className="icon-no-outline" size={30} style={{ cursor: 'pointer',}} onClick={() => { }} />
                </Tippy>
                <span className="text-muted small">
                    {`${1} - ${20} of ${200}`}
                </span>
                <Tippy content="Next Page" delay={[250, 100]} placement="bottom">
                    <ArrowRightCircle className="icon-no-outline" size={30} style={{ cursor: 'pointer' }} onClick={() => { }} />
                </Tippy>
            </div>
        </>
    )
}