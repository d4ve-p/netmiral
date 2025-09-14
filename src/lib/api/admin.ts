import { fetcher } from "@/api/fetcher"
import { AdminLogin } from "@/types/dto/admin"
import constants from "@/lib/constants"

export const LOGIN_REQUEST_ENDPOINT = `${constants.API_PREFIX}/admin/validate`
export async function loginRequest(params: AdminLogin) {
    return fetcher.post<AdminLogin, void>(LOGIN_REQUEST_ENDPOINT, params)
}
