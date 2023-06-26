// starting application and doing all of it in one file because that's what the version 1.0.0 is all about --NO separation of concern, logic(business and UI), check out version 1.1.0


// this is my webpack entry point file, I need to import all what I would be using for the APPlication first
import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/styles.css";


// importing the icon image and dino image
import jsImage from "./assets/images/js-badge.svg";


// a function for clearing all fields(the DOM) anytime user wants to search for dinosaurs
function clearFields() {
    $("#wordInput").val("");
}

$(document).ready(() =>{
    
    // for the imported Javascript logo for application
    let iconImg = $(".appImg");
    iconImg.attr("href", jsImage);


    
    $("#userForm").submit((event)=>{
        event.preventDefault();

        // pickin gmy users word

        let searchword = $("#wordInput").val();
        
        clearFields();
        
        // no need for an event.preventDefault() here because I didn't use the submit attribute on buttons
        
        $(".result").show();
        // working with my Dictionary API call


        // first, reinstantiating an xmlHttpRequest()
        let myRequest = new XMLHttpRequest();

        // picking up the API endpoint
        const myEndpointUrl = `http://api.dictionaryapi.dev/api/v2/entries/en/${searchword}`;

        myRequest.onreadystatechange = function(){
            // this.readyState just follows how the API call starts from 1 - 4
            // If the status of an API call is 200, then that means it was successful
            if(this.readyState === 4 && this.status === 200){
                let apiResponse = JSON.parse(this.responseText);
                getElements(apiResponse);

                console.log(apiResponse);
            }
            // else{
            //     let apiResponse = JSON.parse(this.responseText);
            //     $(".wordResult").text(apiResponse.responseText);
            // }

        }

        // What I am trying to do here is to open my request and then pass in 3 paramters
        // the first parameter is the type of API request I want to make; which is a get request
        // the second parameter is my endpoint url 
        // the rhird is a boolean thats telling Javascript that truly I want to make this API call


         myRequest.open("GET", myEndpointUrl, true);
        myRequest.send();




        // writing the getElements function

        function getElements(apiResponse){
            $(".wordResult").text(`It means ${apiResponse[0].meanings[0].definitions[0].definition}`)
        }


    });
    

    // working with my api call when users submit the form
    
    $("#dinoForm").submit((event) =>{
        // preventing submit button from refreshing the page
        event.preventDefault();

        // showing the result div when form is submitted
        $(".result").show();

        // getting the number of dinosaur paragraph user wants
        let noOfDinosaursParagraph = $("#numParagraphs").val();
        

        let noOfDinosaursNames = $("#numWords").val();
        
        // calling a function for clearing fields everytime me users search for Dinosaurs
        clearFields();


        // after taking in my values, its time to make my api call

        // reinstantiating a new xmlhttp request
        let myRequest = new XMLHttpRequest();

        // my api call endpoint
        let myEndpointUrl = `https://dinoipsum.com/api/?format=json&words=${noOfDinosaursNames}&paragraphs=${noOfDinosaursParagraph}`;


        // time to work with api requests
        myRequest.onreadystatechange = function (){
            // telling javascript when my api call response would be ready
            if(this.readyState === 4 && this.status === 200){
                // parsing the json response gotten because I did set my apicall to give a response in json format
                // also the .parse() method is capable of turning javascript object notation(JSON) into javascript objects
                const dinoResponse = JSON.parse(this.responseText);


                // calling a function that gets dinos for users to get executed when my request was successful
                // also while caling this function, I passed in my dinoResponse variable storing the converted javascript object[from json to javascript objects all thanks to JSON.parse();]
                getDinos(dinoResponse);
            }
        }
        // final steps of my call; opening a get request, with the variable I stored my Endpoint in and lastly a boolean that will determine whether I want my request opened or not


        myRequest.open("GET", myEndpointUrl, true);
        myRequest.send();

        // time to write the function I called earlier on that would get executed when my apiCall request was successful

        function getDinos(getMeDinosaurs){
            // getting four dinosaur names for my users
            $(".dOne").text(`${getMeDinosaurs[0][0]}`);
            
            $(".dTwo").text(`${getMeDinosaurs[0][1]}`);
            
            $(".dThree").text(`${getMeDinosaurs[0][2]}`);
            
            $(".dFour").text(`${getMeDinosaurs[0][3]}`);
            
            
        }

    });


});
