class HomeController < ApplicationController
  def index

   @food = Food.lastYes
    if Food.checkTimeExpiry?
        @content = 
        { 
        	"status" => "YES", 
        	"words" => "Food was last seen ", "end" => " ago",
        }
    else
        @content = 
        {
        	"status" => "NO",
        	"words" => "Food has not been seen for ",
        	"end" => "" 
        }
    end
	respond_to do |format|
		format.html # index.html.erb
		format.json { render :json => @food, :callback => params[:dc] }
	end
	
  end
  
end
 


