<div class="page-breadcrumb">
    <div class="row">
        <div class="col-5 align-self-center">
            <h4 class="page-title">Log</h4>
            <div class="d-flex align-items-center">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#/dashboard">Dashboard</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Log</li>
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
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover table-stripped" id="t_log">
                            <thead>
                                <tr>
                                    <th>ID Log</th>
                                    <th>User</th>
                                    <th>Referensi</th>
                                    <th>Deskripsi</th>
                                    <th>Tanggal</th>
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

<footer class="footer text-center">
    Made with <i class="fa fa-heart text-danger"></i> by Siti Chadijah.
</footer>

<script type="text/javascript">
    $.getScript(`${BASE_URL}src/manager/log/data.js`)
</script>