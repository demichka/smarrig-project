$.getJSON('/json/week-lunch.json', loadWeekLunch);


function loadWeekLunch(weekLunch) {
    let d = new Date();
    let dayOfWeek = d.getDay();
    let ul = $('<ul/>');
    let i = dayOfWeek;
    console.log(dayOfWeek); //delete before release
    let day = weekLunch[i];
    let dayName = '';
    let weekDays = [
        'Måndag',
        'Tisdag',
        'Onsdag',
        'Torsdag',
        'Fredag'
    ]

    for (let item in day) {
        let food = day[item];
        for (let j in food) {
            let title = food[j].name;
            let li = $('<li/>');
            li.append('<i class="fas fa-utensil-spoon"></i>');
            li.append(title);
            ul.append(li);
            let mealImage = $('<figure/>').append($('<img/>')).append($('<figcaption/>'));
            $('.week-lunch-img').append(mealImage);
            mealImage.find('img').attr('src', food[j].image);
        }
    }

    let everyDay = weekLunch[0];
    let pSmall = $('<p/>');
    for (let el in everyDay) {
        let k = everyDay[el];
        for (let z in k) {
            pSmall.append('<small>' + k[z].name + '</small>');
        }
    }

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





    let btn = $('<button/>').attr('type', 'button').addClass('btn').html('Beställa');
    $('.day-name').append(dayName);
    $('.lunch-list').append(ul);
    $('.lunch-list').append(pSmall);
    $('.lunch-list').append(btn);
}

$(document).ready(function () {

    $('.owl-carousel').owlCarousel({
        items: 1,
        // loop: true,
        slideBy: 1,
        margin: 10
    })
});
