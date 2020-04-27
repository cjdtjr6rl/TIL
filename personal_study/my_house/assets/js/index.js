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
    
    $('.side_cont').click(function(e) {
        var menu_id = $(this).attr('menu-tab');
        
        $('.side_cont').removeClass('action');
        
        $(this).addClass('action');
    });
    
    $('.ul.side_menu li').click(function(e) {
        var menuId = $(this).parent().attr('id');
        if(menuId === 'menu-1') {
            $('ul#menu-1 li').removeClass('action');
            $(this).addClass('action');
        } else if(menuId === 'menu-2') {
            $('ul#menu-2 li').removeClass('action');
            $(this).addClass('action');
        } else {
            $('ul#menu-3 li').removeClass('action');
            $(this).addClass('action');
        }
    });
});

$( document ).ready(function() {
    $('.trigger.num1').on('click', function() {
        $('.modal-wrapper.num1').toggleClass('open');
        $('.page-wrapper').toggleClass('blur-it');
        return false;
    });

    $('.trigger.num2').on('click', function() {
        $('.modal-wrapper.num2').toggleClass('open');
        $('.page-wrapper').toggleClass('blur-it');
        return false;
    });

    $('.trigger.num3').on('click', function() {
        $('.modal-wrapper.num3').toggleClass('open');
        $('.page-wrapper').toggleClass('blur-it');
        return false;
    });
});