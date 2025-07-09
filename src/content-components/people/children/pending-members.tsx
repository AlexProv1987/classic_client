import { useState } from "react";
import { PendingMember } from "../ts/interfaces";
import { AlertInfo } from "../../../common/interfaces";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { PendingMembersList } from "./pending-member-list";
import { AddMember } from "./add-member";


export const FutureMembers = () => {
    const [alert, setAlert] = useState<AlertInfo | null>(null)
    const [addedMember, setAddedMember] = useState<PendingMember | null>(null)

    const handleUpdate = (member: PendingMember | null, alert: AlertInfo) => {
        setAddedMember(member)
        setAlert(alert)
    }

    return (
        <Container fluid>
            <Row className='mt-2'>
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