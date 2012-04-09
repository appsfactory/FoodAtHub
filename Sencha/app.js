var App = new Ext.Application({
    name : 'FoodAtTheHub',
    useLoadMask : true,
    launch : function () {		

				var	foodString = 'NO';
				var timeString = 'There has been no food for over 9000 seconds';

				FoodAtTheHub.views.foodToolbar = new Ext.Toolbar({
						id: 'foodToolbar',
						title: 'FoodAtTheHub.com',
						height : 46,
						width : 320,
						maxWidth : 320
				});

				FoodAtTheHub.views.firstButton = new Ext.Button({
						id : 'firstButton',
						text : "I'm a button!",
						scale : 'small',
						width : 80,
						height : 70
				});

				FoodAtTheHub.views.secondButton = new Ext.Button({
						id : 'secondButton',
						text : "Me too!",
						scale : 'small',
						width : 80,
						height : 70
				});
		
				FoodAtTheHub.views.buffer = new Ext.Panel({
						id : 'buffer',
						height : 30
				});

				FoodAtTheHub.views.buttonContainer = new Ext.Panel({
						id : 'buttonContainer',						
						width : 200,
						height : 300,
						dockedItems : [FoodAtTheHub.views.firstButton, FoodAtTheHub.views.buffer, FoodAtTheHub.views.secondButton]
				});

				FoodAtTheHub.views.textContainer = new Ext.Panel({
						id : 'textContainer',						
						html : '<DIV align="center"><p style="font-size:500%">'.concat(foodString, '</p></DIV>'),
						fullscreen : false,
						height: 84
				});

				FoodAtTheHub.views.textContainer2 = new Ext.Panel({
						id : 'textContainer2',						
						html : '<DIV align="center"><p>'.concat(timeString, '</p></DIV>'),
						fullscreen : false,
						height : 60
				});

				FoodAtTheHub.views.foodContainer = new Ext.Panel({
						id : 'foodContainer',	
						height: 480,
						width : 320,
						dockedItems : [FoodAtTheHub.views.foodToolbar, FoodAtTheHub.views.textContainer, FoodAtTheHub.views.buffer, FoodAtTheHub.views.textContainer2,FoodAtTheHub.views.buffer,  FoodAtTheHub.views.buttonContainer]
				});
				
				FoodAtTheHub.views.viewport = new Ext.Panel({
						id : 'viewPort',						
						maxWidth : 320,
						fullscreen : true,
						border : 3,
						dockedItems : [FoodAtTheHub.views.foodContainer]
				});
				
    }
})
