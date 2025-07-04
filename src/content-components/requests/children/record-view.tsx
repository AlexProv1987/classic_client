import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { RequestObject } from "../ts/interface"
import { RecordNav } from "./record-sub-nav"
import { useRef } from "react"

interface RecordProps {
    set_selected: React.Dispatch<React.SetStateAction<RequestObject | null>>,
    current: RequestObject,
}


export const RecordView = (props: RecordProps) => {

    const previous:RequestObject = props.current

    return (
        <div>
            <RecordNav
                set_selected={props.set_selected}
            />
            <Container className="m-4">
                <Form>
                    <Row className="justify-content-md-center">
                    <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledTextInput">Disabled input</Form.Label>
                        <Form.Control id="disabledTextInput" placeholder="Disabled input" />
                    </Form.Group>
                    </Col>
                    <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledSelect">Disabled select menu</Form.Label>
                        <Form.Select id="disabledSelect">
                            <option>Disabled select</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            id="disabledFieldsetCheck"
                            label="Can't check this"
                        />
                    </Form.Group>
                    </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    )
}