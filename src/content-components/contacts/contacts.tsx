import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap"
import { ContactsSubNav } from "./children/sub-nav"
import { useEffect, useRef, useState } from "react"
import { axiosBaseURL, getConfig } from "../../https"
import { sessionManager } from "../../utils/session-manager"
import { Contact } from "./ts/interfaces"
import { TableCard } from "../common/table-card"
import { CircleFill, EyeFill, Eyeglasses, SlashCircle } from "react-bootstrap-icons"
import Tippy from "@tippyjs/react"
import { UpdateContact } from "./children/update-contact"
import { contactUtils } from "./utils/contact_utils"
import { MultiSelectOption } from "../../common/interfaces"
import { toast } from "react-toastify"

export const Contacts = () => {
    console.log('render')
    const [contacts, setContacts] = useState<Contact[] | null>(null)
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
    const [addedContact, setAddedContact] = useState<Contact | null>(null)
    const [show, setShow] = useState(false);

    const contactTypesRef = useRef<MultiSelectOption[]>(null)

    useEffect(() => {
        axiosBaseURL
            .get(`contact_api/chapter_contacts/get_contacts/?chapter_id=${sessionManager.getChapterID()}`, getConfig())
            .then((response) => {
                setContacts(response.data)
            })
            .catch((error) => {
                //..
            }).finally(() => {
                //..
            })
    }, [])

    useEffect(() => {
        if (!addedContact) return;
    }, [addedContact])

    const handleClose = () => {
        setShow(false)
    }

    const handleShow = async () => {
        try {
            const options = await contactUtils.getContactTypes();
            contactTypesRef.current = options
        } catch (err) {
            toast.error('Failed to load contact types.')
        } finally {
            if (contactTypesRef.current) {
                setShow(true)
            }
        }
    };

    const handleUpdate = () => {
        //..
    }

    const handleAdd = () => {
        //..
    }


    return (
        <div>
            <ContactsSubNav
                handle_show={handleShow}
            />
            <Container fluid>
                <Row className='mt-2'>
                    <Col md={6}>
                        <TableCard
                            title='Contacts'
                            data={contacts}
                            itemsPerPage={10}
                            searchBy={(contact, term) =>
                                contact.contact_name.toLowerCase().startsWith(term.toLowerCase())
                            }
                            renderTable={(data) => (
                                <Table bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th><Eyeglasses /></th>
                                            <th>Name</th>
                                            <th>Type</th>
                                            <th>Phone</th>
                                            <th>Active</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((contact, index) => (
                                            <tr key={contact.id || index}>
                                                <Tippy content="View" delay={[250, 100]} placement="bottom">
                                                    <td
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => setSelectedContact(contact)}
                                                    >
                                                        <EyeFill />
                                                    </td>
                                                </Tippy>
                                                <td>{contact.contact_name}</td>
                                                <td>{contact.contact_type_name}</td>
                                                <td>{contact.phone_num}</td>
                                                <td>{contact.active ? <CircleFill color='green' /> : <SlashCircle color='red' />}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                        />
                    </Col>
                    <Col xs={6}>
                        <UpdateContact
                            contact={selectedContact}
                        />
                    </Col>
                </Row>
            </Container>

            {/*Add Modal*/}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="justify-content-md-center">
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    aria-label="Disabled input example"
                                />
                            </Form.Group>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    aria-label="Disabled input example"

                                />
                            </Form.Group>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Select>
                                        <option id='none'>--None--</option>
                                        {contactTypesRef.current?.map((contact_type) => (
                                            <option key={contact_type.value} value={contact_type.value}>
                                                {contact_type.label}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="text"
                                        //placeholder={contact.phone_num}
                                        aria-label="Disabled input example"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" size='sm' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="outline-primary" size='sm' onClick={handleAdd}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    )
}