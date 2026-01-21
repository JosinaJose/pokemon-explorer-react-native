import { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

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

export default function PokemonDetail({ route, navigation }) {
  const { pokemon } = route.params;
  const [species, setSpecies] = useState(null);

  const primaryType = pokemon.types[0]?.type.name;
  const bgColor = colorsByType[primaryType] || '#EEE';

  useEffect(() => {
    navigation.setOptions({
      title: pokemon.name,
      headerBackTitleVisible: false,
    });

    fetchSpecies();
  }, [pokemon]);

  async function fetchSpecies() {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}/`
      );
      const data = await res.json();
      setSpecies(data);
    } catch (e) {
      console.log(e);
    }
  }

  if (!species) {
    return (
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: bgColor }]}
      >
        <Text>Loading...</Text>
      </ScrollView>
    );
  }

  const flavorText = species.flavor_text_entries.find(
    (f) => f.language.name === 'en'
  )?.flavor_text;

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: bgColor }]}
    >
      <Text style={styles.title}>{pokemon.name}</Text>
      <Text>ID: {species.id}</Text>
      <Text>
        Genus: {species.genera.find((g) => g.language.name === 'en')?.genus}
      </Text>
      <Text>Color: {species.color.name}</Text>
      <Text>Shape: {species.shape.name}</Text>
      <Text>Habitat: {species.habitat?.name || 'Unknown'}</Text>
      <Text>Base Happiness: {species.base_happiness}</Text>
      <Text>Capture Rate: {species.capture_rate}</Text>
      <Text>Gender Rate: {species.gender_rate}</Text>
      <Text>Growth Rate: {species.growth_rate.name}</Text>
      <Text>Legendary: {species.is_legendary ? 'Yes' : 'No'}</Text>
      <Text>Mythical: {species.is_mythical ? 'Yes' : 'No'}</Text>
      <Text>Baby: {species.is_baby ? 'Yes' : 'No'}</Text>

      <Text style={{ marginTop: 16, fontWeight: 'bold' }}>Description:</Text>
      <Text>{flavorText}</Text>

      <Text style={{ marginTop: 16, fontWeight: 'bold' }}>Varieties:</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {species.varieties.map((v) => (
          <Text key={v.pokemon.name}>{v.pokemon.name}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
    alignItems: 'flex-start',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 8,
  },
});
