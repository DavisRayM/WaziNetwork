$('.toggle-edit-form').on('click', function() {
    // toggle edit-button text on click
     $(this).text() === 'Edit' ? $(this).text('Cancel') : $(this).text('Edit');
    // show form closest to the button
    $(this).siblings('.edit-bid-form').toggle();
 });
