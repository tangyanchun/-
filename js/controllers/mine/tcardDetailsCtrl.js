/**
 * Created by Administrator on 2018/5/6.
 */
angular.module('controllers',[]).controller('tcardDetailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','cardDetails',
        function ($scope,$rootScope,$stateParams,$state,cardDetails) {

            $rootScope.title = "套卡详情";
            cardDetails.get({id:$stateParams.cardId},function (data) {
                $scope.cardInfo=data.responseData;
                if($scope.cardInfo.status=="0"){
                    $scope.cardInfo.status="启用"
                }else {
                    $scope.cardInfo.status="不启用"
                }
                console.log(data)
            })
        }]);