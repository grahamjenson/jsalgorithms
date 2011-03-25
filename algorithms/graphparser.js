//Depends on Jquery
//	Trim function
//NAME = [a-zA-Z][a-zA-Z0-9]
//T = GRAPH | DEFAULT | NODE | EDGE | COMMENT
//COMMENT = "#".*
//ID = NAME ["."NAME]*
//GRAPH = GRAPHTYPE NAME " {\n" [T "\n"] * "}"
///GRAPHTYPE = "digraph" | "graph"

//NODE = NAME | PROPS
//EDGE = NAME ["-" NAME]+

//DEAFULT = TYPE PROPS
//TYPE = "nodes" | "edges" | "this"
 
//PROPS = "[" PROPERTY ["," PROPERTY]+ "]"
//PROPERTY = NAME "=" VALUE



parse = function(gs) {
	String.prototype.startswith = function(input){
  	  return this.substr(0, input.length) === input
	}

	//break input into lines
	var lines = gs.split(/\r?\n/);

	//First line must be graph declaration
	var line = $.trim(lines.shift())

	//the root graph
	var graph 

	if(line.startswith("graph")) {
		var ss = $.trim(line.substr("graph".length,line.length))
		var n = ss.split(" ",1)[0]
		graph = new Graph(n)
		graph.directional = false;
		parseGraph(lines,graph)			
	}
	else if(line.startswith("digraph")) {
		var ss = $.trim(line.substr("digraph".length,line.length))
		var n = ss.split(" ",1)[0]
		graph = new Graph(n)
		graph.directional = true;
		parseGraph(lines,graph)		
	}
	else
	{
		console.log("Start was all wrong")
	}

	return graph
}

parseGraph = function(lines,graph)
{
	var line = $.trim(lines.shift())
	var re = new RegExp(/\[[^\]]+\]/)
	// start with [, anything not ], ends with ]

	while(line != "}")
	{
		if(line.startswith("#") || line == "") {
			//do nothing
		}
		else if(line.startswith("nodes")) {
			//Default nodes
			var ss = $.trim(line.substr("nodes".length,line.length))
			var props = getProperties(ss)
			$.extend(graph.nodeDefaults,props)	
		}
		else if(line.startswith("edges")) {
			//Default edges
			var ss = $.trim(line.substr("edges".length,line.length))
			var props = getProperties(ss)
			$.extend(graph.edgeDefaults,props)
		}
		else if(line.startswith("this")) {
			//Default graphs
			var ss = $.trim(line.substr("this".length,line.length))
			var props = getProperties(ss)
			$.extend(graph.p,props)		
		}
		else if(line.startswith("graph")) {
			//Create Subgraph
			var ss = $.trim(line.substr("graph".length,line.length))
			var n = ss.split(" ",1)[0]
			var g = graph.getSubGraph(n)
			g.directional = false;			
			parseGraph(lines,g)			
		}
		else if(line.startswith("digraph")) {
			//Create Subgraph
			var ss = $.trim(line.substr("digraph".length,line.length))
			var n = ss.split(" ",1)[0]
			var g = graph.getSubGraph(n)
			g.directional = true;
			parseGraph(lines,g)		
		}
		else if(line.split(" - ").length > 1){
			//create Edge
			var ns = line.split(" - ")
			var n1 = graph.getNode($.trim(ns[0]))
			var n2name = $.trim($.trim(ns[1]).split("[",1)[0])
			var n2 = graph.getNode(n2name)
			var edge = graph.addEdge(n1,n2)
			//Extract Props			
			var props = re.exec(line)
			if(props)
			{	
				$.extend(edge.p,getProperties(props[0]))
			}
		}
		else {
			//create Node (Nothing Else fits)
			var nodeName = line.split(" ",1)[0]
			var props = line.substr(nodeName.length,line.length)
			var n = graph.getNode($.trim(nodeName))

			var props = re.exec(line)
			if(props)
			{	
				$.extend(n.p,getProperties(props[0]))
			}
		}
		line = $.trim(lines.shift())
	}
}

getProperties= function(line)
{
	//Takes a line looking like "[size=100,color=blue]" and makes a map of property to value
	line = $.trim(line)
	if(line == "") return {}
	console.log(line)
	line = line.substring(1,line.length-1)
	var props = line.split(",")
	var ret = {}	
	for (i in props) {
		var pv = props[i].split("=")
		var p = $.trim(pv[0])
		var v = $.trim(pv[1])
		ret[p] = v	
	}
	return ret	
}

