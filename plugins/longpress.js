import Vue from 'vue';

Vue.directive('longpress', {
  bind: function (el, binding) {
    if (typeof binding.value !== 'function') {
      throw 'v-longpress directive requires a function as the value';
    }

    let pressTimer = null;
    let longPressTriggered = false;

    const start = (e) => {
      if (e.type === 'click' && e.button !== 0) {
        return;
      }

      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          handler(e);
          longPressTriggered = true;
        }, 300); // Adjust time for long press
      }
    };

    const end = (e) => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
      if (longPressTriggered) {
        e.preventDefault(); // Prevent default action if it was a long press
        longPressTriggered = false;
      }
    };

    const handler = (e) => {
      binding.value(e);
    };

    el.addEventListener('mousedown', start);
    el.addEventListener('touchstart', start);
    el.addEventListener('mouseup', end);
    el.addEventListener('touchend', end);
    el.addEventListener('mouseout', end);
    el.addEventListener('touchcancel', end);
  },
});
