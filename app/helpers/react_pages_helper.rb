module ReactPagesHelper
  EXTENSIONS = ['jpg', 'png']

  def assets_all
    assets_hash = {}
    EXTENSIONS.each do |ext|
      Dir.glob(Rails.root.join('app', 'assets', 'images', "*.#{ext}").to_s) do |filepath|
        filename = File.basename(filepath)
        assets_hash[filename] = asset_path(filename)
      end
    end
    assets_hash
  end
end
