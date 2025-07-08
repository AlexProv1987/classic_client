import Tippy from "@tippyjs/react"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import { PersonRaisedHand } from "react-bootstrap-icons"
import { Config } from "../../../config"
import { useEffect, useState } from "react"
import { PendingMember } from "../ts/interfaces"
import { FormField } from "../../../common/interfaces"
import { NoUserSelected } from "../common/empty-selected"
import { Typeahead } from 'react-bootstrap-typeahead';
import { AlertInfo, MultiSelectOption } from "../../../common/interfaces"
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { memberPermissionUtil } from "../utils/permissions_utils"
import { ClsFormValidation, getFormDataForRequest } from "../../../utils/form_utils"
import { axiosBaseURL, getConfig } from "../../../https"
import { sessionManager } from "../../../utils/session-manager"
const getInitialFormData = (): FormField[] => [
    {
        label: 'Full Name',
        label_value: 'full_name',
        value: '',
        is_valid: false,
        validation_message: '',
        required: true,
        min_length: 10,
        max_length: 40,
        validation_fnc: undefined,
        keyboard_type: 'default',
    },
    {
        label: 'Phone Number',
        label_value: 'phone_number',
        value: '',
        is_valid: false,
        validation_message: '',
        required: true,
        min_length: 10,
        max_length: 15,
        validation_fnc: undefined,
        keyboard_type: 'numeric',
    },
    {
        label: 'Email',
        label_value: 'send_to_email',
        value: '',
        is_valid: false,
        validation_message: '',
        required: true,
        min_length: 5,
        max_length: 100,
        validation_fnc: undefined,
        keyboard_type: 'email-address',
    },
];

interface AddMemberProps {
    updated_future_members: (member: PendingMember | null, alert: AlertInfo) => void
}

export function AddMember({
    updated_future_members
}: AddMemberProps) {

    const [isAdding, setIsAdding] = useState<boolean>(false)
    const [groupOptions, setGroupOptions] = useState<MultiSelectOption[]>([])
    const [selectedGroups, setSelectedGroups] = useState<MultiSelectOption[]>([]);
    const [fullfillerOptions, setFullfillerOptions] = useState<MultiSelectOption[]>([])
    const [selectedFullfillerOptions, setSelectedFullfillerOptions] = useState<MultiSelectOption[]>([])
    const [formData, setFormData] = useState<FormField[]>(getInitialFormData());

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

    const handleSave = () => {
        const validationHandler = new ClsFormValidation()
        validationHandler.runValidation(formData, setFormData)
        if (!validationHandler.getHasErrors()) {
            axiosBaseURL.post("member_token_api/member_tokens/generate_member_token/", {
                chapter_id: sessionManager.getChapterID(),
                form_data: getFormDataForRequest(formData),
                groups: selectedGroups.map(item => item.value),
                fullfiller_records: selectedFullfillerOptions.map(item => item.value),
            }, getConfig())
                .then(function (response) {
                    updated_future_members(response.data, { message: `${Config.FUTURE_MEMBER_TYPE_SINGLE} token created.`, variant: 'success', id: Date.now() })
                    setFormData(getInitialFormData());
                    setSelectedGroups([]);
                    setSelectedFullfillerOptions([]);
                }).catch(function (error) {
                    updated_future_members(null, { message: error.response.data.message ? error.response.data.message : `Failed to send ${Config.FUTURE_MEMBER_TYPE_SINGLE} token`, variant: 'danger', id: Date.now() })
                }).finally(() => {
                    //..
                })
        }
    }

    const updateForm = (index: number, value: string): void => {
        setFormData(prevState => {
            const updatedFormData = [...prevState];
            updatedFormData[index].value = value;
            return updatedFormData;
        });
    };

    return (
        <Card className="shadow" style={{ minHeight: '80vh' }}>
            <Card.Header className="secondary-nav" style={{ minHeight: '3.5rem' }}>
                <div className="d-flex justify-content-end align-items-center">
                    {!isAdding &&
                        <Button
                            onClick={() => setIsAdding(true)}
                            style={{ minWidth: '5rem', marginRight: '.5rem' }}
                            size='sm'
                            variant='outline-primary'
                        >
                            {`Add ${Config.FUTURE_MEMBER_TYPE_SINGLE}`}
                        </Button>
                    }
                </div>
            </Card.Header>
            <Card.Body className="content">
                {isAdding ? (
                    <Form>
                        {formData.map((field, index) => (
                            <Form.Group className="mb-3">
                                <Form.Control
                                    placeholder={field.label}
                                    value={field.value}
                                    onChange={(e) => updateForm(index, e.target.value)}
                                    isInvalid={!field.is_valid && field.validation_message !== ''}
                                />
                                <Form.Text className="text-danger">{!field.is_valid && field.validation_message !== '' && field.validation_message}</Form.Text>
                            </Form.Group>
                        ))}
                        <Typeahead
                            id="group-collector"
                            multiple
                            labelKey="label"
                            options={groupOptions}
                            selected={selectedGroups}
                            onChange={(selected) => setSelectedGroups(selected as MultiSelectOption[])}
                            placeholder="Select groups..."
                        />
                        <Typeahead
                            className="pt-3"
                            id="group-collector"
                            multiple
                            labelKey="label"
                            options={fullfillerOptions}
                            selected={selectedFullfillerOptions}
                            onChange={(selected) => setSelectedFullfillerOptions(selected as MultiSelectOption[])}
                            placeholder="Select fullfillment roles..."
                        />
                        <Row className="pt-4 justify-content-center">
                            <Col md={6} className="text-center">
                                <Button className="w-100" variant="outline-primary" size="sm" onClick={() => handleSave()}>
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                ) :
                    (
                        <NoUserSelected
                            message={`Click the Add button at the top right to add a ${Config.FUTURE_MEMBER_TYPE_SINGLE}`}
                            icon={PersonRaisedHand}
                            icon_size={80}
                        />
                    )}
            </Card.Body>
            <Card.Footer className="secondary-nav" style={{ minHeight: '3rem' }}>
                <div className="d-flex justify-content-end align-items-center gap-2">
                </div>
            </Card.Footer>
        </Card >
    );
}