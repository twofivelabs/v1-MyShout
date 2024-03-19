/**
 * This might load up memory too much, but it super useful
 * @type {{add: hooks.do, create: hooks.create, queue: {}}}
 */
export const hooks = {
    queue: {},
    do: function (name, fn) {
        if (!hooks.queue[name]) {
            hooks.queue[name] = [];
        }
        hooks.queue[name].push(fn);
    },
    create: function (name, ...params) {
        if (hooks.queue[name]) {
            hooks.queue[name].forEach(fn => fn(...params));
            // If you use this DELETES, hooks will only run 1 time
            // delete hooks.queue[name];
        }
    }
}
