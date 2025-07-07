import Tippy from "@tippyjs/react"
import { Table } from "react-bootstrap"
import { CircleFill, EyeFill, Eyeglasses, SlashCircle } from "react-bootstrap-icons"
import { Config } from "../../../config"
import { useEffect, useState } from "react"
import { axiosBaseURL, getConfig } from "../../../https"
import { sessionManager } from "../../../utils/session-manager"
import { ChapterMember, PendingMember, UserProfile } from "../ts/interfaces"
import { PersonTableCard } from "../common/person-table-card"


export const PendingMembersList: React.FC = () => {
    const [pendingMembers, setPendingMembers] = useState<PendingMember[] | null>(null)

    useEffect(() => {
        axiosBaseURL
            .get(`member_token_api/member_tokens/pending_members/?chapter_reltn=${sessionManager.getChapterID()}`, getConfig())
            .then((response) => {
                console.log(response.data)
                setPendingMembers(response.data)
            })
            .catch((error) => {
                alert('error')
            }).finally(() => {

            })
    }, [])

    const getPendingTime = (createdString: string): number => {
        const today = new Date();
        const created = new Date(createdString);
        const differenceInMillis = created.getTime() - today.getTime();
        const pendingDays = Math.abs(Math.round(differenceInMillis / (1000 * 60 * 60 * 24)));
        return pendingDays;
    };

    return (
        <PersonTableCard
            title={Config.FUTURE_MEMBER_TYPE_PLURAL}
            data={pendingMembers}
            itemsPerPage={3}
            searchBy={(member, term) =>
                member.full_name.toLowerCase().startsWith(term.toLowerCase())
            }
            renderTable={(data) => (
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Created</th>
                            <Tippy content="Pending time in days" delay={[250, 100]} placement="bottom">
                            <th>Pending</th>
                            </Tippy>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((member, index) => (
                            <tr key={member.id || index}>
                                <td>{member.full_name}</td>
                                <td>{member.phone_number}</td>
                                <td>{member.created.split('T')[0]}</td>
                                <td>{getPendingTime(member.created)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        />
    );
}