export interface DecodedToken {
    Role : string[];
    aud : string;
    exp : number;
    iss : string;
    nbf : number;
}

export enum Roles {
    Admin = 1,
    User = 2,
    RestaurantOwner = 3,
}