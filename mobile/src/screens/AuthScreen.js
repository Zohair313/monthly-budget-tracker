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
import Ionicons from '../components/Icon';
import { useAuth } from '../context/AuthContext';
import { palette, getClayCard, getClayButton, getClayInput, getClayPill } from '../theme/colors';
import ServerConfigModal from '../components/ServerConfigModal';

export default function AuthScreen() {
  const { login, register, themeMode, toggleTheme, demoMode, toggleDemoMode } = useAuth();
  const colors = palette[themeMode] || palette.light;
  const clayCard = getClayCard(themeMode);
  const clayButton = getClayButton(themeMode, colors.primary, colors.primaryDark);
  const clayInput = getClayInput(themeMode);
  const clayPill = getClayPill(themeMode);

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
      style={[styles.container, { backgroundColor: colors.brandViolet }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top bar with Theme and Server Config */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={[
              styles.clayTopIconBtn,
              {
                backgroundColor: 'rgba(255, 255, 255, 0.22)',
                borderTopColor: 'rgba(255, 255, 255, 0.50)',
                borderBottomColor: 'rgba(0, 0, 0, 0.25)'
              }
            ]}
            onPress={toggleTheme}
            accessibilityLabel="Toggle Theme"
          >
            <Ionicons
              name={themeMode === 'dark' ? 'sunny-outline' : 'moon-outline'}
              size={18}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.clayTopIconBtn,
              {
                backgroundColor: 'rgba(255, 255, 255, 0.22)',
                borderTopColor: 'rgba(255, 255, 255, 0.50)',
                borderBottomColor: 'rgba(0, 0, 0, 0.25)'
              }
            ]}
            onPress={() => setShowServerConfig(true)}
            accessibilityLabel="Server Settings"
          >
            <Ionicons name="server-outline" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Brand Hero with 3D White Inflated Coin on Violet Canvas */}
        <View style={styles.heroSection}>
          <View
            style={[
              styles.brandIconWrap,
              {
                backgroundColor: '#FFFFFF',
                borderTopColor: '#FFFFFF',
                borderLeftColor: 'rgba(255, 255, 255, 0.9)',
                borderRightColor: '#E2E8F0',
                borderBottomColor: '#CBD5E1',
                shadowColor: 'rgba(0, 0, 0, 0.35)'
              }
            ]}
          >
            <Ionicons name="wallet" size={42} color={colors.primary} />
          </View>
          <Text style={styles.heroTitle}>Budget Tracker</Text>
          <Text style={styles.heroSubtitle}>
            Smart Monthly Financial Management
          </Text>
        </View>

        {/* Porcelain White Curved Clay Card */}
        <View style={[styles.authCard, clayCard]}>
          {/* Debossed Tabs Track: Sign In / Register */}
          <View
            style={[
              styles.tabsWrap,
              {
                backgroundColor: colors.surfaceSubtle,
                borderTopColor: themeMode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(160,174,192,0.45)',
                borderBottomColor: themeMode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.95)'
              }
            ]}
          >
            <TouchableOpacity
              style={[
                styles.tabBtn,
                !isRegister && [
                  styles.tabBtnActive,
                  {
                    backgroundColor: colors.surface,
                    borderTopColor: colors.clayBorderTop,
                    borderLeftColor: colors.clayBorderLeft,
                    borderRightColor: colors.clayBorderRight,
                    borderBottomColor: colors.clayBorderBottom,
                    shadowColor: colors.clayShadowColor
                  }
                ]
              ]}
              onPress={() => {
                setIsRegister(false);
                setErrorMsg('');
              }}
            >
              <Text
                style={[
                  styles.tabBtnText,
                  {
                    color: !isRegister ? colors.text : colors.textSecondary,
                    fontWeight: !isRegister ? '900' : '600'
                  }
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabBtn,
                isRegister && [
                  styles.tabBtnActive,
                  {
                    backgroundColor: colors.surface,
                    borderTopColor: colors.clayBorderTop,
                    borderLeftColor: colors.clayBorderLeft,
                    borderRightColor: colors.clayBorderRight,
                    borderBottomColor: colors.clayBorderBottom,
                    shadowColor: colors.clayShadowColor
                  }
                ]
              ]}
              onPress={() => {
                setIsRegister(true);
                setErrorMsg('');
              }}
            >
              <Text
                style={[
                  styles.tabBtnText,
                  {
                    color: isRegister ? colors.text : colors.textSecondary,
                    fontWeight: isRegister ? '900' : '600'
                  }
                ]}
              >
                Create Account
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.formArea}>
            {isRegister && (
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>FULL NAME</Text>
                <View style={[styles.inputField, clayInput]}>
                  <Ionicons name="person-outline" size={18} color={colors.textTertiary} style={styles.fieldIcon} />
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
              <View style={[styles.inputField, clayInput]}>
                <Ionicons name="mail-outline" size={18} color={colors.textTertiary} style={styles.fieldIcon} />
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
              <View style={[styles.inputField, clayInput]}>
                <Ionicons name="lock-closed-outline" size={18} color={colors.textTertiary} style={styles.fieldIcon} />
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
              <View
                style={[
                  styles.errorBox,
                  clayPill,
                  {
                    backgroundColor: colors.expenseLight,
                    borderBottomColor: colors.expenseDark
                  }
                ]}
              >
                <Ionicons name="alert-circle" size={16} color={colors.expense} />
                <Text style={[styles.errorMsgText, { color: colors.expense }]}>{errorMsg}</Text>
              </View>
            )}

            {/* Chunky Violet 3D Clay Submit Button */}
            <TouchableOpacity
              style={[styles.submitButton, clayButton]}
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
              style={[
                styles.demoFillBtn,
                clayPill,
                {
                  backgroundColor: colors.surfaceSubtle
                }
              ]}
              onPress={handleFillDemo}
            >
              <Ionicons name="flash-outline" size={15} color={colors.primary} />
              <Text style={[styles.demoFillText, { color: colors.primary }]}>
                Fill Demo Credentials (demo@budgettracker.com)
              </Text>
            </TouchableOpacity>

            {/* Offline Demo Mode Toggle */}
            <TouchableOpacity
              style={[
                styles.offlineDemoBtn,
                clayPill,
                {
                  backgroundColor: colors.incomeLight,
                  borderBottomColor: colors.incomeDark
                }
              ]}
              onPress={toggleDemoMode}
            >
              <Ionicons name="leaf-outline" size={15} color={colors.income} />
              <Text style={[styles.offlineDemoText, { color: colors.income }]}>
                {demoMode ? 'Switch to Live Database' : '⚡ Instant Offline Demo Mode'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Note */}
        <View style={styles.footerNote}>
          <Text style={styles.footerText}>
            Secure JWT Authentication • Neon PostgreSQL
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
    paddingTop: 44,
    paddingBottom: 40,
    alignItems: 'center'
  },
  topBar: {
    width: '100%',
    maxWidth: 420,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginBottom: 16
  },
  clayTopIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 16,
    borderTopWidth: 2,
    borderLeftWidth: 1.5,
    borderRightWidth: 1,
    borderBottomWidth: 3.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 22
  },
  brandIconWrap: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderTopWidth: 3,
    borderLeftWidth: 2,
    borderRightWidth: 1.5,
    borderBottomWidth: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 9
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.8,
    color: '#FFFFFF'
  },
  heroSubtitle: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
    color: 'rgba(255, 255, 255, 0.85)'
  },
  authCard: {
    width: '100%',
    maxWidth: 420,
    padding: 24,
    borderRadius: 28
  },
  tabsWrap: {
    flexDirection: 'row',
    borderRadius: 18,
    padding: 4,
    marginBottom: 22,
    borderWidth: 1.5
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 11,
    alignItems: 'center',
    borderRadius: 14
  },
  tabBtnActive: {
    borderTopWidth: 2,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomWidth: 3.5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2
  },
  tabBtnText: {
    fontSize: 13
  },
  formArea: {
    gap: 16
  },
  inputGroup: {
    gap: 7
  },
  label: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 13
  },
  fieldIcon: {
    marginRight: 10
  },
  input: {
    flex: 1,
    fontSize: 15,
    padding: 0
  },
  eyeBtn: {
    padding: 4
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  errorMsgText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '800',
    lineHeight: 16
  },
  submitButton: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900'
  },
  demoFillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 11
  },
  demoFillText: {
    fontSize: 12,
    fontWeight: '800'
  },
  offlineDemoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 11
  },
  offlineDemoText: {
    fontSize: 12,
    fontWeight: '900'
  },
  footerNote: {
    marginTop: 26,
    alignItems: 'center'
  },
  footerText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.75)'
  }
});
