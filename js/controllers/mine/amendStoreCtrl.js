/**
 * Created by Administrator on 2018/5/5.
 */
angular.module('controllers',[]).controller('amendStoreCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetShopInfo','Global','UpdateShopInfo','ImageBase64UploadToOSS',
        function ($scope,$rootScope,$stateParams,$state,GetShopInfo,Global,UpdateShopInfo,ImageBase64UploadToOSS) {

            $rootScope.title = "修改门店";
            GetShopInfo.get({
                sysShopId:$stateParams.sysShopId
            },function(data){
                if(data.result==Global.SUCCESS&&data.responseData!=null){
                    $scope.amendStore = data.responseData
                }

            })
            /*上传图片*/
            $scope.reader = new FileReader();   //创建一个FileReader接口
            $scope.thumb = "";      //用于存放图片的base64
            $scope.img_upload = function(files) {
                if($scope.amendStore.imageList == null){
                    $scope.amendStore.imageList=[]
                }
                if($scope.amendStore.imageList.length>=6){
                    alert("图片上传不能大于6张")
                    return
                }
                var file = files[0];
                if(window.FileReader) {
                    var fr = new FileReader();
                    fr.onloadend = function(e) {
                        $scope.thumb = e.target.result
                        ImageBase64UploadToOSS.save($scope.thumb,function (data) {
                            if(data.result==Global.SUCCESS&&data.responseData!=null){

                                $scope.amendStore.imageList.push(data.responseData)
                            }

                        })
                    };
                    fr.readAsDataURL(file);

                }else {
                    alert("浏览器不支持")
                }


            };
            $scope.delPic = function(index){
                $scope.amendStore.imageList.splice(index,1)
            }

            $scope.save = function () {
                if($scope.amendStore.name=='' || $scope.amendStore.phone==''|| $scope.amendStore.province==''|| $scope.amendStore.city==''|| $scope.amendStore.address==''|| $scope.amendStore.area==''){
                    alert("请检查信息")
                    return
                }
                if($scope.amendStore.phone.length>15){
                    alert("请重新输入电话")
                }
                UpdateShopInfo.save($scope.amendStore,function(data){
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $state.go("basicSetting")
                    }
                })
            }

        }]);