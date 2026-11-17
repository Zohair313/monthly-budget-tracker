import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import Ionicons from './Icon';

const { width } = Dimensions.get('window');

export default function AnimatedSplashScreen({ onFinish }) {
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const exitAnim = useRef(new Animated.Value(1)).current;

  const [loadingStep, setLoadingStep] = useState('Initializing secure vault...');
  const [percentText, setPercentText] = useState('0%');

  useEffect(() => {
    // 1. Entrance animation (scale + fade in)
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      })
    ]).start();

    // 2. Pulse animation for the logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    ).start();

    // 3. Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false
    }).start();

    // Status step messages
    const t1 = setTimeout(() => {
      setLoadingStep('Syncing income & expense engine...');
      setPercentText('45%');
    }, 500);

    const t2 = setTimeout(() => {
      setLoadingStep('Activating Claymorphism interface...');
      setPercentText('85%');
    }, 1100);

    const t3 = setTimeout(() => {
      setLoadingStep('Ready!');
      setPercentText('100%');
    }, 1600);

    // 4. Smooth exit fade out
    const t4 = setTimeout(() => {
      Animated.timing(exitAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true
      }).start(() => {
        if (onFinish) onFinish();
      });
    }, 1900);

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
      {/* Decorative background glow circles */}
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
        {/* 3D Inflated Clay Icon Coin */}
        <View style={styles.clayLogoCoin}>
          <Ionicons name="wallet" size={48} color="#FFFFFF" />
        </View>

        {/* Brand Typography */}
        <Text style={styles.brandTitle}>Budget Tracker</Text>
        <Text style={styles.brandSubtitle}>Monthly Financial Vault</Text>
      </Animated.View>

      {/* Bottom Clay Loading Progress */}
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
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#6C52EE', // Tactile Lilac Purple
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99999
  },
  glowCircle1: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(255, 255, 255, 0.12)'
  },
  glowCircle2: {
    position: 'absolute',
    bottom: -60,
    left: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(0, 0, 0, 0.15)'
  },
  contentWrap: {
    alignItems: 'center',
    marginBottom: 60
  },
  clayLogoCoin: {
    width: 96,
    height: 96,
    borderRadius: 32,
    backgroundColor: '#806BF2',
    borderTopWidth: 3,
    borderLeftWidth: 2,
    borderRightWidth: 1.5,
    borderBottomWidth: 5,
    borderTopColor: 'rgba(255, 255, 255, 0.75)',
    borderLeftColor: 'rgba(255, 255, 255, 0.45)',
    borderRightColor: '#563CC5',
    borderBottomColor: '#452CA8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#2C1B7A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 10
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.8
  },
  brandSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
    letterSpacing: 0.4
  },
  progressSection: {
    position: 'absolute',
    bottom: 50,
    width: Math.min(width - 60, 320),
    alignItems: 'center'
  },
  progressTrack: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.35)',
    borderBottomColor: 'rgba(255, 255, 255, 0.25)',
    overflow: 'hidden',
    marginBottom: 10
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#34D399', // Mint green fill
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.7)'
  },
  progressStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  statusText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    fontWeight: '600'
  },
  percentText: {
    color: '#34D399',
    fontSize: 11,
    fontWeight: '800'
  }
});
