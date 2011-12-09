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

item_ids = []
CHEFS.each_slice(6) do |fields|
 item_id = "#{fields[4].to_i}"
 item_ids << item_id
 CHEF_INFO[item_id] = {:name => "#{fields[0]}", :image => "#{fields[0].gsub(/\s+/,"_").downcase}.png"}
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

output = []

items.each do |item|
  output << CHEF_INFO[item['ItemID']].merge({:eid => item['ItemID'], :link => item['ViewItemURLForNaturalSearch'], :price => item['ConvertedCurrentPrice']['Value'], :bids => item['BidCount'] })
  # output << CHEF_INFO[item['ItemID']].merge({:eid => item['ItemID'], :price => 0, :bids => 0 })
end

output.sort! {|a,b| a[:price] == b[:price] ? a[:name] <=> b[:name] : b[:price] <=> a[:price]}

file = File.new("ebay-auctions.js", "w")
file.puts "updateAuctions(#{JSON.generate(output)});"
file.close

#system("cp ebay-auctions.js www/")
