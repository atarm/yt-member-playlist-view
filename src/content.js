(function() {
    chrome.browserAction.onClicked.addListener(function(tab) {
        path = tab.url.split('/');
        if (path[2] === 'www.youtube.com' && path[3] === 'channel' || path[3] === 'c') {
            if (path[4].substr(0, 2) === 'UC') {
                url = 'https://www.youtube.com/playlist?list=UUMO' + path[4].substring(2);
                window.open(url, '_blank');
            } else {
                alert('現在開いているページのURLにカスタムURLが使用されています。\nwww.youtube.com/channel/UC~のページで再実行してください。');
            }
        } else {
            alert('メンバー限定動画プレイリストを表示したいYoutubeチャンネルで実行してください。\n');
        }
    });
}());