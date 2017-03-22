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

        // add collapsed class to all divs with .sequence-member
        $(this).addClass('collapsed');

        function CollapseOpenSequenceMember(){
            // toggle the parent's class 'collapsed'
            el.toggleClass('collapsed');
            $(this).toggleClass('icon-plus icon-collapse-up');
        }
        // These functions toggle the sequence-member to three levels
        $(this).find('button.collapse').on('click', CollapseOpenSequenceMember)
        $(this).find('li li button.collapse').on('click', CollapseOpenSequenceMember)
        $(this).find('li li li li li button.collapse').on('click', CollapseOpenSequenceMember)

        function DeleteButtonOpen(){
            // toggle the delete button open and closed
            delDialog.toggleClass('closed open');
            $(this).toggleClass('icon-bin icon-cross');
        }
        // These functions find the delete button to three StreamField levels
        $(this).find('button.delete-open-toggle').on('click', DeleteButtonOpen)
        $(this).find('li li button.delete-open-toggle').on('click', DeleteButtonOpen)
        $(this).find('li li li li li button.delete-open-toggle').on('click', DeleteButtonOpen)
    });
    // @TODO not make people cry seeing below
    document.addEventListener("DOMNodeInserted", function(event) {
    // console.log("hello")
        $('.sequence-member').each(function() {
        var el = $(this);
        var delDialog = $(this).find('.delete-dialog');

        function CollapseOpenSequenceMember(){
            // toggle the parent's class 'collapsed'
            el.toggleClass('collapsed');
            $(this).toggleClass('icon-plus icon-collapse-up');
        }
        // These functions toggle the sequence-member to three levels
        $(this).find('button.collapse').on('click', CollapseOpenSequenceMember)
        $(this).find('li li button.collapse').on('click', CollapseOpenSequenceMember)
        $(this).find('li li li li li button.collapse').on('click', CollapseOpenSequenceMember)

        function DeleteButtonOpen(){
            // toggle the delete button open and closed
            delDialog.toggleClass('closed open');
            $(this).toggleClass('icon-bin icon-cross');
        }
        // These functions find the delete button to three StreamField levels
        $(this).find('button.delete-open-toggle').on('click', DeleteButtonOpen)
        $(this).find('li li button.delete-open-toggle').on('click', DeleteButtonOpen)
        $(this).find('li li li li li button.delete-open-toggle').on('click', DeleteButtonOpen)
        });
    });
});
