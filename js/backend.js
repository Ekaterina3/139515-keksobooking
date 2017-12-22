'use strict';

(function () {
  var URL_FORM = 'https://1510.dump.academy/keksobooking';
  var URL_DATA = 'https://1510.dump.academy/keksobooking/data';

  var initXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Произошла ошибка ' + xhr.status + ':' + xhr.status.text);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000;

    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = initXhr(onLoad, onError);
      xhr.open('GET', URL_DATA);
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = initXhr(onLoad, onError);
      xhr.open('POST', URL_FORM);
      xhr.send(data);
    },

    errorHandler: function (errorMessage) {
      var message = document.createElement('div');
      message.style = 'z-index: 100; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 600px; padding: 30px; text-align: center; font-size: 28px; color: white; border: 1px solid red; background-color: #fa9';
      message.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', message);
      window.setTimeout(function () {
        message.remove();
      }, 3000);
    }
  };
})();
