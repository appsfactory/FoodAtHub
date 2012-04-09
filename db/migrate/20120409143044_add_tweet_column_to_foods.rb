class AddTweetColumnToFoods < ActiveRecord::Migration
  def up
  	add_column :foods, :tweet, :string, :newtweet
  end

  def down
	remove_column :foods, :tweet, :newtweet
  end
end
