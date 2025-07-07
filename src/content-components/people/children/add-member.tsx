import Tippy from "@tippyjs/react"
import { Button, Card } from "react-bootstrap"
import { PersonRaisedHand } from "react-bootstrap-icons"
import { Config } from "../../../config"
import { useEffect, useState } from "react"
import { ChapterMember } from "../ts/interfaces"
import { NoUserSelected } from "../common/empty-selected"
import { Typeahead } from 'react-bootstrap-typeahead';
import { MultiSelectOption } from "../../../common/interfaces"
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { groupOptions } from "../ts/constants"
import { memberPermissionUtil } from "../utils/permissions_utils"

interface AddMemberProps {
    updated_future_members: ChapterMember | null

}

export function AddMember({
    updated_future_members
}: AddMemberProps) {
    const [isAdding, setIsAdding] = useState<boolean>(false)
    const [groupOptions,setGroupOptions] = useState<MultiSelectOption[]>([])
    const [fullfillerOptions,setFullfillerOptions] = useState<MultiSelectOption[]>([])
    const [selectedGroups, setSelectedGroups] = useState<MultiSelectOption[]>([]);

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

    return (
        <Card className="shadow" style={{ minHeight: '80vh' }}>
            <Card.Header className="secondary-nav" style={{ minHeight: '3.5rem' }}>
                <div className="d-flex justify-content-end align-items-center">
                    {!isAdding &&
                        <Tippy content={`Add a ${Config.FUTURE_MEMBER_TYPE_SINGLE}`} delay={[250, 100]} placement="bottom">
                            <Button
                                onClick={() => setIsAdding(true)}
                                style={{ minWidth: '5rem', marginRight: '.5rem' }}
                                size='sm'
                                variant='outline-success'
                            >
                                {`Add ${Config.FUTURE_MEMBER_TYPE_SINGLE}`}
                            </Button>
                        </Tippy>
                    }
                </div>
            </Card.Header>
            <Card.Body className="content">
                {isAdding ? (
                    <Typeahead
                        id="group-collector"
                        multiple
                        labelKey="label"
                        options={groupOptions}
                        selected={selectedGroups}
                        onChange={(selected) => setSelectedGroups(selected as MultiSelectOption[])}
                        placeholder="Select groups..."
                    />
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