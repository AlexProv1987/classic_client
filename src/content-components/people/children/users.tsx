import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { UserList } from './users-list';
import { UserProfile } from '../ts/interfaces';
import { UserFlyOut } from './user-fly-out';

export const Users: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
    const [updatedUser, setUpdatedUser] = useState<UserProfile | null>(null)

    const handleToggle = (user: UserProfile | null) => {
        setSelectedUser(user)
    };

    const handleUpdate = (user: UserProfile | null) => {
        setUpdatedUser(user)
        setSelectedUser(user)
    }

    return (
        <Container fluid>
            <Row className='mt-2'>
                <Col md={6}>
                    <UserList
                        handle_selected={handleToggle}
                        updated_user={updatedUser}
                    />
                </Col>
                <Col xs={6}>
                        <UserFlyOut
                            user={selectedUser}
                            update_callback={handleUpdate}
                        />
                </Col>
            </Row>
        </Container>
    );
};
