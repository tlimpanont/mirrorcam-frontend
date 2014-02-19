(function(jQuery, _) {
    angular.module('mirrorcam', [])
    // plugin src: http://www.eyecon.ro/bootstrap-datepicker/
    .directive("eyeconBootstrapDatepicker", function() {
        return {
            replace: false,
            scope: {
                format : "@",
                availableDates : "=",
                selectedDate: "=",
                display: "@",
                onChangeDate: "="
            },
            link: function(scope, element, attrs, controller) {
                var _datepicker = angular.element(element).datepicker({
                    onRender: scope.onRender,
                    format: scope.format
                })
                _datepicker.on("changeDate", scope.onChangeDate);
                if(scope.selectedDate != null)
                    _datepicker.datepicker('setValue', scope.selectedDate);
                _datepicker.datepicker(scope.display);
                _datepicker.datepicker("place");
                scope.datepicker = _datepicker;
            },
            controller: function($scope) {
                $scope.onRender = function(date) {
                    return _.contains(_.map($scope.availableDates, function(_date) {
                        return _date = _date.valueOf();
                    }), date.valueOf()) ? "" : "disabled";
                }  
            }
        }
    })
    .service("dataProvider", function($http, $q, mirrorcam) {
        return {
            getDatesWithPhotos: function() {
                var dates_with_photos = $q.defer();
                $http.get("json/dates_with_photos.json").then(function(res) {
                    var data = {};
                    data.availableDates = _.map(res.data, function(item,index) {
                        return moment(item.DateTime, mirrorcam.date_format_from_json)._d
                    })
                    dates_with_photos.resolve(data.availableDates);
                });
                return dates_with_photos.promise;
            }
        }
    })
    .directive("megazoomViewer", function(mirrorcam) {
         return {
            scope : {
                
            },
            template: '<div id="{{parentId}}" style="width:{{width}}; height:{{height}}; margin:auto;"><div id="{{playListAndSkinId}}" style="display:none;"> </div></div> ',
            controller: function($scope) {
                $scope.randomId = function(prefix) {
                    return prefix + Math.floor(Math.random() * 100000);
                }
                $scope.width = "100%";
                $scope.height = jQuery(window).height() - 100 +  "px";
            },  
            link: function(scope, element, attrs, controller) {
                scope.parentId = scope.randomId("parentId_");
                scope.playListAndSkinId = scope.randomId("playListAndSkinId_");

                var settings = angular.extend(mirrorcam.megazoom_viewer.settings, {
                    parentId: scope.parentId,
                    playListAndSkinId: scope.playListAndSkinId
                });
                setTimeout(function() {
                    mirrorcam.megazoom_viewer = new FWDMegazoom(settings);
                    mirrorcam.megazoom_viewer.settings = settings;
                }, 0);
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
                scope.slidesPerView = 4;

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
                $scope.thumbs = [1,2,3,4,5,6,7,8,9,10];

                $scope.containerId = function() {
                    return "swiper_container_" + Math.floor(Math.random() * 10000);
                }
                $scope.viewMegazoomImage = function(date_string) {
                       
                    if(mirrorcam.megazoom_viewer)
                    {
                       jQuery( "#" + mirrorcam.megazoom_viewer.settings.parentId)
                       .prepend('<div id="'+mirrorcam.megazoom_viewer.settings.playListAndSkinId+'" style="display:none;"> </div>'); 
                        mirrorcam.megazoom_viewer.destroy();
                    }
                    var settings = angular.extend(mirrorcam.megazoom_viewer.settings, {
                        imagePath: "css/megazoom-viewer/skin_round_silver/imageToZoom.jpg",
                        imageWidth: "4324",
                        imageHeight: "2530",
                        navigatorImagePath : "css/megazoom-viewer/skin_round_silver/navigatorImage.jpg"
                    });
                    mirrorcam.megazoom_viewer = new FWDMegazoom(settings);
                    mirrorcam.megazoom_viewer.settings = settings;
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
    .directive("panZoomViewer", function(mirrorcam) {
        return {
            link: function(scope, element, attrs, controller) {
                
                mirrorcam.pan_zoom_viewer.settings.contentUrl = "img/1.jpg";
                mirrorcam.pan_zoom_viewer.settings.mapThumb = "img/thumb-1.jpg";
                
                var viewer = jQuery(element).lhpMegaImgViewer(mirrorcam.pan_zoom_viewer.settings);
                mirrorcam.pan_zoom_viewer.exec = function(method) {
                    return viewer.lhpMegaImgViewer(method);
                };
                mirrorcam.pan_zoom_viewer.reposition = function() {
                    jQuery(element).css({
                        position: 'absolute',
                        width: jQuery(window).width(),
                        height: jQuery(window).height() - jQuery("#top-menu").outerHeight()
                    }).lhpMegaImgViewer("adaptsToContainer");   
                    
                    jQuery(element).css({
                        top: jQuery("#top-menu").outerHeight() 
                    });
                }
    
                jQuery(window).resize(function() {  mirrorcam.pan_zoom_viewer.reposition() ; });  mirrorcam.pan_zoom_viewer.reposition();   
                
                angular.extend(viewer, mirrorcam.pan_zoom_viewer );

                jQuery(window).resize();
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
    .config(function($provide) {
        $provide.provider('mirrorcam', function() {
            return {
                $get : function() {
                    return {
                        date_format_from_json: "YYYY-MM-DD" ,
                        pan_zoom_viewer: {
                            settings: {
                                "viewportWidth" : "100%",
                                "viewportHeight" : "100%",
                                'fitToViewportShortSide' : true,  
                                'contentSizeOver100' : false,
                                'startScale' : 0,
                                'startX' : 0,
                                'startY' : 0,
                                "animTime" : 500,
                                "draggInertia" : 10,
                                "zoomLevel" : 2,
                                "zoomStep" : 0.1,
                                "contentUrl" : "img/1.jpg",
                                "mapEnable" : true,
                                "mapThumb" : "img/thumb-1.jpg",
                                "mapPos" : "BR",
                                "popupShowAction" : "click",
                                "testMode" : false
                            }
                        },
                        thumbnails_swipe_pane: {
                            settings: {
                                mode:'horizontal',
                                loop: false,
                                slidesPerView: 4,
                                simulateTouch: true,
                                mousewheelControl: true,
                                keyboardControl: true
                            }
                        },
                        megazoom_viewer: {
                            settings: {
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
                        }
                    }   
                }
            }
        });
    });
    
})(jQuery, _);