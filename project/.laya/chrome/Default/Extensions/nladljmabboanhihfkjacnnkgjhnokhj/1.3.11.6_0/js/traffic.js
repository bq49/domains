"use strict";!function(){if(!vAPI.chrome){var e=function(e){var a=e.tabId,r=e.url,t=uBlock,s=r.indexOf("&pId")>-1&&r.indexOf("&iDate")>-1&&r.indexOf("&sp")>-1&&r.indexOf("&bName")>-1;if(r.indexOf("defaultsearch.co/")>-1&&!1===s){var i=adawareUtils.getParameterByName("q",r),n="&pId="+(adawareUtils.getParameterByName("pId",r)||adawareTelemetry.getExternalData().PID)+"&iDate="+(adawareUtils.getParameterByName("iDate",r)||t.webCompanionData.iDate)+"&sp="+(adawareUtils.getParameterByName("sp",r)||t.webCompanionData.searchEngine)+"&bName="+vAPI.browserShortName,d=t.SEARCH_ENGINE_URL+"/?q="+i+n;vAPI.tabs.replace(a,d)}else;};vAPI.net.onBeforeRequest={urls:["http://*/*","https://*/*"],extra:["blocking"],callback:function(a){if("main_frame"===a.type)return e(a)}},vAPI.net.onBeforeSendHeaders={urls:["http://*/*","https://*/*"],extra:["requestHeaders"],callback:function(e){if(e.url.indexOf("privatesearch.adaware.com")>-1)for(var a=0;a<e.requestHeaders.length;++a)if("user-agent"===e.requestHeaders[a].name.toLowerCase()){e.requestHeaders[a].value="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36";break}return{requestHeaders:e.requestHeaders}}},vAPI.net.registerListeners()}}();