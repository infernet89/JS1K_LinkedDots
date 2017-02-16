
var activeTask=setInterval(run, 33);
var points=[];
var connections=[];
var connectionsColor=Create2DArray(4);
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
      draggingPoint=i;
      
});
a.addEventListener("mouseup", function (e) { clicked=false; draggingPoint=-1;});
//START DEBUG
connections[0]=[1,2,3];
connections[1]=[2,3];
connections[2]=[3];
connectionsColor[0][1]="Blue";
connectionsColor[0][2]="Blue";
connectionsColor[0][3]="Blue";
connectionsColor[1][2]="Blue";
connectionsColor[1][3]="Blue";
connectionsColor[2][3]="Blue";
//END DEBUG
function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}
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
      c.strokeStyle=connectionsColor[i][k];

      c.beginPath();
      c.moveTo(points[i].x,points[i].y);
      c.lineTo(points[connections[i][k]].x,points[connections[i][k]].y);
      c.stroke();
    }
  }
}
//controlla e colora
function check()
{
  var allSafe=true;
  //collisioni dei punti
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
        allSafe=false;
        break;
      }
    }
  }
  //collisioni dei link
  for(i=0;i<level;i++)
    for(k in connections[i])
      for(j=0;j<level;j++)
        for(l in connections[j])
        { //i-k   j-l   i<k   j<l
          if(i==j || i==l || k==j || k==l)
            continue; //se c'è un punto in comune, non possono collidere
          if(!indipendenti(i,k,j,l))
          {
            connectionsColor[i][k]="Red";
            connectionsColor[j][l]="Red";
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
function retta(primo,secondo,x)
{
  var x1=points[primo].x;
  var x2=points[secondo].x;
  var y1=points[primo].y;
  var y2=points[secondo].y;
  if(x1==x2)
    x1+=0.3;
  return (y2-y1) / (x2-x1) * (x-x1) + y1;
}
function over(p,yretta)
{
  if(points[p].y > yretta)
    return 1;
  if(points[p].y < yretta)
    return -1;
  return 0;
}
function indipendenti(a,b,a1,b1)
{
  var x = points[a].x;
  var y = points[a].y;
  var x1 = points[b].x;
  var y1 = points[b].y;
  var x2 = points[a1].x;
  var y2 = points[a1].y;
  var x3 = points[b1].x;
  var y3 = points[b1].y;
  //TRUST PAST ME.
  if (over(a, retta(a1, b1, points[a].x)) + this.over(b, retta(a1, b1, points[b].x)) == 0 && over(a1, retta(a, b, points[a1].x)) + over(b1, retta(a, b, points[b1].x)) == 0)
    return false;
  return true;
}


/*
 double retta(int primo, int secondo, double x) {
        double x1 = punti[primo].getX();
        double x2 = punti[secondo].getX();
        double y1 = punti[primo].getY();
        double y2 = punti[secondo].getY();
        if (x2 == x1) {
            x1 += 0.3;
        }
        double y = (y2 - y1) / (x2 - x1) * (x - x1) + y1;
        return y;
    }

    int over(int punto, double ydellaretta) {
        if ((double)punti[punto].getY() > ydellaretta) {
            return 1;
        }
        if ((double)punti[punto].getY() < ydellaretta) {
            return -1;
        }
        return 0;
    }

    boolean indipendenti(int a, int b, int a1, int b1) {
        if (a == b || a == a1 || a == b1 || b == a1 || b == b1 || a1 == b1) {
            return true;
        }
        double x = punti[a].getX();
        double y = punti[a].getY();
        double x1 = punti[b].getX();
        double y1 = punti[b].getY();
        double x2 = punti[a1].getX();
        double y2 = punti[a1].getY();
        double x3 = punti[b1].getX();
        double y3 = punti[b1].getY();
        double m = (y1 - y) / (x1 - x);
        double m1 = (y3 - y2) / (x3 - x2);
        if (this.over(a, this.retta(a1, b1, punti[a].getX())) + this.over(b, this.retta(a1, b1, punti[b].getX())) == 0 && this.over(a1, this.retta(a, b, punti[a1].getX())) + this.over(b1, this.retta(a, b, punti[b1].getX())) == 0) {
            return false;
        }
        return true;
    }*/