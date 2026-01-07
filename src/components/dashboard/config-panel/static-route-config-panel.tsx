// src/components/dashboard/static-route-config-panel.tsx
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
import Chip from '@mui/joy/Chip';
import { Route as RouteIcon, Plus, Pencil, Trash2, ArrowRight } from 'lucide-react';
import ModalType from '@/types/modal-type';

import { useModal } from '@/contexts/modal-context';
// Assuming you added UpsertRoute to your enum, or use the string key 'UPSERT_ROUTE'
// import ModalType from '@/types/modal-type'; 

// 1. Define Route Data Shape
export interface RouteData {
  prefix: string;   // e.g. "192.168.10.0"
  mask: string;     // e.g. "255.255.255.0"
  next_hop: string; // e.g. "10.1.1.1" or "GigabitEthernet0/1"
  distance?: number; // AD, default 1
  name?: string;
}

// 2. Dummy Data
const initialRoutes: RouteData[] = [
  { 
    prefix: '0.0.0.0', 
    mask: '0.0.0.0', 
    next_hop: '203.0.113.1', 
    distance: 1, 
    name: 'DEFAULT_GATEWAY' 
  },
  { 
    prefix: '10.20.0.0', 
    mask: '255.255.0.0', 
    next_hop: '10.1.1.254', 
    distance: 1, 
    name: 'HEAD_OFFICE_LAN' 
  },
  { 
    prefix: '192.168.100.0', 
    mask: '255.255.255.0', 
    next_hop: 'GigabitEthernet0/1', 
    distance: 5, 
    name: 'BACKUP_LINK' 
  },
];

export default function StaticRouteConfigPanel() {
  const [routes, setRoutes] = useState<RouteData[]>(initialRoutes);
  const { openModal } = useModal();

  const handleAdd = () => {
    // We use the string key 'UPSERT_ROUTE' based on our previous step
    // If you have an Enum, replace this with ModalType.UpsertRoute
    openModal(ModalType.UpsertRoute, {
      onConfirm: (newRoute: RouteData) => setRoutes((prev) => [...prev, newRoute])
    });
  };

  const handleEdit = (route: RouteData) => {
    openModal(ModalType.UpsertRoute, {
      route: route, // Pass existing data
      onConfirm: (updatedRoute: RouteData) => {
        // Unique key for routes is usually prefix + mask + nexthop, 
        // but for this simple frontend demo, we'll match by prefix.
        setRoutes((prev) => prev.map((item) => item.prefix === route.prefix ? updatedRoute : item));
      }
    });
  };

  const handleDelete = (prefix: string) => {
    if (confirm(`Delete route to ${prefix}?`)) {
      setRoutes((prev) => prev.filter((item) => item.prefix !== prefix));
    }
  };

  return (
    <Card variant="outlined" sx={{ bgcolor: '#0A111C', borderColor: '#273B53' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <RouteIcon size={24} color="#A1ACC2" />
          <Typography level="h3" sx={{ color: '#E0E6F1' }}>
            Static Routes
          </Typography>
        </Box>
        <Button 
          size="sm" 
          color="success" 
          startDecorator={<Plus size={16} />}
          onClick={handleAdd}
        >
          Add Route
        </Button>
      </Box>

      <List sx={{ gap: 1 }}>
        {routes.map((route, index) => (
          <ListItem
            key={`${route.prefix}-${index}`}
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
            {/* 1. AD Indicator (Replaces Status Dot) */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2, minWidth: '40px' }}>
                <Chip 
                    size="sm" 
                    variant="soft" 
                    color="neutral"
                    sx={{ fontWeight: 'bold', fontSize: 'xs', minWidth: '30px' }}
                >
                    AD {route.distance || 1}
                </Chip>
            </Box>

            {/* Divider */}
            <Divider orientation="vertical" sx={{ height: '30px', mr: 2, bgcolor: '#273B53' }} />

            {/* 2. Main Info */}
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
                {/* Destination Network (Monospace) */}
                <Typography 
                    fontFamily="code" 
                    level="title-md" 
                    sx={{ color: '#22d3ee', fontWeight: 600 }}
                >
                  {route.prefix} 
                  <Typography textColor="neutral.500" fontSize="sm"> / {route.mask}</Typography>
                </Typography>
              </Box>

              {/* Next Hop & Name */}
              <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography level="body-sm" textColor="neutral.400" startDecorator={<ArrowRight size={14} />}>
                     via {route.next_hop}
                  </Typography>
                  
                  {route.name && (
                    <Chip size="sm" variant="outlined" color="primary" sx={{ ml: 1, fontSize: 'xs', height: '20px' }}>
                        {route.name}
                    </Chip>
                  )}
              </Box>
            </Box>

            {/* 3. Actions */}
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Tooltip title="Edit" variant="soft">
                <IconButton size="sm" variant="plain" color="neutral" onClick={() => handleEdit(route)}>
                  <Pencil size={16} />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Delete" variant="soft" color="danger">
                <IconButton size="sm" variant="plain" color="danger" onClick={() => handleDelete(route.prefix)}>
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