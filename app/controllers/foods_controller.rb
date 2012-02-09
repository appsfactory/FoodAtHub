class FoodsController < ApplicationController
  # GET /foods
  # GET /foods.json
  def index
    @foods = Food.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @foods }
    end
  end

  # GET /foods/1
  # GET /foods/1.json
  def show
    @food = Food.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @food }
    end
  end

  # GET /foods/new
  # GET /foods/new.json
  def new
    @food = Food.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @food }
    end
  end

  # GET /foods/1/edit
  def edit
    @food = Food.find(params[:id])
  end

  # POST /foods
  # POST /foods.json
  def create
    @food = Food.new(params[:food])

    respond_to do |format|
      if @food.save
        format.html { redirect_to @food, notice: 'Food was successfully created.' }
        format.json { render json: @food, status: :created, location: @food }
      else
        format.html { render action: "new" }
        format.json { render json: @food.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /foods/1
  # PUT /foods/1.json
  def update
    @food = Food.find(params[:id])

    respond_to do |format|
      if @food.update_attributes(params[:food])
        format.html { redirect_to @food, notice: 'Food was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @food.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /foods/1
  # DELETE /foods/1.json
  def destroy
    @food = Food.find(params[:id])
    @food.destroy

    respond_to do |format|
      format.html { redirect_to foods_url }
      format.json { head :ok }
    end
  end
  
  def foodYes
   @food = Food.new
   @food.yes = true
   saved = @food.save
   #input logic to deal with changing availability on FoodType
   respond_to do |format|
   	format.html { redirect_to root_url, notice: 'Button press was recognized.' }
   	format.json {render :json => { "result" => saved }, :callback => params[:callback] }
   end
 end
   
  def foodNo
   @food = Food.new
   @food.yes = false
   saved = @food.save
	#input logic to set all in FoodType to :yes=>false
   respond_to do |format|
   	format.html { redirect_to root_url, notice: 'Button press was recognized.' }
   	format.json {render :json => { "result" => saved }, :callback => params[:callback] }
   end
 end
 
 
 ####PULLS AND UPDATES FOOD AVAILABILITY####
 def pullFoodTypes
 	@foodTypes = FoodType.alphabetical
 	
 	respond_to do |format|
 		format.json { render json: @foodTypes, :callback=>params[:callback] } 
 	end
 end
 
 
 def changeAvailability
 	kind = params[:foodID]
 	state = params[:state]
 	
 	#bool = FoodType.checkSameState(kind,state)
 	#logger.debug "checkSameState:"+bool.to_s
 	
 	 respond_to do |format|
 	  	if FoodType.checkSameState(kind,state)
 			format.json { render :json=> {:status=>"unnecessary save"}, :callback=>params[:callback] }
 		else	
 			FoodType.updateModel(kind,state)
 			logger.debug "FoodType status:"+FoodType.status.to_s
 		
 			new = FoodType.status
 			Food.create(:yes=>new)
 			format.json { render :json=> {:status=>"save successful"}, :callback=>params[:callback] }
 		end
 	end
 end
 	
end
