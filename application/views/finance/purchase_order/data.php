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

<div id="modal_file" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="vcenter" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="vcenter">File PO <b class="id_po"></b></h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
                <a class="file_po_href" target="__blank">
                    <img class="img-fluid file_po_src" />
                </a>
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
    $.getScript(`${BASE_URL}src/finance/purchase_order/data.js`)
</script>