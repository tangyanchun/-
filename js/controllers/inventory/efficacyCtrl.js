angular.module('controllers',[]).controller('efficacyCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading) {
            $rootScope.title = "功效";

            $scope.param = {
                productFunc:$rootScope.settingAddsome.product.productFunction,
                func:"",
                funcList:["补水",'美白','保湿','淡斑']
            }
            $scope.save = function(){
                if($scope.param.func !=""){
                    $scope.param.productFunc =  $scope.param.productFunc+";"+$scope.param.func;
                    $scope.param.productFunc=$scope.param.productFunc.replace(/(^\;*)|(\;*$)/g, "")
                }else {
                    $scope.param.productFunc = $scope.param.productFunc;
                }
                $state.go($stateParams.url);
                $rootScope.settingAddsome.product.productFunction = $scope.param.productFunc
                $scope.param.func = ''
            };
            $scope.selFunc = function(name){
                if($scope.param.productFunc.search(name) != -1){
                    var a = $scope.param.productFunc.split(";")
                    for(var i=0;i<a.length;i++){
                        if(a[i] == name){
                            a.splice(i,1)
                        }
                    }
                    $scope.param.productFunc = a.join(";")
                }else{
                    if($scope.param.productFunc == ""){
                        $scope.param.productFunc= name
                    }else{
                        $scope.param.productFunc= $scope.param.productFunc+";"+name
                    }

                }

            }

        }])