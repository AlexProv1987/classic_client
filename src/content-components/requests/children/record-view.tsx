import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { RequestObject } from "../ts/interface"
import { RecordNav } from "./record-sub-nav"
import { useRef, useState } from "react"
import { RecordNotes } from "./record-notes";

interface RecordProps {
    set_selected: React.Dispatch<React.SetStateAction<RequestObject | null>>,
    current: RequestObject,
}

interface RecordFieldMap {
    created: string;
    exoneree_first_name: string;
    exoneree_last_name: string;
    fullfiller_id: string,
    fullfiller_first_name: string;
    fullfiller_last_name: string;
}

export const RecordView = (props: RecordProps) => {

    const previous: RequestObject = props.current
    const [note, setNote] = useState<string>('')

    return (
        <div>
            <RecordNav
                set_selected={props.set_selected}
            />
            <Container className="mt-4 mb-4">
                <Form>
                    <Row className="justify-content-md-center">
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="disabledTextInput">Status</Form.Label>
                                <Form.Select id="disabledSelect">
                                    <option id={props.current.status}>{props.current.get_status_display}</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="disabledSelect">Assigned To</Form.Label>
                                <Form.Select id="disabledSelect">
                                    <option id={props.current.fullfiller ? props.current.fullfiller.id : '--None--'}>
                                        {props.current.fullfiller ? `${props.current.fullfiller.user_first_name} ${props.current.fullfiller.user_last_name}` : '--None--'}
                                    </option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="disabledTextInput">Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={props.current.request_type}
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
                                    placeholder={`${props.current.exoneree_reltn.first_name} ${props.current.exoneree_reltn.last_name}`}
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
                                        const [year, month, day] = props.current.created.split('T')[0].split('-');
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
                                        const [year, month, day] = props.current.updated.split('T')[0].split('-');
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
            />
        </div>
    )
}