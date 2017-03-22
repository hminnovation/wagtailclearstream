// For various js fun
// For various js fun
$(document).ready(function() {
    // Fix the top Streamfield bar through the StreamField section
    var stickyStreamField = $('.block_field.stream-field h2').offset().top;
    $(window).scroll(function() {  
        if ($(window).scrollTop() > stickyStreamField) {
            $('.block_field.stream-field h2').addClass('fixed');
        }
        else {
            $('.block_field.stream-field h2').removeClass('fixed');
        }  
    });

    // Rather than remove the fixed div class we calculate the height
    // of the parent stream-field element and allow the div to be moved
    // at the speed with which the user is scrolling
    // Problem with this is it counts from both top and bottom
    $(window).scroll(function(){
        var scroll_top = $(this).scrollTop(); // get scroll position top
        var height_element_parent =  $(".block_field.stream-field h2").parent().outerHeight(); //get high parent element
        var height_element = $(".block_field.stream-field h2").height(); //get high of elemeneto
        var position_fixed_max = height_element_parent - height_element; // get the maximum position of the elemen
        var position_fixed = scroll_top < 250 ? 250 - scroll_top : position_fixed_max > scroll_top ? 0 : position_fixed_max - scroll_top;
        $(".block_field.stream-field h2").css("top",position_fixed);
});

    
    $(this).find('.stream-field h2').on('click', function() {
        $(document).find('.sequence-member').toggleClass('collapsed ');
        });

    // find every .sequence-member in the dom
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