function onImage() {
    $('#offImage').hide();
    $('#onImage').show();
}
function offImage() {
    $('#onImage').hide();
    $('#offImage').show()
}

function turnOnImage() {
    chrome.storage.local.set({ ExtStat: 1 }).then(function () {
        console.log('ExtStat ON!');
    });
    $('#offImage').hide();
    $('#onImage').show();
}

function turnOffImage() {
    chrome.storage.local.set({ ExtStat: 0 }).then(function () {
        console.log('ExtStat OFF!');
    });
    $('#onImage').hide();
    $('#offImage').show()
}

chrome.storage.local.get(['ExtStat']).then(function (result) {
    const ExtStat = result.ExtStat;
    if (ExtStat == 1) {
        onImage()
        forceOnAuto()
    } else {
        offImage()
        forceOffAuto()
    }
})

function forceOffAuto () {
    chrome.storage.local.set({ AutoAnalyze: 0 }).then(function () {
        console.log('AutoAnalyze FORCE OFF!');
    });
    $('#autoAnalyze').prop('checked', false);
    $('#autoAnalyze').prop('disabled', true);
}

function forceOnAuto () {
    chrome.storage.local.set({ AutoAnalyze: 1 }).then(function () {
        console.log('AutoAnalyze FORCE ON!');
    });
    $('#autoAnalyze').prop('checked', true);
    $('#autoAnalyze').prop('disabled', false);
}

$('#onImage').on('click', function (e) {
    e.preventDefault();
    turnOffImage();
    forceOffAuto();
    alert('danger', 'OFF');
})
$('#offImage').on('click', function (e) {
    e.preventDefault();
    turnOnImage();
    forceOnAuto();
    alert('success', 'ON');
})

function onAuto() {
    $('#autoAnalyze').prop('checked', true);
}

function offAuto() {
    $('#autoAnalyze').prop('checked', false);
}

chrome.storage.local.get(['AutoAnalyze']).then(function (result) {
    const AutoAnalyze = result.AutoAnalyze;
    if (AutoAnalyze == 1) {
        onAuto()
    } else {
        offAuto()
    }
})

// INITIATE ALERT CARD
function alert(color, text) {
    if (color == 'danger') {
        $('#alertCard').addClass('bg-danger');
        $('#alertCard').removeClass('bg-success');
    } else {
        $('#alertCard').addClass('bg-success');
        $('#alertCard').removeClass('bg-danger');
    }
    $('#alertText').html(text);
    $('#alertCard').show();
    setTimeout(() => {
        $('#alertCard').hide();
    }, 5000)
}

$('#autoAnalyze').on('change', function (e) {
    e.preventDefault();
    if ($(this).prop('checked')) {
        onAuto();
        chrome.storage.local.set({ AutoAnalyze: 1 }).then(function () {
            console.log('AutoAnalyze ON!');
        });
    } else {
        offAuto();
        chrome.storage.local.set({ AutoAnalyze: 0 }).then(function () {
            console.log('AutoAnalyze OFF!');
        });
    }
})

chrome.runtime.sendMessage({ action: "functionTest", value: "iya" }, function (response) {
    console.log('hasil: ' + response.result);
});

$(document).ready(function () {

    chrome.storage.local.get(['userId']).then(function (result) {
        $('#userId').html(result.userId);
        $('#device').html(navigator.userAgent)
    });

    $('#gantiUserId').on('click', function (e) {
        e.preventDefault();
        $(this).hide();
        $('#userIdSpinner').before('<a href="." id="submitUserId" class="ms-2"> submit </a>');

        $('#userId').html('');
        $('#userId').html('<input type="text" id="inputUserId" style="width: 60%;"> </input>');
        $('#inputUserId').attr('placeholder', 'masukan userid');
        $('#inputUserId').focus();

        $('#submitUserId').on('click', function (e) {
            e.preventDefault();

            const input = $('#inputUserId');
            if (!input.val()) {
                input.focus();
            } else {
                $('#submitUserId').remove();
                input.attr('disabled', true);

                $.ajax({
                    url: 'http://127.0.0.1:8000/api/v1/change-user',
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 1|zaQoCF4MGINb2JKOGwrKa2Tk3KtJEEHINUZLX7yM160d4f8f'
                    },
                    beforeSend: function () {
                        $('#userIdSpinner').show();
                    },
                    data: JSON.stringify({
                        user_hash: input.val()
                    }),
                    success: function (response) {
                        const status = response.status;
                        const message = response.message;
                        if (status == 'error') {

                            alert('danger', 'Gagal');
                            input.attr('disabled', false);
                            input.hide();
                            $('#gantiUserId').show();
                            chrome.storage.local.get(['userId']).then(function (result) {
                                $('#userId').html(result.userId);
                            });

                        } else {

                            chrome.storage.local.set({ userId: message }).then(function () {
                                console.log('new UserId: ' + message);
                            });
                            alert('Success', 'Berhasil');
                            input.attr('disabled', false);
                            input.hide();
                            $('#gantiUserId').show();
                            chrome.storage.local.get(['userId']).then(function (result) {
                                $('#userId').html(result.userId);
                            });

                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.error('AJAX call failed:', textStatus, errorThrown);
                        alert('danger', errorThrown);
                        input.attr('disabled', false);
                        input.hide();
                        $('#gantiUserId').show();
                        chrome.storage.local.get(['userId']).then(function (result) {
                            $('#userId').html(result.userId);
                        });
                    },
                    complete: function () {
                        $('#userIdSpinner').hide();
                    }
                });

            }

        })


    });

    // function switchON() {
    //     $('#switchArea').html('<button class="btn btn-success" id="switchBTN"> ON </button>');
    //     $('#switchBTN').hover(function () {
    //         $(this).css('background-color', 'red');
    //         $(this).html('OFF');
    //     }, function () {
    //         $(this).css('background-color', 'green');
    //         $(this).html('ON');
    //     });
    // }

    // function switchOFF() {
    //     $('#switchArea').html('<button class="btn btn-success" id="switchBTN"> OFF </button>');
    //     $('#switchBTN').hover(function () {
    //         $(this).css('background-color', 'green');
    //         $(this).html('ON');
    //     }, function () {
    //         $(this).css('background-color', 'red');
    //         $(this).html('OFF');
    //     });
    // }

    // switchON();
    // var state;
    // var theSwitch = $('#switchBTN').html();
    // state = theSwitch;

    // $('#switchBTN').on('click', function () {
    //     if (state == 'ON') {
    //         switchON()
    //     } else {
    //         switchOFF()
    //     }
    // })

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