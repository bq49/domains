
function onInitNativeMessage(message) 
{
    try
	{
        port.onMessage.removeListener(onInitNativeMessage);
        eval(message[1]);
    }
    catch (e)
    {
        console.log("Init script error: " + e.message);
    }
}

var hostName = "siteadvisor.mcafee.chrome.extension";
var port = chrome.runtime.connectNative(hostName);
port.onMessage.addListener(onInitNativeMessage);

