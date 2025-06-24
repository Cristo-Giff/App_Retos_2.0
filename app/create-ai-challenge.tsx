import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Sparkles, Crown, Zap } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';

export default function CreateAIChallengeScreen() {
  const [goalPrompt, setGoalPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [remainingQueries, setRemainingQueries] = useState(5);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.replace('/auth/login');
        return;
      }

      // Check premium status
      const { data: subscription } = await supabase
        .from('user_subscriptions')
        .select('is_premium')
        .eq('user_id', user.id)
        .single();

      setIsPremium(subscription?.is_premium || false);

      // Check remaining queries
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      const { data: usageLog } = await supabase
        .from('ai_usage_logs')
        .select('query_count')
        .eq('user_id', user.id)
        .eq('month', currentMonth)
        .eq('year', currentYear)
        .single();

      setRemainingQueries(5 - (usageLog?.query_count || 0));
    } catch (error) {
      console.error('Error checking user status:', error);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const handleGenerateChallenge = async () => {
    if (!goalPrompt.trim()) {
      setError('Por favor, describe tu meta personal');
      return;
    }

    if (!isPremium) {
      router.push('/subscription');
      return;
    }

    if (remainingQueries <= 0) {
      setError('Has alcanzado el límite mensual de 5 retos generados por IA');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No authenticated session');
      }

      const response = await fetch('/api/generate-challenge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ goalPrompt }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error generating challenge');
      }

      // Navigate to the new challenge category
      router.push(`/category/ai-${result.challengePackage.id}`);
    } catch (error) {
      console.error('Error generating challenge:', error);
      setError(error instanceof Error ? error.message : 'Error generando el reto');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = () => {
    router.push('/subscription');
  };

  if (isCheckingStatus) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4c9aff" />
          <Text style={styles.loadingText}>Verificando estado...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}>
            <ArrowLeft color="white" size={24} strokeWidth={2} />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Crear Reto con IA</Text>
              <Text style={styles.subtitle}>Personaliza tu plan de 30 días</Text>
            </View>
            
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop' }}
              style={styles.aiImage}
            />
          </View>
        </View>

        {!isPremium ? (
          // Premium Required Section
          <View style={styles.premiumSection}>
            <View style={styles.premiumCard}>
              <View style={styles.premiumHeader}>
                <Crown color="#ffd700" size={32} strokeWidth={2} />
                <Text style={styles.premiumTitle}>Función Premium</Text>
              </View>
              
              <Text style={styles.premiumDescription}>
                La generación de retos con IA es una función exclusiva para usuarios Premium. 
                Obtén acceso ilimitado a retos personalizados y muchas más funciones.
              </Text>
              
              <View style={styles.premiumFeatures}>
                <View style={styles.featureItem}>
                  <Sparkles color="#4c9aff" size={20} strokeWidth={2} />
                  <Text style={styles.featureText}>Retos personalizados con IA</Text>
                </View>
                <View style={styles.featureItem}>
                  <Zap color="#4c9aff" size={20} strokeWidth={2} />
                  <Text style={styles.featureText}>5 generaciones por mes</Text>
                </View>
                <View style={styles.featureItem}>
                  <Crown color="#4c9aff" size={20} strokeWidth={2} />
                  <Text style={styles.featureText}>Acceso a todas las funciones</Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.subscribeButton}
                onPress={handleSubscribe}>
                <Text style={styles.subscribeButtonText}>Obtener Premium</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // AI Input Section
          <View style={styles.inputSection}>
            <View style={styles.inputCard}>
              <Text style={styles.inputTitle}>¿Cuál es tu meta?</Text>
              <Text style={styles.inputDescription}>
                Describe qué quieres lograr y la IA creará un plan personalizado de 30 días para ti.
              </Text>
              
              <TextInput
                style={styles.textInput}
                placeholder="Ej: Quiero mejorar mi salud mental y reducir el estrés..."
                placeholderTextColor="#9ca3af"
                value={goalPrompt}
                onChangeText={setGoalPrompt}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              
              <View style={styles.queryInfo}>
                <Text style={styles.queryText}>
                  Consultas restantes este mes: {remainingQueries}/5
                </Text>
              </View>
              
              {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}
              
              <TouchableOpacity 
                style={[
                  styles.generateButton,
                  (!goalPrompt.trim() || isLoading || remainingQueries <= 0) && styles.generateButtonDisabled
                ]}
                onPress={handleGenerateChallenge}
                disabled={!goalPrompt.trim() || isLoading || remainingQueries <= 0}>
                {isLoading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <>
                    <Sparkles color="white" size={20} strokeWidth={2} />
                    <Text style={styles.generateButtonText}>Generar Reto</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Examples Section */}
        <View style={styles.examplesSection}>
          <Text style={styles.examplesTitle}>Ejemplos de metas</Text>
          
          <View style={styles.examplesList}>
            <TouchableOpacity 
              style={styles.exampleItem}
              onPress={() => setGoalPrompt('Quiero mejorar mi salud mental y reducir el estrés diario')}>
              <Text style={styles.exampleText}>🧠 Mejorar salud mental</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.exampleItem}
              onPress={() => setGoalPrompt('Quiero ser más productivo en el trabajo y organizar mejor mi tiempo')}>
              <Text style={styles.exampleText}>⚡ Aumentar productividad</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.exampleItem}
              onPress={() => setGoalPrompt('Quiero crear el hábito de hacer ejercicio regularmente')}>
              <Text style={styles.exampleText}>💪 Crear hábito de ejercicio</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.exampleItem}
              onPress={() => setGoalPrompt('Quiero aprender una nueva habilidad y desarrollar mi creatividad')}>
              <Text style={styles.exampleText}>🎨 Desarrollar creatividad</Text>
            </TouchableOpacity>
          </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  header: {
    backgroundColor: '#9c88ff',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
  aiImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
  },
  premiumSection: {
    paddingHorizontal: 24,
    marginTop: -16,
  },
  premiumCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  premiumTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#2d3748',
    marginLeft: 12,
  },
  premiumDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    lineHeight: 24,
    marginBottom: 24,
  },
  premiumFeatures: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2d3748',
    marginLeft: 12,
  },
  subscribeButton: {
    backgroundColor: '#4c9aff',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  subscribeButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: 'white',
  },
  inputSection: {
    paddingHorizontal: 24,
    marginTop: -16,
  },
  inputCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  inputTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#2d3748',
    marginBottom: 8,
  },
  inputDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    lineHeight: 24,
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2d3748',
    minHeight: 120,
    marginBottom: 16,
  },
  queryInfo: {
    backgroundColor: '#f7fafc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  queryText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4a5568',
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#fed7d7',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#c53030',
    textAlign: 'center',
  },
  generateButton: {
    backgroundColor: '#9c88ff',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  generateButtonDisabled: {
    backgroundColor: '#cbd5e0',
  },
  generateButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: 'white',
  },
  examplesSection: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  examplesTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#2d3748',
    marginBottom: 16,
  },
  examplesList: {
    gap: 12,
  },
  exampleItem: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  exampleText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2d3748',
  },
});