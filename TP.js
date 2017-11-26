let myApp = angular.module('TP', ['ngRoute'])

    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'MainCtrl'
            })
            .when('/posts', {
                templateUrl: 'views/posts.html',
                controller: 'PostsCtrl'
            })
            .when('/todo', {
                templateUrl: 'views/todo.html',
                controller: 'TodoCtrl'
            })
            .when('/afficher/:id', {
                templateUrl: 'views/afficher.html',
                controller: 'AfficherCtrl'
            })

            .otherwise({
                redirectTo: '/'
            });
    });

myApp.factory('test', ['$http', function ($http) {
    return {
        getInfo: function () {
            return $http.get('https://jsonplaceholder.typicode.com/posts');
        },
        getUsers: function () {
            return $http.get('https://jsonplaceholder.typicode.com/users');
        },
        getTodo: function () {
            return $http.get('https://jsonplaceholder.typicode.com/todos');
        }


    }
}]);

myApp.controller('PostsCtrl', ['$scope', 'test', '$filter', function ($scope, test) {
    $scope.posts = [];
    test.getInfo()
        .then((response) => {
            $scope.posts = response.data;
            //console.log( $scope.posts);
            $scope.users = [];
            test.getUsers()
                .then((response) => {
                    $scope.users = response.data;

                });

        });
}]);
myApp.controller('TodoCtrl', ['$scope', 'test', function ($scope, test) {

    $scope.users = [];
    test.getUsers()
        .then((response) => {
            $scope.users = response.data;

        });



}]);
myApp.controller('MaintCtrl', ['$scope', function ($scope) {

}]);
myApp.directive("todo", function () {
    return {
template:'<span ng-repeat="todo in todos | filter:userTodo">'+'<input type="checkbox" ng-model="todo.completed"/>{{todo.title}}<br></span>'
,
        controller: function ($scope, $rootScope, test) {
            //$scope.todos = [];
            $scope.userTodo= { 
                userId: $scope.id
            }
            if(!$rootScope.todos)
            test.getTodo()
                .then((response) => {
                $rootScope.todos = response.data;
                 console.log( $scope.todos);
                });
        }
    };
})
myApp.controller('AfficherCtrl', ['$scope','$routeParams', function ($scope,$routeParams ) {

    $scope.id= $routeParams.id;
    }]);