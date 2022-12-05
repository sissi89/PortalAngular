export interface Auth{
    status:string,
    token:string,
    scope: 1 | 2 | 3,
    username:string,
    password:string
}

export interface User{
    id:number,
    username:string,
    password:string,
    token:string
    scope:number,
    role:string
}