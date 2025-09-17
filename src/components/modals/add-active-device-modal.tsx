"use client"

import { useModal } from '@/contexts/modal-context';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export default function AddActiveDeviceModal() {
  const { closeModal } = useModal();
  
  // TODO: Add state and logic for handling form submission
  
  return (
    <Modal open onClose={closeModal}>
      <ModalDialog
        variant="outlined"
        sx={{
          bgcolor: '#0A111C',
          borderColor: '#273B53',
        }}
      >
        <Typography level="h3" sx={{ color: '#E0E6F1' }}>
          Add Active Device
        </Typography>
        <Typography level="body-sm" sx={{ color: '#A1ACC2', mt: 1, mb: 2 }}>
          Provide connection details to manage a live device.
        </Typography>
        <form
        // TODO: Add onSubmit handler
        >
          <Stack spacing={2}>
            <FormControl>
              <FormLabel sx={{ color: '#A1ACC2' }}>Hostname or IP Address</FormLabel>
              <Input autoFocus required placeholder="e.g., 192.168.1.1" />
            </FormControl>
            <FormControl>
              <FormLabel sx={{ color: '#A1ACC2' }}>Username</FormLabel>
              <Input required />
            </FormControl>
            <FormControl>
              <FormLabel sx={{ color: '#A1ACC2' }}>Password</FormLabel>
              <Input type="password" required />
            </FormControl>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button onClick={closeModal} variant="outlined" color="danger" fullWidth>
                Cancel
              </Button>
              <Button type="submit" fullWidth sx={{ bgcolor: '#22d3ee' }}>
                Connect & Add Device
              </Button>
            </Stack>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}