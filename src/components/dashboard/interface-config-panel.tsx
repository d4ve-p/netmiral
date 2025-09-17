// src/components/dashboard/interface-config-card.tsx
"use client";

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Chip from '@mui/joy/Chip';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import IconButton from '@mui/joy/IconButton';
import { Network, Plus, Pencil, Trash2 } from 'lucide-react';

// TODO: fetch from the API
const mockInterfaces = [
  { name: 'GigabitEthernet0/0', status: 'up', vlan: 1, ip: '192.168.1.1' },
  { name: 'GigabitEthernet0/1', status: 'down', vlan: 10, ip: '10.10.10.1' },
  { name: 'Vlan10', status: 'up', vlan: 10, ip: '10.10.10.254' },
];

export default function InterfaceConfigPanel() {
  return (
    <Card variant="outlined" sx={{ bgcolor: '#0A111C', borderColor: '#273B53' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Network size={24} color="#A1ACC2" />
          <Typography level="h3" sx={{ color: '#E0E6F1' }}>
            Interface Configuration
          </Typography>
        </Box>
        <Button size="sm" color="success" startDecorator={<Plus size={16} />}>
          Add Interface
        </Button>
      </Box>

      <List>
        {mockInterfaces.map((iface) => (
          <ListItem
            key={iface.name}
            sx={{
              bgcolor: '#020508',
              borderRadius: 'sm',
              p: 1.5,
              mb: 1,
              border: '1px solid',
              borderColor: '#273B53'
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography level="title-md" sx={{ color: '#E0E6F1' }}>{iface.name}</Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                <Chip size="sm" color={iface.status === 'up' ? 'success' : 'danger'}>
                  {iface.status.toUpperCase()}
                </Chip>
                <Chip size="sm" variant="outlined" color="neutral">
                  VLAN {iface.vlan}
                </Chip>
                <Typography level="body-sm" sx={{ color: '#A1ACC2' }}>{iface.ip}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton size="sm" variant="plain" color="neutral">
                <Pencil size={16} />
              </IconButton>
              <IconButton size="sm" variant="plain" color="danger">
                <Trash2 size={16} />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}