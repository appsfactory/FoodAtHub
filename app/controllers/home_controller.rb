include ActionView::Helpers::DateHelper

class HomeController < ApplicationController
  def index

   @food = Food.last
    if Food.checkMostRecent? and Food.checkTimeExpiry?
        @content = 
        { 
        	"status" => "YES", 
        	"time" => "Food was last seen " + time_ago_in_words(@food.updated_at) + " ago"
        }
    else
        @content = 
        {
        	"status" => "NO",
        	"time" => "Food has not been seen for " + time_ago_in_words(@food.updated_at)
        }
    end
	respond_to do |format|
		format.html # index.html.erb
		format.json { render :json => @content, :callback => params[:callback] }
	end
	
  end
  
end
 


