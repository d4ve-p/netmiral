"use client";

import { useModal } from '@/contexts/modal-context';
import { DEVICE_UPLOAD_LOCAL_ENDPOINT, deviceUploadLocal } from '@/lib/api/device';
import { createMutationFetcher } from '@/lib/api/fetcher';
import { CreateDefault_DeviceUploadLocal, DeviceUploadLocal } from '@/types/dto/device';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useForm, Controller } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';

const uploadLocalMutation = createMutationFetcher(deviceUploadLocal)

export default function UploadConfigModal() {
  const { trigger, error, isMutating  } = useSWRMutation(DEVICE_UPLOAD_LOCAL_ENDPOINT, uploadLocalMutation)

  const { closeModal } = useModal();

  const { control, handleSubmit, watch, formState: { errors } } = useForm<DeviceUploadLocal>({defaultValues: CreateDefault_DeviceUploadLocal()})
  const selectedFile = watch("file");
  
  // TODO: Add state and logic for handling form submission
  const onSubmit = (data: DeviceUploadLocal) => {
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
            
            <Controller
              name="file"
              control={control}
              rules={{ required: 'A Configuration file is required' }}
              render={({ field: { onChange, onBlur, name, ref } }) => (
                <FormControl error={!!errors.file}>
                  <FormLabel sx={{ color: '#A1ACC2' }}>Config File</FormLabel>
                  <Stack direction="row" spacing={2} alignItems="center">
                  <Button component="label" variant="outlined" sx={{ borderColor: '#273B53', transition: '0.2s ease' }} color='primary'>
                    Select File
                    <input 
                      type="file" 
                      hidden
                      onBlur={onBlur}
                      name={name}
                      ref={ref}

                      onChange={(e) => {
                        onChange(e.target.files ? e.target.files[0] : null)
                      }}
                    />
                  </Button>
                  {selectedFile && <Typography sx={{ color: '#A1ACC2' }}>{selectedFile.name}</Typography>}
                  </Stack>
                </FormControl>
              )}
            />

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