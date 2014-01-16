(function (win, doc) {

    var App = win.App || {};

    App.loadFile = (function () {

        function _getCache(key) {
            return localStorage.getItem(key);
        }

        function _setCache(key, value) {
            return localStorage.setItem(key, value);
        }

        return {
            init: function (file) {

                var cache = _getCache(file);

                if (cache) {

                    App.dataset = cache;

                } else {

                    ajax(file, function _handleAjax (response) {

                        App.dataset = response.response;

                        _setCache(file, response.response);

                    });

                }

            }
        }
    })();

    win.App = App;

})(window, document);