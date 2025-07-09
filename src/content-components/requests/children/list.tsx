import { EyeFill, Eyeglasses } from "react-bootstrap-icons"
import { RequestObject } from "../ts/interface"
import { Table } from "react-bootstrap"
import Tippy from "@tippyjs/react"
import { TableCard } from "../../common/table-card"
import { Config } from "../../../config"

interface RequestListProps {
    records: RequestObject[]
    set_record: React.Dispatch<React.SetStateAction<RequestObject | null>>,
    on_sort?: (key: keyof RequestObject) => void;
    sort_config?: {
        key: keyof RequestObject;
        direction: 'asc' | 'desc';
    } | null;
}

export function RequestList({
    records,
    set_record,
    on_sort,
    sort_config,
}: RequestListProps) {
    return (
        <TableCard
            title={Config.MEMBER_TYPE_PLURAL}
            data={records}
            itemsPerPage={10}
            searchBy={(record, term) =>
                record.exoneree_reltn.last_name.toLowerCase().startsWith(term.toLowerCase())
            }
            renderTable={(data) => (
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th><Eyeglasses /></th>
                            <th style={{ cursor: 'pointer' }} onClick={() => on_sort?.('request_type')}>
                                Type {sort_config?.key === 'request_type' && (sort_config.direction === 'asc' ? '↑' : '↓')}
                            </th>
                            <th style={{ cursor: 'pointer' }} onClick={() => on_sort?.('exoneree_name')}>
                                Requested For {sort_config?.key === 'exoneree_name' && (sort_config.direction === 'asc' ? '↑' : '↓')}
                            </th>
                            <th style={{ cursor: 'pointer' }} onClick={() => on_sort?.('fullfiller_name')}>
                                Assignee {sort_config?.key === 'fullfiller_name' && (sort_config.direction === 'asc' ? '↑' : '↓')}
                            </th>
                            <th style={{ cursor: 'pointer' }} onClick={() => on_sort?.('status')}>
                                Status {sort_config?.key === 'status' && (sort_config.direction === 'asc' ? '↑' : '↓')}
                            </th>
                            <th style={{ cursor: 'pointer' }} onClick={() => on_sort?.('updated')}>
                                Updated {sort_config?.key === 'updated' && (sort_config.direction === 'asc' ? '↑' : '↓')}
                            </th>
                            <th style={{ cursor: 'pointer' }} onClick={() => on_sort?.('created')}>
                                Created {sort_config?.key === 'created' && (sort_config.direction === 'asc' ? '↑' : '↓')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((record, index) => (
                            <tr key={index}>
                                <Tippy content="View" delay={[250, 100]} placement="bottom">
                                    <td onClick={() => set_record(record)} style={{ cursor: 'pointer' }}><EyeFill /></td>
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
                        ))}
                    </tbody>
                </Table>
            )} />
    )
}
