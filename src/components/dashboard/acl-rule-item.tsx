"use client";

import { useState } from 'react';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { ArrowRight, X } from 'lucide-react';

interface AclRuleItemProps {
  rule: { id: number; text: string };
  onUpdate: (id: number, newText: string) => void;
  onDelete: (id: number) => void;
}

export default function AclRuleItem({ rule, onUpdate, onDelete }: AclRuleItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(rule.text);

  const handleSave = () => {
    onUpdate(rule.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(rule.text);
    setIsEditing(false);
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSave();
    } else if (event.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <Stack direction="row" spacing={1} alignItems="center" width="100%">
        <Input
          autoFocus
          fullWidth
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            // Styling to match our theme
            bgcolor: 'transparent',
            color: '#E0E6F1',
            border: '1px solid #273B53',
            '&:focus-within': {
              borderColor: '#22d3ee', // Cyber Cyan
              boxShadow: '0 0 5px 1px rgba(34, 211, 238, 0.3)',
            },
            flex: 1,
          }}
        />
        <IconButton onClick={handleSave} size="sm" variant="plain" color="success">
          <CheckIcon />
        </IconButton>
        <IconButton onClick={handleCancel} size="sm" variant="plain" color="danger">
          <CloseIcon />
        </IconButton>
      </Stack>
    );
  }

  const ruleIcon = rule.text.includes('permit') 
                        ? <ArrowRight size={16} color="#10B981" /> 
                        : <X size={16} color="#EF4444" />;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        p: 1,
        borderRadius: 'sm',
        transition: 'background-color 0.2s ease',
        '&:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          '.action-buttons': {
            opacity: 1,
          },
        },
      }}
    >
        <Stack direction="row" spacing={1} alignItems="center">
            { ruleIcon }
            <Typography sx={{ color: '#A1ACC2' }}>{rule.text}</Typography>
        </Stack>
        <Stack direction="row" spacing={1} className="action-buttons" sx={{ opacity: 0, transition: 'opacity 0.2s ease' }}>
            <IconButton onClick={() => setIsEditing(true)} size="sm" variant="plain" color="neutral">
            <EditIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => onDelete(rule.id)} size="sm" variant="plain" color="danger">
            <DeleteForeverIcon fontSize="small" />
            </IconButton>
        </Stack>
    </Box>
  );
}