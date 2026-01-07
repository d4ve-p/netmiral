// src/components/modals/upsert-vlan-modal.tsx
"use client";

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useModal } from '@/contexts/modal-context';
import { Vlan } from '@/types/vlan';

import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import FormHelperText from '@mui/joy/FormHelperText';

interface UpsertVlanForm {
  id: number | string; 
  name: string;
  state: 'active' | 'suspend';
}

export default function VlanModal() {
  const { isOpen, closeModal, modalProps } = useModal();
  const isEditMode = !!modalProps.vlan;
  const existingVlan = modalProps.vlan as Vlan;

  // 1. Get the callback from props
  const onConfirm = modalProps.onConfirm as (vlan: Vlan) => void;

  const { control, handleSubmit, reset, formState: { errors } } = useForm<UpsertVlanForm>({
    defaultValues: {
      id: '',
      name: '',
      state: 'active',
    }
  });

  useEffect(() => {
    if (isOpen && isEditMode && existingVlan) {
      reset({
        id: existingVlan.id,
        name: existingVlan.name,
        state: existingVlan.state,
      });
    } else if (isOpen && !isEditMode) {
      reset({ id: '', name: '', state: 'active' });
    }
  }, [isOpen, isEditMode, existingVlan, reset]);

  const onSubmit = (data: UpsertVlanForm) => {
    // 2. Construct the Payload
    // Ensure ID is cast to a number, as forms often treat inputs as strings
    const payload: Vlan = {
        id: Number(data.id),
        name: data.name,
        state: data.state
    };

    console.log("Submitting VLAN:", payload);

    // 3. Trigger the Parent's Callback
    if (onConfirm) {
        onConfirm(payload);
    }

    closeModal();
  };

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <ModalDialog
        variant="outlined"
        sx={{ bgcolor: '#0A111C', borderColor: '#273B53', minWidth: '400px' }}
      >
        <Typography level="h3" textColor="#E0E6F1">
          {isEditMode ? 'Edit VLAN' : 'Create VLAN'}
        </Typography>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} sx={{ mt: 2 }}>
            
            {/* VLAN ID */}
            <Controller
              name="id"
              control={control}
              rules={{ 
                required: 'VLAN ID is required',
                min: { value: 1, message: 'Min ID is 1' },
                max: { value: 4094, message: 'Max ID is 4094' },
                pattern: { value: /^[0-9]+$/, message: 'Must be a number' }
              }}
              render={({ field }) => (
                <FormControl error={!!errors.id}>
                  <FormLabel sx={{ color: '#A1ACC2' }}>VLAN ID (1-4094)</FormLabel>
                  <Input 
                    {...field} 
                    autoFocus 
                    placeholder="e.g., 10" 
                    disabled={isEditMode} 
                  />
                  {errors.id && <FormHelperText>{errors.id.message}</FormHelperText>}
                </FormControl>
              )}
            />

            {/* VLAN Name */}
            <Controller
              name="name"
              control={control}
              rules={{ required: 'VLAN Name is required' }}
              render={({ field }) => (
                <FormControl error={!!errors.name}>
                  <FormLabel sx={{ color: '#A1ACC2' }}>Name</FormLabel>
                  <Input {...field} placeholder="e.g., SALES_WIFI" />
                  {errors.name && <FormHelperText>{errors.name.message}</FormHelperText>}
                </FormControl>
              )}
            />

            {/* VLAN State */}
            <Controller
              name="state"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControl>
                  <FormLabel sx={{ color: '#A1ACC2' }}>State</FormLabel>
                  <Select 
                    value={value} 
                    onChange={(_, val) => onChange(val)}
                    sx={{ bgcolor: '#020508', color: '#E0E6F1' }}
                  >
                    <Option value="active">Active</Option>
                    <Option value="suspend">Suspend</Option>
                  </Select>
                </FormControl>
              )}
            />

            <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" color="neutral" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit" sx={{ bgcolor: '#22d3ee', color: '#000' }}>
                {isEditMode ? 'Save Changes' : 'Create VLAN'}
              </Button>
            </Stack>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}