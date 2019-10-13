console.log('Lookup Customer is running...')

$(function () {
    const DOM = {
        table: '#t_customer',
        button: {
            lookup: '.btn_lookup',
            pilih: '.btn_pilih'
        },
        input: {
            id_customer: '#id_customer',
            customer: '#customer'
        },
        modal: {
            lookup: '#modal_lookup'
        }
    }

    const tableCustomer = $(DOM.table).DataTable({
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
        processing: true,
        ajax: {
            url: `${BASE_URL}api/customer`,
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
                data: null, render: (data, type, row) => {
                    return `
                        <button class="btn btn-success btn-sm btn_pilih" data-id="${row.id_customer}" data-name="${row.nama_perusahaan}"><i class="fa fa-search"></i> Pilih</button>
                    `
                }
            },
            {
                data: "id_customer"
            },
            {
                data: "nama_perusahaan"
            },
            {
                data: "nama_pic"
            },
            {
                data: "email"
            },
            {
                data: "telepon"
            }
        ],
        order: [[0, "desc"]]
    });

    const lookupController = (() => {
        const {table, button, input, modal} = DOM
        
        const openModal = () => {
            $(button.lookup).on('click', () => {
                $(modal.lookup).modal('show')
            })
        }

        const setValue = () => {
            $(table).on('click', button.pilih, function() {
                let id = $(this).data('id')
                let name = $(this).data('name')

                $(input.id_customer).val(id)
                $(input.customer).val(`${id} - ${name}`).trigger('keyup')

                $(modal.lookup).modal('hide')
            })
        }

        return {
            init: () => {
                openModal()
                setValue()
            }
        }
    })()

    lookupController.init();
})