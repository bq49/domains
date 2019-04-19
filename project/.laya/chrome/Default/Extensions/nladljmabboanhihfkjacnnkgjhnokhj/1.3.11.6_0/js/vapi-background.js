"use strict";!function(){var e,t=self.vAPI=self.vAPI||{},n=self.chrome,r=n.runtime.getManifest();t.chrome=!0,t.chromiumVersion=null!==(e=/\bChrom(?:e|ium)\/(\d+)\b/.exec(navigator.userAgent))?parseInt(e[1],10):NaN;var i=function(){};t.browserShortName="undefined"!=typeof InstallTrigger?"FF":(window.chrome&&window.chrome.webstore,"CH"),t.app={name:r.name,version:r.version},t.app.restart=function(){n.runtime.reload()};t.getUILanguage=n.i18n.getUILanguage,t.onExtensionLaunch=function(e){t.storage.get({version:"0.0.0.0"},function(n){var r=n.version;t.app.version>r&&"0.0.0.0"!==r?e({reason:"update",lastVersion:r}):t.storage.get({firstRun:!0},function(n){!0===n.firstRun?(e({reason:"install"}),t.storage.set({firstRun:!1})):e({reason:"startup"})})})},t.setUninstallURL=function(e,t){n.runtime.setUninstallURL(e,t)},t.setCookie=function(e){var t={url:"https://"+e.host+e.path,name:e.name,value:e.value,path:e.path,secure:e.isSecure,httpOnly:e.isHttpOnly,expirationDate:e.expiry};n.cookies.set(t,function(){})},t.getCookie=function(e,t){var r={url:e.url,name:e.name};n.cookies.get(r,function(e){t&&t(e?e.value:null)})},t.storage=n.storage.local,t.cacheStorage=n.storage.local,t.syncStorage=n.storage.sync,t.tabs={},t.tabs.query=n.tabs.query,t.tabs.executeScript=n.tabs.executeScript,t.isBehindTheSceneTabId=function(e){return"-1"===e.toString()},t.noTabId="-1";var s=function(e){return"string"==typeof e&&(e=parseInt(e,10)),"number"!=typeof e||isNaN(e)||-1===e?0:e};t.tabs.registerListeners=function(){var e=this.onNavigation||i,t=this.onUpdated||i,r=/^https?:\/\//,s=function(e){if(!1===e.startsWith("data:"))return e;var t=e.indexOf(",");if(-1===t)return e;var n=e.slice(0,t);return-1===n.search(/\s/)?e:n.replace(/\s+/,"")+e.slice(t)};n.webNavigation.onBeforeNavigate.addListener(function(e){e.frameId}),n.webNavigation.onCommitted.addListener(function(t){0===t.frameId&&(t.url=s(t.url),e(t))}),n.webNavigation.onCreatedNavigationTarget instanceof Object&&n.webNavigation.onCreatedNavigationTarget.addListener(function(t){!1===r.test(t.url)&&(t.frameId=0,t.url=s(t.url),e(t))}),n.tabs.onUpdated.addListener(function(e,n,r){n.url&&(n.url=s(n.url)),t(e.toString(),n,r)}),"function"==typeof this.onClosed&&n.tabs.onRemoved.addListener(this.onClosed)},t.tabs.get=function(e,t){var r=function(e){n.runtime.lastError,t(e)};if(null===e){n.tabs.query({active:!0,currentWindow:!0},function(e){n.runtime.lastError,t(e[0])})}else 0===(e=s(e))?r(null):n.tabs.get(e,r)},t.tabs.open=function(e){var r=e.url;if("string"!=typeof r||""===r)return null;!0!==/^[\w-]{2,}:/.test(r)&&(r=t.getURL(r));var i=function(){void 0===e.active&&(e.active=!0);var i=function(){var i={url:r,active:!!e.active},a=function(e){e.active&&n.windows.update(e.windowId,{focused:!0})};if(!e.tabId)return void 0!==e.index&&(i.index=e.index),void n.tabs.create(i,a);n.tabs.update(s(e.tabId),i,function(r){t.lastError()?n.tabs.create(i,a):void 0!==e.index&&n.tabs.move(r.id,{index:e.index})})};!0!==e.popup?-1===e.index?t.tabs.get(null,function(t){t?e.index=t.index+1:delete e.index,i()}):i():n.windows.create({url:e.url,type:"popup"})};if(e.select){var a=r.indexOf("#"),o=-1===a?r:r.slice(0,a);n.tabs.query({url:o},function(e){var t=e[0];if(t){var s={active:!0,url:void 0};r!==t.url&&(s.url=r),n.tabs.update(t.id,s,function(e){n.windows.update(e.windowId,{focused:!0})})}else i()})}else i()},t.tabs.replace=function(e,r){if(0!==(e=s(e))){var i=r;!0!==/^[\w-]{2,}:/.test(i)&&(i=t.getURL(i)),n.tabs.update(e,{url:i},function(){n.runtime.lastError})}},t.tabs.remove=function(e){if(0!==(e=s(e))){n.tabs.remove(e,function(){n.runtime.lastError})}},t.tabs.reload=function(e){if(0!==(e=s(e))){n.tabs.reload(e,function(){n.runtime.lastError})}},t.tabs.select=function(e){0!==(e=s(e))&&n.tabs.update(e,{active:!0},function(e){n.runtime.lastError,e&&n.windows.update(e.windowId,{focused:!0})})},t.tabs.injectScript=function(e,t,r){var i=function(e){n.runtime.lastError,"function"==typeof r&&r(e)};e?n.tabs.executeScript(s(e),t,i):n.tabs.executeScript(t,i)},t.messaging={ports:{},listeners:{},defaultHandler:null,NOOPFUNC:i,UNHANDLED:"vAPI.messaging.notHandled"},t.messaging.listen=function(e,t){this.listeners[e]=t},t.messaging.onPortMessage=function(){var e=t.messaging,n={},r=function(e,t,n){this.callback=this.proxy.bind(this),this.init(e,t,n)};r.prototype.init=function(e,n,r){return this.port=e,this.request=n,this.timerId=void 0!==r?t.setTimeout(this.callback,r):null,this},r.prototype.proxy=function(t){null!==this.timerId&&(clearTimeout(this.timerId),delete n[this.timerId],this.timerId=null),e.ports.hasOwnProperty(this.port.name)&&this.port.postMessage({auxProcessId:this.request.auxProcessId,channelName:this.request.channelName,msg:void 0!==t?t:null}),this.port=this.request=null,i.push(this)};var i=[],a=function(e,t,n){var s=i.pop();return s?s.init(e,t,n):new r(e,t,n)};return function(t,r){if(void 0===t.toTabId)if(void 0===t.mainProcessId){var i=e.NOOPFUNC;void 0!==t.auxProcessId&&(i=a(r,t).callback);var o=e.UNHANDLED,u=e.listeners[t.channelName];"function"==typeof u&&(o=u(t.msg,r.sender,i)),o===e.UNHANDLED&&(o=e.defaultHandler(t.msg,r.sender,i))===e.UNHANDLED&&i()}else!function(e){var t=e.mainProcessId;if(void 0!==t&&!1!==n.hasOwnProperty(t)){var r=n[t];delete n[t],r.callback(e.msg)}}(t);else!function(t,r){var i,o,u,c=s(t.toTabId);for(var l in e.ports)if(!1!==e.ports.hasOwnProperty(l)&&0===(i=e.ports[l]).sender.frameId&&i.sender.tab.id===c){o=i;break}void 0!==t.auxProcessId&&(u=a(r,t,1023)),void 0!==o?(void 0!==u&&(n[u.timerId]=u),o.postMessage({mainProcessId:u&&u.timerId,channelName:t.toChannel,msg:t.msg})):void 0!==u&&u.callback()}(t,r)}}(),t.messaging.onPortDisconnect=function(e){e.onDisconnect.removeListener(t.messaging.onPortDisconnect),e.onMessage.removeListener(t.messaging.onPortMessage),delete t.messaging.ports[e.name]},t.messaging.onPortConnect=function(e){e.onDisconnect.addListener(t.messaging.onPortDisconnect),e.onMessage.addListener(t.messaging.onPortMessage),t.messaging.ports[e.name]=e},t.messaging.setup=function(e){null===this.defaultHandler&&("function"!=typeof e&&(e=function(){return t.messaging.UNHANDLED}),this.defaultHandler=e,n.runtime.onConnect.addListener(this.onPortConnect))},t.messaging.broadcast=function(e){var t={broadcast:!0,msg:e};for(var n in this.ports)!1!==this.ports.hasOwnProperty(n)&&this.ports[n].postMessage(t)},t.net={},t.lastError=function(){return n.runtime.lastError},t.preopenedTabUrls=[],t.capturePreOpenedTabUrls=function(){n.tabs.query({url:"<all_urls>"},function(e){for(var n,r=e.length;r--;)n=e[r],t.preopenedTabUrls.push(n.url)})},t.onLoadAllCompleted=function(){n.tabs.query({url:"<all_urls>"},function(e){uBlock;for(var t,n=e.length;n--;)t=e[n],/^https?:\/\//.test(t.url)&&t.id})}}();