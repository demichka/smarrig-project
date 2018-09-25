$(document).ready(function () {
    $.getJSON('/json/lunch-menu.json', loadWeekLunch);

    let switchLanguageButton = $('.switch-lang li');
    let switchSwedish = $('.switch-swedish');
    let switchEnglish = $('.switch-english');
    let carousel = $('.owl-carousel');



    let d = new Date();
    let dayOfWeek = d.getDay();
    let dayName = '';
    let weekDays = [
        'Måndag',
        'Tisdag',
        'Onsdag',
        'Torsdag',
        'Fredag'
    ];

    function setDayName() {
        if (dayOfWeek === 1) {
            dayName = weekDays[0];
        } else if (dayOfWeek === 2) {
            dayName = weekDays[1];
        } else if (dayOfWeek === 3) {
            dayName = weekDays[2];
        } else if (dayOfWeek === 4) {
            dayName = weekDays[3];
        } else if (dayOfWeek === 5) {
            dayName = weekDays[4];
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
            autoplayTimeout: 3000
        })
    }


    function loadWeekLunch(weekLunch) {
        lang = 'sv';
        showMenu(lang);
        runOwlCarousel();
        setDayName();

        $(switchLanguageButton).click(function () {
            $(this).addClass('on').removeClass('off');
            $(this).siblings().removeClass('on').addClass('off');
            $('.lunch-list').empty();
            $('.week-lunch-img').empty();
            carousel.trigger('destroy.owl.carousel');
            checkingLanguage();
            showMenu();
            runOwlCarousel();
            console.log(lang);
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
            console.log(language);
            let ul = $('<ul/>');
            let i = dayOfWeek;
            let currentDay = weekLunch[i];


            for (item in currentDay.lang[language]) {
                console.log(currentDay.lang[language][item].name);
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
                let everyDayMeal = everyDay.lang[language][el];
                pSmall.append('<small>' + everyDayMeal.name + '</small>');
            }
            runOwlCarousel();

            let btn = $('<button/>').attr('type', 'button').addClass('btn').html('Order');

            $('.lunch-list').append(ul);
            $('.lunch-list').append(pSmall);
            $('.lunch-list').append(btn);
        }






    }

});
