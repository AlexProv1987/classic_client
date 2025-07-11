import { useState } from "react";
import { MemberList } from "./member-list"
import { ChapterMember } from "../ts/interfaces";
import { Col, Container, Row } from "react-bootstrap";
import { MemberFlyOut } from "./member-fly-out";

export const Members = () => {
    const [selectedMember, setSelectedMember] = useState<ChapterMember | null>(null);
    const [updatedMember, setUpdatedMember] = useState<ChapterMember | null>(null)

    const handleToggle = (member: ChapterMember | null) => {
        setSelectedMember(member)
    };

    const handleUpdate = (member: ChapterMember | null) => {
        setUpdatedMember(member)
        handleToggle(null)
    }

    return (
        <Container fluid>
            <Row className='mt-2'>
                <Col md={6}>
                    <MemberList
                        handle_selected={handleToggle}
                        updated_member={updatedMember}
                    />
                </Col>
                <Col xs={6}>
                    <div>
                       <MemberFlyOut 
                        handle_close={handleToggle}
                        update_callback={handleUpdate}
                        member={selectedMember}
                       />
                    </div>

                </Col>

            </Row>
        </Container>
    )
}