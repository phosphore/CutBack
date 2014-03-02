//SO FAR the code works well when debugged. But when I try to execute it without the debug, it doesn't seem to work.
//I'll try to figure out why later. 

chrome.tabs.getAllInWindow(null, function(tabs) {
    numTabs = tabs.length;
    var html = '';
    var analyzedText = [];
    var analyze_web_text = function(corpus){
			tfidfs = tfidf_corpus(prepare_docs(prepare_corpus(corpus)));
			s = sortObj(tfidfs);
			return s;
		}
		
	// Search function (with regex). It returns an array with the position of every "word", -1 if it's not found.
	var searchstr = function(str, strArray) {
		var arrfound = new Array();
		for (var i=0; i<strArray.length; i++) {
			for (var j=0; j<strArray[i].length; j++) {
				if (strArray[i][j].match(str))
				{
					arrfound.push(j);
					j = strArray[i].length;
				}
			}
			if(arrfound.length == i)
				arrfound.push(-1);
		}
		return arrfound;
	}
	
	//function to get the inner text from every tab
    for(var i = 0; i < numTabs; i++)
    {
		chrome.tabs.sendRequest(tabs[i].id, {action: "getText"}, function(response) {
			analyzedText.push(analyze_web_text(response.txt));
		});
	}
	
	// Print initial text
	 lenText = '<img src="little.png"> Your branches, ' + numTabs + ' tabs: ';
     document.getElementById('branches').innerHTML = lenText;
	
	// Core algorithm
	for(var t = 0; t < analyzedText.length; t++)
		{
				var maxvalue = 1;
				var word = "";
				//We are looking for the word that appears more times between all the nodes. !! There may be false positives !!
				//The "analyze_web_text" function (:35) returns an object where the first index is the most repeated keyword in the text.
				//This feature may be useful to improve the algorithm in a future code refactory
				for(var i = 0; i < analyzedText.length; i++)
				{
					var cont = 0;
					for (var j = 0; j < analyzedText[i].length; j++)
					{
						cont = numDocsContaining(analyzedText[i][j],analyzedText);
						if (cont > maxvalue)
							{
								maxvalue = cont;
								word = analyzedText[i][j];
							}
					}
					if (maxvalue == 1)
						word = analyzedText[i][0];
				} 
				
				// We have now to group the tabs, looking for those that hasn't got that word.
				var arr2 = searchstr(word,analyzedText);
				
				//UI to be defined. (Click to close a group of tabs)
				html += '<thead>'+
						'<tr>'+
						'<th style="border-top-color: transparent;"><div class="squaredFour"><input type="checkbox" value="None" id="squaredFour" name="check" /><label for="squaredFour"></label></div></th>'+
						'<th style="border-color: transparent;text-shadow: 1px 1px 1px whitesmoke;">'+word+'</th>'+
						'</tr>'+
                        '</thead>';
                        
                 html += '<tbody>';
				 for (var i=0; i<numTabs; i++) {
					if(arr2[i] != -1)
					{
					  
					  html += '<tr>';
					  html += '<td style="border-color: transparent;"><img src=\"' + tabs[i].favIconUrl  + '\" width=\"16\" height=\"16\"></td>';
					  html += '<td><a title=\"' + tabs[i].url  + '\">' +  tabs[i].title  + '</a></td>';
					  html += '</tr>';
				    }
				}
				html += '</tbody>';
				document.getElementById('tb').innerHTML = html;
				//TOBEDEFINED: multiple <thead> inside single <table>
				
				var deleted = [];
				var local = [];
				for (var o = 0; o<arr2.length; o++)
					if (arr2[o] == -1)
						deleted.push(analyzedText[o]); //"deleted" contains the elements that doesn't belong to the "word" group of tabs
				
				//
				analyzedText = deleted;
					
				
		}
    });
