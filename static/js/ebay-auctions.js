var items = [],
  apiCall = "http://open.api.ebay.com/shopping?appid=Christop-5831-4ff4-9ba6-183e33d0c1de&version=517&siteid=3&callname=GetMultipleItems&responseencoding=JSON&callback=true",
  auctions = {
    "150701261414": "Barney Stintson",
    "140643731188": "Robin Scherbatsky",
    "300625370816": "Ted Mosby"
  };

  auctions2 = {
    "150701261414": "Barney Stintson",
    "140643731188": "Robin Scherbatsky",
    "300625370816": "Ted Mosby"
  };



function _cb_GetMultipleItems(args) {
  // console.log(args);
  if (args['Ack'] === "Success") {
    items = items.concat(args['Item']);
    console.log(items);
    updateList();
  }
}

function updateList() {
  var i, list, elem, price, bids;
  list = document.getElementById("top_chefs");
  for (i = 0; i < items.length; i++) {
    elem = document.createElement("li");
    console.log(items[i]);
    bids = items[i].hasOwnProperty('BidCount') ? items[i]['BidCount'] : "N/A";
    price = items[i].hasOwnProperty('ConvertedCurrentPrice') ? items[i]['ConvertedCurrentPrice']['Value'] : "N/A";
    elem.innerHTML = "<span class='number'>" + (i+1) + "</span><img src='/images/chefs/example.jpg'/><span class='name'>" + auctions[items[i]['ItemID']] + "</span><span class='bids'>" + bids + " Bids</span><span class='price'> £ " + price + "</span><a class='button'>Bid</a>";
    list.appendChild(elem);
  }
}
