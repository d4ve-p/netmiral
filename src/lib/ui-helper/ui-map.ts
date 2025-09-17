import { AccessListConfigPanel } from "@/components/dashboard/access-list-config-panel";
import FreeConfigPanel from "@/components/dashboard/free-config-panel";
import InterfaceConfigPanel from "@/components/dashboard/interface-config-panel";
import ConfigType from "@/types/config-type";

export const ConfigRenderMap = {
    [ConfigType.FreeConfig] : FreeConfigPanel,
    [ConfigType.Interfaces] : InterfaceConfigPanel, 
    [ConfigType.AccessLists] : AccessListConfigPanel,
}