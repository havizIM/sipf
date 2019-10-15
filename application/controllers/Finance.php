<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Finance extends CI_Controller {

	public function index()
	{
		$this->load->view('finance/main');
	}

	public function dashboard()
	{
		$this->load->view('finance/dashboard');
    }
    
    public function purchase_order()
	{
		$this->load->view('finance/purchase_order/data');
	}

	public function payment()
	{
		$this->load->view('finance/payment/data');
	}

	public function add_payment()
	{
		$this->load->view('finance/payment/add');
	}

	public function edit_payment($id)
	{
		$this->load->view('finance/payment/edit', $id);
	}

	public function detail_payment($id)
	{
		$this->load->view('finance/payment/detail', $id);
	}

	public function log()
	{
		$this->load->view('finance/log/data');
	}
	
}
