import { useEffect, useState } from 'react';
import { Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';

const colorsByType = {
  normal: 'rgba(168,167,122,0.3)',
  fire: 'rgba(238,129,48,0.3)',
  water: 'rgba(99,144,240,0.3)',
  electric: 'rgba(247,208,44,0.3)',
  grass: 'rgba(122,199,76,0.3)',
  ice: 'rgba(150,217,214,0.3)',
  fighting: 'rgba(194,46,40,0.3)',
  poison: 'rgba(163,62,161,0.3)',
  ground: 'rgba(226,191,101,0.3)',
  flying: 'rgba(169,143,243,0.3)',
  psychic: 'rgba(249,85,135,0.3)',
  bug: 'rgba(166,185,26,0.3)',
  rock: 'rgba(182,161,54,0.3)',
  ghost: 'rgba(115,87,151,0.3)',
  dragon: 'rgba(111,53,252,0.3)',
  dark: 'rgba(112,87,70,0.3)',
  steel: 'rgba(183,183,206,0.3)',
  fairy: 'rgba(214,133,173,0.3)',
};

export default function Pokemon({ navigation }) {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20');
      const data = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default, 
            types: details.types,
          };
        })
      );

      setPokemons(detailedPokemons);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.list}>
      {pokemons.map((pokemon) => {
        const typeName = pokemon.types[0]?.type.name;
        const bgColor = colorsByType[typeName] || '#EEE';

        return (
          <TouchableOpacity
            key={pokemon.name}
            style={[styles.card, { backgroundColor: bgColor }]}
            onPress={() => navigation.navigate('PokemonDetail', { pokemon })}
          >
            <Image source={{ uri: pokemon.image }} style={styles.image} />
            <Text style={styles.name}>{pokemon.name}</Text>
            <Text style={styles.type}>
              {pokemon.types.map((t) => t.type.name).join(', ')}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
    gap: 16,
  },
  card: {
    width: '47%', 
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
});
