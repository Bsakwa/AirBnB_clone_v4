$(function () {
  const $checkboxes = $('input[type="checkbox"]');
  const $amenities = $('div.amenities h4');
  const $apiStatus = $('div#api_status');
  const $places = $('section.places');

  let checked = [];

  $checkboxes.on('change', function () {
    const id = $(this).data('id');
    const name = $(this).data('name');

    if ($(this).is(':checked')) {
      checked.push({ id, name });
    } else {
      checked = checked.filter(item => item.id !== id);
    }

    const checkedNames = checked.map(item => item.name).join(', ');
    $amenities.text(checkedNames);
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    dataType: 'json',
    success: function (data) {
      $apiStatus.toggleClass('available', data.status === 'OK');
    }
  });

  function placesRender(data) {
    $.ajax({
      method: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify(data),
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (data) {
        const html = data.map(place => `
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div class="description">${place.description}</div>
          </article>
        `).join('');

        $places.empty().append(html);
      }
    });
  }

  $('button').one('click', function () {
    const amenitiesIds = checked.map(item => item.id);
    placesRender({ amenities: amenitiesIds });
  });

  placesRender({});
});
