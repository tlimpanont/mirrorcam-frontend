FWDUtils.onReady(function(){

    angular.module('myApp', ['snap', 'ui.router', 'ngSanitize', 'mgcrea.ngStrap', 'mirrorcam'])
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
           // $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise("/");
            $stateProvider.
            state('index', {
                url: "/",
                templateUrl: "templates/index.html",
                controller: 'mainCtrl',
                resolve: {
                    resolve: function($q, $http, mirrorcam, dataProvider) {
                        var defer = $q.defer();
                        $q.all([
                                dataProvider.getDatesWithPhotos(),
                            ]).then(function(results) {
                                
                                defer.resolve(results);
                        });
                        return defer.promise;
                    }
                }
            })
        }
    ])
    .controller("mainCtrl", function($scope, $http, $sce, resolve, $aside, mirrorcam, snapRemote) {
        //console.log(resolve);

        $scope.mirrorcam = mirrorcam;
        $scope.availableDates = resolve[0];
        $scope.selectedDate = _.max(resolve[0]);
        var videoSidePanel = null;

        $scope.openThumbnailsPanel = function(e) {
            //snapRemote.open("left");
        }
        
        $scope.viewImageByDate = function(e) {
            jQuery(e.currentTarget).datepicker("hide");
            mirrorcam.pan_zoom_viewer.settings.contentUrl = "http://www.mirrorcam.nl/projects/1330805157__a1f10/camera_b08a5/upload/MM_00011729.JPG";
            mirrorcam.pan_zoom_viewer.settings.mapThumb = "http://www.mirrorcam.nl/projects/1330805157__a1f10/camera_b08a5/thumbs/MM_00011729.JPG";
            mirrorcam.pan_zoom_viewer.exec("destroy");
            mirrorcam.pan_zoom_viewer.exec(mirrorcam.pan_zoom_viewer.settings);
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
