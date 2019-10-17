<div class="page-breadcrumb">
    <div class="row">
        <div class="col-5 align-self-center">
            <h4 class="page-title">Edit Payment</h4>
            <div class="d-flex align-items-center">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#/dashboard">Dashboard</a></li>
                        <li class="breadcrumb-item"><a href="#/payment">Payment</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Edit</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="col-7 align-self-center">
            
        </div>
    </div>
</div>

<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <div class="card" id="card_edit">
                <div class="card-body">
                    <form id="form_edit">
                        <div class="form-group">
                            <label for="">No Payment</label>
                            <input type="text" class="form-control" name="no_payment" id="no_payment" readonly>
                        </div>
                        <div class="form-group">
                            <label for="">Customer</label>
                            <div class="input-group">
                                <input type="hidden" name="id_customer" id="id_customer">
                                <input type="text" class="form-control" name="customer" id="customer" readonly>
                                <div class="input-group-append">
                                    <button class="btn btn-info btn_lookup" type="button">Cari</button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="">Nama PIC</label>
                            <input type="text" class="form-control" name="nama_pic" id="nama_pic" readonly>
                        </div>
                        <div class="form-group">
                            <label for="">Bank</label>
                            <input type="text" class="form-control" name="bank" id="bank" readonly>
                        </div>
                        <div class="form-group">
                            <label for="">Cabang</label>
                            <input type="text" class="form-control" name="cabang" id="cabang" readonly>
                        </div>
                        <div class="form-group">
                            <label for="">No Rekening</label>
                            <input type="text" class="form-control" name="no_rekening" id="no_rekening" readonly>
                        </div>
                        <div class="form-group">
                            <label for="">Tanggal Pembayaran</label>
                            <input type="date" class="form-control" name="tgl_payment" id="tgl_payment">
                        </div>
                        <div class="form-group">
                            <label for="">Daftar PO</label>
                            <div class="table-responsive">
                                <table class="table" id="t_detail">
                                    <thead>
                                        <tr>
                                            <th>No PO</th>
                                            <th>Tanggal PO</th>
                                            <th>Total PO</th>
                                            <th>Total Fee</th>
                                            <th><button type="button" class="btn btn-sm btn-info btn_po"><i class="fa fa-plus"></i></button></th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                    <tfoot>
                                        <tr>
                                            <th colspan="3">Total Fee yang harus dibayar</th>
                                            <th colspan="2">
                                                <div class="text-right text-danger" id="container_total_fee">Rp. 0</div>
                                            </th>
                                        </tr>
                                    </tfoot>
                                </table>
                                <input type="hidden" id="total_bayar" name="total_bayar">
                            </div>
                        </div>
                        <button class="btn btn-info btn-block" type="submit">Simpan</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="modal_lookup" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myLargeModalLabel">Cari Customer</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table table-hover table-stripped" id="t_customer">
                        <thead>
                            <tr>
                                <th>Aksi</th>
                                <th>ID Customer</th>
                                <th>Nama Perusahaan</th>
                                <th>Nama PIC</th>
                                <th>Email</th>
                                <th>Telepon</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<div id="modal_po" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myLargeModalLabel">Cari PO</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table table-hover table-stripped" id="t_po">
                        <thead>
                            <tr>
                                <th>Pilih</th>
                                <th>No PO</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Fee</th>
                                <th>Marketing</th>
                                <th>Status</th>
                                <th>File PO</th>
                                <th>User</th>
                                <th>Tgl PO</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<footer class="footer text-center">
    Made with <i class="fa fa-heart text-danger"></i> by Siti Chadidjah.
</footer>

<script type="text/javascript">
    $.getScript(`${BASE_URL}src/finance/payment/edit.js`)
</script>