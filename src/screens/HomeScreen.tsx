import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { MatchCard } from '../components/MatchCard';
import { BettingMarkets, oddSelection } from '../components/BettingMarkets';
import { BetSlip } from '../components/BetSlip';
import { colors } from '../theme/colors';

export const HomeScreen: React.FC = () => {
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
  }
});