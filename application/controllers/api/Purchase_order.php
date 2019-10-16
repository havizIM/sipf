<?php
use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class Purchase_order extends CI_Controller {

    use REST_Controller {
        REST_Controller::__construct as private __resTraitConstruct;
    } 

    function __construct()
    {
        parent::__construct();
        $this->__resTraitConstruct();

        $this->token    = $this->input->get_request_header('X-SIPF-KEY', TRUE);
        $this->auth     = AUTHORIZATION::validateToken($this->token);

        $this->load->model('PurchaseOrderModel');
        $this->load->model('CustomerModel');
        $this->load->model('PaymentDetailModel');
    }

    public function index_get()
    {
        if(!$this->auth){
            $this->response(['status' => false, 'error' => 'Invalid Token'], 400);
        } else {
            
            $where = array(
                'a.no_po' => $this->get('no_po'),
                'a.id_customer' => $this->get('id_customer')
            );

            $po   = $this->PurchaseOrderModel->fetch($where)->result();
            $data   = array();

            foreach($po as $key){
                $json = array();

                $json['no_po'] = $key->no_po;
                $json['customer'] = array(
                    'id_customer' => $key->id_customer,
                    'nama_perusahaan' => $key->nama_perusahaan,
                    'nama_pic' => $key->nama_pic,
                    'email' => $key->email,
                    'telepon' => $key->telepon,
                    'bank' => $key->bank,
                    'cabang' => $key->cabang,
                    'no_rekening' => $key->no_rekening
                );
                $json['user'] = array(
                    'id_user' => $key->id_user,
                    'nama_lengkap' => $key->nama_lengkap
                );
                $json['file_po'] = base_url().'doc/po/'.$key->file_po;
                $json['total_po'] = $key->total_po;
                $json['total_fee'] = $key->total_fee;
                $json['tgl_input_po'] = $key->tgl_input_po;
                $json['marketing'] = $key->marketing;
                $json['approve'] = $key->approve;
                $json['payment'] = null;

                $where2 = array('a.no_po' => $key->no_po);
                $payment = $this->PaymentDetailModel->fetch($where2)->result();

                foreach($payment as $key2){
                    $json_b['no_payment'] = $key2->no_payment;
                    $json_b['jml_dibayar'] = $key2->jml_dibayar;
                    
                    $json['payment'][] = $json_b;
                }

                $data[] = $json;
            }

            $this->response(['status' => true, 'message' => 'Berhasil menampilkan purchase order', 'data' => $data], 200);
        }
    }

    public function statistic_get()
    {
        if(!$this->auth){
            $this->response(['status' => false, 'error' => 'Invalid Token'], 400);
        } else {
            
            $tahun = date('Y');

            $jml_po = array("0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");
            $total_fee = array("0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");

            $po   = $this->PurchaseOrderModel->statistic($tahun)->result();

            foreach($po as $key){
                $index = $key->bulan - 1;

                $jml_po[$index]   = $key->jml_po;
                $total_fee[$index] = $key->total_fee;
            }

            $data = array(
                'jumlah_po' => $jml_po,
                'total_fee' => $total_fee
            );

            $this->response(['status' => true, 'message' => 'Berhasil menampilkan statistic fee', 'data' => $data], 200);
        }
    }

    public function add_post()
    {
        if(!$this->auth){
            $this->response(['status' => false, 'error' => 'Invalid Token'], 400);
        } else {
            $otorisasi  = $this->auth;

            $config = array(
                array(
                    'field' => 'no_po',
                    'label' => 'No PO',
                    'rules' => 'required|trim|is_unique[purchase_order.no_po]'
                ),
                array(
                    'field' => 'id_customer',
                    'label' => 'Customer',
                    'rules' => 'required|trim|callback_cek_customer'
                ),
                array(
                    'field' => 'total_po',
                    'label' => 'Total PO',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'total_fee',
                    'label' => 'Total Fee',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'marketing',
                    'label' => 'Marketing',
                    'rules' => 'required|trim'
                )
            );

            $this->form_validation->set_data($this->post());
            $this->form_validation->set_rules($config);

            if(!$this->form_validation->run()){
                $this->response(['status' => false, 'error' => $this->form_validation->error_array()], 400);
            } else {

                $data = array(
                    'no_po' => $this->post('no_po'),
                    'id_customer' => $this->post('id_customer'),
                    'id_user' => $this->auth->id_user,
                    'file_po' => $this->upload_file('file_po', $this->post('no_po')),
                    'total_po' => $this->post('total_po'),
                    'total_fee' => $this->post('total_fee'),
                    'marketing' => $this->post('marketing')
                );

                $log = array(
                    'id_user' => $this->auth->id_user,
                    'referensi' => 'PO',
                    'deskripsi' => 'Menambahkan PO baru'
                );

                $add = $this->PurchaseOrderModel->add($data, $log);

                if(!$add){
                    $this->response(['status' => false, 'message' => 'Gagal menambahkan purchase order'], 500);
                } else {
                    $this->response(['status' => true, 'message' => 'Berhasil menambahkan purchase order'], 200);
                }
            }
        } 
    }

    public function edit_post()
    {
        if(!$this->auth){
            $this->response(['status' => false, 'error' => 'Invalid Token'], 400);
        } else {
            $otorisasi  = $this->auth;

            $config = array(
                array(
                    'field' => 'no_po',
                    'label' => 'No PO',
                    'rules' => 'required|trim|callback_cek_po'
                ),
                array(
                    'field' => 'id_customer',
                    'label' => 'Customer',
                    'rules' => 'required|trim|callback_cek_customer'
                ),
                array(
                    'field' => 'total_po',
                    'label' => 'Total PO',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'total_fee',
                    'label' => 'Total Fee',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'marketing',
                    'label' => 'Marketing',
                    'rules' => 'required|trim'
                )
            );

            $this->form_validation->set_data($this->post());
            $this->form_validation->set_rules($config);

            if(!$this->form_validation->run()){
                $this->response(['status' => false, 'error' => $this->form_validation->error_array()], 400);
            } else {
                $where  = array(
                    'no_po'   => $this->post('no_po') 
                );

                $data = array(
                    'id_customer' => $this->post('id_customer'),
                    'id_user' => $this->auth->id_user,
                    'total_po' => $this->post('total_po'),
                    'total_fee' => $this->post('total_fee'),
                    'marketing' => $this->post('marketing')
                );

                $file = $this->upload_file('file_po', $this->post('no_po'));

                if($file != null){
                    $data['file_po'] = $file;
                }

                $log = array(
                    'id_user' => $this->auth->id_user,
                    'referensi' => 'PO',
                    'deskripsi' => 'Mengedit purchase order'
                );

                $edit = $this->PurchaseOrderModel->edit($where, $data, $log);

                if(!$edit){
                    $this->response(['status' => false, 'message' => 'Gagal mengedit purchase order'], 500);
                } else {
                    $this->response(['status' => true, 'message' => 'Berhasil mengedit purchase order'], 200);
                }
            }
        } 
    }

    public function approve_put()
    {
        if(!$this->auth){
            $this->response(['status' => false, 'error' => 'Invalid Token'], 400);
        } else {
            $otorisasi  = $this->auth;

            $config = array(
                array(
                    'field' => 'no_po',
                    'label' => 'No PO',
                    'rules' => 'required|trim|callback_cek_po'
                )
            );

            $this->form_validation->set_data($this->put());
            $this->form_validation->set_rules($config);

            if(!$this->form_validation->run()){
                $this->response(['status' => false, 'error' => $this->form_validation->error_array()], 400);
            } else {
                $where  = array(
                    'no_po'   => $this->put('no_po') 
                );

                $data = array(
                    'approve' => 'Y'
                );

                $log = array(
                    'id_user' => $this->auth->id_user,
                    'referensi' => 'PO',
                    'deskripsi' => 'Approve purchase order'
                );

                $edit = $this->PurchaseOrderModel->edit($where, $data, $log);

                if(!$edit){
                    $this->response(['status' => false, 'message' => 'Gagal approve purchase order'], 500);
                } else {
                    $this->response(['status' => true, 'message' => 'Berhasil approve purchase order'], 200);
                }
            }
        } 
    }

    public function delete_delete()
    {
        if(!$this->auth){
            $this->response(['status' => false, 'error' => 'Invalid Token'], 400);
        } else {
            $otorisasi  = $this->auth;

            $config = array(
                array(
                    'field' => 'no_po',
                    'label' => 'No PO',
                    'rules' => 'required|trim|callback_cek_po'
                )
            );

            $this->form_validation->set_data($this->delete());
            $this->form_validation->set_rules($config);

            if(!$this->form_validation->run()){
                $this->response(['status' => false, 'error' => $this->form_validation->error_array()], 400);
            } else {
                $where  = array(
                    'no_po'   => $this->delete('no_po') 
                );

                $log = array(
                    'id_user' => $this->auth->id_user,
                    'referensi' => 'PO',
                    'deskripsi' => 'Menghapus purchase order'
                );

                $delete = $this->PurchaseOrderModel->delete($where, $log);

                if(!$delete){
                    $this->response(['status' => false, 'message' => 'Gagal menghapus purchase order'], 500);
                } else {
                    $this->response(['status' => true, 'message' => 'Berhasil menghapus purchase order'], 200);
                }
            }
        } 
    }

    function cek_po($id){
         $where = array(
            'no_po' => $id
        );

        $cek   = $this->PurchaseOrderModel->fetch($where)->num_rows();

        if ($cek == 0){
            $this->form_validation->set_message('cek_po', 'No PO tidak ditemukan');
            return FALSE;
        } else {
            return TRUE;
        }
    }

    function cek_customer($id){
         $where = array(
            'id_customer' => $id
        );

        $cek   = $this->CustomerModel->fetch($where)->num_rows();

        if ($cek == 0){
            $this->form_validation->set_message('cek_customer', 'ID Customer tidak ditemukan');
            return FALSE;
        } else {
            return TRUE;
        }
    }

    function upload_file($name, $id)
    {
        if(isset($_FILES[$name]) && $_FILES[$name]['name'] != ""){

        $config['upload_path']   = './doc/po/';
        $config['allowed_types'] = 'jpg|jpeg|png|pdf|doc|docx';
        $config['overwrite']     = TRUE;
        $config['max_size']      = '3048';
        $config['remove_space']  = TRUE;
        $config['encrypt_name'] = TRUE;

        $this->load->library('upload', $config);
        $this->upload->initialize($config);

        if(!$this->upload->do_upload($name)){
            return null;
        } else {
            $file = $this->upload->data();
            return $file['file_name'];
        }
        } else {
            return null;
        }
    }

}
