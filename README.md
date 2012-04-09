# Food at the Hub

## MIT License
Open Source Initiative OSI - The MIT License (MIT):Licensing

The MIT License (MIT)
Copyright (c) 2012 Communitech Inc

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Is there food at Communitch Hub?

Oftentimes, there is food at Communitech Hub. But if you're REALLY REALLY lazy, it'd be nice to just pop open your browser or an app and find out if someone's put something yummy out.

This is a test project for the Communitech Apps Factory. It features a database, Rails server, API, web page and mobile client.

## Directory Structure

Because this is going to be hosted on Heroku and I'm too lazy to break it into multiple repositories, everything that isn't part of the rails project is in the Other directory.

## Setup
Requires Postgres 8.3 be installed.

Create a role 'hubfood', should have admin-level (esp createdb) privileges.

## Specifications 
These are pretty lightweight.

This site has a web component (via Rails) and a mobile client (via PhoneGap). The Rails project will serve normal web pages but also expose functionality to be used by the mobile client via Ajax.

The default state of the site is NO, because most of the time there is no food.

There are two forms of interaction available, a button to indicate that there is food, or one to indicate there is not food.

So, someone sends a YES, through the web or mobile client. Until it is proven otherwise (e.g. if people start gaming the system for some reason I can't predict) we can add more complexity but otherwise any single indication changes the state of the site.

There's probably some sort of half-life on food, so if the yes state is older than 10 
minutes, it is probably state and old than 20 with no additional YESes, it is definitely old.

So that's pretty simple. Get all the YESes within the past 20 minutes (maybe an hour?)
and the number of yeses sets the intensity. 

If no yeses in that time frame, get the last known yes for the "no food for x hours" message. 

Or should that be inverted? Last one, check it, if yes get more? That seems to be the lesser intense action
