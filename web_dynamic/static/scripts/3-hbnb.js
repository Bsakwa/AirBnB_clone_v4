$(function () {
  let checked = [];
  const amenitiesH4 = $('div.amenities h4');

  $('input[type="checkbox"]').on('change', function () {
    const id = $(this).data('id');
    const name = $(this).data('name');

    if ($(this).is(':checked')) {
      checked.push({ id: id, name: name });
    } else {
      checked = checked.filter(item => item.id != id);
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    dataType: 'json',
    success: function (data) {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  });

  $.ajax({
    method: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: JSON.stringify({}),
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
          <div class="description">
            ${place.description}
          </div>
        </article>
      `).join('');
      
      $('section.places').append(html);
      
      // Update the amenities h4 element
      const checkedStr = checked.map(item => item.name).join(', ');
      amenitiesH4.text(checkedStr);
    }
  });
});
