desc "This task is called by the Heroku scheduler add-on"
task :send_tweet => :environment do
    foods.foodTweet
end
