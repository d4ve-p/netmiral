import constants from "@/lib/constants"
import { DeviceUploadActive, DeviceUploadLocal } from "@/types/dto/device"
import { fetcher } from "./fetcher"
import { Device } from "@/types/device"

export const DEVICE_UPLOAD_LOCAL_ENDPOINT = `${constants.API_PREFIX}/device/local`
export async function deviceUploadLocal(params: DeviceUploadLocal) {
    const formData = new FormData()

    formData.append('hostname', params.hostname)
    formData.append('location', params.location!)
    formData.append('model', params.model!)
    formData.append('os_version', params.os_version!)
    formData.append('file', params.file!)

    return fetcher.post<FormData, void>(DEVICE_UPLOAD_LOCAL_ENDPOINT, formData)
}

export const DEVICE_UPLOAD_ACTIVE_ENDPOINT = `${constants.API_PREFIX}/device/active`
export async function deviceUploadActive(params: DeviceUploadActive) {
    return fetcher.post<DeviceUploadActive, void>(DEVICE_UPLOAD_ACTIVE_ENDPOINT, params)
}

export const DEVICE_GET_ALL_DEVICE_ENDPOINT = `${constants.API_PREFIX}/device`
export async function getAllDevice() {
    return fetcher.get<Device[]>(DEVICE_GET_ALL_DEVICE_ENDPOINT)
}