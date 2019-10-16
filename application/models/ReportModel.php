<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class ReportModel extends CI_Model {

    function fee($where)
    {
      $this->db->select('a.*')
               ->select('(SELECT SUM(b.total_fee) FROM purchase_order b WHERE b.id_customer = a.id_customer AND MONTH(b.tgl_input_po) = "'.$where['bulan'].'" AND YEAR(b.tgl_input_po) = "'.$where['tahun'].'" AND b.approve = "Y") as grand_total_fee')
               ->select('(SELECT SUM(b.total_po) FROM purchase_order b WHERE b.id_customer = a.id_customer AND MONTH(b.tgl_input_po) = "'.$where['bulan'].'" AND YEAR(b.tgl_input_po) = "'.$where['tahun'].'" AND b.approve = "Y") as grand_total_po')
               ->select('(SELECT COUNT(b.no_po) FROM purchase_order b WHERE b.id_customer = a.id_customer AND MONTH(b.tgl_input_po) = "'.$where['bulan'].'" AND YEAR(b.tgl_input_po) = "'.$where['tahun'].'" AND b.approve = "Y") as count_total_po')
               
               ->from('customer a')
               ->group_by('a.id_customer')
               ->order_by('grand_total_fee', 'desc');


      return $this->db->get();
    }
    
}

?>
