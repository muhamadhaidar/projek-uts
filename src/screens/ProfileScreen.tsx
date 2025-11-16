// src/screens/ProfileScreen.tsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  TouchableOpacity, 
  Image,
  Linking 
} from 'react-native';
import { useRaces } from '../contexts/RaceContext';
import { COLORS } from '../constants/colors';
import RaceCard from '../components/RaceCard';
import { MainTabScreenProps } from '../navigation/types'; 
import { Race } from '../types'; 
import LinearGradient from 'react-native-linear-gradient';

const ProfileScreen = ({ navigation }: MainTabScreenProps<'Profile'>) => {
  const { getFavoriteRaces, toggleFavorite, userName, setUserName } = useRaces();
  const favoriteRaces = getFavoriteRaces();

  const handleLogout = () => { setUserName(''); };
  const openLink = (url: string) => { Linking.openURL(url).catch(err => console.error("Gagal membuka link:", err)); };
  const handleRacePress = (race: Race) => { navigation.navigate('RaceDetail', { raceId: race.id, raceName: race.name, }); };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>PROFILE</Text>

      <LinearGradient
        colors={['#fb0105ff', '#1303e9ff', '#edad09ff']} 
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 1.5 }} 
        style={styles.userCard}
      >
        <Image 
          source={require('../assets/images/haidar.jpg')}
          style={styles.avatar} 
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName || 'Sam Well'}</Text>
          <Text style={styles.userSubtitle}>MotoGP Fans</Text>
        </View>
      </LinearGradient>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.motogp.com/id')}>
          <Image source={require('../assets/images/logo.png')} style={styles.motogpLogo} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.instagram.com/mochhdr/')}>
          <Image source={require('../assets/images/instagram.png')} style={styles.instagramLogo} />
          <Text style={styles.linkButtonText}>@mochhdr</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>LOGOUT</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <Text style={styles.sectionTitle}>My Favorite Races</Text>
        <View style={styles.divider} />
      </View>
      
      {favoriteRaces.length > 0 ? (
        <FlatList
          data={favoriteRaces}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => ( <RaceCard race={item} onToggleFavorite={toggleFavorite} onPress={handleRacePress} /> )}
          contentContainerStyle={{ paddingBottom: 150 }} 
        />
      ) : (
        <Text style={styles.emptyText}>Tap the star on a race to save it here.</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  headerTitle: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft : 30,
    paddingVertical: 16,
    textTransform: 'uppercase',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 25,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.mediumGray, 
  },
  userInfo: {
    marginLeft: 16,
  },
  userName: {
    color: COLORS.textLight,
    fontSize: 22,
    fontWeight: 'bold',
  },
  userSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  linkButton: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000ff',
    borderRadius: 16,
    paddingVertical: 16,
    marginHorizontal: 5, 
  },
  linkButtonText: {
    color: COLORS.textLight,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  motogpLogo: {
    width: 80,
    height: 25,
    resizeMode: 'contain',
  },
  instagramLogo: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  logoutButton: {
    backgroundColor: '#1A1A2B',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 25,
  },
  logoutButtonText: {
    color: COLORS.red, 
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textLight,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.textSecondary,
    marginTop: 8,
  },
  emptyText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ProfileScreen;