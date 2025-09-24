export interface DeviceUploadLocal {
    hostname: string,
    location: string | undefined,
    model: string | undefined,
    os_version: string | undefined
    file: File | null
}


export function CreateDefault_DeviceUploadLocal(): DeviceUploadLocal {
    return {
        hostname: '',
        location: '',
        model: '',
        os_version: '',
        file: null
    }
}