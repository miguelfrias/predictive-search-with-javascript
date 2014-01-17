(function (win, doc) {
    'use strict';

    var App = win.App || {};

    App.init = (function (file) {

        function _getCache(key) {

            return localStorage.getItem(key);

        }

        function _setCache(key, value) {

            return localStorage.setItem(key, value);

        }

        var cache = _getCache(file);

        if (cache) {

            cache = JSON.parse(cache);

            App['original-text'] = cache[0];
            App.dataset = cache[1];

        } else {

            ajax(file, function _handleAjax (response) {

                App['original-text'] = response.response;

                // Look for Words in order to generate the dataset
                var wordsRegex = new RegExp("([a-z]{2,})", 'gmi'),
                    words = App['original-text'].match(wordsRegex),
                    objectDataset = {};

                _.each(words, function(value, key, list) {

                    var name = value.toLowerCase();

                    if ( objectDataset[name] ) {

                        objectDataset[name] = objectDataset[name] + 1;

                    } else {

                        objectDataset[name] = 1;

                    }

                });

                App.dataset = objectDataset;

                _setCache(file, JSON.stringify([App['original-text'], App.dataset]));

            });

        }

    });

    win.App = App;

})(window, document);