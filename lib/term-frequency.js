
module.exports = (function (lang) {
    "use strict";
    var sequence = lang.sequence,
        reduce = sequence.reduce;

    function clone(counts) {
        var newCounts = {}, key;

        for (key in counts) {
            if (counts.hasOwnProperty(key)) {
                newCounts[key] = counts[key];
            }
        }

        return newCounts;
    }

    function tf(words) {
        var max = 0, counts, word;
        function countFeq(counts, word) {
            var newCounts = clone(counts);
            if ('undefined' === typeof newCounts[word]) {
                newCounts[word] = 0;
            }
            newCounts[word] += 1;
            if (newCounts[word] > max) {
                max = newCounts[word];
            }
            return newCounts;
        };
        counts = reduce(countFeq, {}, words);
        if (max) {
            for (word in counts) {
                if (counts.hasOwnProperty(word)) {
                    counts[word] /= max;
                }
            }
        }
        return counts;
    }

    return tf;
})(require('cosy-lang'));
