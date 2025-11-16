// src/components/RaceCard.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Race } from '../types';
import { COLORS } from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  race: Race;
  onToggleFavorite: (id: string) => void;
  onPress: (race: Race) => void; 
  isMainCard?: boolean;
};

const RaceCard: React.FC<Props> = ({ race, onToggleFavorite, onPress, isMainCard = false }) => {
  return (
    <TouchableOpacity 
      style={[styles.cardContainer, isMainCard ? styles.mainCardContainer : styles.smallCardContainer]}
      onPress={() => onPress(race)} 
      activeOpacity={0.8}
    >
      {race.imageUri ? (
        <ImageBackground
          source={{ uri: race.imageUri }}
          style={styles.cardImage}
          imageStyle={{ borderRadius: 16 }}
        >
          <View style={styles.cardOverlay}>
            <Text style={isMainCard ? styles.mainCardTitle : styles.cardTitle}>{race.name}</Text>
            <Text style={styles.cardDate}>{race.date}</Text>

            <TouchableOpacity 
              style={styles.favoriteButton} 
              onPress={() => onToggleFavorite(race.id)} 
            >
              <Icon 
                name={race.isFavorited ? "star" : "star-o"} 
                size={isMainCard ? 24 : 20} 
                color={race.isFavorited ? COLORS.orange : COLORS.textLight} 
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.noImageCard}>
          <Text style={[styles.cardTitle, {color: COLORS.textPrimary}]}>{race.name}</Text>
          <Text style={[styles.cardDate, {color: COLORS.textSecondary}]}>{race.date}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    marginBottom: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 16,
    backgroundColor: COLORS.cardBackground, 
  },
  smallCardContainer: {
    height: 120,
  },
  mainCardContainer: {
    height: 190,
  },
  cardImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'flex-end',
  },
  noImageCard: { 
    flex: 1,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.cardBackground, 
    height: 120,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textLight,
  },
  mainCardTitle: {
    fontSize: 28, 
    fontWeight: 'bold',
    color: COLORS.textLight,
  },
  cardDate: {
    fontSize: 14,
    color: COLORS.textLight,
    opacity: 0.8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
  }
});

export default RaceCard;