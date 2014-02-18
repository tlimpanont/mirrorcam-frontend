var pageMenu_do;
var pageThumbs_do;

var body_el;
var mainHeader_el = null;

var data_el = null;
var menuHolder_el = null;
var mainProductHolder_el = null;
var productHolder_el = null;
var productHolderBackground_el = null;
var thumbsHolder_el = null;
var whyBuyText_el = null;
var logoImage_img = null;
var html5_img = null;
var byFWD_img = null;

var lightBoxViewer = null;
var openedWindow = null;

var mainWidth = 940;
var byFWDImageWidth = 79;
var html5ImageWidth = 95;
var logoImageWidth = 957;
var productHolderWidth = 940;
var productHolderHeight = 550;
var whatIsImageWidth = 415;
var whyBuyImageWidth = 940;
var windowW = 0;
var windowH = 0;

var resizeHandlerId_to;

function init(){
	data_el = document.getElementById("megazoomPlayList");
	body_el = document.getElementsByTagName("body")[0];
	mainHeader_el = document.getElementById("mainHeader");
	mainProductHolder_el = document.getElementById("mainProductHolder");
	productHolder_el = document.getElementById("productHolder");
	thumbsHolder_el = document.getElementById("thumbsHolder");
	whyBuyText_el = document.getElementById("whyBuyText");
	logoImage_img = document.getElementById("logoImage");
	productHolderBackground_el = document.getElementById("productHolderBackground");
	byFWD_img = document.getElementById("byFWD");
	html5_img = document.getElementById("html5");
	byFWD_img.onclick = function(){
		window.location.href = "http://www.webdesign-flash.ro";
	};
	
	setupThumbsHolder();
	positionStuff();
	setTimeout( function(){
		positionStuff();
		}, 50);
	
	if(window.addEventListener){
		window.addEventListener("resize", onResizeHandler);
	}else if(window.attachEvent){
		window.attachEvent("onresize", onResizeHandler);
	}
}

//#####################################//
/* Setup page thumbs */
//####################################//
function setupThumbsHolder(){
	FWDPageThumbs.setPrototype();
	pageThumbs_do = new FWDPageThumbs({
		parent:thumbsHolder_el,
		imagesPath:["round_silver_graphics/imageThumbs1.jpg", "round_silver_graphics/imageThumbs2.jpg", "round_silver_graphics/imageThumbs3.jpg", "round_silver_graphics/imageThumbs4.jpg"],
		imageOverPath:"round_silver_graphics/over.png",
		labels:["1", "2", "3", "4"],
		thumbShadowPath:"round_silver_graphics/thumbShadow.jpg",
		maxWidth:940,
		thumbnailBorderColor:"#FFFFFF",
		textNormalColor:"#666666",
		textSelectedColor:"#0099ff",
		wiewSampleTextColor:"#FFFFFF",
		shadowOffsetX:2,
		shadowOffsetY:2,
		shadowOffsetW:-4,
		shadowOffsetH:-4
	});
	
	pageThumbs_do.addListener(FWDPageThumb.CLICK, onThumbPressedHandler);
}


function onThumbPressedHandler(e){
	body_el.appendChild(data_el);
	pageThumbs_do.disableOrEnableThumbs(e.id);
	
	if(e.id == 0){
		setupZoomer("round_silver_graphics/imageToZoom.jpg", "megazoomPlayList", "round_silver_graphics/navigatorImage.jpg", 4324, 2530);
	}else if(e.id == 1){
		setupZoomer("round_silver_graphics/imageToZoom-green.jpg", "megazoomPlayList", "round_silver_graphics/navigatorImage-green.jpg", 4324, 2530);
	}else if(e.id == 2){
		setupZoomer("round_silver_graphics/imageToZoom-red.jpg", "megazoomPlayList", "round_silver_graphics/navigatorImage-red.jpg", 4324, 2530);
	}else if(e.id == 3){
		setupZoomer("round_silver_graphics/imageToZoom-blue.jpg", "megazoomPlayList", "round_silver_graphics/navigatorImage-blue.jpg", 4324, 2530);
	}
}


//#####################################//
/* resize handler */
//#####################################//
function onResizeHandler(){
	positionStuff();
}

//#####################################//
/* position stuff */
//#####################################//
function positionStuff(){

	windowW = mainHeader_el.offsetWidth;

	positionLogoImage();
	positionProductHolder();
	positionThumbsHolderAndText();
	pageThumbs_do.positionAndResize(windowW);
}

//#####################################//
/* position logo image */
//#####################################//
function positionLogoImage(){
	var html5X = 16;
	var byFWDX = (windowW - byFWDImageWidth);
	var logoImageX = parseInt((windowW - logoImageWidth)/2) - 3;
	
	if(byFWDX > mainWidth - byFWDImageWidth - 10){
		byFWDX =  parseInt(logoImageX  + logoImageWidth - byFWDImageWidth - 10);
	}
	
	if(windowW < mainWidth){
		html5X = 2;
	}else{
		html5X = logoImageX + 14;
	}
	
	if(windowW < 480){
		byFWD_img.style.top = "-50px";
		html5_img.style.top = "-50px";
	}else{
		byFWD_img.style.top = "46px";
		html5_img.style.top = "46px";
	}
	
	html5_img.style.left =  html5X + "px";
	
	logoImage_img.style.left = logoImageX  + "px";
	byFWD_img.style.left = byFWDX + "px";
};

//#####################################//
/* position product holder */
//#####################################//
function positionProductHolder(){
	
	var finalW = Math.min(windowW, mainWidth);
	var finalH = productHolderHeight;
	var finalX = parseInt((windowW - finalW)/2);
	
	if(FWDUtils.isMobile ){
		finalH = (finalW/productHolderWidth) * productHolderHeight;
	}
	
	productHolderBackground_el.style.width = (finalW + 16)  + "px";
	productHolderBackground_el.style.height = (finalH + 21)  + "px";
	productHolderBackground_el.style.top =  "-1px";
	productHolderBackground_el.style.left = parseInt((windowW - (finalW + 16))/2)  + "px";
	
	productHolder_el.style.left = finalX  + "px";
	productHolder_el.style.top = "9px";
	productHolder_el.style.width = finalW  + "px";
	productHolder_el.style.height = finalH  + "px";
}

//#####################################//
/* position product holder */
//#####################################//
function positionThumbsHolderAndText(){
	
	var finalW = Math.min(windowW, mainWidth);
	var finalX = parseInt((windowW - finalW)/2);
	var textFinalW = finalW;
	var textFinalX = finalX;
	
	if(textFinalW < mainWidth){
		textFinalW -= 20;
		textFinalX -= 10;
	}

	thumbsHolder_el.style.left = finalX  + "px";
	thumbsHolder_el.style.width = finalW  + "px";
	whyBuyText_el.style.left = textFinalX  + "px";
	whyBuyText_el.style.width = textFinalW  + "px";
}