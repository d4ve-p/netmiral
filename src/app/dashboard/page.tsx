import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

export default function Page() {
    return (
        <Card variant="outlined" sx={{ bgcolor: '#0A111C', borderColor: '#273B53' }}>
            <Typography level="h2" sx={{ color: '#E0E6F1' }}>
                Dashboard Content Area
            </Typography>
            <Typography sx={{ color: '#A1ACC2' }}>
                When you select a device from the sidebar, its configuration will appear here.
            </Typography>
        </Card>
    );
}