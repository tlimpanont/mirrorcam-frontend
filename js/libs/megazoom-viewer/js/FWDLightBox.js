/* FWDLightBox */
(function (window){
	
	var FWDLightBox = function(
			parent,
			mainBackgroundColor_str,
			holderBackgroundColor_str,
			lightBoxBackgroundOpacity,
			lightBoxWidth,
			lightBoxHeight
		){
		
		var self  = this;
		var prototype = FWDLightBox.prototype;

		this.mainLightBox_do = null;
		this.lightBoxBackground_sdo = null;
		this.lightBoxGridHolder_do = null;
		this.closeButton_do = null;
		
		this.mainBackgroundColor_str = mainBackgroundColor_str;
		this.holderBackgroundColor_str = holderBackgroundColor_str;
		
		this.lightBoxBackgroundOpacity = lightBoxBackgroundOpacity;
		this.lightBoxWidth = lightBoxWidth;
		this.lightBoxHeight = lightBoxHeight;
		
		this.setupButtonWithDelayId_to;
		
		this.isMobile_bl = FWDUtils.isMobile;
		this.hasPointerEvent_bl = FWDUtils.hasPointerEvent;
		this.closeButtonIsTweening_bl = true;
	
		this.init = function(){
			self.setupMainContainers();
		};
		
		//#############################################//
		/* setup main containers */
		//#############################################//
		this.setupMainContainers = function(){
			var viewportSize = FWDUtils.getViewportSize();
			var scrollOffsets = FWDUtils.getScrollOffsets();
			
			if(self.isMobile_bl && self.hasPointerEvent_bl) self.getStyle().msTouchAction = "none";
			
			self.setWidth(viewportSize.w);
			self.setHeight(viewportSize.h);
			self.setX(scrollOffsets.x);
			self.setY(scrollOffsets.y);
			
			self.lightBoxBackground_sdo = new FWDSimpleDisplayObject("div"); 
			self.lightBoxBackground_sdo.setResizableSizeAfterParent();
			self.lightBoxBackground_sdo.setBkColor(self.mainBackgroundColor_str);
			self.addChild(self.lightBoxBackground_sdo);
			
			self.mainLightBox_do = new FWDDisplayObject("div");
			//self.mainLightBox_do.getStyle().boxShadow = "0px 0px 5px #999999";
			self.mainLightBox_do.setBkColor(self.holderBackgroundColor_str);
			parent.stageContainer = self.mainLightBox_do.screen;
			self.addChild(self.mainLightBox_do);
			
			if(navigator.userAgent.toLowerCase().indexOf("msie 7") == -1){
				document.documentElement.appendChild(self.screen);
			}else{
				document.getElementsByTagName("body")[0].appendChild(self.screen);
			}
			
			self.lightBoxBackground_sdo.setAlpha(0);
			TweenMax.to(self.lightBoxBackground_sdo, 1, {delay:.1, alpha:self.lightBoxBackgroundOpacity});
			
			self.mainLightBox_do.setWidth(0);
			self.mainLightBox_do.setHeight(0);
			
			if(self.lightBoxWidth > viewportSize.w){
				self.finalLightBoxWidth = viewportSize.w;
				self.finalLightBoxHeight = parseInt(self.lightBoxHeight * (viewportSize.w/self.lightBoxWidth));
			}else{
				self.finalLightBoxWidth = self.lightBoxWidth;
				self.finalLightBoxHeight = self.lightBoxHeight;
			}
			
			
			self.mainLightBox_do.setX(parseInt(viewportSize.w/2));
			self.mainLightBox_do.setY(parseInt(viewportSize.h/2));
		
			TweenMax.to(self.mainLightBox_do, .8, {
				w:self.finalLightBoxWidth, 
				h:self.finalLightBoxHeight,
				x:parseInt((viewportSize.w - self.finalLightBoxWidth)/2),
				y:parseInt((viewportSize.h - self.finalLightBoxHeight)/2),
				delay:.8,
				ease:Expo.easeInOut});
			
		};
		
		//#############################################//
		/* setup lightbox close button */
		//#############################################//
		this.setupCloseButton = function(n_img, s_img){
			
			var viewportSize = FWDUtils.getViewportSize();
			FWDSimpleButton.setPrototype();
			self.closeButton_do = new FWDSimpleButton(n_img, s_img);
			self.closeButton_do.addListener(FWDSimpleButton.MOUSE_DOWN, self.closeButtonOnStartHandler);
			self.closeButton_do.getStyle().zIndex = 99999999;
			self.addChild(self.closeButton_do);
			
			var closeButtonFinalX = parseInt((viewportSize.w + self.finalLightBoxWidth)/2 - self.closeButton_do.totalWidth/2);
			var closeButtonFinalY = parseInt((viewportSize.h - self.finalLightBoxHeight)/2 - self.closeButton_do.totalHeight/2);
		
			if(closeButtonFinalX + self.closeButton_do.totalWidth > viewportSize.w){
				closeButtonFinalX = viewportSize.w - self.closeButton_do.totalWidth;
			}
			
			if(closeButtonFinalY < 0){
				closeButtonFinalY = 0;
			}
		
			self.closeButton_do.setX(viewportSize.w);
			self.closeButton_do.setY(closeButtonFinalY);
			
			
			TweenMax.to(self.closeButton_do, .9, {x:closeButtonFinalX, onComplete:self.showCloseButtonComplete, ease:Expo.easeInOut});
			
			if(self.isMobile_bl){
				if(!self.hasPointerEvent_bl){
					window.addEventListener("touchstart", self.mouseDummyHandler);
					window.addEventListener("touchmove", self.mouseDummyHandler);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener ("mousewheel", self.mouseDummyHandler);
					window.addEventListener('DOMMouseScroll', self.mouseDummyHandler);
				}else if(document.attachEvent){
					document.attachEvent("onmousewheel", self.mouseDummyHandler);
				}
			}
		};
		
		this.showCloseButtonComplete = function(){
			self.closeButtonIsTweening_bl = false;
		};
		
		this.mouseDummyHandler = function(e){
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}
		};
			
		this.closeButtonOnStartHandler = function(e){
			var viewportSize = FWDUtils.getViewportSize();
			self.closeButton_do.isDisabled_bl = true;
			TweenMax.to(self.closeButton_do, .9, {x:viewportSize.w, ease:Expo.easeInOut});
			
			TweenMax.to(self.mainLightBox_do, .8, {
				w:0, 
				h:0,
				x:parseInt(viewportSize.w/2),
				y:parseInt(viewportSize.h/2),
				delay:.4,
				ease:Expo.easeInOut});
			
			TweenMax.to(self.lightBoxBackground_sdo, .8, {alpha:0, delay:.8});
			self.lighboxAnimDoneId_to = setTimeout(self.lighboxHideAnimationDone, 1600);
			self.dispatchEvent(FWDLightBox.CLOSE);
		};
		
		this.lighboxHideAnimationDone = function(){
			self.dispatchEvent(FWDLightBox.HIDE_COMPLETE);
		};
		
		//#####################################//
		/* destroy */
		//####################################//
		self.destroy = function(){
			
			try{
				if(navigator.userAgent.toLowerCase().indexOf("msie 7") == -1){
					document.documentElement.removeChild(self.screen);
				}else{
					document.getElementsByTagName("body")[0].removeChild(self.screen);
				}
			}catch(e){}
			
			if(self.isMobile_bl){
				if(!self.hasPointerEvent_bl){
					window.removeEventListener("touchstart", self.mouseDummyHandler);
					window.removeEventListener("touchmove", self.mouseDummyHandler);
				}
			}else{
				if(window.removeEventListener){
					window.removeEventListener ("mousewheel", self.mouseDummyHandler);
					window.removeEventListener('DOMMouseScroll', self.mouseDummyHandler);
				}else if(document.detachEvent){
					document.detachEvent("onmousewheel", self.mouseDummyHandler);
				}
			}
			
			clearTimeout(self.lighboxAnimDoneId_to);
			
			if(self.lightBoxBackground_sdo){
				TweenMax.killTweensOf(self.lightBoxBackground_sdo);
				self.lightBoxBackground_sdo.destroy();
			}
			
			if(self.lightBoxGridHolder_do){
				TweenMax.killTweensOf(self.lightBoxGridHolder_do);
				self.lightBoxGridHolder_do.destroy();
			}
			
			if(self.closeButton_do){
				TweenMax.killTweensOf(self.closeButton_do);
				self.closeButton_do.destroy();
			}
			
			self.mainLightBox_do = null;
			self.lightBoxBackground_sdo = null;
			self.lightBoxGridHolder_do = null;
			self.closeButton_do = null;
			
			self.mainBackgroundColor_str = null;
			self.holderBackgroundColor_str = null;
			
			parent = null;
			mainBackgroundColor_str = null;
			holderBackgroundColor_str = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDLightBox.prototype = null;
		};
	
		this.init();
	};
	
	/* set prototype */
    FWDLightBox.setPrototype = function(){
    	FWDLightBox.prototype = new FWDDisplayObject("div");
    };
    
    FWDLightBox.CLOSE = "ligtBoxClose";
    FWDLightBox.HIDE_COMPLETE = "hideComplete";
    
    FWDLightBox.prototype = null;
	window.FWDLightBox = FWDLightBox;
}(window));