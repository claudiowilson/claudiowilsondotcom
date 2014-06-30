www.claudiowilson.com
=====================
So I finally launched claudiowilson.com. For awhile, I was struggling to get a site going because I was afraid it would just be another stale, prosaic, personal website. I finally arrived at a concept that I felt would be interesting but also simple and would integrate my passion for music. If you haven't noticed, the background is a bunch of clickable album art. What's special about it though, is that anyone who visits the website can add album art by going [here](http://www.claudiowilson.com/index). I use a free geo-ip tool to try and guess the user's location from her ip address as well as the iTunes API to add the user's selection to a simple [Firebase](https://www.firebase.com) database. 

I'm ambivalent about using the iTunes API because I realize that there is a TON of great music not on iTunes. In fact, most of the time I'm on [soundcloud](http://www.soundcloud.com) listening to newish music released by amazing artists and producers. I also feel that I'm promoting the homogenous state of digital music sales right now, but alas the iTunes API works for 99% of people and will have what they're looking for. 

I find it pretty cool that I can get visitors from all over the world and they can individually add album art themselves. So as of right now, I guess this is version 1.0 of my personal website. I'm going to add pictures so people can see what it looked like before it inevitably changes. 

### v 1.0

![claudiowilson.com](/images/firstversionpersonalsite.jpg)


So, that's what it looks like as of right now. There are a bunch of improvements I should be making though, and I'm going to outline what needs to be done.


### Improvements

+	The album art background is way too distracting and takes away from the main content.
+	Stop playing music when someone closes the popup
+	White space is uneven (look at the left vs right whitespace)
+	Maybe continue scrolling instead of having a bunch of pages?
+	Looks jarring when a row isn't completed and is halfway with album art

The biggest improvement is that I feel like this could be done so much better with [AngularJS](https://angularjs.org/). Right now I'm just using [Jade](http://www.jade-lang.com) as a template engine and generating the html on the fly. I hate that each link the user clicks has to reload the background again. It's inefficient. Time to learn some Angular over the weekend!
