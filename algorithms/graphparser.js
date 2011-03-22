//Depends on Jquery
//	Trim function
//NAME = [a-zA-Z][a-zA-Z0-9]
//T = GRAPH | DEFAULT | NODE | EDGE
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
	while(line != "}")
	{
		if(line.startswith("#") || line == "") {
			//do nothing
		}
		else if(line.startswith("nodes")) {
			//Default nodes
			var ss = $.trim(line.substr("nodes".length,line.length))
			parseDefaultNodes(ss,graph)	
		}
		else if(line.startswith("edges")) {
			//Default edges
			var ss = $.trim(line.substr("edges".length,line.length))
			parseDefaultEdges(ss,graph)	
		}
		else if(line.startswith("this")) {
			//Default graphs
			var ss = $.trim(line.substr("this".length,line.length))
			parseThisProps(ss,graph)		
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
			var edge = graph.	
		}
		else {
			//create Node (Nothing Else fits)
		}
		line = $.trim(lines.shift())
	}
}

parseDefaultNodes = function(line,graph)
{

}

parseDefaultEdges = function(line,graph)
{

}

parseThisProps = function(line,graph)
{

}

parseNode = function(line,node)
{

}

parseEdge = function(line,edge)
{

}
