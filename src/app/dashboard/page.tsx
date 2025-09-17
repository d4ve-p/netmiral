import Card from '@mui/joy/Card';
import DeviceConfigPanel from '@/components/dashboard/device-config-panel';

export default function Page() {
    return (
        <Card variant="outlined" sx={{ bgcolor: '#0A111C', borderColor: '#273B53' }}>
            <DeviceConfigPanel selectedDevice={{ id: 'device-123', name: 'Core Router 01' }} />
        </Card>
    );
}