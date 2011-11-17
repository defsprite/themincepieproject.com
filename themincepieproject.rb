require 'sinatra'
require 'haml'

set :public, "public"


get "/" do
  haml :index
end

get "/css/styles.css" do
  content_type 'text/css', :charset =>'utf-8'
  sass :styles
end

get "/css/ie.css" do
  content_type 'text/css', :charset =>'utf-8'
  sass :ie
end

get "/:name" do
  haml name.to_sym
end
