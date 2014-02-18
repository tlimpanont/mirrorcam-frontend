/* FWDSimpleButton */
(function (window){
var FWDSimpleButton = function(nImg, sImg, dImg){
		
		var self = this;
		var prototype = FWDSimpleButton.prototype;
		
		this.nImg = nImg;
		this.sImg = sImg;
		this.dImg = dImg;
		
		this.n_sdo;
		this.s_sdo;
		this.d_sdo;
		
		this.toolTipLabel_str;
		
		this.totalWidth = this.nImg.width;
		this.totalHeight = this.nImg.height;
	
		this.isDisabled_bl = false;
		this.isSelectedFinal_bl = false;
		this.isActive_bl = false;
		this.isMobile_bl = FWDUtils.isMobile;
		this.hasPointerEvent_bl = FWDUtils.hasPointerEvent;
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setupMainContainers();
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){
			self.n_sdo = new FWDSimpleDisplayObject("img");	
			self.n_sdo.setScreen(self.nImg);
			self.s_sdo = new FWDSimpleDisplayObject("img");
			self.s_sdo.setScreen(self.sImg);
			
			self.s_sdo.setAlpha(0);
			self.addChild(self.n_sdo);
			self.addChild(self.s_sdo);
			
			if(self.dImg){
				self.d_sdo = new FWDSimpleDisplayObject("img");	
				self.d_sdo.setScreen(self.dImg);
				if(self.isMobile_bl){
					self.d_sdo.setX(-100);
				}else{
					self.d_sdo.setAlpha(0);
				}
				self.addChild(self.d_sdo);
			};
			
			
			self.setWidth(self.nImg.width);
			self.setHeight(self.nImg.height);
			self.setButtonMode(true);
			
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
		
		self.onMouseOver = function(e){
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				if(self.isDisabled_bl || self.isSelectedFinal_bl) return;
				self.dispatchEvent(FWDSimpleButton.MOUSE_OVER, {e:e});
				TweenMax.killTweensOf(self.s_sdo);
				TweenMax.to(self.s_sdo, .5, {alpha:1, delay:.1, ease:Expo.easeOut});
			}
		};
			
		self.onMouseOut = function(e){
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				if(self.isDisabled_bl || self.isSelectedFinal_bl) return;
				self.dispatchEvent(FWDSimpleButton.MOUSE_OUT, {e:e});
				TweenMax.killTweensOf(self.s_sdo);
				TweenMax.to(self.s_sdo, .5, {alpha:0, ease:Expo.easeOut});	
			}
		};
			
		self.onClick = function(e){
			if(self.isDisabled_bl || self.isSelectedFinal_bl) return;
			self.dispatchEvent(FWDSimpleButton.CLICK, {e:e});
		};
		
		self.onMouseDown = function(e){
			if(e.preventDefault) e.preventDefault();
			if(self.isDisabled_bl || self.isSelectedFinal_bl) return;
			self.dispatchEvent(FWDSimpleButton.MOUSE_DOWN, {e:e});
		};
		
		//##############################//
		// set select / deselect final.
		//##############################//
		self.setSelctedFinal = function(){
			self.isSelectedFinal_bl = true;
			TweenMax.killTweensOf(self.s_sdo);
			TweenMax.to(self.s_sdo, .8, {alpha:1, ease:Expo.easeOut});
			self.setButtonMode(false);
		};
		
		self.setUnselctedFinal = function(){
			self.isSelectedFinal_bl = false;
			TweenMax.to(self.s_sdo, .8, {alpha:0, delay:.1, ease:Expo.easeOut});
			self.setButtonMode(true);
		};
		
		//####################################//
		/* Disable / enable */
		//####################################//
		this.disable = function(){
			if(self.isDisabled_bl) return;
			if(self.isMobile_bl){
				self.d_sdo.setX(0);
			}else{
				TweenMax.killTweensOf(self.d_sdo);
				TweenMax.to(self.d_sdo, .8, {alpha:1, ease:Expo.easeOut});
				self.setButtonMode(false);
			}
			self.isDisabled_bl = true;
		};
		
		this.enable = function(){
			if(!self.isDisabled_bl) return;
			if(self.isMobile_bl){
				self.d_sdo.setX(-100);
			}else{
				TweenMax.killTweensOf(self.d_sdo);
				TweenMax.to(self.d_sdo, .8, {alpha:0, delay:.1, ease:Expo.easeOut});
				self.setButtonMode(true);
			}
			
			self.isDisabled_bl = false;
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
			}else if(self.screen.addEventListener){
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
		
			TweenMax.killTweensOf(self.s_sdo);
			self.n_sdo.destroy();
			self.s_sdo.destroy();
			
			if(self.d_sdo){
				TweenMax.killTweensOf(self.d_sdo);
				self.d_sdo.destroy();
			}
			
			self.nImg = null;
			self.sImg = null;
			self.dImg = null;
			self.n_sdo = null;
			self.s_sdo = null;
			self.d_sdo = null;
			
			nImg = null;
			sImg = null;
			dImg = null;
			
			self.toolTipLabel_str = null;
			
			self.init = null;
			self.setupMainContainers = null;
			self.onMouseOver = null;
			self.onMouseOut = null;
			self.onClick = null;
			self.onMouseDown = null;  
			self.setSelctedFinal = null;
			self.setUnselctedFinal = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDSimpleButton.prototype = null;
		};
	
		self.init();
	};
	
	/* set prototype */
	FWDSimpleButton.setPrototype = function(){
		FWDSimpleButton.prototype = null;
		FWDSimpleButton.prototype = new FWDDisplayObject("div");
	};
	
	FWDSimpleButton.CLICK = "onClick";
	FWDSimpleButton.MOUSE_OVER = "onMouseOver";
	FWDSimpleButton.MOUSE_OUT = "onMouseOut";
	FWDSimpleButton.MOUSE_DOWN = "onMouseDown";
	
	FWDSimpleButton.prototype = null;
	window.FWDSimpleButton = FWDSimpleButton;
}(window));