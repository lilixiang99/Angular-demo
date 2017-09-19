<?php
/**
 * Created by PhpStorm.
 * User: LiXiang
 * Date: 2017/8/15
 * Time: 9:23
 */
include 'db.php';

$data = $_POST;


$name = $data['name'];

$date = $data['date'];

$performer = $data['performer'];

$images = $data['images'];

$typeid = $data['typeid'];

$brief = $data['brief'];

$state = $data['state'];

$score = $data['score'];

$sql = "INSERT INTO `movie`(`name`, `date`, `performer`, `brief`, `images`, `typeid`,`state`,`score`) VALUES ('$name',$date,'$performer','$brief','$images',$typeid,$state,$score)";

mysqli_query($con, $sql);

if (mysqli_insert_id($con) > 1) {
    echo 1;
} else {
    echo 2;
}