//Code that will handle the AJAX requests to the server.

function iWantFood(){
	
	Ext.Ajax.request({
		url: 'http://localhost:3000/food',
		timeout: 3000,
		method: 'GET',
		success: function(yay) {
			alert(yay);
		}
		error: function(nay) {
			alert('fail, but works!');
		}
	});
}