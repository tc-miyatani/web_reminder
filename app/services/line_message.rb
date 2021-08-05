class LineMessage
  MESSAGE_API_URI = 'https://api.line.me/v2/bot/message/multicast'
  HEADERS = {
    'Authorization' => "Bearer #{ENV['LINE_ACCESS_TOKEN']}",
    'Content-Type' => 'application/json'
  }
  POST_FORMAT = {
    to: [],
    messages: [{ type: 'text', text: '' }]
  }

  def self.send_reminder(reminder)
    user_auth_provider = reminder.user.user_auth_provider

    post_data = POST_FORMAT.deep_dup
    post_data[:to][0] = user_auth_provider.provider_id
    post_data[:messages][0][:text] = reminder.message

    uri = URI.parse(MESSAGE_API_URI)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = uri.scheme === 'https'
    response = http.post(uri.path, JSON.generate(post_data), HEADERS)
    response
  end
end
