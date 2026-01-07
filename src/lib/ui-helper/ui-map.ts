import { AccessListConfigPanel } from "@/components/dashboard/config-panel/access-list-config-panel";
import FreeConfigPanel from "@/components/dashboard/config-panel/free-config-panel";
import InterfaceConfigPanel from "@/components/dashboard/config-panel/interface-config-panel";
import ConfigType from "@/types/config-type";
import StaticRoutesConfigPanel from "@/components/dashboard/config-panel/static-route-config-panel";
import VlanDatabaseConfigPanel from "@/components/dashboard/config-panel/vlan-database-config-panel";

export const ConfigRenderMap = {
    [ConfigType.FreeConfig]: FreeConfigPanel,
    [ConfigType.Interfaces]: InterfaceConfigPanel,
    [ConfigType.AccessLists]: AccessListConfigPanel,
    [ConfigType.StaticRoutes]: StaticRoutesConfigPanel,
    [ConfigType.Vlan]: VlanDatabaseConfigPanel,
}