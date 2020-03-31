# Getting started

Here is a quick guide on how to get started making video calls in the browser
using the `Daily.co` API.

## One-click, no-download video calls

Quick links: [REST API docs][rest-api-docs] | [Front-End API
docs][frontend-docs]

We've made video calls so easy to implement that you can add video chat to your
website or mobile application with just a few lines of code. Our calls are made
using WebRTC, and work in the browser. The below image is from one of our online
demos. It will give you an idea of what our video call UI looks like when it's
embedded in an app:

![A video call running in a mock app.][mock-app] _A video call running in a mock
app._

**Our goals for the `Daily.co` API are:**

1. to get you up and running with video calls in just a few minutes;
2. enable a wide variety of use cases and workflows;
3. and give you a complete, ready to go, user interface.

[See live demos and code samples here][demos]. We'll do a quick walkthrough of
the basic flow of creating a video call using our library.

### Creating a Call

If you've created a `Daily.co` account you'll be given access to your own
personal url for creating new meeting "rooms" where video calls can take place.
Using the below code snippet in an HTML file with your own account's url will
allow your to create a video call:

```html
<!-- in your html file you can load our library-->
<script crossorigin src="https://unpkg.com/@daily-co/daily-js"></script>
<script>
  // then quickly create a video call using your team's url
  callFrame = window.DailyIframe.createFrame();
  callFrame.join({ url: "https://your-team-here.daily.co/hello" });
</script>
```

The above code displays the call in the lower right area of the page. But you
can customize everything about the call. For example, below is the code required
to create a full-page video call. [Demo it live here][big-demo].

```html
<script crossorigin src="https://unpkg.com/@daily-co/daily-js"></script>
<script>
  callFrame = window.DailyIframe.createFrame({
    showLeaveButton: true,
    iframeStyle: {
      position: "fixed",
      width: "100%",
      height: "100%"
    }
  });
  callFrame.join({ url: "https://your-team.daily.co/hello" });
</script>
```

### Creating Rooms and Video Calls

A "room" represents a specific video call location and configuration. Users will
then be able to join that meeting "room" using the meeting's url.

For more control over your video calls we suggest creating custom rooms for your
calls.

Creating meeting rooms is simple when using our "rooms" API endpoint:

```js
// will return a room object with a url for joining that room
async function createMtgRoom(properties = {}) {
  try {
    let response = await fetch("https://api.daily.co/v1/rooms", {
      method: "POST",
      body: JSON.stringify({ properties }),
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        authorization: `Bearer ${API_KEY}`
      },
      credentials: "same-origin"
    });

    room = await response.json();
    return room;
  } catch (e) {
    console.error(e);
  }
}
```

The above will allow you to create a new room with customized properties.

Going back to our previous example we can create and use a custom room like so:

```js
<script crossorigin src="https://unpkg.com/@daily-co/daily-js"></script>

<button onclick="run()">Click here to start call</button>

<script>
  async function run() {
    room = await createMtgRoom();

    window.callFrame = window.DailyIframe.createFrame();

    // join the room we just created
    await callFrame.join({ url: room.url });
  }
</script>

```

Examples of custom rooms you might want to create are rooms where you can limit
the maximum number of people allowed in the call,or rooms that do or don't allow
screen sharing. Take a look at our [creating rooms api docs][create-room-docs]
for more details.

## Front-end and back-end libraries

To add video calls in your web page or mobile app, use our front-end javascript
library. [Reference docs for the front-end library are here][frontend-docs].

To create video call rooms, configure features for the rooms, and manage users
and permissions, use our server-side REST API. [Reference docs for the REST API
are here.][rest-api-docs]

### Iframes, mobile devices, and browser support

Under the covers, our front-end library creates an iframe to embed a video call
into your web page or native app.

If you don't want to write any front-end code at all, you can send Daily.co
video call room links to your users directly. (Most developers, though, will
want to embed video calls into their own front-end interfaces).

#### Browser support

We support the following web browsers:

- Chrome 74 and above
- Safari 12.1 and above
- Firefox 66 and above
- Microsoft Edge 18
- Electron 6 and above

Microsoft Edge can participate only in 1:1 calls (no group calls).

Chrome is the only browser that can screen-share. (All browsers can view screen
shares, but only a call participant using Chrome can share their screen.)

### Mobile support

- iOS 12.1 and later versions
- Android 5.0 and above with current security and platform updates If you are
  starting calls from a web application on iOS, it usually makes sense to open a
  new tab because mobile device screen sizes tend to be small enough that
  there's not much room to embed the call as an iframe.

If you are starting a call from within a native application, you have to open a
Safari tab from your application, because the native iOS WebView component does
not (yet) allow access to the necessary camera, microphone, and network
protocols.

We provide a couple of configuration parameters that help streamline the user
flow into and out of a new Safari tab, though. See Customizing the in-call UI,
below.

On Android, you can embed calls inside a WebView in your application.

For more information on embedding Daily.co calls in native mobile apps, please
see this blog post.

##### How to contact us

If you need technical support, or have questions, suggestions, or feature
requests, please send us email: help@daily.co

We also monitor the live chat on our website and respond there as quickly as we
can.

[rest-api-docs]: https://docs.daily.co/reference
[frontend-docs]:
  https://docs.daily.co/reference#using-the-dailyco-front-end-library
[mock-app]: https://files.readme.io/3aa5e0b-Fake_App2x.jpg
[demos]: https://docs.daily.co/docs/demos#section-1-super-simple-demo
[big-demo]: https://docs.daily.co/docs/demos#section-2-standardcustom-ui-demo
[create-room-docs]: https://docs.daily.co/reference#create-room
