<?php
use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class Payment extends CI_Controller {

    use REST_Controller {
        REST_Controller::__construct as private __resTraitConstruct;
    } 

    function __construct()
    {
        parent::__construct();
        $this->__resTraitConstruct();

        $this->token    = $this->input->get_request_header('X-SIPF-KEY', TRUE);
        $this->auth     = AUTHORIZATION::validateToken($this->token);

        $this->load->model('PaymentModel');
        $this->load->model('CustomerModel');
        $this->load->model('PaymentDetailModel');
    }

    public function index_get()
    {
        if(!$this->auth){
            $this->response(['status' => false, 'error' => 'Invalid Token'], 400);
        } else {
            
            $where = array(
                'a.no_payment' => $this->get('no_payment')
            );

            $payment   = $this->PaymentModel->fetch($where)->result();
            $data   = array();

            foreach($payment as $key){
                $json = array();

                $json['no_payment'] = $key->no_payment;
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
                $json['total_bayar'] = $key->total_bayar;
                $json['tgl_payment'] = $key->tgl_payment;
                $json['tgl_input_payment'] = $key->tgl_input_payment;
                $json['detail'] = null;

                $where2 = array('a.no_payment' => $key->no_payment);
                $detail = $this->PaymentDetailModel->fetch($where2)->result();

                foreach($detail as $key2){
                    $json_b = array();

                    $json_b['no_po'] = $key2->no_po;
                    $json_b['total_po'] = $key2->total_po;
                    $json_b['total_fee'] = $key2->total_fee;
                    $json_b['marketing'] = $key2->marketing;
                    $json_b['tgl_input_po'] = $key2->tgl_input_po;
                    $json_b['jml_dibayar'] = $key2->jml_dibayar;
                    
                    $json['detail'][] = $json_b;
                }

                $data[] = $json;
            }

            $this->response(['status' => true, 'message' => 'Berhasil menampilkan payment', 'data' => $data], 200);
        }
    }

    public function statistic_get()
    {
        if(!$this->auth){
            $this->response(['status' => false, 'error' => 'Invalid Token'], 400);
        } else {
            
            $tahun = date('Y');

            $jml_payment = array("0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");
            $total_payment = array("0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");

            $payment   = $this->PaymentModel->statistic($tahun)->result();

            foreach($payment as $key){
                $index = $key->bulan - 1;

                $jml_payment[$index]   = $key->jml_payment;
                $total_payment[$index] = $key->total_payment;
            }

            $data = array(
                'jml_payment' => $jml_payment,
                'total_payment' => $total_payment
            );

            $this->response(['status' => true, 'message' => 'Berhasil menampilkan statistic payment', 'data' => $data], 200);
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
                    'field' => 'id_customer',
                    'label' => 'Customer',
                    'rules' => 'required|trim|callback_cek_customer'
                ),
                array(
                    'field' => 'tgl_payment',
                    'label' => 'Tgl Payment',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'total_bayar',
                    'label' => 'Total Bayar',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'no_po[]',
                    'label' => 'No Purchase Order',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'jml_dibayar[]',
                    'label' => 'Jumlah Dibayar',
                    'rules' => 'required|trim'
                )
            );

            $this->form_validation->set_data($this->post());
            $this->form_validation->set_rules($config);

            if(!$this->form_validation->run()){
                $this->response(['status' => false, 'error' => $this->form_validation->error_array()], 400);
            } else {
                $post = $this->post();
                $no_payment = $this->KodeModel->buat_kode('payment', 'PY-'.date('my').'-', 'no_payment', 3);

                $data = array(
                    'no_payment' => $no_payment,
                    'id_customer' => $this->post('id_customer'),
                    'id_user' => $this->auth->id_user,
                    'tgl_payment' => $this->post('tgl_payment'),
                    'total_bayar' => $this->post('total_bayar')
                );

                $detail  = array();
                foreach($post['no_po'] as $key => $val){
                    $detail[] = array(
                        'no_payment' => $no_payment,
                        'no_po' => $post['no_po'][$key],
                        'jml_dibayar' => $post['jml_dibayar'][$key]
                    );
                }

                $log = array(
                    'id_user' => $this->auth->id_user,
                    'referensi' => 'Payment',
                    'deskripsi' => 'Menambahkan Payment baru'
                );

                $add = $this->PaymentModel->add($data, $detail, $log);

                if(!$add){
                    $this->response(['status' => false, 'message' => 'Gagal menambahkan payment'], 500);
                } else {
                    $this->response(['status' => true, 'message' => 'Berhasil menambahkan payment'], 200);
                }
            }
        } 
    }

    public function edit_put()
    {
        if(!$this->auth){
            $this->response(['status' => false, 'error' => 'Invalid Token'], 400);
        } else {
            $otorisasi  = $this->auth;

            $config = array(
                array(
                    'field' => 'no_payment',
                    'label' => 'No Payment',
                    'rules' => 'required|trim|callback_cek_payment'
                ),
                array(
                    'field' => 'id_customer',
                    'label' => 'Customer',
                    'rules' => 'required|trim|callback_cek_customer'
                ),
                array(
                    'field' => 'tgl_payment',
                    'label' => 'Tgl Payment',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'total_bayar',
                    'label' => 'Total Bayar',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'no_po[]',
                    'label' => 'No Purchase Order',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'jml_dibayar[]',
                    'label' => 'Jumlah Dibayar',
                    'rules' => 'required|trim'
                )
            );

            $this->form_validation->set_data($this->put());
            $this->form_validation->set_rules($config);

            if(!$this->form_validation->run()){
                $this->response(['status' => false, 'error' => $this->form_validation->error_array()], 400);
            } else {
                $put = $this->put();

                $where = array(
                    'no_payment' => $this->put('no_payment')
                );

                $data = array(
                    'id_customer' => $this->put('id_customer'),
                    'id_user' => $this->auth->id_user,
                    'tgl_payment' => $this->put('tgl_payment'),
                    'total_bayar' => $this->put('total_bayar')
                );

                $detail  = array();
                foreach($put['no_po'] as $key => $val){
                    $detail[] = array(
                        'no_payment' => $this->put('no_payment'),
                        'no_po' => $put['no_po'][$key],
                        'jml_dibayar' => $put['jml_dibayar'][$key]
                    );
                }

                $log = array(
                    'id_user' => $this->auth->id_user,
                    'referensi' => 'Payment',
                    'deskripsi' => 'Mengedit Payment baru'
                );

                $update = $this->PaymentModel->edit($where, $data, $detail, $log);

                if(!$update){
                    $this->response(['status' => false, 'message' => 'Gagal mengedit payment'], 500);
                } else {
                    $this->response(['status' => true, 'message' => 'Berhasil mengedit payment'], 200);
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
                    'field' => 'no_payment',
                    'label' => 'No Payment',
                    'rules' => 'required|trim|callback_cek_payment'
                )
            );

            $this->form_validation->set_data($this->delete());
            $this->form_validation->set_rules($config);

            if(!$this->form_validation->run()){
                $this->response(['status' => false, 'error' => $this->form_validation->error_array()], 400);
            } else {
                $where  = array(
                    'no_payment'   => $this->delete('no_payment') 
                );

                $log = array(
                    'id_user' => $this->auth->id_user,
                    'referensi' => 'Payment',
                    'deskripsi' => 'Menghapus payment'
                );

                $delete = $this->PaymentModel->delete($where, $log);

                if(!$delete){
                    $this->response(['status' => false, 'message' => 'Gagal menghapus payment'], 500);
                } else {
                    $this->response(['status' => true, 'message' => 'Berhasil menghapus payment'], 200);
                }
            }
        } 
    }

    function cek_payment($id){
         $where = array(
            'no_payment' => $id
        );

        $cek   = $this->PaymentModel->fetch($where)->num_rows();

        if ($cek == 0){
            $this->form_validation->set_message('cek_payment', 'No Payment tidak ditemukan');
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

}
