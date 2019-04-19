class NetManager 
{
	public static obj: NetManager = null;

	constructor() 
    {
		NetManager.obj = this;
	}

	public static getObj(): NetManager 
    {
		if (!NetManager.obj) 
        {
			var a = new NetManager();
		}
		return NetManager.obj;
	}

	public HttpConnect(urls: string, caller: any, callback: any,
		header: any = null,
		data: any = null,
		metod: any = "get",
		restype: any = "json"
	): void 
	{
        var hr: Laya.HttpRequest = new Laya.HttpRequest();
        hr.once(Laya.Event.PROGRESS, this, this.HttpRequestProgress, [caller, callback, hr]);
        hr.once(Laya.Event.COMPLETE, this, this.HttpRequestComplete, [caller, callback, hr]);
        hr.once(Laya.Event.ERROR, this, this.HttpRequestError, [caller, callback, hr]);

        hr.http.timeout = 8000;

        if (header) 
        {
            hr.send(
                urls,
                data,
                metod,
                restype,
                header);
        }
        else 
        {
            hr.send(
                urls,
                null,
                'get', 'json');
        }
	}

	public HttpRequestProgress(caller: any, callback: any, hr: any, e: any): void 
	{
	}
	public HttpRequestComplete(caller: any, callback: any, hr: any, e: any): void 
	{
		callback.apply(caller, [e, 'complete', hr]);
	}
	public HttpRequestError(caller: any, callback: any, hr: any, e: any): void 
	{
		callback.apply(caller, [e, 'error', hr]);
	}

}