import { fetcher } from "@/api/fetcher"
import { AdminCheck, AdminLogin, AdminRegister, AdminValid } from "@/types/dto/admin"
import constants from "@/lib/constants"

export const LOGIN_REQUEST_ENDPOINT = `${constants.API_PREFIX}/admin/validate`
export async function loginRequest(params: AdminLogin) {
    return fetcher.post<AdminLogin, AdminValid>(LOGIN_REQUEST_ENDPOINT, params)
}

export const CHECK_ADMIN_EXISTS_ENDPOINT = `${constants.API_PREFIX}/admin`
export async function checkAdminExists() {
    return fetcher.get<AdminCheck>(CHECK_ADMIN_EXISTS_ENDPOINT)
}

export const REGISTER_ADMIN_ENDPOINT = `${constants.API_PREFIX}/admin/create`
export async function registerAdmin(params: AdminRegister) {
    return fetcher.post<AdminRegister, void>(REGISTER_ADMIN_ENDPOINT, params)
}