
  function saveUrl() {
    const url = document.getElementById("urlInput").value.trim();
    if (url) {
      let urls = JSON.parse(localStorage.getItem("urls")) || [];
      urls.push(url);
      localStorage.setItem("urls", JSON.stringify(urls));
      displayUrls();
    }
  }

  function displayUrls() {
    let urls = JSON.parse(localStorage.getItem("urls")) || [];
    const container = document.getElementById("iconsContainer");
    container.innerHTML = "";

    urls.forEach(url => {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.innerHTML = `<img src="https://www.google.com/s2/favicons?domain=${url}" alt="icono">`;
      container.appendChild(link);
    });
  }

  window.onload = displayUrls;

