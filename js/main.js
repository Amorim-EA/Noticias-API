//registrando a service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        let reg;
        reg = await navigator.serviceWorker.register('/sw.js', { type: "module" });        
        console.log('Service worker registrada! 😎', reg);
        postNews();
      } catch (err) {
        console.log('😥 Service worker registro falhou: ', err);
      }
    });
  }

const apiKey = '5421b8e72b174a15aca9dd67713a1569';
const main = document.querySelector('main');
let url = `https://newsapi.org/v2/everything?q=Apple&apiKey=${apiKey}`; 

async function postNews() {
    const res = await fetch(url); 
    const data = await res.json();
    main.innerHTML = data.articles.map(createArticle).join('\n');
}

function createArticle(article) {
    console.log(article);
    return `
            <div class="article">
            <a href="${article.url}" target="_blank"> 
            <img src="${article.urlToImage}" class="image" alt="${article.content}"/>
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            </a>
            </div>
        `
}

let buscar = document.getElementById("botaoBuscar");
buscar.addEventListener('click', () => {
    const search = document.getElementById("campoBuscar").value;
    let newUrl = `https://newsapi.org/v2/everything?q=${search}&apiKey=${apiKey}`;
    async function postNovasNews() {
        const res = await fetch(newUrl); 
        const data = await res.json();
        main.innerHTML = data.articles.map(createArticle).join('\n');
    }
    postNovasNews()
})

