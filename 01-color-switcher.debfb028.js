const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let r=null;t.addEventListener("click",(()=>{r=setInterval((()=>{t.setAttribute("disabled",!0),document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),e.addEventListener("click",(()=>{clearInterval(r),t.removeAttribute("disabled")}));
//# sourceMappingURL=01-color-switcher.debfb028.js.map