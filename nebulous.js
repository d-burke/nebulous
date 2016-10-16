/************************************
By: Dan Burke
For: Hackreactor Twittler assignment
On: 10/16/2016
*************************************/

      //creates username 'me'
      window.streams.users.me = [];

      //makes a new tweet from a string for username 'me'
      post = function(postText){
        textboxInput.value="";
        var tweet = {};
        tweet.user = 'me';
        tweet.message = postText;
        tweet.created_at = new Date();
        var username = tweet.user;
        streams.users.me.push(tweet);
        streams.home.push(tweet);
        refresh();
        toTop();
      };


      //adds tranparent gradients for top and bottom framing
      document.body.innerHTML+='<div class="smokeTop"></div>';
      document.body.innerHTML+='<div class="smokeBottom"></div>';

      //adds background video
      //  Taken without permission from- https://www.youtube.com/watch?v=yrgaD9I_CtI
      //  Longer video:
//      document.body.innerHTML+='<video id="bg" src="spacevid.mp4" autoplay="true" loop="true" muted="true"></video>';
      //  Shorter alternative video for upload:
      document.body.innerHTML+='<video id="bg" src="spacevidShort.mp4" autoplay="true" loop="true" muted="true"></video>';

      //adds html curtains
      document.body.innerHTML+='<div class="title" onclick="openSesame()"><h1>Nebulous</h1></div>';
      document.body.innerHTML+='<div class="wholeBody">';
      document.body.innerHTML+='<div class="curtainL" onclick="openSesame()"></div>';
      document.body.innerHTML+='<div class="curtainR" onclick="openSesame()"></div>';
      document.body.innerHTML+='</div>';

      //adds html button for updating the content in container1
      document.body.innerHTML+= '<div class="container0"><div class="container0Div"<a onclick="refresh()">Refresh Home</a></div><span><input type="text" name="textboxInput"  id="textboxInput" class="textboxInput"><button class="postButton" onclick="post(textboxInput.value)">Post</button></span><ul><div class="clickWho" onclick="filterUsername(\'me\')" style="color:#C72B05">-me</div><div class="clickWho" onclick="filterUsername(\'douglascalhoun\')" style="color:#99a100">-douglascalhoun</div><div class="clickWho" onclick="filterUsername(\'mracus\')" style="color:#0099a1">-mracus</div><div class="clickWho" onclick="filterUsername(\'shawndrost\')" style="color:#aa28ca">-shawndrost</div><div class="clickWho" onclick="filterUsername(\'sharksforcheap\')" style="color:#312BD4">-sharksforcheap</div></ul><div class="toTop" onclick="toTop()">Scroll To Top</div></div>'; //before div scroll to top

      //adds html container1 where tweets will be displayed
      document.body.innerHTML+='<br><br><div class="container1"></div>';

      //scrollbars innitially omitted.  This way moving the curtains won't expand the page width
      $('body').css("overflow", "hidden"); 

      //containers innitially shrunk out of existence
      setTimeout(function(){$('.tweetDiv').css("transform","scale(0,0)");},0);
      $('.container0').css("transform","scale(0,1)");


      //function to open curtains.  After a short delay deletes curtains and makes other parts visible
      function openSesame(){
        $('.title').css("opacity","0");
        document.body.querySelector('.curtainR').style.transform = "translate(100%, 0px)";
        document.body.querySelector('.curtainL').style.transform = "translate(-100%, 0px)";
        setTimeout(function(){
          $('.curtainR').remove();
          $('.curtainL').remove();
          $('.title').remove();
          $('.wholeBody').remove();
          $('body').css("overflow", "visible"); 
          $('.tweetDiv').css("transform","scale(1,1)");
          $('.container0').css("transform","scale(1,1)");
        }, 2800);

      };


      //auto load tweets of page load
      $(document).ready(refresh()); 


      //refeshes container1 to display tweets.  This is where the magic happens.
      //  clears container1, from last (newest) to first (oldest) posts html divs for each tweet
      //    takes an optional string argument to post tweets from that user only
      function refresh(nn){
        var $body = $('.container1'); //clears container1
        $body.html('');
        nn = nn || streams.home;
        var index = nn.length - 1;
        while(index >= 0){
          var tweet = nn[index];
          var $tweet = $('<div class="tweetDiv ' + tweet.user + '"></div>');
          var eachFullTweetHTML = '' 
            + '<a class ="user" onclick = "filterUsername(\'' + tweet.user +'\')">@' + tweet.user + ': ' + '</a>' 
            + '<div class = "message">' + tweet.message + '</div>'
            + '<div class = "time">' + timeFormat(tweet.created_at) + '</div>';
          $tweet.html(eachFullTweetHTML);
          $tweet.appendTo($body);
          index -= 1;
        }
      };


      //refreshes tweets with selected username
      function filterUsername(name) {
        refresh(streams.users[name]);
      };


      //converts timestamp to reader-friendly, 
      //  by picking the largest time demonination difference and returning a timeMessage string
      function timeFormat(time){
        var now = new Date();
        var timeMessage = "sometime ago";
        var year = (now.getFullYear() - time.getFullYear());
        var mon = (now.getMonth() - time.getMonth());
        var day = (now.getDate() - time.getDate());
        var hour = (now.getHours() - time.getHours());
        var min = (now.getMinutes() - time.getMinutes());
        var sec = (now.getSeconds() - time.getSeconds());
        if(year>0){timeMessage= year + " year(s) ago"}
        else if(mon>0){timeMessage= mon + " month(s) ago"}
        else if(day>0){timeMessage= day + " day(s) ago"}
        else if(hour>0){timeMessage= hour + "hr ago"}
        else if(min>0){timeMessage= min + "min ago"}
        else if(sec>0){timeMessage= sec + "sec ago"}
        else {timeMessage = " just now"}
        return timeMessage;
      };


      //scroll to top function
      //  !!only works on chrome
      function toTop(){
        document.body.scrollTop=0
      };

