class AddAuthTypeToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :auth_type, :integer, null: false, default: 0
  end
end
