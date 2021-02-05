const obj = {
    course_id : 'CSC441',
    section : 'H001',
    university : 'usm',
    term : 'spring_semester',
};
const obj2 = {
    course_id : 'CSC441',
    section : 'H001',
    university : 'usm',
    term : 'spring_semester',
    year : 2021
};

function CourseItem(props){
    if(typeof props == "string"){
        return props + "\n";
    }

    else if(typeof props == "object"){
        if(typeof props.year != "undefined"){
            let yearKeyPair = "{";
            for (property in props) {
                if (property == 'year'){
                    continue;
                }
                yearKeyPair += "'" + property + "'" + ":" + "'" + props[property] + "'" + ",";
            }
            yearKeyPair += "}";
            yearKey ={ [props.year]: yearKeyPair };
            return(yearKey);
        }
        else{
            let propValue = "";
            for (property in props) {
                propValue += property + ":" + props[property] + "\n"
            }
            return(propValue);
        }
    }

    else{
        return "Error";
    }
};

//console.log(CourseItem(obj));
//console.log(CourseItem(obj2));


let arr = [1,2,3].map(arr=>myFunction(arr));

function myFunction(arr){
    if(arr==1){
        return(CourseItem("CSC441"));
    }
    if(arr==2){
        return(CourseItem(obj));
    }
    if(arr==3){
        return(CourseItem(obj2));
    }
};
//console.log(myFunction(1));
//console.log(myFunction(2));
//console.log(myFunction(3));

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

//console.log(status(2024,"msu","course_id", "Hello", "world"));

//console.log(status(...arr));