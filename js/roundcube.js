console.log('ROUNDCUBE DETECTED');
setTimeout(() => {
    class contentScript {
        // ATTRIBUTE
        idAnalisa = '';
        OpenAIKey = '{YOUR_OPENAI_KEY}';

        // GET USER ID
        getIdUser() {
            var id_user = $('#shieldedUserId').val();
            return id_user;
        }

        // TO GENERATE ID ANALISA // NOT FOR USAGE
        generateIDAnalisa() {
            var randomString = Math.random().toString(36).substring(2, 10);
            var now = new Date();
            var dateTimeString = now.toISOString();
            return randomString + dateTimeString;
        }

        // TO CHECK IF USER ALREADY MADE ID ANALISA, IF NOT CREATE ONE AND STORE // NOT FOR USAGE
        idAnalisaCheck() {
            if (!this.idAnalisa) {
                this.idAnalisa = this.generateIDAnalisa();
                $('#sectionIdAnalisa').html(this.idAnalisa);

                var iframeContent = $('#messagecontframe').contents();
                var title = iframeContent.find('.subject').text().replace(/\s+/g, ' ').replace('Subject: ', '').replace(' Open in new window', '');
                // console.log(title);
                var from = iframeContent.find('.header-headers').find('.from').text();
                var to = iframeContent.find('.header-headers').find('.to').text();
                var normalizedFrom = `${from} <${to}>`;

                chrome.storage.local.get(['useExternal']).then((result) => {
                    const useExternal = result.useExternal;
                    const data = {
                        id_user: $('#shieldedUserId').val(),
                        id_analisa: this.idAnalisa,
                        title: title,
                        from: normalizedFrom
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

        // TO GET EMAIL SENDER // NOT FOR USAGE
        getEmailSender() {
            $('.ajy').click();
            $('.ajy').click();
            let signedByRow = $('.ajC .ajv').filter(function () {
                return $(this).find('.gG .gI').text().trim() === 'mailed-by:';
            });
            if (signedByRow.length) {
                let targetElement = signedByRow.find('.gL .gI');
                if (targetElement.length) {
                    let sender = targetElement.text().trim();
                    return sender;
                } else {
                    console.log('The target element with classes "gL gI" does not exist for sender 1.');
                    return 'Pengirim tidak terdeteksi';
                }
            } else {
                console.log('The target element with classes "gL gI" does not exist for sender 2.');
                return 'Pengirim tidak terdeteksi';
            }

        }

        // INJECT HTML // NOT FOR USAGE
        injectCode(time) {
            setTimeout(() => {
                $('.iframe-wrapper').before(`
                <div class="shielded-container" style="margin-top: 20px; margin-bottom: 20px;" id="mainDiv2">
                    <div class="shielded-row">
                        <div class="col-2" style="flex: 0 0 50%;" align="center">
                            <img src="https://drive.google.com/uc?id=1_yIuJ47qNNh0UPQxRix2nPy1Km8lpsVo" style="height: 80%; width: 60%;">
                            <p style="margin-top: -10px; font-size: 12px;"> ${this.getIdUser()} </p>
                        </div>
                        <div class="col-10" style="flex: 0 0 50%;">
                            <p style="font-weight: bold;"> AI Assistant
                            <section id="textRingkasan" style="flex: 0 0 50%;" class="typing-effect"></section>
                            <button class="shielded-btn shielded-btn-success" id="analisaRingkasanBTN"> Analisa
                                Ringkasan </button>
                            <span class="shielded-spinner-border-sm shielded-text-secondary" style="display: none;"
                                id="spinnerAnalisaRingkasan"></span>
                        </div>
                    </div>
                </div>
                <hr>
                `);
                $('body').before(`
                <div class="shielded-container" id="mainDiv">
                    <div id="floatingContainer" class="floating-container shielded-card shielded-shadow">
                        <div class="shielded-card-body">
                            <div class="container" style="color: black; background-color: white; padding: 5px;">
                                <div class="col" style="flex: 0 0 55%; margin-left: 10px;">
                                    <p id="sectionIdAnalisa" style="margin-top: -10px; font-size: 12px;" align="center"></p>
                                    <ul>
                                        <li style="font-weight: bold;"> URL DETEKSI </li>
                                        <section id="textURL"></section>
                                        <button class="shielded-btn shielded-btn-success" id="analisaURLBTN"> Analisa URL
                                        </button>
                                        <span class="shielded-spinner-border-sm shielded-text-secondary" style="display: none;"
                                            id="spinnerAnalisaURL"></span>
                                        <li style="font-weight: bold; margin-top: 10px;"> FILE DETEKSI </li>
                                        <section id="textFile"></section>
                                        <button class="shielded-btn shielded-btn-success" id="analisaFileBTN"> Analisa File
                                        </button>
                                        <span class="shielded-spinner-border-sm shielded-text-secondary" style="display: none;"
                                            id="spinnerAnalisaFile"></span>
                                        <section id="sectionAnalisaFile"> </section>
                                        <li style="font-weight: bold; margin-top: 10px;"> DOMAIN </li>
                                        <section id="textDomain"></section>
                                        <button class="shielded-btn shielded-btn-success" id="analisaDomainBTN"> Analisa
                                            Domain </button>
                                        <span class="shielded-spinner-border-sm shielded-text-secondary" style="display: none;"
                                            id="spinnerAnalisaDomain"></span>
                                        <section id="sectionAnalisaDomain"> </section>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>    
                `)
            }, time)
            this.initiateAutoAnalyze();
        }

        // INITIATE AUTO ANALYZE // NOT FOR USAGE
        initiateAutoAnalyze() {
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

        // ANALISA TEXT // NOT FOR USAGE
        analisaText() {
            const thisClass = this;
            // var textBox = $('.rcmBody div').text().replace(/\s+/g, ' ');
            var iframeContent = $('#messagecontframe').contents();
            var textBox = iframeContent.find('#messagebody').text().replace(/\s+/g, ' ');
            // console.log(textBox);
            chrome.storage.local.get(['useExternal']).then((result) => {
                const useExternal = result.useExternal;
                $.ajax({
                    url: useExternal == 1 ? 'https://chrome.server.resaka.my.id/api/v1/translate' : 'http://127.0.0.1:8000/api/v1/translate',
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 1|zaQoCF4MGINb2JKOGwrKa2Tk3KtJEEHINUZLX7yM160d4f8f'
                    },
                    beforeSend: function () {
                        $('#spinnerAnalisaRingkasan').show();
                    },
                    data: JSON.stringify({ text: textBox }),
                    success: function (response) {
                        const textTranslated = response.textTranslated;
                        var data = {
                            model: 'ft:gpt-3.5-turbo-0125:indonesia-computer-university:analyzephising:9gTMFjDF',
                            messages: [{
                                "role": "system",
                                "content": "Shielded is an app for analyzing which email body is indicated as phising or not, user will sent text content of body email in English that you will be analyze and you have to decided this email is phising or not by answer in Indonesian"
                            },
                            {
                                "role": "user",
                                "content": textTranslated
                            }
                            ],
                            max_tokens: 256
                        }

                        thisClass.idAnalisaCheck();
                        $.ajax({
                            url: 'https://api.openai.com/v1/chat/completions',
                            type: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + thisClass.OpenAIKey
                            },
                            data: JSON.stringify(data),
                            success: function (response) {
                                console.log(response['choices'][0]['message']['content']);

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

                                var data1 = {
                                    id_email: thisClass.idAnalisa,
                                    original: textBox,
                                    assistant: text,
                                    id_user: thisClass.getIdUser()

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

                            },
                            error: function (xhr, status, error) {
                                console.error('Error:', error);
                            },
                            complete: function () {
                                $('#spinnerAnalisaRingkasan').hide();
                            }
                        });
                    }
                });
            })
        }

        // ANALISA DOMAIN // NOT FOR USAGE
        analisaDomain() {
            const thisClass = this;

            var iframeContent = $('#messagecontframe').contents();
            var q = iframeContent.find('.header-headers .from a:first').attr('href');
            var domain = q.substring(q.indexOf('@') + 1);

            chrome.storage.local.get(['useExternal']).then((result) => {
                const useExternal = result.useExternal;
                this.idAnalisaCheck();
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
                        id_analisa: thisClass.idAnalisa
                    }),
                    success: function (response) {
                        console.log(response);
                        const openphish = response.OpenPhish.category;
                        if (openphish == 'harmless') {
                            $('#sectionAnalisaDomain').html('<ul style="cursor: default;"> ' + domain + ' <span style="margin-left: 5px; color: green;"> Resiko Rendah ✅ </span> <span style="margin-left: 5px; font-weight: bold;"> Analyze by VirusTotal </span> </ul>');
                        } else if (openphish == 'undetected') {
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
        }

        // ANALISA URL // NOT FOR USAGE
        analisaURL() {
            var iframeContent = $('#messagecontframe').contents();
            var body = iframeContent.find('#messagebody a');
            var hrefs = [];
            body.each(function (index) {
                var href = $(this).attr('href');
                $(this).attr('data-shielded', 'shielded_link' + (index + 1));
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

            if (hrefs.length == 0) {
                $('#textURL').append('<ul style="margin-top: 10px;"> Tidak ada link. </ul>');
            } else {
                hrefs.forEach((href, index) => {
                    this.idAnalisaCheck();
                    chrome.storage.local.get(['useExternal']).then((result) => {
                        const useExternal = result.useExternal;
                        console.log(this.getIdUser());
                        console.log(this.idAnalisa);
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
                                    id_user: this.getIdUser(),
                                    id_analisa: this.idAnalisa,
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
                                        iframeContent.find('#messagebody a[data-shielded="shielded_link' + index + '"]').attr('data-lowrisk', 'true');
                                    } else if (weightedAverageScore >= 1.5 && weightedAverageScore <= 2) {
                                        $('#clickableURL[data-shielded="' + index + '"]').after(' <span style="margin-left: 5px; color: orange;"> Resiko Sedang ⚠️ </span> <span style="margin-left: 5px; font-weight: bold;"> Analyze by VirusTotal </span> </ul>');
                                        iframeContent.find('#messagebody a[data-shielded="shielded_link' + index + '"]').attr('data-mediumrisk', 'true');
                                        iframeContent.find('#messagebody a[data-shielded="shielded_link' + index + '"]').attr('data-harmless', response.data.harmless);
                                        iframeContent.find('#messagebody a[data-shielded="shielded_link' + index + '"]').attr('data-malicious', response.data.malicious);
                                        iframeContent.find('#messagebody a[data-shielded="shielded_link' + index + '"]').attr('data-suspicious', response.data.suspicious);
                                        iframeContent.find('#messagebody a[data-shielded="shielded_link' + index + '"]').attr('data-undetected', response.data.undetected);
                                    } else {
                                        $('#clickableURL[data-shielded="' + index + '"]').after(' <span style="margin-left: 5px; color: red;"> RESIKO TINGGI ⛔ </span> <span style="margin-left: 5px; font-weight: bold;"> Analyze by VirusTotal </span> </ul>');
                                        iframeContent.find('#messagebody a[data-shielded="shielded_link' + index + '"]').attr('data-highrisk', 'true');
                                        iframeContent.find('#messagebody a[data-shielded="shielded_link' + index + '"]').attr('data-harmless', response.data.harmless);
                                        iframeContent.find('#messagebody a[data-shielded="shielded_link' + index + '"]').attr('data-malicious', response.data.malicious);
                                        iframeContent.find('#messagebody a[data-shielded="shielded_link' + index + '"]').attr('data-suspicious', response.data.suspicious);
                                        iframeContent.find('#messagebody a[data-shielded="shielded_link' + index + '"]').attr('data-undetected', response.data.undetected);
                                    }
                                    $('#clickableURL[data-shielded="' + index + '"]').css('cursor', 'pointer');
                                    $('#clickableURL[data-shielded="' + index + '"]').css('color', 'blue');
                                    $('#clickableURL[data-shielded="' + index + '"]').css('text-decoration', 'underline');
                                    console.log('success' + index);
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    $('#clickableURL[data-shielded="' + (index + 1) + '"]').after(' || Redirect tidak terdeteksi 👍');
                                    $('#clickableURL[data-shielded="' + (index + 1) + '"]').css('cursor', 'pointer');
                                    $('#clickableURL[data-shielded="' + (index + 1) + '"]').css('color', 'blue');
                                    $('#clickableURL[data-shielded="' + (index + 1) + '"]').css('text-decoration', 'underline');
                                },
                                complete: function (response) {
                                    $('#spinnerAnalisaURL' + (index + 1) + '').hide();
                                }
                            });
                        }, 4000)
                    });
                });
            }

            $(document).on('click', '#clickableURL', function () {
                const index = $(this).data('shielded');
                const target = iframeContent.find('#messagebody a[data-shielded="shielded_link' + index + '"]');
                $('.shielded-highlight').removeClass('shielded-highlight');
                target.addClass('shielded-highlight');
                target[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            });

            $('body').on('click', function () {
                $('.shielded-highlight').removeClass('shielded-highlight');
                iframeContent.find('.shielded-highlight').removeClass('shielded-highlight');
            })
        }

        // ANALISA FILE // NOT FOR USAGE
        analisaFile() {
            const thisClass = this;

            var iframeContent = $('#messagecontframe').contents();

            var datas = [];
            iframeContent.find('#attachment-list .filename').each(function (index) {
                var url = $(this).attr('href');
                var realUrl = window.location.origin + url + '&_download=1';
                var name = $(this).find('.attachment-name').text();
                datas.push({
                    url: realUrl,
                    name: name,
                    index: (index + 1)
                });
            });

            iframeContent.find('#attachment-list .filename').each(function (index) {
                $(this).attr('data-shielded', 'shielded_file' + (index + 1));
            });

            console.log(datas);
            if (datas.length == 0) {
                console.log('No file attachment');
                $('#sectionAnalisaFile').html('<ul style="margin-top: 10px;"> No file attachment. </ul>')
            } else {
                thisClass.idAnalisaCheck();
                datas.forEach(function (data, index) {
                    if (data['name'].length > 30) {
                        $('#sectionAnalisaFile').append('<ul style="margin-top: 10px;"> <span id="clickableFile" data-shieldedFile="' + (index + 1) + '"> ' + data['name'].substring(0, 30) + '... </span> <span id="domElementFile' + (index + 1) + '"> <span class="shielded-spinner-border-sm shielded-text-secondary" style="margin-left: 5px;" id="spinnerAnalisaFile' + (index + 1) + '"></span> <span id="statusFile' + (index + 1) + '"></span> </span> <br> </ul>');
                    } else {
                        $('#sectionAnalisaFile').append('<ul style="margin-top: 10px;"> <span id="clickableFile" data-shieldedFile="' + (index + 1) + '"> ' + data['name'] + ' </span> <span id="domElementFile' + (index + 1) + '"> <span class="shielded-spinner-border-sm shielded-text-secondary" style="margin-left: 5px;" id="spinnerAnalisaFile' + (index + 1) + '"></span> <span id="statusFile' + (index + 1) + '"></span> </span> <br> </ul>');
                    }
                });

                chrome.storage.local.get(['useExternal']).then(function (result) {
                    const useExternal = result.useExternal;

                    function fetchFileAndConvertToBase64(url, index) {
                        return fetch(url)
                            .then(response => response.blob())
                            .then(blob => new Promise((resolve, reject) => {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    const base64data = reader.result.split(',')[1];
                                    resolve({ finalUrl: url, base64data: base64data, index: index });
                                };
                                reader.onerror = reject;
                                reader.readAsDataURL(blob);
                            }))
                            .catch(error => {
                                console.error('Error:', error);
                                return { error: error.message };
                            });
                    }

                    datas.forEach(function (data, index) {
                        fetchFileAndConvertToBase64(data['url'], (index + 1)).then(result => {
                            if (result.error) {
                                console.error('Error:', result.error);
                            } else {
                                console.log('Final URL:', result.finalUrl);
                                console.log('Index:', result.index);
                                console.log('Base64 Data:', result.base64data);

                                const payload = {
                                    id_user: thisClass.getIdUser(),
                                    id_analisa: thisClass.idAnalisa,
                                    base64: result.base64data,
                                    index: result.index,
                                    name: data['name']
                                };

                                $.ajax({
                                    url: useExternal == 1 ? 'https://chrome.server.resaka.my.id/api/v1/store-analisa-file' : 'http://127.0.0.1:8000/api/v1/store-analisa-file',
                                    type: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer 1|zaQoCF4MGINb2JKOGwrKa2Tk3KtJEEHINUZLX7yM160d4f8f'
                                    },
                                    data: JSON.stringify(payload),
                                    success: function (response) {
                                        console.log('WAITING ' + response.index);
                                        $('#statusFile' + response.index).html(' Waiting');
                                        let second = 0;
                                        var interval = setInterval(() => {
                                            $.ajax({
                                                url: useExternal == 1 ? 'https://chrome.server.resaka.my.id/api/v1/analisa-file-queue-check' : 'http://127.0.0.1:8000/api/v1/analisa-file-queue-check',
                                                type: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': 'Bearer 1|zaQoCF4MGINb2JKOGwrKa2Tk3KtJEEHINUZLX7yM160d4f8f'
                                                },
                                                data: JSON.stringify({
                                                    selfLink: response.selfLink,
                                                    index: response.index,
                                                    query_id: response.query_id,
                                                    id_user: thisClass.getIdUser()
                                                }),
                                                success: function (response) {
                                                    var status = response['data']['data']['attributes']['status'];
                                                    var index = response.index;
                                                    if (status == 'completed') {
                                                        clearInterval(interval);
                                                        $('#spinnerAnalisaFile' + index).hide();
                                                        console.log(index + 'completed');
                                                        console.log(response['data']);
                                                        $('#statusFile' + index).html(' Completed');
                                                        var malicious = response['data']['data']['attributes']['stats']['malicious'];
                                                        var suspicious = response['data']['data']['attributes']['stats']['suspicious'];
                                                        var total = (malicious + suspicious);
                                                        console.log('Total ' + index + ': ' + total);
                                                        if (total == 0) {
                                                            $('#statusFile' + index).html(' <span style="margin-left: 5px; color: green;"> Resiko Rendah ✅ </span> <span style="margin-left: 5px; font-weight: bold;"> Analyze by VirusTotal </span> ');
                                                        } else if (total == 1) {
                                                            $('#statusFile' + index).html(' <span style="margin-left: 5px; color: orange;"> Resiko Sedang ⚠️ </span> <span style="margin-left: 5px; font-weight: bold;"> Analyze by VirusTotal </span> ');
                                                            iframeContent.find('#attachment-list .filename[data-shielded="shielded_file' + index + '"]').attr('data-mediumrisk-analyze', 'true');
                                                            iframeContent.find('#attachment-list .filename[data-shielded="shielded_file' + index + '"]').attr('data-suspicious', suspicious);
                                                            iframeContent.find('#attachment-list .filename[data-shielded="shielded_file' + index + '"]').attr('data-malicious', malicious);
                                                        } else {
                                                            $('#statusFile' + index).html(' <span style="margin-left: 5px; color: red;"> RESIKO TINGGI ⛔ </span> <span style="margin-left: 5px; font-weight: bold;"> Analyze by VirusTotal </span> ');
                                                            iframeContent.find('#attachment-list .filename[data-shielded="shielded_file' + index + '"]').attr('data-highrisk-analyze', 'true');
                                                            iframeContent.find('#attachment-list .filename[data-shielded="shielded_file' + index + '"]').attr('data-suspicious', suspicious);
                                                            iframeContent.find('#attachment-list .filename[data-shielded="shielded_file' + index + '"]').attr('data-malicious', malicious);
                                                        }
                                                        $('#clickableFile[data-shieldedFile="' + index + '"]').css('cursor', 'pointer');
                                                        $('#clickableFile[data-shieldedFile="' + index + '"]').css('color', 'blue');
                                                        $('#clickableFile[data-shieldedFile="' + index + '"]').css('text-decoration', 'underline');
                                                    } else {
                                                        $('#statusFile' + index).html(' Scanning ' + second);
                                                        second += 10;
                                                    }
                                                    console.log(status + index);
                                                }
                                            })
                                        }, 10000)
                                    },
                                    error: function (jqXHR, textStatus, errorThrown) {
                                        console.error('Error:', textStatus, errorThrown);
                                        $('#statusFile' + (index + 1)).html(' || ' + errorThrown);
                                    },
                                    complete: function () {
                                        console.log('Done');
                                    }
                                });

                                $(document).on('click', '#clickableFile', function () {
                                    const index = $(this).data('shieldedfile');
                                    const target = iframeContent.find('#attachment-list .filename[data-shielded="shielded_file' + index + '"]');
                                    $('.shielded-highlight').removeClass('shielded-highlight');
                                    iframeContent.find('.shielded-highlight').removeClass('shielded-highlight');
                                    target.addClass('shielded-highlight');
                                    target[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                                });

                                $('body').on('click', function () {
                                    $('.shielded-highlight').removeClass('shielded-highlight');
                                    iframeContent.find('.shielded-highlight').removeClass('shielded-highlight');
                                });
                            }
                        });
                    });
                });
            }

        }

        //urlClickPrevention
        urlClickPrevention() {
            $('#messagecontframe').on('load', function () {

                var iframeContent = $(this).contents();
                iframeContent.find('#messagebody a').on('click', function (e) {
                    console.log(`clicked`);
                    e.preventDefault();
                    var check = $(this).data('shielded');
                    var modalCheck = $('#myModal').html();
                    if (!modalCheck) {
                        $('body').before('<div id="myModal" class="modal">\
                <div class="modal-content">\
                    <span class="close">&times;</span>\
                    <div class="modal-body">\
                        <span id="modalContent"></span> \
                    </div>\
                    <div class="modal-footer">\
                        <span id="modalFooter"></span>\
                    </div>\
                </div>\
              </div>');
                    }
                    var y = $(this).attr('href');
                    if (!check) {
                        e.preventDefault();
                        console.log('not analyze yet');
                        chrome.storage.local.get(['useExternal']).then(function (result) {
                            const useExternal = result.useExternal;
                            $.ajax({
                                url: useExternal == 1 ? 'https://chrome.server.resaka.my.id/api/v1/get-final-url' : 'http://127.0.0.1:8000/api/v1/get-final-url',
                                type: 'POST',
                                headers: {
                                    'Content-type': 'application/json',
                                    'Authorization': 'Bearer 1|zaQoCF4MGINb2JKOGwrKa2Tk3KtJEEHINUZLX7yM160d4f8f'
                                },
                                beforeSend: function () {
                                    $('#modalContent').html('<div class="shielded-container" style="margin-top: 10px; margin-bottom: 10px;"> \
                            <div class="shielded-row"> \
                                <div class="shielded-col" align="center"> \
                                    <b style="font-size: 30px;"> REDIRECT </b> <br>\
                                    <span class="shielded-spinner-border-sm shielded-text-secondary" style="display: none;" id="spinnerRedirect"></span> \
                                    <span id="finalURL"></span> \
                                </div>\
                            </div>\
                            <div class="shielded-row"> \
                                <div class="shielded-col-6" align="center"> \
                                    <img src="https://drive.google.com/uc?id=19M7nt1TW7NqDhv015Fk9nUOEM3LRu0WC" style="height: 70%; width: 70%;"> \
                                </div>\
                                <div class="shielded-col-6" style="margin-top: 50px;" align="center"> \
                                    <p> Kamu belum melakukan analisa! </p>\
                                </div>\
                            </div>\
                            <div class="shielded-row" style="margin-top: -70px;"> \
                                <div class="shielded-col" align="center"> \
                                    <b style="font-size: 30px;"> Shielded menyarankan lakukan analisa </b>\
                                </div>\
                            </div>\
                            </div>');

                                    $('#modalFooter').html('<div class="shielded-container"> \
                            <div class="shielded-row"> \
                                <div class="shielded-col-6"> \
                                    <img src="https://drive.google.com/uc?id=1_yIuJ47qNNh0UPQxRix2nPy1Km8lpsVo" style="height: 70%; width: 60%;"> \
                                </div>\
                                <div class="shielded-col-6" style="display: flex; justify-content: center; align-items: center;"> \
                                    <a id="continueRedirecting" href="." target="blank"> Tetap lanjutkan </a>\
                                    <button class="shielded-btn shielded-btn-primary close" style="color: white; margin-left: 20px; font-size: 20px;"> Kembali </button>\
                                </div>\
                            </div>\
                            </div>');
                                    $('#spinnerRedirect').show();
                                    $('#continueRedirecting').attr('href', y);
                                },
                                data: JSON.stringify({
                                    url: y
                                }),
                                success: function (response) {
                                    var link = String(response);
                                    if (link.length > 40) {
                                        $('#finalURL').html('<p style="text-decoration: underline; cursor: default;">' + link.substring(0, 40) + '...</p>');
                                    } else {
                                        $('#finalURL').html('<p style="text-decoration: underline; cursor: default;">' + link + '</p>');
                                    }
                                },
                                error: function (errorThrown) {
                                    $('#finalURL').html(errorThrown)
                                },
                                complete: function () {
                                    $('#spinnerRedirect').hide();
                                }
                            })
                        });
                    }
                    if (check) {
                        var checkLow = $(this).data('lowrisk');
                        var medium = $(this).data('mediumrisk');
                        var message;
                        if (medium === true) {
                            message = "Resiko Sedang ⚠️";
                        } else {
                            message = "RESIKO TINGGI ⛔";
                        }
                        console.log(medium);
                        if (!checkLow) {
                            e.preventDefault();
                            chrome.storage.local.get(['useExternal']).then(function (result) {
                                const useExternal = result.useExternal;
                                $.ajax({
                                    url: useExternal == 1 ? 'https://chrome.server.resaka.my.id/api/v1/get-final-url' : 'http://127.0.0.1:8000/api/v1/get-final-url',
                                    type: 'POST',
                                    headers: {
                                        'Content-type': 'application/json',
                                        'Authorization': 'Bearer 1|zaQoCF4MGINb2JKOGwrKa2Tk3KtJEEHINUZLX7yM160d4f8f'
                                    },
                                    beforeSend: function () {
                                        console.log(message);
                                        $('#modalContent').html('<div class="shielded-container" style="margin-top: 10px; margin-bottom: 10px;"> \
                            <div class="shielded-row"> \
                                <div class="shielded-col" align="center"> \
                                    <b style="font-size: 30px;"> REDIRECT </b> <br>\
                                    <span class="shielded-spinner-border-sm shielded-text-secondary" style="display: none;" id="spinnerRedirect"></span> \
                                    <span id="finalURL"></span> \
                                </div>\
                            </div>\
                            <div class="shielded-row"> \
                                <div class="shielded-col-6" align="center"> \
                                    <img src="https://drive.google.com/uc?id=19M7nt1TW7NqDhv015Fk9nUOEM3LRu0WC" style="height: 70%; width: 70%;"> \
                                </div>\
                                <div class="shielded-col-6" style="margin-top: 50px;" align="center"> \
                                    '+ message + '\
                                </div>\
                            </div>\
                            <div class="shielded-row" style="margin-top: -70px;"> \
                                <div class="shielded-col" align="center"> \
                                    <b style="font-size: 30px;"> Shielded menyarankan lakukan analisa </b>\
                                </div>\
                            </div>\
                            </div>');

                                        $('#modalFooter').html('<div class="shielded-container"> \
                            <div class="shielded-row"> \
                                <div class="shielded-col-6"> \
                                    <img src="https://drive.google.com/uc?id=1_yIuJ47qNNh0UPQxRix2nPy1Km8lpsVo" style="height: 70%; width: 60%;"> \
                                </div>\
                                <div class="shielded-col-6" style="display: flex; justify-content: center; align-items: center;"> \
                                    <a id="continueRedirecting" href="." target="blank"> Tetap lanjutkan </a>\
                                    <button class="shielded-btn shielded-btn-primary close" style="color: white; margin-left: 20px; font-size: 20px;"> Kembali </button>\
                                </div>\
                            </div>\
                            </div>');
                                        $('#spinnerRedirect').show();
                                        $('#continueRedirecting').attr('href', y);
                                    },
                                    data: JSON.stringify({
                                        url: y
                                    }),
                                    success: function (response) {
                                        var link = String(response);
                                        if (link.length > 40) {
                                            $('#finalURL').html('<p style="text-decoration: underline; cursor: default;">' + link.substring(0, 40) + '...</p>');
                                        } else {
                                            $('#finalURL').html('<p style="text-decoration: underline; cursor: default;">' + link + '</p>');
                                        }
                                    },
                                    error: function (errorThrown) {
                                        $('#finalURL').html(response)
                                    },
                                    complete: function () {
                                        $('#spinnerRedirect').hide();
                                    }
                                })
                            });
                        } else {
                            $('<a>').attr('href', y).attr('target', '_blank')[0].click();
                            setTimeout(() => {
                                document.getElementById("myModal").style.display = "none";
                            }, 100)
                        }
                    }
                    var modal = document.getElementById("myModal");
                    modal.style.display = "block";
                    window.onclick = function (event) {
                        if (event.target == modal) {
                            modal.style.display = "none";
                            $('#myModal').remove();
                        }
                    }
                    $(document).on('click', '.close', function () {
                        modal.style.display = "none";
                        $('#myModal').remove();
                    })
                    $(document).on('click', '#continueRedirecting', function () {
                        modal.style.display = "none";
                        $('#myModal').remove();
                    })
                })

            })
        }

        //fileClickPrevention
        fileClickPrevention() {

            $('#messagecontframe').on('load', function () {

                var iframeContent = $(this).contents();

                iframeContent.find('.attachment-name').on('click', function (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();

                    var modalCheck = $('#myModalFile').html();
                    if (!modalCheck) {
                        $('body').before('<div id="myModalFile" class="modal">\
                        <div class="modal-content">\
                            <span class="close">&times;</span>\
                            <div class="modal-body">\
                                <span id="modalContentFile"></span> \
                            </div>\
                            <div class="modal-footer">\
                                <span id="modalFooterFile"></span>\
                            </div>\
                        </div>\
                      </div>');
                    }

                    var element = $(this).closest('a');
                    var url = element.attr('href');
                    var updatedText = $(this).text();

                    var check = element.data('shielded');
                    if (!check) {
                        $('#modalContentFile').html('<div class="shielded-container" style="margin-top: 10px; margin-bottom: 10px;"> \
                            <div class="shielded-row"> \
                                <div class="shielded-col" align="center"> \
                                    <b style="font-size: 30px;"> DOWNLOAD </b> <br>\
                                    <span id="finalURLFile"></span> \
                                </div>\
                            </div>\
                            <div class="shielded-row"> \
                                <div class="shielded-col-6" align="center"> \
                                    <img src="https://drive.google.com/uc?id=19M7nt1TW7NqDhv015Fk9nUOEM3LRu0WC" style="height: 70%; width: 70%;"> \
                                </div>\
                                <div class="shielded-col-6" style="margin-top: 50px;" align="center"> \
                                    <p> Kamu belum melakukan analisa! </p>\
                                </div>\
                            </div>\
                            <div class="shielded-row" style="margin-top: -70px;"> \
                                <div class="shielded-col" align="center"> \
                                    <b style="font-size: 30px;"> Shielded menyarankan lakukan analisa </b>\
                                </div>\
                            </div>\
                            </div>');

                        $('#modalFooterFile').html('<div class="shielded-container"> \
                            <div class="shielded-row"> \
                                <div class="shielded-col-6"> \
                                    <img src="https://drive.google.com/uc?id=1_yIuJ47qNNh0UPQxRix2nPy1Km8lpsVo" style="height: 70%; width: 60%;"> \
                                </div>\
                                <div class="shielded-col-6" style="display: flex; justify-content: center; align-items: center;"> \
                                    <a id="continueRedirecting" href="." target="blank"> Matikan peringatan </a>\
                                    <button class="shielded-btn shielded-btn-primary close" style="color: white; margin-left: 20px; font-size: 20px;"> Kembali </button>\
                                </div>\
                            </div>\
                            </div>');
                        $('#finalURLFile').html(updatedText)
                        var modal = document.getElementById("myModalFile");
                        modal.style.display = "block";
                        $(document).on('click', '.close', function () {
                            modal.style.display = "none";
                            $('#myModalFile').remove();
                        })

                        setTimeout(() => {
                            $('#continueRedirecting').on('click', function (e) {
                                e.preventDefault();
                                element.attr('data-shielded', 'bypass');
                                modal.style.display = "none";
                                $('#myModalFile').remove();
                            })
                        }, 500)
                    } else {
                        var go = window.location.origin + url + '&_download=1';
                        // $('body').before(`<a id="tempDownload" target="blank" href="${go}">`);
                        // setTimeout(() => {
                        //     $('#tempDownload').click();
                        //     $('#tempDownload').remove();
                        // }, 1000)
                        window.location = go;
                    }

                });
            });

            // $('#messsagecontframe').on('load', function () {
            //     var i = 0;
            //     var iframeContent = $(this).contents();

            //     iframeContent.find('#attachment-list .filename').on('click', function (e) {

            //         e.preventDefault();
            //         ++i;
            //         console.log(`clicked i: ${i}`);
            //         const theButton = $(this);

            //         var modalCheck = $('#myModalFile').html();
            //         if (!modalCheck) {
            //             $('body').before('<div id="myModalFile" class="modal">\
            //         <div class="modal-content">\
            //             <span class="close">&times;</span>\
            //             <div class="modal-body">\
            //                 <span id="modalContentFile"></span> \
            //             </div>\
            //             <div class="modal-footer">\
            //                 <span id="modalFooterFile"></span>\
            //             </div>\
            //         </div>\
            //       </div>');
            //         }

            //         var preview = $(this).closest('.aZo').find('.e').find('span:first').text();
            //         var updatedText = preview.replace("Preview attachment ", "");

            //         var test = $(this).closest('.aZo').data('shielded');
            //         if (!test) {
            //             chrome.runtime.sendMessage({ action: "blockDownloads", permission: "block" });
            //             console.log(`shielded not detected`);

            //             $('#modalContentFile').html('<div class="shielded-container" style="margin-top: 10px; margin-bottom: 10px;"> \
            //             <div class="shielded-row"> \
            //                 <div class="shielded-col" align="center"> \
            //                     <b style="font-size: 30px;"> DOWNLOAD </b> <br>\
            //                     <span id="finalURLFile"></span> \
            //                 </div>\
            //             </div>\
            //             <div class="shielded-row"> \
            //                 <div class="shielded-col-6" align="center"> \
            //                     <img src="https://drive.google.com/uc?id=19M7nt1TW7NqDhv015Fk9nUOEM3LRu0WC" style="height: 70%; width: 70%;"> \
            //                 </div>\
            //                 <div class="shielded-col-6" style="margin-top: 50px;" align="center"> \
            //                     <p> Kamu belum melakukan analisa! </p>\
            //                 </div>\
            //             </div>\
            //             <div class="shielded-row" style="margin-top: -70px;"> \
            //                 <div class="shielded-col" align="center"> \
            //                     <b style="font-size: 30px;"> Shielded menyarankan lakukan analisa </b>\
            //                 </div>\
            //             </div>\
            //             </div>');

            //             $('#modalFooterFile').html('<div class="shielded-container"> \
            //             <div class="shielded-row"> \
            //                 <div class="shielded-col-6"> \
            //                     <img src="https://drive.google.com/uc?id=1_yIuJ47qNNh0UPQxRix2nPy1Km8lpsVo" style="height: 70%; width: 60%;"> \
            //                 </div>\
            //                 <div class="shielded-col-6" style="display: flex; justify-content: center; align-items: center;"> \
            //                     <a id="continueRedirecting" href="." target="blank"> Matikan peringatan </a>\
            //                     <button class="shielded-btn shielded-btn-primary close" style="color: white; margin-left: 20px; font-size: 20px;"> Kembali </button>\
            //                 </div>\
            //             </div>\
            //             </div>');
            //             $('#finalURLFile').html(updatedText)
            //             var modal = document.getElementById("myModalFile");
            //             modal.style.display = "block";
            //             $(document).on('click', '.close', function () {
            //                 modal.style.display = "none";
            //                 $('#myModalFile').remove();
            //             })

            //             setTimeout(() => {
            //                 $('#continueRedirecting').on('click', function (e) {
            //                     e.preventDefault();
            //                     theButton.closest('.aZo').attr('data-shielded', 'bypass');
            //                     modal.style.display = "none";
            //                     $('#myModalFile').remove();
            //                 })
            //             }, 500)

            //         } else {
            //             chrome.runtime.sendMessage({ action: "blockDownloads", permission: "allow" });
            //             console.log(`detected: ${test}`);
            //         }

            //     });
            // })
        }
    }

    // INITIATE USAGE
    const run = new contentScript();
    run.urlClickPrevention();
    run.fileClickPrevention();


    // setGetUserId
    chrome.storage.local.get(['userId']).then((result) => {
        $('body').before('<input type="hidden" value="' + result.userId + '" id="shieldedUserId">');
    })

    //OnHashChange // DIFF
    $('#mailboxlist').on('click', function () {
        $('.custom-div').remove();
        $('.aeF').removeClass('disabled-div');
        $('#mainDiv').remove();
        $('#mainDiv2').remove();
        $('#toggleButton').remove();
        run.idAnalisa = '';
        run.urlClickPrevention();
        run.fileClickPrevention();
        console.log(`clicked`);
    })
    $('.fromto').on('click', function () {
        $('.custom-div').remove();
        $('.aeF').removeClass('disabled-div');
        $('#mainDiv').remove();
        $('#mainDiv2').remove();
        $('#toggleButton').remove();
        run.idAnalisa = '';
        run.urlClickPrevention();
        run.fileClickPrevention();
    })

    // navigationStatus
    chrome.storage.local.get(['ExtStat']).then((result) => {
        const ExtStat = result.ExtStat;
        if (ExtStat == 1) {
            $('#toolbar-menu').before(`
            <img id="navStatImg" style="height: 100%; width: 10%;" src="https://drive.google.com/uc?id=1uEuXz6W2-pgGrORfYbVpYTtJXNcjh5fd" />
            `);
        } else {
            $('#toolbar-menu').before('<img style="height: 100%; width: 10%;" src="https://drive.google.com/uc?id=17h2JU2sMWc3WS0yiMp96gPaxUvP55XnF">')
        }
    });

    // detectUserAccessing
    chrome.storage.local.get(['ExtStat']).then((result) => {
        const ExtStat = result.ExtStat;
        if (ExtStat == 1) {
            function checkDOM() {
                var intervalId = setInterval(() => {
                    var dom = $('#messagebody').html();
                    if (dom) {
                        run.injectCode(0);
                        clearInterval(intervalId);
                        $('#navStatImg').after(`
                        <p id="toggleButton" style="cursor: pointer;"> 🔽 </p> 
                        `);
                    }
                }, 1000);
            }
            checkDOM();
            $(document).on('click', '.message', function () {
                var intervalThis = setInterval(() => {
                    var dom = $('#mainDiv').html();
                    if (dom) {
                        clearInterval(intervalThis);
                    } else {
                        run.injectCode(0);
                        $('#navStatImg').after(`
                            <p id="toggleButton" style="cursor: pointer;"> 🔽 </p> 
                        `);
                    }
                }, 1000)
            });
            $(document).on('click', 'tr [role="option"]', function () {
                console.log('CLICKED...');
            });
        }
    });

    //clickEventAnalisaText
    $(document).on('click', '#analisaRingkasanBTN', function (e) {
        e.preventDefault();
        $(this).remove();
        run.analisaText();
    })

    //clickEventAnalisaDomain
    $(document).on('click', '#analisaDomainBTN', function (e) {
        e.preventDefault();
        $(this).remove();
        run.analisaDomain();
    })

    //clickEventAnalisaURL
    $(document).on('click', '#analisaURLBTN', function (e) {
        e.preventDefault();
        $(this).remove();
        run.analisaURL();
    })

    //clickEventAnalisaFile
    $(document).on('click', '#analisaFileBTN', function (e) {
        e.preventDefault();
        $(this).remove();
        run.analisaFile();
    });

    //floatingController
    $(document).on('click', '#toggleButton', function () {
        var y = $('#floatingContainer').css('display');
        y == 'block' ? $('#floatingContainer').hide() : $('#floatingContainer').show()
    });
    $(document).on('click', function (e) {
        if (!$(e.target).closest('#floatingContainer, #toggleButton, #analisaRingkasanBTN, #analisaURLBTN, #analisaFileBTN, #analisaDomainBTN').length) {
            $('#floatingContainer').hide();
        }
    });

}, 500);

// $(document).ready(function () {
//     setTimeout(() => {
//         console.log($('body').find('#messagebody').html());
//     }, 5000)
// })

// Wait for the iframe content to load
// $('#messagecontframe').on('load', function () {
//     var iframeContent = $('#messagecontframe').contents();
//     var messageBodyText = iframeContent.find('#messagebody').text();
//     console.log(messageBodyText);
// });