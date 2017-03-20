// For various js fun
// For various js fun
$(document).ready(function() {
    // find every .sequence-member in the dom
    
    $(this).find('.stream-field h2').on('click', function() {
        $(document).find('.sequence-member').toggleClass('collapsed ');
        });

    $('.sequence-member').each(function() {
        var el = $(this);
        var delDialog = $(this).find('.delete-dialog');
        var iconOpen = $(this).find('icon-plus');

        // add collapsed class
        $(this).addClass('collapsed');

        // find all buttons with class .collapse within this parent
        $(this).find('button.collapse').on('click', function() {
            // toggle the parent's class 'collapsed'
            el.toggleClass('collapsed');
            $(this).toggleClass('icon-plus icon-collapse-up');
        });

        // @TODO remove this repetition for nested blocks
        $(this).find('li li button.collapse').on('click', function() {
            // toggle the parent's class 'collapsed'
            el.toggleClass('collapsed');
            $(this).toggleClass('icon-plus icon-collapse-up');
        });

        // find all buttons with class .open-toggle
        $(this).find('button.delete-open-toggle').on('click', function() {
            delDialog.toggleClass('closed open');
            $(this).toggleClass('icon-bin icon-cross');
        });

        // @TODO work out not having this repetition
        $(this).find('li li button.delete-open-toggle').on('click', function() {
            delDialog.toggleClass('closed open');
            $(this).toggleClass('icon-bin icon-cross');
        });
    });
    // @TODO not make people cry seeing below
    document.addEventListener("DOMNodeInserted", function(event) {
    // console.log("hello")
        $('.sequence-member').each(function() {
        var el = $(this);
        var delDialog = $(this).find('.delete-dialog');
        var iconOpen = $(this).find('icon-plus');

        // add collapsed class
        // $(this).addClass('collapsed');
        // find all buttons with class .collapse within this parent
        $(this).find('button.collapse').on('click', function() {
            // toggle the parent's class 'collapsed'
            el.toggleClass('collapsed collapse');
            $(this).toggleClass('icon-plus icon-collapse-up');
        });

        // @TODO remove this repetition for nested blocks
        $(this).find('li li button.collapse').on('click', function() {
            // toggle the parent's class 'collapsed'
            el.toggleClass('collapsed');
            $(this).toggleClass('icon-plus icon-collapse-up');
        });

        // find all buttons with class .open-toggle
        $(this).find('button.delete-open-toggle').on('click', function() {
            delDialog.toggleClass('closed open');
            $(this).toggleClass('icon-bin icon-cross');
        });

        // @TODO work out not having this repetition
        $(this).find('li li button.delete-open-toggle').on('click', function() {
            delDialog.toggleClass('closed open');
            $(this).toggleClass('icon-bin icon-cross');
        });
    });
    });
});