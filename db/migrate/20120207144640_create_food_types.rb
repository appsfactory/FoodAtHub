class CreateFoodTypes < ActiveRecord::Migration
  def change
    create_table :food_types do |t|
      t.string :type
      t.boolean :yes

      t.timestamps
    end
  end
end
