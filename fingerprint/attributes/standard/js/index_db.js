(function() {
    api.register("indexedDB", function () {
        return !!window.indexedDB ? "yes" : "no";
    });
})();
