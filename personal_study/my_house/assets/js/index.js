$(".close").click(function(){
	$('.outside').toggleClass('in');
	$('.bar').toggleClass('active');
	$(this).toggleClass('is-showing');
});

$(document).ready(function() {
    $('ul.tabs li a').click(function() {
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.navi .top_menu').removeClass('current');

        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
    });

    $('ul.top_menu li').click(function(e) {
        var listId = $(this).parent().attr('id');
        if(listId === 'tab-1') {
            $('ul#tab-1 li').removeClass('active');
            $(this).addClass('active');
        } else if(listId === 'tab-2') {
            $('ul#tab-2 li').removeClass('active');
            $(this).addClass('active');
        } else {
            $('ul#tab-3 li').removeClass('active');
            $(this).addClass('active');
        }
    });
});