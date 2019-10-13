<?php
use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class Log extends CI_Controller {

    use REST_Controller {
        REST_Controller::__construct as private __resTraitConstruct;
    } 

    function __construct()
    {
        parent::__construct();
        $this->__resTraitConstruct();

        $this->token    = $this->input->get_request_header('X-SIPF-KEY', TRUE);
        $this->auth     = AUTHORIZATION::validateToken($this->token);

        $this->load->model('LogModel');
    }

    public function index_get()
    {
        if(!$this->auth){
            $this->response(['status' => false, 'error' => 'Invalid Token'], 400);
        } else {
            
            $where = array(
                'b.id_user' => $this->auth->id_user
            );

            $log   = $this->LogModel->fetch($where)->result();
            $data   = array();

            foreach($log as $key){
                $json = array();

                $json['id_log'] = $key->id_log;
                $json['user'] = array(
                    'id_user' => $key->id_user,
                    'nama_lengkap' => $key->nama_lengkap
                );
                $json['referensi'] = $key->referensi;
                $json['deskripsi'] = $key->deskripsi;
                $json['tgl_log'] = $key->tgl_log;

                $data[] = $json;
            }

            $this->response(['status' => true, 'message' => 'Berhasil menampilkan log', 'data' => $data], 200);
        }
    }

}
