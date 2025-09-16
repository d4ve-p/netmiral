'use client';

import React, { useState } from 'react';
import { Box, Typography, Input, Button, Stack } from '@mui/joy';
import Lock from '@mui/icons-material/Lock';
import useSWRMutation from 'swr/mutation';
import { REGISTER_ADMIN_ENDPOINT, registerAdmin } from '@/api/admin';
import { createMutationFetcher } from '@/api/fetcher';
import { useRouter } from 'next/navigation';

const registerAdminMutation = createMutationFetcher(registerAdmin);

export default function RegisterPage() {
  const [password, setPassword] = useState('')
  const { trigger, isMutating } = useSWRMutation(REGISTER_ADMIN_ENDPOINT, registerAdminMutation);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await trigger({ password })
      window.location.reload()
    } catch (err) {
      console.error('Register failed:', err)
    }
    
  }

  return (
    <Box
      component="main"
      sx={{
        bgcolor: '#020508ff', // The dark navy base color
        display: 'flex',
        flexDirection: 'column', // Stack children vertically
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        gap: 4, // Add some space between the title and the form

        '@keyframes move-background': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '-100px 100px' },
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'move-background 8s linear infinite',
        },
      }}
    >
      {/* Animated Title */}
      <Typography
        level="h1"
        sx={{
          zIndex: 1,
          '@keyframes gradient': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
          // Keyframes for the new glow effect
          '@keyframes glow': {
            '0%': { textShadow: '0 0 5px rgba(255, 255, 255, 0.3), 0 0 10px rgba(255, 255, 255, 0.2)' },
            '50%': { textShadow: '0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4)' },
            '100%': { textShadow: '0 0 5px rgba(255, 255, 255, 0.3), 0 0 10px rgba(255, 255, 255, 0.2)' },
          },
          background: 'linear-gradient(45deg, #22d3ee, #ec4899, #fde047)',
          backgroundSize: '300% 300%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          // Apply both animations
          animation: 'gradient 6s ease infinite, glow 4s ease-in-out infinite',
        }}
      >
        NETMIRAL
      </Typography>
      <Box
        component="div"
        sx = {{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
        }}>
            <Typography level="h4" 
            sx = {{
                textAlign: "center",
                width: "500px",
                color: "common.white"
            }}
            >
                This is your first time setup and an Admin Password has not been set in app environment.
            </Typography>
            <Typography level="h2" 
            sx = {{
                textAlign: "center",
                width: "500px",
                color: "common.white"
            }}
            >
                Please enter a password.
            </Typography>
        </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ zIndex: 1, width: '100%', maxWidth: '360px' }}
      >
        <Stack spacing={2}>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            startDecorator={<Lock />}
            variant="soft"
            color="neutral"
            size="lg"
          />
          <Button type="submit" fullWidth size="lg" disabled={isMutating}>
            Submit
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

