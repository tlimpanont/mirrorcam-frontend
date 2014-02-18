/* Context menu */
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
