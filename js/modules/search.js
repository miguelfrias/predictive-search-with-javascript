(function (win, doc) {
    'use strict';

    var App = win.App || {};

    App.search = (function () {

        var _searchData = {};

        function _renderResults (words) {

            var resultsDOM = _searchData.DOM.results,
                list = "<% _.each(words, function(word) { %> <li><%= word %></li> <% }); %>",
                template = _.template(list, {'words': words});

            resultsDOM.innerHTML = template;

        }

        function _handleSearch (e) {

            var searchRegExp,
                combinations,
                wordsInDataset = [];

            e.preventDefault();

            _searchData.text = _searchData.DOM.input.value;

            if (_searchData.text) {

                // Parser
                App.charParser.init(_searchData.text);
                App.charParser.parse();

                // Update text that was searched
                _searchData.DOM.exactMatches.innerHTML = _searchData.text;

                // Get all the posibles combinations
                combinations = App.charParser.getCombinations();

                // Search if a word is present in the dataset.
                _.each(combinations, function(value, key, list) {
                    
                    var keyString = value.join('');

                    // console.log(keyString);

                    if (App.dataset[keyString]) {
                        wordsInDataset.push(keyString);
                    }

                });

                // console.log(wordsInDataset);

                if (wordsInDataset) {
                    _renderResults(wordsInDataset);
                }

            }

        }

        return {

            init: function (searchDOM) {

                if (!App.charParser) {
                    throw new Error('charParser is not present!');
                }

                if (searchDOM) {

                    _searchData.DOM = searchDOM;

                    _searchData.DOM.button.addEventListener(
                        'click', 
                        _handleSearch, 
                        false
                    );
                }

            }

        }

    })();

    win.App = App;

})(window, document);