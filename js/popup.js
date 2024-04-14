setTimeout(function () {
    // alert('Hello popup!');
}, 2000);
console.log(this);

chrome.runtime.sendMessage({ action: "functionTest", value: "iya" }, function (response) {
    console.log('hasil: ' + response.result);
});

$(document).ready(function () {
    function switchON() {
        $('#switchArea').html('<button class="btn btn-success" id="switchBTN"> ON </button>');
        $('#switchBTN').hover(function () {
            $(this).css('background-color', 'red');
            $(this).html('OFF');
        }, function () {
            $(this).css('background-color', 'green');
            $(this).html('ON');
        });
    }

    function switchOFF() {
        $('#switchArea').html('<button class="btn btn-success" id="switchBTN"> OFF </button>');
        $('#switchBTN').hover(function () {
            $(this).css('background-color', 'green');
            $(this).html('ON');
        }, function () {
            $(this).css('background-color', 'red');
            $(this).html('OFF');
        });
    }

    switchON();
    var state;
    var theSwitch = $('#switchBTN').html();
    state = theSwitch;

    $('#switchBTN').on('click', function () {
        if (state == 'ON') {
            switchON()
        } else {
            switchOFF()
        }
    })

});

// $('#switchArea').on('click', function () {
//     var checked = $('.form-check-input').prop('checked');
//     if (checked) {
//         $('.form-check-label').html('OFF');
//         $('.form-check-input').prop('checked', false);
//     }else{
//         $('.form-check-label').html('ON');
//         $('.form-check-input').prop('checked', true);
//     }
// });

// chrome.action.setBadgeText({ text: '1' });
// chrome.action.setBadgeTextColor({color: 'red'});
// chrome.action.getBadgeText({}, function (result){
//     console.log('get Badge: ' + result);
// });