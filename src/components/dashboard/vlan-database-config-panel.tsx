"use client";

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Chip from '@mui/joy/Chip';
import Tooltip from '@mui/joy/Tooltip';

// Icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HubIcon from '@mui/icons-material/Hub';

import { useModal } from '@/contexts/modal-context';
import { useDevice } from '@/contexts/device-context';
import { Vlan } from '@/types/vlan';
import ModalType from '@/types/modal-type';

export default function VlanDatabaseConfigPanel() {
    const device_context = useDevice();
    const { openModal } = useModal();

    const vlans: Vlan[] = []

    const handleAdd = () => {
    openModal(ModalType.AddEditVlan, { deviceId: device_context.device?.id });
    };

    const handleEdit = (vlan: Vlan) => {
    openModal(ModalType.AddEditVlan, { deviceId: device_context.device?.id, vlan });
    };

    const handleDelete = (vlanId: number) => {
    if (confirm(`Are you sure you want to delete VLAN ${vlanId}?`)) {
        console.log('Deleting VLAN:', vlanId);
        // TODO: Call delete mutation
    }
    };

    if (vlans.length === 0) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, gap: 2 }}>
        <HubIcon sx={{ fontSize: 48, color: 'neutral.700' }} />
        <Typography level="h4" textColor="neutral.400">VLAN Database is Empty</Typography>
        <Button startDecorator={<AddIcon />} onClick={handleAdd} sx={{ bgcolor: '#22d3ee' }}>
            Create VLAN
        </Button>
        </Box>
    );
    }

    return (
    <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography level="h3" textColor="#E0E6F1">VLAN Database</Typography>
        <Button startDecorator={<AddIcon />} onClick={handleAdd} sx={{ bgcolor: '#22d3ee' }}>
            Create VLAN
        </Button>
        </Box>

        <Sheet
        variant="outlined"
        sx={{
            borderRadius: 'sm',
            bgcolor: '#0A111C',
            borderColor: '#273B53',
            overflow: 'auto',
        }}
        >
        <Table
            hoverRow
            sx={{
            '--TableCell-headBackground': 'transparent',
            '--TableCell-selectedBackground': 'rgba(34, 211, 238, 0.08)',
            '& thead th': { color: '#A1ACC2', borderBottom: '1px solid #273B53' },
            '& tbody td': { color: '#E0E6F1', borderBottom: '1px solid #273B53' },
            '& tbody tr:last-child td': { borderBottom: 'none' },
            }}
        >
            <thead>
            <tr>
                <th style={{ width: '15%' }}>VLAN ID</th>
                <th style={{ width: '40%' }}>Name</th>
                <th style={{ width: '20%' }}>State</th>
                <th style={{ width: '25%', textAlign: 'right' }}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {vlans.map((vlan) => (
                <tr key={vlan.id}>
                <td>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <HubIcon sx={{ fontSize: 16, color: '#22d3ee' }} />
                    <Typography fontFamily="code" fontWeight="bold">{vlan.id}</Typography>
                    </Box>
                </td>
                <td>
                    <Typography level="body-sm">{vlan.name}</Typography>
                </td>
                <td>
                    <Chip
                    variant="outlined"
                    size="sm"
                    color={vlan.state === 'active' ? 'success' : 'warning'}
                    >
                    {vlan.state.toUpperCase()}
                    </Chip>
                </td>
                <td>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Tooltip title="Edit VLAN" variant="soft">
                        <IconButton size="sm" variant="plain" color="neutral" onClick={() => handleEdit(vlan)}>
                        <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete VLAN" variant="soft" color="danger">
                        <IconButton size="sm" variant="plain" color="danger" onClick={() => handleDelete(vlan.id)}>
                        <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    </Box>
                </td>
                </tr>
            ))}
            </tbody>
        </Table>
        </Sheet>
    </Box>
    );
}