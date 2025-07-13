import { Button, Card, Col, Form, Row } from "react-bootstrap"
import { Contact } from "../ts/interfaces"
import { NoUserSelected } from "../../common/empty-selected"
import { PersonVcardFill } from "react-bootstrap-icons"
import { Config } from "../../../config"
import { useEffect, useState } from "react"

//well do field validation here for the 2 editable fields.
interface UpdateContactProps {
    contact: Contact | null,
}

export function UpdateContact({
    contact
}: UpdateContactProps) {
    const [isActive, setIsActive] = useState<boolean>(false)
    useEffect(() => {
        if (!contact) return;
        setIsActive(contact.active)
    }, [contact]);
    return (
        <Card className="shadow" style={{ minHeight: '85vh' }}>
            {contact ? (
                <>
                    <Card.Header className="secondary-nav" style={{ minHeight: '3.5rem' }}>
                        <div className="d-flex justify-content-end align-items-center">
                            <Button
                                onClick={() => { }}
                                style={{ minWidth: '5rem', marginRight: '.5rem' }}
                                size='sm'
                                variant='outline-primary'
                            >
                                Update
                            </Button>
                        </div>
                    </Card.Header>
                    <Card.Body className="content">
                        <Form>
                            <Row className="justify-content-md-center">
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="disabledTextInput">Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={contact.contact_name}
                                        aria-label="Disabled input example"
                                        disabled
                                        readOnly
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="disabledTextInput">Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={contact.address_full}
                                        aria-label="Disabled input example"

                                    />
                                </Form.Group>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="disabledSelect">Type</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={contact.contact_type_name}
                                            aria-label="Disabled input example"
                                            disabled
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="disabledTextInput">Phone</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={contact.phone_num}
                                            aria-label="Disabled input example"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="Active"
                                        checked={isActive}
                                        isValid={isActive}
                                        isInvalid={!isActive}
                                        onChange={(e) => setIsActive(e.target.checked)}
                                    />
                                    {!isActive && (
                                        <div className="invalid-feedback d-block">
                                            {`WARNING: Inactivating this contact will make them non-viewable by ${Config.USER_TYPE_PLURAL}.`}
                                        </div>
                                    )}
                                </Form.Group>
                            </Row>
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
                            message='No Contact Selected'
                            optional_msg="Click an eye icon to update contact"
                            icon={PersonVcardFill}
                            icon_size={80}
                        />
                    </Card.Body>
                    <Card.Footer className="secondary-nav" style={{ minHeight: '3rem' }}></Card.Footer>
                </>
            )
            }
        </Card >
    )
}