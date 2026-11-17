import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions, StatusBar } from 'react-native';
import Ionicons from './Icon';

const { width, height } = Dimensions.get('screen');

export default function AnimatedSplashScreen({ onFinish }) {
  const scaleAnim = useRef(new Animated.Value(0.75)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const exitAnim = useRef(new Animated.Value(1)).current;

  const [loadingStep, setLoadingStep] = useState('Securing financial vault...');
  const [percentText, setPercentText] = useState('0%');

  useEffect(() => {
    // 1. Entrance animation (scale + fade in)
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 650,
        easing: Easing.out(Easing.back(1.4)),
        useNativeDriver: true
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 550,
        useNativeDriver: true
      })
    ]).start();

    // 2. Pulse animation for the logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.06,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    ).start();

    // 3. Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false
    }).start();

    // Status step messages
    const t1 = setTimeout(() => {
      setLoadingStep('Connecting to Neon PostgreSQL...');
      setPercentText('45%');
    }, 450);

    const t2 = setTimeout(() => {
      setLoadingStep('Calculating real-time balances...');
      setPercentText('85%');
    }, 1000);

    const t3 = setTimeout(() => {
      setLoadingStep('Ready!');
      setPercentText('100%');
    }, 1500);

    // 4. Smooth exit fade out
    const t4 = setTimeout(() => {
      Animated.timing(exitAnim, {
        toValue: 0,
        duration: 350,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true
      }).start(() => {
        if (onFinish) onFinish();
      });
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  return (
    <Animated.View style={[styles.container, { opacity: exitAnim }]}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      {/* Decorative ambient background glows */}
      <View style={styles.glowCircle1} />
      <View style={styles.glowCircle2} />

      <Animated.View
        style={[
          styles.contentWrap,
          {
            opacity: fadeAnim,
            transform: [{ scale: Animated.multiply(scaleAnim, pulseAnim) }]
          }
        ]}
      >
        {/* 3D Tactile Executive Logo Coin */}
        <View style={styles.clayLogoCoin}>
          <Ionicons name="wallet" size={46} color="#FFFFFF" />
        </View>

        {/* Brand Typography */}
        <Text style={styles.brandTitle}>Budget Tracker</Text>
        <Text style={styles.brandSubtitle}>Monthly Financial Vault</Text>
      </Animated.View>

      {/* Bottom Loading Progress Bar */}
      <Animated.View style={[styles.progressSection, { opacity: fadeAnim }]}>
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
        </View>

        <View style={styles.progressStatusRow}>
          <Text style={styles.statusText}>{loadingStep}</Text>
          <Text style={styles.percentText}>{percentText}</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width,
    height,
    backgroundColor: '#0F172A', // Full screen Obsidian Navy
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999999
  },
  glowCircle1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(79, 70, 229, 0.18)'
  },
  glowCircle2: {
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(16, 185, 129, 0.12)'
  },
  contentWrap: {
    alignItems: 'center',
    marginBottom: 80
  },
  clayLogoCoin: {
    width: 96,
    height: 96,
    borderRadius: 30,
    backgroundColor: '#4F46E5',
    borderTopWidth: 2.5,
    borderLeftWidth: 2,
    borderRightWidth: 1,
    borderBottomWidth: 5,
    borderTopColor: 'rgba(255, 255, 255, 0.7)',
    borderLeftColor: 'rgba(255, 255, 255, 0.4)',
    borderRightColor: '#312E81',
    borderBottomColor: '#1E1B4B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 18,
    elevation: 8
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.6
  },
  brandSubtitle: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
    letterSpacing: 0.3
  },
  progressSection: {
    position: 'absolute',
    bottom: 60,
    width: Math.min(width - 64, 320),
    alignItems: 'center'
  },
  progressTrack: {
    width: '100%',
    height: 7,
    borderRadius: 3.5,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    overflow: 'hidden',
    marginBottom: 10
  },
  progressBar: {
    height: '100%',
    borderRadius: 3.5,
    backgroundColor: '#10B981' // Emerald Mint Fill
  },
  progressStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  statusText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600'
  },
  percentText: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '800'
  }
});
