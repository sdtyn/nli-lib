import { Lang } from "./Lang";

export class UIComponent{

    private _lang:Lang = new Lang();
    public get lang():Lang
    {
        return this._lang;
    }
    
    public set lang(lang:Lang)
    {
        this.lang = lang;
    }

}