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

// SET GET USER ID
chrome.storage.local.get(['userId']).then((result) => {
    $('body').before('<input type="hidden" value="' + result.userId + '" id="shieldedUserId">');
})

$(document).ready(function () {

    var idAnalisa;

    function getIdUser() {
        var id_user = $('#shieldedUserId').val();
        return id_user;
    }

    setTimeout(function () {
        // $('.gb_Fe').after('<button class="capsule-button" style="color: white"> MAILGUARD </button> ');
        // $('.gb_Fe').after('<img src="' + chrome.runtime.getURL('img/SHIELDEDON.png') + '" id="shieldedNav" style="display: none;">');

        // setTimeout(() => {
        //     $('#shieldedNav').show();
        // }, 5000)

        // SHIELDED NAVIGATION STATUS
        chrome.storage.local.get(['ExtStat']).then((result) => {
            const ExtStat = result.ExtStat;
            if (ExtStat == 1) {
                $('.gb_Fe').after('<img style="height: 6%; width: 6%;" src="https://drive.google.com/uc?id=1uEuXz6W2-pgGrORfYbVpYTtJXNcjh5fd">')
            } else {
                $('.gb_Fe').after('<img style="height: 6%; width: 6%;" src="https://drive.google.com/uc?id=17h2JU2sMWc3WS0yiMp96gPaxUvP55XnF">')
            }
        });

        // TO GET EMAIL SENDER
        function getEmailSender() {
            var emailSender = $('.go').contents().filter(function () {
                return this.nodeType === 3;
            }).text().trim();
            return emailSender;
        }

        // TO INJECT CODE IN EMAIL
        function mainDiv(time) {
            setTimeout(() => {
                $('.AO .nH:first').before('<div class="container" id="mainDiv" style="color: black; background-color: gray; padding: 10px;">  \
                <div class="row" style="margin-left: 65px; display: flex"> \
                 <div class="col-4" style="flex: 0 0 40%;"> \
                    <div class="shielded-card shielded-rounded shielded-shadow"> \
                        <div class="shielded-card-body" align="center"> \
                            <img src="https://drive.google.com/uc?id=1_yIuJ47qNNh0UPQxRix2nPy1Km8lpsVo" style="height: 50%; width: 50%;"> \
                            <p style="margin-top: -10px; font-size: 10px;"> '+ $('#shieldedUserId').val() + ' </p>\
                        </div> \
                    </div>\
                    <div class="shielded-card shielded-rounded shielded-shadow" style="margin-top: 10px;"> \
                        <div class="shielded-card-body"> \
                            <ul>\
                                <li style="font-weight: bold;"> Judul </li>\
                                    '+ $('.ha .hP').text() + '\
                                <li style="font-weight: bold; margin-top: 5px;"> Pengirim </li>\
                                    '+ getEmailSender() + '\
                                <section id="sectionIdAnalisa"> \
                                </section> \
                            </ul>\
                        </div> \
                    </div>\
                    <div class="shielded-card shielded-rounded shielded-shadow" style="margin-top: 10px;"> \
                        <div class="shielded-card-body"> \
                            <p style="font-weight: bold;"> RINGKASAN \
                            <section id="textRingkasan" style="flex: 0 0 50%;" class="typing-effect"></section> \
                            <button class="shielded-btn shielded-btn-success" id="analisaRingkasanBTN"> Analisa Ringkasan </button> \
                            <span class="shielded-spinner-border-sm shielded-text-secondary" style="display: none;" id="spinnerAnalisaRingkasan"></span>\
                        </div> \
                    </div>\
                 </div> \
                 <div class="col-8" style="flex: 0 0 55%; margin-left: 10px;"> \
                    <div class="shielded-card shielded-rounded shielded-shadow"> \
                        <div class="shielded-card-body"> \
                            <ul> \
                                <li style="font-weight: bold;"> URL DETEKSI </li> \
                                    <section id="textURL"></section> \
                                    <button class="shielded-btn shielded-btn-success" id="analisaURLBTN"> Analisa URL </button> \
                                    <span class="shielded-spinner-border-sm shielded-text-secondary" style="display: none;" id="spinnerAnalisaURL"></span>\
                                <li style="font-weight: bold; margin-top: 10px;"> FILE DETEKSI </li> \
                                    <section id="textFile"></section> \
                                    <button class="shielded-btn shielded-btn-success" id="analisaFileBTN"> Analisa File </button> \
                                <li style="font-weight: bold; margin-top: 10px;"> DOMAIN </li> \
                                    <section id="textDomain"></section> \
                                    <button class="shielded-btn shielded-btn-success" id="analisaDomainBTN"> Analisa Domain </button> \
                                    <span class="shielded-spinner-border-sm shielded-text-secondary" style="display: none;" id="spinnerAnalisaDomain"></span>\
                                    <section id="sectionAnalisaDomain"> </section>\
                            </ul> \
                        </div> \
                    </div>\
                 </div> \
                </div>\
                </div>')
            }, time)
            // chrome.storage.local.get(['AutoAnalyze']).then((result) => {
            //     const autoScan = result.AutoAnalyze;
            //     if(autoScan == 1){
            //         $('#analisaRingkasanBTN').click();
            //         $('#analisaURLBTN').click();
            //         $('#analisaFileBTN').click();
            //         $('#analisaDomainBTN').click();
            //     }
            // });
        }

        // ONCE USER ACCESSING GMAIL
        chrome.storage.local.get(['ExtStat']).then((result) => {
            const ExtStat = result.ExtStat;
            if (ExtStat == 1) {
                function checkDOM() {
                    var intervalId = setInterval(() => {
                        // IF USER ALREADY IN EMAIL VIEW
                        var dom = $('.ii').html();
                        if (dom) {
                            mainDiv(0);
                            clearInterval(intervalId);
                        }
                    }, 1000);
                }
                checkDOM();
                // DETECT EMAIL CLICKED
                $(document).on('click', '.zA', function () {
                    var intervalThis = setInterval(() => {
                        var dom = $('#mainDiv').html();
                        if (dom) {
                            clearInterval(intervalThis);
                        } else {
                            mainDiv(0);
                        }
                    }, 1000)
                });

            }
        });

        // TO GENERATE ID ANALISA
        function generateIDAnalisa() {
            var randomString = Math.random().toString(36).substring(2, 10);
            var now = new Date();
            var dateTimeString = now.toISOString();
            return randomString + dateTimeString;
        }

        // TO CHECK IF USER ALREADY MADE ID ANALISA, IF NOT CREATE ONE AND STORE
        function idAnalisaCheck() {
            if (!idAnalisa) {
                idAnalisa = generateIDAnalisa();
                $('#sectionIdAnalisa').html('<li style="font-weight: bold; margin-top: 5px;"> ID Analisa </li>\
                '+ idAnalisa + '');

                chrome.storage.local.get(['useExternal']).then((result) => {
                    const useExternal = result.useExternal;
                    const data = {
                        id_user: $('#shieldedUserId').val(),
                        id_analisa: idAnalisa,
                        title: $('.ha .hP').text()
                    };
                    $.ajax({
                        url: useExternal == 1 ? 'https://chrome.server.resaka.my.id/api/v1/store-data-email' : 'http://127.0.0.1:8000/api/v1/store-data-email',
                        type: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer 1|zaQoCF4MGINb2JKOGwrKa2Tk3KtJEEHINUZLX7yM160d4f8f'
                        },
                        data: JSON.stringify(data),
                        success: function (response) {
                            console.log('Data Email Stored! : ' + response.message);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log(errorThrown);
                        }
                    });
                });

            }
        }

        // ANALIZE TEXT
        function analisaText() {
            var textBox = $('.a3s').text().replace(/\s+/g, ' ');
            var data = {
                model: 'ft:gpt-3.5-turbo-0125:indonesia-computer-university:sumarize-shielded:9PW8Uwhd',
                messages: [{
                    "role": "system",
                    "content": "Sumarize isi dari email yang diberikan user dalam 1 paragrap yang relevan, jelas, dan padat."
                },
                {
                    "role": "user",
                    "content": textBox
                }
                ],
                max_tokens: 256
            }

            idAnalisaCheck();
            $.ajax({
                url: 'https://api.openai.com/v1/chat/completions',
                type: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer sk-proj-tT40EintgesTTrajBiWET3BlbkFJS5PACatqXdj2sz3NJP6E'
                },
                beforeSend: function () {
                    $('#spinnerAnalisaRingkasan').show();
                },
                data: JSON.stringify(data),
                success: function (response) {
                    console.log(response['choices'][0]['message']['content']);
                    // $('#textRingkasan').html(response['choices'][0]['message']['content'])

                    // const text = response['choices'][0]['message']['content'];
                    // const textContainer = $('#textRingkasan');
                    // let index = 0;

                    // function typeText() {
                    //     if (index < text.length) {
                    //         textContainer.text(textContainer.text() + text.charAt(index));
                    //         index++;
                    //         setTimeout(typeText, 50);
                    //     } else {
                    //         textContainer.css('border', 'none');
                    //     }
                    // }

                    // typeText();

                    // const text = response['choices'][0]['message']['content'];
                    // const textContainer = $('#textRingkasan');
                    // let index = 0;
                    // function typeText() {
                    //     if (index < text.length) {
                    //         textContainer.html(textContainer.html() + text.charAt(index));
                    //         if ((index + 1) % 70 === 0) {
                    //             textContainer.html(textContainer.html() + '<br>');
                    //         }
                    //         index++;
                    //         setTimeout(typeText, 50);
                    //     } else {
                    //         textContainer.css('border', 'none');
                    //     }
                    // }
                    // typeText();

                    const text = response['choices'][0]['message']['content'];
                    const textContainer = $('#textRingkasan');
                    let index = 0;
                    let lineLength = 0;

                    function typeText() {
                        if (index < text.length) {
                            const currentChar = text.charAt(index);
                            textContainer.html(textContainer.html() + currentChar);
                            lineLength++;

                            if (currentChar === ' ' && lineLength >= 70) {
                                textContainer.html(textContainer.html() + '<br>');
                                lineLength = 0;
                            }

                            index++;
                            setTimeout(typeText, 50);
                        } else {
                            textContainer.css('border', 'none');
                        }
                    }

                    typeText();


                    chrome.storage.local.get(['useExternal']).then((result) => {
                        const useExternal = result.useExternal;
                        var data1 = {
                            id_email: idAnalisa,
                            original: textBox,
                            assistant: text,
                            id_user: $('#shieldedUserId').val()

                        }
                        $.ajax({
                            url: useExternal == 1 ? 'https://chrome.server.resaka.my.id/api/v1/store-analisa-text' : 'http://127.0.0.1:8000/api/v1/store-analisa-text',
                            type: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer 1|zaQoCF4MGINb2JKOGwrKa2Tk3KtJEEHINUZLX7yM160d4f8f'
                            },
                            data: JSON.stringify(data1),
                            success: function (response) {
                                console.log('Analisa Text Stored! : ' + response);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                console.log(errorThrown);
                            }
                        });
                    });

                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                },
                complete: function () {
                    $('#spinnerAnalisaRingkasan').hide();
                }
            });
        }

        // CLICK EVENT ANALISA TEXT
        $(document).on('click', '#analisaRingkasanBTN', function (e) {
            e.preventDefault();
            $(this).remove();
            analisaText();
        })

        // ANALYZE DOMAIN
        function analisaDomain() {
            $('.ajy').click();
            $('.ajy').click();
            // let elements = $('.ajC .ajv');
            // if (elements.length > 5) {
            //     let sixthElement = elements.eq(5);
            //     let targetElement = sixthElement.find('.gL .gI');
            //     if (targetElement.length) {
            //         let domain = targetElement.text();
            //     } else {
            //         console.log('The target element with classes "gL gI" does not exist.');
            //     }
            // } else {
            //     console.log('There are fewer than six elements with the class "ajv".');
            // }

            let signedByRow = $('.ajC .ajv').filter(function () {
                return $(this).find('.gG .gI').text().trim() === 'signed-by:';
            });
            if (signedByRow.length) {
                let targetElement = signedByRow.find('.gL .gI');
                if (targetElement.length) {
                    let domain = targetElement.text().trim();
                    chrome.storage.local.get(['useExternal']).then((result) => {
                        const useExternal = result.useExternal;
                        idAnalisaCheck();
                        $.ajax({
                            url: useExternal == 1 ? 'https://chrome.server.resaka.my.id/api/v1/store-analisa-domain' : 'http://127.0.0.1:8000/api/v1/store-analisa-domain',
                            type: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer 1|zaQoCF4MGINb2JKOGwrKa2Tk3KtJEEHINUZLX7yM160d4f8f'
                            },
                            beforeSend: function () {
                                $('#spinnerAnalisaDomain').show();
                            },
                            data: JSON.stringify({
                                domain: domain,
                                id_user: $('#shieldedUserId').val(),
                                id_analisa: idAnalisa
                            }),
                            success: function (response) {
                                console.log(response);
                                var totalEmails = response['harmless'] + response['malicious'] + response['suspicious'] + response['timeout'] + response['undetected'];
                                var weightedAverageScore = (response['harmless'] * 0 + response['suspicious'] * 10 + response['malicious'] * 20 + response['undetected'] * 5) / totalEmails;
                                console.log(weightedAverageScore);
                                if (weightedAverageScore < 1.5) {
                                    $('#sectionAnalisaDomain').html('<ul style="cursor: default;"> ' + domain + ' <span style="margin-left: 5px; color: green;"> Resiko Rendah ✅ </span> <span style="margin-left: 5px; font-weight: bold;"> Analyze by VirusTotal </span> </ul>');
                                } else if (weightedAverageScore >= 1.5 && weightedAverageScore <= 2) {
                                    $('#sectionAnalisaDomain').html('<ul style="cursor: default;"> ' + domain + ' <span style="margin-left: 5px; color: orange;"> Resiko Sedang ⚠️ </span> <span style="margin-left: 5px; font-weight: bold;"> Analyze by VirusTotal </span> </ul>');
                                } else {
                                    $('#sectionAnalisaDomain').html('<ul style="cursor: default;"> ' + domain + ' <span style="margin-left: 5px; color: red;"> RESIKO TINGGI ⛔ </span> <span style="margin-left: 5px; font-weight: bold;"> Analyze by VirusTotal </span> </ul>');
                                }

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                console.log(errorThrown);
                                $('#sectionAnalisaDomain').html('<ul style="cursor: default;"> ' + errorThrown + ' </ul>');
                            },
                            complete: function () {
                                $('#spinnerAnalisaDomain').hide();
                            }
                        });

                    });

                } else {
                    console.log('The target element with classes "gL gI" does not exist.');
                    $('#sectionAnalisaDomain').html('<ul style="cursor: default;"> Tidak ada Domain terdetksi </ul>');
                }
            } else {
                console.log('No "signed-by:" row found.');
                $('#sectionAnalisaDomain').html('<ul style="cursor: default;"> Tidak ada Domain terdetksi </ul>');
            }


        }

        // CLICK EVENT ANALISA DOMAIN
        $(document).on('click', '#analisaDomainBTN', function (e) {
            e.preventDefault();
            $(this).remove();
            analisaDomain();
        })

        // FUNCTION ANALISA URL BEGIN
        function analisaURL() {
            // TO GET LINK
            var hrefs = [];
            $('.a3s a').each(function (index) {
                var href = $(this).attr('href');
                $(this).attr('data-shielded', 'shielded_link' + (index + 1))
                hrefs.push(href);
            });
            console.log(hrefs);
            hrefs.forEach(function (href, index) {
                if (href.length > 40) {
                    $('#textURL').append('<ul style="margin-top: 10px;"> <span id="clickableURL" data-shielded="' + (index + 1) + '"> ' + href.substring(0, 40) + '... </span> <span class="shielded-spinner-border-sm shielded-text-secondary" style="margin-left: 5px;" id="spinnerAnalisaURL' + (index + 1) + '"></span> <br> </ul>');
                } else {
                    $('#textURL').append('<ul style="margin-top: 10px;"> <span id="clickableURL" data-shielded="' + (index + 1) + '"> ' + href + ' </span> <span class="shielded-spinner-border-sm shielded-text-secondary" style="margin-left: 5px;" id="spinnerAnalisaURL' + (index + 1) + '"></span> <br> </ul>');
                }
            });
            hrefs.forEach((href, index) => {
                idAnalisaCheck();
                chrome.storage.local.get(['useExternal']).then((result) => {
                    const useExternal = result.useExternal;
                    console.log(getIdUser());
                    console.log(idAnalisa);
                    console.log(href);
                    console.log(index + 1);
                    setTimeout(() => {
                        $.ajax({
                            url: useExternal == 1 ? 'https://chrome.server.resaka.my.id/api/v1/store-analisa-url' : 'http://127.0.0.1:8000/api/v1/store-analisa-url',
                            type: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer 1|zaQoCF4MGINb2JKOGwrKa2Tk3KtJEEHINUZLX7yM160d4f8f'
                            },
                            data: JSON.stringify({
                                id_user: getIdUser(),
                                id_analisa: idAnalisa,
                                href: href,
                                index: (index + 1)
                            }),
                            success: function (response) {
                                console.log(response);
                                const index = response.index;

                                var totalEmails = response['data']['harmless'] + response['data']['malicious'] + response['data']['suspicious'] + response['data']['timeout'] + response['data']['undetected'];
                                var weightedAverageScore = (response['data']['harmless'] * 0 + response['data']['suspicious'] * 10 + response['data']['malicious'] * 20 + response['data']['undetected'] * 5) / totalEmails;
                                if (weightedAverageScore < 1.5) {
                                    $('#clickableURL[data-shielded="' + index + '"]').after(' <span style="margin-left: 5px; color: green;"> Resiko Rendah ✅ </span> <span style="margin-left: 5px; font-weight: bold;"> Analyze by VirusTotal </span> </ul>');
                                } else if (weightedAverageScore >= 1.5 && weightedAverageScore <= 2) {
                                    $('#clickableURL[data-shielded="' + index + '"]').after(' <span style="margin-left: 5px; color: orange;"> Resiko Sedang ⚠️ </span> <span style="margin-left: 5px; font-weight: bold;"> Analyze by VirusTotal </span> </ul>');
                                    $('.a3s a[data-shielded="shielded_link' + index + '"]').attr('data-mediumrisk-analyze', 'true');
                                } else {
                                    $('#clickableURL[data-shielded="' + index + '"]').after(' <span style="margin-left: 5px; color: red;"> RESIKO TINGGI ⛔ </span> <span style="margin-left: 5px; font-weight: bold;"> Analyze by VirusTotal </span> </ul>');
                                    $('.a3s a[data-shielded="shielded_link' + index + '"]').attr('data-highrisk-analyze', 'true');
                                    $('.a3s a[data-shielded="shielded_link' + index + '"]').attr('data-malicious', response.data.malicious);
                                    $('.a3s a[data-shielded="shielded_link' + index + '"]').attr('data-suspicious', response.data.suspicious);
                                    $('.a3s a[data-shielded="shielded_link' + index + '"]').attr('data-undetected', response.data.undetected);
                                }
                                $('#clickableURL[data-shielded="' + index + '"]').css('cursor', 'pointer');
                                $('#clickableURL[data-shielded="' + index + '"]').css('color', 'blue');
                                $('#clickableURL[data-shielded="' + index + '"]').css('text-decoration', 'underline');
                                console.log('success' + index);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                $('#clickableURL[data-shielded="' + (index + 1) + '"]').after(' || ' + errorThrown);
                            },
                            complete: function (response) {
                                $('#spinnerAnalisaURL' + (index + 1) + '').hide();
                            }
                        });
                    }, 4000)
                });
            });

            $(document).on('click', '#clickableURL', function () {
                const index = $(this).data('shielded');
                const target = $('.a3s a[data-shielded="shielded_link' + index + '"]');
                $('.shielded-highlight').removeClass('shielded-highlight');
                target.addClass('shielded-highlight');
                target[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            });

            $('body').on('click', function () {
                $('.shielded-highlight').removeClass('shielded-highlight');
            })

        }

        // CLICK EVENT ANALISA URL
        $(document).on('click', '#analisaURLBTN', function (e) {
            e.preventDefault();
            $(this).remove();
            analisaURL();
        })

        // $('.capsule-button').on('click', function (e) {
        //     e.preventDefault();

        //     // DOM ISI EMAIL
        //     var dom = $('.ii').html();

        //     if (dom) {

        //         chrome.storage.local.get(['useExternal']).then((result) => {
        //             const useExternal = result.useExternal;

        //             $.ajax({
        //                 url: useExternal == 1 ? 'https://chrome.server.resaka.my.id/api/v1/test' : 'http://127.0.0.1:8000/api/v1/test',
        //                 type: 'GET',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                     'Authorization': 'Bearer 1|zaQoCF4MGINb2JKOGwrKa2Tk3KtJEEHINUZLX7yM160d4f8f'
        //                 },
        //                 beforeSend: function () {
        //                     $('.capsule-button').html('WAITING..');
        //                 },
        //                 success: function (response) {
        //                     var result = response;
        //                     $('.capsule-button').html(result);
        //                 }
        //             });

        //         })

        //         // CUSTOM NAVIGATION
        //         $('.aeH').before('<h3 class="custom-div animate__animated animate__fadeIn animate__slow" style="margin-left: 20px; text-align: center;"> AUTO SCAN </h3>');
        //         $('.aeF').addClass('disabled-div');

        //         // $('.capsule-button').after('\
        //         // <div id="tooltip" role="tooltip"> MY TOOLTIP </div> \
        //         // ');

        //         // $('#tooltip').css({
        //         //     "background": "#333", 
        //         //     "color": "white", 
        //         //     "font-weight": "bold", 
        //         //     "padding": "4px 8px", 
        //         //     "font-size": "13px", 
        //         //     "border-radius": "4px",
        //         //     "margin-top": "20px"});

        //         // const button = document.querySelector('.capsule-button');
        //         // const tooltip = document.querySelector('#tooltip');

        //         // const popperInstance = Popper.createPopper(button, tooltip);

        //     } else {
        //         $('.capsule-button').html('NO EMAIL DETECTED');
        //     }

        //     // chrome.runtime.sendMessage({ action: 'openPopup' });

        //     chrome.runtime.sendMessage("OpenPopup");

        //     // TO GET TEXT
        //     // var textBox = "";
        //     // $('.a3s p').each(function () {
        //     //     var text = $(this).text();
        //     //     textBox += text;
        //     // });

        //     // var textBox = $('.a3s').text().replace(/\s+/g, ' ');
        //     // console.log(textBox);

        //     // chrome.storage.local.get(['useExternal']).then((result) => {
        //     //     const useExternal = result.useExternal;

        //     //     $.ajax({
        //     //         url: useExternal == 1 ? 'https://chrome.server.resaka.my.id/api/v1/insert-dataset' : 'http://127.0.0.1:8000/api/v1/insert-dataset',
        //     //         type: 'POST',
        //     //         headers: {
        //     //             'Content-Type': 'application/json',
        //     //             'Authorization': 'Bearer 1|zaQoCF4MGINb2JKOGwrKa2Tk3KtJEEHINUZLX7yM160d4f8f'
        //     //         },
        //     //         beforeSend: function () {
        //     //             console.log('sending text.....');
        //     //         },
        //     //         data: JSON.stringify({
        //     //             text: textBox
        //     //         }),
        //     //         success: function (response) {
        //     //             console.log('status: ' + response.status);
        //     //             console.log('message: ' + response.message);
        //     //         }
        //     //     });

        //     // })

        // });

    }, 5000);

    $(window).on('hashchange', function () {
        $('.custom-div').remove();
        $('.aeF').removeClass('disabled-div');
        $('#mainDiv').remove();
        idAnalisa = '';
    });

});