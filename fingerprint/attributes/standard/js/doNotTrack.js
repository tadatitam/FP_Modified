(function() {
    var doNotTrack = "";
    if (window.navigator.doNotTrack != null && window.navigator.doNotTrack != "unspecified") {
        if (window.navigator.doNotTrack == "1" || window.navigator.doNotTrack == "yes") {
            doNotTrack = "yes";
        } else {
            doNotTrack = "no";
        }
    } else {
        doNotTrack = "NC";
    }
    api.register("DoNotTrack Enabled", function () {
        return doNotTrack;
    });
})();
