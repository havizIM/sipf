console.log('User Data is running...')

$(function(){
    
    const DOM = {
        table: '#t_user',
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
                id_user: '#edit_id_user',
                nama_lengkap: '#edit_nama_lengkap',
                username: '#edit_username',
                email: '#edit_email',
                telepon: '#edit_telepon',
                level: '#edit_level',
                aktif: '#edit_aktif'
            },
            delete: {
                id_user: '#delete_id_user',
                nama_lengkap: '#delete_nama_lengkap'
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

    const tableUser = $(DOM.table).DataTable({
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
            url: `${BASE_URL}api/user`,
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
                data: "id_user"
            },
            {
                data: "username"
            },
            {
                data: "nama_lengkap"
            },
            {
                data: "email"
            },
            {
                data: "telepon"
            },
            {
                data: "level"
            },
            {
                data: null, render: (data, type, row) => {
                    if (row.aktif === 'Y') {
                        return `<span class="badge badge-success">Aktif</span> `
                    } else {
                        return `<span class="badge badge-danger">Tidak Aktif</span>`
                    }
                }
            },
            {
                data: "tgl_registrasi"
            },
            {
                data: null, render: (data, type, row) => {
                    return `
                        <div class="btn-group">
                            <button class="btn btn-success btn-sm btn_edit" data-id="${row.id_user}"><i class="fa fa-edit"></i> Edit</button>	
                            <button class="btn btn-danger btn-sm btn_delete" data-id="${row.id_user}"><i class="fa fa-times"></i> Hapus</button>	
                        </div>
                    `
                }
            }
        ],
        order: [[0, "desc"]]
    });

    const userController = (() => {

        const { button, table, form, modal, index } = DOM

        const addUser = () => {
            $(button.add).on('click', () => {
                $(form.add)[0].reset();
                $(modal.add).modal('show')
            })
        }

        const fetchUser = (id, callback) => {
            $.ajax({
                url: `${BASE_URL}api/user`,
                data: { id_user: id },
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

        const editUser = () => {
            $(table).on('click', button.edit, function(){
                let id_user = $(this).data('id')

                fetchUser(id_user, data => {
                    if (data.length === 1) {
                        data.map(v => {
                            $(index.edit.id_user).val(v.id_user)
                            $(index.edit.nama_lengkap).val(v.nama_lengkap)
                            $(index.edit.username).val(v.username)
                            $(index.edit.telepon).val(v.telepon)
                            $(index.edit.email).val(v.email)
                            $(index.edit.level).val(v.level)
                            $(index.edit.aktif).val(v.aktif)
                        })

                        $(modal.edit).modal('show')
                    }
                })
            })
        }

        const deleteUser = () => {
            $(table).on('click', button.delete, function(){
                let id_user = $(this).data('id')

                fetchUser(id_user, data => {
                    if (data.length === 1) {
                        data.map(v => {
                            $(index.delete.id_user).val(v.id_user)
                            $(index.delete.nama_lengkap).val(v.nama_lengkap)
                        })

                        $(modal.delete).modal('show')
                    }
                })
            })
        }

        const submitAdd = () => {
            $(form.add).validate({
                rules: {
                    nama_lengkap: 'required',
                    username: 'required',
                    email: {
                        required: true,
                        email: true
                    },
                    telepon: 'required',
                    level: 'required',
                    aktif: 'required',
                },
                messages: {
                    nama_lengkap: 'Nama Lengkap harus diisi',
                    username: 'Username harus diisi',
                    email: {
                        required: 'Email harus diisi',
                        email: 'Silahkan masukan format email dengan benar'
                    },
                    telepon: 'Telepon harus diisi',
                    level: 'Level harus dipilih',
                    aktif: 'Status harus dipilih',
                },
                submitHandler: form => {
                    $.ajax({
                        url: `${BASE_URL}api/user/add`,
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
                        success: ({message}) => {
                            toastr.success(message, 'Berhasil')
                            $(modal.add).modal('hide')
                            tableUser.ajax.reload()
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
                    id_user: 'required',
                    nama_lengkap: 'required',
                    username: 'required',
                    email: {
                        required: true,
                        email: true
                    },
                    telepon: 'required',
                    level: 'required',
                    aktif: 'required',
                },
                messages: {
                    id_user: 'ID User harus diisi',
                    nama_lengkap: 'Nama Lengkap harus diisi',
                    username: 'Username harus diisi',
                    email: {
                        required: 'Email harus diisi',
                        email: 'Silahkan masukan format email dengan benar'
                    },
                    telepon: 'Telepon harus diisi',
                    level: 'Level harus dipilih',
                    aktif: 'Status harus dipilih',
                },
                submitHandler: form => {
                    $.ajax({
                        url: `${BASE_URL}api/user/edit`,
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
                            tableUser.ajax.reload()
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
                    id_user: 'required',
                    nama_lengkap: 'required',
                },
                messages: {
                    id_user: 'ID User harus diisi',
                    nama_lengkap: 'Nama Lengkap harus diisi',
                },
                submitHandler: form => {
                    $.ajax({
                        url: `${BASE_URL}api/user/delete`,
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
                            tableUser.ajax.reload()
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
                addUser()
                submitAdd()

                editUser()
                submitEdit()
                
                deleteUser()
                submitDelete()
            }
        }
    })()

    userController.init();
})