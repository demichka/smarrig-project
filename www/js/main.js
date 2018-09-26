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
            carousel.trigger('destroy.owl.carousel');
            checkingLanguage();
            showMenu();
            runOwlCarousel();
            setDayName();
            addOrderBtn();
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

            }

            let everyDay = weekLunch[0];
            let pSmall = $('<p/>');
            for (let el in everyDay.lang[language]) {
                let everyDayInfo = everyDay.lang[language][el];
                pSmall.append('<small>' + everyDayInfo.name + '</small>');
                $('.text-place').append(everyDayInfo.text);
                $('.heading').append(everyDayInfo.title);
            }
            runOwlCarousel();



            $('.lunch-list').append(ul);
            $('.lunch-list').append(pSmall);

        }



    }

    function addOrderBtn() {
        let btn = $('<button/>').attr('type', 'button').addClass('order-btn btn').html('Order');
        $('.lunch-list').append(btn);
    }    

    // addOrderBtn();
    let orderBtn = $('.order-btn');
    orderBtn.click(function () {
        $('.modal').fadeIn();
        $('.fade').fadeIn();
    });

    $('.close').click(function () {
        $(this).parents('.modal').fadeOut();
        $('.fade').fadeOut();
    });

});
