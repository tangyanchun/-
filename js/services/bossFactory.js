var appointmentInfo = '/beauty/appointmentInfo/';
var work = '/beauty/work/';
var clerkWork = '/beauty/clerkWork/';
var stock = '/beauty/stock/';
var consume = '/beauty/consume/';
var  earlyWarning =  '/beauty/earlyWarning/';
var  archives =  '/beauty/archives/';
var clerkSchedule='/beauty/clerkSchedule/';
var shopBossRelation ='/beauty/shopBossRelation/';
var user ='/user/';
var analyze = '/beauty/analyze/';
var consumes = '/beauty/consumes/';
var bossSendMessage = '/beauty/bossSendMessage/';
var cardInfo  = '/beauty/cardInfo/';
var projectInfo  = '/beauty/projectInfo/';
var productInfo  = '/beauty/productInfo/';
var productTypeInfo = '/beauty/productTypeInfo/';
var projectType='/beauty/projectType/';
var shop='/beauty/shop/';
var projectGroupInfo='/beauty/projectGroupInfo/';
var cardHelper ='/beauty/cardHelper/';
var  mine='/beauty/mine/';
var remind='/beauty/remind/';
var file = '/system-service/file/';
var diy = '/diy-service/';

define(['appBoss'], function (app) {
    app
        .factory('GetAllSkinTypeInfo',['$resource',function ($resource){
            return $resource(diy + 'skin/type/getAllSkinTypeInfo')
        }])

        .factory('GetSkinTypeInfoByNo',['$resource',function ($resource){
            return $resource(diy + 'skin/type/getSkinTypeInfoByNo')
        }])

        .factory('GetOrderInfo',['$resource',function ($resource){
            return $resource(diy + 'order/getOrderInfo')
        }])

        .factory('SaveArchive',['$resource',function ($resource){
            return $resource(diy + 'order/saveArchive')
        }])

        .factory('GetTotalPrice',['$resource',function ($resource){
            return $resource(diy + 'order/getTotalPrice')
        }])

        .factory('UpdateOrderInfo',['$resource',function ($resource){
            return $resource(diy + 'order/updateOrderInfo')
        }])

        .factory('UserPay',['$resource',function ($resource){
            return $resource(diy + 'transaction/pay')
        }])

        .factory('ConfirmPay',['$resource',function ($resource){
            return $resource(diy + 'transaction/confirmPay')
        }])

        .factory('GetAllProductInfo',['$resource',function ($resource){
            return $resource(diy + 'product/getAllProductInfo')
        }])

        .factory('GetMaterialInfo',['$resource',function ($resource){
            return $resource(diy + 'material/getMaterialInfo')
        }])

        .factory('GetUserValidateCode',['$resource',function ($resource){
            return $resource(user + 'getUserValidateCode')
        }])
        /*登录*/
        .factory('BossUserLogin',['$resource',function ($resource){
            return $resource(user + 'beautyLogin')
        }])
        /*退出登录*/
        .factory('BossUserLoginOut',['$resource',function ($resource){
            return $resource(user + 'beautyLoginOut')
        }])
       /*根据时间查询各店预约情况*/
        .factory('GetShopAppointmentNumberInfo',['$resource',function ($resource){
            return $resource(appointmentInfo + 'getShopAppointmentNumberInfo')
        }])
        /*根据时间查询某个店的预约详情*/
        .factory('ShopDayAppointmentInfoByDate',['$resource',function ($resource){
            return $resource(appointmentInfo + 'shopDayAppointmentInfoByDate')
        }])
       /*获取某个老板下面的某个店下的某个美容师的预约列表*/
        .factory('GetShopClerkAppointmentInfo',['$resource',function ($resource){
        return $resource(appointmentInfo + 'getShopClerkAppointmentInfo')
        }])
       /*根据预约状态获取某个老板下面的某个店的预约列表*/
        .factory('GetShopAppointmentInfoByStatus',['$resource',function ($resource){
            return $resource(appointmentInfo + 'getShopAppointmentInfoByStatus')
       }])
        /*根据预约主键获取预约*/
        .factory('GetAppointmentInfoById',['$resource',function ($resource){
            return $resource(appointmentInfo + 'getAppointmentInfoById')
        }])
        /*根据预约主键修改此次预约信息（修改预约状态等）*/
        .factory('UpdateAppointmentInfoById',['$resource',function ($resource){
            return $resource(appointmentInfo + 'updateAppointmentInfoById')
        }])

 /*库存*/
        /*入库出库记录*/
        .factory('ShopStockRecordList',['$resource',function ($resource){
            return $resource(stock + 'shopStockRecordList')
        }])
        /*跳转更新时候获取的产品信息和库存*/
        .factory('GetProductInfoAndStock',['$resource',function ($resource){
            return $resource(stock + 'getProductInfoAndStock')
        }])
        /*更新库存实际量和价格*/
        .factory('UpdateStockNumber',['$resource',function ($resource){
            return $resource(stock + 'updateStockNumber')
        }])
        /*入库(确认入库按钮)*/
        .factory('AddStock',['$resource',function ($resource){
            return $resource(stock + 'addStock')
        }])
        /*查询家人列表*/
        .factory('GetClerkInfoList',['$resource',function ($resource){
            return $resource(user + 'getClerkInfoList')
        }])
        /*添加家人*/
        .factory('SaveClerkInfo',['$resource',function ($resource){
            return $resource(user + 'saveClerkInfo')
        }])
        /*查询家人*/
        .factory('ClerkInfo',['$resource',function ($resource){
            return $resource(user + 'clerkInfo/:clerkId',{clerkId:"@clerkId"})
        }])
        /*upDate 家人*/
        .factory('UpdateClerkInfo',['$resource',function ($resource){
            return $resource(user + 'updateClerkInfo')
        }])

/*综合分析*/
        /*根据时间查询某个美容院的耗卡和业绩*/
        .factory('GetExpenditureAndIncome',['$resource',function ($resource){
            return $resource(work + 'getExpenditureAndIncome')
        }])
        /*根据时间获取所有美容院的列表的业绩和卡耗*/
        .factory('GetBossExpenditureAndIncome',['$resource',function ($resource){
            return $resource(work + 'getBossExpenditureAndIncome')
        }])
        /*获取具体某个美容院的业绩和耗卡（包含来源分析）*/
        .factory('GetShopConsumeAndRecharge',['$resource',function ($resource){
            return $resource(work + 'getShopConsumeAndRecharge')
        }])
        /*业绩明细(boss端)*/
        .factory('GetBossPerformance',['$resource',function ($resource){
            return $resource(work + 'getBossPerformance')
        }])
        /*账户信息记录的详细信息*/
        .factory('ConsumeFlowNo',['$resource',function ($resource){
            return $resource(consume+"consumeFlowNo")
        }])
        /*获取当前美容院当前boss的当前家人列表*/
        .factory('GetFamilyList',['$resource',function ($resource){
            return $resource(work+"getFamilyList")
        }])

/*收支分析*/
        /*根据时间获取所有店的总收入以及现金，现金，银行卡支付的收入  某个的也是这个*/
        .factory('GetInComeExpenditureDetail',['$resource',function ($resource){
            return $resource(analyze+"getInComeExpenditureDetail")
        }])
        /*获取全部分店的总收入和现金收入*/
        .factory('GetAllShopIncomeExpenditure',['$resource',function ($resource){
            return $resource(analyze+"getAllShopIncomeExpenditure")
        }])
       
        /*获取某个店的收入明细*/
        .factory('GetIncomeExpenditureAnalysisDetailList',['$resource',function ($resource){
            return $resource(analyze+"getIncomeExpenditureAnalysisDetailList")
        }])
        /*所有店近7 日现金收入趋势  某个店的也是这个*/
        .factory('GetCashEarningsTendency',['$resource',function ($resource){
            return $resource(analyze+"getCashEarningsTendency")
        }])
/*员工分析*/
        /*员工分析列表*/
        .factory('GetClerkAchievementList',['$resource',function ($resource){
            return $resource(analyze+"getClerkAchievementList")
        }])

        /*顾客到店*/
        .factory('GetCustomerArriveList',['$resource',function ($resource){
            return $resource(analyze+"getCustomerArriveList")
        }])



  /*工作首页*/
        /*获取人头数，人次数，新客，服务次数*/
        .factory('GetBossAchievement',['$resource',function ($resource){
            return $resource(work+"getBossAchievement")
        }])

   /*档案*/
        /*预警档案*/
        .factory('GetEarlyWarningList',['$resource',function ($resource){
            return $resource(earlyWarning+"getEarlyWarningList")
        }])
        /*用户档案详情*/
        .factory('Detail',['$resource',function ($resource){
            return $resource(archives+"detail/:id",{id:"@id"})
        }])
        /*用户档案详情*/
        .factory('Consumes',['$resource',function ($resource){
            return $resource(consumes)
        }])
        /*用户档案详情*/
        .factory('GetUserRechargeCardList',['$resource',function ($resource){
            return $resource(cardInfo+'getUserRechargeCardList')
        }])
        /*获取疗程卡的消费记录*/
        .factory('GetUserConsumeByFlowId',['$resource',function ($resource){
            return $resource(consume+'getUserConsumeByFlowId')
        }])




 /*行政管理*/
        /*查询老板的门店*/
        .factory('GetBossShopList',['$resource',function ($resource){
            return $resource(shopBossRelation+"getBossShopList")
        }])

      /*获取档案列表*/
        .factory('FindArchives',['$resource',function ($resource){
            return $resource(archives+"findArchives")
        }])
    /*查询美容师排班信息*/
        .factory('GetShopClerkScheduleList',['$resource',function ($resource){
            return $resource(clerkSchedule+"getShopClerkScheduleList")
        }])

      /*获取用户的疗程卡界面*/
        .factory('GetUserCourseProjectList',['$resource',function ($resource){
            return $resource(projectInfo+"getUserCourseProjectList")
        }])
       /*获取用户的产品界面*/
        .factory('GetUserProductList',['$resource',function ($resource){
            return $resource(productInfo+"getUserProductList")
        }])
        /*获取用户的套卡界面*/
        .factory('GetUserProjectGroupList',['$resource',function ($resource){
            return $resource(projectInfo+"getUserProjectGroupList")
        }])
      /* 更新用户的档案信息*/
        .factory('UpdateArchiveInfo',['$resource',function ($resource){
            return $resource(archives+"updateArchiveInfo")
        }])
/*产品品牌*/
        /* 查询某个店的产品信息*/
        .factory('SearchShopProductList',['$resource',function ($resource){
            return $resource(productInfo+"searchShopProductList")
        }])
        /* 添加产品品牌*/
        .factory('SaveProductTypeInfo',['$resource',function ($resource){
            return $resource(productTypeInfo+"saveProductTypeInfo")
        }])
        /* 修改产品品牌*/
        .factory('UpdateOneLevelTypeInfo',['$resource',function ($resource){
            return $resource(productTypeInfo+"updateOneLevelTypeInfo")
        }])
        /* 修改产品系列*/
        .factory('UpdateTwoLevelTypeInfo',['$resource',function ($resource){
            return $resource(productTypeInfo+"updateTwoLevelTypeInfo")
        }])

    /*项目大类设置*/
        /*查询项目类别信息*/
        .factory('SearchShopProjectList',['$resource',function ($resource){
            return $resource(projectInfo+"searchShopProjectList")
        }])
      /*添加项目类别接口*/
        .factory('SaveShopProjectType',['$resource',function ($resource){
            return $resource(projectType+"saveShopProjectType")
        }])
    /*修改项目类别*/
        .factory('UpdateOneLevelProjectType',['$resource',function ($resource){
            return $resource(projectType+"updateOneLevelProjectType")
        }])
    /*修改项目系列*/
        .factory('UpdateTwoLevelProjectType',['$resource',function ($resource){
            return $resource(projectType+"updateTwoLevelProjectType")
        }])
        /* 获取二级产品列表*/
        .factory('TwoLevelProduct',['$resource',function ($resource){
            return $resource(productInfo+"twoLevelProduct")
        }])
 /*美容院设置*/
        /* 查询美容院设置*/
        .factory('GetBossShopInfo',['$resource',function ($resource){
            return $resource(shop+"getBossShopInfo")
        }])
        /* 保存美容院设置*/
        .factory('UpdateShopInfo',['$resource',function ($resource){
            return $resource(shop+"updateShopInfo")
        }])
/*编辑分店*/
        /* 查询分店列表*/
        .factory('GetBossAllShopList',['$resource',function ($resource){
            return $resource(shop+"getBossAllShopList")
        }])
        /* 查询某个门店*/
        .factory('GetShopInfo',['$resource',function ($resource){
            return $resource(shop+"getShopInfo")
        }])

       /*获取二级项目列表*/
        .factory('TwoLevelProject',['$resource',function ($resource){
            return $resource(projectInfo+"twoLevelProject")
        }])

        .factory('GetShopProductLevelInfo',['$resource',function ($resource){
            return $resource(productTypeInfo+"getShopProductLevelInfo")
        }])

        .factory('ShopStockRecordDetail',['$resource',function ($resource){
            return $resource(stock+"shopStockRecordDetail")
        }])

        /*获取预警产品列表*/
        .factory('GetEarlyWarningProductLevelInfo',['$resource',function ($resource){
            return $resource(productTypeInfo+"getEarlyWarningProductLevelInfo")
        }])


    /*删除修改产品*/
        /*获取客装产品列表*/
        .factory('GetShopProductLevelInfo',['$resource',function ($resource){
            return $resource(productTypeInfo+"getShopProductLevelInfo")
        }])
        /*查询产品的详细信息*/
        .factory('ProductInfoMess',['$resource',function ($resource){
            return $resource(productInfo+"/:productId",{ productId: '@productId' })
        }])
        /*查询产品的详细信息*/
        .factory('UpdateProductInfo',['$resource',function ($resource){
            return $resource(productInfo+"updateProductInfo")
        }])
        /*添加产品*/
        .factory('SaveProductInfo',['$resource',function ($resource){
            return $resource(productInfo+"saveProductInfo")
        }])
/*套卡*/
        /*获取套卡列表*/
        .factory('GetShopProjectGroups',['$resource',function ($resource){
            return $resource(cardInfo+"getShopProjectGroups")
        }])
        /*查询套卡的详细信息*/
        .factory('GetShopProjectGroupDetail',['$resource',function ($resource){
            return $resource(cardInfo+"getShopProjectGroup/detail")
        }])
        /*查询套卡的详细信息*/
        .factory('SearchShopProjectList',['$resource',function ($resource){
            return $resource(projectInfo+"searchShopProjectList")
        }])
        /*获取充值卡列表*/
        .factory('GetRechargeCardList',['$resource',function ($resource){
            return $resource(cardInfo+"getRechargeCardList")
        }])
        /*查询充值卡详细信息*/
        .factory('RechargeCardDetail',['$resource',function ($resource){
            return $resource(cardInfo+":id",{ id: '@id' })
        }])
        /*查询某店二级和三级的项目列表*/
        .factory('GetShopTwoLevelProjectList',['$resource',function ($resource){
            return $resource(projectInfo+'getShopTwoLevelProjectList')
        }])
        /*编辑后保存套卡*/
        .factory('UpdateProjectGroupInfo',['$resource',function ($resource){
            return $resource(projectGroupInfo+'updateProjectGroupInfo')
        }])
        /*编辑后保存套卡*/
        .factory('SaveProjectGroupInfo',['$resource',function ($resource){
            return $resource(projectGroupInfo+'saveProjectGroupInfo')
        }])
        /*查询充值卡的适用范围*/
        .factory('GetGoodsUseScope',['$resource',function ($resource){
            return $resource(cardHelper+'getGoodsUseScope')
        }])
/*排班提醒*/
        /*查询排班设置*/
        .factory('GetBossShopScheduleSetting',['$resource',function ($resource){
            return $resource(clerkSchedule+'getBossShopScheduleSetting')
        }])
        /*修改排班设置*/
        .factory('UpdateBossShopScheduleSetting',['$resource',function ($resource){
            return $resource(clerkSchedule+'updateBossShopScheduleSetting')
        }])
        /*添加充值卡*/
        .factory('SaveRechargeCardInfo',['$resource',function ($resource){
            return $resource(cardInfo+'saveRechargeCardInfo')
        }])
        /*保存充值卡 update*/
        .factory('UpdateRechargeCardInfo',['$resource',function ($resource){
            return $resource(cardInfo+'updateRechargeCardInfo')
        }])

      /*查询提醒设置*/
        .factory('GetShopRemindSetting',['$resource',function ($resource){
            return $resource(remind+"getShopRemindSetting")
        }])
       /*修改提醒设置*/
        .factory('UpdateShopRemindSetting',['$resource',function ($resource){
            return $resource(remind+"updateShopRemindSetting")
        }])
      /*选择分类*/
        .factory('OneLevelProject',['$resource',function ($resource){
            return $resource(projectInfo+"oneLevelProject")
        }])
        /*添加项目*/
        .factory('SaveProjectInfo',['$resource',function ($resource){
            return $resource(projectInfo+"saveProjectInfo")
        }])
         /*修改项目*/
        .factory('UpdateProjectInfo',['$resource',function ($resource){
            return $resource(projectInfo+"updateProjectInfo")
        }])
        /*单个项目详情*/
        .factory('ProjectInfo',['$resource',function ($resource){
            return $resource(projectInfo+"/:id", { id: '@id' })
        }])
       /*获取一级产品列表*/
        .factory('OneLevelProduct',['$resource',function ($resource){
            return $resource(productInfo+"oneLevelProduct")
        }])
       /*获取三级级项目列表*/
        .factory('ThreeLevelProject',['$resource',function ($resource){
            return $resource(projectInfo+"threeLevelProject")
        }])
      /*获取产品三级列表*/
        .factory('ThreeLevelProduct',['$resource',function ($resource){
            return $resource(productInfo+"threeLevelProduct")
        }])
     /*获取套卡列表*/
        .factory('GetShopProjectGroups',['$resource',function ($resource){
            return $resource(cardInfo+"getShopProjectGroups")
        }])
     /*获取充值卡列表*/
        .factory('GetRechargeCardList',['$resource',function ($resource){
            return $resource(cardInfo+"getRechargeCardList")
        }])
    /*查询我的信息*/
        .factory('GetCurrentLoginUserInfo',['$resource',function ($resource){
            return $resource(mine+"getCurrentLoginUserInfo")
        }])
     /*修改我的信息*/
        .factory('UpdateBossInfo',['$resource',function ($resource){
            return $resource(mine+"updateBossInfo")
        }])
    /*查询排班设置*/
        .factory('GetBossShopScheduleSetting',['$resource',function ($resource){
            return $resource(clerkSchedule+"getBossShopScheduleSetting")
        }])
    /*查询充值卡详细信息*/
        .factory('CardInfo',['$resource',function ($resource){
            return $resource(cardInfo+"/:id", { id: '@id' })
        }])
     /*查询套卡的详细信息*/
        .factory('cardDetails',['$resource',function ($resource){
            return $resource(cardInfo+"getShopProjectGroup/detail")
        }])
　　　/*保存用户档案信息*/
        .factory('SaveArchiveInfo',['$resource',function ($resource){
            return $resource(archives+"saveArchiveInfo")
        }])

        .factory('GetStockNumber',['$resource',function ($resource){
            return $resource(stock + "getStockNumber")
        }])
        .factory('GetStockDetailList',['$resource',function ($resource){
            return $resource(stock + "getStockDetailList")
        }])
        .factory('GetProductStockDetail',['$resource',function ($resource){
            return $resource(stock + "getProductStockDetail")
        }])
        /*base64位图片上传*/
        .factory('ImageBase64UploadToOSS',['$resource',function ($resource){
            return $resource(file+"imageBase64UploadToOSS")
        }])
        /*老板切换店铺*/
        .factory('BossSwitchShops',['$resource',function ($resource){
            return $resource(shop+"bossSwitchShops")
        }])
        .factory('GetStockNumber',['$resource',function ($resource){
            return $resource(stock + "getStockNumber")
        }])
        .factory('GetStockDetailList',['$resource',function ($resource){
            return $resource(stock + "getStockDetailList")
        }])
    /*顾客到店下某个美容院的人头数，新客，人次数详情*/
        .factory('GetShopCustomerArriveList',['$resource',function ($resource){
            return $resource(analyze + 'getShopCustomerArriveList')
        }])




        .factory('GetProductStockDetail',['$resource',function ($resource){
            return $resource(stock + "getProductStockDetail")
        }])
       /*员工端的排班*/
        .factory('GetShopClerkScheduleListForClerk',['$resource',function ($resource){
            return $resource(clerkSchedule + "getShopClerkScheduleListForClerk")
        }])
       /*员工端的综合分析*/
        .factory('GetClerkPerformanceList',['$resource',function ($resource){
            return $resource(clerkWork + "getClerkPerformanceList")
        }])
        .factory('GetClerkWorkDetail',['$resource',function ($resource){
            return $resource(clerkWork + "getClerkWorkDetail")
        }])
        /*获取疗程和套卡的划卡记录*/
        .factory('TreatmentAndGroupCardRecordList',['$resource',function ($resource){
            return $resource(consume + "treatmentAndGroupCardRecordList")
        }])
        /*获取用户的划卡记录*/
        .factory('UserStampCardRecordList',['$resource',function ($resource){
            return $resource(consume + "userStampCardRecordList")
        }])
        /*疗程卡消费详情*/
        .factory('FlowId',['$resource',function ($resource){
            return $resource(consume + "flowId")
        }])
        /*疗程卡消费详情*/
        .factory('Id',['$resource',function ($resource){
            return $resource(consume + "id")
        }])
        /*选择仓库*/
        .factory('FindStoreList',['$resource',function ($resource){
            return $resource(stock + "findStoreList")
        }])
        /*获取仓库的库管员(库管设置)*/
        .factory('GetStoreManager',['$resource',function ($resource){
            return $resource(stock + "getStoreManager")
        }])
        /*仓库管理员设置*/
        .factory('SetStorekeeper',['$resource',function ($resource){
            return $resource(stock + "setStorekeeper")
        }])
        /*搜索我的>家人*/
        .factory('GetClerkBySearchFile',['$resource',function ($resource){
            return $resource(user + "getClerkBySearchFile")
        }])

        /*查询某个店员的排班信息*/
        .factory('GetClerkScheduleOneDayInfo',['$resource',function ($resource){
            return $resource(clerkSchedule + "getClerkScheduleOneDayInfo")
        }])
        /*员工的业绩，耗卡，卡耗明细列表*/
        .factory('GetBossPerformanceList',['$resource',function ($resource){
            return $resource(work + "getBossPerformanceList")
        }])
        /*获取具体某个店员的业绩和耗卡（包含来源分析）*/
       /* .factory('GetClerkWorkDetail',['$resource',function ($resource){
            return $resource(clerkWork + "getClerkWorkDetail")
        }])*/


        /*获取用户产品的领取记录*/
        .factory('GetProductDrawRecord',['$resource',function ($resource){
            return $resource(consume + "getProductDrawRecord")
        }])
        /*员工的业绩，耗卡，卡耗明细列表*/
        .factory('GetClerkPerformanceListClerk',['$resource',function ($resource){
            return $resource(clerkWork + "getClerkPerformanceList")
        }])
        /*获取产品的消费详情和充值卡的订单详情*/
        .factory('ProductAndRechargeCard',['$resource',function ($resource){
            return $resource(consume + "productAndRechargeCard/getConsumeDetail")
        }])
        /*获取特殊类型充值卡的充值记录(档案-总余额-选择账户余额充值卡)*/
        .factory('GetRechargeRecord',['$resource',function ($resource){
            return $resource(consume + "getRechargeRecord")
        }])

        //获取当前老板下面对应的店铺
        .factory('FindStoreList',['$resource',function ($resource){
            return $resource(stock + "findStoreList")
        }])


        //获取产品详细信息根据扫描编码
        .factory('GetProductInfoByScanCode',['$resource',function ($resource){
            return $resource(productInfo + "getProductInfoByScanCode")
        }])


        //获取产品详细信息根据扫描编码getProductInfoScan
        .factory('GetProductInfo',['$resource',function ($resource){
            return $resource(productInfo + "getProductInfo")
        }])

         //获取产品详细信息根据扫描编码
        .factory('GetProductInfoScan',['$resource',function ($resource){
            return $resource(productInfo + "getProductInfoScan")
        }])


        //产品领取记录详情
        .factory('getProductDrawRecordDetail',['$resource',function ($resource){
            return $resource(consume + "getProductDrawRecord/detail")
        }])

        //老板发送消息给用户
        .factory('SendMessageToUser', ['$resource', function($resource) {
            return $resource(bossSendMessage + '/sendMessageToUser')
        }])

        //根据messageId查询消息
        .factory('GetShopBossSendMessage', ['$resource', function($resource) {
            return $resource(bossSendMessage + '/getShopBossSendMessage')
        }])

        .factory('CheackUser', ['$resource', function($resource) {
            return $resource(mine+"getBossInfo")
        }])
        //删除员工
        .factory('DelClerkInfo', ['$resource', function($resource) {
            return $resource(user + "delClerkInfo")
        }])
         //档案排序
        .factory('FindArchivesByType', ['$resource', function($resource) {
            return $resource(archives + "findArchivesByType")
        }])
        //删除档案
        .factory('DeleteArchiveInfo', ['$resource', function($resource) {
            return $resource(archives + "deleteArchiveInfo")
        }])
});
