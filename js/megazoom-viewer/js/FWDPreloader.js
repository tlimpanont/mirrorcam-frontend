/* Thumb */
(function (window){
	
	var FWDPreloader = function(
			parent,
			imageSource_img,
			segmentWidth,
			segmentHeight,
			totalSegments,
			animDelay,
			fontColor,
			backgroundColor
		){
		
		var self = this;
		var prototype = FWDPreloader.prototype;
		
		this.imageSource_img = imageSource_img;
		this.bk_do = null;
		this.mainAnimHolder_do = null;
		this.animHolder_do = null;
		this.imageAnimHolder_do = null;
		this.images_do = null;
		this.text_do = null;
		
		this.backgroundColor_str = backgroundColor;
		this.fontColor_str = fontColor;
		
		this.stageWidth;
		this.stageHeight;
		this.segmentWidth = segmentWidth;
		this.segmentHeight = segmentHeight;
		this.totalSegments = totalSegments;
		this.animDelay = animDelay || 300;
		this.count = 0;
		
		this.delayTimerId_int;

		this.isShowed_bl = false;
		this.allowResize_bl = true;
		
		//###################################//
		/* init */
		//###################################//
		self.init = function(){
			self.setupMainContainers();
			if(FWDUtils.isMobile){
				self.screen.addEventListener("touchstart", self.windowTouchStartHandler);
			};
		};
		
		self.windowTouchStartHandler = function(e){
			if(e.preventDefault) e.preventDefault();
		};
		
		//###################################//
		/* setup main containers. */
		//###################################//
		self.setupMainContainers = function(){
			
			self.bk_do = new FWDSimpleDisplayObject("div");
			self.bk_do.setBkColor(self.backgroundColor_str);
			self.bk_do.setAlpha(0);
			self.bk_do.setResizableSizeAfterParent();
			self.addChild(self.bk_do);
			
			self.mainAnimHolder_do = new FWDDisplayObject("div");
			self.mainAnimHolder_do.setOverflow("visible");
			self.mainAnimHolder_do.setWidth(300);
			self.mainAnimHolder_do.setHeight(300);
			self.addChild(self.mainAnimHolder_do);
			
			self.animHolder_do = new FWDDisplayObject("div");
			self.animHolder_do.setOverflow("visible");
			self.animHolder_do.setWidth(300);
			self.animHolder_do.setHeight(300);
			self.mainAnimHolder_do.addChild(self.animHolder_do);
			
			self.imageAnimHolder_do = new FWDDisplayObject("div");	
			self.imageAnimHolder_do.setWidth(self.segmentWidth);
			self.imageAnimHolder_do.setHeight(self.segmentHeight);
			self.animHolder_do.addChild(self.imageAnimHolder_do);
			
			self.images_do = new FWDSimpleDisplayObject("img");
			self.images_do.setScreen(self.imageSource_img);
			self.imageAnimHolder_do.addChild(self.images_do);
			
			self.text_do = new FWDSimpleDisplayObject("div");
			self.text_do.setDisplay("inline");
			self.text_do.getStyle().whiteSpace = "nowrap";
			self.text_do.getStyle().fontFamily = "Arial";
			self.text_do.getStyle().fontSize= "12px";
			self.text_do.getStyle().color = self.fontColor_str;
			self.text_do.getStyle().fontSmoothing = "antialiased";
			self.text_do.getStyle().webkitFontSmoothing = "antialiased";
			self.text_do.getStyle().textRendering = "optimizeLegibility";
			self.text_do.setY(self.segmentHeight + 2);
			self.animHolder_do.addChild(self.text_do);
		};
		
		//###################################//
		/* position and resize. */
		//###################################//
		self.positionAndResize = function(){
			if(parent.stageWidth == self.stageWidth && parent.stageHeight == self.stageHeight) return;
			if(!self.allowResize_bl) return;
			self.stageWidth = parent.stageWidth;
			self.stageHeight = parent.stageHeight;
			
			self.mainAnimHolder_do.setX(Math.round(self.stageWidth - self.segmentWidth)/2);
			self.mainAnimHolder_do.setY(Math.round((self.stageHeight - self.segmentHeight)/2) - 10);
			
			self.setWidth(self.stageWidth);
			self.setHeight(self.stageHeight);
		};
	
		//###################################//
		/* update text */
		//###################################//
		self.updateText = function(text){
			self.text_do.setInnerHTML(text);
			self.text_do.setX(Math.round((self.segmentWidth - self.text_do.getWidth())/2));
		};
		
		//###################################//
		/* start / stop preloader animation */
		//###################################//
		this.start = function(){
			clearInterval(this.delayTimerId_int);
			self.delayTimerId_int = setInterval(self.updatePreloader, self.animDelay);
		};
		
		this.stop = function(){
			clearInterval(self.delayTimerId_int);
		};
		
		this.updatePreloader = function(){
			self.count ++;
			if(self.count > self.totalSegments - 1) self.count = 0;
			var posX = self.count * self.segmentWidth;
			self.images_do.setX(-posX);
		};
		
		//###################################//
		/* show / hide preloader animation */
		//###################################//
		self.show = function(){
			TweenMax.killTweensOf(self.bk_do);
			TweenMax.to(self.bk_do, 1, {alpha:1});
			TweenMax.to(self.animHolder_do, .8, {y:0, ease:Expo.easeInOut});
			self.isShowed_bl = true;
		};
		
		self.hide = function(animate){
			
			if(self == null) return;
			TweenMax.killTweensOf(self);
			TweenMax.killTweensOf(self.animHolder_do);
			if(animate){
				self.allowResize_bl = false;
				TweenMax.to(self.bk_do, .8, {alpha:0, delay:.6, onComplete:self.onHideComplete});
				TweenMax.to(self.animHolder_do, .8, {y:self.stageHeight/2 +  self.segmentHeight, ease:Expo.easeInOut});
			}else{
				self.bk_do.setAlpha(0);
				self.animHolder_do.setY((-self.stageHeight/2) - self.segmentHeight);
			}
			self.isShowed_bl = false;
		};
		
		self.onHideComplete = function(){
			
			self.stop();
			self.dispatchEvent(FWDPreloader.HIDE_COMPLETE);
		};
		
		//###################################//
		/* destroy */
		//##################################//
		self.destroy = function(){
			self.stop();
			
			if(FWDUtils.isMobile){
				self.screen.removeEventListener("touchstart", self.windowTouchStartHandler);
			};
	
			TweenMax.killTweensOf(self);
			TweenMax.killTweensOf(self.bk_do);
			TweenMax.killTweensOf(self.animHolder_do);
			
			self.bk_do.destroy();
			self.mainAnimHolder_do.destroy();
			self.animHolder_do.destroy();
			self.imageAnimHolder_do.destroy();
			self.images_do.destroy();
			self.text_do.destroy();
			
			self.imageSource_img = null;
			self.bk_do = null;
			self.mainAnimHolder_do = null;
			self.animHolder_do = null;
			self.imageAnimHolder_do = null;
			self.images_do = null;
			self.text_do = null;
			
			self.backgroundColor_str = null;
			self.fontColor_str = null;
			
			self.init = null;
			self.setupMainContainers = null;
			self.positionAndResize = null;
			self.update = null;
			self.show = null;
			self.hide = null;
			self.onHideComplete = null;
			
			parent = null;
			imageSource_img = null;
			backgroundColor = null;
			fontColor = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			FWDPreloader.prototype = null;
		};
		
		self.init();
	};
	
	/* set prototype */
    FWDPreloader.setPrototype = function(){
    	FWDPreloader.prototype = new FWDDisplayObject("div");
    };
    
    FWDPreloader.HIDE_COMPLETE = "hideComplete";
    
    FWDPreloader.prototype = null;
	window.FWDPreloader = FWDPreloader;
}(window));