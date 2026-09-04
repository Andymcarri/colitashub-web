(() => {
  "use strict";

  const photos = [
    "https://media.nannaspa.com/catalogo/masajistas/Zoe/zoe-masajista-nanna-lima-lenceria-01.webp",
    "https://media.nannaspa.com/catalogo/masajistas/Zoe/zoe-masajista-nanna-lima-lenceria-02.webp",
    "https://media.nannaspa.com/catalogo/masajistas/Zoe/zoe-masajista-nanna-lima-lenceria-03.webp",
    "https://media.nannaspa.com/catalogo/masajistas/Zoe/zoe-masajista-nanna-lima-lenceria-04.webp"
  ];

  const serviceImages = {
    relajante: "https://media.nannaspa.com/servicios/masaje-relax-nanna-lima.webp",
    descontracturante: "https://media.nannaspa.com/servicios/masaje-descontracturante-nanna-lima.webp",
    sensi: "https://media.nannaspa.com/servicios/masaje-zenit-nanna-lima.webp",
    tantra: "https://media.nannaspa.com/servicios/masaje-nexo-nanna-lima.webp",
    prive: "https://media.nannaspa.com/servicios/masaje-prive-nanna-lima.webp"
  };

  const services = [
    {
      kicker: "Experiencia Kamasutra",
      title: "Prive",
      image: serviceImages.prive,
      prices: [["30 min","S/220"],["60 min","S/260"]],
      lead: "Experiencia Kamasutra de carácter privado y exclusivo.",
      detail: "Pensada para quienes buscan un encuentro íntimo con la masajista, con mayor cercanía, complicidad y atención personalizada durante toda la sesión. A diferencia del Tantra, Prive se enfoca en una experiencia más reservada y personal, con una conexión más cercana y una dinámica guiada de principio a fin, adaptada al ritmo del encuentro."
    },
    {
      kicker: "Interacción corporal",
      title: "Tantra",
      image: serviceImages.tantra,
      prices: [["30 min","S/180"],["50 min","S/220"]],
      lead: "Experiencia corporal con interacción completa con la masajista.",
      detail: "Desarrollada de forma cercana, progresiva y guiada. Incluye tocamientos suaves y cuidadosamente conducidos durante la sesión, buscando una experiencia más envolvente y participativa. Pensada para quienes desean una atención más cercana, con mayor interacción y un ritmo pausado durante todo el recorrido."
    },
    {
      kicker: "Experiencia sensitiva",
      title: "Sensi",
      image: serviceImages.sensi,
      prices: [["30 min","S/160"],["50 min","S/180"]],
      lead: "Masaje sensitivo de ritmo suave y envolvente, realizado con lencería.",
      detail: "La experiencia es guiada por la profesional y no es interactiva. Ideal para quienes buscan desconectarse profundamente y disfrutar una experiencia suave, envolvente y guiada por la profesional."
    },
    {
      kicker: "Liberación corporal",
      title: "Descontracturante",
      image: serviceImages.descontracturante,
      prices: [["30 min","S/100"],["50 min","S/130"]],
      lead: "Masaje de presión media a firme, enfocado en aliviar tensión muscular.",
      detail: "Trabaja zonas cargadas como espalda, hombros, cuello, zona lumbar y piernas. La sesión de 30 minutos se concentra en una zona específica o en los puntos de mayor tensión. La de 50 minutos permite trabajar con mayor profundidad y complementar varias áreas del cuerpo con un recorrido más completo."
    },
    {
      kicker: "Relajación corporal",
      title: "Relajante",
      image: serviceImages.relajante,
      prices: [["30 min","S/70"],["50 min","S/100"]],
      lead: "Masaje corporal de ritmo suave y envolvente, con presión ligera a media.",
      detail: "Pensado para liberar tensión, reducir el estrés y ayudar al cuerpo a desconectarse del ritmo del día. Se trabajan principalmente espalda, hombros, cuello, brazos y piernas. La sesión de 30 minutos se concentra en las zonas principales, mientras que la de 50 minutos permite un recorrido más completo, pausado y relajante."
    }
  ];

  const track = document.querySelector("#panelTrack");
  const prev = document.querySelector("#galleryPrev");
  const next = document.querySelector("#galleryNext");

  const experienceImage = document.querySelector("#experienceImage");
  const experienceOverlay = document.querySelector("#experienceOverlay");
  const experienceNumber = document.querySelector("#experienceNumber");
  const experienceKicker = document.querySelector("#experienceKicker");
  const experienceTitle = document.querySelector("#experienceTitle");
  const experiencePrices = document.querySelector("#experiencePrices");
  const experienceLead = document.querySelector("#experienceLead");
  const experienceDetail = document.querySelector("#experienceDetail");
  const experienceNav = document.querySelector("#experienceNav");
  const experienceCount = document.querySelector("#experienceCount");

  let activeService = 0;
  let switchTimer = null;

  function renderPanels(){
    const fragment = document.createDocumentFragment();

    photos.forEach((src,index)=>{
      const article = document.createElement("article");
      article.className = "gallery-panel";
      article.setAttribute("aria-label", `Fotografía ${index + 1} de ${photos.length} de Zoe`);

      const img = document.createElement("img");
      img.src = src;
      img.alt = `Zoe en Lima · fotografía ${index + 1}`;
      img.width = 900;
      img.height = 1200;
      img.decoding = "async";
      img.loading = index === 0 ? "eager" : "lazy";
      if(index === 0) img.fetchPriority = "high";

      const number = document.createElement("span");
      number.className = "panel-number";
      number.setAttribute("aria-hidden","true");
      number.textContent = String(index + 1).padStart(2,"0");

      article.append(img, number);
      fragment.append(article);
    });

    track.replaceChildren(fragment);
  }

  function panelWidth(){
    const panel = track.querySelector(".gallery-panel");
    return panel ? panel.getBoundingClientRect().width : 0;
  }

  function move(direction){
    const amount = panelWidth();
    if(!amount) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    const tolerance = 4;

    if(direction > 0){
      if(track.scrollLeft >= maxScroll - tolerance){
        track.scrollTo({left:0,behavior:"smooth"});
      }else{
        track.scrollBy({left:amount,behavior:"smooth"});
      }
      return;
    }

    if(track.scrollLeft <= tolerance){
      track.scrollTo({left:maxScroll,behavior:"smooth"});
    }else{
      track.scrollBy({left:-amount,behavior:"smooth"});
    }
  }

  function renderExperienceNav(){
    const fragment = document.createDocumentFragment();

    services.forEach((service,index)=>{
      const button = document.createElement("button");
      button.className = `experience-tab ${index === activeService ? "is-active" : ""}`;
      button.type = "button";
      button.dataset.service = index;
      button.setAttribute("aria-label", `Mostrar experiencia ${service.title}`);
      button.setAttribute("aria-pressed", index === activeService ? "true" : "false");

      button.innerHTML = `
        <span class="dot" aria-hidden="true"></span>
        <span class="tab-num" aria-hidden="true">${String(index+1).padStart(2,"0")}</span>
        <span class="tab-name">${service.title}</span>
      `;

      button.addEventListener("click",()=>setExperience(index));
      fragment.append(button);
    });

    experienceNav.replaceChildren(fragment);
  }

  function applyExperienceContent(service,index){
    experienceImage.src = service.image;
    experienceImage.alt = `${service.title} con Zoe`;
    experienceNumber.textContent = String(index+1).padStart(2,"0");
    experienceKicker.textContent = service.kicker;
    experienceTitle.textContent = service.title;
    experienceLead.textContent = service.lead;
    experienceDetail.textContent = service.detail;
    experienceCount.textContent = `${String(index+1).padStart(2,"0")} / ${String(services.length).padStart(2,"0")}`;

    experiencePrices.setAttribute("aria-label", `Precios de ${service.title}`);
    experiencePrices.innerHTML = service.prices.map(([time,price])=>
      `<span class="price-chip">${time} <strong>${price}</strong></span>`
    ).join("");
  }

  function setExperience(index){
    if(index === activeService && experienceImage.src) return;

    activeService = index;
    const service = services[index];

    clearTimeout(switchTimer);

    experienceImage.classList.add("is-changing");
    experienceOverlay.classList.add("is-changing");
    renderExperienceNav();

    switchTimer = setTimeout(()=>{
      applyExperienceContent(service,index);

      requestAnimationFrame(()=>{
        requestAnimationFrame(()=>{
          experienceImage.classList.remove("is-changing");
          experienceOverlay.classList.remove("is-changing");
        });
      });
    },260);
  }

  prev.addEventListener("click",()=>move(-1));
  next.addEventListener("click",()=>move(1));

  renderPanels();
  applyExperienceContent(services[0],0);
  renderExperienceNav();

  requestAnimationFrame(()=>document.body.classList.add("loaded"));
})();
