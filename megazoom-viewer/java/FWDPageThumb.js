/* FWDPageThumb */
(function (window){
	
	var FWDPageThumb = function(
			pId, 
			shadowPath,
			imageOverPath,
			textToShow,
			iconText,
			offsetHeight,
			borderSize, 
			borderColor,
			textNormalColor,
			textSelectedColor,
			wiewSampleTextColor,
			shadowOffsetX,
			shadowOffsetY,
			shadowOffsetW,
			shadowOffsetH){
		
		var self = this;
		var prototype = FWDPageThumb.prototype;

		this.main_do = null;
		this.shadow_sdo = null;
		this.border_do = null;
		this.imageHolder_do = null;
		this.image_do = null;
		this.text_sdo = null;
		this.icon_sdo = null;
		this.overlay_sdo = null;
		this.over_sdo = null;
		
		this.shadowPath_str = shadowPath;
		this.imageOverPath_str = imageOverPath;
		this.textToShow_str = textToShow;
		this.iconText_str = iconText;
		this.borderColor_str = borderColor;
		this.textNormalColor_str = textNormalColor;
		this.textSelectedColor_str = textSelectedColor;
		this.wiewSampleTextColor_str = wiewSampleTextColor;

		this.borderSize = borderSize;
		this.id = pId;
		this.imageOriginalW;
		this.imageOriginalH;
		this.borderSize;
		this.finalX;
		this.finalY;
		this.finalW;
		this.finalH;
		this.imageFinalX;
		this.imageFinalY;
		this.imageFinalW;
		this.imageFinalH;
		this.offsetHeight = offsetHeight;
		this.shadowOffsetX = shadowOffsetX;
		this.shadowOffsetY = shadowOffsetY;
		this.shadowOffsetW = shadowOffsetW;
		this.shadowOffsetH = shadowOffsetH;
	
		this.isShowed_bl = false;
		this.hasImage_bl = false;
		this.isMobile_bl = FWDUtils.isMobile;
		this.tweenOnShow_bl = true;
		this.isDisabled_bl = false;

		this.init = function(){
			self.setOverflow("visible");
			self.setupMainContainers();
		};
		
		//#################################//
		/* setup main containers */
		//#################################//
		this.setupMainContainers = function(){
			var image_img;
			
			self.shadow_sdo = new FWDSimpleDisplayObject("img");
			image_img = new Image();
			image_img.src = self.shadowPath_str;
			self.shadow_sdo.setScreen(image_img);
			self.shadow_sdo.setX(-7 + self.shadowOffsetX);
			self.shadow_sdo.setY(-11 + self.shadowOffsetY);
			self.addChild(self.shadow_sdo);
			
			self.main_do = new FWDDisplayObject("div");
			self.main_do.setResizableSizeAfterParent();
			self.border_do = new FWDSimpleDisplayObject("div");
			self.border_do.setResizableSizeAfterParent();
			self.border_do.setBkColor(self.borderColor_str);
			self.imageHolder_do = new FWDDisplayObject("div");
			
			self.text_sdo = new FWDSimpleDisplayObject("div");
			self.text_sdo.setOverflow("visible");
			self.text_sdo.getStyle().width = "100%";
			self.text_sdo.getStyle().textAlign = "center";
			self.text_sdo.getStyle().fontFamily = "Arial";
			self.text_sdo.getStyle().fontSize= "13px";
			self.text_sdo.getStyle().color = self.textNormalColor_str;
			self.text_sdo.getStyle().fontSmoothing = "antialiased";
			self.text_sdo.getStyle().webkitFontSmoothing = "antialiased";
			self.text_sdo.getStyle().textRendering = "optimizeLegibility";	
			self.text_sdo.setX(self.borderSize);
			self.text_sdo.setInnerHTML(self.textToShow_str);
			
			self.icon_sdo = new FWDSimpleDisplayObject("div");
			self.icon_sdo.getStyle().width = "100%";
			self.icon_sdo.getStyle().textAlign = "center";
			self.icon_sdo.getStyle().fontFamily = "Arial";
			self.icon_sdo.getStyle().fontSize= "13px";
			self.icon_sdo.getStyle().letterSpacing = "2px";
			self.icon_sdo.getStyle().color = self.wiewSampleTextColor_str;
			self.icon_sdo.getStyle().fontSmoothing = "antialiased";
			self.icon_sdo.getStyle().webkitFontSmoothing = "antialiased";
			self.icon_sdo.getStyle().textRendering = "optimizeLegibility";	
			self.icon_sdo.setInnerHTML(self.iconText_str);
			
			if(!FWDUtils.hasTransform2d) self.icon_sdo.setAlpha(0);
			
			self.overlay_sdo = new FWDSimpleDisplayObject("div");
			self.overlay_sdo.setBkColor("#000000");
			self.overlay_sdo.setAlpha(0);
			
			self.over_sdo = new FWDSimpleDisplayObject("div");
			if(FWDUtils.isIE) self.over_sdo.getStyle().background = "url('dumy')";
			
			self.main_do.addChild(self.border_do);
			self.main_do.addChild(self.imageHolder_do);
			self.main_do.addChild(self.text_sdo);
			self.addChild(self.main_do);
			self.main_do.addChild(self.icon_sdo);
			self.addChild(self.over_sdo);
		};
		
		//#################################//
		/* set image */
		//#################################//
		this.setImage = function(image){
			self.image_do = new FWDSimpleDisplayObject("img");
			self.image_do.setScreen(image);
			self.setButtonMode(true);
			
			self.imageOriginalW = self.image_do.w;
			self.imageOriginalH = self.image_do.h;
			
			self.imageHolder_do.addChild(self.image_do);	
			self.imageHolder_do.addChild(self.overlay_sdo);
			self.hasImage_bl = false;
			
			self.resizeImage();
			
			if(self.tweenOnShow_bl){
				
				self.imageHolder_do.setX(parseInt(self.finalW/2));
				self.imageHolder_do.setY(parseInt((self.finalH - self.offsetHeight)/2));
				self.imageHolder_do.setWidth(0);
				self.imageHolder_do.setHeight(0);
				self.image_do.setX(- parseInt(self.image_do.w/2));
				self.image_do.setY(- parseInt(self.image_do.h/2));
				self.image_do.setAlpha(0);
				
				TweenMax.to(self.imageHolder_do, .8, {
					x:self.borderSize, 
					y:self.borderSize,
					w:self.finalW - (self.borderSize * 2),
					h:self.finalH - (self.borderSize * 2), ease:Expo.easeInOut});
				
				TweenMax.to(self.image_do, .8, {
					alpha:1,
					x:0, 
					y:0, ease:Expo.easeInOut});
			}
			
			if(self.screen.addEventListener){
				if(!self.isMobile_bl){
					self.over_sdo.screen.addEventListener("mouseover", self.onMouseOverHandler);
					self.over_sdo.screen.addEventListener("mouseout", self.onMouseOutHandler);
				}
				self.over_sdo.screen.addEventListener("click", self.onMouseClickHandler);
			}else{
				if(!self.isMobile_bl){
					self.over_sdo.screen.attachEvent("onmouseover", self.onMouseOverHandler);
					self.over_sdo.screen.attachEvent("onmouseout", self.onMouseOutHandler);
				}
				self.over_sdo.screen.attachEvent("onclick", self.onMouseClickHandler);
			}
			self.hasImage_bl = true;
		};
		
		this.onMouseOverHandler = function(animate){
			if(self.isDisabled_bl) return;
			TweenMax.to(self.text_sdo.screen, .5, {css:{color:self.textSelectedColor_str}, ease:Expo.easeOut});
			TweenMax.to(self.overlay_sdo, .5, {alpha:.7, ease:Expo.easeOut});
			if(FWDUtils.hasTransform2d){
				self.icon_sdo.getStyle().left = self.borderSize + "px";
				TweenMax.to(self.icon_sdo.screen, .5, {css:{scale:1}, ease:Expo.easeOut});
			}else{
				self.icon_sdo.getStyle().left = self.borderSize + "px";
				TweenMax.to(self.icon_sdo, .5, {alpha:1, ease:Expo.easeOut});
			}
		};
		
		this.onMouseOutHandler = function(e){
			if(self.isDisabled_bl) return;
			TweenMax.to(self.text_sdo.screen, .5, {css:{color:self.textNormalColor_str}, ease:Expo.easeOut});
			TweenMax.to(self.overlay_sdo, .5, {alpha:0, ease:Expo.easeOut});
			if(FWDUtils.hasTransform2d){
				TweenMax.to(self.icon_sdo.screen, .5, {css:{scale:0}, ease:Expo.easeOut});
			}else{
				TweenMax.to(self.icon_sdo, .5, {alpha:0, ease:Expo.easeOut});
			}
		};
		
		this.onMouseClickHandler = function(e){
			if(self.isDisabled_bl) return;
			self.dispatchEvent(FWDPageThumb.CLICK);
		};
		
		//#################################//
		/* resize thumbnail*/
		//#################################//
		this.resizeThumb = function(animate){
			
			TweenMax.killTweensOf(self);
			TweenMax.killTweensOf(self.imageHolder_do);
			
			if(animate){
				TweenMax.to(self, .8, {
					x:self.finalX, 
					y:self.finalY,
					w:self.finalW,
					h:self.finalH,
					ease:Expo.easeInOut});
			}else{
				self.setX(self.finalX);
				self.setY(self.finalY);
			}
			
			self.setWidth(self.finalW);
			self.setHeight(self.finalH);
			self.imageHolder_do.setX(self.borderSize);
			self.imageHolder_do.setY(self.borderSize);
			self.imageHolder_do.setWidth(self.finalW - (self.borderSize * 2));
			self.imageHolder_do.setHeight(self.finalH - (self.borderSize * 2));
			
			self.text_sdo.setWidth(self.finalW - (self.borderSize * 2));
			self.text_sdo.setY((self.finalH - self.offsetHeight) + parseInt((self.offsetHeight - self.text_sdo.getHeight())/2) - parseInt(self.borderSize/2));
		
			self.shadow_sdo.setWidth(self.finalW + 16 + self.shadowOffsetW);
			self.shadow_sdo.setHeight(self.finalH + 20 + + self.shadowOffsetH);
			
			self.icon_sdo.setWidth(self.finalW - (self.borderSize * 2));
			self.icon_sdo.setY(self.borderSize + parseInt((self.finalH - self.offsetHeight - self.borderSize - 13)/2));
			
			if(FWDUtils.hasTransform2d){
				self.icon_sdo.getStyle().left =  "-500px";
				TweenMax.to(self.icon_sdo.screen, 0, {css:{scale:0}});
			}else{
				self.icon_sdo.getStyle().left =  "-500px";
			}
			
			self.over_sdo.setWidth(self.finalW);
			self.over_sdo.setHeight(self.finalH);
			
			self.resizeImage();
		};
	
		
		//#################################//
		/* resize image*/
		//#################################//
		this.resizeImage = function(animate){
			
			if(!self.image_do) return;
			
			TweenMax.killTweensOf(self.image_do);
			var scX = (self.finalW -  (self.borderSize * 2))/self.imageOriginalW;
			var scY = (self.finalH - (self.borderSize * 2))/self.imageOriginalH;
			var ttsc;
			
			if(scX <= scY){
				ttsc = scX;
			}else{
				ttsc = scY;
			}
		
			self.imageFinalW = Math.ceil(ttsc * self.imageOriginalW);
			self.imageFinalH = Math.ceil(ttsc * self.imageOriginalH);
			
			self.image_do.setX(0);
			self.image_do.setY(0);
			self.image_do.setWidth(self.imageFinalW);
			self.image_do.setHeight(self.imageFinalH);
			self.image_do.setAlpha(1);
			self.overlay_sdo.setWidth(self.imageFinalW);
			self.overlay_sdo.setHeight(self.imageFinalH);
		};
		
		//################################//
		/* enable /disable */
		//################################//
		this.disable = function(){
			self.isDisabled_bl = true;
			TweenMax.to(self.overlay_sdo, .5, {alpha:.7, ease:Expo.easeOut});
			if(FWDUtils.hasTransform2d){
				TweenMax.to(self.icon_sdo.screen, .5, {css:{scale:0}, ease:Expo.easeOut});
			}else{
				TweenMax.to(self.icon_sdo, .5, {alpha:0, ease:Expo.easeOut});
			}
			
			self.over_sdo.setButtonMode(false);
			self.text_sdo.getStyle().color = self.textSelectedColor_str;
		};		
		
		this.enable = function(){
			self.isDisabled_bl = false;
			TweenMax.to(self.overlay_sdo, .5, {alpha:0, ease:Expo.easeOut});
			self.over_sdo.setButtonMode(true);
			self.text_sdo.getStyle().color = self.textNormalColor_str;
		};		
		
		self.init();
	};
	
	/* set prototype */
	FWDPageThumb.setPrototype = function(){
		FWDPageThumb.prototype = new FWDDisplayObject("div");
	};
	
	
	FWDPageThumb.CLICK = "onClick";
	FWDPageThumb.HIDE_OVERLAY = "onShowOverlay";
	FWDPageThumb.SHOW_OVERLAY = "onHideOverlay";
	
	FWDPageThumb.prototype = null;
	window.FWDPageThumb = FWDPageThumb;
}(window));