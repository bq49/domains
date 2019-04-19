/*
created by shawn 20190419
*/    

class DynamicDomain
{
    public conf_src:string = "";
    public confObj:any = null;

    public listdata:any = null;

    public caller:any = null;
    public callback:any = null;

    public idNow:number = 0;

    constructor(confsrc:string,caller:any,callback:any)
    {
        this.conf_src = confsrc;
        this.confObj = {};
        this.caller = caller;
        this.callback = callback;
        
        this.init();
    }

    public init():void
    {
        //取出当前列表存档
        var list = SaveManager.getObj().get(SaveManager.KEY_API_URLS,null);
        if( list == null )
        {
            //没有存档，读取配置
            this.loadUrlsConf(this.conf_src,this,this.onUrlsConfLoaded);
        }else{
            //已有存档记录,使用存档
            this.setListData(list);
        }
    }
    //读取配置
    public loadUrlsConf(conf_src:string,caller:any,callback:any):void
    {
        Laya.loader.load(
            conf_src,
            Laya.Handler.create(caller,callback,[conf_src]),
            null,Laya.Loader.JSON);
    }

    //加载完毕
    public onUrlsConfLoaded(src:string):void
    {
        this.confObj = Laya.loader.getRes(src);
        if( this.confObj.length > 0 )
        {
            //存档
            SaveManager.getObj().save(SaveManager.KEY_API_URLS,this.confObj);

            this.setListData(this.confObj);
        }else{
            Debug.trace("DynamicDomain.onUrlsConfLoaded null");
        }
    }

    public setListData( obj:any ):void
    {
        this.listdata = obj;
        Debug.trace("DynamicDomain.setListData:");
        Debug.trace(this.listdata);
        this.testAndUpdateUrls(this.listdata);
    }

    //测试和更新配置
    public testAndUpdateUrls(arr:any):void
    {
        this.idNow = 0;

        this.requestTest(this.listdata[this.idNow].url);
    }

    public requestTest(url:string):void
    {
        Debug.trace("DynamicDomain.requestTest url:"+url);
        NetManager.getObj().HttpConnect(url,this,this.responseTest);
    }
    public responseTest(s:any,stat:string,hr:any):void
    {
        Debug.trace("DynamicDomain.responseTest:stat:"+stat);
        // Debug.trace(s);
        // Debug.trace(hr);
        //收到消息
        if( stat == "complete" )
        {
            //成功访问，结束测试
            //检查是否有新配置，如果有，保存新配置
            if( s.list )
            {
                SaveManager.getObj().save(SaveManager.KEY_API_URLS,s.list);
            }
            this.testAndUpdateSuc();
        }else{
            //访问失败，检查下一个地址
            this.idNow += 1;
            if( this.idNow >= this.listdata.length )
            {
                //完蛋，所有地址都不能用
                Debug.trace("DynamicDomain.responseTest over=====all err");
            }else{
                //继续测试下一个地址
                this.requestTest(this.listdata[this.idNow].url);
            }
        }
    }

    //测试和更新配置完毕
    public testAndUpdateSuc():void
    {
        Debug.trace("DynamicDomain.testAndUpdateSuc this.idNow:"+this.idNow);
        this.callback.apply(this.caller,this);
    }

    //提取首选地址
    public getDomain():string
    {
        return this.listdata[this.idNow].url;
    }
}