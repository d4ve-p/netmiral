"use client";

import { useMemo } from 'react';
import useSWR from 'swr';

import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';

import DeviceListItem from './items/device-list-item';
import { Device, DeviceType } from '@/types/device';
import { DEVICE_GET_ALL_DEVICE_ENDPOINT, getAllDevice } from '@/lib/api/device';
import { useDevice } from '@/contexts/device-context';

export default function DeviceList() {
    const device_context = useDevice()
    const { data: devices, error, isLoading } = useSWR<Device[]>(DEVICE_GET_ALL_DEVICE_ENDPOINT, getAllDevice);

    const { activeDevices, localDevices } = useMemo(() => {
        if (!devices) return { activeDevices: [], localDevices: [] };

        const active = devices.filter(d => d.device_type === DeviceType.ACTIVE);
        const local = devices.filter(d => d.device_type === DeviceType.LOCAL);

        return { activeDevices: active, localDevices: local };
    }, [devices]);

    if (isLoading) {
        return <CircularProgress sx={{ mx: 'auto', mt: 4 }} />;
    }

    if (error) {
        return <Typography color="danger" sx={{ p: 2 }}>Failed to load devices.</Typography>;
    }

    return (
        <List
            sx={{
                // Allow the list to scroll if it's too long
                overflow: 'auto',
            }}
        >
            {/* Active Devices Section */}
            <ListItem nested>
                <ListSubheader sx={{ bgcolor: 'transparent', color: 'Highlight', fontWeight: 'bolder' }}>Active Devices</ListSubheader>
                <List>
                    {activeDevices.length > 0 ? (
                        activeDevices.map((device) => (
                            <DeviceListItem
                                key={device.id}
                                device={device}
                                isSelected={device_context.device?.id === device.id}
                                onClick={() => device_context.setDevice(device)}
                            />
                        ))
                    ) : (
                        <ListItem>
                            <Typography level="body-sm" sx={{ pl: 2, color: 'neutral.500' }}>
                                No active devices found.
                            </Typography>
                        </ListItem>
                    )}
                </List>
            </ListItem>

            {/* Local Devices Section */}
            <ListItem nested sx={{ mt: 2 }}>
                <ListSubheader sx={{ bgcolor: 'transparent', color: 'Highlight', fontWeight: 'bolder' }}>Local Devices</ListSubheader>
                <List>
                    {localDevices.length > 0 ? (
                        localDevices.map((device) => (
                            <DeviceListItem
                                key={device.id}
                                device={device}
                                isSelected={device_context.device?.id === device.id}
                                onClick={() => device_context.setDevice(device)}
                            />
                        ))
                    ) : (
                        <ListItem>
                            <Typography level="body-sm" sx={{ pl: 2, color: 'neutral.500' }}>
                                No local devices found.
                            </Typography>
                        </ListItem>
                    )}
                </List>
            </ListItem>
        </List>
    );
}