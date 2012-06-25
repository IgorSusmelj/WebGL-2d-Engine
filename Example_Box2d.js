/**
 * 
 */

var sprite;
var example;
var font;
var map;

var audioTest;

var rotStep=0.0;


//Box2d vars

var world;
var circleBody;
var groundBody;

var y_pos_ofBody = 0.5;



var   b2Vec2 = Box2D.Common.Math.b2Vec2
	,	b2BodyDef = Box2D.Dynamics.b2BodyDef
	,	b2Body = Box2D.Dynamics.b2Body
	,	b2FixtureDef = Box2D.Dynamics.b2FixtureDef
	,	b2Fixture = Box2D.Dynamics.b2Fixture
	,	b2World = Box2D.Dynamics.b2World
	,	b2MassData = Box2D.Collision.Shapes.b2MassData
	,	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
	,	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
	,	b2DebugDraw = Box2D.Dynamics.b2DebugDraw
;








function DOM_LOADED(){
	InitEngine(640,480,true,true);
	
}

function GAME_INIT(){
	
	sprite = LoadImage("Resources/nehe.gif",256,256);
	example= LoadImage("Resources/example_texture.jpg",64,64);
	font = LoadFont("Resources/BitmapFont_Calibri.png");
	audioTest = LoadSound("Resources/GetReadyForThis.mp3");



	world = new b2World(new b2Vec2(0,3),true);
	
	/*
	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.2;
	
	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_staticBody;
	bodyDef.position.x = 0.5;
	bodyDef.position.y = 1.0;
	
	fixDef.shape = new b2PolygonShape;
    
	// half width, half height.
	fixDef.shape.SetAsBox(0.5, 0.5);
	*/
	//world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	var CfixDef = new b2FixtureDef;
	var CbodyDef = new b2BodyDef;
	
	CfixDef.density = 1.0;
	CfixDef.friction = 0.5;
	CfixDef.restitution = 0.2;
	
	CfixDef.shape = new b2PolygonShape;
	CfixDef.shape.SetAsBox(0.5,0.01);
	
	
	CbodyDef.type = b2Body.b2_staticBody;
	CbodyDef.position.x = 0.5;
	CbodyDef.position.y = 0.95;
	
	
	world.CreateBody(CbodyDef).CreateFixture(CfixDef);
	
	

	
	CbodyDef.type = b2Body.b2_dynamicBody;
	CfixDef.shape = new b2CircleShape(0.02);
	CbodyDef.position.x = 0.5;
	CbodyDef.position.y = 0.5;
	CbodyDef.userData = 15;
	
	//circleBody = CbodyDef.position.y;
	circleBody = CbodyDef;
	world.CreateBody(CbodyDef).CreateFixture(CfixDef);
	
	
	/*var circleSd = new b2CircleDef();
	circleSd.density=1.0;
	circleSd.radius = 0.2;
	circleSd.restitution = 1.0;
	circleSd.friction=0;
	var circleBd = new b2BodyDef();
	circleBd.AddShape(circleSd);
	circleBd.position.Set(0.5,0.2);

	circleBody = world.CreateBody(circleBd);
	

	
	var jointDef = new b2RevoluteJointDef();
	jointDef.anchorPoint.Set(0.25, 0.2);
	jointDef.body1 = world.GetGroundBody();
	jointDef.body2 = circleBody;
	//world.CreateJoint(jointDef);
	
	*/
	SetFont(font);
}

function GAME_RENDER(){
	world.Step(1/60,1,1);
	RotateImage(sprite,rotStep);
	DrawImage(sprite,0.0,0.0);
	if(MouseDown(1))
		rotStep+=0.05;
	if(MouseDown(2))
		rotStep-=0.05;
	SetFont(font);
	
	for(var b = world.GetBodyList(); b; b = b.m_next){
		if( b.GetUserData()==15)
			{
				y_pos_ofBody = b.GetPosition().y;
				//alert(y_pos_ofBody);
			}
	}
	
	Text(0.6,y_pos_ofBody,"Poss");
	//if(KeyDown(38))
		//alert(circleBody.position.y);
	
	
}

function GAME_END(){
	
}

