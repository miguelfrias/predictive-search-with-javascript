(function (win, doc) {
    'use strict';

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

                ajax(file, function _handleAjax (response) {

                    App['original-text'] = response.response;

                    // Look for Words in order to generate the dataset
                    var wordsRegex = new RegExp("([a-z]{2,})", 'gmi');

                    var tmp = App['original-text'].match(wordsRegex);

                    App.dataset = _.map(tmp, function(value, key, list) {

                        return value.toLowerCase();

                    });

                });

            }
        }

    })();

    win.App = App;

})(window, document);