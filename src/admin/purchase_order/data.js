console.log('Data PO is running...')

$(function () {
    const DOM = {
        table: '#t_po'
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
                return res.data
            },
            error: err => {

            }
        },
        columns: [
            {
                data: "no_po"
            },
            {
                data: "customer.nama_perusahaan"
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
                data: "user.nama_user"
            },
            {
                data: "tgl_input_po"
            },
            {
                data: null, render: (data, type, row) => {
                    if(row.approve === 'Y'){
                        return `
                            <div class="btn-group">
                                <button class="btn btn-success btn-sm btn_edit" data-id="${row.no_po}"><i class="fa fa-edit"></i> Edit</button>	
                                <button class="btn btn-danger btn-sm btn_delete" data-id="${row.no_po}"><i class="fa fa-times"></i> Hapus</button>	
                            </div>
                        `
                    } else {
                        return '-'
                    }
                    
                }
            }
        ],
        order: [[0, "desc"]]
    })

    const PoController = (() => {


        return {
            init: () => {

            }
        }
    })()

    PoController.init();
})