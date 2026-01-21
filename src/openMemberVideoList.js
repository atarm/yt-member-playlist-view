// content_scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse)=> {
    if (request.message == 'openMemberVideoList'){
        // DOMParserが使えないので、無理やりDOMに変換
        var dom = document.createElement('div');
        dom.innerHTML = request.html;
        //
        var channelId = extractChannelId(dom, request.html);
        if (!channelId) {
            alert('Failed to extract channel ID. Please try again or report this issue.');
            return true;
        }
        url = 'https://www.youtube.com/playlist?list=UUMO' + channelId.replace("UC", "");
        //
        location.href = url;
        return true;
    }
    return true;
});

function extractChannelId(dom, html) {
    // YouTube channel IDs start with "UC" prefix
    var CHANNEL_ID_PATTERN = /\/channel\/(UC[\w-]+)/;
    
    // Method 1: Try itemprop="identifier" (works for English pages)
    try {
        var identifierElement = dom.querySelector('[itemprop="identifier"]');
        if (identifierElement && identifierElement.content) {
            return identifierElement.content;
        }
    } catch (e) {
        console.log('Method 1 failed:', e);
    }

    // Method 2: Try link[rel="canonical"] to extract from URL
    try {
        var canonicalLink = dom.querySelector('link[rel="canonical"]');
        if (canonicalLink && canonicalLink.href) {
            var match = canonicalLink.href.match(CHANNEL_ID_PATTERN);
            if (match && match[1]) {
                return match[1];
            }
        }
    } catch (e) {
        console.log('Method 2 failed:', e);
    }

    // Method 3: Try to extract from ytInitialData JSON
    try {
        var match = html.match(/"channelId":"(UC[\w-]+)"/);
        if (match && match[1]) {
            return match[1];
        }
    } catch (e) {
        console.log('Method 3 failed:', e);
    }

    // Method 4: Try meta tag with property="og:url"
    try {
        var ogUrlMeta = dom.querySelector('meta[property="og:url"]');
        if (ogUrlMeta && ogUrlMeta.content) {
            var match = ogUrlMeta.content.match(CHANNEL_ID_PATTERN);
            if (match && match[1]) {
                return match[1];
            }
        }
    } catch (e) {
        console.log('Method 4 failed:', e);
    }

    return null;
}