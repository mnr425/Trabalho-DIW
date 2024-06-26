// URL do seu perfil do GitHub
const githubUsername = 'mnr425';

// URL da API do GitHub
const githubAPI = `https://api.github.com/users/mnr425`;
const githubReposAPI = `https://api.github.com/users/mnr425/repos`;

// URL do JSONServer
const jsonServerURL = 'http://localhost:3000';

// Função para buscar dados do perfil do GitHub
async function fetchGitHubProfile() {
    const response = await fetch(githubAPI);
    const data = await response.json();
    displayUserProfile(data);
}

// Função para exibir dados do perfil do GitHub
function displayUserProfile(profile) {
    const userProfile = document.getElementById('user-profile');
    userProfile.innerHTML = `
        <img src="${profile.avatar_url}" alt="${profile.name}">
        <h3>${profile.name}</h3>
        <p>${profile.bio}</p>
        <a href="${profile.html_url}" target="_blank">GitHub</a>
        <a href="mailto:email@example.com">Email</a>
        <a href="https://linkedin.com" target="_blank">LinkedIn</a>
    `;
}

// Função para buscar repositórios do GitHub
async function fetchGitHubRepos() {
    const response = await fetch(githubReposAPI);
    const data = await response.json();
    displayRepos(data);
}

// Função para exibir repositórios do GitHub
function displayRepos(repos) {
    const repoCards = document.getElementById('repo-cards');
    repos.forEach(repo => {
        repoCards.innerHTML += `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${repo.name}</h5>
                    <p class="card-text">${repo.description}</p>
                    <a href="${repo.html_url}" class="btn btn-primary" target="_blank">Ver no GitHub</a>
                </div>
            </div>
        `;
    });
}

// Função para buscar conteúdos sugeridos do JSONServer
async function fetchSuggestedContent() {
    const response = await fetch(`${jsonServerURL}/conteudo`);
    const data = await response.json();
    displaySuggestedContent(data);
}

// Função para exibir conteúdos sugeridos no carrossel
function displaySuggestedContent(content) {
    const carouselIndicators = document.getElementById('carousel-indicators');
    const carouselInner = document.getElementById('carousel-inner');
    content.forEach((item, index) => {
        carouselIndicators.innerHTML += `
            <li data-target="#carouselExampleIndicators" data-slide-to="${index}" ${index === 0 ? 'class="active"' : ''}></li>
        `;
        carouselInner.innerHTML += `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="C:\Projetos Web\trabalhodiw\imgs\cev.png" class="d-block w-100" alt="${item.title}">
                <div class="carousel-caption d-none d-md-block">
                    <h5>${item.title}</h5>
                    <p>${item.description}</p>
                </div>
            </div>
        `;
    });
}

// Função para buscar colegas de trabalho do JSONServer
async function fetchColleagues() {
    const response = await fetch(`${jsonServerURL}/colegas`);
    const data = await response.json();
    displayColleagues(data);
}

// Função para exibir colegas de trabalho
function displayColleagues(colegas) {
    const colegasGrid = document.getElementById('colegas-grid');
    colegas.forEach(colega => {
        colegasGrid.innerHTML += `
            <div class="col-sm-4">
                <div class="card">
                    <img src="C:\Projetos Web\trabalhodiw\imgs\craque-neto.webp" class="card-img-top" alt="${colega.name}">
                    <div class="card-body">
                        <h5 class="card-title">${colega.name}</h5>
                        <a href="${colega.github}" class="btn btn-primary" target="_blank">Perfil no GitHub</a>
                    </div>
                </div>
            </div>
        `;
    });
}

// Função para buscar detalhes do repositório do GitHub
async function fetchRepoDetails(repoId) {
    const response = await fetch(`https://api.github.com/repositories/${repoId}`);
    const data = await response.json();
    displayRepoDetails(data);
}

// Função para exibir detalhes do repositório
function displayRepoDetails(repo) {
    const repoInfo = document.getElementById('repo-info');
    document.getElementById('repo-name').innerText = repo.name;
    repoInfo.innerHTML = `
        <p>${repo.description}</p>
        <p>Data de Criação: ${new Date(repo.created_at).toLocaleDateString()}</p>
        <img src="${repo.owner.avatar_url}" alt="${repo.owner.login}">
        <p>Proprietário: ${repo.owner.login}</p>
        <p>Linguagem Principal: ${repo.language}</p>
        <p>Estrelas: ${repo.stargazers_count}</p>
        <p>Observadores: ${repo.watchers_count}</p>
        <p>Forks: ${repo.forks_count}</p>
        <p>Licença: ${repo.license ? repo.license.name : 'N/A'}</p>
        <a href="${repo.html_url}" class="btn btn-primary" target="_blank">Ver no GitHub</a>
    `;
}

// Inicialização da página index.html
if (document.body.contains(document.getElementById('user-profile'))) {
    fetchGitHubProfile();
    fetchGitHubRepos();
    fetchSuggestedContent();
    fetchColleagues();
}

// Inicialização da página repo.html
if (document.body.contains(document.getElementById('repo-details'))) {
    const urlParams = new URLSearchParams(window.location.search);
    const repoId = urlParams.get('id');
    if (repoId) {
        fetchRepoDetails(repoId);
    }
}
