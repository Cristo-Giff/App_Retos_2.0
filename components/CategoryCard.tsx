import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { 
  Dumbbell, 
  Brain, 
  Target,
  Sparkles,
} from 'lucide-react-native';
import { Category } from '@/types/challenges';

interface CategoryCardProps {
  category: Category;
  progress: number;
  onPress: () => void;
}

const iconMap = {
  dumbbell: Dumbbell,
  brain: Brain,
  target: Target,
  sparkles: Sparkles,
};

const categoryImages = {
  fitness: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
  'mental-health': 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
  productivity: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
  ai: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
};

export default function CategoryCard({ category, progress, onPress }: CategoryCardProps) {
  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Sparkles;
  const isAICategory = category.id.startsWith('ai-');
  
  // Use AI image for AI-generated categories, otherwise use category-specific image
  const imageKey = isAICategory ? 'ai' : (category.id as keyof typeof categoryImages);
  const imageUrl = categoryImages[imageKey] || categoryImages.ai;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.card, { backgroundColor: category.color + '15' }]}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: imageUrl }}
            style={styles.categoryImage}
          />
          <View style={[styles.iconOverlay, { backgroundColor: category.color }]}>
            <IconComponent color="white" size={24} strokeWidth={2.5} />
          </View>
          {isAICategory && (
            <View style={styles.aiBadge}>
              <Sparkles color="#9c88ff" size={16} strokeWidth={2} />
              <Text style={styles.aiBadgeText}>IA</Text>
            </View>
          )}
        </View>
        
        <View style={styles.content}>
          <Text style={styles.categoryName}>{category.name}</Text>
          
          <View style={styles.progressSection}>
            <View style={styles.progressInfo}>
              <Text style={[styles.progressText, { color: category.color }]}>
                {progress}% completado
              </Text>
              <Text style={styles.challengeCount}>
                {category.challenges?.length || 30} retos disponibles
              </Text>
            </View>
            
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <View 
                  style={[
                    styles.progressBarFill, 
                    { 
                      width: `${progress}%`,
                      backgroundColor: category.color
                    }
                  ]} 
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
    height: 120,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  iconOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  aiBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  aiBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#9c88ff',
  },
  content: {
    padding: 20,
    backgroundColor: 'white',
  },
  categoryName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#2d3748',
    marginBottom: 12,
  },
  progressSection: {
    gap: 12,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  challengeCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
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
});