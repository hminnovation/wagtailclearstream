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

    function CollapseOpenSequenceMember(){
        // toggle the parent's class 'collapsed'
        var parent = $(this).parent('.sequence-member');
        parent.toggleClass('collapsed');
        $(this).toggleClass('icon-plus icon-collapse-up');
    }
    function DeleteButtonOpen(){
        // toggle the delete button open and closed
        delDialog.toggleClass('closed open');
        $(this).toggleClass('icon-bin icon-cross');
    }
    el.find('.sequence').on("click", "button.collapse", CollapseOpenSequenceMember);
    el.find('.sequence').on("click", "button.delete-open-toggle", DeleteButtonOpen);
});
