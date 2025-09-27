import { Device } from "@/types/device";
import { DeviceContextsProps } from "@/types/props/device";
import { createContext, ReactNode, useContext, useState } from "react";

const DeviceContext = createContext<DeviceContextsProps|undefined>(undefined)

export const DeviceProvider = ({children} : {children: ReactNode}) => {
    const [device, setDevice] = useState<Device|null>(null)

    return (
        <DeviceContext.Provider value={{device: device, setDevice: setDevice}}>
            { children }
        </DeviceContext.Provider>
    )
}

export const useDevice = () => {
    const context = useContext(DeviceContext)
    if(context === undefined)
        throw new Error("Device context must be used within DeviceProvider")

    return context
}