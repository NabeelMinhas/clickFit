$(document).ready(function() {
    // Fetch data from numbers API
    $.ajax({
        url: 'http://numbersapi.com/1/30/date?json',
        method: 'GET',
        success: function(response) {
            $('#api-content').html(`<p>${response.text}</p>`);
        },
        error: function(error) {
            console.error('Error fetching data:', error);
            $('#api-content').html('<p>Error loading content</p>');
        }
    });

    // Basic upload box click handler
    $('.upload-box').on('click', function() {
        // Will implement file upload functionality later
        console.log('Upload box clicked');
    });
}); 