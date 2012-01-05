class Food < ActiveRecord::Base

	def checkTimeExpiry?
	@food = Food.last
		c = self.where('updated_at >= ?', 10.seconds.ago).count
		c > 0 ? true : false
		if  c > 0
		 @food.yes = true
		else
		 @food.yes = false
		end
	end
	
end
 

