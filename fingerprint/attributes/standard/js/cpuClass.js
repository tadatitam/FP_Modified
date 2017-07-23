(function() {
    api.register("CPU Class", function () {
        if(navigator.cpuClass) {
            return navigator.cpuClass;
        } else {
            return "unknown"
        }
    
    });
})();
