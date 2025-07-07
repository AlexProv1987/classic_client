import { Button, Card, Col, Form, Row } from "react-bootstrap"
import { ChapterMember } from "../ts/interfaces"
import Tippy from "@tippyjs/react"
import { AlertInfo } from "../../../common/interfaces"
import { BouncingDotsLoader } from "../../common/bouncy-loader"
import { NoUserSelected } from "../common/empty-selected"
import { Config } from "../../../config"
import { PersonBadge} from "react-bootstrap-icons"
import { useEffect, useState } from "react"
import { axiosBaseURL, getConfig } from "../../../https"

interface UserFlyOutProps {
    handle_close: (user: ChapterMember | null) => void,
    update_callback: (user: ChapterMember | null, alert: AlertInfo) => void,
    member: ChapterMember | null,
}

export const MemberFlyOut: React.FC<UserFlyOutProps> = ({ handle_close, update_callback, member }: UserFlyOutProps) => {

    console.log(member)
    const handleExonereeActive = (action: "inactivate" | "activate") => {
       
    }

    return (
        <Card className="shadow" style={{ minHeight: '80vh' }}>
            {member ? (
                <>
                    <Card.Header className="secondary-nav" style={{ minHeight: '3.5rem' }}>
                        <div className="d-flex justify-content-end align-items-center">
                            <Tippy content={member.user_reltn.is_active ? `Ban ${member.user_reltn.first_name}` : `Re-Activate ${member.user_reltn.first_name}`} delay={[250, 100]} placement="bottom">
                                <Button
                                    onClick={() => handleExonereeActive(member.user_reltn.is_active ? 'inactivate' : 'activate')}
                                    style={{ minWidth: '5rem', marginRight: '.5rem' }}
                                    size='sm'
                                    variant={member.user_reltn.is_active ? 'outline-danger' : 'outline-success'}
                                >
                                    {member.user_reltn.is_active ? 'Ban' : 'Activate'}
                                </Button>
                            </Tippy>
                        </div>
                    </Card.Header>
                    <Card.Body className="content">
                        <Form>
                            <Row className="justify-content-md-center">
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="disabledTextInput">First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={member.user_reltn.first_name}
                                            aria-label="Disabled input example"
                                            disabled
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="disabledSelect">Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={member.user_reltn.last_name}
                                            aria-label="Disabled input example"
                                            disabled
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="disabledSelect">Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={member.user_reltn.username}
                                            aria-label="Disabled input example"
                                            disabled
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="disabledTextInput">Push Token</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={member.user_reltn.push_token}
                                            aria-label="Disabled input example"
                                            disabled
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                    <Card.Footer className="secondary-nav" style={{ minHeight: '3rem' }}>
                        <div className="d-flex justify-content-end align-items-center gap-2">
                        </div>
                    </Card.Footer>
                </>
            ) : (
                <>
                    <Card.Header className="secondary-nav" style={{ minHeight: '3.5rem' }}></Card.Header>
                    <Card.Body className="content">
                        <NoUserSelected
                            message={`No ${Config.MEMBER_TYPE_SINGLE} Selected`}
                            optional_msg={`Click an eye icon to view ${Config.MEMBER_TYPE_SINGLE} details`}
                            icon={PersonBadge}
                            icon_size={80}
                        />
                    </Card.Body>
                    <Card.Footer className="secondary-nav" style={{ minHeight: '3rem' }}></Card.Footer>
                </>
            )


            }
        </Card >
    )
}