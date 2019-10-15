<div class="page-breadcrumb">
    <div class="row">
        <div class="col-5 align-self-center">
            <h4 class="page-title">User</h4>
            <div class="d-flex align-items-center">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#/dashboard">Dashboard</a></li>
                        <li class="breadcrumb-item active" aria-current="page">User</li>
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
                        <table class="table table-hover table-stripped" id="t_user">
                            <thead>
                                <tr>
                                    <th>ID User</th>
                                    <th>Username</th>
                                    <th>Nama Lengkap</th>
                                    <th>Email</th>
                                    <th>Telepon</th>
                                    <th>Level</th>
                                    <th>Status</th>
                                    <th>Tgl Registrasi</th>
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
                    <h4 class="modal-title" id="vcenter">Tambah User</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="">Nama Lengkap</label>
                        <input type="text" class="form-control" id="nama_lengkap" name="nama_lengkap">
                    </div>
                    <div class="form-group">
                        <label for="">Username</label>
                        <input type="text" class="form-control" id="username" name="username">
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
                        <label for="">Level</label>
                        <select class="form-control" id="level" name="level">
                            <option value="">-</option>
                            <option value="Admin">Admin</option>
                            <option value="Finance">Finance</option>
                            <option value="Manager">Manager</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="">Status</label>
                        <select class="form-control" id="aktif" name="aktif">
                            <option value="">-</option>
                            <option value="Y">Aktif</option>
                            <option value="T">Tidak Aktif</option>
                        </select>
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
                    <h4 class="modal-title" id="vcenter">Edit User</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="">ID User</label>
                        <input type="text" class="form-control" id="edit_id_user" name="id_user" readonly>
                    </div>
                    <div class="form-group">
                        <label for="">Nama Lengkap</label>
                        <input type="text" class="form-control" id="edit_nama_lengkap" name="nama_lengkap">
                    </div>
                    <div class="form-group">
                        <label for="">Username</label>
                        <input type="text" class="form-control" id="edit_username" name="username">
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
                        <label for="">Level</label>
                        <select class="form-control" id="edit_level" name="level">
                            <option value="">-</option>
                            <option value="Admin">Admin</option>
                            <option value="Finance">Finance</option>
                            <option value="Manager">Manager</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="">Status</label>
                        <select class="form-control" id="edit_aktif" name="aktif">
                            <option value="">-</option>
                            <option value="Y">Aktif</option>
                            <option value="T">Tidak Aktif</option>
                        </select>
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
                    <h4 class="modal-title" id="vcenter">Hapus User</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="">ID User</label>
                        <input type="text" class="form-control" id="delete_id_user" name="id_user" readonly>
                    </div>
                    <div class="form-group">
                        <label for="">Nama Lengkap</label>
                        <input type="text" class="form-control" id="delete_nama_lengkap" name="nama_lengkap" readonly>
                    </div>
                    Apakah anda yakin menghapus User ini?
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
    $.getScript(`${BASE_URL}src/manager/user/data.js`)
</script>