FWDUtils.onReady(function(){

    angular.module('myApp', ['ui.router', 'ngSanitize', 'mgcrea.ngStrap', 'mirrorcam'])
    .config(function(mirrorcamProvider) {
       //console.log(mirrorcamProvider);
    })
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {
           //$locationProvider.html5Mode(true);
            //$urlRouterProvider.otherwise("/");
            $stateProvider.
            state('index', {
                url: "/",
                controller: function($state, mirrorcam) {
                    $state.go("camera", { camera_key: mirrorcam.camera_key });
                }
            })
            .state('camera', {
                url: "/:camera_key",
                controller: function(availableDates, $state, $stateParams, mirrorcam) {
                    mirrorcam.camera_key = $stateParams.camera_key;
                    $state.go("camera_date_string", {
                            camera_key: $stateParams.camera_key, 
                            date_string: moment(_.max(availableDates)).format(mirrorcam.date_format_from_json)
                    });
                },
                resolve: {
                    availableDates: function(server, mirrorcam, $stateParams) {
                        return server.loadAvailableDates($stateParams.camera_key);
                    }
                }
            })
            .state('camera_date_string', {
                url: "/:camera_key/:date_string",
                templateUrl:  "templates/index.html",
                controller: "mainCtrl",
                resolve: {
                    availableDates: function(server, mirrorcam, $stateParams) {
                        return server.loadAvailableDates($stateParams.camera_key);
                    },
                    photosCamera: function($q, server, $stateParams) {
                        var defer = $q.defer();
                        
                        server.loadPhotos($stateParams.camera_key, $stateParams.date_string).success(function(portalData) {
                            defer.resolve(portalData);
                        });

                        return defer.promise;
                    }
                }
            })
        }
    ])
    .controller("mainCtrl", function($scope, $aside, $stateParams, mirrorcam, availableDates, photosCamera, megazoomViewer) {
        $scope.format = mirrorcam.date_format_from_json;
        $scope.availableDates = availableDates;
        $scope.selectedDate = moment($stateParams.date_string, mirrorcam.date_format_from_json);
        $scope.photos = photosCamera.photos;
        $scope.camera = photosCamera.camera[0];

        $scope.onChangeDate = function(datepicker_event) {
           megazoomViewer.rebuild(megazoomViewer.settings);
        } 

        $scope.viewTimelapseByDate = function(e) {
            jQuery(e.currentTarget).datepicker("hide");
            $scope.timelapse_moment = moment(e.date).format("DD MMMM YYYY");
            $scope.showVideoSidePanel();
        }
        
        $scope.viewTimelapseByWeek = function(date_string) {
            $scope.timelapse_moment = "week " + moment(date_string, mirrorcam.date_format_from_json).week();
            $scope.showVideoSidePanel();
        }

        $scope.viewTimelapseByMonth = function(date_string) {
            $scope.timelapse_moment = "month " + moment(date_string, mirrorcam.date_format_from_json).format('MMMM');
            $scope.showVideoSidePanel();
        }
        
        $scope.showVideoSidePanel = function() {  
            if(videoSidePanel != null)
               videoSidePanel.$element.remove();
            
            videoSidePanel = $aside({ show: false, scope: $scope, template: 'templates/video_sidepanel.html', html: true, placement: "left", animation: "am-slide-left"});
        
            videoSidePanel.$promise.then(function() {
                videoSidePanel.show();
                jQuery(".aside-backdrop").last().prev(".aside-backdrop").remove();           
            });
            
            
        }
    });

    angular.bootstrap(document, ['myApp']);
});
