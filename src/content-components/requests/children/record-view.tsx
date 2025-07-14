import { Card, Col, Form, Row } from "react-bootstrap";
import { Fullfiller, RequestNote, RequestObject, StatusOption } from "../ts/interface";
import { RecordNav } from "./record-sub-nav";
import { useEffect, useRef, useState } from "react";
import { RecordNotes } from "./record-notes";
import { axiosBaseURL, getConfig } from "../../../https";
import { sessionManager } from "../../../utils/session-manager";
import { RequestAPIHandler } from "../utils/api-req";
import { NoUserSelected } from "../../common/empty-selected";
import { ClipboardCheck } from "react-bootstrap-icons";
import { toast } from 'react-toastify';
interface RecordProps {
    current: RequestObject | null;
    on_update: (updated: RequestObject) => void;
}

export function RecordView({
    current,
    on_update
}: RecordProps) {
    const [localCurrent, setLocalCurrent] = useState<RequestObject | null>(null);
    const [note, setNote] = useState('');
    const [fullfillers, setFullfillers] = useState<Fullfiller[]>([]);
    const [recordNote, setRecordNote] = useState<RequestNote | null>(null);

    const previousRef = useRef<RequestObject | null>(null);

    const statusOpts: StatusOption[] = [
        { value: 'new', name: 'New' },
        { value: 'in_progress', name: 'In Progress' },
        { value: 'pending', name: 'Pending' },
        { value: 'cancelled', name: 'Cancelled' },
        { value: 'closed', name: 'Closed' },
    ];

    useEffect(() => {
        if (!current) return;
        const newRecord = { ...current };
        setLocalCurrent(newRecord);
        previousRef.current = newRecord;
        getAvailableFulfillers(newRecord.request_type_value);
    }, [current]);

    const getAvailableFulfillers = (requestType: string) => {
        axiosBaseURL
            .get(
                `organization_api/chapter_fullfillers/get_fullfillers_by_type/?chapter_id=${sessionManager.getChapterID()}&fullfiller_type=${requestType}`,
                getConfig()
            )
            .then((response) => setFullfillers(response.data))
            .catch(() => { })
            .finally(() => { });
    };

    const handleAssignToMe = () => {
        if (!localCurrent) return;
        const fullfiller = sessionManager.getFullfillmentRoles().find(
            f => f.fullfilemt_role_type === localCurrent.request_type_value
        );

        if (fullfiller && fullfiller.id !== localCurrent.fullfiller?.id) {
            const updated = { ...localCurrent, fullfiller };
            setLocalCurrent(updated);
            handleSubmit('me', updated);
        } else {
            toast.warning('This is already assigned to you')
        }
    };

    const handleSubmit = async (
        caller: 'update' | 'save' | 'me',
        overrideCurrent?: RequestObject
    ) => {
        if (!localCurrent || !previousRef.current) return;

        const currentData = overrideCurrent || localCurrent;
        const handler = new RequestAPIHandler(
            currentData,
            previousRef.current,
            { note_text: note.trim(), note_type: 'fullfiller' }
        );

        try {
            const response = await handler.updateRequestAPICall();
            if (typeof response === 'string') {
                toast.warning(response)
            } else if (typeof response === 'object') {
                previousRef.current = response.request;
                setLocalCurrent(response.request);
                response.note && setRecordNote(response.note);
                switch (caller) {
                    case 'me':
                        toast.success('Request Assigned to You!')
                        break;
                    case 'update':
                        toast.success('Request Updated!')
                        break;
                    default:
                        break;
                }
                on_update(response.request)
            }
        } catch {
            toast.error('Something went wrong')
        }
    };

    return (
        <Card className="shadow" style={{ minHeight: '85vh', maxHeight: '85vh' }}>
            {localCurrent ? (
                <>
                    <Card.Header className="secondary-nav" style={{ minHeight: '3.5rem' }}>
                        <RecordNav
                            request_type_value={localCurrent.request_type_value}
                            handle_submit={handleSubmit}
                            handle_assign={handleAssignToMe}
                        />
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Row className="justify-content-md-center">
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Select
                                            id="statusSelect"
                                            value={localCurrent.status}
                                            onChange={(e) => {
                                                const selected = statusOpts.find(opt => opt.value === e.target.value);
                                                setLocalCurrent(prev =>
                                                    prev
                                                        ? {
                                                            ...prev,
                                                            status: selected?.value || '',
                                                            get_status_display: selected?.name || ''
                                                        }
                                                        : null
                                                );
                                            }}
                                        >
                                            {statusOpts.map((status) => (
                                                <option key={status.value} value={status.value}>
                                                    {status.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                <Col md={4}>
                                    {fullfillers.length > 0 && (
                                        <Form.Group className="mb-3">
                                            <Form.Label>Assigned To</Form.Label>
                                            <Form.Select
                                                id="assignedToSelect"
                                                value={localCurrent.fullfiller?.id || ''}
                                                onChange={(e) => {
                                                    const selectedId = e.target.value;
                                                    if (!e.target.value) {
                                                        setLocalCurrent(prev => prev ? { ...prev, fullfiller: null } : null);
                                                    } else {
                                                        const selected = fullfillers.find(f => f.id === selectedId);
                                                        if (selected) {
                                                            setLocalCurrent(prev =>
                                                                prev ? { ...prev, fullfiller: selected } : null
                                                            );
                                                        }
                                                    }
                                                }}
                                            >
                                                <option value="">--None--</option>
                                                {fullfillers.map((f) => (
                                                    <option key={f.id} value={f.id}>
                                                        {f.user_first_name} {f.user_last_name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    )}
                                </Col>
                            </Row>

                            <Row className="justify-content-md-center">
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Type</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={localCurrent.request_type}
                                            disabled
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Requested For</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={`${localCurrent.exoneree_reltn.first_name} ${localCurrent.exoneree_reltn.last_name}`}
                                            disabled
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="justify-content-md-center">
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Created</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={(() => {
                                                if (!localCurrent.created) return '';
                                                const [year, month, day] = localCurrent.created.split('T')[0].split('-');
                                                return `${parseInt(month)}/${parseInt(day)}/${year}`;
                                            })()}
                                            disabled
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Last Updated</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={(() => {
                                                if (!localCurrent.updated) return '';
                                                const [year, month, day] = localCurrent.updated.split('T')[0].split('-');
                                                return `${parseInt(month)}/${parseInt(day)}/${year}`;
                                            })()}
                                            disabled
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            {current &&
                                <RecordNotes
                                    record_type="request"
                                    record_id={current.id}
                                    note={note}
                                    note_setter={setNote}
                                    parent_note={recordNote}
                                />
                            }
                        </Form>
                    </Card.Body>
                    <Card.Footer className="secondary-nav" style={{ minHeight: '3rem' }}>
                        <div className="d-flex justify-content-end align-items-center gap-2">
                        </div>
                    </Card.Footer>
                </>
            ) : (
                <>
                    <Card.Header className="secondary-nav" style={{ minHeight: '3.5rem' }}></Card.Header>
                    <Card.Body className="content">
                        <NoUserSelected
                            message='No Request Selected.'
                            optional_msg="Click an eye icon to view a request's details"
                            icon={ClipboardCheck}
                            icon_size={80}
                        />
                    </Card.Body>
                    <Card.Footer className="secondary-nav" style={{ minHeight: '3rem' }}></Card.Footer>
                </>
            )}
        </Card>
    );
}
