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
// DDOES: Loads an anyomous function when the page is loaded
window.addEventListener('load', function () {
    // DVARS: gets all the words on the page, then lowercases and replaces puncuation
    var wordContent = document.getElementById('speech').textContent.toLowerCase().replace(/[.,\\\/#!?$%\^&\*;:{}=\-_`'"~()\d]/g, "");
    // DLOOP: Loops through the stopWords and deletes the words from the string
    for (var i = 0; i < stopWords.length; i++) {
        // DVARS: Regex 
        var stopWordsRE = new RegExp(`\\b${stopWords[i]}\\b`, 'g');
        // DDOES: Deletes the word
        wordContent = wordContent.replace(stopWordsRE, "")
    };
    // DDOES: Gets ride of unnecessary space
    wordContent = wordContent.trim();
    wordContent = wordContent.replace(/\s+/g, " ");
    // DVARA: Splits up wordContent based on the spaces and makes an array of it, the makes a 2d array using findUnique, the sorts the 2d array using sortByCount
    var wordArray = wordContent.split(" "),
        uniqueWords = findUnique(wordArray);
    uniqueWords.sort(sortByCount);
    // DLOOP: Loops through the uniqueWords and pops off the end parts till it is a length of 100
    for (var i = uniqueWords.length; i > 100; i--) {
        uniqueWords.pop();
    };
    // DVARN: gets the smallest number of counted word and the top 3 word count and sets them to variables
    var minimumCount = uniqueWords[99][1],
        top3Count = uniqueWords[2][1];
    // DVARA: sorts the unique word array
    uniqueWords.sort(sortByWord);
    // DLOOP: Loops through the uniqueWords
    for (var i = 0; i < uniqueWords.length; i++) {
        // DVARL: Local variables for the for loop 
        var cloudWord = document.createElement('span'),
            wordSize = 6,
            wordPorp = 0.45 * (uniqueWords[i][1] / minimumCount);
        // DVARO: changes the text content to the word
        cloudWord.textContent = uniqueWords[i][0];
        // DIFDO: If the wordPorp is greater than 6 it sets word size equal to 6, else it sets it to a calculated value
        if (wordPorp > 6) {
            wordSize = 6;
        } else {
            wordSize = 0.45 * (uniqueWords[i][1] / minimumCount);
        };
        // DVARO: Changes the font size and rotation of each span element
        cloudWord.style.fontSize = `${wordSize}em`;
        cloudWord.style.transform = `rotate(${randomValue(-30, +30)}deg)`;
        // DIFDO: Changes the color and text shadow of the top 3 words
        if (uniqueWords[i][1] >= top3Count) {
            cloudWord.style.color = "rgb(251, 191, 191)";
            cloudWord.style.textShadow = "2px 2px 5px rgb(51, 51, 51)"
        };
        // DDOES: Adds the elements to the aside with the ID of cloud
        document.getElementById('cloud').appendChild(cloudWord);
    };
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