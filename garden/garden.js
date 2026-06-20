(function(){
"use strict";
function id(x){return document.getElementById(x)}
function norm(s){return String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"")}
function fnv(s){var h=2166136261>>>0;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}return h>>>0}
window.unlockRoot=function(e){if(e)e.preventDefault();var v=norm(id("rootKey").value),msg=id("gateMsg");if(fnv(v)===2871153197){localStorage.setItem("ely_root","1");msg.innerHTML='<span class="good">ROOT ROUTE ACCEPTED.</span> Refreshing ring table...';setTimeout(function(){location.reload()},600)}else{msg.innerHTML='<span class="bad">PHRASE REJECTED.</span> Two acrostics. Put THE between them.';}}
window.unlockRecruit=function(v){if(fnv(norm(v))===1173650302){localStorage.setItem("astari_gate","1");return true}return false}
window.requireRoot=function(){return localStorage.getItem("ely_root")==="1"}
window.requireAstari=function(){return localStorage.getItem("astari_gate")==="1"}
window.resetGarden=function(){localStorage.removeItem("ely_root");localStorage.removeItem("astari_gate");location.href="../index.html"}
window.submitCandidate=function(e){e.preventDefault();var out=id("candidateResult");var role=id("role").value;var alias=id("alias").value||"UNNAMED";var code=(fnv(norm(alias+role))%9000+1000);localStorage.setItem("astari_candidate",alias);out.innerHTML='<span class="good">CANDIDATE FILE CREATED: AS-'+code+'</span><br>Role: '+role+'<br>Nothing was transmitted. This static archive has only marked your browser.';out.style.display="block";}
})();