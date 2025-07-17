import { Button, ButtonGroup, Card, Col, Dropdown, Form, Row, Table } from "react-bootstrap"
import { UserHist, UserProfile } from "../ts/interfaces"
import { UserTiers } from "../../../common/types"
import Tippy from "@tippyjs/react"
import { BouncingDotsLoader } from "../../common/bouncy-loader"
import { NoUserSelected } from "../../common/empty-selected"
import { Config, ToastMessages } from "../../../config"
import { Activity, ArrowLeftCircle, ArrowRightCircle, PersonFill } from "react-bootstrap-icons"
import { useEffect, useState } from "react"
import { axiosBaseURL, getConfig } from "../../../https"
import { toast } from "react-toastify"
import { actionMapArr } from "../ts/constants"

const getHistAction = (action: string): string => {
    const label = actionMapArr.find(f => f.name === action)
    return label?.label || ''
}


interface UserFlyOutProps {
    update_callback: (user: UserProfile | null) => void,
    user: UserProfile | null,
}

export const UserFlyOut: React.FC<UserFlyOutProps> = ({ update_callback, user }: UserFlyOutProps) => {
    const [userHist, setUserHist] = useState<UserHist[] | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1);

    const tiersArray: UserTiers[] = [1, 2, 3, 4, 5]
    const notesPerPage = 3;

    // Calculate indices
    const totalNotes = userHist?.length || 0;
    const totalPages = Math.ceil(totalNotes / notesPerPage);
    const startIndex = (currentPage - 1) * notesPerPage;
    const endIndex = Math.min(startIndex + notesPerPage, totalNotes);
    const curretHist = userHist?.slice(startIndex, endIndex) || [];

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    useEffect(() => {
        if (!user) return;
        axiosBaseURL
            .get(`exoneree_management_api/exoneree_management/exoneree_hist/?user_id=${user.user.id}`, getConfig())
            .then((response) => {
                setUserHist(response.data)
            })
            .catch((error) => {
                //..
            }).finally(() => {
                //..
            })
    }, [user]);

    const handleExonereeActive = (action: "inactivate" | "activate") => {
        axiosBaseURL.post("exoneree_management_api/exoneree_management/manage_exoneree_status/", { profile_id: user?.id, action: action }, getConfig())
            .then(function (response) {
                //this response.data obj does return the added history note - since we navigate away not grabbing but its avail
                update_callback(response.data.user_profile)
                toast.success(`${user?.user.first_name} has been ${response.data.user_profile.user.is_active ? 'Re-Activated' : 'Banned.'}`)
            })
            .catch(function (error) {
                console.error(error)
            })
            .finally(function () {
                //..
            });
    }

    const handleExonereeTierChange = (tier: number) => {
        axiosBaseURL.post("exoneree_management_api/exoneree_management/change_tier/", { profile_id: user?.id, tier: tier }, getConfig())
            .then(function (response) {
                //this response.data obj does return the added history note - since we navigate away not grabbing but its avail
                update_callback(response.data.user_profile)
                toast.success(ToastMessages.TIER_UP(user?.user.first_name, tier, user?.user_tier))
            })
            .catch(function (error) {

            })
            .finally(function () {

            });
    }

    return (
        <Card className="shadow" style={{ minHeight: '85vh' }}>
            {user ? (
                <>
                    <Card.Header className="secondary-nav" style={{ minHeight: '3.5rem' }}>
                        <div className="d-flex justify-content-end align-items-center">
                            <Tippy content={user.user.is_active ? `Ban ${user.user.first_name}` : `Re-Activate ${user.user.first_name}`} delay={[250, 100]} placement="bottom">
                                <Button
                                    onClick={() => handleExonereeActive(user?.user.is_active ? 'inactivate' : 'activate')}
                                    style={{ minWidth: '5rem', marginRight: '.5rem' }}
                                    size='sm'
                                    variant={user.user.is_active ? 'outline-danger' : 'outline-success'}
                                >
                                    {user.user.is_active ? 'Ban' : 'Activate'}
                                </Button>
                            </Tippy>
                            {user.user.is_active &&
                                <Dropdown as={ButtonGroup}>
                                    <Tippy content={`Change ${user.user.first_name}'s Tier.`} delay={[250, 100]} placement="bottom">
                                        <Button style={{ minWidth: '5rem' }} variant="outline-primary" size='sm'>Tier</Button>
                                    </Tippy>

                                    <Dropdown.Toggle split variant="outline-primary" size='sm' id="dropdown-split-basic" />

                                    <Dropdown.Menu>
                                        {
                                            tiersArray.map(function (tier) {
                                                return (
                                                    <Dropdown.Item disabled={tier === user.user_tier ? true : false} onClick={() => handleExonereeTierChange(tier)} key={tier}>{`Tier: ${tier}`}</Dropdown.Item>
                                                )
                                            })
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            }
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
                                            placeholder={user.user.first_name}
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
                                            placeholder={user.user.last_name}
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
                                            placeholder={user.user.username}
                                            aria-label="Disabled input example"
                                            disabled
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="disabledTextInput">Tier</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={`${user.user_tier}`}
                                            aria-label="Disabled input example"
                                            disabled
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                        {userHist === null ? (
                            <div className="mt-2">
                                <BouncingDotsLoader vh='100' />
                            </div>
                        ) : userHist.length === 0 ? (
                            <p className="text-muted text-center mt-3">No history found.</p>
                        ) : (
                            <div>
                                <div className="d-flex justify-content-between align-items-center mb-2 mt-2">
                                    <span className="badge bg-secondary">
                                        {totalNotes === 0 ? 0 : startIndex + 1} - {endIndex} of {totalNotes}
                                    </span>

                                    <div className="d-flex align-items-center gap-2">
                                        <Tippy content="Previous" delay={[250, 100]} placement="bottom">
                                            <ArrowLeftCircle
                                                className="icon-no-focus"
                                                size={20}
                                                style={{ cursor: currentPage > 1 ? 'pointer' : 'not-allowed', opacity: currentPage > 1 ? 1 : 0.5 }}
                                                onClick={prevPage}
                                            />
                                        </Tippy>
                                        <Tippy content="Next" delay={[250, 100]} placement="bottom">
                                            <ArrowRightCircle
                                                className="icon-no-focus"
                                                size={20}
                                                style={{ cursor: currentPage < totalPages ? 'pointer' : 'not-allowed', opacity: currentPage < totalPages ? 1 : 0.5 }}
                                                onClick={nextPage}
                                            />
                                        </Tippy>
                                    </div>
                                </div>
                                {curretHist.map((hist, index) => (
                                    <Card key={index} className="mb-2">
                                        <Card.Header>
                                            {hist.created_by_first_name} {hist.created_by_last_name} - {hist.created.split('T')[0]}
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text><span className="me-2"><Activity size={20} color='red' /></span>{getHistAction(hist.action)}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        )}
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
                            message={`No ${Config.USER_TYPE_SINGLE} Selected`}
                            optional_msg={`Click an eye icon to view ${Config.USER_TYPE_SINGLE} details`}
                            icon={PersonFill}
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