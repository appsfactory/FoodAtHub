class CreateFoods < ActiveRecord::Migration
  def change
    create_table :foods do |t|
      t.boolean :yes
      t.text :content

      t.timestamps
    end
  end
end
