import { useState } from "react";
import { MemberList } from "./member-list"
import { ChapterMember } from "../ts/interfaces";
import { AlertInfo } from "../../../common/interfaces";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { MemberFlyOut } from "./member-fly-out";

export const Members = () => {
    const [selectedMember, setSelectedMember] = useState<ChapterMember | null>(null);
    const [alert, setAlert] = useState<AlertInfo | null>(null)
    const [updatedMember, setUpdatedMember] = useState<ChapterMember | null>(null)

    const handleToggle = (member: ChapterMember | null) => {
        setSelectedMember(member)
    };

    const handleUpdate = (member: ChapterMember | null, alert: AlertInfo) => {
        console.log('handle update users.tsx')
        setUpdatedMember(member)
        setAlert(alert)
        handleToggle(null)
    }

    return (
        <Container fluid>
            <Row className='mt-2'>
                {/**idk how i feel about this it boops  */}
                {alert &&
                    <Alert
                        key={alert.id}
                        dismissible
                        variant={alert.variant}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            zIndex: 10,
                            borderRadius: 0,
                        }}
                    >
                        {alert.message}
                    </Alert>
                }

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