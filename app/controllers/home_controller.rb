include ActionView::Helpers::DateHelper

class HomeController < ApplicationController
  def index

   @food = Food.last
    if Food.checkMostRecent? && Food.checkTimeExpiry?
        @content = 
        { 
        	"status" => "YES", 
        	"time" => "Food was last seen " + time_ago_in_words(@food.updated_at) + " ago",
        	"typeStatus" => FoodType.status
        }
    else
    	FoodType.clearAvailability
        @content = 
        {
        	"status" => "NO",
        	"time" => "Food has not been seen for " + time_ago_in_words(@food.updated_at),
        	"typeStatus" => FoodType.status
        }
    end
    logger.debug "Food.checkMostRecent?: " + Food.checkMostRecent?.to_s
    logger.debug "Food.checkTimeExpiry?: " + Food.checkTimeExpiry?.to_s
    logger.debug "FoodType.status: " + FoodType.status.to_s
	respond_to do |format|
		format.html # index.html.erb
		format.json { render :json => @content, :callback => params[:callback] }
	end
	
  end
  
end
 


