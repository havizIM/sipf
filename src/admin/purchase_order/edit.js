console.log('Edit PO is running...')

$(function () {
    const DOM = {
        form: '#form_edit',
        card: '#card_edit',
        input: {
            no_po: '#no_po',
            id_customer: '#id_customer',
            customer: '#customer',
            file_po: '#file_po',
            total_po: '#total_po',
            total_fee: '#total_fee',
            marketing: '#marketing'
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

    const editPoController = (() => {
        const { form, card, input } = DOM
        
        const fetchPo = () => {
            const id = location.hash.substr(22)

            $.ajax({
                url: `${BASE_URL}api/purchase_order`,
                data: { no_po: id },
                type: 'GET',
                dataType: 'JSON',
                beforeSend: xhr => {
                    xhr.setRequestHeader("X-SIPF-KEY", TOKEN)
                    xhr.setRequestHeader("Authorization", "Basic " + btoa(USERNAME + ":" + PASSWORD))
                },
                success: ({ data }) => {
                    if (data.length === 1) {
                        data.map(v => {
                            $(input.no_po).val(v.no_po)
                            $(input.id_customer).val(v.customer.id_customer)
                            $(input.customer).val(`${v.customer.id_customer} - ${v.customer.nama_perusahaan}`)
                            $(input.total_po).val(v.total_po)
                            $(input.total_fee).val(v.total_fee)
                            $(input.marketing).val(v.marketing)
                        })
                    }
                },
                error: err => {
                    const { error } = err.responseJSON
                    toastr.error(error, 'Gagal')
                }
            })
        }

        const submitEdit = () => {
            $(form).validate({
                rules: {
                    no_po: 'required',
                    customer: 'required',
                    total_po: 'required',
                    total_fee: 'required',
                    marketing: 'required'
                },
                messages: {
                    no_po: 'No PO harus diisi',
                    customer: 'Customer harus dipilih',
                    total_po: 'Total PO harus diisi',
                    total_fee: 'Total Fee harus diisi',
                    marketing: 'Marketing harus diisi'
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
                        url: `${BASE_URL}api/purchase_order/edit`,
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
                submitEdit()
                fetchPo()
            }
        }
    })()

    editPoController.init();
})