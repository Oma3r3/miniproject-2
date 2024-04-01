const express  = require('express'); 
const path = require('path'); 
const app = express(); 
var bp = require('body-parser'); 
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use('/css',express.static(__dirname +'/css'));

function calculateJaccardSimilarity(str1, str2) {
    // Convert strings to sets of characters
    const set1 = new Set(str1);
    const set2 = new Set(str2);
    
    // Calculate intersection
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    
    // Calculate union
    const union = new Set([...set1, ...set2]);
    
    // Calculate Jaccard similarity coefficient
    const similarity = intersection.size / union.size;
    
    return similarity;
}

function checkStringSimilarity(str1, str2) {
    const similarityThreshold = 0.5; // Set your threshold as desired
    const similarity = calculateJaccardSimilarity(str1, str2);
    
    // Check if similarity meets the threshold
    if (similarity >= similarityThreshold) {
        console.log(similarity); 
        return true; // Strings are similar
    } else {
        return false; // Strings are dissimilar
    }
}

// Example usage
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html'); 
})

app.post('/', function (req, res) {
    console.log("enters the post function."); 
    var a = req.body.solution;
    // var b = req.body.solutionb;
    console.log(a); 
    // console.log(b); 
    // var string1 = a;
    // var string2 = b;
    // const areSimilar = checkStringSimilarity(string1, string2);
    // console.log("Are the strings similar?", areSimilar); 
})

app.listen(3000, function() {
    console.log("app listening on port 3000 h");
});