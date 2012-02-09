class FoodType < ActiveRecord::Base
	#food uniqueness
	scope :alphabetical, :order => "content ASC"
	
	def self.checkSameState (givenFood, givenState)
		kind = self.find(givenFood)
		#state = givenState === "true"? true : false
		state = (givenState === "true")
		kind.yes === state
	end
	
	def self.updateModel(givenFood, givenState)
		logger.debug "FoodType : updateModel"
		@kind = self.find(givenFood)
		@kind.yes = (givenState === "true")
		@kind.save
	end
	
	def self.status
		self.where(:yes=>true).count > 0
	end
	
	def self.clearAvailability
		self.update_all(:yes=>false)
	end
end
