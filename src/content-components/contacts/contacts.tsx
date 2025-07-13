import { Col, Container, Row, Table } from "react-bootstrap"
import { ContactsSubNav } from "./children/sub-nav"
import { useEffect, useState } from "react"
import { axiosBaseURL, getConfig } from "../../https"
import { sessionManager } from "../../utils/session-manager"
import { Contact } from "./ts/interfaces"
import { TableCard } from "../common/table-card"
import { CircleFill, EyeFill, Eyeglasses, SlashCircle } from "react-bootstrap-icons"
import Tippy from "@tippyjs/react"
import { UpdateContact } from "./children/update-contact"

export const Contacts = () => {

    const [contacts, setContacts] = useState<Contact[] | null>(null)
    const [selectedContact,setSelectedContact] = useState<Contact | null>(null)
    const [addedContact, setAddedContact] = useState<Contact | null>(null)

    useEffect(() => {
        axiosBaseURL
            .get(`contact_api/chapter_contacts/get_contacts/?chapter_id=${sessionManager.getChapterID()}`, getConfig())
            .then((response) => {
                console.log(response.data)
                setContacts(response.data)
            })
            .catch((error) => {
                //..
            }).finally(() => {

            })
    }, [])

    useEffect(() => {
        if (!addedContact) return;
    }, [addedContact])

    const handleUpdate = () => {
        //..
    }

    const handleAdd = () => {
        //..
    }


    return (
        <div>
            <ContactsSubNav />
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
        </div>
    )
}