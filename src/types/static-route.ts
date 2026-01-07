export interface StaticRoute {
  id: string;
  prefix: string;   // e.g., "192.168.10.0"
  mask: string;     // e.g., "255.255.255.0"
  next_hop: string; // e.g., "10.255.255.1" or "GigabitEthernet0/1"
  distance?: number; // Administrative distance (e.g., 1 for static)
  name?: string;     // Description/Tag
}