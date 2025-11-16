// src/screens/RaceDetailScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { RootStackScreenProps } from '../navigation/types';
import { RaceResult, PoleSitter } from '../types'; 
import { fetchRaceResults } from '../api/motogpAPI';
import { COLORS } from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RIDER_DATA_MAP, DEFAULT_RIDER_DATA } from '../constants/riderImages';

type Props = RootStackScreenProps<'RaceDetail'>;


const openHighlight = (url: string | null | undefined) => {
  if (url) {
    Linking.openURL(url).catch(err => console.error("Gagal membuka link", err));
  } else {
    alert("Highlight not available yet.");
  }
};


const PoleSitterCard: React.FC<{ poleSitter: PoleSitter | null }> = ({ poleSitter }) => {
  if (!poleSitter) return null;

  const riderData = RIDER_DATA_MAP[poleSitter.driverName] || DEFAULT_RIDER_DATA;

  return (
    <View style={[styles.cardContainer, { backgroundColor: riderData.color + '1A' }]}>
      <View style={styles.cardHeader}>
        <Icon name="clock-o" size={18} color={COLORS.primary} />
        <Text style={styles.cardTitle}>POLE POSITION</Text>
      </View>
      <View style={styles.cardContent}>
        <Image 
          source={riderData.image} 
          style={styles.driverImageLarge} 
        />
        <View style={styles.info}>
          <Text style={styles.driverName}>{poleSitter.driverName}</Text>
          <Text style={styles.teamName}>{poleSitter.teamName}</Text>
        </View>
      </View>
    </View>
  );
};


const WinnerCard: React.FC<{ title: string, result: RaceResult | null, highlightUrl?: string | null }> = ({ title, result, highlightUrl }) => {
  const riderData = result 
    ? (RIDER_DATA_MAP[result.driverName] || DEFAULT_RIDER_DATA) 
    : DEFAULT_RIDER_DATA;
  
  const cardColor = result ? riderData.color : COLORS.mediumGray;

  if (!result) {
    return (
      <View style={[styles.cardContainer, { backgroundColor: cardColor + '1A' }]}>
        <Text style={[styles.sectionTitle, { color: COLORS.primary }]}>{title}</Text>
        <Text style={styles.emptyText}>No results available.</Text>
      </View>
    );
  }

  return (

    <View style={[styles.cardContainer, { backgroundColor: riderData.color + '1A' }]}>
      <Text style={[styles.sectionTitle, { color: COLORS.primary }]}>{title}</Text>
      <View style={styles.cardContent}>
        <Image 
          source={riderData.image}
          style={styles.driverImageLarge} 
        />
        <View style={styles.info}>
          <Text style={styles.position}>P{result.position}</Text>
          <Text style={styles.driverName}>{result.driverName}</Text>
          <Text style={styles.teamName}>{result.teamName}</Text>
          <Text style={styles.time}>{result.time}</Text>
        </View>
      </View>
      {/* Tombol Highlight */}
      {highlightUrl && (
        <TouchableOpacity style={styles.highlightButton} onPress={() => openHighlight(highlightUrl)}>
          <Icon name="youtube-play" size={16} color={COLORS.red} />
          <Text style={styles.highlightText}>Watch Highlight</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const RaceDetailScreen = ({ route }: Props) => {
  const { raceId } = route.params; 
  
  const [poleSitter, setPoleSitter] = useState<PoleSitter | null>(null);
  const [sprintResults, setSprintResults] = useState<RaceResult[]>([]);
  const [gpResults, setGpResults] = useState<RaceResult[]>([]);
  const [sprintHighlightUrl, setSprintHighlightUrl] = useState<string | null>(null);
  const [raceHighlightUrl, setRaceHighlightUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResults = async () => {
      setLoading(true);
      try {
        const data = await fetchRaceResults(raceId); 
        setPoleSitter(data.poleSitter || null);
        setSprintResults(data.sprintResults || []); 
        setGpResults(data.gpResults || []); 
        setSprintHighlightUrl(data.sprintHighlightUrl || null);
        setRaceHighlightUrl(data.raceHighlightUrl || null);
      } catch (error) {
        console.error("Gagal memuat hasil:", error);
      } finally {
        setLoading(false);
      }
    };
    loadResults();
  }, [raceId]); 

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const gpWinner = gpResults.length > 0 ? gpResults[0] : null;
  const sprintWinner = sprintResults.length > 0 ? sprintResults[0] : null;

  return (
    <ScrollView style={styles.container}>
      {poleSitter && <PoleSitterCard poleSitter={poleSitter} />}
      
      <WinnerCard 
        title="Race Results"
        result={gpWinner}
        highlightUrl={raceHighlightUrl}
      />
      <WinnerCard 
        title="Sprint Results"
        result={sprintWinner}
        highlightUrl={sprintHighlightUrl}
      />
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cardContainer: {
    backgroundColor: COLORS.cardBackground, 
    borderRadius: 25,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverImageLarge: {
    width: 80, 
    height: 120,
    borderRadius: 10, 
    marginRight: 20,
    backgroundColor: COLORS.border,
  },
  info: {
    flex: 1,
  },
  driverName: {
    fontSize: 20,
    fontWeight: 'bold',
  	color: COLORS.textPrimary,
  },
  teamName: {
  	fontSize: 16,
  	color: COLORS.textSecondary,
  	marginTop: 2,
  },
  cardHeader: {
  	flexDirection: 'row',
  	alignItems: 'center',
  	marginBottom: 16,
  	borderBottomWidth: 1,
  	borderBottomColor: COLORS.border,
  	paddingBottom: 10,
  },
  cardTitle: {
  	fontSize: 14,
  	fontWeight: 'bold',
  	color: COLORS.primary,
  	marginLeft: 8,
  	letterSpacing: 1,
  },
  sectionTitle: {
  	fontSize: 18,
  	fontWeight: 'bold',
  	color: COLORS.textPrimary,
  	marginBottom: 16,
  	opacity: 0.8,
  },
  position: {
  	fontSize: 24,
  	fontWeight: '900',
  	color: COLORS.primary,
  time: {
  	fontSize: 14,
  	color: COLORS.textSecondary,
  	marginTop: 8,
    fontStyle: 'italic', 
  },
  highlightButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: COLORS.red + '15', 
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLORS.red + '30',
  },
  highlightText: {
    color: COLORS.red,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  }
});

export default RaceDetailScreen;