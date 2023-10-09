const pokemonList = document.getElementById('pokemonList')
const perfil = document.getElementById('perfil')
const loadMoreButton = document.getElementById('loadMoreButton')
const backButton = document.getElementById('voltar')

const maxRecords = 151
const limit = 10
let offset = 0;

function mostrarPokemon(pokemonId){
    conteudo.style.display = 'none';
    caracteristicas.style.display = 'block';

    
    loadPokemonPerfil(pokemonId)

}

function fecharPokemon(){
    conteudo.style.display = 'block';
    caracteristicas.style.display = 'none';

    perfil.innerHTML = `<ol id="perfil"> </ol>`
}


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="mostrarPokemon(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>

        
    `
}

function loadPokemonPerfil(pokemonId){
    pokeApi.getPokemon(pokemonId).then((pokemon) => {
        const newPerfilHtml = convertPokemonToDiv(pokemon)
        perfil.innerHTML += newPerfilHtml
    })
}

function convertPokemonToDiv(pokemon){
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div id="perfilPokemon" class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        <div id="status">
            <ol id="statList">
                ${pokemon.stats.map((statSlot) =>`
                <li class="statName">${statSlot.stat.name}</li>
                <li class="stat">${statSlot.base_stat}</li> 
                `).join('')}
            </ol>
        </div>
    </li> 
   
    
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}


loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


backButton.addEventListener('click', () => {
    fecharPokemon();
})