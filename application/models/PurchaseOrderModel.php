<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class PurchaseOrderModel extends CI_Model {

    function fetch($where)
    {
      $this->db->select('*')
               ->from('purchase_order a')
               ->join('customer b', 'b.id_customer = a.id_customer')
               ->join('user c', 'c.id_user = a.id_user');

      if(!empty($where)){
        foreach($where as $key => $value){
            if($value != null){
                $this->db->where($key, $value);
            }
        }
      }

      $this->db->order_by('a.tgl_input_po', 'desc');
      return $this->db->get();
    }

    function add($data, $log)
    {
      $this->db->trans_start();
      $this->db->insert('purchase_order', $data);
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
      $this->db->where($where)->update('purchase_order', $data);
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
      $this->db->where($where)->delete('purchase_order');
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

    function statistic($tahun)
    {
      $this->db->select("YEAR(tgl_input_po) as tahun, MONTH(tgl_input_po) as bulan, COUNT('no_po') as jml_po, SUM(total_fee) as total_fee");

      $this->db->from("purchase_order");
      $this->db->where("YEAR(tgl_input_po)", $tahun);
      $this->db->where('approve', 'Y');

      $this->db->group_by("MONTH(tgl_input_po)");
      return $this->db->get();
    }
    
}

?>
