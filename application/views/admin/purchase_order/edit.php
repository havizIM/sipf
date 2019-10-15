<div class="page-breadcrumb">
    <div class="row">
        <div class="col-5 align-self-center">
            <h4 class="page-title">Edit Purchase Order</h4>
            <div class="d-flex align-items-center">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#/dashboard">Dashboard</a></li>
                        <li class="breadcrumb-item"><a href="#/purchase_order">Purchase Order</a></li>
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
                    <form id="form_edit" enctype="multipart/form-data">
                        <div class="form-group">
                            <label for="">No PO</label>
                            <input type="text" class="form-control" name="no_po" id="no_po" readonly>
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
                            <label for="">File PO</label>
                            <input type="file" class="form-control" name="file_po" id="file_po">
                        </div>
                        <div class="form-group">
                            <label for="">Total PO</label>
                            <input type="number" class="form-control" name="total_po" id="total_po">
                        </div>
                        <div class="form-group">
                            <label for="">Total Fee</label>
                            <input type="number" class="form-control" name="total_fee" id="total_fee" readonly>
                        </div>
                        <div class="form-group">
                            <label for="">Marketing</label>
                            <input type="text" class="form-control" name="marketing" id="marketing">
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

<footer class="footer text-center">
    Made with <i class="fa fa-heart text-danger"></i> by Siti Chadijah.
</footer>

<script type="text/javascript">
    $.getScript(`${BASE_URL}src/admin/purchase_order/lookup.js`)
    $.getScript(`${BASE_URL}src/admin/purchase_order/edit.js`)
</script>