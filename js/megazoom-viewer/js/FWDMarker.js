/* FWDMarker */
(function (window){
var FWDMarker = function(
		markerId,
		normalImagePath, 
		selectedImagePath,
		type,
		regPoint,
		toolTipLabel,
		id,
		originalX,
		originalY,
		width,
		height,
		showAfterScale,
		hasContent_bl){
		
		var self = this;
		var prototype = FWDMarker.prototype;
		
		this.n_do;
		this.s_do;
		
		this.markerId = markerId;
		this.normalImagePath_str = normalImagePath;
		this.selectedImagePath_str = selectedImagePath;
		this.type_str = type;
		this.toolTipLabel_str = toolTipLabel;
		this.innerHTML_str;
		this.link_str;
		this.target_str;
		this.regPoint_str = regPoint;
		
		this.id = id;
		this.toolTipWindowId;
		this.width = width;
		this.height = height;
		this.originalX = originalX;
		this.originalY = originalY;
		this.finalX;
		this.finalY;
		this.offsetX;
		this.offsetY;
		this.toolTipWindowMaxWidth;
		this.showAfterScale = showAfterScale;
		
		this.hasHTMLContent_bl = hasContent_bl;
		this.isDisabled_bl = false;
		this.hasToolTip_bl = true;
		this.isDisabled_bl = false;
		this.isHiddenFinal_bl = false;
		this.isShowed_bl = true;
		this.isMobile_bl = FWDUtils.isMobile;
		this.hasGif_bl = false;
		this.hasPointerEvent_bl = FWDUtils.hasPointerEvent;
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setOverflow("visible");
			
			if(self.type_str == "tooltip" || !self.toolTipLabel_str) self.hasToolTip_bl = false;
			if(self.normalImagePath_str.indexOf(".gif") != -1) self.hasGif_bl = true;
			
			
			self.setWidth(self.width);
			self.setHeight(self.height);
		
			if(self.regPoint_str == "center"){
				self.offsetX = -(parseInt(self.width/2));
				self.offsetY = -(parseInt(self.height/2));	
			}else if(self.regPoint_str == "centertop"){
				self.offsetX = -(parseInt(self.width/2));
				self.offsetY = 0;
			}else if(self.regPoint_str == "centerbottom"){
				self.offsetX = -(parseInt(self.width/2));
				self.offsetY = -self.height;
			}
			
			self.setupMainContainers();
			
			self.hide();
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){
			self.n_do = new FWDTransformDisplayObject("img");
			self.n_do.setWidth(self.width);
			self.n_do.setHeight(self.height);
			self.n_do.screen.src =  self.normalImagePath_str;
		
			self.s_do = new FWDTransformDisplayObject("img");
			self.s_do.setWidth(self.width);
			self.s_do.setHeight(self.height);
			self.s_do.screen.src = self.selectedImagePath_str;
			
			if(self.isHtml5_bl){
				if(self.regPoint_str == "center"){
					self.n_do.setTransformOrigin(50, 50);	
					self.s_do.setTransformOrigin(50, 50);
				}else if(self.regPoint_str == "centertop"){
					self.n_do.setTransformOrigin(50, 0);	
					self.s_do.setTransformOrigin(50, 0);
				}else if(self.regPoint_str == "centerbottom"){
					self.n_do.setTransformOrigin(50, 100);	
					self.s_do.setTransformOrigin(50, 100);
				}
			}
			
			if(self.hasGif_bl){
				self.addChild(self.s_do);
				self.addChild(self.n_do);
			}else{
				self.s_do.setAlpha(0);
				self.addChild(self.n_do);
				self.addChild(self.s_do);
				
			}
			
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
			if(self.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				self.dispatchEvent(FWDMarker.MOUSE_OVER, {e:e});
				TweenMax.killTweensOf(self.s_do);
				TweenMax.killTweensOf(self.n_do);
				if(self.isHtml5_bl){
					self.n_do.setScale(1);
					self.s_do.setScale(1);
				}else{
					self.n_do.setWidth(self.width);
					self.n_do.setHeight(self.height);
					self.s_do.setWidth(self.width);
					self.s_do.setHeight(self.height);
				}
				
				if(self.hasGif_bl){
					TweenMax.to(self.n_do, .5, {alpha:0, delay:.1, ease:Expo.easeOut});
				}else{
					TweenMax.to(self.s_do, .5, {alpha:1, delay:.1, ease:Expo.easeOut});
				}
			}
		};
			
		self.onMouseOut = function(e){
			if(self.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				self.dispatchEvent(FWDMarker.MOUSE_OUT, {e:e});
				if(self.type_str != "tooltip" || self.hasPointerEvent_bl) self.setNormalState();
			}
		};
			
		self.onClick = function(e){
			if(self.isDisabled_bl) return;
			if(self.type_str == "link"){
				window.open(self.link_str, self.target_str);
				self.dispatchEvent(FWDMarker.MOUSE_OUT, {e:e});
			}
			self.dispatchEvent(FWDMarker.CLICK, {e:e});
		};
		
		self.onMouseDown = function(e){
			if(e.preventDefault) e.preventDefault();
			if(self.isDisabled_bl) return;
			if(self.isMobile_bl && !self.hasPointerEvent_bl){
				if(self.type_str == "link"){
					window.open(self.link_str, self.target_str);
					self.dispatchEvent(FWDMarker.MOUSE_OUT, {e:e});
				}
			}
			self.dispatchEvent(FWDMarker.MOUSE_DOWN, {e:e});
		};
		
		this.setNormalState = function(){
			TweenMax.killTweensOf(self.s_do);
			if(self.hasGif_bl){
				TweenMax.to(self.n_do, .5, {alpha:1, ease:Expo.easeOut});	
			}else{
				TweenMax.to(self.s_do, .5, {alpha:0, ease:Expo.easeOut});
			}
		};
		
		//##############################//
		// hide / show.
		//##############################//
		self.hide = function(){
			if(!self.isShowed_bl) return;
			TweenMax.killTweensOf(self);
			TweenMax.killTweensOf(self.n_do);
			TweenMax.killTweensOf(self.s_do);
			self.setX(-5000);
			self.isShowed_bl = false;
		};
		
		self.show = function(){
			if(self.isShowed_bl || self.isHiddenFinal_bl) return;
			TweenMax.killTweensOf(self);
			TweenMax.killTweensOf(self.n_do);
			TweenMax.killTweensOf(self.s_do);
			self.setX(self.finalX);
			self.setY(self.finalY);
			self.isShowed_bl = true;
			
			if(self.isHtml5_bl){
				self.n_do.setScale(0);
				self.s_do.setScale(0);
				TweenMax.to(self.n_do, .8, {scale:1, delay:.1, ease:Elastic.easeOut});
				TweenMax.to(self.s_do, .8, {scale:1, delay:.1, ease:Elastic.easeOut});
			}else{
				self.n_do.setWidth(0);
				self.n_do.setHeight(0);
				self.s_do.setWidth(0);
				self.s_do.setHeight(0);
				TweenMax.to(self.n_do, .8, {w:self.width, h:self.height, delay:.1, ease:Elastic.easeOut});
				TweenMax.to(self.s_do, .8, {w:self.width, h:self.height, delay:.1, ease:Elastic.easeOut});
			}
		};
		
		//##############################//
		/* destroy */
		//##############################//
		self.destroy = function(){
			
			if(self.isMobile_bl){
				self.screen.removeEventListener("touchstart", self.onMouseDown);
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
		
			TweenMax.killTweensOf(self.n_do);
			TweenMax.killTweensOf(self.s_do);
			self.n_do.src = null;
			self.s_do.src = null;
			self.n_do.destroy();
			self.s_do.destroy();
		
			self.n_do = null;
			self.s_do = null;
			
			self.markerId = null;
			self.normalImagePath_str = null;
			self.selectedImagePath_str = null;
			self.type_str = null;
			self.toolTipLabel_str = null;
			self.innerHTML_str = null;
			self.link_str = null;
			self.target_str = null;
			self.regPoint_str = null;
			
			markerId = null;
			normalImagePath = null; 
			selectedImagePath = null;
			type = null;
			regPoint = null;
			toolTipLabel = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDMarker.prototype = null;
		};
	
		self.init();
	};
	
	/* set prototype */
	FWDMarker.setPrototype = function(){
		FWDMarker.prototype = new FWDDisplayObject("div");
	};
	
	FWDMarker.CLICK = "onClick";
	FWDMarker.MOUSE_OVER = "onMouseOver";
	FWDMarker.MOUSE_OUT = "onMouseOut";
	FWDMarker.MOUSE_DOWN = "onMouseDown";
	
	FWDMarker.prototype = null;
	window.FWDMarker = FWDMarker;
}(window));