<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/*
|---------------------------------
| Poin Of Sales
| Copyright Ardian Webi Kirda
| Created By Ian 18-01-2015
|---------------------------------
*/
class Menu extends IAN_Controller{
    function __construct(){
        parent::__construct();
        if ($this->session->userdata('logged_in') !== true) {
            redirect('dashboard/dashboard');
        }
    }

    function index(){
        $this->load->model('homepages/Mhomepages');
        $node = $this->input->post('node');
        // var_dump($node);
        // exit();
        $node = ($node === 'NaN') ? null : $node;
        echo json_encode($this->Mhomepages->validasi_rule($node));
    }
}