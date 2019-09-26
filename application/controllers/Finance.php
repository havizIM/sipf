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

	public function log()
	{
		$this->load->view('finance/log/data');
	}
	
}
