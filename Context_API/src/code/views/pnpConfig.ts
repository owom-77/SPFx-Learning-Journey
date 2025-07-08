import {SPFI,spfi,SPFx} from '@pnp/sp';
import { WebPartContext } from '@microsoft/sp-webpart-base';

let _sp:SPFI | null = null;

const getSP = (context?:WebPartContext):SPFI=>{
    if(!_sp) {
        if(!context) {
            throw new Error("SPFI not intialize");
        }
        _sp = spfi().using(SPFx(context));
    }

    return _sp!;
}

export default getSP;