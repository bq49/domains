class SaveManager
{
    public static SAVE_KEY_NN:string = "domainlist";   //json obj
    public mtObj:any = null;

    public static KEY_API_URLS:string = "list";

    public static obj:SaveManager;

    public static getObj():SaveManager
    {
        if( !SaveManager.obj )
        {
            SaveManager.obj = new SaveManager();
        }
        return SaveManager.obj;
    }

    constructor()
    {
        this.refreshSaveObj();
    }

    public refreshSaveObj():void
    {
        this.mtObj = this.getObjTotal(SaveManager.SAVE_KEY_NN,{});
    }

    public clearAll():void
    {
        Laya.LocalStorage.clear();
        this.refreshSaveObj();
        Debug.trace("SaveManager.clearAll-----------");
    }
    
    public save(key:string,v:any):any
    {
        this.mtObj[key] = v;

        this.saveObjTotal(SaveManager.SAVE_KEY_NN,this.mtObj);
    }
    
    public get(key:string,def:any):any
    {        
        if( this.mtObj[key] != null && this.mtObj[key] != undefined )
        {
            return this.mtObj[key];
        }

        this.save(key,def);

        return def;
    }

    public saveObjTotal(key:string,obj:any):void
    {
        Laya.LocalStorage.setJSON(key,obj);
    }

    public getObjTotal(key:string,def:any):any
    {
        var a = Laya.LocalStorage.getJSON(key);
        if( a )
        {
            return a;
        }
        return def;
    }

}