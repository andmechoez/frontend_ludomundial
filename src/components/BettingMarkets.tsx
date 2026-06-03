import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

export type oddSelection = { market: string; name: string; odd: number };

interface BettingMarketsProps {
  matchMinute: number;
  onSelectOdd: (selection: oddSelection) => void;
  activeSelection?: oddSelection | null;
}

export const BettingMarkets: React.FC<BettingMarketsProps> = ({ matchMinute, onSelectOdd, activeSelection }) => {
  const [activeTab, setActiveTab] = useState<'1X2' | 'OU' | 'EXACT'>('1X2');

  const marginIndicatorColor = matchMinute > 80 ? colors.oddsDown : (matchMinute > 45 ? colors.gold : colors.oddsUp);

  const render1X2 = () => (
    <View style={styles.gridRow}>
      <OddButton title="1 (Ecuador)" odd={3.50} type="underdog" onSelect={() => onSelectOdd({market:'1X2', name:'Ecuador', odd: 3.50})} active={activeSelection?.name === 'Ecuador'} marginColor={marginIndicatorColor} />
      <OddButton title="X (Empate)" odd={2.10} onSelect={() => onSelectOdd({market:'1X2', name:'Empate', odd: 2.10})} active={activeSelection?.name === 'Empate'} marginColor={marginIndicatorColor} />
      <OddButton title="2 (Senegal)" odd={1.80} type="favorite" onSelect={() => onSelectOdd({market:'1X2', name:'Senegal', odd: 1.80})} active={activeSelection?.name === 'Senegal'} marginColor={marginIndicatorColor} />
    </View>
  );

  const renderOU = () => (
    <View style={styles.gridRow}>
      <OddButton title="Más 2.5" odd={2.25} type="underdog" onSelect={() => onSelectOdd({market:'Total de Goles', name:'Más 2.5', odd: 2.25})} active={activeSelection?.name === 'Más 2.5'} marginColor={marginIndicatorColor} />
      <OddButton title="Menos 2.5" odd={1.65} type="favorite" onSelect={() => onSelectOdd({market:'Total de Goles', name:'Menos 2.5', odd: 1.65})} active={activeSelection?.name === 'Menos 2.5'} marginColor={marginIndicatorColor} />
    </View>
  );

  const renderExactScore = () => (
    <View style={styles.gridContainer}>
      {['1-0', '0-1', '1-1', '2-1', '1-2', '2-2'].map(score => (
        <View key={score} style={styles.gridItem}>
          <OddButton 
            title={score} 
            odd={score === '1-1' ? 4.5 : 8.0} 
            type={score === '1-1' ? 'favorite' : 'underdog'}
            onSelect={() => onSelectOdd({market:'Marcador Exacto', name: score, odd: score === '1-1' ? 4.5 : 8.0})} 
            active={activeSelection?.name === score} 
            marginColor={marginIndicatorColor} 
          />
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, activeTab === '1X2' && styles.tabActive]} onPress={() => setActiveTab('1X2')} activeOpacity={0.8}>
          <Text style={[styles.tabText, activeTab === '1X2' && styles.tabTextActive]}>1X2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'OU' && styles.tabActive]} onPress={() => setActiveTab('OU')} activeOpacity={0.8}>
          <Text style={[styles.tabText, activeTab === 'OU' && styles.tabTextActive]}>O/U 2.5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'EXACT' && styles.tabActive]} onPress={() => setActiveTab('EXACT')} activeOpacity={0.8}>
          <Text style={[styles.tabText, activeTab === 'EXACT' && styles.tabTextActive]}>Marcador</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {activeTab === '1X2' && render1X2()}
        {activeTab === 'OU' && renderOU()}
        {activeTab === 'EXACT' && renderExactScore()}
      </View>
    </View>
  );
};

const OddButton = ({ title, odd, type, onSelect, active, marginColor }: any) => {
  return (
    <TouchableOpacity 
      style={[
        styles.oddBtn, 
        type === 'favorite' && styles.favoriteBtn,
        active && styles.oddBtnActive
      ]} 
      onPress={onSelect} 
      activeOpacity={0.7}
    >
      <View style={[styles.marginIndicator, { backgroundColor: marginColor }]} />
      <Text style={[styles.oddTitle, active && styles.textActive]}>{title}</Text>
      <Text style={[styles.oddValue, active && styles.textActive]}>{odd.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 6,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
    minHeight: 44, // Touch target
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: colors.cardLight,
  },
  tabText: {
    color: colors.textMuted,
    fontWeight: '700',
    fontSize: 14,
  },
  tabTextActive: {
    color: colors.text,
  },
  content: {
    minHeight: 120,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  gridItem: {
    width: '30%',
  },
  oddBtn: {
    flex: 1,
    backgroundColor: colors.card,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 52,
    position: 'relative',
    overflow: 'hidden'
  },
  favoriteBtn: {
    backgroundColor: colors.favorite,
    borderColor: 'rgba(255, 215, 0, 0.4)',
  },
  oddBtnActive: {
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    borderColor: colors.accent,
  },
  marginIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  oddTitle: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: 4,
    textAlign: 'center',
    fontWeight: '600',
  },
  oddValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  textActive: {
    color: colors.accent,
  }
});