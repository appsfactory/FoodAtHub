var foods = new Array(),
    urlBase = 'http://foodatthehub.com',
    RGB_GREEN = 'rgb(148, 255, 112)',
    RGB_RED = 'rgb(255, 51, 0)';

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
        
        if( RGB_GREEN === e.style.background )
        {
            e.style.background = RGB_RED;
        }
    }
    
    $.ajax({
        url: urlBase + '/foods/clearFoodAvailability.json?callback=',
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
           url: urlBase + '/foods/pullFoodTypes.json',
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
        bttn.setAttribute( 'class', 'food');
        bttn.setAttribute('data-state', objs[i].yes)
        bttn.setAttribute('id', objs[i].id );
        var x = 'toggleColor(' + objs[i].id + ')';
        bttn.setAttribute('onClick', x );
        
        currentObj = objs[i];
        
        if(currentObj.yes === true)
        {
            bttn.style.background = RGB_GREEN;
        }
        else
        {
            bttn.style.background = RGB_RED;
        }
         
        table.appendChild(row);
        row.appendChild(cell);
        cell.appendChild(bttn);   
    }
}

function toggleColor(id)
{
    // Interestingly, if you set the variable all the way to backgroundColor,
    // assignement doesn't work. By setting it just to style and specifying
    // the property directly, it does. Weird.
    var currentStyle = document.getElementById(id).style,
        state = false;
    
    if( RGB_GREEN === currentStyle.backgroundColor ) {
      currentStyle.backgroundColor = RGB_RED;
      state = false;
    } else {
      currentStyle.backgroundColor = RGB_GREEN;
      state = true;
    }

    typeOfFood(id, state);  
    checkForFood();
}

//Pulls the stats in
function checkForFood() {
	$.ajax({
    url: urlBase + '/home/index.json',
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
    var s = document.getElementById('state'),
        m = document.getElementById('message');

    s.innerHTML = object.status;
    
    var titleMessage;
    if (object.status == "YES") { titleMessage = object.status + ", there is food"; }
    else { titleMessage = object.status +  ", there is no food"; }
	document.title = titleMessage + " - FoodAtTheHub";

    if(s.innerHTML.toString() == "YES")
    {
        s.style.color = RGB_GREEN;
        console.log('Yes');
    }
    else
    {
        s.style.color = RGB_RED;
        console.log('No');
    }

    m.innerHTML = object.time;
}

function iSawFood(whatYouSaw)
{
    $.ajax({
           url: urlBase + '/foods/food' + whatYouSaw + '/hack.json',
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
      url: urlBase + '/foods/changeAvailability.json?'+ ajaxData,
      type: 'GET',
      async: false,
      success: function(results) {
        console.log('State changed!');
      },
      error: function(error) {
        console.log(error);
      }
    });
}
