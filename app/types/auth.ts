export interface User {
    id: string
    email: string
    firstName?: string
    lastName?: string
}

export interface LoginResponse {
    message: string
    exp: number
    token: string
    user: User
}
