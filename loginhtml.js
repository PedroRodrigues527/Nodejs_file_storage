function verifyLogin(){
    //alert("teste executado " + document.getElementById('name').value);
    var username = "" + document.getElementById('name').value
    var password = "" + document.getElementById('password').value
    if(username == '' || password ==''){
        alert("Please complete the login!");
    }
    else if(username != 'admin' || password!= '123' ){
        alert("Login incorrect Please try again!");
    }
}


function getUsername(){
    var username = "" + document.getElementById('name').value;
    //alert("username: " + username + ", type: " + typeof(username));
    document.getElementById('info').innerHTML += username;
    return username;
}

//export var userinput = getUsername();

/*
function getVar(){
    return username;
}*/

//document.getElementById("info").innerHTML += username;

/*
function getOS() {
    var username = getUsername();
    alert("userfun: " + username);
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
      os = 'Linux';
    }
    return os;
  }

document.getElementById("info").textContent += getOS()*/
//document.getElementById("info").textContent += getUsername()

