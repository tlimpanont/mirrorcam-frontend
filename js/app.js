FWDUtils.onReady(function(){

    angular.module('myApp', ['ui.router', 'ngSanitize', 'mgcrea.ngStrap', 'mirrorcam'])
    .config(function(mirrorcamProvider) {
       //console.log(mirrorcamProvider);
    })
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
           // $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise("/");
            $stateProvider.
            state('index', {
                url: "/:camera_key",
                templateUrl: "templates/index.html",
                controller: 'mainCtrl',
                resolve: {
                    resolve: function($q, $state, $http, mirrorcam, dataProvider, $stateParams) {
                        if($stateParams.camera_key)
                            mirrorcam.camera_key = $stateParams.camera_key;
                        
                        var defer = $q.defer();

                         dataProvider.getDatesWithPhotos(mirrorcam.camera_key).then(function(availableDates){
                            var selectedDate = _.max(availableDates);
                            var selectedDateString = moment(selectedDate).format(mirrorcam.date_format_from_json);
                            dataProvider.getAllThumbnailsByCameraAndDate(mirrorcam.camera_key, selectedDateString).then(function(res) {
                                    defer.resolve({
                                        availableDates: availableDates,
                                        selectedDate: {
                                            date: selectedDate,
                                            date_string: selectedDateString,
                                            photos: res.data.photos,
                                            selected_photo: res.data.photos[0]
                                        },
                                        camera: res.data.camera[0]
                                    });
                                });
                         });

                        return defer.promise;
                    }
                }
            })
        }
    ])
    .controller("mainCtrl", function($scope, $http, $sce, $aside, resolve, mirrorcam, dataProvider) {
        $scope.mirrorcam = angular.extend(mirrorcam, resolve);
    
        var videoSidePanel = null;

        $scope.loadThumbnailsAndviewMegazoomImage = function(datepicker_event) {
            var selectedDate = datepicker_event.date;
            var selectedDateString = moment(selectedDate).format(mirrorcam.date_format_from_json);
            dataProvider.getAllThumbnailsByCameraAndDate(mirrorcam.camera_key, selectedDateString)
            .then(function(res) {
               mirrorcam.selectedDate = angular.extend(mirrorcam.selectedDate, {
                    date: selectedDate,
                    date_string: selectedDateString,
                    photos: res.data.photos
                });         

                setTimeout(function() {
                    mirrorcam.thumbnails_swipe_pane.reInit(); 
                    mirrorcam.thumbnails_swipe_pane.swipeTo(0);
                } , 0);         
                
                mirrorcam.megazoom_viewer.viewMegazoomImage(mirrorcam.selectedDate.photos[0].DateTimeDigitized); 
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
