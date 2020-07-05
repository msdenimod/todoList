$( document ).ready(function() {

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

    // календарь
    $('.todo-datepicker').datepicker({
        dateFormat: 'yyyy-mm-dd',
        onSelect: function(formattedDate, date, inst) {
            $('#add-task-form #date').val(formattedDate);
            $('.header-date').text(getFormatDate(formattedDate));
            $.ajax({
                type: 'POST',
                url: 'get_tasks_by_date/',
                data: {
                    date: formattedDate,
                    csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
                },
                success: function (html) {
                    $('.tasks').html(html);
                    getTasksForDate(formattedDate);
                }
            });
        }
    });

    // Назад к календарю
	$('.back-to-calendar').on('click', function(){
		$('.main-part .content').hide();
		$('.main-part .control-panel').show();
	});

    // попап добовление задачи
    $('.popup-with-form').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#title',

		callbacks: {
			beforeOpen: function() {
                $('#error-title').text('');
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#title';
				}
			}
		}
	});

    // Меняем статус задачи на обратный
    $( "body" ).on( "click", '.task-item .checkbox-blok', function() {

        var parent = $(this).parent();
        var id = parent.data('id');

        $.ajax({
            url: 'checked_task_ajax/' + id,
            type: 'GET',
            error: function () {
                alert('Ошибка получения запроса');
            },
            success: function (data) {
                if (data == 'not_access') {
                    alert('Доступ запрещен');
                } else if(data == 'True') {
                    parent.addClass('checked');
                } else {
                    parent.removeClass('checked');
                }
            }
        });

    });

    // Показать описание задачи
    $( "body" ).on( "click", '#show-description', function() {
        $(this).siblings(".task-description").toggleClass('hide');
        if($(this).siblings(".task-description").hasClass("hide")) {
            $(this).text('Подробнее...');
        } else {
            $(this).text('Свернуть...');
        }
    });


    // Добавляем задачу
    $( "#add-task-form" ).on( "click", '#btn-add-task', function(e) {

        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'add_task/',
            data: {
                title: $('#title').val(),
                description: $('#description').val(),
                date: $('#date').val(),
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
            },
            success: function (html) {
                if (html == 'not_access') {
                    $('#add-task-form h2').text('Доступ запрещен!');
                } else if (html == 'empty_title') {
                    $('#error-title').text('Заполните заголовок');
                } else if (html == 'False') {
                     $('#add-task-form h2').text('Непонятная ошибка. Попробуйте еще раз!');
                } else {
                    $.magnificPopup.close();
                    $('#add-task-form')[0].reset();
                    $('.tasks').html(html);
                }

            }
        });

    });
});

function getTasksForDate(date) {
    var dateAr = date.split('-');
    var newDate = dateAr[2] + '.' + dateAr[1] + '.' + dateAr[0];
	$('.main-part .content').show();
	$('.main-part .control-panel').hide();
	$('.content__title span').text(newDate + ' г.');
}

function getFormatDate(date) {
    var dateAr = date.split('-');
    var newDate = dateAr[2] + '.' + dateAr[1] + '.' + dateAr[0];
    return newDate;
}