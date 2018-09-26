$(document).ready(function () {
    $.getJSON('/json/lunch-menu.json', loadWeekLunch);

    let switchLanguageButton = $('.switch-lang li');
    let switchSwedish = $('.switch-swedish');
    let switchEnglish = $('.switch-english');
    let carousel = $('.owl-carousel');
    let lang = 'sv';
    let d = new Date();
    let dayOfWeek = d.getDay();
    let dayName = '';
    let weekDays = [{

            name: 'sv',
            days: [
                'Måndag',
                'Tisdag',
                'Onsdag',
                'Torsdag',
                'Fredag',
                'Lördag',
                'Söndag'
            ]
        },
        {
            name: 'en',
            days: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            ]
        }
    ]

    function setDayName(langDay) {
        if (lang === 'sv') {
            langDay = 0;
        } else {
            langDay = 1;
        }

        if (dayOfWeek === 1) {
            dayName = weekDays[langDay].days[0];
        } else if (dayOfWeek === 2) {
            dayName = weekDays[langDay].days[1];
        } else if (dayOfWeek === 3) {
            dayName = weekDays[langDay].days[2];
        } else if (dayOfWeek === 4) {
            dayName = weekDays[langDay].days[3];
        } else if (dayOfWeek === 5) {
            dayName = weekDays[langDay].days[4];
        }
        $('.day-name').append(dayName);
    }

    function runOwlCarousel() {
        $('.owl-carousel').owlCarousel({
            items: 1,
            loop: true,
            slideBy: 1,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            lazyLoad: true
        })
    }

    function loadWeekLunch(weekLunch) {
        showMenu(lang);
        runOwlCarousel();
        setDayName();

        $(switchLanguageButton).click(function () {
            $(this).addClass('on').removeClass('off');
            $(this).siblings().removeClass('on').addClass('off');
            $('.lunch-list').empty();
            $('.week-lunch-img').empty();
            $('.day-name').empty();
            $('.text-place').empty();
            $('.heading').empty();
            $('.meal-list-to-order').empty();
            carousel.trigger('destroy.owl.carousel');
            checkingLanguage();
            showMenu();
            runOwlCarousel();
            setDayName();
        });




        function checkingLanguage() {
            if (switchSwedish.hasClass('on')) {
                lang = 'sv';
            } else if (switchEnglish.hasClass('on')) {
                lang = 'en';
            }
            return lang;
        }

        function showMenu(language) {
            language = lang;
            let ul = $('<ul/>');
            let i = dayOfWeek;
            let currentDay = weekLunch[i];
            let mealListToOrder = $('.meal-list-to-order');

            for (item in currentDay.lang[language]) {
                let meal = currentDay.lang[language][item];
                let title = meal.name;
                let mealDesc = meal.desc;
                let li = $('<li/>');
                li.append('<i class="fas fa-utensil-spoon"></i>');
                li.append(title);
                ul.append(li);
                let mealImage = $('<figure/>').append($('<img/>')).append($('<figcaption/>'));
                $('.week-lunch-img').append(mealImage);
                mealImage.find('img').attr('src', meal.image);
                mealImage.find('figcaption').append(mealDesc);
                mealListToOrder
                    .append($('<div class="form-group"/>')
                        .append($('<input type="radio" name="select-meal"/>').attr('id', title).attr('value', title))
                        .append($('<label/>')
                            .append(title).attr('for', title))
                    );
            }

            let everyDay = weekLunch[0];
            let pSmall = $('<p/>');
            for (let el in everyDay.lang[language]) {
                let everyDayInfo = everyDay.lang[language][el];
                pSmall.append('<small>' + everyDayInfo.name + '</small>');
                $('.text-place').append(everyDayInfo.text);
                $('.heading').append(everyDayInfo.title);
            }

            let btn = $('<button class="btn order-btn">Order</button>');
            btn.click(function () {
                $('.modal').fadeIn();
                $('.fade').fadeIn();
            });

            runOwlCarousel();
            $('.lunch-list').append(ul);
            $('.lunch-list').append(pSmall);
            $('.lunch-list').append(btn);

        }
    }

    
    $('#get-order-btn').click(getOrder);

    function getOrder() {
        let summary = {};
        summary.name = $('#namef').val();
        summary.email = $('#emailf').val();
        summary.meal = $('input:checked').val();
        if(validateForm(summary)){
            showOrder(summary);
        }
        else {
            alert('0');
        }
    }

    function validateEmail(orderEmail) {
        let email = orderEmail.email;
        var result = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return result.test(String(email).toLowerCase());
    }



    function validateForm(orderData) {
        let validName = orderData.name.length >= 2;
        let validEmail = validateEmail(orderData);
        let validMeal = !!orderData.meal;
        console.log(validEmail);
        console.log(validName);
        const result = 
            validName &&
            validEmail &&
            validMeal;
        console.log(result);
        return result;
    }

    


    $('.close').click(function () {
        $(this).parents('.modal').fadeOut();
        $('.fade').fadeOut();
        $('form')[0].reset();
    });

    $('.fade').click(function () {
        $(this).fadeOut();
        $('.modal').fadeOut();
        $('form')[0].reset();
    });

    $('.btn:reset').click(function () {
        $(this).parents('.modal').fadeOut();
        $('.fade').fadeOut();
    });



    function showOrder(orderSummary) {
        let summarizeP = $('<p/>');
        summarizeP.append(
            'Hej, ' + orderSummary.name + '!' +
            '<br/>' + 'We send your order to ' + orderSummary.email + '.' +
            '<br/>' + 'You ordered ' + orderSummary.meal + ',' +
            '<br/>' + 'Pick it up and enjoy your lunch!');
        $('#form-modal').fadeOut();
        let modalSum = $('<div class="modal" id="modal-answer"/>').append($('<div class="container"/>').append($('<div class="modal-inner"/>').append($('<span class="close"/>').append($('<i class="fas fa-times"/>'))).append($('<h3/>'))));
        $('body').append(modalSum);
        $('#modal-answer').append(summarizeP);
        $('.close').click(function () {
            $(this).parents('.modal').fadeOut();
            $('.fade').fadeOut();
            $('form')[0].reset();
            $('#modal-answer').remove();
        });
    }
});
