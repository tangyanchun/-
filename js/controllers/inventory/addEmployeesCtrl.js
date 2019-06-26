angular.module('controllers',[]).controller('addEmployeesCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','GetBossShopList','Global','SaveClerkInfo',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,GetBossShopList,Global,SaveClerkInfo) {
            $rootScope.title = "添加家人";
            $scope.param={
                flag:false,
                beauticianStatus:true,
                managerStatus:false,
                fontDeskStatus:false,
                shopName:"",
                saveFlag:true
            };
            $scope.sysClerkDTO = {
                sysShopId:"",
                mobile:"",
                name:"",
                role:"",
                sysShopName:''
            }
            $scope.shop = function(){
                GetBossShopList.get({},function(data){
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $scope.fenShop = data.responseData
                        $scope.param.flag = true;
                    }
                })
            }

            $scope.selShop = function(id,sysShopName){
                $scope.param.flag = false;
                $scope.sysClerkDTO.sysShopId = id;
                $scope.sysClerkDTO.sysShopName = sysShopName

            }
            $scope.all = function(){
                $scope.param.flag = false;
            };

            $scope.save = function () {
                if($scope.param.saveFlag==true){
                    $scope.param.saveFlag=false
                    if($scope.param.beauticianStatus == true){
                        $scope.sysClerkDTO.role += "美容师 "

                    }
                    if($scope.param.managerStatus == true){
                        $scope.sysClerkDTO.role += "店长 "

                    }
                    if($scope.param.fontDeskStatus == true){
                        $scope.sysClerkDTO.role += "前台 "

                    }
                    $scope.sysClerkDTO.role = $scope.sysClerkDTO.role.slice(0, $scope.sysClerkDTO.role.length-1);

                    if($scope.sysClerkDTO.sysShopId ==''||$scope.sysClerkDTO.mobile==''||$scope.sysClerkDTO.name==""|| $scope.sysClerkDTO.role==''){
                        alert('请检查信息')
                        $scope.sysClerkDTO.role=''
                        return
                    }else if($scope.sysClerkDTO.mobile!=''){
                        if(!(/^1[34578]\d{9}$/.test($scope.sysClerkDTO.mobile))){
                            alert('请重新填写手机号')
                            $scope.sysClerkDTO.role=''
                            return
                        }
                    }
                    SaveClerkInfo.save($scope.sysClerkDTO,function (data) {
                        $scope.param.saveFlag=true
                        if(data.result==Global.SUCCESS){
                            $state.go("addFamily")
                        }else if(data.result =='0x00014'){
                            alert('该家人已经存在，请勿重新添加')
                        }else {
                            alert(data.errorInfo)
                        }
                    })
                }

            }
           /* $scope.importAddressBookGo=function () {
                $state.go("importAddressBook")
            }*/

        }])
