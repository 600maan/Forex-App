// JS library for ForexApp

var ForexApp = {
    Assest : {},
    Transaction : {},
    test : function(){
        var trans = {
            date : document.getElementById("collectiondate").value,
            fromCurrency: document.getElementById("fromCurrency").value,
            toCurrency: document.getElementById("toCurrency").value,
            fromCurrencyAmount: document.getElementById("fromCurrencyAmount").value,
            toCurrencyAmount: document.getElementById("toCurrencyAmount").value,
           // currencyRate: document.getElementById("collectiondate").value
        };

        alert(JSON.stringify(trans));
    },
    SetDataModel : function(){
        // Create a data model to be used in application
    },
    GetDataModel : function() {
        // return Data model that are being used in application
    },
    GetAllTransactions : function(){
        // Get all transactions from server
        var url = "http://localhost:8009/get_all_trans";
        var http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.onreadystatechange = function() { if(http.readyState == 4 && http.status == 200) { console.log(http.responseText) }}
        http.send();
        pageRedirect2();
        return result;
    },
    CreateTransaction : function (args){
        // Send args to the server to create transactions
	    var TID = "TRANS4";
	    var doctype = "trans";
	    var transid = "transid";
	    var fromUser = "fromUser";
	    var toUser ="toUser";
	    var fromCurernecy = "fromCurrency";
	    var toCurrency = "toCurrency";
	    var amount = "amount";
    	var rate = "rate";
	    var status = "makeOrder";
	    var QBDAta = "qbdata";

	    var url = "http://localhost:8009/make_trans";
	    var params = "TID="+ TID + "&" + "doctype=" + doctype + "transid=" + transid + "fromUser=" + fromUser + "toUser=" + toUser + "fromCurernecy=" + fromCurernecy + "toCurrency=" + toCurrency + "amount=" + amount + "rate=" + rate + "status=" + status + "QBData=" + QBData;
	    var http = new XMLHttpRequest();

	    http.open("GET", url+"?"+params, true);
	    http.onreadystatechange = function() { if(http.readyState == 4 && http.status == 200) { console.log(http.responseText); }}
	    http.send();
    },
    UpdateTransaction : function (args){
        // Send args to the server to update transactions
    },
    PageRedirect : function pageRedirect(){
        var delay = 1000;
        setTimeout(function(){
            window.location = "successful.html";
        },delay);
        
    },
    PageRedirect2 : function pageRedirect2(){
        var delay = 1000;
        setTimeout(function(){
            window.location = "trans.html";
        },delay);    
    }
}
