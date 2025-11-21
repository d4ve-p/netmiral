// src/components/modals/upsert-static-route-modal.tsx
"use client";

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useModal } from '@/contexts/modal-context';
import { StaticRoute } from '@/types/static-route';

import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import FormHelperText from '@mui/joy/FormHelperText';


interface UpsertRouteForm {
  prefix: string;
  mask: string;
  next_hop: string;
  distance: number | string; // Input might be string initially
  name: string;
}

export default function UpsertStaticRouteModal() {
  const { isOpen, closeModal, modalProps } = useModal();
  const isEditMode = !!modalProps.route; // Check if a route was passed
  const existingRoute = modalProps.route as StaticRoute;

  const { control, handleSubmit, reset, formState: { errors } } = useForm<UpsertRouteForm>({
    defaultValues: {
      prefix: '',
      mask: '',
      next_hop: '',
      distance: '',
      name: '',
    }
  });

  // Reset form with existing data if in Edit Mode
  useEffect(() => {
    if (isOpen && isEditMode && existingRoute) {
      reset({
        prefix: existingRoute.prefix,
        mask: existingRoute.mask,
        next_hop: existingRoute.next_hop,
        distance: existingRoute.distance || '',
        name: existingRoute.name || '',
      });
    }
  }, [isOpen, isEditMode, existingRoute, reset]);

  const onSubmit = (data: UpsertRouteForm) => {
    console.log("Submitting:", data);
    // TODO: Trigger API call (POST for Create, PUT for Update)
    // If isEditMode, use existingRoute.id
    closeModal();
  };

  // Simple Regex for IPv4 validation
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <ModalDialog
        variant="outlined"
        sx={{ bgcolor: '#0A111C', borderColor: '#273B53', minWidth: '500px' }}
      >
        <Typography level="h3" textColor="#E0E6F1">
          {isEditMode ? 'Edit Static Route' : 'Add Static Route'}
        </Typography>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} sx={{ mt: 2 }}>
            
            {/* Row 1: Network and Mask */}
            <Stack direction="row" spacing={2}>
              <Controller
                name="prefix"
                control={control}
                rules={{ 
                  required: 'Network prefix is required',
                  pattern: { value: ipRegex, message: 'Invalid IP address format' }
                }}
                render={({ field }) => (
                  <FormControl error={!!errors.prefix} sx={{ flex: 1 }}>
                    <FormLabel sx={{ color: '#A1ACC2' }}>Destination Network</FormLabel>
                    <Input {...field} placeholder="192.168.10.0" autoFocus />
                    {errors.prefix && <FormHelperText>{errors.prefix.message}</FormHelperText>}
                  </FormControl>
                )}
              />
              <Controller
                name="mask"
                control={control}
                rules={{ 
                  required: 'Subnet mask is required',
                  pattern: { value: ipRegex, message: 'Invalid Mask format' }
                }}
                render={({ field }) => (
                  <FormControl error={!!errors.mask} sx={{ flex: 1 }}>
                    <FormLabel sx={{ color: '#A1ACC2' }}>Subnet Mask</FormLabel>
                    <Input {...field} placeholder="255.255.255.0" />
                    {errors.mask && <FormHelperText>{errors.mask.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Stack>

            {/* Row 2: Next Hop */}
            <Controller
              name="next_hop"
              control={control}
              rules={{ required: 'Next hop IP or Interface is required' }}
              render={({ field }) => (
                <FormControl error={!!errors.next_hop}>
                  <FormLabel sx={{ color: '#A1ACC2' }}>Next Hop / Exit Interface</FormLabel>
                  <Input {...field} placeholder="10.1.1.1 or GigabitEthernet0/1" />
                  {errors.next_hop && <FormHelperText>{errors.next_hop.message}</FormHelperText>}
                </FormControl>
              )}
            />

            {/* Row 3: Distance and Name */}
            <Stack direction="row" spacing={2}>
              <Controller
                name="distance"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{ width: '120px' }}>
                    <FormLabel sx={{ color: '#A1ACC2' }}>Distance</FormLabel>
                    <Input {...field} type="number" placeholder="1" />
                    <FormHelperText>Default: 1</FormHelperText>
                  </FormControl>
                )}
              />
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{ flex: 1 }}>
                    <FormLabel sx={{ color: '#A1ACC2' }}>Route Name (Optional)</FormLabel>
                    <Input {...field} placeholder="e.g., TO_BRANCH_OFFICE" />
                  </FormControl>
                )}
              />
            </Stack>

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