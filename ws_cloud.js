"use strict";
/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 4


   Filename: ws_cloud.js

   Author:  Diego Sandoval
   Date:    April 22, 2019 (04/22/19)
   
   Function List
   =============
   
   findUnique(arr)
      Returns the unique values in the "arr" array in the form of
      a two-dimension array
      array[i][j]
      where i is the ith unique entry, array[i][0] provides the
      value of the entry and array[i][1] provides the number 
      of repetitons of that value
   
   sortByCount(a,b)
      Compare function used in a two-dimensional arrays to be sorted
      in descending order of the values in the array's 2nd column
      
   sortByWord(a, b)
      Compare function used in a two-dimensional array to be sorted
      in ascending alphabetical order of the vlaues in the array's
      first column
   
   randomValue(minVal, maxVal)
      Returns a randome integer between minVal and maxVal

*/
// DDOES:
window.addEventListener('load', function () {
    // DVARL: 
    var wordContent = document.getElementById('speech').textContent.toLowerCase().replace(/[.,\\\/#!?$%\^&\*;:{}=\-_`'"~()\d]/g, "");
    // DLOOP: Loops through the stopWords
    for (var i = 0; i < stopWords.length; i++) {
        // DVARS: description
        var stopWordsRE = new RegExp(`\\b${stopWords[i]}\\b`, 'g');
        wordContent = wordContent.replace(stopWordsRE, "")
    };
    // DDOES:
    wordContent = wordContent.trim();
    wordContent = wordContent.replace(/\s+/g, " ");
    // DVARA: description
    var wordArray = wordContent.split(" "),
        uniqueWords = findUnique(wordArray);
    uniqueWords.sort(sortByCount);
    // DLOOP: Loops through the uniqueWords
    for (var i = uniqueWords.length; i > 100; i--) {
        uniqueWords.pop();
    };
    // DVARA: description
    var minimumCount = uniqueWords[99][1],
        top3Count = uniqueWords[2][1];
    uniqueWords.sort(sortByWord);
    // DLOOP: Loops through the uniqueWords
    for (var i = 0; i < uniqueWords.length; i++) {
        // DVARO: description
        var cloudWord = document.createElement('span');
    };
    console.log(wordContent, wordArray, uniqueWords, minimumCount, top3Count);
});







function findUnique(arr) {
    var prevWord;
    var unique = [];
    var listNum = -1;
    arr.sort();
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== prevWord) {
            listNum++;
            unique[listNum] = [];
            unique[listNum][0] = arr[i];
            unique[listNum][1] = 1;
        } else {
            unique[listNum][1] = unique[listNum][1] + 1;
        }
        prevWord = arr[i];
    }

    return unique;
}

function sortByCount(a, b) {
    return b[1] - a[1];
}

function sortByWord(a, b) {
    if (a[0] < b[0]) {
        return -1;
    } else if (a[0] > b[0]) {
        return 1;
    } else {
        return 0;
    }
}

function randomValue(minVal, maxVal) {
    var interval = maxVal - minVal;
    return Math.floor(minVal + interval * Math.random());
}