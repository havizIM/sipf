<?php
use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class Report extends CI_Controller {

    use REST_Controller {
        REST_Controller::__construct as private __resTraitConstruct;
    } 

    function __construct()
    {
        parent::__construct();
        $this->__resTraitConstruct();

        $this->token    = $this->input->get_request_header('X-SIPF-KEY', TRUE);
        $this->auth     = AUTHORIZATION::validateToken($this->token);

        $this->load->model('ReportModel');
    }

    public function fee_post()
    {
        if(!$this->auth){
            $this->response(['status' => false, 'error' => 'Invalid Token'], 400);
        } else {
            $otorisasi  = $this->auth;

            $config = array(
                array(
                    'field' => 'bulan',
                    'label' => 'Bulan',
                    'rules' => 'required|trim'
                ),
                array(
                    'field' => 'tahun',
                    'label' => 'Tahun',
                    'rules' => 'required|trim'
                )
            );

            $this->form_validation->set_data($this->post());
            $this->form_validation->set_rules($config);

            if(!$this->form_validation->run()){
                $this->response(['status' => false, 'error' => $this->form_validation->error_array()], 400);
            } else {

                $where = array(
                    'bulan' => $this->post('bulan'),
                    'tahun' => $this->post('tahun')
                );

                $report = $this->ReportModel->fee($where)->result();
                $data = array();

                foreach($report as $key){
                    $json = array();

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
                    $json['grand_total_fee'] = $key->grand_total_fee;
                    $json['grand_total_po'] = $key->grand_total_po;
                    $json['count_total_po'] = $key->count_total_po;

                    $data[] = $json;
                }

                $this->response(['status' => true, 'message' => 'Berhasil menampilkan report', 'data' => $data], 200);
            }
        } 
    }

}
