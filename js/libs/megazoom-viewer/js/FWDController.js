/* FWDController */
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
	
}());