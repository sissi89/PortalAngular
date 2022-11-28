export interface Auth{
    status:string,
    token:string,
    scope: 1 | 2 | 3,
    username:string,
    password:string
}