angular.module('controllers',[]).controller('successfulInventoryCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading) {

            $scope.param = {
               boundType:$stateParams.type,
               timstamp:(new Date).valueOf()
            }

            if($stateParams.type=='inbound')
            {
                $rootScope.title = "成功入库";
            }
            else if($stateParams.type=='outbound')
            {
                $rootScope.title = "成功出库";
            }

            $scope.detailsGo = function(){
                if($stateParams.type=='inbound')
                {
                    var timstamp = (new Date).valueOf();
                    $state.go('entryDetails',{id:$stateParams.id,dateTime:timstamp});
                }
                else if($stateParams.type=='outbound')
                {

                }
            }
}])