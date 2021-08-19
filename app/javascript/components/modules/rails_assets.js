
const rails_assets = (asset) => rails_assets.assets[asset];

rails_assets.bg = (asset) => `url("${rails_assets(asset)}")`;

rails_assets.setAssets = (props) => {
  rails_assets.assets = props.rails_asset_path;
};

export default rails_assets;
