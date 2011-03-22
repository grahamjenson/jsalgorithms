//Depends on Jquery
//	Trim function
NAME = [a-zA-Z][a-zA-Z0-9]
T = GRAPH | DEFAULT | NODE | EDGE
ID = NAME ["."NAME]*
GRAPH = GRAPHTYPE NAME " {\n" [T "\n"] * "}"
GRAPHTYPE = "digraph" | "graph"

NODE = NAME | PROPS
EDGE = NAME ["-" NAME]+

DEAFULT = TYPE PROPS
TYPE = "nodes" | "edges" | "graphs"
 
PROPS = "[" PROPERTY ["," PROPERTY]+ "]"
PROPERTY = NAME "=" VALUE



parse = function(gs) {
	String.prototype.startswith = function(input){
  	  return this.substr(0, input.length) === input
	}

	//REGEX INIT
	// an alphanumeric string or a number or a double-quoted string or an HTML string

	//VARIABLE INIT
	var lines = gs.split(/\r?\n/);
	
	var i = 0;
	
	var line, entity, entityName, attrs, attrName, attrValue, attrHash, drawAttrHash;
	
	while (i < lines.length) {
		if ('' != line && '#' != line[0]) {break;}
	}

	return graph
}

parseGraph = function(lines,graph)
{
	var line = $.trim(lines.shift())
	while(line != "}")
	{
		if(line.startswith("nodes")) {
			//Default nodes
			var ss = $.trim(line.substr("nodes".length,line.length))
			parseDefaultNodes(ss,graph)	
		}
		else if(line.startswith("edges")) {
			//Default edges
			var ss = $.trim(line.substr("edges".length,line.length))
			parseDefaultEdges(ss,graph)	
		}
		else if(line.startswith("graphs")) {
			//Default graphs
			var ss = $.trim(line.substr("graphs".length,line.length))		
		}
		else if(line.startswith("graph")) {
			//Create Subgraph
			var ss = $.trim(line.substr("graph".length,line.length))
			var name = ss.split(" ",1)[0]
			var g = graph.getSubGraph(name)
			parseGraph(lines,g)			
		}
		else if(line.startswith("digraph")) {
			//Create Subgraph
			var ss = $.trim(line.substr("digraph".length,line.length))
			var name = ss.split(" ",1)[0]
			var g = graph.getSubDirectedGraph(name)
			parseGraph(lines,g)		
		}
		else if(line.split(" - ").length > 1){
			//create Edge
			var edge = graph.	
		}
		else {
			//create Node (Nothing Else fits)
		}
	}
}

parseDefaultNodes = function(line,graph)
{

}

parseDefaultEdges = function(line,graph)
{

}

parseDefaultGraph = function(line,graph)
{

}

parseNode = function(line,node)
{

}

parseEdge = function(line,edge)
{

}
