<?php
/**
 * Created by PhpStorm.
 * User: LiXiang
 * Date: 2017/8/16
 * Time: 10:52
 */

include 'db.php';

$sql = 'select * from type';

$ret = mysqli_query($con, $sql);

$res = [];

while ($row = mysqli_fetch_assoc($ret)) {
    $res[] = $row;
}

echo json_encode($res, JSON_UNESCAPED_UNICODE);