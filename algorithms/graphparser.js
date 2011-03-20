//Depends on Jquery
//	Trim function

parse = function(xdot) {
	//REGEX INIT
	// an alphanumeric string or a number or a double-quoted string or an HTML string
	var idMatch = '([a-zA-Z\u0080-\uFFFF_][0-9a-zA-Z\u0080-\uFFFF_]*|-?(?:\\.\\d+|\\d+(?:\\.\\d*)?)|"(?:\\\\"|[^"])*"|<(?:<[^>]*>|[^<>]+?)+>)'
	var nodeIdMatch = idMatch + '(?::' + idMatch + ')?(?::' + idMatch + ')?'
	var graphMatchRe = new RegExp('^(strict\\s+)?(graph|digraph)(?:\\s+' + idMatch + ')?\\s*{$', 'i')
	var subgraphMatchRe = new RegExp('^(?:subgraph\\s+)?' + idMatch + '?\\s*{$', 'i')
	var nodeMatchRe = new RegExp('^(' + nodeIdMatch + ')\\s+\\[(.+)\\];$')
	var edgeMatchRe = new RegExp('^(' + nodeIdMatch + '\\s*-[->]\\s*' + nodeIdMatch + ')\\s+\\[(.+)\\];$')
	var attrMatchRe = new RegExp('^' + idMatch + '=' + idMatch + '(?:[,\\s]+|$)')

	//VARIABLE INIT
	var width = 0;
	var height = 0;
	var maxWidth = false;
	var maxHeight = false;
	var bbEnlarge = false;
	var bbScale = 1;
	var bgcolor = {opacity: 1};
	bgcolor.canvasColor = '#ffffff';
	bgcolor.textColor = bgcolor.canvasColor;
	var lines = xdot.split(/\r?\n/);
	var i = 0;
	
	var line, matches, entity, entityName, attrs, attrName, attrValue, attrHash, drawAttrHash;
	
	//PARSING
	//First lines may be comments
	while (i < lines.length) {
		if ('' != line && '#' != line[0]) {break;}
	}

	//the first line should always be the graph line	
	line = $.trim(lines[i++]);
	matches = line.match(graphMatchRe);
	var rootGraph
	var graphstack = []

	if (matches) {
		rootGraph = new Graph();
		rootGraph.name = matches[3];
		rootGraph.strict = matches[1];
		rootGraph.type = ('graph' == matches[2]) ? 'undirected' : 'directed';
		graphstack.unshift(rootGraph)
		console.log("Graph decalred")
	}
	else
	{
		console.log("Graph incorrect")
		return;
	}

	while (i < lines.length) {
		//Trim the string
		line = $.trim(lines[i++]);
		console.log("Line: " + line)
		//if it is empty or a comment keep going
		if ('' == line || '#' == line[0]) {continue;}
		
		//If it is the end of a graph
		if ('}' == line) {
				//pop the graph
				graphstack.shift();
				if (0 == graphstack.length) {
					break;
				}
				continue;
		}

		//Match a subgraph?
		matches = line.match(this.subgraphMatchRe);
		if (matches) {
			tgraph = new Graph()
			tgraph.name = matches[1]
			subgraph.subgraphs.push(tgraph)
			graphstack.unshift(tgraph);
			continue;
		}
		
		matches = line.match(this.nodeMatchRe);
		if (matches) {
			entityName = matches[2];
			attrs = matches[5];
			drawAttrHash = containers[0].drawAttrs;
			isGraph = false;
			switch (entityName) {
				case 'graph':
					attrHash = containers[0].attrs;
					isGraph = true;
					break;
				case 'node':
					attrHash = containers[0].nodeAttrs;
					break;
				case 'edge':
					attrHash = containers[0].edgeAttrs;
					break;
				default:
					entity = graphstack[0].getNode(entityName)
					attrHash = entity.attrs;
					drawAttrHash = entity.drawAttrs;
					containers[0].nodes.push(entity);
			continue;
		
	
		matches = line.match(this.edgeMatchRe);
		if (matches) {
			entityName = matches[1];
			attrs = matches[8];
			entity = new CanvizEdge(entityName, this, rootGraph, containers[0], matches[2], matches[5]);
			attrHash = entity.attrs;
			drawAttrHash = entity.drawAttrs;
			containers[0].edges.push(entity);
			continue;
		}
		

	}
/*
		if (this.maxWidth && this.maxHeight) {
			if (this.width > this.maxWidth || this.height > this.maxHeight || this.bbEnlarge) {
				this.bbScale = Math.min(this.maxWidth / this.width, this.maxHeight / this.height);
				this.width  = Math.round(this.width  * this.bbScale);
				this.height = Math.round(this.height * this.bbScale);
			}
		}
*/
//		debug('done');
	return graph
}
