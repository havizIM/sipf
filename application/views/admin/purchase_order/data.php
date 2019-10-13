<div class="page-breadcrumb">
    <div class="row">
        <div class="col-5 align-self-center">
            <h4 class="page-title">Purchase Order</h4>
            <div class="d-flex align-items-center">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#/dashboard">Dashboard</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Purchase Order</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="col-7 align-self-center text-right">
            <a href="#/purchase_order/add" class="btn btn-md btn-info btn_add"><i class="fa fa-plus"></i> Tambah</a>
        </div>
    </div>
</div>

<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover table-stripped" id="t_po">
                            <thead>
                                <tr>
                                    <th>No PO</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Fee</th>
                                    <th>Marketing</th>
                                    <th>Status</th>
                                    <th>File PO</th>
                                    <th>User</th>
                                    <th>Tgl PO</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<form id="form_delete">
    <div id="modal_delete" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="vcenter" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="vcenter">Hapus PO</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="">No PO</label>
                        <input type="text" class="form-control" id="no_po" name="no_po" readonly>
                    </div>
                    <div class="form-group">
                        <label for="">Nama PIC</label>
                        <input type="text" class="form-control" id="nama_pic" name="nama_pic" readonly>
                    </div>
                    Apakah anda yakin menghapus PO ini?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Tidak</button>
                    <button type="submit" class="btn btn-success waves-effect">Ya</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
</form>

<footer class="footer text-center">
    All Rights Reserved by Xtreme admin. Designed and Developed by <a href="https://wrappixel.com">WrapPixel</a>.
</footer>

<script type="text/javascript">
    $.getScript(`${BASE_URL}src/admin/purchase_order/data.js`)
</script>