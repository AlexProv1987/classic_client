export interface UserReltn {
    first_name: string;
    last_name: string;
    phone_number:string;
}

export interface Fullfiller {
    id:string;
    fullfilemt_role_type:string,
    fullfillment_role:string,
    user_first_name:string,
    user_last_name:string,
   [key: string]: any;
}
  
export interface Member {
    user_first_name: string;
    user_last_name: string;
}


export interface RequestObject {
    id: string;
    request_type: string;
    description: string;
    exoneree_reltn: UserReltn;
    fullfiller: Fullfiller | null;
    status: string;
    get_status_display:string;
    updated:string,
    //yolo land
    [key: string]: any;
}

export interface RequestNote {
    note_type: string;
    get_note_type_display:string;
    note_text: string;
    created:string,
}

export interface StatusOption {
  value: string;
  name: string; 
}
