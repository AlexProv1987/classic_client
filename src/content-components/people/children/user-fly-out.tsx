import { Button, ButtonGroup, Card, Dropdown } from "react-bootstrap"
import { UserProfile } from "../ts/interfaces"
import { UserTiers } from "../../../common/types"
import Tippy from "@tippyjs/react"
import { AlertInfo } from "../../../common/interfaces"
import { BouncingDotsLoader } from "../../common/bouncy-loader"
import { NoUserSelected } from "./empty-selected"

interface UserFlyOutProps {
    handle_close: (user: UserProfile | null) => void,
    update_callback: (user: UserProfile | null, alert: AlertInfo) => void,
    user: UserProfile | null,
}

export const UserFlyOut: React.FC<UserFlyOutProps> = (props) => {
    const tiersArray: UserTiers[] = [1, 2, 3, 4, 5]
    return (
        <Card className="shadow" style={{ minHeight: '80vh' }}>
            {props.user ? (
                <>
                    <Card.Header style={{ minHeight: '3.5rem' }}>
                        <div className="d-flex justify-content-end align-items-center">
                                <Tippy content={props.user.user.is_active ? `Ban ${props.user.user.first_name}` : `Re-Activate ${props.user.user.first_name}`} delay={[250, 100]} placement="bottom">
                                    <Button
                                        style={{ minWidth: '5rem', marginRight:'.5rem' }}
                                        size='sm'
                                        variant={props.user.user.is_active ? 'outline-danger' : 'outline-success'}
                                    >
                                        {props.user.user.is_active ? 'Ban' : 'Activate'}
                                    </Button>
                                </Tippy>
                                {props.user.user.is_active &&
                                    <Dropdown as={ButtonGroup}>
                                        <Tippy content={`Change ${props.user.user.first_name}'s Tier.`} delay={[250, 100]} placement="bottom">
                                            <Button style={{ minWidth: '5rem' }} variant="outline-primary" size='sm'>Tier</Button>
                                        </Tippy>

                                        <Dropdown.Toggle split variant="outline-primary" size='sm' id="dropdown-split-basic" />

                                        <Dropdown.Menu>
                                            {
                                                tiersArray.map(function (tier) {
                                                    return (
                                                        <Dropdown.Item onClick={() => { }} key={tier}>{`Tier: ${tier}`}</Dropdown.Item>
                                                    )
                                                })
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                }
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <p>This panel fades in from the right.</p>
                        <ul>
                            <li>Exoneree 1</li>
                            <li>Exoneree 2</li>
                            <li>Exoneree 3</li>
                        </ul>
                    </Card.Body>
                    <Card.Footer style={{ minHeight: '3rem' }}>
                        <div className="d-flex justify-content-end align-items-center gap-2">
                        </div>
                    </Card.Footer>
                </>
            ) : (
                <>
                    <Card.Header style={{ minHeight: '3.5rem' }}></Card.Header>
                    <Card.Body><NoUserSelected /></Card.Body>
                    <Card.Footer style={{ minHeight: '3rem' }}></Card.Footer>
                </>
            )


            }

        </Card>
    )
}

/**
 * 
 *                            <div>
                                <h4>{props.user.user.first_name} {props.user.user.last_name} — Tier: {props.user.user_tier}</h4>
                            </div>
 */