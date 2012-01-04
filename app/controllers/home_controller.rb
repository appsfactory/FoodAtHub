class HomeController < ApplicationController
  def index
    #placeholder, for now
  	@items = { @yes => true, @test => "something" }
		
		respond_to do |format|
			format.html # index.html.erb
			format.json { render :json => @items, :callback => params[:callback] }
		end
  end

end
