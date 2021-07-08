const handlers = {};

const trigger = (...args) => {
  // Loop through elements of the handlers of the type in question and call them all
  // First element of "args" should always be the type.
  const [type, ...restArgs] = args;

  for (let key in handlers[type]) {
    // Spread extra arguments passed to trigger function to make parameters available in handlers
    handlers[type][key](...restArgs);
  }
};

const on = (type, handler) => {
  // Change handlers[type] to be of type Array
  // Push new handler into array if its type already present in handlers
  // Create new array for handler if type did not exist already
  if (handlers[type]) {
    handlers[type].push(handler);
  } else {
    handlers[type] = [handler];
  }
};

const off = (type, handler) => {
  // Filter out handler in question from list of handlers
  handlers[type] = handlers[type].filter(
    member => member.name !== handler.name
  );
};

// Usage
const handler1 = () => {
  console.log('Do foo');
};

const handler2 = () => {
  console.log('Do some other foo');
};

on('foo', handler1);

on('foo', handler2);
off('foo', handler1);

trigger('foo', 'bar', 'bas');
