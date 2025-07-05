import { axiosBaseURL, getConfig } from "../../../https";
import { RequestObject } from "../ts/interface";

interface ResponseObj {
    [key: string]: any;
}

interface NoteFields {
    note_type: string,
    note_text: string,
}


export class RequestAPIHandler {
    private current: RequestObject;
    private previous: RequestObject;
    private note: NoteFields | null;

    constructor(current: RequestObject, previous: RequestObject, note: NoteFields | null) {
        this.current = current
        this.previous = previous
        this.note = note

    }

    updateRequestAPICall = async () => {
        if (!this._canSubmit()) {
            return "No changes to submit.";
        }

        const response: ResponseObj = await axiosBaseURL.post(
            "request_api/requests/update_request/", this._getRequestData(), getConfig()
        );
        return response.data
    };

    private _canSubmit = (): boolean => {
        return (Object.keys(this.current).some(
            key => this.current[key as keyof RequestObject] !== this.previous[key as keyof RequestObject]
        ) || (!!this.note && !!this.note.note_text && !!this.note.note_type))
    }

    private _getRequestData = () => {
        const data: any = {
            request_id: this.current.id,
            request_fields: {
                fullfiller__id: this.current?.fullfiller ? this.current.fullfiller.id : null,
                status: this.current?.status,
            },
            note: this.note && this.note.note_text && this.note.note_type ? this.note : null
        };
        return data
    }

}