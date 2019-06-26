/**
 * Created by Administrator on 2018/5/5.
 */
angular.module('controllers',[]).controller('modificationInformationCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetCurrentLoginUserInfo','UpdateBossInfo','ImageBase64UploadToOSS','Global','$ionicLoading','$http',
        function ($scope,$rootScope,$stateParams,$state,GetCurrentLoginUserInfo,UpdateBossInfo,ImageBase64UploadToOSS,Global,$ionicLoading,$http) {

            $rootScope.title = "修改资料";
            $scope.userInfo={
                sex:"女"
            };

            /*点击女*/
            $scope.female=function () {
                $scope.userInfo.sex = '女'
            };
            /*点击男*/
            $scope.male=function () {
                $scope.userInfo.sex = '男'
            };

            $scope.getInfo = function () {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetCurrentLoginUserInfo.get(function (data) {
                    $ionicLoading.hide();
                    $scope.userInfo=data.responseData;
                });
            }
            $scope.getInfo()




            /*上传图片*/
            $scope.reader = new FileReader();   //创建一个FileReader接口
            $scope.thumb = "";      //用于存放图片的base64
            $scope.img_upload = function(files) {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });


                var form = new FormData();
                // var file = files[0];
                // form.append('file', file);
                for(var i=0;i<files.length;i++){
                    var reader = new FileReader();
                    reader.readAsDataURL(files[i]);
                    form.append("listFile",files[i]);
                }
                form.append('folder', "bossImage");
                $http({
                    method: 'POST',
                    url: '/system/file/imageUploadToOSS',
                    data: form,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (data) {
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $scope.userInfo.photo=data.responseData[0]
                        $ionicLoading.hide();
                    }
                }).error(function (data) {
                    console.log('upload fail');
                    alert("失败");
                })

            };
            /*修改我的信息*/
            $scope.Preservation=function () {
                /*查询到的所有内容全部保存到修改的接口*/
                UpdateBossInfo.save( $scope.userInfo,function (data) {
                    /*这里面点击保存的时候用户不修改也可以保存，所以不需要判断修改的数据是否为空：（依据美业邦）*/
                    if(data.result=="0x00001"){
                       $state.go("myself")
                    }
                })
            }
        }]);