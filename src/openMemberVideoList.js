// content_scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse)=> {
    if (request.message == 'openMemberVideoList'){
        // DOMParserが使えないので、無理やりDOMに変換
        var dom = document.createElement('div');
        dom.innerHTML = request.html;
        //
        var channelId = dom.querySelector('[itemprop="channelId"]').content;
        url = 'https://www.youtube.com/playlist?list=UUMO' + channelId.replace("UC", "");
        //
        location.href = url;
        return true
    }
    return true
});