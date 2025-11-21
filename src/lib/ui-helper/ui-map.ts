import { AccessListConfigPanel } from "@/components/dashboard/access-list-config-panel";
import FreeConfigPanel from "@/components/dashboard/free-config-panel";
import InterfaceConfigPanel from "@/components/dashboard/interface-config-panel";
import ConfigType from "@/types/config-type";
import StaticRoutesConfigPanel from "@/components/dashboard/static-route-config-panel";
import VlanDatabaseConfigPanel from "@/components/dashboard/vlan-database-config-panel";

export const ConfigRenderMap = {
    [ConfigType.FreeConfig] : FreeConfigPanel,
    [ConfigType.Interfaces] : InterfaceConfigPanel, 
    [ConfigType.AccessLists] : AccessListConfigPanel,
    [ConfigType.StaticRoutes] : StaticRoutesConfigPanel,
    [ConfigType.Vlan] : VlanDatabaseConfigPanel,
}