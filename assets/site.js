
(function(){
 var b=document.querySelector('.burger'),n=document.getElementById('mainnav');
 if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu');});
  n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){n.classList.remove('open');b.setAttribute('aria-expanded','false');});});}
 var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12}):null;
 document.querySelectorAll('.reveal').forEach(function(el){io?io.observe(el):el.classList.add('in');});
 // funnel demo
 var steps=document.querySelectorAll('.funnel-steps li'),bar=document.querySelector('.funnel-bar span'),clk=document.querySelector('[data-clock]');
 if(steps.length){var i=0,times=['2:14 AM','2:14 AM','2:16 AM','2:19 AM','7:02 AM'];
  function tick(){steps.forEach(function(s,k){s.classList.toggle('on',k===i);s.classList.toggle('done',k<i);});
   if(bar)bar.style.width=((i+1)/steps.length*100)+'%';if(clk)clk.textContent=times[i];i=(i+1)%steps.length;}
  tick();setInterval(tick,window.matchMedia('(prefers-reduced-motion: reduce)').matches?4000:2200);}
 // sparkle canvas (snow drifting up the ridges)
 var c=document.querySelector('.hero canvas');
 if(c&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){var x=c.getContext('2d'),P=[],W,H,dpr=Math.min(2,window.devicePixelRatio||1);
  function rs(){W=c.clientWidth;H=c.clientHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);}
  rs();window.addEventListener('resize',rs);
  for(var k=0;k<46;k++)P.push({x:Math.random(),y:Math.random(),r:1+Math.random()*2.6,v:.0006+Math.random()*.0012,h:Math.random()<.5?'14,159,154':'255,107,53'});
  (function f(){x.clearRect(0,0,W,H);P.forEach(function(p){p.y-=p.v;p.x+=Math.sin(p.y*12)*.0004;if(p.y<-.02){p.y=1.02;p.x=Math.random();}
   x.beginPath();x.arc(p.x*W,p.y*H,p.r,0,6.283);x.fillStyle='rgba('+p.h+','+(0.18+0.25*(1-p.y))+')';x.fill();});requestAnimationFrame(f);})();}
 // books health check
 var hc=document.getElementById('healthcheck');
 if(hc){var ans={};hc.querySelectorAll('.q').forEach(function(q,qi){q.querySelectorAll('button').forEach(function(bt){bt.addEventListener('click',function(){
   q.querySelectorAll('button').forEach(function(z){z.classList.remove('sel');});bt.classList.add('sel');ans[qi]=bt.dataset.v==='1';
   var keys=Object.keys(ans);var out=hc.querySelector('.out');var bad=keys.filter(function(k){return !ans[k];}).length;
   if(keys.length<hc.querySelectorAll('.q').length){out.innerHTML='Answered '+keys.length+' of '+hc.querySelectorAll('.q').length+'.';return;}
   var msg=bad===0?'<b>Healthy.</b> Your books look current. Monthly bookkeeping keeps them that way.':bad<=2?'<b>Slipping.</b> A short cleanup now prevents a big one in April.':'<b>Catch-up time.</b> You likely need a catch-up project before taxes can be filed accurately. Start with the months you’re missing.';
   out.innerHTML=msg;});});});}
 // lead leak calculator
 var ll=document.getElementById('leakcalc');
 if(ll){function calc(){var a=+ll.querySelector('[name=inq]').value||0,p=+ll.querySelector('[name=lost]').value||0,v=+ll.querySelector('[name=val]').value||0;
   var lost=a*(Math.min(p,100)/100)*v*12;ll.querySelector('.out').innerHTML='Estimated revenue walking away each year: <b>$'+Math.round(lost).toLocaleString()+'</b><br><small>Based only on the numbers you entered.</small>';}
  ll.querySelectorAll('input').forEach(function(i){i.addEventListener('input',calc);});calc();}
})();
