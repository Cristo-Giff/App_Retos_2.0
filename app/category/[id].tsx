import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react-native';
import { categories } from '@/data/challenges';
import { Progress } from '@/types/challenges';
import { 
  loadProgress, 
  toggleChallengeCompletion, 
  resetCategoryProgress,
  calculateCategoryProgress 
} from '@/utils/storage';
import ChallengeItem from '@/components/ChallengeItem';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [progress, setProgress] = useState<Progress>({});
  
  const category = categories.find(cat => cat.id === id);
  
  if (!category) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Categoría no encontrada</Text>
      </SafeAreaView>
    );
  }

  const loadData = async () => {
    const savedProgress = await loadProgress();
    setProgress(savedProgress);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChallengeToggle = async (challengeId: number) => {
    const newProgress = await toggleChallengeCompletion(category.id, challengeId);
    setProgress(newProgress);
  };

  const handleReset = () => {
    Alert.alert(
      'Reiniciar Progreso',
      '¿Estás seguro de que quieres reiniciar todos los retos de esta categoría?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Reiniciar',
          style: 'destructive',
          onPress: async () => {
            const newProgress = await resetCategoryProgress(category.id);
            setProgress(newProgress);
          },
        },
      ]
    );
  };

  const categoryProgress = calculateCategoryProgress(
    progress, 
    category.id, 
    category.challenges.length
  );

  const completedCount = Object.values(progress[category.id] || {}).filter(Boolean).length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: category.color }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}>
            <ArrowLeft color="white" size={24} strokeWidth={2} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.resetButton} 
            onPress={handleReset}>
            <RotateCcw color="white" size={20} strokeWidth={2} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.headerContent}>
          <View style={styles.titleSection}>
            <Text style={styles.categoryTitle}>{category.name}</Text>
            <Text style={styles.categorySubtitle}>Reto de 30 días</Text>
          </View>
          
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop' }}
            style={styles.mascot}
          />
        </View>
      </View>

      {/* Progress Card */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <View style={styles.progressStats}>
            <Text style={[styles.progressPercentage, { color: category.color }]}>
              {categoryProgress}%
            </Text>
            <Text style={styles.progressText}>
              {completedCount} de {category.challenges.length} completados
            </Text>
          </View>
          
          {categoryProgress === 100 && (
            <View style={styles.trophyContainer}>
              <Trophy color="#ffd700" size={32} strokeWidth={2} />
            </View>
          )}
        </View>
        
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarFill, 
                { 
                  width: `${categoryProgress}%`,
                  backgroundColor: category.color
                }
              ]} 
            />
          </View>
        </View>
      </View>

      {/* Challenges List */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}>
        <Text style={styles.challengesTitle}>Retos Diarios</Text>
        
        {category.challenges.map((challenge) => {
          const isCompleted = progress[category.id]?.[challenge.id] || false;
          
          return (
            <ChallengeItem
              key={challenge.id}
              challenge={challenge}
              isCompleted={isCompleted}
              onToggle={() => handleChallengeToggle(challenge.id)}
              accentColor={category.color}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleSection: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: 'white',
    marginBottom: 4,
  },
  categorySubtitle: {
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
  progressCard: {
    marginHorizontal: 24,
    marginTop: -12,
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
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressStats: {
    flex: 1,
  },
  progressPercentage: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    lineHeight: 36,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginTop: 4,
  },
  trophyContainer: {
    padding: 8,
  },
  progressBarContainer: {
    height: 8,
  },
  progressBarBackground: {
    height: '100%',
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 16,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  challengesTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#2d3748',
    marginHorizontal: 24,
    marginBottom: 16,
  },
});