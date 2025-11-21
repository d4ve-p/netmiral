export interface Vlan {
  id: number;
  name: string;
  state: 'active' | 'suspend';
}