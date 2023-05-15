#!/usr/bin/node

/*
 * Requests a status from the API
 */

const $ = window.$;
$(document).ready(function () {
  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  /*
 * Requests a list of all Places from the API
 * Places must be within the <SECTION> tag
 * Each Place must be within an <ARTICLE> tag
 * Each Place description must be in a <DIV> with class="price_by_night"
 */

  const urlPlaces = 'http://0.0.0.0:5001/api/v1/places_search/';
  $.ajax({
    url: urlPlaces,
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({}),
    success: function (data) {
      for (const place of data) {
        const article = $('<article></article>');
        const title = $('<div class="title_box"></div>');
        const name = $('<h2></h2>').text(place.name);
        const price = $('<div class="price_by_night"></div>').text('$' + place.price_by_night);
        title.append(name);
        title.append(price);
        const info = $('<div class="information"></div>');
        const maxGuest = $('<div class="max_guest"></div>').text(place.max_guest + ' Guests');
        const numRooms = $('<div class="number_rooms"></div>').text(place.number_rooms + ' Bedrooms');
        const numBathrooms = $('<div class="number_bathrooms"></div>').text(place.number_bathrooms + ' Bathrooms');
        info.append(maxGuest);
        info.append(numRooms);
        info.append(numBathrooms);
        const descript = $('<div class="description"></div>').text(place.description);
        const description = descript.text();
        const describe = description.replace(/\r\n/g, '');
        article.append(title);
        article.append(info);
        article.append(describe);
        $('section.places').append(article);
      }
    }
  });

  /*
   * Creates a new POST request when the button tag is clicked
   */

  $('button').click(function () {
    const amenityList = Object.keys(amenityDict);
    const urlPlaces = 'http://0.0.0.0:5001/api/v1/places_search/';
    $.ajax({
      url: urlPlaces,
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({ amenities: amenityList }),
      success: function (data) {
        $('section.places').empty();
        for (const place of data) {
          const article = $('<article></article>');
          const title = $('<div class="title_box"></div>');
          const name = $('<h2></h2>').text(place.name);
          const price = $('<div class="price_by_night"></div>').text('$' + place.price_by_night);
          title.append(name);
          title.append(price);
          const info = $('<div class="information"></div>');
          const maxGuest = $('<div class="max_guest"></div>').text(place.max_guest + ' Guests');
          const numRooms = $('<div class="number_rooms"></div>').text(place.number_rooms + ' Bedrooms');
          const numBathrooms = $('<div class="number_bathrooms"></div>').text(place.number_bathrooms + ' Bathrooms');
          info.append(maxGuest);
          info.append(numRooms);
          info.append(numBathrooms);
          const descript = $('<div class="description"></div>').text(place.description);
          const description = descript.text();
          const describe = description.replace(/\r\n/g, '');
          article.append(title);
          article.append(info);
          article.append(describe);
          $('section.places').append(article);
        }
      }
    });
  });

  /*
 * Listens for changes on each input checkbox tag
 * if checkbox is checked, you must store the Amenity ID in a variable
 * if checkbox is unchecked, you must remove the Amenity ID from the variable
 * update the list of Amenities (<div class="amenities">)
 */

  const amenityDict = {};
  $('input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      amenityDict[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenityDict[$(this).attr('data-id')];
    }
    $('.amenities H4').text(Object.values(amenityDict).join(', '));
  });
});
