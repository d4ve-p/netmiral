"use client"

import { useModal } from '@/contexts/modal-context';
import { DEVICE_UPLOAD_ACTIVE_ENDPOINT, deviceUploadActive } from '@/lib/api/device';
import { createMutationFetcher } from '@/lib/api/fetcher';
import { CreateDefault_DeviceUploadActive, DeviceUploadActive } from '@/types/dto/device';
import { Divider } from '@mui/joy';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Controller, useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';

const uploadActiveMutation = createMutationFetcher(deviceUploadActive)

export default function AddActiveDeviceModal() {
  const { closeModal } = useModal();
  
  // TODO: Add state and logic for handling form submission
  const { trigger,  isMutating } = useSWRMutation(DEVICE_UPLOAD_ACTIVE_ENDPOINT, uploadActiveMutation)

  const { control, handleSubmit, formState: { errors }} = useForm<DeviceUploadActive>({
    defaultValues: { ...CreateDefault_DeviceUploadActive() }
  })

  const onSubmit = (data: DeviceUploadActive) => {
    trigger(data)
    closeModal()
  }
  
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
        <Typography level="body-md" sx={{ color: '#A1ACC2', mt: 1, mb: 2 }}>
          Upload a Cisco configuration file to create a local, offline device entry.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="hostname"
              control={control}
              rules={{ required: 'Hostname is required' }}
              render = {({ field }) => (
                <FormControl error={!!errors.hostname}>
                  <FormLabel sx={{ color: '#A1ACC2' }}>Hostname</FormLabel>
                  <Input {...field} autoFocus required placeholder="e.g., core-router-01" />
                </FormControl>
              )}
            />

            <Controller
              name="ip_address"
              control={control}
              rules={{ required: 'IP Address is required' }}
              render={({ field }) => (
                <FormControl error={!!errors.ip_address}>
                  <FormLabel sx={{ color: '#A1ACC2' }}>IP Address</FormLabel>
                  <Input {...field} autoFocus required placeholder="e.g., 192.168.1.1"/>
                </FormControl>
              )} />

            <Controller
              name="location"
              control={control}
              render = {({ field }) => (
                <FormControl>
                  <FormLabel sx={{ color: '#A1ACC2' }}>Location</FormLabel>
                  <Input {...field} placeholder='e.g., Bulding-A-18' />
                </FormControl>
              )}
            />

            <Stack direction="row" spacing={2}>
              <Controller
                name="model"
                control={control}
                render = {({ field }) => (
                  <FormControl sx={{ flex: 1 }}>
                    <FormLabel sx={{ color: '#A1ACC2' }}>Model</FormLabel>
                    <Input {...field} placeholder='e.g., Cisco Catalyst 9300-24P' />
                  </FormControl>
                )}
              />
              
              <Controller
                name="os_version"
                control={control}
                render = {({ field }) => (
                  <FormControl sx={{ flex: 1 }}>
                    <FormLabel sx={{ color: '#A1ACC2'  }}>OS Version</FormLabel>
                    <Input {...field} placeholder='e.g., Cisco IOS XE 17.12.5' />
                  </FormControl>
                )}
              />
            </Stack>

            <Divider sx={{ my: 2 }}>
              <Typography level="body-sm" sx={{ color: '#A1ACC2' }}>
                Device Credentials
              </Typography>
            </Divider>
            
            <Stack direction="row" spacing={2}>
              <Controller
                name="credentials.username"
                control={control}
                render = {({ field }) => (
                  <FormControl sx={{ flex: 1 }}>
                    <FormLabel sx={{ color: '#A1ACC2' }}>Username</FormLabel>
                    <Input {...field} />
                  </FormControl>
                )}
              />
              
              <Controller
                name="credentials.password"
                control={control}
                render = {({ field }) => (
                  <FormControl sx={{ flex: 1 }}>
                    <FormLabel sx={{ color: '#A1ACC2'  }}>Password</FormLabel>
                    <Input {...field} type='password'/>
                  </FormControl>
                )}
              />
            </Stack>
            
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button onClick={closeModal} variant="outlined" color="danger" fullWidth sx={{ transition: '0.2s ease' }}>
                Cancel
              </Button>
              <Button type="submit" fullWidth sx={{ bgcolor: '#22d3ee', transition: '0.2s ease' }} loading={isMutating}>
                Add Device
              </Button>
            </Stack>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}