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

	$(function($){
		$(document).mouseup(function (e){ // событие клика по веб-документу
			var div = $(".edit-icon"); // тут указываем ID элемента
			if (!div.is(e.target) // если клик был не по нашему блоку
			    && div.has(e.target).length === 0) { // и не по его дочерним элементам
				div.siblings('.serveces-menu').addClass('hide'); // скрываем его
			}
		});
	});

    // календарь
    $('.todo-datepicker').datepicker({
        dateFormat: 'yyyy-mm-dd',
        onSelect: function(formattedDate, date, inst) {
            $('#add-task-form #date').val(formattedDate);
            $('.header-date').text(getFormatDate(formattedDate));
            getTaskByDate(formattedDate);
        }
    });

    // к календарю
	$('.back-to-calendar').on('click', function(){
		$('.main-part .content').addClass('hide');
		$('.main-part .control-panel').removeClass('hide');
	});

    // попап добовление/редактирование задачи
    $('.popup-with-form').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#title',

		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#title';
				}
			}
		}
	});

    // Меняем статус задачи на обратный
    $( "body" ).on( "click", '.task-item .checkbox-blok, .task-item .checkbox-blok + p', function() {

        var parent = $(this).parent();
        parent.toggleClass('checked');
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

    // Показать описание задачи
    $( "body" ).on( "click", '.hide-show-description-btn', function() {
        $(this).siblings("textarea#description").toggleClass('hide');

        if($(this).siblings("textarea#description").hasClass("hide")) {
            $(this).siblings("textarea#description").val('');
            $(this).text('+ Добавить описание');
        } else {
            $(this).text('- Удалить описание');
        }
    });

    // Показать/скрыть меню задачи
    $( "body" ).on( "click", '.edit-icon', function() {
        $(".edit-icon").removeClass('edit-icon-selected');
        $(this).addClass('edit-icon-selected');
        $(this).siblings(".serveces-menu").toggleClass('hide');
        $(".edit-icon:not(.edit-icon-selected)").siblings(".serveces-menu").addClass('hide');
    });

    // Добавить задачу заполнение и изменение формы
    $( "body" ).on( "click", '.content-block-add, .control-panel-block-add', function() {
        var dateForm = $('#add-task-form #date').val();
        $('#error-title').text('');
        $('#add-task-form #title').val('');
        $('#add-task-form #description').val('');
        $('#add-task-form h2').html('Добавить задачу на <span class="header-date">' + getFormatDate(dateForm) + '</span> г.');
        $('#add-task-form button.btn').text('Добавить');
        $('#add-task-form button.btn').attr('id', 'btn-add-task');
        $('#add-task-form button.btn').removeAttr('data-id-task');
    });

    // Добавляем задачу
    $( "#add-task-form" ).on( "click", '#btn-add-task', function(e) {
        e.preventDefault();
        $('#loadImg').removeClass('hide');
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
                $('#loadImg').addClass('hide');
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

    // Перенести задачу на завтра
    $( "body" ).on( "click", '.for-tomorrow', function(e) {
        var date = $('input#date').val();
        $('#loadImg').removeClass('hide');
        var task = $(this).parent().parent().parent();
        var id = task.data('id');
        $.ajax({
            type: 'POST',
            url: 'for_tomorrow/',
            data: {
                id: id,
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
            },
            success: function (data) {
                getTaskByDate(date);
                $('#loadImg').addClass('hide');
            }
        });
    });

    // Перенести задачу на сегодня
    $( "body" ).on( "click", '.for-today', function(e) {
        var date = $('input#date').val();
        $('#loadImg').removeClass('hide');
        var task = $(this).parent().parent().parent();
        var id = task.data('id');
        $.ajax({
            type: 'POST',
            url: 'for_today/',
            data: {
                id: id,
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
            },
            success: function (data) {
                getTaskByDate(date);
                $('#loadImg').addClass('hide');
            }
        });
    });

    // Редактировать задачу заполнение и изменение формы
    $( "body" ).on( "click", '.edit-task', function() {
        $('#loadImg').removeClass('hide');
        var task = $(this).parent().parent().parent();
        var id = task.data('id');
        console.log(id);
        $.ajax({
            type: 'POST',
            dataType: "json",
            url: 'get_task_by_id/',
            data: {
                id: id,
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
            },
            success: function (data) {
                if (data.status == 'success') {
                    $('#add-task-form #title').val(data.title);
                    if(data.description != '') {
                        $('#add-task-form #description').removeClass('hide');
                        $('.hide-show-description-btn').text('- Удалить описание');
                        $('#add-task-form #description').val(data.description);
                    }
                    $('#add-task-form h2').text('Редактировать задачу');
                    $('#add-task-form button.btn').text('Сохранить');
                    $('#add-task-form button.btn').attr('id', 'btn-edit-task');
                    $('#add-task-form #id-task-input-hidden').remove();
                    $('#add-task-form fieldset').prepend('<input id="id-task-input-hidden" value="' + id + '" type="hidden">');
                    $('#error-title').text('');

                    $.magnificPopup.open({
                      items: {
                        src: '#add-task-form'
                      },
                      type: 'inline'
                    });
                }

                $('#loadImg').addClass('hide');
            }
        });
    });

    // Редактировать задачу
    $( "body" ).on( "click", '#btn-edit-task', function(e) {
        e.preventDefault();
        var idTask = $('#id-task-input-hidden').val();
        var title = $('#add-task-form #title').val();
        var description = $('#add-task-form #description').val();
        var date = $('#add-task-form input#date').val();
        console.log(idTask);
        $('#loadImg').removeClass('hide');
        $.ajax({
            type: 'POST',
            url: 'edit_task/',
            data: {
                id: idTask,
                title: title,
                description: description,
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
            },
            success: function (data) {
                $('#loadImg').addClass('hide');
                if (data == 'not_access') {
                    $('#add-task-form h2').text('Доступ запрещен!');
                } else if (data == 'error') {
                    $('#add-task-form h2').text('Ошибка попробуйте позже!');
                } else if (data == 'empty_title') {
                    $('#error-title').text('Заполните заголовок');
                } else if (data == 'ok') {
                    $.magnificPopup.close();
                    $('#add-task-form')[0].reset();
                    getTaskByDate(date);
                }
            }
        });
    });

    // Удалить задачу
    $( "body" ).on( "click", '.delete-task', function(e) {
        var date = $('input#date').val();
        $('#loadImg').removeClass('hide');
        var task = $(this).parent().parent().parent();
        var id = task.data('id');
        // Здесь надо вставить подтверждение стильнее
        var isDel = confirm('Удалить?');
        if (!isDel) {
             $('#loadImg').addClass('hide');
             return false;
        }
        $.ajax({
            type: 'POST',
            url: 'delete_task/',
            data: {
                id: id,
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
            },
            success: function (data) {
                getTaskByDate(date);
                $('#loadImg').addClass('hide');
            }
        });
    });

});

function getTasksForDate(date) {
    var dateAr = date.split('-');
    var newDate = dateAr[2] + '.' + dateAr[1] + '.' + dateAr[0];
	$('.main-part .content').removeClass('hide');
	$('.main-part .control-panel').addClass('hide');
	$('.content__title span').text(newDate + ' г.');
}

function getFormatDate(date) {
    var dateAr = date.split('-');
    var newDate = dateAr[2] + '.' + dateAr[1] + '.' + dateAr[0];
    return newDate;
}

function getTaskByDate(date) {
    $.ajax({
        type: 'POST',
        url: 'get_tasks_by_date/',
        data: {
            date: date,
            csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
        },
        success: function (html) {
            $('.tasks').html(html);
            getTasksForDate(date);
        }
    });
}