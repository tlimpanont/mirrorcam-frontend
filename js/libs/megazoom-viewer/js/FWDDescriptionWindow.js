/* FWDDescriptionWindow */
(function (window){
var FWDDescriptionWindow = function(parent, data){
		
		var self = this;
		var prototype = FWDDescriptionWindow.prototype;
		
		this.infoWindowCloseNormal_img = data.infoWindowCloseNormal_img;
		this.infoWindowCloseSelected_img = data.infoWindowCloseSelected_img;
		
		this.close_do = null;
		this.background_sdo = null; 
		this.mainContentHolder_do = null;
		this.dumyHolder_do = null;
		this.contentHolder_sdo = null;
		this.scrollBar_do = null;
		this.scrollBarTrack_sdo = null;
		this.scrollBarHandler_sdo = null;
	
		this.mainBackgroundColor_str = data.infoWindowBackgroundColor_str;
		this.scrollBarHandlerColor = data.infoWindowScrollBarColor_str;
		this.scrollBarTrackColor = data.infoWindowScrollBarColor_str;
		this.scrollBarTrackOpacity = .6;
		
		this.toolTipWindowId = "none";
		this.backgroundOpacity = data.infoWindowBackgroundOpacity;
		this.mainContentHolderWidth;
		this.mainContentHolderHeight;
		this.contentHolderHeight;
		this.scrollBarHandlerFinalY;
		this.mainContentFinalX = 0;
		this.mainContentFinalY = 0;
		this.contentFinalX = 0;
		this.contentFinalY = 0;
		this.headerFinalY = 0;
		this.contentHeight;
		this.maxWidth = 800;
		this.offestWidth = 20;
		this.offsetHeight = 20;
		this.stageWidth;
		this.stageHeight;
		this.scrollBarHeight = 0;
		this.scrollBarWidth = 4;
		this.scrollBarHandlerHeight;
		this.scrollBarBorderRadius = 15;
		this.yPositionOnPress;
		this.lastPresedY;
		this.closeButtonWidth = self.infoWindowCloseNormal_img.width;
		this.closeButtonHeight = self.infoWindowCloseNormal_img.height;
		this.vy = 0;
		this.vy2 = 0;
		this.friction = .9;
		
		this.hideWithDelayId_do;
		this.showOrHideWithDelayId_to;
		this.hideCompleteId_to;
		this.updateMobileScrollBarId_int;
	
		this.isShowed_bl = true;
		this.isDragging_bl = false;
		this.allowToScroll_bl = true;
		this.isMobile_bl = FWDUtils.isMobile;
		this.hasPointerEvent_bl = FWDUtils.hasPointerEvent;
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setOverflow("visible");
			self.setBackfaceVisibility();
			self.setupMainContainers();
			if(self.isMobile_bl){
				self.setupMobileScrollbar();
			}else{
				self.setupPCScrollBar();
				self.addMouseWheelSupport();
			}
			self.setupCloseButton();
			self.hide(false);
			
		};
		
		//##########################################//
		/* position and resize */
		//##########################################//
		self.resizeAndPosition = function(){
			if(self.stageWidth == parent.stageWidth && self.stageHeight == parent.stageHeight) return;
			self.stageWidth = parent.stageWidth;
			self.stageHeight = parent.stageHeight;
			self.background_sdo.setWidth(self.stageWidth);
			self.background_sdo.setHeight(self.stageHeight);
			self.updateSize();
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){
			self.background_sdo = new FWDSimpleDisplayObject("div");
			self.background_sdo.setBkColor(self.mainBackgroundColor_str);
			self.addChild(self.background_sdo);
			
			self.mainContentHolder_do = new FWDDisplayObject("div");
			self.mainContentHolder_do.setBackfaceVisibility();
			
			self.dumyHolder_do = new FWDDisplayObject("div");
			self.dumyHolder_do.setBackfaceVisibility();
			self.addChild(self.dumyHolder_do);
			
			self.dumyHolder_do.addChild(self.mainContentHolder_do);
			
			self.contentHolder_sdo = new FWDSimpleDisplayObject("div");
			self.contentHolder_sdo.getStyle().fontSmoothing = "antialiased";
			self.contentHolder_sdo.getStyle().webkitFontSmoothing = "antialiased";
			self.contentHolder_sdo.getStyle().textRendering = "optimizeLegibility";	
			if(!FWDUtils.isMobile || FWDUtils.isApple){
				self.contentHolder_sdo.hasTransform3d_bl = false;
				self.contentHolder_sdo.hasTransform2d_bl = false;
			};
			self.contentHolder_sdo.setBackfaceVisibility();
			self.mainContentHolder_do.addChild(self.contentHolder_sdo);
		};
		
		//########################################//
		/* Setup close button */
		//#######################################//
		self.setupCloseButton = function(){
			FWDSimpleButton.setPrototype();
			self.close_do = new FWDSimpleButton(self.infoWindowCloseNormal_img, self.infoWindowCloseSelected_img);
			self.close_do.addListener(FWDSimpleButton.MOUSE_DOWN, self.closeButtonStartHandler);
			self.mainContentHolder_do.addChild(self.close_do);
		};
		
		self.closeButtonStartHandler = function(e){
			if(!self.isShowed_bl) return;
			self.hide(true);
		};
		
		//########################################//
		/* update content size */
		//########################################//
		self.updateSize = function(){
			self.mainContentHolderWidth = self.stageWidth - self.offestWidth;
			if(self.mainContentHolderWidth > self.maxWidth) self.mainContentHolderWidth = self.maxWidth;
			self.mainContentHolder_do.setWidth(self.mainContentHolderWidth);
			self.setWidth(self.stageWidth);
			self.setHeight(self.stageHeight);
			self.dumyHolder_do.setWidth(self.stageWidth);
			self.dumyHolder_do.setHeight(self.stageHeight);
		
			self.close_do.setX(self.mainContentHolderWidth - self.closeButtonWidth);
			
			if(self.isMobile_bl){	
				setTimeout(function(){
					if(self == null) return;
					TweenMax.killTweensOf(self.mainContentHolder_do);
					self.contentHolderHeight = self.contentHolder_sdo.getHeight();
					self.mainContentHolderHeight = Math.min(self.stageHeight, self.contentHolderHeight);
					self.mainContentFinalX = Math.round((self.stageWidth - self.mainContentHolderWidth)/2);
					
					if(self.stageHeight > self.contentHolderHeight){
						self.mainContentFinalY = Math.round((self.stageHeight - self.contentHolderHeight)/2);
						self.allowToScroll_bl = false;
					}else{
						self.mainContentFinalY = 0;	
						self.allowToScroll_bl = true;
					}
					
					self.updateMobileScrollBarWithoutAnimation();
					TweenMax.killTweensOf(self.mainContentHolder_do);
					self.mainContentHolder_do.setX(self.mainContentFinalX);
					self.mainContentHolder_do.setY(self.mainContentFinalY);
					self.mainContentHolder_do.setHeight(self.mainContentHolderHeight);
				}, 50);
				
			}else{
			
				setTimeout(function(){
					if(self == null) return;
					TweenMax.killTweensOf(self.mainContentHolder_do);
					self.contentHolderHeight = self.contentHolder_sdo.getHeight();
					self.mainContentHolderHeight = self.stageHeight;
					self.mainContentFinalX = Math.round((self.stageWidth - self.mainContentHolderWidth)/2);
					self.scrollBarHeight = Math.min(self.contentHolderHeight - 20 - self.closeButtonHeight, self.stageHeight - 20 - self.closeButtonHeight);
					
					if(self.stageHeight > self.contentHolderHeight){
						self.scrollBar_do.setOverflow("hidden");
						self.mainContentHolderHeight = self.contentHolderHeight;
						self.scrollBarHandler_sdo.setY(0);
						self.mainContentFinalY = Math.round((self.stageHeight - self.contentHolderHeight)/2) ;
						self.allowToScroll_bl = false;
					}else{
						self.mainContentFinalY = 0;
						self.scrollBar_do.setOverflow("visible");
						self.scrollBar_do.setY(5 + self.closeButtonHeight);
						self.allowToScroll_bl = true;
					}
					
					if(self.stageHeight < 120) self.mainContentFinalY = 0;
				
					self.scrollBarHandlerHeight = Math.min((self.scrollBarHeight - 20), (self.stageHeight/self.contentHolderHeight) * (self.scrollBarHeight - 20));
					if(self.scrollBarHandlerHeight > 500){
						self.scrollBarHandlerHeight = 500;
					}
					
					self.scrollBar_do.setX(self.mainContentHolderWidth - self.scrollBarWidth - 2);
					self.scrollBarTrack_sdo.setHeight(Math.max(self.scrollBarHeight, self.scrollBarHandlerHeight));
					self.scrollBarHandler_sdo.setHeight(self.scrollBarHandlerHeight);
					
					TweenMax.killTweensOf(self.mainContentHolder_do);
					self.mainContentHolder_do.setX(self.mainContentFinalX);
					self.mainContentHolder_do.setY(self.mainContentFinalY);
					self.mainContentHolder_do.setHeight(self.mainContentHolderHeight);
					
					self.updatePCHandler(false);
				
				}, 50);
			}
		};
		
		//##########################################//
		/* set label */
		//##########################################//
		self.setText = function(text){
			if(self == null) return;
			self.updateSize();
			self.contentHolder_sdo.setInnerHTML(text);
			setTimeout(self.updateSize, 120);
		};
	
		//#########################################//
		/* Setup PC scrollbar */
		//#########################################//
		self.setupPCScrollBar = function(){
			
			self.scrollBar_do = new FWDDisplayObject("div");
			self.scrollBar_do.setOverflow("visible");
			self.mainContentHolder_do.addChild(self.scrollBar_do);
			
			self.scrollBarTrack_sdo = new FWDSimpleDisplayObject("div");
			self.scrollBarTrack_sdo.setWidth(self.scrollBarWidth);
			self.scrollBarTrack_sdo.setBkColor(self.scrollBarTrackColor);
			self.scrollBarTrack_sdo.setAlpha(0);
			self.scrollBarTrack_sdo.getStyle().borderRadius = self.scrollBarBorderRadius + "px";
			self.scrollBar_do.addChild(self.scrollBarTrack_sdo);
			
			self.scrollBarHandler_sdo = new FWDSimpleDisplayObject("div");
			self.scrollBarHandler_sdo.setButtonMode(true);
			self.scrollBarHandler_sdo.setWidth(self.scrollBarWidth);
			self.scrollBarHandler_sdo.getStyle().borderRadius = self.scrollBarBorderRadius + "px";
			self.scrollBarHandler_sdo.setBkColor(self.scrollBarHandlerColor);
			self.scrollBarHandler_sdo.setAlpha(.5);
			
			if(self.scrollBarHandler_sdo.screen.addEventListener){
				self.scrollBarHandler_sdo.screen.addEventListener("mouseover", self.scrollBarHandlerOnMouseOver);
				self.scrollBarHandler_sdo.screen.addEventListener("mouseout", self.scrollBarHandlerOnMouseOut);
				self.scrollBarHandler_sdo.screen.addEventListener("mousedown", self.scrollBarHandlerOnMouseDown);
			}else if(self.screen.attachEvent){
				self.scrollBarHandler_sdo.screen.attachEvent("onmouseover", self.scrollBarHandlerOnMouseOver);
				self.scrollBarHandler_sdo.screen.attachEvent("onmouseout", self.scrollBarHandlerOnMouseOut);
				self.scrollBarHandler_sdo.screen.attachEvent("onmousedown", self.scrollBarHandlerOnMouseDown);
			}
			
			self.scrollBar_do.addChild(self.scrollBarHandler_sdo);
		};
		
		//descktop handler
		self.scrollBarHandlerOnMouseOver = function(){
			TweenMax.to(self.scrollBarHandler_sdo, .2, {alpha:1, w:10});
			TweenMax.to(self.scrollBarTrack_sdo, .2, {alpha:.4, w:10});
			TweenMax.to(self.scrollBar_do, .2, {x:self.mainContentHolderWidth - self.scrollBarWidth - 6});
		};
		
		self.scrollBarHandlerOnMouseOut = function(){
			if(self.isDragging_bl) return;
			TweenMax.to(self.scrollBarHandler_sdo, .3, {alpha:.5, w:self.scrollBarWidth});
			TweenMax.to(self.scrollBarTrack_sdo, .3, {alpha:0, w:self.scrollBarWidth});
			TweenMax.to(self.scrollBar_do, .3, {x:self.mainContentHolderWidth - self.scrollBarWidth - 2});
		};
		
		self.scrollBarHandlerOnMouseDown = function(e){
			//if(self.stageHeight < 120) return;
			if(!self.allowToScroll_bl) return;
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);		
			self.isDragging_bl = true;
			self.yPositionOnPress = self.scrollBarHandler_sdo.getY();
			self.lastPresedY = viewportMouseCoordinates.screenY;
			
			if(window.addEventListener){
				window.addEventListener("mousemove", self.scrollBarHandlerMoveHandler);
				window.addEventListener("mouseup", self.scrollBarHandlerEndHandler);	
			}else if(document.attachEvent){
				document.attachEvent("onmousemove", self.scrollBarHandlerMoveHandler);
				document.attachEvent("onmouseup", self.scrollBarHandlerEndHandler);
			}
		};
		
		self.scrollBarHandlerMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);	
	
			self.scrollBarHandlerFinalY = Math.round(self.yPositionOnPress + viewportMouseCoordinates.screenY - self.lastPresedY);
			if(self.scrollBarHandlerFinalY >= self.scrollBarHeight - self.scrollBarHandlerHeight){
				self.scrollBarHandlerFinalY = self.scrollBarHeight -  self.scrollBarHandlerHeight;
			}
			
			if(self.scrollBarHandlerFinalY <= 0) self.scrollBarHandlerFinalY = 0;
			self.scrollBarHandler_sdo.setY(self.scrollBarHandlerFinalY);
			self.updatePCHandler(true);
		};
		
		self.scrollBarHandlerEndHandler = function(e){
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);	
			self.isDragging_bl = false;
			
			if(!FWDUtils.hitTest(self.scrollBarHandler_sdo.screen, viewportMouseCoordinates.screenX, viewportMouseCoordinates.screenY)){
				self.scrollBarHandlerOnMouseOut();
			}
			if(window.removeEventListener){
				window.removeEventListener("mousemove", self.scrollBarHandlerMoveHandler);
				window.removeEventListener("mouseup", self.scrollBarHandlerEndHandler);	
			}else if(document.detachEvent){
				document.detachEvent("onmousemove", self.scrollBarHandlerMoveHandler);
				document.detachEvent("onmouseup", self.scrollBarHandlerEndHandler);
			}
		};
		
		self.updatePCHandler = function(animate){
			
			var percent;
			var scrollPercent;
			
			//if(self.stageHeight < 120) return;

			scrollPercent = (self.scrollBarHandlerFinalY/(self.scrollBarHeight - self.scrollBarHandlerHeight));
			
			if(scrollPercent == "Infinity") scrollPercent = 0;
			if(scrollPercent >= 1) scrollPercent = 1;
		
			if(self.isDragging_bl){
				self.contentFinalY = parseInt(scrollPercent * (self.stageHeight - self.contentHolderHeight));
			}else{
				if(self.scrollBarHandler_sdo.getY() < 0){
					self.scrollBarHandler_sdo.setY(0);
				}else if(self.scrollBarHandler_sdo.getY() > self.scrollBarHeight - self.scrollBarHandlerHeight ){
					self.scrollBarHandler_sdo.setY(self.scrollBarHeight - self.scrollBarHandlerHeight);
				}
			
				percent = self.scrollBarHandler_sdo.getY()/(self.scrollBarHeight - self.scrollBarHandlerHeight);	
				if(isNaN(percent)) percent = 0;
				
				if(self.stageHeight > self.contentHolderHeight){
					self.contentFinalY = 0;
				}else{
					self.contentFinalY = Math.round((percent * (self.scrollBarHeight  - self.scrollBarHandlerHeight)));
					self.contentFinalY = Math.round(percent * (self.stageHeight - self.contentHolderHeight));
				}
			}
			
			if(animate){
				TweenMax.to(self.contentHolder_sdo, .3, {y:Math.round(self.contentFinalY)});
			}else{
				self.contentHolder_sdo.setY(Math.round(self.contentFinalY));
			}
			
		};
		
		//######################################//
		/* add mouse wheel support */
		//######################################//
		self.addMouseWheelSupport = function(){
			if(window.addEventListener){
				self.screen.addEventListener ("mousewheel", self.mouseWheelHandler);
				self.screen.addEventListener('DOMMouseScroll', self.mouseWheelHandler);
			}else if(document.attachEvent){
				self.screen.attachEvent ("onmousewheel", self.mouseWheelHandler);
			}
		};
		
		this.mouseWheelHandler = function(e){
			if(!self.isShowed_bl) return;
			//if(self.stageHeight < 120) return;
			if(self.isDragging_bl) return;
			if(self.stageHeight > self.contentHolderHeight) return;
		
			var speedPercent = (self.stageHeight/self.contentHolderHeight);
			var dir = e.detail || e.wheelDelta;	
			if(e.wheelDelta) dir *= -1;
			if(FWDUtils.isOpera) dir *= -1;
			
			if(dir > 0){
				self.scrollBarHandler_sdo.setY(self.scrollBarHandler_sdo.getY() + (45 * speedPercent));
			}else if(dir < 0){
				self.scrollBarHandler_sdo.setY(self.scrollBarHandler_sdo.getY() - (45 * speedPercent));
			}
			
			self.updatePCHandler(true);
			
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}	
			return;
		};
		
	
		//##########################################//
		/* setup mobile scrollbar */
		//##########################################//
		self.setupMobileScrollbar = function(){
			if(self.hasPointerEvent_bl){
				self.screen.addEventListener("MSPointerDown", self.scrollBarTouchStartHandler);
			}else{
				self.screen.addEventListener("touchstart", self.scrollBarTouchStartHandler);
			}
		};
		
		self.scrollBarTouchStartHandler = function(e){
			//if(e.preventDefault) e.preventDefault();
			if(!self.allowToScroll_bl) return;
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);		
			self.isDragging_bl = true;
			self.lastPresedY = viewportMouseCoordinates.screenY;
	
			if(self.hasPointerEvent_bl){
				window.addEventListener("MSPointerUp", self.scrollBarTouchEndHandler);
				window.addEventListener("MSPointerMove", self.scrollBarTouchMoveHandler);
			}else{
				window.addEventListener("touchend", self.scrollBarTouchEndHandler);
				window.addEventListener("touchmove", self.scrollBarTouchMoveHandler);
			}
		};
		
		self.scrollBarTouchMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);	
			var toAdd = viewportMouseCoordinates.screenY - self.lastPresedY;
		
			self.contentFinalY += toAdd;
			self.contentFinalY = Math.round(self.contentFinalY);
			
			self.contentHolder_sdo.setY(self.contentFinalY);
			self.lastPresedY = viewportMouseCoordinates.screenY;
			self.vy = toAdd  * 2;
		};
		
		self.scrollBarTouchEndHandler = function(e){
			self.isDragging_bl = false;
			if(self.hasPointerEvent_bl){
				window.removeEventListener("MSPointerUp", self.scrollBarTouchEndHandler);
				window.removeEventListener("MSPointerMove", self.scrollBarTouchMoveHandler);
			}else{
				window.removeEventListener("touchend", self.scrollBarTouchEndHandler);
				window.removeEventListener("touchmove", self.scrollBarTouchMoveHandler);
			}
		};
		
		self.updateMobileScrollBar = function(animate){
			
			if(!self.isDragging_bl){
				self.vy *= self.friction;
				self.contentFinalY += self.vy;	
			
				if(self.contentFinalY > 0){
					self.vy2 = (0 - self.contentFinalY) * .3;
					self.vy *= self.friction;
					self.contentFinalY += self.vy2;
				}else if(self.contentFinalY < self.mainContentHolderHeight - self.contentHolderHeight){
					self.vy2 = (self.mainContentHolderHeight - self.contentHolderHeight - self.contentFinalY) * .3;
					self.vy *= self.friction;
					self.contentFinalY += self.vy2;
				}
				self.contentHolder_sdo.setY(Math.round(self.contentFinalY));
			}
		};
		
		self.updateMobileScrollBarWithoutAnimation = function(){
			if(self.contentFinalY > 0){
				self.contentFinalY = 0;
			}else if(self.contentFinalY < self.mainContentHolderHeight - self.contentHolderHeight){
				self.contentFinalY = self.mainContentHolderHeight - self.contentHolderHeight;
			}
			self.contentHolder_sdo.setY(Math.round(self.contentFinalY));
		};
		
		self.activateScrollBar = function(){
			if(self.isMobile_bl){
				self.updateMobileScrollBarId_int = setInterval(self.updateMobileScrollBar, 16);
			}
		};
		
		//##########################################//
		/* show / hide*/
		//##########################################//
		self.show = function(text){
			if(self.isShowed_bl) return;
			self.isShowed_bl = true;
			self.resizeAndPosition();
			self.setText(text);
			self.activateScrollBar();
			if(FWDUtils.isMobile){
				TweenMax.to(self.background_sdo, .6, {alpha:self.backgroundOpacity, delay:.2});
				self.showOrHideWithDelayId_to = setTimeout(self.showWithDelay, 1800);
			}else{
				TweenMax.to(self.background_sdo, .6, {alpha:self.backgroundOpacity});
				self.showOrHideWithDelayId_to = setTimeout(self.showWithDelay, 800);
			}
			self.dispatchEvent(FWDDescriptionWindow.SHOW_START);
		};
		
		self.showWithDelay = function(){
			self.dumyHolder_do.setX(0);
			if(self.scrollBarHandler_sdo) self.scrollBarHandler_sdo.setVisible(true);
			self.mainContentHolder_do.setY(-self.mainContentHolderHeight);
			TweenMax.to(self.mainContentHolder_do, .6, {y:self.mainContentFinalY, ease:Expo.easeInOut});
			if(!self.isMobile_bl)  setTimeout(function(){
				self.scrollBarHandler_sdo.setAlpha(.5);
				if(self.close_do.s_do) self.close_do.s_do.setAlpha(0);
				}, 400);
			
		};
		
	
		self.hide = function(animate, overwrite){
			if(!self.isShowed_bl && !overwrite) return;
			TweenMax.killTweensOf(self.background_sdo);	
			if(animate){
				TweenMax.to(self.mainContentHolder_do, .6, {y:self.stageHeight, ease:Expo.easeInOut});
				self.showOrHideWithDelayId_to = setTimeout(self.hideWithDelay, 800);
			}else{
				self.dumyHolder_do.setX(-3000);
				if(self.scrollBarHandler_sdo) self.scrollBarHandler_sdo.setVisible(false);
				self.background_sdo.setAlpha(0);
			}
			clearInterval(self.updateMobileScrollBarId_int);
			self.isShowed_bl = false;
		};
		
		self.hideWithDelay = function(){
			self.contentHolder_sdo.setInnerHTML("");
			TweenMax.to(self.background_sdo, .6, {alpha:0});
			self.hideCompleteId_to = setTimeout(self.hideWithDelayComplete, 600);
		};
		
		self.hideWithDelayComplete = function(){
			self.contentFinalY = 0;
			if(self.scrollBarHandler_sdo) self.scrollBarHandler_sdo.setY(0);
			self.dispatchEvent(FWDDescriptionWindow.HIDE_COMPLETE);
		};
		
		//###############################//
		/* clean main events */
		//###############################//
		self.cleanMainEvents = function(){
			
			if(self.screen.removeEventListener){
				if(self.scrollBarHandler_sdo){
					self.scrollBarHandler_sdo.screen.removeEventListener("mouseover", self.scrollBarHandlerOnMouseOver);
					self.scrollBarHandler_sdo.screen.removeEventListener("mouseout", self.scrollBarHandlerOnMouseOut);
					self.scrollBarHandler_sdo.screen.removeEventListener("mousedown", self.scrollBarHandlerOnMouseDown);
				}
				
				window.removeEventListener("mousemove", self.scrollBarHandlerMoveHandler);
				window.removeEventListener("mouseup", self.scrollBarHandlerEndHandler);	
				
				self.screen.removeEventListener ("mousewheel", self.mouseWheelHandler);
				self.screen.removeEventListener('DOMMouseScroll', self.mouseWheelHandler);
				
				self.screen.addEventListener("MSPointerDown", self.scrollBarTouchStartHandler);
				self.screen.addEventListener("touchstart", self.scrollBarTouchStartHandler);
				window.removeEventListener("MSPointerUp", self.scrollBarTouchEndHandler);
				window.removeEventListener("MSPointerMove", self.scrollBarTouchMoveHandler);
				window.removeEventListener("touchend", self.scrollBarTouchEndHandler);
				window.removeEventListener("touchmove", self.scrollBarTouchMoveHandler);
			}else if(self.screen.detachEvent){
				self.scrollBarHandler_sdo.screen.detachEvent("onmouseover", self.scrollBarHandlerOnMouseOver);
				self.scrollBarHandler_sdo.screen.detachEvent("onmouseout", self.scrollBarHandlerOnMouseOut);
				self.scrollBarHandler_sdo.screen.detachEvent("onmousedown", self.scrollBarHandlerOnMouseDown);
				
				document.detachEvent("onmousemove", self.scrollBarHandlerMoveHandler);
				document.detachEvent("onmouseup", self.scrollBarHandlerEndHandler);
				
				self.screen.detachEvent("onmousewheel", self.mouseWheelHandler);
			}
			
			clearTimeout(self.hideWithDelayId_do);
			clearTimeout(self.showOrHideWithDelayId_to);
			clearTimeout(self.hideCompleteId_to);
			clearInterval(self.updateMobileScrollBarId_int);
		};
		
		//##############################//
		/* destroy */
		//##############################//
		self.destroy = function(){
			self.cleanMainEvents(); 
			
			if(self.scrollBar_do){
				TweenMax.killTweensOf(self.scrollBar_do);
				TweenMax.killTweensOf(self.scrollBarHandler_sdo);
				TweenMax.killTweensOf(self.scrollBarTrack_sdo);
				
				self.scrollBar_do.destroy();
				self.scrollBarHandler_sdo.destroy();
				self.scrollBarTrack_sdo.destroy();
			}
			
			TweenMax.killTweensOf(self.contentHolder_sdo);
			self.contentHolder_sdo.destroy();
			
			TweenMax.killTweensOf(self.background_sdo);
			self.background_sdo.destroy();
			
			TweenMax.killTweensOf(self.mainContentHolder_do);
			self.mainContentHolder_do.destroy();
			
			self.close_do.destroy();
			
			self.infoWindowCloseNormal_img = null;
			self.infoWindowCloseSelected_img = null;
			
			self.close_do = null;
			self.background_sdo = null; 
			self.mainContentHolder_do = null;
			self.contentHolder_sdo = null;
			self.scrollBar_do = null;
			self.scrollBarTrack_sdo = null;
			self.scrollBarHandler_sdo = null;
			
			self.mainBackgroundColor_str = null;
			self.scrollBarHandlerColor = null;
			self.scrollBarTrackColor = null;
			self.scrollBarTrackOpacity = null;
			
			parent = null;
			data = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDDescriptionWindow.prototype = null;
			
		};
	
		self.init();
	};
	
	/* set prototype */
	FWDDescriptionWindow.setPrototype = function(){
		FWDDescriptionWindow.prototype = new FWDDisplayObject("div");
	};
	
	FWDDescriptionWindow.HIDE_COMPLETE = "hideComplete";
	FWDDescriptionWindow.SHOW_START = "showStart";
	
	FWDDescriptionWindow.prototype = null;
	window.FWDDescriptionWindow = FWDDescriptionWindow;
}(window));