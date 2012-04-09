class AddTweetColumnToFoods < ActiveRecord::Migration
  def up
  	add_column :foods, :tweet, :string
  end

  def down
	remove_column :foods, :tweet
  end
end
