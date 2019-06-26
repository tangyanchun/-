angular.module('controllers',[]).controller('specificationsCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading) {
            $rootScope.title = "规格";

            $scope.param = {
                num:'',
                spec:""
            }
            if($rootScope.settingAddsome.product.productSpec !=''){
                var num = $rootScope.settingAddsome.product.productSpec.replace(/[^0-9.]/ig,"")/1;
                var spec = $rootScope.settingAddsome.product.productSpec.replace(/[^a-z]+/ig,"");
                $scope.param.num =num;
                $scope.param.spec =spec;
            }
            $scope.selSpec=function (type) {
                $scope.param.spec = type
            };
            $scope.numLimit=function () {
                $scope.param.num=$scope.param.num.replace(/[^0-9.0-9]+/,'')
            }

            $scope.save=function () {
                if($scope.param.num==''){
                    alert("请输入规格");
                    return
                }
                if($scope.param.spec==''){
                    alert("请选择单位");
                    return
                }

                $rootScope.settingAddsome.product.productSpec = $scope.param.num+$scope.param.spec
                $state.go($stateParams.url)

            }

        }])