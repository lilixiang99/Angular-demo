/**
 * Created by LiXiang on 2017/8/15.
 */
//获取类型
m.factory('type', ['$http', function ($http) {
    return {
        getlist: function () {
            return $http({url: './php/typelist.php'});
        }
    }
}]);

//所有热门电影
m.factory('hotmovie', ['$http', function ($http) {
    return {
        Allmovie: function () {
            return $http({url: './php/hotmovie.php'});
        }
    }
}]);

//未上映的电影
m.factory('soonmovie', ['$http', function ($http) {
    return {
        Soonmovie: function () {
            return $http({url: './php/soonMovie.php'});
        }
    }
}]);


//上映中的
m.factory('filmmovie', ['$http', function ($http) {
    return {
        Filmmovie: function () {
            return $http({url: './php/filmMovie.php'});
        }
    }
}]);

