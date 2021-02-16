const { EventEmitter } = require('events');

const myEmitter = new EventEmitter();

myEmitter.on('abc', ({j}) => {
    console.log('event abc handler-2', j)
})

myEmitter.on('abc', ({i}) => {
    console.log('event abc handler-1', i)
})



myEmitter.emit('abc', {i: 10, j: 25});
myEmitter.emit('abc', {i: 100, j: 205});

myEmitter.emit('def', {k: {i: 10, j: 25}});


myEmitter.once('def', ({k}) => {
    console.log('event def handler-1', k)
})

myEmitter.emit('def', {k: {i: 101, j: 251}});


console.log(myEmitter.getMaxListeners());
console.log(myEmitter.listenerCount('abc'));
console.log(myEmitter.listenerCount('def'));
console.log(myEmitter.eventNames());
console.log(myEmitter.listeners('abc'));