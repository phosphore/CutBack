chrome.tabs.getAllInWindow(null, function(tabs) {
    numTabs = tabs.length;
    var analyzedText = new Array();
    var analyze_web_text = function(corpus){
			tfidfs = tfidf_corpus(prepare_docs(prepare_corpus(corpus)));
			s = sortObj(tfidfs);
			return s;
		}
    for(var i = 0; i < numTabs; i++)
    {
		chrome.tabs.sendRequest(tabs[i].id, {action: "getText"}, function(response) {
			analyzedText.push(analyze_web_text(response.txt));
		});
	}
	console.log(analyzedText);
		//// Cerca corrispondenze
			  //var nq = 0;
			  //var tmp = 0;
			  //var ending = 0;
			  //for(var k=0;k<sortKeywords.length;k++)
			  //{
			    //tmp = freq(sortKeywords[k],sortKeywords2);
			    //if(tmp>nq)
			    //{
					//nq = tmp;
					//ending = k;
				//}
			  //}
			  ////TODO aggiungere if, perché se non viene trovata nessuna corrispondenza tra i due testi, viene fuori 0. Ergo se è veramente 0 bisogna vedere se sono = le 2 o simili. O qualcosa del genere.
			  //alert(sortKeywords[ending]);
			//}
	  
	
    
    lenText = '<img src="little.png"> Your branches, ' + 
              numTabs + ' tabs: ';
    document.getElementById('branches').innerHTML = lenText;

    html = '';
    for (var i=0; i<numTabs; i++) {
      html += '<tr>';
      // display 16x16 sized favicon
      html += '<td style="border-color: transparent;"><img src=\"' + tabs[i].favIconUrl  + 
              '\" width=\"16\" height=\"16\"></td>';
      // display 'x' as the option to close the tab
      //html += '<td><a href=\"#\" class=\"redlink\" onClick=\"closeTab(' + 
              //tabs[i].id + ');\">' + 'x</a></td>';
      // display page title as a link to select it
      html += '<td><a title=\"' + tabs[i].url  + '\">' + 
              tabs[i].title  + '</a></td>';
      html += '</tr>';
    }
    document.getElementById('tb').innerHTML = html;
    });
