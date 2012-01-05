//Code that will handle the AJAX requests to the server.

function iWantFood(){
	
	Ext.Ajax.request({
		url: 'http://localhost:3000/food.json',
		timeout: 3000,
		method: 'GET',
		success: function(yay) {
			alert(yay);
		},
		failure: function(nay) {
			alert('nay');
			//Ext.MessageBox.alert('failed, but works!');
		}
	});
}