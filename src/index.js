document.addEventListener('DOMContentLoaded', () => {
  // console.log(POKEMON)
  //YOUR CODE HERE

  fetch('http://localhost:3000/pokemon')
  .then(response => response.json())
  .then(json => filterCards(json))

  function showCards(pokemon) {
    const pokemonContainerDiv = document.getElementById('pokemon-container');

    if (pokemon.length === 0) {
      pokemonContainerDiv.innerHTML = "<p><center>There are no Pokémon here</center></p>";
    } 
    else {
      pokemonContainerDiv.innerHTML = "";

      for (const element of pokemon) {
        const outerDiv = document.createElement('div');
        Object.assign(outerDiv.style, {background:"#fecd2f", width:"230px", margin:"10px", float:"left"});

        outerDiv.innerHTML = `<h1 style="color:#2d72fc"><center>${element.name}</center></h1>
          <div><center><img id=${element.id} src = ${element.sprites.front}></center></div>`;
        pokemonContainerDiv.appendChild(outerDiv);

        const img = document.getElementById(`${element.id}`);
        img.addEventListener('click', function(event) {
          if (event.target.src === `${element.sprites.front}`)
            event.target.src = `${element.sprites.back}`;
          else
            event.target.src = `${element.sprites.front}`;
        })
      }
    }
    
  }

  function filterCards(pokemon) {
    showCards(pokemon);

    let input = "";

    const pokemonSearchInput = document.getElementById('pokemon-search-input');

    pokemonSearchInput.addEventListener('keydown', function(event) {
      if (event.key === "Backspace")
        input = input.slice(0,-1);
      else
        input += event.key;
      
      showCards(pokemon.filter((element) => element.name.includes(input)));
    })    
  }

})