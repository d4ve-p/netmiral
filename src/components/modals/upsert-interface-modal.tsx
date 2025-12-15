// src/components/modals/upsert-interface-modal.tsx
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
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Grid from '@mui/joy/Grid';
import Switch from '@mui/joy/Switch';
import FormHelperText from '@mui/joy/FormHelperText';
import { Network } from 'lucide-react';
import { Box } from '@mui/joy';

interface InterfaceForm {
  type: string;
  number: string;
  description: string;
  ip_address: string;
  mask: string;
  is_enabled: boolean; // Maps to 'no shutdown'
}

export default function UpsertInterfaceModal() {
  const { isOpen, closeModal, modalProps } = useModal();
  
  // Check if we are editing an existing interface
  const existingInterface = modalProps.interface;
  const isEditMode = !!existingInterface;

  const onConfirm = modalProps.onConfirm as (data: any) => void;

  const { control, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<InterfaceForm>({
    defaultValues: {
      type: 'Loopback',
      number: '',
      description: '',
      ip_address: '',
      mask: '',
      is_enabled: true,
    }
  });

  // Load data if editing
  useEffect(() => {
    if (isOpen && isEditMode && existingInterface) {
      // Regex to split "GigabitEthernet0/0" into "GigabitEthernet" and "0/0"
      const match = existingInterface.name.match(/^([A-Za-z]+)(.*)$/);
      const type = match ? match[1] : 'GigabitEthernet';
      const number = match ? match[2] : existingInterface.name;

      reset({
        type: type,
        number: number,
        description: existingInterface.description || '',
        ip_address: existingInterface.ip_address || '',
        mask: existingInterface.mask || '',
        is_enabled: !existingInterface.shutdown,
      });
    } else if (isOpen && !isEditMode) {
        reset({ type: 'Loopback', number: '', description: '', ip_address: '', mask: '', is_enabled: true });
    }
  }, [isOpen, isEditMode, existingInterface, reset]);

  const onSubmit = (data: InterfaceForm) => {
    // Reconstruct the full interface name
    const fullName = `${data.type}${data.number}`;

    const payload = {
      name: fullName,
      description: data.description,
      ip_address: data.ip_address,
      mask: data.mask,
      shutdown: !data.is_enabled, // Invert logic: enabled=true means shutdown=false
    };

    console.log("Submitting Interface:", payload);

    if (onConfirm) {
      onConfirm(payload);
    }
    closeModal();
  };

  // Helper for IP validation
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <ModalDialog
        variant="outlined"
        sx={{ bgcolor: '#0A111C', borderColor: '#273B53', minWidth: '500px' }}
      >
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <Network size={24} color="#22d3ee" />
            <Typography level="h3" textColor="#E0E6F1">
              {isEditMode ? 'Edit Interface' : 'Add Logical Interface'}
            </Typography>
        </Stack>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} sx={{ mt: 2 }}>
            
            {/* Interface Name Construction */}
            <Typography level="title-sm" textColor="neutral.300">Identity</Typography>
            <Grid container spacing={2}>
                <Grid xs={6}>
                    <Controller
                        name="type"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select 
                                value={value} 
                                onChange={(_, val) => onChange(val)} 
                                sx={{ bgcolor: '#020508', color: '#E0E6F1' }}
                                disabled={isEditMode} // Usually can't change type during edit
                            >
                                <Option value="Loopback">Loopback</Option>
                                <Option value="Vlan">Vlan</Option>
                                <Option value="GigabitEthernet">GigabitEthernet</Option>
                                <Option value="TenGigabitEthernet">TenGigabitEthernet</Option>
                                <Option value="FastEthernet">FastEthernet</Option>
                            </Select>
                        )}
                    />
                </Grid>
                <Grid xs={6}>
                    <Controller
                        name="number"
                        control={control}
                        rules={{ required: 'Number is required' }}
                        render={({ field }) => (
                            <FormControl error={!!errors.number}>
                                <Input 
                                    {...field} 
                                    placeholder={watch('type') === 'Vlan' ? '10' : '0/0'} 
                                    disabled={isEditMode}
                                />
                            </FormControl>
                        )}
                    />
                </Grid>
            </Grid>

            {/* Description */}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <FormLabel sx={{ color: '#A1ACC2' }}>Description</FormLabel>
                  <Input {...field} placeholder="e.g., LINK_TO_CORE" />
                </FormControl>
              )}
            />

            {/* IP Configuration */}
            <Typography level="title-sm" textColor="neutral.300" sx={{ mt: 1 }}>
                Layer 3 Configuration
            </Typography>
            <Grid container spacing={2}>
                <Grid xs={7}>
                    <Controller
                        name="ip_address"
                        control={control}
                        rules={{ 
                            pattern: { value: ipRegex, message: 'Invalid IP' } 
                        }}
                        render={({ field }) => (
                            <FormControl error={!!errors.ip_address}>
                                <FormLabel sx={{ color: '#A1ACC2' }}>IP Address</FormLabel>
                                <Input {...field} placeholder="192.168.1.1" />
                                <FormHelperText>{errors.ip_address?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid xs={5}>
                    <Controller
                        name="mask"
                        control={control}
                        rules={{ 
                            // Required only if IP is filled
                            validate: (val, formValues) => {
                                if (formValues.ip_address && !val) return "Mask required";
                                return true;
                            },
                            pattern: { value: ipRegex, message: 'Invalid Mask' }
                        }}
                        render={({ field }) => (
                            <FormControl error={!!errors.mask}>
                                <FormLabel sx={{ color: '#A1ACC2' }}>Subnet Mask</FormLabel>
                                <Input {...field} placeholder="255.255.255.0" />
                                <FormHelperText>{errors.mask?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>
            </Grid>

            {/* Admin State Toggle */}
            <Controller
                name="is_enabled"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <FormControl orientation="horizontal" sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                        <Box>
                            <FormLabel sx={{ color: '#E0E6F1' }}>Admin State</FormLabel>
                            <FormHelperText>Enable or shutdown this interface</FormHelperText>
                        </Box>
                        <Switch 
                            checked={value}
                            onChange={(e) => onChange(e.target.checked)}
                            color={value ? 'success' : 'danger'}
                            startDecorator={value ? 'UP' : 'DOWN'}
                            sx={{
                                '--Switch-trackWidth': '60px',
                            }}
                        />
                    </FormControl>
                )}
            />

            <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" color="neutral" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit" sx={{ bgcolor: '#22d3ee', color: '#000' }}>
                {isEditMode ? 'Save Changes' : 'Create Interface'}
              </Button>
            </Stack>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}