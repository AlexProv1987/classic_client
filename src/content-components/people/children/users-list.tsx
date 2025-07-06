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
    handle_selected: (user: UserProfile | null) => void,
    updated_user: UserProfile | null

}

export const UserList: React.FC<UserListProps> = (props) => {

    const [users, setUsers] = useState<UserProfile[] | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [nameSearch, setNameSearch] = useState<string>('')
    const usersPerPage = 1;

    const filteredUsers = users?.filter(user =>
        user.user.last_name.toLowerCase().startsWith(nameSearch.toLowerCase())
    ) || [];

    // Calculate indices
    const totalUsers = filteredUsers?.length || 0;
    const totalPages = Math.ceil(totalUsers / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = Math.min(startIndex + usersPerPage, totalUsers);
    const currentUsers = filteredUsers?.slice(startIndex, endIndex) || [];

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

    useEffect(() => {
        if (currentPage === 1) return;

        setCurrentPage(1);

    }, [nameSearch]);
    
    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    return (
        <Card className="shadow" style={{ minHeight: '80vh' }}>
            <Card.Header className="secondary-nav d-flex justify-content-between align-items-center">
                <TableHeader table_name={Config.USER_TYPE_PLURAL} />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Last Name"
                    style={{ maxWidth: '250px' }}
                    value={nameSearch}
                    onChange={(e) => setNameSearch(e.target.value)}
                />
            </Card.Header>
            <Card.Body className="content" style={{ paddingRight: '0', paddingLeft: '0', paddingTop: '0' }}>
                {users === null ? (
                    <BouncingDotsLoader vh='25' />
                ) : filteredUsers.length === 0 ? (
                    <p className="text-muted text-center mt-3">No users found.</p>
                ) : (
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
                            {currentUsers.map((user, index) => (
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
                                    <td>{user.user.is_active ? <CircleFill color='green' /> : <SlashCircle color='red' />}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Card.Body>
            <Card.Footer className="secondary-nav">
                <div className="d-flex justify-content-center align-items-center gap-3">
                    <Tippy content="Previous Page" delay={[250, 100]} placement="bottom">
                        <ArrowLeftCircle
                            className="icon-no-focus"
                            size={30}
                            style={{ cursor: currentPage > 1 ? 'pointer' : 'not-allowed', opacity: currentPage > 1 ? 1 : 0.5 }}
                            onClick={prevPage}
                        />
                    </Tippy>
                    <span className="text-muted small">
                        {totalUsers === 0 ? 0 : startIndex + 1} - {endIndex} of {totalUsers}
                    </span>
                    <Tippy content="Next Page" delay={[250, 100]} placement="bottom">
                        <ArrowRightCircle
                            className="icon-no-focus"
                            size={30}
                            style={{ cursor: currentPage < totalPages ? 'pointer' : 'not-allowed', opacity: currentPage < totalPages ? 1 : 0.5 }}
                            onClick={nextPage}
                        />
                    </Tippy>
                </div>
            </Card.Footer>
        </Card>
    )
}