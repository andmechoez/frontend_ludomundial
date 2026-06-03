import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { oddSelection } from './BettingMarkets';

interface BetSlipProps {
  selection: oddSelection | null;
  onClose: () => void;
}

export const BetSlip: React.FC<BetSlipProps> = ({ selection, onClose }) => {
  const [stake, setStake] = useState('10');

  if (!selection) return null;

  const stakeNum = parseFloat(stake) || 0;
  const potentialReturn = (stakeNum * selection.odd).toFixed(2);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.absoluteWrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Boleto de Apuesta</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.selectionInfo}>
          <Text style={styles.marketName}>{selection.market}</Text>
          <View style={styles.selectionRow}>
            <Text style={styles.selectionName}>{selection.name}</Text>
            <Text style={styles.oddValue}>{selection.odd.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.currency}>$</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={stake}
            onChangeText={setStake}
            placeholderTextColor={colors.textMuted}
            placeholder="Monto a apostar"
            maxLength={10}
            returnKeyType="done"
          />
        </View>

        <View style={styles.returnContainer}>
          <Text style={styles.returnLabel}>Retorno Potencial</Text>
          <Text style={styles.returnValue}>${potentialReturn}</Text>
        </View>

        <TouchableOpacity style={styles.submitBtn} activeOpacity={0.8}>
          <Text style={styles.submitBtnText}>Confirmar Apuesta</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  absoluteWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  container: {
    backgroundColor: colors.cardLight,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    borderTopWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  closeBtn: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  closeText: {
    color: colors.textMuted,
    fontSize: 22,
    fontWeight: '600',
  },
  selectionInfo: {
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  marketName: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  selectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectionName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  oddValue: {
    color: colors.accent,
    fontSize: 20,
    fontWeight: '900',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  currency: {
    color: colors.textMuted,
    fontSize: 20,
    fontWeight: '700',
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
    minHeight: 56, // Touch target scale
  },
  returnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  returnLabel: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  returnValue: {
    color: colors.gold,
    fontSize: 22,
    fontWeight: '900',
  },
  submitBtn: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  }
});