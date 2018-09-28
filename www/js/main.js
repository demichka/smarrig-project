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
    const btnShowWholeWeekMenu = $('.show-whole-week-menu');
    const wholeMenuHeading = $('#whole-week-menu h3');
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
        } else if (dayOfWeek === 6) {
            dayName = weekDays[langDay].days[5];
        } else if (dayOfWeek === 0) {
            dayName = weekDays[langDay].days[6];
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
        checkWeekend();
        showWholeWeekMenu(lang);
        changeLangShowWholeMenu(lang);
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
            $('.whole-week-menu-list').empty();
            $('.weekend-message').remove();
            carousel.trigger('destroy.owl.carousel');
            checkingLanguage();
            runOwlCarousel();
            setDayName();
            showWholeWeekMenu();
            changeLangShowWholeMenu();
            checkWeekend();
        });

        function checkWeekend(l) {
            l = lang;
            carousel.trigger('destroy.owl.carousel');
            if (dayOfWeek !== 6 && dayOfWeek !== 0) {
                showMenu(lang);

            } else {
                let weekendMessage = $('<p class="weekend-message"/p>');
                if (l === 'sv') {
                    weekendMessage.append('Det finns ingen veckan meny på helgen!<br/> Återkomma på måndag!<br/>' +
                        'Du kan trycka på knappen ovan för att öppna Hela Veckans lunch meny.');
                }
                if (l === 'en') {
                    weekendMessage.append('We don\'t serve week\'s lunch on weeekend!' + '<br/>' + 'Welcome back on Monday!' + '<br/>' + 'Click the button above to open Whole week\'s lunch menu.');
                }

                $('.lunch-menu').append(weekendMessage);
            }
        }

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
            for (let item = 1; item < currentDay.lang[language].length; item++) {
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
                        .append($('<input class="hidden-desc" type="hidden" />').attr('value', mealDesc))
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
                $('#form-modal').fadeIn();
                $('.fade').fadeIn();
            });

            runOwlCarousel();
            $('.lunch-list').append(ul);
            $('.lunch-list').append(pSmall);
            $('.lunch-list').append(btn);
        }

        function showWholeWeekMenu(l) {
            l = lang;
            let dl = $('<dl/>');
            let wholeWeek = weekLunch;

            for (item in wholeWeek) {
                let day = wholeWeek[item].lang[l];
                let dayName = day[0].nameOfWeek;
                let dt = $('<dt/>');
                dt.append(dayName);
                dl.append(dt);
                for (let m = 0; m < day.length; m++) {
                    let meal = day[m];
                    let dd = $('<dd/>');
                    dd.append(meal.name);
                    dd.insertAfter(dt);
                }
            }
            $('.whole-week-menu-list').append(dl);
        }

        btnShowWholeWeekMenu.click(function () {
            $('#whole-week-menu').fadeIn();
            $('.fade').fadeIn();
        });

        function changeLangShowWholeMenu(l) {
            l = lang;
            btnShowWholeWeekMenu.empty();
            wholeMenuHeading.empty();

            if (l === 'sv') {
                btnShowWholeWeekMenu.append('Visa veckans meny');
                wholeMenuHeading.append('Veckans lunch meny');
            } else if (l === 'en') {
                btnShowWholeWeekMenu.append('Open whole week\'s menu');
                wholeMenuHeading.append('Whole week\'s menu');
            }
        }
    }

    $('#get-order-btn').click(getOrder);

    function getOrder() {
        let summary = {};
        summary.name = $('#namef').val();
        summary.email = $('#emailf').val();
        summary.meal = $('input:checked').val();
        summary.desc = $('input:checked').siblings('.hidden-desc').val();
        if (validateForm(summary)) {
            showOrder(summary);
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
        let desc = !!orderData.desc;
        let errorName = $('<span class="invalid-input error-name">Enter your name please!</span>');
        let errorEmail = $('<span class="invalid-input error-email">Enter valid email please!</span>');
        let errorMeal = $('<span class="invalid-input error-meal">Choose at least one meal please!</span>');

        $('.invalid-input').remove();

        if (validName &&
            validEmail &&
            validMeal) {
            return true;
        } else {

            if (!validName) {

                $(errorName).insertAfter($('#namef'));
            }
            if (!validEmail) {
                $(errorEmail).insertAfter($('#emailf'));
            }
            if (!validMeal) {
                $(errorMeal).insertAfter($('.meal-list-to-order'));
            }
            if (validName) {
                $(this).next('.invalid-input').remove();
            }
            if (validEmail) {
                $('.error-email').remove();
            }
            if (validMeal) {
                $('.error-meal').remove();
            }
            return false;
        }
    }

    function closeModal(btn) {
        btn = $(this);
        let parent = btn.parents('.modal');
        if (parent) {
            parent.fadeOut();
        } else {
            btn.fadeOut();
        }
        $('.fade').fadeOut();
        $('.modal').fadeOut();
        $('.invalid-input').remove();
        $('form')[0].reset();
        $('#modal-answer').remove();
    }

    const closeBtn = $('.close');
    const fadeLayout = $('.fade');
    const resetBtn = $('.btn:reset');


    closeBtn.on('click', closeModal);
    fadeLayout.on('click', closeModal);
    resetBtn.on('click', closeModal);

    function showOrder(orderSummary) {
        let summarizeP = $('<p/>');
        summarizeP.append(
            'Hej, ' + '<strong>' + orderSummary.name + '</strong>' + '!' +
            '<br/>' + 'We send your order\'s description to ' + '<strong>' + orderSummary.email + '</strong>' + '.' +
            '<br/>' + 'You ordered ' + '<strong>' + orderSummary.meal + '</strong>' + ',' +
            '<br/>' + 'By the way, you will eat ' + '<strong>' + orderSummary.desc + '</strong>' + ',' +
            '<br/>' + 'Pick it up today from 11 till 14 and enjoy your lunch!');
        $('#form-modal').fadeOut();
        let modalSum = $('<div class="modal" id="modal-answer"><div class="container"><div class="modal-inner"><span class="close"><i class="fas fa-times"></i></span><h3>Yeepi! You\'ve just ordered!</h3></div></div></div>');
        $('body').append(modalSum);
        $('#modal-answer').append(summarizeP);
        $('.close').on('click', closeModal);
    }
});
