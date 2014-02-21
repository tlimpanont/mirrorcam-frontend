FWDUtils.onReady(function() {
          
   angular.module('mirrorcam', [])
    .provider("datepicker", function() {
        
        this.settings = {
            format: "yyyy-mm-dd"
        }

        this.instance = {};

        this.$get = function(mirrorcam) {
            angular.extend(this.settings, {
                format: mirrorcam.date_format_from_json.toLowerCase()
            })
            return {
                settings: this.settings,
                instance: this.instance
            }
        }
    })
    .directive("eyeconBootstrapDatepicker", function(datepicker) {
        // plugin src: http://www.eyecon.ro/bootstrap-datepicker/
        return {
            replace: false,
            scope: {
                format : "@",
                availableDates : "=",
                selectedDate: "=",
                display: "@",
                onChangeDate: "="
            },
            controller: function($scope) {
                $scope.onRender = function(date) {
                    return _.contains(_.map($scope.availableDates, function(_date) {
                        return _date = _date.valueOf();
                    }), date.valueOf()) ? "" : "disabled";
                }
            },
            link: function(scope, element, attrs, controller) {
                datepicker.instance = angular.element(element).datepicker({
                    onRender: scope.onRender,
                    format: scope.format
                })
                datepicker.instance.on("changeDate", scope.onChangeDate);
                if(scope.selectedDate != null)
                    datepicker.instance.datepicker('setValue', scope.selectedDate);
                datepicker.instance.datepicker(scope.display);
                datepicker.instance.datepicker("place");
            }
        }
    })
    .service("server", function($http, $q, mirrorcam) {
        return {
            loadAvailableDates: function(camera_key) {
                var defer = $q.defer();
                $http.get(mirrorcam.api_base_url+"getDate/?camera_key="+camera_key)
                .success(function(array_date_string_objects) {
                    var available_dates = _.map(array_date_string_objects, function(item,index) {
                            return moment(item.DateTime, mirrorcam.date_format_from_json)._d
                    })
                    defer.resolve(available_dates);
                });
                return defer.promise;
            },
            loadPhotos: function(camera_key, date_string) {
                return $http.get(mirrorcam.api_base_url + "getAllThumbnailsByCameraAndDate?camera_key="+camera_key+"&date="+date_string);
            }
        }
    })
    .provider("megazoomViewer", function() {

        this.settings =  {
            //----main----//
            parentId:"myDiv",
            playListAndSkinId:"megazoomPlayList",
            displayType:"reponsive",
            skinPath:"css/megazoom-viewer/skin_embossed_grey/skin/",
            imagePath:"css/megazoom-viewer/skin_embossed_grey/imageToZoom.jpg",
            preloaderText:"Loading image...",
            useEntireScreen:"yes",
            addKeyboardSupport:"yes",
            addDoubleClickSupport:"yes",
            imageWidth:2490,
            imageHeight:3300,
            zoomFactor:1.4,
            doubleClickZoomFactor:1,
            startZoomFactor:"default",
            panSpeed:8,
            zoomSpeed:.1,
            backgroundColor:"#FFF",
            preloaderFontColor:"#a2a3a3",
            preloaderBackgroundColor:"#FFF",
            //----lightbox-----//
            lightBoxWidth:800,
            lightBoxHeight:550,
            lightBoxBackgroundOpacity:.8,
            lightBoxBackgroundColor:"#FFF",
            //----controller----//
            buttons:"moveLeft, moveRight, moveDown, moveUp, scrollbar, hideOrShowMarkers, hideOrShowController, info, fullscreen",
            buttonsToolTips:"Move left, Move right, Move down, Move up, Zoom level: , Hide markers/Show markers, Hide controller/Show controller, Info, Full screen/Normal screen",
            controllerPosition:"bottom",
            inversePanDirection:"yes",
            startSpaceBetweenButtons:10,
            spaceBetweenButtons:10,
            startSpaceForScrollBarButtons:20,
            startSpaceForScrollBar:6,
            hideControllerDelay:3,
            controllerMaxWidth:940,
            controllerBackgroundOpacity:1,
            controllerOffsetY:0,
            scrollBarOffsetX:0,
            scrollBarHandlerToolTipOffsetY:-4,
            zoomInAndOutToolTipOffsetY:-1,
            buttonsToolTipOffsetY:4,
            hideControllerOffsetY:4,
            buttonToolTipFontColor:"#a2a3a3",
            //----navigator----//
            showNavigator:"yes",
            showNavigatorOnMobile:"yes",
            navigatorImagePath:"css/megazoom-viewer/skin_embossed_grey/navigatorImage.jpg",
            navigatorPosition:"topright",
            navigatorOffsetX:6,
            navigatorOffsetY:6,
            navigatorHandlerColor:"#FF0000",
            navigatorBorderColor:"#AAAAAA",
            //----info window----//
            infoWindowBackgroundOpacity:.6,
            infoWindowBackgroundColor:"#4c4c4c",
            infoWindowScrollBarColor:"#999999",
            //----markers-----//
            showMarkersInfo:"no",
            markerToolTipOffsetY:0,
            //----context menu----//
            showScriptDeveloper:"no",
            contextMenuLabels:"Move left, Move right, Move down, Move up, Zoom in/Zoom out, Hide markers/Show markers, Hide controller/Show controller, Info, Full screen/Normal screen",
            contextMenuBackgroundColor:"#4c4c4c",
            contextMenuBorderColor:"#727272",
            contextMenuSpacerColor:"#727272",
            contextMenuItemNormalColor:"#a2a3a3",
            contextMenuItemSelectedColor:"#FFFFFF",
            contextMenuItemDisabledColor:"#595b5b"
        }
        this.instance = {};
       
        this.$get = function() {
            return {
                settings: this.settings,
                instance: this.instance,
                rebuild: function(settings) {
                    jQuery( "#" +this.settings.parentId).html("");
                    jQuery( "#" +this.settings.parentId)
                    .prepend("<div id='playListAndSkinId' style='display: none;'></div>"); 
                    this.instance.destroy();
                    this.instance = new FWDMegazoom(settings);
                }
            }
        }

    })
    .directive("megazoomViewer", function(mirrorcam, megazoomViewer) {
         return {
            replace: false,
            scope: {
                playListAndSkinId : "&"
            },
            template: "<div id='playListAndSkinId' style='display: none;'></div>",
            controller: function($scope) {
                $scope.randomId = function(prefix) {
                    return prefix + Math.floor(Math.random() * 100000);
                }
            }, 
            link: function(scope, element, attrs, controller) {
                var parentId =  scope.randomId("parentId_");

                angular.element(element).attr("id", parentId);
                angular.element(element).css({
                    width: "100%",
                    height: jQuery(window).height() - 100 +  "px"
                });

                angular.extend(megazoomViewer.settings, {
                    parentId: parentId,
                    playListAndSkinId: 'playListAndSkinId',
                });

                megazoomViewer.instance = new FWDMegazoom(megazoomViewer.settings);
            }
        }
    })
    .directive("thumbnailsSwipePane", function(mirrorcam) {
        return {
            templateUrl: "templates/thumbnails_pane.html",
            link: function(scope, element, attrs, controller) {
                scope.container_id = scope.containerId();
                scope.thumb_margin = 20;
                scope.thumb_width = 150;
                scope.thumb_height = 150;
                scope.slidesPerView = 6;

                setTimeout(function() {
                    var settings = angular.extend( mirrorcam.thumbnails_swipe_pane.settings, {
                        slidesPerView: scope.slidesPerView
                    });
                    var swiperPane = new Swiper("#"+scope.container_id, settings);
                    mirrorcam.thumbnails_swipe_pane = swiperPane;
                    mirrorcam.thumbnails_swipe_pane.settings = settings;
                    scope.swiperPane = swiperPane;
                }, 0);
            },
            controller: function($scope, mirrorcam) {
                $scope.mirrorcam = mirrorcam;

                $scope.containerId = function() {
                    return "swiper_container_" + Math.floor(Math.random() * 10000);
                }

                $scope.nextSlide = function() {
                    mirrorcam.thumbnails_swipe_pane.swipeNext();
                }

                $scope.prevSlide = function() {
                    mirrorcam.thumbnails_swipe_pane.swipePrev();
                }

                $scope.openPane = function() {   
                    jQuery("#pane_container").animate({"margin-top": -250}, function() {
                        jQuery(this).find(".close_pane").fadeIn();
                    });
                }
                $scope.closePane = function() {
                    jQuery(".close_pane").hide();
                    jQuery("#pane_container").animate({"margin-top": 0});
                }
            }
        }
    })
    .filter("moment", function() {
        return function(input) {
            return moment(input);  
        }
    })
    .filter("moment_format", function() {
        return function(input, format) {
            return moment(input).format(format);  
        }
    })
    .provider('mirrorcam', function() {
        var api_base_url = "http://www.mirrorcam.nl/index.php/api/method/";
        var base_url = "http://www.mirrorcam.nl/";

        this.$get = function($http) {
            return {
                camera_key: "08a680aa585518f150469a1b5a64bb10" ,
                base_url: base_url,
                api_base_url: api_base_url,
                date_format_from_json: "YYYY-MM-DD", // based on moment.js lib convention
                thumbnails_swipe_pane: {
                    settings: {
                        mode:'horizontal',
                        loop: false,
                        slidesPerView: 4,
                        simulateTouch: true,
                        mousewheelControl: true,
                        keyboardControl: true,
                        freeMode: true,
                        freeModeFluid: true
                    }
                }
            }   // END returning
        } // END $get function   
    });
});