require 'pry'

###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

page "/documentation/plugins/*", layout: :plugins
page "/documentation/cloud-apps/*", layout: :cloud_apps
page "/documentation/reports/*", layout: :reports
page "/documentation/share/*", layout: :share

redirect "tax-docs/index.html", to: "../support/faq#how-do-i-get-paid"

# Proxy pages (https://middlemanapp.com/advanced/dynamic_pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Make all links relative to support testing on
# github.io/developers.spiceworks.com subdomain
set :relative_links, true
activate :directory_indexes

# Add support for GFM
set :markdown, tables: true,
               autolink: true,
               fenced_code_blocks: true,
               with_toc_data: true
set :markdown_engine, :redcarpet
activate :syntax

# Setup middleman-deploy
activate :deploy do |deploy|
  deploy.method = :git
  # Optional Settings
  # deploy.remote   = 'custom-remote' # remote name or git url, default: origin
  # deploy.branch   = 'custom-branch' # default: gh-pages
  # deploy.strategy = :submodule      # commit strategy: can be :force_push or :submodule, default: :force_push
  # deploy.commit_message = 'custom-message'      # commit message (can be empty), default: Automated commit at `timestamp` by middleman-deploy `version`
end

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
  set :debug_assets, true
end

# Methods defined in the helpers block are available in templates
helpers do
  def current_guide
    return @current_guide if @current_guide

    [data.plugin_guides, data.app_guides, data.report_guides, data.share_guides].each do |guide_list|
      guide_list.guides.each do |guide|
        guide_url = "#{guide_list.root}/#{guide.url}.html"
        guide_section_urls = Array(guide.sections).collect(&:url)
          .map{ |p| "#{guide_list.root}/#{p}.html" }.compact
        current_url = "/#{current_page.path}"
        if guide_url == current_url ||
          guide_section_urls.any?{ |u| u == current_url }
          return @current_guide = guide
        end
      end
    end
    @current_guide
  end

  def page_title
    current_guide.title if current_guide
  end

  def sidebar_for(guide_list)
    buffer = "<div class='aside-wrapper'><aside><nav class='sidebar'>"
    buffer << "<h4>#{guide_list.title}</h4>"
    buffer << "<ul class='nav' role='tablist'>"

    guide_list.guides.each do |guide|
      current = (current_guide && (guide.url == current_guide.url))
      middleman_url = guide.url.start_with?('//', '#') ? guide.url : "#{guide_list.root}/#{guide.url}.html"

      buffer << "<hr />" if guide.new_section
      buffer << "<li class='#{'active' if current}'>"
        buffer << link_to(guide.title, middleman_url)

        if guide.sections
          buffer << "<nav class='submenu'><ul class='nav'>"
          guide.sections.each do |section|
            url = section.url
            if url.nil?
              url = "##{section.title.parameterize}"
            elsif !url.start_with?('//', '#')
              url = "#{guide_list.root}/#{section.url}.html"
            end

            current = (url == "/#{current_page.path}")
            buffer << "<li class='#{'active' if current}'>"
            buffer << link_to(section.title, url)
            buffer << "</li>"
          end
          buffer << "</ul></nav>"
        end

      buffer << "</li>"
    end

    buffer << "</ul></nav></aside></div>"
    buffer
  end
end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
