// For various js fun
$(document).ready(function() {
    // Fix the top Streamfield bar through the StreamField section

    function MakeDraggable(){
        var el = $(this),
            parent_id = el.parent().attr('id'),
            move_buttons = el.find(".sequence-controls:first").find(" button.icon-order-down, button.icon-order-up").filter(":visible");
        if(move_buttons.length===0){
            // neither up nor down button is visible, so movement possible
            return;
        }
        move_buttons.last().after($("<button type=\"button\" title=\"Drag up or down\" class=\"drag-handle button icon text-replace icon-grip\"></button>"));
        move_buttons.hide();

        function makeDropTarget(){
            return $("<li class=\"drop-target\">Drop it here!</li>");
        }

        function StartAction(){
            var el = $(this),
                widget = el.data('ui-draggable'),
                id = el.attr("id"),
                prev = el.prev(),
                neighbours;
            el.parent().children(":first:not(#" + id + ")").before(makeDropTarget());
            neighbours = el.parent().children(":not(#" + id + "):not(.drop-target)");
            if(prev.length == 1){
                neighbours = neighbours.filter(":not(#" + prev.attr("id") + ")");
            }
            neighbours.after(makeDropTarget());
            // We changed the html and must recalculate the valid containment area
            // and the valid drag targets
            widget._setContainment();
            for (var i = 0; i < widget.plugins.start.length; i++) {
                if (widget.plugins.start[i][0] === "snap"){
                    widget.plugins.start[i][1].call(this);
                }
            }
        }

        function StopAction(){
            var valid_snap_targets = $(this).data('ui-draggable').snapElements,
                snapped_to = $.map(valid_snap_targets, function(element) {
                    return element.snapping ? element.item : null;
                }),
                click_target, my_position, target_position;

            if(snapped_to.length === 1){
                snapped_to = $(snapped_to[0]);
            }else{
                $(".drop-target").remove();
                return;
            }

            function extract_position(elem){
                return elem.parent().children(":not(.drop-target)").index(elem);
            }
            my_position = extract_position(el);
            if(snapped_to.prev().length === 1){
                target_position = extract_position(snapped_to.prev());
            } else {
                // There is no previous element, meaning that we are in the very first
                // drop box.
                target_position = 0;
            }
            if (my_position > target_position){
                click_target = $(this).find('.icon-order-up');
            }else{
                click_target = $(this).find('.icon-order-down');
            }
            for(var i=0;i<Math.abs(my_position - target_position);i++){
                click_target.click();
            }
            $(".drop-target").remove();
        }

        function CloneFunction(){
            var clone = $(this).clone();
            clone.addClass("collapsed")
                .find('button.collapse')
                .addClass("icon-plus")
                .removeClass("icon-collapse-up");
            return clone;
        }

        el.draggable({
            scroll: true,
            axis: "y",
            containment: "parent",
            revert: true,
            revertDuration: 0,
            snap: ".drop-target",
            handle: ".drag-handle",
            cancel: "", // Do not cancle on button.drag-handle
            snapMode: "inner",
            refreshPositions: true,
            helper: CloneFunction,
            start: StartAction,
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
    // $(window).scroll(function(){
    //     var scroll_top = $(this).scrollTop(); // get scroll position top
    //     var height_element_parent =  $(".block_field.stream-field h2").parent().outerHeight(); //get high parent element
    //     var height_element = $(".block_field.stream-field h2").height(); //get high of elemeneto
    //     var position_fixed_max = height_element_parent - height_element; // get the maximum position of the elemen
    //     var position_fixed = scroll_top < 250 ? 250 - scroll_top : position_fixed_max > scroll_top ? 0 : position_fixed_max - scroll_top;
    //     $(".block_field.stream-field h2").css("top",position_fixed);
    // });

    // Newly added elements need buttons set up become draggable
    document.addEventListener("DOMNodeInserted", function(event) {
        var new_element = $(event.originalTarget),
            button;
        if (new_element.attr('class') === 'sequence-member'){
            button = new_element.find('button.collapse');
            button.removeClass('icon-plus');
            button.addClass('icon-collapse-up');
            MakeDraggable.call(event.originalTarget);
        }
    });

    $('.sequence-member')
        .addClass('collapsed')
        .each(MakeDraggable);


    $('#body-list').on("click", "button.collapse", CollapseOpenSequenceMember);
    $('#body-list').on("click", "button.delete-open-toggle", DeleteButtonOpen);
});
