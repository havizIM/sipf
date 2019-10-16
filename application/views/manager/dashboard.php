<div class="row">
    <div class="col-md-12">
        <div class="alert alert-info">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span></button>
            <h3 class="text-info"><i class="fa fa-exclamation-circle"></i> Selamat Datang</h3>
            Anda telah login sebagai <b>Manager</b> <br/><br/>
            Akses yang anda dapatkan adalah : 
            <ol>
                <li>Melihat dan melakukan approval atas Purchase Order yang tersedia</li>
                <li>Mengelola Data User</li>
                <li>Melihat Report Komisi/Fee perbulan</li>
            </ol>
        </div>
    </div>
</div>

<div class="container-fluid">
    <div class="row">
        <div class="col-lg-6 col-md-6">
            <div class="card bg-info">
                <div class="card-body">
                    <div class="d-flex no-block align-items-center">
                        <div class="text-white">
                            <h2 id="count_user"><i class="fa fa-spin fa-spinner"></i></h2>
                            <h6>User</h6>
                        </div>
                        <div class="ml-auto">
                            <span class="text-white display-6"><i class="fa fa-user"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-md-6">
            <div class="card bg-cyan">
                <div class="card-body">
                    <div class="d-flex no-block align-items-center">
                        <div class="text-white">
                            <h2 id="count_po"><i class="fa fa-spin fa-spinner"></i></h2>
                            <h6>Purchase Order</h6>
                        </div>
                        <div class="ml-auto">
                            <span class="text-white display-6"><i class="ti-clipboard"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">Purchase Order</h3>
                    <canvas id="po_doughnut" height="200"></canvas>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">User</h3>
                    <canvas id="user_pie" height="200"></canvas>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">Fee Growth</h3>
                    <canvas id="po_line" height="250"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>

<br><br><br>

<footer class="footer text-center">
    Made with <i class="fa fa-heart text-danger"></i> by Siti Chadijah.
</footer>

<script type="text/javascript">
    $.getScript(`${BASE_URL}src/manager/dashboard.js`)
</script>