//Depends on Jquery $.extends
function Graph(graphname)
{
    //Properties
    this.directed = false;
    this.name = graphname
    this.p = {}

    //Vertices, Edges and subgraphs
    this.V = {};
    this.E = [];
    this.G = {};

    //Default values for all other 
    this.nodeDefaults = {"shape":"circle","size":10,"fill": "#7BC1DB", "stroke": "#005580", "strokeWidth": "2"}
    this.edgeDefaults = {"strokeWidth":5, "stroke":"black"}
    this.p = {}
    

    //Construction methods
    this.getNode = function(nodename){
	if (nodename in this.V){	
	    return this.V[nodename]
	}
	else
	{			
	    var n = new Node(nodename)
	    this.V[nodename] = n
	    $.extend(n.p,this.nodeDefaults)
	    return n
	}
    }

    this.addEdge = function(n1,n2){
	var e = new Edge(n1,n2)
	n1.edges.push(e)
	n2.edges.push(e)
	$.extend(e.p,this.edgeDefaults)
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

   this.draw = function(svg)
   {

	for(i in this.E)
	{
		this.E[i].draw(svg)
	}

	for(i in this.V)
	{
		this.V[i].draw(svg)
	}


   }

   this.update = function()
   {
	for(i in this.V)
	{
		this.V[i].update()
	}
	for(i in this.E)
	{
		this.E[i].update()
	}
   }
}

function Node(n)
{
	this.p = {"id":n}
	this.nodename = n
	this.x = 0
	this.y = 0
	this.se
	this.edges = []

	this.setX = function(dx)
	{
		this.x = dx
		this.se.setAttribute("cx",this.x)
		//maintain edges
		for(i in this.edges)
		{
			var e = this.edges[i]
			if(e.from == this)
			{
				e.se.setAttribute("x1",this.x)
			}
			//not else if, because e.from == e.to
			if(e.to == this)
			{
			//assert(e.to == this)
				e.se.setAttribute("x2",this.x)
			}
		}
	}

	this.setY = function(dy)
	{
		this.y = dy
		this.se.setAttribute("cy",this.y)
		for(i in this.edges)
		{
			var e = this.edges[i]
			if(e.from == this)
			{
				e.se.setAttribute("y1",this.y)
			}

			if(e.to == this)
			{
			//assert(e.to == this)
				e.se.setAttribute("y2",this.y)
			}
		}
	}

	this.draw = function(svg)
	{
		var shape = this.p["shape"]
		var size = this.p["size"]

		if(shape == "circle")
		{
			this.se = svg.circle(this.x, this.y, size, this.p);
		}

		this.se.node = this;

		//The mousy stuff
		this.se.onmouseover = function() {
			this.setAttribute("fill","black")

		}
	
		this.se.onmouseout = function() {
			this.setAttribute("fill",this.node.p["fill"])
		}
		

		      function GetTrueCoords(evt)
      	{
         // find the current zoom level and pan setting, and adjust the reported
         //    mouse position accordingly
         var newScale = SVGRoot.currentScale;
         var translation = SVGRoot.currentTranslate;
         TrueCoords.x = (evt.clientX - translation.x)/newScale;
         TrueCoords.y = (evt.clientY - translation.y)/newScale;
      	};


		this.se.onmousedown = function(evt)
		{
			//States the mouse is over it
			var target = evt.target;                
        		target.node.setX(evt.clientX-5)
			target.node.setY(evt.clientY-5)
		}
		
		
		
	}

}

function Edge(n1,n2)
{
	this.p = {}
    	this.from = n1
    	this.to = n2
	
	this.se 

	this.draw = function(svg)
	{
		this.se = svg.line(this.from.x, this.to.x, this.from.y, this.to.y, this.p)
		this.se.edge = this;
	}
	
}




       
