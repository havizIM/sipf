$(function () {
    const DOM = {
        page_content: '#page_content',
        modal: {
            content: '.modal-content',
            profile: '#modal_profile',
            password: '#modal_password'
        },
        access: {
            profile: '.access_profile',
            password: '.access_password',
            logout: '.access_logout'
        },
        form: {
            profile: '#form_profile',
            password: '#form_password'
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

    const mainController = ((User) => {

        const { page_content, modal, access, form } = DOM

        const loadContent = path => {
            $.ajax({
                url: `${BASE_URL}manager/${path}`,
                dataType: 'HTML',
                beforeSend: function () {
                    $.blockUI({
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
                success: function (response) {
                    $(page_content).html(response)
                    $.unblockUI()
                },
                error: function () {
                    window.location.replace(`${BASE_URL}not_found`)
                }
            })
        }

        const setRoute = () => {
            let path

            if (location.hash) {
                path = location.hash.substr(2)
                loadContent(path)
            } else {
                location.hash = '#/dashboard'
            }

            $(window).on('hashchange', function () {
                path = location.hash.substr(2)

                loadContent(path)
            })
        }

        const changePassword = () => {
            $(access.password).on('click', function () {
                $(form.password)[0].reset()
                $(modal.password).modal('show')
            })
        }

        const editProfile = () => {
            $(access.profile).on('click', function () {
                $(modal.profile).modal('show')
            })
        }

        const submitPassword = () => {
            $(form.password).validate({
                rules: {
                    old_password: 'required',
                    new_password: 'required',
                    retype_password: {
                        required: true,
                        equalTo: '#new_password'
                    }
                },
                messages: {
                    old_password: 'Password lama harus diisi',
                    new_password: 'Password baru harus diisi',
                    retype_password: {
                        required: 'Ulangi Password harus diisi',
                        equalTo: 'Harus sama dengan Password Baru'
                    }
                },
                submitHandler: form => {
                    $.ajax({
                        url: `${BASE_URL}api/setting/change_password`,
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
                            $(modal.password).modal('hide')
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

        const submitProfile = () => {
            $(form.profile).validate({
                rules: {
                    nama_lengkap: 'required',
                    email: 'required',
                    telepon: 'required'
                },
                messages: {
                    nama_lengkap: 'Field tidak boleh kosong',
                    email: 'Field tidak boleh kosong',
                    telepon: 'Field tidak boleh kosong'
                },
                submitHandler: form => {
                    $.ajax({
                        url: `${BASE_URL}api/setting/edit_profile`,
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
                            $(modal.profile).modal('hide')
                            User.init();
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

        const logout = () => {
            $(access.logout).on('click', function () {
                $.ajax({
                    url: `${BASE_URL}api/setting/logout`,
                    type: 'GET',
                    dataType: 'JSON',
                    beforeSend: xhr => {
                        xhr.setRequestHeader("X-SIPF-KEY", TOKEN)
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(USERNAME + ":" + PASSWORD))
                        $.blockUI({
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
                        localStorage.removeItem('X-SIPF-KEY')
                        window.location.replace(`${BASE_URL}`)
                    },
                    error: err => {
                        const { error } = err.responseJSON
                        toastr.error(error, 'Gagal')
                    },
                    complete: () => {
                        $.unblockUI()
                    }
                })
            })
        }

        return {
            init: () => {
                setRoute()

                changePassword()
                editProfile()

                submitPassword()
                submitProfile()

                logout()
            }
        }
    })(verifyUser)

    mainController.init()
})

