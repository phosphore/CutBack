 chrome.tabs.getAllInWindow(null, function(tabs) {
    numTabs = tabs.length;
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


//$(document).ready(function() {
   //getTabCount();
//});

//function getTabCount()
//{

  //chrome.windows.getAll({"populate" : true}, function(windows)

  //{
	  //document.getElementById("branches").textContent = " Your "+windows.length+" branches: ";
    ////for(var i = 0; i < windows.length; i++)
    ////{
      ////for(var j = 0; j < windows[i].tabs.length; j++)
      ////{
        ////original.push(new tabInfo(windows[i].tabs[j], j));
        ////alert(original[original.length - 1].tab.title);
        ////original[original.length - 1].tab.title = tab.title;
        ////original[original.length - 1].tab.url = tab.url;
        ////original[original.length - 1].tab.status = tab.status;
        ////original[original.length - 1].count = 0;

        ////localstorage.setitem["tab.title"];
        ////localstorage.setitem["tab.url"];
        ////localstorage.setitem["tab.status"];
       ////}
    ////}
  //});

