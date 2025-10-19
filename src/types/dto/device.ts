export interface DeviceUploadLocal {
    hostname: string,
    location: string | undefined,
    model: string | undefined,
    os_version: string | undefined,
    file: File | undefined
}

export interface DeviceCredential {
    username: string,
    password: string
}

export interface DeviceUploadActive {
    hostname: string,
    ip_address: string,
    location: string | undefined,
    model: string | undefined,
    os_version: string | undefined,
    credentials: DeviceCredential
}

export type DevicePutActive = Omit<DeviceUploadLocal, 'file'> & {
    id: string,
    config_text: string
}


export function CreateDefault_DeviceUploadLocal(): DeviceUploadLocal {
    return {
        hostname: '',
        location: '',
        model: '',
        os_version: '',
        file: undefined
    }
}

export function CreateDefault_DeviceUploadActive(): DeviceUploadActive {
    return {
        hostname: '',
        ip_address: '',
        location: '',
        model: '',
        os_version: '',
        credentials: {
            username: '',
            password: ''
        }
    }
}