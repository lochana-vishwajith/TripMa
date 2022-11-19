const lessThanOneHourAgo = (data) => {
    console.log("Invoking lessThanOneHourAgo.. ");
    let filteredData = [];
    const HOUR = 1000 * 60 * 60;
    for (let index = 0; index < data.length; index++) {
        const anHourAgo = Date.now() - HOUR;
        console.log(data[index].date);
        if(data[index].date > anHourAgo){
            console.log(data[index]);
            filteredData.push(data[index]);
        }
    }
    
    

    return filteredData;
}

module.exports = { lessThanOneHourAgo };