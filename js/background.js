class background {

    // FUNCTION TO GENERATE USERID // NOT FOR USAGE
    generateSimpleUserID() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < 8; i++) {
            randomString += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        const dateTime = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 14);

        return randomString + dateTime;
    }

    // FUNCTION TO SEND USER INFORMATION // NOT FOR USAGE
    sendExtUser() {
        chrome.storage.local.get(['userId', 'useExternal']).then(function (result) {
            const user_hash = result.userId;
            const device = navigator.userAgent;
            const useExternal = result.useExternal;

            // FETCH XHR
            const url = useExternal == 1 ? 'https://chrome.server.resaka.my.id/api/v1/ext-user' : 'http://127.0.0.1:8000/api/v1/ext-user';
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 1|zaQoCF4MGINb2JKOGwrKa2Tk3KtJEEHINUZLX7yM160d4f8f'
            };
            const data = {
                user_hash: user_hash,
                device: device
            };

            console.log('Sending information...');

            fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Success:', data);
                })
                .catch(error => {
                    console.error('Fetch call failed:', error);
                });

        })
    }

    // INITIATE ON INSTALLED
    initiateInstalled() {
        const thisClass = this;
        chrome.runtime.onInstalled.addListener(function () {
            console.log('app installed..');
            chrome.storage.local.set({ useExternal: 0 }).then(function () {
                chrome.storage.local.get('useExternal', function (data) {
                    if (data.useExternal == 1) {
                        console.log('Using External Server!');
                    } else {
                        console.log('Using Internal Server!');
                    }
                });
            });
            chrome.storage.local.set({ ExtStat: 1 }).then(function () {
                console.log('ExtStat ON!');
            });
            chrome.storage.local.set({ AutoAnalyze: 1 }).then(function () {
                console.log('AutoAnalyze ON!');
            });
            chrome.storage.local.get(['userId']).then(function (result) {
                var userId = result.userId;
                if (!userId) {
                    chrome.storage.local.remove('userId').then(function () {
                        console.log('userId removed!');
                    });

                    const userId = thisClass.generateSimpleUserID();
                    console.log('Generated User ID:', userId);

                    chrome.storage.local.set({ userId: userId }).then(function () {
                        console.log('Successfully create UserId!');
                    });
                } else {
                    console.log('UserId: ' + userId);
                }
                thisClass.sendExtUser();
            });

        });
    }

}

// USAGE
const running = new background();
running.initiateInstalled();

// __________________________________________________________________________________________________________________________________ //

// importScripts('js/jquery.min.js');
console.log('This is background.js !');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "blockDownloads") {
        // Global flag to control whether downloads are allowed
        var allowDownloads = message.permission;
        console.log('Permission to download:', allowDownloads);

        if (allowDownloads === 'block') {
            // Add listener for download events to cancel downloads
            chrome.downloads.onCreated.addListener(cancelDownload);

        } else {
            // Remove listener for download events to allow downloads
            chrome.downloads.onCreated.removeListener(cancelDownload);
            console.log('Downloads are allowed.');
        }
    }
});

// Function to cancel a download
function cancelDownload(downloadItem) {
    console.log('Download created:', downloadItem);
    chrome.downloads.cancel(downloadItem.id, () => {
        if (chrome.runtime.lastError) {
            console.error('Failed to cancel download:', chrome.runtime.lastError);
        } else {
            console.log('Download canceled:', downloadItem.id);
        }
    });
}


// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fetchFinalUrl') {
        fetch(request.url, { method: 'HEAD', redirect: 'follow' })
            .then(response => {
                sendResponse({ finalUrl: response.url, index: request.index });
            })
            .catch(error => {
                console.error('Error:', error);
                sendResponse({ error: error.message, index: response.index });
            });
        return true;
    }
});

// chrome.action.setBadgeText({text: 'ON'});

function test(a) {
    if (a == 'iya') {
        return 'ok';
    } else {
        return 'not ok';
    }
}

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     var action = message.action;
//     var value = message.value;
//     if(action == 'functionTest'){
//         var hasil = test(message.value);
//         sendResponse({result: hasil});
//     }
// });

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    var action = message.action;
    var value = message.value;
    if (action == 'contentScript') {
        var result = value;
        sendResponse({ result });
    }
});

// chrome.alarms.create('myAlarm', {
//     periodInMinutes: 10 / 60
// });

// chrome.alarms.onAlarm.addListener(function (alarm) {
//     if(alarm.name == 'myAlarm'){
//         console.log('Alarm triggered! : ' + new Date().getSeconds());
//     }
// });

chrome.contextMenus.create({
    id: 'menu1',
    title: 'amogus very sus',
    contexts: ['all']
})

// IN CASE YOU WANT TO REMOVE MENU, USE MENU ID
// chrome.contextMenus.remove('menu1');

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    console.log(info);
    console.log(tab);
});