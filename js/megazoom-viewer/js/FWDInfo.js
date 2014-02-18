/* Info screen */
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
}(window));