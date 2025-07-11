import { useState } from "react";
import { PendingMember } from "../ts/interfaces";
import { Col, Container, Row } from "react-bootstrap";
import { PendingMembersList } from "./pending-member-list";
import { AddMember } from "./add-member";


export const FutureMembers = () => {
    const [addedMember, setAddedMember] = useState<PendingMember | null>(null)

    const handleUpdate = (member: PendingMember | null) => {
        setAddedMember(member)
    }

    return (
        <Container fluid>
            <Row className='mt-2'>
                <Col md={6}>
                    <PendingMembersList
                        added_member={addedMember}
                    />
                </Col>
                <Col xs={6}>
                    <div>
                        <AddMember
                            updated_future_members={handleUpdate}
                        />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}