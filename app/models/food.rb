class Food < ActiveRecord::Base

	def checkTimeExpiry?
		c = self.where('updated_at >= ?', 20.minutes.ago).count
		c > 0 ? true : false
	end
	
end
 

