angular.module('controllers',[]).controller('mployeesDtailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','ClerkInfo','UpdateClerkInfo','Global','GetBossShopList',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,ClerkInfo,UpdateClerkInfo,Global,GetBossShopList) {
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                $scope.param={
                    beauticianStatus:false,
                    managerStatus:false,
                    fontDeskStatus:false,
                    flag:false
                };
                ClerkInfo.query({
                    clerkId:$stateParams.id
                },function (data) {
                    $ionicLoading.hide();
                    $scope.mployeesDtails = data[0];
                    $scope.mployeesDtails.mobile = $scope.mployeesDtails.mobile/1
                    $scope.decideStatus("美容师",'beauticianStatus');
                    $scope.decideStatus("店长",'managerStatus');
                    $scope.decideStatus("前台",'fontDeskStatus')
                })

            });

            $scope.decideStatus = function (text,attribute) {
                if($scope.mployeesDtails.role.indexOf(text)!=-1){
                    $scope.param[attribute] = true
                }else{
                    $scope.param[attribute] = false
                }
            };
            $scope.shop = function(){
                console.log(1);
                GetBossShopList.get({},function(data){
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $scope.fenShop = data.responseData
                        $scope.param.flag = true;
                    }
                })
            };
            $scope.all = function(){
                $scope.param.flag = false;
            };
            $scope.selShop = function(id,sysShopName){
                $scope.param.flag = false;
                $scope.mployeesDtails.sysShopId = id;
                $scope.mployeesDtails.sysShopName = sysShopName
            };
            $scope.save = function () {
                $scope.mployeesDtails.role =[];
                if ($scope.param.beauticianStatus == true) {
                    $scope.mployeesDtails.role += "美容师 "

                }
                if ($scope.param.managerStatus == true) {
                    $scope.mployeesDtails.role += "店长 "

                }
                if ($scope.param.fontDeskStatus == true) {
                    $scope.mployeesDtails.role += "前台 "

                }
                $scope.mployeesDtails.role = $scope.mployeesDtails.role.slice(0, $scope.mployeesDtails.role.length - 1);
                var sysClerkDTO =  $scope.mployeesDtails;
                if($scope.mployeesDtails.sysShopId ==''||$scope.mployeesDtails.mobile==''||$scope.mployeesDtails.name==""){
                    alert('请检查信息')
                    return
                }
                if($scope.mployeesDtails.role==''){
                    alert('至少添加一个权限');
                    $scope.mployeesDtails.role='';
                    return
                }else if($scope.mployeesDtails.mobile!=''){
                    if(!(/^1[34578]\d{9}$/.test($scope.mployeesDtails.mobile))){
                        alert('请重新填写手机号')
                        $scope.mployeesDtails.role='';
                        return
                    }
                }
                UpdateClerkInfo.save(sysClerkDTO,function (data) {
                     if(data.result=="0x00001"){
                             $state.go('addFamily')
                     }else{
                         alert("保存未成功")
                     }
                })
            }

        }])