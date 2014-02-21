FWDUtils.onReady(function(){

    angular.module('myApp', ['ui.router', 'ngRoute', 'ngSanitize', 'mgcrea.ngStrap', 'mirrorcam'])
    .config(function(mirrorcamProvider) {
       //console.log(mirrorcamProvider);
    })
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$routeProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider, $routeProvider) {
            //$locationProvider.html5Mode(true).hashPrefix('!');
            $routeProvider.
              when('/:camera_key/:date_string', {
                templateUrl: 'templates/index.html',
                resolve: {
                    availableDates: function(server, mirrorcam, $route) {
                        return server.loadAvailableDates($route.current.params.camera_key);
                    },
                    photosCamera: function($q, server, $route) {
                        var defer = $q.defer();
                        
                        server.loadPhotos($route.current.params.camera_key, $route.current.params.date_string).success(function(portalData) {
                            defer.resolve(portalData);
                        });

                        return defer.promise;
                    }
                },
                controller: "mainCtrl"
              })
        }
    ])
    .controller("mainCtrl", function($rootScope, $scope, $aside, $route, $location, mirrorcam, megazoomViewer, datepicker) {
        var availableDates = $route.current.locals.availableDates;
        var photosCamera  = $route.current.locals.photosCamera;
        $scope.format = mirrorcam.date_format_from_json;
        $scope.availableDates = availableDates;
        $scope.selectedDate = moment($route.current.params.date_string, mirrorcam.date_format_from_json);
        $scope.photos = photosCamera.photos;
        $scope.camera = photosCamera.camera[0];

        $scope.onChangeDate = function(datepicker_event) {
           datepicker.instance.datepicker("hide");
            var date_string = moment(datepicker_event.date).format(mirrorcam.date_format_from_json);
            $rootScope.$apply(function() {
                $location.path("/"+$route.current.params.camera_key+"/"+date_string);
                console.log($location.path());
            });
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
