function FruchtermanReingoldLayout(graph,width,height,iter)
{
	if(!iter)
	{
		iter = 2
	}
	var EPSILON = 0.000001
	var ALPHA = 0.1
	this.temp = 30
	this.mintemp = .1
	

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
	
	console.log(this)

	

	this.run = function()
	{
		for(i = 0; i < iter; i++) 
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
				this.calculatePosition(graph.V[n])
			}
		
			//cool
			this.cool()
 		}
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

	

	this.calculatePosition = function(n)
	{
 	
		var deltaLength = Math.max(EPSILON,Math.sqrt(n.disp[0]*n.disp[0] + n.disp[1]*n.disp[1]));
		
		var xDisp = n.disp[0]/deltaLength * Math.min(deltaLength, this.temp);

		var yDisp = n.disp[1]/deltaLength * Math.min(deltaLength, this.temp);
		
		//Size matters, make sure none of the node goes outside
	       	n.x = Math.min(Math.max(n.x + xDisp,n.p["size"]),width-n.p["size"]);
		n.y = Math.min(Math.max(n.y + yDisp,n.p["size"]),height-n.p["size"]);

	}

	this.cool = function()
	{
		this.temp = Math.max(this.temp/1.1,this.mintemp)
	}

}
