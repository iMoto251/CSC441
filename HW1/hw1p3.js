function status(year,university, ...rest){
    let covidStatus, location = "";
    if(year !== ""){
        if(year < 2020){
            covidStatus = "Pre Covid\n";
        }
        else if(year > 2020){
            covidStatus = "Post Covid\n";
        }
        else {
            covidStatus = "Covid Pandemic\n";
        }
    }

    if(university !== ""){
        if(university == "usm"){
            location = "Hattiesburg\n";
        }
        else if(university == "msu"){
            location = "Starkville\n";
        }
        else if(university == "um"){
            location = "Oxford\n";
        }
        else{
            location = "Not found";
        }
    }
    return covidStatus+location+rest.reduce((acc, val) => acc+ "\n" + val);
}

console.log(status(2024,"msu","course_id", "Hello", "world"));