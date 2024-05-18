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

            // DOM ISI EMAIL
            var dom = $('.ii').html();

            if (dom) {

                chrome.storage.local.get(['useExternal']).then((result) => {
                    const useExternal = result.useExternal;

                    $.ajax({
                        url: useExternal == 1 ? 'https://chrome.server.resaka.my.id/api/v1/test' : 'http://127.0.0.1:8000/api/v1/test',
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
                            $('.capsule-button').html(result);
                        }
                    });

                })

                // CUSTOM NAVIGATION
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

            // TO GET TEXT
            // var textBox = "";
            // $('.a3s p').each(function () {
            //     var text = $(this).text();
            //     textBox += text;
            // });

            var textBox = $('.a3s').text().replace(/\s+/g, ' ');
            console.log(textBox);

            chrome.storage.local.get(['useExternal']).then((result) => {
                const useExternal = result.useExternal;

                $.ajax({
                    url: useExternal == 1 ? 'https://chrome.server.resaka.my.id/api/v1/insert-dataset' : 'http://127.0.0.1:8000/api/v1/insert-dataset',
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 1|zaQoCF4MGINb2JKOGwrKa2Tk3KtJEEHINUZLX7yM160d4f8f'
                    },
                    beforeSend: function () {
                        console.log('sending text.....');
                    },
                    data: JSON.stringify({
                        text: textBox
                    }),
                    success: function (response) {
                        console.log('status: ' + response.status);
                        console.log('message: ' + response.message);
                    }
                });

            })

        });

        // TO GET LINK
        // $('.a3s a').each(function () {
        //     var href = $(this).attr('href');
        //     console.log(href);
        // });


    }, 5000);

    $(window).on('hashchange', function () {
        $('.custom-div').remove();
        $('.aeF').removeClass('disabled-div');
    });

});