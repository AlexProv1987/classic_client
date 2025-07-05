import Tippy from "@tippyjs/react"
import { Card, Table } from "react-bootstrap"
import { ArrowLeftCircle, ArrowRightCircle, CircleFill, EyeFill, Eyeglasses, SlashCircle } from "react-bootstrap-icons"
import { Config } from "../../../config"
import { useEffect, useState } from "react"
import { axiosBaseURL, getConfig } from "../../../https"
import { sessionManager } from "../../../utils/session-manager"
import { UserProfile } from "../ts/interfaces"
import { BouncingDotsLoader } from "../../common/bouncy-loader"
import { TableHeader } from "../../common/table-header"

interface UserListProps {
    handle_selected: (user:UserProfile | null) => void,
    updated_user:UserProfile | null
    
}

export const UserList: React.FC<UserListProps> = (props) => {

    const [users, setUsers] = useState<UserProfile[] | null>(null)

    useEffect(() => {
        axiosBaseURL
            .get(`exoneree_management_api/exoneree_management/exonerees/?chapter_id=${sessionManager.getChapterID()}`, getConfig())
            .then((response) => {
                setUsers(response.data)
            })
            .catch((error) => {
                alert('error')
            }).finally(() => {

            })
    }, [])

     useEffect(() => {
        if (!props.updated_user) return;
        console.log(props.updated_user)
    }, [props.updated_user])

    return (
        <Card className="shadow" style={{minHeight:'80vh'}}>
            <Card.Header><TableHeader table_name={Config.USER_TYPE_PLURAL}/></Card.Header>
            <Card.Body style={{paddingRight:'0',paddingLeft:'0', paddingTop:'0'}}>
                {users === null ? (
                    <BouncingDotsLoader vh='25' />
                ) : users.length === 0 ? (
                    <p className="text-muted text-center mt-3">No users found.</p>
                ) : (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th><Eyeglasses /></th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone</th>
                                <th>Tier</th>
                                <th>Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id || index}>
                                    <Tippy content="View" delay={[250, 100]} placement="bottom">
                                        <td
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => props.handle_selected(user)}
                                        >
                                            <EyeFill />
                                        </td>
                                    </Tippy>
                                    <td>{user.user.first_name}</td>
                                    <td>{user.user.last_name}</td>
                                    <td>{user.user.phone_number ? user.user.phone_number : ''}</td>
                                    <td>{user.user_tier}</td>
                                    <td>{user.user.is_active ? <CircleFill color='green'/> : <SlashCircle color='red' />}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Card.Body>
            <Card.Footer>
                <div className="d-flex justify-content-center align-items-center gap-3">
                    <Tippy content="Previous Page" delay={[250, 100]} placement="bottom">
                        <ArrowLeftCircle
                            className="icon-no-focus"
                            size={30}
                            style={{
                                cursor: 'pointer',
                                opacity: 1
                            }}
                            onClick={() => {

                            }}
                        />
                    </Tippy>
                    <span className="text-muted small">
                        {`X of Y`}
                    </span>
                    <Tippy content="Next Page" delay={[250, 100]} placement="bottom">
                        <ArrowRightCircle
                            className="icon-no-focus"
                            size={30}
                            style={{
                                cursor: 'pointer',
                                opacity: 1
                            }}
                            onClick={() => {

                            }}
                        />
                    </Tippy>
                </div>
            </Card.Footer>
        </Card>
    )
}