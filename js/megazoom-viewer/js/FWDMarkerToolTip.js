/* FWDMarkerToolTip */
(function (window){
var FWDMarkerToolTip = function(
			leftImage_img,
			pointerDown_img,
			leftImagePath_str, 
			middleImagePath_str,
			rightImagePath_str,
			buttonToolTipFontColor_str,
			buttonToolTipTopPointer_str,
			buttonToolTipBottomPointer_str
		){
		
		var self = this;
		var prototype = FWDMarkerToolTip.prototype;
		
		self.pointerUp_img;
		self.pointerDown_img;
		
		self.left_sdo = null;
		self.middle_sdo = null;
		self.right_sdo = null;
		self.text_sdo = null;
		self.pointerUp_sdo = null;
		self.pointerDown_sdo = null;
		
		self.leftImagePath_str = leftImagePath_str;
		self.middleImagePath_str = middleImagePath_str;
		self.rightImagePath_str = rightImagePath_str;
		self.fontColor_str = buttonToolTipFontColor_str;
		self.bottomPointer_str = buttonToolTipBottomPointer_str;
		self.topPointer_str = buttonToolTipTopPointer_str;
		self.pointerPosition_str;
		self.toolTipLabel_str;
		
		self.marginWidth = leftImage_img.width;
		self.totalHeight = leftImage_img.height;
		self.pointerWidth = pointerDown_img.width;
		self.pointerHeight = pointerDown_img.height;
		self.totalWidth;
		
		self.isMobile_bl = FWDUtils.isMobile;
		self.isShowed_bl = true;
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setOverflow("visible");
			self.setWidth(300);
			self.setupMainContainers();
			self.hide();
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){	
			
			var img;
			
			self.left_sdo = new FWDSimpleDisplayObject("img");
			img = new Image();
			img.src = self.leftImagePath_str;
			self.left_sdo.setScreen(img);
			self.left_sdo.setWidth(self.marginWidth);
			self.left_sdo.setHeight(self.totalHeight);
			self.addChild(self.left_sdo);
			
			self.middle_sdo = new FWDSimpleDisplayObject("img");
			img = new Image();
			img.src = self.middleImagePath_str;
			self.middle_sdo.setScreen(img);
			self.middle_sdo.setX(self.marginWidth);
			self.middle_sdo.setWidth(self.marginWidth);
			self.middle_sdo.setHeight(self.totalHeight);
			self.addChild(self.middle_sdo);
			
			self.right_sdo = new FWDSimpleDisplayObject("img");
			img = new Image();
			img.src = self.rightImagePath_str;
			self.right_sdo.setScreen(img);
			self.right_sdo.setWidth(self.marginWidth);
			self.right_sdo.setHeight(self.totalHeight);
			self.addChild(self.right_sdo);	
	
			self.text_sdo = new FWDSimpleDisplayObject("div");
			self.text_sdo.setBackfaceVisibility();
			self.text_sdo.setDisplay("inline-block");
			self.text_sdo.getStyle().fontFamily = "Arial";
			self.text_sdo.getStyle().fontSize= "12px";
			self.text_sdo.setHeight(20);
			self.text_sdo.getStyle().color = self.fontColor_str;
			self.text_sdo.getStyle().fontSmoothing = "antialiased";
			self.text_sdo.getStyle().webkitFontSmoothing = "antialiased";
			self.text_sdo.getStyle().textRendering = "optimizeLegibility";	
			self.text_sdo.setX(self.marginWidth);
		
			if(FWDUtils.isIEAndLessThen9 || FWDUtils.isSafari){
				self.text_sdo.setY(parseInt((self.totalHeight - 8)/2) - 2);
			}else{
				self.text_sdo.setY(parseInt((self.totalHeight - 8)/2) - 1);
			}
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
			
			self.totalHeight += self.pointerHeight;
		};
		
		//##########################################//
		/* set label */
		//##########################################//
		self.setLabel = function(label){
			if(self == null) return;
			if(!self.middle_sdo) return;
			self.text_sdo.setInnerHTML(label);
			setTimeout(function(){
				self.middle_sdo.setWidth(self.text_sdo.screen.offsetWidth);
				self.right_sdo.setX(self.text_sdo.screen.offsetWidth + self.marginWidth);
				self.totalWidth = (self.marginWidth * 2) + self.text_sdo.screen.offsetWidth;
				},50);
			
		};
		
		self.positionPointer = function(offsetX, position){
			var finalX = 0;
			var finalY = 0;
	
			if(!offsetX) offsetX = 0;
			
			finalX = parseInt((self.totalWidth - self.pointerWidth)/2) + offsetX;
			if(finalX < 0) finalX = 0;
			if(position == FWDMarkerToolTip.POINTER_DOWN){
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
			if(self.isShowed_bl) return;
			TweenMax.to(self, .4, {alpha:1, delay:.1, ease:Quart.easeOut});
			self.isShowed_bl = true;
		};
		
		self.hide = function(){
			if(!self.isShowed_bl) return;
			TweenMax.killTweensOf(self);
			self.setX(-5000);
			self.setAlpha(0);
			self.isShowed_bl = false;
		};
		
		//##############################//
		/* destroy */
		//##############################//
		self.destroy = function(){
			TweenMax.killTweensOf(self);
			
			self.pointerUp_img = null;
			self.pointerDown_img = null;
			
			self.left_sdo.destroy();
			self.middle_sdo.destroy();
			self.right_sdo.destroy();
			self.text_sdo.destroy();
			self.pointerDown_sdo.destroy();
			
			self.leftImagePath_str = null;
			self.middleImagePath_str = null;
			self.rightImagePath_str = null;
			self.fontColor_str = null;
			self.bottomPointer_str = null;
			self.topPointer_str = null;
			self.pointerPosition_str = null;
			self.toolTipLabel_str = null;
			
			self.left_sdo = null;
			self.middle_sdo = null;
			self.right_sdo = null;
			self.text_sdo = null;
			self.pointerUp_sdo = null;
			self.pointerDown_sdo = null;
			
			leftImage_img = null;
			pointerDown_img = null;
			leftImagePath_str = null; 
			middleImagePath_str = null;
			rightImagePath_str = null;
			buttonToolTipFontColor_str = null;
			buttonToolTipTopPointer_str = null;
			buttonToolTipBottomPointer_str = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDMarkerToolTip.prototype = null;
		};
	
		self.init();
	};
	
	/* set prototype */
	FWDMarkerToolTip.setPrototype = function(){
		FWDMarkerToolTip.prototype = new FWDDisplayObject("div");
	};
	
	FWDMarkerToolTip.POINTER_UP = "pointerUp";
	FWDMarkerToolTip.POINTER_DOWN = "pointerDown";
	FWDMarkerToolTip.CLICK = "onClick";
	FWDMarkerToolTip.MOUSE_DOWN = "onMouseDown";
	
	FWDMarkerToolTip.prototype = null;
	window.FWDMarkerToolTip = FWDMarkerToolTip;
}(window));