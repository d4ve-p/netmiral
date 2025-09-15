export interface AdminLogin {
    password: string
}

export interface AdminRegister {
    password: string
}

export interface AdminCheck {
    admin_exists: boolean
}

export interface AdminValid {
    is_valid: boolean
}