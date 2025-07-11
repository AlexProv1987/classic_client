import { Card, Col, Form, Row } from "react-bootstrap"
import { ChapterMember } from "../ts/interfaces"
import Tippy from "@tippyjs/react"
import { MultiSelectOption } from "../../../common/interfaces"
import { NoUserSelected } from "../../common/empty-selected"
import { Config } from "../../../config"
import { PersonBadge } from "react-bootstrap-icons"
import { useEffect, useRef, useState } from "react"
import { memberPermissionUtil } from "../utils/permissions_utils"
import { Typeahead } from "react-bootstrap-typeahead"
import { axiosBaseURL, getConfig } from "../../../https"
import { toast } from "react-toastify"

interface UserFlyOutProps {
    handle_close: (user: ChapterMember | null) => void,
    update_callback: (user: ChapterMember | null) => void,
    member: ChapterMember | null,
}

export const MemberFlyOut: React.FC<UserFlyOutProps> = ({ handle_close, update_callback, member }: UserFlyOutProps) => {
    const [groupOptions, setGroupOptions] = useState<MultiSelectOption[]>([])
    const [selectedGroups, setSelectedGroups] = useState<MultiSelectOption[]>([]);
    const [fullfillerOptions, setFullfillerOptions] = useState<MultiSelectOption[]>([])
    const [selectedFullfillerOptions, setSelectedFullfillerOptions] = useState<MultiSelectOption[]>([])
    const [isActive, setIsActive] = useState(false)

    const ogGroupsRef = useRef<MultiSelectOption[]>([])
    const ogFullfiller = useRef<MultiSelectOption[]>([])

    useEffect(() => {
        if (!member) return;
        axiosBaseURL
            .get(`organization_api/member_management/get_chapter_member/?member_id=${member.id}`, getConfig())
            .then((response) => {
                //unpack response.data
                const { group_options, available_fullfillment_types, current_groups, fullfillment, member } = response.data;

                //get our current groups and fullfill roles
                const currGroups = memberPermissionUtil.mapGroupOpts(current_groups)
                const currFullfill = memberPermissionUtil.mapFullfillmentObjectToOpts(fullfillment)

                //save the Ogs to compare for update
                ogGroupsRef.current = currGroups
                ogFullfiller.current = currFullfill

                //just in case someone recently updated well go ahead and reset this from server
                setIsActive(member.active)

                //set up our multi selects
                setGroupOptions(memberPermissionUtil.mapGroupOpts(group_options))
                setFullfillerOptions(memberPermissionUtil.mapFullfillerOpts(available_fullfillment_types))
                setSelectedGroups(currGroups)
                setSelectedFullfillerOptions(currFullfill)
            })
            .catch((error) => {
                toast.error('Error has occurred fetching data.');
            }).finally(() => {
                //..some loading thing here
            })
    }, [member]);

    useEffect(() => {
        const loadOptions = async () => {
            try {
                const options = await memberPermissionUtil.getGroupOptions();
                const fullfillerOptions = await memberPermissionUtil.getFulfillerOptions();
                setGroupOptions(options);
                setFullfillerOptions(fullfillerOptions)
            } catch (err) {
                console.error("Failed to load group options", err);
            }
        };
        loadOptions();
    }, []);

    const handleExonereeActive = (action: "inactivate" | "activate") => {
        //we need to handle here the fact we pop out group option of chapter manager - we dont want someone to save a manager
        //and remove their manager status
    }

    return (
        <Card className="shadow" style={{ minHeight: '80vh' }}>
            {member ? (
                <>
                    <Card.Header className="secondary-nav" style={{ minHeight: '3.5rem' }}>
                        <div className="d-flex justify-content-end align-items-center">
                            <Tippy content="Update and close" delay={[250, 100]} placement="bottom">
                                <button onClick={() => { }} className="btn btn-outline-primary btn-sm me-2">Update</button>
                            </Tippy>
                            <Tippy content="Save and Stay here" delay={[250, 100]} placement="bottom">
                                <button onClick={() => { }} className="btn btn-outline-primary btn-sm me-2">Save</button>
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
                            <Row>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Check
                                            type="switch"
                                            id="custom-switch"
                                            label="Active"
                                            checked={isActive}
                                            isValid={isActive}
                                            isInvalid={!isActive}
                                            onChange={(e) => setIsActive(e.target.checked)}
                                        />
                                        {!isActive && (
                                            <div className="invalid-feedback d-block">
                                                WARNING: Inactivating this user will unassign all their assigned requests and lock them out of the system.
                                            </div>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="disabledTextInput">Permissions</Form.Label>
                                <Typeahead
                                    id="group-collector"
                                    multiple
                                    labelKey="label"
                                    options={groupOptions}
                                    selected={selectedGroups}
                                    onChange={(selected) => setSelectedGroups(selected as MultiSelectOption[])}
                                    placeholder="Select groups..."
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="disabledTextInput">Fullfillment Roles</Form.Label>
                                <Typeahead
                                    id="group-collector"
                                    multiple
                                    labelKey="label"
                                    options={fullfillerOptions}
                                    selected={selectedFullfillerOptions}
                                    onChange={(selected) => setSelectedFullfillerOptions(selected as MultiSelectOption[])}
                                    placeholder="Select fullfillment roles..."
                                />
                            </Form.Group>
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