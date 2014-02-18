/* Data */
(function(window){
	
	var FWDData = function(props, playListElement){
		
		var self = this;
		var prototype = FWDData.prototype;
		
		this.navigatorImage_img;
		this.mainPreloader_img = null;
		this.mainLightboxCloseButtonN_img = null;
		this.mainLightboxCloseButtonS_img = null;
		this.controllerBackgroundLeft_img = null;
		this.controllerBackgroundRight_img = null;
		this.controllerMoveDownN_img = null;
		this.controllerMoveDownS_img = null;
		this.controllerMoveDownD_img = null;
		this.controllerMoveUpN_img = null;
		this.controllerMoveUpS_img = null;
		this.controllerMoveUpD_img = null;
		this.controllerNextN_img = null;
		this.controllerNextS_img = null;
		this.controllerNextD_img = null;
		this.controllerPrevN_img = null;
		this.controllerPrevS_img = null;
		this.controllerPrevD_img = null;
		this.controllerHideMarkersN_img = null;
		this.controllerHideMarkersS_img = null;
		this.controllerShowMarkersN_img = null;
		this.controllerShowMarkersS_img = null;
		this.controllerInfoN_img = null;
		this.controllerInfoS_img = null;
		this.controllerHideN_img = null;
		this.controllerHideS_img = null;
		this.controllerShowN_img = null;
		this.controllerShowS_img = null;
		this.controllerFullScreenNormalN_img = null;
		this.controllerFullScreenNormalS_img = null;
		this.controllerFullScreenFullN_img = null;
		this.controllerFullScreenFullS_img = null;
		this.zoomInN_img = null;
		this.zoomInS_img = null;
		this.zoomOutN_img = null;
		this.zoomOutS_img = null;
		this.scrollBarHandlerN_img = null;
		this.scrollBarHandlerS_img = null;
		this.scrollBarLeft_img = null;
		this.scrollBarRight_img = null;
		this.toolTipLeft_img = null;
		this.toolTipPointer_img = null;
		this.infoWindowCloseNormal_img = null;
		this.infoWindowCloseSelected_img = null;
		this.originalImage_img = null;
		this.navigatorImage_img = null;
		
		this.props_obj = props;
		this.rootElement_el = null;
		this.skinPaths_ar = [];
		this.images_ar = [];
		this.markersList_ar = [];
		this.toolTipWindows_ar = [];
		this.buttons_ar = null;
		this.buttonsLabels_ar = null;
		this.contextMenuLabels_ar = null;
	
		this.skinPath_str = undefined;
		this.backgroundColor_str = null;
		this.handMovePath_str = null;
		this.handGrabPath_str = null;
		this.controllerBackgroundMiddlePath_str = null;
		this.scrollBarMiddlePath_str = null;
		this.controllerPosition_str = null;
		this.preloaderFontColor_str = null;
		this.preloaderBackgroundColor_str = null;
		this.preloaderText_str = null;
		this.buttonToolTipLeft_str = null;
		this.buttonToolTipMiddle_str = null;
		this.buttonToolTipRight_str = null;
		this.buttonToolTipBottomPointer_str = null;
		this.buttonToolTipTopPointer_str = null;
		this.buttonToolTipFontColor_str = null;
		this.contextMenuBackgroundColor_str = null;
		this.contextMenuBorderColor_str = null;
		this.contextMenuSpacerColor_str = null;
		this.contextMenuItemNormalColor_str = null;
		this.contextMenuItemSelectedColor_str = null;
		this.contextMenuItemSelectedColor_str = null;
		this.contextMenuItemDisabledColor_str = null;
		this.navigatorPosition_str = null;
		this.navigatorHandlerColor_str = null;
		this.navigatorBorderColor_str = null;
		this.infoText_str = null;
		this.infoWindowBackgroundColor_str = null;
		this.infoWindowScrollBarColor_str = null;
		this.originalImagePath_str = null;
		this.navigatorImagePath_str = null;
		
		this.dragRotationSpeed;
		this.panSpeed;
		this.zoomSpeed;
		this.controllerHeight;
		this.imageWidth;
		this.imageHeight;
		this.largeImageWidth;
		this.largeImageHeight;
		this.spaceBetweenButtons;
		this.startSpaceBetweenButtons;
		this.scrollBarOffsetX;
		this.doubleClickZoomFactor;
		this.zoomFactor;
		this.startZoomFactor;
		this.controllerOffsetY;
		this.hideControllerDelay;
		this.controllerBackgroundOpacity;
		this.controllerMaxWidth;
		this.countLoadedSkinImages = 0;
		this.countLoadedImages = 0;
		this.scrollBarHandlerToolTipOffsetY;
		this.zoomInAndOutToolTipOffsetY;
		this.buttonsToolTipOffsetY;
		this.hideControllerOffsetY;
		this.scrollBarPosition;
		this.startSpaceForScrollBarButtons;
		this.totalGraphics;
		this.navigatorWidth;
		this.navigatorHeight;
		this.navigatorOffsetX;
		this.navigatorOffsetY;
		this.infoWindowBackgroundOpacity;
		this.markerToolTipOffsetY;
		this.toolTipWindowMaxWidth;
		this.lightBoxBackgroundOpacity;
		
		this.parseDelayId_to;
		this.loadImageId_to;
		
		this.addKeyboardSupport_bl;
		this.showContextMenu_bl;
		this.showNavigator_bl;
		this.inversePanDirection_bl;
		this.useEntireScreenFor3dObject_bl;
		this.hideController_bl;
		this.showScriptDeveloper_bl;
		this.showMarkers_bl;
		this.hasNavigatorError_bl = false;
		this.showMarkersInfo_bl = false;
		this.addDoubleClickSupport_bl = false;
		this.isMobile_bl = FWDUtils.isMobile;
		this.hasPointerEvent_bl = FWDUtils.hasPointerEvent;
	
		//###################################//
		/*init*/
		//###################################//
		self.init = function(){
			self.parseDelayId_to = setTimeout(self.parseProperties, 100);
		};
		
		//#############################################//
		// parse properties.
		//#############################################//
		self.parseProperties = function(){
	
			var markersElement_el;
			
			var childKids_ar;
			var playListChildren_ar;
			var markersChildren_ar;
			var errorMessage_str;
			var mediaKid;
			var test;
			var obj;
			var obj2;
			var child;
			var hasError_bl;
			var attributeMissing;
			var positionError;
			var hasElementWithAttribute;
			var hasMarker_bl;
			var hasContent_bl = false;
			
			//set the root element of the zoomer list.
			self.rootElement_el = playListElement;
			if(!self.rootElement_el){
				errorMessage_str = "Make sure that the a div with the id - <font color='#FFFFFF'>" + self.props_obj.playListAndSkinId + "</font> exists, self represents the data playlist.";
				self.dispatchEvent(FWDData.LOAD_ERROR, {text:errorMessage_str});
				return;
			}
			
			self.originalImagePath_str = self.props_obj.imagePath;
			if(!self.originalImagePath_str){
				errorMessage_str = "The <font color='#FFFFFF'>imagePath</font> property which represents the path for the iamge to zoom is not defined in the constructor function!";
				self.dispatchEvent(FWDData.LOAD_ERROR, {text:errorMessage_str});
				return;
			}
		
			self.rootElement_el.style.display = "none";
			markersElement_el = FWDUtils.getChildFromNodeListFromAttribute(self.rootElement_el, "data-markers");
	
			self.showNavigator_bl = self.props_obj.showNavigator;
			self.showNavigator_bl = self.showNavigator_bl == "yes" ? true : false;
			if(self.props_obj.showNavigatorOnMobile && self.props_obj.showNavigatorOnMobile == "no" && self.isMobile_bl && self.showNavigator_bl) self.showNavigator_bl = false;
		
			self.showMarkersInfo_bl =  self.props_obj.showMarkersInfo == "yes" ? true : false;
			if(self.isMobile_bl) self.showMarkersInfo_bl = false;
			
			self.addDoubleClickSupport_bl = self.props_obj.addDoubleClickSupport;
			self.addDoubleClickSupport_bl = self.addDoubleClickSupport_bl == "yes" ? true : false;
			if(FWDUtils.isIEAndLessThen9) self.addDoubleClickSupport_bl = false;
			
			//set main properties.
			self.backgroundColor_str = self.props_obj.backgroundColor || "transparent";
			self.preloaderFontColor_str = self.props_obj.preloaderFontColor || "#000000";
			self.preloaderBackgroundColor_str =	self.props_obj.preloaderBackgroundColor || "transparent";
			self.preloaderText_str = self.props_obj.preloaderText || "Loading:"; 
			
			
			self.controllerPosition_str = self.props_obj.controllerPosition || "bottom";
			if(self.controllerPosition_str != "top" && self.controllerPosition_str != "bottom") self.controllerPosition_str = "top";
		
			if(!self.props_obj.buttons){
				errorMessage_str = "The <font color='#FFFFFF'>buttons</font> is not defined in the contructor, this is necessary to setup the main buttons.";
				self.dispatchEvent(FWDData.LOAD_ERROR, {text:errorMessage_str});
				return;
			} 
			
			self.buttons_ar = FWDUtils.splitAndTrim(self.props_obj.buttons, true, true);
	
			
			if(self.isMobile_bl && !self.hasPointerEvent_bl){
				self.buttonsLabels_ar = null;
				self.contextMenuLabels_ar = null;
			}else{
				if(self.props_obj.buttonsToolTips) self.buttonsLabels_ar =  FWDUtils.splitAndTrim(self.props_obj.buttonsToolTips, false);
				if(self.props_obj.contextMenuLabels) self.contextMenuLabels_ar =  FWDUtils.splitAndTrim(self.props_obj.contextMenuLabels, false);
			}
			
			self.showScriptDeveloper_bl = self.props_obj.showScriptDeveloper;
			self.showScriptDeveloper_bl = self.showScriptDeveloper_bl == "no" ? false : true;
			
			self.dragRotationSpeed = self.props_obj.dragRotationSpeed || .5;
			if(isNaN(self.dragRotationSpeed)) self.dragRotationSpeed = .5;
			if(self.dragRotationSpeed < 0){
				self.dragRotationSpeed = 0;
			}else if(self.dragRotationSpeed > 1){
				self.dragRotationSpeed = 1;
			}
			
			self.panSpeed = self.props_obj.panSpeed || 1;
			if(isNaN(self.panSpeed)) self.panSpeed = 1;
			if(self.panSpeed < 1){
				self.panSpeed = 1;
			}else if(self.panSpeed > 100){
				self.panSpeed = 100;
			}
			
			self.zoomSpeed = self.props_obj.zoomSpeed || .1;
			if(isNaN(self.zoomSpeed)) self.zoomSpeed = .1;
			if(self.zoomSpeed < .1){
				self.zoomSpeed = .1;
			}else if(self.zoomSpeed > 1){
				self.zoomSpeed = 1;
			}
			
			self.imageWidth = self.props_obj.imageWidth;
			if(!self.imageWidth){
				self.showPropertyError("imageWidth");
				return
			}else{
				self.imageWidth = parseInt(self.imageWidth);
			}
			
			self.imageHeight = self.props_obj.imageHeight;
			if(!self.imageHeight){
				self.showPropertyError("imageHeight");
				return
			}else{
				self.imageHeight = parseInt(self.imageHeight);
			}
			
			self.zoomFactor = self.props_obj.zoomFactor;
			if(self.zoomFactor  ==  undefined){
				self.showPropertyError("zoomFactor");
				return;
			}
			if(self.zoomFactor < 1){
				 self.zoomFactor = 1;
			}else if(self.zoomFactor > 5){
				 self.zoomFactor = 5;
			}
			
			self.doubleClickZoomFactor = self.props_obj.doubleClickZoomFactor;
			if(isNaN(self.doubleClickZoomFactor)) self.doubleClickZoomFactor = self.zoomFactor;
			if(self.doubleClickZoomFactor > self.zoomFactor) self.doubleClickZoomFactor = self.zoomFactor;
			
			self.startZoomFactor = self.props_obj.startZoomFactor;
			if(self.startZoomFactor == undefined){
				self.startZoomFactor = "default";
				return;
			}
			
			if(!isNaN(self.startZoomFactor)){
				if(self.startZoomFactor < .1){
					self.startZoomFactor = .1;
				}else if(self.startZoomFactor > self.zoomFactor){
					self.startZoomFactor = self.zoomFactor;
				}
			} 
			
			
			self.navigatorOffsetX =  self.props_obj.navigatorOffsetX || 0;
			if(isNaN(self.navigatorOffsetX)) self.navigatorOffsetX = 0;
			self.navigatorOffsetY =  self.props_obj.navigatorOffsetY || 0;
			if(isNaN(self.navigatorOffsetY)) self.navigatorOffsetY = 0;
			
			self.controllerBackgroundOpacity = self.props_obj.controllerBackgroundOpacity;
			if(!self.controllerBackgroundOpacity)  self.controllerBackgroundOpacity = 1;
			if(isNaN(self.controllerBackgroundOpacity)) self.controllerBackgroundOpacity = 1;
			if(self.controllerBackgroundOpacity < 0){
				self.controllerBackgroundOpacity = 0;
			}else if(self.controllerBackgroundOpacity > 1){
				self.controllerBackgroundOpacity = 1;
			}
			
			self.controllerMaxWidth = self.props_obj.controllerMaxWidth;
			if(!self.controllerMaxWidth)  self.controllerMaxWidth = 900;
			if(isNaN(self.controllerMaxWidth)) self.controllerMaxWidth = 900;
			if(self.controllerMaxWidth < 200) self.controllerMaxWidth = 200;
		
			self.hideControllerDelay = self.props_obj.hideControllerDelay;
			if(self.hideControllerDelay){
				self.hideController_bl = true;
				if(isNaN(self.hideControllerDelay)){
					self.hideControllerDelay = 4000;
				}else if(self.hideControllerDelay < 0){
					self.hideControllerDelay = 4000;
				}else{
					self.hideControllerDelay *= 1000;
				}
			}
		
			self.spaceBetweenButtons = self.props_obj.spaceBetweenButtons || 0;
			self.scrollBarPosition = self.props_obj.scrollBarPosition || 0;
			self.startSpaceForScrollBarButtons = self.props_obj.startSpaceForScrollBarButtons || 0;
			self.startSpaceBetweenButtons = self.props_obj.startSpaceBetweenButtons || 0;
			self.startSpaceForScrollBar = self.props_obj.startSpaceForScrollBar || 0;
			self.scrollBarOffsetX = self.props_obj.scrollBarOffsetX || 0;
			self.controllerOffsetY = self.props_obj.controllerOffsetY || 0; 
			self.scrollBarHandlerToolTipOffsetY = self.props_obj.scrollBarHandlerToolTipOffsetY || 0;
			self.zoomInAndOutToolTipOffsetY = self.props_obj.zoomInAndOutToolTipOffsetY || 0;
			self.buttonsToolTipOffsetY = self.props_obj.buttonsToolTipOffsetY || 0;
			self.hideControllerOffsetY = self.props_obj.hideControllerOffsetY || 0;
			self.infoWindowBackgroundOpacity = self.props_obj.infoWindowBackgroundOpacity || 1;
			self.markerToolTipOffsetY = self.props_obj.markerToolTipOffsetY || 1;
			self.toolTipWindowMaxWidth = self.props_obj.toolTipWindowMaxWidth || 300;
			self.buttonToolTipFontColor_str = self.props_obj.buttonToolTipFontColor || "#000000";
			self.contextMenuBackgroundColor_str = self.props_obj.contextMenuBackgroundColor || "#000000";
			self.contextMenuBorderColor_str = self.props_obj.contextMenuBorderColor || "#FF0000";
			self.contextMenuSpacerColor_str = self.props_obj.contextMenuSpacerColor || "#FF0000";
			self.contextMenuItemNormalColor_str = self.props_obj.contextMenuItemNormalColor || "#FF0000";
			self.contextMenuItemSelectedColor_str = self.props_obj.contextMenuItemSelectedColor || "#FF0000";
			self.contextMenuItemDisabledColor_str = self.props_obj.contextMenuItemDisabledColor || "#FF0000";
			
			self.infoWindowBackgroundColor_str = self.props_obj.infoWindowBackgroundColor || "#FF0000";
			self.infoWindowScrollBarColor_str = self.props_obj.infoWindowScrollBarColor || "#FF0000";
			
			self.navigatorImagePath_str = self.props_obj.navigatorImagePath;
			if(self.showNavigator_bl && !self.navigatorImagePath_str) {
				errorMessage_str = "The  <font color='#FFFFFF'>navigatorImagePath</font> is not defined in the contructor, this is necessary to setup the navigator.";
				self.dispatchEvent(FWDData.LOAD_ERROR, {text:errorMessage_str});
				return;
			}
			
			self.navigatorPosition_str = self.props_obj.navigatorPosition || "topleft";
			self.navigatorPosition_str = String(self.navigatorPosition_str).toLowerCase();
			test = self.navigatorPosition_str == "topleft" 
					   || self.navigatorPosition_str == "topright"
					   || self.navigatorPosition_str == "bottomleft"
					   || self.navigatorPosition_str == "bottomright";
						   
			if(!test) self.navigatorPosition_str = "topleft";
			
			self.navigatorHandlerColor_str = self.props_obj.navigatorHandlerColor || "#FF0000";
			self.navigatorBorderColor_str = self.props_obj.navigatorBorderColor || "#FF0000";
		
			self.showContextMenu_bl = self.props_obj.showContextMenu; 
			self.showContextMenu_bl = self.showContextMenu_bl == "no" ? false : true;
			
			self.inversePanDirection_bl = self.props_obj.inversePanDirection;
			self.inversePanDirection_bl = self.inversePanDirection_bl == "yes" ? true : false;
			
			self.addKeyboardSupport_bl = self.props_obj.addKeyboardSupport == "no" ? false : true;
			if(self.isMobile_bl) self.addKeyboardSupport_bl = false;
			
			self.useEntireScreenFor3dObject_bl = self.props_obj.useEntireScreen; 
			self.useEntireScreenFor3dObject_bl = self.useEntireScreenFor3dObject_bl == "yes" ? true : false;
			
			self.infoText_str = FWDUtils.getChildFromNodeListFromAttribute(self.rootElement_el, "data-info");
			if(self.infoText_str){
				self.infoText_str = self.infoText_str.innerHTML;
			}else{
				self.infoText_str = "not defined make sure that an ul element with the attribute data-info is defined!";
			}
			
			//markers.
			if(markersElement_el) self.showMarkers_bl = true; 
			
			if(self.showMarkers_bl){
				markersChildren_ar = FWDUtils.getChildren(markersElement_el);
				for(var i=0; i<markersChildren_ar.length; i++){
					obj = {};
					child = markersChildren_ar[i];
					hasError_bl = false;
					attributeMissing = "";
					
					//check for markers attributes.
					hasElementWithAttribute = FWDUtils.hasAttribute(child, "data-marker-type", i);
					if(!hasElementWithAttribute){
						self.showMarkerError("data-marker-type", i);
						return;
					}
					
					hasElementWithAttribute = FWDUtils.hasAttribute(child, "data-marker-normal-state-path", i);
					if(!hasElementWithAttribute){
						self.showMarkerError("data-marker-normal-state-path", i);
						return;
					}
					
					hasElementWithAttribute = FWDUtils.hasAttribute(child, "data-marker-selected-state-path", i);
					if(!hasElementWithAttribute){
						self.showMarkerError("data-marker-selected-state-path");
						return;
					}
					
					hasElementWithAttribute = FWDUtils.hasAttribute(child, "data-marker-left");
					if(!hasElementWithAttribute){
						self.showMarkerError("data-marker-left", i);
						return;
					}
					
					hasElementWithAttribute = FWDUtils.hasAttribute(child, "data-marker-top");
					if(!hasElementWithAttribute){
						self.showMarkerError("data-marker-top", i);
						return;
					}
					
					hasElementWithAttribute = FWDUtils.hasAttribute(child, "data-marker-width");
					if(!hasElementWithAttribute){
						self.showMarkerError("data-marker-width", i);
						return;
					}
					
					hasElementWithAttribute = FWDUtils.hasAttribute(child, "data-marker-height");
					if(!hasElementWithAttribute){
						self.showMarkerError("data-marker-height", i);
						return;
					}
					
					hasElementWithAttribute = FWDUtils.hasAttribute(child, "data-show-after-zoom-factor");
					if(!hasElementWithAttribute){
						self.showMarkerError("data-show-after-zoom-factor", i);
						return;
					}
					
					obj.type = FWDUtils.getAttributeValue(child, "data-marker-type");
					test = obj.type == "link" || obj.type == "tooltip" || obj.type == "infowindow";
					if(!test){
						self.showMarkerTypeError(obj.type, i);
						return;
					}
					
					
					if(FWDUtils.hasAttribute(child, "data-show-content")){
						if(FWDUtils.trim(FWDUtils.getAttributeValue(child, "data-show-content")) == "no") {
							hasContent_bl = false;
						}else{
							hasContent_bl = true;
						}
					}else{
						hasContent_bl = true;
					}
				
					
					obj.normalStatePath_str = FWDUtils.trim(FWDUtils.getAttributeValue(child, "data-marker-normal-state-path"));
					obj.selectedStatePath_str = FWDUtils.trim(FWDUtils.getAttributeValue(child, "data-marker-selected-state-path"));
					obj.toolTipLabel = FWDUtils.getAttributeValue(child, "data-tool-tip-label") || undefined;
					obj.markerX = parseInt(FWDUtils.getAttributeValue(child, "data-marker-left"));
					if(isNaN(obj.markerX)) obj.markerX = 0;
					obj.markerY = parseInt(FWDUtils.getAttributeValue(child, "data-marker-top"));
					if(isNaN(obj.markerY)) obj.markerY = 0;
					obj.markerWidth = parseInt(FWDUtils.getAttributeValue(child, "data-marker-width"));
					if(isNaN(obj.markerWidth)) obj.markerWidth = 5;
					obj.markerHeight = parseInt(FWDUtils.getAttributeValue(child, "data-marker-height"));
					if(isNaN(obj.markerHeight)) obj.markerHeight = 5;
					obj.showAfterScale = parseFloat(FWDUtils.getAttributeValue(child, "data-show-after-zoom-factor"));
					if(isNaN(obj.showAfterScale)) obj.showAfterScale = 0;
				
					if(obj.type == "link"){
						obj.link = FWDUtils.getAttributeValue(child, "data-marker-url") || "http://www.link-is-not-defined.com";
						obj.target = FWDUtils.getAttributeValue(child, "data-marker-target") || "_blank";
					}else{
						obj.innerHTML = child.innerHTML;
					}
					
					test = FWDUtils.getAttributeValue(child, "data-reg-point");
					test = test === "center" || test === "centertop" || test === "centerbottom";
					if(!test){
						test = "center";
					}else{
						test = FWDUtils.trim(FWDUtils.getAttributeValue(child, "data-reg-point")).toLowerCase();
					}
					
					obj.regPoint = test;
					obj.maxWidth = parseInt(FWDUtils.getAttributeValue(child, "data-marker-window-width"));
					if(isNaN(obj.maxWidth)) obj.maxWidth = 200;
					obj.hasContent_bl = hasContent_bl;
					
				
					
					var obj2 = {};
					if(obj.type == "tooltip"){
						obj2.innerHTML = child.innerHTML;
						obj2.maxWidth = obj.maxWidth;
						obj2.hasContent_bl = hasContent_bl;
						self.toolTipWindows_ar.push(obj2);
					};
					
					self.markersList_ar.push(obj);
				}
			}
			
			self.skinPath_str = self.props_obj.skinPath;
			
			if(!self.skinPath_str){
				errorMessage_str = "The <font color='#FFFFFF'>skinPath</font> property is not defined in the constructor function!";
				self.dispatchEvent(FWDData.LOAD_ERROR, {text:errorMessage_str});
				return;
			}
			
			if((self.skinPath_str.lastIndexOf("/") + 1) != self.skinPath_str.length){
				self.skinPath_str += "/";
			}
		
			//setup skin paths
			self.handMovePath_str = self.skinPath_str + "move.cur";
			self.handGrabPath_str = self.skinPath_str + "handgrab.cur";
			var preloaderPath_str = self.skinPath_str + "preloader.png";
			var mainLightBoxCloseButtonNPath_str = self.skinPath_str + "lightbox-close-icon.png";
			var mainLightBoxCloseButtonSPath_str = self.skinPath_str + "lightbox-close-icon-rollover.png";
			var controllerBackgroundLeftPath_str = self.skinPath_str + "bg-bar-left.png";
			var controllerBackgroundRight_str = self.skinPath_str + "bg-bar-right.png";
			var controllerDownButtonN_str = self.skinPath_str + "down-icon.png";
			var controllerDownButtonS_str = self.skinPath_str + "down-icon-rollover.png";
			var controllerDownButtonD_str = self.skinPath_str + "down-icon-disabled.png";
			var controllerUpButtonN_str = self.skinPath_str + "up-icon.png";
			var controllerUpButtonS_str = self.skinPath_str + "up-icon-rollover.png";
			var controllerUpButtonD_str = self.skinPath_str + "up-icon-disabled.png";
			var controllerNextN_str = self.skinPath_str + "right-icon.png";
			var controllerNextS_str = self.skinPath_str + "right-icon-rollover.png";
			var controllerNextD_str = self.skinPath_str + "right-icon-disabled.png";
			var controllerPrevN_str = self.skinPath_str + "left-icon.png";
			var controllerPrevS_str = self.skinPath_str + "left-icon-rollover.png";
			var controllerPrevD_str  = self.skinPath_str + "left-icon-disabled.png";
			var hideMarkersN_str = self.skinPath_str + "hide-markers-icon.png";
			var hideMarkersS_str = self.skinPath_str + "hide-markers-icon-rollover.png";
			var showMarkersN_str = self.skinPath_str + "show-markers-icon.png";
			var showMarkersS_str = self.skinPath_str + "show-markers-icon-rollover.png";
			var controllerInfoN_str = self.skinPath_str + "info-icon.png";
			var controllerInfoS_str = self.skinPath_str + "info-icon-rollover.png";
			var controllerHideN_str = self.skinPath_str + "hide-controller-icon.png";
			var controllerHideS_str = self.skinPath_str + "hide-controller-icon-rollover.png"; 
			var controllerShowN_str = self.skinPath_str + "show-controller-icon.png"; 
			var controllerShowS_str = self.skinPath_str + "show-controller-icon-rollover.png"; 
			var controllerFullScreemNormalN_str = self.skinPath_str + "fullscr-normal-icon.png";
			var controllerFullScreenNormalS_str = self.skinPath_str + "fullscr-normal-icon-rollover.png";
			var controllerFullScreemFullN_str = self.skinPath_str + "fullscr-full-icon.png";
			var controllerFullScreenFullS_str = self.skinPath_str + "fullscr-full-icon-rollover.png";	
			var zoomInN_str = self.skinPath_str + "zoomin.png";
			var zoomInS_str = self.skinPath_str + "zoomin-rollover.png";
			var zoomOutN_str = self.skinPath_str + "zoomout.png";
			var zoomOutS_str = self.skinPath_str + "zoomout-rollover.png";
			var scrollBarHandlerN_str = self.skinPath_str + "handler.png";
			var scrollBarHandlerS_str = self.skinPath_str + "handler-rollover.png";
			var scrollBarLeft_str = self.skinPath_str + "scrool-left.png";
			var scrollBarRight_str = self.skinPath_str + "scrool-right.png";
			self.scrollBarMiddlePath_str = self.skinPath_str + "scrool-middle.png";
			self.controllerBackgroundMiddlePath_str = self.skinPath_str + "bg-bar-middle.png";
			self.buttonToolTipLeft_str = self.skinPath_str + "button-tool-tip-left.png";
			self.buttonToolTipMiddle_str = self.skinPath_str + "button-tool-tip-middle.png";	
			self.buttonToolTipRight_str = self.skinPath_str + "button-tool-tip-right.png";
			self.buttonToolTipBottomPointer_str = self.skinPath_str + "button-tool-tip-down-pointer.png";
			self.buttonToolTipTopPointer_str = self.skinPath_str + "button-tool-tip-top-pointer.png";
			var infoWindowCloseNormal_str = self.skinPath_str + "close-icon.png";
			var infoWindowCloseSelected_str = self.skinPath_str + "close-icon-rollover.png";
		
			//set skin graphics paths.
			self.skinPaths_ar.push(preloaderPath_str);
			self.skinPaths_ar.push(mainLightBoxCloseButtonNPath_str);
			self.skinPaths_ar.push(mainLightBoxCloseButtonSPath_str);
			self.skinPaths_ar.push(controllerBackgroundLeftPath_str);
			self.skinPaths_ar.push(controllerBackgroundRight_str);
			self.skinPaths_ar.push(controllerDownButtonN_str);
			self.skinPaths_ar.push(controllerDownButtonS_str);
			self.skinPaths_ar.push(controllerDownButtonD_str);
			self.skinPaths_ar.push(controllerUpButtonN_str);
			self.skinPaths_ar.push(controllerUpButtonS_str);
			self.skinPaths_ar.push(controllerUpButtonD_str);
			self.skinPaths_ar.push(controllerNextN_str);
			self.skinPaths_ar.push(controllerNextS_str);
			self.skinPaths_ar.push(controllerNextD_str);
			self.skinPaths_ar.push(controllerPrevN_str);
			self.skinPaths_ar.push(controllerPrevS_str);
			self.skinPaths_ar.push(controllerPrevD_str);
			self.skinPaths_ar.push(hideMarkersN_str);
			self.skinPaths_ar.push(hideMarkersS_str);
			self.skinPaths_ar.push(showMarkersN_str);
			self.skinPaths_ar.push(showMarkersS_str);
			self.skinPaths_ar.push(controllerInfoN_str);
			self.skinPaths_ar.push(controllerInfoS_str);
			self.skinPaths_ar.push(controllerHideN_str);
			self.skinPaths_ar.push(controllerHideS_str);
			self.skinPaths_ar.push(controllerShowN_str);
			self.skinPaths_ar.push(controllerShowS_str);
			self.skinPaths_ar.push(controllerFullScreemNormalN_str);
			self.skinPaths_ar.push(controllerFullScreenNormalS_str);
			self.skinPaths_ar.push(controllerFullScreemFullN_str);
			self.skinPaths_ar.push(controllerFullScreenFullS_str);	
			self.skinPaths_ar.push(zoomInN_str);
			self.skinPaths_ar.push(zoomInS_str);
			self.skinPaths_ar.push(zoomOutN_str);
			self.skinPaths_ar.push(zoomOutS_str);
			self.skinPaths_ar.push(scrollBarHandlerN_str);
			self.skinPaths_ar.push(scrollBarHandlerS_str);
			self.skinPaths_ar.push(scrollBarLeft_str);
			self.skinPaths_ar.push(scrollBarRight_str);
			self.skinPaths_ar.push(self.buttonToolTipTopPointer_str);
			self.skinPaths_ar.push(self.buttonToolTipLeft_str);
			self.skinPaths_ar.push(infoWindowCloseNormal_str);
			self.skinPaths_ar.push(infoWindowCloseSelected_str);
			
			
			self.skinPaths_ar.push(self.buttonToolTipMiddle_str);
			self.skinPaths_ar.push(self.buttonToolTipRight_str);
			self.skinPaths_ar.push(self.controllerBackgroundMiddlePath_str);
			
			self.totalGraphics = self.skinPaths_ar.length;
			
			self.loadSkin();
		};
		
		//####################################//
		/* load buttons graphics */
		//###################################//
		self.loadSkin = function(){
		
			if(self.image_img){
				self.image_img.onload = null;
				self.image_img.onerror = null;
			}
			
			var imagePath = self.skinPaths_ar[self.countLoadedSkinImages];
			
			self.image_img = new Image();
			self.image_img.onload = self.onSkinLoadHandler;
			self.image_img.onerror = self.onKinLoadErrorHandler;
			self.image_img.src = imagePath;
		};
		
		self.onSkinLoadHandler = function(e){
		
			if(self.countLoadedSkinImages == 0){
				self.mainPreloader_img = self.image_img;
				self.dispatchEvent(FWDData.PRELOADER_LOAD_DONE);
				self.dispatchEvent(FWDData.SKIN_PROGRESS);
			}else if(self.countLoadedSkinImages == 1){
				self.mainLightboxCloseButtonN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 2){
				self.mainLightboxCloseButtonS_img = self.image_img;
				self.dispatchEvent(FWDData.LIGHBOX_CLOSE_BUTTON_LOADED);
			}else if(self.countLoadedSkinImages == 3){
				self.controllerBackgroundLeft_img = self.image_img;
				self.controllerHeight = self.controllerBackgroundLeft_img.height;
			}else if(self.countLoadedSkinImages == 4){
				self.controllerBackgroundRight_img = self.image_img;
			}else if(self.countLoadedSkinImages == 5){
				self.controllerMoveDownN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 6){
				self.controllerMoveDownS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 7){
				self.controllerMoveDownD_img = self.image_img;
			}else if(self.countLoadedSkinImages == 8){
				self.controllerMoveUpN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 9){
				self.controllerMoveUpS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 10){
				self.controllerMoveUpD_img = self.image_img;
			}else if(self.countLoadedSkinImages == 11){
				self.controllerNextN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 12){
				self.controllerNextS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 13){
				self.controllerNextD_img = self.image_img;
			}else if(self.countLoadedSkinImages == 14){
				self.controllerPrevN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 15){
				self.controllerPrevS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 16){
				self.controllerPrevD_img = self.image_img;
			}else if(self.countLoadedSkinImages == 17){
				self.controllerHideMarkersN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 18){
				self.controllerHideMarkersS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 19){
				self.controllerShowMarkersN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 20){
				self.controllerShowMarkersS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 21){
				self.controllerInfoN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 22){
				self.controllerInfoS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 23){
				self.controllerHideN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 24){
				self.controllerHideS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 25){
				self.controllerShowN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 26){
				self.controllerShowS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 27){
				self.controllerFullScreenNormalN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 28){
				self.controllerFullScreenNormalS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 29){
				self.controllerFullScreenFullN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 30){
				self.controllerFullScreenFullS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 31){
				self.zoomInN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 32){
				self.zoomInS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 33){
				self.zoomOutN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 34){
				self.zoomOutS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 35){
				self.scrollBarHandlerN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 36){
				self.scrollBarHandlerS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 37){
				self.scrollBarLeft_img = self.image_img;
			}else if(self.countLoadedSkinImages == 38){
				self.scrollBarRight_img = self.image_img;
			}else if(self.countLoadedSkinImages == 39){
				self.toolTipPointer_img = self.image_img;
			}else if(self.countLoadedSkinImages == 40){
				self.toolTipLeft_img = self.image_img;
			}else if(self.countLoadedSkinImages == 41){
				self.infoWindowCloseNormal_img = self.image_img;
			}else if(self.countLoadedSkinImages == 42){
				self.infoWindowCloseSelected_img = self.image_img;
			}
			
			self.countLoadedSkinImages++;
			if(self.countLoadedSkinImages < self.totalGraphics){
				self.loadImageId_to = setTimeout(self.loadSkin, 16);
			}else{
				self.dispatchEvent(FWDData.SKIN_PROGRESS, {percent:self.countLoadedSkinImages/self.totalGraphics});
				self.dispatchEvent(FWDData.LOAD_DONE);
				if(self.showNavigator_bl){
					self.loadNavigatorImage();
				}else{
					self.loadMainImage();
				}
			}
		};
		
		self.onKinLoadErrorHandler = function(e){
			var message = "The skin graphics with the label <font color='#FFFFFF'>" + self.skinPaths_ar[self.countLoadedSkinImages] + "</font> can't be loaded, make sure that the image exists and the path is correct!";
			console.log(e);
			var err = {text:message};
			self.dispatchEvent(FWDData.LOAD_ERROR, err);
		};
		
		self.stopToLoad = function(){
			clearTimeout(self.loadImageId_to);
			if(self.image_img){
				self.image_img.onload = null;
				self.image_img.onerror = null;
			}
			
			if(self.navigatorImage_img){
				self.navigatorImage_img.onload = null;
				self.navigatorImage_img.onerror = null;
			}
		};
		
		//####################################//
		/* load navigator images */
		//###################################//
		self.loadNavigatorImage = function(){
			
			if(self.image_img){
				self.image_img.onload = null;
				self.image_img.onerror = null;
			}
			
			var imagePath = self.navigatorImagePath_str;
			self.image_img = new Image();
			self.image_img.onload = self.onNavigatorImageLoadHandler;
			self.image_img.onerror = self.onNavigatorImageLoadErrorHandler;
			self.image_img.src = imagePath;
		};
		
		self.onNavigatorImageLoadHandler = function(){
			self.navigatorWidth = self.image_img.width;
			self.navigatorHeight = self.image_img.height;
			self.navigatorImage_img = self.image_img;
			self.loadMainImage();
			self.dispatchEvent(FWDData.IMAGES_PROGRESS);
		};
		
		//####################################//
		/* load small images */
		//###################################//
		self.loadMainImage = function(){
			if(self.hasNavigatorError_bl) return;
			if(self.image_img){
				self.image_img.onload = null;
				self.image_img.onerror = null;
			}
			
			self.image_img = new Image();
			self.image_img.onload = self.onImageLoadHandler;
			self.image_img.onerror = self.onImageLoadErrorHandler;
			self.image_img.src = self.originalImagePath_str;
		};
		
		self.onImageLoadHandler = function(e){	
			self.originalImage_img = self.image_img;	
			self.dispatchEvent(FWDData.IMAGES_LOAD_COMPLETE);
		};
		
		self.onLastNavigatorImageLoadHandler = function(e){
			if(self == null) return;
			self.dispatchEvent(FWDData.IMAGES_LOAD_COMPLETE);
		};
		
		self.onNavigatorImageLoadErrorHandler = function(e){
			var message = "The navigator image with the label <font color='#FFFFFF'>" + self.navigatorImagePath_str + "</font> can't be loaded, make sure that the image exists and the path is correct!";
			self.hasNavigatorError_bl = true;
			var err = {text:message};
			self.dispatchEvent(FWDData.LOAD_ERROR, err);
			console.log(e);
		};
		
		
		self.onImageLoadErrorHandler = function(e){
			var message = "The image with the label <font color='#FFFFFF'>" + self.originalImagePath_str + "</font> can't be loaded, make sure that the image exists and the path is correct!";
			console.log(e);
			var err = {text:message};
			self.dispatchEvent(FWDData.LOAD_ERROR, err);
		};
		
		//####################################//
		/* check if element with and attribute exists or throw error */
		//####################################//
		self.checkForAttribute = function(e, attr, position){
			var test = FWDUtils.getChildFromNodeListFromAttribute(e, attr);
			test = test ? FWDUtils.trim(FWDUtils.getAttributeValue(test, attr)) : undefined;
			
			if(!test){
				if(position != undefined){
					self.dispatchEvent(FWDData.LOAD_ERROR, {text:"Element with attribute <font color='#FFFFFF'>" + attr + "</font> is not defined at positon <font color='#FFFFFF'>" + (position + 1) + "</font>"});
				}else{
					self.dispatchEvent(FWDData.LOAD_ERROR, {text:"Element with attribute <font color='#FFFFFF'>" + attr + "</font> is not defined."});
				}
				return;
			}
			return test;
		};
		
		//####################################//
		/* show error if a required property is not defined */
		//####################################//
		self.showPropertyError = function(error){
			self.dispatchEvent(FWDData.LOAD_ERROR, {text:"The property called <font color='#FFFFFF'>" + error + "</font> is not defined."});
		};
		
		self.showMarkerError = function(error, position){
			self.dispatchEvent(FWDData.LOAD_ERROR, {text:"The marker at position <font color='#FFFFFF'>" + (position + 1) + "</font> dose not have defined an attribute <font color='#FFFFFF'>" + error + "</font>."});
		};
		
		self.showMarkerTypeError = function(error, position){
			self.dispatchEvent(FWDData.LOAD_ERROR, {text:"Marker type is incorrect <font color='#FFFFFF'>" + error + "</font> at position <font color='#FFFFFF'>" + position + "</font>. Accepted types are <font color='#FFFFFF'>link, tooltip, infowindow</font>."});
		};
			
		//####################################//
		/*destroy */
		//####################################//
		self.destroy = function(){
			var img_img;
		
			clearTimeout(self.parseDelayId_to);
			clearTimeout(self.loadImageId_to);
			
			if(self.image_img){
				self.image_img.onload = null;
				self.image_img.onerror = null;
				self.image_img.src = null;
			}
			
			if(self.navigatorImage_img){
				self.navigatorImage_img.onload = null;
				self.navigatorImage_img.onerror = null;
				self.navigatorImage_img.src = null;
			}
			
			
			if(self.mainPreloader_img) self.mainPreloader_img.src = null;
			if(self.mainLightboxCloseButtonN_img) self.mainLightboxCloseButtonN_img.src = null;
			if(self.mainLightboxCloseButtonS_img) self.mainLightboxCloseButtonS_img.src = null;
			if(self.controllerBackgroundLeft_img) self.controllerBackgroundLeft_img.src = null; 
			if(self.controllerBackgroundRight_img) self.controllerBackgroundRight_img.src = null; 
			if(self.controllerMoveDownN_img) self.controllerMoveDownN_img.src = null; 
			if(self.controllerMoveDownS_img) self.controllerMoveDownS_img.src = null;
			if(self.controllerMoveDownD_img) self.controllerMoveDownD_img.src = null;
			if(self.controllerMoveUpN_img) self.controllerMoveUpN_img.src = null;
			if(self.controllerMoveUpS_img) self.controllerMoveUpS_img.src = null;
			if(self.controllerMoveUpD_img) self.controllerMoveUpD_img.src = null;
			if(self.controllerNextN_img) self.controllerNextN_img.src = null;
			if(self.controllerNextS_img) self.controllerNextS_img.src = null;
			if(self.controllerNextD_img) self.controllerNextD_img.src = null;
			if(self.controllerPrevN_img) self.controllerPrevN_img.src = null;
			if(self.controllerPrevS_img) self.controllerPrevS_img.src = null;
			if(self.controllerPrevD_img) self.controllerPrevD_img.src = null;
			if(self.controllerHideMarkersN_img) self.controllerHideMarkersN_img.src = null;
			if(self.controllerHideMarkersS_img) self.controllerHideMarkersS_img.src = null;
			if(self.controllerShowMarkersN_img) self.controllerShowMarkersN_img.src = null;
			if(self.controllerShowMarkersS_img) self.controllerShowMarkersS_img.src = null;
			if(self.controllerInfoN_img) self.controllerInfoN_img.src = null;			
			if(self.controllerHideN_img) self.controllerHideN_img.src = null;
			if(self.controllerHideS_img) self.controllerHideS_img.src = null;
			if(self.controllerShowN_img) self.controllerShowN_img.src = null;
			if(self.controllerShowS_img) self.controllerShowS_img.src = null;
			if(self.controllerFullScreenNormalN_img) self.controllerFullScreenNormalN_img.src = null;
			if(self.controllerFullScreenNormalS_img) self.controllerFullScreenNormalS_img.src = null;
			if(self.controllerFullScreenFullN_img) self.controllerFullScreenFullN_img.src = null;
			if(self.controllerFullScreenFullS_img) self.controllerFullScreenFullS_img.src = null;
			if(self.zoomInN_img) self.zoomInN_img.src = null;
			if(self.zoomInS_img) self.zoomInS_img.src = null;
			if(self.zoomOutN_img) self.zoomOutN_img.src = null;
			if(self.zoomOutS_img) self.zoomOutS_img.src = null;
			if(self.scrollBarHandlerN_img) self.scrollBarHandlerN_img.src = null;
			if(self.scrollBarHandlerN_img) self.scrollBarHandlerN_img.src = null;
			if(self.scrollBarHandlerS_img) self.scrollBarHandlerS_img.src = null;
			if(self.scrollBarLeft_img) self.scrollBarLeft_img.src = null;
			if(self.scrollBarLeft_img) self.scrollBarLeft_img.src = null;
			if(self.scrollBarRight_img) self.scrollBarRight_img.src = null;
			if(self.toolTipLeft_img) self.toolTipLeft_img.src = null;
			if(self.toolTipPointer_img) self.toolTipPointer_img.src = null;
			if(self.infoWindowCloseNormal_img) self.infoWindowCloseNormal_img.src = null;
			if(self.infoWindowCloseSelected_img) self.infoWindowCloseSelected_img.src = null;
	
			
			self.mainPreloader_img = null;
			self.mainLightboxCloseButtonN_img = null;
			self.mainLightboxCloseButtonS_img = null;
			self.controllerBackgroundLeft_img = null;
			self.controllerBackgroundRight_img = null;
			self.controllerMoveDownN_img = null;
			self.controllerMoveDownS_img = null;
			self.controllerMoveUpN_img = null;
			self.controllerMoveUpS_img = null;
			self.controllerNextN_img = null;
			self.controllerNextS_img = null;
			self.controllerPrevN_img = null;
			self.controllerPrevS_img = null;
			self.controllerHideMarkersN_img = null;
			self.controllerHideMarkersS_img = null;
			self.controllerShowMarkersN_img = null;
			self.controllerShowMarkersS_img = null;
			self.controllerInfoN_img = null;
			self.controllerInfoS_img = null;
			self.controllerHideN_img = null;
			self.controllerHideS_img = null;
			self.controllerShowN_img = null;
			self.controllerShowS_img = null;
			self.controllerFullScreenNormalN_img = null;
			self.controllerFullScreenNormalS_img = null;
			self.controllerFullScreenFullN_img = null;
			self.controllerFullScreenFullS_img = null;
			self.zoomInN_img = null;
			self.zoomInS_img = null;
			self.zoomOutN_img = null;
			self.zoomOutS_img = null;
			self.scrollBarHandlerN_img = null;
			self.scrollBarHandlerS_img = null;
			self.scrollBarLeft_img = null;
			self.scrollBarRight_img = null;
			self.toolTipLeft_img = null;
			self.toolTipPointer_img = null;
			self.infoWindowCloseNormal_img = null;
			self.infoWindowCloseSelected_img = null;
			
			this.props_obj = null;
			this.rootElement_el = null;
			this.skinPaths_ar = null;
			this.markersList_ar = null;
			this.toolTipWindows_ar = null;
			this.buttons_ar = null;
			this.buttonsLabels_ar = null;
			this.contextMenuLabels_ar = null;
			
			this.backgroundColor_str = null;
			this.handMovePath_str = null;
			this.handGrabPath_str = null;
			this.controllerBackgroundMiddlePath_str = null;
			this.scrollBarMiddlePath_str = null;
			this.controllerPosition_str = null;
			this.preloaderFontColor_str = null;
			this.preloaderBackgroundColor_str = null;
			this.preloaderText_str = null;
			this.buttonToolTipLeft_str = null;
			this.buttonToolTipMiddle_str = null;
			this.buttonToolTipRight_str = null;
			this.buttonToolTipBottomPointer_str = null;
			this.buttonToolTipTopPointer_str = null;
			this.buttonToolTipFontColor_str = null;
			this.contextMenuBackgroundColor_str = null;
			this.contextMenuBorderColor_str = null;
			this.contextMenuSpacerColor_str = null;
			this.contextMenuItemNormalColor_str = null;
			this.contextMenuItemSelectedColor_str = null;
			this.contextMenuItemSelectedColor_str = null;
			this.contextMenuItemDisabledColor_str = null;
			this.navigatorPosition_str = null;
			this.navigatorHandlerColor_str = null;
			this.navigatorBorderColor_str = null;
			this.infoText_str = null;
			this.infoWindowBackgroundColor_str = null;
			this.infoWindowScrollBarColor_str = null;
			
			prototype.destroy();
			self = null;
			prototype = null;
			FWDData.prototype = null;
		};
		
		self.init();
	};
	
	/* set prototype */
	FWDData.setPrototype = function(){
		FWDData.prototype = new FWDEventDispatcher();
	};
	
	FWDData.prototype = null;
	FWDData.PRELOADER_LOAD_DONE = "onPreloaderLoadDone";
	FWDData.LOAD_DONE = "onLoadDone";
	FWDData.LOAD_ERROR = "onLoadError";
	FWDData.LIGHBOX_CLOSE_BUTTON_LOADED = "onLightBoxCloseButtonLoadDone";
	FWDData.IMAGE_LOADED = "onImageLoaded";
	FWDData.FIRST_IMAGE_LOAD_COMPLETE = "onFirstImageLoadComplete";
	FWDData.IMAGES_LOAD_COMPLETE = "onImagesLoadComplete";
	FWDData.SKIN_PROGRESS = "onSkinProgress";
	FWDData.IMAGES_PROGRESS = "onImagesPogress";
	FWDData.hasTouch_bl = false;
	
	window.FWDData = FWDData;
}(window));