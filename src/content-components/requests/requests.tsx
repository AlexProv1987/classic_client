import { useEffect, useState } from "react";
import { sessionManager } from "../../utils/session-manager";
import { axiosBaseURL, getConfig } from "../../https";
import { RequestObject } from "./ts/interface";
import { RequestList } from "./children/list";
import { RecordView } from "./children/record-view";
import { ListRequestNav } from "./children/list-sub-nav";
import { FilterType } from "./ts/type";

export const Requests = () => {

    const [requestObjArr, setRequestObjArr] = useState<RequestObject[]>([]);
    const [filterType, setFilterType] = useState<FilterType>('all');
    const [selectedItem, setSelectedItem] = useState<RequestObject | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        axiosBaseURL
            .get(`request_api/requests/${getURLParam()}`, getConfig())
            .then((response) => {
                console.log(response.data)
                setRequestObjArr(sortRequests(response.data));
            })
            .catch((error) => {
                console.error(error);
            })
    }, []);

    const getURLParam = (): string => {
        const groups = sessionManager.getGroups()
        let urlParm;
        if (groups.includes('chapter_manager')) {
            urlParm = `chapter_requests/?chapter_id=${sessionManager.getChapterID()}`;
        } else {
            urlParm = `fullfiller_requests/?chapter_id=${sessionManager.getChapterID()}&member_id=${sessionManager.getMemberID()}`;
        }
        return urlParm
    }

    const sortRequests = (requests: RequestObject[]): RequestObject[] => {
        return requests.sort((a, b) => {
            const dateA = new Date(a.updated).getTime();
            const dateB = new Date(b.updated).getTime();
            return dateB - dateA;
        });
    };

    const handleUpdateSort = (updatedRequest: RequestObject): void => {
        setRequestObjArr((prevRequest) => {
            const updatedRequests = prevRequest.map((request) =>
                request.id === updatedRequest.id
                    ? { ...request, ...updatedRequest }
                    : request
            );
            const sortedRequests = sortRequests(updatedRequests);
            return sortedRequests;
        });
    }

    const filteredRequests = requestObjArr
        .filter((request) => {
            if (searchQuery.length >= 4) {
                return (
                    request.request_type.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    request.exoneree_reltn.first_name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    request.exoneree_reltn.last_name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
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
        
    return (
        <div>
            {!selectedItem ? (
                <div>
                    <ListRequestNav
                        filter_setter={setFilterType}
                        search_setter={setSearchQuery}
                    />
                    <RequestList
                        records={filteredRequests}
                        set_record={setSelectedItem}
                    />
                </div>
            ) : (
                <RecordView 
                set_selected={setSelectedItem}
                current={selectedItem}
                />
            )}
        </div>
    )
}