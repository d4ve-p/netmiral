"use client";

// src/components/dashboard/free-config-card.tsx
"use client";

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Textarea from '@mui/joy/Textarea';
import { TerminalSquare, Save, Undo2 } from 'lucide-react'; 

export default function FreeConfigCard() {
  const mockConfig = `!
! Last configuration change at 10:00:00 UTC Wed Sep 17 2025
!
version 15.2
hostname core-router-01
!
boot-start-marker
boot-end-marker
!
...
interface GigabitEthernet0/0
 ip address 192.168.1.1 255.255.255.0
 negotiation auto
!`;

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
          <Button size="sm" variant="outlined" color="neutral" startDecorator={<Undo2 size={16} />}>
            Revert
          </Button>
          <Button size="sm" color="success" startDecorator={<Save size={16} />}>
            Apply Changes
          </Button>
        </Box>
      </Box>
      
      {/* TODO: This Textarea should be replaced with a proper code editor component
          like React CodeMirror or Monaco Editor for syntax highlighting. */}
      <Textarea
        defaultValue={mockConfig}
        minRows={20}
        maxRows={30}
        sx={{
          bgcolor: '#020508', 
          color: '#A1ACC2',
          fontFamily: 'monospace',
          '--Textarea-focusedHighlight': '1px solid #22d3ee',
        }}
      />
    </Card>
  );
}