import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { MatchCard } from '../components/MatchCard';
import { BettingMarkets, oddSelection } from '../components/BettingMarkets';
import { BetSlip } from '../components/BetSlip';
import { colors } from '../theme/colors';

interface HomeScreenProps {
  onLogout?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onLogout }) => {
  const [selectedOdd, setSelectedOdd] = useState<oddSelection | null>(null);

  // Mapeo inicial (Mock simulando un stream local/Supabase listener futuro)
  const activeMatch = {
    homeTeam: 'Ecuador',
    awayTeam: 'Senegal',
    score: '0 - 0',
    matchMinute: 65,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <View>
            <Text style={styles.brand}>LUDOMUNDIAL</Text>
            <Text style={styles.subtitle}>Mercados en vivo</Text>
          </View>
          {onLogout && (
            <TouchableOpacity style={styles.logoutBtn} onPress={onLogout} activeOpacity={0.8}>
              <Text style={styles.logoutText}>Salir</Text>
            </TouchableOpacity>
          )}
        </View>

        <MatchCard
          homeTeam={activeMatch.homeTeam}
          awayTeam={activeMatch.awayTeam}
          score={activeMatch.score}
          matchMinute={activeMatch.matchMinute}
        />
        
        <BettingMarkets
          matchMinute={activeMatch.matchMinute}
          activeSelection={selectedOdd}
          onSelectOdd={setSelectedOdd}
        />
        
        {/* Espaciador para evitar que el bottom sheet tape contenido clave */}
        {selectedOdd && <View style={{ height: 280 }} />}
      </ScrollView>

      <BetSlip
        selection={selectedOdd}
        onClose={() => setSelectedOdd(null)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  brand: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  logoutBtn: {
    minHeight: 44,
    minWidth: 72,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});