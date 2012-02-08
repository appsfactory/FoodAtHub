var foods = new Array();

$(document).ready( function() {

checkForFood();
getFood();
                  
$('#thereIsFood').click( function() {
    iSawFood('Yes');
    checkForFood();
});

$('#itsAllGone').click( function() {
    iSawFood('No');
    checkForFood();
});

$('#itsAllGone').click( toggleColor );
$('#sandwiches').click( function() {toggleColor('sandwiches')});
$('#cookies').click( function() {toggleColor('cookies')} );
$('#deserts').click( toggleColor );
$('#fruits').click( toggleColor );
$('#salad').click( toggleColor );
$('#pizza').click( toggleColor );
$('#cheese').click( toggleColor );
$('#veggies').click( toggleColor );
$('#drinks').click( toggleColor );
$('#other').click( toggleColor );

                  
});


function getFood()
{
    $.ajax({
           url: 'http://falling-earth-1135.herokuapp.com/foods/pullFoodTypes.json',
           dataType: 'jsonp',
           callbackParameter: 'jsoncallback',
           timeout: 5000,
           success: function(results){
           foods = results;
           
            popButtons(foods);
           
           },
           error: function(error, x, y){
            console.log('failed');
            console.log(error);
            console.log(x);
            console.log(y);	
           }
           })
}

function parseFood(foods)
{
    var foodArray = foods;
    
    
}

var row;
var currentObj;

function popButtons(buttons)
{
    var objs = buttons;
    var rowId = 0;
    
    var table = document.getElementById('tableOfButtons');
    var cell;
    var bttn;
    
    for(var i = 0; i < objs.length; i++)
    {
        if(i%3 == 0)
        {
            row = document.createElement('tr');
        }
        
        cell = document.createElement('td');
        bttn = document.createElement('button');
        
        cell.setAttribute( 'align', 'center');
        bttn.innerHTML = objs[i].content;
        bttn.setAttribute( 'class', 'food');
        bttn.setAttribute('data-state', objs[i].yes)
        
        currentObj = objs[i];
        
        if(currentObj.yes === true)
        {
            bttn.style.background = "#94FF70";
        }
        else
        {
            bttn.style.background ='#FF3300';
        }
        
        table.appendChild(row);
        row.appendChild(cell);
        cell.appendChild(bttn);   
    }
}

function toggleColor(name)
{
    var colour = document.getElementById(name);
    
    if(colour.style.background = "rgb(250, 51, 0)")
    {
        var c = '#'+ name;
        $(c).css( 'background', '#94FF70');
    }
    else
    {
        var c = '#'+ name;
        $(c).css( 'background', '#FF3300');
    }
}

//Pulls the stats in
function checkForFood() {
	$.ajax({
           url: 'http://falling-earth-1135.herokuapp.com/home/index.json',
           dataType: 'jsonp',
           callbackParameter: 'jsoncallback',
           timeout: 3000,
           success: function(results){
            update(results);
           },
           error: function(error){
           console.log(error);
           }
           })
};

function update(object)
{
    var s = document.getElementById('state');
    var m = document.getElementById('message');
    s.innerHTML = object.status;
    
    
    if(s.innerHTML.toString() == "YES")
    {
        s.style.color = 'green';
        console.log('Yes');
    }
    else
    {
        s.style.color = 'red';
        console.log('No');
    }
    m.innerHTML = object.time;

}

function iSawFood(whatYouSaw)
{
    $.ajax({
           url: 'http://falling-earth-1135.herokuapp.com/foods/food' + whatYouSaw + '/hack.json',
           type: 'POST',
           async: false,
           success: function(results)
           {
           console.log('State changed!');
           },
           error: function(error)
           {
           console.log(error);
           }
           });
}