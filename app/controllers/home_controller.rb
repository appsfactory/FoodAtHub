class HomeController < ApplicationController
  def index
   @food = Food.last
      if @food.yes == true
        @content = { "status" => "YES"}
      else
        @content = { "status" => "NO" }
      end
	respond_to do |format|
		format.html # index.html.erb
		format.json { render :json => @food, :callback => params[:callback] }
	end
  end
end
 


