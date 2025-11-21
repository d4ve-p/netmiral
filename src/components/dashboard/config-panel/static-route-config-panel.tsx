"use client";
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Chip from '@mui/joy/Chip';
import Tooltip from '@mui/joy/Tooltip';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AltRouteIcon from '@mui/icons-material/AltRoute';

import { useModal } from '@/contexts/modal-context';
import { StaticRoute } from '@/types/static-route';
import ModalType from '@/types/modal-type';
import { useDevice } from '@/contexts/device-context';


export default function StaticRoutesConfigPanel() {
  const device_context = useDevice();
  const routes: StaticRoute[] = []; // TODO: proper routes implementation here


  const { openModal } = useModal();

  const handleAdd = () => {
    openModal(ModalType.AddEditStaticRotue, { deviceId: device_context.device?.id });
  };

  const handleEdit = (route: StaticRoute) => {
    openModal(ModalType.AddEditStaticRotue, { deviceId: device_context.device?.id, route });
  };

  const handleDelete = (routeId: string) => {
    if (confirm('Are you sure you want to delete this route?')) {
      // TODO: Call your delete API mutation here
      console.log('Deleting route:', routeId);
    }
  };

  if (routes.length === 0) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, gap: 2 }}>
        <AltRouteIcon sx={{ fontSize: 48, color: 'neutral.700' }} />
        <Typography level="h4" textColor="neutral.400">No Static Routes Configured</Typography>
        <Button startDecorator={<AddIcon />} onClick={handleAdd} sx={{ bgcolor: '#22d3ee' }}>
          Add First Route
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography level="h3" textColor="#E0E6F1">Static Routes</Typography>
        <Button startDecorator={<AddIcon />} onClick={handleAdd} sx={{ bgcolor: '#22d3ee' }}>
          Add Route
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
              <th style={{ width: '25%' }}>Destination Network</th>
              <th style={{ width: '20%' }}>Subnet Mask</th>
              <th style={{ width: '20%' }}>Next Hop / Interface</th>
              <th style={{ width: '10%' }}>Distance</th>
              <th style={{ width: '15%' }}>Name</th>
              <th style={{ width: '10%', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route.id}>
                <td>
                  <Typography fontFamily="code" fontSize="sm">{route.prefix}</Typography>
                </td>
                <td>
                  <Typography fontFamily="code" fontSize="sm" textColor="neutral.400">
                    {route.mask}
                  </Typography>
                </td>
                <td>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AltRouteIcon sx={{ fontSize: 16, color: '#22d3ee' }} />
                    <Typography fontFamily="code" fontSize="sm">{route.next_hop}</Typography>
                  </Box>
                </td>
                <td>
                  {route.distance ? (
                    <Chip size="sm" variant="outlined" color="neutral">
                      {route.distance}
                    </Chip>
                  ) : (
                    <Typography level="body-xs" textColor="neutral.600">Def (1)</Typography>
                  )}
                </td>
                <td>
                  {route.name ? (
                    <Typography level="body-sm">{route.name}</Typography>
                  ) : (
                    <Typography level="body-xs" fontStyle="italic" textColor="neutral.600">-</Typography>
                  )}
                </td>
                <td>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Tooltip title="Edit Route" variant="soft">
                      <IconButton size="sm" variant="plain" color="neutral" onClick={() => handleEdit(route)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Route" variant="soft" color="danger">
                      <IconButton size="sm" variant="plain" color="danger" onClick={() => handleDelete(route.id)}>
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