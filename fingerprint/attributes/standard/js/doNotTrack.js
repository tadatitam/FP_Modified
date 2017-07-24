function getDNT() {
    var doNotTrack = "";
    if (window.navigator.doNotTrack != null && window.navigator.doNotTrack != "unspecified") {
        if (window.navigator.doNotTrack == "1" || window.navigator.doNotTrack == "yes") {
            doNotTrack = "yes";
        } else {
            doNotTrack = "no";
        }
    } else if (navigator.msDoNotTrack) {
        doNotTrack = navigator.msDoNotTrack;
    } else if (window.doNotTrack()) {
        doNotTrack = window.doNotTrack;
    } else {
        doNotTrack = "unknown";
    }
    return doNotTrack;
}


(function() {
    api.register("DoNotTrack Enabled", function () {
        try {
            return getDNT();
        } catch (e) {
            return "error";
        }
    });
})();
