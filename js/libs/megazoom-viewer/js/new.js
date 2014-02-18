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
}(window));/* FWDComplexButton */
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
}(window));/* Thumb */
(function (window){
	
	var FWDConsole = function(){
		
		var self  = this;
		var prototype = FWDConsole.prototype;
		
		this.main_do = null;
	
		this.init = function(){
			this.setupScreen();
			window.onerror = this.showError;
			this.screen.style.zIndex = 100000009;
			setTimeout(this.addConsoleToDom, 100);
			setInterval(this.position, 100);
		};
		
		this.position = function(){
			var scrollOffsets = FWDUtils.getScrollOffsets();
			self.setX(scrollOffsets.x);
			self.setY(scrollOffsets.y);
		};
		
		this.addConsoleToDom  = function(){
			if(navigator.userAgent.toLowerCase().indexOf("msie 7") != -1){
				document.getElementsByTagName("body")[0].appendChild(self.screen);
			}else{
				document.documentElement.appendChild(self.screen);
			}
		};
		
		/* setup screens */
		this.setupScreen = function(){
			this.main_do = new FWDDisplayObject("div", "absolute");
			this.main_do.setOverflow("auto");
			this.main_do.setWidth(200);
			this.main_do.setHeight(300);
			this.setWidth(200);
			this.setHeight(300);
			this.main_do.setBkColor("#FFFFFF");
			this.addChild(this.main_do);
		};
		
		this.showError = function(message, url, linenumber) {
			var currentInnerHTML = self.main_do.getInnerHTML() + "<br>" + "JavaScript error: " + message + " on line " + linenumber + " for " + url;
			self.main_do.setInnerHTML(currentInnerHTML);
			self.main_do.screen.scrollTop = self.main_do.screen.scrollHeight;
		};
		
		this.log = function(message){
			var currentInnerHTML = self.main_do.getInnerHTML() + "<br>" + message;
			self.main_do.setInnerHTML(currentInnerHTML);  
			self.main_do.getScreen().scrollTop = 10000;
		};
		
		this.init();
	};
	
	/* set prototype */
    FWDConsole.setPrototype = function(){
    	FWDConsole.prototype = new FWDDisplayObject("div", "absolute");
    };
    
    FWDConsole.prototype = null;
	window.FWDConsole = FWDConsole;
}(window));/* Context menu */
(function (){
	var FWDContextMenu = function(parent, data){
		
		var self = this;
		var prototype = FWDContextMenu.prototype;
		self.parent = parent;
		
		self.buttonsTest_ar = data.buttons_ar;
		self.itemsLabels_ar = data.contextMenuLabels_ar;
	
		self.items_ar = [];
		self.spacers_ar = [];
		
		self.moveLeftButton_do = null;
		self.moveRightButton_do = null;
		self.moveUpButton_do = null;
		self.moveDownButton_do = null;
		self.infoButton_do = null;
		self.fullScreenButton_do = null;
		self.zoomInButton_do = null;
		self.zoomOutButton_do = null;
		self.hideOrShowMarkersButton_do = null;
		self.hideOrShowController_do = null;
		self.infoButton_do = null;
		self.fullScreenButton_do = null;
	
		self.backgroundColor_str = data.contextMenuBackgroundColor_str;
		self.borderColor_str = data.contextMenuBorderColor_str;
		self.spacerColor_str = data.contextMenuSpacerColor_str;
		self.itemNormalColor_str = data.contextMenuItemNormalColor_str;
		self.itemSelectedColor_str = data.contextMenuItemSelectedColor_str;
		self.itemDisabledColor_str = data.contextMenuItemDisabledColor_str;
		self.draggingMode_str = data.startDraggingMode_str;
		self.link_str = data.link_str;
		
		self.borderRadius = 6;
		self.biggestWidth;
		self.totalWidth = 400;
		self.totalHeight = 400;
		self.sapaceBetweenButtons = 7;
		self.padding = 6;
		
		self.getMaxWidthResizeAndPositionId_to;
		
		self.inverseNextAndPrevRotation_bl = data.inverseNextAndPrevRotation_bl;
		self.showScriptDeveloper_bl = data.showScriptDeveloper_bl;
		self.show_bl = false;
		self.isActive_bl = false;
		self.areLeftAndRightButtonsDisabled_bl = true;
		self.areUpAndDownButtonsDisabled_bl = true;
		
		self.init = function(){
			
			if(self.itemsLabels_ar || self.showScriptDeveloper_bl){	
				self.show_bl = true;
			
				self.setWidth(self.totalWidth);
				self.setHeight(self.totalHeight);
				self.setBkColor(self.backgroundColor_str);
				self.getStyle().borderColor = self.borderColor_str;
				self.getStyle().borderStyle = "solid";
				self.getStyle().borderRadius = self.borderRadius + "px";
				self.getStyle().borderWidth = "1px";
				self.setVisible(false);
				self.setY(-2000);
				self.parent.main_do.addChild(self);
				
				self.setupLabels();	
				self.setupDeveloperButton();
				self.setupSpacers();
				self.getMaxWidthResizeAndPositionId_to = setTimeout(self.getMaxWidthResizeAndPosition, 200);
			}
			
			self.addContextEvent();
		};
		
		
		//##########################################//
		/* Setup context items. */
		//##########################################//
		self.setupLabels = function(){
			var len = self.buttonsTest_ar.length;
			var res;
			var label1_str = "";
			var label2_str = "";
			
			if(!self.itemsLabels_ar) return;
			
			for(var i=0; i<len; i++){
				res = self.buttonsTest_ar[i];	
				
				if(res == "moveleft"){
					label1_str = self.itemsLabels_ar[i] || "Contextmenu item is not defined!";
					FWDContextMenuButton.setPrototype();
					self.moveLeftButton_do = new FWDContextMenuButton(label1_str, undefined, self.itemNormalColor_str, self.itemSelectedColor_str, self.itemDisabledColor_str);
					self.items_ar.push(self.moveLeftButton_do);
					self.moveLeftButton_do.addListener(FWDContextMenuButton.MOUSE_DOWN, self.moveLeftHandler);
					self.moveLeftButton_do.disable();
					self.addChild(self.moveLeftButton_do);
				}else if(res == "moveright"){
					label1_str = self.itemsLabels_ar[i] || "Contextmenu item is not defined!";
					FWDContextMenuButton.setPrototype();
					self.moveRightButton_do = new FWDContextMenuButton(label1_str, undefined, self.itemNormalColor_str, self.itemSelectedColor_str, self.itemDisabledColor_str);
					self.items_ar.push(self.moveRightButton_do);
					if(self.draggingMode_str == FWDController.ROTATE) self.moveRightButton_do.disable();
					self.moveRightButton_do.addListener(FWDContextMenuButton.MOUSE_DOWN, self.moveRightHandler);
					self.moveRightButton_do.disable();
					self.addChild(self.moveRightButton_do);
				}else if(res == "moveup"){
					label1_str = self.itemsLabels_ar[i] || "Contextmenu item is not defined!";
					FWDContextMenuButton.setPrototype();
					self.moveUpButton_do = new FWDContextMenuButton(label1_str, undefined, self.itemNormalColor_str, self.itemSelectedColor_str, self.itemDisabledColor_str);
					self.items_ar.push(self.moveUpButton_do);
					self.moveUpButton_do.addListener(FWDContextMenuButton.MOUSE_DOWN, self.moveUpHandler);
					self.moveUpButton_do.disable();
					self.addChild(self.moveUpButton_do);
				}else if(res == "movedown"){
					label1_str = self.itemsLabels_ar[i] || "Contextmenu item is not defined!";
					FWDContextMenuButton.setPrototype();
					self.moveDownButton_do = new FWDContextMenuButton(label1_str, undefined, self.itemNormalColor_str, self.itemSelectedColor_str, self.itemDisabledColor_str);
					self.items_ar.push(self.moveDownButton_do);
					self.moveDownButton_do.addListener(FWDContextMenuButton.MOUSE_DOWN, self.downButtonStartHandler);
					self.moveDownButton_do.disable();
					self.addChild(self.moveDownButton_do);
				}else if(res == "scrollbar"){
					var str = self.itemsLabels_ar[i];
					if(str){
						if(str.indexOf("/") == -1){
							label1_str = "Contextmenu item is not defined!";
							label2_str = "Contextmenu item is not defined!";
						}else{
							label1_str = str.substr(0, str.indexOf("/"));
							label2_str = str.substr(str.indexOf("/") + 1);
						}
					}else{
						label1_str = "Contextmenu item is not defined!";
						label2_str = "Contextmenu item is not defined!";
					}
					
					FWDContextMenuButton.setPrototype();
					self.zoomInButton_do = new FWDContextMenuButton(label1_str, undefined, self.itemNormalColor_str, self.itemSelectedColor_str, self.itemDisabledColor_str);
					self.items_ar.push(self.zoomInButton_do);
					self.zoomInButton_do.addListener(FWDContextMenuButton.MOUSE_DOWN, self.zoomInButtonStartHandler);
					self.addChild(self.zoomInButton_do);
					
					FWDContextMenuButton.setPrototype();
					self.zoomOutButton_do = new FWDContextMenuButton(label2_str, undefined, self.itemNormalColor_str, self.itemSelectedColor_str, self.itemDisabledColor_str);
					self.items_ar.push(self.zoomOutButton_do);
					self.zoomOutButton_do.addListener(FWDContextMenuButton.MOUSE_DOWN, self.zoomOutButtonStartHandler);
					self.addChild(self.zoomOutButton_do);
				}else if(res == "hideorshowmarkers"){
					var str = self.itemsLabels_ar[i];
					if(str){
						if(str.indexOf("/") == -1){
							label1_str = "Contextmenu item is not defined!";
							label2_str = "Contextmenu item is not defined!";
						}else{
							label1_str = str.substr(0, str.indexOf("/"));
							label2_str = str.substr(str.indexOf("/") + 1);
						}
					}else{
						label1_str = "Contextmenu item is not defined!";
						label2_str = "Contextmenu item is not defined!";
					}
					
					FWDContextMenuButton.setPrototype();
					self.hideOrShowMarkersButton_do = new FWDContextMenuButton(label1_str, label2_str, self.itemNormalColor_str, self.itemSelectedColor_str, self.itemDisabledColor_str);
					self.items_ar.push(self.hideOrShowMarkersButton_do);
					self.hideOrShowMarkersButton_do.addListener(FWDContextMenuButton.MOUSE_DOWN, self.startHideOrShowMarkersButton);
					self.addChild(self.hideOrShowMarkersButton_do);
				}else if(res == "info"){
					label1_str = self.itemsLabels_ar[i] || "Contextmenu item is not defined!";
					FWDContextMenuButton.setPrototype();
					self.infoButton_do = new FWDContextMenuButton(label1_str, label2_str, self.itemNormalColor_str, self.itemSelectedColor_str, self.itemDisabledColor_str);
					self.items_ar.push(self.infoButton_do);
					self.infoButton_do.addListener(FWDContextMenuButton.MOUSE_DOWN, self.infoButtonStart);
					self.addChild(self.infoButton_do);
				}else if(res == "hideorshowcontroller"){
					var str = self.itemsLabels_ar[i];
					if(str){
						if(str.indexOf("/") == -1){
							label1_str = "Contextmenu item is not defined!";
							label2_str = "Contextmenu item is not defined!";
						}else{
							label1_str = str.substr(0, str.indexOf("/"));
							label2_str = str.substr(str.indexOf("/") + 1);
						}
					}else{
						label1_str = "Contextmenu item is not defined!";
						label2_str = "Contextmenu item is not defined!";
					}
					
					FWDContextMenuButton.setPrototype();
					self.hideOrShowController_do = new FWDContextMenuButton(label1_str, label2_str, self.itemNormalColor_str, self.itemSelectedColor_str, self.itemDisabledColor_str);
					self.items_ar.push(self.hideOrShowController_do);
					self.hideOrShowController_do.addListener(FWDContextMenuButton.CLICK, self.startHideOrShowControllerHandler);
					self.addChild(self.hideOrShowController_do);
				}else if(res == "fullscreen"){
					if(!(parent.displayType == FWDMegazoom.FULL_SCREEN && !FWDUtils.hasFullScreen)){
						str =  self.itemsLabels_ar[i];
						if(str){
							if(str.indexOf("/") == -1){
								label1_str = "Contextmenu item is not defined!";
								label2_str = "Contextmenu item is not defined!";
							}else{
								label1_str = str.substr(0, str.indexOf("/"));
								label2_str = str.substr(str.indexOf("/") + 1);
							}
						}else{
							label1_str = "Contextmenu item is not defined!";
							label2_str = "Contextmenu item is not defined!";
						}
						FWDContextMenuButton.setPrototype();
						self.fullScreenButton_do = new FWDContextMenuButton(label1_str, label2_str, self.itemNormalColor_str, self.itemSelectedColor_str, self.itemDisabledColor_str);
						self.items_ar.push(self.fullScreenButton_do);
						self.fullScreenButton_do.addListener(FWDContextMenuButton.MOUSE_DOWN, self.fullScreenStartHandler);
						self.addChild(self.fullScreenButton_do);
					}
				}
			}
		};
		
		self.setupDeveloperButton = function(){
			if(self.showScriptDeveloper_bl){
				if(!self.itemsLabels_ar) self.itemsLabels_ar = [];
				self.itemsLabels_ar.push("&#0169; made by FWD");
				label1_str = "&#0169; made by FWD";
				FWDContextMenuButton.setPrototype();
				self.developerButton_do = new FWDContextMenuButton(label1_str, undefined, self.itemSelectedColor_str, self.itemNormalColor_str, self.itemDisabledColor_str);
				self.developerButton_do.isDeveleper_bl = true;
				self.items_ar.push(self.developerButton_do);
				self.addChild(self.developerButton_do);
			}
		};
		
		//pann button.
		this.enableLeftAndRightButtons = function(){
			self.areLeftAndRightButtonsDisabled_bl = false;
			if(self.moveLeftButton_do) self.moveLeftButton_do.enable();
			if(self.moveRightButton_do) self.moveRightButton_do.enable();
		};
		
		this.disableLeftAndRightButtons = function(){
			self.areLeftAndRightButtonsDisabled_bl = true;
			if(self.moveLeftButton_do) self.moveLeftButton_do.disable();
			if(self.moveRightButton_do) self.moveRightButton_do.disable();
		};
		
		this.enableUpAndDownButtons = function(){
			self.areUpAndDownButtonsDisabled_bl = false;
			if(self.moveUpButton_do) self.moveUpButton_do.enable();
			if(self.moveDownButton_do) self.moveDownButton_do.enable();
		};
		
		this.disableUpAndDownButtons = function(){
			self.areUpAndDownButtonsDisabled_bl = true;
			if(self.moveUpButton_do) self.moveUpButton_do.disable();
			if(self.moveDownButton_do) self.moveDownButton_do.disable();
		};
		
		//move hadnlers
		self.moveLeftHandler = function(e){
			self.dispatchEvent(FWDController.PAN, {e:e, dir:"left"});
		};
		
		self.moveRightHandler = function(e){
			self.dispatchEvent(FWDController.PAN, {e:e, dir:"right"});
		};
		
		self.moveUpHandler = function(e){
			self.dispatchEvent(FWDController.PAN, {e:e, dir:"up"});
		};
		
		self.downButtonStartHandler = function(e){
			self.dispatchEvent(FWDController.PAN, {e:e, dir:"down"});
		};
		
		//zoom in/out buttons.
		self.zoomInButtonStartHandler = function(e){
			self.dispatchEvent(FWDController.ZOOM_IN, {e:e});
		};
		
		self.zoomOutButtonStartHandler = function(e){
			self.dispatchEvent(FWDController.ZOOM_OUT, {e:e});
		};
		
		//slideshow buttton.
		self.startHideOrShowMarkersButton = function(e){
			if(self.hideOrShowMarkersButton_do.currentState == 0){
				self.dispatchEvent(FWDController.HIDE_MARKERS, {e:e});
			}else{
				self.dispatchEvent(FWDController.SHOW_MARKERS, {e:e});
			}
		};
		
		self.updateHideOrShowMarkersButton = function(currentState){
			if(!self.hideOrShowMarkersButton_do) return;
			if(currentState == 0){
				self.hideOrShowMarkersButton_do.setButtonState(0);
			}else{
				self.hideOrShowMarkersButton_do.setButtonState(1);
			}
		};
		
		//info
		self.infoButtonStart = function(e){
			self.removeFromDOM();
			self.dispatchEvent(FWDController.SHOW_INFO);
		};
		
		//full screen.
		self.fullScreenStartHandler = function(e){
			if(self.fullScreenButton_do.currentState == 0){
				self.dispatchEvent(FWDController.GO_FULL_SCREEN);
			}else if(self.fullScreenButton_do.currentState == 1){
				self.dispatchEvent(FWDController.GO_NORMAL_SCREEN);
			}
			self.fullScreenButton_do.onMouseOut();
		};
		
		self.updateFullScreenButton = function(currentState){
			if(!self.fullScreenButton_do) return;
			if(currentState == 0){
				self.fullScreenButton_do.setButtonState(0);
			}else{
				self.fullScreenButton_do.setButtonState(1);
			}
			self.removeFromDOM();
		};
	
		//hide or show controller.
		self.startHideOrShowControllerHandler = function(e){
			if(self.hideOrShowController_do.currentState == 0){
				self.updateHideControllerButton(1);
				self.dispatchEvent(FWDController.HIDE_CONTROLLER);
			}else if(self.hideOrShowController_do.currentState == 1){
				self.updateHideControllerButton(0);
				self.dispatchEvent(FWDController.SHOW_CONTROLLER);
			}
		};
		
		self.updateHideControllerButton = function(currentState){
			if(!self.hideOrShowController_do) return;
			if(currentState == 0){
				self.hideOrShowController_do.setButtonState(0);
			}else{
				self.hideOrShowController_do.setButtonState(1);
			}
		};
		
		
		//########################################//
		/* setup sapcers */
		//########################################//
		self.setupSpacers = function(){
			var totalSpacers = self.items_ar.length - 1;
			var spacer_sdo;
			
			for(var i=0; i<totalSpacers; i++){
				spacer_sdo = new FWDSimpleDisplayObject("div");
				self.spacers_ar[i] = spacer_sdo;
				spacer_sdo.setHeight(1);
				spacer_sdo.setBkColor(self.spacerColor_str);
				self.addChild(spacer_sdo);
			};
		};
		
		//########################################//
		/* Get max width and position */
		//#######################################//
		self.getMaxWidthResizeAndPosition = function(){
			var totalItems = self.items_ar.length;
			var item_do;
			var spacer;
			var finalX;
			var finalY;
			self.totalWidth = 0;
			self.totalHeight = 0;
			for(var i=0; i<totalItems; i++){
				item_do = self.items_ar[i];
				if(item_do.getMaxTextWidth() > self.totalWidth) self.totalWidth = item_do.getMaxTextWidth();
			};
			
			for(var i=0; i<totalItems; i++){
				spacer = self.spacers_ar[i - 1];
				item_do = self.items_ar[i];
				item_do.setX(self.padding);
				item_do.setY(10 + (i * (item_do.totalHeight + self.sapaceBetweenButtons)) - self.padding);
				
				if(spacer){
					spacer.setWidth(self.totalWidth + 2);
					spacer.setX(self.padding);
					spacer.setY(parseInt(item_do.getY() - self.sapaceBetweenButtons/2) - 1);
				};
				
				
				item_do.setWidth(self.totalWidth + 2);
				item_do.centerText();
			}
			
			self.totalHeight = item_do.getY() + item_do.totalHeight + 2;
			
			self.setWidth(self.totalWidth + self.padding * 2 + 4);
			self.setHeight(self.totalHeight);
			
			self.setVisible(true);
			self.removeFromDOM();
		};
		
		//##########################################//
		/* Add context events. */
		//##########################################//
		self.addContextEvent = function(){
			if(self.parent.main_do.screen.addEventListener){
				self.parent.main_do.screen.addEventListener("contextmenu", self.contextMenuHandler);
			}else{
				self.parent.main_do.screen.attachEvent("oncontextmenu", self.contextMenuHandler);
			}
		};
		
		self.contextMenuHandler = function(e){	
			if(!self.show_bl || !self.isActive_bl){
				if(e.preventDefault){
					e.preventDefault();
				}else{
					return false;
				}	
				return;
			}
			
			self.parent.main_do.addChild(self);
			self.positionButtons(e);
			self.setAlpha(0);
			TweenMax.to(self, .4, {alpha:1, ease:Quart.easeOut});
			
			if(window.addEventListener){
				window.addEventListener("mousedown", self.contextMenuWindowOnMouseDownHandler);
				window.addEventListener("mouseup", self.contextMenuWindowOnMouseDownHandler);
			}else{
				document.documentElement.attachEvent("onmousedown", self.contextMenuWindowOnMouseDownHandler);
				document.documentElement.attachEvent("onmouseup", self.contextMenuWindowOnMouseDownHandler);
			}
			
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}
		};
		
		self.contextMenuWindowOnMouseDownHandler = function(e){
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);
			
			var screenX =  viewportMouseCoordinates.screenX;
			var screenY =  viewportMouseCoordinates.screenY;
			
			
			if(!FWDUtils.hitTest(self.screen, screenX, screenY)){
				if(window.removeEventListener){
					window.removeEventListener("mousedown", self.contextMenuWindowOnMouseDownHandler);
					window.removeEventListener("mouseup", self.contextMenuWindowOnMouseDownHandler);
				}else{
					document.documentElement.detachEvent("onmousedown", self.contextMenuWindowOnMouseDownHandler);
					document.documentElement.detachEvent("onmouseup", self.contextMenuWindowOnMouseDownHandler);
				}
				self.removeFromDOM();
			}
		};
	
		//####################################//
		/* position buttons */
		//####################################//
		self.positionButtons = function(e){
		
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);
			var parentWidth = self.parent.main_do.getWidth();
			var parentHeight = self.parent.main_do.getHeight();
		
			var localX = viewportMouseCoordinates.screenX - self.parent.main_do.getGlobalX();
			var localY = viewportMouseCoordinates.screenY - self.parent.main_do.getGlobalY();
			var finalX = localX - 2;
			var finalY = localY - 2;
			self.totalWidth = self.getWidth();
			self.totalHeight = self.getHeight();
			
			if(finalX + self.totalWidth > parentWidth - 2) finalX = localX - self.totalWidth;
			if(finalX < 0) finalX = parseInt((parentWidth - self.totalWidth)/2);
			if(finalX < 0) finalX = 0;
			
			if(finalY + self.totalHeight > parentHeight - 2) finalY = localY - self.totalHeight;
			if(finalY < 0) finalY = parseInt((parentHeight - self.totalHeight)/2);
			if(finalY < 0) finalY = 0;
	
			self.setX(finalX);
			self.setY(finalY);			
		};
		
		//########################################//
		/* disable / enable */
		//########################################//
		self.disable = function(){
			if(self.moveLeftButton_do) self.moveLeftButton_do.disable();
			if(self.moveRightButton_do) self.moveRightButton_do.disable();
			if(self.moveUpButton_do) self.moveUpButton_do.disable();
			if(self.moveDownButton_do) self.moveDownButton_do.disable();
			if(self.hideOrShowMarkersButton_do) self.hideOrShowMarkersButton_do.disable();
			if(self.hideOrShowController_do) self.hideOrShowController_do.disable();
			if(self.infoButton_do) self.infoButton_do.disable();
			if(self.zoomInButton_do) self.zoomInButton_do.disable();
			if(self.zoomOutButton_do) self.zoomOutButton_do.disable();
		};
		
		self.enable = function(){
			if(self.moveLeftButton_do && !self.areLeftAndRightButtonsDisabled_bl) self.moveLeftButton_do.enable();
			if(self.moveRightButton_do && !self.areLeftAndRightButtonsDisabled_bl) self.moveRightButton_do.enable();
			if(self.moveUpButton_do && !self.areUpAndDownButtonsDisabled_bl) self.moveUpButton_do.enable();
			if(self.moveDownButton_do && !self.areUpAndDownButtonsDisabled_bl) self.moveDownButton_do.enable();
			if(self.hideOrShowMarkersButton_do) self.hideOrShowMarkersButton_do.enable();
			if(self.hideOrShowController_do) self.hideOrShowController_do.enable();
			if(self.infoButton_do) self.infoButton_do.enable();
			if(self.zoomInButton_do) self.zoomInButton_do.enable();
			if(self.zoomOutButton_do) self.zoomOutButton_do.enable();
		};
		
		//######################################//
		/* remove from DOM */
		//######################################//
		self.removeFromDOM = function(){
			if(self.parent.main_do.contains(self)) self.parent.main_do.removeChild(self);
		};
		
		//######################################//
		/* destory */
		//######################################//
		self.destroy = function(){
			var length;
			
			clearTimeout(self.getMaxWidthResizeAndPositionId_to);
			
			TweenMax.killTweensOf(self);
			
			if(window.removeEventListener){
				window.removeEventListener("mousedown", self.contextMenuWindowOnMouseDownHandler);
				window.removeEventListener("mouseup", self.contextMenuWindowOnMouseDownHandler);
				self.parent.main_do.screen.removeEventListener("contextmenu", self.contextMenuHandler);
			}else{
				document.documentElement.detachEvent("onmousedown", self.contextMenuWindowOnMouseDownHandler);
				document.documentElement.detachEvent("onmouseup", self.contextMenuWindowOnMouseDownHandler);
				self.parent.main_do.screen.detachEvent("oncontextmenu", self.contextMenuHandler);
			}
			
			length = self.items_ar.length;
			for(var i=0; i<length; i++){
				self.items_ar[i].destroy();
			}
			
			length = self.spacers_ar.length;
			for(var i=0; i<length; i++){
				self.spacers_ar[i].destroy();
			}
			
			self.buttonsTest_ar = null;
			self.itemsLabels_ar = null;
			self.items_ar = null;
			self.spacers_ar = null;
			
			self.moveLeftButton_do = null;
			self.moveRightButton_do = null;
			self.moveUpButton_do = null;
			self.moveDownButton_do = null;
			self.hideOrShowMarkersButton_do = null;
			self.infoButton_do = null;
			self.hideOrShowController_do = null;
			self.fullScreenButton_do = null;
			self.zoomInButton_do = null;
			self.zoomOutButton_do = null;
			self.hideOrShowController_do = null;
			self.infoButton_do = null;
			self.fullScreenButton_do = null;
			
			self.backgroundColor_str = null;
			self.borderColor_str = null;
			self.spacerColor_str = null;
			self.itemNormalColor_str = null;
			self.itemSelectedColor_str = null;
			self.itemDisabledColor_str = null;
			self.draggingMode_str = null;
			self.link_str = null;
		
			parent = null;
			data = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			prototype = null;
			self = null;
			FWDContextMenu.prototype = null;
		};
		
		self.init();
	};
	
	FWDContextMenu.setPrototype = function(){
		FWDContextMenu.prototype = new FWDDisplayObject("div");
	};
	
	
	FWDContextMenu.prototype = null;
	window.FWDContextMenu = FWDContextMenu;
	
}(window));
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
}(window));/* FWDController */
(function(){
var FWDController = function(
			data,
			parent
		){
		
		var self = this;
		var prototype = FWDController.prototype;
		
		this.buttonsTest_ar = data.buttons_ar;
		this.buttonsLabels_ar = data.buttonsLabels_ar;
		this.markersList_ar = [];
		this.markersPosition_ar = [];
		this.buttons_ar = [];
	
		this.backgroundLeft_img = data.controllerBackgroundLeft_img;
		this.backgroundRight_img = data.controllerBackgroundRight_img;
		this.downN_img = data.controllerMoveDownN_img;
		this.downS_img = data.controllerMoveDownS_img;
		this.downD_img = data.controllerMoveDownD_img;
		this.upN_img = data.controllerMoveUpN_img;
		this.upS_img = data.controllerMoveUpS_img;
		this.upD_img = data.controllerMoveUpD_img;
		this.nextN_img = data.controllerNextN_img;
		this.nextS_img = data.controllerNextS_img;
		this.nextD_img = data.controllerNextD_img;
		this.prevN_img = data.controllerPrevN_img;
		this.prevS_img = data.controllerPrevS_img;
		this.prevD_img = data.controllerPrevD_img;
		this.controllerHideMarkersN_img = data.controllerHideMarkersN_img;
		this.controllerHideMarkersS_img = data.controllerHideMarkersS_img;
		this.controllerShowMarkersN_img = data.controllerShowMarkersN_img;
		this.controllerShowMarkersS_img = data.controllerShowMarkersS_img;
		this.infoN_img = data.controllerInfoN_img;
		this.infoS_img = data.controllerInfoS_img;
		this.controllerHideN_img = data.controllerHideN_img;;
		this.controllerHideS_img = data.controllerHideS_img;
		this.controllerShowN_img = data.controllerShowN_img;
		this.controllerShowS_img = data.controllerShowS_img;
		this.fullScreenNormalN_img = data.controllerFullScreenNormalN_img;
		this.fullScreenNormalS_img = data.controllerFullScreenNormalS_img;
		this.fullScreenFullN_img = data.controllerFullScreenFullN_img;
		this.fullScreenFullS_img = data.controllerFullScreenFullS_img;
		this.zoomInN_img = data.zoomInN_img;
		this.zoomInS_img = data.zoomInS_img;
		this.zoomOutN_img = data.zoomOutN_img;
		this.zoomOutS_img = data.zoomOutS_img;
		this.scrollBarHandlerN_img = data.scrollBarHandlerN_img;
		this.scrollBarHandlerS_img =  data.scrollBarHandlerS_img;
		this.scrollBarLeft_img = data.scrollBarLeft_img;
		this.scrollBarRight_img =  data.scrollBarRight_img;
		this.toolTipLeft_img = data.toolTipLeft_img;
		this.toolTipPointer_img = data.toolTipPointer_img;

		this.hider = null;
		this.mainHolder_do = null;
		this.backgroundLeft_sdo = null;
		this.backgroundMiddle_sdo = null;
		this.backgroundRight_sdo = null;
		this.moveDownButton_do = null;
		this.moveUpButton_do = null;
		this.moveRightButton_do = null;
		this.moveLeftButton_do = null;
		this.hideOrShowMarkersButton_do = null;
		this.infoButton_do = null;
		this.hideShowControllerButton_do = null;
		this.fullScreenButton_do = null;
		this.zoomIn_do = null;
		this.zoomOut_do = null;
		this.scrollBar_do = null;
		this.scrollBarLeft_sdo = null;
		this.scrollBarRight_sdo = null;
		this.scrollBarMiddle_sdo = null;
		this.scrollBarHandler_do = null;
		this.scrollBarHandlerN_sdo = null;
		this.scrollBarHandlerS_sdo = null;
		this.moveDownButtonTooTipLabel_do = null;
		this.scrollBarHandlerToolTip_do = null;
		this.moveUpButtonToolTip_do = null;
		this.nextButtonToolTip_do = null;
		this.moveLeftButtonToolTip_do = null;
		this.hideOrShowMarkersToolTip_do = null;
		this.infoToolTip_do = null;
		this.hideOrShowControllerToolTip_do = null;
		this.fullscreenToolTip_do = null;
		
		this.backgroundMiddlePath_str = data.controllerBackgroundMiddlePath_str;
		this.scrollBarMiddlePath_str = data.scrollBarMiddlePath_str;
		this.draggingMode_str = data.startDraggingMode_str;
		this.controllerPosition_str  = data.controllerPosition_str; 
		this.buttonToolTipLeft_str = data.buttonToolTipLeft_str;
		this.buttonToolTipMiddle_str = data.buttonToolTipMiddle_str;
		this.buttonToolTipRight_str = data.buttonToolTipRight_str;
		this.link_str = data.link_str;;
		this.buttonToolTipFontColor_str = data.buttonToolTipFontColor_str;
		this.buttonToolTipBottomPointer_str = data.buttonToolTipBottomPointer_str;
		this.buttonToolTipTopPointer_str = data.buttonToolTipTopPointer_str;
		
		this.scrollBarPosition = FWDUtils.indexOfArray(self.buttonsTest_ar, "scrollbar");
		this.controllerBackgroundOpacity = data.controllerBackgroundOpacity;
		this.panSpeed = data.buttonsPanSpeed;
		
		this.slideShowDelay = data.slideShowDelay;
		this.stageWidth;
		this.setHeight;
		this.controllerOffsetY = data.controllerOffsetY;
		this.scrollBarOffsetX = data.scrollBarOffsetX;
		this.scrollBarRightPartWidth = self.scrollBarRight_img.width;
		this.startSpaceBetweenButtons = data.startSpaceBetweenButtons;
		this.scrollBarHeight = self.scrollBarLeft_img.height;
		this.scrollBarHandlerWidth = self.scrollBarHandlerN_img.width;
		this.scrollBarHandlerHeight = self.scrollBarHandlerN_img.height;
		this.spaceBetweenButtons = data.spaceBetweenButtons;
		this.curHeight = self.backgroundLeft_img.height;
		this.zoomButtonWidth = self.zoomOutN_img.width;
		this.zoomButtonHeight = self.zoomOutN_img.height;
		this.finalHandlerX;
		this.startSpaceForScrollBarButtons = data.startSpaceForScrollBarButtons;
		this.smallSpaceForScrollBar = data.startSpaceForScrollBar;
		this.totalLargeButtons;
		this.curWidth;
		this.maxWidth = data.controllerMaxWidth;
		this.minWidth;
		this.buttonWidth = self.downN_img.width;
		this.buttonHeight = self.downN_img.height;
		this.scrollBarTotalWidth;
		this.scrollBarHandlerXPositionOnPress;
		this.lastPresedX;
		this.scrollBarHandlerToolTipOffsetY = data.scrollBarHandlerToolTipOffsetY;
		this.zoomInAndOutToolTipOffsetY = data.zoomInAndOutToolTipOffsetY;
		this.buttonsToolTipOffsetY = data.buttonsToolTipOffsetY;
		this.hideControllerOffsetY = data.hideControllerOffsetY;
		
		this.panImageId_int;
		this.zoomWithButtonsId_int;
		this.slideShowId_int;
		this.gotoImageId_to;
		this.zoomWithButtonsId_to;
		this.showId_to;
		this.disableForAWhileHideOrShowControllerToolTipId_to;
		
		this.showScrollBar_bl = false;
		if(FWDUtils.indexOfArray(self.buttonsTest_ar, "scrollbar") != -1) self.showScrollBar_bl = true;
		
		this.isMobile_bl = data.isMobile_bl;
		this.inverseNextAndPrevRotation_bl = data.inverseNextAndPrevRotation_bl;
		this.addKeyboardSupport_bl = data.addKeyboardSupport_bl;
		this.isScrollBarActive_bl = false;
		this.isZoomInOrOutPressed_bl = false;
		this.isHiddenForGood_bl = false;
		this.disableHideOrShowControllerToolTip_bl = false;
		this.showButtonsLabels_bl = Boolean(self.buttonsLabels_ar);
		this.hasPointerEvent_bl = FWDUtils.hasPointerEvent;

		//##########################################//
		/* initialize this */
		//##########################################//
		self.init = function(){
			self.setOverflow("visible");
			self.setSelectable(false);
			
			self.setupMainHolder();
			self.setupBackground();
			self.setupButtons();
			if(self.addKeyboardSupport_bl) self.addKeyboardSupport();
			
			self.totalLargeButtons = self.buttons_ar.lenght;
			if(self.showScrollBar_bl) self.setupScrollBar();
			if(self.buttonsTest_ar.length == 0 && !self.showScrollBar_bl) self.setVisible(false);
			self.hide();
			self.showId_to = setTimeout(self.show, 1000);
			
			self.screen.onmousedown = function(){
				self.dispatchEvent(FWDController.MOUSE_DOWN);
			};
		};
		
		//###########################################//
		// Resize and position self...
		//###########################################//
		self.resizeAndPosition = function(){
			if(parent.stageWidth == self.stageWidth && parent.stageHeight == self.stageHeight) return;
					
			self.stageWidth = parent.stageWidth;
			self.stageHeight = parent.stageHeight;
		
			self.positionButtons();
		};
		
		//##########################################//
		//Setup main container.
		//##########################################//
		self.setupMainHolder = function(){
			self.mainHolder_do = new FWDDisplayObject("div");
			self.mainHolder_do.setOverflow("visible");
			self.addChild(self.mainHolder_do);
		};
		
		//##########################################//
		//Setup hider.
		//##########################################//
		self.setupHider = function(hider){
			self.hider = hider;
			self.hider.addListener(FWDHider.SHOW, self.onHiderShow);
			self.hider.addListener(FWDHider.HIDE, self.onHiderHide);
		};
		
		self.onHiderShow = function(){
			if(self.isHiddenForGood_bl) return;
			self.show();
		};
		
		self.onHiderHide = function(){
			if(self.isHiddenForGood_bl) return;
			if(FWDUtils.hitTest(self.mainHolder_do.screen, self.hider.globalX, self.hider.globalY)){
				self.hider.reset();
				return;
			}else{
				self.hide(true);
			}
		};
		
		
		//##########################################//
		/* Setup buttons. */
		//##########################################//
		self.setupButtons = function(){
			var len = self.buttonsTest_ar.length;
			var res;
			var label1_str = "";
			var label2_str = "";
			for(var i=0; i<len; i++){
				res = self.buttonsTest_ar[i];		
				if(res == "movedown"){
					if(self.showButtonsLabels_bl) label1_str = self.buttonsLabels_ar[i] || "tooltip is not defined!";
					self.setupDownButton(label1_str);
					self.buttons_ar.push(self.moveDownButton_do);
				}else if(res == "moveup"){
					if(self.showButtonsLabels_bl) label1_str = self.buttonsLabels_ar[i] || "tooltip is not defined!";
					self.setupUpButton(label1_str);
					self.buttons_ar.push(self.moveUpButton_do);	
				}else if(res == "moveright"){
					if(self.showButtonsLabels_bl) label1_str = self.buttonsLabels_ar[i] || "tooltip is not defined!";
					self.setupMoveRightButton(label1_str);
					self.buttons_ar.push(self.moveRightButton_do);
				}else if(res == "moveleft"){
					if(self.showButtonsLabels_bl) label1_str = self.buttonsLabels_ar[i] || "tooltip is not defined!";
					self.setupMoveLeftButton(label1_str);
					self.buttons_ar.push(self.moveLeftButton_do);
				}else if(res == "hideorshowmarkers"){
					if(self.showButtonsLabels_bl){
						var str =  self.buttonsLabels_ar[i];
						if(str){
							if(str.indexOf("/") == -1){
								label1_str = "tooltip is not defined!";
								label2_str = "tooltip is not defined!";
							}else{
								label1_str = str.substr(0, str.indexOf("/"));
								label2_str = str.substr(str.indexOf("/") + 1);
							}
						}else{
							label1_str = "tooltip is not defined!";
							label2_str = "tooltip is not defined!";
						}
					}
					self.setupHideOrShowMarkersButton(label1_str, label2_str);
					self.buttons_ar.push(self.hideOrShowMarkersButton_do);
				}else if(res == "info"){
					if(self.showButtonsLabels_bl) label1_str = self.buttonsLabels_ar[i] || "tooltip is not defined!";
					self.setupInfoButton(label1_str);
					self.buttons_ar.push(self.infoButton_do);
				}else if(res == "hideorshowcontroller"){
					if(self.showButtonsLabels_bl) label1_str = self.buttonsLabels_ar[i] || "tooltip is not defined!";
					if(self.showButtonsLabels_bl){
						var str =  self.buttonsLabels_ar[i];
						if(str){
							if(str.indexOf("/") == -1){
								label1_str = "tooltip is not defined!";
								label2_str = "tooltip is not defined!";
							}else{
								label1_str = str.substr(0, str.indexOf("/"));
								label2_str = str.substr(str.indexOf("/") + 1);
							}
						}else{
							label1_str = "tooltip is not defined!";
							label2_str = "tooltip is not defined!";
						}
					}
					self.setupHideOrShowController(label1_str, label2_str);
					self.buttons_ar.push(self.hideShowControllerButton_do);
				}else if(res == "fullscreen"){
					if(!(parent.displayType == FWDMegazoom.FULL_SCREEN && !FWDUtils.hasFullScreen)){
						if(self.showButtonsLabels_bl){
							var str =  self.buttonsLabels_ar[i];
							if(str){
								if(str.indexOf("/") == -1){
									label1_str = "tooltip is not defined!";
									label2_str = "tooltip is not defined!";
								}else{
									label1_str = str.substr(0, str.indexOf("/"));
									label2_str = str.substr(str.indexOf("/") + 1);
								}
							}else{
								label1_str = "tooltip is not defined!";
								label2_str = "tooltip is not defined!";
							}
						}
						self.setupFullScreenButton(label1_str, label2_str);
						self.buttons_ar.push(self.fullScreenButton_do);
					}
				}
			}
		};

		//##############################//
		/* setup background */
		//##############################//
		self.positionButtons = function(){
			
			var len = self.buttons_ar.length;
			var tempSpacerBetweenButtons = self.spaceBetweenButtons;
			var lastLeftButton_do;
			var totalButtonsWidth;
			var scrollBarLength;
			var startZoomX;
			var finalX;
			var finalY;
			var button;
			var indexToAddZoomButtons;
			
			if(self.showScrollBar_bl){
				self.isScrollBarActive_bl = true;
				self.curWidth = self.stageWidth;
				
				indexToAddZoomButtons = FWDUtils.indexOfArray(self.buttons_ar, self.zoomIn_do);
				if(indexToAddZoomButtons != -1){
					self.buttons_ar.splice(indexToAddZoomButtons, 1);
					len--;
				}
				
				indexToAddZoomButtons = FWDUtils.indexOfArray(self.buttons_ar, self.zoomOut_do);
				if(indexToAddZoomButtons != -1){
					self.buttons_ar.splice(indexToAddZoomButtons, 1);
					len--;
				}
				
				if(self.scrollBarPosition > len) self.scrollBarPosition = len;
				if(self.scrollBarPosition < 0) self.scrollBarPosition = 0;
				if(self.curWidth > self.maxWidth) self.curWidth = self.maxWidth;
				
				if(len == 0){
					self.scrollBarTotalWidth = (self.startSpaceBetweenButtons * 2) + (self.startSpaceForScrollBarButtons * 2) + (self.smallSpaceForScrollBar * 2) + (self.zoomButtonWidth * 2);
				}else if(len > 1 && self.scrollBarPosition != 0 && self.scrollBarPosition != len){
					self.scrollBarTotalWidth = (self.startSpaceBetweenButtons * 2) + (len * self.buttonWidth) + (self.spaceBetweenButtons * (len - 2)) + (self.startSpaceForScrollBarButtons * 2) + (self.smallSpaceForScrollBar * 2) + (self.zoomButtonWidth * 2);
				}else if(len > 1 && (self.scrollBarPosition == 0 || self.scrollBarPosition == len)){
					self.scrollBarTotalWidth = (self.startSpaceBetweenButtons * 3) + (len * self.buttonWidth) + (self.spaceBetweenButtons * (len - 1)) + (self.startSpaceForScrollBarButtons * 2) + (self.smallSpaceForScrollBar * 2) + (self.zoomButtonWidth * 2);
				}else{
					self.scrollBarTotalWidth = (self.startSpaceBetweenButtons * 2) + (len * self.buttonWidth)  + (self.startSpaceForScrollBarButtons * 2) + (self.smallSpaceForScrollBar * 2) + (self.zoomButtonWidth * 2);
				}
				
				self.scrollBarTotalWidth = self.curWidth - self.scrollBarTotalWidth;
				if(self.scrollBarTotalWidth < 100) self.isScrollBarActive_bl = false;
			}
			
			if(self.isScrollBarActive_bl){
				
				self.scrollBar_do.setVisible(true);
				
				for(var i=0; i<self.scrollBarPosition; i++){
					button = self.buttons_ar[i];
					if(button){
						button = self.buttons_ar[i];
						finalX = self.startSpaceBetweenButtons + (i * (tempSpacerBetweenButtons + self.buttonWidth));
						finalY = parseInt((self.curHeight - self.buttonHeight)/2);

						if(button != self.hideShowControllerButton_do){
							button.setX(finalX);
							button.setY(finalY);
						}else{
							button.finalX = finalX;
							button.finalY = finalY;
						}
					}
				}
				
				for(var i = len + 1; i>=self.scrollBarPosition; i--){
					button = self.buttons_ar[i];
					if(button){
						button = self.buttons_ar[i];
						
						finalX = self.curWidth  - self.startSpaceBetweenButtons - self.buttonWidth  - (Math.abs(i - len + 1) * (tempSpacerBetweenButtons + self.buttonWidth));
						finalY = parseInt((self.curHeight - self.buttonHeight)/2);

						if(button != self.hideShowControllerButton_do){
							button.setX(finalX);
							button.setY(finalY);
						}else{
							button.finalX = finalX;
							button.finalY = finalY;
						}
						
					}
				}
				
				if(len == 0){
					startZoomX = self.startSpaceForScrollBarButtons + self.startSpaceBetweenButtons;
				}else if(len > 1 && self.scrollBarPosition != 0 && self.scrollBarPosition != len){
					startZoomX = self.buttons_ar[self.scrollBarPosition - 1].getX() + self.buttonWidth + self.startSpaceForScrollBarButtons;
				}else if(len > 1 && self.scrollBarPosition == 0){
					startZoomX = self.startSpaceBetweenButtons + self.startSpaceForScrollBarButtons;
				}else if(len > 1 && self.scrollBarPosition == len){
					startZoomX = self.buttons_ar[self.scrollBarPosition - 1].getX() + self.buttonWidth + self.startSpaceForScrollBarButtons + self.startSpaceBetweenButtons;
				}else if(len == 1 && self.scrollBarPosition > 0){
					startZoomX = self.startSpaceBetweenButtons + self.buttonWidth + self.startSpaceForScrollBarButtons;
				}else if(len == 1 && self.scrollBarPosition == 0){
					startZoomX = self.startSpaceForScrollBarButtons + self.startSpaceBetweenButtons;
				}
				
				startZoomX += self.scrollBarOffsetX;
				
				self.zoomOut_do.setX(startZoomX );
				self.zoomOut_do.setY(parseInt((self.curHeight - self.zoomButtonHeight)/2));
				
				self.zoomIn_do.setX(self.zoomOut_do.getX() + self.zoomButtonWidth + (self.smallSpaceForScrollBar * 2) + self.scrollBarTotalWidth);
				self.zoomIn_do.setY(parseInt((self.curHeight - self.zoomButtonHeight)/2));
				
				self.scrollBar_do.setX(self.zoomOut_do.getX() + self.smallSpaceForScrollBar + self.zoomButtonWidth);
				
				self.scrollBar_do.setY(parseInt((self.curHeight - self.scrollBarHeight)/2) + 1);
				self.scrollBar_do.setWidth(self.scrollBarTotalWidth);
				
				self.scrollBarMiddle_do.setX(self.scrollBarRightPartWidth - 1);
				self.scrollBarMiddle_do.setWidth(self.scrollBarTotalWidth - (self.scrollBarRightPartWidth * 2) + 2);
				self.scrollBarRight_do.setX(self.scrollBarTotalWidth - self.scrollBarRightPartWidth);
			}else{
				if(self.showScrollBar_bl){
					self.scrollBar_do.setVisible(false);
					if(FWDUtils.indexOfArray(self.buttons_ar, self.zoomIn_do) == -1){
						indexToAddZoomButtons = self.scrollBarPosition;
						self.buttons_ar.splice(indexToAddZoomButtons, 0, self.zoomIn_do);
						self.buttons_ar.splice(indexToAddZoomButtons, 0, self.zoomOut_do);
					}
					len = self.buttons_ar.length;
				}
				
				self.minWidth = (len * self.buttonWidth) + (self.startSpaceBetweenButtons * 2) + (self.spaceBetweenButtons * len) - self.spaceBetweenButtons;
				
				if(self.minWidth > self.stageWidth){
					self.minWidth = self.stageWidth;
					if(self.minWidth < 320) self.minWidth = 320;
					totalButtonsWidth = self.buttonWidth * len;
					tempSpacerBetweenButtons = ((self.minWidth - (self.startSpaceBetweenButtons * 2)) - totalButtonsWidth)/(len - 1);
				}
				
				self.curWidth = self.minWidth;
				for(var i=0; i<len + 2; i++){
					button = self.buttons_ar[i];
					if(button){
						finalX = self.startSpaceBetweenButtons + (i * (tempSpacerBetweenButtons + self.buttonWidth));
						finalY = parseInt((self.curHeight - self.buttonHeight)/2);
						
						if(button == self.zoomIn_do){
							finalX = finalX + parseInt((self.buttonWidth - self.zoomButtonWidth)/2) - 2;
							finalY = parseInt((self.curHeight - self.zoomButtonHeight)/2);
						}else if(button ==  self.zoomOut_do){
							finalX = finalX + parseInt((self.buttonWidth - self.zoomButtonWidth)/2) + 2;
							finalY = parseInt((self.curHeight - self.zoomButtonHeight)/2);
						}
						
						if(button != self.hideShowControllerButton_do){
							button.setX(finalX);
							button.setY(finalY);
						}else{
							button.finalX = finalX;
							button.finalY = finalY;
						}
					}
				}
			}
		
			self.backgroundRight_sdo.setX(self.curWidth -  self.backgroundRight_sdo.getWidth());
			self.backgroundMiddle_sdo.setX(self.backgroundLeft_sdo.getWidth());
			self.backgroundMiddle_sdo.setWidth(self.curWidth - (self.backgroundLeft_sdo.getWidth() * 2));
			self.backgroundMiddle_sdo.setHeight(self.curHeight);
			
			self.mainHolder_do.setWidth(self.curWidth);
			self.mainHolder_do.setHeight(self.curHeight);
			
			if(self.controllerPosition_str == FWDController.POSITION_TOP){
				
				self.mainHolder_do.setX(Math.round((self.stageWidth - self.curWidth)/2));
				self.setY(self.controllerOffsetY);
			}else{
				self.mainHolder_do.setX(Math.round((self.stageWidth - self.curWidth)/2));
				self.setY(self.stageHeight - self.curHeight - self.controllerOffsetY);
			}
			
			finalX = self.curWidth  - self.startSpaceBetweenButtons - self.buttonWidth  - (Math.abs(i - len + 1) * (tempSpacerBetweenButtons + self.buttonWidth));
			finalY = parseInt((self.curHeight - self.buttonHeight)/2);
			
			if(self.hideShowControllerButton_do) self.positionHideOrShowControllerButton(false);
		};
		
		
		this.positionHideOrShowControllerButton = function(animate){
			var tempX;
			var tempY;
			if(self.controllerPosition_str == FWDController.POSITION_TOP){
				if(self.isHiddenForGood_bl){
					tempX = Math.round((self.curWidth - self.buttonWidth)/2);
					tempY = self.curHeight;
				}else{
					tempX = self.hideShowControllerButton_do.finalX;
					tempY = self.hideShowControllerButton_do.finalY;
				}
			}else{
				if(self.isHiddenForGood_bl){
					tempX = Math.round((self.curWidth - self.buttonWidth)/2);
					tempY = -self.buttonHeight - 2;
				}else{
					tempX = self.hideShowControllerButton_do.finalX;
					tempY = self.hideShowControllerButton_do.finalY;
				}
			}
			
			TweenMax.killTweensOf(self.hideShowControllerButton_do);
			if(animate){
				TweenMax.to(self.hideShowControllerButton_do, .8, {x:tempX, y:tempY, ease:Expo.easeInOut});
			}else{
				self.hideShowControllerButton_do.setX(tempX);
				self.hideShowControllerButton_do.setY(tempY);
			}
		};
		
		//##############################//
		/* setup background */
		//##############################//
		self.setupBackground = function(){
		
			self.backgroundLeft_sdo = new FWDSimpleDisplayObject("img");
			self.backgroundLeft_sdo.setScreen(self.backgroundLeft_img);
			if(self.controllerBackgroundOpacity != 1) self.backgroundLeft_sdo.setAlpha(self.controllerBackgroundOpacity);
			
			var middleImage = new Image();
			middleImage.src = self.backgroundMiddlePath_str;
			if(self.isMobile_bl){
				self.backgroundMiddle_sdo = new FWDSimpleDisplayObject("div");
			
				self.backgroundMiddle_sdo.getStyle().background = "url('" + data.controllerBackgroundMiddlePath_str + "') repeat-x";
			}else{
				self.backgroundMiddle_sdo = new FWDSimpleDisplayObject("img");
				self.backgroundMiddle_sdo.setScreen(middleImage);
			}
			if(self.controllerBackgroundOpacity != 1) self.backgroundMiddle_sdo.setAlpha(self.controllerBackgroundOpacity);
		
			self.backgroundRight_sdo = new FWDSimpleDisplayObject("img");
			self.backgroundRight_sdo.setScreen(self.backgroundRight_img);
			if(self.controllerBackgroundOpacity != 1) self.backgroundRight_sdo.setAlpha(self.controllerBackgroundOpacity);
			
			self.mainHolder_do.addChild(self.backgroundLeft_sdo);
			self.mainHolder_do.addChild(self.backgroundRight_sdo);
			self.mainHolder_do.addChild(self.backgroundMiddle_sdo);
		};
		
		//##############################//
		/* setup move down button */
		//##############################//
		self.setupDownButton = function(toolTipLabel){
			FWDSimpleButton.setPrototype();
			self.moveDownButton_do = new FWDSimpleButton(self.downN_img, self.downS_img, self.downD_img, self.isMobile_bl);
			self.moveDownButton_do.addListener(FWDSimpleButton.MOUSE_OVER, self.moveDownOnMouseOverHandler);
			self.moveDownButton_do.addListener(FWDSimpleButton.MOUSE_OUT, self.moveDownButtonOnMouseOutHandler);
			self.moveDownButton_do.addListener(FWDSimpleButton.MOUSE_DOWN, self.moveDownButtonStartHandler);
			self.moveDownButton_do.disable();
			self.mainHolder_do.addChild(self.moveDownButton_do);
			
			if(self.showButtonsLabels_bl){
				FWDButtonToolTip.setPrototype();
				self.moveDownButtonTooTipLabel_do = new FWDButtonToolTip(
						self.toolTipLeft_img,
						self.toolTipPointer_img,
						toolTipLabel,
						"",
						self.buttonToolTipLeft_str, 
						self.buttonToolTipMiddle_str, 
						self.buttonToolTipRight_str, 
						self.buttonToolTipFontColor_str,
						self.controllerPosition_str, 
						self.buttonToolTipTopPointer_str,
						self.buttonToolTipBottomPointer_str);
				self.mainHolder_do.addChild(self.moveDownButtonTooTipLabel_do);
			}
		};
		
		self.moveDownOnMouseOverHandler = function(e){
			if(self.showButtonsLabels_bl) self.showToolTipButton(self.moveDownButton_do, self.moveDownButtonTooTipLabel_do, self.buttonsToolTipOffsetY);
		};
		
		self.moveDownButtonOnMouseOutHandler = function(e){
			if(self.showButtonsLabels_bl) self.moveDownButtonTooTipLabel_do.hide(true);
		};
		
		self.moveDownButtonStartHandler = function(e){
			var e = e.e == undefined ? e : e.e;
			if(e.touches){
				if(self.scrollBarHandler_do){
					self.zoomInWithButtonsEndHandler(e);
					self.zoomOutWithButtonsEndHandler(e);
					self.handlerDragEndHandler(e);
				}
			}
			
			clearInterval(self.panImageId_int);
			//clearTimeout(self.gotoImageId_to);
			self.moveDownImageInWithDelay();
			self.dispatchEvent(FWDController.DISABLE_PAN_OR_MOVE);
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.addEventListener("MSPointerUp", self.panEndHandler);
				}else{
					window.addEventListener("touchend", self.panEndHandler);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener("mouseup", self.panEndHandler);
				}else if(document.attachEvent){
					document.attachEvent("onmouseup", self.panEndHandler);
				}
			}
		};
		
		self.moveDownImageInWithDelay = function(){
			self.panImageId_int = setInterval(self.panDown, 16);
		};
		
		self.panDown = function(){
			self.dispatchEvent(FWDController.PAN, {dir:"down"});
		};
		
		
		//##############################//
		/* setup move up button */
		//##############################//
		self.setupUpButton = function(toolTipLabel){
			FWDSimpleButton.setPrototype();
			self.moveUpButton_do = new FWDSimpleButton(self.upN_img, self.upS_img, self.upD_img, self.isMobile_bl);
			self.moveUpButton_do.addListener(FWDSimpleButton.MOUSE_OVER, self.moveUpOnMouseOverHandler);
			self.moveUpButton_do.addListener(FWDSimpleButton.MOUSE_OUT, self.moveUpButtonOnMouseOutHandler);
			self.moveUpButton_do.addListener(FWDSimpleButton.MOUSE_DOWN, self.moveUpButtonStartHandler);
			self.moveUpButton_do.disable();
			self.mainHolder_do.addChild(self.moveUpButton_do);
			
			if(self.showButtonsLabels_bl){
				FWDButtonToolTip.setPrototype();
				self.moveUpButtonTooTipLabel_do = new FWDButtonToolTip(
						self.toolTipLeft_img,
						self.toolTipPointer_img,
						toolTipLabel,
						"",
						self.buttonToolTipLeft_str, 
						self.buttonToolTipMiddle_str, 
						self.buttonToolTipRight_str, 
						self.buttonToolTipFontColor_str,
						self.controllerPosition_str, 
						self.buttonToolTipTopPointer_str,
						self.buttonToolTipBottomPointer_str);
				self.mainHolder_do.addChild(self.moveUpButtonTooTipLabel_do);
			}
		};			
		
		self.moveUpOnMouseOverHandler = function(e){
			if(self.showButtonsLabels_bl) self.showToolTipButton(self.moveUpButton_do, self.moveUpButtonTooTipLabel_do, self.buttonsToolTipOffsetY);
		};
		
		self.moveUpButtonOnMouseOutHandler = function(e){
			if(self.showButtonsLabels_bl) self.moveUpButtonTooTipLabel_do.hide(true);
		};
		
		self.moveUpButtonStartHandler = function(e){
			var e = e.e == undefined ? e : e.e;
			if(e.touches){
				if(self.scrollBarHandler_do){
					self.zoomInWithButtonsEndHandler(e);
					self.zoomOutWithButtonsEndHandler(e);
					self.handlerDragEndHandler(e);
				}
			}
			
			clearInterval(self.panImageId_int);
			//clearTimeout(self.gotoImageId_to);
			self.moveUpImageInWithDelay();
			self.dispatchEvent(FWDController.DISABLE_PAN_OR_MOVE);
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.addEventListener("MSPointerUp", self.panEndHandler);
				}else{
					window.addEventListener("touchend", self.panEndHandler);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener("mouseup", self.panEndHandler);
				}else if(document.attachEvent){
					document.attachEvent("onmouseup", self.panEndHandler);
				}
			}
		};
		
		self.moveUpImageInWithDelay = function(){
			self.panImageId_int = setInterval(self.panUp, 16);
		};
		
		self.panUp = function(){
			self.dispatchEvent(FWDController.PAN, {dir:"up"});
		};
		
		//##############################//
		/* setup next  button */
		//##############################//
		self.setupMoveRightButton = function(toolTipLabel){
			FWDSimpleButton.setPrototype();
			self.moveRightButton_do = new FWDSimpleButton(self.nextN_img, self.nextS_img, self.nextD_img, self.isMobile_bl);
			self.moveRightButton_do.addListener(FWDSimpleButton.MOUSE_OVER, self.moveRightOnMouseOverHandler);
			self.moveRightButton_do.addListener(FWDSimpleButton.MOUSE_OUT, self.moveRightButtonOnMouseOutHandler);
			self.moveRightButton_do.addListener(FWDSimpleButton.MOUSE_DOWN, self.moveRightButtonStartHandler);
			self.moveRightButton_do.disable();
			self.mainHolder_do.addChild(self.moveRightButton_do);
			
			if(self.showButtonsLabels_bl){
				FWDButtonToolTip.setPrototype();
				self.nextButtonToolTip_do = new FWDButtonToolTip(
						self.toolTipLeft_img,
						self.toolTipPointer_img,
						toolTipLabel,
						"",
						self.buttonToolTipLeft_str, 
						self.buttonToolTipMiddle_str, 
						self.buttonToolTipRight_str, 
						self.buttonToolTipFontColor_str,
						self.controllerPosition_str, 
						self.buttonToolTipTopPointer_str,
						self.buttonToolTipBottomPointer_str);
				self.mainHolder_do.addChild(self.nextButtonToolTip_do);
			}
		};
		
		self.moveRightOnMouseOverHandler = function(e){
			if(self.showButtonsLabels_bl) self.showToolTipButton(self.moveRightButton_do, self.nextButtonToolTip_do, self.buttonsToolTipOffsetY);
		};
		
		self.moveRightButtonOnMouseOutHandler = function(e){
			if(self.showButtonsLabels_bl) self.nextButtonToolTip_do.hide(true);
		};
		
		self.moveRightButtonStartHandler = function(e){
			var e = e.e == undefined ? e : e.e;
			if(e.touches){
				if(self.scrollBarHandler_do){
					self.zoomInWithButtonsEndHandler(e);
					self.zoomOutWithButtonsEndHandler(e);
					self.handlerDragEndHandler(e);
				}
			}
			
			clearInterval(self.panImageId_int);
			//clearTimeout(self.gotoImageId_to);
			self.moveRightImageInWithDelay();
			self.dispatchEvent(FWDController.DISABLE_PAN_OR_MOVE);
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.addEventListener("MSPointerUp", self.panEndHandler);
				}else{
					window.addEventListener("touchend", self.panEndHandler);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener("mouseup", self.panEndHandler);
				}else if(document.attachEvent){
					document.attachEvent("onmouseup", self.panEndHandler);
				}
			}
		};
		
		self.panEndHandler = function(){
			clearInterval(self.panImageId_int);
			clearTimeout(self.gotoImageId_to);
			self.dispatchEvent(FWDController.ENABLE_PAN_OR_MOVE);
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.removeEventListener("MSPointerUp", self.panEndHandler);
				}else{
					window.removeEventListener("touchend", self.panEndHandler);
				}
			}else{
				if(window.removeEventListener){
					window.removeEventListener("mouseup", self.panEndHandler);
				}else if(document.detachEvent){
					document.detachEvent("onmouseup", self.panEndHandler);
				}
			}
		};
		
		self.moveRightImageInWithDelay = function(){
			self.panImageId_int = setInterval(self.panRight, 16);
		};
		
		self.panRight = function(){
			self.dispatchEvent(FWDController.PAN, {dir:"right"});
		};
		
		//##############################//
		/* setup prev button */
		//##############################//
		self.setupMoveLeftButton = function(toolTipLabel){
			FWDSimpleButton.setPrototype();
			self.moveLeftButton_do = new FWDSimpleButton(self.prevN_img, self.prevS_img, self.prevD_img, self.isMobile_bl);
			self.moveLeftButton_do.addListener(FWDComplexButton.MOUSE_OVER, self.moveLeftButtonOnMouseOverHandler);
			self.moveLeftButton_do.addListener(FWDComplexButton.MOUSE_OUT, self.moveLeftButtonOnMouseOutHandler);
			self.moveLeftButton_do.addListener(FWDSimpleButton.MOUSE_DOWN, self.moveLeftButtonStartHandler);
			self.moveLeftButton_do.disable();
			self.mainHolder_do.addChild(self.moveLeftButton_do);
			
			if(self.showButtonsLabels_bl){
				FWDButtonToolTip.setPrototype();
				self.moveLeftButtonToolTip_do = new FWDButtonToolTip(
						self.toolTipLeft_img,
						self.toolTipPointer_img,
						toolTipLabel,
						"",
						self.buttonToolTipLeft_str, 
						self.buttonToolTipMiddle_str, 
						self.buttonToolTipRight_str, 
						self.buttonToolTipFontColor_str,
						self.controllerPosition_str, 
						self.buttonToolTipTopPointer_str,
						self.buttonToolTipBottomPointer_str);
				self.mainHolder_do.addChild(self.moveLeftButtonToolTip_do);
			}
		};
		
		self.moveLeftButtonOnMouseOverHandler = function(e){
			if(self.showButtonsLabels_bl) self.showToolTipButton(self.moveLeftButton_do, self.moveLeftButtonToolTip_do, self.buttonsToolTipOffsetY);
		};
		
		self.moveLeftButtonOnMouseOutHandler = function(e){
			if(self.showButtonsLabels_bl) self.moveLeftButtonToolTip_do.hide(true);
		};
		
		self.moveLeftButtonStartHandler = function(e){
			var e = e.e == undefined ? e : e.e;
			if(e.touches){
				if(self.scrollBarHandler_do){
					self.zoomInWithButtonsEndHandler(e);
					self.zoomOutWithButtonsEndHandler(e);
					self.handlerDragEndHandler(e);
				}
			}
			
			clearInterval(self.panImageId_int);
			//clearTimeout(self.gotoImageId_to);
			self.moveLeftImageInWithDelay();
			self.dispatchEvent(FWDController.DISABLE_PAN_OR_MOVE);
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.addEventListener("MSPointerUp", self.panEndHandler);
				}else{
					window.addEventListener("touchend", self.panEndHandler);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener("mouseup", self.panEndHandler);
				}else if(document.attachEvent){
					document.attachEvent("onmouseup", self.panEndHandler);
				}
			}
		};
		
		self.moveLeftImageInWithDelay = function(){
			self.panImageId_int = setInterval(self.panLeft, 16);
		};
		
		self.panLeft = function(){
			self.dispatchEvent(FWDController.PAN, {dir:"left"});
		};
		
		//##############################//
		/* setup slideshow button */
		//##############################//
		self.setupHideOrShowMarkersButton = function(toolTipLabel1, toolTipLabel2){
			FWDComplexButton.setPrototype();
			self.hideOrShowMarkersButton_do = new FWDComplexButton(
					self.controllerHideMarkersN_img, 
					self.controllerHideMarkersS_img, 
					self.controllerShowMarkersN_img, 
					self.controllerShowMarkersS_img, 
					true);
			
			self.hideOrShowMarkersButton_do.addListener(FWDComplexButton.MOUSE_OVER, self.hideOrShowButtonOnMouseOverHandler);
			self.hideOrShowMarkersButton_do.addListener(FWDComplexButton.MOUSE_OUT, self.hideOrShowButtonOnMouseOutHandler);
			self.hideOrShowMarkersButton_do.addListener(FWDComplexButton.MOUSE_DOWN, self.hideOrShowButtonStartHandler);
			self.mainHolder_do.addChild(self.hideOrShowMarkersButton_do);
			
			if(self.showButtonsLabels_bl){
				FWDButtonToolTip.setPrototype();
				self.hideOrShowMarkersToolTip_do = new FWDButtonToolTip(
						self.toolTipLeft_img,
						self.toolTipPointer_img,
						toolTipLabel1,
						toolTipLabel2,
						self.buttonToolTipLeft_str, 
						self.buttonToolTipMiddle_str, 
						self.buttonToolTipRight_str, 
						self.buttonToolTipFontColor_str,
						self.controllerPosition_str, 
						self.buttonToolTipTopPointer_str,
						self.buttonToolTipBottomPointer_str);
				self.mainHolder_do.addChild(self.hideOrShowMarkersToolTip_do);
			}
		};
		
		self.hideOrShowButtonOnMouseOverHandler = function(e){
			if(self.showButtonsLabels_bl) self.showToolTipButton(self.hideOrShowMarkersButton_do, self.hideOrShowMarkersToolTip_do, self.buttonsToolTipOffsetY);
		};
		
		self.hideOrShowButtonOnMouseOutHandler = function(e){
			if(self.showButtonsLabels_bl) self.hideOrShowMarkersToolTip_do.hide(true);
		};
		
		self.hideOrShowButtonStartHandler = function(addEvent){
			if(self.showButtonsLabels_bl) self.hideOrShowMarkersToolTip_do.hide();
			if(self.hideOrShowMarkersButton_do.currentState == 1){	
				self.dispatchEvent(FWDController.HIDE_MARKERS);
			}else{
				self.dispatchEvent(FWDController.SHOW_MARKERS);
			}
		};
		
		this.setHideOrShowButtonAndToolTipState = function(state){
			if(state == 1){
				self.hideOrShowMarkersButton_do.setButtonState(0);
				if(self.showButtonsLabels_bl) self.hideOrShowMarkersToolTip_do.setLabel(self.hideOrShowMarkersToolTip_do.toolTipLabel2_str);
			}else{
				self.hideOrShowMarkersButton_do.setButtonState(1);
				if(self.showButtonsLabels_bl) self.hideOrShowMarkersToolTip_do.setLabel(self.hideOrShowMarkersToolTip_do.toolTipLabel_str);
			}
		};
		
		//##############################//
		/* setup info button */
		//##############################//
		self.setupInfoButton = function(toolTipLabel){
			FWDSimpleButton.setPrototype();
			self.infoButton_do = new FWDSimpleButton(self.infoN_img, self.infoS_img, null, self.isMobile_bl);
			self.infoButton_do.addListener(FWDComplexButton.MOUSE_OVER, self.infoButtonOnMouseOverHandler);
			self.infoButton_do.addListener(FWDComplexButton.MOUSE_OUT, self.infoButtonOnMouseOutHandler);
			self.infoButton_do.addListener(FWDComplexButton.MOUSE_DOWN, self.infoButtonStartHandler);
			self.mainHolder_do.addChild(self.infoButton_do);
			
			if(self.showButtonsLabels_bl){
				FWDButtonToolTip.setPrototype();
				self.infoToolTip_do = new FWDButtonToolTip(
						self.toolTipLeft_img,
						self.toolTipPointer_img,
						toolTipLabel,
						"",
						self.buttonToolTipLeft_str, 
						self.buttonToolTipMiddle_str, 
						self.buttonToolTipRight_str, 
						self.buttonToolTipFontColor_str,
						self.controllerPosition_str, 
						self.buttonToolTipTopPointer_str,
						self.buttonToolTipBottomPointer_str);
				self.mainHolder_do.addChild(self.infoToolTip_do);
			}
		};
		
		self.infoButtonOnMouseOverHandler = function(e){
			if(self.showButtonsLabels_bl) self.showToolTipButton(self.infoButton_do, self.infoToolTip_do, self.buttonsToolTipOffsetY);
		};
		
		self.infoButtonOnMouseOutHandler = function(e){
			if(self.showButtonsLabels_bl) self.infoToolTip_do.hide(true);
		};
		
		self.infoButtonStartHandler = function(e){
			self.dispatchEvent(FWDController.SHOW_INFO);
		};
		
		
		//##############################//
		/* setup link button */
		//##############################//
		self.setupHideOrShowController = function(toolTipLabel1, toolTipLabel2){
			FWDComplexButton.setPrototype();
			self.hideShowControllerButton_do = new FWDComplexButton(
					self.controllerHideN_img, 
					self.controllerHideS_img, 
					self.controllerShowN_img, 
					self.controllerShowS_img, 
					true);
			
			self.hideShowControllerButton_do.addListener(FWDComplexButton.MOUSE_OVER, self.linkButtonOnMouseOverHandler);
			self.hideShowControllerButton_do.addListener(FWDComplexButton.MOUSE_OUT, self.linkButtonOnMouseOutHandler);
			self.hideShowControllerButton_do.addListener(FWDComplexButton.MOUSE_DOWN, self.hideOrShowControllerStartHandler);
			self.mainHolder_do.addChild(self.hideShowControllerButton_do);
			
			if(self.showButtonsLabels_bl){
				FWDButtonToolTip.setPrototype();
				self.hideOrShowControllerToolTip_do = new FWDButtonToolTip(
						self.toolTipLeft_img,
						self.toolTipPointer_img,
						toolTipLabel1,
						toolTipLabel2,
						self.buttonToolTipLeft_str, 
						self.buttonToolTipMiddle_str, 
						self.buttonToolTipRight_str, 
						self.buttonToolTipFontColor_str,
						self.controllerPosition_str, 
						self.buttonToolTipTopPointer_str,
						self.buttonToolTipBottomPointer_str);
				self.mainHolder_do.addChild(self.hideOrShowControllerToolTip_do);
				self.hideOrShowControllerToolTip_do.getStyle().zIndex = 100;
			}
		};
		
		self.linkButtonOnMouseOverHandler = function(e){
			if(self.disableHideOrShowControllerToolTip_bl) return;
			if(self.showButtonsLabels_bl) self.showToolTipButton(self.hideShowControllerButton_do, self.hideOrShowControllerToolTip_do, self.buttonsToolTipOffsetY);
		};
		
		self.linkButtonOnMouseOutHandler = function(e){
			if(self.disableHideOrShowControllerToolTip_bl) return;
			if(self.showButtonsLabels_bl) self.hideOrShowControllerToolTip_do.hide(true);
		};
		
		self.hideOrShowControllerStartHandler = function(e){
			if(self.disableHideOrShowControllerToolTip_bl) return;
			if(self.hider) self.hider.reset();
			if(self.showButtonsLabels_bl) self.hideOrShowControllerToolTip_do.hide();
			self.hideShowControllerButton_do.isDisabled_bl = true;
			setTimeout(function(){
				if(self == null) return;
				if(!self.isMobile_bl) self.hideShowControllerButton_do.setNormalState();
				self.hideShowControllerButton_do.isDisabled_bl = false;
			}, 400);
			self.disableHideOrShowControllerToolTip_bl = true;
			
			clearTimeout(self.disableForAWhileHideOrShowControllerToolTipId_to);
			self.disableForAWhileHideOrShowControllerToolTipId_to = setTimeout(
					function(){
						self.disableHideOrShowControllerToolTip_bl = false;
					}
			,400);
			
			if(self.hideShowControllerButton_do.currentState == 1){	
				self.setHideOrShowControllerAndToolTipState(1);
				self.dispatchEvent(FWDController.HIDE_CONTROLLER);
			}else{
				self.setHideOrShowControllerAndToolTipState(0);
				self.dispatchEvent(FWDController.SHOW_CONTROLLER);
			}
			
		};
		
		this.setHideOrShowControllerAndToolTipState = function(state){
			if(state == 1){
				self.isHiddenForGood_bl = true;
				self.hideShowControllerButton_do.setButtonState(0);
				if(self.showButtonsLabels_bl) self.hideOrShowControllerToolTip_do.setLabel(self.hideOrShowControllerToolTip_do.toolTipLabel2_str);
				self.hide(true);
			}else{
				self.isHiddenForGood_bl = false;
				self.hideShowControllerButton_do.setButtonState(1);
				if(self.showButtonsLabels_bl) self.hideOrShowControllerToolTip_do.setLabel(self.hideOrShowControllerToolTip_do.toolTipLabel_str);
				self.show(true);
			}
			self.positionHideOrShowControllerButton(true);
		};
		
		//##############################//
		/* setup link button */
		//##############################//
		self.setupFullScreenButton = function(toolTipLabel1, toolTipLabel2){
			FWDComplexButton.setPrototype();
			self.fullScreenButton_do = new FWDComplexButton(self.fullScreenFullN_img, self.fullScreenFullS_img, self.fullScreenNormalN_img, self.fullScreenNormalS_img, true);
			self.fullScreenButton_do.addListener(FWDComplexButton.MOUSE_OVER, self.fullscreenButtonOnMouseOverHandler);
			self.fullScreenButton_do.addListener(FWDComplexButton.MOUSE_OUT, self.fullscreenButtonOnMouseOutHandler);
			self.fullScreenButton_do.addListener(FWDComplexButton.MOUSE_DOWN, self.fullScreenButtonStartHandler);
			self.mainHolder_do.addChild(self.fullScreenButton_do);
			
			if(self.showButtonsLabels_bl){
				FWDButtonToolTip.setPrototype();
				self.fullscreenToolTip_do = new FWDButtonToolTip(
						self.toolTipLeft_img,
						self.toolTipPointer_img,
						toolTipLabel1,
						toolTipLabel2,
						self.buttonToolTipLeft_str, 
						self.buttonToolTipMiddle_str, 
						self.buttonToolTipRight_str, 
						self.buttonToolTipFontColor_str,
						self.controllerPosition_str, 
						self.buttonToolTipTopPointer_str,
						self.buttonToolTipBottomPointer_str);
				self.mainHolder_do.addChild(self.fullscreenToolTip_do);
			}
		};
		
		self.fullscreenButtonOnMouseOverHandler = function(e){
			if(self.showButtonsLabels_bl) self.showToolTipButton(self.fullScreenButton_do, self.fullscreenToolTip_do, self.buttonsToolTipOffsetY);
		};
		
		self.fullscreenButtonOnMouseOutHandler = function(e){
			if(self.showButtonsLabels_bl) self.fullscreenToolTip_do.hide(true);
		};
		
		self.fullScreenButtonStartHandler = function(e){
			if(self.fullScreenButton_do.currentState == 1){
				if(self.showButtonsLabels_bl) self.fullscreenToolTip_do.setLabel(self.fullscreenToolTip_do.toolTipLabel2_str);
				self.fullScreenButton_do.setButtonState(0);
				
				self.dispatchEvent(FWDController.GO_FULL_SCREEN);
			}else if(self.fullScreenButton_do.currentState == 0){
				if(self.showButtonsLabels_bl) self.fullscreenToolTip_do.setLabel(self.fullscreenToolTip_do.toolTipLabel_str);
				self.fullScreenButton_do.setButtonState(1);
				self.dispatchEvent(FWDController.GO_NORMAL_SCREEN);
			}
			setTimeout(function(){
				if(self == null) return;
				self.fullScreenButton_do.onMouseOut(e);
				}, 50);
		};
		
		self.setFullScreenButtonState = function(state){
			if(state == 0){
				self.fullScreenButton_do.setButtonState(0);
				if(self.showButtonsLabels_bl) self.fullscreenToolTip_do.setLabel(self.fullscreenToolTip_do.toolTipLabel2_str);
			}else if(state == 1){
				self.fullScreenButton_do.setButtonState(1);
				if(self.showButtonsLabels_bl) self.fullscreenToolTip_do.setLabel(self.fullscreenToolTip_do.toolTipLabel_str);
			}
		};
		
		//##############################//
		/* setup scrollbar */
		//##############################//
		self.setupScrollBar = function(){
			var label_str1;
			
			FWDSimpleButton.setPrototype();
			self.zoomIn_do = new FWDSimpleButton(self.zoomInN_img, self.zoomInS_img, null, self.isMobile_bl);
			self.zoomIn_do.addListener(FWDSimpleButton.MOUSE_OVER, self.zoomInMouseOverHandler);
			self.zoomIn_do.addListener(FWDSimpleButton.MOUSE_OUT, self.zoomInOrOutMouseOutHandler);
			self.zoomIn_do.addListener(FWDSimpleButton.MOUSE_DOWN, self.zoomInStartHandler);
			self.mainHolder_do.addChild(self.zoomIn_do);
			
			FWDSimpleButton.setPrototype();
			self.zoomOut_do = new FWDSimpleButton(self.zoomOutN_img, self.zoomOutS_img, null, self.isMobile_bl);
			self.zoomOut_do.addListener(FWDSimpleButton.MOUSE_OVER, self.zoomOutMouseOverHandler);
			self.zoomOut_do.addListener(FWDSimpleButton.MOUSE_OUT, self.zoomInOrOutMouseOutHandler);
			self.zoomOut_do.addListener(FWDSimpleButton.MOUSE_DOWN, self.zoomOutStartHandler);
			self.mainHolder_do.addChild(self.zoomOut_do);
			
			self.scrollBar_do = new FWDDisplayObject("div");
			self.scrollBar_do.setOverflow("visible");
			self.scrollBar_do.setHeight(self.scrollBarHeight);
			self.mainHolder_do.addChild(self.scrollBar_do);
			
			self.scrollBarLeft_do = new FWDSimpleDisplayObject("img");
			self.scrollBarLeft_do.setScreen(data.scrollBarLeft_img);
			self.scrollBar_do.addChild(self.scrollBarLeft_do);
			
			self.scrollBarMiddle_do = new FWDSimpleDisplayObject("div");
			self.scrollBarMiddle_do.setHeight(self.scrollBarHeight);
			self.scrollBarMiddle_do.getStyle().background = "url('" + self.scrollBarMiddlePath_str + "')";
			self.scrollBarMiddle_do.getStyle().backgroundRepeat = "repeat-x";
			
			self.scrollBar_do.addChild(self.scrollBarMiddle_do);
			
			self.scrollBarRight_do = new FWDSimpleDisplayObject("img");
			self.scrollBarRight_do.setScreen(self.scrollBarRight_img);
			self.scrollBar_do.addChild(self.scrollBarRight_do);
			
			FWDSimpleButton.setPrototype();
			self.scrollBarHandler_do = new FWDSimpleButton(self.scrollBarHandlerN_img, self.scrollBarHandlerS_img, null, self.isMobile_bl);
			self.scrollBarHandler_do.setY(parseInt((self.scrollBarHeight - self.scrollBarHandlerHeight)/2) - 1);
			self.scrollBarHandler_do.addListener(FWDSimpleButton.MOUSE_OVER, self.handlerOnMouseOver);
			self.scrollBarHandler_do.addListener(FWDSimpleButton.MOUSE_OUT, self.handlerOnMouseOut);
			self.scrollBarHandler_do.addListener(FWDSimpleButton.MOUSE_DOWN, self.handlerDragStartHandler);
			self.scrollBar_do.addChild(self.scrollBarHandler_do);
			
			if(self.showButtonsLabels_bl){
				label_str1 = self.buttonsLabels_ar[self.scrollBarPosition] || "tooltip is not defined!";
				FWDButtonToolTip.setPrototype();
				self.scrollBarHandlerToolTip_do = new FWDButtonToolTip(
						self.toolTipLeft_img,
						self.toolTipPointer_img,
						label_str1,
						"",
						self.buttonToolTipLeft_str,
						self.buttonToolTipMiddle_str,
						self.buttonToolTipRight_str,
						self.buttonToolTipFontColor_str,
						self.controllerPosition_str, 
						self.buttonToolTipTopPointer_str,
						self.buttonToolTipBottomPointer_str);
				
				self.mainHolder_do.addChild(self.scrollBarHandlerToolTip_do);
			}
		};
		
		//##########################################//
		// zoom in / out handler...
		//##########################################//
		self.zoomInMouseOverHandler = function(e){
			if(self.showButtonsLabels_bl){
				self.scrollBarHandlerToolTip_do.show();
				if(self.isScrollBarActive_bl){
					self.positionAndSetLabelScrollBarHandler();
				}else{
					if(!self.isScrollBarActive_bl && self.showButtonsLabels_bl){
						setTimeout(function(){
							if(self == null) return;
							var percent = self.finalHandlerX/(self.scrollBarTotalWidth - self.scrollBarHandlerWidth);
							self.scrollBarHandlerToolTip_do.setLabel(self.scrollBarHandlerToolTip_do.toolTipLabel_str + (Math.round(percent * 100)) + "%");
							self.showZoomInOrOutToolTipButton(self.zoomIn_do, self.scrollBarHandlerToolTip_do, self.zoomInAndOutToolTipOffsetY);
						}, 50);
					}
				}
			}
		};
		
		self.zoomInOrOutMouseOutHandler  = function(e){
			if(self.showButtonsLabels_bl) self.scrollBarHandlerToolTip_do.hide(true);
		};
			
		self.zoomInStartHandler = function(e){
			e = e.e;
			if(e.touches){
				self.handlerDragEndHandler(e);
			}
			
			clearInterval(self.zoomWithButtonsId_int);
			clearTimeout(self.zoomWithButtonsId_to);
			self.zoomWithButtonsId_to = setTimeout(self.startZoomInWithDelay, 400);
			self.dispatchEvent(FWDController.DISABLE_PAN_OR_MOVE);
			self.zoomInWithButtonsDispatchEvent(true);
			self.zoomIn_do.isSelectedFinal_bl = true;
			self.isZoomInOrOutPressed_bl = true;
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.addEventListener("MSPointerUp", self.zoomInWithButtonsEndHandler);
				}else{
					window.addEventListener("touchend", self.zoomInWithButtonsEndHandler);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener("mouseup", self.zoomInWithButtonsEndHandler);
				}else if(document.attachEvent){
					document.attachEvent("onmouseup", self.zoomInWithButtonsEndHandler);
				}
			}
		};
		
		self.startZoomInWithDelay = function(){
			self.zoomWithButtonsId_int = setInterval(self.zoomInWithButtonsDispatchEvent, 16);
		};
	
		self.zoomInWithButtonsDispatchEvent = function(withPause){	
			if(withPause){
				self.dispatchEvent(FWDController.ZOOM_WITH_BUTTONS, {dir:1, withPause:true});
			}else{
				self.dispatchEvent(FWDController.ZOOM_WITH_BUTTONS, {dir:1, withPause:false});
			}
			if(!self.isScrollBarActive_bl && self.showButtonsLabels_bl){
				setTimeout(function(){
					if(self == null) return;
					var percent = self.finalHandlerX/(self.scrollBarTotalWidth - self.scrollBarHandlerWidth);
					self.scrollBarHandlerToolTip_do.setLabel(self.scrollBarHandlerToolTip_do.toolTipLabel_str + (Math.round(percent * 100)) + "%");
					self.showZoomInOrOutToolTipButton(self.zoomIn_do, self.scrollBarHandlerToolTip_do, self.zoomInAndOutToolTipOffsetY);
				}, 50);
			}
		};
		
		self.zoomInWithButtonsEndHandler = function(e){
			var viewportMouseCoordinates;
			clearInterval(self.zoomWithButtonsId_int);
			clearTimeout(self.zoomWithButtonsId_to);
			self.isZoomInOrOutPressed_bl = false;
			self.zoomIn_do.isSelectedFinal_bl = false;
			viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);	
			if(!FWDUtils.hitTest(self.zoomIn_do.screen, viewportMouseCoordinates.screenX, viewportMouseCoordinates.screenY)){
				self.zoomIn_do.onMouseOut(e);
			}
		
			self.dispatchEvent(FWDController.ENABLE_PAN_OR_MOVE);
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.removeEventListener("MSPointerUp", self.zoomInWithButtonsEndHandler);
				}else{
					window.removeEventListener("touchend", self.zoomInWithButtonsEndHandler);
				}
			}else{
				if(window.removeEventListener){
					window.removeEventListener("mouseup", self.zoomInWithButtonsEndHandler);
				}else if(document.detachEvent){
					document.detachEvent("onmouseup", self.zoomInWithButtonsEndHandler);
				}
			}
		};
		
		//////////////////////////////////////////////////////
		/////////////////////////////////////////////////////
		self.zoomOutMouseOverHandler = function(e){
			if(self.showButtonsLabels_bl){
				self.scrollBarHandlerToolTip_do.show();
				if(self.isScrollBarActive_bl){
					self.positionAndSetLabelScrollBarHandler();
				}else{
					if(!self.isScrollBarActive_bl && self.showButtonsLabels_bl){
						setTimeout(function(){
							if(self == null) return;
							var percent = self.finalHandlerX/(self.scrollBarTotalWidth - self.scrollBarHandlerWidth);
							self.scrollBarHandlerToolTip_do.setLabel(self.scrollBarHandlerToolTip_do.toolTipLabel_str + (Math.round(percent * 100)) + "%");
							self.showZoomInOrOutToolTipButton(self.zoomOut_do, self.scrollBarHandlerToolTip_do, self.zoomInAndOutToolTipOffsetY);
						}, 50);
					}
				}
			}
		};
	
		self.zoomOutStartHandler = function(e){
			e = e.e;
			if(e.touches){
				self.handlerDragEndHandler(e);
			}
			
			clearInterval(self.zoomWithButtonsId_int);
			clearTimeout(self.zoomWithButtonsId_to);
			self.zoomWithButtonsId_to = setTimeout(self.startZoomOutWithDelay, 400);
			self.dispatchEvent(FWDController.DISABLE_PAN_OR_MOVE);
			self.zoomOutWithButtonsDispatchEvent(true);
			self.zoomOut_do.isSelectedFinal_bl = true;
			self.isZoomInOrOutPressed_bl = true;
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.addEventListener("MSPointerUp", self.zoomOutWithButtonsEndHandler);
				}else{
					window.addEventListener("touchend", self.zoomOutWithButtonsEndHandler);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener("mouseup", self.zoomOutWithButtonsEndHandler);
				}else if(document.attachEvent){
					document.attachEvent("onmouseup", self.zoomOutWithButtonsEndHandler);
				}
			}
		};
		
		self.startZoomOutWithDelay = function(){
			self.zoomWithButtonsId_int = setInterval(self.zoomOutWithButtonsDispatchEvent, 16);
		};
		
		self.zoomOutWithButtonsDispatchEvent = function(withPause){	
			if(!self.isScrollBarActive_bl  && self.showButtonsLabels_bl){
				setTimeout(function(){
					if(self == null) return;
					var percent = self.finalHandlerX/(self.scrollBarTotalWidth - self.scrollBarHandlerWidth);
					self.scrollBarHandlerToolTip_do.setLabel(self.scrollBarHandlerToolTip_do.toolTipLabel_str + (Math.round(percent * 100)) + "%");
					self.showZoomInOrOutToolTipButton(self.zoomOut_do, self.scrollBarHandlerToolTip_do, self.zoomInAndOutToolTipOffsetY);
				}, 50);
			};
			
			if(withPause){
				self.dispatchEvent(FWDController.ZOOM_WITH_BUTTONS, {dir:-1, withPause:true});
			}else{
				self.dispatchEvent(FWDController.ZOOM_WITH_BUTTONS, {dir:-1, withPause:false});
			}
		};

		self.zoomOutWithButtonsEndHandler = function(e){
			var viewportMouseCoordinates;
			clearInterval(self.zoomWithButtonsId_int);
			clearTimeout(self.zoomWithButtonsId_to);
			self.isZoomInOrOutPressed_bl = false;
			self.zoomOut_do.isSelectedFinal_bl = false;
			viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);	
			if(!FWDUtils.hitTest(self.zoomOut_do.screen, viewportMouseCoordinates.screenX, viewportMouseCoordinates.screenY)){
				self.zoomOut_do.onMouseOut(e);
			}
			self.dispatchEvent(FWDController.ENABLE_PAN_OR_MOVE);
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.removeEventListener("MSPointerUp", self.zoomOutWithButtonsEndHandler);
				}else{
					window.removeEventListener("touchend", self.zoomOutWithButtonsEndHandler);
				}
			}else{
				
				if(window.removeEventListener){
					window.removeEventListener("mouseup", self.zoomOutWithButtonsEndHandler);
				}else if(document.detachEvent){
					document.detachEvent("onmouseup", self.zoomOutWithButtonsEndHandler);
				}
			}
		};
		
		//##########################################//
		// Scrollbar handler...
		//##########################################//
		self.handlerOnMouseOver = function(e){
			if(self.showButtonsLabels_bl){
				self.positionAndSetLabelScrollBarHandler();
				self.scrollBarHandlerToolTip_do.show();
			}
		};
		
		self.handlerOnMouseOut = function(e){
			if(self.showButtonsLabels_bl) self.scrollBarHandlerToolTip_do.hide(true);
		};
		
		self.handlerDragStartHandler = function(e){
			e = e.e;
			if(self.isMobile_bl){
				self.handlerDragEndHandler(e);
				if(self.moveLeftButton_do || self.moveLeftButton_do) self.panEndHandler(e);
			}
			
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);	
			self.lastPresedX = viewportMouseCoordinates.screenX;
			self.scrollBarHandlerXPositionOnPress = self.scrollBarHandler_do.getX();
			self.scrollBarHandler_do.isSelectedFinal_bl = true;
			self.dispatchEvent(FWDController.DISABLE_PAN_OR_MOVE);
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.addEventListener("MSPointerMove", self.handlerDragMoveHandler);
					window.addEventListener("MSPointerUp", self.handlerDragEndHandler);
				}else{
					window.addEventListener("touchmove", self.handlerDragMoveHandler);
					window.addEventListener("touchend", self.handlerDragEndHandler);
				}
			}else{
				self.scrollBarHandler_do.isSelectedFinal_bl = true;
				if(window.addEventListener){
					window.addEventListener("mousemove", self.handlerDragMoveHandler);
					window.addEventListener("mouseup", self.handlerDragEndHandler);	
				}else if(document.attachEvent){
					document.attachEvent("onmousemove", self.handlerDragMoveHandler);
					document.attachEvent("onmouseup", self.handlerDragEndHandler);
				}
			}
		};
		
		self.handlerDragMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);	
			self.finalHandlerX = Math.round(self.scrollBarHandlerXPositionOnPress + viewportMouseCoordinates.screenX - self.lastPresedX);
			
			if(self.finalHandlerX <= 0){
				self.finalHandlerX = 0;
			}else if(self.finalHandlerX >= self.scrollBarTotalWidth - self.scrollBarHandlerWidth){
				self.finalHandlerX = self.scrollBarTotalWidth - self.scrollBarHandlerWidth;
			}
			
			var percent = self.finalHandlerX/(self.scrollBarTotalWidth - self.scrollBarHandlerWidth);
			self.dispatchEvent(FWDController.SCROLL_BAR_UPDATE, {percent:percent});
			
			self.scrollBarHandler_do.setX(self.finalHandlerX);
			self.positionAndSetLabelScrollBarHandler();
		};
		
		self.handlerDragEndHandler = function(e){
			var viewportMouseCoordinates;
			self.dispatchEvent(FWDController.ENABLE_PAN_OR_MOVE);
			viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);	
			if(!FWDUtils.hitTest(self.scrollBarHandler_do.screen, viewportMouseCoordinates.screenX, viewportMouseCoordinates.screenY)){
				self.scrollBarHandler_do.onMouseOut(e);
				if(self.showButtonsLabels_bl) self.scrollBarHandlerToolTip_do.hide(true);
				self.scrollBarHandler_do.setUnselctedFinal();
			}
			
			self.scrollBarHandler_do.isSelectedFinal_bl = false;
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.removeEventListener("MSPointerMove", self.handlerDragMoveHandler);
					window.removeEventListener("MSPointerUp", self.handlerDragEndHandler);
				}else{
					window.removeEventListener("touchmove", self.handlerDragMoveHandler);
					window.removeEventListener("touchend", self.handlerDragEndHandler);
				}
			}else{
				if(window.removeEventListener){
					window.removeEventListener("mousemove", self.handlerDragMoveHandler);
					window.removeEventListener("mouseup", self.handlerDragEndHandler);
				}else if(document.detachEvent){
					document.detachEvent("onmousemove", self.handlerDragMoveHandler);
					document.detachEvent("onmouseup", self.handlerDragEndHandler);
				}
			}
		};
		
		self.updateScrollBar = function(percent, animate){
			
			if(!self.scrollBarHandler_do) return;
			self.finalHandlerX = Math.round(percent * (self.scrollBarTotalWidth - self.scrollBarHandlerWidth));
			
			
			if(!self.isScrollBarActive_bl) return
			if(self.finalHandlerX <= 0){
				self.finalHandlerX = 0;
			}else if(self.finalHandlerX >= self.scrollBarTotalWidth - self.scrollBarHandlerWidth){
				self.finalHandlerX = self.scrollBarTotalWidth - self.scrollBarHandlerWidth;
			}
			
			TweenMax.killTweensOf(self.scrollBarHandler_do);
			if(animate){
			
				TweenMax.to(self.scrollBarHandler_do, .2, {x:self.finalHandlerX, 
					onUpdate:self.positionAndSetLabelScrollBarHandler,
					onComplete:self.positionAndSetLabelScrollBarHandler});
			}else{
				self.scrollBarHandler_do.setX(self.finalHandlerX);
			}
		};
		
		//###############################//
		//Position scrollbar handler.
		//###############################//
		self.positionAndSetLabelScrollBarHandler = function(){
			if(!self.showButtonsLabels_bl || !self.isScrollBarActive_bl) return;
			var finalX = 0;
			var finalY = 0;
			var percent = self.finalHandlerX/(self.scrollBarTotalWidth - self.scrollBarHandlerWidth);
			var globalX = self.getGlobalX();
		
			self.scrollBarHandlerToolTip_do.setLabel(self.scrollBarHandlerToolTip_do.toolTipLabel_str + (Math.round(percent * 100)) + "%");
			
			setTimeout(function(){
				if(self == null) return
				finalX = parseInt(self.scrollBarHandler_do.getX() + self.scrollBar_do.getX() + (self.scrollBarHandlerWidth - self.scrollBarHandlerToolTip_do.totalWidth)/2);
				if(self.controllerPosition_str ==  FWDController.POSITION_BOTTOM){
					finalY = - self.scrollBarHandlerToolTip_do.totalHeight - self.scrollBarHandlerToolTipOffsetY;
				}else{
					finalY =  self.curHeight + self.scrollBarHandlerToolTipOffsetY;
				}
				if(globalX + finalX < 0) finalX = 0;
				self.scrollBarHandlerToolTip_do.setX(finalX);
				self.scrollBarHandlerToolTip_do.setY(finalY);
			}, 51);
		};
		
		//#####################################//
		/* add keyboard support */
		//####################################//
		this.addKeyboardSupport = function(){
			if(document.addEventListener){
				window.addEventListener("keydown",  self.onKeyDownHandler);	
				window.addEventListener("keyup",  self.onKeyUpHandler);
			}else if(document.attachEvent){
				document.attachEvent("onkeydown",  self.onKeyDownHandler);	
				document.attachEvent("onkeyup",  self.onKeyUpHandler);
			}
		};
		
		this.onKeyDownHandler = function(e){
			if(parent.hibernate_bl) return;
			if(self.isKeyPressed_bl) return;
			
			if(e && e.keyCode == 39){
				self.isKeyPressed_bl = true;
				self.moveRightButtonStartHandler(e);
			
				if(e.preventDefault){
					e.preventDefault();
				}else{
					return false;
				}
			}else if(e.keyCode == 37){
				self.isKeyPressed_bl = true;
				self.moveLeftButtonStartHandler(e);
				
				if(e.preventDefault){
					e.preventDefault();
				}else{
					return false;
				}
			}if(e && e.keyCode == 38){
				self.isKeyPressed_bl = true;
				self.moveUpButtonStartHandler(e);
			
				if(e.preventDefault){
					e.preventDefault();
				}else{
					return false;
				}
			}else if(e.keyCode == 40){
				self.isKeyPressed_bl = true;
				self.moveDownButtonStartHandler(e);
				
				if(e.preventDefault){
					e.preventDefault();
				}else{
					return false;
				}
			}
		};
		
		this.onKeyUpHandler = function(e){
			self.isKeyPressed_bl = false;
			self.panEndHandler(e);
		};
		
		//###############################//
		//Hide / show.
		//###############################//
		self.hide = function(animate){
			if(self.controllerPosition_str == FWDController.POSITION_BOTTOM){
				if(animate){
					TweenMax.to(self.mainHolder_do, 1, {y:self.curHeight + self.controllerOffsetY, ease:Expo.easeInOut});
				}else{
					self.mainHolder_do.setY(self.curHeight + self.controllerOffsetY);
				}
			}else if(self.controllerPosition_str == FWDController.POSITION_TOP){
				if(animate){
					TweenMax.to(self.mainHolder_do, 1, {y:-self.curHeight - self.controllerOffsetY, ease:Expo.easeInOut});
				}else{
					self.mainHolder_do.setY(-self.curHeight - self.controllerOffsetY);
				}
				
			}
		};
		
		self.show = function(){
			TweenMax.to(self.mainHolder_do, 1, {y:0, ease:Expo.easeInOut});
		};
		
		//######################################################//
		/* show tool tip */
		//######################################################//
		self.showToolTipButton = function(button, toolTip, offsetY){
			if(self.showButtonsLabels_bl){
				var finalX;
				var finalY;
				var globalX = self.mainHolder_do.getX();
				var pointerOffsetX = 0;
				
				if(self.showButtonsLabels_bl) toolTip.show();
				
				setTimeout(function(){
					if(self == null) return
					finalX = parseInt(button.getX() + (self.buttonWidth - toolTip.totalWidth)/2);
					
					if(globalX + finalX < 0){
						pointerOffsetX = globalX + finalX;
						finalX = finalX + Math.abs((globalX + finalX));
					}else if(globalX + self.curWidth - finalX - toolTip.totalWidth < 0){
						pointerOffsetX = -(globalX + self.curWidth - finalX - toolTip.totalWidth);
						finalX = finalX + globalX + self.curWidth - finalX - toolTip.totalWidth;
					}
					
					if(self.controllerPosition_str ==  FWDController.POSITION_BOTTOM){
						finalY = - toolTip.totalHeight - offsetY;
						if(self.isHiddenForGood_bl && button == self.hideShowControllerButton_do) finalY -= self.curHeight - 5;
					}else{
						finalY =  self.curHeight + offsetY;
						if(self.isHiddenForGood_bl && button == self.hideShowControllerButton_do) finalY += self.curHeight - 5;
					}

					if(self.isHiddenForGood_bl){
						if(self.controllerPosition_str ==  FWDController.POSITION_BOTTOM){
							finalY -= self.hideControllerOffsetY;
						}else{
							finalY += self.hideControllerOffsetY;
						}
					}
					
					toolTip.setX(finalX);
					toolTip.setY(finalY);	
					toolTip.positionPointer(pointerOffsetX);
				}, 51);
			}
		};
		
		self.showZoomInOrOutToolTipButton = function(button, toolTip, offsetY){
			if(self.showButtonsLabels_bl){
				var finalX;
				var finalY;
				var globalX = self.mainHolder_do.getX();
				var pointerOffsetX = 0;
				
				setTimeout(function(){
					if(self == null) return
					finalX = parseInt(button.getX() + (self.zoomButtonHeight - toolTip.totalWidth)/2);
					if(self.controllerPosition_str ==  FWDController.POSITION_BOTTOM){
						finalY = - toolTip.totalHeight - offsetY;
					}else{
						finalY =  self.curHeight + offsetY;
					}
					
					if(globalX + finalX < 0){
						pointerOffsetX = globalX + finalX;
						finalX = finalX + Math.abs((globalX + finalX));
					}else if(globalX + self.curWidth - finalX - toolTip.totalWidth < 0){
						pointerOffsetX = -(globalX + self.curWidth - finalX - toolTip.totalWidth);
						finalX = finalX + globalX + self.curWidth - finalX - toolTip.totalWidth;
					}
					
					toolTip.setX(finalX);
					toolTip.setY(finalY);	
					toolTip.positionPointer(pointerOffsetX);
				}, 51);
			}
		};
		
		//#####################################//
		/* Disable / enable the move buttons */
		//#####################################//
		this.disableUpAndDownButtons = function(){
			if(self.moveUpButton_do) self.moveUpButton_do.disable();
			if(self.moveDownButton_do) self.moveDownButton_do.disable();
		};
		
		this.enableUpAndDownButtons = function(){
			if(self.moveUpButton_do) self.moveUpButton_do.enable();
			if(self.moveDownButton_do) self.moveDownButton_do.enable();
		};
		
		this.disableLeftAndRightButtons = function(){
			if(self.moveLeftButton_do) self.moveLeftButton_do.disable();
			if(self.moveRightButton_do) self.moveRightButton_do.disable();
		};
		
		this.enableLeftAndRightButtons = function(){
			if(self.moveLeftButton_do) self.moveLeftButton_do.enable();
			if(self.moveRightButton_do) self.moveRightButton_do.enable();
		};
		
		//###############################//
		//Clean main events.
		//###############################//
		self.cleanMainEvents = function(){
		
			clearInterval(self.panImageId_int);
			clearInterval(self.zoomWithButtonsId_int);
			clearInterval(self.slideShowId_int);
			clearTimeout(self.gotoImageId_to);
			clearTimeout(self.zoomWithButtonsId_to);	
			clearTimeout(self.showId_to);
			clearTimeout(self.disableForAWhileHideOrShowControllerToolTipId_to);
			
			if(self.hider){
				self.hider.removeListener(FWDHider.SHOW, self.onHiderShow);
				self.hider.removeListener(FWDHider.HIDE, self.onHiderHide);
			}
		
			self.screen.onmousedown = null;
			
			if(self.isMobile_bl){
				window.removeEventListener("touchend", self.panEndHandler);
				window.removeEventListener("MSPointerUp", self.panEndHandler);
				window.removeEventListener("touchend", self.zoomInWithButtonsEndHandler);
				window.removeEventListener("MSPointerUp", self.zoomInWithButtonsEndHandler);
				window.removeEventListener("touchend", self.zoomOutWithButtonsEndHandler);
				window.removeEventListener("MSPointerUp", self.zoomOutWithButtonsEndHandler);
				window.removeEventListener("touchmove", self.handlerDragMoveHandler);
				window.removeEventListener("touchend", self.handlerDragEndHandler);
				window.removeEventListener("MSPointerMove", self.handlerDragMoveHandler);
				window.removeEventListener("MSPointerUp", self.handlerDragEndHandler);
			}else{
				if(window.removeEventListener){
					window.removeEventListener("mouseup", self.panEndHandler);
					window.removeEventListener("mouseup", self.zoomInWithButtonsEndHandler);
					window.removeEventListener("mouseup", self.zoomOutWithButtonsEndHandler);
					window.removeEventListener("mousemove", self.handlerDragMoveHandler);
					window.removeEventListener("mouseup", self.handlerDragEndHandler);
					window.removeEventListener("keydown",  self.onKeyDownHandler);	
					window.removeEventListener("keyup",  self.onKeyUpHandler);
				}else if(document.detachEvent){
					document.detachEvent("onmouseup", self.panEndHandler);
					document.detachEvent("onmouseup", self.zoomInWithButtonsEndHandler);
					document.detachEvent("onmouseup", self.zoomOutWithButtonsEndHandler);
					document.detachEvent("onmousemove", self.handlerDragMoveHandler);
					document.detachEvent("onmouseup", self.handlerDragEndHandler);
					document.detachEvent("onkeydown",  self.onKeyDownHandler);	
					document.detachEvent("onkeyup",  self.onKeyUpHandler);
				}
			}
		};
			
		//##############################//
		/* destroy */
		//##############################//
		this.destroy = function(){
			
			self.cleanMainEvents();
			
			TweenMax.killTweensOf(self.mainHolder_do);
			self.mainHolder_do.destroy();
			
			self.backgroundLeft_sdo.destroy();
			self.backgroundMiddle_sdo.destroy();
			self.backgroundRight_sdo.destroy();
			
			if(self.moveDownButton_do) self.moveDownButton_do.destroy();
			if(self.moveUpButton_do) self.moveUpButton_do.destroy();
			if(self.moveRightButton_do) self.moveRightButton_do.destroy();
			if(self.moveLeftButton_do) self.moveLeftButton_do.destroy();
			if(self.hideOrShowMarkersButton_do) self.hideOrShowMarkersButton_do.destroy();
			if(self.infoButton_do) self.infoButton_do.destroy();
			if(self.hideShowControllerButton_do){
				TweenMax.killTweensOf(self.hideShowControllerButton_do);
				self.hideShowControllerButton_do.destroy();
			}
			if(self.fullScreenButton_do) self.fullScreenButton_do.destroy();
			if(self.zoomIn_do) self.zoomIn_do.destroy();
			if(self.zoomOut_do) self.zoomOut_do.destroy();
			if(self.scrollBar_do) self.scrollBar_do.destroy();
			if(self.scrollBarLeft_sdo) self.scrollBarLeft_sdo.destroy();
			if(self.scrollBarRight_sdo) self.scrollBarRight_sdo.destroy();
			if(self.scrollBarMiddle_sdo) self.scrollBarMiddle_sdo.destroy();
			if(self.scrollBarHandler_do){
				TweenMax.killTweensOf(self.scrollBarHandler_do);
				self.scrollBarHandler_do.destroy();
			}
			if(self.scrollBarHandlerN_sdo) self.scrollBarHandlerN_sdo.destroy();
			if(self.scrollBarHandlerS_sdo) self.scrollBarHandlerS_sdo.destroy();
			
			if(self.moveDownButtonTooTipLabel_do) self.moveDownButtonTooTipLabel_do.destroy();
			if(self.scrollBarHandlerToolTip_do) self.scrollBarHandlerToolTip_do.destroy();
			if(self.moveUpButtonToolTip_do) self.moveUpButtonToolTip_do.destroy();
			if(self.nextButtonToolTip_do) self.nextButtonToolTip_do.destroy();
			if(self.moveLeftButtonToolTip_do) self.moveLeftButtonToolTip_do.destroy();
			if(self.hideOrShowMarkersToolTip_do) self.hideOrShowMarkersToolTip_do.destroy();
			if(self.infoToolTip_do) self.infoToolTip_do.destroy();
			if(self.hideOrShowControllerToolTip_do) self.hideOrShowControllerToolTip_do.destroy();
			if(self.fullscreenToolTip_do) self.fullscreenToolTip_do.destroy();
		
			self.buttonsTest_ar = null;
			self.buttons_ar = null;
			
			self.hider = null;
			self.mainHolder_do = null;
			self.backgroundLeft_sdo = null;
			self.backgroundMiddle_sdo = null;
			self.backgroundRight_sdo = null;
			self.moveDownButton_do = null;
			self.moveUpButton_do = null;
			self.moveRightButton_do = null;
			self.moveLeftButton_do = null;
			self.hideOrShowMarkersButton_do = null;
			self.infoButton_do = null;
			self.hideShowControllerButton_do = null;
			self.fullScreenButton_do = null;
			self.zoomIn_do = null;
			self.zoomOut_do = null;
			self.scrollBar_do = null;
			self.scrollBarLeft_sdo = null;
			self.scrollBarRight_sdo = null;
			self.scrollBarMiddle_sdo = null;
			self.scrollBarHandler_do = null;
			self.scrollBarHandlerN_sdo = null;
			self.scrollBarHandlerS_sdo = null;
			self.moveDownButtonTooTipLabel_do = null;
			self.scrollBarHandlerToolTip_do = null;
			self.moveUpButtonToolTip_do = null;
			self.nextButtonToolTip_do = null;
			self.moveLeftButtonToolTip_do = null;
			self.hideOrShowMarkersToolTip_do = null;
			self.infoToolTip_do = null;
			self.hideOrShowControllerToolTip_do = null;
			self.fullscreenToolTip_do = null;
		
			self.backgroundLeft_img = null;
			self.backgroundRight_img = null;
			self.downN_img = null;
			self.downS_img = null;
			self.upN_img = null;
			self.upS_img = null;
			self.nextN_img = null;
			self.nextS_img = null;
			self.prevN_img = null;
			self.prevS_img = null;
			this.controllerHideMarkersN_img = null;
			this.controllerHideMarkersS_img = null;
			this.controllerShowMarkersN_img = null;
			this.controllerShowMarkersS_img = null;
			self.infoN_img = null;
			self.infoS_img = null;
			self.linkN_img = null;
			self.linkS_img = null;
			self.fullScreenNormalN_img = null;
			self.fullScreenNormalS_img = null;
			self.fullScreenFullN_img = null;
			self.fullScreenFullS_img = null;
			self.zoomInN_img = null;
			self.zoomInS_img = null;
			self.zoomOutN_img = null;
			self.zoomOutS_img = null;
			self.scrollBarHandlerN_img = null;
			self.scrollBarHandlerS_img = null;
			self.scrollBarLeft_img = null;
			self.scrollBarRight_img = null;
			self.toolTipLeft_img = null;
			self.toolTipPointer_img = null;

			self.backgroundMiddlePath_str = null;
			self.scrollBarMiddlePath_str = null;
			self.draggingMode_str = null;
			self.controllerPosition_str = null;
			self.buttonToolTipLeft_str = null;
			self.buttonToolTipMiddle_str =  null;
			self.buttonToolTipRight_str = null;
			self.link_str = null;
			
			data = null;
			parent = null;
		
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDController.prototype = null;
		};
	
		this.init();
	};
	
	/* set prototype */
	FWDController.setPrototype = function(){
		FWDController.prototype = new FWDDisplayObject("div");
	};
	
	FWDController.SHOW_INFO = "showInfo";
	FWDController.POSITION_TOP = "top";
	FWDController.POSITION_BOTTOM = "bottom";
	FWDController.PAN = "pan";
	FWDController.DISABLE_PAN_OR_MOVE = "disablePanOrMove";
	FWDController.ENABLE_PAN_OR_MOVE = "enablePanOrMove";
	FWDController.SCROLL_BAR_UPDATE = "scrollBarUpdate";
	FWDController.ZOOM_WITH_BUTTONS = "zoomWithButtons";
	FWDController.ZOOM_IN = "zoomIn";
	FWDController.ZOOM_OUT = "zoomOut";
	FWDController.PAN = "pan";
	FWDController.ROTATE = "rotate";
	FWDController.HIDE_MARKERS = "hideMarkers";
	FWDController.SHOW_MARKERS = "showMarkers";
	FWDController.GO_FULL_SCREEN = "goFullScreen";
	FWDController.GO_NORMAL_SCREEN = "goNormalScreen";
	FWDController.MOUSE_DOWN = "controllerOnMouseDown";
	FWDController.HIDE_CONTROLLER = "hideController";
	FWDController.SHOW_CONTROLLER = "showController";
	
	FWDController.prototype = null;
	window.FWDController = FWDController;
	
}());/* Data */
(function(window){
	
	var FWDData = function(props, playListElement){
		
		var self = this;
		var prototype = FWDData.prototype;
		
		this.navigatorImage_img;
		this.mainPreloader_img = null;
		this.mainLightboxCloseButtonN_img = null;
		this.mainLightboxCloseButtonS_img = null;
		this.controllerBackgroundLeft_img = null;
		this.controllerBackgroundRight_img = null;
		this.controllerMoveDownN_img = null;
		this.controllerMoveDownS_img = null;
		this.controllerMoveDownD_img = null;
		this.controllerMoveUpN_img = null;
		this.controllerMoveUpS_img = null;
		this.controllerMoveUpD_img = null;
		this.controllerNextN_img = null;
		this.controllerNextS_img = null;
		this.controllerNextD_img = null;
		this.controllerPrevN_img = null;
		this.controllerPrevS_img = null;
		this.controllerPrevD_img = null;
		this.controllerHideMarkersN_img = null;
		this.controllerHideMarkersS_img = null;
		this.controllerShowMarkersN_img = null;
		this.controllerShowMarkersS_img = null;
		this.controllerInfoN_img = null;
		this.controllerInfoS_img = null;
		this.controllerHideN_img = null;
		this.controllerHideS_img = null;
		this.controllerShowN_img = null;
		this.controllerShowS_img = null;
		this.controllerFullScreenNormalN_img = null;
		this.controllerFullScreenNormalS_img = null;
		this.controllerFullScreenFullN_img = null;
		this.controllerFullScreenFullS_img = null;
		this.zoomInN_img = null;
		this.zoomInS_img = null;
		this.zoomOutN_img = null;
		this.zoomOutS_img = null;
		this.scrollBarHandlerN_img = null;
		this.scrollBarHandlerS_img = null;
		this.scrollBarLeft_img = null;
		this.scrollBarRight_img = null;
		this.toolTipLeft_img = null;
		this.toolTipPointer_img = null;
		this.infoWindowCloseNormal_img = null;
		this.infoWindowCloseSelected_img = null;
		this.originalImage_img = null;
		this.navigatorImage_img = null;
		
		this.props_obj = props;
		this.rootElement_el = null;
		this.skinPaths_ar = [];
		this.images_ar = [];
		this.markersList_ar = [];
		this.toolTipWindows_ar = [];
		this.buttons_ar = null;
		this.buttonsLabels_ar = null;
		this.contextMenuLabels_ar = null;
	
		this.skinPath_str = undefined;
		this.backgroundColor_str = null;
		this.handMovePath_str = null;
		this.handGrabPath_str = null;
		this.controllerBackgroundMiddlePath_str = null;
		this.scrollBarMiddlePath_str = null;
		this.controllerPosition_str = null;
		this.preloaderFontColor_str = null;
		this.preloaderBackgroundColor_str = null;
		this.preloaderText_str = null;
		this.buttonToolTipLeft_str = null;
		this.buttonToolTipMiddle_str = null;
		this.buttonToolTipRight_str = null;
		this.buttonToolTipBottomPointer_str = null;
		this.buttonToolTipTopPointer_str = null;
		this.buttonToolTipFontColor_str = null;
		this.contextMenuBackgroundColor_str = null;
		this.contextMenuBorderColor_str = null;
		this.contextMenuSpacerColor_str = null;
		this.contextMenuItemNormalColor_str = null;
		this.contextMenuItemSelectedColor_str = null;
		this.contextMenuItemSelectedColor_str = null;
		this.contextMenuItemDisabledColor_str = null;
		this.navigatorPosition_str = null;
		this.navigatorHandlerColor_str = null;
		this.navigatorBorderColor_str = null;
		this.infoText_str = null;
		this.infoWindowBackgroundColor_str = null;
		this.infoWindowScrollBarColor_str = null;
		this.originalImagePath_str = null;
		this.navigatorImagePath_str = null;
		
		this.dragRotationSpeed;
		this.panSpeed;
		this.zoomSpeed;
		this.controllerHeight;
		this.imageWidth;
		this.imageHeight;
		this.largeImageWidth;
		this.largeImageHeight;
		this.spaceBetweenButtons;
		this.startSpaceBetweenButtons;
		this.scrollBarOffsetX;
		this.doubleClickZoomFactor;
		this.zoomFactor;
		this.startZoomFactor;
		this.controllerOffsetY;
		this.hideControllerDelay;
		this.controllerBackgroundOpacity;
		this.controllerMaxWidth;
		this.countLoadedSkinImages = 0;
		this.countLoadedImages = 0;
		this.scrollBarHandlerToolTipOffsetY;
		this.zoomInAndOutToolTipOffsetY;
		this.buttonsToolTipOffsetY;
		this.hideControllerOffsetY;
		this.scrollBarPosition;
		this.startSpaceForScrollBarButtons;
		this.totalGraphics;
		this.navigatorWidth;
		this.navigatorHeight;
		this.navigatorOffsetX;
		this.navigatorOffsetY;
		this.infoWindowBackgroundOpacity;
		this.markerToolTipOffsetY;
		this.toolTipWindowMaxWidth;
		this.lightBoxBackgroundOpacity;
		
		this.parseDelayId_to;
		this.loadImageId_to;
		
		this.addKeyboardSupport_bl;
		this.showContextMenu_bl;
		this.showNavigator_bl;
		this.inversePanDirection_bl;
		this.useEntireScreenFor3dObject_bl;
		this.hideController_bl;
		this.showScriptDeveloper_bl;
		this.showMarkers_bl;
		this.hasNavigatorError_bl = false;
		this.showMarkersInfo_bl = false;
		this.addDoubleClickSupport_bl = false;
		this.isMobile_bl = FWDUtils.isMobile;
		this.hasPointerEvent_bl = FWDUtils.hasPointerEvent;
	
		//###################################//
		/*init*/
		//###################################//
		self.init = function(){
			self.parseDelayId_to = setTimeout(self.parseProperties, 100);
		};
		
		//#############################################//
		// parse properties.
		//#############################################//
		self.parseProperties = function(){
	
			var markersElement_el;
			
			var childKids_ar;
			var playListChildren_ar;
			var markersChildren_ar;
			var errorMessage_str;
			var mediaKid;
			var test;
			var obj;
			var obj2;
			var child;
			var hasError_bl;
			var attributeMissing;
			var positionError;
			var hasElementWithAttribute;
			var hasMarker_bl;
			var hasContent_bl = false;
			
			//set the root element of the zoomer list.
			self.rootElement_el = playListElement;
			if(!self.rootElement_el){
				errorMessage_str = "Make sure that the a div with the id - <font color='#FFFFFF'>" + self.props_obj.playListAndSkinId + "</font> exists, self represents the data playlist.";
				self.dispatchEvent(FWDData.LOAD_ERROR, {text:errorMessage_str});
				return;
			}
			
			self.originalImagePath_str = self.props_obj.imagePath;
			if(!self.originalImagePath_str){
				errorMessage_str = "The <font color='#FFFFFF'>imagePath</font> property which represents the path for the iamge to zoom is not defined in the constructor function!";
				self.dispatchEvent(FWDData.LOAD_ERROR, {text:errorMessage_str});
				return;
			}
		
			self.rootElement_el.style.display = "none";
			markersElement_el = FWDUtils.getChildFromNodeListFromAttribute(self.rootElement_el, "data-markers");
	
			self.showNavigator_bl = self.props_obj.showNavigator;
			self.showNavigator_bl = self.showNavigator_bl == "yes" ? true : false;
			if(self.props_obj.showNavigatorOnMobile && self.props_obj.showNavigatorOnMobile == "no" && self.isMobile_bl && self.showNavigator_bl) self.showNavigator_bl = false;
		
			self.showMarkersInfo_bl =  self.props_obj.showMarkersInfo == "yes" ? true : false;
			if(self.isMobile_bl) self.showMarkersInfo_bl = false;
			
			self.addDoubleClickSupport_bl = self.props_obj.addDoubleClickSupport;
			self.addDoubleClickSupport_bl = self.addDoubleClickSupport_bl == "yes" ? true : false;
			if(FWDUtils.isIEAndLessThen9) self.addDoubleClickSupport_bl = false;
			
			//set main properties.
			self.backgroundColor_str = self.props_obj.backgroundColor || "transparent";
			self.preloaderFontColor_str = self.props_obj.preloaderFontColor || "#000000";
			self.preloaderBackgroundColor_str =	self.props_obj.preloaderBackgroundColor || "transparent";
			self.preloaderText_str = self.props_obj.preloaderText || "Loading:"; 
			
			
			self.controllerPosition_str = self.props_obj.controllerPosition || "bottom";
			if(self.controllerPosition_str != "top" && self.controllerPosition_str != "bottom") self.controllerPosition_str = "top";
		
			if(!self.props_obj.buttons){
				errorMessage_str = "The <font color='#FFFFFF'>buttons</font> is not defined in the contructor, this is necessary to setup the main buttons.";
				self.dispatchEvent(FWDData.LOAD_ERROR, {text:errorMessage_str});
				return;
			} 
			
			self.buttons_ar = FWDUtils.splitAndTrim(self.props_obj.buttons, true, true);
	
			
			if(self.isMobile_bl && !self.hasPointerEvent_bl){
				self.buttonsLabels_ar = null;
				self.contextMenuLabels_ar = null;
			}else{
				if(self.props_obj.buttonsToolTips) self.buttonsLabels_ar =  FWDUtils.splitAndTrim(self.props_obj.buttonsToolTips, false);
				if(self.props_obj.contextMenuLabels) self.contextMenuLabels_ar =  FWDUtils.splitAndTrim(self.props_obj.contextMenuLabels, false);
			}
			
			self.showScriptDeveloper_bl = self.props_obj.showScriptDeveloper;
			self.showScriptDeveloper_bl = self.showScriptDeveloper_bl == "no" ? false : true;
			
			self.dragRotationSpeed = self.props_obj.dragRotationSpeed || .5;
			if(isNaN(self.dragRotationSpeed)) self.dragRotationSpeed = .5;
			if(self.dragRotationSpeed < 0){
				self.dragRotationSpeed = 0;
			}else if(self.dragRotationSpeed > 1){
				self.dragRotationSpeed = 1;
			}
			
			self.panSpeed = self.props_obj.panSpeed || 1;
			if(isNaN(self.panSpeed)) self.panSpeed = 1;
			if(self.panSpeed < 1){
				self.panSpeed = 1;
			}else if(self.panSpeed > 100){
				self.panSpeed = 100;
			}
			
			self.zoomSpeed = self.props_obj.zoomSpeed || .1;
			if(isNaN(self.zoomSpeed)) self.zoomSpeed = .1;
			if(self.zoomSpeed < .1){
				self.zoomSpeed = .1;
			}else if(self.zoomSpeed > 1){
				self.zoomSpeed = 1;
			}
			
			self.imageWidth = self.props_obj.imageWidth;
			if(!self.imageWidth){
				self.showPropertyError("imageWidth");
				return
			}else{
				self.imageWidth = parseInt(self.imageWidth);
			}
			
			self.imageHeight = self.props_obj.imageHeight;
			if(!self.imageHeight){
				self.showPropertyError("imageHeight");
				return
			}else{
				self.imageHeight = parseInt(self.imageHeight);
			}
			
			self.zoomFactor = self.props_obj.zoomFactor;
			if(self.zoomFactor  ==  undefined){
				self.showPropertyError("zoomFactor");
				return;
			}
			if(self.zoomFactor < 1){
				 self.zoomFactor = 1;
			}else if(self.zoomFactor > 5){
				 self.zoomFactor = 5;
			}
			
			self.doubleClickZoomFactor = self.props_obj.doubleClickZoomFactor;
			if(isNaN(self.doubleClickZoomFactor)) self.doubleClickZoomFactor = self.zoomFactor;
			if(self.doubleClickZoomFactor > self.zoomFactor) self.doubleClickZoomFactor = self.zoomFactor;
			
			self.startZoomFactor = self.props_obj.startZoomFactor;
			if(self.startZoomFactor == undefined){
				self.startZoomFactor = "default";
				return;
			}
			
			if(!isNaN(self.startZoomFactor)){
				if(self.startZoomFactor < .1){
					self.startZoomFactor = .1;
				}else if(self.startZoomFactor > self.zoomFactor){
					self.startZoomFactor = self.zoomFactor;
				}
			} 
			
			
			self.navigatorOffsetX =  self.props_obj.navigatorOffsetX || 0;
			if(isNaN(self.navigatorOffsetX)) self.navigatorOffsetX = 0;
			self.navigatorOffsetY =  self.props_obj.navigatorOffsetY || 0;
			if(isNaN(self.navigatorOffsetY)) self.navigatorOffsetY = 0;
			
			self.controllerBackgroundOpacity = self.props_obj.controllerBackgroundOpacity;
			if(!self.controllerBackgroundOpacity)  self.controllerBackgroundOpacity = 1;
			if(isNaN(self.controllerBackgroundOpacity)) self.controllerBackgroundOpacity = 1;
			if(self.controllerBackgroundOpacity < 0){
				self.controllerBackgroundOpacity = 0;
			}else if(self.controllerBackgroundOpacity > 1){
				self.controllerBackgroundOpacity = 1;
			}
			
			self.controllerMaxWidth = self.props_obj.controllerMaxWidth;
			if(!self.controllerMaxWidth)  self.controllerMaxWidth = 900;
			if(isNaN(self.controllerMaxWidth)) self.controllerMaxWidth = 900;
			if(self.controllerMaxWidth < 200) self.controllerMaxWidth = 200;
		
			self.hideControllerDelay = self.props_obj.hideControllerDelay;
			if(self.hideControllerDelay){
				self.hideController_bl = true;
				if(isNaN(self.hideControllerDelay)){
					self.hideControllerDelay = 4000;
				}else if(self.hideControllerDelay < 0){
					self.hideControllerDelay = 4000;
				}else{
					self.hideControllerDelay *= 1000;
				}
			}
		
			self.spaceBetweenButtons = self.props_obj.spaceBetweenButtons || 0;
			self.scrollBarPosition = self.props_obj.scrollBarPosition || 0;
			self.startSpaceForScrollBarButtons = self.props_obj.startSpaceForScrollBarButtons || 0;
			self.startSpaceBetweenButtons = self.props_obj.startSpaceBetweenButtons || 0;
			self.startSpaceForScrollBar = self.props_obj.startSpaceForScrollBar || 0;
			self.scrollBarOffsetX = self.props_obj.scrollBarOffsetX || 0;
			self.controllerOffsetY = self.props_obj.controllerOffsetY || 0; 
			self.scrollBarHandlerToolTipOffsetY = self.props_obj.scrollBarHandlerToolTipOffsetY || 0;
			self.zoomInAndOutToolTipOffsetY = self.props_obj.zoomInAndOutToolTipOffsetY || 0;
			self.buttonsToolTipOffsetY = self.props_obj.buttonsToolTipOffsetY || 0;
			self.hideControllerOffsetY = self.props_obj.hideControllerOffsetY || 0;
			self.infoWindowBackgroundOpacity = self.props_obj.infoWindowBackgroundOpacity || 1;
			self.markerToolTipOffsetY = self.props_obj.markerToolTipOffsetY || 1;
			self.toolTipWindowMaxWidth = self.props_obj.toolTipWindowMaxWidth || 300;
			self.buttonToolTipFontColor_str = self.props_obj.buttonToolTipFontColor || "#000000";
			self.contextMenuBackgroundColor_str = self.props_obj.contextMenuBackgroundColor || "#000000";
			self.contextMenuBorderColor_str = self.props_obj.contextMenuBorderColor || "#FF0000";
			self.contextMenuSpacerColor_str = self.props_obj.contextMenuSpacerColor || "#FF0000";
			self.contextMenuItemNormalColor_str = self.props_obj.contextMenuItemNormalColor || "#FF0000";
			self.contextMenuItemSelectedColor_str = self.props_obj.contextMenuItemSelectedColor || "#FF0000";
			self.contextMenuItemDisabledColor_str = self.props_obj.contextMenuItemDisabledColor || "#FF0000";
			
			self.infoWindowBackgroundColor_str = self.props_obj.infoWindowBackgroundColor || "#FF0000";
			self.infoWindowScrollBarColor_str = self.props_obj.infoWindowScrollBarColor || "#FF0000";
			
			self.navigatorImagePath_str = self.props_obj.navigatorImagePath;
			if(self.showNavigator_bl && !self.navigatorImagePath_str) {
				errorMessage_str = "The  <font color='#FFFFFF'>navigatorImagePath</font> is not defined in the contructor, this is necessary to setup the navigator.";
				self.dispatchEvent(FWDData.LOAD_ERROR, {text:errorMessage_str});
				return;
			}
			
			self.navigatorPosition_str = self.props_obj.navigatorPosition || "topleft";
			self.navigatorPosition_str = String(self.navigatorPosition_str).toLowerCase();
			test = self.navigatorPosition_str == "topleft" 
					   || self.navigatorPosition_str == "topright"
					   || self.navigatorPosition_str == "bottomleft"
					   || self.navigatorPosition_str == "bottomright";
						   
			if(!test) self.navigatorPosition_str = "topleft";
			
			self.navigatorHandlerColor_str = self.props_obj.navigatorHandlerColor || "#FF0000";
			self.navigatorBorderColor_str = self.props_obj.navigatorBorderColor || "#FF0000";
		
			self.showContextMenu_bl = self.props_obj.showContextMenu; 
			self.showContextMenu_bl = self.showContextMenu_bl == "no" ? false : true;
			
			self.inversePanDirection_bl = self.props_obj.inversePanDirection;
			self.inversePanDirection_bl = self.inversePanDirection_bl == "yes" ? true : false;
			
			self.addKeyboardSupport_bl = self.props_obj.addKeyboardSupport == "no" ? false : true;
			if(self.isMobile_bl) self.addKeyboardSupport_bl = false;
			
			self.useEntireScreenFor3dObject_bl = self.props_obj.useEntireScreen; 
			self.useEntireScreenFor3dObject_bl = self.useEntireScreenFor3dObject_bl == "yes" ? true : false;
			
			self.infoText_str = FWDUtils.getChildFromNodeListFromAttribute(self.rootElement_el, "data-info");
			if(self.infoText_str){
				self.infoText_str = self.infoText_str.innerHTML;
			}else{
				self.infoText_str = "not defined make sure that an ul element with the attribute data-info is defined!";
			}
			
			//markers.
			if(markersElement_el) self.showMarkers_bl = true; 
			
			if(self.showMarkers_bl){
				markersChildren_ar = FWDUtils.getChildren(markersElement_el);
				for(var i=0; i<markersChildren_ar.length; i++){
					obj = {};
					child = markersChildren_ar[i];
					hasError_bl = false;
					attributeMissing = "";
					
					//check for markers attributes.
					hasElementWithAttribute = FWDUtils.hasAttribute(child, "data-marker-type", i);
					if(!hasElementWithAttribute){
						self.showMarkerError("data-marker-type", i);
						return;
					}
					
					hasElementWithAttribute = FWDUtils.hasAttribute(child, "data-marker-normal-state-path", i);
					if(!hasElementWithAttribute){
						self.showMarkerError("data-marker-normal-state-path", i);
						return;
					}
					
					hasElementWithAttribute = FWDUtils.hasAttribute(child, "data-marker-selected-state-path", i);
					if(!hasElementWithAttribute){
						self.showMarkerError("data-marker-selected-state-path");
						return;
					}
					
					hasElementWithAttribute = FWDUtils.hasAttribute(child, "data-marker-left");
					if(!hasElementWithAttribute){
						self.showMarkerError("data-marker-left", i);
						return;
					}
					
					hasElementWithAttribute = FWDUtils.hasAttribute(child, "data-marker-top");
					if(!hasElementWithAttribute){
						self.showMarkerError("data-marker-top", i);
						return;
					}
					
					hasElementWithAttribute = FWDUtils.hasAttribute(child, "data-marker-width");
					if(!hasElementWithAttribute){
						self.showMarkerError("data-marker-width", i);
						return;
					}
					
					hasElementWithAttribute = FWDUtils.hasAttribute(child, "data-marker-height");
					if(!hasElementWithAttribute){
						self.showMarkerError("data-marker-height", i);
						return;
					}
					
					hasElementWithAttribute = FWDUtils.hasAttribute(child, "data-show-after-zoom-factor");
					if(!hasElementWithAttribute){
						self.showMarkerError("data-show-after-zoom-factor", i);
						return;
					}
					
					obj.type = FWDUtils.getAttributeValue(child, "data-marker-type");
					test = obj.type == "link" || obj.type == "tooltip" || obj.type == "infowindow";
					if(!test){
						self.showMarkerTypeError(obj.type, i);
						return;
					}
					
					
					if(FWDUtils.hasAttribute(child, "data-show-content")){
						if(FWDUtils.trim(FWDUtils.getAttributeValue(child, "data-show-content")) == "no") {
							hasContent_bl = false;
						}else{
							hasContent_bl = true;
						}
					}else{
						hasContent_bl = true;
					}
				
					
					obj.normalStatePath_str = FWDUtils.trim(FWDUtils.getAttributeValue(child, "data-marker-normal-state-path"));
					obj.selectedStatePath_str = FWDUtils.trim(FWDUtils.getAttributeValue(child, "data-marker-selected-state-path"));
					obj.toolTipLabel = FWDUtils.getAttributeValue(child, "data-tool-tip-label") || undefined;
					obj.markerX = parseInt(FWDUtils.getAttributeValue(child, "data-marker-left"));
					if(isNaN(obj.markerX)) obj.markerX = 0;
					obj.markerY = parseInt(FWDUtils.getAttributeValue(child, "data-marker-top"));
					if(isNaN(obj.markerY)) obj.markerY = 0;
					obj.markerWidth = parseInt(FWDUtils.getAttributeValue(child, "data-marker-width"));
					if(isNaN(obj.markerWidth)) obj.markerWidth = 5;
					obj.markerHeight = parseInt(FWDUtils.getAttributeValue(child, "data-marker-height"));
					if(isNaN(obj.markerHeight)) obj.markerHeight = 5;
					obj.showAfterScale = parseFloat(FWDUtils.getAttributeValue(child, "data-show-after-zoom-factor"));
					if(isNaN(obj.showAfterScale)) obj.showAfterScale = 0;
				
					if(obj.type == "link"){
						obj.link = FWDUtils.getAttributeValue(child, "data-marker-url") || "http://www.link-is-not-defined.com";
						obj.target = FWDUtils.getAttributeValue(child, "data-marker-target") || "_blank";
					}else{
						obj.innerHTML = child.innerHTML;
					}
					
					test = FWDUtils.getAttributeValue(child, "data-reg-point");
					test = test === "center" || test === "centertop" || test === "centerbottom";
					if(!test){
						test = "center";
					}else{
						test = FWDUtils.trim(FWDUtils.getAttributeValue(child, "data-reg-point")).toLowerCase();
					}
					
					obj.regPoint = test;
					obj.maxWidth = parseInt(FWDUtils.getAttributeValue(child, "data-marker-window-width"));
					if(isNaN(obj.maxWidth)) obj.maxWidth = 200;
					obj.hasContent_bl = hasContent_bl;
					
				
					
					var obj2 = {};
					if(obj.type == "tooltip"){
						obj2.innerHTML = child.innerHTML;
						obj2.maxWidth = obj.maxWidth;
						obj2.hasContent_bl = hasContent_bl;
						self.toolTipWindows_ar.push(obj2);
					};
					
					self.markersList_ar.push(obj);
				}
			}
			
			self.skinPath_str = self.props_obj.skinPath;
			
			if(!self.skinPath_str){
				errorMessage_str = "The <font color='#FFFFFF'>skinPath</font> property is not defined in the constructor function!";
				self.dispatchEvent(FWDData.LOAD_ERROR, {text:errorMessage_str});
				return;
			}
			
			if((self.skinPath_str.lastIndexOf("/") + 1) != self.skinPath_str.length){
				self.skinPath_str += "/";
			}
		
			//setup skin paths
			self.handMovePath_str = self.skinPath_str + "move.cur";
			self.handGrabPath_str = self.skinPath_str + "handgrab.cur";
			var preloaderPath_str = self.skinPath_str + "preloader.png";
			var mainLightBoxCloseButtonNPath_str = self.skinPath_str + "lightbox-close-icon.png";
			var mainLightBoxCloseButtonSPath_str = self.skinPath_str + "lightbox-close-icon-rollover.png";
			var controllerBackgroundLeftPath_str = self.skinPath_str + "bg-bar-left.png";
			var controllerBackgroundRight_str = self.skinPath_str + "bg-bar-right.png";
			var controllerDownButtonN_str = self.skinPath_str + "down-icon.png";
			var controllerDownButtonS_str = self.skinPath_str + "down-icon-rollover.png";
			var controllerDownButtonD_str = self.skinPath_str + "down-icon-disabled.png";
			var controllerUpButtonN_str = self.skinPath_str + "up-icon.png";
			var controllerUpButtonS_str = self.skinPath_str + "up-icon-rollover.png";
			var controllerUpButtonD_str = self.skinPath_str + "up-icon-disabled.png";
			var controllerNextN_str = self.skinPath_str + "right-icon.png";
			var controllerNextS_str = self.skinPath_str + "right-icon-rollover.png";
			var controllerNextD_str = self.skinPath_str + "right-icon-disabled.png";
			var controllerPrevN_str = self.skinPath_str + "left-icon.png";
			var controllerPrevS_str = self.skinPath_str + "left-icon-rollover.png";
			var controllerPrevD_str  = self.skinPath_str + "left-icon-disabled.png";
			var hideMarkersN_str = self.skinPath_str + "hide-markers-icon.png";
			var hideMarkersS_str = self.skinPath_str + "hide-markers-icon-rollover.png";
			var showMarkersN_str = self.skinPath_str + "show-markers-icon.png";
			var showMarkersS_str = self.skinPath_str + "show-markers-icon-rollover.png";
			var controllerInfoN_str = self.skinPath_str + "info-icon.png";
			var controllerInfoS_str = self.skinPath_str + "info-icon-rollover.png";
			var controllerHideN_str = self.skinPath_str + "hide-controller-icon.png";
			var controllerHideS_str = self.skinPath_str + "hide-controller-icon-rollover.png"; 
			var controllerShowN_str = self.skinPath_str + "show-controller-icon.png"; 
			var controllerShowS_str = self.skinPath_str + "show-controller-icon-rollover.png"; 
			var controllerFullScreemNormalN_str = self.skinPath_str + "fullscr-normal-icon.png";
			var controllerFullScreenNormalS_str = self.skinPath_str + "fullscr-normal-icon-rollover.png";
			var controllerFullScreemFullN_str = self.skinPath_str + "fullscr-full-icon.png";
			var controllerFullScreenFullS_str = self.skinPath_str + "fullscr-full-icon-rollover.png";	
			var zoomInN_str = self.skinPath_str + "zoomin.png";
			var zoomInS_str = self.skinPath_str + "zoomin-rollover.png";
			var zoomOutN_str = self.skinPath_str + "zoomout.png";
			var zoomOutS_str = self.skinPath_str + "zoomout-rollover.png";
			var scrollBarHandlerN_str = self.skinPath_str + "handler.png";
			var scrollBarHandlerS_str = self.skinPath_str + "handler-rollover.png";
			var scrollBarLeft_str = self.skinPath_str + "scrool-left.png";
			var scrollBarRight_str = self.skinPath_str + "scrool-right.png";
			self.scrollBarMiddlePath_str = self.skinPath_str + "scrool-middle.png";
			self.controllerBackgroundMiddlePath_str = self.skinPath_str + "bg-bar-middle.png";
			self.buttonToolTipLeft_str = self.skinPath_str + "button-tool-tip-left.png";
			self.buttonToolTipMiddle_str = self.skinPath_str + "button-tool-tip-middle.png";	
			self.buttonToolTipRight_str = self.skinPath_str + "button-tool-tip-right.png";
			self.buttonToolTipBottomPointer_str = self.skinPath_str + "button-tool-tip-down-pointer.png";
			self.buttonToolTipTopPointer_str = self.skinPath_str + "button-tool-tip-top-pointer.png";
			var infoWindowCloseNormal_str = self.skinPath_str + "close-icon.png";
			var infoWindowCloseSelected_str = self.skinPath_str + "close-icon-rollover.png";
		
			//set skin graphics paths.
			self.skinPaths_ar.push(preloaderPath_str);
			self.skinPaths_ar.push(mainLightBoxCloseButtonNPath_str);
			self.skinPaths_ar.push(mainLightBoxCloseButtonSPath_str);
			self.skinPaths_ar.push(controllerBackgroundLeftPath_str);
			self.skinPaths_ar.push(controllerBackgroundRight_str);
			self.skinPaths_ar.push(controllerDownButtonN_str);
			self.skinPaths_ar.push(controllerDownButtonS_str);
			self.skinPaths_ar.push(controllerDownButtonD_str);
			self.skinPaths_ar.push(controllerUpButtonN_str);
			self.skinPaths_ar.push(controllerUpButtonS_str);
			self.skinPaths_ar.push(controllerUpButtonD_str);
			self.skinPaths_ar.push(controllerNextN_str);
			self.skinPaths_ar.push(controllerNextS_str);
			self.skinPaths_ar.push(controllerNextD_str);
			self.skinPaths_ar.push(controllerPrevN_str);
			self.skinPaths_ar.push(controllerPrevS_str);
			self.skinPaths_ar.push(controllerPrevD_str);
			self.skinPaths_ar.push(hideMarkersN_str);
			self.skinPaths_ar.push(hideMarkersS_str);
			self.skinPaths_ar.push(showMarkersN_str);
			self.skinPaths_ar.push(showMarkersS_str);
			self.skinPaths_ar.push(controllerInfoN_str);
			self.skinPaths_ar.push(controllerInfoS_str);
			self.skinPaths_ar.push(controllerHideN_str);
			self.skinPaths_ar.push(controllerHideS_str);
			self.skinPaths_ar.push(controllerShowN_str);
			self.skinPaths_ar.push(controllerShowS_str);
			self.skinPaths_ar.push(controllerFullScreemNormalN_str);
			self.skinPaths_ar.push(controllerFullScreenNormalS_str);
			self.skinPaths_ar.push(controllerFullScreemFullN_str);
			self.skinPaths_ar.push(controllerFullScreenFullS_str);	
			self.skinPaths_ar.push(zoomInN_str);
			self.skinPaths_ar.push(zoomInS_str);
			self.skinPaths_ar.push(zoomOutN_str);
			self.skinPaths_ar.push(zoomOutS_str);
			self.skinPaths_ar.push(scrollBarHandlerN_str);
			self.skinPaths_ar.push(scrollBarHandlerS_str);
			self.skinPaths_ar.push(scrollBarLeft_str);
			self.skinPaths_ar.push(scrollBarRight_str);
			self.skinPaths_ar.push(self.buttonToolTipTopPointer_str);
			self.skinPaths_ar.push(self.buttonToolTipLeft_str);
			self.skinPaths_ar.push(infoWindowCloseNormal_str);
			self.skinPaths_ar.push(infoWindowCloseSelected_str);
			
			
			self.skinPaths_ar.push(self.buttonToolTipMiddle_str);
			self.skinPaths_ar.push(self.buttonToolTipRight_str);
			self.skinPaths_ar.push(self.controllerBackgroundMiddlePath_str);
			
			self.totalGraphics = self.skinPaths_ar.length;
			
			self.loadSkin();
		};
		
		//####################################//
		/* load buttons graphics */
		//###################################//
		self.loadSkin = function(){
		
			if(self.image_img){
				self.image_img.onload = null;
				self.image_img.onerror = null;
			}
			
			var imagePath = self.skinPaths_ar[self.countLoadedSkinImages];
			
			self.image_img = new Image();
			self.image_img.onload = self.onSkinLoadHandler;
			self.image_img.onerror = self.onKinLoadErrorHandler;
			self.image_img.src = imagePath;
		};
		
		self.onSkinLoadHandler = function(e){
		
			if(self.countLoadedSkinImages == 0){
				self.mainPreloader_img = self.image_img;
				self.dispatchEvent(FWDData.PRELOADER_LOAD_DONE);
				self.dispatchEvent(FWDData.SKIN_PROGRESS);
			}else if(self.countLoadedSkinImages == 1){
				self.mainLightboxCloseButtonN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 2){
				self.mainLightboxCloseButtonS_img = self.image_img;
				self.dispatchEvent(FWDData.LIGHBOX_CLOSE_BUTTON_LOADED);
			}else if(self.countLoadedSkinImages == 3){
				self.controllerBackgroundLeft_img = self.image_img;
				self.controllerHeight = self.controllerBackgroundLeft_img.height;
			}else if(self.countLoadedSkinImages == 4){
				self.controllerBackgroundRight_img = self.image_img;
			}else if(self.countLoadedSkinImages == 5){
				self.controllerMoveDownN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 6){
				self.controllerMoveDownS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 7){
				self.controllerMoveDownD_img = self.image_img;
			}else if(self.countLoadedSkinImages == 8){
				self.controllerMoveUpN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 9){
				self.controllerMoveUpS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 10){
				self.controllerMoveUpD_img = self.image_img;
			}else if(self.countLoadedSkinImages == 11){
				self.controllerNextN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 12){
				self.controllerNextS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 13){
				self.controllerNextD_img = self.image_img;
			}else if(self.countLoadedSkinImages == 14){
				self.controllerPrevN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 15){
				self.controllerPrevS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 16){
				self.controllerPrevD_img = self.image_img;
			}else if(self.countLoadedSkinImages == 17){
				self.controllerHideMarkersN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 18){
				self.controllerHideMarkersS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 19){
				self.controllerShowMarkersN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 20){
				self.controllerShowMarkersS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 21){
				self.controllerInfoN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 22){
				self.controllerInfoS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 23){
				self.controllerHideN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 24){
				self.controllerHideS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 25){
				self.controllerShowN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 26){
				self.controllerShowS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 27){
				self.controllerFullScreenNormalN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 28){
				self.controllerFullScreenNormalS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 29){
				self.controllerFullScreenFullN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 30){
				self.controllerFullScreenFullS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 31){
				self.zoomInN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 32){
				self.zoomInS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 33){
				self.zoomOutN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 34){
				self.zoomOutS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 35){
				self.scrollBarHandlerN_img = self.image_img;
			}else if(self.countLoadedSkinImages == 36){
				self.scrollBarHandlerS_img = self.image_img;
			}else if(self.countLoadedSkinImages == 37){
				self.scrollBarLeft_img = self.image_img;
			}else if(self.countLoadedSkinImages == 38){
				self.scrollBarRight_img = self.image_img;
			}else if(self.countLoadedSkinImages == 39){
				self.toolTipPointer_img = self.image_img;
			}else if(self.countLoadedSkinImages == 40){
				self.toolTipLeft_img = self.image_img;
			}else if(self.countLoadedSkinImages == 41){
				self.infoWindowCloseNormal_img = self.image_img;
			}else if(self.countLoadedSkinImages == 42){
				self.infoWindowCloseSelected_img = self.image_img;
			}
			
			self.countLoadedSkinImages++;
			if(self.countLoadedSkinImages < self.totalGraphics){
				self.loadImageId_to = setTimeout(self.loadSkin, 16);
			}else{
				self.dispatchEvent(FWDData.SKIN_PROGRESS, {percent:self.countLoadedSkinImages/self.totalGraphics});
				self.dispatchEvent(FWDData.LOAD_DONE);
				if(self.showNavigator_bl){
					self.loadNavigatorImage();
				}else{
					self.loadMainImage();
				}
			}
		};
		
		self.onKinLoadErrorHandler = function(e){
			var message = "The skin graphics with the label <font color='#FFFFFF'>" + self.skinPaths_ar[self.countLoadedSkinImages] + "</font> can't be loaded, make sure that the image exists and the path is correct!";
			console.log(e);
			var err = {text:message};
			self.dispatchEvent(FWDData.LOAD_ERROR, err);
		};
		
		self.stopToLoad = function(){
			clearTimeout(self.loadImageId_to);
			if(self.image_img){
				self.image_img.onload = null;
				self.image_img.onerror = null;
			}
			
			if(self.navigatorImage_img){
				self.navigatorImage_img.onload = null;
				self.navigatorImage_img.onerror = null;
			}
		};
		
		//####################################//
		/* load navigator images */
		//###################################//
		self.loadNavigatorImage = function(){
			
			if(self.image_img){
				self.image_img.onload = null;
				self.image_img.onerror = null;
			}
			
			var imagePath = self.navigatorImagePath_str;
			self.image_img = new Image();
			self.image_img.onload = self.onNavigatorImageLoadHandler;
			self.image_img.onerror = self.onNavigatorImageLoadErrorHandler;
			self.image_img.src = imagePath;
		};
		
		self.onNavigatorImageLoadHandler = function(){
			self.navigatorWidth = self.image_img.width;
			self.navigatorHeight = self.image_img.height;
			self.navigatorImage_img = self.image_img;
			self.loadMainImage();
			self.dispatchEvent(FWDData.IMAGES_PROGRESS);
		};
		
		//####################################//
		/* load small images */
		//###################################//
		self.loadMainImage = function(){
			if(self.hasNavigatorError_bl) return;
			if(self.image_img){
				self.image_img.onload = null;
				self.image_img.onerror = null;
			}
			
			self.image_img = new Image();
			self.image_img.onload = self.onImageLoadHandler;
			self.image_img.onerror = self.onImageLoadErrorHandler;
			self.image_img.src = self.originalImagePath_str;
		};
		
		self.onImageLoadHandler = function(e){	
			self.originalImage_img = self.image_img;	
			self.dispatchEvent(FWDData.IMAGES_LOAD_COMPLETE);
		};
		
		self.onLastNavigatorImageLoadHandler = function(e){
			if(self == null) return;
			self.dispatchEvent(FWDData.IMAGES_LOAD_COMPLETE);
		};
		
		self.onNavigatorImageLoadErrorHandler = function(e){
			var message = "The navigator image with the label <font color='#FFFFFF'>" + self.navigatorImagePath_str + "</font> can't be loaded, make sure that the image exists and the path is correct!";
			self.hasNavigatorError_bl = true;
			var err = {text:message};
			self.dispatchEvent(FWDData.LOAD_ERROR, err);
			console.log(e);
		};
		
		
		self.onImageLoadErrorHandler = function(e){
			var message = "The image with the label <font color='#FFFFFF'>" + self.originalImagePath_str + "</font> can't be loaded, make sure that the image exists and the path is correct!";
			console.log(e);
			var err = {text:message};
			self.dispatchEvent(FWDData.LOAD_ERROR, err);
		};
		
		//####################################//
		/* check if element with and attribute exists or throw error */
		//####################################//
		self.checkForAttribute = function(e, attr, position){
			var test = FWDUtils.getChildFromNodeListFromAttribute(e, attr);
			test = test ? FWDUtils.trim(FWDUtils.getAttributeValue(test, attr)) : undefined;
			
			if(!test){
				if(position != undefined){
					self.dispatchEvent(FWDData.LOAD_ERROR, {text:"Element with attribute <font color='#FFFFFF'>" + attr + "</font> is not defined at positon <font color='#FFFFFF'>" + (position + 1) + "</font>"});
				}else{
					self.dispatchEvent(FWDData.LOAD_ERROR, {text:"Element with attribute <font color='#FFFFFF'>" + attr + "</font> is not defined."});
				}
				return;
			}
			return test;
		};
		
		//####################################//
		/* show error if a required property is not defined */
		//####################################//
		self.showPropertyError = function(error){
			self.dispatchEvent(FWDData.LOAD_ERROR, {text:"The property called <font color='#FFFFFF'>" + error + "</font> is not defined."});
		};
		
		self.showMarkerError = function(error, position){
			self.dispatchEvent(FWDData.LOAD_ERROR, {text:"The marker at position <font color='#FFFFFF'>" + (position + 1) + "</font> dose not have defined an attribute <font color='#FFFFFF'>" + error + "</font>."});
		};
		
		self.showMarkerTypeError = function(error, position){
			self.dispatchEvent(FWDData.LOAD_ERROR, {text:"Marker type is incorrect <font color='#FFFFFF'>" + error + "</font> at position <font color='#FFFFFF'>" + position + "</font>. Accepted types are <font color='#FFFFFF'>link, tooltip, infowindow</font>."});
		};
			
		//####################################//
		/*destroy */
		//####################################//
		self.destroy = function(){
			var img_img;
		
			clearTimeout(self.parseDelayId_to);
			clearTimeout(self.loadImageId_to);
			
			if(self.image_img){
				self.image_img.onload = null;
				self.image_img.onerror = null;
				self.image_img.src = null;
			}
			
			if(self.navigatorImage_img){
				self.navigatorImage_img.onload = null;
				self.navigatorImage_img.onerror = null;
				self.navigatorImage_img.src = null;
			}
			
			
			if(self.mainPreloader_img) self.mainPreloader_img.src = null;
			if(self.mainLightboxCloseButtonN_img) self.mainLightboxCloseButtonN_img.src = null;
			if(self.mainLightboxCloseButtonS_img) self.mainLightboxCloseButtonS_img.src = null;
			if(self.controllerBackgroundLeft_img) self.controllerBackgroundLeft_img.src = null; 
			if(self.controllerBackgroundRight_img) self.controllerBackgroundRight_img.src = null; 
			if(self.controllerMoveDownN_img) self.controllerMoveDownN_img.src = null; 
			if(self.controllerMoveDownS_img) self.controllerMoveDownS_img.src = null;
			if(self.controllerMoveDownD_img) self.controllerMoveDownD_img.src = null;
			if(self.controllerMoveUpN_img) self.controllerMoveUpN_img.src = null;
			if(self.controllerMoveUpS_img) self.controllerMoveUpS_img.src = null;
			if(self.controllerMoveUpD_img) self.controllerMoveUpD_img.src = null;
			if(self.controllerNextN_img) self.controllerNextN_img.src = null;
			if(self.controllerNextS_img) self.controllerNextS_img.src = null;
			if(self.controllerNextD_img) self.controllerNextD_img.src = null;
			if(self.controllerPrevN_img) self.controllerPrevN_img.src = null;
			if(self.controllerPrevS_img) self.controllerPrevS_img.src = null;
			if(self.controllerPrevD_img) self.controllerPrevD_img.src = null;
			if(self.controllerHideMarkersN_img) self.controllerHideMarkersN_img.src = null;
			if(self.controllerHideMarkersS_img) self.controllerHideMarkersS_img.src = null;
			if(self.controllerShowMarkersN_img) self.controllerShowMarkersN_img.src = null;
			if(self.controllerShowMarkersS_img) self.controllerShowMarkersS_img.src = null;
			if(self.controllerInfoN_img) self.controllerInfoN_img.src = null;			
			if(self.controllerHideN_img) self.controllerHideN_img.src = null;
			if(self.controllerHideS_img) self.controllerHideS_img.src = null;
			if(self.controllerShowN_img) self.controllerShowN_img.src = null;
			if(self.controllerShowS_img) self.controllerShowS_img.src = null;
			if(self.controllerFullScreenNormalN_img) self.controllerFullScreenNormalN_img.src = null;
			if(self.controllerFullScreenNormalS_img) self.controllerFullScreenNormalS_img.src = null;
			if(self.controllerFullScreenFullN_img) self.controllerFullScreenFullN_img.src = null;
			if(self.controllerFullScreenFullS_img) self.controllerFullScreenFullS_img.src = null;
			if(self.zoomInN_img) self.zoomInN_img.src = null;
			if(self.zoomInS_img) self.zoomInS_img.src = null;
			if(self.zoomOutN_img) self.zoomOutN_img.src = null;
			if(self.zoomOutS_img) self.zoomOutS_img.src = null;
			if(self.scrollBarHandlerN_img) self.scrollBarHandlerN_img.src = null;
			if(self.scrollBarHandlerN_img) self.scrollBarHandlerN_img.src = null;
			if(self.scrollBarHandlerS_img) self.scrollBarHandlerS_img.src = null;
			if(self.scrollBarLeft_img) self.scrollBarLeft_img.src = null;
			if(self.scrollBarLeft_img) self.scrollBarLeft_img.src = null;
			if(self.scrollBarRight_img) self.scrollBarRight_img.src = null;
			if(self.toolTipLeft_img) self.toolTipLeft_img.src = null;
			if(self.toolTipPointer_img) self.toolTipPointer_img.src = null;
			if(self.infoWindowCloseNormal_img) self.infoWindowCloseNormal_img.src = null;
			if(self.infoWindowCloseSelected_img) self.infoWindowCloseSelected_img.src = null;
	
			
			self.mainPreloader_img = null;
			self.mainLightboxCloseButtonN_img = null;
			self.mainLightboxCloseButtonS_img = null;
			self.controllerBackgroundLeft_img = null;
			self.controllerBackgroundRight_img = null;
			self.controllerMoveDownN_img = null;
			self.controllerMoveDownS_img = null;
			self.controllerMoveUpN_img = null;
			self.controllerMoveUpS_img = null;
			self.controllerNextN_img = null;
			self.controllerNextS_img = null;
			self.controllerPrevN_img = null;
			self.controllerPrevS_img = null;
			self.controllerHideMarkersN_img = null;
			self.controllerHideMarkersS_img = null;
			self.controllerShowMarkersN_img = null;
			self.controllerShowMarkersS_img = null;
			self.controllerInfoN_img = null;
			self.controllerInfoS_img = null;
			self.controllerHideN_img = null;
			self.controllerHideS_img = null;
			self.controllerShowN_img = null;
			self.controllerShowS_img = null;
			self.controllerFullScreenNormalN_img = null;
			self.controllerFullScreenNormalS_img = null;
			self.controllerFullScreenFullN_img = null;
			self.controllerFullScreenFullS_img = null;
			self.zoomInN_img = null;
			self.zoomInS_img = null;
			self.zoomOutN_img = null;
			self.zoomOutS_img = null;
			self.scrollBarHandlerN_img = null;
			self.scrollBarHandlerS_img = null;
			self.scrollBarLeft_img = null;
			self.scrollBarRight_img = null;
			self.toolTipLeft_img = null;
			self.toolTipPointer_img = null;
			self.infoWindowCloseNormal_img = null;
			self.infoWindowCloseSelected_img = null;
			
			this.props_obj = null;
			this.rootElement_el = null;
			this.skinPaths_ar = null;
			this.markersList_ar = null;
			this.toolTipWindows_ar = null;
			this.buttons_ar = null;
			this.buttonsLabels_ar = null;
			this.contextMenuLabels_ar = null;
			
			this.backgroundColor_str = null;
			this.handMovePath_str = null;
			this.handGrabPath_str = null;
			this.controllerBackgroundMiddlePath_str = null;
			this.scrollBarMiddlePath_str = null;
			this.controllerPosition_str = null;
			this.preloaderFontColor_str = null;
			this.preloaderBackgroundColor_str = null;
			this.preloaderText_str = null;
			this.buttonToolTipLeft_str = null;
			this.buttonToolTipMiddle_str = null;
			this.buttonToolTipRight_str = null;
			this.buttonToolTipBottomPointer_str = null;
			this.buttonToolTipTopPointer_str = null;
			this.buttonToolTipFontColor_str = null;
			this.contextMenuBackgroundColor_str = null;
			this.contextMenuBorderColor_str = null;
			this.contextMenuSpacerColor_str = null;
			this.contextMenuItemNormalColor_str = null;
			this.contextMenuItemSelectedColor_str = null;
			this.contextMenuItemSelectedColor_str = null;
			this.contextMenuItemDisabledColor_str = null;
			this.navigatorPosition_str = null;
			this.navigatorHandlerColor_str = null;
			this.navigatorBorderColor_str = null;
			this.infoText_str = null;
			this.infoWindowBackgroundColor_str = null;
			this.infoWindowScrollBarColor_str = null;
			
			prototype.destroy();
			self = null;
			prototype = null;
			FWDData.prototype = null;
		};
		
		self.init();
	};
	
	/* set prototype */
	FWDData.setPrototype = function(){
		FWDData.prototype = new FWDEventDispatcher();
	};
	
	FWDData.prototype = null;
	FWDData.PRELOADER_LOAD_DONE = "onPreloaderLoadDone";
	FWDData.LOAD_DONE = "onLoadDone";
	FWDData.LOAD_ERROR = "onLoadError";
	FWDData.LIGHBOX_CLOSE_BUTTON_LOADED = "onLightBoxCloseButtonLoadDone";
	FWDData.IMAGE_LOADED = "onImageLoaded";
	FWDData.FIRST_IMAGE_LOAD_COMPLETE = "onFirstImageLoadComplete";
	FWDData.IMAGES_LOAD_COMPLETE = "onImagesLoadComplete";
	FWDData.SKIN_PROGRESS = "onSkinProgress";
	FWDData.IMAGES_PROGRESS = "onImagesPogress";
	FWDData.hasTouch_bl = false;
	
	window.FWDData = FWDData;
}(window));/* FWDDescriptionWindow */
(function (window){
var FWDDescriptionWindow = function(parent, data){
		
		var self = this;
		var prototype = FWDDescriptionWindow.prototype;
		
		this.infoWindowCloseNormal_img = data.infoWindowCloseNormal_img;
		this.infoWindowCloseSelected_img = data.infoWindowCloseSelected_img;
		
		this.close_do = null;
		this.background_sdo = null; 
		this.mainContentHolder_do = null;
		this.dumyHolder_do = null;
		this.contentHolder_sdo = null;
		this.scrollBar_do = null;
		this.scrollBarTrack_sdo = null;
		this.scrollBarHandler_sdo = null;
	
		this.mainBackgroundColor_str = data.infoWindowBackgroundColor_str;
		this.scrollBarHandlerColor = data.infoWindowScrollBarColor_str;
		this.scrollBarTrackColor = data.infoWindowScrollBarColor_str;
		this.scrollBarTrackOpacity = .6;
		
		this.toolTipWindowId = "none";
		this.backgroundOpacity = data.infoWindowBackgroundOpacity;
		this.mainContentHolderWidth;
		this.mainContentHolderHeight;
		this.contentHolderHeight;
		this.scrollBarHandlerFinalY;
		this.mainContentFinalX = 0;
		this.mainContentFinalY = 0;
		this.contentFinalX = 0;
		this.contentFinalY = 0;
		this.headerFinalY = 0;
		this.contentHeight;
		this.maxWidth = 800;
		this.offestWidth = 20;
		this.offsetHeight = 20;
		this.stageWidth;
		this.stageHeight;
		this.scrollBarHeight = 0;
		this.scrollBarWidth = 4;
		this.scrollBarHandlerHeight;
		this.scrollBarBorderRadius = 15;
		this.yPositionOnPress;
		this.lastPresedY;
		this.closeButtonWidth = self.infoWindowCloseNormal_img.width;
		this.closeButtonHeight = self.infoWindowCloseNormal_img.height;
		this.vy = 0;
		this.vy2 = 0;
		this.friction = .9;
		
		this.hideWithDelayId_do;
		this.showOrHideWithDelayId_to;
		this.hideCompleteId_to;
		this.updateMobileScrollBarId_int;
	
		this.isShowed_bl = true;
		this.isDragging_bl = false;
		this.allowToScroll_bl = true;
		this.isMobile_bl = FWDUtils.isMobile;
		this.hasPointerEvent_bl = FWDUtils.hasPointerEvent;
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setOverflow("visible");
			self.setBackfaceVisibility();
			self.setupMainContainers();
			if(self.isMobile_bl){
				self.setupMobileScrollbar();
			}else{
				self.setupPCScrollBar();
				self.addMouseWheelSupport();
			}
			self.setupCloseButton();
			self.hide(false);
			
		};
		
		//##########################################//
		/* position and resize */
		//##########################################//
		self.resizeAndPosition = function(){
			if(self.stageWidth == parent.stageWidth && self.stageHeight == parent.stageHeight) return;
			self.stageWidth = parent.stageWidth;
			self.stageHeight = parent.stageHeight;
			self.background_sdo.setWidth(self.stageWidth);
			self.background_sdo.setHeight(self.stageHeight);
			self.updateSize();
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){
			self.background_sdo = new FWDSimpleDisplayObject("div");
			self.background_sdo.setBkColor(self.mainBackgroundColor_str);
			self.addChild(self.background_sdo);
			
			self.mainContentHolder_do = new FWDDisplayObject("div");
			self.mainContentHolder_do.setBackfaceVisibility();
			
			self.dumyHolder_do = new FWDDisplayObject("div");
			self.dumyHolder_do.setBackfaceVisibility();
			self.addChild(self.dumyHolder_do);
			
			self.dumyHolder_do.addChild(self.mainContentHolder_do);
			
			self.contentHolder_sdo = new FWDSimpleDisplayObject("div");
			self.contentHolder_sdo.getStyle().fontSmoothing = "antialiased";
			self.contentHolder_sdo.getStyle().webkitFontSmoothing = "antialiased";
			self.contentHolder_sdo.getStyle().textRendering = "optimizeLegibility";	
			if(!FWDUtils.isMobile || FWDUtils.isApple){
				self.contentHolder_sdo.hasTransform3d_bl = false;
				self.contentHolder_sdo.hasTransform2d_bl = false;
			};
			self.contentHolder_sdo.setBackfaceVisibility();
			self.mainContentHolder_do.addChild(self.contentHolder_sdo);
		};
		
		//########################################//
		/* Setup close button */
		//#######################################//
		self.setupCloseButton = function(){
			FWDSimpleButton.setPrototype();
			self.close_do = new FWDSimpleButton(self.infoWindowCloseNormal_img, self.infoWindowCloseSelected_img);
			self.close_do.addListener(FWDSimpleButton.MOUSE_DOWN, self.closeButtonStartHandler);
			self.mainContentHolder_do.addChild(self.close_do);
		};
		
		self.closeButtonStartHandler = function(e){
			if(!self.isShowed_bl) return;
			self.hide(true);
		};
		
		//########################################//
		/* update content size */
		//########################################//
		self.updateSize = function(){
			self.mainContentHolderWidth = self.stageWidth - self.offestWidth;
			if(self.mainContentHolderWidth > self.maxWidth) self.mainContentHolderWidth = self.maxWidth;
			self.mainContentHolder_do.setWidth(self.mainContentHolderWidth);
			self.setWidth(self.stageWidth);
			self.setHeight(self.stageHeight);
			self.dumyHolder_do.setWidth(self.stageWidth);
			self.dumyHolder_do.setHeight(self.stageHeight);
		
			self.close_do.setX(self.mainContentHolderWidth - self.closeButtonWidth);
			
			if(self.isMobile_bl){	
				setTimeout(function(){
					if(self == null) return;
					TweenMax.killTweensOf(self.mainContentHolder_do);
					self.contentHolderHeight = self.contentHolder_sdo.getHeight();
					self.mainContentHolderHeight = Math.min(self.stageHeight, self.contentHolderHeight);
					self.mainContentFinalX = Math.round((self.stageWidth - self.mainContentHolderWidth)/2);
					
					if(self.stageHeight > self.contentHolderHeight){
						self.mainContentFinalY = Math.round((self.stageHeight - self.contentHolderHeight)/2);
						self.allowToScroll_bl = false;
					}else{
						self.mainContentFinalY = 0;	
						self.allowToScroll_bl = true;
					}
					
					self.updateMobileScrollBarWithoutAnimation();
					TweenMax.killTweensOf(self.mainContentHolder_do);
					self.mainContentHolder_do.setX(self.mainContentFinalX);
					self.mainContentHolder_do.setY(self.mainContentFinalY);
					self.mainContentHolder_do.setHeight(self.mainContentHolderHeight);
				}, 50);
				
			}else{
			
				setTimeout(function(){
					if(self == null) return;
					TweenMax.killTweensOf(self.mainContentHolder_do);
					self.contentHolderHeight = self.contentHolder_sdo.getHeight();
					self.mainContentHolderHeight = self.stageHeight;
					self.mainContentFinalX = Math.round((self.stageWidth - self.mainContentHolderWidth)/2);
					self.scrollBarHeight = Math.min(self.contentHolderHeight - 20 - self.closeButtonHeight, self.stageHeight - 20 - self.closeButtonHeight);
					
					if(self.stageHeight > self.contentHolderHeight){
						self.scrollBar_do.setOverflow("hidden");
						self.mainContentHolderHeight = self.contentHolderHeight;
						self.scrollBarHandler_sdo.setY(0);
						self.mainContentFinalY = Math.round((self.stageHeight - self.contentHolderHeight)/2) ;
						self.allowToScroll_bl = false;
					}else{
						self.mainContentFinalY = 0;
						self.scrollBar_do.setOverflow("visible");
						self.scrollBar_do.setY(5 + self.closeButtonHeight);
						self.allowToScroll_bl = true;
					}
					
					if(self.stageHeight < 120) self.mainContentFinalY = 0;
				
					self.scrollBarHandlerHeight = Math.min((self.scrollBarHeight - 20), (self.stageHeight/self.contentHolderHeight) * (self.scrollBarHeight - 20));
					if(self.scrollBarHandlerHeight > 500){
						self.scrollBarHandlerHeight = 500;
					}
					
					self.scrollBar_do.setX(self.mainContentHolderWidth - self.scrollBarWidth - 2);
					self.scrollBarTrack_sdo.setHeight(Math.max(self.scrollBarHeight, self.scrollBarHandlerHeight));
					self.scrollBarHandler_sdo.setHeight(self.scrollBarHandlerHeight);
					
					TweenMax.killTweensOf(self.mainContentHolder_do);
					self.mainContentHolder_do.setX(self.mainContentFinalX);
					self.mainContentHolder_do.setY(self.mainContentFinalY);
					self.mainContentHolder_do.setHeight(self.mainContentHolderHeight);
					
					self.updatePCHandler(false);
				
				}, 50);
			}
		};
		
		//##########################################//
		/* set label */
		//##########################################//
		self.setText = function(text){
			if(self == null) return;
			self.updateSize();
			self.contentHolder_sdo.setInnerHTML(text);
			setTimeout(self.updateSize, 120);
		};
	
		//#########################################//
		/* Setup PC scrollbar */
		//#########################################//
		self.setupPCScrollBar = function(){
			
			self.scrollBar_do = new FWDDisplayObject("div");
			self.scrollBar_do.setOverflow("visible");
			self.mainContentHolder_do.addChild(self.scrollBar_do);
			
			self.scrollBarTrack_sdo = new FWDSimpleDisplayObject("div");
			self.scrollBarTrack_sdo.setWidth(self.scrollBarWidth);
			self.scrollBarTrack_sdo.setBkColor(self.scrollBarTrackColor);
			self.scrollBarTrack_sdo.setAlpha(0);
			self.scrollBarTrack_sdo.getStyle().borderRadius = self.scrollBarBorderRadius + "px";
			self.scrollBar_do.addChild(self.scrollBarTrack_sdo);
			
			self.scrollBarHandler_sdo = new FWDSimpleDisplayObject("div");
			self.scrollBarHandler_sdo.setButtonMode(true);
			self.scrollBarHandler_sdo.setWidth(self.scrollBarWidth);
			self.scrollBarHandler_sdo.getStyle().borderRadius = self.scrollBarBorderRadius + "px";
			self.scrollBarHandler_sdo.setBkColor(self.scrollBarHandlerColor);
			self.scrollBarHandler_sdo.setAlpha(.5);
			
			if(self.scrollBarHandler_sdo.screen.addEventListener){
				self.scrollBarHandler_sdo.screen.addEventListener("mouseover", self.scrollBarHandlerOnMouseOver);
				self.scrollBarHandler_sdo.screen.addEventListener("mouseout", self.scrollBarHandlerOnMouseOut);
				self.scrollBarHandler_sdo.screen.addEventListener("mousedown", self.scrollBarHandlerOnMouseDown);
			}else if(self.screen.attachEvent){
				self.scrollBarHandler_sdo.screen.attachEvent("onmouseover", self.scrollBarHandlerOnMouseOver);
				self.scrollBarHandler_sdo.screen.attachEvent("onmouseout", self.scrollBarHandlerOnMouseOut);
				self.scrollBarHandler_sdo.screen.attachEvent("onmousedown", self.scrollBarHandlerOnMouseDown);
			}
			
			self.scrollBar_do.addChild(self.scrollBarHandler_sdo);
		};
		
		//descktop handler
		self.scrollBarHandlerOnMouseOver = function(){
			TweenMax.to(self.scrollBarHandler_sdo, .2, {alpha:1, w:10});
			TweenMax.to(self.scrollBarTrack_sdo, .2, {alpha:.4, w:10});
			TweenMax.to(self.scrollBar_do, .2, {x:self.mainContentHolderWidth - self.scrollBarWidth - 6});
		};
		
		self.scrollBarHandlerOnMouseOut = function(){
			if(self.isDragging_bl) return;
			TweenMax.to(self.scrollBarHandler_sdo, .3, {alpha:.5, w:self.scrollBarWidth});
			TweenMax.to(self.scrollBarTrack_sdo, .3, {alpha:0, w:self.scrollBarWidth});
			TweenMax.to(self.scrollBar_do, .3, {x:self.mainContentHolderWidth - self.scrollBarWidth - 2});
		};
		
		self.scrollBarHandlerOnMouseDown = function(e){
			//if(self.stageHeight < 120) return;
			if(!self.allowToScroll_bl) return;
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);		
			self.isDragging_bl = true;
			self.yPositionOnPress = self.scrollBarHandler_sdo.getY();
			self.lastPresedY = viewportMouseCoordinates.screenY;
			
			if(window.addEventListener){
				window.addEventListener("mousemove", self.scrollBarHandlerMoveHandler);
				window.addEventListener("mouseup", self.scrollBarHandlerEndHandler);	
			}else if(document.attachEvent){
				document.attachEvent("onmousemove", self.scrollBarHandlerMoveHandler);
				document.attachEvent("onmouseup", self.scrollBarHandlerEndHandler);
			}
		};
		
		self.scrollBarHandlerMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);	
	
			self.scrollBarHandlerFinalY = Math.round(self.yPositionOnPress + viewportMouseCoordinates.screenY - self.lastPresedY);
			if(self.scrollBarHandlerFinalY >= self.scrollBarHeight - self.scrollBarHandlerHeight){
				self.scrollBarHandlerFinalY = self.scrollBarHeight -  self.scrollBarHandlerHeight;
			}
			
			if(self.scrollBarHandlerFinalY <= 0) self.scrollBarHandlerFinalY = 0;
			self.scrollBarHandler_sdo.setY(self.scrollBarHandlerFinalY);
			self.updatePCHandler(true);
		};
		
		self.scrollBarHandlerEndHandler = function(e){
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);	
			self.isDragging_bl = false;
			
			if(!FWDUtils.hitTest(self.scrollBarHandler_sdo.screen, viewportMouseCoordinates.screenX, viewportMouseCoordinates.screenY)){
				self.scrollBarHandlerOnMouseOut();
			}
			if(window.removeEventListener){
				window.removeEventListener("mousemove", self.scrollBarHandlerMoveHandler);
				window.removeEventListener("mouseup", self.scrollBarHandlerEndHandler);	
			}else if(document.detachEvent){
				document.detachEvent("onmousemove", self.scrollBarHandlerMoveHandler);
				document.detachEvent("onmouseup", self.scrollBarHandlerEndHandler);
			}
		};
		
		self.updatePCHandler = function(animate){
			
			var percent;
			var scrollPercent;
			
			//if(self.stageHeight < 120) return;

			scrollPercent = (self.scrollBarHandlerFinalY/(self.scrollBarHeight - self.scrollBarHandlerHeight));
			
			if(scrollPercent == "Infinity") scrollPercent = 0;
			if(scrollPercent >= 1) scrollPercent = 1;
		
			if(self.isDragging_bl){
				self.contentFinalY = parseInt(scrollPercent * (self.stageHeight - self.contentHolderHeight));
			}else{
				if(self.scrollBarHandler_sdo.getY() < 0){
					self.scrollBarHandler_sdo.setY(0);
				}else if(self.scrollBarHandler_sdo.getY() > self.scrollBarHeight - self.scrollBarHandlerHeight ){
					self.scrollBarHandler_sdo.setY(self.scrollBarHeight - self.scrollBarHandlerHeight);
				}
			
				percent = self.scrollBarHandler_sdo.getY()/(self.scrollBarHeight - self.scrollBarHandlerHeight);	
				if(isNaN(percent)) percent = 0;
				
				if(self.stageHeight > self.contentHolderHeight){
					self.contentFinalY = 0;
				}else{
					self.contentFinalY = Math.round((percent * (self.scrollBarHeight  - self.scrollBarHandlerHeight)));
					self.contentFinalY = Math.round(percent * (self.stageHeight - self.contentHolderHeight));
				}
			}
			
			if(animate){
				TweenMax.to(self.contentHolder_sdo, .3, {y:Math.round(self.contentFinalY)});
			}else{
				self.contentHolder_sdo.setY(Math.round(self.contentFinalY));
			}
			
		};
		
		//######################################//
		/* add mouse wheel support */
		//######################################//
		self.addMouseWheelSupport = function(){
			if(window.addEventListener){
				self.screen.addEventListener ("mousewheel", self.mouseWheelHandler);
				self.screen.addEventListener('DOMMouseScroll', self.mouseWheelHandler);
			}else if(document.attachEvent){
				self.screen.attachEvent ("onmousewheel", self.mouseWheelHandler);
			}
		};
		
		this.mouseWheelHandler = function(e){
			if(!self.isShowed_bl) return;
			//if(self.stageHeight < 120) return;
			if(self.isDragging_bl) return;
			if(self.stageHeight > self.contentHolderHeight) return;
		
			var speedPercent = (self.stageHeight/self.contentHolderHeight);
			var dir = e.detail || e.wheelDelta;	
			if(e.wheelDelta) dir *= -1;
			if(FWDUtils.isOpera) dir *= -1;
			
			if(dir > 0){
				self.scrollBarHandler_sdo.setY(self.scrollBarHandler_sdo.getY() + (45 * speedPercent));
			}else if(dir < 0){
				self.scrollBarHandler_sdo.setY(self.scrollBarHandler_sdo.getY() - (45 * speedPercent));
			}
			
			self.updatePCHandler(true);
			
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}	
			return;
		};
		
	
		//##########################################//
		/* setup mobile scrollbar */
		//##########################################//
		self.setupMobileScrollbar = function(){
			if(self.hasPointerEvent_bl){
				self.screen.addEventListener("MSPointerDown", self.scrollBarTouchStartHandler);
			}else{
				self.screen.addEventListener("touchstart", self.scrollBarTouchStartHandler);
			}
		};
		
		self.scrollBarTouchStartHandler = function(e){
			//if(e.preventDefault) e.preventDefault();
			if(!self.allowToScroll_bl) return;
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);		
			self.isDragging_bl = true;
			self.lastPresedY = viewportMouseCoordinates.screenY;
	
			if(self.hasPointerEvent_bl){
				window.addEventListener("MSPointerUp", self.scrollBarTouchEndHandler);
				window.addEventListener("MSPointerMove", self.scrollBarTouchMoveHandler);
			}else{
				window.addEventListener("touchend", self.scrollBarTouchEndHandler);
				window.addEventListener("touchmove", self.scrollBarTouchMoveHandler);
			}
		};
		
		self.scrollBarTouchMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);	
			var toAdd = viewportMouseCoordinates.screenY - self.lastPresedY;
		
			self.contentFinalY += toAdd;
			self.contentFinalY = Math.round(self.contentFinalY);
			
			self.contentHolder_sdo.setY(self.contentFinalY);
			self.lastPresedY = viewportMouseCoordinates.screenY;
			self.vy = toAdd  * 2;
		};
		
		self.scrollBarTouchEndHandler = function(e){
			self.isDragging_bl = false;
			if(self.hasPointerEvent_bl){
				window.removeEventListener("MSPointerUp", self.scrollBarTouchEndHandler);
				window.removeEventListener("MSPointerMove", self.scrollBarTouchMoveHandler);
			}else{
				window.removeEventListener("touchend", self.scrollBarTouchEndHandler);
				window.removeEventListener("touchmove", self.scrollBarTouchMoveHandler);
			}
		};
		
		self.updateMobileScrollBar = function(animate){
			
			if(!self.isDragging_bl){
				self.vy *= self.friction;
				self.contentFinalY += self.vy;	
			
				if(self.contentFinalY > 0){
					self.vy2 = (0 - self.contentFinalY) * .3;
					self.vy *= self.friction;
					self.contentFinalY += self.vy2;
				}else if(self.contentFinalY < self.mainContentHolderHeight - self.contentHolderHeight){
					self.vy2 = (self.mainContentHolderHeight - self.contentHolderHeight - self.contentFinalY) * .3;
					self.vy *= self.friction;
					self.contentFinalY += self.vy2;
				}
				self.contentHolder_sdo.setY(Math.round(self.contentFinalY));
			}
		};
		
		self.updateMobileScrollBarWithoutAnimation = function(){
			if(self.contentFinalY > 0){
				self.contentFinalY = 0;
			}else if(self.contentFinalY < self.mainContentHolderHeight - self.contentHolderHeight){
				self.contentFinalY = self.mainContentHolderHeight - self.contentHolderHeight;
			}
			self.contentHolder_sdo.setY(Math.round(self.contentFinalY));
		};
		
		self.activateScrollBar = function(){
			if(self.isMobile_bl){
				self.updateMobileScrollBarId_int = setInterval(self.updateMobileScrollBar, 16);
			}
		};
		
		//##########################################//
		/* show / hide*/
		//##########################################//
		self.show = function(text){
			if(self.isShowed_bl) return;
			self.isShowed_bl = true;
			self.resizeAndPosition();
			self.setText(text);
			self.activateScrollBar();
			if(FWDUtils.isMobile){
				TweenMax.to(self.background_sdo, .6, {alpha:self.backgroundOpacity, delay:.2});
				self.showOrHideWithDelayId_to = setTimeout(self.showWithDelay, 1800);
			}else{
				TweenMax.to(self.background_sdo, .6, {alpha:self.backgroundOpacity});
				self.showOrHideWithDelayId_to = setTimeout(self.showWithDelay, 800);
			}
			self.dispatchEvent(FWDDescriptionWindow.SHOW_START);
		};
		
		self.showWithDelay = function(){
			self.dumyHolder_do.setX(0);
			if(self.scrollBarHandler_sdo) self.scrollBarHandler_sdo.setVisible(true);
			self.mainContentHolder_do.setY(-self.mainContentHolderHeight);
			TweenMax.to(self.mainContentHolder_do, .6, {y:self.mainContentFinalY, ease:Expo.easeInOut});
			if(!self.isMobile_bl)  setTimeout(function(){
				self.scrollBarHandler_sdo.setAlpha(.5);
				if(self.close_do.s_do) self.close_do.s_do.setAlpha(0);
				}, 400);
			
		};
		
	
		self.hide = function(animate, overwrite){
			if(!self.isShowed_bl && !overwrite) return;
			TweenMax.killTweensOf(self.background_sdo);	
			if(animate){
				TweenMax.to(self.mainContentHolder_do, .6, {y:self.stageHeight, ease:Expo.easeInOut});
				self.showOrHideWithDelayId_to = setTimeout(self.hideWithDelay, 800);
			}else{
				self.dumyHolder_do.setX(-3000);
				if(self.scrollBarHandler_sdo) self.scrollBarHandler_sdo.setVisible(false);
				self.background_sdo.setAlpha(0);
			}
			clearInterval(self.updateMobileScrollBarId_int);
			self.isShowed_bl = false;
		};
		
		self.hideWithDelay = function(){
			self.contentHolder_sdo.setInnerHTML("");
			TweenMax.to(self.background_sdo, .6, {alpha:0});
			self.hideCompleteId_to = setTimeout(self.hideWithDelayComplete, 600);
		};
		
		self.hideWithDelayComplete = function(){
			self.contentFinalY = 0;
			if(self.scrollBarHandler_sdo) self.scrollBarHandler_sdo.setY(0);
			self.dispatchEvent(FWDDescriptionWindow.HIDE_COMPLETE);
		};
		
		//###############################//
		/* clean main events */
		//###############################//
		self.cleanMainEvents = function(){
			
			if(self.screen.removeEventListener){
				if(self.scrollBarHandler_sdo){
					self.scrollBarHandler_sdo.screen.removeEventListener("mouseover", self.scrollBarHandlerOnMouseOver);
					self.scrollBarHandler_sdo.screen.removeEventListener("mouseout", self.scrollBarHandlerOnMouseOut);
					self.scrollBarHandler_sdo.screen.removeEventListener("mousedown", self.scrollBarHandlerOnMouseDown);
				}
				
				window.removeEventListener("mousemove", self.scrollBarHandlerMoveHandler);
				window.removeEventListener("mouseup", self.scrollBarHandlerEndHandler);	
				
				self.screen.removeEventListener ("mousewheel", self.mouseWheelHandler);
				self.screen.removeEventListener('DOMMouseScroll', self.mouseWheelHandler);
				
				self.screen.addEventListener("MSPointerDown", self.scrollBarTouchStartHandler);
				self.screen.addEventListener("touchstart", self.scrollBarTouchStartHandler);
				window.removeEventListener("MSPointerUp", self.scrollBarTouchEndHandler);
				window.removeEventListener("MSPointerMove", self.scrollBarTouchMoveHandler);
				window.removeEventListener("touchend", self.scrollBarTouchEndHandler);
				window.removeEventListener("touchmove", self.scrollBarTouchMoveHandler);
			}else if(self.screen.detachEvent){
				self.scrollBarHandler_sdo.screen.detachEvent("onmouseover", self.scrollBarHandlerOnMouseOver);
				self.scrollBarHandler_sdo.screen.detachEvent("onmouseout", self.scrollBarHandlerOnMouseOut);
				self.scrollBarHandler_sdo.screen.detachEvent("onmousedown", self.scrollBarHandlerOnMouseDown);
				
				document.detachEvent("onmousemove", self.scrollBarHandlerMoveHandler);
				document.detachEvent("onmouseup", self.scrollBarHandlerEndHandler);
				
				self.screen.detachEvent("onmousewheel", self.mouseWheelHandler);
			}
			
			clearTimeout(self.hideWithDelayId_do);
			clearTimeout(self.showOrHideWithDelayId_to);
			clearTimeout(self.hideCompleteId_to);
			clearInterval(self.updateMobileScrollBarId_int);
		};
		
		//##############################//
		/* destroy */
		//##############################//
		self.destroy = function(){
			self.cleanMainEvents(); 
			
			if(self.scrollBar_do){
				TweenMax.killTweensOf(self.scrollBar_do);
				TweenMax.killTweensOf(self.scrollBarHandler_sdo);
				TweenMax.killTweensOf(self.scrollBarTrack_sdo);
				
				self.scrollBar_do.destroy();
				self.scrollBarHandler_sdo.destroy();
				self.scrollBarTrack_sdo.destroy();
			}
			
			TweenMax.killTweensOf(self.contentHolder_sdo);
			self.contentHolder_sdo.destroy();
			
			TweenMax.killTweensOf(self.background_sdo);
			self.background_sdo.destroy();
			
			TweenMax.killTweensOf(self.mainContentHolder_do);
			self.mainContentHolder_do.destroy();
			
			self.close_do.destroy();
			
			self.infoWindowCloseNormal_img = null;
			self.infoWindowCloseSelected_img = null;
			
			self.close_do = null;
			self.background_sdo = null; 
			self.mainContentHolder_do = null;
			self.contentHolder_sdo = null;
			self.scrollBar_do = null;
			self.scrollBarTrack_sdo = null;
			self.scrollBarHandler_sdo = null;
			
			self.mainBackgroundColor_str = null;
			self.scrollBarHandlerColor = null;
			self.scrollBarTrackColor = null;
			self.scrollBarTrackOpacity = null;
			
			parent = null;
			data = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDDescriptionWindow.prototype = null;
			
		};
	
		self.init();
	};
	
	/* set prototype */
	FWDDescriptionWindow.setPrototype = function(){
		FWDDescriptionWindow.prototype = new FWDDisplayObject("div");
	};
	
	FWDDescriptionWindow.HIDE_COMPLETE = "hideComplete";
	FWDDescriptionWindow.SHOW_START = "showStart";
	
	FWDDescriptionWindow.prototype = null;
	window.FWDDescriptionWindow = FWDDescriptionWindow;
}(window));/* Display object */
(function (window){
	/*
	 * @ type values: div, img.
	 * @ positon values: relative, absolute.
	 * @ positon values: hidden.
	 * @ display values: block, inline-block, self applies only if the position is relative.
	 */
	var FWDDisplayObject = function(type, position, overflow, display){
		
		var self = this;
		self.listeners = {events_ar:[]};
		
		if(type == "div" || type == "img" || type == "canvas"){
			self.type = type;	
		}else{
			throw Error("Type is not valid! " + type);
		}
	
		this.children_ar = [];
		this.style;
		this.screen;
		this.transform;
		this.position = position || "absolute";
		this.overflow = overflow || "hidden";
		this.display = display || "inline-block";
		this.visible = true;
		this.buttonMode;
		this.x = 0;
		this.y = 0;
		this.w = 0;
		this.h = 0;
		this.rect;
		this.alpha = 1;
		this.innerHTML = "";
		this.opacityType = "";
		this.isHtml5_bl = false;
		
		this.hasTransform3d_bl =  FWDUtils.hasTransform3d;
		this.hasTransform2d_bl =  FWDUtils.hasTransform2d;
		if(FWDUtils.isFirefox) self.hasTransform3d_bl = false;
		if(FWDUtils.isFirefox) self.hasTransform2d_bl = false;
		this.hasBeenSetSelectable_bl = false;
		
		
		//##############################//
		/* init */
		//#############################//
		self.init = function(){
			self.setScreen();
		};	
		
		//######################################//
		/* check if it supports transforms. */
		//######################################//
		self.getTransform = function() {
		    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform'];
		    var p;
		    while (p = properties.shift()) {
		       if (typeof self.screen.style[p] !== 'undefined') {
		            return p;
		       }
		    }
		    return false;
		};
		
		//######################################//
		/* set opacity type */
		//######################################//
		self.getOpacityType = function(){
			var opacityType;
			if (typeof self.screen.style.opacity != "undefined") {//ie9+ 
				opacityType = "opacity";
			}else{ //ie8
				opacityType = "filter";
			}
			return opacityType;
		};
		
		//######################################//
		/* setup main screen */
		//######################################//
		self.setScreen = function(element){
			if(self.type == "img" && element){
				self.screen = element;
				self.setMainProperties();
			}else{
				self.screen = document.createElement(self.type);
				self.setMainProperties();
			}
		};
		
		//########################################//
		/* set main properties */
		//########################################//
		self.setMainProperties = function(){
			
			self.transform = self.getTransform();
			self.setPosition(self.position);
			self.setDisplay(self.display);
			self.setOverflow(self.overflow);
			self.opacityType = self.getOpacityType();
			
			if(self.opacityType == "opacity") self.isHtml5_bl = true;
			
			if(self.opacityType == "filter") self.screen.style.filter = "inherit";
			self.screen.style.left = "0px";
			self.screen.style.top = "0px";
			self.screen.style.margin = "0px";
			self.screen.style.padding = "0px";
			self.screen.style.maxWidth = "none";
			self.screen.style.maxHeight = "none";
			self.screen.style.border = "none";
			self.screen.style.lineHeight = "1";
			self.screen.style.backgroundColor = "transparent";
			self.screen.style.backfaceVisibility = "hidden";
			self.screen.style.webkitBackfaceVisibility = "hidden";
			self.screen.style.MozBackfaceVisibility = "hidden";	
			self.screen.style.MozImageRendering = "optimizeSpeed";	
			self.screen.style.WebkitImageRendering = "optimizeSpeed";
			
			if(type == "img"){
				self.setWidth(self.screen.width);
				self.setHeight(self.screen.height);
			}
		};
			
		self.setBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "visible";
			self.screen.style.webkitBackfaceVisibility = "visible";
			self.screen.style.MozBackfaceVisibility = "visible";		
		};
		
		//###################################################//
		/* set / get various peoperties.*/
		//###################################################//
		self.setSelectable = function(val){
			if(!val){
				self.screen.style.userSelect = "none";
				self.screen.style.MozUserSelect = "none";
				self.screen.style.webkitUserSelect = "none";
				self.screen.style.khtmlUserSelect = "none";
				self.screen.style.oUserSelect = "none";
				self.screen.style.msUserSelect = "none";
				self.screen.msUserSelect = "none";
				self.screen.ondragstart = function(e){return false;};
				self.screen.onselectstart = function(){return false;};
				self.screen.ontouchstart = function(){return false;};
				self.screen.style.webkitTouchCallout='none';
				self.hasBeenSetSelectable_bl = true;
			}
		};
		
		self.getScreen = function(){
			return self.screen;
		};
		
		self.setVisible = function(val){
			self.visible = val;
			if(self.visible == true){
				self.screen.style.visibility = "visible";
			}else{
				self.screen.style.visibility = "hidden";
			}
		};
		
		self.getVisible = function(){
			return self.visible;
		};
			
		self.setResizableSizeAfterParent = function(){
			self.screen.style.width = "100%";
			self.screen.style.height = "100%";
		};
		
		self.getStyle = function(){
			return self.screen.style;
		};
		
		self.setOverflow = function(val){
			self.overflow = val;
			self.screen.style.overflow = self.overflow;
		};
		
		self.setPosition = function(val){
			self.position = val;
			self.screen.style.position = self.position;
		};
		
		self.setDisplay = function(val){
			self.display = val;
			self.screen.style.display = self.display;
		};
		
		self.setButtonMode = function(val){
			self.buttonMode = val;
			if(self.buttonMode ==  true){
				self.screen.style.cursor = "pointer";
			}else{
				self.screen.style.cursor = "default";
			}
		};
		
		self.setBkColor = function(val){
			self.screen.style.backgroundColor = val;
		};
		
		self.setInnerHTML = function(val){
			self.innerHTML = val;
			self.screen.innerHTML = self.innerHTML;
		};
		
		self.getInnerHTML = function(){
			return self.innerHTML;
		};
		
		self.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		self.setAlpha = function(val){
			self.alpha = val;
			if(self.opacityType == "opacity"){
				self.screen.style.opacity = self.alpha;
			}else if(self.opacityType == "filter"){
				self.screen.style.filter = "alpha(opacity=" + self.alpha * 100 + ")";
				self.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(self.alpha * 100) + ")";
			}
		};
		
		self.getAlpha = function(){
			return self.alpha;
		};
		
		self.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		self.getGlobalX = function(){
			return self.getRect().left;
		};
		
		self.getGlobalY = function(){
			return self.getRect().top;
		};
		
		self.setX = function(val){
			self.x = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = 'translate3d(' + self.x + 'px,' + self.y + 'px,0)';
			}else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else{
				self.screen.style.left = self.x + "px";
			}
		};
		
		self.getX = function(){
			return  self.x;
		};
		
		self.setY = function(val){
			self.y = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = 'translate3d(' + self.x + 'px,' + self.y + 'px,0)';	
			}else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else{
				self.screen.style.top = self.y + "px";
			}
		};
		
		self.getY = function(){
			return  self.y;
		};
		
		self.setWidth = function(val){
			self.w = val;
			if(self.type == "img"){
				self.screen.width = self.w;
			}else{
				self.screen.style.width = self.w + "px";
			}
		};
		
		self.getWidth = function(){
			if(self.type == "div"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}else if(self.type == "img"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				if(self.screen.width != 0) return  self.screen.width;
				return self._w;
			}else if( self.type == "canvas"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}
		};
		
		self.setHeight = function(val){
			self.h = val;
			if(self.type == "img"){
				self.screen.height = self.h;
			}else{
				self.screen.style.height = self.h + "px";
			}
		};
		
		self.getHeight = function(){
			if(self.type == "div"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}else if(self.type == "img"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				if(self.screen.height != 0) return  self.screen.height;
				return self.h;
			}else if(self.type == "canvas"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}
		};
		
		//#####################################//
		/* DOM list */
		//#####################################//
		self.addChild = function(e){
			if(self.contains(e)){	
				self.children_ar.splice(FWDUtils.indexOfArray(self.children_ar, e), 1);
				self.children_ar.push(e);
				self.screen.appendChild(e.screen);
			}else{
				self.children_ar.push(e);
				self.screen.appendChild(e.screen);
			}
		};
		
		self.removeChild = function(e){
			if(self.contains(e)){
				self.children_ar.splice(FWDUtils.indexOfArray(self.children_ar, e), 1);
				self.screen.removeChild(e.screen);
			}else{
				//console.log(arguments.callee.caller.toString())
				throw Error("##removeChild()## Child dose't exist, it can't be removed!");
			};
		};
		
		self.contains = function(e){
			if(FWDUtils.indexOfArray(self.children_ar, e) == -1){
				return false;
			}else{
				return true;
			}
		};
		
		self.addChildAt = function(e, index){
			if(self.getNumChildren() == 0){
				self.children_ar.push(e);
				self.screen.appendChild(e.screen);
			}else if(index == 1){
				self.screen.insertBefore(e.screen, self.children_ar[0].screen);
				self.screen.insertBefore(self.children_ar[0].screen, e.screen);	
				if(self.contains(e)){
					self.children_ar.splice(FWDUtils.indexOfArray(self.children_ar, e), 1, e);
				}else{
					self.children_ar.splice(FWDUtils.indexOfArray(self.children_ar, e), 0, e);
				}
			}else{
				if(index < 0  || index > self.getNumChildren() -1) throw Error("##getChildAt()## Index out of bounds!");
				
				self.screen.insertBefore(e.screen, self.children_ar[index].screen);
				if(self.contains(e)){
					self.children_ar.splice(FWDUtils.indexOfArray(self.children_ar, e), 1, e);
				}else{
					self.children_ar.splice(FWDUtils.indexOfArray(self.children_ar, e), 0, e);
				}
			}
		};
		
		self.getChildAt = function(index){
			if(index < 0  || index > self.getNumChildren() -1) throw Error("##getChildAt()## Index out of bounds!");
			if(self.getNumChildren() == 0) throw Errror("##getChildAt## Child dose not exist!");
			return self.children_ar[index];
		};
		
		self.removeChildAtZero = function(){
			self.screen.removeChild(self.children_ar[0].screen);
			self.children_ar.shift();
		};
		
		self.getNumChildren = function(){
			return self.children_ar.length;
		};
		
		
		//################################//
		/* event dispatcher */
		//#################################//
		self.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    self.dispatchEvent = function(type, props){
	    	if(this.listeners == null) return;
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this && this.listeners.events_ar[i].type === type){		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		this.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		this.listeners.events_ar[i].listener.call(this, this.listeners.events_ar[i]);
	        	}
	        }
	    };
	    
	    self.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this 
	        			&& this.listeners.events_ar[i].type === type
	        			&& this.listeners.events_ar[i].listener ===  listener
	        	){
	        		this.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
	    
	    //###########################################//
	    /* destroy methods*/
	    //###########################################//
		self.disposeImage = function(){
			if(self.type == "img") self.screen.src = null;
		};
		
		
		self.destroy = function(){
			
			//try{self.screen.parentNode.removeChild(self.screen);}catch(e){};
			
			if(self.hasBeenSetSelectable_bl){
				self.screen.ondragstart = null;
				self.screen.onselectstart = null;
				self.screen.ontouchstart = null;
			};
			
			self.screen.removeAttribute("style");
			
			//destroy properties
			self.listeners = [];
			self.listeners = null;
			self.children_ar = [];
			self.children_ar = null;
			self.style = null;
			self.screen = null;
			self.transform = null;
			self.position = null;
			self.overflow = null;
			self.display = null;
			self.visible = null;
			self.buttonMode = null;
			self.x = null;
			self.y = null;
			self.w = null;
			self.h = null;
			self.rect = null;
			self.alpha = null;
			self.innerHTML = null;
			self.opacityType = null;
			self.isHtml5_bl = null;
		
			self.hasTransform3d_bl = null;
			self.hasTransform2d_bl = null;
			self = null;
		};
		
	    /* init */
		self.init();
	};
	
	window.FWDDisplayObject = FWDDisplayObject;
}(window));(function (){
	
	var FWDEventDispatcher = function (){
		
	    this.listeners = {events_ar:[]};
	     
	    this.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    this.dispatchEvent = function(type, props){
	    	if(this.listeners == null) return;
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this && this.listeners.events_ar[i].type === type){		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		this.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		this.listeners.events_ar[i].listener.call(this, this.listeners.events_ar[i]);
	        	}
	        }
	    };
	    
	   this.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this 
	        			&& this.listeners.events_ar[i].type === type
	        			&& this.listeners.events_ar[i].listener ===  listener
	        	){
	        		this.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
	    
	    /* destroy */
	    this.destroy = function(){
	    	this.listeners = null;
	    	
	    	this.addListener = null;
		    this.dispatchEvent = null;
		    this.removeListener = null;
	    };
	    
	};	
	
	window.FWDEventDispatcher = FWDEventDispatcher;
}(window));/* hider */
(function (window){
	
    var FWDHider = function(isMobile_bl, screenToTest, hideDelay){
    	
    	var self = this;
    	var prototype = FWDHider.prototype;
   
    	this.screenToTest = screenToTest;
    	this.hideDelay = hideDelay;
    	this.globalX = 0;
    	this.globalY = 0;
	
		this.currentTime;
    	this.checkIntervalId_int;
    	
    	this.dispatchOnceShow_bl = true;
    	this.dispatchOnceHide_bl = false;
    	this.isMobile_bl = isMobile_bl;
    	this.isStopped_bl = true;
    	this.hasPointerEvent_bl = FWDUtils.hasPointerEvent;
    	
		self.init = function(){};
	
		self.start = function(){
			self.currentTime = new Date().getTime();
			self.checkIntervalId_int = setInterval(self.update, 100);
			self.addMouseOrTouchCheck();
			self.isStopped_bl = false;
		};
		
		self.stop = function(){
			clearInterval(self.checkIntervalId_int);
			self.isStopped_bl = true;
			self.removeMouseOrTouchCheck();
		};
		
		self.addMouseOrTouchCheck = function(){	
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screenToTest.screen.addEventListener("MSPointerDown", self.onMouseOrTouchUpdate);
					self.screenToTest.screen.addEventListener("MSPointerMove", self.onMouseOrTouchUpdate);
				}else{
					self.screenToTest.screen.addEventListener("touchstart", self.onMouseOrTouchUpdate);
				}
			}else if(self.screenToTest.screen.addEventListener){
				self.screenToTest.screen.addEventListener("mousemove", self.onMouseOrTouchUpdate);
			}else if(self.screenToTest.screen.attachEvent){
				self.screenToTest.screen.attachEvent("onmousemove", self.onMouseOrTouchUpdate);
			}
		};
		
		self.removeMouseOrTouchCheck = function(){	
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screenToTest.screen.removeEventListener("MSPointerDown", self.onMouseOrTouchUpdate);
					self.screenToTest.screen.removeEventListener("MSPointerMove", self.onMouseOrTouchUpdate);
				}else{
					self.screenToTest.screen.removeEventListener("touchstart", self.onMouseOrTouchUpdate);
				}
			}else if(self.screenToTest.screen.removeEventListener){
				self.screenToTest.screen.removeEventListener("mousemove", self.onMouseOrTouchUpdate);
			}else if(self.screenToTest.screen.detachEvent){
				self.screenToTest.screen.detachEvent("onmousemove", self.onMouseOrTouchUpdate);
			}
		};
		
		self.onMouseOrTouchUpdate = function(e){
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);	
			self.currentTime = new Date().getTime();
			self.globalX = viewportMouseCoordinates.screenX;
			self.globalY = viewportMouseCoordinates.screenY;
		};
	
		self.update = function(e){
			if(new Date().getTime() > self.currentTime + self.hideDelay){
				if(self.dispatchOnceShow_bl){	
					self.dispatchEvent(FWDHider.HIDE);
					self.dispatchOnceHide_bl = true;
					self.dispatchOnceShow_bl = false;	
				}
			}else{
				if(self.dispatchOnceHide_bl){
					self.dispatchEvent(FWDHider.SHOW);
					self.dispatchOnceHide_bl = false;
					self.dispatchOnceShow_bl = true;
				}
			}
		};

		self.reset = function(){
			self.currentTime = new Date().getTime();
			self.dispatchEvent(FWDHider.SHOW);
		};
		
		/* destroy */
		self.destroy = function(){
		
			self.removeMouseOrTouchCheck();
			clearInterval(self.checkIntervalId_int);
			
			self.screenToTest = null;
			
			screenToTest = null;
			
			self.init = null;
			self.start = null;
			self.stop = null;
			self.addMouseOrTouchCheck = null;
			self.removeMouseOrTouchCheck = null;
			self.onMouseOrTouchUpdate = null;
			self.update = null;
			self.reset = null;
			self.destroy = null;
			
			prototype.destroy();
			prototype = null;
			self = null;
			FWDHider.prototype = null;
		};
		
		self.init();
     };
     
	 FWDHider.HIDE = "hide";
	 FWDHider.SHOW = "show";
	 
	 FWDHider.setPrototype = function(){
		 FWDHider.prototype = new FWDEventDispatcher();
	 };
	 

	 window.FWDHider = FWDHider;
}(window));/* Image manager */
(function (){
	
	var FWDImageManager = function(data, parent){
		
		var self = this;
		var prototype = FWDImageManager.prototype;
		
		this.originalImage_img;
		this.toolTipLeft_img = data.toolTipLeft_img;
		this.toolTipPointer_img = data.toolTipPointer_img;
		
		this.markers_ar = [];
		this.toolTipWindows_ar = [];
		this.toolTipDataWindows_ar = data.toolTipWindows_ar;
		this.markersList_ar = data.markersList_ar;
		this.markersPosition_ar = data.markersPosition_ar;
		this.largeImagesPaths_ar = data.largeImagesPaths_ar;
		
		this.curMarker_do;
		this.markersToolTip_do;
		this.markersToolTipWindow_do;
		this.hider;
		this.dumy_sdo;
		this.slicesHolder_do;
		this.smallImage_sdo;
		this.markersPositionInfo_sdo;
		
		this.handMovePath_str =  data.handMovePath_str;
		this.handGrabPath_str =  data.handGrabPath_str;
		this.backgroundColor_str = parent.backgroundColor_str;
		this.draggingMode_str = data.startDraggingMode_str;
		this.controllerPosition_str = data.controllerPosition_str;
		this.buttonToolTipLeft_str = data.buttonToolTipLeft_str;
		this.buttonToolTipMiddle_str = data.buttonToolTipMiddle_str;
		this.buttonToolTipRight_str = data.buttonToolTipRight_str;
		this.buttonToolTipFontColor_str = data.buttonToolTipFontColor_str;
		this.buttonToolTipBottomPointer_str = data.buttonToolTipBottomPointer_str;
		this.buttonToolTipTopPointer_str = data.buttonToolTipTopPointer_str;
		this.lastMarkerId_str;
		
		this.curId = 0;
		this.prevId = 1000;
		this.curLargeImageId = 1000;
		this.totalImages = data.totalImages;
		this.totalToolTipsWindows = self.toolTipDataWindows_ar.length;
		this.stageWidth;
		this.stageHeight;
		this.smallestPossibleScale;
		this.currentScale = undefined;
		this.sliceCurrentScale = 1;
		this.prevScale = 0;
		this.percentZoomed = 0.1;
		this.imageWidth;
		this.imageHeight;
		this.doubleClickZoomFactor = data.doubleClickZoomFactor;
		this.zoomFactor = data.zoomFactor;
		this.startZoomFactor = data.startZoomFactor;
		this.zoomSpeed = data.zoomSpeed;
		this.finalX = 0;
		this.finalY = 0;
		this.xPositionOnPress;
		this.yPositionOnPress;
		this.lastPresedX = 0;
		this.lastPresedY = 0;
		this.lastPresedX2 = 0;
		this.lastPresedY2 = 0;
		this.mouseX = 0;
		this.mouseY = 0;
		this.controllerHeight = data.controllerHeight;
		this.controllerOffsetY = data.controllerOffsetY;
		this.rotationSpeed = Math.abs(-1.1 + data.dragRotationSpeed);
		this.startScaleForMobileZoom;
		this.totalMarkers;
		this.globalX;
		this.globalY;
		this.markerToolTipOffsetY = data.markerToolTipOffsetY;
		this.toolTipWindowMaxWidth = data.toolTipWindowMaxWidth;
		this.sliceWidth = data.sliceWidth;
		this.sliceHeight = data.sliceHeight;
		this.cols = data.cols;
		this.rows = data.rows;
		this.panSpeed = data.panSpeed;
		this.panDirectionSign = data.inversePanDirection_bl ? -1 : 1;
		
		this.tweenDone_to;
		this.removeSmallSDOId_to;
		this.setAlphaWithDelayId_to;
		this.hideToolTipWindowId_to;
		this.addHideToolTipWindowTestWithDelayId_to;
		this.showToolTipWindoId_to;
		this.showMarkerToolTipId_to;
		this.setupMarkersAndToolTipWindowsId_to;
		this.secondTapId_to;
		this.enableMarkersId_to;
		this.showMarkersFirstTimeId_to;
		
		this.showMarkersFirstTimeDone_bl = false;
		this.allowToDragHoriz_bl = false;
		this.allowToDragVert_bl = false;
		this.isTweening_bl = false;
		this.isDragging_bl = false;
		this.isScrollBarHandlerPressed_bl = false;
		this.isResizingFirstTime_bl = true;
		this.isControllerActive_bl = false;
		this.useEntireScreenFor3dObject_bl = data.useEntireScreenFor3dObject_bl;
		this.isMobile_bl = data.isMobile_bl;
		this.showNavigator_bl = data.showNavigator_bl;
		this.showMarkers_bl = data.showMarkers_bl;
		this.isNavigatorShowed_bl = false;
		this.addImageFirstTimeOnActivate_bl = true;
		this.showMarkersInfo_bl = data.showMarkersInfo_bl;
		this.updateScrollBarWithDelay_bl = true;
		this.areLeftAndRightButtonsDisabled_bl = false;
		this.areUpAndDownButtonsDisabled_bl = false;
		this.isMobile_bl = data.isMobile_bl;
		this.addDoubleClickSupport_bl = data.addDoubleClickSupport_bl;
		this.showLargeImageVersionOnZoom_bl = data.showLargeImageVersionOnZoom_bl;
		this.hasPointerEvent_bl = FWDUtils.hasPointerEvent;
		
		self.init = function(){
			if(self.controllerPosition_str == FWDController.POSITION_TOP && !self.useEntireScreenFor3dObject_bl) self.setY(self.controllerHeight);
			self.setupMainContiners();
			
			if(!self.showMarkersInfo_bl) self.dumy_sdo.screen.style.cursor = 'url(' + self.handMovePath_str + '), default';
			self.originalImage_img = data.originalImage_img;
			self.imageWidth = data.imageWidth;
			self.imageHeight = data.imageHeight;
	
			self.addImage();
			self.addPannSupport();
			self.addPinchSupport();
			self.addMouseWheelSupport();
			if(self.addDoubleClickSupport_bl) self.addDoubleClickSupport();
			
			self.setupMarkersAndToolTipWindowsId_to = setTimeout(self.setupMarkersAndToolTipWindows, 2000);
			
			if(self.showMarkersInfo_bl) self.setupMarkersInfo();
			self.resizeAndPosition(true);
			self.showMarkersFirstTime();
		};
		
		//###########################################//
		/* Setup markers */
		//###########################################//
		this.setupMarkersAndToolTipWindows = function(){
			
			if(self.showMarkers_bl){
				self.setupMarkers();
				if(!self.isMobile_bl || self.hasPointerEvent_bl) self.setupMarkersToolTip();
				self.setupMarkersToolTipWindows();
				self.positionMarkers(false);
			}
			
			if(self.showNavigator_bl){
				self.hideOrShowNavigator();
				self.updateNavigator(false);
			}
			
			if(self.stageHeight < self.finalHeight){
				self.dispatchEvent(FWDImageManager.ENABLE_UP_AND_DOWN_BUTTONS);
				self.areUpAndDownButtonsDisabled_bl = true;
			}
		
			if(self.stageWidth < self.finalWidth){
				self.dispatchEvent(FWDImageManager.ENABLE_LEFT_AND_RIGHT_BUTTONS);
				self.areLeftAndRightButtonsDisabled_bl = true;
			}
		};
		
		//##########################################//
		//Setup hider.
		//##########################################//
		self.setupHider = function(hider){
			self.hider = hider;
		};
		
		//################################################//
		//add small and large image.
		//################################################//
		self.addImage = function(){
			if(FWDUtils.isChrome && !self.isMobile_bl){
				self.smallImage_sdo = new FWDTransformDisplayObject("div");
				self.originalImage_img.style.position = "relative";
				self.originalImage_img.style.display = "block";
				self.originalImage_img.style.left = "0px";
				self.originalImage_img.style.top = "0px";
				self.originalImage_img.style.margin = "0px";
				self.originalImage_img.style.padding = "0px";
				self.originalImage_img.style.maxWidth = "none";
				self.originalImage_img.style.maxHeight = "none";
				self.originalImage_img.style.border = "none";
				self.originalImage_img.style.lineHeight = "1";
				self.originalImage_img.backgroundColor = "transparent";
				self.originalImage_img.backfaceVisibility = "hidden";
				self.originalImage_img.webkitBackfaceVisibility = "hidden";
				self.originalImage_img.MozBackfaceVisibility = "hidden";	
				self.smallImage_sdo.screen.appendChild(self.originalImage_img);
			}else{
				self.smallImage_sdo = new FWDTransformDisplayObject("img");
				self.smallImage_sdo.setScreen(self.originalImage_img);
			}
		
			self.smallImage_sdo.setTransformOrigin(0,0);
		
			self.addImageFirstTimeOnActivate_bl = false;
			
			self.addChild(self.smallImage_sdo);
			self.addChild(self.dumy_sdo);
		};
		
		//###########################################//
		//Setup main containers
		//###########################################//
		self.setupMainContiners = function(){
		
			self.setBkColor(self.backgroundColor_str);
		
			self.smallImage_sdo = new FWDTransformDisplayObject("img");
			
			self.dumy_sdo = new FWDSimpleDisplayObject("div");
			if(FWDUtils.isIE){
				self.dumy_sdo.setBkColor("#00FF00");
				self.dumy_sdo.setAlpha(.01);
			}
			
			if(self.controllerPosition_str == FWDController.POSITION_TOP && !self.useEntireScreenFor3dObject_bl) self.dumy_sdo.setY(- self.controllerHeight);
		};
		
		//###########################################//
		// Resize and position self...
		//###########################################//
		self.resizeAndPosition = function(centerImage_bl, overwrite){
			if(self.stageWidth == parent.stageWidth && self.stageHeight == parent.stageHeight - self.controllerHeight && !overwrite) return;
			
			self.stageWidth = parent.stageWidth;
			
			if(self.useEntireScreenFor3dObject_bl){
				self.stageHeight = parent.stageHeight;
			}else{
				self.stageHeight = parent.stageHeight - self.controllerHeight;
			}
			
			self.setWidth(self.stageWidth);
			self.setHeight(self.stageHeight);
			var scX = self.stageWidth/self.imageWidth;
			var scY = self.stageHeight/self.imageHeight;
			var totalScale;
			
			if(scX < scY){
				totalScale = scX;
			}else{
				totalScale = scY;
			}
			
			if(totalScale >= self.zoomFactor) totalScale = self.zoomFactor;
			
			if(totalScale >= self.zoomFactor){
				self.currentScale = self.prevScale = self.smallestPossibleScale = self.zoomFactor;
			}else{
				self.smallestPossibleScale = totalScale;
				if(self.currentScale === undefined) self.currentScale =  self.prevScale = totalScale;
			}
			
			if(self.isResizingFirstTime_bl){
				if(!isNaN(self.startZoomFactor)){
					if(self.startZoomFactor > self.currentScale){
						self.currentScale = self.prevScale = self.startZoomFactor;
					}
				}
				self.isResizingFirstTime_bl = false;
			}
			
			self.finalWidth = Math.round(self.currentScale * self.imageWidth);
			self.finalHeight = Math.round(self.currentScale * self.imageHeight);
			
			if(scX <= scY && totalScale != self.zoomFactor){
				if(self.finalWidth < self.stageWidth){
					self.currentScale = self.stageWidth/self.imageWidth;
					self.smallestPossibleScale = self.currentScale;
				}
			}else if(scX >= scY && totalScale != self.zoomFactor){
				if(self.finalHeight < self.stageHeight){
					self.currentScale = self.stageHeight/self.imageHeight;
					self.smallestPossibleScale = self.currentScale;
				}
			}
			
			self.finalWidth = Math.round(self.currentScale * self.imageWidth);
			self.finalHeight = Math.round(self.currentScale * self.imageHeight);	
			
			self.dumy_sdo.setWidth(self.stageWidth);
			if(self.useEntireScreenFor3dObject_bl){
				self.dumy_sdo.setHeight(self.stageHeight);
			}else{
				self.dumy_sdo.setHeight(self.stageHeight + self.controllerHeight);
			}
			
			self.checkXAndYBouds();
			if(centerImage_bl) self.centerImage();
			self.resizeAndPositionImage();
			
			if(self.showNavigator_bl){
				self.hideOrShowNavigator();
				self.updateNavigator(false);
			}
			
			self.positionMarkers(false);
			
			setTimeout(function(){
				if(self == null) return;
					self.dispatchScrollBarUpdate(false);
				}
			, 50);
			
			self.disableOrEnableMoveButtons();
			self.dispatchScrollBarUpdate(false);
		};
		
		//###############################################//
		//resize and position small image and large image.
		//###############################################//
		self.resizeAndPositionImage = function(animate){
			self.isTweening_bl = true;
			TweenMax.killTweensOf(self.smallImage_sdo);
			
			clearTimeout(self.tweenDone_to);
			if(animate){	
				if(self.smallImage_sdo.hasTransform2d_bl){
					TweenMax.to(self.smallImage_sdo, .3, {x:self.finalX, y:self.finalY, scale:self.currentScale});
				}else{
					TweenMax.to(self.smallImage_sdo, .3, {w:self.finalWidth, h:self.finalHeight, x:self.finalX, y:self.finalY});
				}
				self.tweenDone_to = setTimeout(self.tweenDoneHandler, 300);
			}else{
				if(self.smallImage_sdo.hasTransform2d_bl){
					if(self.smallImage_sdo.hasTransform3d_bl){
						self.smallImage_sdo.setPositionAndScale(self.finalX, self.finalY, self.currentScale);	
					}else{
						self.smallImage_sdo.setScale(self.currentScale);
						self.smallImage_sdo.setX(self.finalX);
						self.smallImage_sdo.setY(self.finalY);
					}
				}else{
					self.smallImage_sdo.setX(self.finalX);
					self.smallImage_sdo.setY(self.finalY);
					self.smallImage_sdo.setWidth(self.finalWidth);
					self.smallImage_sdo.setHeight(self.finalHeight);
				}
				
				self.isTweening_bl = false;
				self.dispatchEvent(FWDImageManager.IMAGE_ZOOM_COMPLETE);
			}

		};
		
		self.tweenDoneHandler = function(){
			self.isTweening_bl = false;
			self.dispatchEvent(FWDImageManager.IMAGE_ZOOM_COMPLETE);
		};
		
		//###############################################//
		/* check x and y position */
		//##############################################//
		self.checkXAndYBouds = function(){
		
			if(self.finalWidth <= self.stageWidth){
				self.finalX = Math.round((self.stageWidth - self.finalWidth)/2);
			}else if(self.finalWidth > self.stageWidth + 1){
				self.allowToDragHoriz_bl = true;	
				if(self.finalX > 0){
					self.finalX = 0;
				}else if(self.finalX <= self.stageWidth - self.finalWidth + 1){
					self.finalX = self.stageWidth - self.finalWidth + 1;
				}
			}else{
				self.allowToDragHoriz_bl = false;
			}
			
			if(self.finalHeight <= self.stageHeight ){
				self.finalY = Math.round((self.stageHeight - self.finalHeight)/2);
			}else if(self.finalHeight > self.stageHeight + 1){
				self.allowToDragVert_bl = true;
				if(self.finalY > 0){
					self.finalY = 0;
				}else if(self.finalY <= self.stageHeight - self.finalHeight){
					self.finalY = self.stageHeight - self.finalHeight;
				}
			}else{
				self.allowToDragVert_bl = false;
			}
		};
		
		//################################################//
		/* zoom image */
		//################################################//
		self.zoomImage = function(setPositionAndSize){
			
			if(setPositionAndSize){
				self.finalWidth = Math.round(self.currentScale * self.imageWidth);
				self.finalHeight =  Math.round(self.currentScale * self.imageHeight);
				self.finalX -= Math.round((self.mouseX - self.finalX) * (self.currentScale - self.prevScale) / self.prevScale); 
				self.finalY -= Math.round((self.mouseY - self.finalY) * (self.currentScale - self.prevScale) / self.prevScale); 	
			}
			
			
			if(!self.isControllerActive_bl) self.dispatchScrollBarUpdate(true);
			self.checkXAndYBouds();
			
			if(self.showNavigator_bl){
				self.hideOrShowNavigator();
				self.updateNavigator(true);
			}
			self.positionMarkers(true);
			self.disableOrEnableMoveButtons();
			self.resizeAndPositionImage(true);
			
			self.prevScale = self.currentScale;
		};
		
		
		//###############################################//
		/* setup pinch */
		//###############################################//
		self.addPinchSupport = function(){
			if(self.screen.addEventListener){
				self.dumy_sdo.screen.addEventListener('gesturestart', this.gestureStartHandler);
				self.dumy_sdo.screen.addEventListener('gesturechange', this.gestureChangeHandler);
			}
		};
		
		self.gestureStartHandler = function(e){
			self.startScaleForMobileZoom = 1;
		};
		
		self.gestureChangeHandler = function(e){	
			e.preventDefault();	
			
			if(self.isControllerActive_bl) return;
			var toAdd;
			
			if(e.scale > 1){
				toAdd = e.scale - self.startScaleForMobileZoom;
			}else{
				toAdd = - (self.startScaleForMobileZoom - e.scale);
			}
			
			self.startScaleForMobileZoom = 1;
			
			self.mouseX = Math.round(self.stageWidth/2);
			self.mouseY = Math.round(self.stageHeight/2);
			self.currentScale +=  toAdd;
			self.startScaleForMobileZoom = e.scale;
			
			if(parseFloat(self.currentScale.toFixed(5)) <= parseFloat(self.smallestPossibleScale.toFixed(5))){
				self.currentScale = self.smallestPossibleScale;
			}else if(self.currentScale > self.zoomFactor){
				 self.currentScale = self.zoomFactor;
			}
			
			self.zoomImage(true);
		};
		
		//###############################################//
		//Add touch pann support
		//###############################################//
		self.addPannSupport = function(){
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.dumy_sdo.screen.addEventListener("MSPointerDown", self.panStartHandler);
				}else{
					self.dumy_sdo.screen.addEventListener("touchstart", self.panStartHandler);
				}
			}else if(self.screen.addEventListener){
				self.dumy_sdo.screen.addEventListener("mousedown", self.panStartHandler, true);
			}else if(self.screen.attachEvent){
				self.dumy_sdo.screen.attachEvent("onmousedown", self.panStartHandler);
			}
		};
		
		self.panStartHandler = function(e){
			
			if(self.isTweening_bl || self.isControllerActive_bl || self.isTweening_bl) return;
			if(e.preventDefault) e.preventDefault();
			if(self.finalWidth < self.stageWidth && self.finalHeight < self.stageHeight) return;
			if(!self.isMobile_bl || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				if(e.button <= 1) parent.disableAll();
				
			}
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);		
			
			self.isDragging_bl = true;
			self.xPositionOnPress = self.smallImage_sdo.getX();
			self.yPositionOnPress = self.smallImage_sdo.getY();
			self.lastPresedX = viewportMouseCoordinates.screenX;
			self.lastPresedY = viewportMouseCoordinates.screenY;
			self.hideToolTipWindow();
			
			self.dispatchEvent(FWDImageManager.PAN_START);
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.addEventListener("MSPointerMove", self.panMoveHandler);
					window.addEventListener("MSPointerUp", self.panEndHandler);
				}else{
					window.addEventListener("touchmove", self.panMoveHandler);
					window.addEventListener("touchend", self.panEndHandler);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener("mousemove", self.panMoveHandler);
					window.addEventListener("mouseup", self.panEndHandler);	
				}else if(document.attachEvent){
					document.attachEvent("onmousemove", self.panMoveHandler);
					document.attachEvent("onmouseup", self.panEndHandler);
				}
			}
		};
		
		self.panMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			if(e.touches && e.touches.length != 1 || self.isControllerActive_bl || self.isTweening_bl) return;
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);	
			
			if(self.finalWidth > self.stageWidth + 1){
				self.finalX = Math.round(self.xPositionOnPress + viewportMouseCoordinates.screenX - self.lastPresedX);
				if(self.finalX > 0){
					self.finalX = 0;
				}else if(self.finalX <= self.stageWidth - self.finalWidth + 1){
					self.finalX = self.stageWidth - self.finalWidth + 1;
				}
				
				self.smallImage_sdo.setX(self.finalX);
			}
			
			if(self.finalHeight > self.stageHeight + 1){
				self.finalY = Math.round(self.yPositionOnPress + viewportMouseCoordinates.screenY - self.lastPresedY);
				if(self.finalY > 0){
					self.finalY = 0;
				}else if(self.finalY <= self.stageHeight - self.finalHeight){
					self.finalY = self.stageHeight - self.finalHeight;
				}
				self.smallImage_sdo.setY(self.finalY);
			}
			
			if(self.showNavigator_bl){
				self.hideOrShowNavigator();
				self.updateNavigator(false);
			}
			
			self.positionMarkers(false);
		};
		
		self.panEndHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			self.isDragging_bl = false;
			if(!self.isMobile_bl || e.pointerType == e.MSPOINTER_TYPE_MOUSE) parent.enableAll();
		
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.removeEventListener("MSPointerMove", self.panMoveHandler);
					window.removeEventListener("MSPointerUp", self.panEndHandler);
				}else{
					window.removeEventListener("touchmove", self.panMoveHandler);
					window.removeEventListener("touchend", self.panEndHandler);
				}
			}else{
				
				if(window.removeEventListener){
					window.removeEventListener("mousemove", self.panMoveHandler);
					window.removeEventListener("mouseup", self.panEndHandler);	
				}else if(document.detachEvent){
					document.detachEvent("onmousemove", self.panMoveHandler);
					document.detachEvent("onmouseup", self.panEndHandler);
				}
			}
		};
		
	
		//###############################################//
		//Add mousewheel support.
		//###############################################//
		self.addMouseWheelSupport = function(){
			if(window.addEventListener){
				self.dumy_sdo.screen.addEventListener ("mousewheel", self.mouseWheelHandler);
				self.dumy_sdo.screen.addEventListener('DOMMouseScroll', self.mouseWheelHandler);
			}else if(document.attachEvent){
				
				self.dumy_sdo.screen.attachEvent("onmousewheel", self.mouseWheelHandler);
			}
		};
		
		self.mouseWheelHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			if(self.isDragging_bl || self.isControllerActive_bl) return;
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);
			if(self.hider) self.hider.reset();
			self.mouseX = viewportMouseCoordinates.screenX - self.getGlobalX();
			self.mouseY = viewportMouseCoordinates.screenY - self.getGlobalY();
			
		
			var dir = e.detail || e.wheelDelta;	
			if(e.wheelDelta) dir *= -1;
			if(dir > 0){
				if(self.currentScale == self.smallestPossibleScale) return;
				self.currentScale -= self.zoomSpeed;
				if(parseFloat(self.currentScale.toFixed(5)) <= parseFloat(self.smallestPossibleScale.toFixed(5))) self.currentScale = self.smallestPossibleScale;
			}else if(dir < 0){
				if(self.currentScale == self.zoomFactor) return;
				self.currentScale += self.zoomSpeed;
				if(self.currentScale > self.zoomFactor) self.currentScale = self.zoomFactor;
			}
			
			self.zoomImage(true);
			
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}
		};
		
		//########################################//
		/* add double click and tap support */
		//########################################//
		this.addDoubleClickSupport = function(){	
			
			if(self.isMobile_bl){
				self.dumy_sdo.screen.addEventListener("touchstart", self.onFirstDown);
			}else{
				self.dumy_sdo.screen.addEventListener("mousedown", self.onFirstDown);
			}
		};
		
		this.onFirstDown = function(e){
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);
			self.firstTapX = viewportMouseCoordinates.screenX;
			self.firstTapY = viewportMouseCoordinates.screenY;
			
			if(self.isMobile_bl){
				clearTimeout(self.secondTapId_to);
				self.secondTapId_to = setTimeout(self.doubleTapExpired, 200);
				self.dumy_sdo.screen.addEventListener("touchstart", self.onSecondDown);
				self.dumy_sdo.screen.removeEventListener("touchstart", self.onFirstDown);
			}else{
				clearTimeout(self.secondTapId_to);
				self.secondTapId_to = setTimeout(self.doubleTapExpired, 200);
				self.dumy_sdo.screen.addEventListener("mousedown", self.onSecondDown);
				self.dumy_sdo.screen.removeEventListener("mousedown", self.onFirstDown);
			}
		};
		
		this.doubleTapExpired = function(){
			clearTimeout(self.secondTapId_to);
			if(self.isMobile_bl){
				self.dumy_sdo.screen.removeEventListener("touchstart", self.onSecondDown);
				self.dumy_sdo.screen.addEventListener("touchstart", self.onFirstDown);
			}else{
				self.dumy_sdo.screen.removeEventListener("mousedown", self.onSecondDown);
				self.dumy_sdo.screen.addEventListener("mousedown", self.onFirstDown);
			}
		};
		
		this.onSecondDown = function(e){
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);
			var dx;
			var dy;
			
			if(e.touches && e.touches.length != 1) return;
			if(self.currentScale == self.zoomFactor 
			   || self.doubleClickZoomFactor  < self.currentScale) return;
			dx = Math.abs(viewportMouseCoordinates.screenX - self.firstTapX);   
			dy = Math.abs(viewportMouseCoordinates.screenY - self.firstTapY); 
		
			if(self.isMobile_bl && (dx > 10 || dy > 10)){
				return;
			}else if(!self.isMobile_bl && (dx > 2 || dy > 2)){
				return
			}
		
			if(self.isMobile_bl) self.smallImage_sdo.screen.removeEventListener("touchstart", self.onSecondDown);
				
			self.mouseX = viewportMouseCoordinates.screenX - self.getGlobalX();
			self.mouseY  = viewportMouseCoordinates.screenY - self.getGlobalY();
		
			self.currentScale = self.zoomFactor;
			self.zoomImage(true);
			self.mouseX = self.stageWidth/2;
			self.mouseY = self.stageHeight/2;
		};
		
		//###########################################//
		/* Setup markers */
		//###########################################//
		self.setupMarkers = function(){
			var marker;
			var objData;
			var id = 0;
		
			self.totalMarkers = self.markersList_ar.length;
			
			for(var i=0; i<self.totalMarkers; i++){
				objData = self.markersList_ar[i];
				
				FWDMarker.setPrototype();
				marker = new FWDMarker(objData.markerId, 
						objData.normalStatePath_str, 
						objData.selectedStatePath_str, 
						objData.type, 
						objData.regPoint, 
						objData.toolTipLabel, 
						i,
						objData.markerX,
						objData.markerY,
						objData.markerWidth, 
						objData.markerHeight,
						objData.showAfterScale,
						objData.hasContent_bl);
				marker.addListener(FWDMarker.MOUSE_OVER, self.markerOnMouseOverHandler);
				marker.addListener(FWDMarker.MOUSE_OUT, self.markerOnMouseOutHandler);
				marker.addListener(FWDMarker.MOUSE_DOWN, self.markerOnStartHandler);
				
				if(objData.type == "tooltip"){
					marker.innerHTML_str = objData.innerHTML;
				}else if(objData.type == "infowindow"){
					marker.innerHTML_str = objData.innerHTML;
				}else if(objData.type == "link"){
					marker.link_str = objData.link;
					marker.target_str = objData.target;
				}
				self.markers_ar.push(marker);
				self.addChild(marker);
			}
		};
		
		self.markerOnMouseOverHandler = function(e){
			var marker = e.target;
			
			if(marker.hasToolTip_bl){
				self.showMarkerToolTip(marker, marker.toolTipLabel_str);
			};
			
			if(marker.type_str == "tooltip"){
				if(!marker.hasHTMLContent_bl) return;
				if(self.curMarker_do && self.curMarker_do != marker) self.curMarker_do.setNormalState();
				self.lastMarkerId_str = marker.markerId;
				self.curMarker_do = marker;
				clearTimeout(self.hideToolTipWindowId_to);
				self.showToolTipWindow(marker);
			}
		};
		
		self.markerOnMouseOutHandler = function(e){
			
			var marker = e.target;
			if(marker.hasToolTip_bl){
				if(self.markersToolTip_do){
					if(self.contains(self.markersToolTip_do)) self.removeChild(self.markersToolTip_do);
					self.markersToolTip_do.hide();
				}
			};
			
			if(marker.type_str == "tooltip"){
				if(!marker.hasHTMLContent_bl){
					marker.setNormalState();
					return;
				}
				self.toolTipWindowAddEventsToSetGlobalXAndGlobalY();
				clearTimeout(self.hideToolTipWindowId_to);
				self.hideToolTipWindowId_to = setTimeout(self.hideToolTipWindowWithDelay, 300);
			}
		};
		
		self.markerOnStartHandler = function(e){
			var marker = e.target;
			if(marker.type_str == "infowindow"){
				self.dispatchEvent(FWDImageManager.SHOW_INFO, {text:marker.innerHTML_str});
			}else if(marker.type_str == "tooltip" && self.isMobile_bl){	
				if(!marker.hasHTMLContent_bl) return;	
				if(self.lastMarkerId_str != marker.markerId) self.hideToolTipWindow();
				self.lastMarkerId_str = marker.markerId;
				self.curMarker_do = marker;
				self.toolTipWindowAddEventsToSetGlobalXAndGlobalY();
				self.showToolTipWindow(marker);
			}
		};
	
		//show markers firs time
		this.showMarkersFirstTime = function(){
			self.showMarkersFirstTimeId_to = setTimeout(function(){
				self.showMarkersFirstTimeDone_bl = true;
				self.positionMarkers();
			}, 2100);
		};
		
		//position markers.
		self.positionMarkers = function(animate){
			var marker;
			
			for(var i=0; i< self.totalMarkers; i++){
				marker = self.markers_ar[i];
				
				marker.finalX = self.finalX + marker.offsetX + parseInt(marker.originalX * self.currentScale);
				marker.finalY = self.finalY + marker.offsetY + parseInt(marker.originalY * self.currentScale);
				
				if(marker.showAfterScale <= self.currentScale){
					if(self.showMarkersFirstTimeDone_bl) marker.show();	
				}else{
					marker.hide();
				}
			
				if(marker.isShowed_bl){
					if(animate){
						TweenMax.killTweensOf(marker);
						TweenMax.to(marker, .3, {x:marker.finalX, y:marker.finalY});
					}else{
						TweenMax.killTweensOf(marker);
						marker.setX(marker.finalX);
						marker.setY(marker.finalY);
						
					}
				}
			}
		};
		
		this.hideMarkers = function(){
			var marker;
			for(var i=0; i< self.totalMarkers; i++){
				marker = self.markers_ar[i];
				marker.isHiddenFinal_bl = true;
				marker.hide();
			}
		};
		
		this.showMarkers = function(){
			var marker;
			for(var i=0; i< self.totalMarkers; i++){
				marker = self.markers_ar[i];
				marker.isHiddenFinal_bl = false;
				if(marker.showAfterScale <= self.currentScale) marker.show();	
			}
		};
		
		//###########################################//
		/* Setup markers tooltip */
		//###########################################//
		self.setupMarkersToolTip = function(){
			FWDMarkerToolTip.setPrototype();
			self.markersToolTip_do = new FWDMarkerToolTip(
					self.toolTipLeft_img,
					self.toolTipPointer_img,
					self.buttonToolTipLeft_str,
					self.buttonToolTipMiddle_str,
					self.buttonToolTipRight_str,
					self.buttonToolTipFontColor_str,
					self.buttonToolTipTopPointer_str,
					self.buttonToolTipBottomPointer_str);
		};
		
		//###########################################//
		/* Setup markers tooltip window*/
		//###########################################//
		self.setupMarkersToolTipWindows = function(){
			var toolTipWindow_do;
			for(var i =0; i < self.totalToolTipsWindows; i++){
				FWDMarkerWindowToolTip.setPrototype();
				toolTipWindow_do = new FWDMarkerWindowToolTip(
						parent.main_do,
						self.toolTipPointer_img,
						self.toolTipDataWindows_ar[i].innerHTML,
						self.buttonToolTipTopPointer_str,
						self.buttonToolTipBottomPointer_str,
						self.toolTipDataWindows_ar[i].maxWidth);
				
				self.toolTipWindows_ar.push(toolTipWindow_do);
				parent.main_do.addChild(toolTipWindow_do);
			}
		};	
		
		//######################################################//
		/* show tool tip */
		//######################################################//
		self.showMarkerToolTip = function(marker, label){
			
			var finalX;
			var finalY;
			var globalX = self.getX();
			var pointerOffsetX = 0;
			var pointerPostion;
			
			clearTimeout(self.showMarkerToolTipId_to);
			self.addChild(self.markersToolTip_do);
			self.markersToolTip_do.setLabel(label);
			self.markersToolTip_do.show();
		
			self.showMarkerToolTipId_to = setTimeout(function(){
				
				finalX = parseInt(marker.finalX + (marker.width - self.markersToolTip_do.totalWidth)/2);
				finalY = marker.finalY - self.markersToolTip_do.totalHeight - self.markerToolTipOffsetY;
				
				if(finalY < 0 ||
						(self.controllerPosition_str == FWDController.POSITION_TOP && finalY < self.controllerHeight + self.controllerOffsetY)){
					finalY = marker.finalY + marker.height + self.markersToolTip_do.pointerHeight + self.markerToolTipOffsetY;
					self.markersToolTip_do.pointerUp_sdo.setVisible(true);
					self.markersToolTip_do.pointerDown_sdo.setVisible(false);
					pointerPostion = FWDMarkerToolTip.POINTER_UP;
				}else{
					self.markersToolTip_do.pointerUp_sdo.setVisible(false);
					self.markersToolTip_do.pointerDown_sdo.setVisible(true);
					pointerPostion = FWDMarkerToolTip.POINTER_DOWN;
				}
				
				if(finalX < 0){
					pointerOffsetX = finalX;
					finalX = 0;
				}else if(self.stageWidth - finalX - self.markersToolTip_do.totalWidth < 0){
					pointerOffsetX = -(self.stageWidth - finalX - self.markersToolTip_do.totalWidth);
					finalX = finalX + self.stageWidth - finalX - self.markersToolTip_do.totalWidth;
				}
			
				self.markersToolTip_do.setX(finalX);
				self.markersToolTip_do.setY(finalY);	
				self.markersToolTip_do.positionPointer(pointerOffsetX, pointerPostion);
			}, 51);
		};
		
			
		//######################################################//
		/* show tool tip window */
		//######################################################//
		self.showToolTipWindow = function(marker){
			
			var curId = marker.id;
			var finalX;
			var finalY;
			var globalX = self.getX();
			var pointerOffsetX = 0;
			var pointerPostion;
			
			if(self.markersToolTipWindow_do != self.toolTipWindows_ar[marker.id] && self.markersToolTipWindow_do)  self.markersToolTipWindow_do.hide();
				
			for(var i=0; i<marker.id; i++){
				objData = self.markersList_ar[i];
				if(objData.type != "tooltip") curId --;
			}
		
			self.markersToolTipWindow_do = self.toolTipWindows_ar[curId];
			
			clearTimeout(self.showToolTipWindoId_to);
			self.showToolTipWindoId_to = setTimeout(function(){
				finalX = parseInt(marker.finalX + (marker.width - self.markersToolTipWindow_do.totalWidth)/2);
				finalY = marker.finalY - self.markersToolTipWindow_do.totalHeight - self.markerToolTipOffsetY;
				
				if(finalY < 0 ){
					finalY = marker.finalY + marker.height + self.markersToolTipWindow_do.pointerHeight + self.markerToolTipOffsetY;
					self.markersToolTipWindow_do.pointerUp_sdo.setVisible(true);
					self.markersToolTipWindow_do.pointerDown_sdo.setVisible(false);
					pointerPostion = FWDMarkerWindowToolTip.POINTER_UP;
				}else{
					finalY = marker.finalY - self.markersToolTipWindow_do.totalHeight - self.markerToolTipOffsetY;
					self.markersToolTipWindow_do.pointerUp_sdo.setVisible(false);
					self.markersToolTipWindow_do.pointerDown_sdo.setVisible(true);
					pointerPostion = FWDMarkerWindowToolTip.POINTER_DOWN;
				}
			
				if(finalX < 0){
					pointerOffsetX = finalX;
					finalX = 0;
				}else if(self.stageWidth - finalX - self.markersToolTipWindow_do.totalWidth < 0){
					pointerOffsetX = -(self.stageWidth - finalX - self.markersToolTipWindow_do.totalWidth);
					finalX = finalX + self.stageWidth - finalX - self.markersToolTipWindow_do.totalWidth;
				}
				
				self.markersToolTipWindow_do.setX(finalX);
				self.markersToolTipWindow_do.setY(finalY);	
				self.markersToolTipWindow_do.positionPointer(pointerOffsetX, pointerPostion);
				self.markersToolTipWindow_do.show();
				
			}, 51);
		};
		
		//######################################################//
		/* hide tool tip window */
		//######################################################//
		self.toolTipWindowAddEventsToSetGlobalXAndGlobalY = function(){
			if(self.isMobile_bl){
				self.addHideToolTipWindowTestWithDelayId_to = setTimeout(function(){
					if(self.hasPointerEvent_bl){
						window.addEventListener("MSPointerDown", self.hideToolTipWindowTest);
						window.addEventListener("MSPointerMove", self.hideToolTipWindowTest);
					}else{
						window.addEventListener("touchstart", self.hideToolTipWindowTest);
					}
				}, 50);
			}else{
				if(window.addEventListener){
					window.addEventListener("mousemove", self.hideToolTipWindowTest);
				}else if(document.attachEvent){
					document.detachEvent("onmousemove", self.hideToolTipWindowTest);
					document.attachEvent("onmousemove", self.hideToolTipWindowTest);
				}
			}
		};
		
		self.hideToolTipWindowTest = function(e){
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);	
			self.globalX = viewportMouseCoordinates.screenX;
			self.globalY = viewportMouseCoordinates.screenY;
			if(e.touches || e.pointerType != e.MSPOINTER_TYPE_MOUSE) self.hideToolTipWindowWithDelay();
		};
		
		self.hideToolTipWindowWithDelay = function(addDelay){
			if(!FWDUtils.hitTest(self.markersToolTipWindow_do.text_sdo.screen, self.globalX, self.globalY)
			 && !FWDUtils.hitTest(self.markersToolTipWindow_do.pointerDown_sdo.screen, self.globalX, self.globalY)
			 && !FWDUtils.hitTest(self.markersToolTipWindow_do.pointerUp_sdo.screen, self.globalX, self.globalY)
			   && !FWDUtils.hitTest(self.curMarker_do.screen, self.globalX, self.globalY)){
				self.hideToolTipWindow();
				if(self.isMobile_bl){
					clearTimeout(self.addHideToolTipWindowTestWithDelayId_to);
					if(self.hasPointerEvent_bl){
						window.removeEventListener("MSPointerDown", self.hideToolTipWindowTest);
						window.removeEventListener("MSPointerMove", self.hideToolTipWindowTest);
					}else{
						window.removeEventListener("touchstart", self.hideToolTipWindowTest);
					}
				}else{
					if(window.removeEventListener){
						window.removeEventListener("mousemove", self.hideToolTipWindowTest);
					}else if(document.detachEvent){
						document.detachEvent("onmousemove", self.hideToolTipWindowTest);
					}
				}
			}else{
				self.hideToolTipWindowId_to = setTimeout(self.hideToolTipWindowWithDelay, 300);
			}
		};
		
		self.hideToolTipWindow = function(){
			if(!self.markersToolTipWindow_do) return;
			if(self.curMarker_do && !self.isMobile_bl) self.curMarker_do.setNormalState();
			clearTimeout(self.hideToolTipWindowId_to);
			self.markersToolTipWindow_do.hide();
			self.markersToolTipWindow_do.toolTipWindowId = "none";
		};
		
		
		//####################################//
		/* markers info */
		//####################################//
		self.setupMarkersInfo = function(){
			if(window.addEventListener){
				window.addEventListener("mousemove", self.showMarkersInfoPosition);
				window.addEventListener ("mousewheel", self.showMarkersInfoPosition);
				window.addEventListener('DOMMouseScroll', self.showMarkersInfoPosition);
			}else if(document.attachEvent){
				document.attachEvent("onmousemove", self.showMarkersInfoPosition);
				document.attachEvent("onmousewheel", self.showMarkersInfoPosition);
			}
		
			self.markersPositionInfo_sdo = new FWDSimpleDisplayObject("div");
			self.markersPositionInfo_sdo.setDisplay("inline-block");
			self.markersPositionInfo_sdo.getStyle().fontSmoothing = "antialiased";
			self.markersPositionInfo_sdo.getStyle().webkitFontSmoothing = "antialiased";
			self.markersPositionInfo_sdo.getStyle().textRendering = "optimizeLegibility";
			self.markersPositionInfo_sdo.getStyle().padding = "6px";
			self.markersPositionInfo_sdo.getStyle().fontFamily = "Arial";
			self.markersPositionInfo_sdo.getStyle().fontSize= "12px";
			self.markersPositionInfo_sdo.getStyle().color = "#000000";
			self.markersPositionInfo_sdo.setBkColor("#FFFFFF");
			self.addChild(self.markersPositionInfo_sdo);
		};
		
		self.showMarkersInfoPosition = function(e){
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);		
			var globalX = self.getGlobalX();
			var globalY = self.getGlobalY();
			var localX = viewportMouseCoordinates.screenX - globalX;
			var localY = viewportMouseCoordinates.screenY - globalY;
			var finalX = Math.round((localX - self.finalX) * (1/self.currentScale)) + 1;
			var finalY = Math.round((localY - self.finalY) * (1/self.currentScale)) + 1;
			var infoFinalX = localX + 10;
			var infoFinalY = localY + 10;
			
			self.markersPositionInfo_sdo.setInnerHTML(
					"<font color='#FF000'>Left</font>: " + finalX + 
					"<br><font color='#FF000'>Top</font>:" + finalY + 
					"<br><font color='#FF000'>Zoom factor</font>:" + parseFloat(self.currentScale).toFixed(2));
			var infoWidth = self.markersPositionInfo_sdo.getWidth();
			var infoHeight = self.markersPositionInfo_sdo.getHeight();
			
			if(infoFinalX + infoWidth > self.stageWidth){
				infoFinalX = infoFinalX - infoWidth - 10;
			}
			
			if(infoFinalY + infoHeight > self.stageHeight){
				infoFinalY = infoFinalY - infoHeight - 10;
			}
		
			self.markersPositionInfo_sdo.setX(infoFinalX);
			self.markersPositionInfo_sdo.setY(infoFinalY);
		};
		
		
		//##################################//
		//various methods.
		//##################################//
		self.setDraggingMode = function(draggingMode){
			self.draggingMode_str = draggingMode;
		};
		
		self.disableOrEnablePanOrTouch = function(bool){
			self.isControllerActive_bl = bool;
		};
		
		self.panWithButtons = function(dir){
			if(dir == "left"){
				self.finalX -= self.panSpeed * self.panDirectionSign;
			}else if(dir == "right"){
				self.finalX += self.panSpeed * self.panDirectionSign;
			}else if(dir == "down"){
				self.finalY += self.panSpeed * self.panDirectionSign;
			}else if(dir == "up"){
				self.finalY -= self.panSpeed * self.panDirectionSign;
			}
			self.checkXAndYBouds();
			self.resizeAndPositionImage();
			self.positionMarkers(false);
			self.updateNavigator();
		};
		
		self.zoomInOrOutWithScrollBar = function(percent){	
			self.currentScale = percent * (self.zoomFactor - self.smallestPossibleScale) + self.smallestPossibleScale;
			self.mouseX = self.stageWidth/2;
			self.mouseY = self.stageHeight/2;
			self.zoomImage(true);
		};
		
		self.dispatchScrollBarUpdate = function(animate){
			if(self.currentScale < self.zoomFactor){
				self.dispatchEvent(FWDImageManager.SCROLL_BAR_UPDATE, {percent:(self.currentScale - self.smallestPossibleScale)/(self.zoomFactor - self.smallestPossibleScale), animate:animate});
			}else{
				self.dispatchEvent(FWDImageManager.SCROLL_BAR_UPDATE, {percent:1, animate:animate});
			}
		};
		
		self.zoomInOrOutWithButtons = function(dir, withPause){
			self.mouseX = self.stageWidth/2;
			self.mouseY = self.stageHeight/2;
			
			if(dir > 0){
				//if(self.currentScale == self.zoomFactor) return;
				if(withPause){
					self.currentScale += self.zoomSpeed;
				}else{
					self.currentScale += self.zoomSpeed/15;
				}
				if(self.currentScale > self.zoomFactor) self.currentScale = self.zoomFactor;
			}else if(dir < 0){
				//if(self.finalWidth <= self.stageWidth) return;
				if(withPause){
					self.currentScale -= self.zoomSpeed;
				}else{
					self.currentScale -= self.zoomSpeed/15;
				}
				if(parseFloat(self.currentScale.toFixed(5)) <= parseFloat(self.smallestPossibleScale.toFixed(5))) self.currentScale = self.smallestPossibleScale;
			}
			self.dispatchScrollBarUpdate(true, true);
			
			self.zoomImage(true);
		};
		
		self.centerImage = function(){
			self.mouseX = self.stageWidth/2;
			self.mouseY = self.stageHeight/2;
			self.finalX =  Math.round((self.stageWidth - self.finalWidth)/2);
			self.finalY =  Math.round((self.stageHeight - self.finalHeight)/2);	
		};
		
		//############################################//
		/* navigator utils */
		//############################################//
		self.updateNavigator = function(animate){
			if(!self.isNavigatorShowed_bl) return;
			
			self.dispatchEvent(FWDImageManager.UPDATE_NAVIGATOR, {
				percentX:Math.abs(self.finalX/(self.finalWidth - self.stageWidth)),
				percentY:Math.abs(self.finalY/(self.finalHeight - self.stageHeight)),
				percentWidth:self.stageWidth/self.finalWidth,
				percentHeight:self.stageHeight/self.finalHeight,
				animate:animate
			});
		};
		
		self.hideOrShowNavigator = function(){
			if(self.stageWidth < self.finalWidth || self.stageHeight < self.finalHeight){
				self.isNavigatorShowed_bl = true;
				self.dispatchEvent(FWDImageManager.SHOW_NAVIGATOR);
			}else{
				self.isNavigatorShowed_bl = false;
				self.dispatchEvent(FWDImageManager.HIDE_NAVIGATOR);
			}
		};
		
		self.updateOnNavigatorPan = function(percentX, percentY){
			
			self.finalX = parseInt(percentX * (self.stageWidth - self.finalWidth));
			self.finalY = parseInt(percentY * (self.stageHeight - self.finalHeight));
			
			self.positionMarkers(true);
			self.resizeAndPositionImage(true);
		};
		
		self.disableOrEnableMoveButtons = function(){
			if(self.stageHeight < self.finalHeight){
				if(!self.areUpAndDownButtonsDisabled_bl ){
					self.dispatchEvent(FWDImageManager.ENABLE_UP_AND_DOWN_BUTTONS);
					self.areUpAndDownButtonsDisabled_bl = true;
				}
			}else{
				if(self.areUpAndDownButtonsDisabled_bl){
					self.dispatchEvent(FWDImageManager.DISABLE_UP_AND_DOWN_BUTTONS);
					self.areUpAndDownButtonsDisabled_bl = false;
				}
			}
		
			if(self.stageWidth < self.finalWidth){
				if(!self.areLeftAndRightButtonsDisabled_bl){
					self.dispatchEvent(FWDImageManager.ENABLE_LEFT_AND_RIGHT_BUTTONS);
					self.areLeftAndRightButtonsDisabled_bl = true;
				}
			}else{
				if(self.areLeftAndRightButtonsDisabled_bl){
					self.dispatchEvent(FWDImageManager.DISABLE_LEFT_AND_RIGHT_BUTTONS);
					self.areLeftAndRightButtonsDisabled_bl = false;
				}
			}	
		};
		
	
		//#################################//
		//Clean main events.
		//#################################//
		self.cleanMainEvents = function(){
			
			if(self.isMobile_bl){
				self.dumy_sdo.screen.removeEventListener("touchstart", self.panStartHandler);
				self.dumy_sdo.screen.removeEventListener("MSPointerDown", self.panStartHandler);
				window.removeEventListener("touchmove", self.panMoveHandler);
				window.removeEventListener("touchend", self.panEndHandler);
				window.removeEventListener("MSPointerMove", self.panMoveHandler);
				window.removeEventListener("MSPointerUp", self.panEndHandler);
				
				window.removeEventListener("touchstart", self.hideToolTipWindowTest);
				window.removeEventListener("MSPointerDown", self.hideToolTipWindowTest);
				window.removeEventListener("MSPointerMove", self.hideToolTipWindowTest);
				
				self.dumy_sdo.screen.removeEventListener('gesturestart', self.gestureStartHandler);
				self.dumy_sdo.screen.removeEventListener('gesturechange', self.gestureChangeHandler);
				
				self.dumy_sdo.screen.removeEventListener("touchstart", self.onSecondDown);
				self.dumy_sdo.screen.removeEventListener("touchstart", self.onFirstDown);
			}else{
				if(window.removeEventListener){
					self.dumy_sdo.screen.removeEventListener("mousedown", self.panStartHandler);
					window.removeEventListener("mousemove", self.panMoveHandler);
					window.removeEventListener("mouseup", self.panEndHandler);	
					
					self.dumy_sdo.screen.removeEventListener ("mousewheel", self.mouseWheelHandler);
					self.dumy_sdo.screen.removeEventListener('DOMMouseScroll', self.mouseWheelHandler);
					
					window.removeEventListener("mousemove", self.hideToolTipWindowTest);
					
					window.removeEventListener("mousemove", self.showMarkersInfoPosition);
					window.removeEventListener ("mousewheel", self.showMarkersInfoPosition);
					window.removeEventListener('DOMMouseScroll', self.showMarkersInfoPosition);
				
					self.dumy_sdo.screen.removeEventListener("mousedown", self.onSecondDown);
					self.dumy_sdo.screen.removeEventListener("mousedown", self.onFirstDown);
				}else if(document.detachEvent){
					document.detachEvent("onmousemove", self.panMoveHandler);
					document.detachEvent("onmouseup", self.panEndHandler);
					self.dumy_sdo.screen.detachEvent("onmousedown", self.panStartHandler);
					
					self.dumy_sdo.screen.detachEvent("onmousewheel", self.mouseWheelHandler);
					
					document.detachEvent("onmousemove", self.hideToolTipWindowTest);
					
					document.detachEvent("onmousemove", self.showMarkersInfoPosition);
					document.detachEvent("onmousewheel", self.showMarkersInfoPosition);
				}
			}
			
			clearTimeout(self.tweenDone_to);
			clearTimeout(self.removeSmallSDOId_to);
			clearTimeout(self.setAlphaWithDelayId_to);
			clearTimeout(self.hideToolTipWindowId_to);
			clearTimeout(self.addHideToolTipWindowTestWithDelayId_to);
			clearTimeout(self.showToolTipWindoId_to);
			clearTimeout(self.showMarkerToolTipId_to);
			clearTimeout(self.setupMarkersAndToolTipWindowsId_to);
			clearTimeout(self.secondTapId_to);
			clearTimeout(self.enableMarkersId_to);
			clearTimeout(self.showMarkersFirstTimeId_to);
		};
		
		//#################################//
		/* destroy */
		//################################//
		self.destroy = function(){
			self.cleanMainEvents();
		
			if(self.smallImage_sdo){
				TweenMax.killTweensOf(self.smallImage_sdo);
				self.smallImage_sdo.destroy();
			}
			
			if(self.showMarkers_bl){
				var marker;
				var toolTipWindow;
				for(var i=0; i<self.totalMarkers; i++){
					marker = self.markers_ar[i];
					TweenMax.killTweensOf(marker);
					marker.destroy();
				}
				if(self.markersToolTip_do) self.markersToolTip_do.destroy();
				
				for(var i =0; i < self.totalToolTipsWindows; i++){
					toolTipWindow = self.toolTipWindows_ar[i];
					if(toolTipWindow) toolTipWindow.destroy();
				}
			}
			
			self.dumy_sdo.screen.style.cursor = "default";
			self.dumy_sdo.destroy();
			
			if(self.markersPositionInfo_sdo){
				self.markersPositionInfo_sdo.setInnerHTML("");
				self.markersPositionInfo_sdo.destroy();
			}
			
			data = null;
			parent = null;
			
			self.toolTipDataWindows_ar = null;
			self.markersList_ar = null;
			self.markersPosition_ar = null;
			self.largeImagesPaths_ar = null;
			
			self.hider = null;
			self.curMarker_do = null;
			self.dumy_sdo = null;
			self.smallImage_sdo = null;
			self.markersPositionInfo_sdo = null;
			
			self.handMovePath_str = null;
			self.handGrabPath_str = null;
			self.backgroundColor_str = null;
			self.draggingMode_str = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDImageManager.prototype = null;
		};
		
		self.init();
	};
	
	/* set prototype */
	FWDImageManager.setPrototype =  function(){
		FWDImageManager.prototype = new FWDDisplayObject("div");
	};
	
	FWDImageManager.LARGE_IMAGE_LOAD_ERROR = "largeImageLoadError";
	FWDImageManager.IMAGE_ZOOM_COMPLETE = "zoomComplete";
	FWDImageManager.SCROLL_BAR_UPDATE = "scrollBarUpdate";
	FWDImageManager.PAN_START = "panStart";
	FWDImageManager.PAN = "pan";
	FWDImageManager.UPDATE_NAVIGATOR = "updateNavigator";
	FWDImageManager.SHOW_NAVIGATOR = "showNavigator";
	FWDImageManager.HIDE_NAVIGATOR = "hideNavigator";
	FWDImageManager.SHOW_INFO = "showInfo";
	FWDImageManager.DISABLE_LEFT_AND_RIGHT_BUTTONS = "disableLeftAndRightButtons";
	FWDImageManager.ENABLE_LEFT_AND_RIGHT_BUTTONS = "enableLeftAndRightButtons";
	FWDImageManager.DISABLE_UP_AND_DOWN_BUTTONS = "disableUpAndDownButtons";
	FWDImageManager.ENABLE_UP_AND_DOWN_BUTTONS = "enableUpAndDownButtons";
	

	FWDImageManager.prototype = null;
	window.FWDImageManager = FWDImageManager;
	
}(window));/* Info screen */
(function (window){
	
	var FWDInfo = function(){
		
		var self = this;
		var prototype = FWDInfo.prototype;
		
		/* init */
		this.init = function(){
			this.setWidth(500);
			this.setBkColor("#FF0000");
			this.getStyle().color = "#000000";
			this.getStyle().padding = "10px";
		};
		
		this.showText = function(txt){
			this.setInnerHTML(txt);
		};
		
		/* destroy */
		this.destroy = function(){
	
			this.init = null;
			this.showText = null;
			this.destroy = null;

			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			FWDInfo.prototype = null;
		};
		
		this.init();
	};
		
	/* set prototype */
	FWDInfo.setPrototype = function(){
		FWDInfo.prototype = new FWDDisplayObject("div", "relative");
	};
	
	FWDInfo.prototype = null;
	window.FWDInfo = FWDInfo;
}(window));(function (window) {

        // This library re-implements setTimeout, setInterval, clearTimeout, clearInterval for iOS6.
        // iOS6 suffers from a bug that kills timers that are created while a page is scrolling.
        // This library fixes that problem by recreating timers after scrolling finishes (with interval correction).
		// This code is free to use by anyone (MIT, blabla).
		// Author: rkorving@wizcorp.jp
		
		var platform = navigator.platform;
		var isIpadOrIphone = false;
		if(platform == 'iPad' ||  platform == 'iPhone') isIpadOrIphone = true;
		if(!isIpadOrIphone) return;
		
		var userAgent = navigator.userAgent;
		var isIosVersion6 = false;
		if(userAgent.indexOf("6") != -1) isIosVersion6 = true;
		if(!isIosVersion6) return;
		
	
        var timeouts = {};
        var intervals = {};
        var orgSetTimeout = window.setTimeout;
        var orgSetInterval = window.setInterval;
        var orgClearTimeout = window.clearTimeout;
        var orgClearInterval = window.clearInterval;


        function createTimer(set, map, args) {
                var id, cb = args[0], repeat = (set === orgSetInterval);

                function callback() {
                        if (cb) {
                                cb.apply(window, arguments);

                                if (!repeat) {
                                        delete map[id];
                                        cb = null;
                                }
                        }
                }

                args[0] = callback;

                id = set.apply(window, args);

                map[id] = { args: args, created: Date.now(), cb: cb, id: id };

                return id;
        }


        function resetTimer(set, clear, map, virtualId, correctInterval) {
                var timer = map[virtualId];

                if (!timer) {
                        return;
                }

                var repeat = (set === orgSetInterval);

                // cleanup

                clear(timer.id);

                // reduce the interval (arg 1 in the args array)

                if (!repeat) {
                        var interval = timer.args[1];

                        var reduction = Date.now() - timer.created;
                        if (reduction < 0) {
                                reduction = 0;
                        }

                        interval -= reduction;
                        if (interval < 0) {
                                interval = 0;
                        }

                        timer.args[1] = interval;
                }

                // recreate

                function callback() {
                        if (timer.cb) {
                                timer.cb.apply(window, arguments);
                                if (!repeat) {
                                        delete map[virtualId];
                                        timer.cb = null;
                                }
                        }
                }

                timer.args[0] = callback;
                timer.created = Date.now();
                timer.id = set.apply(window, timer.args);
        }


        window.setTimeout = function () {
                return createTimer(orgSetTimeout, timeouts, arguments);
        };


        window.setInterval = function () {
                return createTimer(orgSetInterval, intervals, arguments);
        };

        window.clearTimeout = function (id) {
                var timer = timeouts[id];

                if (timer) {
                        delete timeouts[id];
                        orgClearTimeout(timer.id);
                }
        };

        window.clearInterval = function (id) {
                var timer = intervals[id];

                if (timer) {
                        delete intervals[id];
                        orgClearInterval(timer.id);
                }
        };

        window.addEventListener('scroll', function () {
                // recreate the timers using adjusted intervals
                // we cannot know how long the scroll-freeze lasted, so we cannot take that into account
                var virtualId;
             
                for (virtualId in timeouts) {
                        resetTimer(orgSetTimeout, orgClearTimeout, timeouts, virtualId);
                }

                for (virtualId in intervals) {
                        resetTimer(orgSetInterval, orgClearInterval, intervals, virtualId);
                }
        });

}(window));/* FWDLightBox */
(function (window){
	
	var FWDLightBox = function(
			parent,
			mainBackgroundColor_str,
			holderBackgroundColor_str,
			lightBoxBackgroundOpacity,
			lightBoxWidth,
			lightBoxHeight
		){
		
		var self  = this;
		var prototype = FWDLightBox.prototype;

		this.mainLightBox_do = null;
		this.lightBoxBackground_sdo = null;
		this.lightBoxGridHolder_do = null;
		this.closeButton_do = null;
		
		this.mainBackgroundColor_str = mainBackgroundColor_str;
		this.holderBackgroundColor_str = holderBackgroundColor_str;
		
		this.lightBoxBackgroundOpacity = lightBoxBackgroundOpacity;
		this.lightBoxWidth = lightBoxWidth;
		this.lightBoxHeight = lightBoxHeight;
		
		this.setupButtonWithDelayId_to;
		
		this.isMobile_bl = FWDUtils.isMobile;
		this.hasPointerEvent_bl = FWDUtils.hasPointerEvent;
		this.closeButtonIsTweening_bl = true;
	
		this.init = function(){
			self.setupMainContainers();
		};
		
		//#############################################//
		/* setup main containers */
		//#############################################//
		this.setupMainContainers = function(){
			var viewportSize = FWDUtils.getViewportSize();
			var scrollOffsets = FWDUtils.getScrollOffsets();
			
			if(self.isMobile_bl && self.hasPointerEvent_bl) self.getStyle().msTouchAction = "none";
			
			self.setWidth(viewportSize.w);
			self.setHeight(viewportSize.h);
			self.setX(scrollOffsets.x);
			self.setY(scrollOffsets.y);
			
			self.lightBoxBackground_sdo = new FWDSimpleDisplayObject("div"); 
			self.lightBoxBackground_sdo.setResizableSizeAfterParent();
			self.lightBoxBackground_sdo.setBkColor(self.mainBackgroundColor_str);
			self.addChild(self.lightBoxBackground_sdo);
			
			self.mainLightBox_do = new FWDDisplayObject("div");
			//self.mainLightBox_do.getStyle().boxShadow = "0px 0px 5px #999999";
			self.mainLightBox_do.setBkColor(self.holderBackgroundColor_str);
			parent.stageContainer = self.mainLightBox_do.screen;
			self.addChild(self.mainLightBox_do);
			
			if(navigator.userAgent.toLowerCase().indexOf("msie 7") == -1){
				document.documentElement.appendChild(self.screen);
			}else{
				document.getElementsByTagName("body")[0].appendChild(self.screen);
			}
			
			self.lightBoxBackground_sdo.setAlpha(0);
			TweenMax.to(self.lightBoxBackground_sdo, 1, {delay:.1, alpha:self.lightBoxBackgroundOpacity});
			
			self.mainLightBox_do.setWidth(0);
			self.mainLightBox_do.setHeight(0);
			
			if(self.lightBoxWidth > viewportSize.w){
				self.finalLightBoxWidth = viewportSize.w;
				self.finalLightBoxHeight = parseInt(self.lightBoxHeight * (viewportSize.w/self.lightBoxWidth));
			}else{
				self.finalLightBoxWidth = self.lightBoxWidth;
				self.finalLightBoxHeight = self.lightBoxHeight;
			}
			
			
			self.mainLightBox_do.setX(parseInt(viewportSize.w/2));
			self.mainLightBox_do.setY(parseInt(viewportSize.h/2));
		
			TweenMax.to(self.mainLightBox_do, .8, {
				w:self.finalLightBoxWidth, 
				h:self.finalLightBoxHeight,
				x:parseInt((viewportSize.w - self.finalLightBoxWidth)/2),
				y:parseInt((viewportSize.h - self.finalLightBoxHeight)/2),
				delay:.8,
				ease:Expo.easeInOut});
			
		};
		
		//#############################################//
		/* setup lightbox close button */
		//#############################################//
		this.setupCloseButton = function(n_img, s_img){
			
			var viewportSize = FWDUtils.getViewportSize();
			FWDSimpleButton.setPrototype();
			self.closeButton_do = new FWDSimpleButton(n_img, s_img);
			self.closeButton_do.addListener(FWDSimpleButton.MOUSE_DOWN, self.closeButtonOnStartHandler);
			self.closeButton_do.getStyle().zIndex = 99999999;
			self.addChild(self.closeButton_do);
			
			var closeButtonFinalX = parseInt((viewportSize.w + self.finalLightBoxWidth)/2 - self.closeButton_do.totalWidth/2);
			var closeButtonFinalY = parseInt((viewportSize.h - self.finalLightBoxHeight)/2 - self.closeButton_do.totalHeight/2);
		
			if(closeButtonFinalX + self.closeButton_do.totalWidth > viewportSize.w){
				closeButtonFinalX = viewportSize.w - self.closeButton_do.totalWidth;
			}
			
			if(closeButtonFinalY < 0){
				closeButtonFinalY = 0;
			}
		
			self.closeButton_do.setX(viewportSize.w);
			self.closeButton_do.setY(closeButtonFinalY);
			
			
			TweenMax.to(self.closeButton_do, .9, {x:closeButtonFinalX, onComplete:self.showCloseButtonComplete, ease:Expo.easeInOut});
			
			if(self.isMobile_bl){
				if(!self.hasPointerEvent_bl){
					window.addEventListener("touchstart", self.mouseDummyHandler);
					window.addEventListener("touchmove", self.mouseDummyHandler);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener ("mousewheel", self.mouseDummyHandler);
					window.addEventListener('DOMMouseScroll', self.mouseDummyHandler);
				}else if(document.attachEvent){
					document.attachEvent("onmousewheel", self.mouseDummyHandler);
				}
			}
		};
		
		this.showCloseButtonComplete = function(){
			self.closeButtonIsTweening_bl = false;
		};
		
		this.mouseDummyHandler = function(e){
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}
		};
			
		this.closeButtonOnStartHandler = function(e){
			var viewportSize = FWDUtils.getViewportSize();
			self.closeButton_do.isDisabled_bl = true;
			TweenMax.to(self.closeButton_do, .9, {x:viewportSize.w, ease:Expo.easeInOut});
			
			TweenMax.to(self.mainLightBox_do, .8, {
				w:0, 
				h:0,
				x:parseInt(viewportSize.w/2),
				y:parseInt(viewportSize.h/2),
				delay:.4,
				ease:Expo.easeInOut});
			
			TweenMax.to(self.lightBoxBackground_sdo, .8, {alpha:0, delay:.8});
			self.lighboxAnimDoneId_to = setTimeout(self.lighboxHideAnimationDone, 1600);
			self.dispatchEvent(FWDLightBox.CLOSE);
		};
		
		this.lighboxHideAnimationDone = function(){
			self.dispatchEvent(FWDLightBox.HIDE_COMPLETE);
		};
		
		//#####################################//
		/* destroy */
		//####################################//
		self.destroy = function(){
			
			try{
				if(navigator.userAgent.toLowerCase().indexOf("msie 7") == -1){
					document.documentElement.removeChild(self.screen);
				}else{
					document.getElementsByTagName("body")[0].removeChild(self.screen);
				}
			}catch(e){}
			
			if(self.isMobile_bl){
				if(!self.hasPointerEvent_bl){
					window.removeEventListener("touchstart", self.mouseDummyHandler);
					window.removeEventListener("touchmove", self.mouseDummyHandler);
				}
			}else{
				if(window.removeEventListener){
					window.removeEventListener ("mousewheel", self.mouseDummyHandler);
					window.removeEventListener('DOMMouseScroll', self.mouseDummyHandler);
				}else if(document.detachEvent){
					document.detachEvent("onmousewheel", self.mouseDummyHandler);
				}
			}
			
			clearTimeout(self.lighboxAnimDoneId_to);
			
			if(self.lightBoxBackground_sdo){
				TweenMax.killTweensOf(self.lightBoxBackground_sdo);
				self.lightBoxBackground_sdo.destroy();
			}
			
			if(self.lightBoxGridHolder_do){
				TweenMax.killTweensOf(self.lightBoxGridHolder_do);
				self.lightBoxGridHolder_do.destroy();
			}
			
			if(self.closeButton_do){
				TweenMax.killTweensOf(self.closeButton_do);
				self.closeButton_do.destroy();
			}
			
			self.mainLightBox_do = null;
			self.lightBoxBackground_sdo = null;
			self.lightBoxGridHolder_do = null;
			self.closeButton_do = null;
			
			self.mainBackgroundColor_str = null;
			self.holderBackgroundColor_str = null;
			
			parent = null;
			mainBackgroundColor_str = null;
			holderBackgroundColor_str = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDLightBox.prototype = null;
		};
	
		this.init();
	};
	
	/* set prototype */
    FWDLightBox.setPrototype = function(){
    	FWDLightBox.prototype = new FWDDisplayObject("div");
    };
    
    FWDLightBox.CLOSE = "ligtBoxClose";
    FWDLightBox.HIDE_COMPLETE = "hideComplete";
    
    FWDLightBox.prototype = null;
	window.FWDLightBox = FWDLightBox;
}(window));/* FWDMarker */
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
}(window));/* FWDMarkerToolTip */
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
}(window));/* FWDMarkerWindowToolTip */
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
}(window));/* Gallery */
(function (window){
	
	var FWDMegazoom = function(props){
		
		var self = this;
	
		/* init gallery */
		self.init = function(){
		
			TweenLite.ticker.useRAF(false);
			self.props_obj = props;
			
			self.isFullScreen_bl = false;
			self.mustHaveHolderDiv_bl = false;
		
			self.displayType = props.displayType.toLowerCase();
			
			if(!self.displayType) self.displayType = FWDMegazoom.FULL_SCREEN;

			if(self.displayType == FWDMegazoom.RESPONSIVE) self.mustHaveHolderDiv_bl = true;
			
			self.body = document.getElementsByTagName("body")[0];
	
			if(!self.props_obj){
				alert("FWDMegazoom constructor properties object is not defined!");
				return;
			}
			
			if(!self.props_obj){
				alert("FWDMegazoom constructor properties object is not defined!");
				return;
			}
			
			if(!self.props_obj.parentId){		
				if(self.mustHaveHolderDiv_bl){
					alert("Property parentId is not defined in the FWDMegazoom constructor, self property represents the div id into which the megazoom is added as a child!");
					return;
				}
			}
			
			if(self.mustHaveHolderDiv_bl && !FWDUtils.getChildById(self.props_obj.parentId)){
				alert("FWDMegazoom holder div is not found, please make sure that the div exsists and the id is correct! " + self.props_obj.parentId);
				return;
			}
			
			//check for the playlist id  property.
			if(!self.props_obj.playListAndSkinId){
				alert("The playListAndSkinId property which represents the megazoom playlist id is not defined in the constructor function!");
				return;
			};
			
			this.rootElement_el = FWDUtils.getChildById(self.props_obj.playListAndSkinId);
		
			if(self.displayType == FWDMegazoom.FULL_SCREEN || self.displayType == FWDMegazoom.LIGHTBOX){
				if(FWDUtils.isIEAndLessThen9){
					self.stageContainer = self.body;
				}else{
					self.stageContainer = document.documentElement;
				}
			}else{
				self.stageContainer =  FWDUtils.getChildById(self.props_obj.parentId);
			}
			
			this.customContextMenu = null;
			this.info_do = null;
			this.main_do = null;
			this.preloader_do = null;
			this.navigator_do = null;
			this.controller_do = null;
			this.imageManager_do = null;
			this.descriptionWindow_do = null;
			this.hider = null;
			this.lightBox_do = null;
			this.disable_sdo = null;
			
			this.backgroundColor_str = self.props_obj.backgroundColor || "transparent";
			this.lightBoxBackgroundColor_str = self.props_obj.lightBoxBackgroundColor || "transparent";
			
			this.viewportWidth = 0;
			this.viewportHeight = 0;
			this.stageWidth = 0;
			this.stageHeight = 0;
			this.pageXOffset = window.pageXOffset;
			this.pageYOffset = window.pageYOffset;
			this.lastScrollY;
			this.lastScrollX;
			this.lightBoxBackgroundOpacity = self.props_obj.lightBoxBackgroundOpacity || 1;
			this.lightBoxWidth = self.props_obj.lightBoxWidth || 500;
			this.lightBoxHeight =  self.props_obj.lightBoxHeight || 400;
			this.finalLightBoxWidth;
			this.finalLightBoxHeight;
			
			this.resizeHandlerId_to;
			this.resizeHandler2Id_to;
			this.lighboxAnimDoneId_to;
			this.startHiderWithDelayId_to;
			this.initPluginId_to;
			this.activateWithDelayImagemanagerId_to;
			this.hidePreloaderId_to;
			this.centerImageNormalScreenId_to;
			this.orientationChangeId_to;
			
			this.orintationChangeComplete_bl = true;
			this.isMobile_bl = FWDUtils.isMobile;
			this.hibernate_bl = false;
			
			if(self.displayType == FWDMegazoom.LIGHTBOX){
				this.initPluginId_to = setTimeout(function(){self.setupLightBox();}, 50);
			}else{
				this.initPluginId_to = setTimeout(function(){self.setupMegazoom();}, 50);
			}
			
			try{
				self.rootElement_el.parentNode.removeChild(self.rootElement_el);
			}catch(e){}
			
		};
		
		//#############################################//
		/* setup megazoom main instances */
		//#############################################//
		self.setupMegazoom = function(){
			self.setupMainDo();
			self.startResizeHandler();
			self.setupInfo();
			self.setupData();
			if(FWDUtils.hasPointerEvent && FWDUtils.isMobile) window.addEventListener("contextmenu", self.preventContextMenu);
		};
	
		//#############################################//
		/* setup main do */
		//#############################################//
		self.setupMainDo = function(){
			
			self.main_do = new FWDDisplayObject("div", "relative");
			self.main_do.getStyle().msTouchAction = "none";
			
			self.main_do.setBackfaceVisibility();
			self.main_do.setBkColor(self.backgroundColor_str);
			if(!FWDUtils.isMobile || (FWDUtils.isMobile && FWDUtils.hasPointerEvent)) self.main_do.setSelectable(false);
			
			//start full screen
			if(self.displayType == FWDMegazoom.FULL_SCREEN){	
				self.stageContainer.style.overflow = "hidden";
				self.main_do.getStyle().position = "absolute";
				document.documentElement.style.overflow = "hidden";
				self.stageContainer.appendChild(self.main_do.screen);
			}else if(self.displayType == FWDMegazoom.LIGHTBOX){
				self.main_do.getStyle().zIndex = 99999991;
				self.main_do.getStyle().position = "absolute";
				self.stageContainer.appendChild(self.main_do.screen);
			}else{
				self.stageContainer.appendChild(self.main_do.screen);
			}	
		};
		
		//#############################################//
		/* prevent context menu on windows8 mobile */
		//############################################//
		self.preventContextMenu = function(e){
			e.preventDefault();
		};
		
		//#############################################//
		/* setup info_do */
		//#############################################//
		self.setupInfo = function(){
			FWDInfo.setPrototype();
			self.info_do = new FWDInfo();
		};	
		
		//#############################################//
		/* resize handler */
		//#############################################//
		self.startResizeHandler = function(){
			if(window.addEventListener){
				window.addEventListener("resize", self.onResizeHandler);
				window.addEventListener("scroll", self.onResizeHandler);
				window.addEventListener("orientationchange", self.orientationChange);
			}else if(window.attachEvent){
				window.attachEvent("onresize", self.onResizeHandler);
				window.attachEvent("onscroll", self.onResizeHandler);
			}
			self.onResizeHandler(true);
			self.resizeHandlerId_to = setTimeout(function(){self.resizeHandler(true);}, 500);
		};
		
		self.stopResizeHandler = function(){
			if(window.removeEventListener){
				window.removeEventListener("resize", self.onResizeHandler);
				window.removeEventListener("scroll", self.onResizeHandler);
				window.removeEventListener("orientationchange", self.orientationChange);
			}else if(window.detachEvent){
				window.detachEvent("onresize", self.onResizeHandler);
				window.detachEvent("onscroll", self.onResizeHandler);
			}	
			clearTimeout(self.resizeHandlerId_to);
		};
		
		self.onResizeHandler = function(e){
			self.resizeHandler();
			clearTimeout(self.resizeHandler2Id_to);
			self.resizeHandler2Id_to = setTimeout(function(){self.resizeHandler();}, 300);
		};
		
		self.onScrollHandler = function(e){
			if(self.hibernate_bl) return;
			if(self.isFullScreen_bl 
			   || self.displayType == FWDMegazoom.FULL_SCREEN 
			   || self.displayType == FWDMegazoom.LIGHTBOX){
				self.resizeHandler();
			}
		};
		
		this.orientationChange = function(){
		
			if(self.displayType == FWDMegazoom.FULL_SCREEN || self.isFullScreen_bl){
				self.orintationChangeComplete_bl = false;	
				clearTimeout(self.resizeHandlerId_to);
				clearTimeout(self.resizeHandler2Id_to);
				clearTimeout(self.orientationChangeId_to);
			
				self.orientationChangeId_to = setTimeout(function(){
					self.orintationChangeComplete_bl = true; 
					self.resizeHandler(true);
					}, 1000);
				
				self.main_do.setX(0);
				self.main_do.setWidth(0);
			}
		};
		
		self.resizeHandler = function(overwrite){
			if(!self.orintationChangeComplete_bl) return;
			
			var scrollOffsets = FWDUtils.getScrollOffsets();
			var viewportSize = FWDUtils.getViewportSize();
			
			
			if(self.viewportWidth == viewportSize.w && self.viewportHeight == viewportSize.h 
				&& self.pageXOffset == scrollOffsets.x && self.pageYOffset == scrollOffsets.y
				&& !overwrite) return;
			
			
			self.viewportWidth = viewportSize.w;
			self.viewportHeight = viewportSize.h;
			self.pageXOffset = scrollOffsets.x;
			self.pageYOffset = scrollOffsets.y;
		
			if(self.displayType == FWDMegazoom.LIGHTBOX && !self.isFullScreen_bl){
				if(self.lightBoxWidth > viewportSize.w){
					self.finalLightBoxWidth = viewportSize.w;
					self.finalLightBoxHeight = parseInt(self.lightBoxHeight * (viewportSize.w/self.lightBoxWidth));
				}else{
					self.finalLightBoxWidth = self.lightBoxWidth;
					self.finalLightBoxHeight = self.lightBoxHeight;
				}
				self.lightBox_do.setWidth(viewportSize.w);
				self.lightBox_do.setHeight(viewportSize.h);
				self.lightBox_do.setX(scrollOffsets.x);
				self.lightBox_do.setY(scrollOffsets.y);
				self.lightBox_do.mainLightBox_do.setX(parseInt((viewportSize.w - self.finalLightBoxWidth)/2));
				self.lightBox_do.mainLightBox_do.setY(parseInt((viewportSize.h - self.finalLightBoxHeight)/2));
				if(self.lightBox_do.closeButton_do && !self.lightBox_do.closeButtonIsTweening_bl){ 
					var closeButtonFinalX = parseInt((viewportSize.w + self.finalLightBoxWidth)/2 - self.lightBox_do.closeButton_do.totalWidth/2);
					var closeButtonFinalY = parseInt((viewportSize.h - self.finalLightBoxHeight)/2 - self.lightBox_do.closeButton_do.totalHeight/2);
		
					if(closeButtonFinalX + self.lightBox_do.closeButton_do.totalWidth > self.viewportWidth){
						closeButtonFinalX = self.viewportWidth - self.lightBox_do.closeButton_do.totalWidth;
					}
					
					if(closeButtonFinalY < 0){
						closeButtonFinalY = 0;
					}
				
					self.lightBox_do.closeButton_do.setX(closeButtonFinalX);
					self.lightBox_do.closeButton_do.setY(closeButtonFinalY);	
				}
				self.main_do.setX(0);
				self.main_do.setY(0);
				self.lightBox_do.mainLightBox_do.setWidth(self.finalLightBoxWidth);
				self.lightBox_do.mainLightBox_do.setHeight(self.finalLightBoxHeight);	
				self.stageWidth = self.finalLightBoxWidth;
				self.stageHeight = self.finalLightBoxHeight;
			}else if(self.isFullScreen_bl || self.displayType == FWDMegazoom.FULL_SCREEN){	
				self.main_do.setX(scrollOffsets.x);
				self.main_do.setY(scrollOffsets.y);
				self.stageWidth = viewportSize.w;
				self.stageHeight = viewportSize.h;
			}else{
				self.main_do.setX(0);
				self.main_do.setY(0);
				self.stageWidth = self.stageContainer.offsetWidth;
				self.stageHeight = self.stageContainer.offsetHeight;
			}
			
			self.main_do.setWidth(self.stageWidth);
			self.main_do.setHeight(self.stageHeight);
			
			if(self.preloader_do) self.preloader_do.positionAndResize();
			if(self.controller_do) self.controller_do.resizeAndPosition();
			if(self.imageManager_do) self.imageManager_do.resizeAndPosition(false);
			if(self.navigator_do) self.navigator_do.resizeAndPosition();
			if(self.descriptionWindow_do && self.descriptionWindow_do.isShowed_bl)  self.descriptionWindow_do.resizeAndPosition();
		};
		
		//#############################################//
		/* setup  lighbox...*/
		//#############################################//
		self.setupLightBox = function(){
			FWDLightBox.setPrototype();
			self.lightBox_do =  new FWDLightBox(self, 
					self.lightBoxBackgroundColor_str, 
					self.backgroundColor_str, 
					self.lightBoxBackgroundOpacity, 
					self.lightBoxWidth, 
					self.lightBoxHeight);
			self.lightBox_do.getStyle().zIndex = 9999999;
			self.lightBox_do.addListener(FWDLightBox.CLOSE, self.lightBoxCloseHandler);
			self.lightBox_do.addListener(FWDLightBox.HIDE_COMPLETE, self.lightBoxHideCompleteHandler);
			self.lighboxAnimDoneId_to = setTimeout(self.setupMegazoom, 1800);
		};
		
		self.lightBoxCloseHandler = function(){
			self.stopResizeHandler();
			if(self.data) self.data.stopToLoad();
		};
		
		self.lightBoxHideCompleteHandler = function(){
			if(self.dispatchEvent) self.dispatchEvent(FWDMegazoom.CLOSE_LIGHTBOX);
			self.destroy();
		};
		
		//#############################################//
		/* setup context menu */
		//#############################################//
		self.setupContextMenu = function(){
			FWDContextMenu.setPrototype();
			self.customContextMenu = new FWDContextMenu(self, self.data);
			self.customContextMenu.addListener(FWDController.PAN, self.contextMenuPanHandler);
			self.customContextMenu.addListener(FWDController.ZOOM_IN, self.contextMenuZoomInHandler);
			self.customContextMenu.addListener(FWDController.ZOOM_OUT, self.contextMenuZoomOutHandler);
			self.customContextMenu.addListener(FWDController.HIDE_MARKERS, self.controllerHideMarkers);
			self.customContextMenu.addListener(FWDController.SHOW_MARKERS, self.controllerShowMarkers);
			self.customContextMenu.addListener(FWDController.SHOW_INFO, self.contextMenuShowInfoWindow);
			self.customContextMenu.addListener(FWDController.GO_FULL_SCREEN, self.controllerGoFullScreen);
			self.customContextMenu.addListener(FWDController.GO_NORMAL_SCREEN, self.controllerGoNormalScreen);
			self.customContextMenu.addListener(FWDController.HIDE_CONTROLLER, self.contextMenuHideController);
			self.customContextMenu.addListener(FWDController.SHOW_CONTROLLER, self.contextMenuShowController);
		};
		
		this.contextMenuPanHandler = function(e){
			if(e.dir == "left"){
				self.controller_do.moveLeftButtonStartHandler(e.e);
			}else if(e.dir == "right"){
				self.controller_do.moveRightButtonStartHandler(e.e);
			}else if(e.dir == "up"){
				self.controller_do.moveUpButtonStartHandler(e.e);
			}else if(e.dir == "down"){
				self.controller_do.moveDownButtonStartHandler(e.e);
			}
		};
	
		this.contextMenuGoToNextImageHandler = function(e){
			self.controller_do.nextButtonStartHandler(e);
		};
		
		this.contextMenuGoToPrevImageHandler = function(e){
			self.controller_do.prevButtonStartHandler(e);
		};
		
		this.contextMenuZoomInHandler = function(e){
			self.controller_do.zoomInStartHandler(e);
		};
		
		this.contextMenuZoomOutHandler = function(e){
			self.controller_do.zoomOutStartHandler(e);
		};
		
		this.contextMenuShowInfoWindow = function(e){
			self.main_do.addChild(self.descriptionWindow_do);
			self.descriptionWindow_do.hide(false, true);
			self.descriptionWindow_do.show(self.data.infoText_str);
		};
		
		this.contextMenuHideController =  function(){
			self.controller_do.setHideOrShowControllerAndToolTipState(1);
		};
		
		this.contextMenuShowController = function(){
			self.controller_do.setHideOrShowControllerAndToolTipState(0);
		};
		
		//#############################################//
		/* setup data */
		//#############################################//
		self.setupData = function(){
			FWDData.setPrototype();
			self.data = new FWDData(self.props_obj, self.rootElement_el);
			self.data.addListener(FWDData.LIGHBOX_CLOSE_BUTTON_LOADED, self.onLightboxCloseButtonLoadComplete);
			self.data.addListener(FWDData.PRELOADER_LOAD_DONE, self.onPreloaderLoadDone);
			self.data.addListener(FWDData.LOAD_ERROR, self.dataLoadError);
			self.data.addListener(FWDData.SKIN_PROGRESS, self.dataSkinProgressHandler);
			self.data.addListener(FWDData.IMAGES_PROGRESS, self.dataImagesProgressHandler);
			self.data.addListener(FWDData.LOAD_DONE, self.dataLoadComplete);
			self.data.addListener(FWDData.IMAGES_LOAD_COMPLETE, self.dataImageLoadComplete);
		};
		
		self.onLightboxCloseButtonLoadComplete = function(){
			if(self.displayType == FWDMegazoom.LIGHTBOX) self.lightBox_do.setupCloseButton(self.data.mainLightboxCloseButtonN_img, self.data.mainLightboxCloseButtonS_img);
		};
		
		self.onPreloaderLoadDone = function(){
			self.setupPreloader();
		};
		
		self.dataLoadError = function(e, text){
			self.main_do.addChild(self.info_do);
			self.info_do.showText(e.text);
		};
		
		self.dataSkinProgressHandler = function(e){
			self.preloader_do.updateText("Loading skin...");
		};
		
		self.dataImagesProgressHandler = function(e){
			self.preloader_do.updateText(self.data.preloaderText_str);
		};
		
		self.dataLoadComplete = function(e){
			self.main_do.addChild(self.preloader_do);
			if(!self.isMobile_bl) self.setupContextMenu();
		};
		
		self.dataImageLoadComplete = function(){
			self.hidePreloaderId_to = setTimeout(function(){self.preloader_do.hide(true);}, 500);
			
			self.setupImageManager();
			self.setupController();
			if(self.data.showNavigator_bl) self.setupNavigator();
	
			self.main_do.addChild(self.preloader_do);
			
			if(self.data.hideController_bl){
				self.setupHider();
				self.controller_do.setupHider(self.hider);
				self.imageManager_do.setupHider(self.hider);
				if(self.navigator_do) self.navigator_do.setupHider(self.hider);
				self.startHiderWithDelayId_to = setTimeout(function(){
					self.hider.start();
				}, self.data.hideControllerDelay);
			}
			if(self.customContextMenu) self.customContextMenu.isActive_bl = true;
			if(self.navigator_do) self.navigator_do.activate();
			self.setupDisableContainer();
			self.setupDescriptionWindow();
		};
		
		//#############################################//
		/* setup preloader */
		//#############################################//
		self.setupPreloader = function(){
			FWDPreloader.setPrototype();
			self.preloader_do = new FWDPreloader(
					self, 
					self.data.mainPreloader_img, 
					50, 45, 30, 50,
					self.data.preloaderFontColor_str,
					self.data.preloaderBackgroundColor_str);
			
			self.preloader_do.addListener(FWDPreloader.HIDE_COMPLETE, self.onPreloaderHideCompleteHandler);
			self.preloader_do.positionAndResize();
			self.preloader_do.hide(false);
			self.preloader_do.show(true);
			self.preloader_do.start();
			self.main_do.addChild(self.preloader_do);
		};
		
		self.onPreloaderHideCompleteHandler = function(){
			self.main_do.removeChild(self.preloader_do);
			self.preloader_do.destroy();
			self.preloader_do = null;
		};
		
		//###########################################//
		/* setup hider */
		//###########################################//
		self.setupHider = function(){
			FWDHider.setPrototype();
			self.hider = new FWDHider(self.data.isMobile_bl, self.main_do, self.data.hideControllerDelay);
		};
		
		//###########################################//
		/* setup controller */
		//###########################################//
		this.setupController = function(){
			FWDController.setPrototype();
			self.controller_do = new FWDController(self.data, self);
			self.controller_do.addListener(FWDController.MOUSE_DOWN, self.controllerOnMouseDownHandler);
			self.controller_do.addListener(FWDController.PAN, self.controllerOnPanHandler);
			self.controller_do.addListener(FWDController.DISABLE_PAN_OR_MOVE, self.disablePanOrMoveHandler);
			self.controller_do.addListener(FWDController.ENABLE_PAN_OR_MOVE, self.enablePanOrMoveHandler);
			self.controller_do.addListener(FWDController.SCROLL_BAR_UPDATE, self.controllerScrollBarUpdateHandler);
			self.controller_do.addListener(FWDController.ZOOM_WITH_BUTTONS, self.controllerZoomHandler);
			self.controller_do.addListener(FWDController.SHOW_INFO, self.controllerShowInfoHandler);
			self.controller_do.addListener(FWDController.GO_FULL_SCREEN, self.controllerGoFullScreen);
			self.controller_do.addListener(FWDController.GO_NORMAL_SCREEN, self.controllerGoNormalScreen);	
			self.controller_do.addListener(FWDController.HIDE_MARKERS, self.controllerHideMarkers);
			self.controller_do.addListener(FWDController.SHOW_MARKERS, self.controllerShowMarkers);
			self.controller_do.addListener(FWDController.HIDE_CONTROLLER, self.controllerHideHandler);
			self.controller_do.addListener(FWDController.SHOW_CONTROLLER, self.controllerShowHandler);
	
			if(self.controller_do) self.controller_do.resizeAndPosition();
			self.main_do.addChild(self.controller_do);
		};
		
		this.controllerOnMouseDownHandler = function(){
			self.imageManager_do.hideToolTipWindow();
		};
		
		this.controllerOnPanHandler = function(e){
			self.imageManager_do.panWithButtons(e.dir);
		};
		
		this.disablePanOrMoveHandler = function(){
			self.imageManager_do.disableOrEnablePanOrTouch(true);
		};
		
		this.enablePanOrMoveHandler = function(){
			self.imageManager_do.disableOrEnablePanOrTouch(false);
		};
		
		this.controllerScrollBarUpdateHandler = function(e){
			self.imageManager_do.zoomInOrOutWithScrollBar(e.percent);
		};
		
		this.controllerZoomHandler = function(e){
			self.imageManager_do.zoomInOrOutWithButtons(e.dir, e.withPause);
		};
		
		
		this.controllerShowInfoHandler = function(){
			self.main_do.addChild(self.descriptionWindow_do);
			self.descriptionWindow_do.hide(false, true);
			self.descriptionWindow_do.show(self.data.infoText_str);
		};
		
		this.controllerGoFullScreen = function(){
			if(self.isFullScreen_bl) return;
			self.goFullScreen();
			//self.imageManager_do.centerImage();
			self.controller_do.setFullScreenButtonState(0);
			if(self.customContextMenu) self.customContextMenu.updateFullScreenButton(1);
			
			if(document.addEventListener){
				document.addEventListener("fullscreenchange", self.onFullScreenChange);
				document.addEventListener("mozfullscreenchange", self.onFullScreenChange);
				document.addEventListener("webkitfullscreenchange", self.onFullScreenChange);
			}
		};
		
		this.controllerGoNormalScreen = function(){
			if(!self.isFullScreen_bl) return;
			self.goNormalScreen();
		
			self.imageManager_do.centerImage();
			self.controller_do.setFullScreenButtonState(1);
			if(self.customContextMenu) self.customContextMenu.updateFullScreenButton(0);
			
			if(document.removeEventListener){
				document.removeEventListener("fullscreenchange", self.onFullScreenChange);
				document.removeEventListener("mozfullscreenchange", self.onFullScreenChange);
				document.removeEventListener("webkitfullscreenchange", self.onFullScreenChange);
			}
		};
		
		this.controllerHideMarkers = function(){
			if(self.customContextMenu) self.customContextMenu.updateHideOrShowMarkersButton(1);
			self.controller_do.setHideOrShowButtonAndToolTipState(1);
			self.imageManager_do.hideMarkers();
		};
		
		this.controllerShowMarkers = function(){
			if(self.customContextMenu) self.customContextMenu.updateHideOrShowMarkersButton(0);
			self.controller_do.setHideOrShowButtonAndToolTipState(0);
			self.imageManager_do.showMarkers();
		};
		
		this.onFullScreenChange = function(e){
			if(!(document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen || document.msieFullScreen)){
				if(self.showButtonsLabels_bl) self.fullscreenToolTip_do.setLabel(self.fullscreenToolTip_do.toolTipLabel2_str);
				self.controller_do.setFullScreenButtonState(1);
				if(self.customContextMenu) self.customContextMenu.updateFullScreenButton(0);
				self.controllerGoNormalScreen();
				self.isFullScreen_bl = false;
			}
		};
		
		this.controllerHideHandler = function(){
			if(self.customContextMenu) self.customContextMenu.startHideOrShowControllerHandler(1);
		};
		
		this.controllerShowHandler = function(){
			if(self.customContextMenu) self.customContextMenu.startHideOrShowControllerHandler(0);
		};
		
		//###########################################//
		/* setup image manager */
		//###########################################//
		self.setupImageManager = function(id){	
			FWDImageManager.setPrototype();
			self.imageManager_do = new FWDImageManager(self.data, self);
			self.imageManager_do.addListener(FWDImageManager.LARGE_IMAGE_LOAD_ERROR, self.imageManagerLoadError);
			self.imageManager_do.addListener(FWDImageManager.SCROLL_BAR_UPDATE, self.imageManagerScrollBarUpdate);
			self.imageManager_do.addListener(FWDImageManager.SHOW_NAVIGATOR, self.imageManagerShowNavigatorHandler);
			self.imageManager_do.addListener(FWDImageManager.HIDE_NAVIGATOR, self.imageManagerHideNavigatorHandler);
			self.imageManager_do.addListener(FWDImageManager.UPDATE_NAVIGATOR, self.imageManagerUpdateNavigatorHandler);
			self.imageManager_do.addListener(FWDImageManager.SHOW_INFO, self.imageManagerShowInfoHandler);
			self.imageManager_do.addListener(FWDImageManager.DISABLE_LEFT_AND_RIGHT_BUTTONS, self.disableLeftAndRightHandler);
			self.imageManager_do.addListener(FWDImageManager.ENABLE_LEFT_AND_RIGHT_BUTTONS, self.enableLeftAndRightHandler);
			self.imageManager_do.addListener(FWDImageManager.DISABLE_UP_AND_DOWN_BUTTONS, self.disableUpAndDownHandler);
			self.imageManager_do.addListener(FWDImageManager.ENABLE_UP_AND_DOWN_BUTTONS, self.enableUpAndDownHandler);
			self.main_do.addChild(self.imageManager_do);
		};
		
		self.imageManagerLoadError = function(e){
			self.main_do.addChild(self.info_do);
			self.info_do.showText(e.error);
		};
		
		self.imageManagerScrollBarUpdate = function(e){
			self.controller_do.updateScrollBar(e.percent, e.animate);
		};
		
		self.imageManagerShowNavigatorHandler = function(){
			self.navigator_do.show(true);
		};
		
		self.imageManagerHideNavigatorHandler = function(){
			self.navigator_do.hide(true);
		};
		
		self.imageManagerUpdateNavigatorHandler = function(e){
			self.navigator_do.update(e.percentX, e.percentY, e.percentWidth, e.percentHeight, e.animate);
		};
		
		self.imageManagerShowInfoHandler = function(e){
			self.main_do.addChild(self.descriptionWindow_do);
			self.descriptionWindow_do.hide(false, true);
			self.descriptionWindow_do.show(e.text);
		};
		
		self.disableLeftAndRightHandler = function(){
			self.controller_do.disableLeftAndRightButtons();
			if(self.customContextMenu) self.customContextMenu.disableLeftAndRightButtons();
		};
		
		self.enableLeftAndRightHandler = function(){
			self.controller_do.enableLeftAndRightButtons();
			if(self.customContextMenu) self.customContextMenu.enableLeftAndRightButtons();
		};
		
		self.disableUpAndDownHandler = function(){
			
			self.controller_do.disableUpAndDownButtons();
			if(self.customContextMenu) self.customContextMenu.disableUpAndDownButtons();
		};
		
		self.enableUpAndDownHandler = function(){
			self.controller_do.enableUpAndDownButtons();
			if(self.customContextMenu) self.customContextMenu.enableUpAndDownButtons();
		};
		
		//#############################################//
		/* Setup navigator */
		//#############################################//
		self.setupNavigator = function(){
			FWDNavigator.setPrototype();
			self.navigator_do = new FWDNavigator(self, self.data);
			self.navigator_do.addListener(FWDNavigator.PAN_START, self.navigatorOnPanStartHandler);
			self.navigator_do.addListener(FWDNavigator.PAN_END, self.navigatorOnPanEndHandler);
			self.navigator_do.addListener(FWDNavigator.PAN, self.navigatorPanHandler);
			self.main_do.addChild(self.navigator_do);
		};
		
		self.navigatorOnPanStartHandler = function(){
			self.imageManager_do.hideToolTipWindow();
			if(!self.isMobile_bl) self.disableAll();
		};
		
		self.navigatorOnPanEndHandler = function(){
			if(!self.isMobile_bl) self.enableAll();
		};
		
		
		self.navigatorPanHandler = function(e){
			self.imageManager_do.updateOnNavigatorPan(e.percentX, e.percentY);
		};
		
		//#############################################//
		/* Setup description window */
		//#############################################//
		self.setupDescriptionWindow = function(){
			FWDDescriptionWindow.setPrototype();
			self.descriptionWindow_do = new FWDDescriptionWindow(self, self.data);
			self.descriptionWindow_do.addListener(FWDDescriptionWindow.SHOW_START, self.descWindowShowStartHandler);
			self.descriptionWindow_do.addListener(FWDDescriptionWindow.HIDE_COMPLETE, self.descWindowHideComplteHandler);
		};
		
		self.descWindowShowStartHandler = function(){
			if(self.customContextMenu) self.customContextMenu.disable();
		};
		
		self.descWindowHideComplteHandler = function(){
			if(self.customContextMenu) self.customContextMenu.enable();
			self.main_do.removeChild(self.descriptionWindow_do);
		};
		
		//##############################################//
		/* Setup disable container */
		//#############################################//
		this.setupDisableContainer = function(){
			self.disable_sdo = new FWDSimpleDisplayObject("div");
			self.disable_sdo.screen.style.cursor = 'url(' + self.data.handGrabPath_str + '), default';
			if(FWDUtils.isIE || FWDUtils.isChrome){
				self.disable_sdo.setBkColor("#000000");
				self.disable_sdo.setAlpha(.0001);
			}
			self.main_do.addChild(self.disable_sdo);
		};
		
		this.disableAll = function(){
			self.disable_sdo.setWidth(self.stageWidth + 3000);
			self.disable_sdo.setHeight(self.stageHeight + 3000);
		};
		
		this.enableAll = function(){
			self.disable_sdo.setWidth(0);
			self.disable_sdo.setWidth(0);
		};
		
		//#############################################//
		/* go fullscreen / normal screen */
		//#############################################//
		self.goFullScreen = function(){
			
			var scrollOffsets = FWDUtils.getScrollOffsets();
			
			self.lastScrollX = scrollOffsets.x;
			self.lastScrollY = scrollOffsets.y;
			
			if (document.documentElement.requestFullScreen) {  
				document.documentElement.requestFullScreen();  
			}else if(document.documentElement.mozRequestFullScreen) {  
				document.documentElement.mozRequestFullScreen();  
			}else if(document.documentElement.webkitRequestFullScreen) {  
				document.documentElement.webkitRequestFullScreen();  
			}else if(document.documentElement.msieRequestFullScreen) {  
				document.documentElement.msieRequestFullScreen();  
			}
			
			self.main_do.getStyle().position = "absolute";
			self.body.style.overflow = "hidden";
			document.documentElement.style.overflow = "hidden";
			
			if(FWDUtils.isIEAndLessThen9){
				self.body.appendChild(self.main_do.screen);
			}else{
				//self.body.style.visiblity = "hidden";
				document.documentElement.appendChild(self.main_do.screen);
			}
			
			self.main_do.getStyle().zIndex = 100000001;
			
			self.isFullScreen_bl = true;
			self.resizeHandler(true);
		};
		
		self.goNormalScreen = function(){			
			if (document.cancelFullScreen) {  
				document.cancelFullScreen();  
			}else if (document.mozCancelFullScreen) {  
				document.mozCancelFullScreen();  
			}else if (document.webkitCancelFullScreen) {  
				document.webkitCancelFullScreen();  
			}else if (document.msieCancelFullScreen) {  
				document.msieCancelFullScreen();  
			}
			
			self.addMainDoToTheOriginalParent();
			
			self.isFullScreen_bl = false;
			self.resizeHandler(true);
			self.centerImageNormalScreenId_to = setTimeout(function(){
				self.imageManager_do.resizeAndPosition(true, false);
			}, 50)
		};
		
		self.addMainDoToTheOriginalParent = function(){
			
			if(self.displayType != FWDMegazoom.FULL_SCREEN){
				if(FWDUtils.isIEAndLessThen9){
					document.documentElement.style.overflow = "auto";
					this.body.style.overflow = "auto";
					this.body.style.visibility = "visible";
				}else{
					document.documentElement.style.overflow = "visible";
					self.body.style.overflow = "visible";
					self.body.style.display = "inline";
				}
			}
			
			if(self.displayType == FWDMegazoom.FULL_SCREEN){
				if(FWDUtils.isIEAndLessThen9){
					self.body.appendChild(self.main_do.screen);
				}else{
					document.documentElement.appendChild(self.main_do.screen);
				}
			}else if(self.displayType == FWDMegazoom.LIGHTBOX){
				self.stageContainer.appendChild(self.main_do.screen);
				//self.stageContainer.appendChild(self.closeButton_do.screen);
			}else{
				self.main_do.getStyle().position = "relative";
				self.stageContainer.appendChild(self.main_do.screen);
			}
			
			self.main_do.getStyle().zIndex = 0;
			window.scrollTo(self.lastScrollX, self.lastScrollY);
		};
		
		//#############################################//
		/* clean main events */
		//#############################################//
		self.cleanMainEvents = function(){
		
			if(window.removeEventListener){
				window.removeEventListener("resize", self.onResizeHandler);
				window.removeEventListener("scroll", self.onResizeHandler);
				document.removeEventListener("fullscreenchange", self.onFullScreenChange);
				document.removeEventListener("mozfullscreenchange", self.onFullScreenChange);
				document.removeEventListener("webkitfullscreenchange", self.onFullScreenChange);
			}else if(window.detachEvent){
				window.detachEvent("onresize", self.onResizeHandler);
				window.detachEvent("onscroll", self.onResizeHandler);
			}
			
			if(self.isMobile_bl){
				window.removeEventListener("contextmenu", self.preventContextMenu);	
			}
			
			clearTimeout(self.resizeHandlerId_to);
			clearTimeout(self.resizeHandler2Id_to);
			clearTimeout(self.lighboxAnimDoneId_to);
			clearTimeout(self.startHiderWithDelayId_to);
			clearTimeout(self.initPluginId_to);
			clearTimeout(self.activateWithDelayImagemanagerId_to);
			clearTimeout(self.hidePreloaderId_to);
			clearTimeout(self.centerImageNormalScreenId_to);
			
		};
		
		/* destroy */
		self.destroy = function(){
			
			self.cleanMainEvents();
			
			if(self.data) self.data.destroy();
			if(self.lightBox_do)self.lightBox_do.destroy();
			if(self.preloader_do) self.preloader_do.destroy();
			if(self.customContextMenu) self.customContextMenu.destroy();
			if(self.info_do) self.info_do.destroy();
			
			if(self.imageManager_do){
				TweenMax.killTweensOf(self.imageManager_do);
				self.imageManager_do.destroy();
			}
			
			if(self.controller_do) self.controller_do.destroy();
			if(self.navigator_do) self.navigator_do.destroy();
			
			if(self.hider) self.hider.destroy();
			if(self.descriptionWindow_do) self.descriptionWindow_do.destroy();
			
			try{
				self.main_do.screen.parentNode.removeChild(self.main_do.screen);
			}catch(e){}
			if(self.main_do){
				self.main_do.setInnerHTML("");
				self.main_do.destroy();
			}
			
			self.data = null;
			self.lightBox_do = null;
			self.customContextMenu = null;
			self.preloader_do = null;
			self.hider = null;
			self.info_do = null;
			self.main_do = null;
			self.imageManager_do = null;
			self.navigator_do = null;
			
			self = null;
		};
		
		self.init();
		
	};
	
	/* set prototype */
	FWDMegazoom.setPrototype =  function(){
		FWDMegazoom.prototype = new FWDEventDispatcher();
	};
	
	
	FWDMegazoom.FULL_SCREEN = "fullscreen";
	FWDMegazoom.LIGHTBOX = "lightbox";
	FWDMegazoom.RESPONSIVE = "responsive";
	FWDMegazoom.CLOSE_LIGHTBOX = "closeLightBox";
	
	FWDMegazoom.CLOSE_LIGHTBOX = "closeLightBox";
	
	window.FWDMegazoom = FWDMegazoom;
	
}(window));/*!
 * VERSION: beta 1.9.7
 * DATE: 2013-05-16
 * UPDATES AND DOCS AT: http://www.greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2013, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/

(window._gsQueue || (window._gsQueue = [])).push( function() {

	"use strict";

	window._gsDefine("TweenMax", ["core.Animation","core.SimpleTimeline","TweenLite"], function(Animation, SimpleTimeline, TweenLite) {
		
		var _slice = [].slice,
			TweenMax = function(target, duration, vars) {
				TweenLite.call(this, target, duration, vars);
				this._cycle = 0;
				this._yoyo = (this.vars.yoyo === true);
				this._repeat = this.vars.repeat || 0;
				this._repeatDelay = this.vars.repeatDelay || 0;
				this._dirty = true; //ensures that if there is any repeat, the totalDuration will get recalculated to accurately report it.
			},
			_isSelector = function(v) {
				return (v.jquery || (v.length && v[0] && v[0].nodeType && v[0].style));
			},
			p = TweenMax.prototype = TweenLite.to({}, 0.1, {}),
			_blankArray = [];

		TweenMax.version = "1.9.7";
		p.constructor = TweenMax;
		p.kill()._gc = false;
		TweenMax.killTweensOf = TweenMax.killDelayedCallsTo = TweenLite.killTweensOf;
		TweenMax.getTweensOf = TweenLite.getTweensOf;
		TweenMax.ticker = TweenLite.ticker;
	
		p.invalidate = function() {
			this._yoyo = (this.vars.yoyo === true);
			this._repeat = this.vars.repeat || 0;
			this._repeatDelay = this.vars.repeatDelay || 0;
			this._uncache(true);
			return TweenLite.prototype.invalidate.call(this);
		};
		
		p.updateTo = function(vars, resetDuration) {
			var curRatio = this.ratio, p;
			if (resetDuration && this.timeline && this._startTime < this._timeline._time) {
				this._startTime = this._timeline._time;
				this._uncache(false);
				if (this._gc) {
					this._enabled(true, false);
				} else {
					this._timeline.insert(this, this._startTime - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}
			}
			for (p in vars) {
				this.vars[p] = vars[p];
			}
			if (this._initted) {
				if (resetDuration) {
					this._initted = false;
				} else {
					if (this._notifyPluginsOfEnabled && this._firstPT) {
						TweenLite._onPluginEvent("_onDisable", this); //in case a plugin like MotionBlur must perform some cleanup tasks
					}
					if (this._time / this._duration > 0.998) { //if the tween has finished (or come extremely close to finishing), we just need to rewind it to 0 and then render it again at the end which forces it to re-initialize (parsing the new vars). We allow tweens that are close to finishing (but haven't quite finished) to work this way too because otherwise, the values are so small when determining where to project the starting values that binary math issues creep in and can make the tween appear to render incorrectly when run backwards. 
						var prevTime = this._time;
						this.render(0, true, false);
						this._initted = false;
						this.render(prevTime, true, false);
					} else if (this._time > 0) {
						this._initted = false;
						this._init();
						var inv = 1 / (1 - curRatio),
							pt = this._firstPT, endValue;
						while (pt) {
							endValue = pt.s + pt.c; 
							pt.c *= inv;
							pt.s = endValue - pt.c;
							pt = pt._next;
						}
					}
				}
			}
			return this;
		};
				
		p.render = function(time, suppressEvents, force) {
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(), 
				prevTime = this._time,
				prevTotalTime = this._totalTime, 
				prevCycle = this._cycle, 
				isComplete, callback, pt, cycleDuration, r, type, pow;
			if (time >= totalDur) {
				this._totalTime = totalDur;
				this._cycle = this._repeat;
				if (this._yoyo && (this._cycle & 1) !== 0) {
					this._time = 0;
					this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				} else {
					this._time = this._duration;
					this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
				}
				if (!this._reversed) {
					isComplete = true;
					callback = "onComplete";
				}
				if (this._duration === 0) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (time === 0 || this._rawPrevTime < 0) if (this._rawPrevTime !== time) {
						force = true;
						if (this._rawPrevTime > 0) {
							callback = "onReverseComplete";
							if (suppressEvents) {
								time = -1; //when a callback is placed at the VERY beginning of a timeline and it repeats (or if timeline.seek(0) is called), events are normally suppressed during those behaviors (repeat or seek()) and without adjusting the _rawPrevTime back slightly, the onComplete wouldn't get called on the next render. This only applies to zero-duration tweens/callbacks of course.
							}
						}
					}
					this._rawPrevTime = time;
				}
				
			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = this._cycle = 0;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (prevTotalTime !== 0 || (this._duration === 0 && this._rawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._duration === 0) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (this._rawPrevTime >= 0) {
							force = true;
						}
						this._rawPrevTime = time;
					}
				} else if (!this._initted) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
					force = true;
				}
			} else {
				this._totalTime = this._time = time;
				
				if (this._repeat !== 0) {
					cycleDuration = this._duration + this._repeatDelay;
					this._cycle = (this._totalTime / cycleDuration) >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but Flash reports it as 0.79999999!)
					if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration) {
						this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
					}
					this._time = this._totalTime - (this._cycle * cycleDuration);
					if (this._yoyo) if ((this._cycle & 1) !== 0) {
						this._time = this._duration - this._time;
					}
					if (this._time > this._duration) {
						this._time = this._duration;
					} else if (this._time < 0) {
						this._time = 0;
					}
				}
				
				if (this._easeType) {
					r = this._time / this._duration;
					type = this._easeType;
					pow = this._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}
					
					if (type === 1) {
						this.ratio = 1 - r;
					} else if (type === 2) {
						this.ratio = r;
					} else if (this._time / this._duration < 0.5) {
						this.ratio = r / 2;
					} else {
						this.ratio = 1 - (r / 2);
					}
					
				} else {
					this.ratio = this._ease.getRatio(this._time / this._duration);
				}
				
			}
				
			if (prevTime === this._time && !force) {
				if (prevTotalTime !== this._totalTime) if (this._onUpdate) if (!suppressEvents) { //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
					this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
				}
				return;
			} else if (!this._initted) {
				this._init();
				if (!this._initted) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly.
					return;
				}
				//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
				if (this._time && !isComplete) {
					this.ratio = this._ease.getRatio(this._time / this._duration);
				} else if (isComplete && this._ease._calcEnd) {
					this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);
				}
			}
			
			if (!this._active) if (!this._paused) {
				this._active = true; //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTotalTime === 0) {
				if (this._startAt) {
					if (time >= 0) {
						this._startAt.render(time, suppressEvents, force);
					} else if (!callback) {
						callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
					}
				}
				if (this.vars.onStart) if (this._totalTime !== 0 || this._duration === 0) if (!suppressEvents) {
					this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
				}
			}
			
			pt = this._firstPT;
			
			while (pt) 
			{
				if (pt.f) 
				{
					pt.t[pt.p](pt.c * this.ratio + pt.s);
				} 
				else 
				{
					var newVal = pt.c * this.ratio + pt.s;
				
					if (pt.p == "x")
					{
						pt.t.setX(newVal);
					}
					else if (pt.p == "y")
					{
						pt.t.setY(newVal);
					}
					else if (pt.p == "z")
					{
						pt.t.setZ(newVal);
					}
					else if (pt.p == "w")
					{
						pt.t.setWidth(newVal);
					}
					else if (pt.p == "h")
					{
						pt.t.setHeight(newVal);
					}
					else if (pt.p == "alpha")
					{
						pt.t.setAlpha(newVal);
					}
					else if (pt.p == "scale")
					{
						pt.t.setScale(newVal);
					}
					else
					{
						pt.t[pt.p] = newVal;
					}
				}
				
				pt = pt._next;
			}
			
			if (this._onUpdate) {
				if (time < 0) if (this._startAt) {
					this._startAt.render(time, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
				}
				if (!suppressEvents) {
					this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
				}
			}
			if (this._cycle !== prevCycle) if (!suppressEvents) if (!this._gc) if (this.vars.onRepeat) {
				this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || _blankArray);
			}
			if (callback) if (!this._gc) { //check gc because there's a chance that kill() could be called in an onUpdate
				if (time < 0 && this._startAt && !this._onUpdate) {
					this._startAt.render(time, suppressEvents, force);
				}
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
				}
			}
		};
		
//---- STATIC FUNCTIONS -----------------------------------------------------------------------------------------------------------
		
		TweenMax.to = function(target, duration, vars) {
			return new TweenMax(target, duration, vars);
		};
		
		TweenMax.from = function(target, duration, vars) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return new TweenMax(target, duration, vars);
		};
		
		TweenMax.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return new TweenMax(target, duration, toVars);
		};
		
		TweenMax.staggerTo = TweenMax.allTo = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			stagger = stagger || 0;
			var delay = vars.delay || 0,
				a = [],
				finalComplete = function() {
					if (vars.onComplete) {
						vars.onComplete.apply(vars.onCompleteScope || this, vars.onCompleteParams || _blankArray);
					}
					onCompleteAll.apply(onCompleteAllScope || this, onCompleteAllParams || _blankArray);
				},
				l, copy, i, p;
			if (!(targets instanceof Array)) {
				if (typeof(targets) === "string") {
					targets = TweenLite.selector(targets) || targets;
				}
				if (_isSelector(targets)) {
					targets = _slice.call(targets, 0);
				}
			}
			l = targets.length;
			for (i = 0; i < l; i++) {
				copy = {};
				for (p in vars) {
					copy[p] = vars[p];
				}
				copy.delay = delay;
				if (i === l - 1 && onCompleteAll) {
					copy.onComplete = finalComplete;
				}
				a[i] = new TweenMax(targets[i], duration, copy);
				delay += stagger;
			}
			return a;
		};
		
		TweenMax.staggerFrom = TweenMax.allFrom = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return TweenMax.staggerTo(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};
		
		TweenMax.staggerFromTo = TweenMax.allFromTo = function(targets, duration, fromVars, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return TweenMax.staggerTo(targets, duration, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};
				
		TweenMax.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new TweenMax(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, onCompleteScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, onReverseCompleteScope:scope, immediateRender:false, useFrames:useFrames, overwrite:0});
		};
		
		TweenMax.set = function(target, vars) {
			return new TweenMax(target, 0, vars);
		};
		
		TweenMax.isTweening = function(target) {
			var a = TweenLite.getTweensOf(target),
				i = a.length,
				tween;
			while (--i > -1) {
				tween = a[i];
				if (tween._active || (tween._startTime === tween._timeline._time && tween._timeline._active)) {
					return true;
				}
			}
			return false;
		};
		
		var _getChildrenOf = function(timeline, includeTimelines) {
				var a = [],
					cnt = 0,
					tween = timeline._first;
				while (tween) {
					if (tween instanceof TweenLite) {
						a[cnt++] = tween;
					} else {
						if (includeTimelines) {
							a[cnt++] = tween;
						}
						a = a.concat(_getChildrenOf(tween, includeTimelines));
						cnt = a.length;
					}
					tween = tween._next;
				}
				return a;
			}, 
			getAllTweens = TweenMax.getAllTweens = function(includeTimelines) {
				return _getChildrenOf(Animation._rootTimeline, includeTimelines).concat( _getChildrenOf(Animation._rootFramesTimeline, includeTimelines) );
			};
		
		TweenMax.killAll = function(complete, tweens, delayedCalls, timelines) {
			if (tweens == null) {
				tweens = true;
			}
			if (delayedCalls == null) {
				delayedCalls = true;
			}
			var a = getAllTweens((timelines != false)),
				l = a.length,
				allTrue = (tweens && delayedCalls && timelines),
				isDC, tween, i;
			for (i = 0; i < l; i++) {
				tween = a[i];
				if (allTrue || (tween instanceof SimpleTimeline) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
					if (complete) {
						tween.totalTime(tween.totalDuration());
					} else {
						tween._enabled(false, false);
					}
				}
			}
		};
		
		TweenMax.killChildTweensOf = function(parent, complete) {
			if (parent == null) {
				return;
			}
			var tl = TweenLite._tweenLookup,
				a, curParent, p, i, l;
			if (typeof(parent) === "string") {
				parent = TweenLite.selector(parent) || parent;
			}
			if (_isSelector(parent)) {
				parent = _slice(parent, 0);
			}
			if (parent instanceof Array) {
				i = parent.length;
				while (--i > -1) {
					TweenMax.killChildTweensOf(parent[i], complete);
				}
				return;
			}
			a = [];
			for (p in tl) {
				curParent = tl[p].target.parentNode;
				while (curParent) {
					if (curParent === parent) {
						a = a.concat(tl[p].tweens);
					}
					curParent = curParent.parentNode;
				}
			}
			l = a.length;
			for (i = 0; i < l; i++) {
				if (complete) {
					a[i].totalTime(a[i].totalDuration());
				}
				a[i]._enabled(false, false);
			}
		};

		var _changePause = function(pause, tweens, delayedCalls, timelines) {
			if (tweens === undefined) {
				tweens = true;
			}
			if (delayedCalls === undefined) {
				delayedCalls = true;
			}
			var a = getAllTweens(timelines),
				allTrue = (tweens && delayedCalls && timelines),
				i = a.length,
				isDC, tween;
			while (--i > -1) {
				tween = a[i];
				if (allTrue || (tween instanceof SimpleTimeline) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
					tween.paused(pause);
				}
			}
		};
		
		TweenMax.pauseAll = function(tweens, delayedCalls, timelines) {
			_changePause(true, tweens, delayedCalls, timelines);
		};
		
		TweenMax.resumeAll = function(tweens, delayedCalls, timelines) {
			_changePause(false, tweens, delayedCalls, timelines);
		};
		
	
//---- GETTERS / SETTERS ----------------------------------------------------------------------------------------------------------
		
		p.progress = function(value) {
			return (!arguments.length) ? this._time / this.duration() : this.totalTime( this.duration() * ((this._yoyo && (this._cycle & 1) !== 0) ? 1 - value : value) + (this._cycle * (this._duration + this._repeatDelay)), false);
		};
		
		p.totalProgress = function(value) {
			return (!arguments.length) ? this._totalTime / this.totalDuration() : this.totalTime( this.totalDuration() * value, false);
		};
		
		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			if (value > this._duration) {
				value = this._duration;
			}
			if (this._yoyo && (this._cycle & 1) !== 0) {
				value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));
			} else if (this._repeat !== 0) {
				value += this._cycle * (this._duration + this._repeatDelay);
			}
			return this.totalTime(value, suppressEvents);
		};

		p.duration = function(value) {
			if (!arguments.length) {
				return this._duration; //don't set _dirty = false because there could be repeats that haven't been factored into the _totalDuration yet. Otherwise, if you create a repeated TweenMax and then immediately check its duration(), it would cache the value and the totalDuration would not be correct, thus repeats wouldn't take effect.
			}
			return Animation.prototype.duration.call(this, value);
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					//instead of Infinity, we use 999999999999 so that we can accommodate reverses
					this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
					this._dirty = false;
				}
				return this._totalDuration;
			}
			return (this._repeat === -1) ? this : this.duration( (value - (this._repeat * this._repeatDelay)) / (this._repeat + 1) );
		};
		
		p.repeat = function(value) {
			if (!arguments.length) {
				return this._repeat;
			}
			this._repeat = value;
			return this._uncache(true);
		};
		
		p.repeatDelay = function(value) {
			if (!arguments.length) {
				return this._repeatDelay;
			}
			this._repeatDelay = value;
			return this._uncache(true);
		};
		
		p.yoyo = function(value) {
			if (!arguments.length) {
				return this._yoyo;
			}
			this._yoyo = value;
			return this;
		};
		
		
		return TweenMax;
		
	}, true);








/*
 * ----------------------------------------------------------------
 * TimelineLite
 * ----------------------------------------------------------------
 */
	window._gsDefine("TimelineLite", ["core.Animation","core.SimpleTimeline","TweenLite"], function(Animation, SimpleTimeline, TweenLite) {

		var TimelineLite = function(vars) {
				SimpleTimeline.call(this, vars);
				this._labels = {};
				this.autoRemoveChildren = (this.vars.autoRemoveChildren === true);
				this.smoothChildTiming = (this.vars.smoothChildTiming === true);
				this._sortChildren = true;
				this._onUpdate = this.vars.onUpdate;
				var v = this.vars,
					i = _paramProps.length,
					j, a;
				while (--i > -1) {
					a = v[_paramProps[i]];
					if (a) {
						j = a.length;
						while (--j > -1) {
							if (a[j] === "{self}") {
								a = v[_paramProps[i]] = a.concat(); //copy the array in case the user referenced the same array in multiple timelines/tweens (each {self} should be unique)
								a[j] = this;
							}
						}
					}
				}
				if (v.tweens instanceof Array) {
					this.add(v.tweens, 0, v.align, v.stagger);
				}
			},
			_paramProps = ["onStartParams","onUpdateParams","onCompleteParams","onReverseCompleteParams","onRepeatParams"],
			_blankArray = [],
			_copy = function(vars) {
				var copy = {}, p;
				for (p in vars) {
					copy[p] = vars[p];
				}
				return copy;
			},
			_slice = _blankArray.slice,
			p = TimelineLite.prototype = new SimpleTimeline();

		TimelineLite.version = "1.9.7";
		p.constructor = TimelineLite;
		p.kill()._gc = false;

		p.to = function(target, duration, vars, position) {
			return duration ? this.add( new TweenLite(target, duration, vars), position) : this.set(target, vars, position);
		};

		p.from = function(target, duration, vars, position) {
			return this.add( TweenLite.from(target, duration, vars), position);
		};

		p.fromTo = function(target, duration, fromVars, toVars, position) {
			return duration ? this.add( TweenLite.fromTo(target, duration, fromVars, toVars), position) : this.set(target, toVars, position);
		};

		p.staggerTo = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			var tl = new TimelineLite({onComplete:onCompleteAll, onCompleteParams:onCompleteAllParams, onCompleteScope:onCompleteAllScope}),
				i;
			if (typeof(targets) === "string") {
				targets = TweenLite.selector(targets) || targets;
			}
			if (!(targets instanceof Array) && targets.length && targets[0] && targets[0].nodeType && targets[0].style) { //senses if the targets object is a selector. If it is, we should translate it into an array.
				targets = _slice.call(targets, 0);
			}
			stagger = stagger || 0;
			for (i = 0; i < targets.length; i++) {
				if (vars.startAt) {
					vars.startAt = _copy(vars.startAt);
				}
				tl.to(targets[i], duration, _copy(vars), i * stagger);
			}
			return this.add(tl, position);
		};

		p.staggerFrom = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			vars.immediateRender = (vars.immediateRender != false);
			vars.runBackwards = true;
			return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.staggerFromTo = function(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.call = function(callback, params, scope, position) {
			return this.add( TweenLite.delayedCall(0, callback, params, scope), position);
		};

		p.set = function(target, vars, position) {
			position = this._parseTimeOrLabel(position, 0, true);
			if (vars.immediateRender == null) {
				vars.immediateRender = (position === this._time && !this._paused);
			}
			return this.add( new TweenLite(target, 0, vars), position);
		};

		TimelineLite.exportRoot = function(vars, ignoreDelayedCalls) {
			vars = vars || {};
			if (vars.smoothChildTiming == null) {
				vars.smoothChildTiming = true;
			}
			var tl = new TimelineLite(vars),
				root = tl._timeline,
				tween, next;
			if (ignoreDelayedCalls == null) {
				ignoreDelayedCalls = true;
			}
			root._remove(tl, true);
			tl._startTime = 0;
			tl._rawPrevTime = tl._time = tl._totalTime = root._time;
			tween = root._first;
			while (tween) {
				next = tween._next;
				if (!ignoreDelayedCalls || !(tween instanceof TweenLite && tween.target === tween.vars.onComplete)) {
					tl.add(tween, tween._startTime - tween._delay);
				}
				tween = next;
			}
			root.add(tl, 0);
			return tl;
		};

		p.add = function(value, position, align, stagger) {
			var curTime, l, i, child, tl;
			if (typeof(position) !== "number") {
				position = this._parseTimeOrLabel(position, 0, true, value);
			}
			if (!(value instanceof Animation)) {
				if (value instanceof Array) {
					align = align || "normal";
					stagger = stagger || 0;
					curTime = position;
					l = value.length;
					for (i = 0; i < l; i++) {
						if ((child = value[i]) instanceof Array) {
							child = new TimelineLite({tweens:child});
						}
						this.add(child, curTime);
						if (typeof(child) !== "string" && typeof(child) !== "function") {
							if (align === "sequence") {
								curTime = child._startTime + (child.totalDuration() / child._timeScale);
							} else if (align === "start") {
								child._startTime -= child.delay();
							}
						}
						curTime += stagger;
					}
					return this._uncache(true);
				} else if (typeof(value) === "string") {
					return this.addLabel(value, position);
				} else if (typeof(value) === "function") {
					value = TweenLite.delayedCall(0, value);
				} else {
					throw("Cannot add " + value + " into the timeline; it is neither a tween, timeline, function, nor a string.");
				}
			}

			SimpleTimeline.prototype.add.call(this, value, position);

			//if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly.
			if (this._gc) if (!this._paused) if (this._time === this._duration) if (this._time < this.duration()) {
				//in case any of the anscestors had completed but should now be enabled...
				tl = this;
				while (tl._gc && tl._timeline) {
					if (tl._timeline.smoothChildTiming) {
						tl.totalTime(tl._totalTime, true); //also enables them
					} else {
						tl._enabled(true, false);
					}
					tl = tl._timeline;
				}
			}

			return this;
		};

		p.remove = function(value) {
			if (value instanceof Animation) {
				return this._remove(value, false);
			} else if (value instanceof Array) {
				var i = value.length;
				while (--i > -1) {
					this.remove(value[i]);
				}
				return this;
			} else if (typeof(value) === "string") {
				return this.removeLabel(value);
			}
			return this.kill(null, value);
		};

		p.append = function(value, offsetOrLabel) {
			return this.add(value, this._parseTimeOrLabel(null, offsetOrLabel, true, value));
		};

		p.insert = p.insertMultiple = function(value, position, align, stagger) {
			return this.add(value, position || 0, align, stagger);
		};

		p.appendMultiple = function(tweens, offsetOrLabel, align, stagger) {
			return this.add(tweens, this._parseTimeOrLabel(null, offsetOrLabel, true, tweens), align, stagger);
		};

		p.addLabel = function(label, position) {
			this._labels[label] = this._parseTimeOrLabel(position);
			return this;
		};

		p.removeLabel = function(label) {
			delete this._labels[label];
			return this;
		};

		p.getLabelTime = function(label) {
			return (this._labels[label] != null) ? this._labels[label] : -1;
		};

		p._parseTimeOrLabel = function(timeOrLabel, offsetOrLabel, appendIfAbsent, ignore) {
			var i;
			//if we're about to add a tween/timeline (or an array of them) that's already a child of this timeline, we should remove it first so that it doesn't contaminate the duration().
			if (ignore instanceof Animation && ignore.timeline === this) {
				this.remove(ignore);
			} else if (ignore instanceof Array) {
				i = ignore.length;
				while (--i > -1) {
					if (ignore[i] instanceof Animation && ignore[i].timeline === this) {
						this.remove(ignore[i]);
					}
				}
			}
			if (typeof(offsetOrLabel) === "string") {
				return this._parseTimeOrLabel(offsetOrLabel, (appendIfAbsent && typeof(timeOrLabel) === "number" && this._labels[offsetOrLabel] == null) ? timeOrLabel - this.duration() : 0, appendIfAbsent);
			}
			offsetOrLabel = offsetOrLabel || 0;
			if (typeof(timeOrLabel) === "string" && (isNaN(timeOrLabel) || this._labels[timeOrLabel] != null)) { //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
				i = timeOrLabel.indexOf("=");
				if (i === -1) {
					if (this._labels[timeOrLabel] == null) {
						return appendIfAbsent ? (this._labels[timeOrLabel] = this.duration() + offsetOrLabel) : offsetOrLabel;
					}
					return this._labels[timeOrLabel] + offsetOrLabel;
				}
				offsetOrLabel = parseInt(timeOrLabel.charAt(i-1) + "1", 10) * Number(timeOrLabel.substr(i+1));
				timeOrLabel = (i > 1) ? this._parseTimeOrLabel(timeOrLabel.substr(0, i-1), 0, appendIfAbsent) : this.duration();
			} else if (timeOrLabel == null) {
				timeOrLabel = this.duration();
			}
			return Number(timeOrLabel) + offsetOrLabel;
		};

		p.seek = function(position, suppressEvents) {
			return this.totalTime((typeof(position) === "number") ? position : this._parseTimeOrLabel(position), (suppressEvents !== false));
		};

		p.stop = function() {
			return this.paused(true);
		};

		p.gotoAndPlay = function(position, suppressEvents) {
			return this.play(position, suppressEvents);
		};

		p.gotoAndStop = function(position, suppressEvents) {
			return this.pause(position, suppressEvents);
		};

		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			this._active = !this._paused;
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				prevTime = this._time,
				prevStart = this._startTime,
				prevTimeScale = this._timeScale,
				prevPaused = this._paused,
				tween, isComplete, next, callback, internalForce;
			if (time >= totalDur) {
				this._totalTime = this._time = totalDur;
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					if (this._duration === 0) if (time === 0 || this._rawPrevTime < 0) if (this._rawPrevTime !== time && this._first) { //In order to accommodate zero-duration timelines, we must discern the momentum/direction of time in order to render values properly when the "playhead" goes past 0 in the forward direction or lands directly on it, and also when it moves past it in the backward direction (from a postitive time to a negative time).
						internalForce = true;
						if (this._rawPrevTime > 0) {
							callback = "onReverseComplete";
						}
					}
				}
				this._rawPrevTime = time;
				time = totalDur + 0.000001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off)

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;
				if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._duration === 0) if (this._rawPrevTime >= 0 && this._first) { //zero-duration timelines are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						internalForce = true;
					}
				} else if (!this._initted) {
					internalForce = true;
				}
				this._rawPrevTime = time;
				time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)

			} else {
				this._totalTime = this._time = this._rawPrevTime = time;
			}
			if ((this._time === prevTime || !this._first) && !force && !internalForce) {
				return;
			} else if (!this._initted) {
				this._initted = true;
			}
			if (prevTime === 0) if (this.vars.onStart) if (this._time !== 0) if (!suppressEvents) {
				this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
			}

			if (this._time >= prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering
						break;
					} else if (tween._active || (tween._startTime <= this._time && !tween._paused && !tween._gc)) {

						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}

					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {

						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}

					}
					tween = next;
				}
			}

			if (this._onUpdate) if (!suppressEvents) {
				this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
			}

			if (callback) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
				}
			}
		};

		p._hasPausedChild = function() {
			var tween = this._first;
			while (tween) {
				if (tween._paused || ((tween instanceof TimelineLite) && tween._hasPausedChild())) {
					return true;
				}
				tween = tween._next;
			}
			return false;
		};

		p.getChildren = function(nested, tweens, timelines, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || -9999999999;
			var a = [],
				tween = this._first,
				cnt = 0;
			while (tween) {
				if (tween._startTime < ignoreBeforeTime) {
					//do nothing
				} else if (tween instanceof TweenLite) {
					if (tweens !== false) {
						a[cnt++] = tween;
					}
				} else {
					if (timelines !== false) {
						a[cnt++] = tween;
					}
					if (nested !== false) {
						a = a.concat(tween.getChildren(true, tweens, timelines));
						cnt = a.length;
					}
				}
				tween = tween._next;
			}
			return a;
		};

		p.getTweensOf = function(target, nested) {
			var tweens = TweenLite.getTweensOf(target),
				i = tweens.length,
				a = [],
				cnt = 0;
			while (--i > -1) {
				if (tweens[i].timeline === this || (nested && this._contains(tweens[i]))) {
					a[cnt++] = tweens[i];
				}
			}
			return a;
		};

		p._contains = function(tween) {
			var tl = tween.timeline;
			while (tl) {
				if (tl === this) {
					return true;
				}
				tl = tl.timeline;
			}
			return false;
		};

		p.shiftChildren = function(amount, adjustLabels, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || 0;
			var tween = this._first,
				labels = this._labels,
				p;
			while (tween) {
				if (tween._startTime >= ignoreBeforeTime) {
					tween._startTime += amount;
				}
				tween = tween._next;
			}
			if (adjustLabels) {
				for (p in labels) {
					if (labels[p] >= ignoreBeforeTime) {
						labels[p] += amount;
					}
				}
			}
			return this._uncache(true);
		};

		p._kill = function(vars, target) {
			if (!vars && !target) {
				return this._enabled(false, false);
			}
			var tweens = (!target) ? this.getChildren(true, true, false) : this.getTweensOf(target),
				i = tweens.length,
				changed = false;
			while (--i > -1) {
				if (tweens[i]._kill(vars, target)) {
					changed = true;
				}
			}
			return changed;
		};

		p.clear = function(labels) {
			var tweens = this.getChildren(false, true, true),
				i = tweens.length;
			this._time = this._totalTime = 0;
			while (--i > -1) {
				tweens[i]._enabled(false, false);
			}
			if (labels !== false) {
				this._labels = {};
			}
			return this._uncache(true);
		};

		p.invalidate = function() {
			var tween = this._first;
			while (tween) {
				tween.invalidate();
				tween = tween._next;
			}
			return this;
		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (enabled === this._gc) {
				var tween = this._first;
				while (tween) {
					tween._enabled(enabled, true);
					tween = tween._next;
				}
			}
			return SimpleTimeline.prototype._enabled.call(this, enabled, ignoreTimeline);
		};

		p.progress = function(value) {
			return (!arguments.length) ? this._time / this.duration() : this.totalTime(this.duration() * value, false);
		};

		p.duration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					this.totalDuration(); //just triggers recalculation
				}
				return this._duration;
			}
			if (this.duration() !== 0 && value !== 0) {
				this.timeScale(this._duration / value);
			}
			return this;
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					var max = 0,
						tween = this._last,
						prevStart = 999999999999,
						prev, end;
					while (tween) {
						prev = tween._prev; //record it here in case the tween changes position in the sequence...
						if (tween._dirty) {
							tween.totalDuration(); //could change the tween._startTime, so make sure the tween's cache is clean before analyzing it.
						}
						if (tween._startTime > prevStart && this._sortChildren && !tween._paused) { //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
							this.add(tween, tween._startTime - tween._delay);
						} else {
							prevStart = tween._startTime;
						}
						if (tween._startTime < 0 && !tween._paused) { //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
							max -= tween._startTime;
							if (this._timeline.smoothChildTiming) {
								this._startTime += tween._startTime / this._timeScale;
							}
							this.shiftChildren(-tween._startTime, false, -9999999999);
							prevStart = 0;
						}
						end = tween._startTime + (tween._totalDuration / tween._timeScale);
						if (end > max) {
							max = end;
						}
						tween = prev;
					}
					this._duration = this._totalDuration = max;
					this._dirty = false;
				}
				return this._totalDuration;
			}
			if (this.totalDuration() !== 0) if (value !== 0) {
				this.timeScale(this._totalDuration / value);
			}
			return this;
		};

		p.usesFrames = function() {
			var tl = this._timeline;
			while (tl._timeline) {
				tl = tl._timeline;
			}
			return (tl === Animation._rootFramesTimeline);
		};

		p.rawTime = function() {
			return (this._paused || (this._totalTime !== 0 && this._totalTime !== this._totalDuration)) ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale;
		};

		return TimelineLite;

	}, true);
	







	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * TimelineMax
 * ----------------------------------------------------------------
 */
	window._gsDefine("TimelineMax", ["TimelineLite","TweenLite","easing.Ease"], function(TimelineLite, TweenLite, Ease) {

		var TimelineMax = function(vars) {
				TimelineLite.call(this, vars);
				this._repeat = this.vars.repeat || 0;
				this._repeatDelay = this.vars.repeatDelay || 0;
				this._cycle = 0;
				this._yoyo = (this.vars.yoyo === true);
				this._dirty = true;
			},
			_blankArray = [],
			_easeNone = new Ease(null, null, 1, 0),
			_getGlobalPaused = function(tween) {
				while (tween) {
					if (tween._paused) {
						return true;
					}
					tween = tween._timeline;
				}
				return false;
			},
			p = TimelineMax.prototype = new TimelineLite();

		p.constructor = TimelineMax;
		p.kill()._gc = false;
		TimelineMax.version = "1.9.7";

		p.invalidate = function() {
			this._yoyo = (this.vars.yoyo === true);
			this._repeat = this.vars.repeat || 0;
			this._repeatDelay = this.vars.repeatDelay || 0;
			this._uncache(true);
			return TimelineLite.prototype.invalidate.call(this);
		};

		p.addCallback = function(callback, position, params, scope) {
			return this.add( TweenLite.delayedCall(0, callback, params, scope), position);
		};

		p.removeCallback = function(callback, position) {
			if (position == null) {
				this._kill(null, callback);
			} else {
				var a = this.getTweensOf(callback, false),
					i = a.length,
					time = this._parseTimeOrLabel(position);
				while (--i > -1) {
					if (a[i]._startTime === time) {
						a[i]._enabled(false, false);
					}
				}
			}
			return this;
		};

		p.tweenTo = function(position, vars) {
			vars = vars || {};
			var copy = {ease:_easeNone, overwrite:2, useFrames:this.usesFrames(), immediateRender:false}, p, t;
			for (p in vars) {
				copy[p] = vars[p];
			}
			copy.time = this._parseTimeOrLabel(position);
			t = new TweenLite(this, (Math.abs(Number(copy.time) - this._time) / this._timeScale) || 0.001, copy);
			copy.onStart = function() {
				t.target.paused(true);
				if (t.vars.time !== t.target.time()) { //don't make the duration zero - if it's supposed to be zero, don't worry because it's already initting the tween and will complete immediately, effectively making the duration zero anyway. If we make duration zero, the tween won't run at all.
					t.duration( Math.abs( t.vars.time - t.target.time()) / t.target._timeScale );
				}
				if (vars.onStart) { //in case the user had an onStart in the vars - we don't want to overwrite it.
					vars.onStart.apply(vars.onStartScope || t, vars.onStartParams || _blankArray);
				}
			};
			return t;
		};

		p.tweenFromTo = function(fromPosition, toPosition, vars) {
			vars = vars || {};
			fromPosition = this._parseTimeOrLabel(fromPosition);
			vars.startAt = {onComplete:this.seek, onCompleteParams:[fromPosition], onCompleteScope:this};
			vars.immediateRender = (vars.immediateRender !== false);
			var t = this.tweenTo(toPosition, vars);
			return t.duration((Math.abs( t.vars.time - fromPosition) / this._timeScale) || 0.001);
		};

		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			this._active = !this._paused;
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				dur = this._duration,
				prevTime = this._time,
				prevTotalTime = this._totalTime,
				prevStart = this._startTime,
				prevTimeScale = this._timeScale,
				prevRawPrevTime = this._rawPrevTime,
				prevPaused = this._paused,
				prevCycle = this._cycle,
				tween, isComplete, next, callback, internalForce, cycleDuration;
			if (time >= totalDur) {
				if (!this._locked) {
					this._totalTime = totalDur;
					this._cycle = this._repeat;
				}
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					if (dur === 0) if (time === 0 || this._rawPrevTime < 0) if (this._rawPrevTime !== time && this._first) { //In order to accommodate zero-duration timelines, we must discern the momentum/direction of time in order to render values properly when the "playhead" goes past 0 in the forward direction or lands directly on it, and also when it moves past it in the backward direction (from a postitive time to a negative time).
						internalForce = true;
						if (this._rawPrevTime > 0) {
							callback = "onReverseComplete";
						}
					}
				}
				this._rawPrevTime = time;
				if (this._yoyo && (this._cycle & 1) !== 0) {
					this._time = time = 0;
				} else {
					this._time = dur;
					time = dur + 0.000001; //to avoid occasional floating point rounding errors
				}

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				if (!this._locked) {
					this._totalTime = this._cycle = 0;
				}
				this._time = 0;
				if (prevTime !== 0 || (dur === 0 && this._rawPrevTime > 0 && !this._locked)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (dur === 0) if (this._rawPrevTime >= 0 && this._first) { //zero-duration timelines are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						internalForce = true;
					}
				} else if (!this._initted) {
					internalForce = true;
				}
				this._rawPrevTime = time;
				time = 0;  //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)

			} else {
				this._time = this._rawPrevTime = time;
				if (!this._locked) {
					this._totalTime = time;
					if (this._repeat !== 0) {
						cycleDuration = dur + this._repeatDelay;
						this._cycle = (this._totalTime / cycleDuration) >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but it gets reported as 0.79999999!)
						if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration) {
							this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
						}
						this._time = this._totalTime - (this._cycle * cycleDuration);
						if (this._yoyo) if ((this._cycle & 1) !== 0) {
							this._time = dur - this._time;
						}
						if (this._time > dur) {
							this._time = dur;
							time = dur + 0.000001; //to avoid occasional floating point rounding error
						} else if (this._time < 0) {
							this._time = time = 0;
						} else {
							time = this._time;
						}
					}
				}
			}

			if (this._cycle !== prevCycle) if (!this._locked) {
				/*
				make sure children at the end/beginning of the timeline are rendered properly. If, for example,
				a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
				would get transated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
				could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
				we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
				ensure that zero-duration tweens at the very beginning or end of the TimelineMax work.
				*/
				var backwards = (this._yoyo && (prevCycle & 1) !== 0),
					wrap = (backwards === (this._yoyo && (this._cycle & 1) !== 0)),
					recTotalTime = this._totalTime,
					recCycle = this._cycle,
					recRawPrevTime = this._rawPrevTime,
					recTime = this._time;

				this._totalTime = prevCycle * dur;
				if (this._cycle < prevCycle) {
					backwards = !backwards;
				} else {
					this._totalTime += dur;
				}
				this._time = prevTime; //temporarily revert _time so that render() renders the children in the correct order. Without this, tweens won't rewind correctly. We could arhictect things in a "cleaner" way by splitting out the rendering queue into a separate method but for performance reasons, we kept it all inside this method.

				this._rawPrevTime = (dur === 0) ? prevRawPrevTime - 0.00001 : prevRawPrevTime;
				this._cycle = prevCycle;
				this._locked = true; //prevents changes to totalTime and skips repeat/yoyo behavior when we recursively call render()
				prevTime = (backwards) ? 0 : dur;
				this.render(prevTime, suppressEvents, (dur === 0));
				if (!suppressEvents) if (!this._gc) {
					if (this.vars.onRepeat) {
						this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || _blankArray);
					}
				}
				if (wrap) {
					prevTime = (backwards) ? dur + 0.000001 : -0.000001;
					this.render(prevTime, true, false);
				}
				this._time = recTime;
				this._totalTime = recTotalTime;
				this._cycle = recCycle;
				this._rawPrevTime = recRawPrevTime;
				this._locked = false;
			}

			if ((this._time === prevTime || !this._first) && !force && !internalForce) {
				if (prevTotalTime !== this._totalTime) if (this._onUpdate) if (!suppressEvents) { //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
					this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
				}
				return;
			} else if (!this._initted) {
				this._initted = true;
			}

			if (prevTotalTime === 0) if (this.vars.onStart) if (this._totalTime !== 0) if (!suppressEvents) {
				this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
			}

			if (this._time >= prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering
						break;
					} else if (tween._active || (tween._startTime <= this._time && !tween._paused && !tween._gc)) {
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}

					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}

					}
					tween = next;
				}
			}

			if (this._onUpdate) if (!suppressEvents) {
				this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
			}
			if (callback) if (!this._locked) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
				}
			}
		};

		p.getActive = function(nested, tweens, timelines) {
			if (nested == null) {
				nested = true;
			}
			if (tweens == null) {
				tweens = true;
			}
			if (timelines == null) {
				timelines = false;
			}
			var a = [],
				all = this.getChildren(nested, tweens, timelines),
				cnt = 0,
				l = all.length,
				i, tween;
			for (i = 0; i < l; i++) {
				tween = all[i];
				//note: we cannot just check tween.active because timelines that contain paused children will continue to have "active" set to true even after the playhead passes their end point (technically a timeline can only be considered complete after all of its children have completed too, but paused tweens are...well...just waiting and until they're unpaused we don't know where their end point will be).
				if (!tween._paused) if (tween._timeline._time >= tween._startTime) if (tween._timeline._time < tween._startTime + tween._totalDuration / tween._timeScale) if (!_getGlobalPaused(tween._timeline)) {
					a[cnt++] = tween;
				}
			}
			return a;
		};


		p.getLabelAfter = function(time) {
			if (!time) if (time !== 0) { //faster than isNan()
				time = this._time;
			}
			var labels = this.getLabelsArray(),
				l = labels.length,
				i;
			for (i = 0; i < l; i++) {
				if (labels[i].time > time) {
					return labels[i].name;
				}
			}
			return null;
		};

		p.getLabelBefore = function(time) {
			if (time == null) {
				time = this._time;
			}
			var labels = this.getLabelsArray(),
				i = labels.length;
			while (--i > -1) {
				if (labels[i].time < time) {
					return labels[i].name;
				}
			}
			return null;
		};

		p.getLabelsArray = function() {
			var a = [],
				cnt = 0,
				p;
			for (p in this._labels) {
				a[cnt++] = {time:this._labels[p], name:p};
			}
			a.sort(function(a,b) {
				return a.time - b.time;
			});
			return a;
		};


//---- GETTERS / SETTERS -------------------------------------------------------------------------------------------------------

		p.progress = function(value) {
			return (!arguments.length) ? this._time / this.duration() : this.totalTime( this.duration() * ((this._yoyo && (this._cycle & 1) !== 0) ? 1 - value : value) + (this._cycle * (this._duration + this._repeatDelay)), false);
		};

		p.totalProgress = function(value) {
			return (!arguments.length) ? this._totalTime / this.totalDuration() : this.totalTime( this.totalDuration() * value, false);
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					TimelineLite.prototype.totalDuration.call(this); //just forces refresh
					//Instead of Infinity, we use 999999999999 so that we can accommodate reverses.
					this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
				}
				return this._totalDuration;
			}
			return (this._repeat === -1) ? this : this.duration( (value - (this._repeat * this._repeatDelay)) / (this._repeat + 1) );
		};

		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			if (value > this._duration) {
				value = this._duration;
			}
			if (this._yoyo && (this._cycle & 1) !== 0) {
				value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));
			} else if (this._repeat !== 0) {
				value += this._cycle * (this._duration + this._repeatDelay);
			}
			return this.totalTime(value, suppressEvents);
		};

		p.repeat = function(value) {
			if (!arguments.length) {
				return this._repeat;
			}
			this._repeat = value;
			return this._uncache(true);
		};

		p.repeatDelay = function(value) {
			if (!arguments.length) {
				return this._repeatDelay;
			}
			this._repeatDelay = value;
			return this._uncache(true);
		};

		p.yoyo = function(value) {
			if (!arguments.length) {
				return this._yoyo;
			}
			this._yoyo = value;
			return this;
		};

		p.currentLabel = function(value) {
			if (!arguments.length) {
				return this.getLabelBefore(this._time + 0.00000001);
			}
			return this.seek(value, true);
		};

		return TimelineMax;

	}, true);
	




	
	
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * BezierPlugin
 * ----------------------------------------------------------------
 */
	(function() {

		var _RAD2DEG = 180 / Math.PI,
			_DEG2RAD = Math.PI / 180,
			_r1 = [],
			_r2 = [],
			_r3 = [],
			_corProps = {},
			Segment = function(a, b, c, d) {
				this.a = a;
				this.b = b;
				this.c = c;
				this.d = d;
				this.da = d - a;
				this.ca = c - a;
				this.ba = b - a;
			},
			_correlate = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
			cubicToQuadratic = function(a, b, c, d) {
				var q1 = {a:a},
					q2 = {},
					q3 = {},
					q4 = {c:d},
					mab = (a + b) / 2,
					mbc = (b + c) / 2,
					mcd = (c + d) / 2,
					mabc = (mab + mbc) / 2,
					mbcd = (mbc + mcd) / 2,
					m8 = (mbcd - mabc) / 8;
				q1.b = mab + (a - mab) / 4;
				q2.b = mabc + m8;
				q1.c = q2.a = (q1.b + q2.b) / 2;
				q2.c = q3.a = (mabc + mbcd) / 2;
				q3.b = mbcd - m8;
				q4.b = mcd + (d - mcd) / 4;
				q3.c = q4.a = (q3.b + q4.b) / 2;
				return [q1, q2, q3, q4];
			},
			_calculateControlPoints = function(a, curviness, quad, basic, correlate) {
				var l = a.length - 1,
					ii = 0,
					cp1 = a[0].a,
					i, p1, p2, p3, seg, m1, m2, mm, cp2, qb, r1, r2, tl;
				for (i = 0; i < l; i++) {
					seg = a[ii];
					p1 = seg.a;
					p2 = seg.d;
					p3 = a[ii+1].d;

					if (correlate) {
						r1 = _r1[i];
						r2 = _r2[i];
						tl = ((r2 + r1) * curviness * 0.25) / (basic ? 0.5 : _r3[i] || 0.5);
						m1 = p2 - (p2 - p1) * (basic ? curviness * 0.5 : (r1 !== 0 ? tl / r1 : 0));
						m2 = p2 + (p3 - p2) * (basic ? curviness * 0.5 : (r2 !== 0 ? tl / r2 : 0));
						mm = p2 - (m1 + (((m2 - m1) * ((r1 * 3 / (r1 + r2)) + 0.5) / 4) || 0));
					} else {
						m1 = p2 - (p2 - p1) * curviness * 0.5;
						m2 = p2 + (p3 - p2) * curviness * 0.5;
						mm = p2 - (m1 + m2) / 2;
					}
					m1 += mm;
					m2 += mm;

					seg.c = cp2 = m1;
					if (i !== 0) {
						seg.b = cp1;
					} else {
						seg.b = cp1 = seg.a + (seg.c - seg.a) * 0.6; //instead of placing b on a exactly, we move it inline with c so that if the user specifies an ease like Back.easeIn or Elastic.easeIn which goes BEYOND the beginning, it will do so smoothly.
					}

					seg.da = p2 - p1;
					seg.ca = cp2 - p1;
					seg.ba = cp1 - p1;

					if (quad) {
						qb = cubicToQuadratic(p1, cp1, cp2, p2);
						a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
						ii += 4;
					} else {
						ii++;
					}

					cp1 = m2;
				}
				seg = a[ii];
				seg.b = cp1;
				seg.c = cp1 + (seg.d - cp1) * 0.4; //instead of placing c on d exactly, we move it inline with b so that if the user specifies an ease like Back.easeOut or Elastic.easeOut which goes BEYOND the end, it will do so smoothly.
				seg.da = seg.d - seg.a;
				seg.ca = seg.c - seg.a;
				seg.ba = cp1 - seg.a;
				if (quad) {
					qb = cubicToQuadratic(seg.a, cp1, seg.c, seg.d);
					a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
				}
			},
			_parseAnchors = function(values, p, correlate, prepend) {
				var a = [],
					l, i, p1, p2, p3, tmp;
				if (prepend) {
					values = [prepend].concat(values);
					i = values.length;
					while (--i > -1) {
						if (typeof( (tmp = values[i][p]) ) === "string") if (tmp.charAt(1) === "=") {
							values[i][p] = prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)); //accommodate relative values. Do it inline instead of breaking it out into a function for speed reasons
						}
					}
				}
				l = values.length - 2;
				if (l < 0) {
					a[0] = new Segment(values[0][p], 0, 0, values[(l < -1) ? 0 : 1][p]);
					return a;
				}
				for (i = 0; i < l; i++) {
					p1 = values[i][p];
					p2 = values[i+1][p];
					a[i] = new Segment(p1, 0, 0, p2);
					if (correlate) {
						p3 = values[i+2][p];
						_r1[i] = (_r1[i] || 0) + (p2 - p1) * (p2 - p1);
						_r2[i] = (_r2[i] || 0) + (p3 - p2) * (p3 - p2);
					}
				}
				a[i] = new Segment(values[i][p], 0, 0, values[i+1][p]);
				return a;
			},
			bezierThrough = function(values, curviness, quadratic, basic, correlate, prepend) {
				var obj = {},
					props = [],
					first = prepend || values[0],
					i, p, a, j, r, l, seamless, last;
				correlate = (typeof(correlate) === "string") ? ","+correlate+"," : _correlate;
				if (curviness == null) {
					curviness = 1;
				}
				for (p in values[0]) {
					props.push(p);
				}
				//check to see if the last and first values are identical (well, within 0.05). If so, make seamless by appending the second element to the very end of the values array and the 2nd-to-last element to the very beginning (we'll remove those segments later)
				if (values.length > 1) {
					last = values[values.length - 1];
					seamless = true;
					i = props.length;
					while (--i > -1) {
						p = props[i];
						if (Math.abs(first[p] - last[p]) > 0.05) { //build in a tolerance of +/-0.05 to accommodate rounding errors. For example, if you set an object's position to 4.945, Flash will make it 4.9
							seamless = false;
							break;
						}
					}
					if (seamless) {
						values = values.concat(); //duplicate the array to avoid contaminating the original which the user may be reusing for other tweens
						if (prepend) {
							values.unshift(prepend);
						}
						values.push(values[1]);
						prepend = values[values.length - 3];
					}
				}
				_r1.length = _r2.length = _r3.length = 0;
				i = props.length;
				while (--i > -1) {
					p = props[i];
					_corProps[p] = (correlate.indexOf(","+p+",") !== -1);
					obj[p] = _parseAnchors(values, p, _corProps[p], prepend);
				}
				i = _r1.length;
				while (--i > -1) {
					_r1[i] = Math.sqrt(_r1[i]);
					_r2[i] = Math.sqrt(_r2[i]);
				}
				if (!basic) {
					i = props.length;
					while (--i > -1) {
						if (_corProps[p]) {
							a = obj[props[i]];
							l = a.length - 1;
							for (j = 0; j < l; j++) {
								r = a[j+1].da / _r2[j] + a[j].da / _r1[j];
								_r3[j] = (_r3[j] || 0) + r * r;
							}
						}
					}
					i = _r3.length;
					while (--i > -1) {
						_r3[i] = Math.sqrt(_r3[i]);
					}
				}
				i = props.length;
				j = quadratic ? 4 : 1;
				while (--i > -1) {
					p = props[i];
					a = obj[p];
					_calculateControlPoints(a, curviness, quadratic, basic, _corProps[p]); //this method requires that _parseAnchors() and _setSegmentRatios() ran first so that _r1, _r2, and _r3 values are populated for all properties
					if (seamless) {
						a.splice(0, j);
						a.splice(a.length - j, j);
					}
				}
				return obj;
			},
			_parseBezierData = function(values, type, prepend) {
				type = type || "soft";
				var obj = {},
					inc = (type === "cubic") ? 3 : 2,
					soft = (type === "soft"),
					props = [],
					a, b, c, d, cur, i, j, l, p, cnt, tmp;
				if (soft && prepend) {
					values = [prepend].concat(values);
				}
				if (values == null || values.length < inc + 1) { throw "invalid Bezier data"; }
				for (p in values[0]) {
					props.push(p);
				}
				i = props.length;
				while (--i > -1) {
					p = props[i];
					obj[p] = cur = [];
					cnt = 0;
					l = values.length;
					for (j = 0; j < l; j++) {
						a = (prepend == null) ? values[j][p] : (typeof( (tmp = values[j][p]) ) === "string" && tmp.charAt(1) === "=") ? prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)) : Number(tmp);
						if (soft) if (j > 1) if (j < l - 1) {
							cur[cnt++] = (a + cur[cnt-2]) / 2;
						}
						cur[cnt++] = a;
					}
					l = cnt - inc + 1;
					cnt = 0;
					for (j = 0; j < l; j += inc) {
						a = cur[j];
						b = cur[j+1];
						c = cur[j+2];
						d = (inc === 2) ? 0 : cur[j+3];
						cur[cnt++] = tmp = (inc === 3) ? new Segment(a, b, c, d) : new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
					}
					cur.length = cnt;
				}
				return obj;
			},
			_addCubicLengths = function(a, steps, resolution) {
				var inc = 1 / resolution,
					j = a.length,
					d, d1, s, da, ca, ba, p, i, inv, bez, index;
				while (--j > -1) {
					bez = a[j];
					s = bez.a;
					da = bez.d - s;
					ca = bez.c - s;
					ba = bez.b - s;
					d = d1 = 0;
					for (i = 1; i <= resolution; i++) {
						p = inc * i;
						inv = 1 - p;
						d = d1 - (d1 = (p * p * da + 3 * inv * (p * ca + inv * ba)) * p);
						index = j * resolution + i - 1;
						steps[index] = (steps[index] || 0) + d * d;
					}
				}
			},
			_parseLengthData = function(obj, resolution) {
				resolution = resolution >> 0 || 6;
				var a = [],
					lengths = [],
					d = 0,
					total = 0,
					threshold = resolution - 1,
					segments = [],
					curLS = [], //current length segments array
					p, i, l, index;
				for (p in obj) {
					_addCubicLengths(obj[p], a, resolution);
				}
				l = a.length;
				for (i = 0; i < l; i++) {
					d += Math.sqrt(a[i]);
					index = i % resolution;
					curLS[index] = d;
					if (index === threshold) {
						total += d;
						index = (i / resolution) >> 0;
						segments[index] = curLS;
						lengths[index] = total;
						d = 0;
						curLS = [];
					}
				}
				return {length:total, lengths:lengths, segments:segments};
			},



			BezierPlugin = window._gsDefine.plugin({
					propName: "bezier",
					priority: -1,
					API: 2,
					global:true,

					//gets called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
					init: function(target, vars, tween) {
						this._target = target;
						if (vars instanceof Array) {
							vars = {values:vars};
						}
						this._func = {};
						this._round = {};
						this._props = [];
						this._timeRes = (vars.timeResolution == null) ? 6 : parseInt(vars.timeResolution, 10);
						var values = vars.values || [],
							first = {},
							second = values[0],
							autoRotate = vars.autoRotate || tween.vars.orientToBezier,
							p, isFunc, i, j, prepend;

						this._autoRotate = autoRotate ? (autoRotate instanceof Array) ? autoRotate : [["x","y","rotation",((autoRotate === true) ? 0 : Number(autoRotate) || 0)]] : null;
						for (p in second) {
							this._props.push(p);
						}

						i = this._props.length;
						while (--i > -1) {
							p = this._props[i];

							this._overwriteProps.push(p);
							isFunc = this._func[p] = (typeof(target[p]) === "function");
							first[p] = (!isFunc) ? parseFloat(target[p]) : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]();
							if (!prepend) if (first[p] !== values[0][p]) {
								prepend = first;
							}
						}
						this._beziers = (vars.type !== "cubic" && vars.type !== "quadratic" && vars.type !== "soft") ? bezierThrough(values, isNaN(vars.curviness) ? 1 : vars.curviness, false, (vars.type === "thruBasic"), vars.correlate, prepend) : _parseBezierData(values, vars.type, first);
						this._segCount = this._beziers[p].length;

						if (this._timeRes) {
							var ld = _parseLengthData(this._beziers, this._timeRes);
							this._length = ld.length;
							this._lengths = ld.lengths;
							this._segments = ld.segments;
							this._l1 = this._li = this._s1 = this._si = 0;
							this._l2 = this._lengths[0];
							this._curSeg = this._segments[0];
							this._s2 = this._curSeg[0];
							this._prec = 1 / this._curSeg.length;
						}

						if ((autoRotate = this._autoRotate)) {
							if (!(autoRotate[0] instanceof Array)) {
								this._autoRotate = autoRotate = [autoRotate];
							}
							i = autoRotate.length;
							while (--i > -1) {
								for (j = 0; j < 3; j++) {
									p = autoRotate[i][j];
									this._func[p] = (typeof(target[p]) === "function") ? target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ] : false;
								}
							}
						}
						return true;
					},

					//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
					set: function(v) {
						var segments = this._segCount,
							func = this._func,
							target = this._target,
							curIndex, inv, i, p, b, t, val, l, lengths, curSeg;
						if (!this._timeRes) {
							curIndex = (v < 0) ? 0 : (v >= 1) ? segments - 1 : (segments * v) >> 0;
							t = (v - (curIndex * (1 / segments))) * segments;
						} else {
							lengths = this._lengths;
							curSeg = this._curSeg;
							v *= this._length;
							i = this._li;
							//find the appropriate segment (if the currently cached one isn't correct)
							if (v > this._l2 && i < segments - 1) {
								l = segments - 1;
								while (i < l && (this._l2 = lengths[++i]) <= v) {	}
								this._l1 = lengths[i-1];
								this._li = i;
								this._curSeg = curSeg = this._segments[i];
								this._s2 = curSeg[(this._s1 = this._si = 0)];
							} else if (v < this._l1 && i > 0) {
								while (i > 0 && (this._l1 = lengths[--i]) >= v) { }
								if (i === 0 && v < this._l1) {
									this._l1 = 0;
								} else {
									i++;
								}
								this._l2 = lengths[i];
								this._li = i;
								this._curSeg = curSeg = this._segments[i];
								this._s1 = curSeg[(this._si = curSeg.length - 1) - 1] || 0;
								this._s2 = curSeg[this._si];
							}
							curIndex = i;
							//now find the appropriate sub-segment (we split it into the number of pieces that was defined by "precision" and measured each one)
							v -= this._l1;
							i = this._si;
							if (v > this._s2 && i < curSeg.length - 1) {
								l = curSeg.length - 1;
								while (i < l && (this._s2 = curSeg[++i]) <= v) {	}
								this._s1 = curSeg[i-1];
								this._si = i;
							} else if (v < this._s1 && i > 0) {
								while (i > 0 && (this._s1 = curSeg[--i]) >= v) {	}
								if (i === 0 && v < this._s1) {
									this._s1 = 0;
								} else {
									i++;
								}
								this._s2 = curSeg[i];
								this._si = i;
							}
							t = (i + (v - this._s1) / (this._s2 - this._s1)) * this._prec;
						}
						inv = 1 - t;

						i = this._props.length;
						while (--i > -1) {
							p = this._props[i];
							b = this._beziers[p][curIndex];
							val = (t * t * b.da + 3 * inv * (t * b.ca + inv * b.ba)) * t + b.a;
							if (this._round[p]) {
								val = (val + ((val > 0) ? 0.5 : -0.5)) >> 0;
							}
							if (func[p]) {
								target[p](val);
							} else {
								if (p == "x")
								{
									target.setX(val);
								}
								else if (p == "y")
								{
									target.setY(val);
								}
								else if (p == "z")
								{
									target.setZ(val);
								}
								else if (p == "angleX")
								{
									target.setAngleX(val);
								}
								else if (p == "angleY")
								{
									target.setAngleY(val);
								}
								else if (p == "angleZ")
								{
									target.setAngleZ(val);
								}
								else if (p == "w")
								{
									target.setWidth(val);
								}
								else if (p == "h")
								{
									target.setHeight(val);
								}
								else if (p == "alpha")
								{
									target.setAlpha(val);
								}
								else if (p == "scale")
								{
									target.setScale2(val);
								}
								else
								{
									target[p] = val;
								}
							}
						}

						if (this._autoRotate) {
							var ar = this._autoRotate,
								b2, x1, y1, x2, y2, add, conv;
							i = ar.length;
							while (--i > -1) {
								p = ar[i][2];
								add = ar[i][3] || 0;
								conv = (ar[i][4] === true) ? 1 : _RAD2DEG;
								b = this._beziers[ar[i][0]];
								b2 = this._beziers[ar[i][1]];

								if (b && b2) { //in case one of the properties got overwritten.
									b = b[curIndex];
									b2 = b2[curIndex];

									x1 = b.a + (b.b - b.a) * t;
									x2 = b.b + (b.c - b.b) * t;
									x1 += (x2 - x1) * t;
									x2 += ((b.c + (b.d - b.c) * t) - x2) * t;

									y1 = b2.a + (b2.b - b2.a) * t;
									y2 = b2.b + (b2.c - b2.b) * t;
									y1 += (y2 - y1) * t;
									y2 += ((b2.c + (b2.d - b2.c) * t) - y2) * t;

									val = Math.atan2(y2 - y1, x2 - x1) * conv + add;

									if (func[p]) {
										target[p](val);
									} else {
										target[p] = val;
									}
								}
							}
						}
					}
			}),
			p = BezierPlugin.prototype;


		BezierPlugin.bezierThrough = bezierThrough;
		BezierPlugin.cubicToQuadratic = cubicToQuadratic;
		BezierPlugin._autoCSS = true; //indicates that this plugin can be inserted into the "css" object using the autoCSS feature of TweenLite
		BezierPlugin.quadraticToCubic = function(a, b, c) {
			return new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
		};

		BezierPlugin._cssRegister = function() {
			var CSSPlugin = window._gsDefine.globals.CSSPlugin;
			if (!CSSPlugin) {
				return;
			}
			var _internals = CSSPlugin._internals,
				_parseToProxy = _internals._parseToProxy,
				_setPluginRatio = _internals._setPluginRatio,
				CSSPropTween = _internals.CSSPropTween;
			_internals._registerComplexSpecialProp("bezier", {parser:function(t, e, prop, cssp, pt, plugin) {
				if (e instanceof Array) {
					e = {values:e};
				}
				plugin = new BezierPlugin();
				var values = e.values,
					l = values.length - 1,
					pluginValues = [],
					v = {},
					i, p, data;
				if (l < 0) {
					return pt;
				}
				for (i = 0; i <= l; i++) {
					data = _parseToProxy(t, values[i], cssp, pt, plugin, (l !== i));
					pluginValues[i] = data.end;
				}
				for (p in e) {
					v[p] = e[p]; //duplicate the vars object because we need to alter some things which would cause problems if the user plans to reuse the same vars object for another tween.
				}
				v.values = pluginValues;
				pt = new CSSPropTween(t, "bezier", 0, 0, data.pt, 2);
				pt.data = data;
				pt.plugin = plugin;
				pt.setRatio = _setPluginRatio;
				if (v.autoRotate === 0) {
					v.autoRotate = true;
				}
				if (v.autoRotate && !(v.autoRotate instanceof Array)) {
					i = (v.autoRotate === true) ? 0 : Number(v.autoRotate) * _DEG2RAD;
					v.autoRotate = (data.end.left != null) ? [["left","top","rotation",i,true]] : (data.end.x != null) ? [["x","y","rotation",i,true]] : false;
				}
				if (v.autoRotate) {
					if (!cssp._transform) {
						cssp._enableTransforms(false);
					}
					data.autoRotate = cssp._target._gsTransform;
				}
				plugin._onInitTween(data.proxy, v, cssp._tween);
				return pt;
			}});
		};

		p._roundProps = function(lookup, value) {
			var op = this._overwriteProps,
				i = op.length;
			while (--i > -1) {
				if (lookup[op[i]] || lookup.bezier || lookup.bezierThrough) {
					this._round[op[i]] = value;
				}
			}
		};

		p._kill = function(lookup) {
			var a = this._props,
				p, i;
			for (p in this._beziers) {
				if (p in lookup) {
					delete this._beziers[p];
					delete this._func[p];
					i = a.length;
					while (--i > -1) {
						if (a[i] === p) {
							a.splice(i, 1);
						}
					}
				}
			}
			return this._super._kill.call(this, lookup);
		};

	}());






	
	
	
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * CSSPlugin
 * ----------------------------------------------------------------
 */
	window._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin","TweenLite"], function(TweenPlugin, TweenLite) {

		/** @constructor **/
		var CSSPlugin = function() {
				TweenPlugin.call(this, "css");
				this._overwriteProps.length = 0;
			},
			_hasPriority, //turns true whenever a CSSPropTween instance is created that has a priority other than 0. This helps us discern whether or not we should spend the time organizing the linked list or not after a CSSPlugin's _onInitTween() method is called.
			_suffixMap, //we set this in _onInitTween() each time as a way to have a persistent variable we can use in other methods like _parse() without having to pass it around as a parameter and we keep _parse() decoupled from a particular CSSPlugin instance
			_cs, //computed style (we store this in a shared variable to conserve memory and make minification tighter
			_overwriteProps, //alias to the currently instantiating CSSPlugin's _overwriteProps array. We use this closure in order to avoid having to pass a reference around from method to method and aid in minification.
			_specialProps = {},
			p = CSSPlugin.prototype = new TweenPlugin("css");

		p.constructor = CSSPlugin;
		CSSPlugin.version = "1.9.7";
		CSSPlugin.API = 2;
		CSSPlugin.defaultTransformPerspective = 0;
		p = "px"; //we'll reuse the "p" variable to keep file size down
		CSSPlugin.suffixMap = {top:p, right:p, bottom:p, left:p, width:p, height:p, fontSize:p, padding:p, margin:p, perspective:p};


		var _numExp = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
			_relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
			_valuesExp = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, //finds all the values that begin with numbers or += or -= and then a number. Includes suffixes. We use this to split complex values apart like "1px 5px 20px rgb(255,102,51)"
			//_clrNumExp = /(?:\b(?:(?:rgb|rgba|hsl|hsla)\(.+?\))|\B#.+?\b)/, //only finds rgb(), rgba(), hsl(), hsla() and # (hexadecimal) values but NOT color names like red, blue, etc.
			//_tinyNumExp = /\b\d+?e\-\d+?\b/g, //finds super small numbers in a string like 1e-20. could be used in matrix3d() to fish out invalid numbers and replace them with 0. After performing speed tests, however, we discovered it was slightly faster to just cut the numbers at 5 decimal places with a particular algorithm.
			_NaNExp = /[^\d\-\.]/g,
			_suffixExp = /(?:\d|\-|\+|=|#|\.)*/g,
			_opacityExp = /opacity *= *([^)]*)/,
			_opacityValExp = /opacity:([^;]*)/,
			_alphaFilterExp = /alpha\(opacity *=.+?\)/i,
			_rgbhslExp = /^(rgb|hsl)/,
			_capsExp = /([A-Z])/g,
			_camelExp = /-([a-z])/gi,
			_urlExp = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, //for pulling out urls from url(...) or url("...") strings (some browsers wrap urls in quotes, some don't when reporting things like backgroundImage)
			_camelFunc = function(s, g) { return g.toUpperCase(); },
			_horizExp = /(?:Left|Right|Width)/i,
			_ieGetMatrixExp = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
			_ieSetMatrixExp = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
			_commasOutsideParenExp = /,(?=[^\)]*(?:\(|$))/gi, //finds any commas that are not within parenthesis
			_DEG2RAD = Math.PI / 180,
			_RAD2DEG = 180 / Math.PI,
			_forcePT = {},
			_doc = document,
			_tempDiv = _doc.createElement("div"),
			_tempImg = _doc.createElement("img"),
			_internals = CSSPlugin._internals = {_specialProps:_specialProps}, //provides a hook to a few internal methods that we need to access from inside other plugins
			_agent = navigator.userAgent,
			_autoRound,
			_reqSafariFix, //we won't apply the Safari transform fix until we actually come across a tween that affects a transform property (to maintain best performance).

			_isSafari,
			_isFirefox, //Firefox has a bug that causes 3D transformed elements to randomly disappear unless a repaint is forced after each update on each element.
			_isSafariLT6, //Safari (and Android 4 which uses a flavor of Safari) has a bug that prevents changes to "top" and "left" properties from rendering properly if changed on the same frame as a transform UNLESS we set the element's WebkitBackfaceVisibility to hidden (weird, I know). Doing this for Android 3 and earlier seems to actually cause other problems, though (fun!)
			_ieVers,
			_supportsOpacity = (function() { //we set _isSafari, _ieVers, _isFirefox, and _supportsOpacity all in one function here to reduce file size slightly, especially in the minified version.
				var i = _agent.indexOf("Android"),
					d = _doc.createElement("div"), a;

				_isSafari = (_agent.indexOf("Safari") !== -1 && _agent.indexOf("Chrome") === -1 && (i === -1 || Number(_agent.substr(i+8, 1)) > 3));
				_isSafariLT6 = (_isSafari && (Number(_agent.substr(_agent.indexOf("Version/")+8, 1)) < 6));
				_isFirefox = (_agent.indexOf("Firefox") !== -1);

				(/MSIE ([0-9]{1,}[\.0-9]{0,})/).exec(_agent);
				_ieVers = parseFloat( RegExp.$1 );

				d.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>";
				a = d.getElementsByTagName("a")[0];
				return a ? /^0.55/.test(a.style.opacity) : false;
			}()),
			_getIEOpacity = function(v) {
				return (_opacityExp.test( ((typeof(v) === "string") ? v : (v.currentStyle ? v.currentStyle.filter : v.style.filter) || "") ) ? ( parseFloat( RegExp.$1 ) / 100 ) : 1);
			},
			_log = function(s) {//for logging messages, but in a way that won't throw errors in old versions of IE.
				if (window.console) {
					console.log(s);
				}
			},
			_prefixCSS = "", //the non-camelCase vendor prefix like "-o-", "-moz-", "-ms-", or "-webkit-"
			_prefix = "", //camelCase vendor prefix like "O", "ms", "Webkit", or "Moz".

			//@private feed in a camelCase property name like "transform" and it will check to see if it is valid as-is or if it needs a vendor prefix. It returns the corrected camelCase property name (i.e. "WebkitTransform" or "MozTransform" or "transform" or null if no such property is found, like if the browser is IE8 or before, "transform" won't be found at all)
			_checkPropPrefix = function(p, e) {
				e = e || _tempDiv;
				var s = e.style,
					a, i;
				if (s[p] !== undefined) {
					return p;
				}
				p = p.charAt(0).toUpperCase() + p.substr(1);
				a = ["O","Moz","ms","Ms","Webkit"];
				i = 5;
				while (--i > -1 && s[a[i]+p] === undefined) { }
				if (i >= 0) {
					_prefix = (i === 3) ? "ms" : a[i];
					_prefixCSS = "-" + _prefix.toLowerCase() + "-";
					return _prefix + p;
				}
				return null;
			},

			_getComputedStyle = _doc.defaultView ? _doc.defaultView.getComputedStyle : function() {},

			/**
			 * @private Returns the css style for a particular property of an element. For example, to get whatever the current "left" css value for an element with an ID of "myElement", you could do:
			 * var currentLeft = CSSPlugin.getStyle( document.getElementById("myElement"), "left");
			 *
			 * @param {!Object} t Target element whose style property you want to query
			 * @param {!string} p Property name (like "left" or "top" or "marginTop", etc.)
			 * @param {Object=} cs Computed style object. This just provides a way to speed processing if you're going to get several properties on the same element in quick succession - you can reuse the result of the getComputedStyle() call.
			 * @param {boolean=} calc If true, the value will not be read directly from the element's "style" property (if it exists there), but instead the getComputedStyle() result will be used. This can be useful when you want to ensure that the browser itself is interpreting the value.
			 * @param {string=} dflt Default value that should be returned in the place of null, "none", "auto" or "auto auto".
			 * @return {?string} The current property value
			 */
			_getStyle = CSSPlugin.getStyle = function(t, p, cs, calc, dflt) {
				var rv;
				if (!_supportsOpacity) if (p === "opacity") { //several versions of IE don't use the standard "opacity" property - they use things like filter:alpha(opacity=50), so we parse that here.
					return _getIEOpacity(t);
				}
				if (!calc && t.style[p]) {
					rv = t.style[p];
				} else if ((cs = cs || _getComputedStyle(t, null))) {
					t = cs.getPropertyValue(p.replace(_capsExp, "-$1").toLowerCase());
					rv = (t || cs.length) ? t : cs[p]; //Opera behaves VERY strangely - length is usually 0 and cs[p] is the only way to get accurate results EXCEPT when checking for -o-transform which only works with cs.getPropertyValue()!
				} else if (t.currentStyle) {
					cs = t.currentStyle;
					rv = cs[p];
				}
				return (dflt != null && (!rv || rv === "none" || rv === "auto" || rv === "auto auto")) ? dflt : rv;
			},

			/**
			 * @private Pass the target element, the property name, the numeric value, and the suffix (like "%", "em", "px", etc.) and it will spit back the equivalent pixel number.
			 * @param {!Object} t Target element
			 * @param {!string} p Property name (like "left", "top", "marginLeft", etc.)
			 * @param {!number} v Value
			 * @param {string=} sfx Suffix (like "px" or "%" or "em")
			 * @param {boolean=} recurse If true, the call is a recursive one. In some browsers (like IE7/8), occasionally the value isn't accurately reported initially, but if we run the function again it will take effect.
			 * @return {number} value in pixels
			 */
			_convertToPixels = function(t, p, v, sfx, recurse) {
				if (sfx === "px" || !sfx) { return v; }
				if (sfx === "auto" || !v) { return 0; }
				var horiz = _horizExp.test(p),
					node = t,
					style = _tempDiv.style,
					neg = (v < 0),
					pix;
				if (neg) {
					v = -v;
				}
				if (sfx === "%" && p.indexOf("border") !== -1) {
					pix = (v / 100) * (horiz ? t.clientWidth : t.clientHeight);
				} else {
					style.cssText = "border-style:solid; border-width:0; position:absolute; line-height:0;";
					if (sfx === "%" || !node.appendChild) {
						node = t.parentNode || _doc.body;
						style[(horiz ? "width" : "height")] = v + sfx;
					} else {
						style[(horiz ? "borderLeftWidth" : "borderTopWidth")] = v + sfx;
					}
					node.appendChild(_tempDiv);
					pix = parseFloat(_tempDiv[(horiz ? "offsetWidth" : "offsetHeight")]);
					node.removeChild(_tempDiv);
					if (pix === 0 && !recurse) {
						pix = _convertToPixels(t, p, v, sfx, true);
					}
				}
				return neg ? -pix : pix;
			},
			_calculateOffset = function(t, p, cs) { //for figuring out "top" or "left" in px when it's "auto". We need to factor in margin with the offsetLeft/offsetTop
				if (_getStyle(t, "position", cs) !== "absolute") { return 0; }
				var dim = ((p === "left") ? "Left" : "Top"),
					v = _getStyle(t, "margin" + dim, cs);
				return t["offset" + dim] - (_convertToPixels(t, p, parseFloat(v), v.replace(_suffixExp, "")) || 0);
			},

			//@private returns at object containing ALL of the style properties in camelCase and their associated values.
			_getAllStyles = function(t, cs) {
				var s = {},
					i, tr;
				if ((cs = cs || _getComputedStyle(t, null))) {
					if ((i = cs.length)) {
						while (--i > -1) {
							s[cs[i].replace(_camelExp, _camelFunc)] = cs.getPropertyValue(cs[i]);
						}
					} else { //Opera behaves differently - cs.length is always 0, so we must do a for...in loop.
						for (i in cs) {
							s[i] = cs[i];
						}
					}
				} else if ((cs = t.currentStyle || t.style)) {
					for (i in cs) {
						s[i.replace(_camelExp, _camelFunc)] = cs[i];
					}
				}
				if (!_supportsOpacity) {
					s.opacity = _getIEOpacity(t);
				}
				tr = _getTransform(t, cs, false);
				s.rotation = tr.rotation * _RAD2DEG;
				s.skewX = tr.skewX * _RAD2DEG;
				s.scaleX = tr.scaleX;
				s.scaleY = tr.scaleY;
				s.x = tr.x;
				s.y = tr.y;
				if (_supports3D) {
					s.z = tr.z;
					s.rotationX = tr.rotationX * _RAD2DEG;
					s.rotationY = tr.rotationY * _RAD2DEG;
					s.scaleZ = tr.scaleZ;
				}
				if (s.filters) {
					delete s.filters;
				}
				return s;
			},

			//@private analyzes two style objects (as returned by _getAllStyles()) and only looks for differences between them that contain tweenable values (like a number or color). It returns an object with a "difs" property which refers to an object containing only those isolated properties and values for tweening, and a "firstMPT" property which refers to the first MiniPropTween instance in a linked list that recorded all the starting values of the different properties so that we can revert to them at the end or beginning of the tween - we don't want the cascading to get messed up. The forceLookup parameter is an optional generic object with properties that should be forced into the results - this is necessary for className tweens that are overwriting others because imagine a scenario where a rollover/rollout adds/removes a class and the user swipes the mouse over the target SUPER fast, thus nothing actually changed yet and the subsequent comparison of the properties would indicate they match (especially when px rounding is taken into consideration), thus no tweening is necessary even though it SHOULD tween and remove those properties after the tween (otherwise the inline styles will contaminate things). See the className SpecialProp code for details.
			_cssDif = function(t, s1, s2, vars, forceLookup) {
				var difs = {},
					style = t.style,
					val, p, mpt;
				for (p in s2) {
					if (p !== "cssText") if (p !== "length") if (isNaN(p)) if (s1[p] !== (val = s2[p]) || (forceLookup && forceLookup[p])) if (p.indexOf("Origin") === -1) if (typeof(val) === "number" || typeof(val) === "string") {
						difs[p] = (val === "auto" && (p === "left" || p === "top")) ? _calculateOffset(t, p) : ((val === "" || val === "auto" || val === "none") && typeof(s1[p]) === "string" && s1[p].replace(_NaNExp, "") !== "") ? 0 : val; //if the ending value is defaulting ("" or "auto"), we check the starting value and if it can be parsed into a number (a string which could have a suffix too, like 700px), then we swap in 0 for "" or "auto" so that things actually tween.
						if (style[p] !== undefined) { //for className tweens, we must remember which properties already existed inline - the ones that didn't should be removed when the tween isn't in progress because they were only introduced to facilitate the transition between classes.
							mpt = new MiniPropTween(style, p, style[p], mpt);
						}
					}
				}
				if (vars) {
					for (p in vars) { //copy properties (except className)
						if (p !== "className") {
							difs[p] = vars[p];
						}
					}
				}
				return {difs:difs, firstMPT:mpt};
			},
			_dimensions = {width:["Left","Right"], height:["Top","Bottom"]},
			_margins = ["marginLeft","marginRight","marginTop","marginBottom"],

			/**
			 * @private Gets the width or height of an element
			 * @param {!Object} t Target element
			 * @param {!string} p Property name ("width" or "height")
			 * @param {Object=} cs Computed style object (if one exists). Just a speed optimization.
			 * @return {number} Dimension (in pixels)
			 */
			_getDimension = function(t, p, cs) {
				var v = parseFloat((p === "width") ? t.offsetWidth : t.offsetHeight),
					a = _dimensions[p],
					i = a.length;
				cs = cs || _getComputedStyle(t, null);
				while (--i > -1) {
					v -= parseFloat( _getStyle(t, "padding" + a[i], cs, true) ) || 0;
					v -= parseFloat( _getStyle(t, "border" + a[i] + "Width", cs, true) ) || 0;
				}
				return v;
			},

			//@private Parses position-related complex strings like "top left" or "50px 10px" or "70% 20%", etc. which are used for things like transformOrigin or backgroundPosition. Optionally decorates a supplied object (recObj) with the following properties: "ox" (offsetX), "oy" (offsetY), "oxp" (if true, "ox" is a percentage not a pixel value), and "oxy" (if true, "oy" is a percentage not a pixel value)
			_parsePosition = function(v, recObj) {
				if (v == null || v === "" || v === "auto" || v === "auto auto") { //note: Firefox uses "auto auto" as default whereas Chrome uses "auto".
					v = "0 0";
				}
				var a = v.split(" "),
					x = (v.indexOf("left") !== -1) ? "0%" : (v.indexOf("right") !== -1) ? "100%" : a[0],
					y = (v.indexOf("top") !== -1) ? "0%" : (v.indexOf("bottom") !== -1) ? "100%" : a[1];
				if (y == null) {
					y = "0";
				} else if (y === "center") {
					y = "50%";
				}
				if (x === "center" || isNaN(parseFloat(x))) { //remember, the user could flip-flop the values and say "bottom center" or "center bottom", etc. "center" is ambiguous because it could be used to describe horizontal or vertical, hence the isNaN().
					x = "50%";
				}
				if (recObj) {
					recObj.oxp = (x.indexOf("%") !== -1);
					recObj.oyp = (y.indexOf("%") !== -1);
					recObj.oxr = (x.charAt(1) === "=");
					recObj.oyr = (y.charAt(1) === "=");
					recObj.ox = parseFloat(x.replace(_NaNExp, ""));
					recObj.oy = parseFloat(y.replace(_NaNExp, ""));
				}
				return x + " " + y + ((a.length > 2) ? " " + a[2] : "");
			},

			/**
			 * @private Takes an ending value (typically a string, but can be a number) and a starting value and returns the change between the two, looking for relative value indicators like += and -= and it also ignores suffixes (but make sure the ending value starts with a number or +=/-= and that the starting value is a NUMBER!)
			 * @param {(number|string)} e End value which is typically a string, but could be a number
			 * @param {(number|string)} b Beginning value which is typically a string but could be a number
			 * @return {number} Amount of change between the beginning and ending values (relative values that have a "+=" or "-=" are recognized)
			 */
			_parseChange = function(e, b) {
				return (typeof(e) === "string" && e.charAt(1) === "=") ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(b);
			},

			/**
			 * @private Takes a value and a default number, checks if the value is relative, null, or numeric and spits back a normalized number accordingly. Primarily used in the _parseTransform() function.
			 * @param {Object} v Value to be parsed
			 * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
			 * @return {number} Parsed value
			 */
			_parseVal = function(v, d) {
				return (v == null) ? d : (typeof(v) === "string" && v.charAt(1) === "=") ? parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) + d : parseFloat(v);
			},

			/**
			 * @private Translates strings like "40deg" or "40" or 40rad" or "+=40deg" or "270_short" or "-90_cw" or "+=45_ccw" to a numeric radian angle. Of course a starting/default value must be fed in too so that relative values can be calculated properly.
			 * @param {Object} v Value to be parsed
			 * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
			 * @param {string=} p property name for directionalEnd (optional - only used when the parsed value is directional ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation). Property name would be "rotation", "rotationX", or "rotationY"
			 * @param {Object=} directionalEnd An object that will store the raw end values for directional angles ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation.
			 * @return {number} parsed angle in radians
			 */
			_parseAngle = function(v, d, p, directionalEnd) {
				var min = 0.000001,
					cap, split, dif, result;
				if (v == null) {
					result = d;
				} else if (typeof(v) === "number") {
					result = v * _DEG2RAD;
				} else {
					cap = Math.PI * 2;
					split = v.split("_");
					dif = Number(split[0].replace(_NaNExp, "")) * ((v.indexOf("rad") === -1) ? _DEG2RAD : 1) - ((v.charAt(1) === "=") ? 0 : d);
					if (split.length) {
						if (directionalEnd) {
							directionalEnd[p] = d + dif;
						}
						if (v.indexOf("short") !== -1) {
							dif = dif % cap;
							if (dif !== dif % (cap / 2)) {
								dif = (dif < 0) ? dif + cap : dif - cap;
							}
						}
						if (v.indexOf("_cw") !== -1 && dif < 0) {
							dif = ((dif + cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						} else if (v.indexOf("ccw") !== -1 && dif > 0) {
							dif = ((dif - cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						}
					}
					result = d + dif;
				}
				if (result < min && result > -min) {
					result = 0;
				}
				return result;
			},

			_colorLookup = {aqua:[0,255,255],
				lime:[0,255,0],
				silver:[192,192,192],
				black:[0,0,0],
				maroon:[128,0,0],
				teal:[0,128,128],
				blue:[0,0,255],
				navy:[0,0,128],
				white:[255,255,255],
				fuchsia:[255,0,255],
				olive:[128,128,0],
				yellow:[255,255,0],
				orange:[255,165,0],
				gray:[128,128,128],
				purple:[128,0,128],
				green:[0,128,0],
				red:[255,0,0],
				pink:[255,192,203],
				cyan:[0,255,255],
				transparent:[255,255,255,0]},

			_hue = function(h, m1, m2) {
				h = (h < 0) ? h + 1 : (h > 1) ? h - 1 : h;
				return ((((h * 6 < 1) ? m1 + (m2 - m1) * h * 6 : (h < 0.5) ? m2 : (h * 3 < 2) ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255) + 0.5) | 0;
			},

			/**
			 * @private Parses a color (like #9F0, #FF9900, or rgb(255,51,153)) into an array with 3 elements for red, green, and blue. Also handles rgba() values (splits into array of 4 elements of course)
			 * @param {(string|number)} v The value the should be parsed which could be a string like #9F0 or rgb(255,102,51) or rgba(255,0,0,0.5) or it could be a number like 0xFF00CC or even a named color like red, blue, purple, etc.
			 * @return {Array.<number>} An array containing red, green, and blue (and optionally alpha) in that order.
			 */
			_parseColor = function(v) {
				var c1, c2, c3, h, s, l;
				if (!v || v === "") {
					return _colorLookup.black;
				}
				if (typeof(v) === "number") {
					return [v >> 16, (v >> 8) & 255, v & 255];
				}
				if (v.charAt(v.length - 1) === ",") { //sometimes a trailing commma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
					v = v.substr(0, v.length - 1);
				}
				if (_colorLookup[v]) {
					return _colorLookup[v];
				}
				if (v.charAt(0) === "#") {
					if (v.length === 4) { //for shorthand like #9F0
						c1 = v.charAt(1),
						c2 = v.charAt(2),
						c3 = v.charAt(3);
						v = "#" + c1 + c1 + c2 + c2 + c3 + c3;
					}
					v = parseInt(v.substr(1), 16);
					return [v >> 16, (v >> 8) & 255, v & 255];
				}
				if (v.substr(0, 3) === "hsl") {
					v = v.match(_numExp);
					h = (Number(v[0]) % 360) / 360;
					s = Number(v[1]) / 100;
					l = Number(v[2]) / 100;
					c2 = (l <= 0.5) ? l * (s + 1) : l + s - l * s;
					c1 = l * 2 - c2;
					if (v.length > 3) {
						v[3] = Number(v[3]);
					}
					v[0] = _hue(h + 1 / 3, c1, c2);
					v[1] = _hue(h, c1, c2);
					v[2] = _hue(h - 1 / 3, c1, c2);
					return v;
				}
				v = v.match(_numExp) || _colorLookup.transparent;
				v[0] = Number(v[0]);
				v[1] = Number(v[1]);
				v[2] = Number(v[2]);
				if (v.length > 3) {
					v[3] = Number(v[3]);
				}
				return v;
			},
			_colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b"; //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.

		for (p in _colorLookup) {
			_colorExp += "|" + p + "\\b";
		}
		_colorExp = new RegExp(_colorExp+")", "gi");

		/**
		 * @private Returns a formatter function that handles taking a string (or number in some cases) and returning a consistently formatted one in terms of delimiters, quantity of values, etc. For example, we may get boxShadow values defined as "0px red" or "0px 0px 10px rgb(255,0,0)" or "0px 0px 20px 20px #F00" and we need to ensure that what we get back is described with 4 numbers and a color. This allows us to feed it into the _parseComplex() method and split the values up appropriately. The neat thing about this _getFormatter() function is that the dflt defines a pattern as well as a default, so for example, _getFormatter("0px 0px 0px 0px #777", true) not only sets the default as 0px for all distances and #777 for the color, but also sets the pattern such that 4 numbers and a color will always get returned.
		 * @param {!string} dflt The default value and pattern to follow. So "0px 0px 0px 0px #777" will ensure that 4 numbers and a color will always get returned.
		 * @param {boolean=} clr If true, the values should be searched for color-related data. For example, boxShadow values typically contain a color whereas borderRadius don't.
		 * @param {boolean=} collapsible If true, the value is a top/left/right/bottom style one that acts like margin or padding, where if only one value is received, it's used for all 4; if 2 are received, the first is duplicated for 3rd (bottom) and the 2nd is duplicated for the 4th spot (left), etc.
		 * @return {Function} formatter function
		 */
		var _getFormatter = function(dflt, clr, collapsible, multi) {
				if (dflt == null) {
					return function(v) {return v;};
				}
				var dColor = clr ? (dflt.match(_colorExp) || [""])[0] : "",
					dVals = dflt.split(dColor).join("").match(_valuesExp) || [],
					pfx = dflt.substr(0, dflt.indexOf(dVals[0])),
					sfx = (dflt.charAt(dflt.length - 1) === ")") ? ")" : "",
					delim = (dflt.indexOf(" ") !== -1) ? " " : ",",
					numVals = dVals.length,
					dSfx = (numVals > 0) ? dVals[0].replace(_numExp, "") : "",
					formatter;
				if (!numVals) {
					return function(v) {return v;};
				}
				if (clr) {
					formatter = function(v) {
						var color, vals, i, a;
						if (typeof(v) === "number") {
							v += dSfx;
						} else if (multi && _commasOutsideParenExp.test(v)) {
							a = v.replace(_commasOutsideParenExp, "|").split("|");
							for (i = 0; i < a.length; i++) {
								a[i] = formatter(a[i]);
							}
							return a.join(",");
						}
						color = (v.match(_colorExp) || [dColor])[0];
						vals = v.split(color).join("").match(_valuesExp) || [];
						i = vals.length;
						if (numVals > i--) {
							while (++i < numVals) {
								vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i];
							}
						}
						return pfx + vals.join(delim) + delim + color + sfx + (v.indexOf("inset") !== -1 ? " inset" : "");
					};
					return formatter;

				}
				formatter = function(v) {
					var vals, a, i;
					if (typeof(v) === "number") {
						v += dSfx;
					} else if (multi && _commasOutsideParenExp.test(v)) {
						a = v.replace(_commasOutsideParenExp, "|").split("|");
						for (i = 0; i < a.length; i++) {
							a[i] = formatter(a[i]);
						}
						return a.join(",");
					}
					vals = v.match(_valuesExp) || [];
					i = vals.length;
					if (numVals > i--) {
						while (++i < numVals) {
							vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i];
						}
					}
					return pfx + vals.join(delim) + sfx;
				};
				return formatter;
			},

			/**
			 * @private returns a formatter function that's used for edge-related values like marginTop, marginLeft, paddingBottom, paddingRight, etc. Just pass a comma-delimited list of property names related to the edges.
			 * @param {!string} props a comma-delimited list of property names in order from top to left, like "marginTop,marginRight,marginBottom,marginLeft"
			 * @return {Function} a formatter function
			 */
			_getEdgeParser = function(props) {
				props = props.split(",");
				return function(t, e, p, cssp, pt, plugin, vars) {
					var a = (e + "").split(" "),
						i;
					vars = {};
					for (i = 0; i < 4; i++) {
						vars[props[i]] = a[i] = a[i] || a[(((i - 1) / 2) >> 0)];
					}
					return cssp.parse(t, vars, pt, plugin);
				};
			},

			//@private used when other plugins must tween values first, like BezierPlugin or ThrowPropsPlugin, etc. That plugin's setRatio() gets called first so that the values are updated, and then we loop through the MiniPropTweens  which handle copying the values into their appropriate slots so that they can then be applied correctly in the main CSSPlugin setRatio() method. Remember, we typically create a proxy object that has a bunch of uniquely-named properties that we feed to the sub-plugin and it does its magic normally, and then we must interpret those values and apply them to the css because often numbers must get combined/concatenated, suffixes added, etc. to work with css, like boxShadow could have 4 values plus a color.
			_setPluginRatio = _internals._setPluginRatio = function(v) {
				this.plugin.setRatio(v);
				var d = this.data,
					proxy = d.proxy,
					mpt = d.firstMPT,
					min = 0.000001,
					val, pt, i, str;
				while (mpt) {
					val = proxy[mpt.v];
					if (mpt.r) {
						val = (val > 0) ? (val + 0.5) | 0 : (val - 0.5) | 0;
					} else if (val < min && val > -min) {
						val = 0;
					}
					mpt.t[mpt.p] = val;
					mpt = mpt._next;
				}
				if (d.autoRotate) {
					d.autoRotate.rotation = proxy.rotation;
				}
				//at the end, we must set the CSSPropTween's "e" (end) value dynamically here because that's what is used in the final setRatio() method.
				if (v === 1) {
					mpt = d.firstMPT;
					while (mpt) {
						pt = mpt.t;
						if (!pt.type) {
							pt.e = pt.s + pt.xs0;
						} else if (pt.type === 1) {
							str = pt.xs0 + pt.s + pt.xs1;
							for (i = 1; i < pt.l; i++) {
								str += pt["xn"+i] + pt["xs"+(i+1)];
							}
							pt.e = str;
						}
						mpt = mpt._next;
					}
				}
			},

			/**
			 * @private @constructor Used by a few SpecialProps to hold important values for proxies. For example, _parseToProxy() creates a MiniPropTween instance for each property that must get tweened on the proxy, and we record the original property name as well as the unique one we create for the proxy, plus whether or not the value needs to be rounded plus the original value.
			 * @param {!Object} t target object whose property we're tweening (often a CSSPropTween)
			 * @param {!string} p property name
			 * @param {(number|string|object)} v value
			 * @param {MiniPropTween=} next next MiniPropTween in the linked list
			 * @param {boolean=} r if true, the tweened value should be rounded to the nearest integer
			 */
			MiniPropTween = function(t, p, v, next, r) {
				this.t = t;
				this.p = p;
				this.v = v;
				this.r = r;
				if (next) {
					next._prev = this;
					this._next = next;
				}
			},

			/**
			 * @private Most other plugins (like BezierPlugin and ThrowPropsPlugin and others) can only tween numeric values, but CSSPlugin must accommodate special values that have a bunch of extra data (like a suffix or strings between numeric values, etc.). For example, boxShadow has values like "10px 10px 20px 30px rgb(255,0,0)" which would utterly confuse other plugins. This method allows us to split that data apart and grab only the numeric data and attach it to uniquely-named properties of a generic proxy object ({}) so that we can feed that to virtually any plugin to have the numbers tweened. However, we must also keep track of which properties from the proxy go with which CSSPropTween values and instances. So we create a linked list of MiniPropTweens. Each one records a target (the original CSSPropTween), property (like "s" or "xn1" or "xn2") that we're tweening and the unique property name that was used for the proxy (like "boxShadow_xn1" and "boxShadow_xn2") and whether or not they need to be rounded. That way, in the _setPluginRatio() method we can simply copy the values over from the proxy to the CSSPropTween instance(s). Then, when the main CSSPlugin setRatio() method runs and applies the CSSPropTween values accordingly, they're updated nicely. So the external plugin tweens the numbers, _setPluginRatio() copies them over, and setRatio() acts normally, applying css-specific values to the element.
			 * This method returns an object that has the following properties:
			 *  - proxy: a generic object containing the starting values for all the properties that will be tweened by the external plugin.  This is what we feed to the external _onInitTween() as the target
			 *  - end: a generic object containing the ending values for all the properties that will be tweened by the external plugin. This is what we feed to the external plugin's _onInitTween() as the destination values
			 *  - firstMPT: the first MiniPropTween in the linked list
			 *  - pt: the first CSSPropTween in the linked list that was created when parsing. If shallow is true, this linked list will NOT attach to the one passed into the _parseToProxy() as the "pt" (4th) parameter.
			 * @param {!Object} t target object to be tweened
			 * @param {!(Object|string)} vars the object containing the information about the tweening values (typically the end/destination values) that should be parsed
			 * @param {!CSSPlugin} cssp The CSSPlugin instance
			 * @param {CSSPropTween=} pt the next CSSPropTween in the linked list
			 * @param {TweenPlugin=} plugin the external TweenPlugin instance that will be handling tweening the numeric values
			 * @param {boolean=} shallow if true, the resulting linked list from the parse will NOT be attached to the CSSPropTween that was passed in as the "pt" (4th) parameter.
			 * @return An object containing the following properties: proxy, end, firstMPT, and pt (see above for descriptions)
			 */
			_parseToProxy = _internals._parseToProxy = function(t, vars, cssp, pt, plugin, shallow) {
				var bpt = pt,
					start = {},
					end = {},
					transform = cssp._transform,
					oldForce = _forcePT,
					i, p, xp, mpt, firstPT;
				cssp._transform = null;
				_forcePT = vars;
				pt = firstPT = cssp.parse(t, vars, pt, plugin);
				_forcePT = oldForce;
				//break off from the linked list so the new ones are isolated.
				if (shallow) {
					cssp._transform = transform;
					if (bpt) {
						bpt._prev = null;
						if (bpt._prev) {
							bpt._prev._next = null;
						}
					}
				}
				while (pt && pt !== bpt) {
					if (pt.type <= 1) {
						p = pt.p;
						end[p] = pt.s + pt.c;
						start[p] = pt.s;
						if (!shallow) {
							mpt = new MiniPropTween(pt, "s", p, mpt, pt.r);
							pt.c = 0;
						}
						if (pt.type === 1) {
							i = pt.l;
							while (--i > 0) {
								xp = "xn" + i;
								p = pt.p + "_" + xp;
								end[p] = pt.data[xp];
								start[p] = pt[xp];
								if (!shallow) {
									mpt = new MiniPropTween(pt, xp, p, mpt, pt.rxp[xp]);
								}
							}
						}
					}
					pt = pt._next;
				}
				return {proxy:start, end:end, firstMPT:mpt, pt:firstPT};
			},



			/**
			 * @constructor Each property that is tweened has at least one CSSPropTween associated with it. These instances store important information like the target, property, starting value, amount of change, etc. They can also optionally have a number of "extra" strings and numeric values named xs1, xn1, xs2, xn2, xs3, xn3, etc. where "s" indicates string and "n" indicates number. These can be pieced together in a complex-value tween (type:1) that has alternating types of data like a string, number, string, number, etc. For example, boxShadow could be "5px 5px 8px rgb(102, 102, 51)". In that value, there are 6 numbers that may need to tween and then pieced back together into a string again with spaces, suffixes, etc. xs0 is special in that it stores the suffix for standard (type:0) tweens, -OR- the first string (prefix) in a complex-value (type:1) CSSPropTween -OR- it can be the non-tweening value in a type:-1 CSSPropTween. We do this to conserve memory.
			 * CSSPropTweens have the following optional properties as well (not defined through the constructor):
			 *  - l: Length in terms of the number of extra properties that the CSSPropTween has (default: 0). For example, for a boxShadow we may need to tween 5 numbers in which case l would be 5; Keep in mind that the start/end values for the first number that's tweened are always stored in the s and c properties to conserve memory. All additional values thereafter are stored in xn1, xn2, etc.
			 *  - xfirst: The first instance of any sub-CSSPropTweens that are tweening properties of this instance. For example, we may split up a boxShadow tween so that there's a main CSSPropTween of type:1 that has various xs* and xn* values associated with the h-shadow, v-shadow, blur, color, etc. Then we spawn a CSSPropTween for each of those that has a higher priority and runs BEFORE the main CSSPropTween so that the values are all set by the time it needs to re-assemble them. The xfirst gives us an easy way to identify the first one in that chain which typically ends at the main one (because they're all prepende to the linked list)
			 *  - plugin: The TweenPlugin instance that will handle the tweening of any complex values. For example, sometimes we don't want to use normal subtweens (like xfirst refers to) to tween the values - we might want ThrowPropsPlugin or BezierPlugin some other plugin to do the actual tweening, so we create a plugin instance and store a reference here. We need this reference so that if we get a request to round values or disable a tween, we can pass along that request.
			 *  - data: Arbitrary data that needs to be stored with the CSSPropTween. Typically if we're going to have a plugin handle the tweening of a complex-value tween, we create a generic object that stores the END values that we're tweening to and the CSSPropTween's xs1, xs2, etc. have the starting values. We store that object as data. That way, we can simply pass that object to the plugin and use the CSSPropTween as the target.
			 *  - setRatio: Only used for type:2 tweens that require custom functionality. In this case, we call the CSSPropTween's setRatio() method and pass the ratio each time the tween updates. This isn't quite as efficient as doing things directly in the CSSPlugin's setRatio() method, but it's very convenient and flexible.
			 * @param {!Object} t Target object whose property will be tweened. Often a DOM element, but not always. It could be anything.
			 * @param {string} p Property to tween (name). For example, to tween element.width, p would be "width".
			 * @param {number} s Starting numeric value
			 * @param {number} c Change in numeric value over the course of the entire tween. For example, if element.width starts at 5 and should end at 100, c would be 95.
			 * @param {CSSPropTween=} next The next CSSPropTween in the linked list. If one is defined, we will define its _prev as the new instance, and the new instance's _next will be pointed at it.
			 * @param {number=} type The type of CSSPropTween where -1 = a non-tweening value, 0 = a standard simple tween, 1 = a complex value (like one that has multiple numbers in a comma- or space-delimited string like border:"1px solid red"), and 2 = one that uses a custom setRatio function that does all of the work of applying the values on each update.
			 * @param {string=} n Name of the property that should be used for overwriting purposes which is typically the same as p but not always. For example, we may need to create a subtween for the 2nd part of a "clip:rect(...)" tween in which case "p" might be xs1 but "n" is still "clip"
			 * @param {boolean=} r If true, the value(s) should be rounded
			 * @param {number=} pr Priority in the linked list order. Higher priority CSSPropTweens will be updated before lower priority ones. The default priority is 0.
			 * @param {string=} b Beginning value. We store this to ensure that it is EXACTLY what it was when the tween began without any risk of interpretation issues.
			 * @param {string=} e Ending value. We store this to ensure that it is EXACTLY what the user defined at the end of the tween without any risk of interpretation issues.
			 */
			CSSPropTween = _internals.CSSPropTween = function(t, p, s, c, next, type, n, r, pr, b, e) {
				this.t = t; //target
				this.p = p; //property
				this.s = s; //starting value
				this.c = c; //change value
				this.n = n || "css_" + p; //name that this CSSPropTween should be associated to (usually the same as p, but not always - n is what overwriting looks at)
				if (!(t instanceof CSSPropTween)) {
					_overwriteProps.push(this.n);
				}
				this.r = r; //round (boolean)
				this.type = type || 0; //0 = normal tween, -1 = non-tweening (in which case xs0 will be applied to the target's property, like tp.t[tp.p] = tp.xs0), 1 = complex-value SpecialProp, 2 = custom setRatio() that does all the work
				if (pr) {
					this.pr = pr;
					_hasPriority = true;
				}
				this.b = (b === undefined) ? s : b;
				this.e = (e === undefined) ? s + c : e;
				if (next) {
					this._next = next;
					next._prev = this;
				}
			},

			/**
			 * Takes a target, the beginning value and ending value (as strings) and parses them into a CSSPropTween (possibly with child CSSPropTweens) that accommodates multiple numbers, colors, comma-delimited values, etc. For example:
			 * sp.parseComplex(element, "boxShadow", "5px 10px 20px rgb(255,102,51)", "0px 0px 0px red", true, "0px 0px 0px rgb(0,0,0,0)", pt);
			 * It will walk through the beginning and ending values (which should be in the same format with the same number and type of values) and figure out which parts are numbers, what strings separate the numeric/tweenable values, and then create the CSSPropTweens accordingly. If a plugin is defined, no child CSSPropTweens will be created. Instead, the ending values will be stored in the "data" property of the returned CSSPropTween like: {s:-5, xn1:-10, xn2:-20, xn3:255, xn4:0, xn5:0} so that it can be fed to any other plugin and it'll be plain numeric tweens but the recomposition of the complex value will be handled inside CSSPlugin's setRatio().
			 * If a setRatio is defined, the type of the CSSPropTween will be set to 2 and recomposition of the values will be the responsibility of that method.
			 *
			 * @param {!Object} t Target whose property will be tweened
			 * @param {!string} p Property that will be tweened (its name, like "left" or "backgroundColor" or "boxShadow")
			 * @param {string} b Beginning value
			 * @param {string} e Ending value
			 * @param {boolean} clrs If true, the value could contain a color value like "rgb(255,0,0)" or "#F00" or "red". The default is false, so no colors will be recognized (a performance optimization)
			 * @param {(string|number|Object)} dflt The default beginning value that should be used if no valid beginning value is defined or if the number of values inside the complex beginning and ending values don't match
			 * @param {?CSSPropTween} pt CSSPropTween instance that is the current head of the linked list (we'll prepend to this).
			 * @param {number=} pr Priority in the linked list order. Higher priority properties will be updated before lower priority ones. The default priority is 0.
			 * @param {TweenPlugin=} plugin If a plugin should handle the tweening of extra properties, pass the plugin instance here. If one is defined, then NO subtweens will be created for any extra properties (the properties will be created - just not additional CSSPropTween instances to tween them) because the plugin is expected to do so. However, the end values WILL be populated in the "data" property, like {s:100, xn1:50, xn2:300}
			 * @param {function(number)=} setRatio If values should be set in a custom function instead of being pieced together in a type:1 (complex-value) CSSPropTween, define that custom function here.
			 * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parseComplex() call.
			 */
			_parseComplex = CSSPlugin.parseComplex = function(t, p, b, e, clrs, dflt, pt, pr, plugin, setRatio) {
				//DEBUG: _log("parseComplex: "+p+", b: "+b+", e: "+e);
				b = b || dflt || "";
				pt = new CSSPropTween(t, p, 0, 0, pt, (setRatio ? 2 : 1), null, false, pr, b, e);
				e += ""; //ensures it's a string
				var ba = b.split(", ").join(",").split(" "), //beginning array
					ea = e.split(", ").join(",").split(" "), //ending array
					l = ba.length,
					autoRound = (_autoRound !== false),
					i, xi, ni, bv, ev, bnums, enums, bn, rgba, temp, cv, str;
				if (e.indexOf(",") !== -1 || b.indexOf(",") !== -1) {
					ba = ba.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
					ea = ea.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
					l = ba.length;
				}
				if (l !== ea.length) {
					//DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
					ba = (dflt || "").split(" ");
					l = ba.length;
				}
				pt.plugin = plugin;
				pt.setRatio = setRatio;
				for (i = 0; i < l; i++) {
					bv = ba[i];
					ev = ea[i];
					bn = parseFloat(bv);

					//if the value begins with a number (most common). It's fine if it has a suffix like px
					if (bn || bn === 0) {
						pt.appendXtra("", bn, _parseChange(ev, bn), ev.replace(_relNumExp, ""), (autoRound && ev.indexOf("px") !== -1), true);

					//if the value is a color
					} else if (clrs && (bv.charAt(0) === "#" || _colorLookup[bv] || _rgbhslExp.test(bv))) {
						str = ev.charAt(ev.length - 1) === "," ? ")," : ")"; //if there's a comma at the end, retain it.
						bv = _parseColor(bv);
						ev = _parseColor(ev);
						rgba = (bv.length + ev.length > 6);
						if (rgba && !_supportsOpacity && ev[3] === 0) { //older versions of IE don't support rgba(), so if the destination alpha is 0, just use "transparent" for the end color
							pt["xs" + pt.l] += pt.l ? " transparent" : "transparent";
							pt.e = pt.e.split(ea[i]).join("transparent");
						} else {
							if (!_supportsOpacity) { //old versions of IE don't support rgba().
								rgba = false;
							}
							pt.appendXtra((rgba ? "rgba(" : "rgb("), bv[0], ev[0] - bv[0], ",", true, true)
								.appendXtra("", bv[1], ev[1] - bv[1], ",", true)
								.appendXtra("", bv[2], ev[2] - bv[2], (rgba ? "," : str), true);
							if (rgba) {
								bv = (bv.length < 4) ? 1 : bv[3];
								pt.appendXtra("", bv, ((ev.length < 4) ? 1 : ev[3]) - bv, str, false);
							}
						}

					} else {
						bnums = bv.match(_numExp); //gets each group of numbers in the beginning value string and drops them into an array

						//if no number is found, treat it as a non-tweening value and just append the string to the current xs.
						if (!bnums) {
							pt["xs" + pt.l] += pt.l ? " " + bv : bv;

						//loop through all the numbers that are found and construct the extra values on the pt.
						} else {
							enums = ev.match(_relNumExp); //get each group of numbers in the end value string and drop them into an array. We allow relative values too, like +=50 or -=.5
							if (!enums || enums.length !== bnums.length) {
								//DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
								return pt;
							}
							ni = 0;
							for (xi = 0; xi < bnums.length; xi++) {
								cv = bnums[xi];
								temp = bv.indexOf(cv, ni);
								pt.appendXtra(bv.substr(ni, temp - ni), Number(cv), _parseChange(enums[xi], cv), "", (autoRound && bv.substr(temp + cv.length, 2) === "px"), (xi === 0));
								ni = temp + cv.length;
							}
							pt["xs" + pt.l] += bv.substr(ni);
						}
					}
				}
				//if there are relative values ("+=" or "-=" prefix), we need to adjust the ending value to eliminate the prefixes and combine the values properly.
				if (e.indexOf("=") !== -1) if (pt.data) {
					str = pt.xs0 + pt.data.s;
					for (i = 1; i < pt.l; i++) {
						str += pt["xs" + i] + pt.data["xn" + i];
					}
					pt.e = str + pt["xs" + i];
				}
				if (!pt.l) {
					pt.type = -1;
					pt.xs0 = pt.e;
				}
				return pt.xfirst || pt;
			},
			i = 9;


		p = CSSPropTween.prototype;
		p.l = p.pr = 0; //length (number of extra properties like xn1, xn2, xn3, etc.
		while (--i > 0) {
			p["xn" + i] = 0;
			p["xs" + i] = "";
		}
		p.xs0 = "";
		p._next = p._prev = p.xfirst = p.data = p.plugin = p.setRatio = p.rxp = null;


		/**
		 * Appends and extra tweening value to a CSSPropTween and automatically manages any prefix and suffix strings. The first extra value is stored in the s and c of the main CSSPropTween instance, but thereafter any extras are stored in the xn1, xn2, xn3, etc. The prefixes and suffixes are stored in the xs0, xs1, xs2, etc. properties. For example, if I walk through a clip value like "rect(10px, 5px, 0px, 20px)", the values would be stored like this:
		 * xs0:"rect(", s:10, xs1:"px, ", xn1:5, xs2:"px, ", xn2:0, xs3:"px, ", xn3:20, xn4:"px)"
		 * And they'd all get joined together when the CSSPlugin renders (in the setRatio() method).
		 * @param {string=} pfx Prefix (if any)
		 * @param {!number} s Starting value
		 * @param {!number} c Change in numeric value over the course of the entire tween. For example, if the start is 5 and the end is 100, the change would be 95.
		 * @param {string=} sfx Suffix (if any)
		 * @param {boolean=} r Round (if true).
		 * @param {boolean=} pad If true, this extra value should be separated by the previous one by a space. If there is no previous extra and pad is true, it will automatically drop the space.
		 * @return {CSSPropTween} returns itself so that multiple methods can be chained together.
		 */
		p.appendXtra = function(pfx, s, c, sfx, r, pad) {
			var pt = this,
				l = pt.l;
			pt["xs" + l] += (pad && l) ? " " + pfx : pfx || "";
			if (!c) if (l !== 0 && !pt.plugin) { //typically we'll combine non-changing values right into the xs to optimize performance, but we don't combine them when there's a plugin that will be tweening the values because it may depend on the values being split apart, like for a bezier, if a value doesn't change between the first and second iteration but then it does on the 3rd, we'll run into trouble because there's no xn slot for that value!
				pt["xs" + l] += s + (sfx || "");
				return pt;
			}
			pt.l++;
			pt.type = pt.setRatio ? 2 : 1;
			pt["xs" + pt.l] = sfx || "";
			if (l > 0) {
				pt.data["xn" + l] = s + c;
				pt.rxp["xn" + l] = r; //round extra property (we need to tap into this in the _parseToProxy() method)
				pt["xn" + l] = s;
				if (!pt.plugin) {
					pt.xfirst = new CSSPropTween(pt, "xn" + l, s, c, pt.xfirst || pt, 0, pt.n, r, pt.pr);
					pt.xfirst.xs0 = 0; //just to ensure that the property stays numeric which helps modern browsers speed up processing. Remember, in the setRatio() method, we do pt.t[pt.p] = val + pt.xs0 so if pt.xs0 is "" (the default), it'll cast the end value as a string. When a property is a number sometimes and a string sometimes, it prevents the compiler from locking in the data type, slowing things down slightly.
				}
				return pt;
			}
			pt.data = {s:s + c};
			pt.rxp = {};
			pt.s = s;
			pt.c = c;
			pt.r = r;
			return pt;
		};

		/**
		 * @constructor A SpecialProp is basically a css property that needs to be treated in a non-standard way, like if it may contain a complex value like boxShadow:"5px 10px 15px rgb(255, 102, 51)" or if it is associated with another plugin like ThrowPropsPlugin or BezierPlugin. Every SpecialProp is associated with a particular property name like "boxShadow" or "throwProps" or "bezier" and it will intercept those values in the vars object that's passed to the CSSPlugin and handle them accordingly.
		 * @param {!string} p Property name (like "boxShadow" or "throwProps")
		 * @param {Object=} options An object containing any of the following configuration options:
		 *                      - defaultValue: the default value
		 *                      - parser: A function that should be called when the associated property name is found in the vars. This function should return a CSSPropTween instance and it should ensure that it is properly inserted into the linked list. It will receive 4 paramters: 1) The target, 2) The value defined in the vars, 3) The CSSPlugin instance (whose _firstPT should be used for the linked list), and 4) A computed style object if one was calculated (this is a speed optimization that allows retrieval of starting values quicker)
		 *                      - formatter: a function that formats any value received for this special property (for example, boxShadow could take "5px 5px red" and format it to "5px 5px 0px 0px red" so that both the beginning and ending values have a common order and quantity of values.)
		 *                      - prefix: if true, we'll determine whether or not this property requires a vendor prefix (like Webkit or Moz or ms or O)
		 *                      - color: set this to true if the value for this SpecialProp may contain color-related values like rgb(), rgba(), etc.
		 *                      - priority: priority in the linked list order. Higher priority SpecialProps will be updated before lower priority ones. The default priority is 0.
		 *                      - multi: if true, the formatter should accommodate a comma-delimited list of values, like boxShadow could have multiple boxShadows listed out.
		 *                      - collapsible: if true, the formatter should treat the value like it's a top/right/bottom/left value that could be collapsed, like "5px" would apply to all, "5px, 10px" would use 5px for top/bottom and 10px for right/left, etc.
		 *                      - keyword: a special keyword that can [optionally] be found inside the value (like "inset" for boxShadow). This allows us to validate beginning/ending values to make sure they match (if the keyword is found in one, it'll be added to the other for consistency by default).
		 */
		var SpecialProp = function(p, options) {
				options = options || {};
				this.p = options.prefix ? _checkPropPrefix(p) || p : p;
				_specialProps[p] = _specialProps[this.p] = this;
				this.format = options.formatter || _getFormatter(options.defaultValue, options.color, options.collapsible, options.multi);
				if (options.parser) {
					this.parse = options.parser;
				}
				this.clrs = options.color;
				this.multi = options.multi;
				this.keyword = options.keyword;
				this.dflt = options.defaultValue;
				this.pr = options.priority || 0;
			},

			//shortcut for creating a new SpecialProp that can accept multiple properties as a comma-delimited list (helps minification). dflt can be an array for multiple values (we don't do a comma-delimited list because the default value may contain commas, like rect(0px,0px,0px,0px)). We attach this method to the SpecialProp class/object instead of using a private _createSpecialProp() method so that we can tap into it externally if necessary, like from another plugin.
			_registerComplexSpecialProp = _internals._registerComplexSpecialProp = function(p, options, defaults) {
				if (typeof(options) !== "object") {
					options = {parser:defaults}; //to make backwards compatible with older versions of BezierPlugin and ThrowPropsPlugin
				}
				var a = p.split(","),
					d = options.defaultValue,
					i, temp;
				defaults = defaults || [d];
				for (i = 0; i < a.length; i++) {
					options.prefix = (i === 0 && options.prefix);
					options.defaultValue = defaults[i] || d;
					temp = new SpecialProp(a[i], options);
				}
			},

			//creates a placeholder special prop for a plugin so that the property gets caught the first time a tween of it is attempted, and at that time it makes the plugin register itself, thus taking over for all future tweens of that property. This allows us to not mandate that things load in a particular order and it also allows us to log() an error that informs the user when they attempt to tween an external plugin-related property without loading its .js file.
			_registerPluginProp = function(p) {
				if (!_specialProps[p]) {
					var pluginName = p.charAt(0).toUpperCase() + p.substr(1) + "Plugin";
					_registerComplexSpecialProp(p, {parser:function(t, e, p, cssp, pt, plugin, vars) {
						var pluginClass = (window.GreenSockGlobals || window).com.greensock.plugins[pluginName];
						if (!pluginClass) {
							_log("Error: " + pluginName + " js file not loaded.");
							return pt;
						}
						pluginClass._cssRegister();
						return _specialProps[p].parse(t, e, p, cssp, pt, plugin, vars);
					}});
				}
			};


		p = SpecialProp.prototype;

		/**
		 * Alias for _parseComplex() that automatically plugs in certain values for this SpecialProp, like its property name, whether or not colors should be sensed, the default value, and priority. It also looks for any keyword that the SpecialProp defines (like "inset" for boxShadow) and ensures that the beginning and ending values have the same number of values for SpecialProps where multi is true (like boxShadow and textShadow can have a comma-delimited list)
		 * @param {!Object} t target element
		 * @param {(string|number|object)} b beginning value
		 * @param {(string|number|object)} e ending (destination) value
		 * @param {CSSPropTween=} pt next CSSPropTween in the linked list
		 * @param {TweenPlugin=} plugin If another plugin will be tweening the complex value, that TweenPlugin instance goes here.
		 * @param {function=} setRatio If a custom setRatio() method should be used to handle this complex value, that goes here.
		 * @return {CSSPropTween=} First CSSPropTween in the linked list
		 */
		p.parseComplex = function(t, b, e, pt, plugin, setRatio) {
			var kwd = this.keyword,
				i, ba, ea, l, bi, ei;
			//if this SpecialProp's value can contain a comma-delimited list of values (like boxShadow or textShadow), we must parse them in a special way, and look for a keyword (like "inset" for boxShadow) and ensure that the beginning and ending BOTH have it if the end defines it as such. We also must ensure that there are an equal number of values specified (we can't tween 1 boxShadow to 3 for example)
			if (this.multi) if (_commasOutsideParenExp.test(e) || _commasOutsideParenExp.test(b)) {
				ba = b.replace(_commasOutsideParenExp, "|").split("|");
				ea = e.replace(_commasOutsideParenExp, "|").split("|");
			} else if (kwd) {
				ba = [b];
				ea = [e];
			}
			if (ea) {
				l = (ea.length > ba.length) ? ea.length : ba.length;
				for (i = 0; i < l; i++) {
					b = ba[i] = ba[i] || this.dflt;
					e = ea[i] = ea[i] || this.dflt;
					if (kwd) {
						bi = b.indexOf(kwd);
						ei = e.indexOf(kwd);
						if (bi !== ei) {
							e = (ei === -1) ? ea : ba;
							e[i] += " " + kwd;
						}
					}
				}
				b = ba.join(", ");
				e = ea.join(", ");
			}
			return _parseComplex(t, this.p, b, e, this.clrs, this.dflt, pt, this.pr, plugin, setRatio);
		};

		/**
		 * Accepts a target and end value and spits back a CSSPropTween that has been inserted into the CSSPlugin's linked list and conforms with all the conventions we use internally, like type:-1, 0, 1, or 2, setting up any extra property tweens, priority, etc. For example, if we have a boxShadow SpecialProp and call:
		 * this._firstPT = sp.parse(element, "5px 10px 20px rgb(2550,102,51)", "boxShadow", this);
		 * It should figure out the starting value of the element's boxShadow, compare it to the provided end value and create all the necessary CSSPropTweens of the appropriate types to tween the boxShadow. The CSSPropTween that gets spit back should already be inserted into the linked list (the 4th parameter is the current head, so prepend to that).
		 * @param {!Object) t Target object whose property is being tweened
		 * @param {Object} e End value as provided in the vars object (typically a string, but not always - like a throwProps would be an object).
		 * @param {!string} p Property name
		 * @param {!CSSPlugin} cssp The CSSPlugin instance that should be associated with this tween.
		 * @param {?CSSPropTween} pt The CSSPropTween that is the current head of the linked list (we'll prepend to it)
		 * @param {TweenPlugin=} plugin If a plugin will be used to tween the parsed value, this is the plugin instance.
		 * @param {Object=} vars Original vars object that contains the data for parsing.
		 * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parse() call.
		 */
		p.parse = function(t, e, p, cssp, pt, plugin, vars) {
			return this.parseComplex(t.style, this.format(_getStyle(t, this.p, _cs, false, this.dflt)), this.format(e), pt, plugin);
		};

		/**
		 * Registers a special property that should be intercepted from any "css" objects defined in tweens. This allows you to handle them however you want without CSSPlugin doing it for you. The 2nd parameter should be a function that accepts 3 parameters:
		 *  1) Target object whose property should be tweened (typically a DOM element)
		 *  2) The end/destination value (could be a string, number, object, or whatever you want)
		 *  3) The tween instance (you probably don't need to worry about this, but it can be useful for looking up information like the duration)
		 *
		 * Then, your function should return a function which will be called each time the tween gets rendered, passing a numeric "ratio" parameter to your function that indicates the change factor (usually between 0 and 1). For example:
		 *
		 * CSSPlugin.registerSpecialProp("myCustomProp", function(target, value, tween) {
		 *      var start = target.style.width;
		 *      return function(ratio) {
		 *              target.style.width = (start + value * ratio) + "px";
		 *              console.log("set width to " + target.style.width);
		 *          }
		 * }, 0);
		 *
		 * Then, when I do this tween, it will trigger my special property:
		 *
		 * TweenLite.to(element, 1, {css:{myCustomProp:100}});
		 *
		 * In the example, of course, we're just changing the width, but you can do anything you want.
		 *
		 * @param {!string} name Property name (or comma-delimited list of property names) that should be intercepted and handled by your function. For example, if I define "myCustomProp", then it would handle that portion of the following tween: TweenLite.to(element, 1, {css:{myCustomProp:100}})
		 * @param {!function(Object, Object, Object, string):function(number)} onInitTween The function that will be called when a tween of this special property is performed. The function will receive 4 parameters: 1) Target object that should be tweened, 2) Value that was passed to the tween, 3) The tween instance itself (rarely used), and 4) The property name that's being tweened. Your function should return a function that should be called on every update of the tween. That function will receive a single parameter that is a "change factor" value (typically between 0 and 1) indicating the amount of change as a ratio. You can use this to determine how to set the values appropriately in your function.
		 * @param {number=} priority Priority that helps the engine determine the order in which to set the properties (default: 0). Higher priority properties will be updated before lower priority ones.
		 */
		CSSPlugin.registerSpecialProp = function(name, onInitTween, priority) {
			_registerComplexSpecialProp(name, {parser:function(t, e, p, cssp, pt, plugin, vars) {
				var rv = new CSSPropTween(t, p, 0, 0, pt, 2, p, false, priority);
				rv.plugin = plugin;
				rv.setRatio = onInitTween(t, e, cssp._tween, p);
				return rv;
			}, priority:priority});
		};








		//transform-related methods and properties
		var _transformProps = ("scaleX,scaleY,scaleZ,x,y,z,skewX,rotation,rotationX,rotationY,perspective").split(","),
			_transformProp = _checkPropPrefix("transform"), //the Javascript (camelCase) transform property, like msTransform, WebkitTransform, MozTransform, or OTransform.
			_transformPropCSS = _prefixCSS + "transform",
			_transformOriginProp = _checkPropPrefix("transformOrigin"),
			_supports3D = (_checkPropPrefix("perspective") !== null),

			/**
			 * Parses the transform values for an element, returning an object with x, y, z, scaleX, scaleY, scaleZ, rotation, rotationX, rotationY, skewX, and skewY properties. Note: by default (for performance reasons), all skewing is combined into skewX and rotation but skewY still has a place in the transform object so that we can record how much of the skew is attributed to skewX vs skewY. Remember, a skewY of 10 looks the same as a rotation of 10 and skewX of -10.
			 * @param {!Object} t target element
			 * @param {Object=} cs computed style object (optional)
			 * @param {boolean=} rec if true, the transform values will be recorded to the target element's _gsTransform object, like target._gsTransform = {x:0, y:0, z:0, scaleX:1...}
			 * @return {object} object containing all of the transform properties/values like {x:0, y:0, z:0, scaleX:1...}
			 */
			_getTransform = function(t, cs, rec) {
				var tm = rec ? t._gsTransform || {skewY:0} : {skewY:0},
					invX = (tm.scaleX < 0), //in order to interpret things properly, we need to know if the user applied a negative scaleX previously so that we can adjust the rotation and skewX accordingly. Otherwise, if we always interpret a flipped matrix as affecting scaleY and the user only wants to tween the scaleX on multiple sequential tweens, it would keep the negative scaleY without that being the user's intent.
					min = 0.00002,
					rnd = 100000,
					minPI = -Math.PI + 0.0001,
					maxPI = Math.PI - 0.0001,
					zOrigin = _supports3D ? parseFloat(_getStyle(t, _transformOriginProp, cs, false, "0 0 0").split(" ")[2]) || tm.zOrigin  || 0 : 0,
					s, m, i, n, dec, scaleX, scaleY, rotation, skewX, difX, difY, difR, difS;
				if (_transformProp) {
					s = _getStyle(t, _transformPropCSS, cs, true);
				} else if (t.currentStyle) {
					//for older versions of IE, we need to interpret the filter portion that is in the format: progid:DXImageTransform.Microsoft.Matrix(M11=6.123233995736766e-17, M12=-1, M21=1, M22=6.123233995736766e-17, sizingMethod='auto expand') Notice that we need to swap b and c compared to a normal matrix.
					s = t.currentStyle.filter.match(_ieGetMatrixExp);
					if (s && s.length === 4) {
						s = [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), (tm.x || 0), (tm.y || 0)].join(",");
					} else if (tm.x != null) { //if the element already has a _gsTransform, use that.
						return tm;
					} else {
						s = "";
					}
				}
				//split the matrix values out into an array (m for matrix)
				m = (s || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [];
				i = m.length;
				while (--i > -1) {
					n = Number(m[i]);
					m[i] = (dec = n - (n |= 0)) ? ((dec * rnd + (dec < 0 ? -0.5 : 0.5)) | 0) / rnd + n : n; //convert strings to Numbers and round to 5 decimal places to avoid issues with tiny numbers. Roughly 20x faster than Number.toFixed(). We also must make sure to round before dividing so that values like 0.9999999999 become 1 to avoid glitches in browser rendering and interpretation of flipped/rotated 3D matrices. And don't just multiply the number by rnd, floor it, and then divide by rnd because the bitwise operations max out at a 32-bit signed integer, thus it could get clipped at a relatively low value (like 22,000.00000 for example).
				}
				if (m.length === 16) {

					//we'll only look at these position-related 6 variables first because if x/y/z all match, it's relatively safe to assume we don't need to re-parse everything which risks losing important rotational information (like rotationX:180 plus rotationY:180 would look the same as rotation:180 - there's no way to know for sure which direction was taken based solely on the matrix3d() values)
					var a13 = m[8], a23 = m[9], a33 = m[10],
						a14 = m[12], a24 = m[13], a34 = m[14];

					//we manually compensate for non-zero z component of transformOrigin to work around bugs in Safari
					if (tm.zOrigin) {
						a34 = -tm.zOrigin;
						a14 = a13*a34-m[12];
						a24 = a23*a34-m[13];
						a34 = a33*a34+tm.zOrigin-m[14];
					}

					//only parse from the matrix if we MUST because not only is it usually unnecessary due to the fact that we store the values in the _gsTransform object, but also because it's impossible to accurately interpret rotationX, rotationY, and rotationZ if all are applied, so it's much better to rely on what we store. However, we must parse the first time that an object is tweened. We also assume that if the position has changed, the user must have done some styling changes outside of CSSPlugin, thus we force a parse in that scenario.
					if (!rec || tm.rotationX == null) {
						var a11 = m[0], a21 = m[1], a31 = m[2], a41 = m[3],
							a12 = m[4], a22 = m[5], a32 = m[6], a42 = m[7],
							a43 = m[11],
							angle = tm.rotationX = Math.atan2(a32, a33),
							xFlip = (angle < minPI || angle > maxPI),
							t1, t2, t3, cos, sin, yFlip, zFlip;
						//rotationX
						if (angle) {
							cos = Math.cos(-angle);
							sin = Math.sin(-angle);
							t1 = a12*cos+a13*sin;
							t2 = a22*cos+a23*sin;
							t3 = a32*cos+a33*sin;
							//t4 = a42*cos+a43*sin;
							a13 = a12*-sin+a13*cos;
							a23 = a22*-sin+a23*cos;
							a33 = a32*-sin+a33*cos;
							a43 = a42*-sin+a43*cos;
							a12 = t1;
							a22 = t2;
							a32 = t3;
							//a42 = t4;
						}
						//rotationY
						angle = tm.rotationY = Math.atan2(a13, a11);
						if (angle) {
							yFlip = (angle < minPI || angle > maxPI);
							cos = Math.cos(-angle);
							sin = Math.sin(-angle);
							t1 = a11*cos-a13*sin;
							t2 = a21*cos-a23*sin;
							t3 = a31*cos-a33*sin;
							//t4 = a41*cos-a43*sin;
							//a13 = a11*sin+a13*cos;
							a23 = a21*sin+a23*cos;
							a33 = a31*sin+a33*cos;
							a43 = a41*sin+a43*cos;
							a11 = t1;
							a21 = t2;
							a31 = t3;
							//a41 = t4;
						}
						//rotationZ
						angle = tm.rotation = Math.atan2(a21, a22);
						if (angle) {
							zFlip = (angle < minPI || angle > maxPI);
							cos = Math.cos(-angle);
							sin = Math.sin(-angle);
							a11 = a11*cos+a12*sin;
							t2 = a21*cos+a22*sin;
							a22 = a21*-sin+a22*cos;
							a32 = a31*-sin+a32*cos;
							a21 = t2;
						}

						if (zFlip && xFlip) {
							tm.rotation = tm.rotationX = 0;
						} else if (zFlip && yFlip) {
							tm.rotation = tm.rotationY = 0;
						} else if (yFlip && xFlip) {
							tm.rotationY = tm.rotationX = 0;
						}

						tm.scaleX = ((Math.sqrt(a11 * a11 + a21 * a21) * rnd + 0.5) | 0) / rnd;
						tm.scaleY = ((Math.sqrt(a22 * a22 + a23 * a23) * rnd + 0.5) | 0) / rnd;
						tm.scaleZ = ((Math.sqrt(a32 * a32 + a33 * a33) * rnd + 0.5) | 0) / rnd;
						tm.skewX = 0;
						tm.perspective = a43 ? 1 / ((a43 < 0) ? -a43 : a43) : 0;
						tm.x = a14;
						tm.y = a24;
						tm.z = a34;
					}

				} else if ((!_supports3D || m.length === 0 || tm.x !== m[4] || tm.y !== m[5] || (!tm.rotationX && !tm.rotationY)) && !(tm.x !== undefined && _getStyle(t, "display", cs) === "none")) { //sometimes a 6-element matrix is returned even when we performed 3D transforms, like if rotationX and rotationY are 180. In cases like this, we still need to honor the 3D transforms. If we just rely on the 2D info, it could affect how the data is interpreted, like scaleY might get set to -1 or rotation could get offset by 180 degrees. For example, do a TweenLite.to(element, 1, {css:{rotationX:180, rotationY:180}}) and then later, TweenLite.to(element, 1, {css:{rotationX:0}}) and without this conditional logic in place, it'd jump to a state of being unrotated when the 2nd tween starts. Then again, we need to honor the fact that the user COULD alter the transforms outside of CSSPlugin, like by manually applying new css, so we try to sense that by looking at x and y because if those changed, we know the changes were made outside CSSPlugin and we force a reinterpretation of the matrix values. Also, in Webkit browsers, if the element's "display" is "none", its calculated style value will always return empty, so if we've already recorded the values in the _gsTransform object, we'll just rely on those.
					var k = (m.length >= 6),
						a = k ? m[0] : 1,
						b = m[1] || 0,
						c = m[2] || 0,
						d = k ? m[3] : 1;

					tm.x = m[4] || 0;
					tm.y = m[5] || 0;
					scaleX = Math.sqrt(a * a + b * b);
					scaleY = Math.sqrt(d * d + c * c);
					rotation = (a || b) ? Math.atan2(b, a) : tm.rotation || 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).
					skewX = (c || d) ? Math.atan2(c, d) + rotation : tm.skewX || 0;
					difX = scaleX - Math.abs(tm.scaleX || 0);
					difY = scaleY - Math.abs(tm.scaleY || 0);
					if (Math.abs(skewX) > Math.PI / 2 && Math.abs(skewX) < Math.PI * 1.5) {
						if (invX) {
							scaleX *= -1;
							skewX += (rotation <= 0) ? Math.PI : -Math.PI;
							rotation += (rotation <= 0) ? Math.PI : -Math.PI;
						} else {
							scaleY *= -1;
							skewX += (skewX <= 0) ? Math.PI : -Math.PI;
						}
					}
					difR = (rotation - tm.rotation) % Math.PI; //note: matching ranges would be very small (+/-0.0001) or very close to Math.PI (+/-3.1415).
					difS = (skewX - tm.skewX) % Math.PI;
					//if there's already a recorded _gsTransform in place for the target, we should leave those values in place unless we know things changed for sure (beyond a super small amount). This gets around ambiguous interpretations, like if scaleX and scaleY are both -1, the matrix would be the same as if the rotation was 180 with normal scaleX/scaleY. If the user tweened to particular values, those must be prioritized to ensure animation is consistent.
					if (tm.skewX === undefined || difX > min || difX < -min || difY > min || difY < -min || (difR > minPI && difR < maxPI && (difR * rnd) | 0 !== 0) || (difS > minPI && difS < maxPI && (difS * rnd) | 0 !== 0)) {
						tm.scaleX = scaleX;
						tm.scaleY = scaleY;
						tm.rotation = rotation;
						tm.skewX = skewX;
					}
					if (_supports3D) {
						tm.rotationX = tm.rotationY = tm.z = 0;
						tm.perspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0;
						tm.scaleZ = 1;
					}
				}
				tm.zOrigin = zOrigin;

				//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 0 in these cases. The conditional logic here is faster than calling Math.abs(). Also, browsers tend to render a SLIGHTLY rotated object in a fuzzy way, so we need to snap to exactly 0 when appropriate.
				for (i in tm) {
					if (tm[i] < min) if (tm[i] > -min) {
						tm[i] = 0;
					}
				}
				//DEBUG: _log("parsed rotation: "+(tm.rotationX*_RAD2DEG)+", "+(tm.rotationY*_RAD2DEG)+", "+(tm.rotation*_RAD2DEG)+", scale: "+tm.scaleX+", "+tm.scaleY+", "+tm.scaleZ+", position: "+tm.x+", "+tm.y+", "+tm.z+", perspective: "+tm.perspective);
				if (rec) {
					t._gsTransform = tm; //record to the object's _gsTransform which we use so that tweens can control individual properties independently (we need all the properties to accurately recompose the matrix in the setRatio() method)
				}
				return tm;
			},
			//for setting 2D transforms in IE6, IE7, and IE8 (must use a "filter" to emulate the behavior of modern day browser transforms)
			_setIETransformRatio = function(v) {
				var t = this.data, //refers to the element's _gsTransform object
					ang = -t.rotation,
					skew = ang + t.skewX,
					rnd = 100000,
					a = ((Math.cos(ang) * t.scaleX * rnd) | 0) / rnd,
					b = ((Math.sin(ang) * t.scaleX * rnd) | 0) / rnd,
					c = ((Math.sin(skew) * -t.scaleY * rnd) | 0) / rnd,
					d = ((Math.cos(skew) * t.scaleY * rnd) | 0) / rnd,
					style = this.t.style,
					cs = this.t.currentStyle,
					filters, val;
				if (!cs) {
					return;
				}
				val = b; //just for swapping the variables an inverting them (reused "val" to avoid creating another variable in memory). IE's filter matrix uses a non-standard matrix configuration (angle goes the opposite way, and b and c are reversed and inverted)
				b = -c;
				c = -val;
				filters = cs.filter;
				style.filter = ""; //remove filters so that we can accurately measure offsetWidth/offsetHeight
				var w = this.t.offsetWidth,
					h = this.t.offsetHeight,
					clip = (cs.position !== "absolute"),
					m = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + b + ", M21=" + c + ", M22=" + d,
					ox = t.x,
					oy = t.y,
					dx, dy;

				//if transformOrigin is being used, adjust the offset x and y
				if (t.ox != null) {
					dx = ((t.oxp) ? w * t.ox * 0.01 : t.ox) - w / 2;
					dy = ((t.oyp) ? h * t.oy * 0.01 : t.oy) - h / 2;
					ox += dx - (dx * a + dy * b);
					oy += dy - (dx * c + dy * d);
				}

				if (!clip) {
					var mult = (_ieVers < 8) ? 1 : -1, //in Internet Explorer 7 and before, the box model is broken, causing the browser to treat the width/height of the actual rotated filtered image as the width/height of the box itself, but Microsoft corrected that in IE8. We must use a negative offset in IE8 on the right/bottom
						marg, prop, dif;
					dx = t.ieOffsetX || 0;
					dy = t.ieOffsetY || 0;
					t.ieOffsetX = Math.round((w - ((a < 0 ? -a : a) * w + (b < 0 ? -b : b) * h)) / 2 + ox);
					t.ieOffsetY = Math.round((h - ((d < 0 ? -d : d) * h + (c < 0 ? -c : c) * w)) / 2 + oy);
					for (i = 0; i < 4; i++) {
						prop = _margins[i];
						marg = cs[prop];
						//we need to get the current margin in case it is being tweened separately (we want to respect that tween's changes)
						val = (marg.indexOf("px") !== -1) ? parseFloat(marg) : _convertToPixels(this.t, prop, parseFloat(marg), marg.replace(_suffixExp, "")) || 0;
						if (val !== t[prop]) {
							dif = (i < 2) ? -t.ieOffsetX : -t.ieOffsetY; //if another tween is controlling a margin, we cannot only apply the difference in the ieOffsets, so we essentially zero-out the dx and dy here in that case. We record the margin(s) later so that we can keep comparing them, making this code very flexible.
						} else {
							dif = (i < 2) ? dx - t.ieOffsetX : dy - t.ieOffsetY;
						}
						style[prop] = (t[prop] = Math.round( val - dif * ((i === 0 || i === 2) ? 1 : mult) )) + "px";
					}
					m += ", sizingMethod='auto expand')";
				} else {
					dx = (w / 2);
					dy = (h / 2);
					//translate to ensure that transformations occur around the correct origin (default is center).
					m += ", Dx=" + (dx - (dx * a + dy * b) + ox) + ", Dy=" + (dy - (dx * c + dy * d) + oy) + ")";
				}
				if (filters.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1) {
					style.filter = filters.replace(_ieSetMatrixExp, m);
				} else {
					style.filter = m + " " + filters; //we must always put the transform/matrix FIRST (before alpha(opacity=xx)) to avoid an IE bug that slices part of the object when rotation is applied with alpha.
				}

				//at the end or beginning of the tween, if the matrix is normal (1, 0, 0, 1) and opacity is 100 (or doesn't exist), remove the filter to improve browser performance.
				if (v === 0 || v === 1) if (a === 1) if (b === 0) if (c === 0) if (d === 1) if (!clip || m.indexOf("Dx=0, Dy=0") !== -1) if (!_opacityExp.test(filters) || parseFloat(RegExp.$1) === 100) if (filters.indexOf("gradient(") === -1) {
					style.removeAttribute("filter");
				}
			},
			_set3DTransformRatio = function(v) {
				var t = this.data, //refers to the element's _gsTransform object
					style = this.t.style,
					perspective = t.perspective,
					a11 = t.scaleX, a12 = 0, a13 = 0, a14 = 0,
					a21 = 0, a22 = t.scaleY, a23 = 0, a24 = 0,
					a31 = 0, a32 = 0, a33 = t.scaleZ, a34 = 0,
					a41 = 0, a42 = 0, a43 = (perspective) ? -1 / perspective : 0,
					angle = t.rotation,
					zOrigin = t.zOrigin,
					rnd = 100000,
					cos, sin, t1, t2, t3, t4, ffProp, n, sfx;

				if (_isFirefox) { //Firefox has a bug that causes 3D elements to randomly disappear during animation unless a repaint is forced. One way to do this is change "top" or "bottom" by 0.05 which is imperceptible, so we go back and forth. Another way is to change the display to "none", read the clientTop, and then revert the display but that is much slower.
					ffProp = style.top ? "top" : style.bottom ? "bottom" : parseFloat(_getStyle(this.t, "top", null, false)) ? "bottom" : "top";
					t1 = _getStyle(this.t, ffProp, null, false);
					n = parseFloat(t1) || 0;
					sfx = t1.substr((n + "").length) || "px";
					t._ffFix = !t._ffFix;
					style[ffProp] = (t._ffFix ? n + 0.05 : n - 0.05) + sfx;
				}

				if (angle || t.skewX) {
					t1 = a11*Math.cos(angle);
					t2 = a22*Math.sin(angle);
					angle -= t.skewX;
					a12 = a11*-Math.sin(angle);
					a22 = a22*Math.cos(angle);
					a11 = t1;
					a21 = t2;
				}
				angle = t.rotationY;
				if (angle) {
					cos = Math.cos(angle);
					sin = Math.sin(angle);
					t1 = a11*cos;
					t2 = a21*cos;
					t3 = a33*-sin;
					t4 = a43*-sin;
					a13 = a11*sin;
					a23 = a21*sin;
					a33 = a33*cos;
					a43 *= cos;
					a11 = t1;
					a21 = t2;
					a31 = t3;
					a41 = t4;
				}
				angle = t.rotationX;
				if (angle) {
					cos = Math.cos(angle);
					sin = Math.sin(angle);
					t1 = a12*cos+a13*sin;
					t2 = a22*cos+a23*sin;
					t3 = a32*cos+a33*sin;
					t4 = a42*cos+a43*sin;
					a13 = a12*-sin+a13*cos;
					a23 = a22*-sin+a23*cos;
					a33 = a32*-sin+a33*cos;
					a43 = a42*-sin+a43*cos;
					a12 = t1;
					a22 = t2;
					a32 = t3;
					a42 = t4;
				}
				if (zOrigin) {
					a34 -= zOrigin;
					a14 = a13*a34;
					a24 = a23*a34;
					a34 = a33*a34+zOrigin;
				}
				//we round the x, y, and z slightly differently to allow even larger values.
				a14 = (t1 = (a14 += t.x) - (a14 |= 0)) ? ((t1 * rnd + (t1 < 0 ? -0.5 : 0.5)) | 0) / rnd + a14 : a14;
				a24 = (t1 = (a24 += t.y) - (a24 |= 0)) ? ((t1 * rnd + (t1 < 0 ? -0.5 : 0.5)) | 0) / rnd + a24 : a24;
				a34 = (t1 = (a34 += t.z) - (a34 |= 0)) ? ((t1 * rnd + (t1 < 0 ? -0.5 : 0.5)) | 0) / rnd + a34 : a34;
				style[_transformProp] = "matrix3d(" + [ (((a11 * rnd) | 0) / rnd), (((a21 * rnd) | 0) / rnd), (((a31 * rnd) | 0) / rnd), (((a41 * rnd) | 0) / rnd), (((a12 * rnd) | 0) / rnd), (((a22 * rnd) | 0) / rnd), (((a32 * rnd) | 0) / rnd), (((a42 * rnd) | 0) / rnd), (((a13 * rnd) | 0) / rnd), (((a23 * rnd) | 0) / rnd), (((a33 * rnd) | 0) / rnd), (((a43 * rnd) | 0) / rnd), a14, a24, a34, (perspective ? (1 + (-a34 / perspective)) : 1) ].join(",") + ")";
			},
			_set2DTransformRatio = function(v) {
				var t = this.data, //refers to the element's _gsTransform object
					targ = this.t,
					style = targ.style,
					ffProp, t1, n, sfx, ang, skew, rnd, sx, sy;
				if (_isFirefox) { //Firefox has a bug that causes elements to randomly disappear during animation unless a repaint is forced. One way to do this is change "top" or "bottom" by 0.05 which is imperceptible, so we go back and forth. Another way is to change the display to "none", read the clientTop, and then revert the display but that is much slower.
					ffProp = style.top ? "top" : style.bottom ? "bottom" : parseFloat(_getStyle(targ, "top", null, false)) ? "bottom" : "top";
					t1 = _getStyle(targ, ffProp, null, false);
					n = parseFloat(t1) || 0;
					sfx = t1.substr((n + "").length) || "px";
					t._ffFix = !t._ffFix;
					style[ffProp] = (t._ffFix ? n + 0.05 : n - 0.05) + sfx;
				}
				if (!t.rotation && !t.skewX) {
					style[_transformProp] = "matrix(" + t.scaleX + ",0,0," + t.scaleY + "," + t.x + "," + t.y + ")";
				} else {
					ang = t.rotation;
					skew = ang - t.skewX;
					rnd = 100000;
					sx = t.scaleX * rnd;
					sy = t.scaleY * rnd;
					//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 5 decimal places.
					style[_transformProp] = "matrix(" + (((Math.cos(ang) * sx) | 0) / rnd) + "," + (((Math.sin(ang) * sx) | 0) / rnd) + "," + (((Math.sin(skew) * -sy) | 0) / rnd) + "," + (((Math.cos(skew) * sy) | 0) / rnd) + "," + t.x + "," + t.y + ")";
				}
			};

		_registerComplexSpecialProp("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation", {parser:function(t, e, p, cssp, pt, plugin, vars) {
			if (cssp._transform) { return pt; } //only need to parse the transform once, and only if the browser supports it.
			var m1 = cssp._transform = _getTransform(t, _cs, true),
				style = t.style,
				min = 0.000001,
				i = _transformProps.length,
				v = vars,
				endRotations = {},
				m2, skewY, copy, orig, has3D, hasChange, dr;

			if (typeof(v.transform) === "string" && _transformProp) { //for values like transform:"rotate(60deg) scale(0.5, 0.8)"
				copy = style.cssText;
				style[_transformProp] = v.transform;
				style.display = "block"; //if display is "none", the browser often refuses to report the transform properties correctly.
				m2 = _getTransform(t, null, false);
				style.cssText = copy;
			} else if (typeof(v) === "object") { //for values like scaleX, scaleY, rotation, x, y, skewX, and skewY or transform:{...} (object)
				m2 = {scaleX:_parseVal((v.scaleX != null) ? v.scaleX : v.scale, m1.scaleX),
					scaleY:_parseVal((v.scaleY != null) ? v.scaleY : v.scale, m1.scaleY),
					scaleZ:_parseVal((v.scaleZ != null) ? v.scaleZ : v.scale, m1.scaleZ),
					x:_parseVal(v.x, m1.x),
					y:_parseVal(v.y, m1.y),
					z:_parseVal(v.z, m1.z),
					perspective:_parseVal(v.transformPerspective, m1.perspective)};
				dr = v.directionalRotation;
				if (dr != null) {
					if (typeof(dr) === "object") {
						for (copy in dr) {
							v[copy] = dr[copy];
						}
					} else {
						v.rotation = dr;
					}
				}
				m2.rotation = _parseAngle(("rotation" in v) ? v.rotation : ("shortRotation" in v) ? v.shortRotation + "_short" : ("rotationZ" in v) ? v.rotationZ : (m1.rotation * _RAD2DEG), m1.rotation, "rotation", endRotations);
				if (_supports3D) {
					m2.rotationX = _parseAngle(("rotationX" in v) ? v.rotationX : ("shortRotationX" in v) ? v.shortRotationX + "_short" : (m1.rotationX * _RAD2DEG) || 0, m1.rotationX, "rotationX", endRotations);
					m2.rotationY = _parseAngle(("rotationY" in v) ? v.rotationY : ("shortRotationY" in v) ? v.shortRotationY + "_short" : (m1.rotationY * _RAD2DEG) || 0, m1.rotationY, "rotationY", endRotations);
				}
				m2.skewX = (v.skewX == null) ? m1.skewX : _parseAngle(v.skewX, m1.skewX);

				//note: for performance reasons, we combine all skewing into the skewX and rotation values, ignoring skewY but we must still record it so that we can discern how much of the overall skew is attributed to skewX vs. skewY. Otherwise, if the skewY would always act relative (tween skewY to 10deg, for example, multiple times and if we always combine things into skewX, we can't remember that skewY was 10 from last time). Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of -10 degrees.
				m2.skewY = (v.skewY == null) ? m1.skewY : _parseAngle(v.skewY, m1.skewY);
				if ((skewY = m2.skewY - m1.skewY)) {
					m2.skewX += skewY;
					m2.rotation += skewY;
				}
			}

			has3D = (m1.z || m1.rotationX || m1.rotationY || m2.z || m2.rotationX || m2.rotationY || m2.perspective);
			if (!has3D && v.scale != null) {
				m2.scaleZ = 1; //no need to tween scaleZ.
			}

			while (--i > -1) {
				p = _transformProps[i];
				orig = m2[p] - m1[p];
				if (orig > min || orig < -min || _forcePT[p] != null) {
					hasChange = true;
					pt = new CSSPropTween(m1, p, m1[p], orig, pt);
					if (p in endRotations) {
						pt.e = endRotations[p]; //directional rotations typically have compensated values during the tween, but we need to make sure they end at exactly what the user requested
					}
					pt.xs0 = 0; //ensures the value stays numeric in setRatio()
					pt.plugin = plugin;
					cssp._overwriteProps.push(pt.n);
				}
			}

			orig = v.transformOrigin;
			if (orig || (_supports3D && has3D && m1.zOrigin)) { //if anything 3D is happening and there's a transformOrigin with a z component that's non-zero, we must ensure that the transformOrigin's z-component is set to 0 so that we can manually do those calculations to get around Safari bugs. Even if the user didn't specifically define a "transformOrigin" in this particular tween (maybe they did it via css directly).
				if (_transformProp) {
					hasChange = true;
					orig = (orig || _getStyle(t, p, _cs, false, "50% 50%")) + ""; //cast as string to avoid errors
					p = _transformOriginProp;
					pt = new CSSPropTween(style, p, 0, 0, pt, -1, "css_transformOrigin");
					pt.b = style[p];
					pt.plugin = plugin;
					if (_supports3D) {
						copy = m1.zOrigin;
						orig = orig.split(" ");
						m1.zOrigin = ((orig.length > 2) ? parseFloat(orig[2]) : copy) || 0; //Safari doesn't handle the z part of transformOrigin correctly, so we'll manually handle it in the _set3DTransformRatio() method.
						pt.xs0 = pt.e = style[p] = orig[0] + " " + (orig[1] || "50%") + " 0px"; //we must define a z value of 0px specifically otherwise iOS 5 Safari will stick with the old one (if one was defined)!
						pt = new CSSPropTween(m1, "zOrigin", 0, 0, pt, -1, pt.n); //we must create a CSSPropTween for the _gsTransform.zOrigin so that it gets reset properly at the beginning if the tween runs backward (as opposed to just setting m1.zOrigin here)
						pt.b = copy;
						pt.xs0 = pt.e = m1.zOrigin;
					} else {
						pt.xs0 = pt.e = style[p] = orig;
					}

				//for older versions of IE (6-8), we need to manually calculate things inside the setRatio() function. We record origin x and y (ox and oy) and whether or not the values are percentages (oxp and oyp).
				} else {
					_parsePosition(orig + "", m1);
				}
			}

			if (hasChange) {
				cssp._transformType = (has3D || this._transformType === 3) ? 3 : 2; //quicker than calling cssp._enableTransforms();
			}
			return pt;
		}, prefix:true});

		_registerComplexSpecialProp("boxShadow", {defaultValue:"0px 0px 0px 0px #999", prefix:true, color:true, multi:true, keyword:"inset"});

		_registerComplexSpecialProp("borderRadius", {defaultValue:"0px", parser:function(t, e, p, cssp, pt, plugin) {
			e = this.format(e);
			var props = ["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],
				style = t.style,
				ea1, i, es2, bs2, bs, es, bn, en, w, h, esfx, bsfx, rel, hn, vn, em;
			w = parseFloat(t.offsetWidth);
			h = parseFloat(t.offsetHeight);
			ea1 = e.split(" ");
			for (i = 0; i < props.length; i++) { //if we're dealing with percentages, we must convert things separately for the horizontal and vertical axis!
				if (this.p.indexOf("border")) { //older browsers used a prefix
					props[i] = _checkPropPrefix(props[i]);
				}
				bs = bs2 = _getStyle(t, props[i], _cs, false, "0px");
				if (bs.indexOf(" ") !== -1) {
					bs2 = bs.split(" ");
					bs = bs2[0];
					bs2 = bs2[1];
				}
				es = es2 = ea1[i];
				bn = parseFloat(bs);
				bsfx = bs.substr((bn + "").length);
				rel = (es.charAt(1) === "=");
				if (rel) {
					en = parseInt(es.charAt(0)+"1", 10);
					es = es.substr(2);
					en *= parseFloat(es);
					esfx = es.substr((en + "").length - (en < 0 ? 1 : 0)) || "";
				} else {
					en = parseFloat(es);
					esfx = es.substr((en + "").length);
				}
				if (esfx === "") {
					esfx = _suffixMap[p] || bsfx;
				}
				if (esfx !== bsfx) {
					hn = _convertToPixels(t, "borderLeft", bn, bsfx); //horizontal number (we use a bogus "borderLeft" property just because the _convertToPixels() method searches for the keywords "Left", "Right", "Top", and "Bottom" to determine of it's a horizontal or vertical property, and we need "border" in the name so that it knows it should measure relative to the element itself, not its parent.
					vn = _convertToPixels(t, "borderTop", bn, bsfx); //vertical number
					if (esfx === "%") {
						bs = (hn / w * 100) + "%";
						bs2 = (vn / h * 100) + "%";
					} else if (esfx === "em") {
						em = _convertToPixels(t, "borderLeft", 1, "em");
						bs = (hn / em) + "em";
						bs2 = (vn / em) + "em";
					} else {
						bs = hn + "px";
						bs2 = vn + "px";
					}
					if (rel) {
						es = (parseFloat(bs) + en) + esfx;
						es2 = (parseFloat(bs2) + en) + esfx;
					}
				}
				pt = _parseComplex(style, props[i], bs + " " + bs2, es + " " + es2, false, "0px", pt);
			}
			return pt;
		}, prefix:true, formatter:_getFormatter("0px 0px 0px 0px", false, true)});
		_registerComplexSpecialProp("backgroundPosition", {defaultValue:"0 0", parser:function(t, e, p, cssp, pt, plugin) {
			var bp = "background-position",
				cs = (_cs || _getComputedStyle(t, null)),
				bs = this.format( ((cs) ? _ieVers ? cs.getPropertyValue(bp + "-x") + " " + cs.getPropertyValue(bp + "-y") : cs.getPropertyValue(bp) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"), //Internet Explorer doesn't report background-position correctly - we must query background-position-x and background-position-y and combine them (even in IE10). Before IE9, we must do the same with the currentStyle object and use camelCase
				es = this.format(e),
				ba, ea, i, pct, overlap, src;
			if ((bs.indexOf("%") !== -1) !== (es.indexOf("%") !== -1)) {
				src = _getStyle(t, "backgroundImage").replace(_urlExp, "");
				if (src && src !== "none") {
					ba = bs.split(" ");
					ea = es.split(" ");
					_tempImg.setAttribute("src", src); //set the temp <img>'s src to the background-image so that we can measure its width/height
					i = 2;
					while (--i > -1) {
						bs = ba[i];
						pct = (bs.indexOf("%") !== -1);
						if (pct !== (ea[i].indexOf("%") !== -1)) {
							overlap = (i === 0) ? t.offsetWidth - _tempImg.width : t.offsetHeight - _tempImg.height;
							ba[i] = pct ? (parseFloat(bs) / 100 * overlap) + "px" : (parseFloat(bs) / overlap * 100) + "%";
						}
					}
					bs = ba.join(" ");
				}
			}
			return this.parseComplex(t.style, bs, es, pt, plugin);
		}, formatter:_parsePosition}); //note: backgroundPosition doesn't support interpreting between px and % (start and end values should use the same units) because doing so would require determining the size of the image itself and that can't be done quickly.
		_registerComplexSpecialProp("backgroundSize", {defaultValue:"0 0", formatter:_parsePosition});
		_registerComplexSpecialProp("perspective", {defaultValue:"0px", prefix:true});
		_registerComplexSpecialProp("perspectiveOrigin", {defaultValue:"50% 50%", prefix:true});
		_registerComplexSpecialProp("transformStyle", {prefix:true});
		_registerComplexSpecialProp("backfaceVisibility", {prefix:true});
		_registerComplexSpecialProp("margin", {parser:_getEdgeParser("marginTop,marginRight,marginBottom,marginLeft")});
		_registerComplexSpecialProp("padding", {parser:_getEdgeParser("paddingTop,paddingRight,paddingBottom,paddingLeft")});
		_registerComplexSpecialProp("clip", {defaultValue:"rect(0px,0px,0px,0px)", parser:function(t, e, p, cssp, pt, plugin){
			var b, cs, delim;
			if (_ieVers < 9) { //IE8 and earlier don't report a "clip" value in the currentStyle - instead, the values are split apart into clipTop, clipRight, clipBottom, and clipLeft. Also, in IE7 and earlier, the values inside rect() are space-delimited, not comma-delimited.
				cs = t.currentStyle;
				delim = _ieVers < 8 ? " " : ",";
				b = "rect(" + cs.clipTop + delim + cs.clipRight + delim + cs.clipBottom + delim + cs.clipLeft + ")";
				e = this.format(e).split(",").join(delim);
			} else {
				b = this.format(_getStyle(t, this.p, _cs, false, this.dflt));
				e = this.format(e);
			}
			return this.parseComplex(t.style, b, e, pt, plugin);
		}});
		_registerComplexSpecialProp("textShadow", {defaultValue:"0px 0px 0px #999", color:true, multi:true});
		_registerComplexSpecialProp("autoRound,strictUnits", {parser:function(t, e, p, cssp, pt) {return pt;}}); //just so that we can ignore these properties (not tween them)
		_registerComplexSpecialProp("border", {defaultValue:"0px solid #000", parser:function(t, e, p, cssp, pt, plugin) {
				return this.parseComplex(t.style, this.format(_getStyle(t, "borderTopWidth", _cs, false, "0px") + " " + _getStyle(t, "borderTopStyle", _cs, false, "solid") + " " + _getStyle(t, "borderTopColor", _cs, false, "#000")), this.format(e), pt, plugin);
			}, color:true, formatter:function(v) {
				var a = v.split(" ");
				return a[0] + " " + (a[1] || "solid") + " " + (v.match(_colorExp) || ["#000"])[0];
			}});
		_registerComplexSpecialProp("float,cssFloat,styleFloat", {parser:function(t, e, p, cssp, pt, plugin) {
			var s = t.style,
				prop = ("cssFloat" in s) ? "cssFloat" : "styleFloat";
			return new CSSPropTween(s, prop, 0, 0, pt, -1, p, false, 0, s[prop], e);
		}});

		//opacity-related
		var _setIEOpacityRatio = function(v) {
				var t = this.t, //refers to the element's style property
					filters = t.filter,
					val = (this.s + this.c * v) | 0,
					skip;
				if (val === 100) { //for older versions of IE that need to use a filter to apply opacity, we should remove the filter if opacity hits 1 in order to improve performance, but make sure there isn't a transform (matrix) or gradient in the filters.
					if (filters.indexOf("atrix(") === -1 && filters.indexOf("radient(") === -1) {
						t.removeAttribute("filter");
						skip = (!_getStyle(this.data, "filter")); //if a class is applied that has an alpha filter, it will take effect (we don't want that), so re-apply our alpha filter in that case. We must first remove it and then check.
					} else {
						t.filter = filters.replace(_alphaFilterExp, "");
						skip = true;
					}
				}
				if (!skip) {
					if (this.xn1) {
						t.filter = filters = filters || "alpha(opacity=100)"; //works around bug in IE7/8 that prevents changes to "visibility" from being applied properly if the filter is changed to a different alpha on the same frame.
					}
					if (filters.indexOf("opacity") === -1) { //only used if browser doesn't support the standard opacity style property (IE 7 and 8)
						t.filter += " alpha(opacity=" + val + ")"; //we round the value because otherwise, bugs in IE7/8 can prevent "visibility" changes from being applied properly.
					} else {
						t.filter = filters.replace(_opacityExp, "opacity=" + val);
					}
				}
			};
		_registerComplexSpecialProp("opacity,alpha,autoAlpha", {defaultValue:"1", parser:function(t, e, p, cssp, pt, plugin) {
			var b = parseFloat(_getStyle(t, "opacity", _cs, false, "1")),
				style = t.style,
				vb;
			e = parseFloat(e);
			if (p === "autoAlpha") {
				vb = _getStyle(t, "visibility", _cs);
				if (b === 1 && vb === "hidden" && e !== 0) { //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
					b = 0;
				}
				pt = new CSSPropTween(style, "visibility", 0, 0, pt, -1, null, false, 0, ((b !== 0) ? "visible" : "hidden"), ((e === 0) ? "hidden" : "visible"));
				pt.xs0 = "visible";
				cssp._overwriteProps.push(pt.n);
			}
			if (_supportsOpacity) {
				pt = new CSSPropTween(style, "opacity", b, e - b, pt);
			} else {
				pt = new CSSPropTween(style, "opacity", b * 100, (e - b) * 100, pt);
				pt.xn1 = (p === "autoAlpha") ? 1 : 0; //we need to record whether or not this is an autoAlpha so that in the setRatio(), we know to duplicate the setting of the alpha in order to work around a bug in IE7 and IE8 that prevents changes to "visibility" from taking effect if the filter is changed to a different alpha(opacity) at the same time. Setting it to the SAME value first, then the new value works around the IE7/8 bug.
				style.zoom = 1; //helps correct an IE issue.
				pt.type = 2;
				pt.b = "alpha(opacity=" + pt.s + ")";
				pt.e = "alpha(opacity=" + (pt.s + pt.c) + ")";
				pt.data = t;
				pt.plugin = plugin;
				pt.setRatio = _setIEOpacityRatio;
			}
			return pt;
		}});


		var _removeProp = function(s, p) {
				if (p) {
					if (s.removeProperty) {
						s.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
					} else { //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
						s.removeAttribute(p);
					}
				}
			},
			_setClassNameRatio = function(v) {
				this.t._gsClassPT = this;
				if (v === 1 || v === 0) {
					this.t.className = (v === 0) ? this.b : this.e;
					var mpt = this.data, //first MiniPropTween
						s = this.t.style;
					while (mpt) {
						if (!mpt.v) {
							_removeProp(s, mpt.p);
						} else {
							s[mpt.p] = mpt.v;
						}
						mpt = mpt._next;
					}
					if (v === 1 && this.t._gsClassPT === this) {
						this.t._gsClassPT = null;
					}
				} else if (this.t.className !== this.e) {
					this.t.className = this.e;
				}
			};
		_registerComplexSpecialProp("className", {parser:function(t, e, p, cssp, pt, plugin, vars) {
			var b = t.className,
				cssText = t.style.cssText,
				difData, bs, cnpt, cnptLookup, mpt;
			pt = cssp._classNamePT = new CSSPropTween(t, p, 0, 0, pt, 2);
			pt.setRatio = _setClassNameRatio;
			pt.pr = -11;
			_hasPriority = true;
			pt.b = b;
			bs = _getAllStyles(t, _cs);
			//if there's a className tween already operating on the target, force it to its end so that the necessary inline styles are removed and the class name is applied before we determine the end state (we don't want inline styles interfering that were there just for class-specific values)
			cnpt = t._gsClassPT;
			if (cnpt) {
				cnptLookup = {};
				mpt = cnpt.data; //first MiniPropTween which stores the inline styles - we need to force these so that the inline styles don't contaminate things. Otherwise, there's a small chance that a tween could start and the inline values match the destination values and they never get cleaned.
				while (mpt) {
					cnptLookup[mpt.p] = 1;
					mpt = mpt._next;
				}
				cnpt.setRatio(1);
			}
			t._gsClassPT = pt;
			pt.e = (e.charAt(1) !== "=") ? e : b.replace(new RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ((e.charAt(0) === "+") ? " " + e.substr(2) : "");
			if (cssp._tween._duration) { //if it's a zero-duration tween, there's no need to tween anything or parse the data. In fact, if we switch classes temporarily (which we must do for proper parsing) and the class has a transition applied, it could cause a quick flash to the end state and back again initially in some browsers.
				t.className = pt.e;
				difData = _cssDif(t, bs, _getAllStyles(t), vars, cnptLookup);
				t.className = b;
				pt.data = difData.firstMPT;
				t.style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
				pt = pt.xfirst = cssp.parse(t, difData.difs, pt, plugin); //we record the CSSPropTween as the xfirst so that we can handle overwriting propertly (if "className" gets overwritten, we must kill all the properties associated with the className part of the tween, so we can loop through from xfirst to the pt itself)
			}
			return pt;
		}});


		var _setClearPropsRatio = function(v) {
			if (v === 1 || v === 0) if (this.data._totalTime === this.data._totalDuration) { //this.data refers to the tween. Only clear at the END of the tween (remember, from() tweens make the ratio go from 1 to 0, so we can't just check that).
				var all = (this.e === "all"),
					s = this.t.style,
					a = all ? s.cssText.split(";") : this.e.split(","),
					i = a.length,
					transformParse = _specialProps.transform.parse,
					p;
				while (--i > -1) {
					p = a[i];
					if (all) {
						p = p.substr(0, p.indexOf(":")).split(" ").join("");
					}
					if (_specialProps[p]) {
						p = (_specialProps[p].parse === transformParse) ? _transformProp : _specialProps[p].p; //ensures that special properties use the proper browser-specific property name, like "scaleX" might be "-webkit-transform" or "boxShadow" might be "-moz-box-shadow"
					}
					_removeProp(s, p);
				}
			}
		};
		_registerComplexSpecialProp("clearProps", {parser:function(t, e, p, cssp, pt) {
			pt = new CSSPropTween(t, p, 0, 0, pt, 2);
			pt.setRatio = _setClearPropsRatio;
			pt.e = e;
			pt.pr = -10;
			pt.data = cssp._tween;
			_hasPriority = true;
			return pt;
		}});

		p = "bezier,throwProps,physicsProps,physics2D".split(",");
		i = p.length;
		while (i--) {
			_registerPluginProp(p[i]);
		}








		p = CSSPlugin.prototype;
		p._firstPT = null;

		//gets called when the tween renders for the first time. This kicks everything off, recording start/end values, etc.
		p._onInitTween = function(target, vars, tween) {
			if (!target.nodeType) { //css is only for dom elements
				return false;
			}
			this._target = target;
			this._tween = tween;
			this._vars = vars;
			_autoRound = vars.autoRound;
			_hasPriority = false;
			_suffixMap = vars.suffixMap || CSSPlugin.suffixMap;
			_cs = _getComputedStyle(target, "");
			_overwriteProps = this._overwriteProps;
			var style = target.style,
				v, pt, pt2, first, last, next, zIndex, tpt, threeD;

			if (_reqSafariFix) if (style.zIndex === "") {
				v = _getStyle(target, "zIndex", _cs);
				if (v === "auto" || v === "") {
					//corrects a bug in [non-Android] Safari that prevents it from repainting elements in their new positions if they don't have a zIndex set. We also can't just apply this inside _parseTransform() because anything that's moved in any way (like using "left" or "top" instead of transforms like "x" and "y") can be affected, so it is best to ensure that anything that's tweening has a z-index. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly. Plus zIndex is less memory-intensive.
					style.zIndex = 0;
				}
			}

			if (typeof(vars) === "string") {
				first = style.cssText;
				v = _getAllStyles(target, _cs);
				style.cssText = first + ";" + vars;
				v = _cssDif(target, v, _getAllStyles(target)).difs;
				if (!_supportsOpacity && _opacityValExp.test(vars)) {
					v.opacity = parseFloat( RegExp.$1 );
				}
				vars = v;
				style.cssText = first;
			}
			this._firstPT = pt = this.parse(target, vars, null);

			if (this._transformType) {
				threeD = (this._transformType === 3);
				if (!_transformProp) {
					style.zoom = 1; //helps correct an IE issue.
				} else if (_isSafari) {
					_reqSafariFix = true;
					//if zIndex isn't set, iOS Safari doesn't repaint things correctly sometimes (seemingly at random).
					if (style.zIndex === "") {
						zIndex = _getStyle(target, "zIndex", _cs);
						if (zIndex === "auto" || zIndex === "") {
							style.zIndex = 0;
						}
					}
					//Setting WebkitBackfaceVisibility corrects 3 bugs:
					// 1) [non-Android] Safari skips rendering changes to "top" and "left" that are made on the same frame/render as a transform update.
					// 2) iOS Safari sometimes neglects to repaint elements in their new positions. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly.
					// 3) Safari sometimes displayed odd artifacts when tweening the transform (or WebkitTransform) property, like ghosts of the edges of the element remained. Definitely a browser bug.
					//Note: we allow the user to override the auto-setting by defining WebkitBackfaceVisibility in the vars of the tween.
					if (_isSafariLT6) {
						style.WebkitBackfaceVisibility = this._vars.WebkitBackfaceVisibility || (threeD ? "visible" : "hidden");
					}
				}
				pt2 = pt;
				while (pt2 && pt2._next) {
					pt2 = pt2._next;
				}
				tpt = new CSSPropTween(target, "transform", 0, 0, null, 2);
				this._linkCSSP(tpt, null, pt2);
				tpt.setRatio = (threeD && _supports3D) ? _set3DTransformRatio : _transformProp ? _set2DTransformRatio : _setIETransformRatio;
				tpt.data = this._transform || _getTransform(target, _cs, true);
				_overwriteProps.pop(); //we don't want to force the overwrite of all "transform" tweens of the target - we only care about individual transform properties like scaleX, rotation, etc. The CSSPropTween constructor automatically adds the property to _overwriteProps which is why we need to pop() here.
			}

			if (_hasPriority) {
				//reorders the linked list in order of pr (priority)
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				this._firstPT = first;
			}
			return true;
		};


		p.parse = function(target, vars, pt, plugin) {
			var style = target.style,
				p, sp, bn, en, bs, es, bsfx, esfx, isStr, rel;
			for (p in vars) {
				es = vars[p]; //ending value string
				sp = _specialProps[p]; //SpecialProp lookup.
				if (sp) {
					pt = sp.parse(target, es, p, this, pt, plugin, vars);

				} else {
					bs = _getStyle(target, p, _cs) + "";
					isStr = (typeof(es) === "string");
					if (p === "color" || p === "fill" || p === "stroke" || p.indexOf("Color") !== -1 || (isStr && _rgbhslExp.test(es))) { //Opera uses background: to define color sometimes in addition to backgroundColor:
						if (!isStr) {
							es = _parseColor(es);
							es = ((es.length > 3) ? "rgba(" : "rgb(") + es.join(",") + ")";
						}
						pt = _parseComplex(style, p, bs, es, true, "transparent", pt, 0, plugin);

					} else if (isStr && (es.indexOf(" ") !== -1 || es.indexOf(",") !== -1)) {
						pt = _parseComplex(style, p, bs, es, true, null, pt, 0, plugin);

					} else {
						bn = parseFloat(bs);
						bsfx = (bn || bn === 0) ? bs.substr((bn + "").length) : ""; //remember, bs could be non-numeric like "normal" for fontWeight, so we should default to a blank suffix in that case.

						if (bs === "" || bs === "auto") {
							if (p === "width" || p === "height") {
								bn = _getDimension(target, p, _cs);
								bsfx = "px";
							} else if (p === "left" || p === "top") {
								bn = _calculateOffset(target, p, _cs);
								bsfx = "px";
							} else {
								bn = (p !== "opacity") ? 0 : 1;
								bsfx = "";
							}
						}

						rel = (isStr && es.charAt(1) === "=");
						if (rel) {
							en = parseInt(es.charAt(0) + "1", 10);
							es = es.substr(2);
							en *= parseFloat(es);
							esfx = es.replace(_suffixExp, "");
						} else {
							en = parseFloat(es);
							esfx = isStr ? es.substr((en + "").length) || "" : "";
						}

						if (esfx === "") {
							esfx = _suffixMap[p] || bsfx; //populate the end suffix, prioritizing the map, then if none is found, use the beginning suffix.
						}

						es = (en || en === 0) ? (rel ? en + bn : en) + esfx : vars[p]; //ensures that any += or -= prefixes are taken care of. Record the end value before normalizing the suffix because we always want to end the tween on exactly what they intended even if it doesn't match the beginning value's suffix.

						//if the beginning/ending suffixes don't match, normalize them...
						if (bsfx !== esfx) if (esfx !== "") if (en || en === 0) if (bn || bn === 0) {
							bn = _convertToPixels(target, p, bn, bsfx);
							if (esfx === "%") {
								bn /= _convertToPixels(target, p, 100, "%") / 100;
								if (bn > 100) { //extremely rare
									bn = 100;
								}
								if (vars.strictUnits !== true) { //some browsers report only "px" values instead of allowing "%" with getComputedStyle(), so we assume that if we're tweening to a %, we should start there too unless strictUnits:true is defined. This approach is particularly useful for responsive designs that use from() tweens.
									bs = bn + "%";
								}

							} else if (esfx === "em") {
								bn /= _convertToPixels(target, p, 1, "em");

							//otherwise convert to pixels.
							} else {
								en = _convertToPixels(target, p, en, esfx);
								esfx = "px"; //we don't use bsfx after this, so we don't need to set it to px too.
							}
							if (rel) if (en || en === 0) {
								es = (en + bn) + esfx; //the changes we made affect relative calculations, so adjust the end value here.
							}
						}

						if (rel) {
							en += bn;
						}

						if ((bn || bn === 0) && (en || en === 0)) { //faster than isNaN(). Also, previously we required en !== bn but that doesn't really gain much performance and it prevents _parseToProxy() from working properly if beginning and ending values match but need to get tweened by an external plugin anyway. For example, a bezier tween where the target starts at left:0 and has these points: [{left:50},{left:0}] wouldn't work properly because when parsing the last point, it'd match the first (current) one and a non-tweening CSSPropTween would be recorded when we actually need a normal tween (type:0) so that things get updated during the tween properly.
							pt = new CSSPropTween(style, p, bn, en - bn, pt, 0, "css_" + p, (_autoRound !== false && (esfx === "px" || p === "zIndex")), 0, bs, es);
							pt.xs0 = esfx;
							//DEBUG: _log("tween "+p+" from "+pt.b+" ("+bn+esfx+") to "+pt.e+" with suffix: "+pt.xs0);
						} else if (style[p] === undefined || !es && (es + "" === "NaN" || es == null)) {
							_log("invalid " + p + " tween value: " + vars[p]);
						} else {
							pt = new CSSPropTween(style, p, en || bn || 0, 0, pt, -1, "css_" + p, false, 0, bs, es);
							pt.xs0 = (es === "none" && (p === "display" || p.indexOf("Style") !== -1)) ? bs : es; //intermediate value should typically be set immediately (end value) except for "display" or things like borderTopStyle, borderBottomStyle, etc. which should use the beginning value during the tween.
							//DEBUG: _log("non-tweening value "+p+": "+pt.xs0);
						}
					}
				}
				if (plugin) if (pt && !pt.plugin) {
					pt.plugin = plugin;
				}
			}
			return pt;
		};


		//gets called every time the tween updates, passing the new ratio (typically a value between 0 and 1, but not always (for example, if an Elastic.easeOut is used, the value can jump above 1 mid-tween). It will always start and 0 and end at 1.
		p.setRatio = function(v) {
			var pt = this._firstPT,
				min = 0.000001,
				val, str, i;

			//at the end of the tween, we set the values to exactly what we received in order to make sure non-tweening values (like "position" or "float" or whatever) are set and so that if the beginning/ending suffixes (units) didn't match and we normalized to px, the value that the user passed in is used here. We check to see if the tween is at its beginning in case it's a from() tween in which case the ratio will actually go from 1 to 0 over the course of the tween (backwards).
			if (v === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
				while (pt) {
					if (pt.type !== 2) {
						pt.t[pt.p] = pt.e;
					} else {
						pt.setRatio(v);
					}
					pt = pt._next;
				}

			} else if (v || !(this._tween._time === this._tween._duration || this._tween._time === 0) || this._tween._rawPrevTime === -0.000001) {
				while (pt) {
					val = pt.c * v + pt.s;
					if (pt.r) {
						val = (val > 0) ? (val + 0.5) | 0 : (val - 0.5) | 0;
					} else if (val < min) if (val > -min) {
						val = 0;
					}
					if (!pt.type) {
						pt.t[pt.p] = val + pt.xs0;
					} else if (pt.type === 1) { //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
						i = pt.l;
						if (i === 2) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2;
						} else if (i === 3) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3;
						} else if (i === 4) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4;
						} else if (i === 5) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4 + pt.xn4 + pt.xs5;
						} else {
							str = pt.xs0 + val + pt.xs1;
							for (i = 1; i < pt.l; i++) {
								str += pt["xn"+i] + pt["xs"+(i+1)];
							}
							pt.t[pt.p] = str;
						}

					} else if (pt.type === -1) { //non-tweening value
						pt.t[pt.p] = pt.xs0;

					} else if (pt.setRatio) { //custom setRatio() for things like SpecialProps, external plugins, etc.
						pt.setRatio(v);
					}
					pt = pt._next;
				}

			//if the tween is reversed all the way back to the beginning, we need to restore the original values which may have different units (like % instead of px or em or whatever).
			} else {
				while (pt) {
					if (pt.type !== 2) {
						pt.t[pt.p] = pt.b;
					} else {
						pt.setRatio(v);
					}
					pt = pt._next;
				}
			}
		};

		/**
		 * @private
		 * Forces rendering of the target's transforms (rotation, scale, etc.) whenever the CSSPlugin's setRatio() is called.
		 * Basically, this tells the CSSPlugin to create a CSSPropTween (type 2) after instantiation that runs last in the linked
		 * list and calls the appropriate (3D or 2D) rendering function. We separate this into its own method so that we can call
		 * it from other plugins like BezierPlugin if, for example, it needs to apply an autoRotation and this CSSPlugin
		 * doesn't have any transform-related properties of its own. You can call this method as many times as you
		 * want and it won't create duplicate CSSPropTweens.
		 *
		 * @param {boolean} threeD if true, it should apply 3D tweens (otherwise, just 2D ones are fine and typically faster)
		 */
		p._enableTransforms = function(threeD) {
			this._transformType = (threeD || this._transformType === 3) ? 3 : 2;
		};

		/** @private **/
		p._linkCSSP = function(pt, next, prev, remove) {
			if (pt) {
				if (next) {
					next._prev = pt;
				}
				if (pt._next) {
					pt._next._prev = pt._prev;
				}
				if (prev) {
					prev._next = pt;
				} else if (!remove && this._firstPT === null) {
					this._firstPT = pt;
				}
				if (pt._prev) {
					pt._prev._next = pt._next;
				} else if (this._firstPT === pt) {
					this._firstPT = pt._next;
				}
				pt._next = next;
				pt._prev = prev;
			}
			return pt;
		};

		//we need to make sure that if alpha or autoAlpha is killed, opacity is too. And autoAlpha affects the "visibility" property.
		p._kill = function(lookup) {
			var copy = lookup,
				pt, p, xfirst;
			if (lookup.css_autoAlpha || lookup.css_alpha) {
				copy = {};
				for (p in lookup) { //copy the lookup so that we're not changing the original which may be passed elsewhere.
					copy[p] = lookup[p];
				}
				copy.css_opacity = 1;
				if (copy.css_autoAlpha) {
					copy.css_visibility = 1;
				}
			}
			if (lookup.css_className && (pt = this._classNamePT)) { //for className tweens, we need to kill any associated CSSPropTweens too; a linked list starts at the className's "xfirst".
				xfirst = pt.xfirst;
				if (xfirst && xfirst._prev) {
					this._linkCSSP(xfirst._prev, pt._next, xfirst._prev._prev); //break off the prev
				} else if (xfirst === this._firstPT) {
					this._firstPT = pt._next;
				}
				if (pt._next) {
					this._linkCSSP(pt._next, pt._next._next, xfirst._prev);
				}
				this._classNamePT = null;
			}
			return TweenPlugin.prototype._kill.call(this, copy);
		};




		//used by cascadeTo() for gathering all the style properties of each child element into an array for comparison.
		var _getChildStyles = function(e, props, targets) {
				var children, i, child, type;
				if (e.slice) {
					i = e.length;
					while (--i > -1) {
						_getChildStyles(e[i], props, targets);
					}
					return;
				}
				children = e.childNodes;
				i = children.length;
				while (--i > -1) {
					child = children[i];
					type = child.type;
					if (child.style) {
						props.push(_getAllStyles(child));
						if (targets) {
							targets.push(child);
						}
					}
					if ((type === 1 || type === 9 || type === 11) && child.childNodes.length) {
						_getChildStyles(child, props, targets);
					}
				}
			};

		/**
		 * Typically only useful for className tweens that may affect child elements, this method creates a TweenLite
		 * and then compares the style properties of all the target's child elements at the tween's start and end, and
		 * if any are different, it also creates tweens for those and returns an array containing ALL of the resulting
		 * tweens (so that you can easily add() them to a TimelineLite, for example). The reason this functionality is
		 * wrapped into a separate static method of CSSPlugin instead of being integrated into all regular className tweens
		 * is because it creates entirely new tweens that may have completely different targets than the original tween,
		 * so if they were all lumped into the original tween instance, it would be inconsistent with the rest of the API
		 * and it would create other problems. For example:
		 *  - If I create a tween of elementA, that tween instance may suddenly change its target to include 50 other elements (unintuitive if I specifically defined the target I wanted)
		 *  - We can't just create new independent tweens because otherwise, what happens if the original/parent tween is reversed or pause or dropped into a TimelineLite for tight control? You'd expect that tween's behavior to affect all the others.
		 *  - Analyzing every style property of every child before and after the tween is an expensive operation when there are many children, so this behavior shouldn't be imposed on all className tweens by default, especially since it's probably rare that this extra functionality is needed.
		 *
		 * @param {Object} target object to be tweened
		 * @param {number} Duration in seconds (or frames for frames-based tweens)
		 * @param {Object} Object containing the end values, like {className:"newClass", ease:Linear.easeNone}
		 * @return {Array} An array of TweenLite instances
		 */
		CSSPlugin.cascadeTo = function(target, duration, vars) {
			var tween = TweenLite.to(target, duration, vars),
				results = [tween],
				b = [],
				e = [],
				targets = [],
				_reservedProps = TweenLite._internals.reservedProps,
				i, difs, p;
			target = tween._targets || tween.target;
			_getChildStyles(target, b, targets);
			tween.render(duration, true);
			_getChildStyles(target, e);
			tween.render(0, true);
			tween._enabled(true);
			i = targets.length;
			while (--i > -1) {
				difs = _cssDif(targets[i], b[i], e[i]);
				if (difs.firstMPT) {
					difs = difs.difs;
					for (p in vars) {
						if (_reservedProps[p]) {
							difs[p] = vars[p];
						}
					}
					results.push( TweenLite.to(targets[i], duration, difs) );
				}
			}
			return results;
		};


		TweenPlugin.activate([CSSPlugin]);
		return CSSPlugin;

	}, true);

	
	
	
	
	
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * RoundPropsPlugin
 * ----------------------------------------------------------------
 */
	(function() {

		var RoundPropsPlugin = window._gsDefine.plugin({
				propName: "roundProps",
				priority: -1,
				API: 2,

				//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
				init: function(target, value, tween) {
					this._tween = tween;
					return true;
				}

			}),
			p = RoundPropsPlugin.prototype;

		p._onInitAllProps = function() {
			var tween = this._tween,
				rp = (tween.vars.roundProps instanceof Array) ? tween.vars.roundProps : tween.vars.roundProps.split(","),
				i = rp.length,
				lookup = {},
				rpt = tween._propLookup.roundProps,
				prop, pt, next;
			while (--i > -1) {
				lookup[rp[i]] = 1;
			}
			i = rp.length;
			while (--i > -1) {
				prop = rp[i];
				pt = tween._firstPT;
				while (pt) {
					next = pt._next; //record here, because it may get removed
					if (pt.pg) {
						pt.t._roundProps(lookup, true);
					} else if (pt.n === prop) {
						this._add(pt.t, prop, pt.s, pt.c);
						//remove from linked list
						if (next) {
							next._prev = pt._prev;
						}
						if (pt._prev) {
							pt._prev._next = next;
						} else if (tween._firstPT === pt) {
							tween._firstPT = next;
						}
						pt._next = pt._prev = null;
						tween._propLookup[prop] = rpt;
					}
					pt = next;
				}
			}
			return false;
		};

		p._add = function(target, p, s, c) {
			this._addTween(target, p, s, s + c, p, true);
			this._overwriteProps.push(p);
		};

	}());










/*
 * ----------------------------------------------------------------
 * AttrPlugin
 * ----------------------------------------------------------------
 */
	window._gsDefine.plugin({
		propName: "attr",
		API: 2,

		//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
		init: function(target, value, tween) {
			var p;
			if (typeof(target.setAttribute) !== "function") {
				return false;
			}
			this._target = target;
			this._proxy = {};
			for (p in value) {
				this._addTween(this._proxy, p, parseFloat(target.getAttribute(p)), value[p], p);
				this._overwriteProps.push(p);
			}
			return true;
		},

		//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
		set: function(ratio) {
			this._super.setRatio.call(this, ratio);
			var props = this._overwriteProps,
				i = props.length,
				p;
			while (--i > -1) {
				p = props[i];
				this._target.setAttribute(p, this._proxy[p] + "");
			}
		}

	});










/*
 * ----------------------------------------------------------------
 * DirectionalRotationPlugin
 * ----------------------------------------------------------------
 */
	window._gsDefine.plugin({
		propName: "directionalRotation",
		API: 2,

		//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
		init: function(target, value, tween) {
			if (typeof(value) !== "object") {
				value = {rotation:value};
			}
			this.finals = {};
			var cap = (value.useRadians === true) ? Math.PI * 2 : 360,
				min = 0.000001,
				p, v, start, end, dif, split;
			for (p in value) {
				if (p !== "useRadians") {
					split = (value[p] + "").split("_");
					v = split[0];
					start = parseFloat( (typeof(target[p]) !== "function") ? target[p] : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]() );
					end = this.finals[p] = (typeof(v) === "string" && v.charAt(1) === "=") ? start + parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) : Number(v) || 0;
					dif = end - start;
					if (split.length) {
						v = split.join("_");
						if (v.indexOf("short") !== -1) {
							dif = dif % cap;
							if (dif !== dif % (cap / 2)) {
								dif = (dif < 0) ? dif + cap : dif - cap;
							}
						}
						if (v.indexOf("_cw") !== -1 && dif < 0) {
							dif = ((dif + cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						} else if (v.indexOf("ccw") !== -1 && dif > 0) {
							dif = ((dif - cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						}
					}
					if (dif > min || dif < -min) {
						this._addTween(target, p, start, start + dif, p);
						this._overwriteProps.push(p);
					}
				}
			}
			return true;
		},

		//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
		set: function(ratio) {
			var pt;
			if (ratio !== 1) {
				this._super.setRatio.call(this, ratio);
			} else {
				pt = this._firstPT;
				while (pt) {
					if (pt.f) {
						pt.t[pt.p](this.finals[pt.p]);
					} else {
						pt.t[pt.p] = this.finals[pt.p];
					}
					pt = pt._next;
				}
			}
		}

	})._autoCSS = true;







	
	
	
	
/*
 * ----------------------------------------------------------------
 * EasePack
 * ----------------------------------------------------------------
 */
	window._gsDefine("easing.Back", ["easing.Ease"], function(Ease) {
		
		var w = (window.GreenSockGlobals || window),
			gs = w.com.greensock,
			_2PI = Math.PI * 2,
			_HALF_PI = Math.PI / 2,
			_class = gs._class,
			_create = function(n, f) {
				var C = _class("easing." + n, function(){}, true),
					p = C.prototype = new Ease();
				p.constructor = C;
				p.getRatio = f;
				return C;
			},
			_easeReg = Ease.register || function(){}, //put an empty function in place just as a safety measure in case someone loads an OLD version of TweenLite.js where Ease.register doesn't exist.
			_wrap = function(name, EaseOut, EaseIn, EaseInOut, aliases) {
				var C = _class("easing."+name, {
					easeOut:new EaseOut(),
					easeIn:new EaseIn(),
					easeInOut:new EaseInOut()
				}, true);
				_easeReg(C, name);
				return C;
			},
			EasePoint = function(time, value, next) {
				this.t = time;
				this.v = value;
				if (next) {
					this.next = next;
					next.prev = this;
					this.c = next.v - value;
					this.gap = next.t - time;
				}
			},

			//Back
			_createBack = function(n, f) {
				var C = _class("easing." + n, function(overshoot) {
						this._p1 = (overshoot || overshoot === 0) ? overshoot : 1.70158;
						this._p2 = this._p1 * 1.525;
					}, true),
					p = C.prototype = new Ease();
				p.constructor = C;
				p.getRatio = f;
				p.config = function(overshoot) {
					return new C(overshoot);
				};
				return C;
			},

			Back = _wrap("Back",
				_createBack("BackOut", function(p) {
					return ((p = p - 1) * p * ((this._p1 + 1) * p + this._p1) + 1);
				}),
				_createBack("BackIn", function(p) {
					return p * p * ((this._p1 + 1) * p - this._p1);
				}),
				_createBack("BackInOut", function(p) {
					return ((p *= 2) < 1) ? 0.5 * p * p * ((this._p2 + 1) * p - this._p2) : 0.5 * ((p -= 2) * p * ((this._p2 + 1) * p + this._p2) + 2);
				})
			),


			//SlowMo
			SlowMo = _class("easing.SlowMo", function(linearRatio, power, yoyoMode) {
				power = (power || power === 0) ? power : 0.7;
				if (linearRatio == null) {
					linearRatio = 0.7;
				} else if (linearRatio > 1) {
					linearRatio = 1;
				}
				this._p = (linearRatio !== 1) ? power : 0;
				this._p1 = (1 - linearRatio) / 2;
				this._p2 = linearRatio;
				this._p3 = this._p1 + this._p2;
				this._calcEnd = (yoyoMode === true);
			}, true),
			p = SlowMo.prototype = new Ease(),
			SteppedEase, RoughEase, _createElastic;

		p.constructor = SlowMo;
		p.getRatio = function(p) {
			var r = p + (0.5 - p) * this._p;
			if (p < this._p1) {
				return this._calcEnd ? 1 - ((p = 1 - (p / this._p1)) * p) : r - ((p = 1 - (p / this._p1)) * p * p * p * r);
			} else if (p > this._p3) {
				return this._calcEnd ? 1 - (p = (p - this._p3) / this._p1) * p : r + ((p - r) * (p = (p - this._p3) / this._p1) * p * p * p);
			}
			return this._calcEnd ? 1 : r;
		};
		SlowMo.ease = new SlowMo(0.7, 0.7);

		p.config = SlowMo.config = function(linearRatio, power, yoyoMode) {
			return new SlowMo(linearRatio, power, yoyoMode);
		};


		//SteppedEase
		SteppedEase = _class("easing.SteppedEase", function(steps) {
				steps = steps || 1;
				this._p1 = 1 / steps;
				this._p2 = steps + 1;
			}, true);
		p = SteppedEase.prototype = new Ease();
		p.constructor = SteppedEase;
		p.getRatio = function(p) {
			if (p < 0) {
				p = 0;
			} else if (p >= 1) {
				p = 0.999999999;
			}
			return ((this._p2 * p) >> 0) * this._p1;
		};
		p.config = SteppedEase.config = function(steps) {
			return new SteppedEase(steps);
		};


		//RoughEase
		RoughEase = _class("easing.RoughEase", function(vars) {
			vars = vars || {};
			var taper = vars.taper || "none",
				a = [],
				cnt = 0,
				points = (vars.points || 20) | 0,
				i = points,
				randomize = (vars.randomize !== false),
				clamp = (vars.clamp === true),
				template = (vars.template instanceof Ease) ? vars.template : null,
				strength = (typeof(vars.strength) === "number") ? vars.strength * 0.4 : 0.4,
				x, y, bump, invX, obj, pnt;
			while (--i > -1) {
				x = randomize ? Math.random() : (1 / points) * i;
				y = template ? template.getRatio(x) : x;
				if (taper === "none") {
					bump = strength;
				} else if (taper === "out") {
					invX = 1 - x;
					bump = invX * invX * strength;
				} else if (taper === "in") {
					bump = x * x * strength;
				} else if (x < 0.5) {  //"both" (start)
					invX = x * 2;
					bump = invX * invX * 0.5 * strength;
				} else {				//"both" (end)
					invX = (1 - x) * 2;
					bump = invX * invX * 0.5 * strength;
				}
				if (randomize) {
					y += (Math.random() * bump) - (bump * 0.5);
				} else if (i % 2) {
					y += bump * 0.5;
				} else {
					y -= bump * 0.5;
				}
				if (clamp) {
					if (y > 1) {
						y = 1;
					} else if (y < 0) {
						y = 0;
					}
				}
				a[cnt++] = {x:x, y:y};
			}
			a.sort(function(a, b) {
				return a.x - b.x;
			});

			pnt = new EasePoint(1, 1, null);
			i = points;
			while (--i > -1) {
				obj = a[i];
				pnt = new EasePoint(obj.x, obj.y, pnt);
			}

			this._prev = new EasePoint(0, 0, (pnt.t !== 0) ? pnt : pnt.next);
		}, true);
		p = RoughEase.prototype = new Ease();
		p.constructor = RoughEase;
		p.getRatio = function(p) {
			var pnt = this._prev;
			if (p > pnt.t) {
				while (pnt.next && p >= pnt.t) {
					pnt = pnt.next;
				}
				pnt = pnt.prev;
			} else {
				while (pnt.prev && p <= pnt.t) {
					pnt = pnt.prev;
				}
			}
			this._prev = pnt;
			return (pnt.v + ((p - pnt.t) / pnt.gap) * pnt.c);
		};
		p.config = function(vars) {
			return new RoughEase(vars);
		};
		RoughEase.ease = new RoughEase();


		//Bounce
		_wrap("Bounce",
			_create("BounceOut", function(p) {
				if (p < 1 / 2.75) {
					return 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					return 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
				} else if (p < 2.5 / 2.75) {
					return 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
				}
				return 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
			}),
			_create("BounceIn", function(p) {
				if ((p = 1 - p) < 1 / 2.75) {
					return 1 - (7.5625 * p * p);
				} else if (p < 2 / 2.75) {
					return 1 - (7.5625 * (p -= 1.5 / 2.75) * p + 0.75);
				} else if (p < 2.5 / 2.75) {
					return 1 - (7.5625 * (p -= 2.25 / 2.75) * p + 0.9375);
				}
				return 1 - (7.5625 * (p -= 2.625 / 2.75) * p + 0.984375);
			}),
			_create("BounceInOut", function(p) {
				var invert = (p < 0.5);
				if (invert) {
					p = 1 - (p * 2);
				} else {
					p = (p * 2) - 1;
				}
				if (p < 1 / 2.75) {
					p = 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					p = 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
				} else if (p < 2.5 / 2.75) {
					p = 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
				} else {
					p = 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
				}
				return invert ? (1 - p) * 0.5 : p * 0.5 + 0.5;
			})
		);


		//CIRC
		_wrap("Circ",
			_create("CircOut", function(p) {
				return Math.sqrt(1 - (p = p - 1) * p);
			}),
			_create("CircIn", function(p) {
				return -(Math.sqrt(1 - (p * p)) - 1);
			}),
			_create("CircInOut", function(p) {
				return ((p*=2) < 1) ? -0.5 * (Math.sqrt(1 - p * p) - 1) : 0.5 * (Math.sqrt(1 - (p -= 2) * p) + 1);
			})
		);


		//Elastic
		_createElastic = function(n, f, def) {
			var C = _class("easing." + n, function(amplitude, period) {
					this._p1 = amplitude || 1;
					this._p2 = period || def;
					this._p3 = this._p2 / _2PI * (Math.asin(1 / this._p1) || 0);
				}, true),
				p = C.prototype = new Ease();
			p.constructor = C;
			p.getRatio = f;
			p.config = function(amplitude, period) {
				return new C(amplitude, period);
			};
			return C;
		};
		_wrap("Elastic",
			_createElastic("ElasticOut", function(p) {
				return this._p1 * Math.pow(2, -10 * p) * Math.sin( (p - this._p3) * _2PI / this._p2 ) + 1;
			}, 0.3),
			_createElastic("ElasticIn", function(p) {
				return -(this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * _2PI / this._p2 ));
			}, 0.3),
			_createElastic("ElasticInOut", function(p) {
				return ((p *= 2) < 1) ? -0.5 * (this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * _2PI / this._p2)) : this._p1 * Math.pow(2, -10 *(p -= 1)) * Math.sin( (p - this._p3) * _2PI / this._p2 ) *0.5 + 1;
			}, 0.45)
		);


		//Expo
		_wrap("Expo",
			_create("ExpoOut", function(p) {
				return 1 - Math.pow(2, -10 * p);
			}),
			_create("ExpoIn", function(p) {
				return Math.pow(2, 10 * (p - 1)) - 0.001;
			}),
			_create("ExpoInOut", function(p) {
				return ((p *= 2) < 1) ? 0.5 * Math.pow(2, 10 * (p - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
			})
		);


		//Sine
		_wrap("Sine",
			_create("SineOut", function(p) {
				return Math.sin(p * _HALF_PI);
			}),
			_create("SineIn", function(p) {
				return -Math.cos(p * _HALF_PI) + 1;
			}),
			_create("SineInOut", function(p) {
				return -0.5 * (Math.cos(Math.PI * p) - 1);
			})
		);

		_class("easing.EaseLookup", {
				find:function(s) {
					return Ease.map[s];
				}
			}, true);

		//register the non-standard eases
		_easeReg(w.SlowMo, "SlowMo", "ease,");
		_easeReg(RoughEase, "RoughEase", "ease,");
		_easeReg(SteppedEase, "SteppedEase", "ease,");

		return Back;
		
	}, true);


}); 











/*
 * ----------------------------------------------------------------
 * Base classes like TweenLite, SimpleTimeline, Ease, Ticker, etc.
 * ----------------------------------------------------------------
 */
(function(window) {

		"use strict";
		var _globals = window.GreenSockGlobals || window,
			_namespace = function(ns) {
				var a = ns.split("."),
					p = _globals, i;
				for (i = 0; i < a.length; i++) {
					p[a[i]] = p = p[a[i]] || {};
				}
				return p;
			},
			gs = _namespace("com.greensock"),
			_slice = [].slice,
			_emptyFunc = function() {},
			a, i, p, _ticker, _tickerActive,
			_defLookup = {},

			/**
			 * @constructor
			 * Defines a GreenSock class, optionally with an array of dependencies that must be instantiated first and passed into the definition.
			 * This allows users to load GreenSock JS files in any order even if they have interdependencies (like CSSPlugin extends TweenPlugin which is
			 * inside TweenLite.js, but if CSSPlugin is loaded first, it should wait to run its code until TweenLite.js loads and instantiates TweenPlugin
			 * and then pass TweenPlugin to CSSPlugin's definition). This is all done automatically and internally.
			 *
			 * Every definition will be added to a "com.greensock" global object (typically window, but if a window.GreenSockGlobals object is found,
			 * it will go there as of v1.7). For example, TweenLite will be found at window.com.greensock.TweenLite and since it's a global class that should be available anywhere,
			 * it is ALSO referenced at window.TweenLite. However some classes aren't considered global, like the base com.greensock.core.Animation class, so
			 * those will only be at the package like window.com.greensock.core.Animation. Again, if you define a GreenSockGlobals object on the window, everything
			 * gets tucked neatly inside there instead of on the window directly. This allows you to do advanced things like load multiple versions of GreenSock
			 * files and put them into distinct objects (imagine a banner ad uses a newer version but the main site uses an older one). In that case, you could
			 * sandbox the banner one like:
			 *
			 * <script>
			 *     var gs = window.GreenSockGlobals = {}; //the newer version we're about to load could now be referenced in a "gs" object, like gs.TweenLite.to(...). Use whatever alias you want as long as it's unique, "gs" or "banner" or whatever.
			 * </script>
			 * <script src="js/greensock/v1.7/TweenMax.js"></script>
			 * <script>
			 *     window.GreenSockGlobals = null; //reset it back to null so that the next load of TweenMax affects the window and we can reference things directly like TweenLite.to(...)
			 * </script>
			 * <script src="js/greensock/v1.6/TweenMax.js"></script>
			 * <script>
			 *     gs.TweenLite.to(...); //would use v1.7
			 *     TweenLite.to(...); //would use v1.6
			 * </script>
			 *
			 * @param {!string} ns The namespace of the class definition, leaving off "com.greensock." as that's assumed. For example, "TweenLite" or "plugins.CSSPlugin" or "easing.Back".
			 * @param {!Array.<string>} dependencies An array of dependencies (described as their namespaces minus "com.greensock." prefix). For example ["TweenLite","plugins.TweenPlugin","core.Animation"]
			 * @param {!function():Object} func The function that should be called and passed the resolved dependencies which will return the actual class for this definition.
			 * @param {boolean=} global If true, the class will be added to the global scope (typically window unless you define a window.GreenSockGlobals object)
			 */
			Definition = function(ns, dependencies, func, global) {
				this.sc = (_defLookup[ns]) ? _defLookup[ns].sc : []; //subclasses
				_defLookup[ns] = this;
				this.gsClass = null;
				this.func = func;
				var _classes = [];
				this.check = function(init) {
					var i = dependencies.length,
						missing = i,
						cur, a, n, cl;
					while (--i > -1) {
						if ((cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass) {
							_classes[i] = cur.gsClass;
							missing--;
						} else if (init) {
							cur.sc.push(this);
						}
					}
					if (missing === 0 && func) {
						a = ("com.greensock." + ns).split(".");
						n = a.pop();
						cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes);

						//exports to multiple environments
						if (global) {
							_globals[n] = cl; //provides a way to avoid global namespace pollution. By default, the main classes like TweenLite, Power1, Strong, etc. are added to window unless a GreenSockGlobals is defined. So if you want to have things added to a custom object instead, just do something like window.GreenSockGlobals = {} before loading any GreenSock files. You can even set up an alias like window.GreenSockGlobals = windows.gs = {} so that you can access everything like gs.TweenLite. Also remember that ALL classes are added to the window.com.greensock object (in their respective packages, like com.greensock.easing.Power1, com.greensock.TweenLite, etc.)
							if (typeof(define) === "function" && define.amd){ //AMD
								define((window.GreenSockAMDPath ? window.GreenSockAMDPath + "/" : "") + ns.split(".").join("/"), [], function() { return cl; });
							} else if (typeof(module) !== "undefined" && module.exports){ //node
								module.exports = cl;
							}
						}
						for (i = 0; i < this.sc.length; i++) {
							this.sc[i].check();
						}
					}
				};
				this.check(true);
			},

			//used to create Definition instances (which basically registers a class that has dependencies).
			_gsDefine = window._gsDefine = function(ns, dependencies, func, global) {
				return new Definition(ns, dependencies, func, global);
			},

			//a quick way to create a class that doesn't have any dependencies. Returns the class, but first registers it in the GreenSock namespace so that other classes can grab it (other classes might be dependent on the class).
			_class = gs._class = function(ns, func, global) {
				func = func || function() {};
				_gsDefine(ns, [], function(){ return func; }, global);
				return func;
			};

		_gsDefine.globals = _globals;



/*
 * ----------------------------------------------------------------
 * Ease
 * ----------------------------------------------------------------
 */
		var _baseParams = [0, 0, 1, 1],
			_blankArray = [],
			Ease = _class("easing.Ease", function(func, extraParams, type, power) {
				this._func = func;
				this._type = type || 0;
				this._power = power || 0;
				this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
			}, true),
			_easeMap = Ease.map = {},
			_easeReg = Ease.register = function(ease, names, types, create) {
				var na = names.split(","),
					i = na.length,
					ta = (types || "easeIn,easeOut,easeInOut").split(","),
					e, name, j, type;
				while (--i > -1) {
					name = na[i];
					e = create ? _class("easing."+name, null, true) : gs.easing[name] || {};
					j = ta.length;
					while (--j > -1) {
						type = ta[j];
						_easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease();
					}
				}
			};

		p = Ease.prototype;
		p._calcEnd = false;
		p.getRatio = function(p) {
			if (this._func) {
				this._params[0] = p;
				return this._func.apply(null, this._params);
			}
			var t = this._type,
				pw = this._power,
				r = (t === 1) ? 1 - p : (t === 2) ? p : (p < 0.5) ? p * 2 : (1 - p) * 2;
			if (pw === 1) {
				r *= r;
			} else if (pw === 2) {
				r *= r * r;
			} else if (pw === 3) {
				r *= r * r * r;
			} else if (pw === 4) {
				r *= r * r * r * r;
			}
			return (t === 1) ? 1 - r : (t === 2) ? r : (p < 0.5) ? r / 2 : 1 - (r / 2);
		};

		//create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)
		a = ["Linear","Quad","Cubic","Quart","Quint,Strong"];
		i = a.length;
		while (--i > -1) {
			p = a[i]+",Power"+i;
			_easeReg(new Ease(null,null,1,i), p, "easeOut", true);
			_easeReg(new Ease(null,null,2,i), p, "easeIn" + ((i === 0) ? ",easeNone" : ""));
			_easeReg(new Ease(null,null,3,i), p, "easeInOut");
		}
		_easeMap.linear = gs.easing.Linear.easeIn;
		_easeMap.swing = gs.easing.Quad.easeInOut; //for jQuery folks


/*
 * ----------------------------------------------------------------
 * EventDispatcher
 * ----------------------------------------------------------------
 */
		var EventDispatcher = _class("events.EventDispatcher", function(target) {
			this._listeners = {};
			this._eventTarget = target || this;
		});
		p = EventDispatcher.prototype;

		p.addEventListener = function(type, callback, scope, useParam, priority) {
			priority = priority || 0;
			var list = this._listeners[type],
				index = 0,
				listener, i;
			if (list == null) {
				this._listeners[type] = list = [];
			}
			i = list.length;
			while (--i > -1) {
				listener = list[i];
				if (listener.c === callback && listener.s === scope) {
					list.splice(i, 1);
				} else if (index === 0 && listener.pr < priority) {
					index = i + 1;
				}
			}
			list.splice(index, 0, {c:callback, s:scope, up:useParam, pr:priority});
			if (this === _ticker && !_tickerActive) {
				_ticker.wake();
			}
		};

		p.removeEventListener = function(type, callback) {
			var list = this._listeners[type], i;
			if (list) {
				i = list.length;
				while (--i > -1) {
					if (list[i].c === callback) {
						list.splice(i, 1);
						return;
					}
				}
			}
		};

		p.dispatchEvent = function(type) {
			var list = this._listeners[type],
				i, t, listener;
			if (list) {
				i = list.length;
				t = this._eventTarget;
				while (--i > -1) {
					listener = list[i];
					if (listener.up) {
						listener.c.call(listener.s || t, {type:type, target:t});
					} else {
						listener.c.call(listener.s || t);
					}
				}
			}
		};


/*
 * ----------------------------------------------------------------
 * Ticker
 * ----------------------------------------------------------------
 */
 		var _reqAnimFrame = window.requestAnimationFrame,
			_cancelAnimFrame = window.cancelAnimationFrame,
			_getTime = Date.now || function() {return new Date().getTime();};

		//now try to determine the requestAnimationFrame and cancelAnimationFrame functions and if none are found, we'll use a setTimeout()/clearTimeout() polyfill.
		a = ["ms","moz","webkit","o"];
		i = a.length;
		while (--i > -1 && !_reqAnimFrame) {
			_reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
			_cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
		}

		_class("Ticker", function(fps, useRAF) {
			var _self = this,
				_startTime = _getTime(),
				_useRAF = (useRAF !== false && _reqAnimFrame),
				_fps, _req, _id, _gap, _nextTime,
				_tick = function(manual) {
					_self.time = (_getTime() - _startTime) / 1000;
					var id = _id,
						overlap = _self.time - _nextTime;
					if (!_fps || overlap > 0 || manual === true) {
						_self.frame++;
						_nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);
						_self.dispatchEvent("tick");
					}
					if (manual !== true && id === _id) { //make sure the ids match in case the "tick" dispatch triggered something that caused the ticker to shut down or change _useRAF or something like that.
						_id = _req(_tick);
					}
				};

			EventDispatcher.call(_self);
			this.time = this.frame = 0;
			this.tick = function() {
				_tick(true);
			};

			this.sleep = function() {
				if (_id == null) {
					return;
				}
				if (!_useRAF || !_cancelAnimFrame) {
					clearTimeout(_id);
				} else {
					_cancelAnimFrame(_id);
				}
				_req = _emptyFunc;
				_id = null;
				if (_self === _ticker) {
					_tickerActive = false;
				}
			};

			this.wake = function() {
				if (_id !== null) {
					_self.sleep();
				}
				_req = (_fps === 0) ? _emptyFunc : (!_useRAF || !_reqAnimFrame) ? function(f) { return setTimeout(f, ((_nextTime - _self.time) * 1000 + 1) | 0); } : _reqAnimFrame;
				if (_self === _ticker) {
					_tickerActive = true;
				}
				_tick(2);
			};

			this.fps = function(value) {
				if (!arguments.length) {
					return _fps;
				}
				_fps = value;
				_gap = 1 / (_fps || 60);
				_nextTime = this.time + _gap;
				_self.wake();
			};

			this.useRAF = function(value) {
				if (!arguments.length) {
					return _useRAF;
				}
				_self.sleep();
				_useRAF = value;
				_self.fps(_fps);
			};
			_self.fps(fps);

			//a bug in iOS 6 Safari occasionally prevents the requestAnimationFrame from working initially, so we use a 1.5-second timeout that automatically falls back to setTimeout() if it senses this condition.
			setTimeout(function() {
				if (_useRAF && (!_id || _self.frame < 5)) {
					_self.useRAF(false);
				}
			}, 1500);
		});

		p = gs.Ticker.prototype = new gs.events.EventDispatcher();
		p.constructor = gs.Ticker;


/*
 * ----------------------------------------------------------------
 * Animation
 * ----------------------------------------------------------------
 */
		var Animation = _class("core.Animation", function(duration, vars) {
				this.vars = vars || {};
				this._duration = this._totalDuration = duration || 0;
				this._delay = Number(this.vars.delay) || 0;
				this._timeScale = 1;
				this._active = (this.vars.immediateRender === true);
				this.data = this.vars.data;
				this._reversed = (this.vars.reversed === true);

				if (!_rootTimeline) {
					return;
				}
				if (!_tickerActive) {
					_ticker.wake();
				}

				var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
				tl.add(this, tl._time);

				if (this.vars.paused) {
					this.paused(true);
				}
			});

		_ticker = Animation.ticker = new gs.Ticker();
		p = Animation.prototype;
		p._dirty = p._gc = p._initted = p._paused = false;
		p._totalTime = p._time = 0;
		p._rawPrevTime = -1;
		p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
		p._paused = false;

		p.play = function(from, suppressEvents) {
			if (arguments.length) {
				this.seek(from, suppressEvents);
			}
			return this.reversed(false).paused(false);
		};

		p.pause = function(atTime, suppressEvents) {
			if (arguments.length) {
				this.seek(atTime, suppressEvents);
			}
			return this.paused(true);
		};

		p.resume = function(from, suppressEvents) {
			if (arguments.length) {
				this.seek(from, suppressEvents);
			}
			return this.paused(false);
		};

		p.seek = function(time, suppressEvents) {
			return this.totalTime(Number(time), suppressEvents !== false);
		};

		p.restart = function(includeDelay, suppressEvents) {
			return this.reversed(false).paused(false).totalTime(includeDelay ? -this._delay : 0, (suppressEvents !== false), true);
		};

		p.reverse = function(from, suppressEvents) {
			if (arguments.length) {
				this.seek((from || this.totalDuration()), suppressEvents);
			}
			return this.reversed(true).paused(false);
		};

		p.render = function() {

		};

		p.invalidate = function() {
			return this;
		};

		p._enabled = function (enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			this._gc = !enabled;
			this._active = (enabled && !this._paused && this._totalTime > 0 && this._totalTime < this._totalDuration);
			if (ignoreTimeline !== true) {
				if (enabled && !this.timeline) {
					this._timeline.add(this, this._startTime - this._delay);
				} else if (!enabled && this.timeline) {
					this._timeline._remove(this, true);
				}
			}
			return false;
		};


		p._kill = function(vars, target) {
			return this._enabled(false, false);
		};

		p.kill = function(vars, target) {
			this._kill(vars, target);
			return this;
		};

		p._uncache = function(includeSelf) {
			var tween = includeSelf ? this : this.timeline;
			while (tween) {
				tween._dirty = true;
				tween = tween.timeline;
			}
			return this;
		};

//----Animation getters/setters --------------------------------------------------------

		p.eventCallback = function(type, callback, params, scope) {
			if (type == null) {
				return null;
			} else if (type.substr(0,2) === "on") {
				var v = this.vars,
					i;
				if (arguments.length === 1) {
					return v[type];
				}
				if (callback == null) {
					delete v[type];
				} else {
					v[type] = callback;
					v[type + "Params"] = params;
					v[type + "Scope"] = scope;
					if (params) {
						i = params.length;
						while (--i > -1) {
							if (params[i] === "{self}") {
								params = v[type + "Params"] = params.concat(); //copying the array avoids situations where the same array is passed to multiple tweens/timelines and {self} doesn't correctly point to each individual instance.
								params[i] = this;
							}
						}
					}
				}
				if (type === "onUpdate") {
					this._onUpdate = callback;
				}
			}
			return this;
		};

		p.delay = function(value) {
			if (!arguments.length) {
				return this._delay;
			}
			if (this._timeline.smoothChildTiming) {
				this.startTime( this._startTime + value - this._delay );
			}
			this._delay = value;
			return this;
		};

		p.duration = function(value) {
			if (!arguments.length) {
				this._dirty = false;
				return this._duration;
			}
			this._duration = this._totalDuration = value;
			this._uncache(true); //true in case it's a TweenMax or TimelineMax that has a repeat - we'll need to refresh the totalDuration.
			if (this._timeline.smoothChildTiming) if (this._time > 0) if (this._time < this._duration) if (value !== 0) {
				this.totalTime(this._totalTime * (value / this._duration), true);
			}
			return this;
		};

		p.totalDuration = function(value) {
			this._dirty = false;
			return (!arguments.length) ? this._totalDuration : this.duration(value);
		};

		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			return this.totalTime((value > this._duration) ? this._duration : value, suppressEvents);
		};

		p.totalTime = function(time, suppressEvents, uncapped) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (!arguments.length) {
				return this._totalTime;
			}
			if (this._timeline) {
				if (time < 0 && !uncapped) {
					time += this.totalDuration();
				}
				if (this._timeline.smoothChildTiming) {
					if (this._dirty) {
						this.totalDuration();
					}
					var totalDuration = this._totalDuration,
						tl = this._timeline;
					if (time > totalDuration && !uncapped) {
						time = totalDuration;
					}
					this._startTime = (this._paused ? this._pauseTime : tl._time) - ((!this._reversed ? time : totalDuration - time) / this._timeScale);
					if (!tl._dirty) { //for performance improvement. If the parent's cache is already dirty, it already took care of marking the anscestors as dirty too, so skip the function call here.
						this._uncache(false);
					}
					if (!tl._active) {
						//in case any of the anscestors had completed but should now be enabled...
						while (tl._timeline) {
							tl.totalTime(tl._totalTime, true);
							tl = tl._timeline;
						}
					}
				}
				if (this._gc) {
					this._enabled(true, false);
				}
				if (this._totalTime !== time) {
					this.render(time, suppressEvents, false);
				}
			}
			return this;
		};

		p.startTime = function(value) {
			if (!arguments.length) {
				return this._startTime;
			}
			if (value !== this._startTime) {
				this._startTime = value;
				if (this.timeline) if (this.timeline._sortChildren) {
					this.timeline.add(this, value - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}
			}
			return this;
		};

		p.timeScale = function(value) {
			if (!arguments.length) {
				return this._timeScale;
			}
			value = value || 0.000001; //can't allow zero because it'll throw the math off
			if (this._timeline && this._timeline.smoothChildTiming) {
				var pauseTime = this._pauseTime,
					t = (pauseTime || pauseTime === 0) ? pauseTime : this._timeline.totalTime();
				this._startTime = t - ((t - this._startTime) * this._timeScale / value);
			}
			this._timeScale = value;
			return this._uncache(false);
		};

		p.reversed = function(value) {
			if (!arguments.length) {
				return this._reversed;
			}
			if (value != this._reversed) {
				this._reversed = value;
				this.totalTime(this._totalTime, true);
			}
			return this;
		};

		p.paused = function(value) {
			if (!arguments.length) {
				return this._paused;
			}
			if (value != this._paused) if (this._timeline) {
				if (!_tickerActive && !value) {
					_ticker.wake();
				}
				var raw = this._timeline.rawTime(),
					elapsed = raw - this._pauseTime;
				if (!value && this._timeline.smoothChildTiming) {
					this._startTime += elapsed;
					this._uncache(false);
				}
				this._pauseTime = value ? raw : null;
				this._paused = value;
				this._active = (!value && this._totalTime > 0 && this._totalTime < this._totalDuration);
				if (!value && elapsed !== 0 && this._duration !== 0) {
					this.render(this._totalTime, true, true);
				}
			}
			if (this._gc && !value) {
				this._enabled(true, false);
			}
			return this;
		};


/*
 * ----------------------------------------------------------------
 * SimpleTimeline
 * ----------------------------------------------------------------
 */
		var SimpleTimeline = _class("core.SimpleTimeline", function(vars) {
			Animation.call(this, 0, vars);
			this.autoRemoveChildren = this.smoothChildTiming = true;
		});

		p = SimpleTimeline.prototype = new Animation();
		p.constructor = SimpleTimeline;
		p.kill()._gc = false;
		p._first = p._last = null;
		p._sortChildren = false;

		p.add = p.insert = function(child, position, align, stagger) {
			var prevTween, st;
			child._startTime = Number(position || 0) + child._delay;
			if (child._paused) if (this !== child._timeline) { //we only adjust the _pauseTime if it wasn't in this timeline already. Remember, sometimes a tween will be inserted again into the same timeline when its startTime is changed so that the tweens in the TimelineLite/Max are re-ordered properly in the linked list (so everything renders in the proper order).
				child._pauseTime = child._startTime + ((this.rawTime() - child._startTime) / child._timeScale);
			}
			if (child.timeline) {
				child.timeline._remove(child, true); //removes from existing timeline so that it can be properly added to this one.
			}
			child.timeline = child._timeline = this;
			if (child._gc) {
				child._enabled(true, true);
			}
			prevTween = this._last;
			if (this._sortChildren) {
				st = child._startTime;
				while (prevTween && prevTween._startTime > st) {
					prevTween = prevTween._prev;
				}
			}
			if (prevTween) {
				child._next = prevTween._next;
				prevTween._next = child;
			} else {
				child._next = this._first;
				this._first = child;
			}
			if (child._next) {
				child._next._prev = child;
			} else {
				this._last = child;
			}
			child._prev = prevTween;
			if (this._timeline) {
				this._uncache(true);
			}
			return this;
		};

		p._remove = function(tween, skipDisable) {
			if (tween.timeline === this) {
				if (!skipDisable) {
					tween._enabled(false, true);
				}
				tween.timeline = null;

				if (tween._prev) {
					tween._prev._next = tween._next;
				} else if (this._first === tween) {
					this._first = tween._next;
				}
				if (tween._next) {
					tween._next._prev = tween._prev;
				} else if (this._last === tween) {
					this._last = tween._prev;
				}

				if (this._timeline) {
					this._uncache(true);
				}
			}
			return this;
		};

		p.render = function(time, suppressEvents, force) {
			var tween = this._first,
				next;
			this._totalTime = this._time = this._rawPrevTime = time;
			while (tween) {
				next = tween._next; //record it here because the value could change after rendering...
				if (tween._active || (time >= tween._startTime && !tween._paused)) {
					if (!tween._reversed) {
						tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
					} else {
						tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
					}
				}
				tween = next;
			}
		};

		p.rawTime = function() {
			if (!_tickerActive) {
				_ticker.wake();
			}
			return this._totalTime;
		};


/*
 * ----------------------------------------------------------------
 * TweenLite
 * ----------------------------------------------------------------
 */
		var TweenLite = _class("TweenLite", function(target, duration, vars) {
				Animation.call(this, duration, vars);

				if (target == null) {
					throw "Cannot tween a null target.";
				}

				this.target = target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;

				var isSelector = (target.jquery || (target.length && target[0] && target[0].nodeType && target[0].style)),
					overwrite = this.vars.overwrite,
					i, targ, targets;

				this._overwrite = overwrite = (overwrite == null) ? _overwriteLookup[TweenLite.defaultOverwrite] : (typeof(overwrite) === "number") ? overwrite >> 0 : _overwriteLookup[overwrite];

				if ((isSelector || target instanceof Array) && typeof(target[0]) !== "number") {
					this._targets = targets = _slice.call(target, 0);
					this._propLookup = [];
					this._siblings = [];
					for (i = 0; i < targets.length; i++) {
						targ = targets[i];
						if (!targ) {
							targets.splice(i--, 1);
							continue;
						} else if (typeof(targ) === "string") {
							targ = targets[i--] = TweenLite.selector(targ); //in case it's an array of strings
							if (typeof(targ) === "string") {
								targets.splice(i+1, 1); //to avoid an endless loop (can't imagine why the selector would return a string, but just in case)
							}
							continue;
						} else if (targ.length && targ[0] && targ[0].nodeType && targ[0].style) { //in case the user is passing in an array of selector objects (like jQuery objects), we need to check one more level and pull things out if necessary...
							targets.splice(i--, 1);
							this._targets = targets = targets.concat(_slice.call(targ, 0));
							continue;
						}
						this._siblings[i] = _register(targ, this, false);
						if (overwrite === 1) if (this._siblings[i].length > 1) {
							_applyOverwrite(targ, this, null, 1, this._siblings[i]);
						}
					}

				} else {
					this._propLookup = {};
					this._siblings = _register(target, this, false);
					if (overwrite === 1) if (this._siblings.length > 1) {
						_applyOverwrite(target, this, null, 1, this._siblings);
					}
				}
				if (this.vars.immediateRender || (duration === 0 && this._delay === 0 && this.vars.immediateRender !== false)) {
					this.render(-this._delay, false, true);
				}
			}, true),
			_isSelector = function(v) {
				return (v.length && v[0] && v[0].nodeType && v[0].style);
			},
			_autoCSS = function(vars, target) {
				var css = {},
					p;
				for (p in vars) {
					if (!_reservedProps[p] && (!(p in target) || p === "x" || p === "y" || p === "width" || p === "height" || p === "className") && (!_plugins[p] || (_plugins[p] && _plugins[p]._autoCSS))) { //note: <img> elements contain read-only "x" and "y" properties. We should also prioritize editing css width/height rather than the element's properties.
						css[p] = vars[p];
						delete vars[p];
					}
				}
				vars.css = css;
			};

		p = TweenLite.prototype = new Animation();
		p.constructor = TweenLite;
		p.kill()._gc = false;

//----TweenLite defaults, overwrite management, and root updates ----------------------------------------------------

		p.ratio = 0;
		p._firstPT = p._targets = p._overwrittenProps = p._startAt = null;
		p._notifyPluginsOfEnabled = false;

		TweenLite.version = "1.9.7";
		TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
		TweenLite.defaultOverwrite = "auto";
		TweenLite.ticker = _ticker;
		TweenLite.autoSleep = true;
		TweenLite.selector = window.$ || window.jQuery || function(e) { if (window.$) { TweenLite.selector = window.$; return window.$(e); } return window.document ? window.document.getElementById((e.charAt(0) === "#") ? e.substr(1) : e) : e; };

		var _internals = TweenLite._internals = {}, //gives us a way to expose certain private values to other GreenSock classes without contaminating tha main TweenLite object.
			_plugins = TweenLite._plugins = {},
			_tweenLookup = TweenLite._tweenLookup = {},
			_tweenLookupNum = 0,
			_reservedProps = _internals.reservedProps = {ease:1, delay:1, overwrite:1, onComplete:1, onCompleteParams:1, onCompleteScope:1, useFrames:1, runBackwards:1, startAt:1, onUpdate:1, onUpdateParams:1, onUpdateScope:1, onStart:1, onStartParams:1, onStartScope:1, onReverseComplete:1, onReverseCompleteParams:1, onReverseCompleteScope:1, onRepeat:1, onRepeatParams:1, onRepeatScope:1, easeParams:1, yoyo:1, immediateRender:1, repeat:1, repeatDelay:1, data:1, paused:1, reversed:1, autoCSS:1},
			_overwriteLookup = {none:0, all:1, auto:2, concurrent:3, allOnStart:4, preexisting:5, "true":1, "false":0},
			_rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(),
			_rootTimeline = Animation._rootTimeline = new SimpleTimeline();

		_rootTimeline._startTime = _ticker.time;
		_rootFramesTimeline._startTime = _ticker.frame;
		_rootTimeline._active = _rootFramesTimeline._active = true;

		Animation._updateRoot = function() {
				_rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);
				_rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);
				if (!(_ticker.frame % 120)) { //dump garbage every 120 frames...
					var i, a, p;
					for (p in _tweenLookup) {
						a = _tweenLookup[p].tweens;
						i = a.length;
						while (--i > -1) {
							if (a[i]._gc) {
								a.splice(i, 1);
							}
						}
						if (a.length === 0) {
							delete _tweenLookup[p];
						}
					}
					//if there are no more tweens in the root timelines, or if they're all paused, make the _timer sleep to reduce load on the CPU slightly
					p = _rootTimeline._first;
					if (!p || p._paused) if (TweenLite.autoSleep && !_rootFramesTimeline._first && _ticker._listeners.tick.length === 1) {
						while (p && p._paused) {
							p = p._next;
						}
						if (!p) {
							_ticker.sleep();
						}
					}
				}
			};

		_ticker.addEventListener("tick", Animation._updateRoot);

		var _register = function(target, tween, scrub) {
				var id = target._gsTweenID, a, i;
				if (!_tweenLookup[id || (target._gsTweenID = id = "t" + (_tweenLookupNum++))]) {
					_tweenLookup[id] = {target:target, tweens:[]};
				}
				if (tween) {
					a = _tweenLookup[id].tweens;
					a[(i = a.length)] = tween;
					if (scrub) {
						while (--i > -1) {
							if (a[i] === tween) {
								a.splice(i, 1);
							}
						}
					}
				}
				return _tweenLookup[id].tweens;
			},

			_applyOverwrite = function(target, tween, props, mode, siblings) {
				var i, changed, curTween, l;
				if (mode === 1 || mode >= 4) {
					l = siblings.length;
					for (i = 0; i < l; i++) {
						if ((curTween = siblings[i]) !== tween) {
							if (!curTween._gc) if (curTween._enabled(false, false)) {
								changed = true;
							}
						} else if (mode === 5) {
							break;
						}
					}
					return changed;
				}
				//NOTE: Add 0.0000000001 to overcome floating point errors that can cause the startTime to be VERY slightly off (when a tween's time() is set for example)
				var startTime = tween._startTime + 0.0000000001,
					overlaps = [],
					oCount = 0,
					zeroDur = (tween._duration === 0),
					globalStart;
				i = siblings.length;
				while (--i > -1) {
					if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {
						//ignore
					} else if (curTween._timeline !== tween._timeline) {
						globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);
						if (_checkOverlap(curTween, globalStart, zeroDur) === 0) {
							overlaps[oCount++] = curTween;
						}
					} else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale + 0.0000000001 > startTime) if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= 0.0000000002)) {
						overlaps[oCount++] = curTween;
					}
				}

				i = oCount;
				while (--i > -1) {
					curTween = overlaps[i];
					if (mode === 2) if (curTween._kill(props, target)) {
						changed = true;
					}
					if (mode !== 2 || (!curTween._firstPT && curTween._initted)) {
						if (curTween._enabled(false, false)) { //if all property tweens have been overwritten, kill the tween.
							changed = true;
						}
					}
				}
				return changed;
			},

			_checkOverlap = function(tween, reference, zeroDur) {
				var tl = tween._timeline,
					ts = tl._timeScale,
					t = tween._startTime,
					min = 0.0000000001; //we use this to protect from rounding errors.
				while (tl._timeline) {
					t += tl._startTime;
					ts *= tl._timeScale;
					if (tl._paused) {
						return -100;
					}
					tl = tl._timeline;
				}
				t /= ts;
				return (t > reference) ? t - reference : ((zeroDur && t === reference) || (!tween._initted && t - reference < 2 * min)) ? min : ((t += tween.totalDuration() / tween._timeScale / ts) > reference + min) ? 0 : t - reference - min;
			};


//---- TweenLite instance methods -----------------------------------------------------------------------------

		p._init = function() {
			var v = this.vars,
				op = this._overwrittenProps,
				dur = this._duration,
				ease = v.ease,
				i, initPlugins, pt, p;
			if (v.startAt) {
				v.startAt.overwrite = 0;
				v.startAt.immediateRender = true;
				this._startAt = TweenLite.to(this.target, 0, v.startAt);
				if (v.immediateRender) {
					this._startAt = null; //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in TimelineLite/Max instances where immediateRender was false (which is the default in the convenience methods like from()).
					if (this._time === 0 && dur !== 0) {
						return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a TimelineLite or TimelineMax, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
					}
				}
			} else if (v.runBackwards && v.immediateRender && dur !== 0) {
				//from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
				if (this._startAt) {
					this._startAt.render(-1, true);
					this._startAt = null;
				} else if (this._time === 0) {
					pt = {};
					for (p in v) { //copy props into a new object and skip any reserved props, otherwise onComplete or onUpdate or onStart could fire. We should, however, permit autoCSS to go through.
						if (!_reservedProps[p] || p === "autoCSS") {
							pt[p] = v[p];
						}
					}
					pt.overwrite = 0;
					this._startAt = TweenLite.to(this.target, 0, pt);
					return;
				}
			}
			if (!ease) {
				this._ease = TweenLite.defaultEase;
			} else if (ease instanceof Ease) {
				this._ease = (v.easeParams instanceof Array) ? ease.config.apply(ease, v.easeParams) : ease;
			} else {
				this._ease = (typeof(ease) === "function") ? new Ease(ease, v.easeParams) : _easeMap[ease] || TweenLite.defaultEase;
			}
			this._easeType = this._ease._type;
			this._easePower = this._ease._power;
			this._firstPT = null;

			if (this._targets) {
				i = this._targets.length;
				while (--i > -1) {
					if ( this._initProps( this._targets[i], (this._propLookup[i] = {}), this._siblings[i], (op ? op[i] : null)) ) {
						initPlugins = true;
					}
				}
			} else {
				initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op);
			}

			if (initPlugins) {
				TweenLite._onPluginEvent("_onInitAllProps", this); //reorders the array in order of priority. Uses a static TweenPlugin method in order to minimize file size in TweenLite
			}
			if (op) if (!this._firstPT) if (typeof(this.target) !== "function") { //if all tweening properties have been overwritten, kill the tween. If the target is a function, it's probably a delayedCall so let it live.
				this._enabled(false, false);
			}
			if (v.runBackwards) {
				pt = this._firstPT;
				while (pt) {
					pt.s += pt.c;
					pt.c = -pt.c;
					pt = pt._next;
				}
			}
			this._onUpdate = v.onUpdate;
			this._initted = true;
		};

		p._initProps = function(target, propLookup, siblings, overwrittenProps) {
			var p, i, initPlugins, plugin, a, pt, v;
			if (target == null) {
				return false;
			}
			if (!this.vars.css) if (target.style) if (target.nodeType) if (_plugins.css) if (this.vars.autoCSS !== false) { //it's so common to use TweenLite/Max to animate the css of DOM elements, we assume that if the target is a DOM element, that's what is intended (a convenience so that users don't have to wrap things in css:{}, although we still recommend it for a slight performance boost and better specificity)
				_autoCSS(this.vars, target);
			}
			for (p in this.vars) {
				if (_reservedProps[p]) {
					if (p === "onStartParams" || p === "onUpdateParams" || p === "onCompleteParams" || p === "onReverseCompleteParams" || p === "onRepeatParams") if ((a = this.vars[p])) {
						i = a.length;
						while (--i > -1) {
							if (a[i] === "{self}") {
								a = this.vars[p] = a.concat(); //copy the array in case the user referenced the same array in multiple tweens/timelines (each {self} should be unique)
								a[i] = this;
							}
						}
					}

				} else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this)) {

					//t - target 		[object]
					//p - property 		[string]
					//s - start			[number]
					//c - change		[number]
					//f - isFunction	[boolean]
					//n - name			[string]
					//pg - isPlugin 	[boolean]
					//pr - priority		[number]
					this._firstPT = pt = {_next:this._firstPT, t:plugin, p:"setRatio", s:0, c:1, f:true, n:p, pg:true, pr:plugin._priority};
					i = plugin._overwriteProps.length;
					while (--i > -1) {
						propLookup[plugin._overwriteProps[i]] = this._firstPT;
					}
					if (plugin._priority || plugin._onInitAllProps) {
						initPlugins = true;
					}
					if (plugin._onDisable || plugin._onEnable) {
						this._notifyPluginsOfEnabled = true;
					}

				} else {
					this._firstPT = propLookup[p] = pt = {_next:this._firstPT, t:target, p:p, f:(typeof(target[p]) === "function"), n:p, pg:false, pr:0};
					pt.s = (!pt.f) ? parseFloat(target[p]) : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]();
					v = this.vars[p];
					pt.c = (typeof(v) === "string" && v.charAt(1) === "=") ? parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) : (Number(v) - pt.s) || 0;
				}
				if (pt) if (pt._next) {
					pt._next._prev = pt;
				}
			}

			if (overwrittenProps) if (this._kill(overwrittenProps, target)) { //another tween may have tried to overwrite properties of this tween before init() was called (like if two tweens start at the same time, the one created second will run first)
				return this._initProps(target, propLookup, siblings, overwrittenProps);
			}
			if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
				this._kill(propLookup, target);
				return this._initProps(target, propLookup, siblings, overwrittenProps);
			}
			return initPlugins;
		};

		p.render = function(time, suppressEvents, force) {
			var prevTime = this._time,
				isComplete, callback, pt;
			if (time >= this._duration) {
				this._totalTime = this._time = this._duration;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
				if (!this._reversed) {
					isComplete = true;
					callback = "onComplete";
				}
				if (this._duration === 0) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (time === 0 || this._rawPrevTime < 0) if (this._rawPrevTime !== time) {
						force = true;
						if (this._rawPrevTime > 0) {
							callback = "onReverseComplete";
							if (suppressEvents) {
								time = -1; //when a callback is placed at the VERY beginning of a timeline and it repeats (or if timeline.seek(0) is called), events are normally suppressed during those behaviors (repeat or seek()) and without adjusting the _rawPrevTime back slightly, the onComplete wouldn't get called on the next render. This only applies to zero-duration tweens/callbacks of course.
							}
						}
					}
					this._rawPrevTime = time;
				}

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._duration === 0) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (this._rawPrevTime >= 0) {
							force = true;
						}
						this._rawPrevTime = time;
					}
				} else if (!this._initted) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
					force = true;
				}

			} else {
				this._totalTime = this._time = time;

				if (this._easeType) {
					var r = time / this._duration, type = this._easeType, pow = this._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}

					if (type === 1) {
						this.ratio = 1 - r;
					} else if (type === 2) {
						this.ratio = r;
					} else if (time / this._duration < 0.5) {
						this.ratio = r / 2;
					} else {
						this.ratio = 1 - (r / 2);
					}

				} else {
					this.ratio = this._ease.getRatio(time / this._duration);
				}

			}

			if (this._time === prevTime && !force) {
				return;
			} else if (!this._initted) {
				this._init();
				if (!this._initted) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly.
					return;
				}
				//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
				if (this._time && !isComplete) {
					this.ratio = this._ease.getRatio(this._time / this._duration);
				} else if (isComplete && this._ease._calcEnd) {
					this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);
				}
			}

			if (!this._active) if (!this._paused) {
				this._active = true;  //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTime === 0) {
				if (this._startAt) {
					if (time >= 0) {
						this._startAt.render(time, suppressEvents, force);
					} else if (!callback) {
						callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
					}
				}
				if (this.vars.onStart) if (this._time !== 0 || this._duration === 0) if (!suppressEvents) {
					this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
				}
			}

			pt = this._firstPT;
			while (pt) {
				if (pt.f) {
					pt.t[pt.p](pt.c * this.ratio + pt.s);
				} else {
					pt.t[pt.p] = pt.c * this.ratio + pt.s;
				}
				pt = pt._next;
			}

			if (this._onUpdate) {
				if (time < 0) if (this._startAt) {
					this._startAt.render(time, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
				}
				if (!suppressEvents) {
					this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
				}
			}

			if (callback) if (!this._gc) { //check _gc because there's a chance that kill() could be called in an onUpdate
				if (time < 0 && this._startAt && !this._onUpdate) {
					this._startAt.render(time, suppressEvents, force);
				}
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
				}
			}

		};

		p._kill = function(vars, target) {
			if (vars === "all") {
				vars = null;
			}
			if (vars == null) if (target == null || target === this.target) {
				return this._enabled(false, false);
			}
			target = (typeof(target) !== "string") ? (target || this._targets || this.target) : TweenLite.selector(target) || target;
			var i, overwrittenProps, p, pt, propLookup, changed, killProps, record;
			if ((target instanceof Array || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				while (--i > -1) {
					if (this._kill(vars, target[i])) {
						changed = true;
					}
				}
			} else {
				if (this._targets) {
					i = this._targets.length;
					while (--i > -1) {
						if (target === this._targets[i]) {
							propLookup = this._propLookup[i] || {};
							this._overwrittenProps = this._overwrittenProps || [];
							overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
							break;
						}
					}
				} else if (target !== this.target) {
					return false;
				} else {
					propLookup = this._propLookup;
					overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
				}

				if (propLookup) {
					killProps = vars || propLookup;
					record = (vars !== overwrittenProps && overwrittenProps !== "all" && vars !== propLookup && (vars == null || vars._tempKill !== true)); //_tempKill is a super-secret way to delete a particular tweening property but NOT have it remembered as an official overwritten property (like in BezierPlugin)
					for (p in killProps) {
						if ((pt = propLookup[p])) {
							if (pt.pg && pt.t._kill(killProps)) {
								changed = true; //some plugins need to be notified so they can perform cleanup tasks first
							}
							if (!pt.pg || pt.t._overwriteProps.length === 0) {
								if (pt._prev) {
									pt._prev._next = pt._next;
								} else if (pt === this._firstPT) {
									this._firstPT = pt._next;
								}
								if (pt._next) {
									pt._next._prev = pt._prev;
								}
								pt._next = pt._prev = null;
							}
							delete propLookup[p];
						}
						if (record) {
							overwrittenProps[p] = 1;
						}
					}
					if (!this._firstPT && this._initted) { //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
						this._enabled(false, false);
					}
				}
			}
			return changed;
		};

		p.invalidate = function() {
			if (this._notifyPluginsOfEnabled) {
				TweenLite._onPluginEvent("_onDisable", this);
			}
			this._firstPT = null;
			this._overwrittenProps = null;
			this._onUpdate = null;
			this._startAt = null;
			this._initted = this._active = this._notifyPluginsOfEnabled = false;
			this._propLookup = (this._targets) ? {} : [];
			return this;
		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (enabled && this._gc) {
				var targets = this._targets,
					i;
				if (targets) {
					i = targets.length;
					while (--i > -1) {
						this._siblings[i] = _register(targets[i], this, true);
					}
				} else {
					this._siblings = _register(this.target, this, true);
				}
			}
			Animation.prototype._enabled.call(this, enabled, ignoreTimeline);
			if (this._notifyPluginsOfEnabled) if (this._firstPT) {
				return TweenLite._onPluginEvent((enabled ? "_onEnable" : "_onDisable"), this);
			}
			return false;
		};


//----TweenLite static methods -----------------------------------------------------

		TweenLite.to = function(target, duration, vars) {
			return new TweenLite(target, duration, vars);
		};

		TweenLite.from = function(target, duration, vars) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return new TweenLite(target, duration, vars);
		};

		TweenLite.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return new TweenLite(target, duration, toVars);
		};

		TweenLite.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new TweenLite(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, onCompleteScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, onReverseCompleteScope:scope, immediateRender:false, useFrames:useFrames, overwrite:0});
		};

		TweenLite.set = function(target, vars) {
			return new TweenLite(target, 0, vars);
		};

		TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function(target, vars) {
			var a = TweenLite.getTweensOf(target),
				i = a.length;
			while (--i > -1) {
				a[i]._kill(vars, target);
			}
		};

		TweenLite.getTweensOf = function(target) {
			if (target == null) { return []; }
			target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;
			var i, a, j, t;
			if ((target instanceof Array || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				a = [];
				while (--i > -1) {
					a = a.concat(TweenLite.getTweensOf(target[i]));
				}
				i = a.length;
				//now get rid of any duplicates (tweens of arrays of objects could cause duplicates)
				while (--i > -1) {
					t = a[i];
					j = i;
					while (--j > -1) {
						if (t === a[j]) {
							a.splice(i, 1);
						}
					}
				}
			} else {
				a = _register(target).concat();
				i = a.length;
				while (--i > -1) {
					if (a[i]._gc) {
						a.splice(i, 1);
					}
				}
			}
			return a;
		};



/*
 * ----------------------------------------------------------------
 * TweenPlugin   (could easily be split out as a separate file/class, but included for ease of use (so that people don't need to include another <script> call before loading plugins which is easy to forget)
 * ----------------------------------------------------------------
 */
		var TweenPlugin = _class("plugins.TweenPlugin", function(props, priority) {
					this._overwriteProps = (props || "").split(",");
					this._propName = this._overwriteProps[0];
					this._priority = priority || 0;
					this._super = TweenPlugin.prototype;
				}, true);

		p = TweenPlugin.prototype;
		TweenPlugin.version = "1.9.1";
		TweenPlugin.API = 2;
		p._firstPT = null;

		p._addTween = function(target, prop, start, end, overwriteProp, round) {
			var c, pt;
			if (end != null && (c = (typeof(end) === "number" || end.charAt(1) !== "=") ? Number(end) - start : parseInt(end.charAt(0)+"1", 10) * Number(end.substr(2)))) {
				this._firstPT = pt = {_next:this._firstPT, t:target, p:prop, s:start, c:c, f:(typeof(target[prop]) === "function"), n:overwriteProp || prop, r:round};
				if (pt._next) {
					pt._next._prev = pt;
				}
			}
		};

		p.setRatio = function(v) {
			var pt = this._firstPT,
				min = 0.000001,
				val;
			while (pt) {
				val = pt.c * v + pt.s;
				if (pt.r) {
					val = (val + ((val > 0) ? 0.5 : -0.5)) >> 0; //about 4x faster than Math.round()
				} else if (val < min) if (val > -min) { //prevents issues with converting very small numbers to strings in the browser
					val = 0;
				}
				if (pt.f) {
					pt.t[pt.p](val);
				} else {
					pt.t[pt.p] = val;
				}
				pt = pt._next;
			}
		};

		p._kill = function(lookup) {
			var a = this._overwriteProps,
				pt = this._firstPT,
				i;
			if (lookup[this._propName] != null) {
				this._overwriteProps = [];
			} else {
				i = a.length;
				while (--i > -1) {
					if (lookup[a[i]] != null) {
						a.splice(i, 1);
					}
				}
			}
			while (pt) {
				if (lookup[pt.n] != null) {
					if (pt._next) {
						pt._next._prev = pt._prev;
					}
					if (pt._prev) {
						pt._prev._next = pt._next;
						pt._prev = null;
					} else if (this._firstPT === pt) {
						this._firstPT = pt._next;
					}
				}
				pt = pt._next;
			}
			return false;
		};

		p._roundProps = function(lookup, value) {
			var pt = this._firstPT;
			while (pt) {
				if (lookup[this._propName] || (pt.n != null && lookup[ pt.n.split(this._propName + "_").join("") ])) { //some properties that are very plugin-specific add a prefix named after the _propName plus an underscore, so we need to ignore that extra stuff here.
					pt.r = value;
				}
				pt = pt._next;
			}
		};

		TweenLite._onPluginEvent = function(type, tween) {
			var pt = tween._firstPT,
				changed, pt2, first, last, next;
			if (type === "_onInitAllProps") {
				//sorts the PropTween linked list in order of priority because some plugins need to render earlier/later than others, like MotionBlurPlugin applies its effects after all x/y/alpha tweens have rendered on each frame.
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				pt = tween._firstPT = first;
			}
			while (pt) {
				if (pt.pg) if (typeof(pt.t[type]) === "function") if (pt.t[type]()) {
					changed = true;
				}
				pt = pt._next;
			}
			return changed;
		};

		TweenPlugin.activate = function(plugins) {
			var i = plugins.length;
			while (--i > -1) {
				if (plugins[i].API === TweenPlugin.API) {
					_plugins[(new plugins[i]())._propName] = plugins[i];
				}
			}
			return true;
		};

		//provides a more concise way to define plugins that have no dependencies besides TweenPlugin and TweenLite, wrapping common boilerplate stuff into one function (added in 1.9.0). You don't NEED to use this to define a plugin - the old way still works and can be useful in certain (rare) situations.
		_gsDefine.plugin = function(config) {
			if (!config || !config.propName || !config.init || !config.API) { throw "illegal plugin definition."; }
			var propName = config.propName,
				priority = config.priority || 0,
				overwriteProps = config.overwriteProps,
				map = {init:"_onInitTween", set:"setRatio", kill:"_kill", round:"_roundProps", initAll:"_onInitAllProps"},
				Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin",
					function() {
						TweenPlugin.call(this, propName, priority);
						this._overwriteProps = overwriteProps || [];
					}, (config.global === true)),
				p = Plugin.prototype = new TweenPlugin(propName),
				prop;
			p.constructor = Plugin;
			Plugin.API = config.API;
			for (prop in map) {
				if (typeof(config[prop]) === "function") {
					p[map[prop]] = config[prop];
				}
			}
			Plugin.version = config.version;
			TweenPlugin.activate([Plugin]);
			return Plugin;
		};


		//now run through all the dependencies discovered and if any are missing, log that to the console as a warning. This is why it's best to have TweenLite load last - it can check all the dependencies for you.
		a = window._gsQueue;
		if (a) {
			for (i = 0; i < a.length; i++) {
				a[i]();
			}
			for (p in _defLookup) {
				if (!_defLookup[p].func) {
					window.console.log("GSAP encountered missing dependency: com.greensock." + p);
				}
			}
		}

		_tickerActive = false; //ensures that the first official animation forces a ticker.tick() to update the time when it is instantiated

})(window);/* FWDNavigator */
(function (window){
var FWDNavigator = function(parent, data){
		
		var self = this;
		var prototype = FWDNavigator.prototype;
		
		this.hider = null;
		this.mainHolder_do = null;
		this.mainImagesHolder_do = null;
		this.smallImage_sdo = null;
		this.border_sdo = null;
		this.handler_sdo = null;
		this.dumy_sdo = null;
		
		this.image_img = data.navigatorImage_img;

		this.borderColor_str = data.navigatorBorderColor_str;
		this.handlerColor_str = data.navigatorHandlerColor_str;
		this.handMovePath_str =  data.handMovePath_str;
		this.handGrabPath_str =  data.handGrabPath_str;
		this.navigatorPosition_str = data.navigatorPosition_str;
	
		this.stageWidth;
		this.stageHeight;
		this.totalWidth = data.navigatorWidth;
		this.totalHeight = data.navigatorHeight;
		this.offsetX = data.navigatorOffsetX;
		this.offsetY = data.navigatorOffsetY;
		this.finalWidth;
		this.finalHeight;
		this.finalX; 
		this.finalY;
		this.xPositionOnPress;
		this.yPositionOnPress;
		this.lastPresedX;
		this.lastPresedY;
		
		this.tweenCompleteId_to;
	
		this.isShowed_bl = true;
		this.isTweening_bl = false;
		this.isDragging_bl = false;
		this.isMobile_bl = FWDUtils.isMobile;
		this.hasPointerEvent_bl = FWDUtils.hasPointerEvent;
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setOverflow("visible");
			self.setSelectable(false);
			self.setupMainContiners();
			self.setupImageSdo();
			self.hide();
			self.resizeAndPosition();
			self.handler_sdo.screen.style.cursor = 'url(' + self.handMovePath_str + '), default';
		};
		
		self.activate = function(){
			self.addPannSupport();
			//self.screen.onmousedown = function(){self.dispatchEvent(FWDNavigator.PAN_START);};
			//if(FWDUtils.isIEAndLessThen9) self.handler_sdo.screen.onmousedown = function(){self.dispatchEvent(FWDNavigator.PAN_START);};
		};
		
		//##########################################//
		/* resize and position */
		//##########################################//
		self.resizeAndPosition = function(){
			self.stageWidth = parent.stageWidth;
			self.stageHeight = parent.stageHeight;
			if(self.navigatorPosition_str == FWDNavigator.TOP_LEFT){
				self.setX(self.offsetX);
				self.setY(self.offsetY);
			}else if(self.navigatorPosition_str == FWDNavigator.TOP_RIGHT){
				self.setX(self.stageWidth - self.totalWidth - self.offsetX);
				self.setY(self.offsetY);
			}else if(self.navigatorPosition_str == FWDNavigator.BOTTOM_LEFT){
				self.setX(self.offsetX);
				self.setY(self.stageHeight - self.totalHeight - self.offsetY);
			}else if(self.navigatorPosition_str == FWDNavigator.BOTTOM_RIGHT){
				self.setX(self.stageWidth - self.totalWidth - self.offsetX);
				self.setY(self.stageHeight - self.totalHeight - self.offsetY);
			}
		};
		
		self.setupHider = function(hider){
			//self.hider = hider;
			//self.hider.addListener(FWDHider.HIDE, self.onHiderHide);
		};
		
		self.onHiderHide = function(){
			//if(FWDUtils.hitTest(self.mainHolder_do.screen, self.hider.globalX, self.hider.globalY)) self.hider.reset();
		};
		
		//###########################################//
		//Setup main containers
		//###########################################//
		self.setupMainContiners = function(){
			self.mainHolder_do = new FWDDisplayObject("div", "absolute", "visible");
			self.mainHolder_do.setWidth(self.totalWidth);
			self.mainHolder_do.setHeight(self.totalHeight);
			self.addChild(self.mainHolder_do);
			
			self.mainImagesHolder_do =  new FWDDisplayObject("div", "absolute", "visible");
			self.smallImage_sdo = new FWDSimpleDisplayObject("img");
			self.mainHolder_do.addChild(self.mainImagesHolder_do);
			
			self.border_sdo = new FWDSimpleDisplayObject("div");
			self.border_sdo.setWidth(self.totalWidth - 2);
			self.border_sdo.setHeight(self.totalHeight - 2);
			self.border_sdo.getStyle().borderStyle = "solid";
			self.border_sdo.getStyle().borderWidth = "1px";
			self.border_sdo.getStyle().borderColor = self.borderColor_str;
			self.mainHolder_do.addChild(self.border_sdo);

			
			self.handler_sdo = new FWDSimpleDisplayObject("div");
			self.handler_sdo.setWidth(self.totalWidth - 2);
			self.handler_sdo.setHeight(self.totalHeight - 2);
			self.handler_sdo.getStyle().borderStyle = "solid";
			self.handler_sdo.getStyle().borderWidth = "1px";
			if(FWDUtils.isIE) self.handler_sdo.getStyle().background = "url('dumy')";
			self.handler_sdo.getStyle().borderColor = self.handlerColor_str;
			self.mainHolder_do.addChild(self.handler_sdo);
		};
		
		//##########################################//
		/* Setup images sdo */
		//##########################################//
		self.setupImageSdo = function(start){
			self.smallImage_sdo = new FWDSimpleDisplayObject("img");
			self.smallImage_sdo.setScreen(self.image_img);
			self.mainImagesHolder_do.addChild(self.smallImage_sdo);
		};
		
		//########################################//
		/* update navigator dragger */
		//########################################//
		self.update = function(percentX, percentY, percentWidth, percentHeight, animate){
			
			if(percentWidth > 1) percentWidth = 1;
			if(percentHeight > 1) percentHeight = 1;
			if(percentX > 1) percentX = 1;
			if(percentY > 1) percentY = 1;
			
			if(isNaN(percentX)) percentX = 0;
			if(isNaN(percentY)) percentY = 0;
			
			self.finalWidth = Math.round(percentWidth * (self.totalWidth -4));
			self.finalHeight = Math.round(percentHeight * (self.totalHeight-4));
			
			self.finalX = Math.round((percentX * ((self.totalWidth - 2) - self.finalWidth))); 
			if(self.finalX < 1){
				self.finalX = 1;
			}else if(self.finalX >= self.totalWidth - 3 - self.finalWidth){
				self.finalX = self.totalWidth - 3 - self.finalWidth;
			}
			
			self.finalY = Math.round((percentY * ((self.totalHeight - 2) - self.finalHeight)));
			if(self.finalY < 1){
				self.finalY = 1;
			}else if(self.finalY >= self.totalHeight - 3 - self.finalHeight){
				self.finalY = self.totalHeight - 3 - self.finalHeight;
			}
			
			clearTimeout(self.tweenCompleteId_to);
			
			if(animate){
				self.isTweening_bl = true;
				self.tweenCompleteId_to = setTimeout(function(){if(self == null) return; self.isTweening_bl = false;}, 200);
				TweenMax.killTweensOf(self.handler_sdo);
				TweenMax.to(self.handler_sdo, .2, {x:self.finalX, y:self.finalY, w:self.finalWidth, h:self.finalHeight});
			}else{
				self.isTweening_bl = false;
				TweenMax.killTweensOf(self.handler_sdo);
				self.handler_sdo.setX(self.finalX);
				self.handler_sdo.setY(self.finalY);
				self.handler_sdo.setWidth(self.finalWidth);
				self.handler_sdo.setHeight(self.finalHeight);
			}
		};
		
		//###############################################//
		//Add touch pann support
		//###############################################//
		self.addPannSupport = function(){
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.handler_sdo.screen.addEventListener("MSPointerDown", self.panStartHandler);
				}else{
					self.handler_sdo.screen.addEventListener("touchstart", self.panStartHandler);
				}	
			}else if(self.handler_sdo.screen.addEventListener){
				self.handler_sdo.screen.addEventListener("mousedown", self.panStartHandler);
			}else if(self.handler_sdo.screen.attachEvent){
				self.handler_sdo.screen.attachEvent("onmousedown", self.panStartHandler);
			}
		};
		
		self.panStartHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			if(self.isTweening_bl) return;
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);		
			self.isDragging_bl = true;
			self.xPositionOnPress = self.handler_sdo.getX();
			self.yPositionOnPress = self.handler_sdo.getY();
			self.lastPresedX = viewportMouseCoordinates.screenX;
			self.lastPresedY = viewportMouseCoordinates.screenY;
	
			self.dispatchEvent(FWDNavigator.PAN_START);
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.addEventListener("MSPointerMove", self.panMoveHandler);
					window.addEventListener("MSPointerUp", self.panEndHandler);
				}else{
					window.addEventListener("touchmove", self.panMoveHandler);
					window.addEventListener("touchend", self.panEndHandler);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener("mousemove", self.panMoveHandler);
					window.addEventListener("mouseup", self.panEndHandler);	
				}else if(document.attachEvent){
					document.attachEvent("onmousemove", self.panMoveHandler);
					document.attachEvent("onmouseup", self.panEndHandler);
				}
			}
		};
		
		self.panMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			if(e.touches && e.touches.length != 1) return;
			var viewportMouseCoordinates = FWDUtils.getViewportMouseCoordinates(e);	
	
			self.finalX = Math.round(self.xPositionOnPress + viewportMouseCoordinates.screenX - self.lastPresedX);
			if(self.finalX < 1){
				self.finalX = 1;
			}else if(self.finalX >= self.totalWidth - 3 - self.finalWidth){
				self.finalX = self.totalWidth - 3 - self.finalWidth;
			}
			self.handler_sdo.setX(self.finalX);
		
	
			self.finalY = Math.round(self.yPositionOnPress + viewportMouseCoordinates.screenY - self.lastPresedY);
			if(self.finalY < 1){
				self.finalY = 1;
			}else if(self.finalY >= self.totalHeight - 3 - self.finalHeight){
				self.finalY = self.totalHeight - 3 - self.finalHeight;
			}
			self.handler_sdo.setY(self.finalY);
			
			self.dispatchEvent(FWDNavigator.PAN,
					{percentX:self.finalX/(self.totalWidth - 2 - self.finalWidth),
					percentY:self.finalY/(self.totalHeight - 2 - self.finalHeight)
				});
		};
		
		self.panEndHandler = function(e){
			self.isDragging_bl = false;
			self.dispatchEvent(FWDNavigator.PAN_END);
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.removeEventListener("MSPointerMove", self.panMoveHandler);
					window.removeEventListener("MSPointerUp", self.panEndHandler);
				}else{
					window.removeEventListener("touchmove", self.panMoveHandler);
					window.removeEventListener("touchend", self.panEndHandler);
				}
			}else{
				if(window.removeEventListener){
					window.removeEventListener("mousemove", self.panMoveHandler);
					window.removeEventListener("mouseup", self.panEndHandler);	
				}else if(document.detachEvent){
					document.detachEvent("onmousemove", self.panMoveHandler);
					document.detachEvent("onmouseup", self.panEndHandler);
				}
			}
		};
		
		//##########################################//
		/* show / hide*/
		//##########################################//
		self.show = function(animate){
			if(self.isShowed_bl) return;
			self.resizeAndPosition();
			
			if(animate){
				TweenMax.to(self.mainHolder_do, 1, {y:0, ease:Expo.easeInOut});
			}else{
				TweenMax.killTweensOf(self.mainHolder_do);
				self.mainHolder_do.setY(0);
			}
			
			self.isShowed_bl = true;
		};
		
		self.hide = function(animate){
			if(!self.isShowed_bl) return;
			if(self.navigatorPosition_str == FWDNavigator.TOP_LEFT || self.navigatorPosition_str == FWDNavigator.TOP_RIGHT){
				if(animate){
					TweenMax.to(self.mainHolder_do, 1, {y:-self.totalHeight - self.offsetY, ease:Expo.easeInOut});
					self.update(1,1,1,1,true);
				}else{
					TweenMax.killTweensOf(self.mainHolder_do);
					self.mainHolder_do.setY(-self.totalHeight - self.offsetY);
				}
			}else if(self.navigatorPosition_str == FWDNavigator.BOTTOM_LEFT || self.navigatorPosition_str == FWDNavigator.BOTTOM_RIGHT){
				if(animate){
					TweenMax.to(self.mainHolder_do, 1, {y:self.totalHeight + self.offsetY, ease:Expo.easeInOut});
					self.update(1,1,1,1,true);
				}else{
					TweenMax.killTweensOf(self.mainHolder_do);
					self.mainHolder_do.setY(self.totalHeight + self.offsetY);
				}
			}
			self.isShowed_bl = false;
		};
		
		//#####################################//
		/* clean main events */
		//#####################################//
		self.cleanMainEvents = function(){
			
			if(self.isMobile_bl){
				self.handler_sdo.screen.removeEventListener("touchstart", self.panStartHandler);
				self.handler_sdo.screen.addEventListener("MSPointerDown", self.panStartHandler);
				window.removeEventListener("touchmove", self.panMoveHandler);
				window.removeEventListener("touchend", self.panEndHandler);
				window.removeEventListener("MSPointerMove", self.panMoveHandler);
				window.removeEventListener("MSPointerUp", self.panEndHandler);
			}else if(self.handler_sdo.screen.removeEventListener){
				self.handler_sdo.screen.removeEventListener("mousedown", self.panStartHandler);
				window.removeEventListener("mousemove", self.panMoveHandler);
				window.removeEventListener("mouseup", self.panEndHandler);	
			}else if(self.handler_sdo.screen.detachEvent){
				self.handler_sdo.screen.detachEvent("onmousedown", self.panStartHandler);
				document.detachEvent("onmousemove", self.panMoveHandler);
				document.detachEvent("onmouseup", self.panEndHandler);
			}
			self.screen.onmousedown = null;
			self.handler_sdo.screen.onmousedown = null;
			
			clearTimeout(self.tweenCompleteId_to);
		};
		
		//##############################//
		/* destroy */
		//##############################//
		self.destroy = function(){
			self.cleanMainEvents();
			
			if(self.hider){
				self.hider.removeListener(FWDHider.HIDE, self.onHiderHide);
			};
			
			TweenMax.killTweensOf(self.mainHolder_do);
			self.mainHolder_do.destroy();
			
			TweenMax.killTweensOf(self.handler_sdo);
			self.handler_sdo.destroy();
			
			self.mainImagesHolder_do.destroy();
			if(self.dumy_sdo) self.dumy_sdo.destroy();
			
			self.hider = null;
			self.mainHolder_do = null;
			self.mainImagesHolder_do = null;
			self.smallImage_sdo = null;
			self.handler_sdo = null;
			self.dumy_sdo = null;
			
			self.images_ar = data.navigatorImages_ar;
			
			self.borderColor_str = null;
			self.handlerColor_str = null;
			self.handMovePath_str = null;
			self.handGrabPath_str = null;
			self.navigatorPosition_str = null;
			
			data = null;
			parent = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDNavigator.prototype = null;
		};
	
		self.init();
	};
	
	/* set prototype */
	FWDNavigator.setPrototype = function(){
		FWDNavigator.prototype = new FWDDisplayObject("div");
	};
	
	FWDNavigator.TOP_LEFT = "topleft";
	FWDNavigator.TOP_RIGHT = "topright";
	FWDNavigator.BOTTOM_LEFT = "bottomleft";
	FWDNavigator.BOTTOM_RIGHT = "bottomright";
	FWDNavigator.PAN_START = "panStart";
	FWDNavigator.PAN_END = "panEnd";
	FWDNavigator.PAN = "pan";
	
	
	FWDNavigator.prototype = null;
	window.FWDNavigator = FWDNavigator;
}(window));/* Thumb */
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
}(window));/* FWDSimpleButton */
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
}(window));/* Simple Display object */
(function (window){
	/*
	 * @ type values: div, img.
	 * @ positon values: relative, absolute.
	 * @ positon values: hidden.
	 * @ display values: block, inline-block, self applies only if the position is relative.
	 */
	var FWDSimpleDisplayObject = function(type, position, overflow, display){
		
		var self = this;
		
		if(type == "div" || type == "img" || type == "canvas"){
			self.type = type;	
		}else{
			throw Error("Type is not valid! " + type);
		}
	
		this.style;
		this.screen;
		this.transform;
		this.position = position || "absolute";
		this.overflow = overflow || "hidden";
		this.display = display || "block";
		this.visible = true;
		this.buttonMode;
		this.x = 0;
		this.y = 0;
		this.w = 0;
		this.h = 0;
		this.rect;
		this.alpha = 1;
		this.innerHTML = "";
		this.opacityType = "";
		this.isHtml5_bl = false;
		
		this.hasTransform3d_bl =  FWDUtils.hasTransform3d;
		this.hasTransform2d_bl =  FWDUtils.hasTransform2d;
		if(FWDUtils.isFirefox) self.hasTransform3d_bl = false;
		if(FWDUtils.isFirefox) self.hasTransform2d_bl = false;
		this.hasBeenSetSelectable_bl = false;
		
		
		//##############################//
		/* init */
		//#############################//
		self.init = function(){
			self.setScreen();
		};	
		
		//######################################//
		/* check if it supports transforms. */
		//######################################//
		self.getTransform = function() {
		    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform'];
		    var p;
		    while (p = properties.shift()) {
		       if (typeof self.screen.style[p] !== 'undefined') {
		            return p;
		       }
		    }
		    return false;
		};
		
		//######################################//
		/* set opacity type */
		//######################################//
		self.getOpacityType = function(){
			var opacityType;
			if (typeof self.screen.style.opacity != "undefined") {//ie9+ 
				opacityType = "opacity";
			}else{ //ie8
				opacityType = "filter";
			}
			return opacityType;
		};
		
		//######################################//
		/* setup main screen */
		//######################################//
		self.setScreen = function(element){
			if(self.type == "img" && element){
				self.screen = element;
				self.setMainProperties();
			}else{
				self.screen = document.createElement(self.type);
				self.setMainProperties();
			}
		};
		
		//########################################//
		/* set main properties */
		//########################################//
		self.setMainProperties = function(){
			
			self.transform = self.getTransform();
			self.setPosition(self.position);
			
			self.setOverflow(self.overflow);
			self.opacityType = self.getOpacityType();
			
			if(self.opacityType == "opacity") self.isHtml5_bl = true;
			
			if(self.opacityType == "filter") self.screen.style.filter = "inherit";
			self.screen.style.left = "0px";
			self.screen.style.top = "0px";
			self.screen.style.margin = "0px";
			self.screen.style.padding = "0px";
			self.screen.style.maxWidth = "none";
			self.screen.style.maxHeight = "none";
			self.screen.style.border = "none";
			self.screen.style.lineHeight = "1";
			self.screen.style.backgroundColor = "transparent";
			self.screen.style.backfaceVisibility = "hidden";
			self.screen.style.webkitBackfaceVisibility = "hidden";
			self.screen.style.MozBackfaceVisibility = "hidden";	
			self.screen.style.MozImageRendering = "optimizeSpeed";	
			self.screen.style.WebkitImageRendering = "optimizeSpeed";	
			
			
			if(type == "img"){
				self.setWidth(self.screen.width);
				self.setHeight(self.screen.height);
				self.setSelectable(false);
			}
		};
		
		//###################################################//
		/* set / get various peoperties.*/
		//###################################################//
		self.setSelectable = function(val){
			if(!val){
				self.screen.style.userSelect = "none";
				self.screen.style.MozUserSelect = "none";
				self.screen.style.webkitUserSelect = "none";
				self.screen.style.khtmlUserSelect = "none";
				self.screen.style.oUserSelect = "none";
				self.screen.style.msUserSelect = "none";
				self.screen.msUserSelect = "none";
				self.screen.ondragstart = function(e){return false;};
				self.screen.onselectstart = function(){return false;};
				self.screen.ontouchstart = function(e){return false;};
				self.screen.style.webkitTouchCallout='none';
				self.hasBeenSetSelectable_bl = true;
			}
		};
			
		self.setBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "visible";
			self.screen.style.webkitBackfaceVisibility = "visible";
			self.screen.style.MozBackfaceVisibility = "visible";		
		};
		
		self.removeBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "hidden";
			self.screen.style.webkitBackfaceVisibility = "hidden";
			self.screen.style.MozBackfaceVisibility = "hidden";		
		};
		
		self.getScreen = function(){
			return self.screen;
		};
		
		self.setVisible = function(val){
			self.visible = val;
			if(self.visible == true){
				self.screen.style.visibility = "visible";
			}else{
				self.screen.style.visibility = "hidden";
			}
		};
		
		self.getVisible = function(){
			return self.visible;
		};
			
		self.setResizableSizeAfterParent = function(){
			self.screen.style.width = "100%";
			self.screen.style.height = "100%";
		};
		
		self.getStyle = function(){
			return self.screen.style;
		};
		
		self.setOverflow = function(val){
			self.overflow = val;
			self.screen.style.overflow = self.overflow;
		};
		
		self.setPosition = function(val){
			self.position = val;
			self.screen.style.position = self.position;
		};
		
		self.setDisplay = function(val){
			self.display = val;
			self.screen.style.display = self.display;
		};
		
		self.setButtonMode = function(val){
			self.buttonMode = val;
			if(self.buttonMode ==  true){
				self.screen.style.cursor = "pointer";
			}else{
				self.screen.style.cursor = "default";
			}
		};
		
		self.setBkColor = function(val){
			self.screen.style.backgroundColor = val;
		};
		
		self.setInnerHTML = function(val){
			self.innerHTML = val;
			self.screen.innerHTML = self.innerHTML;
		};
		
		self.getInnerHTML = function(){
			return self.innerHTML;
		};
		
		self.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		self.setAlpha = function(val){
			self.alpha = val;
			if(self.opacityType == "opacity"){
				self.screen.style.opacity = self.alpha;
			}else if(self.opacityType == "filter"){
				self.screen.style.filter = "alpha(opacity=" + self.alpha * 100 + ")";
				self.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(self.alpha * 100) + ")";
			}
		};
		
		self.getAlpha = function(){
			return self.alpha;
		};
		
		self.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		self.getGlobalX = function(){
			return self.getRect().left;
		};
		
		self.getGlobalY = function(){
			return self.getRect().top;
		};
		
		self.setX = function(val){
			self.x = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = 'translate3d(' + self.x + 'px,' + self.y + 'px,0)';
			}else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else{
				self.screen.style.left = self.x + "px";
			}
		};
		
		self.getX = function(){
			return  self.x;
		};
		
		self.setY = function(val){
			self.y = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = 'translate3d(' + self.x + 'px,' + self.y + 'px,0)';	
			}else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else{
				self.screen.style.top = self.y + "px";
			}
		};
		
		self.getY = function(){
			return  self.y;
		};
		
		self.setWidth = function(val){
			self.w = val;
			if(self.type == "img"){
				self.screen.width = self.w;
			}else{
				self.screen.style.width = self.w + "px";
			}
		};
		
		self.getWidth = function(){
			if(self.type == "div"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}else if(self.type == "img"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				if(self.screen.width != 0) return  self.screen.width;
				return self._w;
			}else if( self.type == "canvas"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}
		};
		
		self.setHeight = function(val){
			self.h = val;
			if(self.type == "img"){
				self.screen.height = self.h;
			}else{
				self.screen.style.height = self.h + "px";
			}
		};
		
		self.getHeight = function(){
			if(self.type == "div"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}else if(self.type == "img"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				if(self.screen.height != 0) return  self.screen.height;
				return self.h;
			}else if(self.type == "canvas"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}
		};
		
	    //###########################################//
	    /* destroy methods*/
	    //###########################################//
		self.disposeImage = function(){
			if(self.type == "img") self.screen.src = null;
		};
		
		
		self.destroy = function(){
			
			//try{self.screen.parentNode.removeChild(self.screen);}catch(e){};
			if(self.hasBeenSetSelectable_bl){
				self.screen.ondragstart = null;
				self.screen.onselectstart = null;
				self.screen.ontouchstart = null;
			};
			
			self.screen.removeAttribute("style");
			
			//destroy properties
			self.style = null;
			self.screen = null;
			self.transform = null;
			self.position = null;
			self.overflow = null;
			self.display = null;
			self.visible = null;
			self.buttonMode = null;
			self.x = null;
			self.y = null;
			self.w = null;
			self.h = null;
			self.rect = null;
			self.alpha = null;
			self.innerHTML = null;
			self.opacityType = null;
			self.isHtml5_bl = null;
			
			type = null;
			position = null;
			overflow = null;
			display = null;
		
			self.hasTransform3d_bl = null;
			self.hasTransform2d_bl = null;
			self = null;
		};
		
	    /* init */
		self.init();
	};
	
	window.FWDSimpleDisplayObject = FWDSimpleDisplayObject;
}(window));/* Simple Display object */
(function (window){
	/*
	 * @ type values: div, img.
	 * @ positon values: relative, absolute.
	 * @ positon values: hidden.
	 * @ display values: block, inline-block, self applies only if the position is relative.
	 */
	var FWDTransformDisplayObject = function(type, position, overflow){
		
		var self = this;
		
		if(type == "div" || type == "img" || type == "canvas"){
			self.type = type;	
		}else{
			throw Error("Type is not valid! " + type);
		}
	
		this.style;
		this.screen;
		this.transform;
		this.transformOrigin;
		this.position = position || "absolute";
		this.overflow = overflow || "hidden";
		this.visible = true;
		this.buttonMode;
		this.x = 0;
		this.y = 0;
		this.w = 0;
		this.h = 0;
		this.scale = 1;
		this.rect;
		this.alpha = 1;
		this.innerHTML = "";
		this.opacityType = "";
		this.isHtml5_bl = false;
		
		this.hasTransform3d_bl =  FWDUtils.hasTransform3d;
		this.hasTransform2d_bl =  FWDUtils.hasTransform2d;
		if(FWDUtils.isIE || FWDUtils.isFirefox) self.hasTransform3d_bl = false;
		this.hasBeenSetSelectable_bl = false;
		
		
		//##############################//
		/* init */
		//#############################//
		self.init = function(){
			self.setScreen();
		};	
		
		//######################################//
		/* check if it supports transforms. */
		//######################################//
		self.getTransform = function() {
		    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform'];
		    var p;
		    while (p = properties.shift()) {
		       if (typeof self.screen.style[p] !== 'undefined') {
		            return p;
		       }
		    }
		    return undefined;
		};
		
		//######################################//
		/* get transof. */
		//######################################//
		self.getTransformOrigin = function() {
		    var properties = ['transformOrigin', 'msTransformOrigin', 'WebkitTransformOrigin', 'MozTransformOrigin', 'OTransformOrigin'];
		    var p;
		    while (p = properties.shift()) {
		       if (typeof self.screen.style[p] !== 'undefined') {
		            return p;
		       }
		    }
		    return undefined;
		};
		
		//######################################//
		/* set opacity type */
		//######################################//
		self.getOpacityType = function(){
			var opacityType;
			if (typeof self.screen.style.opacity != "undefined") {//ie9+ 
				opacityType = "opacity";
			}else{ //ie8
				opacityType = "filter";
			}
			return opacityType;
		};
		
		//######################################//
		/* setup main screen */
		//######################################//
		self.setScreen = function(element){
			if(self.type == "img" && element){
				self.screen = element;
				self.setMainProperties();
			}else{
				self.screen = document.createElement(self.type);
				self.setMainProperties();
			}
		};
		
		//########################################//
		/* set main properties */
		//########################################//
		self.setMainProperties = function(){
			
			self.transform = self.getTransform();
			self.transformOrigin = self.getTransformOrigin();
			self.setPosition(self.position);
			self.setOverflow(self.overflow);
			self.opacityType = self.getOpacityType();
			
			if(self.opacityType == "opacity") self.isHtml5_bl = true;
			
			if(self.opacityType == "filter") self.screen.style.filter = "inherit";
			self.screen.style.left = "0px";
			self.screen.style.top = "0px";
			self.screen.style.margin = "0px";
			self.screen.style.padding = "0px";
			self.screen.style.maxWidth = "none";
			self.screen.style.maxHeight = "none";
			self.screen.style.border = "none";
			self.screen.style.lineHeight = "1";
			self.screen.style.backgroundColor = "transparent";
			//self.screen.style.backfaceVisibility = "hidden";
			//self.screen.style.webkitBackfaceVisibility = "hidden";
			//self.screen.style.MozBackfaceVisibility = "hidden";	
			
			
			if(type == "img"){
				self.setWidth(self.screen.width);
				self.setHeight(self.screen.height);
				self.setSelectable(false);
			}
		};
		
		//###################################################//
		/* set / get various peoperties.*/
		//###################################################//
		self.setSelectable = function(val){
			if(!val){
				self.screen.style.userSelect = "none";
				self.screen.style.MozUserSelect = "none";
				self.screen.style.webkitUserSelect = "none";
				self.screen.style.khtmlUserSelect = "none";
				self.screen.style.oUserSelect = "none";
				self.screen.style.msUserSelect = "none";
				self.screen.msUserSelect = "none";
				self.screen.ondragstart = function(e){return false;};
				self.screen.onselectstart = function(){return false;};
				self.screen.ontouchstart = function(e){return false;};
				self.screen.style.webkitTouchCallout='none';
				self.hasBeenSetSelectable_bl = true;
			}
		};
			
		self.setBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "visible";
			self.screen.style.webkitBackfaceVisibility = "visible";
			self.screen.style.MozBackfaceVisibility = "visible";		
		};
		
		self.removeBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "hidden";
			self.screen.style.webkitBackfaceVisibility = "hidden";
			self.screen.style.MozBackfaceVisibility = "hidden";		
		};
		
		self.getScreen = function(){
			return self.screen;
		};
		
		self.setVisible = function(val){
			self.visible = val;
			if(self.visible == true){
				self.screen.style.visibility = "visible";
			}else{
				self.screen.style.visibility = "hidden";
			}
		};
		
		self.getVisible = function(){
			return self.visible;
		};
			
		self.setResizableSizeAfterParent = function(){
			self.screen.style.width = "100%";
			self.screen.style.height = "100%";
		};
		
		self.getStyle = function(){
			return self.screen.style;
		};
		
		self.setOverflow = function(val){
			self.overflow = val;
			self.screen.style.overflow = self.overflow;
		};
		
		self.setPosition = function(val){
			self.position = val;
			self.screen.style.position = self.position;
		};
		
		self.setDisplay = function(val){
			self.display = val;
			self.screen.style.display = self.display;
		};
		
		self.setButtonMode = function(val){
			self.buttonMode = val;
			if(self.buttonMode ==  true){
				self.screen.style.cursor = "pointer";
			}else{
				self.screen.style.cursor = "default";
			}
		};
		
		self.setBkColor = function(val){
			self.screen.style.backgroundColor = val;
		};
		
		self.setInnerHTML = function(val){
			self.innerHTML = val;
			self.screen.innerHTML = self.innerHTML;
		};
		
		self.getInnerHTML = function(){
			return self.innerHTML;
		};
		
		self.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		self.setAlpha = function(val){
			self.alpha = val;
			if(self.opacityType == "opacity"){
				self.screen.style.opacity = self.alpha;
			}else if(self.opacityType == "filter"){
				self.screen.style.filter = "alpha(opacity=" + self.alpha * 100 + ")";
				self.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(self.alpha * 100) + ")";
			}
		};
		
		self.getAlpha = function(){
			return self.alpha;
		};
		
		self.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		self.getGlobalX = function(){
			return self.getRect().left;
		};
		
		self.getGlobalY = function(){
			return self.getRect().top;
		};
		
		self.setX = function(val){
			self.x = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = 'translate3d(' + self.x + 'px,' + self.y + 'px,0) scale(' + self.scale + ',' + self.scale + ')';
			}else{
				self.screen.style.left = self.x + "px";
			}
		};
		
		self.getX = function(){
			return  self.x;
		};
		
		self.setY = function(val){
			self.y = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = 'translate3d(' + self.x + 'px,' + self.y + 'px,0) scale(' + self.scale + ',' + self.scale + ')';
			}else{
				self.screen.style.top = self.y + "px";
			}
		};
		
		self.getY = function(){
			return  self.y;
		};
		
		self.setWidth = function(val){
			self.w = val;
			if(self.type == "img"){
				self.screen.width = self.w;
			}else{
				self.screen.style.width = self.w + "px";
			}
		};
		
		self.getWidth = function(){
			if(self.type == "div"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}else if(self.type == "img"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				if(self.screen.width != 0) return  self.screen.width;
				return self._w;
			}else if( self.type == "canvas"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}
		};
		
		self.setHeight = function(val){
			self.h = val;
			if(self.type == "img"){
				self.screen.height = self.h;
			}else{
				self.screen.style.height = self.h + "px";
			}
		};
		
		self.getHeight = function(){
			if(self.type == "div"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}else if(self.type == "img"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				if(self.screen.height != 0) return  self.screen.height;
				return self.h;
			}else if(self.type == "canvas"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}
		};
		
		this.setScale = function(scale){
			self.scale = scale;
			if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = 'scale(' + self.scale + ',' + self.scale + ')';
			}else{
				self.screen.style[self.transform] = 'translate3d(' + self.x + 'px,' + self.y + 'px,0) scale(' + self.scale + ',' + self.scale + ')';
			}
		};
		
		this.setTransformOrigin = function(x, y){
			self.screen.style[self.transformOrigin] = x + "%" + " " +  y + "%";	
		};
		
		self.setPositionAndScale = function(x, y, scale){
			self.x = x;
			self.y = y;
			self.scale = scale;
			self.screen.style[self.transform] = 'translate3d(' + self.x + 'px,' + self.y + 'px,0) scale(' + self.scale + ',' + self.scale + ')';
		};
		
	    //###########################################//
	    /* destroy methods*/
	    //###########################################//
		self.disposeImage = function(){
			if(self.type == "img") self.screen.src = null;
		};
		
		//#####################################//
		/* DOM list */
		//#####################################//
		self.addChild = function(e){
			if(self.contains(e)){	
				self.children_ar.splice(FWDUtils.indexOfArray(self.children_ar, e), 1);
				self.children_ar.push(e);
				self.screen.appendChild(e.screen);
			}else{
				self.children_ar.push(e);
				self.screen.appendChild(e.screen);
			}
		};
		
		
		self.destroy = function(){
			
			//try{self.screen.parentNode.removeChild(self.screen);}catch(e){};
			if(self.hasBeenSetSelectable_bl){
				self.screen.ondragstart = null;
				self.screen.onselectstart = null;
				self.screen.ontouchstart = null;
			};
			
			//destroy properties
			self.style = null;
			self.screen = null;
			self.transform = null;
			self.position = null;
			self.overflow = null;
			self.display = null;
			self.visible = null;
			self.buttonMode = null;
			self.x = null;
			self.y = null;
			self.w = null;
			self.h = null;
			self.rect = null;
			self.alpha = null;
			self.innerHTML = null;
			self.opacityType = null;
			self.isHtml5_bl = null;
			
			type = null;
			position = null;
			overflow = null;
			display = null;
		
			self.hasTransform3d_bl = null;
			self.hasTransform2d_bl = null;
			self = null;
		};
		
	    /* init */
		self.init();
	};
	
	window.FWDTransformDisplayObject = FWDTransformDisplayObject;
}(window));//FWDUtils
(function (window){
	
	var FWDUtils = function(){};
	
	FWDUtils.dumy = document.createElement("div");
	
	//###################################//
	/* String */
	//###################################//
	FWDUtils.trim = function(str){
		return str.replace(/\s/gi, "");
	};
			
	FWDUtils.trimAndFormatUrl = function(str){
		str = str.toLocaleLowerCase();
		str = str.replace(/ /g, "-");
		str = str.replace(/ä/g, "a");
		str = str.replace(/â/g, "a");
		str = str.replace(/â/g, "a");
		str = str.replace(/à/g, "a");
		str = str.replace(/è/g, "e");
		str = str.replace(/é/g, "e");
		str = str.replace(/ë/g, "e");
		str = str.replace(/ï/g, "i");
		str = str.replace(/î/g, "i");
		str = str.replace(/ù/g, "u");
		str = str.replace(/ô/g, "o");
		str = str.replace(/ù/g, "u");
		str = str.replace(/û/g, "u");
		str = str.replace(/ÿ/g, "y");
		str = str.replace(/ç/g, "c");
		str = str.replace(/œ/g, "ce");
		return str;
	};
	
	FWDUtils.splitAndTrim = function(str, trim_bl, toLowerCase_bl){
		var array = str.split(",");
		var length = array.length;
		for(var i=0; i<length; i++){
			if(trim_bl) array[i] = FWDUtils.trim(array[i]);
			if(toLowerCase_bl) array[i] = array[i].toLowerCase();
		};
		return array;
	};
	
	//#############################################//
	//Array //
	//#############################################//
	FWDUtils.indexOfArray = function(array, prop){
		var length = array.length;
		for(var i=0; i<length; i++){
			if(array[i] === prop) return i;
		};
		return -1;
	};
	
	FWDUtils.randomizeArray = function(aArray) {
		var randomizedArray = [];
		var copyArray = aArray.concat();
			
		var length = copyArray.length;
		for(var i=0; i< length; i++) {
				var index = Math.floor(Math.random() * copyArray.length);
				randomizedArray.push(copyArray[index]);
				copyArray.splice(index,1);
			}
		return randomizedArray;
	};
	

	//#############################################//
	/*DOM manipulation */
	//#############################################//
	FWDUtils.parent = function (e, n){
		if(n === undefined) n = 1;
		while(n-- && e) e = e.parentNode;
		if(!e || e.nodeType !== 1) return null;
		return e;
	};
	
	FWDUtils.sibling = function(e, n){
		while (e && n !== 0){
			if(n > 0){
				if(e.nextElementSibling){
					 e = e.nextElementSibling;	 
				}else{
					for(var e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling);
				}
				n--;
			}else{
				if(e.previousElementSibling){
					 e = e.previousElementSibling;	 
				}else{
					for(var e = e.previousSibling; e && e.nodeType !== 1; e = e.previousSibling);
				}
				n++;
			}
		}
		return e;
	};
	
	FWDUtils.getChildAt = function (e, n){
		var kids = FWDUtils.getChildren(e);
		if(n < 0) n += kids.length;
		if(n < 0) return null;
		return kids[n];
	};
	
	FWDUtils.getChildById = function(id){
		return document.getElementById(id) || undefined;
	};
	
	FWDUtils.getChildren = function(e, allNodesTypes){
		var kids = [];
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes){
				kids.push(c);
			}else if(c.nodeType === 1){
				kids.push(c);
			}
		}
		return kids;
	};
	
	FWDUtils.getChildrenFromAttribute = function(e, attr, allNodesTypes){
		var kids = [];
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes && FWDUtils.hasAttribute(c, attr)){
				kids.push(c);
			}else if(c.nodeType === 1 && FWDUtils.hasAttribute(c, attr)){
				kids.push(c);
			}
		}
		return kids.length == 0 ? undefined : kids;
	};
	
	FWDUtils.getChildFromNodeListFromAttribute = function(e, attr, allNodesTypes){
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes && FWDUtils.hasAttribute(c, attr)){
				return c;
			}else if(c.nodeType === 1 && FWDUtils.hasAttribute(c, attr)){
				return c;
			}
		}
		return undefined;
	};
	
	FWDUtils.getAttributeValue = function(e, attr){
		if(!FWDUtils.hasAttribute(e, attr)) return undefined;
		return e.getAttribute(attr);	
	};
	
	FWDUtils.hasAttribute = function(e, attr){
		if(e.hasAttribute){
			return e.hasAttribute(attr); 
		}else {
			var test = e.attributes[attr];
			return  test ? true : false;
		}
	};
	
	FWDUtils.insertNodeAt = function(parent, child, n){
		var children = FWDUtils.children(parent);
		if(n < 0 || n > children.length){
			throw new Error("invalid index!");
		}else {
			parent.insertBefore(child, children[n]);
		};
	};
	
	FWDUtils.hasCanvas = function(){
		return Boolean(document.createElement("canvas"));
	};
	
	//###################################//
	/* DOM geometry */
	//##################################//
	FWDUtils.hitTest = function(target, x, y){
		var hit = false;
		if(!target) throw Error("Hit test target is null!");
		var rect = target.getBoundingClientRect();
		
		if(x >= rect.left && x <= rect.left +(rect.right - rect.left) && y >= rect.top && y <= rect.top + (rect.bottom - rect.top)) return true;
		return false;
	};
	
	FWDUtils.getScrollOffsets = function(){
		//all browsers
		if(window.pageXOffset != null) return{x:window.pageXOffset, y:window.pageYOffset};
		
		//ie7/ie8
		if(document.compatMode == "CSS1Compat"){
			return({x:document.documentElement.scrollLeft, y:document.documentElement.scrollTop});
		}
	};
	
	FWDUtils.getViewportSize = function(){
		if(FWDUtils.isMobile) return {w:window.innerWidth, h:window.innerHeight};
		return {w:document.documentElement.clientWidth || window.innerWidth, h:document.documentElement.clientHeight || window.innerHeight};
	};
	
	FWDUtils.getViewportMouseCoordinates = function(e){
		var offsets = FWDUtils.getScrollOffsets();
		if(e.touches){
			return{
				screenX:e.touches[0] == undefined ? e.touches.pageX - offsets.x :e.touches[0].pageX - offsets.x,
				screenY:e.touches[0] == undefined ? e.touches.pageY - offsets.y :e.touches[0].pageY - offsets.y
			};
		}
		
		return{
			screenX: e.clientX == undefined ? e.pageX - offsets.x : e.clientX,
			screenY: e.clientY == undefined ? e.pageY - offsets.y : e.clientY
		};
	};
	
	
	//###################################//
	/* Browsers test */
	//##################################//
	FWDUtils.hasPointerEvent = (function(){
		return Boolean(window.navigator.msPointerEnabled);
	}());
	
	FWDUtils.isMobile = (function (){
		if(FWDUtils.hasPointerEvent && navigator.msMaxTouchPoints > 1) return true;
		var agents = ['android', 'webos', 'iphone', 'ipad', 'blackberry'];
	    for(i in agents) {
	    	 if(navigator.userAgent.toLowerCase().indexOf(agents[i].toLowerCase()) != -1) {
	            return true;
	        }
	    }
	    return false;
	}());
	
	FWDUtils.isAndroid = (function(){
		 return (navigator.userAgent.toLowerCase().indexOf("android".toLowerCase()) != -1);
	}());
	
	FWDUtils.isChrome = (function(){
		return navigator.userAgent.toLowerCase().indexOf('chrome') != -1;
	}());
	
	FWDUtils.isSafari = (function(){
		return navigator.userAgent.toLowerCase().indexOf('safari') != -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1;
	}());
	
	FWDUtils.isOpera = (function(){
		return navigator.userAgent.toLowerCase().indexOf('opera') != -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1;
	}());
	
	FWDUtils.isFirefox = (function(){
		return navigator.userAgent.toLowerCase().indexOf('firefox') != -1;
	}());
	
	FWDUtils.isIE = (function(){
		return navigator.userAgent.toLowerCase().indexOf('msie') != -1;;
	}());
	
	FWDUtils.isIEAndLessThen9 = (function(){
		return navigator.userAgent.toLowerCase().indexOf("msie 7") != -1 || navigator.userAgent.toLowerCase().indexOf("msie 8") != -1;
	}());
	
	FWDUtils.isApple = (function(){
		return navigator.appVersion.toLowerCase().indexOf('mac') != -1;;
	}());
	
	FWDUtils.hasFullScreen = (function(){
		return FWDUtils.dumy.requestFullScreen || FWDUtils.dumy.mozRequestFullScreen || FWDUtils.dumy.webkitRequestFullScreen || FWDUtils.dumy.msieRequestFullScreen;
	}());
	
	function get3d(){
	    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform', 'KhtmlTransform'];
	    var p;
	    var position;
	    while (p = properties.shift()) {
	       if (typeof FWDUtils.dumy.style[p] !== 'undefined') {
	    	   FWDUtils.dumy.style.position = "absolute";
	    	   position = FWDUtils.dumy.getBoundingClientRect().left;
	    	   FWDUtils.dumy.style[p] = 'translate3d(500px, 0px, 0px)';
	    	   position = Math.abs(FWDUtils.dumy.getBoundingClientRect().left - position);
	    	   
	           if(position > 100 && position < 900){
	        	   try{document.documentElement.removeChild(FWDUtils.dumy);}catch(e){}
	        	   return true;
	           }
	       }
	    }
	    try{document.documentElement.removeChild(FWDUtils.dumy);}catch(e){}
	    return false;
	};
	
	function get2d(){
	    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform', 'KhtmlTransform'];
	    var p;
	    while (p = properties.shift()) {
	       if (typeof FWDUtils.dumy.style[p] !== 'undefined') {
	    	   return true;
	       }
	    }
	    try{document.documentElement.removeChild(FWDUtils.dumy);}catch(e){}
	    return false;
	};
	
	//###############################################//
	/* various utils */
	//###############################################//
	FWDUtils.onReady =  function(callbalk){
		if (document.addEventListener) {
			document.addEventListener( "DOMContentLoaded", function(){
				document.documentElement.appendChild(FWDUtils.dumy);
				FWDUtils.hasTransform3d = get3d();
				FWDUtils.hasTransform2d = get2d();
				callbalk();
			});
		}else{
			document.onreadystatechange = function () {
				document.documentElement.appendChild(FWDUtils.dumy);
				FWDUtils.hasTransform3d = get3d();
				FWDUtils.hasTransform2d = get2d();
				if (document.readyState == "complete") callbalk();
			};
		 }
	};
	
	FWDUtils.disableElementSelection = function(e){
		try{e.style.userSelect = "none";}catch(e){};
		try{e.style.MozUserSelect = "none";}catch(e){};
		try{e.style.webkitUserSelect = "none";}catch(e){};
		try{e.style.khtmlUserSelect = "none";}catch(e){};
		try{e.style.oUserSelect = "none";}catch(e){};
		try{e.style.msUserSelect = "none";}catch(e){};
		try{e.msUserSelect = "none";}catch(e){};
		e.onselectstart = function(){return false;};
	};
	
	FWDUtils.getUrlArgs = function urlArgs(string){
		var args = {};
		var query = string.substr(string.indexOf("?") + 1) || location.search.substring(1);
		var pairs = query.split("&");
		for(var i=0; i< pairs.length; i++){
			var pos = pairs[i].indexOf("=");
			var name = pairs[i].substring(0,pos);
			var value = pairs[i].substring(pos + 1);
			value = decodeURIComponent(value);
			args[name] = value;
		}
		return args;
	};
	
	FWDUtils.validateEmail = function(mail){  
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){  
			return true;  
		}  
		return false;  
    }; 
    
	//################################//
	/* resize utils */
	//################################//
	FWDUtils.resizeDoWithLimit = function(
			displayObject,
			containerWidth,
			containerHeight,
			doWidth,
			doHeight,
			removeWidthOffset,
			removeHeightOffset,
			offsetX,
			offsetY,
			animate,
			pDuration,
			pDelay,
			pEase
		) {
		var containerWidth = containerWidth - removeWidthOffset;
		var containerHeight = containerHeight - removeHeightOffset;
			
		var scaleX = containerWidth/doWidth;
		var scaleY = containerHeight/doHeight;
		var totalScale = 0;
				
		if(scaleX <= scaleY){
			totalScale = scaleX;
		}else if(scaleX >= scaleY){
			totalScale = scaleY;
		}
			
		var finalWidth = Math.round((doWidth * totalScale));
		var finalHeight = Math.round((doHeight * totalScale));
		var x = Math.floor((containerWidth -  (doWidth * totalScale))/2  + offsetX);
		var y = Math.floor((containerHeight -  (doHeight * totalScale))/2 + offsetY);
			
		if(animate){
			TweenMax.to(displayObject, pDuration, {x:x, y:y, w:finalWidth, h:finalHeight, delay:pDelay, ease:pEase});
		}else{
			displayObject.x = x;
			displayObject.y = y;
			displayObject.w = finalWidth;
			displayObject.h = finalHeight;
		}
	};
	
	window.FWDUtils = FWDUtils;
}(window));