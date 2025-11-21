// src/components/dashboard/device-list-item.tsx
"use client";

import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';

// Icons
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import DescriptionIcon from '@mui/icons-material/Description';
import { DeviceListItemProps } from '@/types/props/device';
import { isActiveDevice } from '@/lib/helper';

export default function DeviceListItem({ device, isSelected, onClick }: DeviceListItemProps) {
  const getStatusColor = () => {
    if(!isActiveDevice(device)) {
      return '#A1ACC2' 
    }

    switch (device.status) {
      case 'online':
        return 'success.500';
      case 'offline':
        return 'danger.500';
      default:
        return 'neutral.500';
    }
};

  return (
    <ListItem>
      <ListItemButton selected={isSelected} onClick={onClick}>
        <ListItemDecorator>
          {device.device_type === 'active' ? <CloudQueueIcon /> : <DescriptionIcon />}
        </ListItemDecorator>
        <ListItemContent>
          <Typography level="title-sm" textColor={'primary.100'}>{device.hostname}</Typography>
        </ListItemContent>
        {/* Only show the status dot for active devices */}
        {device.device_type === 'active' && (
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: getStatusColor(),
              ml: 1,
            }}
          />
        )}
      </ListItemButton>
    </ListItem>
  );
}