//Depends on Jquery
//	Trim function
NAME = [a-zA-Z][a-zA-Z0-9]
T = GRAPH | DEFAULT | NODE | EDGE
ID = NAME ["."NAME]*
GRAPH = GRAPHTYPE NAME "{\n" [T "\n"] * "}"
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
		}
		else if(line.startswith("edges")) {
			//Default edges		
		}
		else if(line.startswith("graphs")) {
			//Default graphs		
		}
		else if(line.startswith("graph") || line.startswith("digraph")) {
			//Create Subgraph		
		}
		else if(line.split("-").length > 1){
			//create Edge	
		}
		else {
			//create Node (Nothing Else fits)
		}
	}
	return graph
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
