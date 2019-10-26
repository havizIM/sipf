console.log('Data Payment is running...')

$(function () {
    const DOM = {
        table: '#t_payment',
        modal: {
            content: '.modal-content',
            delete: '#modal_delete',
            file: '#modal_file'
        },
        button: {
            delete: '.btn_delete'
        },
        form: {
            delete: '#form_delete'
        },
        input: {
            no_payment: '#no_payment',
            nama_pic: '#nama_pic'
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

    const tablePayment = $(DOM.table).DataTable({
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
            url: `${BASE_URL}api/payment`,
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
                        <a href="#/payment/${row.no_payment}">${row.no_payment}</a>
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
                data: null, render: (data, type, row) => {
                    return `${row.detail !== null ? row.detail.length : '0'} PO`
                }
            },
            {
                data: null, render: (data, type, row) => {
                    return `Rp. ${parseInt(row.total_bayar).toLocaleString(['ban', 'id'])}`
                }
            },
            {
                data: "user.nama_lengkap"
            },
            {
                data: "tgl_payment"
            },
            {
                data: "tgl_input_payment"
            }
        ],
        order: [[0, "desc"]]
    })

    const PoController = (() => {

        const { table, form, modal, button, input } = DOM

        const fetchPayment = (id, callback) => {
            $.ajax({
                url: `${BASE_URL}api/payment`,
                data: { no_payment: id },
                type: 'GET',
                dataType: 'JSON',
                beforeSend: xhr => {
                    xhr.setRequestHeader("X-SIPF-KEY", TOKEN)
                    xhr.setRequestHeader("Authorization", "Basic " + btoa(USERNAME + ":" + PASSWORD))
                },
                success: ({ data }) => {
                    callback(data)
                },
                error: err => {
                    const { error } = err.responseJSON
                    toastr.error(error, 'Gagal')
                }
            })
        }

        const deletePo = () => {
            $(table).on('click', button.delete, function () {
                let no_payment = $(this).data('id')

                fetchPayment(no_payment, data => {
                    if (data.length === 1) {
                        data.map(v => {
                            $(input.no_payment).val(v.no_payment)
                            $(input.nama_pic).val(v.customer.nama_pic)
                        })

                        $(modal.delete).modal('show')
                    }
                })
            })
        }

        const submitDelete = () => {
            $(form.delete).validate({
                rules: {
                    no_payment: 'required',
                    nama_pic: 'required',
                },
                messages: {
                    no_payment: 'No Payment harus diisi',
                    nama_pic: 'Nama PIC harus diisi',
                },
                submitHandler: form => {
                    $.ajax({
                        url: `${BASE_URL}api/payment/delete`,
                        type: 'DELETE',
                        dataType: 'JSON',
                        data: $(form).serialize(),
                        beforeSend: xhr => {
                            xhr.setRequestHeader("X-SIPF-KEY", TOKEN)
                            xhr.setRequestHeader("Authorization", "Basic " + btoa(USERNAME + ":" + PASSWORD))
                            $(modal.content).block({
                                message: '<i class="fa fa-spinner fa-spin fa-5x"></i>',
                                overlayCSS: {
                                    backgroundColor: '#fff',
                                    opacity: 0.8,
                                    cursor: 'wait'
                                },
                                css: {
                                    border: 0,
                                    padding: 0,
                                    backgroundColor: 'transparent'
                                }
                            })
                        },
                        success: ({ message }) => {
                            toastr.success(message, 'Berhasil')
                            $(modal.delete).modal('hide')
                            tablePayment.ajax.reload()
                        },
                        error: err => {
                            const { error } = err.responseJSON
                            toastr.error(error, 'Gagal')
                        },
                        complete: () => {
                            $(modal.content).unblock()
                        }
                    })
                }
            })
        }

        return {
            init: () => {
                deletePo();
                submitDelete();
            }
        }
    })()

    PoController.init();
})