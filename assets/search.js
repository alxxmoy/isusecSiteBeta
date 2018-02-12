var substringMatcher = function(datamap) {
  return function findMatches(q, cb) {
    var matches, substringRegex;
  
    // an array that will be populated with substring matches
    matches = [];
  
    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    for(var label in datamap) {
      if(substrRegex.test(label)) {
          matches.push(label);
      }
    }
  
    cb(matches);
  };
};

$('#search .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'posts',
  source: substringMatcher(posts)
});

$('.typeahead').bind('typeahead:select', function(ev, selection) {
  window.location.href = posts[selection];
});

$('.typeahead').bind('typeahead:render', function(ev, ...suggestions) {
  var firstSuggestion = document.getElementsByClassName('tt-dataset-posts')[0].firstChild;
  firstSuggestion.classList.add('tt-cursor');
});

console.log(posts);