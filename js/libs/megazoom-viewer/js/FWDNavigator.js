/* FWDNavigator */
(function (window){
var FWDNavigator = function(parent, data){
		
		var self = this;
		var prototype = FWDNavigator.prototype;
		
		this.hider = null;
		this.mainHolder_do = null;
		this.mainImagesHolder_do = null;
		this.smallImage_sdo = null;
		this.border_sdo = null;
		this.handler_sdo = null;
		this.dumy_sdo = null;
		
		this.image_img = data.navigatorImage_img;

		this.borderColor_str = data.navigatorBorderColor_str;
		this.handlerColor_str = data.navigatorHandlerColor_str;
		this.handMovePath_str =  data.handMovePath_str;
		this.handGrabPath_str =  data.handGrabPath_str;
		this.navigatorPosition_str = data.navigatorPosition_str;
	
		this.stageWidth;
		this.stageHeight;
		this.totalWidth = data.navigatorWidth;
		this.totalHeight = data.navigatorHeight;
		this.offsetX = data.navigatorOffsetX;
		this.offsetY = data.navigatorOffsetY;
		this.finalWidth;
		this.finalHeight;
		this.finalX; 
		this.finalY;
		this.xPositionOnPress;
		this.yPositionOnPress;
		this.lastPresedX;
		this.lastPresedY;
		
		this.tweenCompleteId_to;
	
		this.isShowed_bl = true;
		this.isTweening_bl = false;
		this.isDragging_bl = false;
		this.isMobile_bl = FWDUtils.isMobile;
		this.hasPointerEvent_bl = FWDUtils.hasPointerEvent;
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setOverflow("visible");
			self.setSelectable(false);
			self.setupMainContiners();
			self.setupImageSdo();
			self.hide();
			self.resizeAndPosition();
			self.handler_sdo.screen.style.cursor = 'url(' + self.handMovePath_str + '), default';
		};
		
		self.activate = function(){
			self.addPannSupport();
			//self.screen.onmousedown = function(){self.dispatchEvent(FWDNavigator.PAN_START);};
			//if(FWDUtils.isIEAndLessThen9) self.handler_sdo.screen.onmousedown = function(){self.dispatchEvent(FWDNavigator.PAN_START);};
		};
		
		//##########################################//
		/* resize and position */
		//##########################################//
		self.resizeAndPosition = function(){
			self.stageWidth = parent.stageWidth;
			self.stageHeight = parent.stageHeight;
			if(self.navigatorPosition_str == FWDNavigator.TOP_LEFT){
				self.setX(self.offsetX);
				self.setY(self.offsetY);
			}else if(self.navigatorPosition_str == FWDNavigator.TOP_RIGHT){
				self.setX(self.stageWidth - self.totalWidth - self.offsetX);
				self.setY(self.offsetY);
			}else if(self.navigatorPosition_str == FWDNavigator.BOTTOM_LEFT){
				self.setX(self.offsetX);
				self.setY(self.stageHeight - self.totalHeight - self.offsetY);
			}else if(self.navigatorPosition_str == FWDNavigator.BOTTOM_RIGHT){
				self.setX(self.stageWidth - self.totalWidth - self.offsetX);
				self.setY(self.stageHeight - self.totalHeight - self.offsetY);
			}
		};
		
		self.setupHider = function(hider){
			//self.hider = hider;
			//self.hider.addListener(FWDHider.HIDE, self.onHiderHide);
		};
		
		self.onHiderHide = function(){
			//if(FWDUtils.hitTest(self.mainHolder_do.screen, self.hider.globalX, self.hider.globalY)) self.hider.reset();
		};
		
		//###########################################//
		//Setup main containers
		//###########################################//
		self.setupMainContiners = function(){
			self.mainHolder_do = new FWDDisplayObject("div", "absolute", "visible");
			self.mainHolder_do.setWidth(self.totalWidth);
			self.mainHolder_do.setHeight(self.totalHeight);
			self.addChild(self.mainHolder_do);
			
			self.mainImagesHolder_do =  new FWDDisplayObject("div", "absolute", "visible");
			self.smallImage_sdo = new FWDSimpleDisplayObject("img");
			self.mainHolder_do.addChild(self.mainImagesHolder_do);
			
			self.border_sdo = new FWDSimpleDisplayObject("div");
			self.border_sdo.setWidth(self.totalWidth - 2);
			self.border_sdo.setHeight(self.totalHeight - 2);
			self.border_sdo.getStyle().borderStyle = "solid";
			self.border_sdo.getStyle().borderWidth = "1px";
			self.border_sdo.getStyle().borderColor = self.borderColor_str;
			self.mainHolder_do.addChild(self.border_sdo);

			
			self.handler_sdo = new FWDSimpleDisplayObject("div");
			self.handler_sdo.setWidth(self.totalWidth - 2);
			self.handler_sdo.setHeight(self.totalHeight - 2);
			self.handler_sdo.getStyle().borderStyle = "solid";
			self.handler_sdo.getStyle().borderWidth = "1px";
			if(FWDUtils.isIE) self.handler_sdo.getStyle().background = "url('dumy')";
			self.handler_sdo.getStyle().borderColor = self.handlerColor_str;
			self.mainHolder_do.addChild(self.handler_sdo);
		};
		
		//##########################################//
		/* Setup images sdo */
		//##########################################//
		self.setupImageSdo = function(start){
			self.smallImage_sdo = new FWDSimpleDisplayObject("img");
			self.smallImage_sdo.setScreen(self.image_img);
			self.mainImagesHolder_do.addChild(self.smallImage_sdo);
		};
		
		//########################################//
		/* update navigator dragger */
		//########################################//
		self.update = function(percentX, percentY, percentWidth, percentHeight, animate){
			
			if(percentWidth > 1) percentWidth = 1;
			if(percentHeight > 1) percentHeight = 1;
			if(percentX > 1) percentX = 1;
			if(percentY > 1) percentY = 1;
			
			if(isNaN(percentX)) percentX = 0;
			if(isNaN(percentY)) percentY = 0;
			
			self.finalWidth = Math.round(percentWidth * (self.totalWidth -4));
			self.finalHeight = Math.round(percentHeight * (self.totalHeight-4));
			
			self.finalX = Math.round((percentX * ((self.totalWidth - 2) - self.finalWidth))); 
			if(self.finalX < 1){
				self.finalX = 1;
			}else if(self.finalX >= self.totalWidth - 3 - self.finalWidth){
				self.finalX = self.totalWidth - 3 - self.finalWidth;
			}
			
			self.finalY = Math.round((percentY * ((self.totalHeight - 2) - self.finalHeight)));
			if(self.finalY < 1){
				self.finalY = 1;
			}else if(self.finalY >= self.totalHeight - 3 - self.finalHeight){
				self.finalY = self.totalHeight - 3 - self.finalHeight;
			}
			
			clearTimeout(self.tweenCompleteId_to);
			
			if(animate){
				self.isTweening_bl = true;
				self.tweenCompleteId_to = setTimeout(function(){if(self == null) return; self.isTweening_bl = false;}, 200);
				TweenMax.killTweensOf(self.handler_sdo);
				TweenMax.to(self.handler_sdo, .2, {x:self.finalX, y:self.finalY, w:self.finalWidth, h:self.finalHeight});
			}else{
				self.isTweening_bl = false;
				TweenMax.killTweensOf(self.handler_sdo);
				self.handler_sdo.setX(self.finalX);
				self.handler_sdo.setY(self.finalY);
				self.handler_sdo.setWidth(self.finalWidth);
				self.handler_sdo.setHeight(self.finalHeight);
			}
		};
		
		//###############################################//
		//Add touch pann support
		//###############################################//
		self.addPannSupport = function(){
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.handler_sdo.screen.addEventListener("MSPointerDown", self.panStartHandler);
				}else{
					self.handler_sdo.screen.addEventListener("touchstart", self.panStartHandler);
				}	
			}else if(self.handler_sdo.screen.addEventListener){
				self.handler_sdo.screen.addEventListener("mousedown", self.panStartHandler);
			}else if(self.handler_sdo.screen.attachEvent){
				self.handler_sdo.screen.attachEvent("onmousedown", self.panStartHandler);
			}
		};
		
		self.panStartHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			if(self.isTweening_bl) return;
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);		
			self.isDragging_bl = true;
			self.xPositionOnPress = self.handler_sdo.getX();
			self.yPositionOnPress = self.handler_sdo.getY();
			self.lastPresedX = viewportMouseCoordinates.screenX;
			self.lastPresedY = viewportMouseCoordinates.screenY;
	
			self.dispatchEvent(FWDNavigator.PAN_START);
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.addEventListener("MSPointerMove", self.panMoveHandler);
					window.addEventListener("MSPointerUp", self.panEndHandler);
				}else{
					window.addEventListener("touchmove", self.panMoveHandler);
					window.addEventListener("touchend", self.panEndHandler);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener("mousemove", self.panMoveHandler);
					window.addEventListener("mouseup", self.panEndHandler);	
				}else if(document.attachEvent){
					document.attachEvent("onmousemove", self.panMoveHandler);
					document.attachEvent("onmouseup", self.panEndHandler);
				}
			}
		};
		
		self.panMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			if(e.touches && e.touches.length != 1) return;
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);	
	
			self.finalX = Math.round(self.xPositionOnPress + viewportMouseCoordinates.screenX - self.lastPresedX);
			if(self.finalX < 1){
				self.finalX = 1;
			}else if(self.finalX >= self.totalWidth - 3 - self.finalWidth){
				self.finalX = self.totalWidth - 3 - self.finalWidth;
			}
			self.handler_sdo.setX(self.finalX);
		
	
			self.finalY = Math.round(self.yPositionOnPress + viewportMouseCoordinates.screenY - self.lastPresedY);
			if(self.finalY < 1){
				self.finalY = 1;
			}else if(self.finalY >= self.totalHeight - 3 - self.finalHeight){
				self.finalY = self.totalHeight - 3 - self.finalHeight;
			}
			self.handler_sdo.setY(self.finalY);
			
			self.dispatchEvent(FWDNavigator.PAN,
					{percentX:self.finalX/(self.totalWidth - 2 - self.finalWidth),
					percentY:self.finalY/(self.totalHeight - 2 - self.finalHeight)
				});
		};
		
		self.panEndHandler = function(e){
			self.isDragging_bl = false;
			self.dispatchEvent(FWDNavigator.PAN_END);
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.removeEventListener("MSPointerMove", self.panMoveHandler);
					window.removeEventListener("MSPointerUp", self.panEndHandler);
				}else{
					window.removeEventListener("touchmove", self.panMoveHandler);
					window.removeEventListener("touchend", self.panEndHandler);
				}
			}else{
				if(window.removeEventListener){
					window.removeEventListener("mousemove", self.panMoveHandler);
					window.removeEventListener("mouseup", self.panEndHandler);	
				}else if(document.detachEvent){
					document.detachEvent("onmousemove", self.panMoveHandler);
					document.detachEvent("onmouseup", self.panEndHandler);
				}
			}
		};
		
		//##########################################//
		/* show / hide*/
		//##########################################//
		self.show = function(animate){
			if(self.isShowed_bl) return;
			self.resizeAndPosition();
			
			if(animate){
				TweenMax.to(self.mainHolder_do, 1, {y:0, ease:Expo.easeInOut});
			}else{
				TweenMax.killTweensOf(self.mainHolder_do);
				self.mainHolder_do.setY(0);
			}
			
			self.isShowed_bl = true;
		};
		
		self.hide = function(animate){
			if(!self.isShowed_bl) return;
			if(self.navigatorPosition_str == FWDNavigator.TOP_LEFT || self.navigatorPosition_str == FWDNavigator.TOP_RIGHT){
				if(animate){
					TweenMax.to(self.mainHolder_do, 1, {y:-self.totalHeight - self.offsetY, ease:Expo.easeInOut});
					self.update(1,1,1,1,true);
				}else{
					TweenMax.killTweensOf(self.mainHolder_do);
					self.mainHolder_do.setY(-self.totalHeight - self.offsetY);
				}
			}else if(self.navigatorPosition_str == FWDNavigator.BOTTOM_LEFT || self.navigatorPosition_str == FWDNavigator.BOTTOM_RIGHT){
				if(animate){
					TweenMax.to(self.mainHolder_do, 1, {y:self.totalHeight + self.offsetY, ease:Expo.easeInOut});
					self.update(1,1,1,1,true);
				}else{
					TweenMax.killTweensOf(self.mainHolder_do);
					self.mainHolder_do.setY(self.totalHeight + self.offsetY);
				}
			}
			self.isShowed_bl = false;
		};
		
		//#####################################//
		/* clean main events */
		//#####################################//
		self.cleanMainEvents = function(){
			
			if(self.isMobile_bl){
				self.handler_sdo.screen.removeEventListener("touchstart", self.panStartHandler);
				self.handler_sdo.screen.addEventListener("MSPointerDown", self.panStartHandler);
				window.removeEventListener("touchmove", self.panMoveHandler);
				window.removeEventListener("touchend", self.panEndHandler);
				window.removeEventListener("MSPointerMove", self.panMoveHandler);
				window.removeEventListener("MSPointerUp", self.panEndHandler);
			}else if(self.handler_sdo.screen.removeEventListener){
				self.handler_sdo.screen.removeEventListener("mousedown", self.panStartHandler);
				window.removeEventListener("mousemove", self.panMoveHandler);
				window.removeEventListener("mouseup", self.panEndHandler);	
			}else if(self.handler_sdo.screen.detachEvent){
				self.handler_sdo.screen.detachEvent("onmousedown", self.panStartHandler);
				document.detachEvent("onmousemove", self.panMoveHandler);
				document.detachEvent("onmouseup", self.panEndHandler);
			}
			self.screen.onmousedown = null;
			self.handler_sdo.screen.onmousedown = null;
			
			clearTimeout(self.tweenCompleteId_to);
		};
		
		//##############################//
		/* destroy */
		//##############################//
		self.destroy = function(){
			self.cleanMainEvents();
			
			if(self.hider){
				self.hider.removeListener(FWDHider.HIDE, self.onHiderHide);
			};
			
			TweenMax.killTweensOf(self.mainHolder_do);
			self.mainHolder_do.destroy();
			
			TweenMax.killTweensOf(self.handler_sdo);
			self.handler_sdo.destroy();
			
			self.mainImagesHolder_do.destroy();
			if(self.dumy_sdo) self.dumy_sdo.destroy();
			
			self.hider = null;
			self.mainHolder_do = null;
			self.mainImagesHolder_do = null;
			self.smallImage_sdo = null;
			self.handler_sdo = null;
			self.dumy_sdo = null;
			
			self.images_ar = data.navigatorImages_ar;
			
			self.borderColor_str = null;
			self.handlerColor_str = null;
			self.handMovePath_str = null;
			self.handGrabPath_str = null;
			self.navigatorPosition_str = null;
			
			data = null;
			parent = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDNavigator.prototype = null;
		};
	
		self.init();
	};
	
	/* set prototype */
	FWDNavigator.setPrototype = function(){
		FWDNavigator.prototype = new FWDDisplayObject("div");
	};
	
	FWDNavigator.TOP_LEFT = "topleft";
	FWDNavigator.TOP_RIGHT = "topright";
	FWDNavigator.BOTTOM_LEFT = "bottomleft";
	FWDNavigator.BOTTOM_RIGHT = "bottomright";
	FWDNavigator.PAN_START = "panStart";
	FWDNavigator.PAN_END = "panEnd";
	FWDNavigator.PAN = "pan";
	
	
	FWDNavigator.prototype = null;
	window.FWDNavigator = FWDNavigator;
}(window));