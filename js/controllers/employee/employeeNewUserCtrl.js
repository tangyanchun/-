/**
 * Created by Administrator on 2018/6/1.
 */
angular.module('controllers',[]).controller('employeeNewUserCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','Detail','Global','UpdateArchiveInfo','SaveArchiveInfo','ImageBase64UploadToOSS',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,Detail,Global,UpdateArchiveInfo,SaveArchiveInfo,ImageBase64UploadToOSS) {
            $rootScope.title = "";
            //手机号码格式验证
            var phoneReg=/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9]|147|177)\d{8}$/;
            $scope.newUser={
                sex:"女",
                birthday:"",
                constellation:"",
                detail:"",
                sysUserName:"",
                phone:""

            };

            /*点击女*/
            $scope.female=function () {
                $scope.newUser.sex = '女'
            };
            /*点击男*/
            $scope.male=function () {
                $scope.newUser.sex = '男'
            };
            if($stateParams.id!=""){
                Detail.get({
                    id:$stateParams.id
                },function(data){
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $scope.newUser = data.responseData
                    }
                });
            }
            /*上传图片*/
            $scope.reader = new FileReader();   //创建一个FileReader接口
            $scope.thumb = "";      //用于存放图片的base64
            $scope.img_upload = function(files) {

                var file = files[0];
                if(window.FileReader) {
                    var fr = new FileReader();
                    fr.onloadend = function(e) {
                        $scope.thumb = e.target.result;
                        ImageBase64UploadToOSS.save($scope.thumb,function (data) {
                            if(data.errorInfo==Global.SUCCESS&&data.responseData!=null){
                                $scope.newUser.imageUrl.push(data.responseData)
                            }

                        })
                    };
                    fr.readAsDataURL(file);

                }else {
                    alert("浏览器不支持")
                }


            };
            $scope.pho = function () {
                if(!(/^1[34578]\d{9}$/.test($scope.newUser.phone))){
                    alert("手机号格式不正确");
                    $scope.newUser.phone = ''
                }

            };
            /*更新保存*/
            $scope.preservation=function () {
                if($scope.newUser.phone==''||$scope.newUser.sysUserName==""){
                    alert("请检查您的档案信息");
                    return
                }
                if($stateParams.id==""){
                    $scope.shopUserArchivesDTO=$scope.newUser;
                    /*新建保存接口*/
                    SaveArchiveInfo.save($scope.shopUserArchivesDTO,function (data) {
                        $state.go("employeeArchives");
                    })
                }else {
                    $scope.userInformation=$scope.newUser;
                    /*修改档案更新保存*/
                    UpdateArchiveInfo.save($scope.userInformation,function (data) {
                        if(Global.SUCCESS=data.result){
                            $state.go("employeeArchives",{id:$stateParams.id})
                        }
                    });
                }


            }


        }]);