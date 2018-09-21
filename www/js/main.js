$.getJSON('/json/week-lunch.json', loadWeekLunch);


function loadWeekLunch(weekLunch) {
    let d = new Date();
    let dayOfWeek = d.getDay();
    let ul = $('<ul/>');
    let i = dayOfWeek + 1;
    console.log(dayOfWeek);
   
    let day = weekLunch[i];
    
    

    

    console.log(i);
    console.log(weekLunch[i]);
    
        for (let item in day) {
            let food = day[item];
            for (let j in food) {
                let title = food[j].name;
                let li = $('<li/>');
                li.append('<i class="fas fa-utensil-spoon"></i>');
                li.append(title);
                ul.append(li);
            }

        }

    let everyDay = weekLunch[0];
    let pSmall = $('<p/>').append('<small/>');
    for (let el in everyDay) {
        let k = everyDay[el];
        for (let z in k) {
            pSmall.append(k[z].name);
        }
    }
    


    let btn = $('<button/>').attr('type', 'button').addClass('btn').html('Beställa');
    $('.lunch-list').append(ul);
    $('.lunch-list').append(pSmall);
    $('.lunch-list').append(btn);
}
