// ==UserScript==
// @name          jQuery Example
// @require       https://code.jquery.com/jquery-3.7.1.min.js
// ==/UserScript==

function getFormattedDate() {
    var dateObj = new Date();
    var year = dateObj.getFullYear();
    var month = ("0" + (dateObj.getMonth() + 1)).slice(-2); // getMonth() is zero-based
    var day = ("0" + dateObj.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
}

window.onload = function() {
    setTimeout(function () {
      jQuery(document).ready(function($) {
          let downloadButton = document.createElement("button");
          downloadButton.innerHTML = "Download CSV";
          downloadButton.id = "csvButton";
          downloadButton.style.padding = "20px"; 
        
          document.body.insertBefore(downloadButton, document.body.firstChild);

          function generateCSV() {
              let separator = ",";
              let csvContent = [];
            	let header = ['Security', 'Name', 'Total_Value', 'Quantity', 'All_Time_Return', 'Per_All_time_Return', 'Today_Price', 'Per_Today_Price'];
            	
            	csvContent.push(header.join(separator));
  						            
              $("tbody tr").each(function () {
                  let row = [];
                  $(this).find("td").each(function () {
                      $(this).find("p").each(function() {
                          row.push($(this).text());
                      });
                  });
                	
                	if(row.length == 9) {
                  	row = row.slice(1);
                  }
                	console.log(row);
                  csvContent.push(row.join(separator));
              });
              return csvContent.join("\n");
          }
        
        	

          document.getElementById("csvButton").addEventListener("click", function () {
              let accountName = $(".knseRw > div:nth-child(1)").text();
              let csvContent = generateCSV();
              var hiddenElement = document.createElement('a');
              hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
              hiddenElement.target = '_blank';
              hiddenElement.download = accountName+'_portfolio_'+getFormattedDate()+'.csv';
              hiddenElement.click();
          });
      });
    }, 5000);
}
