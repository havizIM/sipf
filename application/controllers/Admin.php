<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller {

	public function index()
	{
		$this->load->view('admin/main');
	}

	public function dashboard()
	{
		$this->load->view('admin/dashboard');
	}

	public function purchase_order()
	{
		$this->load->view('admin/purchase_order/data');
	}

	public function log()
	{
		$this->load->view('admin/log/data');
	}
	
}
