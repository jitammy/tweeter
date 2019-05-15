/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function(){
  // 在这里写你的代码...
// document.addEventListener("dblclick", (event) => {
//     console.log(event);
//   });
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ]
function renderTweets(tweets) {
    tweets.forEach(function(tweet){
      $('#tweet').append(createTweetElement(tweet))
    })
  }
function createTweetElement(tweetdata) {
  let oneDay = 24*60*60*1000
  let firstDate = new Date()
  let secondDate = new Date(tweetdata.created_at)
  let diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)))
  let $tweet = $(`
  <article class = "tweet">
  <header>
  <img src = "${tweetdata.user.avatars.small}">
  <h2>${tweetdata.user.name}</h2>
  <h3>${tweetdata.user.handle}</h3>
  </header>
  <section class="tweet-box">${tweetdata.content.text}
  </section>
  <footer>
  <div class="date-passed">${diffDays} days ago</div>
  <div class="icons">
  <a href="#"><span class="glyphicon glyphicon-flag"></span></a>
  <a href="#"><span class="glyphicon glyphicon-retweet"></span></a>
  <a href="#"><span class="glyphicon glyphicon-heart"></span></a>
  </div>
  </footer>
  </article>
  `)
  return $tweet;
}
renderTweets(data)

$('form').on("submit", event => {
event.preventDefault()
let data = $(this).find("#words").serialize();
console.log(data)
$.ajax({
url: '/tweets',
method: 'POST',
data: data,
success: function () {
  // $("#tweets").empty();
  // loadTweets();



  }
})
// $(this).closest(".new-tweet").find("textarea").val("");
});
});
