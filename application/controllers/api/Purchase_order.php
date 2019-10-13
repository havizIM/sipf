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
    }

    public function index_get()
    {
        if(!$this->auth){
            $this->response(['status' => false, 'error' => 'Invalid Token'], 400);
        } else {
            
            $where = array(
                'no_po' => $this->get('no_po')
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

                $data[] = $json;
            }

            $this->response(['status' => true, 'message' => 'Berhasil menampilkan user', 'data' => $data], 200);
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
                    'field' => 'username',
                    'label' => 'Username',
                    'rules' => 'required|trim|is_unique[user.username]'
                ),
                array(
                    'field' => 'nama_lengkap',
                    'label' => 'Nama Lengkap',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'email',
                    'label' => 'Email',
                    'rules' => 'required|trim|is_unique[user.email]|valid_email'
                ),
                array(
                    'field' => 'telepon',
                    'label' => 'Telepon',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'level',
                    'label' => 'Level',
                    'rules' => 'required|trim'
                )
            );

            $this->form_validation->set_data($this->post());
            $this->form_validation->set_rules($config);

            if(!$this->form_validation->run()){
                $this->response(['status' => false, 'error' => $this->form_validation->error_array()], 400);
            } else {
                $id_user = $this->KodeModel->buat_kode('user', 'USR-', 'id_user', 7);

                $data = array(
                    'id_user' => $id_user,
                    'username' => $this->post('username'),
                    'password' => $this->post('username'),
                    'nama_lengkap' => $this->post('nama_lengkap'),
                    'email' => $this->post('email'),
                    'telepon' => $this->post('telepon'),
                    'level' => $this->post('level'),
                    'aktif' => 'Y'
                );

                $log = array(
                    'id_user' => $this->auth->id_user,
                    'referensi' => 'User',
                    'deskripsi' => 'Menambahkan user baru'
                );

                $add = $this->PurchaseOrderModel->add($data, $log);

                if(!$add){
                    $this->response(['status' => false, 'message' => 'Gagal menambahkan user'], 500);
                } else {
                    $this->response(['status' => true, 'message' => 'Berhasil menambahkan user'], 200);
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
                    'field' => 'id_user',
                    'label' => 'ID User',
                    'rules' => 'required|trim|callback_cek_user'
                ),
                array(
                    'field' => 'username',
                    'label' => 'Username',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'nama_lengkap',
                    'label' => 'Nama Lengkap',
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
                    'field' => 'level',
                    'label' => 'Level',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'aktif',
                    'label' => 'Status',
                    'rules' => 'required|trim'
                ),
            );

            $this->form_validation->set_data($this->put());
            $this->form_validation->set_rules($config);

            if(!$this->form_validation->run()){
                $this->response(['status' => false, 'error' => $this->form_validation->error_array()], 400);
            } else {
                $where  = array(
                    'id_user'   => $this->put('id_user') 
                );

                $data = array(
                    'username' => $this->put('username'),
                    'nama_lengkap' => $this->put('nama_lengkap'),
                    'email' => $this->put('email'),
                    'telepon' => $this->put('telepon'),
                    'level' => $this->put('level'),
                    'aktif' => $this->put('aktif')
                );

                $log = array(
                    'id_user' => $this->auth->id_user,
                    'referensi' => 'User',
                    'deskripsi' => 'Mengedit user'
                );

                $edit = $this->PurchaseOrderModel->edit($where, $data, $log);

                if(!$edit){
                    $this->response(['status' => false, 'message' => 'Gagal mengedit user'], 500);
                } else {
                    $this->response(['status' => true, 'message' => 'Berhasil mengedit user'], 200);
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
                    'field' => 'id_user',
                    'label' => 'ID User',
                    'rules' => 'required|trim|callback_cek_user'
                )
            );

            $this->form_validation->set_data($this->delete());
            $this->form_validation->set_rules($config);

            if(!$this->form_validation->run()){
                $this->response(['status' => false, 'error' => $this->form_validation->error_array()], 400);
            } else {
                $where  = array(
                    'id_user'   => $this->delete('id_user') 
                );

                $log = array(
                    'id_user' => $this->auth->id_user,
                    'referensi' => 'User',
                    'deskripsi' => 'Menghapus user'
                );

                $delete = $this->PurchaseOrderModel->delete($where, $log);

                if(!$delete){
                    $this->response(['status' => false, 'message' => 'Gagal menghapus user'], 500);
                } else {
                    $this->response(['status' => true, 'message' => 'Berhasil menghapus user'], 200);
                }
            }
        } 
    }

    function cek_user($id){
         $where = array(
            'id_user' => $id
        );

        $cek   = $this->PurchaseOrderModel->fetch($where)->num_rows();

        if ($cek == 0){
            $this->form_validation->set_message('cek_user', 'ID User tidak ditemukan');
            return FALSE;
        } else {
            return TRUE;
        }
    }

}
