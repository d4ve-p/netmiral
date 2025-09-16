"use client";

import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export default function LoadingPage() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: '#020508ff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        gap: 4,

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
      <Typography
        level="h1"
        sx={{
          zIndex: 1,
          '@keyframes gradient': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
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
          animation: 'gradient 6s ease infinite, glow 4s ease-in-out infinite',
        }}
      >
        NETMIRAL
      </Typography>
      <Stack spacing={2} direction="row" alignItems="center" sx={{ zIndex: 1 }}>
        <CircularProgress
          variant="plain"
          size="sm"
          sx={{
            color: '#22d3ee',
          }}
        />
        <Typography level='h3' sx={{ color: 'neutral.300' }}>
          Loading
        </Typography>
      </Stack>
    </Box>
  );
}