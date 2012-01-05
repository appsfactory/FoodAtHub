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

var App = new Ext.Application({
    name : 'FoodAtTheHub',
    useLoadMask : true,
    launch : function () {		
	
				FoodAtTheHub.views.foodToolbar = new Ext.Toolbar({
						id: 'foodToolbar',
						title: 'FoodAtTheHub.com'
				});
				
				FoodAtTheHub.views.bottomToolbar = new Ext.Toolbar({
						title: 'bottomToolbar',
						layout : 'hbox',
						items:[
								{
										text: 'Still there!',
										ui : 'action',
										handler: function(){
											iWantFood();
										}
								},
								{	xtype: 'spacer' },
								{
										text: 'Food is gone',
										ui: 'action',
										handler: function() {
											iWantFood();
										}
								}
						]
				});

				FoodAtTheHub.views.textContainer = new Ext.Panel({
						html : '<DIV align="center"><P><font size=72> NO </font></P><P> This is where the time will go.</P></DIV>',
						fullscreen : false,
						layout : 'card',
						cardAnimation : 'slide',
				});

				FoodAtTheHub.views.foodContainer = new Ext.Panel({
						fullscreen : true,
						layout : 'card',
						cardAnimation : 'slide',
						dockedItems : [FoodAtTheHub.views.foodToolbar, FoodAtTheHub.views.textContainer, FoodAtTheHub.views.bottomToolbar]
				});
				

				FoodAtTheHub.views.viewport = new Ext.Panel({
						dockedItems : [FoodAtTheHub.views.foodContainer]
				});
				
    }
})



