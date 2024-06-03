export interface IRole {
    id: number
    name: string
    team_id: number
    is_modifiable: boolean
}
export interface IPermission {
    id: number
    name: string
    roles: IRole[]
}
export interface ColumnType {
    header: string
    accessor?: string
    content?: any
    width?: string
}
export interface IBusinessAccount {
    id: number
    user_id?: number
    first_name: string
    last_name: string
    email: string
    phone: string
    address: string
    latitude: string
    longitude: string
    created_at?: string
}
export interface IService {
    id: number
    service_name: string
    service_description: string
    homepage_url: string
    callback_url: string
    webhook_url: string
    is_active: boolean
    is_alive: boolean
}
export interface ITeam {
    id: number
    user_id: number
    name: string
    personal_team: boolean
}
export interface IUser {
    id?: number
    name?: string
    email?: string
    is_active: boolean
    force_password_change: boolean
    profile_photo_url?: string
    roles: IRole[]
    business_accounts: IBusinessAccount[]
    email_verified_at?: string
    must_verify_email?: boolean // this is custom attribute
    created_at?: string
    updated_at?: string
    meta: any
}

export interface IServices {
    id?: number
    service_name?: string
    service_description?: string
    homepage_url?: string
    callback_url?: string
    webhook_url?: string
    created_at?: string
    updated_at?: string
}

export type SnackBarType = {
    open: boolean
    message: string
    alert?: 'success' | 'danger' | 'warning' | 'primary'
}

export type Breadcrumb = {
    label?: string
    link: string
    icon?: React.ReactNode
    isLast?: boolean
}

export type PageTitle = string
