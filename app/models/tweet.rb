class Tweet < ActiveRecord::Base
	def change
	  create_table :tweets do |t|
  	    t.string :text
  	    t.string :oldest
	    t.timestamps
    end
  end
end
