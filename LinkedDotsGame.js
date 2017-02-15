
var activeTask=setInterval(run, 33);
var points=[];
var connections=[];
var level=4;
for(i=0;i<4;i++)
{
  var tmp=new Object();
  tmp.x=Math.random()*a.width;
  tmp.y=Math.random()*a.height;
  tmp.color="Blue"
  points.push(tmp);
}
var mx;
var my;
var clicked=false;
var draggingPoint=-1;
a.addEventListener("mousemove", function (e) { mx=e.clientX; my=e.clientY;});
a.addEventListener("mousedown", function (e) {
  clicked=true;
  for(i=0;i<level;i++)
    if( distance(points[i].x, points[i].y,mx,my) < 400)
    {
      draggingPoint=i;
      console.log(i);
    }
      
});
a.addEventListener("mouseup", function (e) { clicked=false; draggingPoint=-1;});
//DEBUG
connections[0]=[1,2,3];
connections[1]=[2,3];
connections[2]=[3];
//END DEBUG
function distance(ax,ay,bx,by)
{
  return (ax-bx)*(ax-bx)+(ay-by)*(ay-by);
}
function drawPoint(x,y,color)
{
  c.fillStyle=color;
  c.beginPath();
  c.arc(x,y,15,0,2*Math.PI);
  c.fill();
}
function drawAllConnections()
{
  for(i=0;i<level;i++)
  {
    c.lineWidth=2;
    for(k in connections[i])
    {
      //CHECK, e scegli il colore
      c.strokeStyle="Blue";

      c.beginPath();
      c.moveTo(points[i].x,points[i].y);
      c.lineTo(points[connections[i][k]].x,points[connections[i][k]].y);
      c.stroke();
    }
  }
}
function run()
{
	//draw the background
	c.fillStyle="Silver";
	c.fillRect(0,0,a.width,a.height);

  if(clicked && draggingPoint > -1)
  {
    points[draggingPoint].x=mx;
    points[draggingPoint].y=my;
  }

  //Draw the points
  for(i=0;i<level;i++)
  {
    points[i].color="Blue";
    for(k=0;k<level;k++)
    {
      if(i==k)
        continue;
      if(distance(points[i].x,points[i].y,points[k].x,points[k].y)<400)
      {
        points[i].color="Red";
        break;
      }
    }
    drawPoint(points[i].x,points[i].y,points[i].color);
  }
    

  drawAllConnections();
}