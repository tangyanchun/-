var receiveOrderAddressId = "";
var productType = "";
var loginttoken = window.localStorage.getItem("logintoken");
var buyOrderAddressId = window.localStorage.getItem("buyOrderAddressId");
var orderIds = [];
var trainingProductId = "";
var specialShopId = "";

var GetQueryString = function(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

var orderPayInit = function(){

    var timestamp;//时间戳
    var nonceStr;//随机字符串
    var signature;//得到的签名
    var appid;//得到的签名

    $.ajax({
        url:"/weixin/customer/getConfig",// 跳转到 action
        async:true,
        type:'get',
        data:{url:location.href.split('#')[0]},//得到需要分享页面的url
        cache:false,
        dataType:'json',
        success:function(data) {
            var configValue = data.responseData;
            if(configValue!=null ){
                timestamp = configValue.timestamp;//得到时间戳
                nonceStr = configValue.nonceStr;//得到随机字符串
                signature = configValue.signature;//得到签名
                appid = configValue.appid;//appid

                //微信配置
                wx.config({
                    debug: false,
                    appId: appid,
                    timestamp:timestamp,
                    nonceStr: nonceStr,
                    signature: signature,
                    jsApiList: [
                        'chooseWXPay'
                    ] // 功能列表
                });
                wx.ready(function () {
                    // config信息验证后会执行ready方法，
                    // 所有接口调用都必须在config接口获得结果之后，
                    // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
                    // 则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，
                    // 则可以直接调用，不需要放在ready函数中。
                })
            }else{
            }
        },
        error : function() {
        }
    });

    productType = GetQueryString("productType");
    specialShopId = GetQueryString("specialShopId");

    if(productType=='offline'||productType=='special')
    {
        var userAddressInfo = {};
        var needPayOrderList = {};
        //通过ajax接口来获取用户的信息，包括用户名，手机号，和收货地址
        if(buyOrderAddressId!=undefined||buyOrderAddressId!=null)
        {
            receiveOrderAddressId = buyOrderAddressId;
            $.ajax({
                url:"/business/transaction/getUserAddressUsedInfoByAddressId",// 跳转到 action
                beforeSend: function(request) {
                    request.setRequestHeader("logintoken", loginttoken);
                },
                async:true,
                type:'get',
                data:{addressId:receiveOrderAddressId},
                cache:false,
                success:function(data) {

                    if(data.errorInfo=='0x00006')
                    {
                        //没有登录，先去登录页
                        window.location.href = "#/login/" + "shopHome";
                    }
                    else
                    {
                        userAddressInfo = data.responseData;
                        var userAddressInfoHtml = '<div onclick="addressManagement()"><ion class="ion ion-location" style="position:absolute;margin-top:8px;font-size:1.5rem;"></ion>' +
                            '<div style="margin-left:20px"> ' +
                            '<p style="font-size: 14px;color: #333333">收货人：'+ userAddressInfo.userName +'<span style="float:right;margin-right:0.4rem;font-size: 14px;color: #333333">'+userAddressInfo.userPhone+'</span></p> ' +
                            '<ion class="ion ion-ios-arrow-right item-note" style="font-size: 20px"></ion> ' +
                            '<p style="margin-top: 18px;font-size: 14px;color: #333333">'+userAddressInfo.province + userAddressInfo.city +userAddressInfo.detailAddress+'</p> </div></div>'
                        $('#userAddressInfo').html(userAddressInfoHtml);
                        receiveOrderAddressId = userAddressInfo.id;
                        window.localStorage.removeItem("buyOrderAddressId");
                    }
                },
                error : function() {
                }
            });

        }else
        {
            $.ajax({
                url:"/business/transaction/userAddressUsedInfo",// 跳转到 action
                beforeSend: function(request) {
                    request.setRequestHeader("logintoken", loginttoken);
                },
                async:true,
                type:'get',
                data:'',
                cache:false,
                success:function(data) {

                    if(data.errorInfo=='0x00006')
                    {
                        //没有登录，先去登录页
                        window.location.href = "#/login/" + "shopHome";
                    }
                    else
                    {
                        if(data.result=="0x00011"||data.responseData.userName==undefined)//用户还没有任何收获地址信息
                        {
                            userAddressInfo = data.responseData;
                            var userAddressInfoHtml = '<div onclick="addressManagement()"><center> <h1 style="background: red;font-size: 18px;width: 16rem;color: white;">' +
                                '您没有选中任何收获地址信息</h1> </center> <i class="ion ion-ios-arrow-right" style="float: right;margin-top: -18px;"></i></div>'
                            $('#userAddressInfo').html(userAddressInfoHtml);

                        }
                        else
                        {
                            userAddressInfo = data.responseData;
                            var userAddressInfoHtml = '<div onclick="addressManagement()"><ion class="ion ion-location" style="position:absolute;margin-top:8px;font-size:1.5rem;"></ion>' +
                                '<div style="margin-left:20px"> ' +
                                '<p style="font-size: 14px;color: #333333">收货人：'+ userAddressInfo.userName +'<span style="float:right;margin-right:0.4rem;font-size: 14px;color: #333333">'+userAddressInfo.userPhone+'</span></p> ' +
                                '<ion class="ion ion-ios-arrow-right item-note" style="font-size: 20px"></ion> ' +
                                '<p style="margin-top: 18px;font-size: 14px;color: #333333">'+userAddressInfo.province + userAddressInfo.city +userAddressInfo.detailAddress+'</p> </div></div>'
                            $('#userAddressInfo').html(userAddressInfoHtml);
                            receiveOrderAddressId = userAddressInfo.id;
                        }
                    }
                },
                error : function() {
                }
            });

        }

        //通过ajax接口，获取用户的已选择订单的数据
        $.ajax({
            url:"/business/transaction/getNeedPayOrderListToRedis",// 跳转到 action
            beforeSend: function(request) {
                request.setRequestHeader("logintoken", loginttoken);
            },
            async:true,
            type:'get',
            data:'',
            cache:false,
            success:function(data) {
                console.log(data);
                if(data.errorInfo=='0x00006')
                {
                    window.location.href = "#/login/" + "businessOrderPay";
                }
                else
                {
                    var totalPrice = 0;

                    if(data.result=='0x00002')
                    {
                        //加载提示页
                    }
                    else if(data.result=='0x00001')
                    {
                        needPayOrderList = data.responseData.needPayOrderList;
                        var needPayOrderListHtml = "";
                        $.each(needPayOrderList,function(index,value){
                            needPayOrderListHtml = needPayOrderListHtml +
                                '<div class="list" style="margin-top:5px;margin-left:-1rem"> ' +
                                '<div class="item item-avatar" style="min-height:2.5rem"> ' +
                                '<img src="' + value.productFirstUrl +'"style="width: 1.92rem;height: 1.92rem;border-radius: 0;margin-left: 1.2rem; min-height: 6rem; min-width: 6rem;"> ' +
                                '<div style="margin-left:48px"> <p style="margin-left:1.5rem;font-size: 15px;color: #333333">'+ value.productName +'</p>' +
                                ' <p style="margin-left:1.5rem;color: #b2b2b2;;margin-top: 10px">' + value.productSpec + '</p> <br> <br>' +
                                ' <p style="margin-left:1.2rem;font-size:1.2rem;color: #ff4a59"> ￥'+ value.productPrice +'<span style="color:#333333;float: right;font-size:15px">X'+ value.productNum +'</span> </p>' +
                                ' </div> </div> <p class="item"><span style="margin-left:1rem;font-size: 15px;color: #000033">运费</span><span style="float:right;font-size: 15px;color: #333333">快递：￥0</span></p> ' +
                                '<p class="item"> <span style="float: right;font-size: 13px;color: #333333">共' + value.productNum +'件商品 小计：<span style="font-size:20px;color:#ff4a59">' +
                                '￥'+ parseInt(value.productNum)*parseInt(value.productPrice)+'</span> </span> </p> </div>';
                        })
                        $('#needPayOrderList').html(needPayOrderListHtml);

                        $.each(needPayOrderList,function(index,value){
                            totalPrice = totalPrice + parseInt(value.productNum)*parseInt(value.productPrice);
                            trainingProductId = value.productId;
                            orderIds.push(needPayOrderList[index].orderId);
                        })
                        // orderId = needPayOrderList[0].orderId;
                    }

                    var totalPriceHtml = '<span style="color: #ff4a59;font-size: 16px">￥'+ totalPrice  +'</span>';
                    $('#totalPrice').html(totalPriceHtml);
                }
            },
            error : function() {
            }
        });
    }
    else if(productType=='trainingProduct'||productType=='recharge')
    {
        $("#invoiceBox").hide();
        var needPayOrderList = {};
        //通过ajax接口，获取用户的已选择订单的数据
        $.ajax({
            url:"/business/transaction/getNeedPayOrderListToRedis",// 跳转到 action
            beforeSend: function(request) {
                request.setRequestHeader("logintoken", loginttoken);
            },
            async:true,
            type:'get',
            data:'',
            cache:false,
            success:function(data) {
                if(data.errorInfo=='0x00006')
                {
                    window.location.href = "#/login/" + "businessOrderPay";
                }
                else
                {
                    var totalPrice = 0;

                    if(data.result=='0x00002')
                    {
                        //加载提示页
                    }
                    else if(data.result=='0x00001')
                    {
                        needPayOrderList = data.responseData.needPayOrderList;
                        var needPayOrderListHtml = "";
                        $.each(needPayOrderList,function(index,value){
                            needPayOrderListHtml = needPayOrderListHtml +
                                '<div class="list" style="margin-top:5px;margin-left:-1rem"> ' +
                                '<div class="item item-avatar" style="min-height:2.5rem"> ' +
                                '<img src="' + value.productFirstUrl +'"style="width: 1.92rem;height: 1.92rem;border-radius: 0;margin-left: 1.2rem; min-height: 6rem; min-width: 6rem;"> ' +
                                '<div style="margin-left:48px"> <p style="margin-left:1.5rem;color: #333333;font-size: 15px">'+ value.productName +'</p>' +
                                ' <p style="margin-left:1.5rem;color: #b2b2b2;margin-top: 10px">' + value.productSpec + '</p> <br> <br>' +
                                ' <p style="margin-left:1.2rem;font-size:1.2rem;color: #ff4a59"> ￥'+ value.productPrice +'<span style="color:#333333;float: right;font-size: 15px;">X'+ value.productNum +'</span> </p>' +
                                ' </div> </div> <p class="item"><span style="margin-left:1rem;font-size: 15px;color: #000033">运费</span><span style="float:right;font-size: 15px;color: #333333">快递：￥0</span></p> ' +
                                '<p class="item"> <span style="float: right;font-size: 13px;color: #333333">共' + value.productNum +'件商品 小计：<span style="font-size:20px;color:#ff4a59">' +
                                '￥'+ value.productPrice +'</span> </span> </p> </div>';
                        })
                        $('#needPayOrderList').html(needPayOrderListHtml);

                        $.each(needPayOrderList,function(index,value){
                            totalPrice = value.productPrice;
                            trainingProductId = value.productId;
                        })
                    }

                    var totalPriceHtml = '<span style="color: #ff4a59;font-size: 16px">￥'+ totalPrice  +'</span>';
                    $('#totalPrice').html(totalPriceHtml);
                }
            },
            error : function() {
            }
        });
    }

}

$('#payButton').attr('disabled',"true");//添加disabled属性
var confirmPay = function(){
    if(receiveOrderAddressId==""&&(productType=='offline'||productType=='special'))
    {
        alert("请先选择收货地址");
    }
    else
    {
        if(productType=='trainingProduct'||productType=='recharge')
        {
            $.ajax({
                url:"/business/transaction/pay/"+productType,// 跳转到 action
                beforeSend: function(request) {
                    request.setRequestHeader("logintoken", loginttoken);
                },
                async:true,
                type:'get',
                data:'',
                cache:false,
                success:function(data) {
                    $('#payButton').removeAttr("disabled");
                    if(data.result=="0x00001")
                    {
                        var payResult = data.responseData;
                        if(payResult.agent < 5){
                            alert("您的微信版本低于5.0无法使用微信支付");
                            return;
                        }
                        else if(payResult.agent == 6)
                        {
                            alert("支付失败,请重新支付");
                            return;
                        }else if(payResult.agent == 7)
                        {
                            alert("该订单已支付,请到我的预约中进行查看");
                            return;
                        }

                        wx.chooseWXPay({
                            appId:payResult.appId,
                            timestamp:payResult.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            nonceStr:payResult.nonceStr,  // 支付签名随机串，不长于 32 位
                            package:payResult.packageData,// 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                            signType:payResult.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            paySign:payResult.paySign,  // 支付签名
                            success: function (res) {
                                if(res.errMsg == "chooseWXPay:ok" ) {
                                    //支付成功后， 跳转到支付成功页
                                    if(productType=='offline'||productType=='special')
                                    {
                                        window.location.href = "#/paySuccess";
                                    }else if(productType=='trainingProduct')
                                    {
                                        window.location.href = "#/trainingProductLearning/"+trainingProductId;
                                    }else if(productType=='recharge'){
                                        window.location.href = "#/paySuccess";
                                    }
                                }else{
                                    alert("支付失败,请重新支付")
                                }
                            },
                            fail: function (res) {
                                alert(res.errMsg)
                            }
                        });

                    }
                    else
                    {
                        alert("支付失败，请重新支付");
                    }
                },
                error : function() {
                }
            });
        }
        else if(productType=='offline'||productType=='special')
        {
            if(productType=='special')
            {
                $("#specialProductInfo").show();
            }
            else
            {
                processPay();
            }
        }
    }
};

var processPay = function(){
    //如果是微商城商品，则给订单补充上地址ID
    $.ajax({
        url:"/business/transaction/updateBusinessOrderAddress",// 跳转到 action
        beforeSend: function(request) {
            request.setRequestHeader("logintoken", loginttoken);
        },
        async:true,
        type:'get',
        data:{orderIds:orderIds,orderAddressId:receiveOrderAddressId},
        cache:false,
        success:function(data) {
            if(data.result=="0x00001"){
                $.ajax({
                    url:"/business/transaction/pay/"+productType,// 跳转到 action
                    beforeSend: function(request) {
                        request.setRequestHeader("logintoken", loginttoken);
                    },
                    async:true,
                    type:'get',
                    data:'',
                    cache:false,
                    success:function(data) {
                        $('#payButton').removeAttr("disabled");
                        if(data.result=="0x00001")
                        {
                            var payResult = data.responseData;
                            if(payResult.agent < 5){
                                alert("您的微信版本低于5.0无法使用微信支付");
                                return;
                            }
                            else if(payResult.agent == 6)
                            {
                                alert("支付失败,请重新支付");
                                return;
                            }else if(payResult.agent == 7)
                            {
                                alert("该订单已支付,请到我的预约中进行查看");
                                return;
                            }

                            wx.chooseWXPay({
                                appId:payResult.appId,
                                timestamp:payResult.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                nonceStr:payResult.nonceStr,  // 支付签名随机串，不长于 32 位
                                package:payResult.packageData,// 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                                signType:payResult.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                paySign:payResult.paySign,  // 支付签名
                                success: function (res) {
                                    if(res.errMsg == "chooseWXPay:ok" ) {
                                        //支付成功后， 跳转到支付成功页
                                        if(productType=='offline'||productType=='special')
                                        {
                                            window.location.href = "#/paySuccess";
                                        }else if(productType=='trainingProduct')
                                        {
                                            window.location.href = "#/trainingProductLearning/"+trainingProductId;
                                        }
                                    }else{
                                        alert("支付失败,请重新支付")
                                    }
                                },
                                fail: function (res) {
                                    alert(res.errMsg)
                                }
                            });

                        }
                        else
                        {
                            alert("支付失败，请重新支付");
                        }
                    },
                    error : function() {
                    }
                });
            }
        },
        error : function() {
        }
    });
}

var url=window.location.search;
$(document).ready(function(){
    if(url.substring(url.length-1)=="a"){
        console.log(1);
        $("input[type='checkbox']").prop("checked",true);
    }
});

//点击复选框跳转页面
var check=function(){
   if($("#checkbox-id").prop("checked")){
       window.location.href="#/invoice/"+orderIds;
   }
}

var addressManagement = function(){
    window.localStorage.setItem("productType",productType);
    window.location.href = "#/addressManagement/orderPay.do";
}

var confirmUserInfo = function(){
    $.ajax({
        url:"/user/customer/queryRealNameAuthentication",// 跳转到 action
        beforeSend: function(request) {
            request.setRequestHeader("logintoken", loginttoken);
        },
        async:true,
        type:'get',
        data:{cardNo:$('#userIdentifyNum').val(),name:$('#userName').val(),orderIds:orderIds,specialShopId:specialShopId},
        cache:false,
        success:function(data) {
            if($('#userName').val()==data.name&&data.result=='匹配')
            {
                $('#specialProductInfo').hide();
                processPay();
            }
            else
            {
                alert("跨境商品收货人的身份证号和姓名不匹配，请重新输入");
            }
        }
    })
}

var cancelUserInfo = function(){
    $('#specialProductInfo').hide();
}