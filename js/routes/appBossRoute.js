/**
 * 路由
 */
define(['appBoss'], function(app){
    return app
        .config(['$stateProvider','$urlRouterProvider',
            function($stateProvider,$urlRouterProvider) {
                var loadFunction = function($templateCache, $ocLazyLoad, $q, $http,name,files,htmlURL){
                    lazyDeferred = $q.defer();
                    return $ocLazyLoad.load ({
                        name: name,
                        files: files
                    }).then(function() {
                        return $http.get(htmlURL)
                            .success(function(data, status, headers, config) {
                                return lazyDeferred.resolve(data);
                            }).
                            error(function(data, status, headers, config) {
                                return lazyDeferred.resolve(data);
                            });
                    });
                };

                $stateProvider
                    /*工作首页*/
                    .state('workHome', {
                        url: '/workHome',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'workHomeCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.shopHomeCtrl',
                                    ['js/controllers/work/workHomeCtrl.js?ver='+ bossVersion],
                                    'views/work/workHome.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('comprehensive', {
                        url: '/comprehensive',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'comprehensiveCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.shopHomeCtrl',
                                    ['js/controllers/work/comprehensiveCtrl.js?ver='+ bossVersion],
                                    'views/work/comprehensive.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*顾客到店*/
                    .state('customerStore', {
                        url: '/customerStore',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'customerStoreCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.shopHomeCtrl',
                                    ['js/controllers/work/customerStoreCtrl.js?ver='+ bossVersion],
                                    'views/work/customerStore.html?ver=' + bossVersion);
                            }
                        }
                    });
                /*收支明细*/
                $stateProvider
                    .state('incomeDetails', {
                        url: '/incomeDetails,:date,:sysShopId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'incomeDetailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.incomeDetailsCtrl',
                                    ['js/controllers/work/incomeDetailsCtrl.js?ver='+ bossVersion],
                                    'views/work/incomeDetails.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*业绩明细*/

                    .state('detailedPerformance', {
                        url: '/detailedPerformance/:sysShopId,:searchFile,:sysClerkId,:startDate,:endDate',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'detailedPerformanceCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.detailedPerformanceCtrl',
                                    ['js/controllers/work/detailedPerformanceCtrl.js?ver='+ bossVersion],
                                    'views/work/detailedPerformance.html?ver=' + bossVersion);
                            }
                        }
                    })
                        /*员工端的业绩明细*/
                    .state('employeeDetailedPerformance', {
                        url: '/employeeDetailedPerformance/:searchFile,:date',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeDetailedPerformanceCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeDetailedPerformanceCtrl',
                                    ['js/controllers/employee/employeeDetailedPerformanceCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeDetailedPerformance.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*全部家人*/

                    .state('allFamily', {
                        url: '/allFamily/:startDate,:endDate,:sysShopId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'allFamilyCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.allFamilyCtrl',
                                    ['js/controllers/work/allFamilyCtrl.js?ver='+ bossVersion],
                                    'views/work/allFamily.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*今日考勤*/

                    .state('attendanceToday', {
                        url: '/attendanceToday',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'attendanceTodayCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.attendanceTodayCtrl',
                                    ['js/controllers/work/attendanceTodayCtrl.js?ver='+ bossVersion],
                                    'views/work/attendanceToday.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*唯美度养生会所*/

                    .state('healthClub', {
                        url: '/healthClub',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'healthClubCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.healthClubCtrl',
                                    ['js/controllers/work/healthClubCtrl.js?ver='+ bossVersion],
                                    'views/work/healthClub.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*卡耗明细*/

                    .state('cardConsumption', {
                        url: '/cardConsumption',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'cardConsumptionCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.cardConsumptionCtrl',
                                    ['js/controllers/work/cardConsumptionCtrl.js?ver='+ bossVersion],
                                    'views/work/cardConsumption.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*耗卡明细*/

                    .state('consumption', {
                        url: '/consumption',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'consumptionCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.consumptionCtrl',
                                    ['js/controllers/work/consumptionCtrl.js?ver='+ bossVersion],
                                    'views/work/consumption.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*唯美度养生会所 全部家人*/

                    .state('beautyAll', {
                        url: '/beautyAll/:sysShopId/:startDate,:endDate,:sysClerkId,:nameType',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'beautyAllCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.beautyAllCtrl',
                                    ['js/controllers/work/beautyAllCtrl.js?ver='+ bossVersion],
                                    'views/work/beautyAll.html?ver=' + bossVersion);
                            }
                        }
                    });
                /*分店收支*/
                $stateProvider
                    .state('storeExpenditure', {
                        url: '/storeExpenditure/:date',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'storeExpenditureCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.storeExpenditureCtrl',
                                    ['js/controllers/work/storeExpenditureCtrl.js?ver='+ bossVersion],
                                    'views/work/storeExpenditure.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*w唯美度养生会所 切换店铺*/

                    .state('switchShop', {
                        url: '/switchShop',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'switchShopCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.switchShopCtrl',
                                    ['js/controllers/work/switchShopCtrl.js?ver='+ bossVersion],
                                    'views/work/switchShop.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*唯美度某美容院预约*/

                    .state('beautySalon', {
                        url: '/beautySalon/:sysShopId/:date/:shopName',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'beautySalonCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.beautySalonCtrl',
                                    ['js/controllers/work/beautySalonCtrl.js?ver='+ bossVersion],
                                    'views/work/beautySalon.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*预约*/

                    .state('appointment', {
                        url: '/appointment',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'appointmentCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.appointmentCtrl',
                                    ['js/controllers/work/appointmentCtrl.js?ver='+ bossVersion],
                                    'views/work/appointment.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*收支分析*/

                    .state('incomeAnalysis', {
                        url: '/incomeAnalysis',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'incomeAnalysisCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.incomeAnalysisCtrl',
                                    ['js/controllers/work/incomeAnalysisCtrl.js?ver='+ bossVersion],
                                    'views/work/incomeAnalysis.html?ver=' + bossVersion);
                            }
                        }
                    })
                        /*某个店的收支分析*/
                    .state('oneIncomeAnalysis', {
                        url: '/oneIncomeAnalysis/:sysShopId/:date',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'oneIncomeAnalysisCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.oneIncomeAnalysisCtrl',
                                    ['js/controllers/work/oneIncomeAnalysisCtrl.js?ver='+ bossVersion],
                                    'views/work/oneIncomeAnalysis.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*员工分析*/

                    .state('employeeAnalysis', {
                        url: '/employeeAnalysis',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeAnalysisCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeAnalysisCtrl',
                                    ['js/controllers/work/employeeAnalysisCtrl.js?ver='+ bossVersion],
                                    'views/work/employeeAnalysis.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*考勤记录*/

                    .state('Record', {
                        url: '/Record',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'RecordCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.RecordCtrl',
                                    ['js/controllers/work/RecordCtrl.js?ver='+ bossVersion],
                                    'views/work/Record.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*已确认*/

                    .state('confirmed', {
                        url: '/confirmed/:shopAppointServiceId/:date/:sysClerkId/:sysShopId"',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'confirmedCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.confirmedCtrl',
                                    ['js/controllers/work/confirmedCtrl.js?ver='+ bossVersion],
                                    'views/work/confirmed.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*未开始*/

                    .state('notBeginning', {
                        url: '/notBeginning',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'notBeginningCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.notBeginningCtrl',
                                    ['js/controllers/work/notBeginningCtrl.js?ver='+ bossVersion],
                                    'views/work/notBeginning.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*取消预约*/

                    .state('cancelReservation', {
                        url: '/cancelReservation/:sysShopId/:sysClerkId/:date',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'cancelReservationCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.cancelReservationCtrl',
                                    ['js/controllers/work/cancelReservationCtrl.js?ver='+ bossVersion],
                                    'views/work/cancelReservation.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*取消的预约详情页面*/

                    .state('cancelDetails', {
                        url: '/cancelDetails/:shopAppointServiceId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'cancelDetailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.cancelDetailsCtrl',
                                    ['js/controllers/work/cancelDetailsCtrl.js?ver='+ bossVersion],
                                    'views/work/cancelDetails.html?ver=' + bossVersion);
                            }
                        }
                    });
                /*已取消预约的页面*/
                $stateProvider
                    .state('canceled', {
                        url: '/canceled/:sysShopId/:sysClerkId/:date',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'canceledCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.canceledsCtrl',
                                    ['js/controllers/work/canceledCtrl.js?ver='+ bossVersion],
                                    'views/work/canceled.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*排班*/

                    .state('scheduling', {
                        url: '/scheduling',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'schedulingCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.schedulingCtrl',
                                    [
                                        'js/controllers/work/schedulingCtrl.js?ver='+ bossVersion,
                                        'js/libs/fixedTab.js?ver='+ bossVersion,

                                    ],
                                    'views/work/scheduling.html?ver=' + bossVersion
                                );
                            }
                        }
                    })
                /*美容院分店*/
                    .state('beautyBranch', {
                        url: '/beautyBranch/:sysShopId,:date',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'beautyBranchCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.beautyBranchCtrl',
                                    ['js/controllers/work/beautyBranchCtrl.js?ver='+ bossVersion],
                                    'views/work/beautyBranch.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*详情*/

                    .state('details', {
                        url: '/details/:flowNo,:searchFile',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'detailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.detailsCtrl',
                                    ['js/controllers/work/detailsCtrl.js?ver='+ bossVersion],
                                    'views/work/details.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*支出详情*/

                    .state('expenditureDetails', {
                        url: '/expenditureDetails',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'expenditureDetailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.expenditureDetailsCtrl',
                                    ['js/controllers/work/expenditureDetailsCtrl.js?ver='+ bossVersion],
                                    'views/work/expenditureDetails.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*我的*/
                /*帐户安全*/

                    .state('accountSecurity', {
                        url: '/accountSecurity',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'accountSecurityCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.accountSecurityCtrl',
                                    ['js/controllers/mine/accountSecurityCtrl.js?ver='+ bossVersion],
                                    'views/mine/accountSecurity.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*选择系列*/

                    .state('selectionSeries', {
                        url: '/selectionSeries/:url',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'selectionSeriesCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.selectionSeriesCtrl',
                                    ['js/controllers/mine/selectionSeriesCtrl.js?ver='+ bossVersion],
                                    'views/mine/selectionSeries.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*选择类别*/
                    .state('selectionCategory', {
                        url: '/selectionCategory/:projectId,:url',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'selectionCategoryCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.selectionCategoryCtrl',
                                    ['js/controllers/mine/selectionCategoryCtrl.js?ver='+ bossVersion],
                                    'views/mine/selectionCategory.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*修改项目类别*/
                    .state('modifying', {
                        url: '/modifying',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'modifyingCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.modifyingCtrl',
                                    ['js/controllers/mine/modifyingCtrl.js?ver='+ bossVersion],
                                    'views/mine/modifying.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*系统设置*/
                    .state('systemSetup', {
                        url: '/systemSetup',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'systemSetupCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.systemSetupCtrl',
                                    ['js/controllers/mine/systemSetupCtrl.js?ver='+ bossVersion],
                                    'views/mine/systemSetup.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*我的*/
                    .state('myself', {
                        url: '/myself',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'myselfCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.myselfCtrl',
                                    ['js/controllers/mine/myselfCtrl.js?ver='+ bossVersion],
                                    'views/mine/myself.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*提醒设置*/
                    .state('reminderSettings', {
                        url: '/reminderSettings',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'reminderSettingsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.reminderSettingsCtrl',
                                    ['js/controllers/mine/reminderSettingsCtrl.js?ver='+ bossVersion],
                                    'views/mine/reminderSettings.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*设置*/
                    .state('setInformation', {
                        url: '/setInformation',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'setInformationCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.setInformationCtrl',
                                    ['js/controllers/mine/setInformationCtrl.js?ver='+ bossVersion],
                                    'views/mine/setInformation.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*分店列表*/
                    .state('shopList', {
                        url: '/shopList',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'shopListCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.shopListCtrl',
                                    ['js/controllers/mine/shopListCtrl.js?ver='+ bossVersion],
                                    'views/mine/shopList.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*关于我们*/
                    .state('aboutMine', {
                        url: '/aboutMine',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'aboutMineCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.aboutMineCtrl',
                                    ['js/controllers/mine/aboutMineCtrl.js?ver='+ bossVersion],
                                    'views/mine/aboutMine.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*基础资料设置*/
                    .state('basicSetting', {
                        url: '/basicSetting,:sysShopName',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'basicSettingCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.basicSettingCtrl',
                                    ['js/controllers/mine/basicSettingCtrl.js?ver='+ bossVersion],
                                    'views/mine/basicSetting.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*修改资料*/
                    .state('modificationInformation', {
                        url: '/modificationInformation',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'modificationInformationCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.modificationInformationCtrl',
                                    ['js/controllers/mine/modificationInformationCtrl.js?ver='+ bossVersion],
                                    'views/mine/modificationInformation.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*选择适用范围*/
                    .state('application', {
                        url: '/application',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'applicationCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.applicationCtrl',
                                    ['js/controllers/mine/applicationCtrl.js?ver='+ bossVersion],
                                    'views/mine/application.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*提醒设置*/
                    .state('reminder', {
                        url: '/reminder/:sysShopName',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'reminderCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.reminderCtrl',
                                    ['js/controllers/mine/reminderCtrl.js?ver='+ bossVersion],
                                    'views/mine/reminder.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*添加套卡*/
                        .state('addCards', {
                        url: '/addCards',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'addCardsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.addCardsCtrl',
                                    ['js/controllers/mine/addCardsCtrl.js?ver='+ bossVersion],
                                    'views/mine/addCards.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*添加项目*/
                    .state('addProject', {
                        url: '/addProject/:typeId,:name,:seriesId,:seriesName',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'addProjectCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.addProjectCtrl',
                                    ['js/controllers/mine/addProjectCtrl.js?ver='+ bossVersion],
                                    'views/mine/addProject.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*选择项目系列*/
                    .state('addProjectSeries', {
                        url: '/addProjectSeries/:projectId,:url,:oneId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'addProjectSeriesCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.addProjectSeriesCtrl',
                                    ['js/controllers/mine/addProjectSeriesCtrl.js?ver='+ bossVersion],
                                    'views/mine/addProjectSeries.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*修改项目*/
                    .state('modifyProject', {
                        url: '/modifyProject/:projectId,:seriesId,:seriesName',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'modifyProjectCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.modifyProjectCtrl',
                                    ['js/controllers/mine/modifyProjectCtrl.js?ver='+ bossVersion],
                                    'views/mine/modifyProject.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*修改门店*/
                    .state('amendStore', {
                        url: '/amendStore/:sysShopId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'amendStoreCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.amendStoreCtrl',
                                    ['js/controllers/mine/amendStoreCtrl.js?ver='+ bossVersion],
                                    'views/mine/amendStore.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*添加充值卡*/
                    .state('addrechargeCard', {
                        url: '/addrechargeCard',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'addrechargeCardCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.addrechargeCardCtrl',
                                    ['js/controllers/mine/addrechargeCardCtrl.js?ver='+ bossVersion],
                                    'views/mine/addrechargeCard.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*编辑充值卡*/
                    .state('editedRecharge', {
                        url: '/editedRecharge/:id',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'editedRechargeCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.editedRechargeCtrl',
                                    ['js/controllers/mine/editedRechargeCtrl.js?ver='+ bossVersion],
                                    'views/mine/editedRecharge.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*编辑套卡*/
                    .state('editorCard', {
                        url: '/editorCard/:id,:url',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'editorCardCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.editorCardCtrl',
                                    ['js/controllers/mine/editorCardCtrl.js?ver='+ bossVersion],
                                    'views/mine/editorCard.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*美容院设置*/
                    .state('beautySetting', {
                        url: '/beautySetting',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'beautySettingCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.beautySettingCtrl',
                                    ['js/controllers/mine/beautySettingCtrl.js?ver='+ bossVersion],
                                    'views/mine/beautySetting.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*美容院设置2*/
                    .state('beautyTwo', {
                        url: '/beautyTwo',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'beautyTwoCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.beautyTwoCtrl',
                                    ['js/controllers/mine/beautyTwoCtrl.js?ver='+ bossVersion],
                                    'views/mine/beautyTwo.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*项目详情*/
                    .state('projectDetails', {
                        url: '/projectDetails/:projectId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'projectDetailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.projectDetailsCtrl',
                                    ['js/controllers/mine/projectDetailsCtrl.js?ver='+ bossVersion],
                                    'views/mine/projectDetails.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*价目表产品详情页面*/
                    .state('priceShopDetails', {
                        url: '/priceShopDetails/:productId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'priceShopDetailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.priceShopDetailsCtrl',
                                    ['js/controllers/mine/priceShopDetailsCtrl.js?ver='+ bossVersion],
                                    'views/mine/priceShopDetails.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*beauty分店*/
                    .state('branchShop', {
                        url: '/branchShop/:sysShopId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'branchShopCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.branchShopCtrl',
                                    ['js/controllers/mine/branchShopCtrl.js?ver='+ bossVersion],
                                    'views/mine/branchShop.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*套卡详情*/
                    .state('tcardDetails', {
                        url: '/tcardDetails/:cardId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'tcardDetailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.tcardDetailsCtrl',
                                    ['js/controllers/mine/tcardDetailsCtrl.js?ver='+ bossVersion],
                                    'views/mine/tcardDetails.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*我的门店*/
                    .state('myStore', {
                        url: '/myStore',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'myStoreCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.myStoreCtrl',
                                    ['js/controllers/mine/myStoreCtrl.js?ver='+ bossVersion],
                                    'views/mine/myStore.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*项目列表*/
                    .state('projectList', {
                        url: '/projectList',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'projectListCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.projectListCtrl',
                                    ['js/controllers/mine/projectListCtrl.js?ver='+ bossVersion],
                                    'views/mine/projectList.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*套卡列表*/
                    .state('cardList', {
                        url: '/cardList',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'cardListCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.cardListCtrl',
                                    ['js/controllers/mine/cardListCtrl.js?ver='+ bossVersion],
                                    'views/mine/cardList.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*充值卡*/
                    .state('rechargeList', {
                        url: '/rechargeList',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'rechargeListCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.rechargeListCtrl',
                                    ['js/controllers/mine/rechargeListCtrl.js?ver='+ bossVersion],
                                    'views/mine/rechargeList.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*充值卡详情*/
                    .state('rechargeDetails', {
                        url: '/rechargeDetails/:rechargeId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'rechargeDetailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.rechargeDetailsCtrl',
                                    ['js/controllers/mine/rechargeDetailsCtrl.js?ver='+ bossVersion],
                                    'views/mine/rechargeDetails.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*项目列表单选 保存*/
                    .state('projectListRadio', {
                        url: '/projectListRadio',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'projectListRadioCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.projectListRadioCtrl',
                                    ['js/controllers/mine/projectListRadioCtrl.js?ver='+ bossVersion],
                                    'views/mine/projectListRadio.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*项目 产品 套卡 充值卡*/
                    .state('prices', {
                        url: '/prices',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'pricesCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.pricesCtrl',
                                    ['js/controllers/mine/pricesCtrl.js?ver='+ bossVersion],
                                    'views/mine/prices.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*疗程卡*/
                    .state('courseCard', {
                        url: '/courseCard',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'courseCardCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.courseCardCtrl',
                                    ['js/controllers/mine/courseCardCtrl.js?ver='+ bossVersion],
                                    'views/mine/courseCard.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*项目差别*/
                    .state('projectDifference', {
                        url: '/projectDifference',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'projectDifferenceCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.projectDifferenceCtrl',
                                    ['js/controllers/mine/projectDifferenceCtrl.js?ver='+ bossVersion],
                                    'views/mine/projectDifference.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*产品品牌设置*/
                    .state('productSetting', {
                        url: '/productSetting/:type,:id,:productTypeName,:status',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'productSettingCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.productSettingCtrl',
                                    ['js/controllers/Stock/productSettingCtrl.js?ver='+ bossVersion],
                                    'views/Stock/productSetting.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*产品品牌*/
                    .state('productBrand', {
                        url: '/productBrand',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'productBrandCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.productBrandCtrl',
                                    ['js/controllers/Stock/productBrandCtrl.js?ver='+ bossVersion],
                                    'views/Stock/productBrand.html?ver=' + bossVersion);
                            }
                        }
                    })
                        /*项目大类设置*/
                    .state('projectBrand', {
                        url: '/projectBrand',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'projectBrandCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.projectBrandCtrl',
                                    ['js/controllers/mine/projectBrandCtrl.js?ver='+ bossVersion],
                                    'views/mine/projectBrand.html?ver=' + bossVersion);
                            }
                        }
                    })
                        /*项目类别*/
                    .state('projectSetting', {
                        url: '/projectSetting/:type,:id,:projectTypeName,:status',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'projectSettingCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.projectSettingCtrl',
                                    ['js/controllers/mine/projectSettingCtrl.js?ver='+ bossVersion],
                                    'views/mine/projectSetting.html?ver=' + bossVersion);
                            }
                        }
                    })
                        /*修改系列*/
                    .state('projectSeries', {
                        url: '/projectSeries/:id',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'projectSeriesCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.projectSeriesCtrl',
                                    ['js/controllers/mine/projectSeriesCtrl.js?ver='+ bossVersion],
                                    'views/mine/projectSeries.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*产品库存详情*/
                    .state('productInventoryDetails', {
                        url: '/productInventoryDetails/:shopProductId/:dateTime',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'productInventoryDetailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.productInventoryDetailsCtrl',
                                    ['js/controllers/Stock/productInventoryDetailsCtrl.js?ver='+ bossVersion],
                                    'views/Stock/productInventoryDetails.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*仓库产品*/
                    .state('warehouseProducts', {
                        url: '/warehouseProducts',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'warehouseProductsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.warehouseProductsCtrl',
                                    ['js/controllers/Stock/warehouseProductsCtrl.js?ver='+ bossVersion],
                                    'views/Stock/warehouseProducts.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /* partialFiles 全院档案*/
                .state('partialFiles', {
                    url: '/partialFiles',
                    templateProvider: function() { return lazyDeferred.promise; },
                    controller: 'partialFilesCtrl',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q, $http) {
                            loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.partialFilesCtrl',
                                ['js/controllers/archives/partialFilesCtrl.js?ver='+ bossVersion],
                                'views/archives/partialFiles.html?ver=' + bossVersion);
                        }
                    }
                })
                /*warningFile 预警档案*/
                .state('warningFile', {
                    url: '/warningFile',
                    templateProvider: function() { return lazyDeferred.promise; },
                    controller: 'warningFileCtrl',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q, $http) {
                            loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.warningFileCtrl',
                                ['js/controllers/archives/warningFileCtrl.js?ver='+ bossVersion],
                                'views/archives/warningFile.html?ver=' + bossVersion);
                        }
                    }
                })

                .state('partialFilesSearch', {
                    url: '/partialFilesSearch',
                    templateProvider: function() { return lazyDeferred.promise; },
                    controller: 'partialFilesSearchCtrl',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q, $http) {
                            loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.partialFilesSearchCtrl',
                                ['js/controllers/archives/partialFilesSearchCtrl.js?ver='+ bossVersion],
                                'views/archives/partialFilesSearch.html?ver=' + bossVersion);
                        }
                    }
                })

                    .state('archives', {
                        url: '/archives/:id',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'archivesCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.archivesCtrl',
                                    ['js/controllers/archives/archivesCtrl.js?ver='+ bossVersion],
                                    'views/archives/archives.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*modifyTheFile 修改档案*/
                    .state('modifyTheFile', {
                    url: '/modifyTheFile',
                    templateProvider: function() { return lazyDeferred.promise; },
                    controller: 'modifyTheFileCtrl',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q, $http) {
                            loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.modifyTheFileCtrl',
                                ['js/controllers/archives/modifyTheFileCtrl.js?ver='+ bossVersion],
                                'views/archives/modifyTheFile.html?ver=' + bossVersion);
                        }
                    }
                })
                    /* userBasicMess 基本信息*/
                    .state('userBasicMess', {
                    url: '/userBasicMess',
                    templateProvider: function() { return lazyDeferred.promise; },
                    controller: 'userBasicMessCtrl',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q, $http) {
                            loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.userBasicMessCtrl',
                                ['js/controllers/archives/userBasicMessCtrl.js?ver='+ bossVersion],
                                'views/archives/userBasicMess.html?ver=' + bossVersion);
                        }
                    }
                })
                    /*menstrualPeriod  经期*/
                    .state('menstrualPeriod', {
                        url: '/menstrualPeriod',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'menstrualPeriodCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.menstrualPeriodCtrl',
                                    ['js/controllers/archives/menstrualPeriodCtrl.js?ver='+ bossVersion],
                                    'views/archives/menstrualPeriod.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('label', {
                        url: '/label',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'labelCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.labelCtrl',
                                    ['js/controllers/archives/labelCtrl.js?ver='+ bossVersion],
                                    'views/archives/label.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /* refillCard  充值卡*/
                    .state('refillCard', {
                        url: '/refillCard/:sysUserId/:sysShopId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'refillCardCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.refillCardCtrl',
                                    ['js/controllers/archives/refillCardCtrl.js?ver='+ bossVersion],
                                    'views/archives/refillCard.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*prepaidPhoneRecords 充值记录*/
                    .state('prepaidPhoneRecords', {
                        url: '/prepaidPhoneRecords/:id',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'prepaidPhoneRecordsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.prepaidPhoneRecordsCtrl',
                                    ['js/controllers/archives/prepaidPhoneRecordsCtrl.js?ver='+ bossVersion],
                                    'views/archives/prepaidPhoneRecords.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*accountDetails 账户明细*/
                    .state('accountDetails', {
                        url: '/accountDetails/:id,:rechargeCardType',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'accountDetailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.accountDetailsCtrl',
                                    ['js/controllers/archives/accountDetailsCtrl.js?ver='+ bossVersion],
                                    'views/archives/accountDetails.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('orderdDtails', {
                        url: '/orderdDtails',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'orderdDtailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.orderdDtailsCtrl',
                                    ['js/controllers/archives/orderdDtailsCtrl.js?ver='+ bossVersion],
                                    'views/archives/orderdDtails.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*balanceRecord 欠款记录*/
                    .state('balanceRecord', {
                        url: '/balanceRecord',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'balanceRecordCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.balanceRecordCtrl',
                                    ['js/controllers/archives/balanceRecordCtrl.js?ver='+ bossVersion],
                                    'views/archives/balanceRecord.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('payDtails', {
                        url: '/payDtails',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'payDtailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.payDtailsCtrl',
                                    ['js/controllers/archives/payDtailsCtrl.js?ver='+ bossVersion],
                                    'views/archives/payDtails.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('coupons', {
                        url: '/coupons',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'couponsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.couponsCtrl',
                                    ['js/controllers/archives/couponsCtrl.js?ver='+ bossVersion],
                                    'views/archives/coupons.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('couponsDtails', {
                        url: '/couponsDtails',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'couponsDtailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.couponsDtailsCtrl',
                                    ['js/controllers/archives/couponsDtailsCtrl.js?ver='+ bossVersion],
                                    'views/archives/couponsDtails.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('treatmentCard', {
                        url: '/treatmentCard/:sysUserId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'treatmentCardCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.treatmentCardCtrl',
                                    ['js/controllers/archives/treatmentCardCtrl.js?ver='+ bossVersion],
                                    'views/archives/treatmentCard.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*划卡记录*/
                    .state('treatmentCardDtails', {
                        url: '/treatmentCardDtails/:flowId/:goodsType/:flowIds/:id',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'treatmentCardDtailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.treatmentCardDtailsCtrl',
                                    ['js/controllers/archives/treatmentCardDtailsCtrl.js?ver='+ bossVersion],
                                    'views/archives/treatmentCardDtails.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('treatmentCardDetail', {
                        url: '/treatmentCardDetail',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'treatmentCardDetailCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.treatmentCardDetailCtrl',
                                    ['js/controllers/archives/treatmentCardDetailCtrl.js?ver='+ bossVersion],
                                    'views/archives/treatmentCardDetail.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('collectionCard', {
                        url: '/collectionCard/:sysUserId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'collectionCardCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.collectionCardCtrl',
                                    ['js/controllers/archives/collectionCardCtrl.js?ver='+ bossVersion],
                                    'views/archives/collectionCard.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('product', {
                        url: '/product/:sysUserId/:sysShopId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'productCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.productCtrl',
                                    ['js/controllers/archives/productCtrl.js?ver='+ bossVersion],
                                    'views/archives/product.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('productDtails', {
                        url: '/productDtails,:flowId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'productDtailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.productDtailsCtrl',
                                    ['js/controllers/archives/productDtailsCtrl.js?ver='+ bossVersion],
                                    'views/archives/productDtails.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('receiveDtails', {
                        url: '/receiveDtails',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'receiveDtailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.receiveDtailsCtrl',
                                    ['js/controllers/archives/receiveDtailsCtrl.js?ver='+ bossVersion],
                                    'views/archives/receiveDtails.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*accountRecords 账户记录*/
                    .state('accountRecords', {
                        url: '/accountRecords/:sysUserId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'accountRecordsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.accountRecordsCtrl',
                                    ['js/controllers/archives/accountRecordsCtrl.js?ver='+ bossVersion],
                                    'views/archives/accountRecords.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('recordCashier', {
                        url: '/recordCashier/:sysUserId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'recordCashierCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.recordCashierCtrl',
                                    ['js/controllers/archives/recordCashierCtrl.js?ver='+ bossVersion],
                                    'views/archives/recordCashier.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*detailsOfCashier  收银详情*/
                    .state('detailsOfCashier', {
                        url: '/detailsOfCashier/:id,:flowNo',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'detailsOfCashierCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.detailsOfCashierCtrl',
                                    ['js/controllers/archives/detailsOfCashierCtrl.js?ver='+ bossVersion],
                                    'views/archives/detailsOfCashier.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('drawCardRecords', {
                        url: '/drawCardRecords/:sysUserId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'drawCardRecordsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.drawCardRecordsCtrl',
                                    ['js/controllers/archives/drawCardRecordsCtrl.js?ver='+ bossVersion],
                                    'views/archives/drawCardRecords.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('drawCardRecordsDetail', {
                        url: '/drawCardRecordsDetail/:flowNo',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'drawCardRecordsDetailCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.drawCardRecordsDetailCtrl',
                                    ['js/controllers/archives/drawCardRecordsDetailCtrl.js?ver='+ bossVersion],
                                    'views/archives/drawCardRecordsDetail.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /* newUser 新建档案*/
                    .state('newUser', {
                        url: '/newUser/:id',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'newUserCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.newUserCtrl',
                                    ['js/controllers/archives/newUserCtrl.js?ver='+ bossVersion],
                                    'views/archives/newUser.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*importAddressBook 通讯录导入*/
                    .state('importAddressBook', {
                        url: '/importAddressBook',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'importAddressBookCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.importAddressBookCtrl',
                                    ['js/controllers/archives/importAddressBookCtrl.js?ver='+ bossVersion],
                                    'views/archives/importAddressBook.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*specifications   规格*/
                    .state('specifications', {
                        url: '/specifications/:url',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'specificationsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.specificationsCtrl',
                                    ['js/controllers/inventory/specificationsCtrl.js?ver='+ bossVersion],
                                    'views/inventory/specifications.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('selShop', {
                        url: '/selShop',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'selShopCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.selShopCtrl',
                                    ['js/controllers/archives/selShopCtrl.js?ver='+ bossVersion],
                                    'views/archives/selShop.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('membersMess', {
                        url: '/membersMess',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'membersMessCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.membersMessCtrl',
                                    ['js/controllers/archives/membersMessCtrl.js?ver='+ bossVersion],
                                    'views/archives/membersMess.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('distributionFile', {
                        url: '/distributionFile',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'distributionFileCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.distributionFileCtrl',
                                    ['js/controllers/archives/distributionFileCtrl.js?ver='+ bossVersion],
                                    'views/archives/distributionFile.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('selFamily', {
                        url: '/selFamily',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'selFamilyCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.selFamilyCtrl',
                                    ['js/controllers/archives/selFamilyCtrl.js?ver='+ bossVersion],
                                    'views/archives/selFamily.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('bossLogin', {
                        url: '/bossLogin/:redirectUrl',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'bossLoginCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.bossLoginCtrl',
                                    ['js/controllers/bossLoginCtrl.js?ver='+ bossVersion],
                                    'views/bossLogin.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*员工端登录页面*/
                    .state('employeeLogin', {
                        url: '/employeeLogin/:redirectUrl',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeLoginCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeLoginCtrl',
                                    ['js/controllers/employeeLoginCtrl.js?ver='+ bossVersion],
                                    'views/employeeLogin.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*successfulInventory成功入库*/
                    .state('successfulInventory', {
                        url: '/successfulInventory/:id,:type/:dateTime',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'successfulInventoryCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.successfulInventoryCtrl',
                                    ['js/controllers/inventory/successfulInventoryCtrl.js?ver='+ bossVersion],
                                    'views/inventory/successfulInventory.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*outbound 出库*/
                    .state('outbound', {
                        url: '/outbound/:name/:dateTime',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'outboundCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.outboundCtrl',
                                    ['js/controllers/inventory/outboundCtrl.js?ver='+ bossVersion],
                                    'views/inventory/outbound.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('outboundOrderDetails', {
                        url: '/outboundOrderDetails/:outboundId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'outboundOrderDetailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.outboundOrderDetailsCtrl',
                                    ['js/controllers/inventory/outboundOrderDetailsCtrl.js?ver='+ bossVersion],
                                    'views/inventory/outboundOrderDetails.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /* outboundRecords  出库记录*/
                    .state('outboundRecords', {
                        url: '/outboundRecords/:shopStoreId/:name',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'outboundRecordsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.outboundRecordsCtrl',
                                    ['js/controllers/inventory/outboundRecordsCtrl.js?ver='+ bossVersion],
                                    'views/inventory/outboundRecords.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /* kuTube  库管人*/
                    .state('kuTube', {
                        url: '/kuTube/:id/:storeManagerId/:sysShopId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'kuTubeCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.kuTubeCtrl',
                                    ['js/controllers/inventory/kuTubeCtrl.js?ver='+ bossVersion],
                                    'views/inventory/kuTube.html?ver=' + bossVersion);
                            }
                        }
                    })

                    //领取人
                    .state('receiver', {
                        url: '/receiver/:id/:sum/:shopStoreId/:stockStyle/:productCode',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'receiverCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.receiverCtrl',
                                    ['js/controllers/inventory/receiverCtrl.js?ver='+ bossVersion],
                                    'views/inventory/receiver.html?ver=' + bossVersion);
                            }
                        }
                    })


                    /* reservoirRunningWater 出入库流水*/
                    .state('reservoirRunningWater', {
                        url: '/reservoirRunningWater',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'reservoirRunningWaterCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.reservoirRunningWaterCtrl',
                                    ['js/controllers/inventory/reservoirRunningWaterCtrl.js?ver='+ bossVersion],
                                    'views/inventory/reservoirRunningWater.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*unit  单位*/
                    .state('unit', {
                        url: '/unit/:url',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'unitCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.unitCtrl',
                                    ['js/controllers/inventory/unitCtrl.js?ver='+ bossVersion],
                                    'views/inventory/unit.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /* efficacy 功效*/
                    .state('efficacy', {
                        url: '/efficacy/:url',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'efficacyCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.efficacyCtrl',
                                    ['js/controllers/inventory/efficacyCtrl.js?ver='+ bossVersion],
                                    'views/inventory/efficacy.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('funArea', {
                        url: '/funArea/:name/:dateTime',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'funAreaCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.funAreaCtrl',
                                    ['js/controllers/inventory/funAreaCtrl.js?ver='+ bossVersion],
                                    'views/inventory/funArea.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('warehouseShop', {
                        url: '/warehouseShop',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'warehouseShopCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.warehouseShopCtrl',
                                    ['js/controllers/inventory/warehouseShopCtrl.js?ver='+ bossVersion],
                                    'views/inventory/warehouseShop.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /* inventoryDetails库存详情*/
                    .state('inventoryDetails', {
                        url: '/inventoryDetails/:shopStoreId/:dateTime',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'inventoryDetailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.inventoryDetailsCtrl',
                                    ['js/controllers/inventory/inventoryDetailsCtrl.js?ver='+ bossVersion],
                                    'views/inventory/inventoryDetails.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('selFamilys', {
                        url: '/selFamilys',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'selFamilysCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.selFamilysCtrl',
                                    ['js/controllers/inventory/selFamilysCtrl.js?ver='+ bossVersion],
                                    'views/inventory/selFamilys.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('libraryTubeSetting', {
                        url: '/libraryTubeSetting/:ids/:names/:id/:sysShopId/:shopStoreId/:dateTime',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'libraryTubeSettingCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.libraryTubeSettingCtrl',
                                    ['js/controllers/inventory/libraryTubeSettingCtrl.js?ver='+ bossVersion],
                                    'views/inventory/libraryTubeSetting.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*  historicalRecord  历史记录*/
                    .state('historicalRecord', {
                        url: '/historicalRecord',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'historicalRecordCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.historicalRecordCtrl',
                                    ['js/controllers/inventory/historicalRecordCtrl.js?ver='+ bossVersion],
                                    'views/inventory/historicalRecord.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*addFamily 添加家人*/
                    .state('addFamily', {
                        url: '/addFamily',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'addFamilyCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.addFamilyCtrl',
                                    ['js/controllers/inventory/addFamilyCtrl.js?ver='+ bossVersion],
                                    'views/inventory/addFamily.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('inventory', {
                        url: '/inventory',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'inventoryCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.inventoryCtrl',
                                    ['js/controllers/inventory/inventoryCtrl.js?ver='+ bossVersion],
                                    'views/inventory/inventory.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('inventoryOver', {
                        url: '/inventoryOver',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'inventoryOverCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.inventoryOverCtrl',
                                    ['js/controllers/inventory/inventoryOverCtrl.js?ver='+ bossVersion],
                                    'views/inventory/inventoryOver.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*inventoryRecords 盘点记录*/
                    .state('inventoryRecords', {
                        url: '/inventoryRecords',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'inventoryRecordsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.inventoryRecordsCtrl',
                                    ['js/controllers/inventory/inventoryRecordsCtrl.js?ver='+ bossVersion],
                                    'views/inventory/inventoryRecords.html?ver=' + bossVersion);
                            }
                        }
                    })

                    .state('inventoryRecordsDetails', {
                        url: '/inventoryRecordsDetails',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'inventoryRecordsDetailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.inventoryRecordsDetailsCtrl',
                                    ['js/controllers/inventory/inventoryRecordsDetailsCtrl.js?ver='+ bossVersion],
                                    'views/inventory/inventoryRecordsDetails.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*unwind  平仓*/
                    .state('unwind', {
                        url: '/unwind',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'unwindCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.unwindCtrl',
                                    ['js/controllers/inventory/unwindCtrl.js?ver='+ bossVersion],
                                    'views/inventory/unwind.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*putInStorage 入库*/
                    .state('putInStorage', {
                        url: '/putInStorage/:name/:dateTime',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'putInStorageCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.putInStorageCtrl',
                                    ['js/controllers/inventory/putInStorageCtrl.js?ver='+ bossVersion],
                                    'views/inventory/putInStorage.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*entryDetails 入库单详情*/
                    .state('entryDetails', {
                        url: '/entryDetails/:id/:dateTime',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'entryDetailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.entryDetailsCtrl',
                                    ['js/controllers/inventory/entryDetailsCtrl.js?ver='+ bossVersion],
                                    'views/inventory/entryDetails.html?ver=' + bossVersion);
                            }
                        }
                    })
              /* /!* modify 修改*!/
                    .state('modify', {
                        url: '/modify',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'modifyCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.modifyCtrl',
                                    ['js/controllers/inventory/modifyCtrl.js?ver='+ bossVersion],
                                    'views/inventory/modify.html?ver=' + bossVersion);
                            }
                        }
                    })*/
                /*inventoryRecords 入库记录*/
                    .state('inventoryRecordsPics', {
                        url: '/inventoryRecordsPics/:shopStoreId/:name',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'inventoryRecordsPicsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.inventoryRecordsPicsCtrl',
                                    ['js/controllers/inventory/inventoryRecordsPicsCtrl.js?ver='+ bossVersion],
                                    'views/inventory/inventoryRecordsPics.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*sweepTheCodeIntoTheTreasury 扫码入库*/
                    .state('sweepTheCodeIntoTheTreasury', {
                        url: '/sweepTheCodeIntoTheTreasury',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'sweepTheCodeIntoTheTreasuryCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.sweepTheCodeIntoTheTreasuryCtrl',
                                    ['js/controllers/inventory/sweepTheCodeIntoTheTreasuryCtrl.js?ver='+ bossVersion],
                                    'views/inventory/sweepTheCodeIntoTheTreasury.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*automaticallyStorage 扫码自动入库*/
                    .state('automaticallyStorage', {
                        url: '/automaticallyStorage',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'automaticallyStorageCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.automaticallyStorageCtrl',
                                    ['js/controllers/inventory/automaticallyStorageCtrl.js?ver='+ bossVersion],
                                    'views/inventory/automaticallyStorage.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*applicableParts 适用部位*/
                    .state('applicableParts', {
                        url: '/applicableParts/:url',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'applicablePartsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.applicablePartsCtrl',
                                    ['js/controllers/inventory/applicablePartsCtrl.js?ver='+ bossVersion],
                                    'views/inventory/applicableParts.html?ver=' + bossVersion);
                            }
                        }
                    })
               /* addEmployees 添加家人(员工)*/
                    .state('addEmployees', {
                        url: '/addEmployees',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'addEmployeesCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.addEmployeesCtrl',
                                    ['js/controllers/inventory/addEmployeesCtrl.js?ver='+ bossVersion],
                                    'views/inventory/addEmployees.html?ver=' + bossVersion);
                            }
                        }
                    })
                /* addBrandOne  添加品牌*/
                    .state('addBrandOne', {
                        url: '/addBrandOne',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'addBrandOneCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.addBrandOneCtrl',
                                    ['js/controllers/inventory/addBrandOneCtrl.js?ver='+ bossVersion],
                                    'views/inventory/addBrandOne.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /* addSeries 添加系列*/
                    .state('addSeries', {
                        url: '/addSeries/:id',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'addSeriesCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.addSeriesCtrl',
                                    ['js/controllers/inventory/addSeriesCtrl.js?ver='+ bossVersion],
                                    'views/inventory/addSeries.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*addProduct  添加产品*/
                    .state('addProduct', {
                        url: '/addProduct/:oneId,:band,:series,:twoId,:spec,:unit,:parts,:func',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'addProductCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.addProductCtrl',
                                    ['js/controllers/inventory/addProductCtrl.js?ver='+ bossVersion],
                                    'views/inventory/addProduct.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*modifyProduct 修改产品*/
                    .state('modifyProduct', {
                        url: '/modifyProduct/:id/:band/:series/:spec,:unit,:parts,:func,:oneId,:twoId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'modifyProductCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.modifyProductCtrl',
                                    ['js/controllers/inventory/modifyProductCtrl.js?ver='+ bossVersion],
                                    'views/inventory/modifyProduct.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*inventorySetting  设置*/
                    .state('inventorySetting', {
                        url: '/inventorySetting',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'inventorySettingCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.inventorySettingCtrl',
                                    ['js/controllers/inventory/inventorySettingCtrl.js?ver='+ bossVersion],
                                    'views/inventory/inventorySetting.html?ver=' + bossVersion);
                            }
                        }
                    })

                    /**预警商品**/
                    .state('earlyWarningGoods', {
                        url: '/earlyWarningGoods/:sysShopId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'earlyWarningGoodsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.earlyWarningGoodsCtrl',
                                    ['js/controllers/inventory/earlyWarningGoodsCtrl.js?ver='+ bossVersion],
                                    'views/inventory/earlyWarningGoods.html?ver=' + bossVersion);
                            }
                        }
                    })

               /* addressBook 库存 通讯录导入*/
                    .state('addressBook', {
                        url: '/addressBook',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'addressBookCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.addressBookCtrl',
                                    ['js/controllers/inventory/addressBookCtrl.js?ver='+ bossVersion],
                                    'views/inventory/addressBook.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*AddOutbound 新增出库*/
                    .state('AddOutbound', {
                        url: '/AddOutbound/:shopStoreId/:stockStyle/:stockType/:name/:sum/:ids/:names/:productCode/:dateTime',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'AddOutboundCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.AddOutboundCtrl',
                                    ['js/controllers/inventory/AddOutboundCtrl.js?ver='+ bossVersion],
                                    'views/inventory/AddOutbound.html?ver=' + bossVersion);
                            }
                        }
                    })
                /* newLibrary  新增入库*/
                    .state('newLibrary', {
                        url: '/newLibrary/:stockStyle/:shopStoreId/:sum/:name/:productCode/:dateTime',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'newLibraryCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.newLibraryCtrl',
                                    ['js/controllers/inventory/newLibraryCtrl.js?ver='+ bossVersion],
                                    'views/inventory/newLibrary.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*modifyLibrary    修改(库)*/

                    .state('modifyLibrary', {
                        url: '/modifyLibrary',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'modifyLibraryCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.modifyLibraryCtrl',
                                    ['js/controllers/inventory/modifyLibraryCtrl.js?ver='+ bossVersion],
                                    'views/inventory/modifyLibrary.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*chooseWarehouse 选择仓库*/
                    .state('chooseWarehouse', {
                        url: '/chooseWarehouse/:dateTime',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'chooseWarehouseCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.chooseWarehouseCtrl',
                                    ['js/controllers/inventory/chooseWarehouseCtrl.js?ver='+ bossVersion],
                                    'views/inventory/chooseWarehouse.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*selBrand 选择品牌*/
                    .state('selBrand', {
                        url: '/selBrand/:url',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'selBrandCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.selBrandCtrl',
                                    ['js/controllers/inventory/selBrandCtrl.js?ver='+ bossVersion],
                                    'views/inventory/selBrand.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*selectTheOutboundType 选择出库类型*/
                    .state('selectTheOutboundType', {
                        url: '/selectTheOutboundType/:shopStoreId/:stockStyle/:name/:sum/:productCode',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'selectTheOutboundTypeCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.selectTheOutboundTypeCtrl',
                                    ['js/controllers/inventory/selectTheOutboundTypeCtrl.js?ver='+ bossVersion],
                                    'views/inventory/selectTheOutboundType.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*selSeries 选择系列*/
                    .state('selSeries', {
                        url: '/selSeries',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'selSeriesCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.selSeriesCtrl',
                                    ['js/controllers/inventory/selSeriesCtrl.js?ver='+ bossVersion],
                                    'views/inventory/selSeries.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*productInventory 产品盘点*/
                    .state('productInventory', {
                        url: '/productInventory/:stockStyle',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'productInventoryCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.productInventoryCtrl',
                                    ['js/controllers/inventory/productInventoryCtrl.js?ver='+ bossVersion],
                                    'views/inventory/productInventory.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*productPutInStorageMore  选择更多产品入库*/
                    .state('productPutInStorageMore', {
                        url: '/productPutInStorageMore/:stockStyle',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'productPutInStorageMoreCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.productPutInStorageMoreCtrl',
                                    ['js/controllers/inventory/productPutInStorageMoreCtrl.js?ver='+ bossVersion],
                                    'views/inventory/productPutInStorageMore.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*trendChart  趋势图-收支分析*/
                    .state('trendChart', {
                        url: '/trendChart/:id',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'trendChartCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.trendChartCtrl',
                                    ['js/controllers/work/trendChartCtrl.js?ver='+ bossVersion],
                                    'views/work/trendChart.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*warehousePeople 库管人*/
                    .state('warehousePeople', {
                        url: '/warehousePeople',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'warehousePeopleCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.warehousePeopleCtrl',
                                    ['js/controllers/inventory/warehousePeopleCtrl.js?ver='+ bossVersion],
                                    'views/inventory/warehousePeople.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*sevenDayCharts  趋势图-综合分析*/
                    .state('sevenDayCharts', {
                        url: '/sevenDayCharts/:id',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'sevenDayChartsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.sevenDayChartsCtrl',
                                    ['js/controllers/work/sevenDayChartsCtrl.js?ver='+ bossVersion],
                                    'views/work/sevenDayCharts.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*listOfItems 套卡  包含项目*/
                    .state('listOfItems', {
                        url: '/listOfItems/:id,:url',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'listOfItemsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.listOfItemsCtrl',
                                    ['js/controllers/mine/listOfItemsCtrl.js?ver='+ bossVersion],
                                    'views/mine/listOfItems.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /* mployeesDtailsCtrl 家人詳情*/
                    .state('mployeesDtails', {
                        url: '/mployeesDtails,:id',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'mployeesDtailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.mployeesDtailsCtrl',
                                    ['js/controllers/mine/mployeesDtailsCtrl.js?ver='+ bossVersion],
                                    'views/mine/mployeesDtails.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*oneTime 单次折扣范围*/
                    .state('oneTime', {
                        url: '/oneTime/:url,:id',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'oneTimeCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.oneTimeCtrl',
                                    ['js/controllers/mine/oneTimeCtrl.js?ver='+ bossVersion],
                                    'views/mine/oneTime.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*productScope 产品折扣范围*/
                    .state('productScope', {
                        url: '/productScope/:url,:id',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'productScopeCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.productScopeCtrl',
                                    ['js/controllers/mine/productScopeCtrl.js?ver='+ bossVersion],
                                    'views/mine/productScope.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*treatment 疗程卡折扣范围*/
                    .state('treatment', {
                        url: '/treatment/:url,:id',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'treatmentCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.treatmentCtrl',
                                    ['js/controllers/mine/treatmentCtrl.js?ver='+ bossVersion],
                                    'views/mine/treatment.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*员工端路由*/
                /*员工端首页*/
                    .state('employeeIndex', {
                        url: '/employeeIndex',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeIndexCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeIndexCtrl',
                                    ['js/controllers/employee/employeeIndexCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeIndex.html?ver=' + bossVersion);
                            }
                        }
                    })
                        /*diy项目 选择皮肤页面类型*/
                    .state('chooseSkin', {
                        url: '/chooseSkin',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'chooseSkinCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.chooseSkinCtrl',
                                    ['js/controllers/employee/diy/chooseSkinCtrl.js?ver='+ bossVersion],
                                    'views/employee/diy/chooseSkin.html?ver=' + bossVersion);
                            }
                        }
                    })
                        /*选择需求*/
                    .state('choiceDemand', {
                        url: '/choiceDemand/:orderId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'choiceDemandCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.choiceDemandCtrl',
                                    ['js/controllers/employee/diy/choiceDemandCtrl.js?ver='+ bossVersion],
                                    'views/employee/diy/choiceDemand.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*当前需求*/
                    .state('currentDemand', {
                        url: '/currentDemand',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'currentDemandCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.currentDemandCtrl',
                                    ['js/controllers/employee/diy/currentDemandCtrl.js?ver='+ bossVersion],
                                    'views/employee/diy/currentDemand.html?ver=' + bossVersion);
                            }
                        }
                    })
                        /*diy 基础原料*/
                    .state('selectionList', {
                        url: '/selectionList/:orderId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'selectionListCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.selectionListCtrl',
                                    ['js/controllers/employee/diy/selectionListCtrl.js?ver='+ bossVersion],
                                    'views/employee/diy/selectionList.html?ver=' + bossVersion);
                            }
                        }
                    })
                        /*精华*/
                    .state('essenceList', {
                        url: '/essenceList/:orderId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'essenceListCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.essenceListCtrl',
                                    ['js/controllers/employee/diy/essenceListCtrl.js?ver='+ bossVersion],
                                    'views/employee/diy/essenceList.html?ver=' + bossVersion);
                            }
                        }
                    })
                        /*香型*/
                    .state('aromaList', {
                        url: '/aromaList/:orderId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'aromaListCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.aromaListCtrl',
                                    ['js/controllers/employee/diy/aromaListCtrl.js?ver='+ bossVersion],
                                    'views/employee/diy/aromaList.html?ver=' + bossVersion);
                            }
                        }
                    })
                        /*基底*/
                    .state('basalList', {
                        url: '/basalList/:orderId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'basalListCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.basalListCtrl',
                                    ['js/controllers/employee/diy/basalListCtrl.js?ver='+ bossVersion],
                                    'views/employee/diy/basalList.html?ver=' + bossVersion);
                            }
                        }
                    })
                        /*清单页面*/
                    .state('detailedList', {
                        url: '/detailedList/:orderId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'detailedListCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.detailedListCtrl',
                                    ['js/controllers/employee/diy/detailedListCtrl.js?ver='+ bossVersion],
                                    'views/employee/diy/detailedList.html?ver=' + bossVersion);
                            }
                        }
                    })
                        /*选择其他需求*/
                    .state('otherRequirements', {
                        url: '/otherRequirements/:orderId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'otherRequirementsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.otherRequirementsCtrl',
                                    ['js/controllers/employee/diy/otherRequirementsCtrl.js?ver='+ bossVersion],
                                    'views/employee/diy/otherRequirements.html?ver=' + bossVersion);
                            }
                        }
                    })
                        /*结算页面*/
                    .state('settlement', {
                        url: '/settlement/:orderId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'settlementCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.settlementCtrl',
                                    ['js/controllers/employee/diy/settlementCtrl.js?ver='+ bossVersion],
                                    'views/employee/diy/settlement.html?ver=' + bossVersion);
                            }
                        }
                    })
                        /*支付页面*/
                    .state('diyPay', {
                        url: '/diyPay/:orderId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'diyPayCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.diyPayCtrl',
                                    ['js/controllers/employee/diy/diyPayCtrl.js?ver='+ bossVersion],
                                    'views/employee/diy/diyPay.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*打印小票*/
                    .state('printTicket', {
                        url: '/printTicket/:orderId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'printTicketCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.printTicketCtrl',
                                    ['js/controllers/employee/diy/printTicketCtrl.js?ver='+ bossVersion],
                                    'views/employee/diy/printTicket.html?ver=' + bossVersion);
                            }
                        }
                    })
                        /*diy详情页面*/
                    .state('skinDetails', {
                        url: '/skinDetails',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'skinDetailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.skinDetailsCtrl',
                                    ['js/controllers/employee/diy/skinDetailsCtrl.js?ver='+ bossVersion],
                                    'views/employee/diy/skinDetails.html?ver=' + bossVersion);
                            }
                        }
                    })
                        /*diy交易列表*/
                    .state('diyConsumedRecord', {
                        url: '/diyConsumedRecord',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'diyConsumedRecordCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.diyConsumedRecordCtrl',
                                    ['js/controllers/business/diyConsumedRecordCtrl.js?ver='+ customerVersion],
                                    'views/business/diyConsumedRecord.html?ver=' + customerVersion);
                            }
                        }
                    })
                /*员工端综合分析*/
                    .state('employeeComprehensive', {
                        url: '/employeeComprehensive',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeComprehensiveCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeComprehensiveCtrl',
                                    ['js/controllers/employee/employeeComprehensiveCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeComprehensive.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*员工端排班*/
                    .state('employeeScheduling', {
                        url: '/employeeScheduling',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeSchedulingCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeSchedulingCtrl',
                                    ['js/controllers/employee/employeeSchedulingCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeScheduling.html?ver=' + bossVersion);
                            }
                        }
                    })

                /*员工预约*/
                    .state('employeeAppointList', {
                        url: '/employeeAppointList',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeAppointListCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeAppointListCtrl',
                                    ['js/controllers/employee/employeeAppointListCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeAppointList.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /**/
                    .state('employeeConfirmed', {
                        url: '/employeeConfirmed/:shopAppointServiceId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeConfirmedCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeConfirmedCtrl',
                                    ['js/controllers/employee/employeeConfirmedCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeConfirmed.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*点击已取消预约*/
                    .state('employeeReservation', {
                        url: '/employeeReservation',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeReservationCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeReservationCtrl',
                                    ['js/controllers/employee/employeeReservationCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeReservation.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*取消详情页面*/

                    .state('employeeCancelDetails', {
                        url: '/employeeCancelDetails',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeCancelDetailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeCancelDetailsCtrl',
                                    ['js/controllers/employee/employeeCancelDetailsCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeCancelDetails.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*员工端我的*/
                    .state('employeeMyself', {
                        url: '/employeeMyself',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeMyselfCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeMyselfCtrl',
                                    ['js/controllers/employee/employeeMyselfCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeMyself.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*员工端我的点击设置*/
                    .state('employeeSet', {
                        url: '/employeeSet',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeSetCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeSetCtrl',
                                    ['js/controllers/employee/employeeSetCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeSet.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*点击员工端头像*/
                    .state('employeeInformation', {
                        url: '/employeeInformation',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeInformationCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeInformationCtrl',
                                    ['js/controllers/employee/employeeInformationCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeInformation.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*员工端我的门店*/
                    .state('employeeMyStore', {
                        url: '/employeeMyStore',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeMyStoreCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeMyStoreCtrl',
                                    ['js/controllers/employee/employeeMyStoreCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeMyStore.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*点击我的门店 进入到员工我的门店*/
                    .state('employeeBranchShop', {
                        url: '/employeeBranchShop',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeBranchShopCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeBranchShopCtrl',
                                    ['js/controllers/employee/employeeBranchShopCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeBranchShop.html?ver=' + bossVersion);
                            }
                        }
                    })
                /*员工端档案*/
                    .state('employeePartialFiles', {
                        url: '/employeePartialFiles',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeePartialFilesCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeePartialFilesCtrl',
                                    ['js/controllers/employee/employeePartialFilesCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeePartialFiles.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /* newUser 新建档案*/
                    .state('employeeNewUser', {
                        url: '/employeeNewUser/:id',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeNewUserCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeNewUserCtrl',
                                    ['js/controllers/employee/employeeNewUserCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeNewUser.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*employeeWarningFile 预警档案*/
                    .state('employeeWarningFile', {
                        url: '/employeeWarningFile',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeWarningFileCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeWarningFileCtrl',
                                    ['js/controllers/employee/employeeWarningFileCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeWarningFile.html?ver=' + bossVersion);
                            }
                        }
                    })

                    .state('employeeArchives', {
                        url: '/employeeArchives/:id',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeArchivesCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeArchivesCtrl',
                                    ['js/controllers/employee/employeeArchivesCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeArchives.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('employeeTreatmentCard', {
                        url: '/employeeTreatmentCard/:sysUserId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeTreatmentCardCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeTreatmentCardCtrl',
                                    ['js/controllers/employee/employeeTreatmentCardCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeTreatmentCard.html?ver=' + bossVersion);
                            }
                        }
                    })

                    .state('employeeTreatmentCardDtails', {
                        url: '/employeeTreatmentCardDtails/:flowId/:goodsType/:flowIds/:id',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeTreatmentCardDtailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeTreatmentCardDtailsCtrl',
                                    ['js/controllers/employee/employeeTreatmentCardDtailsCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeTreatmentCardDtails.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('employeeCollectionCard', {
                        url: '/employeeCollectionCard/:sysUserId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeCollectionCardCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeCollectionCardCtrl',
                                    ['js/controllers/employee/employeeCollectionCardCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeCollectionCard.html?ver=' + bossVersion);
                            }
                        }
                    })

                    .state('employeeAccountRecords', {
                        url: '/employeeAccountRecords/:sysUserId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeAccountRecordsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeAccountRecordsCtrl',
                                    ['js/controllers/employee/employeeAccountRecordsCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeAccountRecords.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('employeeRecordCashier', {
                        url: '/employeeRecordCashier/:sysUserId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeRecordCashierCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeRecordCashierCtrl',
                                    ['js/controllers/employee/employeeRecordCashierCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeRecordCashier.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*employeeDetailsOfCashier  收银详情*/
                    .state('employeeDetailsOfCashier', {
                        url: '/employeeDetailsOfCashier/:flowNo',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeDetailsOfCashierCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeDetailsOfCashierCtrl',
                                    ['js/controllers/employee/employeeDetailsOfCashierCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeDetailsOfCashier.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('employeeDrawCardRecords', {
                        url: '/employeeDrawCardRecords/:sysUserId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeDrawCardRecordsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeDrawCardRecordsCtrl',
                                    ['js/controllers/employee/employeeDrawCardRecordsCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeDrawCardRecords.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('employeeDrawCardRecordsDetail', {
                        url: '/employeeDrawCardRecordsDetail/:flowNo',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeDrawCardRecordsDetailCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeDrawCardRecordsDetailCtrl',
                                    ['js/controllers/employee/employeeDrawCardRecordsDetailCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeDrawCardRecordsDetail.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('employeeProduct', {
                        url: '/employeeProduct/:sysUserId/:sysShopId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeProductCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeProductCtrl',
                                    ['js/controllers/employee/employeeProductCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeProduct.html?ver=' + bossVersion);
                            }
                        }
                    })
                    .state('employeeProductDtails', {
                        url: '/employeeProductDtails',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeProductDtailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeProductDtailsCtrl',
                                    ['js/controllers/employee/employeeProductDtailsCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeProductDtails.html?ver=' + bossVersion);
                            }
                        }
                    })





                    /* employeeRefillCard  充值卡*/
                    .state('employeeRefillCard', {
                        url: '/employeeRefillCard/:sysShopId/:sysUserId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeRefillCardCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeRefillCardCtrl',
                                    ['js/controllers/employee/employeeRefillCardCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeRefillCard.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*employeeAccountDetails 账户明细*/
                    .state('employeeAccountDetails', {
                        url: '/employeeAccountDetails/:id',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeAccountDetailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeAccountDetailsCtrl',
                                    ['js/controllers/employee/employeeAccountDetailsCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeAccountDetails.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*employeeBalanceRecord 欠款记录*/
                    .state('employeeBalanceRecord', {
                        url: '/employeeBalanceRecord',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeBalanceRecordCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeBalanceRecordCtrl',
                                    ['js/controllers/employee/employeeBalanceRecordCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeBalanceRecord.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*员工端关于我们*/
                    .state('employeeAboutMine', {
                        url: '/employeeAboutMine',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'employeeAboutMineCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.employeeAboutMineCtrl',
                                    ['js/controllers/employee/employeeAboutMineCtrl.js?ver='+ bossVersion],
                                    'views/employee/employeeAboutMine.html?ver=' + bossVersion);
                            }
                        }
                    })
                /* 产品-领取详情 getTheDetails*/
                    .state('getTheDetails', {
                        url: '/getTheDetails,:flowNo',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'getTheDetailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.getTheDetailsCtrl',
                                    ['js/controllers/work/getTheDetailsCtrl.js?ver='+ bossVersion],
                                    'views/work/getTheDetails.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /* 向员工发送的内容*/
                    .state('sendContent', {
                        url: '/sendContent',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'sendContentCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.sendContentCtrl',
                                    ['js/controllers/archives/sendContentCtrl.js?ver='+ bossVersion],
                                    'views/archives/sendContent.html?ver=' + bossVersion);
                            }
                        }
                    })

                    /* 老板端用于分享微商城的页面*/
                .state('sharePage', {
                    url: '/sharePage',
                    cache:false,
                    templateProvider: function() { return lazyDeferred.promise; },
                    controller: 'sharePageCtrl',
                    resolve: {
                    load: function($templateCache, $ocLazyLoad, $q, $http) {
                         loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.sharePageCtrl',
                                    ['js/controllers/work/sharePageCtrl.js?ver='+ bossVersion],
                                    'views/work/sharePage.html?ver=' + bossVersion);
                            }
                        }
                    })
                    /*theTheme*/
                .state('theTheme', {
                    url: '/theTheme',
                    templateProvider: function() { return lazyDeferred.promise; },
                    controller: 'theThemeCtrl',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q, $http) {
                            loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.sendContentCtrl',
                                ['js/controllers/archives/theThemeCtrl.js?ver='+ bossVersion],
                                'views/archives/theTheme.html?ver=' + bossVersion);
                        }
                    }
                })
                .state('archivesSorting', {
                    url: '/archivesSorting',
                    templateProvider: function() { return lazyDeferred.promise; },
                    controller: 'archivesSortingCtrl',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q, $http) {
                            loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.archivesSortingCtrl',
                                ['js/controllers/work/archivesSortingCtrl.js?ver='+ bossVersion],
                                'views/work/archivesSorting.html?ver=' + bossVersion);
                        }
                    }
                });

                /**/
                /*
                 orderdDtails 详情（订单）
                 payDtails详情（支付)
                 coupons 优惠券
                 couponsDtails 优惠券详情
                 treatmentCard 疗程卡
                 treatmentCardDtails 疗程卡详情
                 productDtails 产品详情
                 treatmentCardDtails领取详情
                 treatmentCardDetail 疗程卡明细
                 collectionCard 套卡
                 product
                 accountRecords 账户记
                 recordCashier 收银记录
                 drawCardRecords 划卡记录
                 drawCardRecordsDetail 划卡记录详情
                 selShop  选择分店
                 membersMess会员信息
                 distributionFile 分配档案
                 selFamily 选择家人
                                  入库
                 outboundOrderDetails 出库单详情
                 outboundRecords  出库记录
                 funArea 汉方美业
                 putInStoragePic 入库
                 outboundPic 出库
                 inventoryDetailsPic 库存详情
                 inventoryPic  盘点
                 settingPic 设置
                 inventoryDetails库存详情
                 libraryTubeSetting 库管设置
                 inventory  盘点
                 inventoryOver 盘点下一步
                 inventoryRecords 盘点记录
                 inventoryRecordsDetails  盘点记录详情
                 unwind  平仓
                 putInStorage 入库
                 entryDetails 入库单详情
                 inventoryRecordsPics 入库记录
                 sweepTheCodeIntoTheTreasury 扫码入库
                 automaticallyStorage 扫码自动入库
                 addEmployees 添加家人(员工)
                 inventorySetting  设置
                 addressBook 库存 通讯录导入
                 AddOutbound 新增出库
                 modifyLibrary修改(库)
                 chooseWarehouse 选择仓库
                 selSeries 选择系列
                 selectTheOutboundType 选择出库类型
                 productInventory 选择更多产品盘点
                 productPutInStorageMore  选择更多产品入库*/
                 $urlRouterProvider.otherwise('/workHome')
            }])
})