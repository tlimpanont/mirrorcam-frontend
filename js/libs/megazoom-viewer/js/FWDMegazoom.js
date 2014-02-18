/* Gallery */
(function (window){
	
	var FWDMegazoom = function(props){
		
		var self = this;
	
		/* init gallery */
		self.init = function(){
		
			TweenLite.ticker.useRAF(false);
			self.props_obj = props;
			
			self.isFullScreen_bl = false;
			self.mustHaveHolderDiv_bl = false;
		
			self.displayType = props.displayType.toLowerCase();
			
			if(!self.displayType) self.displayType = FWDMegazoom.FULL_SCREEN;

			if(self.displayType == FWDMegazoom.RESPONSIVE) self.mustHaveHolderDiv_bl = true;
			
			self.body = document.getElementsByTagName("body")[0];
	
			if(!self.props_obj){
				alert("FWDMegazoom constructor properties object is not defined!");
				return;
			}
			
			if(!self.props_obj){
				alert("FWDMegazoom constructor properties object is not defined!");
				return;
			}
			
			if(!self.props_obj.parentId){		
				if(self.mustHaveHolderDiv_bl){
					alert("Property parentId is not defined in the FWDMegazoom constructor, self property represents the div id into which the megazoom is added as a child!");
					return;
				}
			}
			
			if(self.mustHaveHolderDiv_bl && !FWDUtils.getChildById(self.props_obj.parentId)){
				alert("FWDMegazoom holder div is not found, please make sure that the div exsists and the id is correct! " + self.props_obj.parentId);
				return;
			}
			
			//check for the playlist id  property.
			if(!self.props_obj.playListAndSkinId){
				alert("The playListAndSkinId property which represents the megazoom playlist id is not defined in the constructor function!");
				return;
			};
			
			this.rootElement_el = FWDUtils.getChildById(self.props_obj.playListAndSkinId);
		
			if(self.displayType == FWDMegazoom.FULL_SCREEN || self.displayType == FWDMegazoom.LIGHTBOX){
				if(FWDUtils.isIEAndLessThen9){
					self.stageContainer = self.body;
				}else{
					self.stageContainer = document.documentElement;
				}
			}else{
				self.stageContainer =  FWDUtils.getChildById(self.props_obj.parentId);
			}
			
			this.customContextMenu = null;
			this.info_do = null;
			this.main_do = null;
			this.preloader_do = null;
			this.navigator_do = null;
			this.controller_do = null;
			this.imageManager_do = null;
			this.descriptionWindow_do = null;
			this.hider = null;
			this.lightBox_do = null;
			this.disable_sdo = null;
			
			this.backgroundColor_str = self.props_obj.backgroundColor || "transparent";
			this.lightBoxBackgroundColor_str = self.props_obj.lightBoxBackgroundColor || "transparent";
			
			this.viewportWidth = 0;
			this.viewportHeight = 0;
			this.stageWidth = 0;
			this.stageHeight = 0;
			this.pageXOffset = window.pageXOffset;
			this.pageYOffset = window.pageYOffset;
			this.lastScrollY;
			this.lastScrollX;
			this.lightBoxBackgroundOpacity = self.props_obj.lightBoxBackgroundOpacity || 1;
			this.lightBoxWidth = self.props_obj.lightBoxWidth || 500;
			this.lightBoxHeight =  self.props_obj.lightBoxHeight || 400;
			this.finalLightBoxWidth;
			this.finalLightBoxHeight;
			
			this.resizeHandlerId_to;
			this.resizeHandler2Id_to;
			this.lighboxAnimDoneId_to;
			this.startHiderWithDelayId_to;
			this.initPluginId_to;
			this.activateWithDelayImagemanagerId_to;
			this.hidePreloaderId_to;
			this.centerImageNormalScreenId_to;
			this.orientationChangeId_to;
			
			this.orintationChangeComplete_bl = true;
			this.isMobile_bl = FWDUtils.isMobile;
			this.hibernate_bl = false;
			
			if(self.displayType == FWDMegazoom.LIGHTBOX){
				this.initPluginId_to = setTimeout(function(){self.setupLightBox();}, 50);
			}else{
				this.initPluginId_to = setTimeout(function(){self.setupMegazoom();}, 50);
			}
			
			try{
				self.rootElement_el.parentNode.removeChild(self.rootElement_el);
			}catch(e){}
			
		};
		
		//#############################################//
		/* setup megazoom main instances */
		//#############################################//
		self.setupMegazoom = function(){
			self.setupMainDo();
			self.startResizeHandler();
			self.setupInfo();
			self.setupData();
			if(FWDUtils.hasPointerEvent && FWDUtils.isMobile) window.addEventListener("contextmenu", self.preventContextMenu);
		};
	
		//#############################################//
		/* setup main do */
		//#############################################//
		self.setupMainDo = function(){
			
			self.main_do = new FWDDisplayObject("div", "relative");
			self.main_do.getStyle().msTouchAction = "none";
			
			self.main_do.setBackfaceVisibility();
			self.main_do.setBkColor(self.backgroundColor_str);
			if(!FWDUtils.isMobile || (FWDUtils.isMobile && FWDUtils.hasPointerEvent)) self.main_do.setSelectable(false);
			
			//start full screen
			if(self.displayType == FWDMegazoom.FULL_SCREEN){	
				self.stageContainer.style.overflow = "hidden";
				self.main_do.getStyle().position = "absolute";
				document.documentElement.style.overflow = "hidden";
				self.stageContainer.appendChild(self.main_do.screen);
			}else if(self.displayType == FWDMegazoom.LIGHTBOX){
				self.main_do.getStyle().zIndex = 99999991;
				self.main_do.getStyle().position = "absolute";
				self.stageContainer.appendChild(self.main_do.screen);
			}else{
				self.stageContainer.appendChild(self.main_do.screen);
			}	
		};
		
		//#############################################//
		/* prevent context menu on windows8 mobile */
		//############################################//
		self.preventContextMenu = function(e){
			e.preventDefault();
		};
		
		//#############################################//
		/* setup info_do */
		//#############################################//
		self.setupInfo = function(){
			FWDInfo.setPrototype();
			self.info_do = new FWDInfo();
		};	
		
		//#############################################//
		/* resize handler */
		//#############################################//
		self.startResizeHandler = function(){
			if(window.addEventListener){
				window.addEventListener("resize", self.onResizeHandler);
				window.addEventListener("scroll", self.onResizeHandler);
				window.addEventListener("orientationchange", self.orientationChange);
			}else if(window.attachEvent){
				window.attachEvent("onresize", self.onResizeHandler);
				window.attachEvent("onscroll", self.onResizeHandler);
			}
			self.onResizeHandler(true);
			self.resizeHandlerId_to = setTimeout(function(){self.resizeHandler(true);}, 500);
		};
		
		self.stopResizeHandler = function(){
			if(window.removeEventListener){
				window.removeEventListener("resize", self.onResizeHandler);
				window.removeEventListener("scroll", self.onResizeHandler);
				window.removeEventListener("orientationchange", self.orientationChange);
			}else if(window.detachEvent){
				window.detachEvent("onresize", self.onResizeHandler);
				window.detachEvent("onscroll", self.onResizeHandler);
			}	
			clearTimeout(self.resizeHandlerId_to);
		};
		
		self.onResizeHandler = function(e){
			self.resizeHandler();
			clearTimeout(self.resizeHandler2Id_to);
			self.resizeHandler2Id_to = setTimeout(function(){self.resizeHandler();}, 300);
		};
		
		self.onScrollHandler = function(e){
			if(self.hibernate_bl) return;
			if(self.isFullScreen_bl 
			   || self.displayType == FWDMegazoom.FULL_SCREEN 
			   || self.displayType == FWDMegazoom.LIGHTBOX){
				self.resizeHandler();
			}
		};
		
		this.orientationChange = function(){
		
			if(self.displayType == FWDMegazoom.FULL_SCREEN || self.isFullScreen_bl){
				self.orintationChangeComplete_bl = false;	
				clearTimeout(self.resizeHandlerId_to);
				clearTimeout(self.resizeHandler2Id_to);
				clearTimeout(self.orientationChangeId_to);
			
				self.orientationChangeId_to = setTimeout(function(){
					self.orintationChangeComplete_bl = true; 
					self.resizeHandler(true);
					}, 1000);
				
				self.main_do.setX(0);
				self.main_do.setWidth(0);
			}
		};
		
		self.resizeHandler = function(overwrite){
			if(!self.orintationChangeComplete_bl) return;
			
			var scrollOffsets = FWDUtils.getScrollOffsets();
			var viewportSize = FWDUtils.getViewportSize();
			
			
			if(self.viewportWidth == viewportSize.w && self.viewportHeight == viewportSize.h 
				&& self.pageXOffset == scrollOffsets.x && self.pageYOffset == scrollOffsets.y
				&& !overwrite) return;
			
			
			self.viewportWidth = viewportSize.w;
			self.viewportHeight = viewportSize.h;
			self.pageXOffset = scrollOffsets.x;
			self.pageYOffset = scrollOffsets.y;
		
			if(self.displayType == FWDMegazoom.LIGHTBOX && !self.isFullScreen_bl){
				if(self.lightBoxWidth > viewportSize.w){
					self.finalLightBoxWidth = viewportSize.w;
					self.finalLightBoxHeight = parseInt(self.lightBoxHeight * (viewportSize.w/self.lightBoxWidth));
				}else{
					self.finalLightBoxWidth = self.lightBoxWidth;
					self.finalLightBoxHeight = self.lightBoxHeight;
				}
				self.lightBox_do.setWidth(viewportSize.w);
				self.lightBox_do.setHeight(viewportSize.h);
				self.lightBox_do.setX(scrollOffsets.x);
				self.lightBox_do.setY(scrollOffsets.y);
				self.lightBox_do.mainLightBox_do.setX(parseInt((viewportSize.w - self.finalLightBoxWidth)/2));
				self.lightBox_do.mainLightBox_do.setY(parseInt((viewportSize.h - self.finalLightBoxHeight)/2));
				if(self.lightBox_do.closeButton_do && !self.lightBox_do.closeButtonIsTweening_bl){ 
					var closeButtonFinalX = parseInt((viewportSize.w + self.finalLightBoxWidth)/2 - self.lightBox_do.closeButton_do.totalWidth/2);
					var closeButtonFinalY = parseInt((viewportSize.h - self.finalLightBoxHeight)/2 - self.lightBox_do.closeButton_do.totalHeight/2);
		
					if(closeButtonFinalX + self.lightBox_do.closeButton_do.totalWidth > self.viewportWidth){
						closeButtonFinalX = self.viewportWidth - self.lightBox_do.closeButton_do.totalWidth;
					}
					
					if(closeButtonFinalY < 0){
						closeButtonFinalY = 0;
					}
				
					self.lightBox_do.closeButton_do.setX(closeButtonFinalX);
					self.lightBox_do.closeButton_do.setY(closeButtonFinalY);	
				}
				self.main_do.setX(0);
				self.main_do.setY(0);
				self.lightBox_do.mainLightBox_do.setWidth(self.finalLightBoxWidth);
				self.lightBox_do.mainLightBox_do.setHeight(self.finalLightBoxHeight);	
				self.stageWidth = self.finalLightBoxWidth;
				self.stageHeight = self.finalLightBoxHeight;
			}else if(self.isFullScreen_bl || self.displayType == FWDMegazoom.FULL_SCREEN){	
				self.main_do.setX(scrollOffsets.x);
				self.main_do.setY(scrollOffsets.y);
				self.stageWidth = viewportSize.w;
				self.stageHeight = viewportSize.h;
			}else{
				self.main_do.setX(0);
				self.main_do.setY(0);
				self.stageWidth = self.stageContainer.offsetWidth;
				self.stageHeight = self.stageContainer.offsetHeight;
			}
			
			self.main_do.setWidth(self.stageWidth);
			self.main_do.setHeight(self.stageHeight);
			
			if(self.preloader_do) self.preloader_do.positionAndResize();
			if(self.controller_do) self.controller_do.resizeAndPosition();
			if(self.imageManager_do) self.imageManager_do.resizeAndPosition(false);
			if(self.navigator_do) self.navigator_do.resizeAndPosition();
			if(self.descriptionWindow_do && self.descriptionWindow_do.isShowed_bl)  self.descriptionWindow_do.resizeAndPosition();
		};
		
		//#############################################//
		/* setup  lighbox...*/
		//#############################################//
		self.setupLightBox = function(){
			FWDLightBox.setPrototype();
			self.lightBox_do =  new FWDLightBox(self, 
					self.lightBoxBackgroundColor_str, 
					self.backgroundColor_str, 
					self.lightBoxBackgroundOpacity, 
					self.lightBoxWidth, 
					self.lightBoxHeight);
			self.lightBox_do.getStyle().zIndex = 9999999;
			self.lightBox_do.addListener(FWDLightBox.CLOSE, self.lightBoxCloseHandler);
			self.lightBox_do.addListener(FWDLightBox.HIDE_COMPLETE, self.lightBoxHideCompleteHandler);
			self.lighboxAnimDoneId_to = setTimeout(self.setupMegazoom, 1800);
		};
		
		self.lightBoxCloseHandler = function(){
			self.stopResizeHandler();
			if(self.data) self.data.stopToLoad();
		};
		
		self.lightBoxHideCompleteHandler = function(){
			if(self.dispatchEvent) self.dispatchEvent(FWDMegazoom.CLOSE_LIGHTBOX);
			self.destroy();
		};
		
		//#############################################//
		/* setup context menu */
		//#############################################//
		self.setupContextMenu = function(){
			FWDContextMenu.setPrototype();
			self.customContextMenu = new FWDContextMenu(self, self.data);
			self.customContextMenu.addListener(FWDController.PAN, self.contextMenuPanHandler);
			self.customContextMenu.addListener(FWDController.ZOOM_IN, self.contextMenuZoomInHandler);
			self.customContextMenu.addListener(FWDController.ZOOM_OUT, self.contextMenuZoomOutHandler);
			self.customContextMenu.addListener(FWDController.HIDE_MARKERS, self.controllerHideMarkers);
			self.customContextMenu.addListener(FWDController.SHOW_MARKERS, self.controllerShowMarkers);
			self.customContextMenu.addListener(FWDController.SHOW_INFO, self.contextMenuShowInfoWindow);
			self.customContextMenu.addListener(FWDController.GO_FULL_SCREEN, self.controllerGoFullScreen);
			self.customContextMenu.addListener(FWDController.GO_NORMAL_SCREEN, self.controllerGoNormalScreen);
			self.customContextMenu.addListener(FWDController.HIDE_CONTROLLER, self.contextMenuHideController);
			self.customContextMenu.addListener(FWDController.SHOW_CONTROLLER, self.contextMenuShowController);
		};
		
		this.contextMenuPanHandler = function(e){
			if(e.dir == "left"){
				self.controller_do.moveLeftButtonStartHandler(e.e);
			}else if(e.dir == "right"){
				self.controller_do.moveRightButtonStartHandler(e.e);
			}else if(e.dir == "up"){
				self.controller_do.moveUpButtonStartHandler(e.e);
			}else if(e.dir == "down"){
				self.controller_do.moveDownButtonStartHandler(e.e);
			}
		};
	
		this.contextMenuGoToNextImageHandler = function(e){
			self.controller_do.nextButtonStartHandler(e);
		};
		
		this.contextMenuGoToPrevImageHandler = function(e){
			self.controller_do.prevButtonStartHandler(e);
		};
		
		this.contextMenuZoomInHandler = function(e){
			self.controller_do.zoomInStartHandler(e);
		};
		
		this.contextMenuZoomOutHandler = function(e){
			self.controller_do.zoomOutStartHandler(e);
		};
		
		this.contextMenuShowInfoWindow = function(e){
			self.main_do.addChild(self.descriptionWindow_do);
			self.descriptionWindow_do.hide(false, true);
			self.descriptionWindow_do.show(self.data.infoText_str);
		};
		
		this.contextMenuHideController =  function(){
			self.controller_do.setHideOrShowControllerAndToolTipState(1);
		};
		
		this.contextMenuShowController = function(){
			self.controller_do.setHideOrShowControllerAndToolTipState(0);
		};
		
		//#############################################//
		/* setup data */
		//#############################################//
		self.setupData = function(){
			FWDData.setPrototype();
			self.data = new FWDData(self.props_obj, self.rootElement_el);
			self.data.addListener(FWDData.LIGHBOX_CLOSE_BUTTON_LOADED, self.onLightboxCloseButtonLoadComplete);
			self.data.addListener(FWDData.PRELOADER_LOAD_DONE, self.onPreloaderLoadDone);
			self.data.addListener(FWDData.LOAD_ERROR, self.dataLoadError);
			self.data.addListener(FWDData.SKIN_PROGRESS, self.dataSkinProgressHandler);
			self.data.addListener(FWDData.IMAGES_PROGRESS, self.dataImagesProgressHandler);
			self.data.addListener(FWDData.LOAD_DONE, self.dataLoadComplete);
			self.data.addListener(FWDData.IMAGES_LOAD_COMPLETE, self.dataImageLoadComplete);
		};
		
		self.onLightboxCloseButtonLoadComplete = function(){
			if(self.displayType == FWDMegazoom.LIGHTBOX) self.lightBox_do.setupCloseButton(self.data.mainLightboxCloseButtonN_img, self.data.mainLightboxCloseButtonS_img);
		};
		
		self.onPreloaderLoadDone = function(){
			self.setupPreloader();
		};
		
		self.dataLoadError = function(e, text){
			self.main_do.addChild(self.info_do);
			self.info_do.showText(e.text);
		};
		
		self.dataSkinProgressHandler = function(e){
			self.preloader_do.updateText("Loading skin...");
		};
		
		self.dataImagesProgressHandler = function(e){
			self.preloader_do.updateText(self.data.preloaderText_str);
		};
		
		self.dataLoadComplete = function(e){
			self.main_do.addChild(self.preloader_do);
			if(!self.isMobile_bl) self.setupContextMenu();
		};
		
		self.dataImageLoadComplete = function(){
			self.hidePreloaderId_to = setTimeout(function(){self.preloader_do.hide(true);}, 500);
			
			self.setupImageManager();
			self.setupController();
			if(self.data.showNavigator_bl) self.setupNavigator();
	
			self.main_do.addChild(self.preloader_do);
			
			if(self.data.hideController_bl){
				self.setupHider();
				self.controller_do.setupHider(self.hider);
				self.imageManager_do.setupHider(self.hider);
				if(self.navigator_do) self.navigator_do.setupHider(self.hider);
				self.startHiderWithDelayId_to = setTimeout(function(){
					self.hider.start();
				}, self.data.hideControllerDelay);
			}
			if(self.customContextMenu) self.customContextMenu.isActive_bl = true;
			if(self.navigator_do) self.navigator_do.activate();
			self.setupDisableContainer();
			self.setupDescriptionWindow();
		};
		
		//#############################################//
		/* setup preloader */
		//#############################################//
		self.setupPreloader = function(){
			FWDPreloader.setPrototype();
			self.preloader_do = new FWDPreloader(
					self, 
					self.data.mainPreloader_img, 
					50, 45, 30, 50,
					self.data.preloaderFontColor_str,
					self.data.preloaderBackgroundColor_str);
			
			self.preloader_do.addListener(FWDPreloader.HIDE_COMPLETE, self.onPreloaderHideCompleteHandler);
			self.preloader_do.positionAndResize();
			self.preloader_do.hide(false);
			self.preloader_do.show(true);
			self.preloader_do.start();
			self.main_do.addChild(self.preloader_do);
		};
		
		self.onPreloaderHideCompleteHandler = function(){
			self.main_do.removeChild(self.preloader_do);
			self.preloader_do.destroy();
			self.preloader_do = null;
		};
		
		//###########################################//
		/* setup hider */
		//###########################################//
		self.setupHider = function(){
			FWDHider.setPrototype();
			self.hider = new FWDHider(self.data.isMobile_bl, self.main_do, self.data.hideControllerDelay);
		};
		
		//###########################################//
		/* setup controller */
		//###########################################//
		this.setupController = function(){
			FWDController.setPrototype();
			self.controller_do = new FWDController(self.data, self);
			self.controller_do.addListener(FWDController.MOUSE_DOWN, self.controllerOnMouseDownHandler);
			self.controller_do.addListener(FWDController.PAN, self.controllerOnPanHandler);
			self.controller_do.addListener(FWDController.DISABLE_PAN_OR_MOVE, self.disablePanOrMoveHandler);
			self.controller_do.addListener(FWDController.ENABLE_PAN_OR_MOVE, self.enablePanOrMoveHandler);
			self.controller_do.addListener(FWDController.SCROLL_BAR_UPDATE, self.controllerScrollBarUpdateHandler);
			self.controller_do.addListener(FWDController.ZOOM_WITH_BUTTONS, self.controllerZoomHandler);
			self.controller_do.addListener(FWDController.SHOW_INFO, self.controllerShowInfoHandler);
			self.controller_do.addListener(FWDController.GO_FULL_SCREEN, self.controllerGoFullScreen);
			self.controller_do.addListener(FWDController.GO_NORMAL_SCREEN, self.controllerGoNormalScreen);	
			self.controller_do.addListener(FWDController.HIDE_MARKERS, self.controllerHideMarkers);
			self.controller_do.addListener(FWDController.SHOW_MARKERS, self.controllerShowMarkers);
			self.controller_do.addListener(FWDController.HIDE_CONTROLLER, self.controllerHideHandler);
			self.controller_do.addListener(FWDController.SHOW_CONTROLLER, self.controllerShowHandler);
	
			if(self.controller_do) self.controller_do.resizeAndPosition();
			self.main_do.addChild(self.controller_do);
		};
		
		this.controllerOnMouseDownHandler = function(){
			self.imageManager_do.hideToolTipWindow();
		};
		
		this.controllerOnPanHandler = function(e){
			self.imageManager_do.panWithButtons(e.dir);
		};
		
		this.disablePanOrMoveHandler = function(){
			self.imageManager_do.disableOrEnablePanOrTouch(true);
		};
		
		this.enablePanOrMoveHandler = function(){
			self.imageManager_do.disableOrEnablePanOrTouch(false);
		};
		
		this.controllerScrollBarUpdateHandler = function(e){
			self.imageManager_do.zoomInOrOutWithScrollBar(e.percent);
		};
		
		this.controllerZoomHandler = function(e){
			self.imageManager_do.zoomInOrOutWithButtons(e.dir, e.withPause);
		};
		
		
		this.controllerShowInfoHandler = function(){
			self.main_do.addChild(self.descriptionWindow_do);
			self.descriptionWindow_do.hide(false, true);
			self.descriptionWindow_do.show(self.data.infoText_str);
		};
		
		this.controllerGoFullScreen = function(){
			if(self.isFullScreen_bl) return;
			self.goFullScreen();
			//self.imageManager_do.centerImage();
			self.controller_do.setFullScreenButtonState(0);
			if(self.customContextMenu) self.customContextMenu.updateFullScreenButton(1);
			
			if(document.addEventListener){
				document.addEventListener("fullscreenchange", self.onFullScreenChange);
				document.addEventListener("mozfullscreenchange", self.onFullScreenChange);
				document.addEventListener("webkitfullscreenchange", self.onFullScreenChange);
			}
		};
		
		this.controllerGoNormalScreen = function(){
			if(!self.isFullScreen_bl) return;
			self.goNormalScreen();
		
			self.imageManager_do.centerImage();
			self.controller_do.setFullScreenButtonState(1);
			if(self.customContextMenu) self.customContextMenu.updateFullScreenButton(0);
			
			if(document.removeEventListener){
				document.removeEventListener("fullscreenchange", self.onFullScreenChange);
				document.removeEventListener("mozfullscreenchange", self.onFullScreenChange);
				document.removeEventListener("webkitfullscreenchange", self.onFullScreenChange);
			}
		};
		
		this.controllerHideMarkers = function(){
			if(self.customContextMenu) self.customContextMenu.updateHideOrShowMarkersButton(1);
			self.controller_do.setHideOrShowButtonAndToolTipState(1);
			self.imageManager_do.hideMarkers();
		};
		
		this.controllerShowMarkers = function(){
			if(self.customContextMenu) self.customContextMenu.updateHideOrShowMarkersButton(0);
			self.controller_do.setHideOrShowButtonAndToolTipState(0);
			self.imageManager_do.showMarkers();
		};
		
		this.onFullScreenChange = function(e){
			if(!(document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen || document.msieFullScreen)){
				if(self.showButtonsLabels_bl) self.fullscreenToolTip_do.setLabel(self.fullscreenToolTip_do.toolTipLabel2_str);
				self.controller_do.setFullScreenButtonState(1);
				if(self.customContextMenu) self.customContextMenu.updateFullScreenButton(0);
				self.controllerGoNormalScreen();
				self.isFullScreen_bl = false;
			}
		};
		
		this.controllerHideHandler = function(){
			if(self.customContextMenu) self.customContextMenu.startHideOrShowControllerHandler(1);
		};
		
		this.controllerShowHandler = function(){
			if(self.customContextMenu) self.customContextMenu.startHideOrShowControllerHandler(0);
		};
		
		//###########################################//
		/* setup image manager */
		//###########################################//
		self.setupImageManager = function(id){	
			FWDImageManager.setPrototype();
			self.imageManager_do = new FWDImageManager(self.data, self);
			self.imageManager_do.addListener(FWDImageManager.LARGE_IMAGE_LOAD_ERROR, self.imageManagerLoadError);
			self.imageManager_do.addListener(FWDImageManager.SCROLL_BAR_UPDATE, self.imageManagerScrollBarUpdate);
			self.imageManager_do.addListener(FWDImageManager.SHOW_NAVIGATOR, self.imageManagerShowNavigatorHandler);
			self.imageManager_do.addListener(FWDImageManager.HIDE_NAVIGATOR, self.imageManagerHideNavigatorHandler);
			self.imageManager_do.addListener(FWDImageManager.UPDATE_NAVIGATOR, self.imageManagerUpdateNavigatorHandler);
			self.imageManager_do.addListener(FWDImageManager.SHOW_INFO, self.imageManagerShowInfoHandler);
			self.imageManager_do.addListener(FWDImageManager.DISABLE_LEFT_AND_RIGHT_BUTTONS, self.disableLeftAndRightHandler);
			self.imageManager_do.addListener(FWDImageManager.ENABLE_LEFT_AND_RIGHT_BUTTONS, self.enableLeftAndRightHandler);
			self.imageManager_do.addListener(FWDImageManager.DISABLE_UP_AND_DOWN_BUTTONS, self.disableUpAndDownHandler);
			self.imageManager_do.addListener(FWDImageManager.ENABLE_UP_AND_DOWN_BUTTONS, self.enableUpAndDownHandler);
			self.main_do.addChild(self.imageManager_do);
		};
		
		self.imageManagerLoadError = function(e){
			self.main_do.addChild(self.info_do);
			self.info_do.showText(e.error);
		};
		
		self.imageManagerScrollBarUpdate = function(e){
			self.controller_do.updateScrollBar(e.percent, e.animate);
		};
		
		self.imageManagerShowNavigatorHandler = function(){
			self.navigator_do.show(true);
		};
		
		self.imageManagerHideNavigatorHandler = function(){
			self.navigator_do.hide(true);
		};
		
		self.imageManagerUpdateNavigatorHandler = function(e){
			self.navigator_do.update(e.percentX, e.percentY, e.percentWidth, e.percentHeight, e.animate);
		};
		
		self.imageManagerShowInfoHandler = function(e){
			self.main_do.addChild(self.descriptionWindow_do);
			self.descriptionWindow_do.hide(false, true);
			self.descriptionWindow_do.show(e.text);
		};
		
		self.disableLeftAndRightHandler = function(){
			self.controller_do.disableLeftAndRightButtons();
			if(self.customContextMenu) self.customContextMenu.disableLeftAndRightButtons();
		};
		
		self.enableLeftAndRightHandler = function(){
			self.controller_do.enableLeftAndRightButtons();
			if(self.customContextMenu) self.customContextMenu.enableLeftAndRightButtons();
		};
		
		self.disableUpAndDownHandler = function(){
			
			self.controller_do.disableUpAndDownButtons();
			if(self.customContextMenu) self.customContextMenu.disableUpAndDownButtons();
		};
		
		self.enableUpAndDownHandler = function(){
			self.controller_do.enableUpAndDownButtons();
			if(self.customContextMenu) self.customContextMenu.enableUpAndDownButtons();
		};
		
		//#############################################//
		/* Setup navigator */
		//#############################################//
		self.setupNavigator = function(){
			FWDNavigator.setPrototype();
			self.navigator_do = new FWDNavigator(self, self.data);
			self.navigator_do.addListener(FWDNavigator.PAN_START, self.navigatorOnPanStartHandler);
			self.navigator_do.addListener(FWDNavigator.PAN_END, self.navigatorOnPanEndHandler);
			self.navigator_do.addListener(FWDNavigator.PAN, self.navigatorPanHandler);
			self.main_do.addChild(self.navigator_do);
		};
		
		self.navigatorOnPanStartHandler = function(){
			self.imageManager_do.hideToolTipWindow();
			if(!self.isMobile_bl) self.disableAll();
		};
		
		self.navigatorOnPanEndHandler = function(){
			if(!self.isMobile_bl) self.enableAll();
		};
		
		
		self.navigatorPanHandler = function(e){
			self.imageManager_do.updateOnNavigatorPan(e.percentX, e.percentY);
		};
		
		//#############################################//
		/* Setup description window */
		//#############################################//
		self.setupDescriptionWindow = function(){
			FWDDescriptionWindow.setPrototype();
			self.descriptionWindow_do = new FWDDescriptionWindow(self, self.data);
			self.descriptionWindow_do.addListener(FWDDescriptionWindow.SHOW_START, self.descWindowShowStartHandler);
			self.descriptionWindow_do.addListener(FWDDescriptionWindow.HIDE_COMPLETE, self.descWindowHideComplteHandler);
		};
		
		self.descWindowShowStartHandler = function(){
			if(self.customContextMenu) self.customContextMenu.disable();
		};
		
		self.descWindowHideComplteHandler = function(){
			if(self.customContextMenu) self.customContextMenu.enable();
			self.main_do.removeChild(self.descriptionWindow_do);
		};
		
		//##############################################//
		/* Setup disable container */
		//#############################################//
		this.setupDisableContainer = function(){
			self.disable_sdo = new FWDSimpleDisplayObject("div");
			self.disable_sdo.screen.style.cursor = 'url(' + self.data.handGrabPath_str + '), default';
			if(FWDUtils.isIE || FWDUtils.isChrome){
				self.disable_sdo.setBkColor("#000000");
				self.disable_sdo.setAlpha(.0001);
			}
			self.main_do.addChild(self.disable_sdo);
		};
		
		this.disableAll = function(){
			self.disable_sdo.setWidth(self.stageWidth + 3000);
			self.disable_sdo.setHeight(self.stageHeight + 3000);
		};
		
		this.enableAll = function(){
			self.disable_sdo.setWidth(0);
			self.disable_sdo.setWidth(0);
		};
		
		//#############################################//
		/* go fullscreen / normal screen */
		//#############################################//
		self.goFullScreen = function(){
			
			var scrollOffsets = FWDUtils.getScrollOffsets();
			
			self.lastScrollX = scrollOffsets.x;
			self.lastScrollY = scrollOffsets.y;
			
			if (document.documentElement.requestFullScreen) {  
				document.documentElement.requestFullScreen();  
			}else if(document.documentElement.mozRequestFullScreen) {  
				document.documentElement.mozRequestFullScreen();  
			}else if(document.documentElement.webkitRequestFullScreen) {  
				document.documentElement.webkitRequestFullScreen();  
			}else if(document.documentElement.msieRequestFullScreen) {  
				document.documentElement.msieRequestFullScreen();  
			}
			
			self.main_do.getStyle().position = "absolute";
			self.body.style.overflow = "hidden";
			document.documentElement.style.overflow = "hidden";
			
			if(FWDUtils.isIEAndLessThen9){
				self.body.appendChild(self.main_do.screen);
			}else{
				//self.body.style.visiblity = "hidden";
				document.documentElement.appendChild(self.main_do.screen);
			}
			
			self.main_do.getStyle().zIndex = 100000001;
			
			self.isFullScreen_bl = true;
			self.resizeHandler(true);
		};
		
		self.goNormalScreen = function(){			
			if (document.cancelFullScreen) {  
				document.cancelFullScreen();  
			}else if (document.mozCancelFullScreen) {  
				document.mozCancelFullScreen();  
			}else if (document.webkitCancelFullScreen) {  
				document.webkitCancelFullScreen();  
			}else if (document.msieCancelFullScreen) {  
				document.msieCancelFullScreen();  
			}
			
			self.addMainDoToTheOriginalParent();
			
			self.isFullScreen_bl = false;
			self.resizeHandler(true);
			self.centerImageNormalScreenId_to = setTimeout(function(){
				self.imageManager_do.resizeAndPosition(true, false);
			}, 50)
		};
		
		self.addMainDoToTheOriginalParent = function(){
			
			if(self.displayType != FWDMegazoom.FULL_SCREEN){
				if(FWDUtils.isIEAndLessThen9){
					document.documentElement.style.overflow = "auto";
					this.body.style.overflow = "auto";
					this.body.style.visibility = "visible";
				}else{
					document.documentElement.style.overflow = "visible";
					self.body.style.overflow = "visible";
					self.body.style.display = "inline";
				}
			}
			
			if(self.displayType == FWDMegazoom.FULL_SCREEN){
				if(FWDUtils.isIEAndLessThen9){
					self.body.appendChild(self.main_do.screen);
				}else{
					document.documentElement.appendChild(self.main_do.screen);
				}
			}else if(self.displayType == FWDMegazoom.LIGHTBOX){
				self.stageContainer.appendChild(self.main_do.screen);
				//self.stageContainer.appendChild(self.closeButton_do.screen);
			}else{
				self.main_do.getStyle().position = "relative";
				self.stageContainer.appendChild(self.main_do.screen);
			}
			
			self.main_do.getStyle().zIndex = 0;
			window.scrollTo(self.lastScrollX, self.lastScrollY);
		};
		
		//#############################################//
		/* clean main events */
		//#############################################//
		self.cleanMainEvents = function(){
		
			if(window.removeEventListener){
				window.removeEventListener("resize", self.onResizeHandler);
				window.removeEventListener("scroll", self.onResizeHandler);
				document.removeEventListener("fullscreenchange", self.onFullScreenChange);
				document.removeEventListener("mozfullscreenchange", self.onFullScreenChange);
				document.removeEventListener("webkitfullscreenchange", self.onFullScreenChange);
			}else if(window.detachEvent){
				window.detachEvent("onresize", self.onResizeHandler);
				window.detachEvent("onscroll", self.onResizeHandler);
			}
			
			if(self.isMobile_bl){
				window.removeEventListener("contextmenu", self.preventContextMenu);	
			}
			
			clearTimeout(self.resizeHandlerId_to);
			clearTimeout(self.resizeHandler2Id_to);
			clearTimeout(self.lighboxAnimDoneId_to);
			clearTimeout(self.startHiderWithDelayId_to);
			clearTimeout(self.initPluginId_to);
			clearTimeout(self.activateWithDelayImagemanagerId_to);
			clearTimeout(self.hidePreloaderId_to);
			clearTimeout(self.centerImageNormalScreenId_to);
			
		};
		
		/* destroy */
		self.destroy = function(){
			
			self.cleanMainEvents();
			
			if(self.data) self.data.destroy();
			if(self.lightBox_do)self.lightBox_do.destroy();
			if(self.preloader_do) self.preloader_do.destroy();
			if(self.customContextMenu) self.customContextMenu.destroy();
			if(self.info_do) self.info_do.destroy();
			
			if(self.imageManager_do){
				TweenMax.killTweensOf(self.imageManager_do);
				self.imageManager_do.destroy();
			}
			
			if(self.controller_do) self.controller_do.destroy();
			if(self.navigator_do) self.navigator_do.destroy();
			
			if(self.hider) self.hider.destroy();
			if(self.descriptionWindow_do) self.descriptionWindow_do.destroy();
			
			try{
				self.main_do.screen.parentNode.removeChild(self.main_do.screen);
			}catch(e){}
			if(self.main_do){
				self.main_do.setInnerHTML("");
				self.main_do.destroy();
			}
			
			self.data = null;
			self.lightBox_do = null;
			self.customContextMenu = null;
			self.preloader_do = null;
			self.hider = null;
			self.info_do = null;
			self.main_do = null;
			self.imageManager_do = null;
			self.navigator_do = null;
			
			self = null;
		};
		
		self.init();
		
	};
	
	/* set prototype */
	FWDMegazoom.setPrototype =  function(){
		FWDMegazoom.prototype = new FWDEventDispatcher();
	};
	
	
	FWDMegazoom.FULL_SCREEN = "fullscreen";
	FWDMegazoom.LIGHTBOX = "lightbox";
	FWDMegazoom.RESPONSIVE = "responsive";
	FWDMegazoom.CLOSE_LIGHTBOX = "closeLightBox";
	
	FWDMegazoom.CLOSE_LIGHTBOX = "closeLightBox";
	
	window.FWDMegazoom = FWDMegazoom;
	
}(window));