class Food < ActiveRecord::Base

	def checkTimeExpiry?
		@food = Food.last
		
		if (@food.updated_at >= 10.seconds.ago)
			@food.yes = true
		else
			@food.yes = false
		end
	end
	
end
 

