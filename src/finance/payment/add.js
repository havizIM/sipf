console.log('Add PO is running...')

$(function () {
    const DOM = {
        form: '#form_add',
        card: '#card_add',
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

    const addPaymentController = (() => {
        const { form, card } = DOM

        const submitAdd = () => {
            $(form).validate({
                ignore: "",
                rules: {
                    customer: 'required',
                    tgl_payment: 'required',
                    total_bayar: 'required'
                },
                messages: {
                    customer: 'Customer harus dipilih',
                    tgl_payment: 'Tgl Payment harus diisi',
                    total_bayar: 'Silahkan pilih PO yang akan dibayarkan'
                },
                errorPlacement: function (error, element) {
                    let id = $(element).attr("id");

                    if (id === 'customer') {
                        let customer = $('#customer').parent();
                        error.insertAfter(customer)
                    } else {
                        error.insertAfter(element)
                    }
                },
                submitHandler: form => {
                    $.ajax({
                        url: `${BASE_URL}api/payment/add`,
                        type: 'POST',
                        dataType: 'JSON',
                        data: $(form).serialize(),
                        beforeSend: xhr => {
                            xhr.setRequestHeader("X-SIPF-KEY", TOKEN)
                            xhr.setRequestHeader("Authorization", "Basic " + btoa(USERNAME + ":" + PASSWORD))
                            $(card).block({
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
                            location.hash = '#/payment'
                        },
                        error: err => {
                            const { error } = err.responseJSON
                            toastr.error(error, 'Gagal')
                        },
                        complete: () => {
                            $(card).unblock()
                        }
                    })
                }
            })
        }

        return {
            init: () => {
                submitAdd()
            }
        }
    })()

    addPaymentController.init();
})