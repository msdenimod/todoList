$(document).ready(function() {
	// login menu
	$('.login-menu__icon').on('click', function(){
		$('.login-menu__list').toggleClass('hide');
	});

	$(function($){
		$(document).mouseup(function (e){ // событие клика по веб-документу
			var div = $(".login-menu"); // тут указываем ID элемента
			if (!div.is(e.target) // если клик был не по нашему блоку
			    && div.has(e.target).length === 0) { // и не по его дочерним элементам
				div.find('.login-menu__list').addClass('hide'); // скрываем его
			}
		});
	});

	// Календарь
	$('#datepicker').datepicker({
		onSelect: function(formattedDate, date, inst) {
        getTasksForDate(formattedDate);
    	}
	});

	// Назад к календарю
	$('.back-to-calendar').on('click', function(){
		$('.main-part .content').hide();
		$('.main-part .control-panel').show();
	});
	

});

function getTasksForDate(date) {
	$('.main-part .content').show();
	$('.main-part .control-panel').hide();
	$('.content__title span').text(date + ' г.');
}