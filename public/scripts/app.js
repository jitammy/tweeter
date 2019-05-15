/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  // 在这里写你的代码...
  // this is buildtweets
  // loadTweets()
  function renderTweets(arr) {
    // console.log(typeof tweets)
    // tweets.forEach(function (tweet) {
    //   $('#tweet').append(createTweetElement(tweet))
    // })
    // console.log(tweets)
    for (let i = 0; i < arr.length; i++){
      let tweet = createTweetElement(arr[i]);
      $("#tweet").append(tweet);
    }
  }
  // this is buildEntry
  function createTweetElement(tweetdata) {
    console.log(tweetdata)
    let oneDay = 24 * 60 * 60 * 1000
    let firstDate = new Date()
    let secondDate = new Date(tweetdata.created_at)
    let diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)))
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
    console.log(typeof tweet)
  }
  // this is get function
  const loadTweets = (data) => {
    // console.log(data)
    $.get('/tweets', (datafromserver) => {
      renderTweets(datafromserver)
    })
  }
  // this is post ajax funtion
  $('form').on("submit", event => {
    event.preventDefault()
    let data = $(this).find("#words").serialize();
    // console.log(typeof data) 
    $.post('/tweets', data).done(function(){
      $('#tweet').prepend(loadTweets(data));
      // console.log("yes")

    }).fail(function(){
      console.log("error")
    })
  });
});
