$(document).ready(function () {
  const amenitiesHeader = $('.amenities h4');
  const locationsHeader = $('.locations h4');
  const placesSection = $('section.places');

  let ls_amen = {};
  let ls_cities = {};
  let ls_states = {};

  $('.amenities input[type=checkbox]').change(function () {
    const { id, name } = this.dataset;
    if (this.checked) {
      ls_amen[id] = name;
    } else {
      delete ls_amen[id];
    }
    amenitiesHeader.text(Object.values(ls_amen).join(', '));
  });

  $('.locations ul.popover LI.c input[type=checkbox]').change(function () {
    const { id, name } = this.dataset;
    if (this.checked) {
      ls_cities[id] = name;
    } else {
      delete ls_cities[id];
    }
    locationsHeader.text(Object.values(ls_cities).join(', '));
  });

  $('.locations ul.popover LI.s input[type=checkbox]').change(function () {
    const { id, name } = this.dataset;
    if (this.checked) {
      ls_states[id] = name;
    } else {
      delete ls_states[id];
    }
    locationsHeader.text(Object.values(ls_states).join(', '));
  });

  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    dataType: 'json',
    success: function (data) {
      $('#api_status').toggleClass('available', data.status === 'OK');
    }
  });

  function populatePlaces () {
  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5002/api/v1/places_search/',
    data: JSON.stringify({
      amenities: Object.keys(ls_amen),
      cities: Object.keys(ls_cities),
      states: Object.keys(ls_states)
    }),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (data) {
      let len = data.length;
      $('.places').empty();
      if (len === 0) {
        $('.places').append('<h1>No places found.</h1>');
      } else {
        $('.places').append('<h1>Places</h1>');
        for (let i = 0; i < len; i++) {
          let place = data[i];
          let template = `<article>
            <div class="title">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div class="description">${place.description}</div>
          </article>`;
          $('.places').append(template);
        }
      }
    }
  });
}
