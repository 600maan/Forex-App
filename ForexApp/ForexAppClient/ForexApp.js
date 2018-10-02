// JS library for ForexApp

var ForexApp = {
    ServerURL: "http://localhost:8007",
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
    ViewOrder : function(){
        ForexApp.GetAllTransactions();
    },
    SetDataModel : function(){
        // Create a data model to be used in application
    },
    GetDataModel : function() {
        // return Data model that are being used in application
    },
    GetAllTransactions : function(){
        var url = this.ServerURL + "/get_all_trans";
        $.ajax({
            url: url,
            type: "GET",
            cache: false,
            success: function(res){
                alert(JSON.stringify(res));
            }
          });
    },
    CreateTransaction : function (args){
        var params ={};
        var url = this.ServerURL + "/make_trans";
        $.ajax({
            url: url,
            type: "POST",
            data: params,
            cache: false,
            success: function(res){
                alert(JSON.stringify(res));
            }
          });
    },
    UpdateTransaction : function (args){
        // Send args to the server to update transactions
    }
}
