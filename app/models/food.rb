class Food < ActiveRecord::Base

	def self.lastYes
		self.where(:yes => true).last
	end

	def self.checkTimeExpiry?
		@food = Food.lastYes
		
		if (@food.updated_at >= 10.seconds.ago)
			@food.yes = true
		else
			@food.yes = false
		end
	end
	
	def self.checkMostRecent?
		@food = Food.last
		@food.yes ? true : false
	end
	
end
 

