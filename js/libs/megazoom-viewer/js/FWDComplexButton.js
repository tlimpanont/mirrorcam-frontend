/* FWDComplexButton */
(function (){
var FWDComplexButton = function(
			n1Img, 
			s1Img, 
			n2Img, 
			s2Img, 
			disptachMainEvent_bl
		){
		
		var self = this;
		var prototype = FWDComplexButton.prototype;
		
		this.n1Img = n1Img;
		this.s1Img = s1Img;
		this.n2Img = n2Img;
		this.s2Img = s2Img;
		
		this.firstButton_do;
		this.n1_do;
		this.s1_do;
		this.secondButton_do;
		this.n2_do;
		this.s2_do;
		
		this.buttonWidth = self.n1Img.width;
		this.buttonHeight = self.n1Img.height;
		
		this.currentState = 1;
		this.isDisabled_bl = false;
		this.isMaximized_bl = false;
		this.disptachMainEvent_bl = disptachMainEvent_bl;
		this.isDisabled_bl = false;
		this.isMobile_bl = FWDUtils.isMobile;
		this.hasPointerEvent_bl = FWDUtils.hasPointerEvent;
		
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.hasTransform2d_bl = false;
			self.setButtonMode(true);
			self.setWidth(self.buttonWidth);
			self.setHeight(self.buttonHeight);
			self.setupMainContainers();
			self.secondButton_do.setVisible(false);
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){
			self.firstButton_do = new FWDDisplayObject("div");
			self.addChild(self.firstButton_do);
			self.n1_do = new FWDSimpleDisplayObject("img");	
			self.n1_do.setScreen(self.n1Img);
			self.s1_do = new FWDSimpleDisplayObject("img");
			self.s1_do.setScreen(self.s1Img);
			self.s1_do.setAlpha(0);
			self.firstButton_do.addChild(self.n1_do);
			self.firstButton_do.addChild(self.s1_do);
			self.firstButton_do.setWidth(self.n1Img.width);
			self.firstButton_do.setHeight(self.n1Img.height);
			
			self.secondButton_do = new FWDDisplayObject("div");
			self.addChild(self.secondButton_do);
			self.n2_do = new FWDSimpleDisplayObject("img");	
			self.n2_do.setScreen(self.n2Img);
			self.s2_do = new FWDSimpleDisplayObject("img");
			self.s2_do.setScreen(self.s2Img);
			self.s2_do.setAlpha(0);
			self.secondButton_do.addChild(self.n2_do);
			self.secondButton_do.addChild(self.s2_do);
			self.secondButton_do.setWidth(self.n2Img.width);
			self.secondButton_do.setHeight(self.n2Img.height);
			
			self.addChild(self.secondButton_do);
			self.addChild(self.firstButton_do);
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screen.addEventListener("MSPointerDown", self.onMouseDown);
					self.screen.addEventListener("MSPointerUp", self.onClick);
					self.screen.addEventListener("MSPointerOver", self.onMouseOver);
					self.screen.addEventListener("MSPointerOut", self.onMouseOut);
				}else{
					self.screen.addEventListener("touchstart", self.onMouseDown);
				}
			}else if(self.screen.addEventListener){
				self.screen.addEventListener("mouseover", self.onMouseOver);
				self.screen.addEventListener("mouseout", self.onMouseOut);
				self.screen.addEventListener("mousedown", self.onMouseDown);
				self.screen.addEventListener("click", self.onClick);
			}else if(self.screen.attachEvent){
				self.screen.attachEvent("onmouseover", self.onMouseOver);
				self.screen.attachEvent("onmouseout", self.onMouseOut);
				self.screen.attachEvent("onmousedown", self.onMouseDown);
				self.screen.attachEvent("onclick", self.onClick);
			}
		};
		
		self.onMouseOver = function(e, animate){
			if(self.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				self.dispatchEvent(FWDComplexButton.MOUSE_OVER, {e:e});
				self.setSelectedState();
			}
		};
			
		self.onMouseOut = function(e){
			if(self.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				self.setNormalState();
				self.dispatchEvent(FWDComplexButton.MOUSE_OUT);
			}
		};
		
		self.onClick = function(e){
			if(self.isDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			if(self.disptachMainEvent_bl) self.dispatchEvent(FWDComplexButton.CLICK);
		};
		
		self.onMouseDown = function(e){
			if(self.isDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			if(!self.isMobile_bl) self.onMouseOver(e, false);
			if(self.hasPointerEvent_bl) self.setNormalState();
			if(self.disptachMainEvent_bl) self.dispatchEvent(FWDComplexButton.MOUSE_DOWN, {e:e});
		};
		
		//##############################//
		/* toggle button */
		//#############################//
		self.toggleButton = function(){
			if(self.currentState == 1){
				self.firstButton_do.setVisible(false);
				self.secondButton_do.setVisible(true);
				self.currentState = 0;
				self.dispatchEvent(FWDComplexButton.FIRST_BUTTON_CLICK);
			}else{
				self.firstButton_do.setVisible(true);
				self.secondButton_do.setVisible(false);
				self.currentState = 1;
				self.dispatchEvent(FWDComplexButton.SECOND_BUTTON_CLICK);
			}
		};
		
		//##############################//
		/* set second buttons state */
		//##############################//
		self.setButtonState = function(state){
			if(state == 1){
				self.firstButton_do.setVisible(true);
				self.secondButton_do.setVisible(false);
				self.currentState = 1; 
			}else{
				self.firstButton_do.setVisible(false);
				self.secondButton_do.setVisible(true);
				self.currentState = 0; 
			}
		};
		
		//###############################//
		/* set normal state */
		//################################//
		this.setNormalState = function(){
			if(self.isMobile_bl && !self.hasPointerEvent_bl) return;
			TweenMax.killTweensOf(self.s1_do);
			TweenMax.killTweensOf(self.s2_do);
			TweenMax.to(self.s1_do, .5, {alpha:0, ease:Expo.easeOut});	
			TweenMax.to(self.s2_do, .5, {alpha:0, ease:Expo.easeOut});
		};
		
		this.setSelectedState = function(){
			TweenMax.killTweensOf(self.s1_do);
			TweenMax.killTweensOf(self.s2_do);
			TweenMax.to(self.s1_do, .5, {alpha:1, delay:.1, ease:Expo.easeOut});
			TweenMax.to(self.s2_do, .5, {alpha:1, delay:.1, ease:Expo.easeOut});
		};
		
		//##############################//
		/* destroy */
		//##############################//
		self.destroy = function(){
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screen.removeEventListener("MSPointerDown", self.onMouseDown);
					self.screen.removeEventListener("MSPointerUp", self.onClick);
					self.screen.removeEventListener("MSPointerOver", self.onMouseOver);
					self.screen.removeEventListener("MSPointerOut", self.onMouseOut);
				}else{
					self.screen.removeEventListener("touchstart", self.onMouseDown);
				}
			}else if(self.screen.removeEventListener){
				self.screen.removeEventListener("mouseover", self.onMouseOver);
				self.screen.removeEventListener("mouseout", self.onMouseOut);
				self.screen.removeEventListener("mousedown", self.onMouseDown);
				self.screen.removeEventListener("click", self.onClick);
			}else if(self.screen.detachEvent){
				self.screen.detachEvent("onmouseover", self.onMouseOver);
				self.screen.detachEvent("onmouseout", self.onMouseOut);
				self.screen.detachEvent("onmousedown", self.onMouseDown);
				self.screen.detachEvent("onclick", self.onClick);
			}
			
			TweenMax.killTweensOf(self.s1_do);
			TweenMax.killTweensOf(self.s2_do);
			
			self.firstButton_do.destroy();
			self.n1_do.destroy();
			self.s1_do.destroy();
			self.secondButton_do.destroy();
			self.n2_do.destroy();
			self.s2_do.destroy();
			
			self.firstButton_do = null;
			self.n1_do = null;
			self.s1_do = null;
			self.secondButton_do = null;
			self.n2_do = null;
			self.s2_do = null;
			
			self.n1Img = null;
			self.s1Img = null;
			self.n2Img = null;
			self.s2Img = null;
			
			n1Img = null; 
			s1Img = null; 
			n2Img = null; 
			s2Img = null; 
			
			self.init = null;
			self.setupMainContainers = null; 
			self.onMouseOver = null;
			self.onMouseOut = null;
			self.onClick = null;
			self.onMouseDown = null;
			self.toggleButton = null;
			self.setButtonState = null;
			self.destroy = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDComplexButton.prototype = null;
		};
	
		self.init();
	};
	
	/* set prototype */
	FWDComplexButton.setPrototype = function(){
		FWDComplexButton.prototype = new FWDDisplayObject("div");
	};
	
	FWDComplexButton.FIRST_BUTTON_CLICK = "onFirstClick";
	FWDComplexButton.SECOND_BUTTON_CLICK = "secondButtonOnClick";
	FWDComplexButton.MOUSE_OVER = "onMouseOver";
	FWDComplexButton.MOUSE_OUT = "onMouseOut";
	FWDComplexButton.MOUSE_DOWN = "onMouseDown";
	FWDComplexButton.CLICK = "onClick";
	
	FWDComplexButton.prototype = null;
	window.FWDComplexButton = FWDComplexButton;
}(window));