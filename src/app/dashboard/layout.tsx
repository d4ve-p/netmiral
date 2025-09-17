"use client"

import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useModal } from '@/contexts/modal-context';
import ModalType from '@/types/modal-type';

function triggerModal(
  callback: (arg: ModalType) => void, 
  modalType: ModalType
) {
  return () => callback(modalType);
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { openModal } = useModal(); 

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: '60px 1fr',
        height: '100vh',
        bgcolor: '#020508',
      }}
    >
      <Sheet
        component="header"
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          gap: 2,
          bgcolor: '#0A111C', 
          borderBottom: '1px solid',
          borderColor: '#273B53', 
          boxShadow: '0 1px 3px 0 rgba(34, 211, 238, 0.1)', 
          zIndex: 10,
        }}
      >
        <Typography
          level="h3"
          component="h1"
          sx={{
            '@keyframes gradient': {
              '0%': { backgroundPosition: '0% 50%' },
              '50%': { backgroundPosition: '100% 50%' },
              '100%': { backgroundPosition: '0% 50%' },
            },
            background: 'linear-gradient(45deg, #22d3ee, #ec4899)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            animation: 'gradient 4s ease infinite',
          }}
        >
          NETMIRAL
        </Typography>
      </Sheet>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
        }}
      >
        <Sheet
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            bgcolor: '#0A111C',
            borderRight: '1px solid',
            borderColor: '#273B53',
            boxShadow: '1px 0 3px 0 rgba(34, 211, 238, 0.1)',
          }}
        >
          <Input
            placeholder="Search devices..."
            startDecorator={<SearchIcon />}
            variant="soft"
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
             <Button startDecorator={<UploadFileIcon />} variant="soft" onClick={triggerModal(openModal, ModalType.LocalDevice)}>
              From Config
            </Button>
            <Button startDecorator={<AddIcon />} variant="soft" onClick={triggerModal(openModal, ModalType.ActiveDevice)}>
              Active Device
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            <Typography sx={{ color: '#5D6D86', mt: 2 }}>Device list...</Typography>
          </Box>
        </Sheet>

        <Box component="main" sx={{ p: 2, overflow: 'auto' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}