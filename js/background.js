// importScripts('js/jquery.min.js');
console.log('This is background.js !');

// FUNCTION TO GENERATE USERID
function generateSimpleUserID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < 8; i++) {
        randomString += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const dateTime = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 14);

    return randomString + dateTime;
}

// FUNCTION TO SEND USER INFORMATION
function sendExtUser() {
    chrome.storage.local.get(['userId']).then(function (result) {
        const user_hash = result.userId;
        const device = navigator.userAgent;

        // FETCH XHR
        const url = 'http://127.0.0.1:8000/api/v1/ext-user';
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

chrome.runtime.onInstalled.addListener(function () {
    // INITIATE APP IS INSTALLED
    console.log('app installed..');

    // CHECK USERID
    chrome.storage.local.get(['userId']).then(function (result) {
        var userId = result.userId;

        if (!userId) {
            chrome.storage.local.remove('userId').then(function () {
                console.log('userId removed!');
            });

            const userId = generateSimpleUserID();
            console.log('Generated User ID:', userId);

            chrome.storage.local.set({ userId: userId }).then(function () {
                console.log('Successfully create UserId!');
            });
        } else {
            console.log('UserId: ' + userId);
        }
        sendExtUser();
    });

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