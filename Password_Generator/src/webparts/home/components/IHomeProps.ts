import { SPFI } from "@pnp/sp";

export interface IHomeProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  sp:SPFI;
  listName: string;
}
