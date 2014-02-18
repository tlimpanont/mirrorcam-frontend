var pageMenu_do;
var pageThumbs_do;
var readMoreButton_do = null;

var body_el;
var mainHeader_el = null;
var label1_el = null;
var menuHolder_el = null;
var mainProductHolder_el = null;
var productHolder_el = null;
var productHolderBackground_el = null;
var thumbsHolder_el = null;
var mainWhyBuyText_el = null;
var whyBuyText_el = null;
var dataList_el = null;
var logoImage_img = null;
var whatIsImage_img = null;
var whyBuyImage_img = null;
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
	
	body_el = document.getElementsByTagName("body")[0];
	dataList_el = document.getElementById("megazoomPlayList");
	mainHeader_el = document.getElementById("mainHeader");
	menuHolder_el = document.getElementById("menuHolder");
	label1_el = document.getElementById("label1");
	mainProductHolder_el = document.getElementById("mainProductHolder");
	productHolder_el = document.getElementById("productHolder");
	thumbsHolder_el = document.getElementById("thumbsHolder");
	whyBuyText_el = document.getElementById("whyBuyText");
	mainWhyBuyText_el = document.getElementById("mainWhyBuyText");
	logoImage_img = document.getElementById("logoImage");
	whatIsImage_img = document.getElementById("whatIsImage");
	whyBuyImage_img = document.getElementById("whyBuyImage");
	productHolderBackground_el = document.getElementById("productHolderBackground");
	byFWD_img = document.getElementById("byFWD");
	byFWD_img.style.cursor = "pointer";
	byFWD_img.onclick = function(){
		window.location.href = "http://www.webdesign-flash.ro";
	};
	html5_img = document.getElementById("html5");
	
	setupMenu();
	setupThumbsHolder();
	setupReadMoreButton();
	positionStuff();
	setTimeout( function(){
		positionStuff();
		}, 50);
	
	if(window.addEventListener){
		window.addEventListener("resize", onResizeHandler);
	}else if(window.attachEvent){
		window.attachEvent("onresize", onResizeHandler);
	}

	
	setupViwer();
}

//#####################################//
/* Setup menu */
//####################################//
function setupMenu(){
	FWDPageMenu.setPrototype();
	pageMenu_do = new FWDPageMenu({
		disabledButton:2,
		parent:menuHolder_el,
		menuLabels:["Round Silver", "Embossed Grey", "Minimal Dark", "Cutout Round Silver", "Straight Black Glossy"],
		shadowPath:"minimal_dark_graphics/menuShadow.jpg",
		maxWidth:950,
		buttonNormalColor:"#FFFFFF",
		buttonSelectedColor:"#0099ff",
		buttonsHolderBackgroundColor:"#393939",
		spacerColor:"#474747"
	});
	pageMenu_do.addListener(FWDPageMenuButton.CLICK,buttonClickHandler);
}

function buttonClickHandler(e){
	if(e.id == 0){
		window.location.href = "index.html";
	}else if(e.id == 1){
		window.location.href = "index-embosed-grey.html";
	}else if(e.id == 2){
		window.location.href = "index-minimal-dark.html";
	}else if(e.id == 3){
		window.location.href = "index-cutout-round-silver.html";
	}else if(e.id == 4){
		window.location.href = "index-straight-black-glossy.html";
	}
};

//#####################################//
/* Setup page thumbs */
//####################################//
function setupThumbsHolder(){
	FWDPageThumbs.setPrototype();
	pageThumbs_do = new FWDPageThumbs({
		parent:thumbsHolder_el,
		imagesPath:["minimal_dark_graphics/image1.jpg", "minimal_dark_graphics/image2.jpg", "minimal_dark_graphics/image3.jpg", "minimal_dark_graphics/image4.jpg"],
		imageOverPath:"minimal_dark_graphics/over.png",
		labels:["Fixed / Responsive", "Fullscreen", "Dynamic", "Lightbox"],
		thumbShadowPath:"minimal_dark_graphics/thumbShadow.jpg",
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

	if(openedWindow){
		try{
			openedWindow.close();
		}catch(e){}
		openedWindow = null;
	}
	if(e.id == 1){
		openedWindow = window.open("minimal-dark-fullscreen.html");
	}else if(e.id == 2){
		openedWindow = window.open("minimal-dark-thumbs.html");
	}else if(e.id == 3){
		setupLightBox();
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
	windowW = menuHolder_el.offsetWidth;
	
	label1_el.style.marginTop = "8px";
	label1_el.style.marginBottom = "-8px";
	mainProductHolder_el.style.marginTop = "21px";
	
	positionLogoImage();
	positionProductHolder();
	pageMenu_do.positionAndResize(windowW);
	pageThumbs_do.positionAndResize(windowW);
	positionThumbsHolderAndText();
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
	productHolderBackground_el.style.height = (finalH + 23)  + "px";
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
	whyBuyImage_img.style.left = parseInt(parseInt((windowW - whyBuyImageWidth)/2)) + "px";
	whyBuyText_el.style.left = textFinalX  + "px";
	whyBuyText_el.style.width = textFinalW  + "px";
	readMoreButton_do.setX(parseInt(parseInt((windowW - readMoreButton_do.w)/2)));
}

//##############################################//
/* Setup read more button */
//##############################################//
function setupReadMoreButton(){
	FWDPageSimpleButton.setPrototype();
	readMoreButton_do = new FWDPageSimpleButton(
			"minimal_dark_graphics/readMoreS.jpg",
			"minimal_dark_graphics/readMoreN.jpg",
			118, 25);
	
	readMoreButton_do.getStyle().margin = "auto";
	readMoreButton_do.getStyle().marginTop = "-5px";
	readMoreButton_do.getStyle().paddingBottom = "20px";
	
	mainWhyBuyText_el.appendChild(readMoreButton_do.screen);
	readMoreButton_do.addListener(FWDPageSimpleButton.CLICK, onReadMoreClick);
}

function onReadMoreClick(){
	window.open('round-silver-more.html','_blank','menubar=no, location=no, status=no, titlebar=no, toolbar=no, scrollbars=yes');
}

//########################################//
/* Setup lightbox */
//#######################################//
function setupLightBox(){
	body_el.appendChild(dataList_el);
	megazoom.hibernate_bl = true;
	FWDMegazoom.setPrototype();
	lightBoxViewer = new FWDMegazoom({
		//----main----//
		parentId:"productHolder",
		playListAndSkinId:"megazoomPlayList",
		displayType:"lightbox",
		skinPath:"skin_minimal_dark/skin/",
		imagePath:"skin_minimal_dark/imageToZoom.jpg",
		preloaderText:"Loading image...",
		useEntireScreen:"yes",
		addKeyboardSupport:"yes",
		addDoubleClickSupport:"yes",
		imageWidth:3600,
		imageHeight:2809,
		zoomFactor:1.6,
		doubleClickZoomFactor:1,
		startZoomFactor:"default",
		panSpeed:8,
		zoomSpeed:.1,
		backgroundColor:"#FFFFFF",
		preloaderFontColor:"#585858",
		preloaderBackgroundColor:"#FFFFFF",
		//----lightbox-----//
		lightBoxWidth:800,
		lightBoxHeight:550,
		lightBoxBackgroundOpacity:.8,
		lightBoxBackgroundColor:"#000000",
		//----controller----//
		buttons:"moveLeft, moveRight, moveDown, moveUp, scrollbar, hideOrShowMarkers, hideOrShowController, info, fullscreen",
		buttonsToolTips:"Move left, Move right, Move down, Move up, Zoom level: , Hide markers/Show markers, Hide controller/Show controller, Info, Full screen/Normal screen",
		controllerPosition:"bottom",
		inversePanDirection:"yes",
		startSpaceBetweenButtons:10,
		spaceBetweenButtons:10,
		startSpaceForScrollBarButtons:20,
		startSpaceForScrollBar:6,
		hideControllerDelay:3,
		controllerMaxWidth:796,
		controllerBackgroundOpacity:1,
		controllerOffsetY:2,
		scrollBarOffsetX:0,
		scrollBarHandlerToolTipOffsetY:4,
		zoomInAndOutToolTipOffsetY:4,
		buttonsToolTipOffsetY:4,
		hideControllerOffsetY:14,
		buttonToolTipFontColor:"#a4a1a1",
		//----navigator----//
		showNavigator:"yes",
		navigatorImagePath:"skin_minimal_dark/navigatorImage.jpg",
		navigatorPosition:"topright",
		navigatorOffsetX:6,
		navigatorOffsetY:6,
		navigatorHandlerColor:"#FF0000",
		navigatorBorderColor:"#AAAAAA",
		//----info window----//
		infoWindowBackgroundOpacity:.6,
		infoWindowBackgroundColor:"#FFFFFF",
		infoWindowScrollBarColor:"#a4a1a1",
		//----markers-----//
		showMarkersInfo:"no",
		markerToolTipOffsetY:2,
		//----context menu----//
		showScriptDeveloper:"no",
		contextMenuLabels:"Move left, Move right, Move down, Move up, Zoom in/Zoom out, Hide markers/Show markers, Hide controller/Show controller, Info, Full screen/Normal screen",
		contextMenuBackgroundColor:"#393939",
		contextMenuBorderColor:"#6c6c6c",
		contextMenuSpacerColor:"#6c6c6c",
		contextMenuItemNormalColor:"#a4a1a1",
		contextMenuItemSelectedColor:"#FFFFFF",
		contextMenuItemDisabledColor:"#545252"
	});
	
	lightBoxViewer.addListener(FWDMegazoom.CLOSE_LIGHTBOX, lightboxCloseHandler);
}

function lightboxCloseHandler(){
	megazoom.hibernate_bl = false;
	megazoom.resizeHandler();
	FWDMegazoom.prototype.destroy();
	lightBoxViewer = null;
	FWDMegazoom.prototype = null;
}