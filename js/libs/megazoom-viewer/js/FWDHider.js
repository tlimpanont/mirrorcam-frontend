/* hider */
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
}(window));