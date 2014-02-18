/* FWDPageMenuButton */
(function (){
var FWDPageMenuButton = function(
			label1, 
			normalColor,
			selectedColor,
			disableButton_bl
		){
		
		var self = this;
		var prototype = FWDPageMenuButton.prototype;
		
		this.label1_str = label1;
		this.normalColor_str = normalColor;
		this.selectedColor_str = selectedColor;
		
		this.id;
		this.totalWidth = 400;
		this.totalHeight = 20;
		
		this.text1_sdo = null;
		this.dumy_sdo = null;
		
		this.finalX;
		this.finalY;
		
		this.isMobile_bl = FWDUtils.isMobile;
		this.disableButton_bl = disableButton_bl;
		this.currentState = 1;
		this.isDisabled_bl = false;
	
		
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setBackfaceVisibility();
			self.setButtonMode(true);
			self.setupMainContainers();
			self.setWidth(self.totalWidth);
			self.setHeight(self.totalHeight);
			if(self.disableButton_bl) self.disable();
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){
			
			self.text1_sdo = new FWDSimpleDisplayObject("div");
			self.text1_sdo.setBackfaceVisibility();
			self.text1_sdo.setDisplay("inline-block");
			self.text1_sdo.getStyle().fontFamily = "Arial";
			self.text1_sdo.getStyle().fontWeight = "bold";
			self.text1_sdo.getStyle().fontSize= "13px";
			self.text1_sdo.getStyle().color = self.normalColor_str;
			self.text1_sdo.getStyle().fontSmoothing = "antialiased";
			self.text1_sdo.getStyle().webkitFontSmoothing = "antialiased";
			self.text1_sdo.getStyle().textRendering = "optimizeLegibility";	
			self.text1_sdo.setInnerHTML(self.label1_str);
			self.addChild(self.text1_sdo);
			
			setTimeout(function(){
				self.centerText();
				self.setTotalWidth();
			}, 50);
			
			self.dumy_sdo = new FWDSimpleDisplayObject("div");
			if(FWDUtils.isIE){
				self.dumy_sdo.setBkColor("#FFFF00");
				self.dumy_sdo.setAlpha(0);
			};
			self.addChild(self.dumy_sdo);
			
			if(self.isMobile_bl){
				self.screen.addEventListener("click", self.onClick);
			}else if(self.screen.addEventListener){
				self.screen.addEventListener("mouseover", self.onMouseOver);
				self.screen.addEventListener("mouseout", self.onMouseOut);
				self.screen.addEventListener("click", self.onClick);
			}else if(self.screen.attachEvent){
				self.screen.attachEvent("onmouseover", self.onMouseOver);
				self.screen.attachEvent("onmouseout", self.onMouseOut);
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
			}
		};
			
		self.onMouseOut = function(e){
			if(self.isDisabled_bl) return;
			TweenMax.to(self.text1_sdo.screen, .5, {css:{color:self.normalColor_str}, ease:Expo.easeOut});
		};
		
		self.onClick = function(e){
			if(self.isDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			self.dispatchEvent(FWDPageMenuButton.CLICK);
		};
		
		//##############################//
		/* set selected state */
		//##############################//
		self.disable = function(){
			self.isDisabled_bl = true;
			self.setButtonMode(false);
			self.text1_sdo.getStyle().color = self.selectedColor_str;
		};		

		//##########################################//
		/* center text */
		//##########################################//
		self.centerText = function(){
			self.dumy_sdo.setWidth(self.totalWidth);
			self.dumy_sdo.setHeight(self.totalHeight);
			
			if(FWDUtils.isIEAndLessThen9){
				self.text1_sdo.setY(Math.round((self.totalHeight - self.text1_sdo.getHeight())/2) - 1);
			}else{
				self.text1_sdo.setY(Math.round((self.totalHeight - self.text1_sdo.getHeight())/2));
			}
			self.text1_sdo.setHeight(self.totalHeight + 2);
		};
		
		//###############################//
		/* get max text width */
		//###############################//
		self.setTotalWidth = function(){
			self.totalWidth = self.text1_sdo.getWidth();
			self.dumy_sdo.setWidth(self.totalWidth);
		};
		
		self.init();
	};
	
	/* set prototype */
	FWDPageMenuButton.setPrototype = function(){
		FWDPageMenuButton.prototype = new FWDDisplayObject("div");
	};

	FWDPageMenuButton.CLICK = "onClick";
	
	FWDPageMenuButton.prototype = null;
	window.FWDPageMenuButton = FWDPageMenuButton;
}(window));