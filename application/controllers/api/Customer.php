<?php
use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class Customer extends CI_Controller {

    use REST_Controller {
        REST_Controller::__construct as private __resTraitConstruct;
    } 

    function __construct()
    {
        parent::__construct();
        $this->__resTraitConstruct();

        $this->token    = $this->input->get_request_header('X-SIPF-KEY', TRUE);
        $this->auth     = AUTHORIZATION::validateToken($this->token);

        $this->load->model('CustomerModel');
    }

    public function index_get()
    {
        if(!$this->auth){
            $this->response(['status' => false, 'error' => 'Invalid Token'], 400);
        } else {
            
            $where = array(
                'id_customer' => $this->get('id_customer')
            );

            $customer   = $this->CustomerModel->fetch($where)->result();
            $data   = array();

            foreach($customer as $key){
                $json = array();

                $json['id_customer'] = $key->id_customer;
                $json['nama_perusahaan'] = $key->nama_perusahaan;
                $json['nama_pic'] = $key->nama_pic;
                $json['email'] = $key->email;
                $json['telepon'] = $key->telepon;
                $json['bank'] = $key->bank;
                $json['cabang'] = $key->cabang;
                $json['no_rekening'] = $key->no_rekening;
                $json['tgl_input_customer'] = $key->tgl_input_customer;

                $data[] = $json;
            }

            $this->response(['status' => true, 'message' => 'Berhasil menampilkan customer', 'data' => $data], 200);
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
                    'field' => 'nama_perusahaan',
                    'label' => 'Nama Perusahaan',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'nama_pic',
                    'label' => 'Nama PIC',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'email',
                    'label' => 'Email',
                    'rules' => 'required|trim|valid_email'
                ),
                array(
                    'field' => 'telepon',
                    'label' => 'Telepon',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'bank',
                    'label' => 'Bank',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'cabang',
                    'label' => 'Cabang',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'no_rekening',
                    'label' => 'No Rekening',
                    'rules' => 'required|trim'
                )
            );

            $this->form_validation->set_data($this->post());
            $this->form_validation->set_rules($config);

            if(!$this->form_validation->run()){
                $this->response(['status' => false, 'error' => $this->form_validation->error_array()], 400);
            } else {
                $id_customer = $this->KodeModel->buat_kode('customer', 'CUST-', 'id_customer', 6);

                $data = array(
                    'id_customer' => $id_customer,
                    'nama_pic' => $this->post('nama_pic'),
                    'nama_perusahaan' => $this->post('nama_perusahaan'),
                    'email' => $this->post('email'),
                    'telepon' => $this->post('telepon'),
                    'bank' => $this->post('bank'),
                    'cabang' => $this->post('cabang'),
                    'no_rekening' => $this->post('no_rekening')
                );

                $log = array(
                    'id_user' => $this->auth->id_user,
                    'referensi' => 'Customer',
                    'deskripsi' => 'Menambahkan customer baru'
                );

                $add = $this->CustomerModel->add($data, $log);

                if(!$add){
                    $this->response(['status' => false, 'message' => 'Gagal menambahkan customer'], 500);
                } else {
                    $this->response(['status' => true, 'message' => 'Berhasil menambahkan customer'], 200);
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
                    'field' => 'id_customer',
                    'label' => 'ID Custmer',
                    'rules' => 'required|trim|callback_cek_customer'
                ),
                array(
                    'field' => 'nama_perusahaan',
                    'label' => 'Nama Perusahaan',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'nama_pic',
                    'label' => 'Nama PIC',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'email',
                    'label' => 'Email',
                    'rules' => 'required|trim|valid_email'
                ),
                array(
                    'field' => 'telepon',
                    'label' => 'Telepon',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'bank',
                    'label' => 'Bank',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'cabang',
                    'label' => 'Cabang',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'no_rekening',
                    'label' => 'No Rekening',
                    'rules' => 'required|trim'
                )
            );

            $this->form_validation->set_data($this->put());
            $this->form_validation->set_rules($config);

            if(!$this->form_validation->run()){
                $this->response(['status' => false, 'error' => $this->form_validation->error_array()], 400);
            } else {
                $where  = array(
                    'id_customer'   => $this->put('id_customer') 
                );

                $data = array(
                    'nama_pic' => $this->put('nama_pic'),
                    'nama_perusahaan' => $this->put('nama_perusahaan'),
                    'email' => $this->put('email'),
                    'telepon' => $this->put('telepon'),
                    'bank' => $this->put('bank'),
                    'cabang' => $this->put('cabang'),
                    'no_rekening' => $this->put('no_rekening')
                );

                $log = array(
                    'id_user' => $this->auth->id_user,
                    'referensi' => 'Customer',
                    'deskripsi' => 'Mengedit customer'
                );

                $edit = $this->CustomerModel->edit($where, $data, $log);

                if(!$edit){
                    $this->response(['status' => false, 'message' => 'Gagal mengedit customer'], 500);
                } else {
                    $this->response(['status' => true, 'message' => 'Berhasil mengedit customer'], 200);
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
                    'field' => 'id_customer',
                    'label' => 'ID Customer',
                    'rules' => 'required|trim|callback_cek_customer'
                )
            );

            $this->form_validation->set_data($this->delete());
            $this->form_validation->set_rules($config);

            if(!$this->form_validation->run()){
                $this->response(['status' => false, 'error' => $this->form_validation->error_array()], 400);
            } else {
                $where  = array(
                    'id_customer'   => $this->delete('id_customer') 
                );

                $log = array(
                    'id_user' => $this->auth->id_user,
                    'referensi' => 'Customer',
                    'deskripsi' => 'Menghapus customer'
                );

                $delete = $this->CustomerModel->delete($where, $log);

                if(!$delete){
                    $this->response(['status' => false, 'message' => 'Gagal menghapus customer'], 500);
                } else {
                    $this->response(['status' => true, 'message' => 'Berhasil menghapus customer'], 200);
                }
            }
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
