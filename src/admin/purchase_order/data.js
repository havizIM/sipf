console.log('Data PO is running...')

$(function () {
    const DOM = {
        table: '#t_po',
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
            no_po: '#no_po',
            nama_pic: '#nama_pic'
        },
        link: {
            file: '.link_file'
        },
        image: {
            href: '.file_po_href',
            src: '.file_po_src',
            id: '.id_po'
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
                return res.data
            },
            error: err => {

            }
        },
        columns: [
            {
                data: null, render: (data, type, row) => {
                    return `
                        <a href="javascript:void(0)" class="link_file" data-src="${row.file_po}" data-id="${row.no_po}">${row.no_po}</a>
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
            },
            {
                data: null, render: (data, type, row) => {
                    if(row.approve === 'T'){
                        return `
                            <div class="btn-group">
                                <a href="#/purchase_order/edit/${row.no_po}" class="btn btn-success btn-sm btn_edit"><i class="fa fa-edit"></i> Edit</a>	
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

        const {table, form, modal, button, input, link, image} = DOM

        const fetchPo = (id, callback) => {
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
                let no_po = $(this).data('id')

                fetchPo(no_po, data => {
                    if (data.length === 1) {
                        data.map(v => {
                            $(input.no_po).val(v.no_po)
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
                    no_po: 'required',
                    nama_pic: 'required',
                },
                messages: {
                    no_po: 'No PO harus diisi',
                    nama_pic: 'Nama PIC harus diisi',
                },
                submitHandler: form => {
                    $.ajax({
                        url: `${BASE_URL}api/purchase_order/delete`,
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
                            tablePo.ajax.reload()
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

        const openFile = () => {
            $(table).on('click', link.file, function() {
                let path = $(this).data('src')
                let id = $(this).data('id')

                $(image.id).text(`#${id}`)
                $(image.href).attr('href', path)
                $(image.src).attr('src', path)
                $(modal.file).modal('show')
            })
        }

        return {
            init: () => {
                deletePo();
                openFile();
                submitDelete();
            }
        }
    })()

    PoController.init();
})