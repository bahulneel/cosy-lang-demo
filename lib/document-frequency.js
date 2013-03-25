
module.exports = (function (lang) {
    "use strict";
    var sequence = lang.sequence,
        fn$ = lang.dispatch.fn$,
        first = sequence.first,
        rest = sequence.rest,
        cons = sequence.cons,
        lazy = sequence.lazy,
        idf;

    function clone(counts) {
        var newCounts = {}, key;

        for (key in counts) {
            if (counts.hasOwnProperty(key)) {
                newCounts[key] = counts[key];
            }
        }

        return newCounts;
    }

    function merge(x, y) {
        var z = clone(x), key;
        for (key in y) {
            if (y.hasOwnProperty(key)) {
                if ('undefined' === typeof z[key]) {
                    z[key] = 0;
                }
                z[key] += 1;
            }
        }
        return z;
    }

    idf = fn$({
        1: function (terms) {
            return idf({}, 1, terms);
        },
        3: function (freq, docCount, terms) {
            if (null === first(terms)) {
                return null;
            }
            function calcIdf(terms) {
                var docFreq, invDocFreq = {}, word;
                docFreq = merge(freq, first(terms));
                for (word in docFreq) {
                    if (docFreq.hasOwnProperty(word)) {
                        invDocFreq[word] = docCount/(1+docFreq[word]);
                    }
                }
                return cons(invDocFreq, idf(docFreq, docCount + 1, rest(terms)));
            }
            return lazy(terms, calcIdf);
        }
    });

    return idf;
})(require('cosy-lang'));