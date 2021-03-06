var namespaces = {};
var adapter = {
	namespaces: namespaces,
	init: function( ns ) {
		namespaces[ ns ] = {
			info: [],
			debug: [],
			warn: [],
			error: []
		};
		return namespaces[ ns ];
	},
	reset: function( ns ) {
		this.init( ns );
	},
	onLog: function( data ) {
		var ns = namespaces[ data.namespace ];
		if ( !ns ) {
			ns = this.init( data.namespace );
		}
		ns[ data.type ].push( data.msg );
	}
};

_.bindAll( adapter );

module.exports = function mockLogAdapter( config ) {
	if ( _.isObject( config ) ) {
		return adapter;
	} else if ( config ) {
		var ns = _.isArray( config ) ? config : [ config ];
		ns.forEach( adapter.init.bind( adapter ) );
		return adapter;
	}

	return namespaces;
};
