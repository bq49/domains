import WebGL = Laya.WebGL;

// 程序入口
class GameMain{

    constructor()
    {
        Laya.init(600,400, WebGL);

        var dyd = new DynamicDomain("./conf/urls.json",this,this.onDomainReady);
        
    }

    public onDomainReady(dyd:DynamicDomain):void
    {
        var url = dyd.getDomain();
        if( url != null )
        {
            NetManager.getObj().HttpConnect(url,this,this.onResponse);
        }else{
            Debug.trace("LayaSample.url == null");
        }
    }

    public onResponse(s:any,stat:string,hr:any):void
    {
        Debug.trace("LayaSample.onResponse:");
        Debug.trace(stat);
        Debug.trace(s);
        Debug.trace(hr);
    }
}
new GameMain();