import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Crown, Check, Sparkles, Zap, Target } from 'lucide-react-native';

export default function SubscriptionScreen() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  const handleSubscribe = () => {
    // Note: This would integrate with RevenueCat in a local development environment
    // For now, we'll show a message about local development requirement
    alert('Para implementar suscripciones reales, necesitas descargar el proyecto y usar RevenueCat en desarrollo local.');
  };

  const plans = {
    monthly: {
      price: '$4.99',
      period: 'mes',
      savings: null,
    },
    yearly: {
      price: '$39.99',
      period: 'año',
      savings: 'Ahorra 33%',
    },
  };

  const features = [
    {
      icon: Sparkles,
      title: 'Retos personalizados con IA',
      description: 'Genera hasta 5 planes únicos cada mes',
    },
    {
      icon: Target,
      title: 'Seguimiento avanzado',
      description: 'Estadísticas detalladas de tu progreso',
    },
    {
      icon: Zap,
      title: 'Funciones exclusivas',
      description: 'Acceso a todas las herramientas premium',
    },
    {
      icon: Crown,
      title: 'Soporte prioritario',
      description: 'Ayuda personalizada cuando la necesites',
    },
  ];

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
              <Text style={styles.title}>Premium</Text>
              <Text style={styles.subtitle}>Desbloquea todo tu potencial</Text>
            </View>
            
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop' }}
              style={styles.premiumImage}
            />
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroCard}>
            <Crown color="#ffd700" size={48} strokeWidth={2} />
            <Text style={styles.heroTitle}>Únete a Premium</Text>
            <Text style={styles.heroDescription}>
              Accede a retos personalizados con IA y funciones exclusivas para acelerar tu crecimiento personal.
            </Text>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>¿Qué incluye Premium?</Text>
          
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <IconComponent color="#4c9aff" size={24} strokeWidth={2} />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Pricing Section */}
        <View style={styles.pricingSection}>
          <Text style={styles.sectionTitle}>Elige tu plan</Text>
          
          <View style={styles.plansContainer}>
            <TouchableOpacity 
              style={[
                styles.planCard,
                selectedPlan === 'monthly' && styles.planCardSelected
              ]}
              onPress={() => setSelectedPlan('monthly')}>
              <View style={styles.planHeader}>
                <Text style={styles.planTitle}>Mensual</Text>
                {selectedPlan === 'monthly' && (
                  <View style={styles.selectedBadge}>
                    <Check color="white" size={16} strokeWidth={2} />
                  </View>
                )}
              </View>
              <Text style={styles.planPrice}>{plans.monthly.price}</Text>
              <Text style={styles.planPeriod}>por {plans.monthly.period}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.planCard,
                selectedPlan === 'yearly' && styles.planCardSelected,
                styles.popularPlan
              ]}
              onPress={() => setSelectedPlan('yearly')}>
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>Más Popular</Text>
              </View>
              <View style={styles.planHeader}>
                <Text style={styles.planTitle}>Anual</Text>
                {selectedPlan === 'yearly' && (
                  <View style={styles.selectedBadge}>
                    <Check color="white" size={16} strokeWidth={2} />
                  </View>
                )}
              </View>
              <Text style={styles.planPrice}>{plans.yearly.price}</Text>
              <Text style={styles.planPeriod}>por {plans.yearly.period}</Text>
              {plans.yearly.savings && (
                <View style={styles.savingsBadge}>
                  <Text style={styles.savingsText}>{plans.yearly.savings}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <TouchableOpacity 
            style={styles.subscribeButton}
            onPress={handleSubscribe}>
            <Crown color="white" size={20} strokeWidth={2} />
            <Text style={styles.subscribeButtonText}>
              Comenzar Premium - {plans[selectedPlan].price}
            </Text>
          </TouchableOpacity>
          
          <Text style={styles.disclaimer}>
            Cancela en cualquier momento. Sin compromisos.
          </Text>
        </View>

        {/* Trust Section */}
        <View style={styles.trustSection}>
          <Text style={styles.trustTitle}>🔒 Pago seguro</Text>
          <Text style={styles.trustDescription}>
            Procesado de forma segura a través de App Store y Google Play. 
            Tus datos están protegidos.
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
    backgroundColor: '#ffd700',
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
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
    color: '#2d3748',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4a5568',
  },
  premiumImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#2d3748',
  },
  heroSection: {
    paddingHorizontal: 24,
    marginTop: -16,
  },
  heroCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  heroTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#2d3748',
    marginTop: 16,
    marginBottom: 12,
  },
  heroDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresSection: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#2d3748',
    marginBottom: 20,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
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
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ebf8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2d3748',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    lineHeight: 20,
  },
  pricingSection: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  plansContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  planCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    position: 'relative',
  },
  planCardSelected: {
    borderColor: '#4c9aff',
    backgroundColor: '#f7faff',
  },
  popularPlan: {
    borderColor: '#ffd700',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    left: 16,
    right: 16,
    backgroundColor: '#ffd700',
    borderRadius: 12,
    paddingVertical: 4,
    alignItems: 'center',
  },
  popularText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#2d3748',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  planTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#2d3748',
  },
  selectedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4c9aff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  planPrice: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#2d3748',
    marginBottom: 4,
  },
  planPeriod: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  savingsBadge: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  savingsText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: 'white',
  },
  ctaSection: {
    paddingHorizontal: 24,
    marginTop: 32,
    alignItems: 'center',
  },
  subscribeButton: {
    backgroundColor: '#4c9aff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    justifyContent: 'center',
  },
  subscribeButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: 'white',
  },
  disclaimer: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
    marginTop: 16,
  },
  trustSection: {
    paddingHorizontal: 24,
    marginTop: 32,
    alignItems: 'center',
  },
  trustTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#2d3748',
    marginBottom: 8,
  },
  trustDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
  },
});