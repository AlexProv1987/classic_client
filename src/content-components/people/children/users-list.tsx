import Tippy from "@tippyjs/react"
import { Table } from "react-bootstrap"
import { CircleFill, EyeFill, Eyeglasses, SlashCircle } from "react-bootstrap-icons"
import { Config } from "../../../config"
import { useEffect, useState } from "react"
import { axiosBaseURL, getConfig } from "../../../https"
import { sessionManager } from "../../../utils/session-manager"
import { UserProfile } from "../ts/interfaces"
import { PersonTableCard } from "../common/person-table-card"

interface UserListProps {
    handle_selected: (user: UserProfile | null) => void,
    updated_user: UserProfile | null

}

export function UserList({
    handle_selected,
    updated_user
}: UserListProps) {
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
        if (!updated_user) return;
        setUsers(prev => {
            if (!prev) return prev;
            const updatedUsers = prev.map(item =>
                item.id === updated_user.id ? updated_user : item
            );
            return updatedUsers;
        });
    }, [updated_user])

    return (
        <PersonTableCard
            title={Config.USER_TYPE_PLURAL}
            data={users}
            itemsPerPage={1}
            searchBy={(user, term) =>
                user.user.last_name.toLowerCase().startsWith(term.toLowerCase())
            }
            renderTable={(data) => (
                <Table bordered hover responsive>
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
                        {data.map((user, index) => (
                            <tr key={user.id || index}>
                                <Tippy content="View" delay={[250, 100]} placement="bottom">
                                    <td
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handle_selected(user)}
                                    >
                                        <EyeFill />
                                    </td>
                                </Tippy>
                                <td>{user.user.first_name}</td>
                                <td>{user.user.last_name}</td>
                                <td>{user.user.phone_number ?? ''}</td>
                                <td>{user.user_tier}</td>
                                <td>{user.user.is_active ? <CircleFill color='green' /> : <SlashCircle color='red' />}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        />
    );
}