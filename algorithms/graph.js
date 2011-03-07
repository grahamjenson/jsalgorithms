function Graph()
{
    var V = [];
    var E = [];

    this.nodes = V
    this.edges = E

    this.getNode = function(nodename){

	if (nodename in V){	
	    return V[nodename]
	}
	else
	{	
		
	    n = new Node(nodename)
	    V[nodename] = n
	    return n
	}
	
	
    }

    this.addEdge = function(n1,n2,weight){
	e = new Edge(n1,n2,weight)
	E.push(e)
    }

    this.getOutEdges = function(n){
	var ret = []
	for(e in E)
	{
	    if(E[e].from == n)
	    {
		ret.push(E[e])
	    }

	}
	return ret
    }

this.draw = function(canvas)
	{
		//calculate new positions
		friteration(graph)
		
		for(i in graph.edges)
		{
			graph.edges[i].draw(canvas)
		}		
		for(i in graph.nodes)
		{
			graph.nodes[i].draw(canvas)
		}
	}	
}

function Node(n)
{
	this.nodename = n
	this.x = Math.random()*200
	this.y = Math.random()*200
	
	this.draw = function(canvas)
	{	
		canvas.strokeStyle = "#000000";
		canvas.fillStyle = "#FFFF00";
		canvas.beginPath();
  		canvas.arc(this.x, this.y, 10, 0, Math.PI*2, true); 
  		canvas.closePath();
		canvas.stroke();
		canvas.fill();
	}
}

function Edge(n1,n2,weight)
{
    	this.weight = (typeof weight == 'undefined')? 1 : weight
    	this.from = n1
    	this.to = n2

	this.draw = function(canvas)
	{
		canvas.moveTo(n1.x,n1.y);
  		canvas.lineTo(n2.x,n2.y);
  		canvas.stroke();
	}
}



function friteration(graph)
{
	/**
area := W * L; { W and L are the width and length of the frame }
G := (V, E); { the vertices are assigned random initial positions }
k :=
f u n c t i o n f a (z) := begin return x 2 /k e n d ;
f u n c t i o n f r(z) := begin return k 2 /z e n d ;
for i := 1 to iterations do begin
{ calculate repulsive forces}
for v in V do begin
{ each vertex has two vectors: .pos and .disp }
v.disp := 0;
for u in V d o
if (u # v) then begin
{ ∆ is short hand for the difference}
{ vector between the positions of the two vertices )
∆ := v.pos - u.pos;
v.disp := v.disp + ( ∆ /| ∆ |) * fr (| ∆ |)
end
end
{ calculate attractive forces }
for e in E do begin
{ each edge is an ordered pair of vertices .v and .u }
∆ := e.v.pos – e.u.pos
e.v.disp := e.v.disp – ( ∆/| ∆ |) * fa (| ∆ |);
e.u. disp := e.u.disp + ( ∆ /| ∆ |) * fa (| ∆ |)
end
{ limit the maximum displacement to the temperature t }
{ and then prevent from being displaced outside frame}
for v in V do begin
v.pos := v.pos + ( v. disp/ |v.disp|) * min ( v.disp, t );
v.pos.x := min(W/2, max(-W/2, v.pos.x));
v.pos.y := min(L/2, max(–L/2, v.pos.y))
end
{ reduce the temperature as the layout approaches a better configuration }
t := cool(t)
end

**/

}
       
