# If you do not have OpenSSL installed, update
# the following line to use "http://" instead
source 'https://rubygems.org'

gem "middleman", "~>3.3.10"

# Live-reloading plugin
gem "middleman-livereload", "~> 3.1.0"

# For easy deployment to GH Pages
gem 'middleman-deploy', '~> 1.0'

# For faster file watcher updates on Windows:
gem "wdm", "~> 0.1.0", :platforms => [:mswin, :mingw]

# Windows does not come with time zone data
gem "tzinfo-data", platforms: [:mswin, :mingw]

# Use redcarpet for markdown to support GFM
gem "redcarpet"
gem "middleman-syntax"

# Vendor Assets
gem 'jquery-rails', '~> 3.1', require: false
gem 'bootstrap-sass', '~> 3.1', require: false
gem 'underscore-rails', '~> 1.5', require: false
gem 'sui', '~> 2.4', require: false, source: "http://gem-server.spice.spiceworks.com/"
gem 'rails-assets-zeroclipboard', require: false, source: "https://rails-assets.org"

group :development, :test do
  gem 'pry'
end
