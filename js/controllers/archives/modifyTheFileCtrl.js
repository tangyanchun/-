angular.module('controllers',["ngDialog"]).controller('modifyTheFileCtrl',
    ['$scope','$rootScope','ngDialog','$stateParams','$state','$ionicLoading','$ionicPopup',
        function ($scope,$rootScope,ngDialog,$stateParams,$state,$ionicLoading,$ionicPopup) {
            $rootScope.title = "修改档案";
            /*$scope.addMessage = function() {
                $scope.ngDialog = ngDialog;
                ngDialog.open({
                    template: 'addMess',
                    scope: $scope, //这样就可以传递参数
                    controller: ['$scope', '$interval', function($scope, $interval) {
                        console.log($scope.$parent.content);
                        $scope.close = function() {
                            console.log(123);
                            $scope.closeThisDialog();
                        };
                    }],
                    className: 'ngdialog-theme-default ngdialog-theme-custom',
                });
            };*/

        }])
