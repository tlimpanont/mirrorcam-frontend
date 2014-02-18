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
		imagesPath:["straight_black_glossy_graphics/imageThumbs1.jpg", "straight_black_glossy_graphics/imageThumbs2.jpg", "straight_black_glossy_graphics/imageThumbs3.jpg", "straight_black_glossy_graphics/imageThumbs4.jpg"],
		imageOverPath:"straight_black_glossy_graphics/over.png",
		labels:["1", "2", "3", "4"],
		thumbShadowPath:"straight_black_glossy_graphics/thumbShadow.jpg",
		maxWidth:940,
		thumbnailBorderColor:"#000000",
		textNormalColor:"#6e6f6f",
		textSelectedColor:"#0099ff",
		wiewSampleTextColor:"#FFFFFF",
		shadowOffsetX:1,
		shadowOffsetY:1,
		shadowOffsetW:-3,
		shadowOffsetH:0
	});
	
	pageThumbs_do.addListener(FWDPageThumb.CLICK, onThumbPressedHandler);
}


function onThumbPressedHandler(e){
	body_el.appendChild(data_el);
	pageThumbs_do.disableOrEnableThumbs(e.id);
	
	if(e.id == 0){
		setupZoomer("straight_black_glossy_graphics/imageToZoom.jpg", "megazoomPlayList", "straight_black_glossy_graphics/navigatorImage.jpg", 3000, 3857);
	}else if(e.id == 1){
		setupZoomer("straight_black_glossy_graphics/imageToZoom2.jpg", "megazoomPlayList", "straight_black_glossy_graphics/navigatorImage2.jpg", 3000, 3857);
	}else if(e.id == 2){
		setupZoomer("straight_black_glossy_graphics/imageToZoom3.jpg", "megazoomPlayList", "straight_black_glossy_graphics/navigatorImage3.jpg", 3000, 3857);
	}else if(e.id == 3){
		setupZoomer("straight_black_glossy_graphics/imageToZoom4.jpg", "megazoomPlayList", "straight_black_glossy_graphics/navigatorImage4.jpg", 3000, 3857);
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