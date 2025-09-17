"use client";

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionSummary, { accordionSummaryClasses } from '@mui/joy/AccordionSummary';
import AccordionDetails from '@mui/joy/AccordionDetails';
import { ShieldCheck, Plus, ArrowRight, X, Trash } from 'lucide-react';
import { IconButton, ListItemDecorator, Tooltip } from '@mui/joy';

const mockAcls = [
  { 
    name: 'ACL-WEB-INBOUND', 
    rules: [
      '10 permit tcp any any eq 80', 
      '20 permit tcp any any eq 443',
      '99 deny ip any any log'
    ] 
  },
  { 
    name: 'ACL-ADMIN-MGMT', 
    rules: [
      '10 permit ip 10.1.1.0 0.0.0.255 any', 
      '20 deny ip any any'
    ] 
  },
];

export function AccessListConfigPanel() {
    return (
    <Card variant="outlined" sx={{ bgcolor: '#0A111C', borderColor: '#273B53' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShieldCheck size={24} color="#A1ACC2" />
            <Typography level="h3" sx={{ color: '#E0E6F1' }}>
            Access Control Lists
            </Typography>
        </Box>
        <Button size="sm" color="success" startDecorator={<Plus size={16} />}>
            Add ACL
        </Button>
        </Box>

        <AccordionGroup 
            sx={{ 
            p: 0, 

            maxHeight: 'calc(100vh - 250px)', 
            overflowY: 'auto',
            
            gap: 2,

            [`& .${accordionSummaryClasses.button}:hover`]: {
                bgcolor: 'rgba(34, 211, 238, 0.1)',
            }
            }}
        >
            {mockAcls.map((acl) => (
            <Accordion 
                key={acl.name} 
                sx={{ 
                bgcolor: '#020508', 
                borderRadius: 'sm', 
                border: '1px solid',
                borderColor: '#273B53'
                }}
            >
                <AccordionSummary color='primary' sx={{ fontWeight: 600 }}>
                {acl.name}
                </AccordionSummary>
                <AccordionDetails>
                <List>
                    {acl.rules.map((rule, index) => {
                    const ruleIcon = rule.includes('permit') 
                        ? <ArrowRight size={16} color="#10B981" /> 
                        : <X size={16} color="#EF4444" />;

                    return (
                        <ListItem key={index}>
                            <Box
                                component="div"
                                display="flex"
                                width="100%"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Box
                                    component="div"
                                    display="flex"
                                    gap="1"
                                >
                                    <ListItemDecorator>
                                    {ruleIcon}
                                    </ListItemDecorator>
                                    <Typography 
                                        level="body-sm" 
                                        sx={{ fontFamily: 'monospace', color: '#A1ACC2' }}
                                    >
                                        {rule}
                                    </Typography>
                                </Box>
                                <ListItemDecorator>
                                    <IconButton 
                                        size="sm" 
                                        variant="plain" 
                                        color="neutral" 
                                        sx={{
                                            color: '#A1ACC2', 
                                            '&:hover': {
                                                color: '#EF4444', 
                                            },
                                    }}>
                                        <Trash />
                                    </IconButton>
                                </ListItemDecorator>
                            </Box>
                        </ListItem>
                    );
                    })}
                </List>
                </AccordionDetails>
            </Accordion>
            ))}
        </AccordionGroup>
    </Card>
  );
}