<?php
/**
 * Created by PhpStorm.
 * User: LiXiang
 * Date: 2017/8/17
 * Time: 8:41
 */

include 'db.php';

$data = $_POST;

$sql = "insert into comment(`mid`,`content`,`date`) values($data[id],'$data[content]',$data[date])";

mysqli_query($con, $sql);

if (mysqli_insert_id($con) > 1) {
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
} else {
    echo 0;
}