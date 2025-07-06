import React, { useState } from 'react';
import { Container, Row, Col, Alert, Fade } from 'react-bootstrap';
import { UserList } from './users-list';
import { UserProfile } from '../ts/interfaces';
import { UserFlyOut } from './user-fly-out';
import { AlertInfo } from '../../../common/interfaces';


export const Users: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
    const [alert, setAlert] = useState<AlertInfo | null>(null)
    const [updatedUser, setUpdatedUser] = useState<UserProfile | null>(null)

    const handleToggle = (user: UserProfile | null) => {
        setSelectedUser(user)
    };

    const handleUpdate = (user: UserProfile | null, alert: AlertInfo) => {
        console.log('handle update users.tsx')
        setUpdatedUser(user)
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
                    <UserList
                        handle_selected={handleToggle}
                        updated_user={updatedUser}
                    />
                </Col>
                <Col xs={6}>
                    <div>
                        <UserFlyOut
                            handle_close={handleToggle}
                            user={selectedUser}
                            update_callback={handleUpdate}
                        />
                    </div>

                </Col>

            </Row>
        </Container>
    );
};
