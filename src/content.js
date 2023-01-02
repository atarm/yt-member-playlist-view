// background
chrome.action.onClicked.addListener((tab) => {
    path = tab.url.split('/');
    // youtubeチャンネルページ以外は弾くよ
    if (path[2] === 'www.youtube.com' && (path[3] === 'channel' || path[3] === 'c' || path[2].indexOf('@'))) {
        // メンバー限定動画再生リストを新しいタブで開く
        // NOTE:YoutubeチャンネルURL仕様の変更(チャンネルID,カスタムURL->ユーザーID)に伴い、従来の処理では対応できなくなったので変更
        //      HTML要素にチャンネルIDがあることは確認できたため、SPA対策のためtab.urlでHTML要素を取得→解析してチャンネルIDを取得するように変更
        var waitAsynchronousFunc = (async() => {
            var htmlText = await httpGet(tab.url)
            chrome.tabs.sendMessage(tab.id,{message : 'openMemberVideoList',html : htmlText});        
        })();
    } else {
        // 
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png',
            title: `メン限動画プレイリストView`,
            message: "Run it on Youtube channel page!",
            priority: 1
        });
    }
});

async function httpGet(url) {
    const res = await fetch(url, {
        method: "GET",
        mode: "cors", // manifest v3はcorsじゃないと動かないってどこかで見た。
    });
    // TODO:本当はここでDOMに変換できるとスマートだと思う。
    const txt = await res.text();
    return txt
}