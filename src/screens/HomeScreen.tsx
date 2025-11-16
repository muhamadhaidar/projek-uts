// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, Image } from 'react-native';
import { useRaces } from '../contexts/RaceContext';
import { COLORS } from '../constants/colors';
import RaceCard from '../components/RaceCard';
import { MainTabScreenProps } from '../navigation/types';
import { Race } from '../types';

const HomeScreen = ({ navigation }: MainTabScreenProps<'Home'>) => {
  const { allRaces, toggleFavorite, loading, userName } = useRaces();

  const handleRacePress = (race: Race) => {
    navigation.navigate('RaceDetail', {
      raceId: race.id,
      raceName: race.name,
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  const upcomingRace = allRaces.length > 0 ? allRaces[0] : null;
  const previousRaces = allRaces.length > 1 ? allRaces.slice(1) : [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image 
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.headerUser}>Welcome, {userName || 'Rider'}!</Text>
        
        {upcomingRace && (
          <RaceCard 
            race={upcomingRace} 
            isMainCard={true} 
            onToggleFavorite={toggleFavorite}
            onPress={handleRacePress}
          />
        )}

        <Text style={styles.sectionTitle}>PREVIOUS RACES</Text>

        {previousRaces.length > 0 ? (
          previousRaces.map(race => (
            <RaceCard 
              key={race.id} 
              race={race} 
              onToggleFavorite={toggleFavorite}
              onPress={handleRacePress}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>No other races found.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 30,
    resizeMode: 'contain',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  headerUser: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: COLORS.textPrimary, 
    paddingHorizontal: 20, 
    marginBottom: 16 
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: COLORS.textSecondary, 
    paddingHorizontal: 20, 
    marginTop: 24, 
    marginBottom: 12,
    textTransform: 'uppercase', 
  },
  emptyText: { 
    color: COLORS.textSecondary, 
    textAlign: 'center', 
    marginTop: 20 
  },
});

export default HomeScreen;