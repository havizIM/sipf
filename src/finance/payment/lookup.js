console.log('Lookup Customer is running...')

$(function () {
    const DOM = {
        table: {
            customer: '#t_customer',
            po: '#t_po',
            detail: '#t_detail'
        },
        button: {
            lookup: '.btn_lookup',
            pilih: '.btn_pilih',
            pilih_po: '.btn_pilih_po',
            po: '.btn_po',
            remove: '.btn_remove'
        },
        input: {
            id_customer: '#id_customer',
            customer: '#customer',
            nama_pic: '#nama_pic',
            tgl_payment: '#tgl_payment',
            bank: '#bank',
            cabang: '#cabang',
            no_rekening: '#no_rekening',
            tgl_payment: '#tgl_payment',
            total_dibayar: '#total_bayar'
        },
        modal: {
            lookup: '#modal_lookup',
            po: '#modal_po',
        },
        container: {
            total: '#container_total_fee'
        }
    }

    let newData = []

    const tableCustomer = $(DOM.table.customer).DataTable({
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
                        <button class="btn btn-success btn-sm btn_pilih" data-id="${row.id_customer}" data-name="${row.nama_perusahaan}" data-pic="${row.nama_pic}" data-bank="${row.bank}" data-cabang="${row.cabang}" data-rekening="${row.no_rekening}"><i class="fa fa-search"></i> Pilih</button>
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

    const tablePo = $(DOM.table.po).DataTable({
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
                const {data} = res

                if(data.length !== 0){
                    const filteredData =  data.filter(v => v.approve === 'Y' && v.payment === null).filter(k => {
                        return !newData.find(y => {
                            return k.no_po === y.no_po
                        })
                    })

                    return filteredData
                } else {
                    return []
                }
            },
            error: err => {

            }
        },
        columns: [
            {
                data: null, render: (data, type, row) => {
                    return `
                        <button class="btn btn-success btn-sm btn_pilih_po" data-id="${row.no_po}" data-date="${row.tgl_input_po}" data-total="${row.total_po}" data-fee="${row.total_fee}"><i class="fa fa-search"></i> Pilih</button>
                    `
                }
            },
            {
                data: "no_po"
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
            }
        ],
        order: [[0, "desc"]]
    });

    const lookupController = (() => {
        const { table, button, input, modal, container } = DOM
        let total = 0;

        const openModal = () => {
            $(button.lookup).on('click', () => {
                $(modal.lookup).modal('show')
            })
        }

        const openModalPo = () => {
            $(button.po).on('click', () => {
                let id_customer = $(input.id_customer).val();

                if(id_customer === ''){
                    toastr.warning('Anda harus memilih customer terlebih dahulu', 'Perhatian')
                } else {
                    tablePo.ajax.url(`${BASE_URL}api/purchase_order?id_customer=${id_customer}`).load();
                    $(modal.po).modal('show')
                }
            })
        }

        const setValue = () => {
            $(table.customer).on('click', button.pilih, function () {
                let id_customer = $(this).data('id')
                let nama_perusahaan = $(this).data('name')
                let nama_pic = $(this).data('pic')
                let bank = $(this).data('bank')
                let cabang = $(this).data('cabang')
                let no_rekening = $(this).data('rekening')

                $(input.id_customer).val(id_customer)
                $(input.customer).val(`${id_customer} - ${nama_perusahaan}`).trigger('keyup')
                $(input.nama_pic).val(nama_pic)
                $(input.bank).val(bank)
                $(input.cabang).val(cabang)
                $(input.no_rekening).val(no_rekening)

                newData = []
                total = 0
                $(`${table.detail} tbody`).html('')
                $(container.total).text(`Rp. ${total}`)
                $(input.total_dibayar).val(total).trigger('change')
                $(modal.lookup).modal('hide')
            })
        }

        const pilihPo = () => {
            $(table.po).on('click', button.pilih_po, function () {
                let obj = {
                    no_po: $(this).data('id'),
                    tgl_po: $(this).data('date'),
                    total_po: $(this).data('total'),
                    total_fee: $(this).data('fee')
                }

                let total_fee = total += parseInt(obj.total_fee);

                newData.push(obj)

                let table_row = `
                    <tr id="row-${obj.no_po}">
                        <td>${obj.no_po}</td>
                        <td>${obj.tgl_po}</td>
                        <td>Rp. ${obj.total_po}</td>
                        <td>Rp. ${obj.total_fee}</td>
                        <td>
                            <input type="hidden" name="no_po[]" id="no_po[${obj.no_po}]" value="${obj.no_po}" />
                            <input type="hidden" name="jml_dibayar[]" id="jml_dibayar[${obj.no_po}]" value="${obj.total_fee}" />
                            <button type="button" class="btn btn-sm btn-danger btn_remove" data-id="${obj.no_po}" data-fee="${obj.total_fee}"><i class="fa fa-trash"></i></button>
                        </td>
                    </tr>
                `
                $(`${table.detail} tbody`).append(table_row)
                $(container.total).text(`Rp. ${total_fee}`)
                $(input.total_dibayar).val(total_fee).trigger('change')
                $(modal.po).modal('hide')
            })
        }

        const removeRow = () => {
            $(table.detail).on('click', button.remove, function(){
                let id = $(this).data('id')
                let fee = $(this).data('fee')

                let total_fee = total -= parseInt(fee);

                for (let i = 0; i < newData.length; i++) {
                    if (newData[i].no_po === id) {
                        newData.splice(i, 1);
                    }
                }

                $(container.total).text(`Rp. ${total_fee}`)
                $(input.total_dibayar).val(total_fee).trigger('change')
                $(`#row-${id}`).remove()
            })
        }

        return {
            init: () => {
                openModal()
                openModalPo()

                setValue()
                pilihPo()
                removeRow()
            }
        }
    })()

    lookupController.init();
})