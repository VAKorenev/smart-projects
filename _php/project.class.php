<?php

include "./sql.php";

class Projects {

    protected $db_host = 'localhost';
    protected $db_name;
    protected $db_username;
    protected $db_passw;
    protected $mysqlid;
    protected $id = 0;
    protected $project_data = array();
    protected $sql;

    function __construct($id, $db_host, $db_name, $db_username, $db_passw) {

        $this->id = $id;
        $this->db_host = $db_host;
        $this->db_name = $db_name;
        $this->db_username = $db_username;
        $this->db_passw = $db_passw;

        $this->init();

        $this->sql = new SQL;
    }

    function init() {

        $this->mysqlid = new mysqli($this->db_host, $this->db_username, $this->db_passw, $this->db_name) or die("Ошибка соединения: " . mysql_error());
    }

    function getAllProjects($param) {

        $result = $this->mysqlid->query($this->sql->parse('all_projects', $param));
        while ($row = $result->fetch_object()) {
            $user_arr[] = $row;
        }
        $result->close();

        return $user_arr;
    }

    function getProject($param) {
        // return $this->sql->parse('project', $param);
        $result = $this->mysqlid->query($this->sql->parse('project', $param));
        return $result->fetch_object();
    }

    function getProjectWorks($param) {

        $result = $this->mysqlid->query($this->sql->parse('get_project_works', $param));

        while ($row = $result->fetch_object()) {
            $user_arr[] = $row;
        }
        $result->close();

        return isset($user_arr) ? $user_arr : array();
    }

    function getProjectMsg($param) {

        $result = $this->mysqlid->query($this->sql->parse('getComments', $param));

        while ($row = $result->fetch_object()) {
            $user_arr[] = $row;
        }
        $result->close();

        return isset($user_arr) ? $user_arr : array();
    }

    function getWorksPrice($param) {

        $result = $this->mysqlid->query($this->sql->parse('get_price', []));

        while ($row = $result->fetch_object()) {
            $user_arr[] = $row;
        }
        $result->close();

        return isset($user_arr) ? $user_arr : array();
    }

    function getWorksPipls($param) {

        $result = $this->mysqlid->query($this->sql->parse('get_work_pipls', []));

        while ($row = $result->fetch_object()) {
            $user_arr[] = $row;
        }
        $result->close();

        return isset($user_arr) ? $user_arr : array();
    }

    function insertWorksPosition($param) {
//        echo $this->sql->parse('insertWorkPosition', $param);
        if (!$this->mysqlid->query($this->sql->parse('insertWorkPosition', $param))) {
            echo "Ошибка: (" . $this->mysqlid->errno . ") " . $this->mysqlid->error;
        }
        return true;
    }

    function insertMaterialPosition($param) {
        if (!$this->mysqlid->query($this->sql->parse('insertMaterialPosition', $param))) {
            echo "Ошибка: (" . $this->mysqlid->errno . ") " . $this->mysqlid->error;
        }
        return true;
    }

    function insertNewComments($param) {
//        echo $this->sql->parse('addNewComments', $param);
        if (!$this->mysqlid->query($this->sql->parse('addNewComments', $param))) {
            echo "Ошибка: (" . $this->mysqlid->errno . ") " . $this->mysqlid->error;
        }
    }

    function updatePosition($param) {
        if (!$this->mysqlid->query($this->sql->parse('updatePosition', $param))) {
            echo "Ошибка: (" . $this->mysqlid->errno . ") " . $this->mysqlid->error;
        }
    }

    function updateEquipmentPosition($param) {
        if (!$this->mysqlid->query($this->sql->parse('updateEquipmentPosition', $param))) {
            echo "Ошибка: (" . $this->mysqlid->errno . ") " . $this->mysqlid->error;
        }
    }

    function updateOrganizationName($param) {
        if (!$this->mysqlid->query($this->sql->parse('updateOrganizationName', $param))) {
            echo "Ошибка: (" . $this->mysqlid->errno . ") " . $this->mysqlid->error;
        }
    }

    function updateProjectName($param) {
        if (!$this->mysqlid->query($this->sql->parse('updateProjectName', $param))) {
            echo "Ошибка: (" . $this->mysqlid->errno . ") " . $this->mysqlid->error;
        }
    }

    function getProjectEquipment($param) {
        // echo $this->sql->parse('getProjectEquipment', $param);
        $result = $this->mysqlid->query($this->sql->parse('getProjectEquipment', $param));

        while ($row = $result->fetch_object()) {
            $rows_arr[] = $row;
        }
        $result->close();
        return isset($rows_arr) ? $rows_arr : array();
    }

    function getMaterialsPrice() {

        $result = $this->mysqlid->query($this->sql->parse('getEquipment', []));
        while ($row = $result->fetch_object()) {
            $user_arr[] = $row;
        }
        $result->close();

        return isset($user_arr) ? $user_arr : array();
    }

    function deleteMaterial($param) {
        if (!$this->mysqlid->query($this->sql->parse('deleteMaterial', $param))) {
            echo "Ошибка: (" . $this->mysqlid->errno . ") " . $this->mysqlid->error;
        }
    }

    function deleteWork($param) {
        if (!$this->mysqlid->query($this->sql->parse('deleteWork', $param))) {
            echo "Ошибка: (" . $this->mysqlid->errno . ") " . $this->mysqlid->error;
        }
    }

}

?>
