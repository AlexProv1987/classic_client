import { useRef, useState } from "react"
import { Alert, Button, Form, Modal, ModalBody, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ChatText, InfoCircle } from "react-bootstrap-icons";
import './css/fab.css'
import Tippy from "@tippyjs/react";
export const GetSupport = () => {

    const [show, setShow] = useState<boolean>(false)
    const [alertMsg, setAlertMsg] = useState<string | null>(null)
    const [alertVariant, setAlertVariant] = useState<string>('success')
    const [comment, setComment] = useState<string>("")

    const didSubmit = useRef<boolean>(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        //..make your request here
        //acess to alert msg and a variant based on good or bad
    };

    return (
        <div>
            {alertMsg &&
                <Alert
                    dismissible
                    variant={alertVariant}
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        zIndex: 1060,
                        borderRadius: 0,
                    }}
                >
                    {alertMsg}
                </Alert>
            }
            <Tippy showOnCreate content="Contact Support" delay={[250, 100]} placement="bottom">
                    <Button
                        title="Contact Support"
                        onClick={() => setShow(true)}
                        className="rounded-circle shadow fab-button"
                        style={{
                            position: "fixed",
                            bottom: "20px",
                            right: "20px",
                            width: "60px",
                            height: "60px",
                            zIndex: 1050,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <ChatText size={26} color="white" />
                    </Button>
            </Tippy>

            <Modal show={show} onHide={() => setShow(false)} centered>
                <div>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-dark-emphasis">Contact Support</Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={handleSubmit}>
                        {!didSubmit.current ?
                            <Modal.Body>
                                <Form.Group>
                                    <Form.Label>
                                        Message
                                        <OverlayTrigger
                                            placement="right"
                                            overlay={<Tooltip>Describe your issue</Tooltip>}>
                                            <InfoCircle className="text-muted" style={{ cursor: 'pointer', marginLeft: '2px' }} />
                                        </OverlayTrigger>
                                    </Form.Label>
                                    <Form.Control
                                        disabled={didSubmit.current ? true : false}
                                        as="textarea"
                                        rows={3}
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </Form.Group>
                            </Modal.Body>
                            : <ModalBody>Thank you!</ModalBody>}
                        <Modal.Footer>
                            <Button variant="secondary" size="sm" onClick={() => setShow(false)}>
                                Cancel
                            </Button>
                            <Button size="sm" type="submit" disabled={(comment.length === 0 || didSubmit.current)}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Form>
                </div>
            </Modal>
        </div>

    )
}