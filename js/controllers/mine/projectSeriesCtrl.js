angular.module('controllers',[]).controller('projectSeriesCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','TwoLevelProject','Global','UpdateTwoLevelProjectType','$ionicPopup','$timeout','ThreeLevelProject',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,TwoLevelProject,Global,UpdateTwoLevelProjectType,$ionicPopup,$timeout,ThreeLevelProject) {
            $rootScope.title = "添加系列";
            $scope.param = {
                selTrue:[]
            };
            $scope.projectBrandGo = function () {
                for(var i=0;i<$scope.requestList.length;i++){
                    if($scope.requestList[i].projectTypeName==''&&$scope.requestList[i].status=='0'){
                        alert("系列名不能为空")
                        return
                        /*var alertPopup = $ionicPopup.alert({
                            template: '<span style="font-size: 0.3rem;color: #333333;margin-left: 0.2rem">系列名不能为空</span>',
                            /!*okText:'确定'*!/
                        });
                        $timeout(function () {
                            alertPopup.close()
                        },1000)
                        return*/
                    }
                }

                var ary =[]
                for(var i=0;i<$scope.requestList.length;i++){
                    if($scope.requestList[i].status==0)
                        ary.push($scope.requestList[i].projectTypeName)
                }
                var nary=ary.sort();
                for(var i=0;i<ary.length;i++){
                    if (nary[i]==nary[i+1]){
                        alert(nary[i]+"已存在，请勿重复添加");
                        return
                    }
                }

                var requestList = {
                    requestList:$scope.requestList
                };
                UpdateTwoLevelProjectType.save(requestList,function(data){
                    if(data.result == '0x00001'){
                       /* var alertPopup = $ionicPopup.alert({
                            template: '<span style="font-size: 0.3rem;color: #333333;margin-left: 0.2rem">保存成功</span>',
                            /!*okText:'确定'*!/
                        });
                        $timeout(function () {
                            alertPopup.close()
                        },500);*/
                        $state.go("projectBrand")
                    }else{
                        alert("保存未成功")
                    }
                })

            };
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                TwoLevelProject.get({
                    id:$stateParams.id
                },function(data){
                    if(data.result==Global.SUCCESS){
                        $ionicLoading.hide();
                        $scope.requestList = data.responseData;
                        if(data.responseData==null){$scope.requestList=[]}
                        for(var i=0;i<$scope.requestList.length;i++){
                            $scope.requestList[i].parentId = $stateParams.id;
                            $scope.param.selTrue.push(false)
                        }
                    }
                });
            })

            $scope.selBtnShow = function(index){
                $scope.param.selTrue[index] =!$scope.param.selTrue[index]
              };
            $scope.sel = function(index){
                if($scope.requestList[index].projectTypeName==''){
                    $scope.requestList.splice(index,1)
                }else{
                    $scope.projectType = $scope.requestList[index];
                    ThreeLevelProject.get({
                        projectTypeTwoId:$scope.projectType.id,
                        projectTypeOneId: $scope.projectType.parentId,
                        projectName:$scope.projectType.projectName,
                        pageSize:'1',
                        status:'0'
                    },function (data) {
                        $scope.threeList=data.responseData;
                        if($scope.threeList && $scope.threeList[0]){
                            alert("对不起，此系列不允许删除");
                            $scope.param.selTrue[index]=false;
                            return false
                        }else{
                            $scope.requestList[index].status = '1'
                        }
                    })
                }
            };
            $scope.addSeriesLis = function(){
                var obj = {
                    status:"0",
                    projectTypeName:"",
                    parentId:$stateParams.id

                };
                $scope.requestList.push(obj)
            }



        }])