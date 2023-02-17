let container = document.querySelector('.albums');

for (let i = 0; i < albums.length; i++) {
    container.innerHTML += `
    <div class="col">
        <a href="${albums[i]['link']}?id=${i + 1}" class="text-decoration-none">
        <div class="card">
            <img src="${albums[i]['img']}" alt="" class="card-image-top">
            <div class="card-body">
                <p class="card-text">${albums[i]['title']}</p>
            </div>
        </div>
        </a>
    </div>
    `;
}