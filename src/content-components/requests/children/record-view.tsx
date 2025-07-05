import { Alert, Col, Container, Form, Row } from "react-bootstrap"
import { Fullfiller, RequestNote, RequestObject, StatusOption } from "../ts/interface"
import { RecordNav } from "./record-sub-nav"
import { useEffect, useRef, useState } from "react"
import { RecordNotes } from "./record-notes";
import { axiosBaseURL, getConfig } from "../../../https";
import { sessionManager } from "../../../utils/session-manager";
import { RequestAPIHandler } from "../utils/api-req";
import { AlertInfo } from "../../../common/interfaces";

interface RecordProps {
    set_selected: () => void,
    current: RequestObject,
    on_update: (updated: RequestObject, alert: AlertInfo) => void,
}

export const RecordView: React.FC<RecordProps> = (props) => {

    const [localCurrent, setLocalCurrent] = useState<RequestObject>({ ...props.current });
    const [note, setNote] = useState<string>('')
    const [fullfillers, setFullfillers] = useState<Fullfiller[]>([])
    const [recordNote, setRecordNote] = useState<RequestNote | null>(null)
    const [alert, setAlert] = useState<AlertInfo | null>(null)

    const previousRef = useRef<RequestObject>({ ...props.current });
    ;

    const statusOpts: StatusOption[] = [
        { value: 'new', name: 'New' },
        { value: 'in_progress', name: 'In Progress' },
        { value: 'pending', name: 'Pending' },
        { value: 'cancelled', name: 'Cancelled' },
        { value: 'closed', name: 'Closed' },
    ];

    useEffect(() => {
        const newRecord = { ...props.current };
        setLocalCurrent(newRecord);
        previousRef.current = newRecord;
        getAvailableFulfillers()
    }, [props.current]);


    const getAvailableFulfillers = () => {
        axiosBaseURL
            .get(`organization_api/chapter_fullfillers/get_fullfillers_by_type/?chapter_id=${sessionManager.getChapterID()}&fullfiller_type=${props.current.request_type_value}`,
                getConfig())
            .then((response) => {
                setFullfillers(response.data)
            })
            .catch((error) => {
                //..
            }).finally(() => {
                //..
            });
    }

    const handleAssignToMe = () => {
        const fullfiller = sessionManager.getFullfillmentRoles().find(f => f.fullfilemt_role_type === localCurrent.request_type_value)
        
        //avoid race case by passing overriden data to handlesubmit
        if (fullfiller && fullfiller.id !== localCurrent.fullfiller?.id) {
            const updated = { ...localCurrent, fullfiller };
            setLocalCurrent(updated);
            handleSubmit('me', updated);
        }else{
            setAlert({ message: 'This is already assigned to you!', variant: 'warning', id: Date.now() })
        }
    }

    const handleSubmit = async (caller: 'update' | 'save' | 'me', overrideCurrent?: RequestObject) => {
        const currentData = overrideCurrent || localCurrent;
        const handler = new RequestAPIHandler(currentData, previousRef.current, { note_text: note.trim(), note_type: 'fullfiller' })
        try {
            const response = await handler.updateRequestAPICall()
            if (typeof (response) === 'string') {
                setAlert({ message: response, variant: 'warning', id: Date.now() });
            } else if (typeof (response) === 'object') {
                switch (caller) {
                    case 'save':
                    case 'me':
                        previousRef.current = response.request
                        setLocalCurrent(response.request)
                        response.note && setRecordNote(response.note)
                        setAlert({ message: 'Request Updated!', variant: 'success', id: Date.now() })
                        return;
                    case 'update':
                        props.on_update(response.request, { message: 'Request Updated', variant: 'success', id: Date.now() })
                        return;
                    default:
                        return;
                }
            }
        } catch {
            setAlert({ message: 'Something went wrong', variant: 'danger', id: Date.now() })
        }
    }

    return (
        <div>
            {localCurrent &&
                <>
                    <RecordNav
                        set_selected={props.set_selected}
                        request_type_value={localCurrent.request_type_value}
                        handle_submit={handleSubmit}
                        handle_assign={handleAssignToMe}
                    />
                    <nav>
                        {alert &&
                            <Alert
                                key={alert.id}
                                dismissible
                                variant={alert.variant}
                                style={{
                                    width: "100%",
                                    zIndex: 1060,
                                    borderRadius: 0,
                                }}
                            >
                                {alert.message}
                            </Alert>
                        }
                    </nav>
                    <Container className="mt-4 mb-4">
                        <Form>
                            <Row className="justify-content-md-center">
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="disabledTextInput">Status</Form.Label>
                                        <Form.Select
                                            id="statusSelect"
                                            value={localCurrent.status}
                                            onChange={(e) => {
                                                setLocalCurrent(prev => ({
                                                    ...prev,
                                                    status: e.target.value,
                                                    get_status_display: e.target.name,
                                                }));
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
                                            <Form.Label htmlFor="assignedToSelect">Assigned To</Form.Label>
                                            <Form.Select
                                                id="assignedToSelect"
                                                value={localCurrent.fullfiller?.id || ''}
                                                onChange={(e) => {
                                                    const selectedId = e.target.value;

                                                    if (selectedId === '') {
                                                        // Set fullfiller to null when --None-- is selected
                                                        setLocalCurrent(prev => ({
                                                            ...prev,
                                                            fullfiller: null,
                                                        }));
                                                    } else {
                                                        const selected = fullfillers.find(f => f.id === selectedId);
                                                        if (selected) {
                                                            setLocalCurrent(prev => ({
                                                                ...prev,
                                                                fullfiller: selected,
                                                            }));
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
                                        <Form.Label htmlFor="disabledTextInput">Type</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={localCurrent.request_type}
                                            aria-label="Disabled input example"
                                            disabled
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="disabledSelect">Requested For</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={`${localCurrent.exoneree_reltn.first_name} ${localCurrent.exoneree_reltn.last_name}`}
                                            aria-label="Disabled input example"
                                            disabled
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="justify-content-md-center">
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="disabledTextInput">Created</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={(() => {
                                                const [year, month, day] = localCurrent.created.split('T')[0].split('-');
                                                return `${parseInt(month)}/${parseInt(day)}/${year}`;
                                            })()}
                                            aria-label="Disabled input example"
                                            disabled
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="disabledSelect">Last Updated</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={(() => {
                                                const [year, month, day] = localCurrent.updated.split('T')[0].split('-');
                                                return `${parseInt(month)}/${parseInt(day)}/${year}`;
                                            })()}
                                            aria-label="Disabled input example"
                                            disabled
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                    <RecordNotes
                        record_type="request"
                        record_id={props.current.id}
                        note={note}
                        note_setter={setNote}
                        parent_note={recordNote}
                    />
                </>
            }
        </div>
    )
}