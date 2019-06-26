angular.module('controllers',[]).controller('newUserCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','Detail','Global','UpdateArchiveInfo','SaveArchiveInfo','ImageBase64UploadToOSS','GetBossShopList','$ionicLoading','$http',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,Detail,Global,UpdateArchiveInfo,SaveArchiveInfo,ImageBase64UploadToOSS,GetBossShopList,$ionicLoading,$http) {
            $rootScope.title = "";
            //手机号码格式验证
            var phoneReg=/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9]|147|177)\d{8}$/;
            $scope.param={
                flag:false,
                saveFlag:true
            }
            $scope.newUser={
                    sex:"女",
                    birthday:"",
                    constellation:"",
                    detail:"",
                    sysUserName:"",
                    phone:"",
                    sysShopId:"",
                    sysShopName:"",
                    imageUrl:'https://mx-beauty.oss-cn-beijing.aliyuncs.com/%E5%A4%B4%E5%83%8F.png'
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
                        $scope.newUser.imageUrl=data.responseData[0]
                        $ionicLoading.hide();
                    }
                }).error(function (data) {
                    console.log('upload fail');
                    alert("失败");
                })
            };
            $scope.pho = function () {
                if($scope.newUser.phone!=''){
                    if(!(/^1[34578]\d{9}$/.test($scope.newUser.phone))){
                        alert("手机号格式不正确");
                        $scope.newUser.phone = ''
                        /*$("#pho").focus()*/
                    }
                }


            }

            /*更新保存*/
            $scope.preservation=function () {
                if(!(/^1[34578]\d{9}$/.test($scope.newUser.phone))){
                    alert("手机号格式不正确");
                    $scope.newUser.phone = '';
                    /*$("#pho").focus()*/
                    return
                }
                if($scope.newUser.phone==''||$scope.newUser.sysUserName==""||$scope.newUser.sysShopId==""){
                    alert("请检查您的档案信息");
                    return
                }
                if($stateParams.id==""&&$scope.param.saveFlag==true){
                    $scope.param.saveFlag=false;
                    $scope.shopUserArchivesDTO=$scope.newUser;
                    /*新建保存接口*/
                    SaveArchiveInfo.save($scope.shopUserArchivesDTO,function (data) {
                        $scope.param.saveFlag=true;
                        if(data.result==Global.SUCCESS){
                            $scope.newUser={
                                sex:"女",
                                birthday:"",
                                constellation:"",
                                detail:"",
                                sysUserName:"",
                                phone:""

                            };
                            $state.go("partialFiles");
                        }else if(data.result == '0x00013'){
                            alert("用户已存在")
                        }else{
                            alert("用户保存失败")
                        }

                    })
                }else {
                    $scope.userInformation=$scope.newUser;
                    /*修改档案更新保存*/
                    UpdateArchiveInfo.save($scope.userInformation,function (data) {
                        if(data.result==Global.SUCCESS){
                            $state.go("archives",{id:$stateParams.id})

                        }
                    });
                }
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
                $scope.newUser.sysShopId = id;
                $scope.newUser.sysShopName = sysShopName
            }
            $scope.disNone = function () {
                $scope.param.flag = false;
            }


        }]);