/* FWDPageMenu */
(function (window){
var FWDPageMenu = function(props_obj){
		
		var self = this;
		var prototype = FWDPageMenu.prototype;
		
		this.parent = props_obj.parent;
		
		this.menuLabels_ar = props_obj.menuLabels;
		this.menuButtons_ar = [];
		this.spacers_ar = [];
		
		this.shadow_sdo = null;
		this.buttonsHolder_do = null;
		
		this.shadowPath_str = props_obj.shadowPath;
		
		this.buttonNormalColor_str = props_obj.buttonNormalColor; 
		this.buttonSelectedColor_str = props_obj.buttonSelectedColor;
		this.buttonsHolderBackgroundColor_str = props_obj.buttonsHolderBackgroundColor;
		this.spacerColor_str = props_obj.spacerColor;
		
		this.stageWidth = 0;
		this.stageHeight = 0;
		this.disabledButton = props_obj.disabledButton;
		this.buttonsHolderWidth = 200;
		this.buttonsBarOriginalHeight = 30;
		this.totalHeight = 0;
		this.buttonsBarTotalHeight = 100;
		this.totalButtons = self.menuLabels_ar.length;
		this.leftOrRightImageOriginalWidth = 51;
		this.leftOrRightImageOriginalHeight = 60;
		this.totalHeight = 200;
		this.maxWidth = props_obj.maxWidth;
		this.spacerWidth = 2;
		this.spacerHeight = 11;
		this.hSpace = 60;
		this.vSpace = 6;
		this.minMarginXSpace = 12;
		this.startY = 8;
		
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.parent.style.height = "0px";
			self.setupButtons();
			self.setupSpacers();
			self.setupDos();
			setTimeout(function(){
				self.setOverflow("visible");
				self.positonButtons();
				}
			, 51);
			self.parent.appendChild(self.screen);
		};
		
		//#########################################//
		/* setup do's */
		//#########################################//
		this.setupDos = function(){
			var leftImage_img;
			var rightImage_img;
			var shadowImage_img;
			
			self.shadow_sdo =  new FWDSimpleDisplayObject("img");
			shadowImage_img = new Image();
			shadowImage_img.src = self.shadowPath_str;
			self.shadow_sdo.setScreen(shadowImage_img);
			self.shadow_sdo.setHeight(9);
			self.addChild(self.shadow_sdo);
		};
		
		//###########################################//
		/* resize and position */
		//##########################################//
		this.positionAndResize = function(w){
			
			self.viewportWidth = w;
			
			self.stageWidth = self.viewportWidth > self.maxWidth ? self.maxWidth : self.viewportWidth;
			self.positonButtons();
		};
		
		//##########################################//
		/* setup buttons */
		//##########################################//
		this.setupButtons = function(){
			
			var button;
			
			var disableButton_bl = false;
			
			self.buttonsHolder_do = new FWDDisplayObject("div");
			self.buttonsHolder_do.setBkColor(self.buttonsHolderBackgroundColor_str);
			self.buttonsHolder_do.setWidth(self.buttonsHolderWidth);
			self.buttonsHolder_do.setHeight(self.buttonsBarOriginalHeight);
			self.addChild(self.buttonsHolder_do);
			
			for(var i=0; i<self.totalButtons; i++){
				if(i == self.disabledButton){
					disableButton_bl = true;
				}else{
					disableButton_bl = false;
				}
				
				FWDPageMenuButton.setPrototype();
				button = new FWDPageMenuButton(self.menuLabels_ar[i], self.buttonNormalColor_str, self.buttonSelectedColor_str, disableButton_bl);
				button.id = i;
				button.addListener(FWDPageMenuButton.CLICK, self.buttonClickHandler);
				self.menuButtons_ar[i] = button;
				self.buttonsHolder_do.addChild(button);
			}
		};
		
		this.buttonClickHandler = function(e){
			self.dispatchEvent(FWDPageMenuButton.CLICK, {id:e.target.id});
		};
		
		
		//###################################################//
		/*setup spacers */
		//###################################################//
		this.setupSpacers = function(){
			var spacer;
			for(var i=0; i<self.totalButtons; i++){
				spacer = new FWDSimpleDisplayObject("div");
				self.spacers_ar[i] = spacer;
				spacer.setWidth(self.spacerWidth);
				spacer.setHeight(self.spacerHeight);
				spacer.setBkColor(self.spacerColor_str);
				self.buttonsHolder_do.addChild(spacer);
			}
		};
		
		//###################################################//
		/* position buttons */
		//###################################################//
		this.positonButtons = function(){
			var button;
			var prevButton;
			var rowsAr = [];
			var rowsWidthAr = [];
			var tempX;
			var tempY = self.startY;
			var maxY = 0;
			var totalRowWidth = 0;
			var rowsNr = 0;
			var spacerCount = 0;
			
			if(self.stageWidth > self.maxWidth - 8){ 
				self.buttonsHolderWidth = self.stageWidth - 8;
			}else{
				self.buttonsHolderWidth = self.stageWidth;
			}
			
			rowsAr[rowsNr] = [0];
			rowsWidthAr[rowsNr] = self.menuButtons_ar[0].totalWidth;
			
			for (var i=1; i<self.totalButtons; i++){	
				button = self.menuButtons_ar[i];
				
				if (rowsWidthAr[rowsNr] + button.totalWidth + self.hSpace > self.buttonsHolderWidth - self.minMarginXSpace){	
					rowsNr++;
					rowsAr[rowsNr] = [];
					rowsAr[rowsNr].push(i);
					rowsWidthAr[rowsNr] = button.totalWidth;
				}else{
					rowsWidthAr[rowsNr] += button.totalWidth + self.hSpace;
					rowsAr[rowsNr].push(i);
				}
			}
			
			for (var i=0; i<rowsNr + 1; i++){
				var rowMarginXSpace = parseInt((self.buttonsHolderWidth - rowsWidthAr[i])/2);
				
				if (i > 0) tempY += button.totalHeight + self.vSpace;
					
				for (var j=0; j<rowsAr[i].length; j++){
					button = self.menuButtons_ar[rowsAr[i][j]];
					
					spacer = self.spacers_ar[spacerCount];
					spacerCount ++;
					
					if (j == 0){
						tempX = rowMarginXSpace;
					}else{
						prevButton = self.menuButtons_ar[rowsAr[i][j] - 1];
						tempX = prevButton.finalX + prevButton.totalWidth + self.hSpace;
					}
					
					if(spacer){
						if(j == rowsAr[i].length - 1){
							spacer.setX(-20);
						}else{
							spacer.setX(parseInt(tempX + button.totalWidth + self.hSpace/2));
							spacer.setY(tempY + 5);
						}
						
					}
					
					button.finalX = tempX;
					button.finalY = tempY - 1;
						
					if (maxY < button.finalY) maxY = button.finalY;
					
					self.buttonsBarTotalHeight = maxY + button.totalHeight + self.startY - 2;
					button.setX(button.finalX);
					button.setY(button.finalY);
				}
			}
		
			self.buttonsHolder_do.setWidth(self.buttonsHolderWidth);
			self.buttonsHolder_do.setHeight(self.buttonsBarTotalHeight);
			self.buttonsHolder_do.setX(parseInt((self.stageWidth - self.buttonsHolderWidth)/2));
		
			self.shadow_sdo.setY(self.buttonsBarTotalHeight);
			
			self.shadow_sdo.setWidth(self.buttonsHolderWidth);
			
			self.setX(parseInt((self.viewportWidth - self.stageWidth)/2));
			self.parent.style.height = (self.buttonsBarTotalHeight + 10) + "px";
		};
	
	
		//##############################//
		/* destroy */
		//##############################//
		self.destroy = function(){
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDPageMenu.prototype = null;
		};
	
		self.init();
	};
	
	/* set prototype */
	FWDPageMenu.setPrototype = function(){
		FWDPageMenu.prototype = new FWDDisplayObject("div");
	};
	
	FWDPageMenu.CLICK = "onClick";

	FWDPageMenu.prototype = null;
	window.FWDPageMenu = FWDPageMenu;
}(window));