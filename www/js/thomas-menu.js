$.getJSON('/json/menu.json', start);

function start (lunchData) {
    for (let day in lunchData) {
        let dayData = lunchData[day];
        console.log('Veckodag ', day);
        for (let meal of dayData.sv) {
            console.log("name", meal.name, "desc", meal.desc);
        }
        
    }
}