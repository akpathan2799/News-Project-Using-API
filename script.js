const url = 'https://newsapi.org/v2/everything?q='
const apiKey = 'f8236aad828146be83c4f380cd702a54'
const newCardShowCase = document.querySelector('.news-card-container');
const searchButton = document.querySelector('#search-button');
const searchBar = document.querySelector('#search-input');
searchButton.addEventListener('click',()=>{
    fetchData(searchBar.value)
})
window.addEventListener('load',()=>{
    fetchData('general');
})


async function fetchData(query){
    try{
    const response = await fetch(`${url}${query}&from=2024-01-19&sortBy=publishedAt&apiKey=${apiKey}`)
    const data = await response.json();
   
    displayNews(data.articles);
    }
    catch(err){
        alert("There's Something Error")
    }
}



function displayNews(data){
    newCardShowCase.innerHTML = '';
    let note ='';
    if(data.length === 0){
        newCardShowCase.innerHTML = ``
        newCardShowCase.innerHTML='<h1 style="margin-top:2rem;font-weight:600;font-size:2rem;color:#EEEEEE;text-align:center;">No News Found</h1>'
        return;
    }
    data.forEach((news)=>{
        if(news.urlToImage === null ){return}
        note += `
        <div class="news-card">
                <img src="${news.urlToImage}" class="news-image" alt="mews-image">
                <div class="news-content-area">

                <div class="content-wrapper">

                    <h2 class="news-heading">${news.title}</h2>

                    <p class="news-description">
                        ${news.description}
                            
                    </p>

                </div>
                <div class="button-wrapper">
                <a href="${news.url}" class="read-more-button">Read More</a>
                </div>
                </div>
            </div>
        `
    })

    newCardShowCase.innerHTML = note
}