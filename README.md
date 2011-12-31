# Food at the Hub
## Is there food at Communitch Hub?

Oftentimes, there is food at Communitech Hub. But if you're REALLY REALLY lazy, it'd be nice to just pop open your browser or an app and find out if someone's put something yummy out.

This is a test project for the Communitech Apps Factory. It features a database, Rails server, API, web page and mobile client.

## Directory Structure

Because this is going to be hosted on Heroku and I'm too lazy to break it into multiple repositories, everything that isn't part of the rails project is in the Other directory.

## Setup
Requires Postgres 8.3 be installed.

Create a role 'hubfood' and a new database 'hubfood' with said user as the owner.

## Thoughts
Rambling about what I want to have happen.

I want the site to be updated when there is food available. I want it 
available through mobile devices and a website, but otherwise pretty
simple stuff.

The question is how the behaviour should work. AT some point or another the site receives
notification that food exists (implying the default state is No, which makes sense) 

So, someone sends a YES. The obvious thing is to switch the state to true, there's
not so many people who would game the system (probably) that would require many many 
people to send a yes. So, one yes does the trick for now.

There's probably some sort of half-life on food, so if the yes state is older than 10 
minutes, it is probably state and old than 20 with no additional YESes, it is definitely old.

So that's pretty simple. Get all the YESes within the past 20 minutes (maybe an hour?)
and the number of yeses sets the intensity. 

If no yeses in that time frame, get the last known yes for the "no food for x hours" message. 

Or should that be inverted? Last one, check it, if yes get more? That seems to be the lesser intense action


