(function($, window){
	// toggle page info
	$('#main-slider .slide').on('click', function(){
		$('#page-info').fadeToggle('fast');
	});

	// toogle language select
	$('.lang-sel').on('click', function(){
		console.log('helo');
		$(this).find('.selector').fadeToggle('fast');
	});

	// Mobile menu show up
	$('#header .mobile-nav .switch-btn').on('click', function(){
		$("#mobile-nav-content").toggleClass('active');
	});
	$('#main-slider').on('click.active-nav', function(){
	   $("#mobile-nav-content").removeClass('active');
	});

	// Toggle quick booking
	// var bookForm = $('#booking-widget .booking-form');
	// $('#booking-widget .wg-btn').on('click', function(){
	// 	bookForm.addClass('active');
	// });
	// function hideBook() {
	// 	bookForm.removeClass('active');
	// }
	// bookForm.find('.close-btn').on('click', function(){
	// 	hideBook();
	// });
	// $('#main-slider').on('click.toggle-book', function(){
	// 	hideBook();
	// });
	
	// Toggle available rooms calendar
	var avaiCalendar = $('#available-calendar-widget');
	$('#booking-widget .wg-btn').on('click', function(){
		avaiCalendar.addClass('active');
	});
	avaiCalendar.find('.close-btn').on('click', function(){
		avaiCalendar.removeClass('active');
	});
}(jQuery, window));