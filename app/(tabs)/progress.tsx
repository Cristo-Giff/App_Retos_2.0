import React, { useState, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  RefreshControl,
  Image
} from 'react-native';
import { Trophy, Target, TrendingUp } from 'lucide-react-native';
import { categories } from '@/data/challenges';
import { Progress } from '@/types/challenges';
import { loadProgress, calculateCategoryProgress } from '@/utils/storage';
import ProgressBar from '@/components/ProgressBar';

export default function ProgressScreen() {
  const [progress, setProgress] = useState<Progress>({});
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const savedProgress = await loadProgress();
    setProgress(savedProgress);
  };

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const getTotalProgress = () => {
    const totalChallenges = categories.reduce((sum, cat) => sum + cat.challenges.length, 0);
    const completedChallenges = categories.reduce((sum, cat) => {
      const categoryProgress = progress[cat.id] || {};
      return sum + Object.values(categoryProgress).filter(Boolean).length;
    }, 0);
    
    return Math.round((completedChallenges / totalChallenges) * 100);
  };

  const getCompletedChallenges = () => {
    return categories.reduce((sum, cat) => {
      const categoryProgress = progress[cat.id] || {};
      return sum + Object.values(categoryProgress).filter(Boolean).length;
    }, 0);
  };

  const getTotalChallenges = () => {
    return categories.reduce((sum, cat) => sum + cat.challenges.length, 0);
  };

  const getCompletedCategories = () => {
    return categories.filter(cat => {
      const categoryProgress = calculateCategoryProgress(progress, cat.id, cat.challenges.length);
      return categoryProgress === 100;
    }).length;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Tu Progreso</Text>
              <Text style={styles.subtitle}>¡Sigue así, vas genial!</Text>
            </View>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop' }}
              style={styles.mascot}
            />
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={[styles.statCard, styles.primaryStatCard]}>
              <View style={styles.statIcon}>
                <Trophy color="#ffd700" size={24} strokeWidth={2} />
              </View>
              <Text style={styles.statNumber}>{getTotalProgress()}%</Text>
              <Text style={styles.statLabel}>Progreso Total</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Target color="#4c9aff" size={24} strokeWidth={2} />
              </View>
              <Text style={styles.statNumber}>{getCompletedChallenges()}</Text>
              <Text style={styles.statLabel}>Retos Completados</Text>
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <TrendingUp color="#10b981" size={24} strokeWidth={2} />
              </View>
              <Text style={styles.statNumber}>{getCompletedCategories()}</Text>
              <Text style={styles.statLabel}>Categorías Completas</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Text style={styles.streakEmoji}>🔥</Text>
              </View>
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>Días de Racha</Text>
            </View>
          </View>
        </View>

        {/* Overall Progress */}
        <View style={styles.overallProgressCard}>
          <Text style={styles.cardTitle}>Progreso General</Text>
          <View style={styles.progressInfo}>
            <Text style={styles.progressCount}>
              {getCompletedChallenges()} de {getTotalChallenges()} retos
            </Text>
            <Text style={styles.progressPercentage}>{getTotalProgress()}%</Text>
          </View>
          <ProgressBar 
            progress={getTotalProgress()} 
            color="#4c9aff" 
            height={12} 
          />
        </View>

        {/* Categories Progress */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Por Categoría</Text>
          
          {categories.map((category) => {
            const categoryProgress = calculateCategoryProgress(
              progress, 
              category.id, 
              category.challenges.length
            );
            const completedCount = Object.values(progress[category.id] || {}).filter(Boolean).length;
            
            return (
              <View key={category.id} style={styles.categoryCard}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryCount}>
                      {completedCount} de {category.challenges.length} retos
                    </Text>
                  </View>
                  
                  <View style={styles.categoryProgress}>
                    <Text style={[styles.categoryPercentage, { color: category.color }]}>
                      {categoryProgress}%
                    </Text>
                    {categoryProgress === 100 && (
                      <Trophy color="#ffd700" size={20} strokeWidth={2} />
                    )}
                  </View>
                </View>
                
                <View style={styles.progressBarContainer}>
                  <ProgressBar 
                    progress={categoryProgress} 
                    color={category.color} 
                    height={8} 
                  />
                </View>
              </View>
            );
          })}
        </View>

        {/* Motivation Section */}
        <View style={styles.motivationCard}>
          <Text style={styles.motivationTitle}>🎯 ¡Mantén el ritmo!</Text>
          <Text style={styles.motivationText}>
            Cada reto completado te acerca más a tus objetivos. ¡No te detengas ahora!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    backgroundColor: '#10b981',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: 'white',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'white',
    opacity: 0.9,
  },
  mascot: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
  },
  statsContainer: {
    paddingHorizontal: 24,
    marginTop: -16,
    gap: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  primaryStatCard: {
    backgroundColor: '#fff9e6',
  },
  statIcon: {
    marginBottom: 8,
  },
  streakEmoji: {
    fontSize: 24,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#2d3748',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
  },
  overallProgressCard: {
    marginHorizontal: 24,
    marginTop: 24,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#2d3748',
    marginBottom: 16,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  progressPercentage: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#4c9aff',
  },
  categoriesSection: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#2d3748',
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2d3748',
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  categoryProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryPercentage: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  progressBarContainer: {
    marginTop: 4,
  },
  motivationCard: {
    marginHorizontal: 24,
    marginTop: 24,
    padding: 20,
    backgroundColor: '#f0fff4',
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  motivationTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#2d3748',
    marginBottom: 8,
  },
  motivationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    lineHeight: 20,
  },
});