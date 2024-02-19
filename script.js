const url = 'https://gnews.io/api/v4/search?q='
const apiKey = '4be73228bef17ac5e5e5bfc082a20c92'
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
    const response = await fetch(`${url}${query}&lang=en&country=in&max=10&apikey=${apiKey}`)
    const data = await response.json();
   
    displayNews(data.articles);
    }
    catch(err){
        newCardShowCase.innerHTML = ``
        newCardShowCase.innerHTML='<h1 style="margin-top:2rem;font-weight:600;font-size:2rem;color:#EEEEEE;text-align:center;">No News Found</h1>'
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
        if(news.image === null ){return}
        note += `
        <div class="news-card">
                <img src="${news.image}" class="news-image" alt="mews-image">
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