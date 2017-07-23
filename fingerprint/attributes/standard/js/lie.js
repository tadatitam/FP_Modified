function getHasLiedLanguages(){
  //We check if navigator.language is equal to the first language of navigator.languages
  if(typeof navigator.languages !== "undefined"){
    try {
      var firstLanguages = navigator.languages[0].substr(0, 2);
      if(firstLanguages !== navigator.language.substr(0, 2)){
        return true;
      }
    } catch(err) {
      return true;
    }
  }
  return false;
}
function getHasLiedResolution(){
  if(screen.width < screen.availWidth){
    return true;
  }
  if(screen.height < screen.availHeight){
    return true;
  }
  return false;
}
function getHasLiedOs(){
  var userAgent = navigator.userAgent.toLowerCase();
  var oscpu = navigator.oscpu;
  var platform = navigator.platform.toLowerCase();
  var os;
  //We extract the OS from the user agent (respect the order of the if else if statement)
  if(userAgent.indexOf("windows phone") >= 0){
    os = "Windows Phone";
  } else if(userAgent.indexOf("win") >= 0){
    os = "Windows";
  } else if(userAgent.indexOf("android") >= 0){
    os = "Android";
  } else if(userAgent.indexOf("linux") >= 0){
    os = "Linux";
  } else if(userAgent.indexOf("iphone") >= 0 || userAgent.indexOf("ipad") >= 0 ){
    os = "iOS";
  } else if(userAgent.indexOf("mac") >= 0){
    os = "Mac";
  } else{
    os = "Other";
  }
  // We detect if the person uses a mobile device
  var mobileDevice;
  if (("ontouchstart" in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0)) {
        mobileDevice = true;
  } else{
    mobileDevice = false;
  }

  if(mobileDevice && os !== "Windows Phone" && os !== "Android" && os !== "iOS" && os !== "Other"){
    return true;
  }

  // We compare oscpu with the OS extracted from the UA
  if(typeof oscpu !== "undefined"){
    oscpu = oscpu.toLowerCase();
    if(oscpu.indexOf("win") >= 0 && os !== "Windows" && os !== "Windows Phone"){
      return true;
    } else if(oscpu.indexOf("linux") >= 0 && os !== "Linux" && os !== "Android"){
      return true;
    } else if(oscpu.indexOf("mac") >= 0 && os !== "Mac" && os !== "iOS"){
      return true;
    } else if((oscpu.indexOf("win") === -1 && oscpu.indexOf("linux") === -1 && oscpu.indexOf("mac") === -1) !== (os == "Other")){
      return true;
    }
  }

  //We compare platform with the OS extracted from the UA
  if(platform.indexOf("win") >= 0 && os !== "Windows" && os !== "Windows Phone"){
    return true;
  } else if((platform.indexOf("linux") >= 0 || platform.indexOf("android") >= 0 || platform.indexOf("pike") >= 0) && os !== "Linux" && os !== "Android"){
    return true;
  } else if((platform.indexOf("mac") >= 0 || platform.indexOf("ipad") >= 0 || platform.indexOf("ipod") >= 0 || platform.indexOf("iphone") >= 0) && os !== "Mac" && os !== "iOS"){
    return true;
  } else if((platform.indexOf("win") === -1 && platform.indexOf("linux") === -1 && platform.indexOf("mac") === -1) !== (os == "Other")){
    return true;
  }

  if(typeof navigator.plugins === "undefined" && os !== "Windows" && os !== "Windows Phone"){
    //We are are in the case where the person uses ie, therefore we can infer that it's windows
    return true;
  }

  return false;
}
function getHasLiedBrowser() {
  var userAgent = navigator.userAgent.toLowerCase();
  var productSub = navigator.productSub;

  //we extract the browser from the user agent (respect the order of the tests)
  var browser;
  if(userAgent.indexOf("firefox") >= 0){
    browser = "Firefox";
  } else if(userAgent.indexOf("opera") >= 0 || userAgent.indexOf("opr") >= 0){
    browser = "Opera";
  } else if(userAgent.indexOf("chrome") >= 0){
    browser = "Chrome";
  } else if(userAgent.indexOf("safari") >= 0){
    browser = "Safari";
  } else if(userAgent.indexOf("trident") >= 0){
    browser = "Internet Explorer";
  } else{
    browser = "Other";
  }

  if((browser === "Chrome" || browser === "Safari" || browser === "Opera") && productSub !== "20030107"){
    return true;
  }

  var tempRes = eval.toString().length;
  if(tempRes === 37 && browser !== "Safari" && browser !== "Firefox" && browser !== "Other"){
    return true;
  } else if(tempRes === 39 && browser !== "Internet Explorer" && browser !== "Other"){
    return true;
  } else if(tempRes === 33 && browser !== "Chrome" && browser !== "Opera" && browser !== "Other"){
    return true;
  }

  //We create an error to see how it is handled
  var errFirefox;
  try {
    throw "a";
  } catch(err){
    try{
      err.toSource();
      errFirefox = true;
    } catch(errOfErr){
      errFirefox = false;
    }
  }
  if(errFirefox && browser !== "Firefox" && browser !== "Other"){
    return true;
  }
  return false;
}


(function() {
    api.register("has user lied with?", function () {
        var result = "";
        result += "language: " + getHasLiedLanguages() + "; ";
        result += "resolution: " + getHasLiedResolution() + "; ";
        result += "os: " + getHasLiedOs() + "; ";
        result += "browser: " + getHasLiedBrowser()
        return result;
    });
})();
