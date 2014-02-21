FWDUtils.onReady(function(){

    angular.module('myApp', ['ui.router', 'ngRoute', 'ngSanitize', 'mgcrea.ngStrap', 'mirrorcam'])
    .config(function(mirrorcamProvider) {
       //console.log(mirrorcamProvider);
    })
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$routeProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider, $routeProvider) {
            //$locationProvider.html5Mode(true).hashPrefix('!');
            $routeProvider
            .when('/', {
                templateUrl: 'templates/index.html',
                controller: function($route, $location, mirrorcam) {
                    $location.path("/"+mirrorcam.camera_key);
                }
              })
              .when('/:camera_key/?', {
                templateUrl: 'templates/index.html',
                resolve: {
                    availableDates: function(server, mirrorcam, $route) {
                        return server.loadAvailableDates($route.current.params.camera_key);
                    }
                },
                controller: function($route, $location, mirrorcam) {
                    var date_string = moment(_.max($route.current.locals.availableDates)).format(mirrorcam.date_format_from_json);
                    $location.path("/"+$route.current.params.camera_key+"/"+date_string);
                }
              })
              .when('/:camera_key/:date_string', {
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
                controller: function($route, $location) {
                    var time = $route.current.locals.photosCamera.photos[0].DateTimeDigitized.split(" ")[1];
                    $location.path("/"+$route.current.params.camera_key+"/"+$route.current.params.date_string+"/"+time);
                }
              })
              .when('/:camera_key/:date_string/:time', {
                templateUrl: 'templates/index.html',
                resolve: {
                    availableDates: function(server, mirrorcam, $route) {
                        return server.loadAvailableDates($route.current.params.camera_key);
                    },
                    photosCamera: function($q, server, $route) {
                        var defer = $q.defer();
                        
                        server.loadPhotos($route.current.params.camera_key, $route.current.params.date_string).success(function(portalData) {
                            var data = angular.extend(portalData, {
                                selectedPhoto: _.findWhere(portalData.photos, {
                                    DateTimeDigitized: $route.current.params.date_string + " " +  $route.current.params.time
                                })
                            });
                            defer.resolve(data);
                        });

                        return defer.promise;
                    }
                },
                controller: "mainCtrl"
          })
        }
    ])
    .controller("mainCtrl", function($scope, $rootScope, $aside, $route, $location, mirrorcam, megazoomViewer, thumbnailsSwipePane) {
        var availableDates = $route.current.locals.availableDates;
        var photosCamera  = $route.current.locals.photosCamera;
        $scope.format = mirrorcam.date_format_from_json;
        $scope.availableDates = availableDates;
        $scope.selectedDate = moment($route.current.params.date_string, mirrorcam.date_format_from_json);
        $scope.photos = photosCamera.photos;
        $scope.selectedPhoto = $route.current.locals.photosCamera.selectedPhoto;
        $scope.camera = photosCamera.camera[0];
        $scope.mirrorcam = mirrorcam;

         setTimeout(function() {
            $scope.$apply(function() {
                _.each($scope.photos, function(photo) {photo.isActive = false});
                $scope.selectedPhoto.isActive = true;
                megazoomViewer.init(megazoomViewer.buildSettings(mirrorcam, $scope.camera, $scope.photos, $scope.selectedPhoto ));
            });
        }, 0);


        $scope.onChangeDate = function(datepicker_event) {
            angular.element(datepicker_event.currentTarget).datepicker("hide");
            var date_string = moment(datepicker_event.date).format(mirrorcam.date_format_from_json);
            $scope.$apply(function() {
                $location.path("/"+$route.current.params.camera_key+"/"+date_string);
            });
        }

        $scope.displayPhoto = function(photo) {
            // _.each($scope.photos, function(photo) { photo.isActive = false });
            // photo.isActive = true;
            // megazoomViewer.init(megazoomViewer.buildSettings(mirrorcam, $scope.camera, $scope.photos, photo));
            var date_time_string = photo.DateTimeDigitized.split(" ");
            $location.path("/"+$route.current.params.camera_key+"/"+date_time_string[0]+"/"+date_time_string[1]);
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
