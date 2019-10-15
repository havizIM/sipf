<div class="page-breadcrumb">
    <div class="row">
        <div class="col-5 align-self-center">
            <h4 class="page-title">Customer</h4>
            <div class="d-flex align-items-center">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#/dashboard">Dashboard</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Customer</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="col-7 align-self-center text-right">
            <button class="btn btn-md btn-info btn_add"><i class="fa fa-plus"></i> Tambah</button>
        </div>
    </div>
</div>

<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover table-stripped" id="t_customer">
                            <thead>
                                <tr>
                                    <th>ID Customer</th>
                                    <th>Nama Perusahaan</th>
                                    <th>Nama PIC</th>
                                    <th>Email</th>
                                    <th>Telepon</th>
                                    <th>Bank</th>
                                    <th>Cabang</th>
                                    <th>No Rekening</th>
                                    <th>Tgl Input</th>
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

<form id="form_add">
    <div id="modal_add" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="vcenter" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="vcenter">Tambah Customer</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="">Nama Perusahaan</label>
                        <input type="text" class="form-control" id="nama_perusahaan" name="nama_perusahaan">
                    </div>
                    <div class="form-group">
                        <label for="">PIC</label>
                        <input type="text" class="form-control" id="nama_pic" name="nama_pic">
                    </div>
                    <div class="form-group">
                        <label for="">Email</label>
                        <input type="text" class="form-control" id="email" name="email">
                    </div>
                    <div class="form-group">
                        <label for="">Telepon</label>
                        <input type="number" class="form-control" id="telepon" name="telepon">
                    </div>
                    <div class="form-group">
                        <label for="">Bank</label>
                        <input type="text" class="form-control" id="bank" name="bank">
                    </div>
                    <div class="form-group">
                        <label for="">Cabang</label>
                        <input type="text" class="form-control" id="cabang" name="cabang">
                    </div>
                    <div class="form-group">
                        <label for="">No Rekening</label>
                        <input type="number" class="form-control" id="no_rekening" name="no_rekening">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Batal</button>
                    <button type="submit" class="btn btn-info waves-effect">Simpan</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
</form>

<form id="form_edit">
    <div id="modal_edit" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="vcenter" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="vcenter">Edit Customer</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="">ID Customer</label>
                        <input type="text" class="form-control" id="edit_id_customer" name="id_customer" readonly>
                    </div>
                    <div class="form-group">
                        <label for="">Nama Perusahaan</label>
                        <input type="text" class="form-control" id="edit_nama_perusahaan" name="nama_perusahaan">
                    </div>
                    <div class="form-group">
                        <label for="">PIC</label>
                        <input type="text" class="form-control" id="edit_nama_pic" name="nama_pic">
                    </div>
                    <div class="form-group">
                        <label for="">Email</label>
                        <input type="text" class="form-control" id="edit_email" name="email">
                    </div>
                    <div class="form-group">
                        <label for="">Telepon</label>
                        <input type="number" class="form-control" id="edit_telepon" name="telepon">
                    </div>
                    <div class="form-group">
                        <label for="">Bank</label>
                        <input type="text" class="form-control" id="edit_bank" name="bank">
                    </div>
                    <div class="form-group">
                        <label for="">Cabang</label>
                        <input type="text" class="form-control" id="edit_cabang" name="cabang">
                    </div>
                    <div class="form-group">
                        <label for="">No Rekening</label>
                        <input type="number" class="form-control" id="edit_no_rekening" name="no_rekening">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Batal</button>
                    <button type="submit" class="btn btn-success waves-effect">Edit</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
</form>

<form id="form_delete">
    <div id="modal_delete" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="vcenter" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="vcenter">Hapus Customer</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="">ID Customer</label>
                        <input type="text" class="form-control" id="delete_id_customer" name="id_customer" readonly>
                    </div>
                    <div class="form-group">
                        <label for="">Nama PIC</label>
                        <input type="text" class="form-control" id="delete_nama_pic" name="nama_pic" readonly>
                    </div>
                    Apakah anda yakin menghapus Customer ini?
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
    Made with <i class="fa fa-heart text-danger"></i> by Siti Chadijah.
</footer>

<script type="text/javascript">
    $.getScript(`${BASE_URL}src/admin/customer/data.js`)
</script>