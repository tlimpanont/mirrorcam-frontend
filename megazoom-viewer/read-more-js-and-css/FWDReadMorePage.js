var whatIsImage_img = null;
var whatIsMain_el = null;
var whatIsBar_el = null;
var whatIsLeftColumn_el = null;
var whatIsRightColumn_el = null;

var mainFeaturesImg_img = null;
var mainFeaturesMain_el = null;
var mainFeaturesBar_el = null;
var mainFeaturesLeftColumn_el = null;
var mainFeaturesRightColumn_el = null;

var specialNotesBar_img = null;
var specialNotesMain_el = null;
var specialNotesBar_el = null;
var specialNotesLeftColumn_el = null;
var specialNotesRightColumn_el = null;

var body_el;
var logoImage_img = null;
var whatIsImage_img = null;
var whyBuyImage_img = null;
var html5_img = null;
var byFWD_img = null;

var mainWidth = 940;
var byFWDImageWidth = 79;
var html5ImageWidth = 95;
var logoImageWidth = 957;
var windowW = 0;
var windowH = 0;

var resizeHandlerId_to;

function init(){
	
	body_el = document.getElementsByTagName("body")[0];
	mainHeader_el = document.getElementById("mainHeader");
	logoImage_img = document.getElementById("logoImage");
	byFWD_img = document.getElementById("byFWD");
	byFWD_img.style.cursor = "pointer";
	byFWD_img.onclick = function(){
		window.location.href = "http://www.webdesign-flash.ro";
	};
	html5_img = document.getElementById("html5");
	
	whatIsImage_img = document.getElementById("whatIsBarImg");
	whatIsMain_el = document.getElementById("whatIsMain");
	whatIsBar_el = document.getElementById("whatIsBar");
	whatIsLeftColumn_el = document.getElementById("whatIsLeftColumn");
	whatIsRightColumn_el = document.getElementById("whatIsRightColumn");
	
	mainFeaturesImg_img = document.getElementById("mainFeaturesImg");
	mainFeaturesMain_el = document.getElementById("mainFeaturesMain");
	mainFeaturesBar_el = document.getElementById("mainFeaturesBar");
	mainFeaturesLeftColumn_el = document.getElementById("mainFeaturesLeftColumn");
	mainFeaturesRightColumn_el = document.getElementById("mainFeaturesRightColumn");
	
	specialNotesBar_img = document.getElementById("specialNotesBarImg");
	console.log(specialNotesBar_img);
	specialNotesMain_el = document.getElementById("specialNotesMain");
	specialNotesBar_el = document.getElementById("specialNotesBar");
	specialNotesLeftColumn_el = document.getElementById("specialNotesLeftColumn");
	specialNotesRightColumn_el = document.getElementById("specialNotesRightColumn");
	
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
/* resize handler */
//#####################################//
function onResizeHandler(){
	if(FWDUtils.isMobile){
		clearTimeout(resizeHandlerId_to); 
		resizeHandlerId_to = setTimeout(positionStuff, 90);
	}else{
		positionStuff();
		clearTimeout(resizeHandlerId_to); 
		resizeHandlerId_to = setTimeout(positionStuff, 90);
	}
}

//#####################################//
/* position stuff */
//#####################################//
function positionStuff(){
	var viewportSize = FWDUtils.getViewportSize();
	
	if(windowW == viewportSize.w && windowH == viewportSize.h) return
		
	windowW = viewportSize.w;
	windowH = viewportSize.h;
	positionLogoImage();
	resizeText();
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
/* position and resize text holder */
//#####################################//
function resizeText(){
	var finalW = Math.min(windowW, mainWidth);
	var textFinalW = finalW;
	
	//if(textFinalW < mainWidth) textFinalW -= 20;
	if(textFinalW < 400){
		whatIsLeftColumn_el.style.display = "none";	
		mainFeaturesLeftColumn_el.style.display = "none";
		specialNotesLeftColumn_el.style.display = "none";
		whatIsRightColumn_el.style.paddingLeft = "0px";
	}else{
		whatIsLeftColumn_el.style.display = "table-cell";	
		whatIsLeftColumn_el.style.textAlign = "center";	
		mainFeaturesLeftColumn_el.style.display = "table-cell";	
		mainFeaturesLeftColumn_el.style.textAlign = "center";	
		specialNotesLeftColumn_el.style.display = "table-cell";	
		specialNotesLeftColumn_el.style.textAlign = "center";
	}
	
	whatIsImage_img.style.left = parseInt((windowW - mainWidth)/2) + "px";
	mainFeaturesImg_img.style.left = parseInt((windowW - mainWidth)/2) + "px";
	specialNotesBar_img.style.left = parseInt((windowW - mainWidth)/2) + "px";
	
	whatIsMain_el.style.width = textFinalW  + "px";
	mainFeaturesMain_el.style.width = textFinalW  + "px";
	specialNotesMain_el.style.width = textFinalW  + "px";
}