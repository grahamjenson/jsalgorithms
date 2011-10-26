var box = { 
  length: 0,
  add: function(k, v) {
    if (typeof this[k] === 'undefined')
      this.length++;
    this[k] = v;
  }
}


//A persons core attributes are that they have a first name last name and birthdate
//sex is used as a visual and relationship semantic
//id is the key

function Person(id,firstname,lastname,birthdate,sex)
{
	this.id = id;
	//KEY
	this.firstname = firstname;
	this.lastname = lastname;
	this.birthdate = birthdate
	this.sex = sex
	this.parents = [];
	this.children = []
}


function VisualPerson()
{
	this.x = 0
	this.y = 0
	this.width = 10
	this.height = 10
	
}

function VisualCouple(couple)
{
	this.couple = couple
	this.x = 0
	
	this.y = 0
	
	getX = function(vp)
	{
		return vp.x
	}
	
	getY = function(vp)
	{
		return vp.y
	}
	
}

//This Datastrucutre is a directed acylic Hypergraph
function FamilyTree(people)
{
	//Vertices/People
	this.V = people;
	this.C = {}
	this.people = []
	this.center = null
	//Default values for all other 

	//First add all the people
	for(pi in this.V)  {
		var person = this.V[pi] 
		$.extend(person,new VisualPerson())
		this.V[person.id] = person
		this.people.push(person)
		
		
		if(this.center == null)
		{
			this.center = person
		}
		
		if(person.parents != null && person.parents.length > 0)
		{
			//Sort them based on sex and age
			person.parents.sort(function(a,b) { 
				if(a.sex == b.sex) 
				{	
					return a.birthdate - b.birthdate
				} 
				else if (a.sex == 'm') 
				{ 
					return -1 
				}
				else if (a.sex == 'f') 
				{ 
					return 1 
				} 
				});
			
			//create children property
			for(var pi in person.parents.slice(0))
			{
				var par = person.parents[pi]
				par.children.push(person) 
			}
			
			//make list a Visual Node
			if(!(person.parents in this.C))
			{
				$.extend(person.parents,new VisualCouple())
				this.C[person.parents] = person.parents
			}
			//person.parents = this.C[person.parents]
		}
		
		console.log(person.parents)
		
	}

	this.layout = function()
	{
		var dirty = []
		for(var v in this.V)
		{
			dirty.push(this.V[v])
			var person = this.V[v]
			person.y = person.birthdate
		}	
		//First select the center node and find parents
		
		var ances = function(p,xloc)
		{
			
			if(p.parents == null || p.parents.length == 0)
			{
				return;
			}
			console.log(p + " ; " + xloc)
			var sp = xloc - p.parents.length/2.0 + .5
			var d = 0
			
			for(var pi in p.parents.slice(0))
			{
				var par = p.parents[pi]
				par.x = d + sp
				console.log(par.firstname + " : " + par.x)
				ances(par,par.x)
				d += 1
			}
			
		} 
		ances(this.center,0)		
			
		
	}
	
	this.getX = function(vp)
	{
		return vp.x
	}
	
	this.getY = function(vp)
	{
		return vp.y
	}
	
}	




       
