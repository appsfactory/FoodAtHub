class AddOldTweetColumnToFoods < ActiveRecord::Migration
  def up
  	add_column :foods, :oldTweet, :string
  end

  def down
	remove_column :foods, :oldTweet
  end
end
