<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class LogModel extends CI_Model {

    function fetch($where)
    {
      $this->db->select('*')
           ->from('user_log a')
           ->join('user b', 'b.id_user = a.id_user');

      if(!empty($where)){
        foreach($where as $key => $value){
            if($value != null){
                $this->db->where($key, $value);
            }
        }
      }

      $this->db->order_by('a.tgl_log', 'desc');
      return $this->db->get();
    }

    function add($data)
    {
      return $this->db->insert('user_log', $data);
    }
    
}

?>
