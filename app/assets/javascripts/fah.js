var foods = new Array();

$(document).ready( function() {

checkForFood();
getFood();

$('#itsAllGone').click( function() {
    iSawFood('No');
    checkForFood();
    clearAll();
});


});


function clearAll()
{
    var count;
    
    for(count = 0; count < foods.length; count++)
    {
        var e = document.getElementById(count+1);
        if($(e).attr('class') == 'foodYes')
        {
            $(e).attr('class','foodNo');
        }
    }
    
    $.ajax({
           url: 'http://falling-earth-1135.herokuapp.com/foods/clearFoodAvailability.json?callback=',
           type: 'GET',
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
    
    checkForFood();
}

function bindBttns(array)
{
    var subArray = array;
    
    for(var i = 0; i < subArray.length; i++)
    {
        var string = '#' + subArray[i].id;
        var s = string.toString();
        $(s).bind('click', toggleColor(subArray[i].id));
    };
}


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

var row;


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
        bttn.setAttribute( 'class', 'foodYes');
        bttn.setAttribute('data-state', objs[i].yes)
        bttn.setAttribute('id', objs[i].id );
        var x = 'toggleColor(' + objs[i].id + ')';
        bttn.setAttribute('onClick', x );
        
        currentObj = objs[i];
        
        if(currentObj.yes === true)
        {

            $(bttn).attr('class','foodYes');
        }
        else
        {
            $(bttn).attr('class','foodNo');
        }
         
        table.appendChild(row);
        row.appendChild(cell);
        cell.appendChild(bttn);   
    }
}

function toggleColor(id)
{
    var currentBttn = document.getElementById(id);
    var state;
    console.log($(currentBttn));
    
    if($(currentBttn).attr('class') == 'foodNo')
    {
        $(currentBttn).attr('class','foodYes');
        state = true;
        
    }
    else if($(currentBttn).attr('class') == 'foodYes')
    {
       $(currentBttn).attr('class','foodNo');
        state = false;
    }
    
    console.log( id + ": " + state);
    typeOfFood(id, state);  
    checkForFood();
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
        s.style.color = '#84c54c';
        console.log('Yes');
    }
    else
    {
        s.style.color = '#e86642';
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

function typeOfFood(id, state)
{
    
    var ajaxData = 'foodID=' + id + '&state=' + state;
    
    $.ajax({
           url: 'http://falling-earth-1135.herokuapp.com/foods/changeAvailability.json?'+ ajaxData,
           type: 'GET',
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
