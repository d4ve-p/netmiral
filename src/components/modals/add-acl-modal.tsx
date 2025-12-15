// src/components/modals/add-acl-modal.tsx
"use client";

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
import FormHelperText from '@mui/joy/FormHelperText';
import { Shield } from 'lucide-react';

interface AddAclForm {
  name: string;
  type: 'extended' | 'standard';
}

export default function AddAclModal() {
  const { isOpen, closeModal, modalProps } = useModal();
  
  // We expect an onConfirm function to be passed when opening this modal
  // so we can update the state in the parent component.
  const onConfirm = modalProps.onConfirm as (newAcl: { name: string, rules: string[] }) => void;

  const { control, handleSubmit, formState: { errors } } = useForm<AddAclForm>({
    defaultValues: {
      name: '',
      type: 'extended',
    }
  });

  const onSubmit = (data: AddAclForm) => {
    // 1. Construct the new ACL object
    const newAcl = {
      name: data.name.toUpperCase(), // Convention: ACL names are usually uppercase
      // We start with a default rule or empty array based on type
      rules: [] 
    };

    // 2. Call the parent's callback to update local state
    if (onConfirm) {
      onConfirm(newAcl);
    }

    // 3. Close modal
    closeModal();
  };

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <ModalDialog
        variant="outlined"
        sx={{ bgcolor: '#0A111C', borderColor: '#273B53', minWidth: '400px' }}
      >
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <Shield size={24} color="#E0E6F1" />
            <Typography level="h3" textColor="#E0E6F1">
            New Access List
            </Typography>
        </Stack>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} sx={{ mt: 2 }}>
            
            {/* ACL Name */}
            <Controller
              name="name"
              control={control}
              rules={{ 
                required: 'ACL Name is required',
                pattern: {
                    value: /^[A-Za-z0-9_-]+$/,
                    message: 'Name cannot contain spaces or special characters'
                }
              }}
              render={({ field }) => (
                <FormControl error={!!errors.name}>
                  <FormLabel sx={{ color: '#A1ACC2' }}>ACL Name</FormLabel>
                  <Input 
                    {...field} 
                    autoFocus 
                    placeholder="e.g., WEB-TRAFFIC-IN" 
                    // Auto-uppercase visual helper
                    onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                  />
                  {errors.name && <FormHelperText>{errors.name.message}</FormHelperText>}
                </FormControl>
              )}
            />

            {/* ACL Type */}
            <Controller
              name="type"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControl>
                  <FormLabel sx={{ color: '#A1ACC2' }}>Type</FormLabel>
                  <Select 
                    value={value} 
                    onChange={(_, val) => onChange(val)}
                    sx={{ bgcolor: '#020508', color: '#E0E6F1' }}
                  >
                    <Option value="extended">Extended (IP, TCP, UDP)</Option>
                    <Option value="standard">Standard (Source IP only)</Option>
                  </Select>
                </FormControl>
              )}
            />

            <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" color="neutral" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit" sx={{ bgcolor: '#22d3ee', color: '#000' }}>
                Create ACL
              </Button>
            </Stack>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}