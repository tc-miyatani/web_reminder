require 'omniauth-oauth2'

module OmniAuth
  module Strategies
    class Line < OmniAuth::Strategies::OAuth2
      option :authorize_params, {
          # 公式アカウントを友だちに追加するの表示方法
          # normal: 同意画面に表示, aggressive: 同意画面とは別に表示
          bot_prompt: 'aggressive',
          # 権限付与同意画面を毎回表示する
          # 毎回表示をOFFにする場合は以下をコメントアウト
          prompt: 'consent'
      }
    end
  end
end
