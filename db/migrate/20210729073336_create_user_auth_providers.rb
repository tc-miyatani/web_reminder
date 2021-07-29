class CreateUserAuthProviders < ActiveRecord::Migration[6.0]
  def change
    create_table :user_auth_providers do |t|
      t.string :provider_name, null: false
      t.string :provider_id,   null: false

      t.references :user,      null: false, foreign_key: true

      t.timestamps
    end

    add_index :user_auth_providers, [:provider_id, :provider_name], unique: true
  end
end
