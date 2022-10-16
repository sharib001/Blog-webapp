//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Though we all know not to judge a book by its cover we'll likely pick the one with an intriguing title and beautiful imagery over something that looks dated and bombards you with too much text. If that sounds daunting to you, don't panic. Start Creating your Blog that makes readers stick around is all about making the right choices in what content you choose to display, and I’ve got some advice to help you do just that, Publish your passions your way. Whether you'd like to share your knowledge, experiences or the latest news, create a unique and beautiful blog.";
const aboutContent = "Every good company was founded on an idea — something the current marketplace might not yet offer. What was your idea? Use this Aha! moment as a pivot point when telling your company story. What was a challenge you faced while developing your company? How did this challenge or discovery shape what you are today?";
const contactContent = "If you have any Questions ?, please feel free to Drop us a line. If you don't get an answer immedietly, we might just be travelling through the middle of nowhere, W'll get back to you as soon as we can. That's promise!";

const app = express();

app.set('view engine', 'ejs');
const Posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", {
    StartingContent: homeStartingContent,
    Posts: Posts
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutPage: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactPage: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  Posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postname", function (req, res) {
  const reqTitle = _.lowerCase(req.params.postname);

  Posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);
    
    if (reqTitle === storedTitle) {
      res.render("post", {PostTitle : post.title ,  PostContent : post.content});
    }
  });
});












app.listen(3000, function () {
  console.log("Server started on port 3000");
});
