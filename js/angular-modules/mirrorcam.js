(function(jQuery, _, FWDUtils) {
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
            template: '<div id="{{parentId}}" style="width:{{width}}px; height:{{height}}px; margin:auto;"></div> <div id="{{playListAndSkinId}}" style="display:none;"> </div>',
            controller: function($scope) {
                $scope.randomId = function(prefix) {
                    return prefix + Math.floor(Math.random() * 100000);
                }
                $scope.width = 200;
                $scope.height = 200;
            },  
            link: function(scope, element, attrs, controller) {
                scope.parentId = scope.randomId("parentId_");
                scope.playListAndSkinId = scope.randomId("playListAndSkinId_");

                mirrorcam.megazoom_viewer.settings.parentId = scope.parentId;
                mirrorcam.megazoom_viewer.settings.playListAndSkinId = scope.playListAndSkinId;
                //mirrorcam.megazoom_viewer.settings.navigatorOffsetY = 50;

               setTimeout(function() {
                    var viewer =  new FWDMegazoom(mirrorcam.megazoom_viewer.settings);
                    angular.extend(viewer,  mirrorcam.megazoom_viewer);
                }, 0)

               setTimeout(function() {
                   // angular.element("#"+scope.parentId).css({"margin-top" : jQuery("#top-menu").outerHeight()});
               }, 100)
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
    .directive("pane", function(mirrorcam) {
        return {
            templateUrl: "templates/thumbnails_pane.html",
            scope: {
                show: "@",
                openMe: "="
            },
            link: function(scope, element, attrs, controller) {
               
                if(scope.show == "open")
                {
                    openPane();
                    scope.open = true;
                }
                else
                {
                    closePane();
                    scope.open = false;
                }
                    
                scope.toggle = function() {
                    if(scope.open)
                    {
                        closePane();
                        scope.open = false;
                    }
                    else
                    {
                        openPane();
                        scope.open = true;
                    }
                }

                function closePane() {
                    angular.element(element).stop(true, false).animate({
                        bottom: -angular.element(element).outerHeight()
                    });
                }

                function openPane() {
                    angular.element(element).stop(true, false).animate({bottom: 0});
                }
            },
            controller: function($scope) {
                $scope.viewImageByDate = function() {
                    mirrorcam.pan_zoom_viewer.settings.contentUrl = "http://www.mirrorcam.nl/projects/1330805157__a1f10/camera_b08a5/upload/MM_00011729.JPG";
                    mirrorcam.pan_zoom_viewer.settings.mapThumb = "http://www.mirrorcam.nl/projects/1330805157__a1f10/camera_b08a5/thumbs/MM_00011729.JPG";
                    mirrorcam.pan_zoom_viewer.exec("destroy");
                    mirrorcam.pan_zoom_viewer.exec(mirrorcam.pan_zoom_viewer.settings);
                }
            }
        }
    })
    .directive("paneTrigger" , function(mirrorcam) {
        return {
            link: function(scope, element, attrs, controller) {
                angular.element(element).css({
                    position: "absolute",
                    top: -angular.element(element).outerHeight()
                });
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
                        megazoom_viewer: {
                            settings: {
                                displayType:"responsive",
                                skinPath:"css/megazoom-viewer/skin_cutout_round_silver/skin/",
                                imagePath:"css/megazoom-viewer/skin_cutout_round_silver/imageToZoom.jpg",
                                preloaderText:"Loading image...",
                                useEntireScreen:"yes",
                                addKeyboardSupport:"yes",
                                addDoubleClickSupport:"yes",
                                imageWidth:5000,
                                imageHeight:2926,
                                zoomFactor:1,
                                doubleClickZoomFactor:1,
                                startZoomFactor:"default",
                                panSpeed:8,
                                zoomSpeed:.1,
                                backgroundColor:"#FFF",
                                preloaderFontColor:"#FFF",
                                preloaderBackgroundColor:"#FFF",
                                //----lightbox-----//
                                lightBoxWidth:800,
                                lightBoxHeight:550,
                                lightBoxBackgroundOpacity:.8,
                                lightBoxBackgroundColor:"#000000",
                                //----controller----//
                                buttons:"scrollbar, hideOrShowController, fullscreen",
                                buttonsToolTips:"",
                                controllerPosition:"bottom",
                                inversePanDirection:"yes",
                                startSpaceBetweenButtons:8,
                                spaceBetweenButtons:10,
                                startSpaceForScrollBarButtons:20,
                                startSpaceForScrollBar:0,
                                hideControllerDelay:3,
                                controllerMaxWidth:700,
                                controllerBackgroundOpacity:1,
                                controllerOffsetY:0,
                                scrollBarOffsetX:0,
                                scrollBarHandlerToolTipOffsetY:4,
                                zoomInAndOutToolTipOffsetY:-2,
                                buttonsToolTipOffsetY:4,
                                hideControllerOffsetY:0,
                                buttonToolTipFontColor:"#434343",
                                //----navigator----//
                                showNavigator:"yes",
                                showNavigatorOnMobile:"yes",
                                navigatorImagePath:"css/megazoom-viewer/skin_cutout_round_silver/navigatorImage.jpg",
                                navigatorPosition:"topright",
                                navigatorOffsetX:6,
                                navigatorOffsetY:6,
                                navigatorHandlerColor:"#FF0000",
                                navigatorBorderColor:"#AAAAAA",
                                //----info window----//
                                infoWindowBackgroundOpacity:.6,
                                infoWindowBackgroundColor:"#FFFFFF",
                                infoWindowScrollBarColor:"#585858",
                                //----markers-----//
                                showMarkersInfo:"no",
                                markerToolTipOffsetY:0,
                                //----context menu----//
                                showScriptDeveloper:"no",
                                contextMenuLabels:"",
                                contextMenuBackgroundColor:"#c1c1c1",
                                contextMenuBorderColor:"#e8e7e7",
                                contextMenuSpacerColor:"#e8e7e7",
                                contextMenuItemNormalColor:"#434343",
                                contextMenuItemSelectedColor:"#FFFFFF",
                                contextMenuItemDisabledColor:"#999999"
                            }
                        }
                    }   
                }
            }
        });
    });
    
})(jQuery, _, FWDUtils);