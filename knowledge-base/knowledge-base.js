angular.module('aa51e100-f601-4f2c-ba4c-767a05c45ebe', [
  'core.services.WidgetAPI'
]).directive('knowledgeBase', widgetComponent);

function widgetComponent(WidgetAPI) {

  function widgetContainer(scope, element, params) {

      // widget API constructor
      var api = new WidgetAPI(params);

      var stopwords = ["a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any","are","aren't","as","at","be","because","been","before","being","below","between","both","but","by","can't","cannot","could","couldn't","did","didn't","do","does","doesn't","doing","don't","down","during","each","few","for","from","further","had","hadn't","has","hasn't","have","haven't","having","he","he'd","he'll","he's","her","here","here's","hers","herself","him","himself","his","how","how's","i","i'd","i'll","i'm","i've","if","in","into","is","isn't","it","it's","its","itself","let's","me","more","most","mustn't","my","myself","no","nor","not","of","off","on","once","only","or","other","ought","our","ours","ourselves","out","over","own","same","shan't","she","she'd","she'll","she's","should","shouldn't","so","some","such","than","that","that's","the","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll","they're","they've","this","those","through","to","too","under","until","up","very","was","wasn't","we","we'd","we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's","which","while","who","who's","whom","why","why's","with","won't","would","wouldn't","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves"];
      scope.cloudWordsArray = [];

      api.onDataEvent('onMediaMessageEvent', createWordCloud);


      function createWordCloud(data){
          if(!data.receivedFrom.isSelf) {
              scope.message = data.body;
              scope.removeStopWords = scope.message.replace(new RegExp('\\b(' + stopwords.join('|') + ')\\b', 'g'), '');
              scope.removePunctuation = scope.removeStopWords.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

              var cloudWords = scope.removePunctuation.split(' ');

              _.forEach(cloudWords, function (word) {

                  var wordObject = {
                      word: word,
                      count: 1,
                      fontsize: 16,
                      color: '#304050'
                  }
                  //if the word does not exist yet, add to word cloud array
                  if (!containsObject(wordObject, scope.cloudWordsArray)) {
                      scope.cloudWordsArray.push(wordObject);
                  }
                  //if the word already exist, count it, and set font/color accordingly
                  else {
                      var index = getIndex(wordObject, scope.cloudWordsArray);
                      scope.cloudWordsArray[index].count++;
                      var wordCount = scope.cloudWordsArray[index].count;

                      if (wordCount <= 2) {
                          scope.cloudWordsArray[index].fontsize = 22
                          scope.cloudWordsArray[index].color = '#D50000'
                      }
                      if (wordCount >= 3) {
                          scope.cloudWordsArray[index].fontsize = 28
                          scope.cloudWordsArray[index].color = '#0066FF'
                      }
                      if (wordCount >= 4) {
                          scope.cloudWordsArray[index].fontsize = 34
                          scope.cloudWordsArray[index].color = '#0066FF'
                      }
                      if (wordCount >= 5) {
                          scope.cloudWordsArray[index].fontsize = 40
                          scope.cloudWordsArray[index].color = '#008000'
                      }
                      if (wordCount >= 8) {
                          scope.cloudWordsArray[index].fontsize = 46
                          scope.cloudWordsArray[index].color = '#008000'
                      }

                      if (scope.cloudWordsArray.length > 50) {
                          scope.cloudWordsArray.shift();
                      }
                  }
              });
          }
      }

      function getIndex(obj, list) {
          var i;
          for (i = 0; i < list.length; i++) {
              if (list[i].word === obj.word) {
                  return i;
              }
          }
      }

      function containsObject(obj, list) {
          var i;
          for (i = 0; i < list.length; i++) {
              if (list[i].word === obj.word) {
                  return true;
              }
          }
          return false;
      }

      scope.clearCloud = function () {
          scope.cloudWordsArray = [];
      }

      scope.addToInput = function (word) {
          var text = element.find('#gsc-i-id1')[0];
          text.value += word.word + ' ';
          scope.wordSearch = text.value;
      }

      // called automatically when widget is destroyed
      element.on('$destroy', function() {
          api.unregister();
      });

  }

  return {
    scope: {},
    replace: true,
    template: template,
    link: widgetContainer
  };
}
