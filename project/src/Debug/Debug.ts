class Debug
{
    public static bDebug = true;//window["bDebug"];

    public static error(ct:any):void
    {
        if(!Debug.bDebug)
        {
            return;
        }

        console.error(ct);
    }

    public static trace(ct:any,data={}):void
    {
        if(!Debug.bDebug)
        {
            return;
        }
        console.log(ct);
    }
}