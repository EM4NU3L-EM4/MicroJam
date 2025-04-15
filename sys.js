const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.replace("hiddeny", "show");
        }
      });
    },
    {
      threshold: 0.2, 
    }
  );

  document.querySelectorAll(".hiddeny").forEach(div => {
    observer.observe(div);
  });

const observer2 = new IntersectionObserver(
    function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.replace("hiddenx", "show");
        }
      });
    },
    {
      threshold: 0.5, 
    }
  );

  document.querySelectorAll(".hiddenx").forEach(div => {
    observer2.observe(div);
  });

/*document.querySelectorAll(".hidden").forEach(function (div) {
    div.addEventListener(
      "mouseover",
      function (event) {
        event.currentTarget.classList.replace("hidden", "show");
      },
      { passive: false }
    );
  });*/
  






  