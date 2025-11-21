"use client";

// src/components/dashboard/free-config-card.tsx
"use client";

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { TerminalSquare, Save, Undo2 } from 'lucide-react';
import { CodeEditor } from '../../ui/code-editor';
import { useEffect, useState } from 'react';
import { useDevice } from '@/contexts/device-context';
import useSWRMutation from 'swr/mutation';
import { createMutationFetcher } from '@/lib/api/fetcher';
import { DEVICE_PUT_LOCAL_ENDPOINT, devicePutLocal } from '@/lib/api/device';

const putLocalDeviceMutation = createMutationFetcher(devicePutLocal)

export default function FreeConfigPanel() {
  const device = useDevice()
  const [config, setConfig] = useState(device.device?.config_text || '');

  const { isMutating, trigger } = useSWRMutation(DEVICE_PUT_LOCAL_ENDPOINT, putLocalDeviceMutation)

  const performReset = () => {
    setConfig(device.device?.config_text || '');
  }

  const triggerPut = async () => {
    device.setDevice({
      ...device.device!,
      config_text: config
    })
    await trigger({
      id: device.device!.id,
      hostname: device.device!.hostname!,
      location: device.device!.location ?? undefined,
      model: device.device!.model ?? undefined,
      os_version: device.device!.os_version ?? undefined,
      config_text: config
    })
  }

  return (
    <Card variant="outlined" sx={{ bgcolor: '#0A111C', borderColor: '#273B53', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TerminalSquare size={24} color="#A1ACC2" />
          <Typography level="h3" sx={{ color: '#E0E6F1' }}>
            Running Configuration
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button size="sm" variant="outlined" color="neutral" startDecorator={<Undo2 size={16} />} onClick={performReset}>
            Revert
          </Button>
          <Button size="sm" color="success" startDecorator={<Save size={16} />} loading={isMutating} onClick={triggerPut}>
            Apply Changes
          </Button>
        </Box>
      </Box>

      {/* TODO: This Textarea should be replaced with a proper code editor component
          like React CodeMirror or Monaco Editor for syntax highlighting. */}
      <CodeEditor value={config} onChange={setConfig} />
    </Card>
  );
}