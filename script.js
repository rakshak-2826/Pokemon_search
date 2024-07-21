document.getElementById('search-button').addEventListener('click', async function() {
    const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    const pokemonNameElement = document.getElementById('pokemon-name');
    const pokemonIdElement = document.getElementById('pokemon-id');
    const weightElement = document.getElementById('weight');
    const heightElement = document.getElementById('height');
    const hpElement = document.getElementById('hp');
    const attackElement = document.getElementById('attack');
    const defenseElement = document.getElementById('defense');
    const specialAttackElement = document.getElementById('special-attack');
    const specialDefenseElement = document.getElementById('special-defense');
    const speedElement = document.getElementById('speed');
    const typesElement = document.getElementById('types');
    const spriteElement = document.getElementById('sprite');
    
    // Clear previous results
    pokemonNameElement.textContent = '';
    pokemonIdElement.textContent = '';
    weightElement.textContent = '';
    heightElement.textContent = '';
    hpElement.textContent = '';
    attackElement.textContent = '';
    defenseElement.textContent = '';
    specialAttackElement.textContent = '';
    specialDefenseElement.textContent = '';
    speedElement.textContent = '';
    typesElement.innerHTML = '';
    spriteElement.src = '';
    spriteElement.style.display = 'none';

    // Fetch Pokémon data
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`);
        if (response.ok) {
            const data = await response.json();
            pokemonNameElement.textContent = data.name.toUpperCase();
            pokemonIdElement.textContent = `#${data.id}`;
            weightElement.textContent = `Weight: ${data.weight}`;
            heightElement.textContent = `Height: ${data.height}`;
            hpElement.textContent = `HP: ${data.stats.find(stat => stat.stat.name === 'hp').base_stat}`;
            attackElement.textContent = `Attack: ${data.stats.find(stat => stat.stat.name === 'attack').base_stat}`;
            defenseElement.textContent = `Defense: ${data.stats.find(stat => stat.stat.name === 'defense').base_stat}`;
            specialAttackElement.textContent = `Special Attack: ${data.stats.find(stat => stat.stat.name === 'special-attack').base_stat}`;
            specialDefenseElement.textContent = `Special Defense: ${data.stats.find(stat => stat.stat.name === 'special-defense').base_stat}`;
            speedElement.textContent = `Speed: ${data.stats.find(stat => stat.stat.name === 'speed').base_stat}`;
            
            data.types.forEach(type => {
                const typeElement = document.createElement('span');
                typeElement.textContent = type.type.name.toUpperCase();
                typesElement.appendChild(typeElement);
            });

            // Update animated GIF
            const animatedGif = data.sprites.versions['generation-v']['black-white'].animated.front_default;
            if (animatedGif) {
                spriteElement.src = animatedGif;
                spriteElement.style.display = 'block';
            } else {
                // Fallback if animated GIF is not available
                spriteElement.style.display = 'none';
                alert('Animated GIF not available for this Pokémon');
            }
        } else {
            alert('Pokémon not found');
        }
    } catch (error) {
        alert('Pokémon not found');
    }
});
