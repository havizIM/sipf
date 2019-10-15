console.log('Log Data is running...')

$(function () {

    const DOM = {
        table: '#t_log',
    }

    const tableLog = $(DOM.table).DataTable({
        columnDefs: [
            {
                targets: [],
                searchable: false
            },
            {
                targets: [],
                orderable: false
            }
        ],
        responsive: true,
        autoWidth: true,
        processing: true,
        ajax: {
            url: `${BASE_URL}api/log`,
            type: 'GET',
            dataType: 'JSON',
            beforeSend: xhr => {
                xhr.setRequestHeader("X-SIPF-KEY", TOKEN)
                xhr.setRequestHeader("Authorization", "Basic " + btoa(USERNAME + ":" + PASSWORD))
            },
            dataSrc: res => {
                return res.data
            },
            error: err => {

            }
        },
        columns: [
            {
                data: "id_log"
            },
            {
                data: null, render: (data, type, row) => {
                    return `${row.user.id_user} - ${row.user.nama_lengkap}`
                }
            },
            {
                data: "referensi"
            },
            {
                data: "deskripsi"
            },
            {
                data: "tgl_log"
            },
        ],
        order: [[0, "desc"]]
    });
})