(function (win, doc) {

    var App = win.App || {};

    App.search = (function () {

        var searchData = {};

        function _renderResults (matches) {

            _updateExactMatches(searchData.matches.length);

            var resultsDOM = searchData.DOM.results,
                template = _.template("<li><%= text %></li>");

            resultsDOM.innerHTML = template({text: searchData.text});

        }

        function _updateExactMatches (nMatches) {
            searchData.DOM.exactMatches.innerHTML = nMatches;
        }

        function _handleSearch (e) {

            var searchRegExp;

            e.preventDefault();

            searchData.text = searchData.DOM.input.value;

            searchRegExp = new RegExp(searchData.text, 'gi');

            searchData.matches = App.dataset.match(searchRegExp);

            if (searchData.matches && searchData.matches.length > 0) {

                _renderResults(searchData.matches);

            }


        }

        return {

            init: function (searchDOM) {

                if (searchDOM) {

                    searchData.DOM = searchDOM;

                    searchData.DOM.button.addEventListener(
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