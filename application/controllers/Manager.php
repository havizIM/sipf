<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Manager extends CI_Controller {

	public function index()
	{
		$this->load->view('manager/main');
	}

	public function dashboard()
	{
		$this->load->view('manager/dashboard');
	}

	public function purchase_order()
	{
		$this->load->view('manager/purchase_order/data');
    }

	public function user()
	{
		$this->load->view('manager/user/data');
    }
    
    public function payment()
	{
		$this->load->view('manager/payment/data');
    }
    
    public function report_payment()
	{
		$this->load->view('manager/report/payment');
	}

	public function log()
	{
		$this->load->view('manager/log/data');
	}
	
}
