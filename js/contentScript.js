// alert('This is ContentScript.js');
chrome.runtime.sendMessage({ action: "contentScript", value: "nothing" }, function (response) {
    console.log(response.result);
});

// $('.gLFyf').on('input', function () {
//     var value = $('.gLFyf').val();
//     console.log(value);
// });

// document.querySelector('.gLFyf').addEventListener('input', function () {
//     var value = this.value;
//     console.log(value);
// });

chrome.storage.local.set({ name: 'test' }).then(function () {
    console.log('Value set successfully!');
});

setTimeout(function () {
    chrome.storage.local.get(['name']).then(function (result) {
        ; console.log('Your value is: ' + result.name);
    });
}, 4000)

$(document).ready(function () {

    setTimeout(function () {
        $('.gb_Fe').after('<button class="capsule-button" style="color: white"> MAILGUARD </button> ');

        $('.capsule-button').on('click', function (e) {
            e.preventDefault();

            var dom = $('.ii').html();

            if (dom) {
                $.ajax({
                    // url: 'http://127.0.0.1:8000/api/v1/test',
                    url: 'https://chrome.server.resaka.my.id/api/v1/test',
                    type: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 1|zaQoCF4MGINb2JKOGwrKa2Tk3KtJEEHINUZLX7yM160d4f8f'
                    },
                    beforeSend: function () {
                        $('.capsule-button').html('WAITING..');
                    },
                    success: function (response) {
                        var result = response;
                        console.log(result);
                        $('.capsule-button').html(result);

                        // sendResponse({result});
                    }
                });

                $('.aeH').before('<h3 class="custom-div animate__animated animate__fadeIn animate__slow" style="margin-left: 20px; text-align: center;"> AUTO SCAN </h3>');
                $('.aeF').addClass('disabled-div');

                // $('.capsule-button').after('\
                // <div id="tooltip" role="tooltip"> MY TOOLTIP </div> \
                // ');

                // $('#tooltip').css({
                //     "background": "#333", 
                //     "color": "white", 
                //     "font-weight": "bold", 
                //     "padding": "4px 8px", 
                //     "font-size": "13px", 
                //     "border-radius": "4px",
                //     "margin-top": "20px"});

                // const button = document.querySelector('.capsule-button');
                // const tooltip = document.querySelector('#tooltip');

                // const popperInstance = Popper.createPopper(button, tooltip);

            } else {
                $('.capsule-button').html('NO EMAIL DETECTED');
            }

            // chrome.runtime.sendMessage({ action: 'openPopup' });

            chrome.runtime.sendMessage("OpenPopup");

        });

    }, 2000);

    $(window).on('hashchange', function() {
        $('.custom-div').remove();
        $('.aeF').removeClass('disabled-div');
    });

});

// console.log('TEST');

