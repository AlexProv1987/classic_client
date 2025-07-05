export interface Person{
    id:number,
    username:string,
    first_name:string,
    last_name:string,
    is_active:boolean,
    state:string,
    city:string,
    phone_number:string,
    groups:Array<string[]>,
}

export interface UserProfile {
    id:number
    user_tier: number,
    user: Person,
}


export interface ChapterMember {
    //yolo land
    [key: string]: any;
}

export interface PendingMember {
    id:number,
    full_name:string,
    created:string,
    phone_number:string,
}