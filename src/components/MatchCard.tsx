import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  score: string;
  matchMinute: number;
}

export const MatchCard: React.FC<MatchCardProps> = ({ homeTeam, awayTeam, score, matchMinute }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>EN VIVO {matchMinute}'</Text>
        </View>
        <Text style={styles.tournament}>Mundial FIFA 2026</Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.team} numberOfLines={1}>{homeTeam}</Text>
        <Text style={styles.score}>{score}</Text>
        <Text style={styles.team} numberOfLines={1}>{awayTeam}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    margin: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginRight: 6,
  },
  liveText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  tournament: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  team: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  score: {
    color: colors.gold,
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 2,
    marginHorizontal: 16,
  },
});