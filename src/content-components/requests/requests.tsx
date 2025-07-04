import { useEffect, useState } from "react";
import { sessionManager } from "../../utils/session-manager";
import { axiosBaseURL, getConfig } from "../../https";
import { RequestObject } from "./ts/interface";
import { RequestList } from "./children/list";
import { RecordView } from "./children/record-view";
import { ListRequestNav } from "./children/list-sub-nav";
import { FilterType } from "./ts/type";

type SortableRequestField =
    | keyof RequestObject
    | 'exoneree_name'
    | 'fullfiller_name';

interface SortConfig {
    key: SortableRequestField;
    direction: 'asc' | 'desc';
}

export const Requests = () => {
    //state vars
    const [currentPage, setCurrentPage] = useState(1);
    const [requestObjArr, setRequestObjArr] = useState<RequestObject[]>([]);
    const [filterType, setFilterType] = useState<FilterType>('all');
    const [selectedItem, setSelectedItem] = useState<RequestObject | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
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

    const getURLParam = (): string => {
        if (sessionManager.getGroups().includes('chapter_manager')) {
            return `chapter_requests/?chapter_id=${sessionManager.getChapterID()}`;
        } else {
            return `fullfiller_requests/?chapter_id=${sessionManager.getChapterID()}&member_id=${sessionManager.getMemberID()}`;
        }
    }


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
            if (searchQuery.length >= 3) {
                return (
                    request.request_type.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    request.exoneree_reltn.first_name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    request.exoneree_reltn.last_name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    request.get_status_display.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    (request.fullfiller &&
                        request.fullfiller.user_first_name.toLowerCase().startsWith(searchQuery.toLowerCase())) ||
                    (request.fullfiller &&
                        request.fullfiller.user_last_name.toLowerCase().startsWith(searchQuery.toLowerCase()))
                );
            }
            return true;
        })
        .filter((request) => {
            if (filterType === 'with') return request.fullfiller !== null;
            if (filterType === 'without') return request.fullfiller === null;
            return true;
        });

    //pagination
    const pageSize = 25;
    const paginatedRequests = filteredRequests.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div>
            {!selectedItem ? (
                <>
                    <ListRequestNav
                        filter_setter={setFilterType}
                        search_setter={setSearchQuery}
                    />
                    <RequestList
                        records={paginatedRequests}
                        set_record={setSelectedItem}
                        on_sort={handleColumnSort}
                        sort_config={sortConfig}
                        page={currentPage}
                        total={filteredRequests.length}
                        page_size={pageSize}
                        set_page={setCurrentPage}
                    />
                </>
            ) : (
                <RecordView
                    set_selected={setSelectedItem}
                    current={selectedItem}
                />
            )}
        </div>
    )
}