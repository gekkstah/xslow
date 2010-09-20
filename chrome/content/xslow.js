/*global YSLOW */
YSLOW.registerRule({  
    id: "css-rules",
    info: "How many CSS Rules are read on this page",
    name: "CSS Rules in the document",
    category: ["general"],
    config: {},
    
    lint: function (doc, cset, config) {
      var elms = doc.styleSheets,
          count = 0,
          message= "";
      for(i=0;i<elms.length;i++){
      	 count += elms[i].cssRules.length;
      }
      message = "This site contains "+count+" CSS Rules";
      return {
      	  score: (count<701)? 100 : Math.round(count-700)/200),
          message: message
      };
    }
});
YSLOW.registerRule({  
    id: "dom-elements",
    info: "How many DOM Elements are on this page",
    name: "Number of DOM Elements",
    category: ["general"],
    config: {},
    
    lint: function (doc, cset, config) {
      var count = doc.getElementsByTagName('*').length,
          message= "";
    
      message = "This site contains "+count+" DOM Elements";
      return {
      	  score: (count<701)? 100 : (100-((count-700)/100)),
          message: message
      };
    }
});
YSLOW.registerRule({  
    id: "html-size",
    info: "The byte size (ungzipped) of the current document",
    name: "HTML Size of the document",
    category: ["general"],
    config: {},
    
    lint: function (doc, cset, config) {
      var count = doc.body.innerHTML.length + doc.getElementsByTagName('head')[0].innerHTML.length,
          message= "";
 
      message = "This site is "+count+" bytes (ungezipped) large";
      return {
      	  score: (count<20001)? 100 : (count/10000),
          message: message
      };
    }
});

YSLOW.registerRule({
    id: 'xslow-doctype',
    name: 'Use a doctype',
    info: "Without a DOCTYPE, the page renders in quirks mode. The shortest doctype you can put at the very top of the page is <code>&lt;!doctype html&gt;</code>",
    category: ['general'],
    config: {},

	lint: function (doc, cset, config) {
		var dtype = doc.doctype,
		    message = '';
		    
		if (!dtype) {
		    message = "The page doesn't have a doctype";
		}
		
		return {
		    score: !dtype ? 1 : 100,
		    message: message
		};
	}
});


YSLOW.registerRule({
    id: 'xslow-hashlinks',
    name: 'Semantic link hrefs',
    info: "Links should be links. Links with href such as href=# and href=&quot;javascript:&quot; are not semantic and do not provide a fallback solution",
    category: ['general'],
    config: {
        points: 21
    },

	lint: function (doc, cset, config) {
	    
		var links = doc.links,
		    i, max = links.length,
	        href,
		    message = '',
		    count = 0;
		
		for (i = 0; i < max; i += 1) {
		    href = links[i].getAttribute('href').toString();
		    if (href === "#" || href.indexOf('javascript:') === 0) {
		        count += 1;
		    }
		}
		
		if (count) {
		    message = YSLOW.util.plural('Found %num% link%s% with non-semantic href attributes', count);
		}
		
		return {
		    score: count ? 100 - count * config.points : 100,
		    message: message
		};
	}
});



YSLOW.registerRuleset({
    id: 'xslow',
    name: 'xslow',
    rules: {
    	"css-rules": {},
    	"dom-elements": {},
    	"html-size": {},    	
        'xslow-doctype': {},
        'xslow-hashlinks': {}
    },
	weights: {
	"css-rules": 1,
    	"dom-elements": 1,
    	"html-size": 0.5,  
        'xslow-doctype': 1,
        'xslow-hashlinks': 1
	}
});

