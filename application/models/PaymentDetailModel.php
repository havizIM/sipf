<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class PaymentDetailModel extends CI_Model {

    function fetch($where)
    {
      $this->db->select('*')
               ->from('payment_detail a')
               ->join('purchase_order b', 'b.no_po = a.no_po');

      if(!empty($where)){
        foreach($where as $key => $value){
            if($value != null){
                $this->db->where($key, $value);
            }
        }
      }

      $this->db->order_by('a.no_po', 'desc');
      return $this->db->get();
    }
    
}

?>
