(function(){
"use strict";
var t=document.getElementById("terminal"),input=document.getElementById("cmd"),wrap=document.getElementById("consoleWrap"),denied=document.getElementById("denied");
if(requireRoot()){denied.style.display="none";wrap.style.display="block";}
function say(x){t.textContent+="\n\n"+x;t.scrollTop=t.scrollHeight}
var files={
"SANDGLASS":"CASE SANDGLASS\nPublic military-page defacement: amateur juvenile in Central. No Imperial contact. Union authorities closed the account and handled the matter. Full file: ROUTE CASE",
"MANDATE":"QUIET WEB MANDATE\nDo not claim control of a system merely because its public page can be altered. Do not recruit through spectacle. Preserve access. Observe first. Speak only at the gate.",
"ROUTES":"LIVE ROUTE MARKS\nCentral City Radio\nRoyal legacy directories\nIndustrial mirrors\nMilitary archive [burned]\nSolis civic pages\nOld NCN cache\nNetwork index\n\nRead the initial marks. The gate names the color, then the star.",
"NEON":"ELYTHERIA STATUS\nQueen Neon: not contacted. Mushroom Council: not contacted. Tourism Bureau: unaware. The old web-ring redirect was selected because the public site is harmless, trusted, and rarely maintained."
};
window.runCommand=function(){if(!requireRoot())return;var raw=input.value.trim(),parts=raw.split(/\s+/),cmd=(parts.shift()||"").toUpperCase(),arg=parts.join(" ").toUpperCase();say("> "+raw);input.value="";
if(cmd==="HELP")say("HELP  STATUS  DIR  OPEN <FILE>  NODES  AUTH <PHRASE>  ROUTE <NAME>  CLEAR  EXIT");
else if(cmd==="STATUS")say("GARDEN ROOT: ACTIVE\nELYTHERIA PUBLIC SITE: UNAWARE\nASTARI SELECTION GATE: "+(requireAstari()?"OPEN":"LOCKED")+"\nU.U.R. RECOVERY SCANNERS: INTERMITTENT");
else if(cmd==="DIR")say("SANDGLASS.TXT\nMANDATE.TXT\nROUTES.TXT\nNEON.TXT");
else if(cmd==="OPEN")say(files[arg.replace(/\.TXT$/,'')]||"FILE NOT FOUND");
else if(cmd==="NODES")say("ELY-GARDEN [ACTIVE]\nCCR-CARRIER [AVAILABLE]\nNCN-MIRROR [READ ONLY]\nUUR-RECOVERY [WATCH]\nUURMIL-OLD [BURNED]\nSELECTION [LOCKED]");
else if(cmd==="AUTH"){if(unlockRecruit(arg)){say("SELECTION GATE ACCEPTED. ROUTE RECRUIT is now available.")}else say("SELECTION PHRASE REJECTED.");}
else if(cmd==="ROUTE"){if(arg==="CASE")location.href="case-central.html";else if(arg==="NETWORK")location.href="network.html";else if(arg==="RECRUIT"&&requireAstari())location.href="recruit.html";else say("ROUTE UNAVAILABLE.");}
else if(cmd==="CLEAR")t.textContent="GARDEN ROOT / ASTARI TRANSIT CACHE\nType HELP.";
else if(cmd==="EXIT")location.href="../index.html";
else say("UNKNOWN COMMAND. TYPE HELP.");};
input&&input.addEventListener("keydown",function(e){if(e.key==="Enter")runCommand()});
})();