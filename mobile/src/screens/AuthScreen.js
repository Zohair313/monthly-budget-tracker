import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { palette } from '../theme/colors';
import ServerConfigModal from '../components/ServerConfigModal';

export default function AuthScreen() {
  const { login, register, themeMode, toggleTheme, demoMode, toggleDemoMode } = useAuth();
  const colors = palette[themeMode];

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showServerConfig, setShowServerConfig] = useState(false);

  const handleSubmit = async () => {
    setErrorMsg('');
    if (!email.trim() || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    if (isRegister && (!name.trim() || name.trim().length < 2)) {
      setErrorMsg('Please enter your full name (minimum 2 characters).');
      return;
    }

    setIsLoading(true);
    try {
      if (isRegister) {
        await register(name.trim(), email.trim(), password);
      } else {
        await login(email.trim(), password);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('demo@budgettracker.com');
    setPassword('password123');
    if (isRegister) setName('Demo User');
    setErrorMsg('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top bar with Theme and Server Config */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={[styles.topIconBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={toggleTheme}
          >
            <Ionicons
              name={themeMode === 'dark' ? 'sunny-outline' : 'moon-outline'}
              size={18}
              color={themeMode === 'dark' ? '#FBBF24' : colors.text}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.topIconBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => setShowServerConfig(true)}
          >
            <Ionicons name="server-outline" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Brand / Hero */}
        <View style={styles.heroSection}>
          <View style={[styles.brandIconWrap, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
            <Ionicons name="wallet" size={32} color={colors.primary} />
          </View>
          <Text style={[styles.heroTitle, { color: colors.text }]}>Budget Tracker</Text>
          <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
            Monthly Income & Expense Management
          </Text>
        </View>

        {/* Card */}
        <View style={[styles.authCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {/* Tabs: Sign In / Register */}
          <View style={[styles.tabsWrap, { backgroundColor: colors.surfaceSubtle }]}>
            <TouchableOpacity
              style={[
                styles.tabBtn,
                !isRegister && [styles.tabBtnActive, { backgroundColor: colors.surface }]
              ]}
              onPress={() => {
                setIsRegister(false);
                setErrorMsg('');
              }}
            >
              <Text
                style={[
                  styles.tabBtnText,
                  { color: !isRegister ? colors.text : colors.textSecondary, fontWeight: !isRegister ? '700' : '500' }
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabBtn,
                isRegister && [styles.tabBtnActive, { backgroundColor: colors.surface }]
              ]}
              onPress={() => {
                setIsRegister(true);
                setErrorMsg('');
              }}
            >
              <Text
                style={[
                  styles.tabBtnText,
                  { color: isRegister ? colors.text : colors.textSecondary, fontWeight: isRegister ? '700' : '500' }
                ]}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.formArea}>
            {isRegister && (
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>FULL NAME</Text>
                <View style={[styles.inputField, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}>
                  <Ionicons name="person-outline" size={16} color={colors.textTertiary} style={styles.fieldIcon} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="e.g. John Doe"
                    placeholderTextColor={colors.textTertiary}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </View>
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>EMAIL ADDRESS</Text>
              <View style={[styles.inputField, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}>
                <Ionicons name="mail-outline" size={16} color={colors.textTertiary} style={styles.fieldIcon} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="name@example.com"
                  placeholderTextColor={colors.textTertiary}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>PASSWORD</Text>
              <View style={[styles.inputField, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}>
                <Ionicons name="lock-closed-outline" size={16} color={colors.textTertiary} style={styles.fieldIcon} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="••••••••"
                  placeholderTextColor={colors.textTertiary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={18}
                    color={colors.textTertiary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {errorMsg.length > 0 && (
              <View style={[styles.errorBox, { backgroundColor: colors.expenseLight, borderColor: colors.expense }]}>
                <Ionicons name="alert-circle" size={16} color={colors.expense} />
                <Text style={[styles.errorMsgText, { color: colors.expense }]}>{errorMsg}</Text>
              </View>
            )}

            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: colors.primary }]}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.submitButtonText}>
                  {isRegister ? 'Create Account' : 'Sign In'}
                </Text>
              )}
            </TouchableOpacity>

            {/* Quick Demo Fill Button */}
            <TouchableOpacity
              style={[styles.demoFillBtn, { backgroundColor: colors.surfaceSubtle, borderColor: colors.borderSubtle }]}
              onPress={handleFillDemo}
            >
              <Ionicons name="flash-outline" size={14} color={colors.primary} />
              <Text style={[styles.demoFillText, { color: colors.primary }]}>
                Fill Demo Credentials (demo@budgettracker.com)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Note */}
        <View style={styles.footerNote}>
          <Text style={[styles.footerText, { color: colors.textTertiary }]}>
            Secure JWT Authentication • Neon Serverless PostgreSQL
          </Text>
        </View>
      </ScrollView>

      {/* Server Configuration Modal */}
      <ServerConfigModal visible={showServerConfig} onClose={() => setShowServerConfig(false)} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 40,
    alignItems: 'center'
  },
  topBar: {
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginBottom: 20
  },
  topIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 24
  },
  brandIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5
  },
  heroSubtitle: {
    fontSize: 13,
    marginTop: 4
  },
  authCard: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 22,
    borderWidth: 1,
    padding: 20
  },
  tabsWrap: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 3,
    marginBottom: 20
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: 10
  },
  tabBtnActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  tabBtnText: {
    fontSize: 13
  },
  formArea: {
    gap: 14
  },
  inputGroup: {
    gap: 6
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  fieldIcon: {
    marginRight: 8
  },
  input: {
    flex: 1,
    fontSize: 14,
    padding: 0
  },
  eyeBtn: {
    padding: 4
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1
  },
  errorMsgText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 15
  },
  submitButton: {
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700'
  },
  demoFillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1
  },
  demoFillText: {
    fontSize: 11,
    fontWeight: '600'
  },
  footerNote: {
    marginTop: 24,
    alignItems: 'center'
  },
  footerText: {
    fontSize: 11
  }
});
