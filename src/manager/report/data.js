console.log('Data Report is running...')

$(function(){

    const DOM = {
        form: '#form_report',
        card: '#card_report',
        container: {
            report: '#report_container',
            action: '#action_container'
        },
        button: {
            print: '#btn_print'
        },
        input: {
            bulan: '#bulan',
            tahun: '#tahun'
        },
        report: '#report'
    }

    const reportUI = (() => {
        const {container, input} = DOM

        return {
            renderReport: (data) => {

                console.log(data);

                const list_bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
                const bulan = $(input.bulan).val();
                const tahun = $(input.tahun).val();
                let no = 1;

                let html = `
                    <div class="card card-body printableArea" id="report">
                        <h3><b>Laporan Fee Periode</b> <span class="pull-right">${list_bulan[bulan - 1]} ${tahun}</span></h3>
                            <hr>
                            <div class="row">
                                <div class="col-md-12">
                                    <table class="w-100">
                                        <tr>
                                            <td>
                                                <div class="pull-left">
                                                    <address>
                                                        <h3> &nbsp;<b class="text-danger">
                                                            <img src="${BASE_URL}assets/sipf_image/logo_1.png" alt="logo" />
                                                        </b></h3>
                                                        <p class="text-muted ml-1">Jl. Siantar No. 18 RT. 4 / RW. 2 Cideng,
                                                            <br/> Kec. Gambir, Kota Jakarta Pusat, DKI Jakarta,
                                                            <br/> (021) 3505050,
                                                            <br/> uti@gmail.co.id</p>
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
                                                    <th>Nama</th>
                                                    <th>Perusahaan</th>
                                                    <th>Marketing</th>
                                                    <th class="text-right">Jumlah PO</th>
                                                    <th class="text-right">Total PO</th>
                                                    <th class="text-right">Total Fee</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                `;

                const filteredData = data.filter(v => parseInt(v.count_total_po) !== 0);

                if(filteredData.length > 0){
                    filteredData.map(v => {
                        html += `
                            <tr>
                                <td>${no++}</td>
                                <td>${v.customer.nama_pic}</td>
                                <td>${v.customer.nama_perusahaan}</td>
                                <td>${v.nama_marketing}</td>
                                <td class="text-right">${v.count_total_po}</td>
                                <td class="text-right">Rp. ${parseInt(v.grand_total_po).toLocaleString(['ban', 'id'])}</td>
                                <td class="text-right">Rp. ${parseInt(v.grand_total_fee).toLocaleString(['ban', 'id'])}</td>
                            </tr>
                        `
                    })
                } else {
                    html += `
                            <tr>
                                <td colspan="6"><div class="text-center">Data tidak tersedia</div></td>
                            </tr>
                        `
                }
                

                const totalFee = filteredData.reduce((a, b) => {
                    return a + parseInt(b.grand_total_fee)
                }, 0)

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
                                                    Disetujui oleh,
                                                    <br/>
                                                    <br/>
                                                    <br/>
                                                    <br/>
                                                    <br/>
                                                    <br/>
                                                    <br/>
                                                    ( ................................................................... )
                                                </div>
                                            </td>
                                            <td>
                                                <div class="pull-right mt-4 text-right">
                                                    <h3><b>Grand Total Fee:</b> RP. ${totalFee.toLocaleString(['ban', 'id'])}</h3>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                    </div>
                `;

                $(container.report).html(html)
            },
            renderAction: () => {
                let html = '<button class="btn btn-block btn-info btn-md" id="btn_print"><i class="fa fa-print"></i> Print</button>'

                $(container.action).html(html)
            },
            renderNoData: () => {
                let html = 'Data tidak ditemukan';

                $(container.report).html(html)
            }
        }
    })()

    const reportController = ((UI) => {
        const {form, card, button, report, container} = DOM

        const submitReport = () => {
            $(form).validate({
                rules: {
                    bulan: 'required',
                    tahun: 'required'
                },
                messages: {
                    bulan: 'Silahkan pilih Bulan',
                    tahun: 'Silahkan pilih Tahun'
                },
                submitHandler: form => {
                    $.ajax({
                        url: `${BASE_URL}api/report/fee`,
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
                        success: ({ data }) => {
                            console.log(data);
                            if(data.length !== 0){
                                UI.renderReport(data)
                                UI.renderAction()
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
            })
        }

        const printReport = () => {
            $(container.action).on('click', button.print, function () {
                var mode = 'iframe'; //popup
                var close = mode == "popup";
                var options = {
                    mode: mode,
                    popClose: close
                };
                $(report).printArea(options);

                
            })
        }

        return {
            init: () => {
                submitReport()
                printReport()
            }
        }
    })(reportUI)

    reportController.init()
})