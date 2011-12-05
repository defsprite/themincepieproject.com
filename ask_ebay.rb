require "open-uri"
require "json"

# TODO: save parsing the chef_data.txt each time

CHEFS = []
EBAY_API_URL = "http://open.api.ebay.com/shopping?appid=Christop-5831-4ff4-9ba6-183e33d0c1de&version=517&siteid=3&callname=GetMultipleItems&responseencoding=JSON&callback=false&"
CHEF_INFO = {}

file = File.new("chef_data.txt", "r")
while (line = file.gets)
  CHEFS << line.gsub(/\s+$/,'')
end
file.close

i = 0
item_ids = []
CHEFS.each_slice(6) do |fields|
 # file.puts "'#{fields[4].to_i+(i += 1)}': {name: '#{fields[0]}', link: '#{fields[3]}', imageurl: '/images/chefs/thumbs/#{fields[0].gsub(/\s+/,"_").downcase}.png'},"
 item_id = "#{fields[4].to_i+i}"
 item_ids << item_id
 CHEF_INFO[item_id] = {:name => "#{fields[0]}", :link => "#{fields[3]}", :image => "#{fields[0].gsub(/\s+/,"_").downcase}.png"}
 i += 1
end

responses = []

item_ids.each_slice(19) do |a|
  url = EBAY_API_URL+a.each_with_index.map{|id, idx| "ItemID(#{idx})=#{id}"}.join("&")
  responses << JSON.parse(open(url).read)
end

items = []

responses.each do |res|
  items.concat(res['Item'] || [])
end

items.sort! {|a, b| b['ConvertedCurrentPrice']['Value'].to_f <=> a['ConvertedCurrentPrice']['Value'].to_f }

items.each do |item|
  CHEF_INFO[item['ItemID']].merge!({:price => item['ConvertedCurrentPrice']['Value'], :bids => item['BidCount'] })
end

file = File.new("ebay-auctions.js", "w")
file.puts "updateAuctions(#{JSON.generate(CHEF_INFO)});"
file.close


