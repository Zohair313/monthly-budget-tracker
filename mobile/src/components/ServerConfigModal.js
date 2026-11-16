import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Switch, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { palette } from '../theme/colors';

export default function ServerConfigModal({ visible, onClose }) {
  const { apiUrl, updateApiUrl, demoMode, toggleDemoMode, themeMode } = useAuth();
  const colors = palette[themeMode];

  const [inputUrl, setInputUrl] = useState('');
  const [isPinging, setIsPinging] = useState(false);
  const [pingStatus, setPingStatus] = useState(null);

  useEffect(() => {
    if (visible) {
      setInputUrl(apiUrl);
      setPingStatus(null);
    }
  }, [visible, apiUrl]);

  const handleSave = async () => {
    if (!inputUrl.trim()) {
      Alert.alert('Invalid URL', 'Please provide a valid backend URL.');
      return;
    }
    await updateApiUrl(inputUrl.trim());
    onClose();
  };

  const handlePing = async () => {
    setIsPinging(true);
    setPingStatus(null);
    const targetUrl = inputUrl.trim().replace(/\/+$/, '') + '/api/health';

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(targetUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        setPingStatus({ ok: true, msg: 'Backend online & reachable!' });
      } else {
        setPingStatus({ ok: false, msg: `HTTP ${res.status}: Server returned error.` });
      }
    } catch (err) {
      setPingStatus({
        ok: false,
        msg: 'Connection failed. Ensure backend is running and URL is reachable.'
      });
    } finally {
      setIsPinging(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modalCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.titleWrap}>
              <View style={[styles.iconWrap, { backgroundColor: colors.primaryLight }]}>
                <Ionicons name="server-outline" size={18} color={colors.primary} />
              </View>
              <View>
                <Text style={[styles.modalTitle, { color: colors.text }]}>Backend Configuration</Text>
                <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}>
                  API endpoints & Connection
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Explanation */}
          <Text style={[styles.descText, { color: colors.textSecondary }]}>
            When testing on a physical iPhone via Expo Go, replace `localhost` with your computer's Wi-Fi IP (e.g. `http://192.168.1.x:5000`) or your deployed Railway / Render backend URL.
          </Text>

          {/* Backend URL Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>BACKEND API URL</Text>
            <View style={[styles.inputBox, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}>
              <TextInput
                style={[styles.textInput, { color: colors.text }]}
                placeholder="http://localhost:5000"
                placeholderTextColor={colors.textTertiary}
                value={inputUrl}
                onChangeText={setInputUrl}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Test Connection Button */}
          <View style={styles.pingRow}>
            <TouchableOpacity
              onPress={handlePing}
              style={[styles.pingBtn, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}
              disabled={isPinging}
            >
              <Ionicons
                name={isPinging ? 'hourglass-outline' : 'radio-outline'}
                size={14}
                color={colors.primary}
              />
              <Text style={[styles.pingBtnText, { color: colors.primary }]}>
                {isPinging ? 'Testing connection...' : 'Test Connection'}
              </Text>
            </TouchableOpacity>

            {pingStatus && (
              <View style={styles.pingResult}>
                <Ionicons
                  name={pingStatus.ok ? 'checkmark-circle' : 'close-circle'}
                  size={14}
                  color={pingStatus.ok ? colors.income : colors.expense}
                />
                <Text
                  style={[
                    styles.pingResultText,
                    { color: pingStatus.ok ? colors.income : colors.expense }
                  ]}
                  numberOfLines={1}
                >
                  {pingStatus.msg}
                </Text>
              </View>
            )}
          </View>

          {/* Offline Demo Mode Toggle */}
          <View style={[styles.demoSwitchBox, { backgroundColor: colors.surfaceSubtle, borderColor: colors.borderSubtle }]}>
            <View style={styles.demoSwitchText}>
              <Text style={[styles.demoSwitchTitle, { color: colors.text }]}>Built-in Offline Demo Engine</Text>
              <Text style={[styles.demoSwitchSub, { color: colors.textSecondary }]}>
                Use mock storage to test all app screens without needing the backend running.
              </Text>
            </View>
            <Switch
              value={demoMode}
              onValueChange={toggleDemoMode}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={demoMode ? colors.primary : colors.textTertiary}
            />
          </View>

          {/* Actions */}
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={[styles.cancelBtn, { borderColor: colors.border }]}>
              <Text style={[styles.cancelBtnText, { color: colors.textSecondary }]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSave} style={[styles.saveBtn, { backgroundColor: colors.primary }]}>
              <Text style={styles.saveBtnText}>Save URL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 20,
    borderWidth: 1,
    padding: 20
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3
  },
  modalSubtitle: {
    fontSize: 11,
    marginTop: 1
  },
  closeBtn: {
    padding: 4
  },
  descText: {
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 14
  },
  inputGroup: {
    marginBottom: 10
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 6
  },
  inputBox: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9
  },
  textInput: {
    fontSize: 13,
    padding: 0
  },
  pingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14
  },
  pingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1
  },
  pingBtnText: {
    fontSize: 11,
    fontWeight: '600'
  },
  pingResult: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1
  },
  pingResultText: {
    fontSize: 11,
    flex: 1
  },
  demoSwitchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 18
  },
  demoSwitchText: {
    flex: 1,
    marginRight: 10
  },
  demoSwitchTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2
  },
  demoSwitchSub: {
    fontSize: 10,
    lineHeight: 14
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1
  },
  cancelBtnText: {
    fontSize: 13,
    fontWeight: '600'
  },
  saveBtn: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 10
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700'
  }
});
