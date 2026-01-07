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
import { ShieldCheck, Plus } from 'lucide-react';
import AclRuleItem from '../items/acl-rule-item';
import { useModal } from '@/contexts/modal-context';
import { useState } from 'react';
import ModalType from '@/types/modal-type';

// 1. Define Types for better code safety
interface AclDefinition {
  name: string;
  rules: string[];
}

const mockAcls: AclDefinition[] = [
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
  const [acls, setAcls] = useState<AclDefinition[]>(mockAcls);
  const { openModal } = useModal()
  
  const handleAddRuleClick = (aclName: string) => {
    openModal(ModalType.AddAclRule, {
      aclName: aclName,
      // The callback receives the fully constructed string from the modal
      onConfirm: (newRuleString: string) => {
        setAcls((prevAcls) => 
          prevAcls.map((acl) => {
            if (acl.name !== aclName) return acl;
            // Append the new rule to the list
            // Ideally, we would sort by sequence number here, but append is fine for now
            return { ...acl, rules: [...acl.rules, newRuleString] };
          })
        );
      }
    });
  };
  
  // 2. Handle Update (Edit text)
  const handleUpdateRule = (aclName: string, ruleIndex: number, newText: string) => {
    setAcls((prevAcls) => 
      prevAcls.map((acl) => {
        // Find the correct ACL
        if (acl.name !== aclName) return acl;

        // Create a copy of the rules array
        const newRules = [...acl.rules];
        // Update the specific rule at the index
        newRules[ruleIndex] = newText;

        // Return the updated ACL object
        return { ...acl, rules: newRules };
      })
    );
  };
  
  const handleAddAcl = () => {
    openModal(ModalType.AddAcl, {
      // We pass the state updater function as a callback!
      onConfirm: (newAcl: AclDefinition) => {
        setAcls((prev) => [...prev, newAcl]);
      }
    });
  };

  // 3. Handle Delete
  const handleDeleteRule = (aclName: string, ruleIndex: number) => {
    setAcls((prevAcls) => 
      prevAcls.map((acl) => {
        if (acl.name !== aclName) return acl;

        // Filter out the rule at the specific index
        return {
          ...acl,
          rules: acl.rules.filter((_, index) => index !== ruleIndex)
        };
      })
    );
  };

  return (
    <Card variant="outlined" sx={{ bgcolor: '#0A111C', borderColor: '#273B53' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ShieldCheck size={24} color="#A1ACC2" />
          <Typography level="h3" sx={{ color: '#E0E6F1' }}>
            Access Control Lists
          </Typography>
        </Box>
        <Button size="sm" color="success" startDecorator={<Plus size={16} />} onClick={handleAddAcl}>
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
        {acls.map((acl) => (
          <Accordion
            key={acl.name}
            sx={{
              bgcolor: '#020508',
              borderRadius: 'sm',
              border: '1px solid',
              borderColor: '#273B53',
              overflow: 'hidden'
            }}
          >
            <AccordionSummary color='primary' sx={{ fontWeight: 600 }}>
              {acl.name}
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', pr: 2 }}>
                <Typography fontWeight="lg">{acl.name}</Typography>
                <Button 
                  size="sm" 
                  variant="soft" 
                  color="neutral" 
                  startDecorator={<Plus size={14}/>}
                  onClick={(e) => {
                      e.stopPropagation(); // Prevents the accordion from toggling when clicking the button
                      handleAddRuleClick(acl.name);
                  }}
                >
                  Add Rule
                </Button>
              </Box>
              <List>
                {acl.rules.map((rule, index) => {
                  return (
                    <ListItem key={`${acl.name}-${index}`}>
                      <AclRuleItem
                        // Pass ID and current text
                        rule={{ id: index, text: rule }}
                        
                        // Pass the delete handler specifically for this item
                        onDelete={() => handleDeleteRule(acl.name, index)}
                        
                        // Pass the update handler expecting the new text from the child
                        onUpdate={(id:number, newText: string) => handleUpdateRule(acl.name, index, newText)}
                      />
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