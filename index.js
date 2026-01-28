import{S as g,i as c}from"./assets/vendor-5ObWk2rO.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(e){if(e.ep)return;e.ep=!0;const a=s(e);fetch(e.href,a)}})();const y="https://pixabay.com/api/",u="54359388-9cf15bfeabb0906e8f4ff86d6";function v(r){const t=new URL(y);return t.searchParams.set("key",u),t.searchParams.set("q",r),t.searchParams.set("image_type","photo"),t.searchParams.set("orientation","horizontal"),t.searchParams.set("safesearch","true"),console.log("USING KEY:",u),console.log("REQUEST URL:",t.toString()),fetch(t.toString()).then(s=>{if(!s.ok)throw new Error(`HTTP ${s.status}`);return s.json()}).then(s=>Array.isArray(s.hits)?s.hits:[])}function L(r){return String(r).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function b(r){return r.map(({webformatURL:t,largeImageURL:s,tags:i,likes:e,views:a,comments:o,downloads:p})=>{const h=L(i);return`
<li class="card">
  <a class="card-link" href="${s}">
    <img class="card-img" src="${t}" alt="${h}" loading="lazy" />
  </a>

  <div class="meta">
    <div class="meta-item">
      <span class="meta-title">Likes</span>
      <span class="meta-value">${e}</span>
    </div>
    <div class="meta-item">
      <span class="meta-title">Views</span>
      <span class="meta-value">${a}</span>
    </div>
    <div class="meta-item">
      <span class="meta-title">Comments</span>
      <span class="meta-value">${o}</span>
    </div>
    <div class="meta-item">
      <span class="meta-title">Downloads</span>
      <span class="meta-value">${p}</span>
    </div>
  </div>
</li>`}).join("")}const d=document.querySelector(".search-form"),f=document.querySelector(".gallery"),n=document.querySelector(".loader-backdrop"),l=document.getElementById("loadingText"),E=new g(".gallery a",{captionsData:"alt",captionDelay:250});function S(){l&&l.classList.add("is-visible"),n&&(n.classList.remove("is-hidden"),n.setAttribute("aria-hidden","false"))}function P(){l&&l.classList.remove("is-visible"),n&&(n.classList.add("is-hidden"),n.setAttribute("aria-hidden","true"))}function m(){f.innerHTML=""}function A(){c.warning({message:"Please enter a search query.",position:"topRight"})}function w(){c.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}function q(){c.error({message:"Something went wrong. Please try again later.",position:"topRight"})}d.addEventListener("submit",r=>{r.preventDefault();const t=r.currentTarget.elements.query.value.trim();if(!t){m(),A();return}m(),S(),v(t).then(s=>{if(!s.length){w();return}const i=b(s);f.insertAdjacentHTML("beforeend",i),E.refresh()}).catch(()=>{q()}).finally(()=>{P(),d.reset()})});
//# sourceMappingURL=index.js.map
