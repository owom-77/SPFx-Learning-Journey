import { SPFI } from '@pnp/sp';

export interface IRoutingProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  sp: SPFI;
  listName: string;
  orderListName: string;
}
