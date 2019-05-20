var tagsJsonGlobal = null;
var tagsJsonDisplay = null;

jQuery.extend({
    getValues: function(id) {
        var result = null;
        var dataVar = 'id='+id;
        console.log("dataVar = ", dataVar);
        $.ajax({
            data: dataVar, //'orderid=2342',
            url: 'http://martinbarker.me/discogstagger.php',
            method: 'POST', // or GET
            async: false,
            success: function(msg) {
                
                result = msg; 
            }
        });
        return result;
    }
});

function getAllTags(jsonObj){
    //get count of elements in 'tags'
    var count = Object.keys(jsonObj.tags).length;
    var allTags = "";
    for (var key in jsonObj.tags) {
        if (jsonObj.tags.hasOwnProperty(key)) {
            //console.log(key + " -> " + jsonObj.tags[key]);
            if(allTags.includes(jsonObj.tags[key])){   
                
            }else{
                allTags = allTags + jsonObj.tags[key] + ",";
            }
        }
    }
    return allTags;
}

function getTags(input){
    console.log("inside getTags, input = ", input)
    //parse release id from url
    var index = input.indexOf("release/");
    var releaseID = input.substring(index+8, input.length);
    
    //make request to php script for tags based on passed in release id
    var results = $.getValues(releaseID);
    var jsonResults = JSON.parse(results);

    console.log("jsonResults = ", jsonResults)

    //store as global variable?
    tagsJsonGlobal = jsonResults;
    tagsJsonDisplay = jsonResults;

    var tagsAll = getAllTags(jsonResults);
    console.log("tagsAll = ", tagsAll);

    var releaseArtistsCheckboxValue = $('.releaseArtistsCheckbox:checked').val();
    var releaseArtistsSliderValue = $('.releaseArtistsSlider').val();

    var releaseInfoCheckboxValue = $('.releaseInfoCheckbox:checked').val();
    var releaseInfoSliderValue = $('.releaseInfoSlider').val();

    var tracklistCheckboxValue = $('.tracklistCheckbox:checked').val();
    var tracklistSliderValue = $('.tracklistSlider').val();

    //var publisherNotesCheckboxValue = $('.publisherNotesCheckbox:checked').val();
    //var publisherNotesSliderValue = $('.publisherNotesSlider').val();

    var combinationsCheckboxValue = $('.combinationsCheckbox:checked').val();
    var combinationsSliderValue = $('.combinationsSlider').val();

    //updateTagsBox(releaseArtistsCheckboxValue, releaseArtistsSliderValue, releaseInfoCheckboxValue, releaseInfoSliderValue, tracklistCheckboxValue, tracklistSliderValue, publisherNotesCheckboxValue, publisherNotesSliderValue, combinationsCheckboxValue, combinationsSliderValue);
    updateTagsBox(releaseArtistsCheckboxValue, releaseArtistsSliderValue, releaseInfoCheckboxValue, releaseInfoSliderValue, tracklistCheckboxValue, tracklistSliderValue, combinationsCheckboxValue, combinationsSliderValue);
    
    //set tags
    document.getElementById("tagsBox").value = tagsAll;
    //reveal helper stuff
    //document.getElementById("tagsHelperStuff").style.visibility = "visible";

    return false;
}

function prepUpdateTagsBox(){
    var releaseArtistsCheckboxValue = $('.releaseArtistsCheckbox:checked').val();
    var releaseArtistsSliderValue = $('.releaseArtistsSlider').val();

    var releaseInfoCheckboxValue = $('.releaseInfoCheckbox:checked').val();
    var releaseInfoSliderValue = $('.releaseInfoSlider').val();

    var tracklistCheckboxValue = $('.tracklistCheckbox:checked').val();
    var tracklistSliderValue = $('.tracklistSlider').val();

    //var publisherNotesCheckboxValue = $('.publisherNotesCheckbox:checked').val();
    //var publisherNotesSliderValue = $('.publisherNotesSlider').val();

    var combinationsCheckboxValue = $('.combinationsCheckbox:checked').val();
    var combinationsSliderValue = $('.combinationsSlider').val();

    //updateTagsBox(releaseArtistsCheckboxValue, releaseArtistsSliderValue, releaseInfoCheckboxValue, releaseInfoSliderValue, tracklistCheckboxValue, tracklistSliderValue, publisherNotesCheckboxValue, publisherNotesSliderValue, combinationsCheckboxValue, combinationsSliderValue);
    updateTagsBox(releaseArtistsCheckboxValue, releaseArtistsSliderValue, releaseInfoCheckboxValue, releaseInfoSliderValue, tracklistCheckboxValue, tracklistSliderValue, combinationsCheckboxValue, combinationsSliderValue);
    
}
function updateTagsBox(releaseArtistsCheckboxValue, releaseArtistsSliderValue, releaseInfoCheckboxValue, releaseInfoSliderValue, tracklistCheckboxValue, tracklistSliderValue, combinationsCheckboxValue, combinationsSliderValue){
//function updateTagsBox(releaseArtistsCheckboxValue, releaseArtistsSliderValue, releaseInfoCheckboxValue, releaseInfoSliderValue, tracklistCheckboxValue, tracklistSliderValue, publisherNotesCheckboxValue, publisherNotesSliderValue, combinationsCheckboxValue, combinationsSliderValue){
    console.log("releaseArtists checkbox = ", releaseArtistsCheckboxValue, ". slider = ", releaseArtistsSliderValue)
    console.log("releaseInfo checkbox = ", releaseInfoCheckboxValue, ". slider = ", releaseInfoSliderValue)
    console.log("tracklist checkbox = ", tracklistCheckboxValue, ". slider = ", tracklistSliderValue)
    //console.log("publisherNotes checkbox = ", publisherNotesCheckboxValue, ". slider = ", publisherNotesSliderValue)
    console.log("combinations checkbox = ", combinationsCheckboxValue, ". slider = ", combinationsSliderValue)

    var tags = "";

    if(releaseArtistsCheckboxValue == 'on'){
        tags = tags + addTags(tagsJsonGlobal.tags.releaseArtist, (releaseArtistsSliderValue / 100));
    }

    if(releaseInfoCheckboxValue == 'on'){
        tags = tags + addTags(tagsJsonGlobal.tags.releaseInfo, (releaseInfoSliderValue / 100));
    }

    if(tracklistCheckboxValue == 'on'){
        tags = tags + addTags(tagsJsonGlobal.tags.tracklist, (tracklistSliderValue / 100));
    }

    //if(publisherNotesCheckboxValue == 'on'){
    //    tags = tags + addTags(tagsJsonGlobal.tags.publisherNotes, (publisherNotesSliderValue / 100));
    //}

    if(combinationsCheckboxValue == 'on'){
        tags = tags + addTags(tagsJsonGlobal.tags.combinations, (combinationsSliderValue / 100));
    }
    
    document.getElementById("tagsBox").value = tags;
    document.getElementById("charCount").innerText = "Number of characters: "+ tags.length.toString();
}

function addTags(tags, percentToInclude){
    var tempTags = "";
    
    var numberOfTagsAvailiable = tags.length;
    var numberOfTagsToDisplay = numberOfTagsAvailiable * percentToInclude;
    numberOfTagsToDisplay = ~~numberOfTagsToDisplay;
    for(var i = 0; i < numberOfTagsToDisplay; i++){
        tempTags = tempTags + tags[i]+","
    }
    return tempTags;
}


//releaseArtist precentage update : declarations
releaseArtist_i = document.getElementById('releaseArtistsSlider');
releaseArtist_o = document.getElementById('releaseArtistsSliderValue');
releaseArtist_o.innerHTML = releaseArtist_i.value;
//setting initial value
releaseArtist_o.innerHTML = releaseArtist_i.value.toString() + "%";
//listening and setting when slider changes
releaseArtist_i.addEventListener('input', function () {  
    releaseArtist_o.innerHTML = releaseArtist_i.value.toString() + "%";
}, false);

//releaseInfo precentage update : declarations
releaseInfo_i = document.getElementById('releaseInfoSlider');
releaseInfo_o = document.getElementById('releaseInfoSliderValue');
releaseInfo_o.innerHTML = releaseInfo_i.value;
//setting initial value
releaseInfo_o.innerHTML = releaseInfo_i.value.toString() + "%";
//listening and setting when slider changes
releaseInfo_i.addEventListener('input', function () {  
    releaseInfo_o.innerHTML = releaseInfo_i.value.toString() + "%";
}, false);

//tracklist precentage update : declarations
tracklist_i = document.getElementById('tracklistSlider');
tracklist_o = document.getElementById('tracklistSliderValue');
tracklist_o.innerHTML = tracklist_i.value;
//setting initial value
tracklist_o.innerHTML = tracklist_i.value.toString() + "%";
//listening and setting when slider changes
tracklist_i.addEventListener('input', function () {  
    tracklist_o.innerHTML = tracklist_i.value.toString() + "%";
}, false);

/*
//publisherNotes precentage update : declarations
publisherNotes_i = document.getElementById('publisherNotesSlider');
publisherNotes_o = document.getElementById('publisherNotesSliderValue');
publisherNotes_o.innerHTML = publisherNotes_i.value;
//setting initial value
publisherNotes_o.innerHTML = publisherNotes_i.value.toString() + "%";
//listening and setting when slider changes
publisherNotes_i.addEventListener('input', function () {  
    publisherNotes_o.innerHTML = publisherNotes_i.value.toString() + "%";
}, false);
*/

//combinations precentage update : declarations
combinations_i = document.getElementById('combinationsSlider');
combinations_o = document.getElementById('combinationsSliderValue');
combinations_o.innerHTML = combinations_i.value;
//setting initial value
combinations_o.innerHTML = combinations_i.value.toString() + "%";
//listening and setting when slider changes
combinations_i.addEventListener('input', function () {  
    combinations_o.innerHTML = combinations_i.value.toString() + "%";
}, false);
