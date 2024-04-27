console.log('This is background.js !');
// console.log(this);

chrome.runtime.onInstalled.addListener(function () {
    console.log('installed');
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

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse){
    var action = message.action;
    var value = message.value;
    if(action == 'contentScript'){
        var result = value;
        sendResponse({result});
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