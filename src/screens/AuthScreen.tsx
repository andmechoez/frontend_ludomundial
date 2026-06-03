import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors } from '../theme/colors';

type AuthMode = 'login' | 'register' | 'forgot';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [remember, setRemember] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  const isLogin = mode === 'login';
  const isRegister = mode === 'register';
  const isForgot = mode === 'forgot';

  const title = useMemo(() => {
    if (isLogin) return 'Iniciar sesion';
    if (isRegister) return 'Crear cuenta';
    return 'Recuperar acceso';
  }, [isLogin, isRegister]);

  const primaryLabel = useMemo(() => {
    if (isLogin) return 'Entrar';
    if (isRegister) return 'Crear cuenta';
    return 'Enviar enlace';
  }, [isLogin, isRegister]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.glowA} />
        <View style={styles.glowB} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.brandBlock}>
            <Text style={styles.brand}>LUDOMUNDIAL</Text>
            <Text style={styles.tagline}>Apuestas premium en vivo</Text>
          </View>

          {!isForgot && (
            <View style={styles.segmented}>
              <TouchableOpacity
                style={[styles.segment, isLogin && styles.segmentActive]}
                onPress={() => setMode('login')}
                activeOpacity={0.8}
              >
                <Text style={[styles.segmentText, isLogin && styles.segmentTextActive]}>Iniciar sesion</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.segment, isRegister && styles.segmentActive]}
                onPress={() => setMode('register')}
                activeOpacity={0.8}
              >
                <Text style={[styles.segmentText, isRegister && styles.segmentTextActive]}>Registro</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{title}</Text>

            {isRegister && (
              <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                placeholderTextColor={colors.textMuted}
                value={form.name}
                onChangeText={(name) => setForm((prev) => ({ ...prev, name }))}
                autoCapitalize="words"
              />
            )}

            <TextInput
              style={styles.input}
              placeholder="Correo"
              placeholderTextColor={colors.textMuted}
              value={form.email}
              onChangeText={(email) => setForm((prev) => ({ ...prev, email }))}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {!isForgot && (
              <TextInput
                style={styles.input}
                placeholder="Contrasena"
                placeholderTextColor={colors.textMuted}
                value={form.password}
                onChangeText={(password) => setForm((prev) => ({ ...prev, password }))}
                secureTextEntry
              />
            )}

            {isRegister && (
              <TextInput
                style={styles.input}
                placeholder="Confirmar contrasena"
                placeholderTextColor={colors.textMuted}
                value={form.confirm}
                onChangeText={(confirm) => setForm((prev) => ({ ...prev, confirm }))}
                secureTextEntry
              />
            )}

            {isLogin && (
              <View style={styles.optionsRow}>
                <TouchableOpacity
                  style={styles.remember}
                  onPress={() => setRemember((prev) => !prev)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, remember && styles.checkboxActive]}>
                    {remember && <View style={styles.checkboxDot} />}
                  </View>
                  <Text style={styles.optionText}>Recordarme</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setMode('forgot')} activeOpacity={0.7}>
                  <Text style={styles.link}>Olvide mi clave</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8} onPress={onAuthSuccess}>
              <Text style={styles.primaryButtonText}>{primaryLabel}</Text>
            </TouchableOpacity>

            {!isForgot && (
              <View style={styles.altRow}>
                <Text style={styles.altText}>Acceso rapido</Text>
                <View style={styles.altButtons}>
                  <TouchableOpacity style={styles.altButton} activeOpacity={0.8}>
                    <Text style={styles.altButtonText}>Google</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.altButton} activeOpacity={0.8}>
                    <Text style={styles.altButtonText}>Apple</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {isRegister && (
              <TouchableOpacity onPress={() => setMode('login')} activeOpacity={0.7}>
                <Text style={styles.switchText}>Ya tienes cuenta? Inicia sesion</Text>
              </TouchableOpacity>
            )}

            {isForgot && (
              <TouchableOpacity onPress={() => setMode('login')} activeOpacity={0.7}>
                <Text style={styles.switchText}>Volver a iniciar sesion</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  glowA: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: colors.accentSoft,
    top: -90,
    right: -80,
    opacity: 0.5,
  },
  glowB: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 215, 0, 0.08)',
    bottom: -80,
    left: -60,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  brandBlock: {
    marginBottom: 24,
  },
  brand: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
  },
  tagline: {
    color: colors.textMuted,
    marginTop: 8,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  segmented: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 6,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  segment: {
    flex: 1,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  segmentActive: {
    backgroundColor: colors.cardLight,
  },
  segmentText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  segmentTextActive: {
    color: colors.text,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 16,
  },
  input: {
    backgroundColor: colors.input,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    color: colors.text,
    paddingHorizontal: 14,
    minHeight: 48,
    marginBottom: 12,
    fontSize: 15,
    fontWeight: '600',
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  remember: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.input,
  },
  checkboxActive: {
    borderColor: colors.accent,
  },
  checkboxDot: {
    width: 10,
    height: 10,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  optionText: {
    color: colors.textMuted,
    fontSize: 13,
  },
  link: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  primaryButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    minHeight: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  altRow: {
    marginBottom: 16,
  },
  altText: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  altButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  altButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  altButtonText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  switchText: {
    color: colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
  },
});
