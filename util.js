function updateRoomInfoDisplay() {
  let roomInfo = document.getElementById("meeting-room-info");
  roomInfo.innerHTML = `
      <div><b>room info</b></div>
      <div>
        send to invite or click to join
        <div><a href="${room.url}" target="_blank">
          ${room.url.replace(".co/", ".co/&#8203;")}
        </a></div>
        <div id='expires-countdown'></div>
      </div>
    `;
  if (!window.expiresUpdate) {
    window.expiresUpdate = setInterval(() => {
      let exp = room && room.config && room.config.exp;
      if (exp) {
        document.getElementById("expires-countdown").innerHTML = `
     room expires in
       ${Math.floor((new Date(exp * 1000) - Date.now()) / 1000)}
     seconds
   `;
      }
    }, 1000);
  }
}

function showEvent(e) {
  console.log("video call event -->", e);
}

function buttonEnable(...args) {
  args.forEach(id => {
    let el = document.getElementById(id);
    if (el) {
      el.classList.remove("disabled");
    }
  });
}
function buttonDisable(...args) {
  args.forEach(id => {
    let el = document.getElementById(id);
    if (el) {
      el.classList.add("disabled");
    }
  });
}
