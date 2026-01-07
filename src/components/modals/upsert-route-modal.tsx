// src/components/modals/upsert-route-modal.tsx
"use client";

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useModal } from '@/contexts/modal-context';

import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import FormHelperText from '@mui/joy/FormHelperText';
import { Route } from 'lucide-react';

// Define the shape of the data
export interface RouteData {
  prefix: string;   // "192.168.10.0"
  mask: string;     // "255.255.255.0"
  next_hop: string; // "10.1.1.1" or "GigabitEthernet0/1"
  distance?: number;
  name?: string;
}

export default function UpsertRouteModal() {
  const { isOpen, closeModal, modalProps } = useModal();
  
  // 1. Check if we are in "Edit Mode"
  const existingRoute = modalProps.route as RouteData;
  const isEditMode = !!existingRoute;

  // 2. Get the callback function from props
  const onConfirm = modalProps.onConfirm as (data: RouteData) => void;

  const { control, handleSubmit, reset, formState: { errors } } = useForm<RouteData>({
    defaultValues: {
      prefix: '',
      mask: '',
      next_hop: '',
      distance: 1,
      name: '',
    }
  });

  // 3. Pre-fill form if editing
  useEffect(() => {
    if (isOpen && isEditMode && existingRoute) {
      reset(existingRoute);
    } else if (isOpen && !isEditMode) {
      reset({ prefix: '', mask: '', next_hop: '', distance: 1, name: '' });
    }
  }, [isOpen, isEditMode, existingRoute, reset]);

  const onSubmit = (data: RouteData) => {
    console.log("Submitting Route:", data);
    if (onConfirm) {
      onConfirm(data);
    }
    closeModal();
  };

  // Simple IPv4 Validation Regex
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <ModalDialog
        variant="outlined"
        sx={{ bgcolor: '#0A111C', borderColor: '#273B53', minWidth: '500px' }}
      >
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <Route size={24} color="#22d3ee" />
            <Typography level="h3" textColor="#E0E6F1">
              {isEditMode ? 'Edit Static Route' : 'Add Static Route'}
            </Typography>
        </Stack>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} sx={{ mt: 2 }}>
            
            {/* Destination Network */}
            <Typography level="title-sm" textColor="neutral.300">Destination</Typography>
            <Grid container spacing={2}>
                <Grid xs={6}>
                    <Controller
                        name="prefix"
                        control={control}
                        rules={{ 
                            required: 'Network is required',
                            pattern: { value: ipRegex, message: 'Invalid IP' }
                        }}
                        render={({ field }) => (
                            <FormControl error={!!errors.prefix}>
                                <FormLabel sx={{ color: '#A1ACC2' }}>Network Address</FormLabel>
                                <Input {...field} placeholder="192.168.20.0" autoFocus />
                                {errors.prefix && <FormHelperText>{errors.prefix.message}</FormHelperText>}
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid xs={6}>
                    <Controller
                        name="mask"
                        control={control}
                        rules={{ 
                            required: 'Mask is required',
                            pattern: { value: ipRegex, message: 'Invalid Mask' }
                        }}
                        render={({ field }) => (
                            <FormControl error={!!errors.mask}>
                                <FormLabel sx={{ color: '#A1ACC2' }}>Subnet Mask</FormLabel>
                                <Input {...field} placeholder="255.255.255.0" />
                                {errors.mask && <FormHelperText>{errors.mask.message}</FormHelperText>}
                            </FormControl>
                        )}
                    />
                </Grid>
            </Grid>

            {/* Next Hop */}
            <Controller
              name="next_hop"
              control={control}
              rules={{ required: 'Next Hop is required' }}
              render={({ field }) => (
                <FormControl error={!!errors.next_hop}>
                  <FormLabel sx={{ color: '#A1ACC2' }}>Next Hop IP or Exit Interface</FormLabel>
                  <Input {...field} placeholder="10.1.1.254 or GigabitEthernet0/1" />
                  {errors.next_hop && <FormHelperText>{errors.next_hop.message}</FormHelperText>}
                </FormControl>
              )}
            />

            {/* Distance & Name */}
            <Grid container spacing={2}>
                <Grid xs={4}>
                    <Controller
                        name="distance"
                        control={control}
                        render={({ field }) => (
                            <FormControl>
                                <FormLabel sx={{ color: '#A1ACC2' }}>Distance (AD)</FormLabel>
                                <Input {...field} type="number" placeholder="1" />
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid xs={8}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <FormControl>
                                <FormLabel sx={{ color: '#A1ACC2' }}>Name (Optional)</FormLabel>
                                <Input {...field} placeholder="TO_BRANCH_OFFICE" />
                            </FormControl>
                        )}
                    />
                </Grid>
            </Grid>

            <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" color="neutral" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit" sx={{ bgcolor: '#22d3ee', color: '#000' }}>
                {isEditMode ? 'Save Changes' : 'Add Route'}
              </Button>
            </Stack>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}