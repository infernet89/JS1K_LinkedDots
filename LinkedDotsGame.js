setInterval(run, 33);
var points=[];
var links=[];
var level=4;
var mx;
var my;
var clicked=false;
var draggingPoint=-1;
a.addEventListener("mousemove", function (e) { mx=e.clientX; my=e.clientY;});
a.addEventListener("mousedown", function (e) {
  clicked=true;
  for(i in points)
    if( distance(points[i].x, points[i].y,mx,my) < 400)
      draggingPoint=i;
      
});
a.addEventListener("mouseup", function (e) { clicked=false; draggingPoint=-1;});
//START DEBUG
for(i=0;i<4;i++)
{
  var tmp=new Object();
  tmp.x=Math.random()*a.width;
  tmp.y=Math.random()*a.height;
  tmp.color="Blue"
  points.push(tmp);
}
links[0]=new Object();
links[0].from=0;
links[0].to=1;
links[0].c="Blue";
links[1]=new Object();
links[1].from=0;
links[1].to=2;
links[1].c="Blue";
links[2]=new Object();
links[2].from=0;
links[2].to=3;
links[2].c="Blue";
links[3]=new Object();
links[3].from=1;
links[3].to=2;
links[3].c="Blue";
links[4]=new Object();
links[4].from=1;
links[4].to=3;
links[4].c="Blue";
links[5]=new Object();
links[5].from=2;
links[5].to=3;
links[5].c="Blue";
//END DEBUG
function over(py,x1,y1,x2,y2,x)
{
  if(((y2-y1) / (x2-x1+0.1))* (x-x1) + y1 - py < 0)
    return 1;
  if(((y2-y1) / (x2-x1+0.1))* (x-x1) + y1 - py > 0)
    return -1;
}
function indipendenti(a,b,a1,b1)
{
  //console.log("Controllo "+a+"-"+b+"  con  "+a1+"-"+b1);
  var x = points[a].x;
  var y = points[a].y;
  var x1 = points[b].x;
  var y1 = points[b].y;
  var x2 = points[a1].x;
  var y2 = points[a1].y;
  var x3 = points[b1].x;
  var y3 = points[b1].y;
  //TRUST PAST ME.
  if (
    over(y1, x2,y2,x3,y3,x1) + 
    over(y , x2,y2,x3,y3,x ) == 0 
    && 
    over(y2, x,y,x1,y1,x2) + 
    over(y3, x,y,x1,y1,x3) == 0)
    return false;
  return true;
}
function distance(ax,ay,bx,by)
{
  return (ax-bx)*(ax-bx)+(ay-by)*(ay-by);
}
function drawPoint(x,y,color)
{
  c.fillStyle=color;
  c.beginPath();
  c.arc(x,y,15,0,6);
  c.fill();
}
function drawAllConnections()
{
  c.lineWidth=2;
  for(k in links)
  {
    c.strokeStyle=links[k].c;
    c.beginPath();
    c.moveTo(points[links[k].from].x,points[links[k].from].y);
    c.lineTo(points[links[k].to].x,points[links[k].to].y);
    c.stroke();
  }
  return;
}
//controlla e colora
function check()
{
  var allSafe=true;
  //collisioni dei punti
  for(i in points)
  {
    points[i].color="Blue";
    for(k in points)
    {
      if(i==k)
        continue;
      if(distance(points[i].x,points[i].y,points[k].x,points[k].y)<400)
      {
        points[i].color="Red";
        allSafe=false;
        break;
      }
    }
  }
  //reset colori
  for(k in links)
    links[k].c="Blue";
  //collisioni dei link
  for(i in links)
    for(k in links)
    {
      if(i==k || links[i].from==links[k].from || links[i].to==links[k].to || links[i].from==links[k].to || links[i].to==links[k].from)
        continue;
      if(!indipendenti(links[i].from, links[i].to, links[k].from, links[k].to))
          {
            links[i].c="Red";
            //links[k].c="Red";
            allSafe=false;
          }
    }
  return allSafe;
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
  check();
  //Draw the points
  for(i=0;i<level;i++)
    drawPoint(points[i].x,points[i].y,points[i].color);
    

  drawAllConnections();
}
