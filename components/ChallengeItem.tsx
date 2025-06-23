import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import { DailyTask } from '@/types/challenges';

interface ChallengeItemProps {
  task: DailyTask;
  isCompleted: boolean;
  onToggle: () => void;
  accentColor: string;
  dayNumber: number;
  disabled?: boolean;
}

export default function ChallengeItem({ 
  task, 
  isCompleted, 
  onToggle,
  accentColor,
  dayNumber,
  disabled = false
}: ChallengeItemProps) {
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
          <Text style={[styles.dayText, { color: accentColor }]}>Día {dayNumber}</Text>
        </View>
        <View style={styles.textContent}>
          <Text style={[
            styles.title,
            isCompleted && { color: accentColor }
          ]}>
            {task.title}
          </Text>
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
        onPress={disabled ? undefined : onToggle}
        activeOpacity={disabled ? 1 : 0.7}
        disabled={disabled}
      >
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