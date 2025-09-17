"use client";

import { useModal } from '@/contexts/modal-context';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export default function UploadConfigModal() {
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
          Add Local Device from Config
        </Typography>
        <Typography level="body-sm" sx={{ color: '#A1ACC2', mt: 1, mb: 2 }}>
          Upload a Cisco configuration file to create a local, offline device entry.
        </Typography>
        <form>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel sx={{ color: '#A1ACC2' }}>Device Name</FormLabel>
              <Input autoFocus required placeholder="e.g., core-router-01" />
            </FormControl>
            <FormControl>
              <FormLabel sx={{ color: '#A1ACC2' }}>Config File</FormLabel>
              <Button component="label" variant="outlined" sx={{ borderColor: '#273B53', transition: '0.2s ease' }} color='primary'>
                Select File
                <input type="file" hidden />
              </Button>
            </FormControl>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button onClick={closeModal} variant="outlined" color="danger" fullWidth sx={{ transition: '0.2s ease' }}>
                Cancel
              </Button>
              <Button type="submit" fullWidth sx={{ bgcolor: '#22d3ee', transition: '0.2s ease' }} >
                Add Device
              </Button>
            </Stack>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}