//Depends on Jquery $.extends
function Graph(graphname)
{
    //Properties
    this.directed = false;
    this.name = graphname
    this.p = {}

    //Vertices, Edges and subgraphs
    this.V = {};
    this.E = {};
    this.G = {};

    //Default values for all other 
    this.nodeDefaults = {}
    this.edgeDefults = {}
    this.p
    

    //Construction methods
    this.getNode = function(nodename){
	if (nodename in this.V){	
	    return this.V[nodename]
	}
	else
	{			
	    var n = new Node(nodename)
	    this.V[nodename] = n
	    $.extend(n.p,nodeDefaults)
	    return n
	}
    }

    this.addEdge = function(n1,n2){
	var e = new Edge(n1,n2)
	this.E.push(e)
	return e
    }

    this.getSubGraph = function(n)
    {
	if (n in this.G){	
	    return this.G[n]
	}
	else
	{			
	    var g = new Graph(n)
	    this.G[n] = g
	    $.extend(g.p,this.p)
	    return g
	}
    }

    //Number of nodes
    this.nNodes = function()
    {
	var size = 0, key;
	for (key in this.V) {
		size++;
	}
    	return size;
    }
    
    //number of edges
    this.nEdges = function()
    {
	var size = 0, key;
	for (key in this.E) {
		size++;
	}
    	return size;
    }

    this.getEdges = function(n){
	var ret = []
	for(e in this.E)
	{
	    if(this.E[e].from == n || this.E[e].to == n)
	    {
		ret.push(this.E[e])
	    }

	}
	return ret
    }	
}

function Node(n)
{
	this.p
	this.nodename = n
}

function Edge(n1,n2)
{
	this.p
    	this.from = n1
    	this.to = n2
	
}




       
