(function (win, doc) {
    'use strict';

    var App = win.App || {};

    App.charParser = (function () {

        var _letterMap = [
                'abc',  // 2
                'def',  // 3
                'ghi',  // 4
                'jkh',  // 5
                'mno',  // 6
                'pqrs', // 7
                'tuv',  // 8
                'wxyz', // 9
            ],
            _originalText = '',
            _textToSearch,
            _posibilites;

        // Original: https://gist.github.com/textarcana/5737478
        function _getCombinations (collection) {
            var current,
            subarray,
            result = [],
            currentArray = [],
            newResultArray = [];

            if (collection.length){
                current = collection.shift();
                result = _getCombinations(collection);

                currentArray.push(current);

                result.map(function(list) {
                    newResultArray.push(list.slice(0));
                    list.push(current);
                });

                result.push(currentArray);
                result = result.concat(newResultArray);
            }

            return result;
        };

        // Original: https://gist.github.com/md2perpe/8210411
        // function _getCombinations (list) { // AKA Permutation

        //     // Empty list has one permutation
        //     if (list.length == 0) {
        //         return [[]];
        //     }

        //     var result = [];

        //     for (var i=0; i<list.length; i++) {

        //         // Clone list (kind of)
        //         var copy = Object.create(list);

        //         // Cut one element from list
        //         var head = copy.splice(i, 1);

        //         // Permute rest of list
        //         var rest = _getCombinations(copy);

        //         // Add head to each permutation of rest of list
        //         for (var j=0; j<rest.length; j++) {

        //             var next = head.concat(rest[j]);
        //             result.push(next);

        //         }

        //     }

        //     return result;
        // };

        function _mapLetter (value, key, list) {

            if (value === '0' || value === '1' ) {

                var errorText = 'Error. This number doesn\'t have a ';
                    errorText += 'equivalent in a numeric key pad.';

                alert(errorText);

                throw new Error('Invalid number');

            }

            if (!parseInt(value)) {

                var errorText = 'Error. Invalid characters. This field just ';
                    errorText += 'accept numbers.';

                alert(errorText);

                throw new Error('Invalid number');

            }

            return _letterMap[value - 2];

        }

        function _parse () {

            var arrayText = _originalText.split(''),
                textMap = _.map(arrayText, _mapLetter);

            _textToSearch = textMap.join('')

        }

        return {

            init: function (text) {

                _originalText = text;

            },

            parse: _parse,

            getCombinations: function () {

                _posibilites = _getCombinations(_textToSearch.split(''));

                return _posibilites;

            }

        }

    })();

    win.App = App;

})(window, document);