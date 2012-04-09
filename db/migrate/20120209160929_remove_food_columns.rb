class RemoveFoodColumns < ActiveRecord::Migration
  def up
  	remove_column :foods, :cheese
  	remove_column :foods, :dessert
  	remove_column :foods, :drinks
  	remove_column :foods, :fruit
  	remove_column :foods, :other
  	remove_column :foods, :pizza
  	remove_column :foods, :salad
  	remove_column :foods, :sandwiches
  	remove_column :foods, :veggies
  end

  def down
=begin
    add_column :foods, :cheese
  	add_column :foods, :dessert
  	add_column :foods, :drinks
  	add_column :foods, :fruit
  	add_column :foods, :other
  	add_column :foods, :pizza
  	add_column :foods, :salad
  	add_column :foods, :sandwiches
  	add_column :foods, :veggies
=end
  end
end
