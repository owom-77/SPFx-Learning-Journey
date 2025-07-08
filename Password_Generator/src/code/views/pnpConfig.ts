import {SPFI, spfi, SPFx} from '@pnp/sp';
import { WebPartContext } from '@microsoft/sp-webpart-base';

let _sp:SPFI | null = null;

export const getSP = (context?: WebPartContext):SPFI =>{
    if(!_sp && context) {
        _sp = spfi().using(SPFx(context));
    }

    return _sp!
}

