/* FWDPageThumbs */
(function (window){
var FWDPageThumbs = function(props_obj){
		
		var self = this;
		var prototype = FWDPageThumbs.prototype;
		
		this.parent = props_obj.parent;
		this.image_img;
		
		this.labels_ar = props_obj.labels;
		this.imagesPath_ar = props_obj.imagesPath;
		this.imageOverPath_str = props_obj.imageOverPath;
		this.thumbs_ar = [];
		
		this.thumbShadowPath_str = props_obj.thumbShadowPath;
		this.thumbnailBorderColor_str =  props_obj.thumbnailBorderColor;"#FFFFFF";
		this.textNormalColor_str =  props_obj.textNormalColor; "#666666";
		this.textSelectedColor_str =  props_obj.textSelectedColor; "#0099ff";
		this.wiewSampleTextColor_str =  props_obj.wiewSampleTextColor; "#FFFFFF";
			
		this.maxWidth = props_obj.maxWidth;
		this.stageWidth = 0;
		this.stageHeight = 0;
		this.totalHeight = 0;
		this.thumbnailMaxWidth = 273;
		this.thumbnailMaxHeight = 178;
		this.spacerH = 20;
		this.spacerV = 20;
		this.iconOffsetHeight = 40;
		this.totalThumbs = this.labels_ar.length;
		this.thumbnailBorderSize = 4;
		this.countLoadedThumbs = 0;
		this.totalRows;
		this.remainSpace;
		this.thumbW;
		this.thumbH;
		this.stageWidth;
		this.howManyThumbsToDisplayH;
		this.howManyThumbsToDisplayV;
		this.toAddToX;
		this.shadowOffsetX = props_obj.shadowOffsetX;
		this.shadowOffsetY = props_obj.shadowOffsetY;
		this.shadowOffsetW = props_obj.shadowOffsetW;
		this.shadowOffsetH = props_obj.shadowOffsetH;
		
		this.loadWithDelayId_to;
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			
			self.setOverflow("visible");
			self.setupThumbs();
			self.thumbs_ar[0].disable();
			self.parent.appendChild(self.screen);
			
			setTimeout(function(){
				
				self.positionAndResize();
				}
			, 100);
			
			setTimeout(function(){
				self.loadImages();
				}
			, 2000);
		};
		
		//###########################################//
		/* resize and position */
		//##########################################//
		this.positionAndResize = function(viewportWidth){	
			if(!viewportWidth) return;
			self.viewportWidth = viewportWidth;
		
			self.stageWidth = self.viewportWidth > self.maxWidth ? self.maxWidth : self.viewportWidth;
		
			self.setSizeAndPositionData();
			self.positionAndResizeThumbs();
		};
		
		//#############################################//
		/* setup thumbnails */
		//#############################################//
		this.setupThumbs = function(){
			var thumb;
			for(var i=0; i<self.totalThumbs; i++){
				FWDPageThumb.setPrototype();
				thumb = new FWDPageThumb(
						i, 
						self.thumbShadowPath_str,
						self.imageOverPath_str,
						self.labels_ar[i],
						"VIEW SAMPLE",
						self.iconOffsetHeight,
						self.thumbnailBorderSize, 
						self.thumbnailBorderColor_str,
						self.textNormalColor_str,
						self.textSelectedColor_str,
						self.wiewSampleTextColor_str,
						self.shadowOffsetX,
						self.shadowOffsetY,
						self.shadowOffsetW,
						self.shadowOffsetH
						);
				thumb.addListener(FWDPageThumb.CLICK, self.onThumbClick);
				self.thumbs_ar[i] = thumb;
				self.addChild(thumb);
			}
		};
		
		this.showOverlayHandler = function(e){
			var thumb = e.target;
			if(self.overlay_do) self.overlay_do.show(e.target, self.playListData_ar[e.target.id].thumbText);
		};
		
		this.onThumbClick = function(e){
			self.dispatchEvent(FWDPageThumb.CLICK, {id:e.target.id});
		};
		
		//#############################################//
		/* Enable or disable thumbs */
		//#############################################//
		this.disableOrEnableThumbs = function(id){
			for(var i=0; i<self.totalThumbs; i++){
				thumb = self.thumbs_ar[i];
				if(i == id){
					thumb.disable();
				}else{
					thumb.enable();
				}
			}
		};
		
		//#############################################//
		/* load images */
		//#############################################//
		this.loadImages = function(){
			if(self.countLoadedThumbs > self.totalThumbs-1) return;
			
			if(self.image_img){
				self.image_img.onload = null;
				self.image_img.onerror = null;
			}
			
			self.image_img = new Image();
			self.image_img.onload = self.onImageLoadComplete;
			self.image_img.src = self.imagesPath_ar[self.countLoadedThumbs];
		};
		
		this.onImageLoadComplete = function(e){
			var thumb = self.thumbs_ar[self.countLoadedThumbs];
			thumb.setImage(self.image_img);
			self.countLoadedThumbs++;
			self.loadWithDelayId_to = setTimeout(self.loadImages, 40);	
		};
		
		//#############################################//
		/* set data for resize */
		//#############################################//
		this.setSizeAndPositionData = function(){
	
			var maxColumns;
			var totalWidth;
		
			maxColumns = Math.ceil((self.stageWidth - self.spacerH)/(self.thumbnailMaxWidth + self.spacerH));
			self.thumbW = Math.floor(((self.stageWidth - self.spacerH * (maxColumns - 1))/maxColumns));
			
			totalWidth = (maxColumns * (self.thumbW + self.spacerH)) - self.spacerH;
			self.toAddToX = Math.floor((self.stageWidth - totalWidth)/2);
				
			self.remainSpace = (self.stageWidth - totalWidth);
		
			self.thumbH = Math.floor((self.thumbW/self.thumbnailMaxWidth) * self.thumbnailMaxHeight) + self.iconOffsetHeight;
				
			self.howManyThumbsToDisplayH = maxColumns;
			
			self.totalRows = Math.ceil((self.totalThumbs/self.howManyThumbsToDisplayH));
			self.totalHeight = self.totalRows * (self.thumbH + self.spacerV) - self.spacerV + self.toAddToX;
			self.parent.style.height = self.totalHeight + "px";
		};
		
		//#############################################//
		/* resize thumbnails and containers */
		//#############################################//
		this.positionAndResizeThumbs = function(animate){
			
			var thumb;
			var newX;
			var newY;
			var count = 0;
			
			for(var i=0; i<self.totalThumbs; i++){
				
				thumb = self.thumbs_ar[i];
				
				newX = Math.floor((i % self.howManyThumbsToDisplayH) * (self.thumbW + self.spacerH));
				newY = Math.floor(i / self.howManyThumbsToDisplayH) * (self.thumbH + self.spacerV);
				
				thumb.finalX = newX;
				thumb.finalY = newY;
				
				if(i % self.howManyThumbsToDisplayH == self.howManyThumbsToDisplayH - 1){
					thumb.finalW = self.thumbW + self.remainSpace;
				}else{
					thumb.finalW = self.thumbW;
				}
				
				thumb.finalH = self.thumbH;
				
				if(animate == true  && !this.isMobile_bl){
					thumb.resizeThumb(true);
				}else{
					thumb.resizeThumb(false);
				}
			}
		};
		
	
		self.init();
	};
	
	/* set prototype */
	FWDPageThumbs.setPrototype = function(){
		FWDPageThumbs.prototype = new FWDDisplayObject("div");
	};
	
	FWDPageThumbs.CLICK = "onClick";

	FWDPageThumbs.prototype = null;
	window.FWDPageThumbs = FWDPageThumbs;
}(window));