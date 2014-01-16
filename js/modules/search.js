(function (win, doc) {
    'use strict';

    var App = win.App || {};

    App.search = (function () {

        var _searchData = {};

        function _renderResults (matches) {

            _updateExactMatches(_searchData.matches.length);

            var resultsDOM = _searchData.DOM.results,
                template = _.template("<li><%= text %></li>");

            resultsDOM.innerHTML = template({text: _searchData.text});

        }

        function _updateExactMatches () {
            _searchData.DOM.exactMatches.innerHTML = _searchData.text;
        }

        function _handleSearch (e) {

            var searchRegExp;

            e.preventDefault();

            _searchData.text = _searchData.DOM.input.value;

            if (_searchData.text) {

                // Parser
                App.charParser.init(_searchData.text);
                App.charParser.parse();

                // Update search text
                _searchData.DOM.exactMatches.innerHTML = _searchData.text;

                // Search for the text globally and insensitive
                // searchRegExp = new RegExp(_searchData.text, 'gi');

                // Search
                // _searchData.matches = App.dataset.match(searchRegExp);

                // if (_searchData.matches && _searchData.matches.length > 0) {

                //     _renderResults(_searchData.matches);

                // }

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