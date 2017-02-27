//< >
with(c)
{
  //setInterval(rn, 33);
  var p=[];
  var l=[];
  var lvl=3;
  var mx;
  var my;
  var ck=0;
  var dp=-1;
  var ds=0;
  onmousemove=e=>{ mx=e.clientX; my=e.clientY;};
  onmousedown=e=>{
    ck=1;
    for(i in p)
      if( di(p[i].x, p[i].y,mx,my) < 400)
        dp=i;
        
  };
  onmouseup=e=>{ ck=0; dp=-1;};
  id=(a,b,a1,b1)=>
  {
    //console.log("Controllo "+a+"-"+b+"  con  "+a1+"-"+b1);
    var x = p[a].x;
    var y = p[a].y;
    var x1 = p[b].x;
    var y1 = p[b].y;
    var x2 = p[a1].x;
    var y2 = p[a1].y;
    var x3 = p[b1].x;
    var y3 = p[b1].y;
    //TRUST PAST ME.
    if (
      ((y3-y2) * (x1-x2) / (x3-x2+0.1) + y2 - y1) * 
      ((y3-y2) * (x-x2 ) / (x3-x2+0.1) + y2 - y ) < 0 
      && 
      ((y1-y)  * (x2-x) /  (x1-x +0.1) + y  - y2) * 
      ((y1-y)  * (x3-x) /  (x1-x +0.1) + y  - y3) < 0)
      return 0;
    return 1;
  };
  di=(ax,ay,bx,by)=>
  {
    return (ax-bx)*(ax-bx)+(ay-by)*(ay-by);
  };
  dt=(x,y,cl)=>
  {
    fillStyle=cl;
    beginPath();
    arc(x,y,15,0,6);
    fill();
  };
  setInterval(function()
  {
  	//draw the background
  	fillStyle="#aaa";
  	fillRect(0,0,a.width,a.height);

    if(ck && dp > -1)
      p[dp].x=mx,p[dp].y=my
    s=1;
    //collisioni dei punti
    for(i in p)
    {
      p[i].cl="Blue";
      for(k in p)
      {
        if(i==k)
          continue;
        if(di(p[i].x,p[i].y,p[k].x,p[k].y)<400)
          p[i].cl="Red",s=0
      }
    }
    //reset cli
    for(k in l)
      l[k].c="Blue";
    //collisioni dei link
    for(i in l)
      for(k in l)
      {
        if(i==k || l[i].f==l[k].f || l[i].to==l[k].to || l[i].f==l[k].to || l[i].to==l[k].f)
          continue;
        if(!id(l[i].f, l[i].to, l[k].f, l[k].to))
              l[i].c="Red",s=0
      }
    if(s)
      {
        lvl++;
        p=[];
        l=[];
        //p
        for(i=0;i<lvl;i++)
          p.push({ x: Math.random()*a.width , y:y=Math.random()*a.height});
        //l
        for(i=0;i<lvl;i++)
          for(k=i+1;k<lvl;k++)
            l.push({f: i, to: k});
        //make it solvable, kinda.
        for(k=4;k<lvl;k++)
          for(i=k;i<lvl;i++)
            l.splice(~~(Math.random()*l.length),1)
      }
    //Draw the p
    for(i=0;i<lvl;i++)
      dt(p[i].x,p[i].y,p[i].cl);
      

    lineWidth=2;
    for(k in l)
    {
      strokeStyle=l[k].c;
      beginPath();
      moveTo(p[l[k].f].x,p[l[k].f].y);
      lineTo(p[l[k].to].x,p[l[k].to].y);
      stroke();
    }
    //if you are desperated, we make the game easier
    if(ds++>1000)
      ds=0,l.splice(~~(Math.random()*l.length),1)
  },33);
}