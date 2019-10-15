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

    const addPoController = (() => {$()
        const {form, card } = DOM

        const submitAdd = () => {
            $(form).validate({
                rules: {
                    no_po: 'required',
                    customer: 'required',
                    file_po: 'required',
                    total_po: 'required',
                    total_fee: 'required',
                    marketing: 'required'
                },
                messages: {
                    no_po: 'No PO harus diisi',
                    customer: 'Customer harus dipilih',
                    file_po: 'File harus dipilih',
                    total_po: 'Total PO harus diisi',
                    total_fee: 'Total Fee harus diisi',
                    marketing: 'Marketing harus diisi'
                },
                errorPlacement: function (error, element) {
                    let id = $(element).attr("id");

                    if(id === 'customer'){
                        let customer = $('#customer').parent();
                        error.insertAfter(customer)
                    } else {
                        error.insertAfter(element)
                    }
                },
                submitHandler: form => {
                    $.ajax({
                        url: `${BASE_URL}api/purchase_order/add`,
                        type: 'POST',
                        dataType: 'JSON',
                        data: new FormData(form),
                        contentType: false,
                        processData: false,
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
                            location.hash = '#/purchase_order'
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

    addPoController.init();
})