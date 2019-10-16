console.log('Detail Payment is running...')

$(function(){

    const DOM = {
        card: '#card_detail',
        action: '#action',
        print: '#print'
    }

    const detailPaymentUI = (() => {
        const { card, action } = DOM

        return {
            renderData: (data) => {
                let html = '';
                let no = 1;

                html += `
                    <h3><b>PAYMENT</b> <span class="pull-right">#${data.no_payment}</span></h3>
                    <hr>
                    <div class="row">
                        <div class="col-md-12">
                            <table class="w-100">
                                <tr>
                                    <td>
                                        <div class="pull-left">
                                            <address>
                                                <h3> &nbsp;<b class="text-danger">
                                                    Logo UTI
                                                </b></h3>
                                                <p class="text-muted ml-1">E 104, Dharti-2,
                                                    <br/> Alamat,
                                                    <br/> Telepon,
                                                    <br/> Email</p>
                                            </address>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="pull-right text-right">
                                            <address>
                                                <h3>Kepada,</h3>
                                                <h4 class="font-bold">${data.customer.nama_pic}</h4>
                                                <p class="text-muted ml-4">${data.customer.nama_perusahaan},
                                                    <br/> ${data.customer.telepon} - ${data.customer.email},
                                                    <br/> ${data.customer.bank} - ${data.customer.no_rekening}
                                                <p class="mt-4"><b>Tgl Dibayar :</b> <i class="fa fa-calendar"></i> ${data.tgl_payment}</p>
                                            </address>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-md-12">
                            <div class="table-responsive mt-5" style="clear: both;">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th class="text-center">#</th>
                                            <th>No PO</th>
                                            <th>Tgl PO</th>
                                            <th class="text-right">Total PO</th>
                                            <th class="text-right">Total Fee</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                `

                data.detail.map(v => {
                    html += `
                        <tr>
                            <td>${no++}</td>
                            <td>${v.no_po}</td>
                            <td>${v.tgl_input_po}</td>
                            <td class="text-right">Rp. ${parseInt(v.total_po).toLocaleString(['ban', 'id'])}</td>
                            <td class="text-right">Rp. ${parseInt(v.total_fee).toLocaleString(['ban', 'id'])}</td>
                        </tr>
                    `
                })

                html += `
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <table class="w-100">
                                <tr>
                                    <td>
                                        <div class="text-left mt-3">
                                            Dibuat oleh,
                                            <br/>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <br/>
                                            ( ${data.user.nama_lengkap} )
                                        </div>
                                    </td>
                                    <td>
                                        <div class="pull-right mt-4 text-right">
                                            <h3><b>Grand Total Fee:</b> RP. ${data.total_bayar}</h3>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                `

                $(card).html(html);
            },
            renderAction: () => {
                let html = '<button class="btn btn-block btn-info btn-md" id="print"><i class="fa fa-print"></i> Print</button>'

                $(action).html(html)
            },
            renderNoData: () => {
                let html = '<div class="text-center"> Data tidak ditemukan </div>'

                $(card).html(html);
            }
        }
    })()

    const detailPaymentController = ((UI) => {

        const no_payment = location.hash.substr(10)

        const {card, print, action} = DOM

        const fetchDetailPayment = () => {
            $.ajax({
                url: `${BASE_URL}api/payment`,
                data: { no_payment: no_payment },
                type: 'GET',
                dataType: 'JSON',
                beforeSend: xhr => {
                    xhr.setRequestHeader("X-SIPF-KEY", TOKEN)
                    xhr.setRequestHeader("Authorization", "Basic " + btoa(USERNAME + ":" + PASSWORD))
                    $(card).block({
                        message: '<i class="fa fa-spinner fa-spin fa-2x"></i>',
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
                success: ({ data }) => {
                    if(data.length === 1){
                        data.map(v => {
                            UI.renderData(v)
                            UI.renderAction()
                        })
                    } else {
                        UI.renderNoData()
                    }
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

        const printDetail = () => {
            $(action).on('click', print, function(){
                var mode = 'iframe'; //popup
                var close = mode == "popup";
                var options = {
                    mode: mode,
                    popClose: close
                };
                $(card).printArea(options);
            })
        }

        return {
            init: () => {
                fetchDetailPayment()
                printDetail()
            }
        }
    })(detailPaymentUI)

    detailPaymentController.init();
})