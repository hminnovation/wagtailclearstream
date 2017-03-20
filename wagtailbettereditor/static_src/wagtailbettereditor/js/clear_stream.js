// For various js fun
$(document).ready(function() {
    // find every .sequence-member in the dom
    $('.sequence-member').each(function() {
        var el = $(this);
        var delDialog = $(this).find('.delete-dialog');

        // add collapsed class
        $(this).addClass('collapsed');

        // find all buttons with class .collapse within this parent
        $(this).find('button.collapse').on('click', function() {
            // toggle the parent's class 'collapsed'
            el.toggleClass('collapsed');
        });

        // find all buttons with class .open-toggle
        $(this).find('button.open-toggle').on('click', function() {
            delDialog.removeClass('closed');
            delDialog.addClass('open');
      });
    });
});