console.log('User Data is running...')

$(function () {

    const DOM = {
        table: '#t_customer',
        button: {
            add: '.btn_add',
            edit: '.btn_edit',
            delete: '.btn_delete'
        },
        modal: {
            content: '.modal-content',
            add: '#modal_add',
            edit: '#modal_edit',
            delete: '#modal_delete'
        },
        form: {
            add: '#form_add',
            edit: '#form_edit',
            delete: '#form_delete'
        },
        index: {
            edit: {
                id_customer: '#edit_id_customer',
                nama_pic: '#edit_nama_pic',
                nama_perusahaan: '#edit_nama_perusahaan',
                email: '#edit_email',
                telepon: '#edit_telepon',
                bank: '#edit_bank',
                cabang: '#edit_cabang',
                no_rekening: '#edit_no_rekening'
            },
            delete: {
                id_customer: '#delete_id_customer',
                nama_pic: '#delete_nama_pic'
            }
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
            },
            {
                data: "bank"
            },
            {
                data: "cabang"
            },
            {
                data: "no_rekening"
            },
            {
                data: "tgl_input_customer"
            },
            {
                data: null, render: (data, type, row) => {
                    return `
                        <div class="btn-group">
                            <button class="btn btn-success btn-sm btn_edit" data-id="${row.id_customer}"><i class="fa fa-edit"></i> Edit</button>	
                            <button class="btn btn-danger btn-sm btn_delete" data-id="${row.id_customer}"><i class="fa fa-times"></i> Hapus</button>	
                        </div>
                    `
                }
            }
        ],
        order: [[0, "desc"]]
    });

    const customerController = (() => {

        const { button, table, form, modal, index } = DOM

        const addCustomer = () => {
            $(button.add).on('click', () => {
                $(form.add)[0].reset();
                $(modal.add).modal('show')
            })
        }

        const fetchCustomer = (id, callback) => {
            $.ajax({
                url: `${BASE_URL}api/customer`,
                data: { id_customer: id },
                type: 'GET',
                dataType: 'JSON',
                beforeSend: xhr => {
                    xhr.setRequestHeader("X-SIPF-KEY", TOKEN)
                    xhr.setRequestHeader("Authorization", "Basic " + btoa(USERNAME + ":" + PASSWORD))
                },
                success: ({ data }) => {
                    console.log(data)
                    callback(data)
                },
                error: err => {
                    const { error } = err.responseJSON
                    toastr.error(error, 'Gagal')
                }
            })
        }

        const editCustomer = () => {
            $(table).on('click', button.edit, function () {
                let id_customer = $(this).data('id')

                fetchCustomer(id_customer, data => {
                    if (data.length === 1) {
                        data.map(v => {
                            $(index.edit.id_customer).val(v.id_customer)
                            $(index.edit.nama_perusahaan).val(v.nama_perusahaan)
                            $(index.edit.nama_pic).val(v.nama_pic)
                            $(index.edit.telepon).val(v.telepon)
                            $(index.edit.email).val(v.email)
                            $(index.edit.bank).val(v.bank)
                            $(index.edit.cabang).val(v.cabang)
                            $(index.edit.no_rekening).val(v.no_rekening)
                        })

                        $(modal.edit).modal('show')
                    }
                })
            })
        }

        const deleteCustomer = () => {
            $(table).on('click', button.delete, function () {
                let id_customer = $(this).data('id')

                fetchCustomer(id_customer, data => {
                    if (data.length === 1) {
                        data.map(v => {
                            $(index.delete.id_customer).val(v.id_customer)
                            $(index.delete.nama_pic).val(v.nama_pic)
                        })

                        $(modal.delete).modal('show')
                    }
                })
            })
        }

        const submitAdd = () => {
            $(form.add).validate({
                rules: {
                    nama_perusahaan: 'required',
                    nama_pic: 'required',
                    email: {
                        required: true,
                        email: true
                    },
                    telepon: 'required',
                    bank: 'required',
                    cabang: 'required',
                    no_rekening: 'required',
                },
                messages: {
                    nama_perusahaan: 'Nama Perusahaan harus diisi',
                    nama_pic: 'PIC harus diisi',
                    email: {
                        required: 'Email harus diisi',
                        email: 'Silahkan masukan format email dengan benar'
                    },
                    telepon: 'Telepon harus diisi',
                    bank: 'Bank harus diisi',
                    cabang: 'Cabang harus diisi',
                    no_rekening: 'No Rekening harus diisi',
                },
                submitHandler: form => {
                    $.ajax({
                        url: `${BASE_URL}api/customer/add`,
                        type: 'POST',
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
                            $(modal.add).modal('hide')
                            tableCustomer.ajax.reload()
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

        const submitEdit = () => {
            $(form.edit).validate({
                rules: {
                    id_customer: 'required',
                    nama_perusahaan: 'required',
                    nama_pic: 'required',
                    email: {
                        required: true,
                        email: true
                    },
                    telepon: 'required',
                    bank: 'required',
                    cabang: 'required',
                    no_rekening: 'required',
                },
                messages: {
                    id_customer: 'ID Customer harus diisi',
                    nama_perusahaan: 'Nama Perusahaan harus diisi',
                    nama_pic: 'PIC harus diisi',
                    email: {
                        required: 'Email harus diisi',
                        email: 'Silahkan masukan format email dengan benar'
                    },
                    telepon: 'Telepon harus diisi',
                    bank: 'Bank harus diisi',
                    cabang: 'Cabang harus diisi',
                    no_rekening: 'No Rekening harus diisi',
                },
                submitHandler: form => {
                    $.ajax({
                        url: `${BASE_URL}api/customer/edit`,
                        type: 'PUT',
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
                            $(modal.edit).modal('hide')
                            tableCustomer.ajax.reload()
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

        const submitDelete = () => {
            $(form.delete).validate({
                rules: {
                    id_customer: 'required',
                    nama_pic: 'required',
                },
                messages: {
                    id_customer: 'ID Customer harus diisi',
                    nama_pic: 'Nama PIC harus diisi',
                },
                submitHandler: form => {
                    $.ajax({
                        url: `${BASE_URL}api/customer/delete`,
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
                            tableCustomer.ajax.reload()
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
                addCustomer()
                submitAdd()

                editCustomer()
                submitEdit()

                deleteCustomer()
                submitDelete()
            }
        }
    })()

    customerController.init();
})