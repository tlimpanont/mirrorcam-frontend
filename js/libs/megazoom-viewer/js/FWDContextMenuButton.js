/* FWDContextMenuButton */
(function (){
var FWDContextMenuButton = function(
			label1, 
			label2, 
			normalColor,
			selectedColor,
			disabledColor,
			padding
		){
		
		var self = this;
		var prototype = FWDContextMenuButton.prototype;
		
		self.label1_str = label1;
		self.label2_str = label2;
		self.normalColor_str = normalColor;
		self.selectedColor_str = selectedColor;
		self.disabledColor_str = disabledColor;
		
		self.totalWidth = 400;
		self.totalHeight = 20;
		self.padding;
	
		self.text1_sdo = null;
		self.text2_sdo = null;
		self.dumy_sdo = null;
		
		self.isMobile_bl = FWDUtils.isMobile;
		self.currentState = 1;
		self.isDisabled_bl = false;
		self.isMaximized_bl = false;
		self.showSecondButton_bl = label2 != undefined;
		self.isDeveleper_bl = false;
		
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setBackfaceVisibility();
			self.setButtonMode(true);
			self.setupMainContainers();
			self.setWidth(self.totalWidth);
			self.setHeight(self.totalHeight);
			self.setButtonState(0);
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){
			
			self.text1_sdo = new FWDSimpleDisplayObject("div");
			self.text1_sdo.setBackfaceVisibility();
			self.text1_sdo.setDisplay("inline-block");
			self.text1_sdo.getStyle().fontFamily = "Arial";
			self.text1_sdo.getStyle().fontSize= "12px";
			self.text1_sdo.getStyle().color = self.normalColor_str;
			self.text1_sdo.getStyle().fontSmoothing = "antialiased";
			self.text1_sdo.getStyle().webkitFontSmoothing = "antialiased";
			self.text1_sdo.getStyle().textRendering = "optimizeLegibility";	
			self.text1_sdo.setInnerHTML(self.label1_str);
			self.addChild(self.text1_sdo);
			
			if(self.showSecondButton_bl){
				self.text2_sdo = new FWDSimpleDisplayObject("div");
				self.text2_sdo.setBackfaceVisibility();
				self.text2_sdo.setDisplay("inline-block");
				self.text2_sdo.getStyle().fontFamily = "Arial";
				self.text2_sdo.getStyle().fontSize= "12px";
				self.text2_sdo.getStyle().color = self.normalColor_str;
				self.text2_sdo.getStyle().fontSmoothing = "antialiased";
				self.text2_sdo.getStyle().webkitFontSmoothing = "antialiased";
				self.text2_sdo.getStyle().textRendering = "optimizeLegibility";	
				self.text2_sdo.setInnerHTML(self.label2_str);
				self.addChild(self.text2_sdo);
			}
			
			self.dumy_sdo = new FWDSimpleDisplayObject("div");
			if(FWDUtils.isIE){
				self.dumy_sdo.setBkColor("#FF0000");
				self.dumy_sdo.setAlpha(0);
			};
			self.addChild(self.dumy_sdo);
			
			if(self.isMobile_bl){
				self.screen.addEventListener("touchstart", self.onMouseDown);
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
		
		self.onMouseOver = function(animate){
			if(self.isDisabled_bl) return;
			TweenMax.killTweensOf(self.text1_sdo);
			if(animate){
				TweenMax.to(self.text1_sdo.screen, .5, {css:{color:self.selectedColor_str}, ease:Expo.easeOut});
				if(self.showSecondButton_bl) TweenMax.to(self.text2_sdo.screen, .5, {css:{color:self.selectedColor_str}, ease:Expo.easeOut});
			}else{
				self.text1_sdo.getStyle().color = self.selectedColor_str;
				if(self.showSecondButton_bl){
					TweenMax.killTweensOf(self.text2_sdo);
					self.text2_sdo.getStyle().color = self.selectedColor_str;
				}
			}
			self.dispatchEvent(FWDContextMenuButton.MOUSE_OVER);
		};
			
		self.onMouseOut = function(e){
			if(self.isDisabled_bl) return;
			TweenMax.killTweensOf(self.text1_sdo);
			TweenMax.to(self.text1_sdo.screen, .5, {css:{color:self.normalColor_str}, ease:Expo.easeOut});
			
			if(self.showSecondButton_bl){
				TweenMax.killTweensOf(self.text2_sdo);
				TweenMax.to(self.text2_sdo.screen, .5, {css:{color:self.normalColor_str}, ease:Expo.easeOut});
			}
			self.dispatchEvent(FWDContextMenuButton.MOUSE_OUT);
		};
		
		self.onClick = function(e){
			if(self.isDeveleper_bl){
				window.open("http://www.webdesign-flash.ro", "_blank");
				return;
			}
			if(self.isDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			self.dispatchEvent(FWDContextMenuButton.CLICK);
		};
		
		self.onMouseDown = function(e){
			if(self.isDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			self.dispatchEvent(FWDContextMenuButton.MOUSE_DOWN, {e:e});
		};
		
		//##############################//
		/* toggle button */
		//#############################//
		self.toggleButton = function(){
			if(!self.showSecondButton_bl ) return;
			if(self.currentState == 1){
				self.text1_sdo.setVisible(true);
				self.text2_sdo.setVisible(false);
				self.currentState = 0;
				self.dispatchEvent(FWDContextMenuButton.FIRST_BUTTON_CLICK);
			}else{
				self.text1_sdo.setVisible(false);
				self.text2_sdo.setVisible(true);
				self.currentState = 1;
				self.dispatchEvent(FWDContextMenuButton.SECOND_BUTTON_CLICK);
			}
		};
		
		//##############################//
		/* set second buttons state */
		//##############################//
		self.setButtonState = function(state){
			if(state == 0){
				self.text1_sdo.setVisible(true);
				if(self.showSecondButton_bl) self.text2_sdo.setVisible(false);
				self.currentState = 0;
			}else if(state == 1){
				self.text1_sdo.setVisible(false);
				if(self.showSecondButton_bl) self.text2_sdo.setVisible(true);
				self.currentState = 1;
			}
		};		

		//##########################################//
		/* center text */
		//##########################################//
		self.centerText = function(){
			self.dumy_sdo.setWidth(self.totalWidth);
			self.dumy_sdo.setHeight(self.totalHeight);
			if(FWDUtils.isIEAndLessThen9){
				self.text1_sdo.setY(Math.round((self.totalHeight - self.text1_sdo.getHeight())/2) - 1);
				if(self.showSecondButton_bl) self.text2_sdo.setY(Math.round((self.totalHeight - self.text2_sdo.getHeight())/2) - 1);
			}else{
				self.text1_sdo.setY(Math.round((self.totalHeight - self.text1_sdo.getHeight())/2));
				if(self.showSecondButton_bl) self.text2_sdo.setY(Math.round((self.totalHeight - self.text2_sdo.getHeight())/2));
			}
			self.text1_sdo.setHeight(self.totalHeight + 2);
			if(self.showSecondButton_bl) self.text2_sdo.setHeight(self.totalHeight + 2);
		};
		
		//###############################//
		/* get max text width */
		//###############################//
		self.getMaxTextWidth = function(){
			var w1 = self.text1_sdo.getWidth();
			var w2 = 0;
			if(self.showSecondButton_bl) w2 = self.text2_sdo.getWidth();
			return Math.max(w1, w2);
		};
		
		//##############################//
		/* disable /enable button */
		//##############################//
		self.disable = function(){
			self.isDisabled_bl = true;
			TweenMax.killTweensOf(self.text1_sdo);
			TweenMax.to(self.text1_sdo.screen, .5, {css:{color:self.disabledColor_str}, ease:Expo.easeOut});
			self.setButtonMode(false);
		};
		
		self.enable = function(){
			self.isDisabled_bl = false;
			TweenMax.killTweensOf(self.text1_sdo);
			TweenMax.to(self.text1_sdo.screen, .5, {css:{color:self.normalColor_str}, ease:Expo.easeOut});
			self.setButtonMode(true);
		};
		
		//##############################//
		/* destroy */
		//##############################//
		self.destroy = function(){
			
			if(self.isMobile_bl){
				self.screen.removeEventListener("touchstart", self.onMouseDown);
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
			
			
			TweenMax.killTweensOf(self.text1_sdo);
			self.text1_sdo.destroy();
			
			if(self.text2_sdo){
				TweenMax.killTweensOf(self.text2_sdo);
				self.text2_sdo.destroy();
			}
			
			self.dumy_sdo.destroy();
			
			
			self.text1_sdo = null;
			self.text2_sdo = null;
			self.dumy_sdo = null;
			
			self.label1_str = null;
			self.label2_str = null;
			self.normalColor_str = null;
			self.selectedColor_str = null;
			self.disabledColor_str = null;
			
			label1 = null;
			label2 = null; 
			normalColor = null;
			selectedColor = null;
			disabledColor = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDContextMenuButton.prototype = null;
		};
	
		self.init();
	};
	
	/* set prototype */
	FWDContextMenuButton.setPrototype = function(){
		FWDContextMenuButton.prototype = new FWDDisplayObject("div");
	};
	
	FWDContextMenuButton.FIRST_BUTTON_CLICK = "onFirstClick";
	FWDContextMenuButton.SECOND_BUTTON_CLICK = "secondButtonOnClick";
	FWDContextMenuButton.MOUSE_OVER = "onMouseOver";
	FWDContextMenuButton.MOUSE_OUT = "onMouseOut";
	FWDContextMenuButton.MOUSE_DOWN = "onMouseDown";
	FWDContextMenuButton.CLICK = "onClick";
	
	FWDContextMenuButton.prototype = null;
	window.FWDContextMenuButton = FWDContextMenuButton;
}(window));