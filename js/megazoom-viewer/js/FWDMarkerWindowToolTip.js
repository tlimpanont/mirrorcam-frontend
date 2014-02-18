/* FWDMarkerWindowToolTip */
(function (window){
var FWDMarkerWindowToolTip = function(
			parent,
			pointerDown_img,
			htmlContent,
			buttonToolTipTopPointer_str,
			buttonToolTipBottomPointer_str,
			maxWidth
		){
		
		var self = this;
		var prototype = FWDMarkerWindowToolTip.prototype;
		
		this.pointerUp_img;
		this.pointerDown_img;
		
		this.text_sdo = null;
		this.pointerUp_sdo = null;
		this.pointerDown_sdo = null;
	
		this.bottomPointer_str = buttonToolTipBottomPointer_str;
		this.topPointer_str = buttonToolTipTopPointer_str;
		this.pointerPosition_str;
		this.toolTipLabel_str;
		this.htmlContent_el = htmlContent;
	
		this.totalHeight = 0;
		this.pointerWidth = pointerDown_img.width;
		this.pointerHeight = pointerDown_img.height;
		this.totalWidth;
		this.maxWidth = maxWidth;
		
		this.hideId_to;
		
		this.isMobile_bl = FWDUtils.isMobile;
		this.isShowed_bl = true;
		this.hasLabel_bl = false;
	
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setOverflow("visible");
			//self.setBackfaceVisibility();
			self.setupMainContainers();
			self.setLabel();
			self.setX(-1000);
			self.hideId_to = setTimeout(self.hide, 1000);
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){	

			self.text_sdo = new FWDSimpleDisplayObject("div");
			self.text_sdo.setBackfaceVisibility();
			self.text_sdo.getStyle().fontSmoothing = "antialiased";
			self.text_sdo.getStyle().webkitFontSmoothing = "antialiased";
			self.text_sdo.getStyle().textRendering = "optimizeLegibility";	
			self.addChild(self.text_sdo);
			
			self.pointerUp_img = new Image();
			self.pointerUp_img.src = self.topPointer_str;
			self.pointerUp_sdo = new FWDSimpleDisplayObject("img");
			self.pointerUp_sdo.setScreen(self.pointerUp_img);
			self.pointerUp_sdo.setWidth(self.pointerWidth);
			self.pointerUp_sdo.setHeight(self.pointerHeight);
			self.pointerUp_sdo.setVisible(false);
			self.addChild(self.pointerUp_sdo);
				
			self.pointerDown_img = new Image();
			self.pointerDown_img.src = self.bottomPointer_str;
			self.pointerDown_sdo = new FWDSimpleDisplayObject("img");
			self.pointerDown_sdo.setScreen(self.pointerDown_img);
			self.pointerDown_sdo.setWidth(self.pointerWidth);
			self.pointerDown_sdo.setHeight(self.pointerHeight);
			self.pointerDown_sdo.setVisible(false);
			self.addChild(self.pointerDown_sdo);
		};
		
		//##########################################//
		/* set label */
		//##########################################//
		self.setLabel = function(){
			if(self == null) return;
			self.maxWidth = maxWidth;
		
			self.text_sdo.setInnerHTML(self.htmlContent_el);
			
			setTimeout(function(){
				if(self == null) return;
				self.totalWidth = self.text_sdo.getWidth();
				self.totalHeight = self.text_sdo.getHeight() + self.pointerHeight;
				self.setHeight(self.totalHeight - self.pointerHeight);
				self.hasLabel_bl = true;
				},71);
		};
		
		self.positionPointer = function(offsetX, position){
			var finalX = 0;
			var finalY = 0;
	
			if(!offsetX) offsetX = 0;
			
			finalX = parseInt((self.totalWidth - self.pointerWidth)/2) + offsetX;
			if(finalX < 0) finalX = 0;
			if(position == FWDMarkerWindowToolTip.POINTER_DOWN){
				finalY = self.totalHeight - self.pointerHeight - 1;
				self.pointerDown_sdo.setX(finalX);
				self.pointerDown_sdo.setY(finalY);
			}else{
				finalY = - self.pointerHeight + 1;
				self.pointerUp_sdo.setX(finalX);
				self.pointerUp_sdo.setY(finalY);
			}
		};
		
		//##########################################//
		/* show / hide*/
		//##########################################//
		self.show = function(){
			if(self.isShowed_bl || !self.hasLabel_bl) return;
			parent.addChild(self);
			
			if(self.isMobile_bl){
				self.setAlpha(1);
			}else{
				if(FWDUtils.isIEAndLessThen9){
					
				}else{
					self.setAlpha(0);
					TweenMax.killTweensOf(self);
					TweenMax.to(self, .6, {alpha:1, delay:.1, ease:Quart.easeOut});
				}
			}
			
			self.isShowed_bl = true;
		};
		
		self.hide = function(){
			if(!self.isShowed_bl || !self.hasLabel_bl) return;
			TweenMax.killTweensOf(self);
			//;
			try{
				parent.removeChild(self);
			}catch(e){}
			//self.text_sdo.setInnerHTML("");
			self.isShowed_bl = false;
		};
		
		//##############################//
		/* destroy */
		//##############################//
		self.destroy = function(){
			
			clearTimeout(self.hideId_to);
			TweenMax.killTweensOf(self);
			
			self.text_sdo.destroy();
			self.pointerUp_sdo.destroy();
			self.pointerDown_sdo.destroy();
		
			self.text_sdo = null;
			self.pointerUp_sdo = null;
			self.pointerDown_sdo = null;
		
			self.pointerUp_img = null;
			self.pointerDown_img = null;
			self.bottomPointer_str = null;
			self.topPointer_str = null;
			self.pointerPosition_str = null;
			self.toolTipLabel_str = null;
			
			parent = null;
			pointerDown_img = null;
			buttonToolTipTopPointer_str = null;
			buttonToolTipBottomPointer_str = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDMarkerWindowToolTip.prototype = null;
		};
	
		self.init();
	};
	
	/* set prototype */
	FWDMarkerWindowToolTip.setPrototype = function(){
		FWDMarkerWindowToolTip.prototype = null;
		FWDMarkerWindowToolTip.prototype = new FWDDisplayObject("div");
	};
	
	FWDMarkerWindowToolTip.POINTER_UP = "pointerUp";
	FWDMarkerWindowToolTip.POINTER_DOWN = "pointerDown";
	FWDMarkerWindowToolTip.CLICK = "onClick";
	FWDMarkerWindowToolTip.MOUSE_DOWN = "onMouseDown";
	
	FWDMarkerWindowToolTip.prototype = null;
	window.FWDMarkerWindowToolTip = FWDMarkerWindowToolTip;
}(window));