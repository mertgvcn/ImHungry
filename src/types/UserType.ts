export type UserType = {
    id: string,
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string
}

export type loginProps = {
    userType: UserType[],
    usersCollectionRef?: any
}

