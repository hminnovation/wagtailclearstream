// For various js fun
$(document).ready(function() {
    // Fix the top Streamfield bar through the StreamField section
    var stickyStreamField = $('.block_field.stream-field h2').offset().top,
        make_draggable;

    function MakeDraggable(){
        var el = $(this),
            parent_id = el.parent().attr('id');

        function StopAction(){
            var valid_snap_targets = $(this).data('ui-draggable').snapElements,
                snapped_to = $.map(valid_snap_targets, function(element) {
                    return element.snapping ? element.item : null;
                }),
                click_target, my_position, target_position;

            if(snapped_to.length === 1){
                snapped_to = snapped_to[0];
            }else{
                return;
            }

            function extract_position(id){
                var elems = id.split('-');
                return elems[elems.length-2];
            }
            my_position = extract_position(this.id);
            target_position = extract_position(snapped_to.id);
            if (my_position > target_position){
                click_target = $(this).find('.icon-order-up');
            }else{
                click_target = $(this).find('.icon-order-down');
            }
            for(var i=0;i<Math.abs(my_position - target_position);i++){
                click_target.click();
            }
        }
        el.draggable({
            scroll: true,
            axis: "y",
            containment: "parent",
            revert: true,
            revertDuration: 0,
            snap: parent_id + " > .sequence-member",
            snapMode: "outer",
            stop: StopAction,
        });
    }

    // Open/ close all sequence-members
    $(this).find('.stream-field h2').on('click', function() {
        $(document).find('.sequence-member').toggleClass('collapsed ');
        });

    function CollapseOpenSequenceMember(){
        // toggle the parent's class 'collapsed'
        var parent = $(this).parents('.sequence-member').first();
        parent.toggleClass('collapsed');
        $(this).toggleClass('icon-plus icon-collapse-up');
    }
    function DeleteButtonOpen(){
        // toggle the delete button open and closed
        $(this).siblings('.delete-dialog').toggleClass('closed open');
        $(this).toggleClass('icon-bin icon-cross');
    }

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

    // Newly added elements need buttons set up become draggable
    document.addEventListener("DOMNodeInserted", function(event) {
        var new_element = $(event.originalTarget),
            button;
        if (new_element.attr('class') === 'sequence-member'){
            button = new_element.find('button.collapse');
            button.removeClass('icon-plus');
            button.addClass('icon-collapse-up');
            make_draggable.call(event.originalTarget);
        }
    });

    $('.sequence-member')
        .addClass('collapsed')
        //.each(make_draggable);


    $('#body-list').on("click", "button.collapse", CollapseOpenSequenceMember);
    $('#body-list').on("click", "button.delete-open-toggle", DeleteButtonOpen);
});
