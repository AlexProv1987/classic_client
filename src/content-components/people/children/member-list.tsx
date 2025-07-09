import Tippy from "@tippyjs/react"
import { Table } from "react-bootstrap"
import { CircleFill, EyeFill, Eyeglasses, SlashCircle } from "react-bootstrap-icons"
import { Config } from "../../../config"
import { useEffect, useState } from "react"
import { axiosBaseURL, getConfig } from "../../../https"
import { sessionManager } from "../../../utils/session-manager"
import { ChapterMember } from "../ts/interfaces"
import { TableCard } from "../../common/table-card"

interface MemberList {
    handle_selected: (user: ChapterMember | null) => void,
    updated_member: ChapterMember | null

}

export function MemberList({
    handle_selected,
    updated_member
}: MemberList) {
    const [members, setMembers] = useState<ChapterMember[] | null>(null)

    useEffect(() => {
        axiosBaseURL
            .get(`organization_api/member_management/get_chapter_members/?chapter_reltn=${sessionManager.getChapterID()}`, getConfig())
            .then((response) => {
                setMembers(response.data)
            })
            .catch((error) => {
               //..
            }).finally(() => {

            })
    }, [])

    useEffect(() => {
        if (!updated_member) return;
        setMembers(prev => {
            if (!prev) return prev;
            const updatedUsers = prev.map(item =>
                item.id === updated_member.id ? updated_member : item
            );
            return updatedUsers;
        });
    }, [updated_member])

    return (
        <TableCard
            title={Config.MEMBER_TYPE_PLURAL}
            data={members}
            itemsPerPage={10}
            searchBy={(member, term) =>
                member.user_reltn.last_name.toLowerCase().startsWith(term.toLowerCase())
            }
            renderTable={(data) => (
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th><Eyeglasses /></th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((member, index) => (
                            <tr key={member.id || index}>
                                <Tippy content="View" delay={[250, 100]} placement="bottom">
                                    <td
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handle_selected(member)}
                                    >
                                        <EyeFill />
                                    </td>
                                </Tippy>
                                <td>{member.user_reltn.first_name}</td>
                                <td>{member.user_reltn.last_name}</td>
                                <td>{member.user_reltn.phone_number ?? ''}</td>
                                <td>{member.user_reltn.is_active ? <CircleFill color='green' /> : <SlashCircle color='red' />}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        />
    );
}