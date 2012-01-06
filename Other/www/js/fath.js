var stat = '';
var message = '';

function iWantFood() {
	Ext.Ajax.request({
		url: 'http://falling-earth-1135.herokuapp.com/home/index.json',
		timeout: 3000,
		method: 'GET',
		success: function(results) {
			if(results.yes)
			{
				stat = 'Yes!';
				message = 'Food last seen at ' + results.updated_at;
			}
			else
			{
				stat = 'No :(';
				message = 'No food as of ' + results.updated_at;
			}
			
		},
		failure: function(nay) {
			alert('Ooops! Something went wrong! :S');
			stat = 'Dunno!';
			message = 'You probably dont have an internet connection, or I messed up!';
			//Ext.MessageBox.alert('failed, but works!');
		}
	});
};

iWantFood();

/*The app as of Jan. 5.
TODO:
Fix the layout (Mostly bugs with the width
Have all the initial variables fetch their data from the server
Give buttons the proper functionality
Decide whether to remove most containers, or keep them as is.
*/
var App = new Ext.Application({
    name : 'FoodAtTheHub',
    useLoadMask : true,
    launch : function launch() {		
    
				//These are the initial variables that will hold the data to display on the webpage. Currently static, they should soon be updated to change to the appropriate setting when the page loads
				var firstButtonString = "Yes!";
				var secondButtonString = "All Gone :(";
				var foodToolBarString = 'FoodAtTheHub.com';
				
				
				
				//The toolbar at the top of the screen, mostly decorative.
				FoodAtTheHub.views.foodToolbar = new Ext.Toolbar({
						id: 'foodToolbar',
						title: foodToolBarString,
						height : 46,
						width : 320,
						maxWidth : 320
				});

				//The first button to display
				FoodAtTheHub.views.firstButton = new Ext.Button({
						id : 'firstButton',
						text : firstButtonString,
						scale : 'small',
						width : 200,
						height : 40,
						stretch : false,
						ui : 'confirm-round',
						handler : function() {
								//Ajax Request.
								iWantFood();
								FoodAtTheHub.views.textContainer.update('<DIV align="center"><p style="font-size:500%">' + stat + '</p></DIV>');
								FoodAtTheHub.views.textContainer2.update('<DIV align="center"><p>' + message + '</p></DIV>');
						}
				});
				
				//The second button to display
				FoodAtTheHub.views.secondButton = new Ext.Button({
						id : 'secondButton',
						text : secondButtonString,
						scale : 'small',
						width : 200,
						height : 40,
						ui : 'decline-round',	
						stretch : false,
						handler : function() {
								//Ajax Request.
								iWantFood();
								FoodAtTheHub.views.textContainer.update('<DIV align="center"><p style="font-size:500%">' + stat + '</p></DIV>');
								FoodAtTheHub.views.textContainer2.update('<DIV align="center"><p>' + message + '</p></DIV>');
						}
				});
				
				var buttons = [FoodAtTheHub.views.firstButton, 
											{xtype: 'spacer',
											 height: 20								
											}, FoodAtTheHub.views.secondButton];
				
				//A buffer to keep things in line. I'm pretty sure there's an easier way, so this is probably just temporary
				FoodAtTheHub.views.buffer = new Ext.Panel({
						id : 'buffer',
						height : 30
				});

				//This is a container to keep the buttons in check.
				FoodAtTheHub.views.buttonContainer = new Ext.Panel({
						id : 'buttonContainer',						
						width : 200,
						layout: {type: 'hbox', pack: 'center', align: 'stretch'},
						height : 300,
						items: [{items: buttons}]
				});

				//The first text container, contains only the yes/no answer
				FoodAtTheHub.views.textContainer = new Ext.Panel({
						id : 'textContainer',						
						html : '<DIV align="center"><p style="font-size:500%">' + stat + '</p></DIV>',
						fullscreen : false,
						height: 84
				});

				//The second text container, contains the time string
				FoodAtTheHub.views.textContainer2 = new Ext.Panel({
						id : 'textContainer2',						
						html : '<DIV align="center"><p>' + message + '</p></DIV>',
						fullscreen : false,
						height : 60
				});

				//The food container, contains everything with proper buffers to seperate
				FoodAtTheHub.views.foodContainer = new Ext.Panel({
						id : 'foodContainer',	
						height: 480,
						width : 320,
						stretch: false,
						dockedItems : [FoodAtTheHub.views.foodToolbar, FoodAtTheHub.views.textContainer, FoodAtTheHub.views.buffer, FoodAtTheHub.views.textContainer2,FoodAtTheHub.views.buffer,  FoodAtTheHub.views.buttonContainer]
				});
				
				//The main view, displays the food containers
				FoodAtTheHub.views.viewport = new Ext.Panel({
						id : 'viewPort',						
						maxWidth : 320,
						fullscreen : true,
						border : 3,
						dockedItems : [FoodAtTheHub.views.foodContainer]
				});
				
    }
})
