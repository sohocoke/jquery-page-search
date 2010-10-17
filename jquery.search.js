(function(jQuery) {
  
  var settings, searchables, searchfield // scope these as shared
  
  jQuery.fn.search = function(target,options) {
      return this.each(function() {   
          jQuery.search(jQuery(this),jQuery(target), options);
      });
  };
  jQuery.search = function(search,target,options) {
    settings = {
    };
    if (options) jQuery.extend(settings, options);
    searchfield = search
    searchables = target
    searchfield.keyup(function(){
      searchables.removeHighlight();
      term = searchfield.val().toLowerCase()
      if(term == "") {
       searchables.slideDown()
       return 
      }
      words = term.split(" ")
      searchables.each(function(){
        for (var i=0; word = words[i]; i++) {
          if(word == "") continue   
          pass = true
          if(jQuery(this).html().toLowerCase().indexOf(word) == -1){
            pass = false
            break
          } else {
            jQuery(this).highlight(word);
          }
        }
        if(pass) jQuery(this).slideDown()
        else jQuery(this).slideUp()
      })
    })
  };
  ///////////// Highliting //////////////////////////////////////////////////////////////////////////////////////
  // http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
  jQuery.fn.highlight = function(pat) {
   function innerHighlight(node, pat) {
    var skip = 0;
    if (node.nodeType == 3) {
     var pos = node.data.toUpperCase().indexOf(pat);
     if (pos >= 0) {
      var spannode = document.createElement('span');
      spannode.className = 'highlight';
      var middlebit = node.splitText(pos);
      var endbit = middlebit.splitText(pat.length);
      var middleclone = middlebit.cloneNode(true);
      spannode.appendChild(middleclone);
      middlebit.parentNode.replaceChild(spannode, middlebit);
      skip = 1;
     }
    }
    else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
     for (var i = 0; i < node.childNodes.length; ++i) {
      i += innerHighlight(node.childNodes[i], pat);
     }
    }
    return skip;
   }
   return this.each(function() {
    innerHighlight(this, pat.toUpperCase());
   });
  };
  jQuery.fn.removeHighlight = function() {
   return this.find("span.highlight").each(function() {
    this.parentNode.firstChild.nodeName;
    with (this.parentNode) {
     replaceChild(this.firstChild, this);
     normalize();
    }
   }).end();
  ///////////// End Highliting ///////////////////////////////////////////////////////////////////////////////////
  };
})(jQuery);