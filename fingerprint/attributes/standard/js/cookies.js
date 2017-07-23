(function() {
    api.register("Cookies Enabled", function () {
        return window.navigator.cookieEnabled ? "yes" : "no";
    });
})();
