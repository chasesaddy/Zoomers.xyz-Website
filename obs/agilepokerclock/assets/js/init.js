function js(file) {
    document.write('<script type="text/javascript" src="' + file + '"></script>');
}

js("./libs/jquery-1.10.2.min.js");
js("./libs/jquery.fittext.js");
js("./libs/jquery.tipsy.js");
js("./libs/jquery.mobile.custom.min.js");

js("./libs/modernizr.custom.js");
js("./libs/moment.min.js");
js("./libs/url-polyfill.min.js");
js("https://code.createjs.com/1.0.0/soundjs.min.js");

js("./app/utils/url.js");
js("./app/utils/numbers.js");
js("./app/utils/ES5Polyfills.js");
js("./app/base/Event.js");
js("./app/base/EventDispatcher.js");
js("./app/definitions/RoundType.js");
js("./app/model/vo/VOTimeUpdate.js");
js("./app/model/events/TimerSessionEvent.js");
js("./app/model/TimerSession.js");
js("./app/model/TimerSessionProxy.js");
js("./app/view/TimerView.js");
js("./app/controller/TimerController.js");
js("./app/Main.js");