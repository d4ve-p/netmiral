// src/components/dashboard/interface-config-card.tsx
"use client";

import { useState } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import Divider from '@mui/joy/Divider';
import { Network, Plus, Pencil, Trash2 } from 'lucide-react';

import { useModal } from '@/contexts/modal-context';
import ModalType from '@/types/modal-type';

export interface InterfaceData {
  name: string;
  description?: string;
  ip_address?: string;
  mask?: string;
  shutdown: boolean; // true = admin down
}

const initialInterfaces: InterfaceData[] = [
  { 
    name: 'GigabitEthernet0/0', 
    description: 'WAN_UPLINK', 
    ip_address: '192.168.1.1', 
    mask: '255.255.255.252',
    shutdown: false 
  },
  { 
    name: 'GigabitEthernet0/1', 
    description: 'USER_LAN', 
    ip_address: '10.10.10.1', 
    mask: '255.255.255.0',
    shutdown: true 
  },
  { 
    name: 'Vlan10', 
    description: 'MANAGEMENT', 
    ip_address: '10.10.10.254', 
    mask: '255.255.255.0',
    shutdown: false 
  },
];

export default function InterfaceConfigPanel() {
  const [interfaces, setInterfaces] = useState<InterfaceData[]>(initialInterfaces);
  const { openModal } = useModal();

  const handleAdd = () => {
    openModal(ModalType.UpsertInterface, {
      onConfirm: (newIface: InterfaceData) => setInterfaces((prev) => [...prev, newIface])
    });
  };

  const handleEdit = (iface: InterfaceData) => {
    openModal(ModalType.UpsertInterface, {
      interface: iface,
      onConfirm: (updatedIface: InterfaceData) => {
        setInterfaces((prev) => prev.map((item) => item.name === iface.name ? updatedIface : item));
      }
    });
  };

  const handleDelete = (name: string) => {
    if (confirm(`Delete ${name}?`)) {
      setInterfaces((prev) => prev.filter((item) => item.name !== name));
    }
  };

  return (
    <Card variant="outlined" sx={{ bgcolor: '#0A111C', borderColor: '#273B53' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Network size={24} color="#A1ACC2" />
          <Typography level="h3" sx={{ color: '#E0E6F1' }}>
            Interface Configuration
          </Typography>
        </Box>
        <Button 
          size="sm" 
          color="success" 
          startDecorator={<Plus size={16} />}
          onClick={handleAdd}
        >
          Add Interface
        </Button>
      </Box>

      <List sx={{ gap: 1 }}>
        {interfaces.map((iface) => (
          <ListItem
            key={iface.name}
            sx={{
              bgcolor: '#020508',
              borderRadius: 'sm',
              p: 2,
              border: '1px solid',
              borderColor: '#273B53',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: '#22d3ee',
                transform: 'translateX(4px)'
              }
            }}
          >
            {/* 1. Status Indicator (Clean Dot) */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2, minWidth: '40px' }}>
                <Box 
                    sx={{ 
                        width: 10, 
                        height: 10, 
                        borderRadius: '50%', 
                        bgcolor: iface.shutdown ? 'danger.500' : 'success.400',
                        boxShadow: iface.shutdown ? 'none' : '0 0 8px rgba(74, 222, 128, 0.6)',
                        mb: 0.5
                    }} 
                />
                <Typography level="body-xs" fontWeight="bold" textColor={iface.shutdown ? 'danger.500' : 'success.400'}>
                    {iface.shutdown ? 'DOWN' : 'UP'}
                </Typography>
            </Box>

            {/* Divider between Status and Content */}
            <Divider orientation="vertical" sx={{ height: '30px', mr: 2, bgcolor: '#273B53' }} />

            {/* 2. Main Info */}
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
                <Typography level="title-md" sx={{ color: '#E0E6F1', fontWeight: 600 }}>
                  {iface.name}
                </Typography>
                {iface.description && (
                  <Typography level="body-sm" sx={{ color: '#64748B', fontStyle: 'italic' }}>
                    — {iface.description}
                  </Typography>
                )}
              </Box>

              {/* 3. IP Address (Clean Monospace) */}
              <Box sx={{ mt: 0.5 }}>
                 {iface.ip_address ? (
                    <Typography 
                        fontFamily="code" 
                        fontSize="sm" 
                        sx={{ color: '#94a3b8' }} // Slate-400
                    >
                        <Typography sx={{ color: '#22d3ee' }}>{iface.ip_address}</Typography>
                        <span style={{ opacity: 0.5 }}> / </span>
                        {iface.mask}
                    </Typography>
                 ) : (
                    <Typography level="body-xs" textColor="neutral.600">
                        Layer 2 / No IP Assigned
                    </Typography>
                 )}
              </Box>
            </Box>

            {/* 4. Actions (Subtle until hover) */}
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Tooltip title="Edit" variant="soft">
                <IconButton size="sm" variant="plain" color="neutral" onClick={() => handleEdit(iface)}>
                  <Pencil size={16} />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Delete" variant="soft" color="danger">
                <IconButton size="sm" variant="plain" color="danger" onClick={() => handleDelete(iface.name)}>
                  <Trash2 size={16} />
                </IconButton>
              </Tooltip>
            </Box>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}