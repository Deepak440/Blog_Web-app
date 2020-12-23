const  express =  require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app =  express();
const homeStartingContent = "Most people infected with the COVID-19 virus will experience mild to moderate respiratory illness and recover without requiring special treatment.  Older people, and those with underlying medical problems like cardiovascular disease, diabetes, chronic respiratory disease, and cancer are more likely to develop serious illness.";
const aboutContent = "Himachal was one of the few states that had remained largely untouched by external customs, largely due to its difficult terrain. With the technological advancements the state has changed very rapidly. It is a multireligional, multicultural as well as multilingual state like other Indian states. Some of the most commonly spoken languages includes Hindi, Punjabi, Pahari, Dogri, Mandialli Kangri, Gojri and Kinnauri.. The Hindu caste communities residing in Himachal include the Brahmins, Rajputs, Gujjars, Gaddis, “Girth (choudhary),” Kannets (come under RAJPUTS), Rathis and Kolis.. There are also tribal population in the state which mainly comprise , Kinnars,Pangawals, Sulehria, and Lahaulis.";
const contactContent = "Local music and dance reflects the cultural identity of the state. Through their dance and music, they entreat their gods during local festivals and other special occasions. Apart from the fairs and festivals that are celebrated all over India, there are number of other fairs and festivals also that are of great significance to Himachal Pradesh. Shimla, the state capital is home to Asia’s only natural Ice skating rink";
app.use(express.static('public'));

app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended : true}));
var Posts = [];

app.get("/" , function( req , res)
{
  res.render("home" , { COntent : homeStartingContent , Posts : Posts});
 
});

app.get("/posts/:topic" , function(req , res)
{
    const requestedTitle = _.lowerCase(req.params.topic);
    Posts.forEach(function(post){
        if(requestedTitle === _.lowerCase(post.Title))
        res.render("post", {
            Title  : post.Title,
            Content : post.Content
        });   

    });
   
   
})

app.get("/about" , function( req , res)
{
    res.render("about" ,{COntent1 : aboutContent} );
});

app.get("/contact" , function( req , res)
{
    res.render("contact" , {COntent2 :contactContent });
});

app.get("/compose" , function( req , res)
{
    res.render("compose");
});

app.post("/compose" , function(req , res)
{
    const p = {
        Title : req.body.postTiTle,
        Content : req.body.Post 
    };
    Posts.push(p);
    res.redirect("/");
});





app.listen(3000 , function()
{
    console.log("Server is running on port 3000");
});