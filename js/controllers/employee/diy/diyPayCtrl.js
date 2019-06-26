/**
 * Created by Administrator on 2018/11/28.
 */
angular.module('controllers',[]).controller('diyPayCtrl',
    ['$scope','$rootScope','$stateParams','$state','SaveArchive','Global','UserPay','$ionicLoading','$timeout','ConfirmPay',
        function ($scope,$rootScope,$stateParams,$state,SaveArchive,Global,UserPay,$ionicLoading,$timeout,ConfirmPay) {
            var phoneReg=/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9]|147|177)\d{8}$/;/*正则验证手机号*/
        $scope.param={
            redPackerBox:true
        };

        $scope.diyOrderDTO = {
            orderId : $stateParams.orderId,
            userName:'',
            userMobile:'',
            productType:'diy',
            codeUrl:''
        };

        var qrCode = new QRCode(document.getElementById("qrCode"), {
            width: 200,
            height: 200
        });

        $scope.submit=function () {
            if($scope.diyOrderDTO.userName==""||$scope.diyOrderDTO.userMobile==""){
                showToast("还有信息未填哦！");
                hideToast();
                return;
            }
            else if(!phoneReg.test($scope.diyOrderDTO.userMobile)){
                showToast("您的手机号码不正确");
                hideToast();
                return;
            }else {
                SaveArchive.save($scope.diyOrderDTO,function (data) {
                    if(Global.SUCCESS == data.result){
                        showToast("亲，提交成功");
                        hideToast();
                        $scope.param.redPackerBox=false;
                        //获取支付二维码
                        UserPay.get({productType:$scope.diyOrderDTO.productType,orderId:$scope.diyOrderDTO.orderId},function (data) {

                            if(Global.SUCCESS == data.result){
                                $scope.diyOrderDTO.codeUrl = 'http://mx-beauty.oss-cn-beijing.aliyuncs.com/mxbeautybosspayqrcode/'+data.responseData.codeUrl;
                            }else {
                                alert("对不起，"+data.errorInfo);
                                $state.go("chooseSkin")
                            }
                        });
                    }
                });
            }
        };

        $scope.printTicket=function () {
            ConfirmPay.get({orderId:$stateParams.orderId},function (data) {
                if(Global.SUCCESS == data.result){
                    $state.go("printTicket",{orderId:$stateParams.orderId})
                }else {
                    alert("对不起，数据异常");
                }
            });
         };
            var showToast = function (content) {
                $ionicLoading.show({
                    template: content
                });
            };

            var hideToast = function () {
                $timeout(function () {
                    $ionicLoading.hide();
                }, 1000);
            };

}]);