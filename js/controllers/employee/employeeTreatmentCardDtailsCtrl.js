angular.module('controllers',[]).controller('employeeTreatmentCardDtailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','TreatmentAndGroupCardRecordList','FlowId','Id','Global',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,TreatmentAndGroupCardRecordList,FlowId,Id,Global) {
            $rootScope.title = "详情";
            $scope.param={
                flag:true,
                sysUserId	:$stateParams.sysUserId,
                type:$stateParams.goodsType

            };
            $scope.chooseTab = function (type) {
                if(type =="0"){
                    $scope.param.flag = true;
                    $scope.getInfo()
                }else{
                    $scope.param.flag = false;
                    $scope.getInfos()
                }
            };

            $scope.getInfo = function () {
                $scope.userConsumeRequestDTO = {
                    flowId:$stateParams.flowId,
                    flowIds:$stateParams.flowIds.split(','),
                    goodsType:$stateParams.goodsType
                };
                TreatmentAndGroupCardRecordList.save($scope.userConsumeRequestDTO,function (data) {
                    $scope.treatmentCardDtails=data.responseData;
                });
            };
            $scope.getInfo();

            $scope.getInfos = function () {
                if($stateParams.goodsType == '1'){
                    FlowId.get({
                        flowId:$stateParams.flowId
                    },function(data){
                        if(data.result==Global.SUCCESS&&data.responseData!=null)
                        { $scope.details = data.responseData;
                        }
                    })
                }else if($stateParams.goodsType == '3'){
                    Id.get({
                        id:$stateParams.id
                    },function(data){
                        if(data.result==Global.SUCCESS&&data.responseData!=null)
                        { $scope.details = data.responseData;
                        }
                    })
                }
            };

            $scope.drawCardRecordsDetailGO=function (flowNo) {
                $state.go("employeeDrawCardRecordsDetailemployeeDrawCardRecordsDetail",{flowNo:flowNo})
            }
        }]);