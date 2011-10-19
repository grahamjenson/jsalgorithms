//A persons core attributes are that they have a first name last name and birthdate
//sex is used as a visual and relationship semantic
//id is the key

function Person(id,firstname,lastname)
{
	this.id = id;
	//KEY
	this.firstname = firstname;
	this.lastname = lastname;
	this.mother = null;
	this.father = null;
	this.children = []
}


function VisualPerson()
{
	this.x = 0
	this.y = 0
	this.width = 10
	this.height = 10
	this.relouts = []
	this.relins = []
	
	this.draw = function(svg)
	{
		var shape = "circle"

		if(shape == "circle")
		{
			this.visualelement = svg.circle(this.x, this.y, this.width, {"id" : this.id});
		}
	}
}


//This Datastrucutre is a directed acylic Hypergraph
function FamilyTree()
{
	//Vertices/People
	this.V = {};

	//Default values for all other 

	//First add all the people
	this.addPerson = function(person){
		$.extend(n.p,this.VisualPerson())
		this.V[person.id] = person
	}

	this.layout = function()
	{
		for(v in this.V)
		{
			person = this.V[v]
		}
	}
}	




       
