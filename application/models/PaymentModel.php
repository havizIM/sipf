<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class PaymentModel extends CI_Model {

    function fetch($where)
    {
      $this->db->select('*')
               ->from('payment a')
               ->join('customer b', 'b.id_customer = a.id_customer')
               ->join('user c', 'c.id_user = a.id_user');

      if(!empty($where)){
        foreach($where as $key => $value){
            if($value != null){
                $this->db->where($key, $value);
            }
        }
      }

      $this->db->order_by('a.tgl_input_payment', 'desc');
      return $this->db->get();
    }

    function add($data, $detail, $log)
    {
      $this->db->trans_start();
      $this->db->insert('payment', $data);

      if(!empty($detail)){
          $this->db->insert_batch('payment_detail', $detail);
      }

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
      $this->db->where($where)->update('payment', $data);
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
      $this->db->where($where)->delete('payment');
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
