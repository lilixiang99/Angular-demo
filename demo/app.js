/**
 * Created by LiXiang on 2017/8/14.
 */
var m = angular.module('app', ['ui.router'])


    .run(['$rootScope', '$state', function ($rootScope, $state) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
            $rootScope.title = toState.title;
        });

    }])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        //默认路由
        $urlRouterProvider.otherwise('/hot.html');
        $stateProvider

        //热门电影
            .state('hotmovie', {
                'url': '/hot.html',
                'templateUrl': './hot_movie/hot_movie.html',
                'controller': 'hotmovie',
                'title': '热门影片'
            })
            //即将上映
            .state('soonmovie', {
                'url': '/soon.html',
                'templateUrl': './soon_movie/soon_movie.html',
                'controller': 'soonmovie',
                'title': '即将上映的影片'
            })
            //排行榜
            .state('rankingmovie', {
                'url': '/ranking/{id}',
                'templateUrl': './ranking_movie/ranking_movie.html',
                'controller': 'filmmovie',
                'title': '影片排行榜'
            })
            //上映中
            .state('filmmovie', {
                'url': '/film.html',
                'templateUrl': './film_movie/film_movie.html',
                'controller': 'filmmovie',
                'title': '上映中影片'
            })
            //发布
            .state('addmovie', {
                'url': '/add.html',
                'templateUrl': './add_movie/add_movie.html',
                'controller': 'addmovie',
                'title': '发布影片'
            })
            .state('details', {
                'url': '/details/{id}',
                'templateUrl': './details_movie/details_movie.html',
                'controller': 'detailsmovie'
            })
            .state('search', {
                'url': '/search/{items}',
                'templateUrl': './search_movie/search_movie.html',
                'controller': 'search'
            });

    }])

