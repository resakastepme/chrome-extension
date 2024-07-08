$(document).ready(function () {

    class options {
        setGetUserId() {
            chrome.storage.local.get(['userId']).then((result) => {
                $('body').before('<input type="hidden" value="' + result.userId + '" id="shieldedUserId">');
            })
        }

        // NOT FOR USAGE
        getUserId() {
            setTimeout(() => {
                var idUser = $('#shieldedUserId').val();
                return idUser;
            }, 500)
        }

        tableRiwayat() {
            chrome.storage.local.get(['useExternal', 'userId']).then((result) => {
                const useExternal = result.useExternal;
                const userId = result.userId;
                console.log(userId);
                var num = 0;
                $('#tableRiwayat').DataTable({
                    ajax: {
                        url: useExternal == 1 ? 'https://chrome.server.resaka.my.id/api/v1/get-riwayat' : 'http://127.0.0.1:8000/api/v1/get-riwayat',
                        type: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer 1|zaQoCF4MGINb2JKOGwrKa2Tk3KtJEEHINUZLX7yM160d4f8f'
                        },
                        data: {
                            id_user: userId
                        },
                        dataSrc: function (response) {
                            console.log(response);
                            return response.datas;
                        }
                    },
                    "columns": [
                        {
                            data: null,
                            render: function () {
                                ++num;
                                return num;
                            },
                            title: "No"
                        },
                        {
                            data: null,
                            render: function (item) {
                                return `<a href="." id="clickableJudul" data-idanalisa="${item.id_analisa}"> ${item.title} </a>`;
                            },
                            title: "Judul"
                        },
                        {
                            data: null,
                            render: function (item) {
                                var date = new Date(item.created_at);
                                var year = date.getFullYear();
                                var month = ('0' + (date.getMonth() + 1)).slice(-2);
                                var day = ('0' + date.getDate()).slice(-2);
                                var hours = ('0' + date.getHours()).slice(-2);
                                var minutes = ('0' + date.getMinutes()).slice(-2);
                                var seconds = ('0' + date.getSeconds()).slice(-2);
                                var normalizedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
                                return normalizedDate;
                            },
                            title: "Tanggal"
                        }
                    ]
                });
            });
        }

        refineModal() {
            $('#modalJudul').html(`
                <span class="shielded-spinner-border-sm shielded-text-secondary mt-3" style="display: block;"
                            id="spinnerModalJudul"></span>
                `);
            $('.modalPengirim').html(`
                <span class="shielded-spinner-border-sm shielded-text-secondary mt-3" style="display: block;"
                            id="spinnerModalPengirim"></span>
                `);
            $('#modalRingkasan').html(`
                <span class="shielded-spinner-border-sm shielded-text-secondary mt-3" style="display: block;"
                            id="spinnerModalRingkasan"></span>
                `);
            $('#modalTanggal').html(`
                <span class="shielded-spinner-border-sm shielded-text-secondary mt-3" style="display: block;"
                            id="spinnerModalTanggal"></span>
                `);
            $('#modalDomain').html(`
                <span class="shielded-spinner-border-sm shielded-text-secondary mt-3" style="display: block;"
                            id="spinnerModalDomain"></span>
                `);
            $('#modalUrl').html(`
                <span class="shielded-spinner-border-sm shielded-text-secondary mt-3" style="display: block;"
                            id="spinnerModalUrl"></span>
                `);
            $('#modalFile').html(`
                <span class="shielded-spinner-border-sm shielded-text-secondary mt-3" style="display: block;"
                            id="spinnerModalFile"></span>
                `);
        }

        riwayatDetail(idAnalisa) {
            const idUser = $('#shieldedUserId').val();
            const thisClass = this;
            console.log(`idAnalisa: ${idAnalisa}`);
            console.log(`idUser: ${idUser}`);

            chrome.storage.local.get(['useExternal']).then((result) => {
                const useExternal = result.useExternal;
                $.ajax({
                    url: useExternal == 1 ? 'https://chrome.server.resaka.my.id/api/v1/get-riwayat-detail' : 'http://127.0.0.1:8000/api/v1/get-riwayat-detail',
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 1|zaQoCF4MGINb2JKOGwrKa2Tk3KtJEEHINUZLX7yM160d4f8f'
                    },
                    beforeSend: function () {
                        thisClass.refineModal();
                        $('#exampleModal').modal('show');
                    },
                    data: JSON.stringify({ idAnalisa: idAnalisa, idUser: idUser }),
                    success: function (response) {
                        console.log(response);
                        const status = response.status;
                        if (status == 'ok') {
                            run.emptyModal();
                            const judul = response.judul;
                            const pengirim = String(response.pengirim);
                            const normalizedPengirim = pengirim.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                            const tanggal = response.tanggal;
                            const ringkasan = response.ringkasan;
                            var date = new Date(tanggal);
                            var year = date.getFullYear();
                            var month = ('0' + (date.getMonth() + 1)).slice(-2);
                            var day = ('0' + date.getDate()).slice(-2);
                            var hours = ('0' + date.getHours()).slice(-2);
                            var minutes = ('0' + date.getMinutes()).slice(-2);
                            var seconds = ('0' + date.getSeconds()).slice(-2);
                            const normalizedTanggal = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
                            const domain = response.domain;
                            const url = response.url;
                            const file = response.file;

                            $('#modalJudul').html(judul);
                            $('.modalPengirim').html(normalizedPengirim);
                            $('#modalTanggal').html(normalizedTanggal);

                            if (ringkasan != null) {
                                $('#modalRingkasan').html(ringkasan.assistant);
                            } else {
                                $('#modalRingkasan').html(`Tidak ada analisa`);
                            }

                            if (domain.length > 0) {
                                const openphish = response.domain[0].openphish;
                                if (openphish == 'harmless') {
                                    $('#modalDomain').html('<ul style="cursor: default;"> ' + domain[0].domain + ' <span style="margin-left: 5px; color: green;"> Resiko Rendah ✅ </span> <span style="margin-left: 5px; font-weight: bold;"> Analyze by VirusTotal </span> </ul>');
                                } else if (openphish == 'undetected') {
                                    $('#modalDomain').html('<ul style="cursor: default;"> ' + domain[0].domain + ' <span style="margin-left: 5px; color: orange;"> Resiko Sedang ⚠️ </span> <span style="margin-left: 5px; font-weight: bold;"> Analyze by VirusTotal </span> </ul>');
                                } else {
                                    $('#modalDomain').html('<ul style="cursor: default;"> ' + domain[0].domain + ' <span style="margin-left: 5px; color: red;"> RESIKO TINGGI ⛔ </span> <span style="margin-left: 5px; font-weight: bold;"> Analyze by VirusTotal </span> </ul>');
                                }
                            } else {
                                $('#modalDomain').html('Tidak ada analisa')
                            }

                            if (url.length > 0) {
                                url.forEach((url, index) => {
                                    var text = url['href'];
                                    var normalizedText = '';
                                    if (text.length > 40) {
                                        normalizedText = text.substring(0, 40) + '...'
                                    } else {
                                        normalizedText = text;
                                    }
                                    var totalEmails = url['harmless'] + url['malicious'] + url['suspicious'] + url['timeout'] + url['undetected'];
                                    var weightedAverageScore = (url['harmless'] * 0 + url['suspicious'] * 10 + url['malicious'] * 20 + url['undetected'] * 5) / totalEmails;
                                    if (weightedAverageScore < 1.5) {
                                        $('#modalUrl').append('<ul>' + normalizedText + ' || <span style="margin-left: 5px; color: green;"> Resiko Rendah ✅ </span> <span style="margin-left: 5px; font-weight: bold;"> Analyze by VirusTotal </span> <br> </ul>');
                                    } else if (weightedAverageScore >= 1.5 && weightedAverageScore <= 2) {
                                        $('#modalUrl').append('<ul>' + normalizedText + ' || <span style="margin-left: 5px; color: orange;"> Resiko Sedang ⚠️ </span> <span style="margin-left: 5px; font-weight: bold;"> Analyze by VirusTotal </span> <br> </ul>');
                                    } else {
                                        $('#modalUrl').append('<ul>' + normalizedText + ' || <span style="margin-left: 5px; color: red;"> RESIKO TINGGI ⛔ </span> <span style="margin-left: 5px; font-weight: bold;"> Analyze by VirusTotal </span> <br> </ul>');
                                    }
                                })
                            } else {
                                $('#modalUrl').html('Tidak ada analisa');
                            }

                            if (file.length > 0) {
                                file.forEach((f, index) => {
                                    var name = f['name'];
                                    var normalizedName = '';
                                    if (name.length > 30) {
                                        normalizedName = name.substring(0, 30) + '...'
                                    } else {
                                        normalizedName = name;
                                    }
                                    var malicious = f['malicious'];
                                    var suspicious = f['suspicious'];
                                    var total = (malicious + suspicious);
                                    if (total == 0) {
                                        $('#modalFile').append('<ul>' + normalizedName + ' || <span style="margin-left: 5px; color: green;"> Resiko Rendah ✅ </span> <span style="margin-left: 5px; font-weight: bold;"> Analyze by VirusTotal </span> </ul>');
                                    } else if (total == 1) {
                                        $('#modalFile').append('<ul>' + normalizedName + ' || <span style="margin-left: 5px; color: orange;"> Resiko Sedang ⚠️ </span> <span style="margin-left: 5px; font-weight: bold;"> Analyze by VirusTotal </span> </ul>');
                                    } else {
                                        $('#modalFile').append('<ul>' + normalizedName + ' || <span style="margin-left: 5px; color: red;"> RESIKO TINGGI ⛔ </span> <span style="margin-left: 5px; font-weight: bold;"> Analyze by VirusTotal </span> </ul>');
                                    }
                                })
                            } else {
                                $('#modalFile').html('Tidak ada analisa');
                            }
                        } else {
                            run.emptyModal();
                            alert(status);
                        }

                    },
                    error: function (errorThrown) {
                        console.log(`error: ${errorThrown}`);
                    },
                    complete: function () {
                        console.log(`completed`);
                    }
                })
            })
        }

        emptyModal() {
            $('#modalJudul').empty();
            $('.modalPengirim').empty();
            $('#modalRingkasan').empty();
            $('#modalTanggal').empty();
            $('#modalDomain').empty();
            $('#modalUrl').empty();
            $('#modalFile').empty();
        }
    }

    // USAGE
    const run = new options();
    run.setGetUserId();
    run.tableRiwayat();

    console.log(`-------------------------------------`);

    $('#accor1Btn').click();

    ////////////////////////////////////////

    $(document).on('click', '#clickableJudul', function (e) {
        e.preventDefault();
        const idAnalisa = $(this).data('idanalisa');
        run.riwayatDetail(idAnalisa);
    });
    $(document).on('click', '#closeModalBtn', function (e) {
        e.preventDefault();
        $('#exampleModal').modal('hide');
        run.emptyModal();
    })
});