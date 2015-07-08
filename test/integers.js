var tape = require('tape')
var path = require('path')
var fs = require('fs')
var protobuf = require('../')
var Integers = protobuf(fs.readFileSync(__dirname + '/test.proto')).Integers

tape('integers encode + decode', function(t) {
  var b1 = Integers.encode({
    sint32: 1,
    sint64: 2,
    int32: 3,
    uint32: 4,
	int641: '5',
	int642: '8950169265049869475',
  })

  var o1 = Integers.decode(b1)
  console.log('o1: %j', o1);

  t.same(o1, {
    sint32: 1,
    sint64: 2,
    int32: 3,
    uint32: 4,
	int641: '5',
	int642: '8950169265049869475',
  })

  t.end()
})

tape('integers encode + decode + negative', function(t) {
  var b1 = Integers.encode({
    sint32: -1,
    sint64: -2,
    int32: -3,
    uint32: 0,
    int641: '-5',
    int642: '-8950169265049869475',
  })

  var o1 = Integers.decode(b1)

  t.same(o1, {
    sint32: -1,
    sint64: -2,
    int32: -3,
    uint32: 0,
    int641: '-5',
    int642: '-8950169265049869475',
  })

  t.end()
})
