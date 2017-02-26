//< >
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
generateLevel()
//END DEBUG
function generateLevel()
{
  points=[];
  links=[];
  //points
  for(i=0;i<level;i++)
    points.push({ x: Math.random()*a.width , y:y=Math.random()*a.height});
  //links
  for(i=0;i<level;i++)
  {
    from=links.length;
    for(k=i+1;k<level;k++)
      links.push({from: i, to: k});
  }
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
    ((y3-y2) * (x1-x2) / (x3-x2+0.1) + y2 - y1) * 
    ((y3-y2) * (x-x2 ) / (x3-x2+0.1) + y2 - y ) < 0 
    && 
    ((y1-y)  * (x2-x) /  (x1-x +0.1) + y  - y2) * 
    ((y1-y)  * (x3-x) /  (x1-x +0.1) + y  - y3) < 0)
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
  if(check())
  {
    level++;
    generateLevel();
    document.title=level;
  }
  //Draw the points
  for(i=0;i<level;i++)
    drawPoint(points[i].x,points[i].y,points[i].color);
    

  drawAllConnections();
}
