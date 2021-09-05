class CreateWeekdays < ActiveRecord::Migration[6.0]
  def change
    create_table :weekdays, id: false do |t|
      t.integer :id,   primary_key: true
      t.string  :text, null: false
      t.timestamps
    end
  end
end
