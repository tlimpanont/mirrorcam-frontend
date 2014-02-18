/* FWDButtonToolTip */
(function (window){
var FWDButtonToolTip = function(
			leftImage_img,
			pointer_img,
			toolTipLabel_str,
			toolTipLabel2_str,
			leftImagePath_str, 
			middleImagePath_str,
			rightImagePath_str,
			buttonToolTipFontColor_str,
			pointerPosition_str,
			buttonToolTipTopPointer_str,
			buttonToolTipBottomPointer_str
		){
		
		var self = this;
		var prototype = FWDButtonToolTip.prototype;
		
		self.pointer_img;
		
		self.left_sdo = null;
		self.middle_sdo = null;
		self.right_sdo = null;
		self.text_sdo = null;
		self.pointer_sdo = null;
		
		self.leftImagePath_str = leftImagePath_str;
		self.middleImagePath_str = middleImagePath_str;
		self.rightImagePath_str = rightImagePath_str;
		self.fontColor_str = buttonToolTipFontColor_str;
		self.bottomPointer_str = buttonToolTipBottomPointer_str;
		self.topPointer_str = buttonToolTipTopPointer_str;
		self.pointerPosition_str = pointerPosition_str;
		self.toolTipLabel_str = toolTipLabel_str;
		self.toolTipLabel2_str = toolTipLabel2_str;
		
		self.marginWidth = leftImage_img.width;
		self.totalHeight = leftImage_img.height;
		self.pointerWidth = pointer_img.width;
		self.pointerHeight = pointer_img.height;
		self.totalWidth;
		
		self.hideWithDelayId_do;
	
		self.isMobile_bl = FWDUtils.isMobile;
		self.isShowed_bl = true;
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setOverflow("visible");
			self.setWidth(200);
			self.setupMainContainers();
			self.setLabel(self.toolTipLabel_str);
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
			
			self.pointer_img = new Image();
			if(self.pointerPosition_str ==  FWDController.POSITION_BOTTOM){
				self.pointer_img.src = self.bottomPointer_str;
			}else{
				self.pointer_img.src = self.topPointer_str;
			}
			self.pointer_sdo = new FWDSimpleDisplayObject("img");
			self.pointer_sdo.setScreen(self.pointer_img);
			self.pointer_sdo.setWidth(self.pointerWidth);
			self.pointer_sdo.setHeight(self.pointerHeight);
			self.addChild(self.pointer_sdo);
		};
		
		//##########################################//
		/* set label */
		//##########################################//
		self.setLabel = function(label){
			if(self == null) return;
			if(!self.middle_sdo) return;
			self.text_sdo.setInnerHTML(label);
			setTimeout(function(){
				if(self == null) return;
				self.middle_sdo.setWidth(self.text_sdo.screen.offsetWidth);
				self.right_sdo.setX(self.text_sdo.screen.offsetWidth + self.marginWidth);
				self.totalWidth = (self.marginWidth * 2) + self.text_sdo.screen.offsetWidth;
				self.positionPointer(0);
				},50);
			
		};
		
		self.positionPointer = function(offsetX){
			var finalX;
			var finalY;
			
			if(!offsetX) offsetX = 0;
			
			finalX = parseInt((self.totalWidth - self.pointerWidth)/2) + offsetX;
			if(self.pointerPosition_str == FWDController.POSITION_BOTTOM){
				finalY = self.totalHeight - 1;
			}else{
				finalY = - self.pointerHeight + 1;
			}
		
			self.pointer_sdo.setX(finalX);
			self.pointer_sdo.setY(finalY);
		};
		
		//##########################################//
		/* show / hide*/
		//##########################################//
		self.show = function(){
			if(self.isShowed_bl) return;
			clearInterval(self.hideWithDelayId_do);
			self.positionPointer();
			self.setVisible(true);
			TweenMax.killTweensOf(self);
			self.setAlpha(0);
			TweenMax.to(self, .4, {alpha:1, delay:.1, ease:Quart.easeOut});
			
			self.isShowed_bl = true;
		};
		
		self.hide = function(){
			if(!self.isShowed_bl) return;
			TweenMax.killTweensOf(self);
			//self.setX(-5000);
			//self.setAlpha(0);
			self.setVisible(false);
			self.isShowed_bl = false;
		};
		
		//##############################//
		/* destroy */
		//##############################//
		self.destroy = function(){
			TweenMax.killTweensOf(self);
			
			self.pointer_img = null;
			
			self.left_sdo.destroy();
			self.middle_sdo.destroy();
			self.right_sdo.destroy();
			self.text_sdo.destroy();
			self.pointer_sdo.destroy();
			
			self.leftImagePath_str = null;
			self.middleImagePath_str = null;
			self.rightImagePath_str = null;
			self.fontColor_str = null;
			self.bottomPointer_str = null;
			self.topPointer_str = null;
			self.pointerPosition_str = null;
			self.toolTipLabel_str = null;
			self.toolTipLabel2_str = null;
			
			self.left_sdo = null;
			self.middle_sdo = null;
			self.right_sdo = null;
			self.text_sdo = null;
			self.pointer_sdo = null;
			
			leftImage_img = null;
			pointer_img = null;
			toolTipLabel_str = null;
			toolTipLabel2_str = null;
			leftImagePath_str = null; 
			middleImagePath_str = null;
			rightImagePath_str = null;
			buttonToolTipFontColor_str = null;
			pointerPosition_str = null;
			buttonToolTipTopPointer_str = null;
			buttonToolTipBottomPointer_str = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDButtonToolTip.prototype = null;
		};
	
		self.init();
	};
	
	/* set prototype */
	FWDButtonToolTip.setPrototype = function(){
		FWDButtonToolTip.prototype = null;
		FWDButtonToolTip.prototype = new FWDDisplayObject("div");
	};
	
	FWDButtonToolTip.CLICK = "onClick";
	FWDButtonToolTip.MOUSE_DOWN = "onMouseDown";
	
	FWDButtonToolTip.prototype = null;
	window.FWDButtonToolTip = FWDButtonToolTip;
}(window));