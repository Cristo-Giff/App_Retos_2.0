import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check, Calendar } from 'lucide-react-native';
import { Challenge } from '@/types/challenges';

interface ChallengeItemProps {
  challenge: Challenge;
  isCompleted: boolean;
  onToggle: () => void;
  accentColor: string;
}

export default function ChallengeItem({ 
  challenge, 
  isCompleted, 
  onToggle,
  accentColor,
  disabled = false
}: ChallengeItemProps & { disabled?: boolean }) {
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        isCompleted && { 
          backgroundColor: accentColor + '10',
          borderColor: accentColor + '30',
          borderWidth: 1,
        },
        disabled && { opacity: 0.5 }
      ]} 
      onPress={disabled ? undefined : onToggle}
      activeOpacity={0.7}
      disabled={disabled}
    >
      
      <View style={styles.leftContent}>
        <View style={[styles.dayBadge, { backgroundColor: accentColor + '15' }]}>
          <Calendar color={accentColor} size={16} strokeWidth={2} />
          <Text style={[styles.dayText, { color: accentColor }]}>
            Día {challenge.day}
          </Text>
        </View>
        
        <View style={styles.textContent}>
          <Text style={[
            styles.title,
            isCompleted && { color: accentColor }
          ]}>
            {challenge.title}
          </Text>
          {challenge.description && (
            <Text style={styles.description}>{challenge.description}</Text>
          )}
        </View>
      </View>
      
      <TouchableOpacity 
        style={[
          styles.checkbox,
          isCompleted && { 
            backgroundColor: accentColor,
            borderColor: accentColor,
          }
        ]}
        onPress={onToggle}>
        {isCompleted && (
          <Check color="white" size={18} strokeWidth={3} />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  leftContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 12,
    gap: 4,
  },
  dayText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2d3748',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    lineHeight: 20,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});