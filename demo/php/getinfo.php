<?php
/**
 * Created by PhpStorm.
 * User: LiXiang
 * Date: 2017/8/16
 * Time: 22:08
 */

include "db.php";

$id = $_POST['id'];
$sql = "select * from movie where id=" . $id;

$ret = mysqli_query($con, $sql);

$row = mysqli_fetch_assoc($ret);
//查询类型
$sql1 = 'select * from type where id=' . $row['typeid'];
$ret = mysqli_query($con, $sql1);
$row1 = mysqli_fetch_assoc($ret);
$row['type'] = $row1['name'];//类型
$row['comment'] = [];

//查询评论
$sql2 = "select * from comment WHERE mid=" . $row['id'];
$ret = mysqli_query($con, $sql2);
while ($row1 = mysqli_fetch_assoc($ret)) {
    $row['comment'][] = $row1;
}

echo json_encode($row, JSON_UNESCAPED_UNICODE);