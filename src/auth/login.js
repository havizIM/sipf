console.log('Auth is running...')

$(function(){

    const DOM = {
        loader: '.preloader',
        container: '#container',
        form: {
            login: '#form_login'
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

    const loginController = (() => {
        const {loader, form, container} = DOM

        const submitLogin = () => {
            $(form.login).validate({
                rules: {
                    username: 'required',
                    password: 'required'
                },
                messages: {
                    username: 'Username tidak boleh kosong',
                    password: 'Password tidak boleh kosong'
                },
                submitHandler: form => {
                    $.ajax({
                        url: `${BASE_URL}api/auth`,
                        type: 'POST',
                        dataType: 'JSON',
                        data: $(form).serialize(),
                        beforeSend: xhr => {
                            xhr.setRequestHeader("Authorization", "Basic " + btoa(USERNAME + ":" + PASSWORD))
                            $(container).block({
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
                            });
                        },
                        success: ({data}) => {
                            localStorage.setItem('X-SIPF-KEY', data.key);
                            window.location.replace(`${BASE_URL}${data.level}/`)
                        },
                        error: err => {
                            const { error } = err.responseJSON

                            console.log(error)
                            toastr.error(error, 'Gagal')
                        },
                        complete: () => {
                            $(container).unblock();
                        }
                    })
                }
            })
        }

        const additionalListener = () => {
            $(loader).fadeOut()
        }

        return {
            init : () => {
                additionalListener()
                submitLogin()
            }
        }
    })()

    loginController.init();

    
})