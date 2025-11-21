"use client";

import { useState } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { ArrowLeft, TerminalSquare, Network, ShieldCheck, LucideWaypoints, DatabaseZap } from 'lucide-react';
import ConfigType from '@/types/config-type';
import OptionCard from './option-card';
import { ConfigRenderMap } from '@/lib/ui-helper/ui-map';
import { useDevice } from '@/contexts/device-context';

export default function DeviceConfigPanel() {
  const device_context = useDevice()
  const [activeConfig, setActiveConfig] = useState<ConfigType | null>(null);

  if (!device_context.device) {
    return (
      <Card variant="outlined" sx={{ bgcolor: '#0A111C', borderColor: '#273B53' }}>
        <Typography level="h2" sx={{ color: '#E0E6F1' }}>
          Dashboard Content Area
        </Typography>
        <Typography sx={{ color: '#A1ACC2' }}>
          Select a device from the sidebar to begin configuration.
        </Typography>
      </Card>
    );
  }

  if (activeConfig) {
    const ComponentToRender = ConfigRenderMap[activeConfig]

    return (
      <Box>
        <Button
          variant="plain"
          color="primary"
          startDecorator={<ArrowLeft />}
          onClick={() => setActiveConfig(null)}
          sx={{ mb: 2, transition: '0.2s ease' }}
        >
          Back to Options
        </Button>

        {/* TODO: Render the correct detailed config card based on the active state */}
        { activeConfig ? <ComponentToRender key={device_context.device.id} /> : null }
      </Box>
    );
  }

  // Selection View (the default when a device is selected)
  return (
    <Box>
      <Typography level="h2" sx={{ color: '#E0E6F1', mb: 2 }}>
        Configuration for <Typography color="primary">{device_context.device.hostname}</Typography>
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: 2,
        }}
      >
        <OptionCard
          title="Free Config"
          description="Edit the raw running configuration in a text editor."
          icon={TerminalSquare}
          onClick={() => setActiveConfig(ConfigType.FreeConfig)}
        />
        <OptionCard
          title="Interfaces"
          description="Manage VLANs, ports, and IP addresses with a guided UI."
          icon={Network}
          onClick={() => setActiveConfig(ConfigType.Interfaces)}
        />
        <OptionCard
          title="Access Lists"
          description="Create and manage Access Control Lists (ACLs) and rules."
          icon={ShieldCheck}
          onClick={() => setActiveConfig(ConfigType.AccessLists)}
        />
        <OptionCard
          title="Static Routes"
          description="View and configure static routing entries."
          icon={LucideWaypoints}
          onClick={() => setActiveConfig(ConfigType.StaticRoutes)}
        />
        <OptionCard
          title="VLAN Database"
          description="Create and manage VLANs on your device."
          icon={DatabaseZap}
          onClick={() => setActiveConfig(ConfigType.Vlan)}
        />  
      </Box>
    </Box>
  );
}