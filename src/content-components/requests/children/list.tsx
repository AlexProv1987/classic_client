import { ArrowLeftCircle, ArrowRightCircle, EyeFill, Eyeglasses } from "react-bootstrap-icons"
import { RequestObject } from "../ts/interface"
import { Table } from "react-bootstrap"
import Tippy from "@tippyjs/react"
interface RequestListProps {
    records: RequestObject[]
    set_record: React.Dispatch<React.SetStateAction<RequestObject | null>>,
    on_sort?: (key: keyof RequestObject) => void;
    sort_config?: {
        key: keyof RequestObject;
        direction: 'asc' | 'desc';
    } | null;
}
export const RequestList = (props: RequestListProps) => {
    return (
        <>
            <Table striped bordered hover responsive="sm">
                <thead>
                    <tr>
                        <th><Eyeglasses /></th>
                        <th style={{ cursor: 'pointer' }} onClick={() => props.on_sort?.('request_type')}>
                            Type {props.sort_config?.key === 'request_type' ? (props.sort_config.direction === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th style={{ cursor: 'pointer' }} onClick={() => props.on_sort?.('exoneree_name')}>
                            Requested For {props.sort_config?.key === 'exoneree_name' && (props.sort_config.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th style={{ cursor: 'pointer' }} onClick={() => props.on_sort?.('fullfiller_name')}>
                            Assignee {props.sort_config?.key === 'fullfiller_name' && (props.sort_config.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th style={{ cursor: 'pointer' }} onClick={() => props.on_sort?.('status')}>
                            Status {props.sort_config?.key === 'status' ? (props.sort_config.direction === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th style={{ cursor: 'pointer' }} onClick={() => props.on_sort?.('updated')}>
                            Updated {props.sort_config?.key === 'updated' ? (props.sort_config.direction === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th style={{ cursor: 'pointer' }} onClick={() => props.on_sort?.('created')}>
                            Created {props.sort_config?.key === 'created' ? (props.sort_config.direction === 'asc' ? '↑' : '↓') : ''}
                        </th>
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
                                <td> {(() => {
                                    const [year, month, day] = record.created.split('T')[0].split('-');
                                    return `${parseInt(month)}/${parseInt(day)}/${year}`;
                                })()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>

            <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
                <Tippy content="Previous Page" delay={[250, 100]} placement="bottom">
                    <ArrowLeftCircle className="icon-no-outline" size={30} style={{ cursor: 'pointer', }} onClick={() => { }} />
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