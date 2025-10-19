import { Card, CardContent, Typography } from "@mui/joy";

export default function OptionCard({ title, description, icon: Icon, onClick }: any) {
  return (
    <Card
      variant="outlined"
      onClick={onClick}
      sx={{
        bgcolor: '#0A111C',
        borderColor: '#273B53',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: '#22d3ee',
          boxShadow: '0 0 15px 0 rgba(34, 211, 238, 0.2)',
        },
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Icon size={48} color="#22d3ee" />
        <Typography level="h3" sx={{ color: '#E0E6F1' }}>{title}</Typography>
        <Typography level="body-sm" textAlign="center" sx={{ color: '#A1ACC2' }}>{description}</Typography>
      </CardContent>
    </Card>
  );
}