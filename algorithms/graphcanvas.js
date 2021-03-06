function Graph()
{
    this.V = [];
    this.E = [];
    
    this.nNodes = function()
    {
	var size = 0, key;
	for (key in this.V) {
		size++;
	}
    	return size;
    }
    
    this.nEdges = function()
    {
	var size = 0, key;
	for (key in this.E) {
		size++;
	}
    	return size;
    }

    this.getNode = function(nodename){

	if (nodename in this.V){	
	    return this.V[nodename]
	}
	else
	{	
		
	    n = new Node(nodename)
	    this.V[nodename] = n
	    return n
	}
	
	
    }

    this.addEdge = function(n1,n2,weight){
	e = new Edge(n1,n2,weight)
	this.E.push(e)
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

	this.layout = new FruchtermanReingoldLayout()
	this.first = true

	this.draw = function(ctx)
	{
		//calculate new positions
		if(this.first) 
		{
			//clean off what was there
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			//init the layout
			this.layout.init(this,ctx.canvas.width,ctx.canvas.height)
			//Never again
			this.first = false
		}
		this.layout.run(this,ctx.canvas.width,ctx.canvas.height)
		for(i in this.E)
		{
			this.E[i].draw(ctx)
		}		
		for(i in this.V)
		{
			this.V[i].draw(ctx)
		}
	}	
}

function Node(n)
{
	this.nodename = n

	//top left corner
	this.x = 0
	this.y = 0

	//x to x + size, and y + size 
	this.size = 20

	//util function for center
	this.centerx = function()
	{
		return this.x+this.size/2
	}

	this.centery = function()
	{
		return this.y+this.size/2
	}

	this.draw = function(canvas)
	{	
		//Clean, a little outside too, just to be sure
		

		canvas.strokeStyle = "#005580";
		canvas.fillStyle = "#7BC1DB";
		canvas.beginPath();
		//x y = top left corner, size == radius, 0 is start angle, 2pi is end angle, true is anticlockwise
  		canvas.arc(this.centerx(), this.centery(), this.size/2, 0, Math.PI*2, true); 
		canvas.fill();  		
		canvas.closePath();
		canvas.stroke();
		
	}
}

function Edge(n1,n2,weight)
{
    	this.weight = (typeof weight == 'undefined')? 1 : weight
    	this.from = n1
    	this.to = n2

	this.draw = function(canvas)
	{

		canvas.beginPath();
		canvas.moveTo(this.from.centerx(),this.from.centery());
  		canvas.lineTo(this.to.centerx(),this.to.centery());
  		canvas.stroke();
		canvas.closePath();
	}
}



function FruchtermanReingoldLayout()
{
	var EPSILON = 0.000001
	var ALPHA = 0.1
	this.temp = 30
	this.mintemp = .1

	this.forceConstant = 0

	this.init = function(graph,width,height)
	{

		this.temp = width / 10;
		
		this.forceConstant = 0.3 * Math.sqrt(height*width/graph.nNodes());

		var scaleW = ALPHA*width/2;
		var scaleH = ALPHA*height/2;	
		for(ni in graph.V)
		{
			//Set initial places
			n = graph.V[ni]
			n.x = width/2 + Math.random()*scaleW;
			n.y = height/2 + Math.random()*scaleH;
		}
	}
	

	this.run = function(graph,width,height)
	{
		//Run it 10 times
		for(i = 0; i < 2; i++) 
		{		
			//Calculate repulsion
			//alert("rep")
			for(n in graph.V)
			{
				this.calculateRepulsion(graph,graph.V[n])
			}
		
			//Calculate attraction
			//alert("att")
			for(e in graph.E)
			{
				this.calculateAttraction(graph.E[e])
			}

			//Calculate New Positions
			//alert("pos")
			for(n in graph.V)
			{
				this.calculatePosition(graph.V[n],width,height)
			}
		
			//cool
			this.cool()
 		}
	}

	this.calculateRepulsion = function(g,n1)
	{
	 	
		n1.disp = [0,0]

		for (ni in g.V) {
			n2 = g.V[ni]	
		    	if (n1 != n2) {
		      		var xDelta = n1.x - n2.x;
		      		var yDelta = n1.y - n2.y;

		       		var deltaLength = Math.max(EPSILON,Math.sqrt(xDelta*xDelta + yDelta*yDelta));

		       		var force = (this.forceConstant*this.forceConstant) / deltaLength;
		       		n1.disp[0] = n1.disp[0] + (xDelta/deltaLength)*force;
		       		n1.disp[1] = n1.disp[1] + (yDelta/deltaLength)*force;
		    }
		}
	}

	this.calculateAttraction = function(edge)
	{
		
		var n1 = edge.to
		var n2 = edge.from
		

		var xDelta = n1.x - n2.x;
		var yDelta = n1.y - n2.y;

		var deltaLength = Math.max(EPSILON, Math.sqrt(xDelta*xDelta + yDelta*yDelta));

		var force = (deltaLength*deltaLength) / this.forceConstant;

		var xDisp = (xDelta/deltaLength) * force;
		var yDisp = (yDelta/deltaLength) * force;
		
		n1.disp[0] -= xDisp; n1.disp[1] -= yDisp;
		n2.disp[0] += xDisp; n2.disp[1] += yDisp;
	}

	

	this.calculatePosition = function(n,width,height)
	{
 	
		var deltaLength = Math.max(EPSILON,Math.sqrt(n.disp[0]*n.disp[0] + n.disp[1]*n.disp[1]));
		
		var xDisp = n.disp[0]/deltaLength * Math.min(deltaLength, this.temp);

		var yDisp = n.disp[1]/deltaLength * Math.min(deltaLength, this.temp);
		
		//Size matters, make sure none of the node goes outside
	       	n.x = Math.min(Math.max(n.x + xDisp,n.size),width-n.size);
		n.y = Math.min(Math.max(n.y + yDisp,n.size),height-n.size);

	}

	this.cool = function()
	{
		this.temp = Math.max(this.temp/1.1,this.mintemp)
	}

}
       
