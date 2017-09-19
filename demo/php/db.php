<?php
/**
 * Created by PhpStorm.
 * User: LiXiang
 * Date: 2017/8/15
 * Time: 8:25
 */

$con = mysqli_connect('localhost', 'root', 'root', 'douban');
if (!$con) {
    echo mysqli_error($con);
}
mysqli_select_db($con, "douban");
mysqli_set_charset($con, "utf8");
