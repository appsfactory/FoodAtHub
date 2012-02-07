class CreateFoodTypes < ActiveRecord::Migration
  def change
    create_table :food_types do |t|
      t.string :content
      t.boolean :yes

      t.timestamps
    end
  end
end
