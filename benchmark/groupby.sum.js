var Benchtap = require('benchtap'),
	gen = require('../generate'),
	Frame = require('../frame');

var benchtap = new Benchtap();


function createSetup(N, K, useStrings){
	return function(event){
		// generate data
		var groupCol = gen.Array.int(N, K);
		var valueCol = gen.Array.int(N, 100);

		// map to strings
		if(useStrings)
			groupCol = groupCol.map(i => ["a", "b", "c"][i]);

		// create frame
		var columnDict = {
			"group-col" : groupCol,
			"reduce-col" : valueCol
		};

		this.frame = new Frame(columnDict);
	};
}

var N = 100000,
	K = 3;

var name = "groupby.sum: " + N + "x" + K;

benchtap.add(name, createSetup(N, K),function(){
	var group = this.frame.groupby("group-col");
	var result = group.reduce("reduce-col");
}, 2*N);

var name = "groupby.sum (strings) : " + N + "x" + K;

benchtap.add(name, createSetup(N, K, true),function(){
	var group = this.frame.groupby("group-col");
	var result = group.reduce("reduce-col");
}, 2*N);

var N = 1000000;

name = "groupby.sum: " + N + "x" + K;

benchtap.add(name, createSetup(N, K),function(){
	var group = this.frame.groupby("group-col");
	var result = group.reduce("reduce-col");
}, 2*N);

name = "groupby.sum (strings): " + N + "x" + K;

benchtap.add(name, createSetup(N, K, true),function(){
	var group = this.frame.groupby("group-col");
	var result = group.reduce("reduce-col");
}, 2*N);

benchtap.run();
