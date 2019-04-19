function onMenuOpenedInTab(oTab)
{
	try
	{
		if ( oTab )
		{
			chrome.extension.getBackgroundPage().fnonMenuOpened(window, window.document, oTab.id, oTab.url);
		}
	}
	catch(e)
	{
	}
		
}
function initMenu()
{
	chrome.windows.getCurrent(function(oWnd) { if (oWnd) chrome.tabs.getSelected(oWnd.id, function(oTab) { onMenuOpenedInTab(oTab); }); });
}
	
document.addEventListener('DOMContentLoaded', initMenu);	
