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
                    if (property == 'year')
                        continue;
                    yearKeyPair += "'" + property + "'" + ":" + "'" + props[property] + "'" + ",";
                }
                yearKeyPair += "}";

                yearKey ={ [props.year]: yearKeyPair };

                console.log(yearKey);
        }
        else{
            for (property in props) {
                console.log(property + ":" + props[property]);
            }
            return "";
        }
    }

    else{
        return "Error";
    }
    return "";
};

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
