import { useEffect, useState } from "react";
import { sessionManager } from "../../utils/session-manager";
import { axiosBaseURL, getConfig } from "../../https";
import { RequestObject } from "./ts/interface";
import { RequestList } from "./children/list";
import { RecordView } from "./children/record-view";
import { ListRequestNav } from "./children/list-sub-nav";
import { FilterType } from "./ts/type";
import { Col, Container, Row } from "react-bootstrap";
type SortableRequestField =
    | keyof RequestObject
    | 'exoneree_name'
    | 'fullfiller_name';

export const Requests: React.FC = () => {
    //state vars
    const [requestObjArr, setRequestObjArr] = useState<RequestObject[]>([]);
    const [filterType, setFilterType] = useState<FilterType>('all');
    const [selectedItem, setSelectedItem] = useState<RequestObject | null>(null);
    const [sortConfig, setSortConfig] = useState<{ key: keyof RequestObject; direction: 'asc' | 'desc' } | null>(null);
   
    //initial hook to make request
    useEffect(() => {
        axiosBaseURL
            .get(`request_api/requests/${getURLParam()}`, getConfig())
            .then((response) => {
                setRequestObjArr(sortRequests(response.data));
            })
            .catch((error) => {
                console.error(error);
            })
    }, []);

    //call sortRequestObjArr when sortConfig updates
    useEffect(() => {
        setRequestObjArr(prev => sortRequests(prev));
    }, [sortConfig]);

    //check session for request url
    const getURLParam = (): string => {
        if (sessionManager.getGroups().includes('chapter_manager')) {
            return `chapter_requests/?chapter_id=${sessionManager.getChapterID()}`;
        } else {
            return `fullfiller_requests/?chapter_id=${sessionManager.getChapterID()}&member_id=${sessionManager.getMemberID()}`;
        }
    }

    //update the state of our object array - re sort and set our alerts and item to null
    const handleUpdateCallback = (updated: RequestObject) => {
        setRequestObjArr(prev => {
            const updatedList = prev.map(item =>
                item.id === updated.id ? updated : item
            );
            return sortRequests(updatedList);
        });
    };

    //function for sorting based on a key from the requestobject or combined vals - if you need more of these add another | string to the SortableRequestField type
    const sortRequests = (requests: RequestObject[]): RequestObject[] => {
        //if nothing is sorted return the OG 
        if (!sortConfig) return requests;

        //get the config
        const { key, direction } = sortConfig;
        //copy to leave og alone
        const sorted = [...requests];


        //decide what we are sorting on and how and do it
        sorted.sort((a, b) => {
            let aVal: string | number = '';
            let bVal: string | number = '';

            if (key === 'exoneree_name') {
                aVal = `${a.exoneree_reltn.first_name} ${a.exoneree_reltn.last_name}`.toLowerCase();
                bVal = `${b.exoneree_reltn.first_name} ${b.exoneree_reltn.last_name}`.toLowerCase();
            } else if (key === 'fullfiller_name') {
                aVal = a.fullfiller
                    ? `${a.fullfiller.user_first_name} ${a.fullfiller.user_last_name}`.toLowerCase()
                    : '';
                bVal = b.fullfiller
                    ? `${b.fullfiller.user_first_name} ${b.fullfiller.user_last_name}`.toLowerCase()
                    : '';
                //i may have fk'd this one up...once I get to a new day need to see if it sorts right
            } else if (key === 'updated') {
                aVal = new Date(a.updated).getTime();
                bVal = new Date(b.updated).getTime();
            }
            else {
                aVal = (a[key] || '').toString().toLowerCase();
                bVal = (b[key] || '').toString().toLowerCase();
            }
            if (aVal < bVal) return direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        return sorted;
    };

    //sort config updating to handle re render
    const handleColumnSort = (key: SortableRequestField) => {
        setSortConfig((prev) => {
            if (prev?.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { key, direction: 'asc' };
        });
    };

    //string filter && assigned v unassigned v open
    const filteredRequests = requestObjArr
        .filter((request) => {
            if (filterType === 'with') return request.fullfiller !== null;
            if (filterType === 'without') return request.fullfiller === null;
            return true;
        });

    return (
        <Container fluid>
            <ListRequestNav
                filter_setter={setFilterType}
            />
            <Row className='mt-2'>
                {/**idk how i feel about this it boops  */}
                <Col md={6}>
                    <RequestList
                        records={filteredRequests}
                        set_record={setSelectedItem}
                        on_sort={handleColumnSort}
                        sort_config={sortConfig}
                    />
                </Col>
                <Col xs={6}>
                    <div>
                        <RecordView
                            current={selectedItem}
                            on_update={handleUpdateCallback}
                        />
                    </div>

                </Col>

            </Row>
        </Container>
    )
}

/**
 * 
 *  <div>
            {!selectedItem ? (
                <>
                    <ListRequestNav
                        filter_setter={setFilterType}
                        search_setter={setSearchQuery}
                    />
                    <nav>
                        {alert &&
                            <Alert
                                key={alert.id}
                                dismissible
                                variant={alert.variant}
                                style={{
                                    width: "100%",
                                    zIndex: 1060,
                                    borderRadius: 0,
                                }}
                            >
                                {alert.message}
                            </Alert>
                        }
                    </nav>
                    <RequestList
                        records={requestObjArr}
                        set_record={setSelectedItem}
                        on_sort={handleColumnSort}
                        sort_config={sortConfig}
                    />
                </>
            ) : (
                <RecordView
                    set_selected={handleBack}
                    current={selectedItem}
                    on_update={handleUpdateCallback}
                />
            )}
        </div>
 */