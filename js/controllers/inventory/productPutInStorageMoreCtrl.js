angular.module('controllers',[]).controller('productPutInStorageMoreCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading) {
            $rootScope.title = "选择更多产品入库";
            $scope.param = {
                flag: false,
                type: 0, /*客装产品  易耗品*/
                selType: 0, /*扫码入库  手动入库*/
                selTypes: -1, /*入库产品*/
                ids: []
            };
            $scope.changeBtn = function (type) {
                $scope.param.type = type;
            };
            $scope.selNext = function () {
                $scope.param.flag = true;
            };
            $scope.all = function () {
                $scope.param.flag = false;
            };
            $scope.selThree = function () {

            };
            $scope.threeMess = function () {
                $scope.param.flag = false;
            };
            $scope.selType = function (type) {
                $scope.param.selType = type;
            };
            $scope.selProduct = function (domIndex) {
                if ($scope.param.ids.indexOf(domIndex) != -1) {
                    var key = 0;
                    angular.forEach($scope.param.ids, function (val, index) {
                        if (val == domIndex) {
                            $scope.param.ids.splice(key, 1);
                        }
                        key++;
                    })
                } else {
                    $scope.param.ids.push(domIndex);
                }
            };
            $scope.newLibraryGo = function(){
                var timstamp = (new Date).valueOf();
                $state.go("newLibrary",{stockStyle:$stateParams.stockStyle,dateTime:timstamp})
            }

        }]);