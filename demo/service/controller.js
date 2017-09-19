/**
 * Created by LiXiang on 2017/8/15.
 */


//热门电影
m.controller('hotmovie', ['$scope', 'hotmovie', function ($scope, hotmovie) {
    hotmovie.Allmovie().then(function (res) {
        $scope.data = res.data;
        //分页总数
        $scope.pageSize = 12;
        $scope.pages = Math.ceil($scope.data.length / $scope.pageSize); //分页数
        $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
        $scope.pageList = [];
        $scope.selPage = 1;
        //设置表格数据源(分页)
        $scope.setData = function () {
            $scope.items = $scope.data.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize)); //通过当前页数筛选出表格当前显示数据
        }
        $scope.items = $scope.data.slice(0, $scope.pageSize);
        //分页要repeat的数组
        for (var i = 0; i < $scope.newPages; i++) {
            $scope.pageList.push(i + 1);
        }
        //打印当前选中页索引
        $scope.selectPage = function (page) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.setData();
            $scope.isActivePage(page);
            console.log("选择的页：" + page);
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function () {
            $scope.selectPage($scope.selPage - 1);
        }
        //下一页
        $scope.Next = function () {
            $scope.selectPage($scope.selPage + 1);
        };
    });
}]);

//添加电影
m.controller('addmovie', ['$scope', '$rootScope', 'type', '$http', function ($scope, $rootScope, type, $http) {
    $scope.data = {};//表单数据
    //获取类型
    type.getlist().then(function (res) {
        $scope.type = res.data;
        $rootScope.typeAll = res.data;
    });
    //拿到Images 地址
    $('#btn').click(function () {
        $scope.data.images = $('#images').val();
    });
    $scope.func = function () {


        if ($scope.data.name == undefined) {
            swal('请输入电影名~', '', 'error');
            return;
        } else if ($scope.data.date == undefined) {
            swal('请输入年份~', '', 'error');
            return;
        } else if ($scope.data.performer == undefined) {
            swal('请输入演员~', '', 'error');
            return;
        } else if ($scope.data.brief == undefined) {
            swal('请输入电影简介~', '', 'error');
            return;
        } else if ($scope.data.images == undefined) {
            swal('还没有选择图片呐~', '', 'error');
            return;
        } else if ($scope.data.typeid == undefined || $scope.data.typeid == "") {
            swal('请选择电影的类型哦~', '', 'error');
            return;
        } else if ($scope.data.score == undefined || $scope.data.score > 10) {
            swal('请输入评分~', '最高10分哦~', 'error');
            return;
        } else if ($scope.data.state == undefined) {
            swal('电影上映了没？？？~', '', 'error');
            return;
        } else if ($scope.data.hot == undefined) {
            swal('是否让这个电影热门？？~', '', 'error');
            return;
        }


        $http({
            method: 'post',
            url: './php/add.php',
            data: $.param($scope.data),
            headers: {'Content-type': 'application/x-www-form-urlencoded'}
        }).then(function (res) {
            if (res.data == 1) {
                swal('添加成功！', '', 'success');
                history.go();
            } else if (res.data == 2) {
                swal('添加失败！', '', 'error');
            }
        });
    }
}]);

//即将上映电影
m.controller('soonmovie', ['$scope', 'soonmovie', function ($scope, soonmovie) {

    soonmovie.Soonmovie().then(function (res) {

        $scope.data = res.data;
        //分页总数
        $scope.pageSize = 12;
        $scope.pages = Math.ceil($scope.data.length / $scope.pageSize); //分页数
        $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
        $scope.pageList = [];
        $scope.selPage = 1;
        //设置表格数据源(分页)
        $scope.setData = function () {
            $scope.items = $scope.data.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize)); //通过当前页数筛选出表格当前显示数据
        }
        $scope.items = $scope.data.slice(0, $scope.pageSize);
        //分页要repeat的数组
        for (var i = 0; i < $scope.newPages; i++) {
            $scope.pageList.push(i + 1);
        }
        //打印当前选中页索引
        $scope.selectPage = function (page) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.setData();
            $scope.isActivePage(page);
            console.log("选择的页：" + page);
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function () {
            $scope.selectPage($scope.selPage - 1);
        }
        //下一页
        $scope.Next = function () {
            $scope.selectPage($scope.selPage + 1);
        };

    });

}]);

//上映中和排行页
m.controller('filmmovie', ['$scope', 'filmmovie', '$rootScope', 'type', '$stateParams', function ($scope, filmmovie, $rootScope, type, $stateParams) {

    //所有类型
    type.getlist().then(function (res) {
        $scope.type = res.data;
    });
    filmmovie.Filmmovie().then(function (res) {
        $rootScope.Film = res.data;
        $scope.data = res.data;
        if ($stateParams.id) {
            $scope.data1 = [];
            for (var i = 0; i < $scope.data.length; i++) {
                if ($stateParams.id == $scope.data[i].typeid) {
                    $scope.data1.push($scope.data[i]);
                }
            }
        } else {
            $scope.data1 = $scope.data;
        }
        console.log($scope.data1);
        //分页总数
        $scope.pageSize = 12;
        $scope.pages = Math.ceil($scope.data1.length / $scope.pageSize); //分页数
        $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
        $scope.pageList = [];
        $scope.selPage = 1;
        //设置表格数据源(分页)
        $scope.setData = function () {
            $scope.items = $scope.data1.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize)); //通过当前页数筛选出表格当前显示数据
        }
        $scope.items = $scope.data1.slice(0, $scope.pageSize);
        //分页要repeat的数组
        for (var i = 0; i < $scope.newPages; i++) {
            $scope.pageList.push(i + 1);
        }
        //打印当前选中页索引
        $scope.selectPage = function (page) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.setData();
            $scope.isActivePage(page);
            console.log("选择的页：" + page);
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function () {
            $scope.selectPage($scope.selPage - 1);
        }
        //下一页
        $scope.Next = function () {
            $scope.selectPage($scope.selPage + 1);
        };
    });
}]);

//详情页
m.controller('detailsmovie', ['$scope', '$stateParams', '$http', function ($scope, $stateParams, $http) {
    //根据ID查询某个详情数据
    $http({
        method: 'post',
        url: './php/getinfo.php',
        data: $.param({id: $stateParams.id}),
        headers: {'Content-type': 'application/x-www-form-urlencoded'}
    }).then(function (res) {
        console.log(res.data);
        $scope.detial = res.data;
        $scope.data.id = $scope.detial.id;//当前电影的id存到$scope.data
    });

    $scope.data = {};
    $scope.data.date = Math.round(new Date().getTime() / 1000);
    $scope.sub = function () {

        if ($scope.data.content == undefined) {
            swal('请先输入评论内容哦~', '', 'error');
            return;
        }
        $http({
            method: 'post',
            url: './php/addComment.php',
            data: $.param($scope.data),
            headers: {'Content-type': 'application/x-www-form-urlencoded'}
        }).then(function (res) {
            if (res.data == 0) {
                swal('评论失败', '', 'error');
            } else {
                swal('评论成功', '', 'success');
                $scope.detial.comment.push(res.data);
            }

        });

    }


}]);

//搜索电影
m.controller('searchmovie', ['$scope', '$http', '$state', function ($scope, $http, $state) {

    $scope.search = function () {
        // alert($scope.name);
        $state.go('search', {items: $scope.key});
    }

}]);

m.controller('search', ['$scope', '$stateParams', '$http', function ($scope, $stateParams, $http) {
    // console.log($stateParams);
    $http({
        method: 'post',
        url: './php/search.php',
        data: $.param({keyword: $stateParams.items}),
        headers: {'Content-type': 'application/x-www-form-urlencoded'}
    }).then(function (res) {

        $scope.data = res.data;
        //分页总数
        console.log($scope.data);
        $scope.pageSize = 12;
        $scope.pages = Math.ceil($scope.data.length / $scope.pageSize); //分页数
        $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
        $scope.pageList = [];
        $scope.selPage = 1;
        //设置表格数据源(分页)
        $scope.setData = function () {
            $scope.items = $scope.data.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize)); //通过当前页数筛选出表格当前显示数据
        }
        $scope.items = $scope.data.slice(0, $scope.pageSize);
        //分页要repeat的数组
        for (var i = 0; i < $scope.newPages; i++) {
            $scope.pageList.push(i + 1);
        }
        //打印当前选中页索引
        $scope.selectPage = function (page) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.setData();
            $scope.isActivePage(page);
            console.log("选择的页：" + page);
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function () {
            $scope.selectPage($scope.selPage - 1);
        }
        //下一页
        $scope.Next = function () {
            $scope.selectPage($scope.selPage + 1);
        };

    });


}]);



