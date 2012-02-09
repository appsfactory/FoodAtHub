class Food < ActiveRecord::Base
	scope :chronological, :order => "updated_at DESC"

	def self.lastYes
		self.where(:yes => true).last
	end

	def self.checkTimeExpiry?
		@food = Food.lastYes
		
		if (@food.updated_at >= 20.minutes.ago)
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
 

