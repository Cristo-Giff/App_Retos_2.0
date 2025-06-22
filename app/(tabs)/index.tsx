import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  RefreshControl,
  Image
} from 'react-native';
import { router } from 'expo-router';
import { categories } from '@/data/challenges';
import { Progress } from '@/types/challenges';
import { loadProgress, calculateCategoryProgress } from '@/utils/storage';
import CategoryCard from '@/components/CategoryCard';

export default function HomeScreen() {
  const [progress, setProgress] = useState<Progress>({});
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const savedProgress = await loadProgress();
    setProgress(savedProgress);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        
        {/* Header with mascot */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.titleSection}>
              <Text style={styles.greeting}>¡Hola!</Text>
              <Text style={styles.title}>Retos de 30 Días</Text>
            </View>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' }}
              style={styles.mascot}
            />
          </View>
        </View>

        {/* Overall Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Tu Progreso General</Text>
            <Text style={styles.progressPercentage}>{getTotalProgress()}%</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { width: `${getTotalProgress()}%` }
                ]} 
              />
            </View>
          </View>
          <Text style={styles.progressSubtext}>
            {getCompletedChallenges()} retos completados
          </Text>
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categorías</Text>
          
          <View style={styles.categoriesGrid}>
            {categories.map((category) => {
              const categoryProgress = calculateCategoryProgress(
                progress, 
                category.id, 
                category.challenges.length
              );
              
              return (
                <CategoryCard
                  key={category.id}
                  category={category}
                  progress={categoryProgress}
                  onPress={() => handleCategoryPress(category.id)}
                />
              );
            })}
          </View>
        </View>

        {/* Motivational Section */}
        <View style={styles.motivationCard}>
          <Text style={styles.motivationTitle}>💪 ¡Sigue así!</Text>
          <Text style={styles.motivationText}>
            Cada pequeño paso cuenta. ¡Completa un reto hoy!
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
    backgroundColor: '#4c9aff',
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
  greeting: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: 'white',
    opacity: 0.9,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: 'white',
  },
  mascot: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'white',
  },
  progressCard: {
    marginHorizontal: 24,
    marginTop: -16,
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#2d3748',
  },
  progressPercentage: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#4c9aff',
  },
  progressBarContainer: {
    marginBottom: 12,
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: '#e2e8f0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4c9aff',
    borderRadius: 6,
  },
  progressSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
  },
  categoriesSection: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#2d3748',
    marginBottom: 20,
  },
  categoriesGrid: {
    gap: 16,
  },
  motivationCard: {
    marginHorizontal: 24,
    marginTop: 24,
    padding: 20,
    backgroundColor: '#fff5f5',
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b6b',
  },
  motivationTitle: {
    fontSize: 18,
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