#!/usr/bin/node

/*
 * Listens for changes on each input checkbox tag
 * if checkbox is checked, you must store the Amenity ID in a variable
 * if checkbox is unchecked, you must remove the Amenity ID from the variable
 * update the list of Amenities (<div class="amenities">)
 */

const $ = window.$;
$(document).ready(function () {
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
