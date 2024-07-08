class popup {

    // EXTENSION ON PICTURE // NOT FOR USAGE
    onImage() {
        $('#offImage').hide();
        $('#onImage').show();
    }

    // EXTENSION OFF PICTURE // NOT FOR USAGE
    offImage() {
        $('#onImage').hide();
        $('#offImage').show()
    }

    // TURNING EXTENSION ON // NOT FOR USAGE
    turnOnImage() {
        chrome.storage.local.set({ ExtStat: 1 }).then(function () {
            console.log('ExtStat ON!');
        });
        $('#offImage').hide();
        $('#onImage').show();
    }

    // TURNING EXTENSION OFF // NOT FOR USAGE
    turnOffImage() {
        chrome.storage.local.set({ ExtStat: 0 }).then(function () {
            console.log('ExtStat OFF!');
        });
        $('#onImage').hide();
        $('#offImage').show()
    }

    // READ EXTENSION STATUS
    extensionStatus() {
        const thisClass = this;
        chrome.storage.local.get(['ExtStat']).then(function (result) {
            const ExtStat = result.ExtStat;
            if (ExtStat == 1) {
                thisClass.onImage()
                thisClass.forceOnAuto()
            } else {
                thisClass.offImage()
                thisClass.forceOffAuto()
            }
        })
    }

    // FORCING AUTO ANALYZE TO OFF // NOT FOR USAGE
    forceOffAuto() {
        chrome.storage.local.set({ AutoAnalyze: 0 }).then(function () {
            console.log('AutoAnalyze FORCE OFF!');
        });
        $('#autoAnalyze').prop('checked', false);
        $('#autoAnalyze').prop('disabled', true);
    }

    // FORCING AUTO ANALYZE TO ON // NOT FOR USAGE
    forceOnAuto() {
        chrome.storage.local.set({ AutoAnalyze: 1 }).then(function () {
            console.log('AutoAnalyze FORCE ON!');
        });
        $('#autoAnalyze').prop('checked', true);
        $('#autoAnalyze').prop('disabled', false);
    }

    // CLICK EVENT WHEN EXTENSION ON
    clickEventOn() {
        const thisClass = this;
        $('#onImage').on('click', function (e) {
            e.preventDefault();
            thisClass.turnOffImage();
            thisClass.forceOffAuto();
            thisClass.alert('danger', 'OFF');
        })
    }

    // CLICK EVENT WHEN EXTENSION OFF
    clickEventOff() {
        const thisClass = this;
        $('#offImage').on('click', function (e) {
            e.preventDefault();
            thisClass.turnOnImage();
            thisClass.forceOnAuto();
            thisClass.alert('success', 'ON');
        })
    }

    // TURNING AUTO ANALYZE ON // NOT FOR USAGE
    onAuto() {
        $('#autoAnalyze').prop('checked', true);
    }

    // TURNING AUTO ANALYZE OFF // NOT FOR USAGE
    offAuto() {
        $('#autoAnalyze').prop('checked', false);
    }

    // INITIATE AUTO ANALYZE
    initiateAutoAnalyze() {
        const thisClass = this;
        chrome.storage.local.get(['AutoAnalyze']).then(function (result) {
            const AutoAnalyze = result.AutoAnalyze;
            if (AutoAnalyze == 1) {
                thisClass.onAuto()
            } else {
                thisClass.offAuto()
            }
        })
    }

    // INITIATE ALERT CARD // NOT FOR USAGE
    alert(color, text) {
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

    // CLICK EVENT AUTO ANALYZE
    clickEventAutoAnalyze() {
        const thisClass = this;
        $('#autoAnalyze').on('change', function (e) {
            e.preventDefault();
            if ($(this).prop('checked')) {
                thisClass.onAuto();
                chrome.storage.local.set({ AutoAnalyze: 1 }).then(function () {
                    console.log('AutoAnalyze ON!');
                });
            } else {
                thisClass.offAuto();
                chrome.storage.local.set({ AutoAnalyze: 0 }).then(function () {
                    console.log('AutoAnalyze OFF!');
                });
            }
        })
    }

    // REDIRECT OPTION PAGE
    redirectOptionPage() {
        $('#settingBTN').on('click', function (e) {
            chrome.tabs.create({ url: '../html/options.html' }, function (tab) {
                console.log('Options page opened in a new tab:', tab);
            });
        })
    }

    // INITIATE DEVICE INFORMATION
    initiateDeviceInfo() {
        chrome.storage.local.get(['userId']).then(function (result) {
            $('#userId').html(result.userId);
            $('#device').html(navigator.userAgent)
        });
    }

    // CLICK EVENT CHANGING USER ID
    changeUserId() {
        const thisClass = this;
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

                    chrome.storage.local.get(['useExternal']).then((result) => {
                        const useExternal = result.useExternal;

                        $.ajax({
                            url: useExternal == 1 ? 'https://chrome.server.resaka.my.id/api/v1/change-user' : 'http://127.0.0.1:8000/api/v1/change-user',
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

                                    thisClass.alert('danger', 'Gagal');
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
                                    thisClass.alert('Success', 'Berhasil');
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
                                thisClass.alert('danger', errorThrown);
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

                    });

                }

            })

        });
    }

}

const run = new popup();
run.extensionStatus();
run.clickEventOn();
run.clickEventOff();
run.initiateAutoAnalyze();
run.clickEventAutoAnalyze();
run.redirectOptionPage();
run.initiateDeviceInfo();
run.changeUserId();