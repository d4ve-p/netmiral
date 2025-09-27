import Card from '@mui/joy/Card';
import DeviceConfigPanel from '@/components/dashboard/device-config-panel';

export default function Page() {
    return (
        <Card variant="outlined" sx={{ bgcolor: '#0A111C', borderColor: '#273B53' }}>
            <DeviceConfigPanel />
        </Card>
    );
}