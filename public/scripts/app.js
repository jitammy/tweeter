$(document).ready(function () {
  // this is to build tweets
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  function renderTweets(arr) {
    for (let i = 0; i < arr.length; i++) {
      let tweet = createTweetElement(arr[i]);
      $("#tweet").append(tweet);
    }
  }
  // this is build one tweet
  function createTweetElement(tweetdata) {
    //function to display time on the bottom left of tweets
    function getTimeDifference(timeCreated) {
      let currentTime = new Date().getTime();
      let timeDifference;
      if (currentTime > timeCreated) {
        timeDifference = currentTime - timeCreated;
      } else {
        timeDifference = timeCreated - currentTime;
      }
      timeDifference = Math.floor(timeDifference / 1000);
      numberSeconds = timeDifference;
      numberMinutes = Math.floor(numberSeconds / 60);
      numberHours = Math.floor(numberMinutes / 60);
      numberDays = Math.floor(numberHours / 24);
      numberMonths = Math.floor(numberDays / 30);
      numberYears = Math.floor(numberDays / 365);
      if (numberMonths < 12 && numberMonths > 0) {
        //if the number of months is between 12 and 0, display the number of months
        if (numberMonths === 1) {
          return numberMonths + " month ago";
        } else {
          return numberMonths + " months ago";
        }
      } else if (numberDays < 30 && numberDays > 0) {
        //if the number of days is between 30 and 0, display the number of days
        if (numberDays === 1) {
          return numberDays + " day ago";
        } else {
          return numberDays + " days ago";
        }
      } else if (numberHours < 24 && numberHours > 0) {
        //if the number of hours is between 24 and 0, display the number of hours
        if (numberHours === 1) {
          return numberHours + " hour ago";
        } else {
          return numberHours + " hours ago";
        }
      } else if (numberMinutes < 60 && numberMinutes > 0) {
        //if the number of minutes is between 60 and 0, display the number of minutes
        if (numberMinutes === 1) {
          return numberMinutes + " minute ago";
        } else {
          return numberMinutes + " minutes ago";
        }
      } else if (numberSeconds < 60) {
        //if the number of seconds is between 60 and 0, display the number of seconds
        if (numberSeconds === 0) {
          return "Just Now";
        } else {
          return numberSeconds + " seconds ago";
        }
      } else {
        //if all of the options above doesnt count, display number of years
        if (numberYears === 1) {
          return numberYears + " year ago";
        } else {
          return numberYears + " years ago";
        }
      }
    }
    let $tweet = $(`
  <article class = "tweet">
  <header>
  <img src = "${tweetdata.user.avatars.small}">
  <h2>${tweetdata.user.name}</h2>
  <h3>${tweetdata.user.handle}</h3>
  </header>
  <section class="tweet-box">${escape(tweetdata.content.text)}
  </section>
  <footer>
  <div class="date-passed">${getTimeDifference(tweetdata.created_at)}  <span class="likes">${tweetdata.likes}</span>  likes</div>
  <div class="icons">
  <a href="#"><span class="glyphicon glyphicon-flag"></span></a>
  <a href="#"><span class="glyphicon glyphicon-retweet"></span></a>
  <i class="glyphicon glyphicon-heart"  data-objectid = "${tweetdata._id}"></i>
</button>
  </div>
  </footer>
  </article>
  `)
    return $tweet;
  }
  // this is get function
  const loadTweets = () => {
    $('#tweet').empty()
    $.get('/tweets', (datafromserver) => {
      datafromserver.sort((a, b) => b.created_at - a.created_at)
      renderTweets(datafromserver)
      $('.counter').text(140)
    })
  }
  // this is post ajax funtion
  $('#input-text').on("submit", event => {
    event.preventDefault()
    let data = $(this).find("#words").serialize();
    var charCounter = $('#words').val().length;
    if (charCounter === 0) {
      $('.inputEmpty').slideDown("slow", function () {
        setTimeout(function () {
          $('.inputEmpty').slideUp("slow")
        }), 1000
      })
    } else if (charCounter > 140) {
      $('.inputTooLarge').slideDown("slow", function () {
        setTimeout(function () {
          $('.inputTooLarge').slideUp("slow")
        }), 1000
      })
    } else {
      $.ajax({
        url: '/tweets',
        type: "POST",
        data: data,
        success: function () {
          loadTweets()
          $('#words').val('')
        },
        error: function () {
          console.log('error')
        }
      })
    }
  });
  loadTweets()
  $('.button').on("click", function () {
    (this).blur()
    if ($(".new-tweet").css("display") === "none") {
      $(".new-tweet").slideDown("slow");
      $("#words").focus();
    } else {
      $(".new-tweet").slideUp("slow");
    }
  })
  $("section#tweet").on("click", "i", function () {
    console.log(this)
    let someID = $(this).data("objectid");
    console.log(someID)
    let likesElem =  $(this).closest("footer").find(".likes").text();
    let likesNum = Number(likesElem)
    console.log(likesNum)
      $.ajax({
        url:`/tweets/${someID}/like`,
        method: "POST",
        data: someID,
      }).done(function(){
        loadTweets()
      })
  })
})
