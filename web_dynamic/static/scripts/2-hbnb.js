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
