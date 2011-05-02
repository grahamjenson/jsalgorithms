function FruchtermanReingoldLayout(graph,width,height,iterations)
{
	this.iter = iterations
	if(!this.iter)
	{
		this.iter = 2
	}
	var EPSILON = 0.00001
	var ALPHA = 0.1
	this.temp = 30
	this.mintemp = .01

	this.tdiv = 1.05
	this.temp = 30;
	this.forceConstant = 0.25 * Math.sqrt(height*width/graph.nNodes());

	var scaleW = ALPHA*width/2;
	var scaleH = ALPHA*height/2;	
	for(ni in graph.V)
	{
		//Set initial places
		n = graph.V[ni]
		n.x = width/2 + Math.random()*scaleW;
		n.y = height/2 + Math.random()*scaleH;
	
	}

	
	this.reset = function()
	{
		this.temp = 30;
	}

	this.run = function()
	{
		var dirty = false;
		for(var i = 0; i < this.iter; i++) 
		{		
			//Calculate repulsion
			//alert("rep")
			
			for(n in graph.V)
			{
				this.calculateRepulsion(graph.V[n])
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
				dirty = dirty | this.calculatePosition(graph.V[n])
			}
			
			
 		}
		//cool
		this.cool();
		return !dirty;
	}

	this.calculateRepulsion = function(n1)
	{
	 	
		n1.disp = [0,0]

		for (ni in graph.V) {
			n2 = graph.V[ni]	
		    	if (n1 != n2) {
		      		var xDelta = n1.x - n2.x;
		      		var yDelta = n1.y - n2.y;

		       		var deltaLength = Math.max(EPSILON,Math.sqrt(xDelta*xDelta + yDelta*yDelta));

		       		var force = (this.forceConstant*this.forceConstant) / deltaLength;
				var size = n1.p["size"]
		       		n1.disp[0] = n1.disp[0] + (xDelta/deltaLength)*force*(size/10);
		       		n1.disp[1] = n1.disp[1] + (yDelta/deltaLength)*force*(size/10);
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

	

	this.calculatePosition = function(n)
	{
 		var dirty = false;
		var deltaLength = Math.max(EPSILON,Math.sqrt(n.disp[0]*n.disp[0] + n.disp[1]*n.disp[1]));
		
		var xDisp = n.disp[0]/deltaLength * Math.min(deltaLength, this.temp);

		var yDisp = n.disp[1]/deltaLength * Math.min(deltaLength, this.temp);
		
		//Size matters, make sure none of the node goes outside
		var sw  = parseInt(n.p["strokeWidth"])
		var size = parseInt(n.p["size"])
		var dx = Math.round(Math.min(Math.max(n.x + xDisp,size+sw),width-size-sw));
		var dy = Math.round(Math.min(Math.max(n.y + yDisp,size+sw),height-size-sw));
		
		if(dx != n.x)
		{
			dirty = true;
			n.setX(dx)
		}

		if(dy != n.y)
		{
			dirty = true;
			n.setY(dy)
		}	       	
	
		return dirty;

	}

	this.cool = function()
	{
		this.temp = Math.max(this.temp/this.tdiv,this.mintemp)
	}

}
