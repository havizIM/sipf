<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class CustomerModel extends CI_Model {

    function fetch($where)
    {
      $this->db->select('*')->from('customer');

      if(!empty($where)){
        foreach($where as $key => $value){
            if($value != null){
                $this->db->where($key, $value);
            }
        }
      }

      $this->db->order_by('tgl_input_customer', 'desc');
      return $this->db->get();
    }

    function add($data, $log)
    {
      $this->db->trans_start();
      $this->db->insert('customer', $data);
      $this->db->insert('user_log', $log);
      $this->db->trans_complete();

      if ($this->db->trans_status() === FALSE){
        $this->db->trans_rollback();
        return false;
      } else {
        $this->db->trans_commit();
        return true;
      }
    }

    function edit($where, $data, $log)
    {
      $this->db->trans_start();
      $this->db->where($where)->update('customer', $data);
      $this->db->insert('user_log', $log);
      $this->db->trans_complete();

      if ($this->db->trans_status() === FALSE){
        $this->db->trans_rollback();
        return false;
      } else {
        $this->db->trans_commit();
        return true;
      }
    }

    function delete($where, $log)
    {
      $this->db->trans_start();
      $this->db->where($where)->delete('customer');
      $this->db->insert('user_log', $log);
      $this->db->trans_complete();

      if ($this->db->trans_status() === FALSE){
        $this->db->trans_rollback();
        return false;
      } else {
        $this->db->trans_commit();
        return true;
      }
    }
    
}

?>
