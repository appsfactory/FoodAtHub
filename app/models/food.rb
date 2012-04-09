class Food < ActiveRecord::Base
	scope :chronological, :order => "updated_at DESC"

	$currentTweet = ""
	$oldTweet = ""
	
	def self.tweets
		["NA", "NA"]
	end

	def self.lastYes
		self.where(:yes => true).last
	end

	def self.checkTimeExpiry?
		@food = Food.lastYes
		
		if (@food.updated_at >= 30.minutes.ago)
			@food.yes = true
		else
			@food.yes = false
		end
	end
	
	def self.checkMostRecent?
		@food = Food.last
		@food.yes ? true : false
	end

	def self.setMyTweet (tweet)
		@food = Food.new
		@food.newtweet = tweet
		@food.save
 	end
 
 	def self.foodTweet
 		$oldTweet = Food.last.tweet
		$currentTweet = Food.last.newtweet

	 	logger.debug("#################################")
	 	logger.debug("Current: " + $currentTweet)
	 	logger.debug("Old: " + $oldTweet)
	 	logger.debug("#################################")
	 	
	 	if $currentTweet != $oldTweet
		 	require "twitter"
		 	logger.debug "METHOD: foodTweet"
		 	
		 	#FoodAtTheHubDEV#
		 	Twitter.configure do |config|
			  config.consumer_key = 'zYT20h9PeCyY7Pq67iiIg'
			  config.consumer_secret =  '4zcgT2uvxX2yBcWi1Aq6EuJ4aKlIgrNdayOlIjDvH8'
			  config.oauth_token = '487604905-fLdkBI1NDA8ZK7ip1PL4mp5AT4EBgJrdxJsuhlQr'
			  config.oauth_token_secret = 'ncgf5iSsvQ5quJvxfA1etMeTUd9eEXpcCArAoYecqdc'
		    end

			t = Time.now.in_time_zone("Eastern Time (US & Canada)")
	 			time_string = t.strftime("as of %m/%d/%Y at %I:%M%p") 
	 			logger.debug "TIMESTAMP: " + time_string

=begin
		 	Twitter.configure do |config|
			  config.consumer_key = 'tSmelriB9VXz0UvMhUAa0g'
			  config.consumer_secret =  'QcEggfsxTd6klsc6iBHAlZGNfqz4vwIPXgqMjEnGE0'
			  config.oauth_token = '487620227-CMUygK7m4JZbmgc1oafOimZKHeFm70C1IQIR3PHF'
			  config.oauth_token_secret = 'zhlPBaisIX0EE1ejxewU1OQ1bGhy2rCuVoUCsxZhUc'
			end
=end
		
			@twitter = Twitter::Client.new
			@twitter.update($currentTweet + "(" + time_string + ")")

			@food = Food.new
			@food.tweet = $currentTweet
			@food.save
			
		end
	end
end
