class AddFoodColumns < ActiveRecord::Migration
  def up
    add_column :foods, :cheese, :boolean
    add_column :foods, :dessert, :boolean
    add_column :foods, :drinks, :boolean
    add_column :foods, :fruit, :boolean
    add_column :foods, :other, :boolean
    add_column :foods, :pizza, :boolean
    add_column :foods, :salad, :boolean
    add_column :foods, :sandwiches, :boolean
    add_column :foods, :veggies, :boolean
  end

  def down
    remove_column :foods, :cheese, :boolean
    remove_column :foods, :dessert, :boolean
    remove_column :foods, :drinks, :boolean
    remove_column :foods, :fruits, :boolean
    remove_column :foods, :other, :boolean
    remove_column :foods, :pizza, :boolean
    remove_column :foods, :salad, :boolean
    remove_column :foods, :sandwiches, :boolean
    remove_column :foods, :veggies, :boolean
  end
end
