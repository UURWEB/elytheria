(function(){
  "use strict";
  function byId(id){ return document.getElementById(id); }
  document.addEventListener("DOMContentLoaded", function(){
    var counter=byId("counter");
    if(counter){
      var visits=parseInt(localStorage.getItem("elytheria_visits")||"4206",10)+1;
      localStorage.setItem("elytheria_visits",String(visits));
      counter.textContent=String(visits).padStart(6,"0");
    }
  });
  window.gardenTune=function(){
    var status=byId("musicStatus");
    if(status) status.textContent="BoletusGarden.mid is waking up...";
    try{
      var AC=window.AudioContext||window.webkitAudioContext;
      var ctx=new AC();
      [261.63,329.63,392.00,523.25,392.00,329.63].forEach(function(freq,i){
        var o=ctx.createOscillator(), g=ctx.createGain();
        o.type="sine"; o.frequency.value=freq; g.gain.setValueAtTime(0.0001,ctx.currentTime+i*.18);
        g.gain.exponentialRampToValueAtTime(.08,ctx.currentTime+i*.18+.02);
        g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+i*.18+.16);
        o.connect(g); g.connect(ctx.destination); o.start(ctx.currentTime+i*.18); o.stop(ctx.currentTime+i*.18+.18);
      });
      setTimeout(function(){ if(status) status.textContent="♫ MIDI complete. The windmill approves. ♫"; },1250);
    }catch(e){ if(status) status.textContent="MIDI driver not found. Please hum gently."; }
  };
  var places={
    M:"Mooncap Gate: guest houses, bright roofs, and the official beginning of most walks.",
    Q:"Queen's Hall: royal gardens, ceremonial rooms, and an alarming number of watering cans.",
    U:"Unity Gardens: public plots maintained by residents, schools, and guilds.",
    H:"Honeywind Mill: grain, flour, wind, and a staircase built by an optimist.",
    T:"Great Boletus Tree: ancient landmark. Root access is not on the tourist map.",
    C:"Boletus Commons: markets, notices, music, petitions, and very long conversations."
  };
  window.mapPlace=function(code){ var out=byId("mapDisplay"); if(out) out.textContent=places[code]||"The applet has become lost."; };
  window.routeWord=function(){
    var input=(byId("routeWord")||{}).value||"";
    var word=input.toUpperCase().replace(/[^A-Z]/g,"");
    var out=byId("routeResult");
    if(!out) return;
    if(word==="MUSHROOM") out.innerHTML="ROUTE FOUND: Mushroom Walk confirmed. The ring-master says a second word grows beneath the Queen's blessings.";
    else if(word==="BENEATHTHEMUSHROOM") out.innerHTML="ROOT ROUTE EXISTS. Continue through the final member of the <a href=\"webring.html\">Peace Garden Web Ring</a>.";
    else out.textContent="NO FRIENDLY ROUTE FOUND. Try a word grown from the capital walk.";
  };
  window.submitMove=function(){
    var n=(byId("moveName")||{}).value||"future neighbor";
    var skill=(byId("moveSkill")||{}).value||"enthusiasm";
    var out=byId("moveResult");
    if(out){out.style.display="block";out.innerHTML="WELCOME, <b>"+escapeHtml(n)+"</b>! Your "+escapeHtml(skill)+" packet has been placed in the outgoing basket. The modem did not answer, but the basket is labeled very clearly.";}
  };
  window.signGuestbook=function(){
    var n=(byId("guestName")||{}).value||"Anonymous Flower";
    var m=(byId("guestMessage")||{}).value||"Peace to Boletus!";
    var out=byId("guestThanks");
    if(!out) return;
    out.style.display="block";
    if((n+" "+m).toUpperCase().indexOf("ROOT")>=0){
      out.innerHTML="GuestBook.cgi ERROR 57: entry redirected to ring-master cache. <a href=\"webring.html\">Inspect the web ring.</a>";
    }else{
      out.innerHTML="Thank you, <b>"+escapeHtml(n)+"</b>! Your message was saved in this browser because the guestbook cable is supporting a tomato vine.";
      try{localStorage.setItem("ely_guest",JSON.stringify({name:n,message:m}));}catch(e){}
    }
  };
  window.deadRing=function(name){ alert(name+" did not answer. The web ring reports: CONNECTION GREW OVER."); return false; };
  function escapeHtml(s){return String(s).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c];});}
})();
