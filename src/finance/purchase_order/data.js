console.log('Data PO is running...')

$(function () {
    const DOM = {
        table: '#t_po',
        modal: {
            content: '.modal-content',
            file: '#modal_file'
        },
        link: {
            file: '.link_file'
        },
        image: {
            href: '.file_po_href',
            src: '.file_po_src',
            id: '.id_po'
        }
    }

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-bottom-left",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": 300,
        "hideDuration": 100,
        "timeOut": 5000,
        "extendedTimeOut": 1000,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "slideDown",
        "hideMethod": "slideUp"
    }

    const tablePo = $(DOM.table).DataTable({
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
            url: `${BASE_URL}api/purchase_order`,
            type: 'GET',
            dataType: 'JSON',
            beforeSend: xhr => {
                xhr.setRequestHeader("X-SIPF-KEY", TOKEN)
                xhr.setRequestHeader("Authorization", "Basic " + btoa(USERNAME + ":" + PASSWORD))
            },
            dataSrc: res => {
                console.log(res.data)
                return res.data
            },
            error: err => {

            }
        },
        columns: [
            {
                data: null, render: (data, type, row) => {
                    return `
                        <a href="javascript:void(0)" class="link_file" data-src="${row.file_po}" data-id="${row.no_po}">${row.no_po}</a>
                    `
                }
            },
            {
                data: null, render: (data, type, row) => {
                    return `
                        ${row.customer.nama_perusahaan} - ${row.customer.nama_pic}
                    `
                }
            },
            {
                data: "total_po"
            },
            {
                data: "total_fee"
            },
            {
                data: "marketing"
            },
            {
                data: null, render: (data, type, row) => {
                    if (row.approve === 'Y') {
                        return `<span class="badge badge-success">Approve</span> `
                    } else {
                        return `<span class="badge badge-warning">Proses</span>`
                    }
                }
            },
            {
                data: null, render: (data, type, row) => {
                    return `
                        -
                    `
                }
            },
            {
                data: "user.nama_lengkap"
            },
            {
                data: "tgl_input_po"
            },
        ],
        order: [[0, "desc"]]
    })

    const PoController = (() => {

        const { table, modal, link, image } = DOM

        const openFile = () => {
            $(table).on('click', link.file, function () {
                let path = $(this).data('src')
                let id = $(this).data('id')

                $(image.id).text(`#${id}`)
                $(image.href).attr('href', path)
                $(image.src).attr('src', path)
                $(modal.file).modal('show')
            })
        }

        return {
            init: () => {
                openFile()
            }
        }
    })()

    PoController.init();
})