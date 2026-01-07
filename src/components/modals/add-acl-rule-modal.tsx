// src/components/modals/add-acl-rule-modal.tsx
"use client";

import { useForm, Controller, useWatch } from 'react-hook-form';
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
import Divider from '@mui/joy/Divider';
import FormHelperText from '@mui/joy/FormHelperText';
import { ShieldPlus } from 'lucide-react';

interface AddRuleForm {
  sequence: number;
  action: 'permit' | 'deny';
  protocol: string;
  sourceType: 'any' | 'host' | 'network';
  sourceValue: string;
  destType: 'any' | 'host' | 'network';
  destValue: string;
  port: string;
}

export default function AddAclRuleModal() {
  const { isOpen, closeModal, modalProps } = useModal();
  
  // 1. Get props passed from parent
  const aclName = modalProps.aclName as string;
  const onConfirm = modalProps.onConfirm as (newRuleString: string) => void;

  const { control, handleSubmit, formState: { errors } } = useForm<AddRuleForm>({
    defaultValues: {
      sequence: 10,
      action: 'permit',
      protocol: 'ip',
      sourceType: 'any',
      sourceValue: '',
      destType: 'any',
      destValue: '',
      port: '',
    }
  });

  const onSubmit = (data: AddRuleForm) => {
    // 2. Construct the Cisco IOS Rule String
    // Format: {seq} {action} {protocol} {source} {dest} {port}
    
    let rule = `${data.sequence} ${data.action} ${data.protocol}`;

    // Helper to format address based on type
    const formatAddress = (type: string, value: string) => {
      if (type === 'any') return 'any';
      if (type === 'host') return `host ${value}`;
      return value; // Assume user typed "192.168.1.0 0.0.0.255" for network
    };

    rule += ` ${formatAddress(data.sourceType, data.sourceValue)}`;
    rule += ` ${formatAddress(data.destType, data.destValue)}`;

    if (data.port) {
      rule += ` eq ${data.port}`;
    }

    console.log("Generated Rule:", rule);

    if (onConfirm) {
      onConfirm(rule);
    }
    closeModal();
  };

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <ModalDialog
        variant="outlined"
        sx={{ bgcolor: '#0A111C', borderColor: '#273B53', minWidth: '600px', maxWidth: '800px' }}
      >
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <ShieldPlus size={24} color="#22d3ee" />
            <Typography level="h3" textColor="#E0E6F1">
              Add Rule to <Typography color="primary">{aclName}</Typography>
            </Typography>
        </Stack>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} sx={{ mt: 2 }}>
            
            {/* Row 1: Sequence, Action, Protocol */}
            <Grid container spacing={2}>
              <Grid xs={3}>
                <Controller
                  name="sequence"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel sx={{ color: '#A1ACC2' }}>Seq #</FormLabel>
                      <Input {...field} type="number" />
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid xs={4}>
                <Controller
                  name="action"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControl>
                      <FormLabel sx={{ color: '#A1ACC2' }}>Action</FormLabel>
                      <Select value={value} onChange={(_, val) => onChange(val)} sx={{ bgcolor: '#020508', color: '#E0E6F1' }}>
                        <Option value="permit" color="success">Permit</Option>
                        <Option value="deny" color="danger">Deny</Option>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid xs={5}>
                <Controller
                  name="protocol"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControl>
                      <FormLabel sx={{ color: '#A1ACC2' }}>Protocol</FormLabel>
                      <Select value={value} onChange={(_, val) => onChange(val)} sx={{ bgcolor: '#020508', color: '#E0E6F1' }}>
                        <Option value="ip">IP (Any)</Option>
                        <Option value="tcp">TCP</Option>
                        <Option value="udp">UDP</Option>
                        <Option value="icmp">ICMP</Option>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>

            <Divider sx={{ bgcolor: '#273B53' }} />

            {/* Row 2: Source */}
            <Typography level="title-sm" textColor="neutral.300">Source</Typography>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Controller
                  name="sourceType"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select value={value} onChange={(_, val) => onChange(val)} sx={{ bgcolor: '#020508', color: '#E0E6F1' }}>
                      <Option value="any">Any</Option>
                      <Option value="host">Host (Single IP)</Option>
                      <Option value="network">Network (Wildcard)</Option>
                    </Select>
                  )}
                />
              </Grid>
              <Grid xs={8}>
                 {/* This input is conditional based on selection logic if you want, strictly keeping it simple here */}
                 <AddressInput control={control} typeName="sourceType" valueName="sourceValue" />
              </Grid>
            </Grid>

            {/* Row 3: Destination */}
            <Typography level="title-sm" textColor="neutral.300">Destination</Typography>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Controller
                  name="destType"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select value={value} onChange={(_, val) => onChange(val)} sx={{ bgcolor: '#020508', color: '#E0E6F1' }}>
                      <Option value="any">Any</Option>
                      <Option value="host">Host (Single IP)</Option>
                      <Option value="network">Network (Wildcard)</Option>
                    </Select>
                  )}
                />
              </Grid>
              <Grid xs={8}>
                 <AddressInput control={control} typeName="destType" valueName="destValue" />
              </Grid>
            </Grid>

             <Divider sx={{ bgcolor: '#273B53' }} />

            {/* Row 4: Port */}
            <Controller
                name="port"
                control={control}
                render={({ field }) => (
                <FormControl>
                    <FormLabel sx={{ color: '#A1ACC2' }}>Port / Service (Optional)</FormLabel>
                    <Input {...field} placeholder="e.g. 80, 443, www, telnet" />
                    <FormHelperText>Leave empty for all ports</FormHelperText>
                </FormControl>
                )}
            />

            <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" color="neutral" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit" sx={{ bgcolor: '#22d3ee', color: '#000' }}>
                Add Rule
              </Button>
            </Stack>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}

// Sub-component to handle the conditional disabling of the address input
function AddressInput({ control, typeName, valueName }: any) {
    const type = useWatch({ control, name: typeName });
    const isAny = type === 'any';
    const placeholder = type === 'host' ? '192.168.1.10' : '192.168.1.0 0.0.0.255';

    return (
        <Controller
            name={valueName}
            control={control}
            rules={{ required: !isAny }}
            render={({ field }) => (
            <FormControl disabled={isAny}>
                <Input {...field} placeholder={isAny ? "Any" : placeholder} />
            </FormControl>
            )}
        />
    )
}