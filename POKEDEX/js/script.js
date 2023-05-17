/* criar função para fazer a busca dos pokemons em uma API */
const pokemonName = document.querySelector(".pokemon_name");
const pokemonID = document.querySelector(".pokemon_number");
const pokemonIMG = document.querySelector(".pokemon_img");

const form = document.querySelector(".form");
const input = document.querySelector(".input_search");
const btnn = document.querySelector(".btn-next");
const btnp = document.querySelector(".btn-prev");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  /*nossa função fetchPokemon vai receber pokemon como parametro e
                                    ela vai buscar as informações deste pokemon */
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`
  ); /*resposta da api (await só funciona em funções async) */
  if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data; /* usar em outra função dps */
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Carregando...";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonIMG.style.display = 'block';
    pokemonID.innerHTML = data.id;
    pokemonName.innerHTML = data.name;
    pokemonIMG.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
      searchPokemon=data.id;

    input.value = ""; /*limpar o input */
  } else {
    pokemonIMG.style.display = 'none';
    pokemonName.innerHTML = "Erro";
    pokemonID.innerHTML = "?";
  }
};
/*parte de enviar formulário, pegar dados e acessar da api */
form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase()); /*tolowercase para deixar tudo minusculo*/
});

btnn.addEventListener('click', () => {
  searchPokemon+=1;
  renderPokemon(searchPokemon);
});

btnp.addEventListener('click', () => {
  if(searchPokemon > 1){
    searchPokemon-=1;
    renderPokemon(searchPokemon);
  }
});

renderPokemon(searchPokemon);
