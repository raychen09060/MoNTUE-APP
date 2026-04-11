import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const horizontalPadding = 24;
const tabContainerWidth = screenWidth - horizontalPadding * 2;
const tabWidth = tabContainerWidth / 3;

export default function TicketTab({ activeTab, setActiveTab }) {
  const getInitialX = () => {
    if (activeTab === 'my') return 0;
    if (activeTab === 'exhibition') return tabWidth;
    if (activeTab === 'visit') return tabWidth * 2;
    return tabWidth;
  };

  const translateX = useRef(new Animated.Value(getInitialX())).current;

  useEffect(() => {
    let targetX = 0;

    if (activeTab === 'my') {
      targetX = 0;
    } else if (activeTab === 'exhibition') {
      targetX = tabWidth;
    } else if (activeTab === 'visit') {
      targetX = tabWidth * 2;
    }

    Animated.timing(translateX, {
      toValue: targetX,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [activeTab, translateX]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.tabRow}>
        <Pressable style={styles.tabButton} onPress={() => setActiveTab('my')}>
          <Text style={[styles.tabText, activeTab === 'my' && styles.activeTabText]}>
            我的票券
          </Text>
        </Pressable>

        <Pressable
          style={styles.tabButton}
          onPress={() => setActiveTab('exhibition')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'exhibition' && styles.activeTabText,
            ]}
          >
            展覽門票
          </Text>
        </Pressable>

        <Pressable style={styles.tabButton} onPress={() => setActiveTab('visit')}>
          <Text style={[styles.tabText, activeTab === 'visit' && styles.activeTabText]}>
            參觀門票
          </Text>
        </Pressable>
      </View>

      <View style={styles.lineWrapper}>
        <View style={styles.baseLine} />
        <Animated.View
          style={[
            styles.activeLine,
            {
              width: tabWidth,
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
    paddingHorizontal: horizontalPadding,
    paddingTop: 6,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabButton: {
    width: tabWidth,
    alignItems: 'center',
    paddingBottom: 12,
  },
  tabText: {
    fontSize: 16,
    color: '#6E6E6E',
    letterSpacing: 1,
    fontWeight: '400',
  },
  activeTabText: {
    color: '#111111',
    fontWeight: '600',
  },
  lineWrapper: {
    position: 'relative',
    height: 3,
  },
  baseLine: {
    position: 'absolute',
    width: '100%',
    height: 1.5,
    backgroundColor: '#222222',
  },
  activeLine: {
    position: 'absolute',
    height: 3,
    backgroundColor: '#E5C84B',
  },
});