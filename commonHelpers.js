import{a as p,i as l,S as g}from"./assets/vendor-c493984e.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const L="https://pixabay.com/api/",v="43953173-48a4f3f757f38a8504babc00c",y=async(t="happy",s=1,o=15)=>{const a=new URLSearchParams({key:v,q:t,per_page:o,image_type:"photo",page:s,safesearch:!0,orientation:"horizontal"});try{return(await p.get(`${L}?${a.toString()}`)).data}catch{throw new Error(`Error ${response.status}: ${response.statusText}`)}},w=t=>t.map(({largeImageURL:s,webformatURL:o,tags:a,likes:e,views:r,comments:i,downloads:$})=>`
        <div class="col">
          <div class="card shadow-sm">
            <a href="${s}" class="gallery-link">
              <img src="${o}" alt="${a}" class="gallery-img img-fluid" />
            </a>
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                
                <small class="text-body-secondary">Likes ${e}</small>
                <small class="text-body-secondary">Views ${r}</small>
                <small class="text-body-secondary">Comments ${i}</small>
              </div>
            </div>
          </div>
        </div>`).join(""),n=document.querySelector(".js-gallery"),b=document.querySelector(".js-search-form"),u=document.querySelector(".js-loader"),d=document.querySelector(".js-load-more");let m="",c=1,h=0;const S=15,E=async t=>{if(t.preventDefault(),m=t.target.elements.searchKeyword.value.trim(),m===""){n.innerHTML="",t.target.reset(),l.show({message:"Input field cannot be empty",position:"center",timeout:2e3,color:"red"});return}n.innerHTML="",u.classList.remove("is-hidden"),d.classList.add("is-hidden"),c=1;try{const s=await y(m,c);h=Math.ceil(s.totalHits/S),f(s),h>1&&d.classList.remove("is-hidden")}catch{l.show({message:"Search params are not valid",position:"center",timeout:2e3,color:"red"})}finally{u.classList.add("is-hidden")}},M=async()=>{u.classList.remove("is-hidden");try{const t=await y(m,c+1);f(t,!0),c+=1,c>=h&&(d.classList.add("is-hidden"),l.show({message:"You have reached the end of the results",position:"center",timeout:2e3,color:"blue"}))}catch(t){console.error("Error fetching photos:",t),l.show({message:"Search params are not valid",position:"center",timeout:2e3,color:"red"})}finally{u.classList.add("is-hidden")}},f=(t,s=!1)=>{if(t.hits.length===0){l.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"center",timeout:2e3,color:"red"}),n.innerHTML="",d.classList.add("is-hidden");return}const o=w(t.hits);s?n.insertAdjacentHTML("beforeend",o):n.innerHTML=o,new g(".card a").refresh()};b.addEventListener("submit",E);d.addEventListener("click",M);
//# sourceMappingURL=commonHelpers.js.map
