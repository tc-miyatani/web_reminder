class CreateUserProviders < ActiveRecord::Migration[6.0]
  def change
    create_table :user_providers do |t|
      t.string :provider_name, null: false
      t.string :provider_id,   null: false

      t.references :user,      null: false, foreign_key: true

      t.timestamps
    end

    add_index :user_providers, [:user_id, :provider_id, :provider_name],
      unique: true, name: 'idx_user_providers_user_id_provider_id_name'
  end
end
