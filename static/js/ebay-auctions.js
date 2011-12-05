var items = [],

  apiCall1 = apiCall2 = "http://open.api.ebay.com/shopping?appid=Christop-5831-4ff4-9ba6-183e33d0c1de&version=517&siteid=3&callname=GetMultipleItems&responseencoding=JSON&callback=true",
  secondCall = false,

  auctions1 = {
    '150701261415': {name: 'Adam Byatt', link: '#', imageurl: '/images/chefs/thumbs/adam_byatt.png'},
    '150701261416': {name: 'Alan Stewart', link: '#', imageurl: '/images/chefs/thumbs/alan_stewart.png'},
    '150701261417': {name: 'Alexis Gauthier', link: '#', imageurl: '/images/chefs/thumbs/alexis_gauthier.png'},
    '150701261418': {name: 'Angela Hartnett', link: '#', imageurl: '/images/chefs/thumbs/angela_hartnett.png'},
    '150701261419': {name: 'Anna Hansen', link: '#', imageurl: '/images/chefs/thumbs/anna_hansen.png'},
    '150701261420': {name: 'Antonin Bonnet', link: '#', imageurl: '/images/chefs/thumbs/antonin_bonnet.png'},
    '150701261421': {name: 'Ashley Palmer-Watts', link: '#', imageurl: '/images/chefs/thumbs/ashley_palmer-watts.png'},
    '150701261422': {name: 'Ben Spalding', link: '#', imageurl: '/images/chefs/thumbs/ben_spalding.png'},
    '150701261423': {name: 'Bruce Poole', link: '#', imageurl: '/images/chefs/thumbs/bruce_poole.png'},
    '150701261424': {name: 'Bruno Loubet', link: '#', imageurl: '/images/chefs/thumbs/bruno_loubet.png'},
    '150701261425': {name: 'Bryn Williams', link: '#', imageurl: '/images/chefs/thumbs/bryn_williams.png'},
    '150701261426': {name: 'Claude Bosi', link: '#', imageurl: '/images/chefs/thumbs/claude_bosi.png'},
    '150701261427': {name: 'Edd Kimber', link: '#', imageurl: '/images/chefs/thumbs/edd_kimber.png'},
    '150701261428': {name: 'Eric Lanlard', link: '#', imageurl: '/images/chefs/thumbs/eric_lanlard.png'},
    '150701261429': {name: 'Fergus Henderson', link: '#', imageurl: '/images/chefs/thumbs/fergus_henderson.png'},
    '150701261430': {name: 'Glynn Purnell', link: '#', imageurl: '/images/chefs/thumbs/glynn_purnell.png'},
    '150701261431': {name: 'Gregg Wallace', link: '#', imageurl: '/images/chefs/thumbs/gregg_wallace.png'},
    '150701261432': {name: 'Henry Harris', link: '#', imageurl: '/images/chefs/thumbs/henry_harris.png'}
  },
  auctions2 = {
    '150701261433': {name: 'James Martin', link: '#', imageurl: '/images/chefs/thumbs/james_martin.png'},
    '150701261434': {name: 'Jeremy Lee', link: '#', imageurl: '/images/chefs/thumbs/jeremy_lee.png'},
    '150701261435': {name: 'Angelo Ercolano', link: '#', imageurl: '/images/chefs/thumbs/angelo_ercolano.png'},
    '150701261436': {name: 'Luigi Vespero', link: '#', imageurl: '/images/chefs/thumbs/luigi_vespero.png'},
    '150701261437': {name: 'Marcus Eaves', link: '#', imageurl: '/images/chefs/thumbs/marcus_eaves.png'},
    '150701261438': {name: 'Marcus Wareing', link: '#', imageurl: '/images/chefs/thumbs/marcus_wareing.png'},
    '150701261439': {name: 'Martin Nisbet', link: '#', imageurl: '/images/chefs/thumbs/martin_nisbet.png'},
    '150701261440': {name: 'Michel Roux Jr', link: '#', imageurl: '/images/chefs/thumbs/michel_roux_jr.png'},
    '150701261441': {name: 'Nigel Haworth', link: '#', imageurl: '/images/chefs/thumbs/nigel_haworth.png'},
    '150701261442': {name: 'Olivier Limousin', link: '#', imageurl: '/images/chefs/thumbs/olivier_limousin.png'},
    '150701261443': {name: 'Phil Howard', link: '#', imageurl: '/images/chefs/thumbs/phil_howard.png'},
    '150701261444': {name: 'Raymond Blanc', link: '#', imageurl: '/images/chefs/thumbs/raymond_blanc.png'},
    '150701261445': {name: 'Richard Bertinet', link: '#', imageurl: '/images/chefs/thumbs/richard_bertinet.png'},
    '150701261446': {name: 'Skye Gyngell', link: '#', imageurl: '/images/chefs/thumbs/skye_gyngell.png'},
    '150701261447': {name: 'Tony Phillips', link: '#', imageurl: '/images/chefs/thumbs/tony_phillips.png'},
    '150701261448': {name: 'Tristan Welch', link: '#', imageurl: '/images/chefs/thumbs/tristan_welch.png'},
    '150701261449': {name: 'William Drabble', link: '#', imageurl: '/images/chefs/thumbs/william_drabble.png'}
  };


function _cb_GetMultipleItems(args) {
  if (args['Ack'] === "Success" || args['Ack'] === "PartialFailure") {
    items = items.concat(args['Item']);
  }
  // *yuck* Don't do this at home.
  if(secondCall) updateList();
  secondCall = true;
}

function updateList() {
  var i, list, elem, e, price, bids, data, sortedList = [], max;
  list = document.getElementById("top_chefs");

  for (i = 0; i < items.length; i++) {
    bids = items[i].hasOwnProperty('BidCount') ? items[i]['BidCount'] : "N/A";
    price = items[i].hasOwnProperty('ConvertedCurrentPrice') ? items[i]['ConvertedCurrentPrice']['Value'] : "N/A";
    data = auctions1[items[i]['ItemID']] || auctions2[items[i]['ItemID']];
    sortedList.push([data.imageurl, data.name, bids, price]);
  }

  sortedList.sort(function(a,b) {
    return a[3] < b[3] ? 1 : -1;
  });

  max = list.getAttribute("data-count") || sortedList.length;

  for (i = 0; i < max; i++) {
    elem = document.createElement("li");
    e = sortedList[i];
    elem.innerHTML = template(i+1, e[0], e[1], e[2], e[3]);
    list.appendChild(elem);
  }
}

function template(index, url, name, bids, price) {
  return "<span class='number'>" + index + "</span><img src='" + url + "'/><span class='name'>" + name + "</span><span class='bids'>" + bids + " Bids</span><span class='price'> £ " + price + "</span><a class='button'>Bid</a>"
}

function getAuctions(auctions, apiCall) {
  var i, j = 0;

  for (i in auctions) {
    if (auctions.hasOwnProperty(i)) apiCall += "&ItemID(" + j++ + ")=" + i;
  }

  var e = document.createElement("script");
  e.type = 'text/javascript';
  e.async = true;
  e.src = apiCall;
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(e, s);
}
