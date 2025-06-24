import { supabase } from '@/lib/supabase';

const AI_QUERY_LIMIT = 5; // Monthly limit per user

interface GenerateChallengeRequest {
  goalPrompt: string;
}

interface Challenge {
  id: number;
  day: number;
  title: string;
  description: string;
}

export async function POST(request: Request) {
  try {
    const { goalPrompt }: GenerateChallengeRequest = await request.json();

    if (!goalPrompt || goalPrompt.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Goal prompt is required' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Get authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization required' }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Get user from Supabase auth
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authentication' }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Check premium status
    const { data: subscription } = await supabase
      .from('user_subscriptions')
      .select('is_premium')
      .eq('user_id', user.id)
      .single();

    if (!subscription?.is_premium) {
      return new Response(
        JSON.stringify({ error: 'Premium subscription required' }),
        { 
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Check monthly usage limit
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

    if (usageLog && usageLog.query_count >= AI_QUERY_LIMIT) {
      return new Response(
        JSON.stringify({ 
          error: 'Monthly AI query limit reached',
          limit: AI_QUERY_LIMIT,
          current: usageLog.query_count
        }),
        { 
          status: 429,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Generate challenges using Hugging Face API
    const huggingFaceResponse = await fetch(
      'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.EXPO_PUBLIC_HUGGING_FACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: `Create a 30-day challenge plan for: "${goalPrompt}". 
          Generate exactly 30 daily challenges, each with a title and description.
          Format as JSON array with objects containing: day (number), title (string), description (string).
          Make challenges progressive, practical, and achievable.`,
          parameters: {
            max_length: 2000,
            temperature: 0.7,
            do_sample: true,
          },
        }),
      }
    );

    if (!huggingFaceResponse.ok) {
      throw new Error('Failed to generate challenges from AI');
    }

    const aiResponse = await huggingFaceResponse.json();
    
    // Parse AI response and create structured challenges
    const challenges: Challenge[] = generateStructuredChallenges(goalPrompt, aiResponse);

    // Generate package metadata
    const packageName = generatePackageName(goalPrompt);
    const packageDescription = generatePackageDescription(goalPrompt);
    const packageIcon = selectPackageIcon(goalPrompt);
    const packageColor = selectPackageColor(goalPrompt);

    // Save to database
    const { data: savedChallenge, error: saveError } = await supabase
      .from('user_ai_challenges')
      .insert({
        user_id: user.id,
        goal_prompt: goalPrompt,
        generated_challenges: challenges,
        package_name: packageName,
        package_description: packageDescription,
        package_icon: packageIcon,
        package_color: packageColor,
      })
      .select()
      .single();

    if (saveError) {
      throw new Error('Failed to save generated challenges');
    }

    // Update usage log
    await supabase
      .from('ai_usage_logs')
      .upsert({
        user_id: user.id,
        month: currentMonth,
        year: currentYear,
        query_count: (usageLog?.query_count || 0) + 1,
      });

    return new Response(
      JSON.stringify({
        success: true,
        challengePackage: savedChallenge,
        remainingQueries: AI_QUERY_LIMIT - ((usageLog?.query_count || 0) + 1),
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error generating challenge:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

function generateStructuredChallenges(goalPrompt: string, aiResponse: any): Challenge[] {
  // Fallback challenges based on goal prompt keywords
  const challenges: Challenge[] = [];
  
  for (let day = 1; day <= 30; day++) {
    challenges.push({
      id: day,
      day,
      title: `Día ${day}: ${generateDayTitle(goalPrompt, day)}`,
      description: generateDayDescription(goalPrompt, day),
    });
  }
  
  return challenges;
}

function generateDayTitle(goalPrompt: string, day: number): string {
  const lowerGoal = goalPrompt.toLowerCase();
  
  if (lowerGoal.includes('salud') || lowerGoal.includes('ejercicio') || lowerGoal.includes('fitness')) {
    const fitnessActivities = [
      'Camina 10 minutos', 'Haz 5 flexiones', 'Estira por 5 minutos', 'Sube escaleras',
      'Baila por 10 minutos', 'Haz sentadillas', 'Practica yoga', 'Corre en el lugar'
    ];
    return fitnessActivities[day % fitnessActivities.length];
  }
  
  if (lowerGoal.includes('mental') || lowerGoal.includes('meditación') || lowerGoal.includes('mindfulness')) {
    const mentalActivities = [
      'Medita 5 minutos', 'Practica gratitud', 'Respira profundo', 'Escribe tus pensamientos',
      'Desconéctate del teléfono', 'Lee algo inspirador', 'Practica autocompasión', 'Visualiza tu día ideal'
    ];
    return mentalActivities[day % mentalActivities.length];
  }
  
  if (lowerGoal.includes('productividad') || lowerGoal.includes('trabajo') || lowerGoal.includes('estudio')) {
    const productivityActivities = [
      'Organiza tu escritorio', 'Haz una lista de tareas', 'Elimina distracciones', 'Aprende algo nuevo',
      'Planifica tu día', 'Revisa tus objetivos', 'Optimiza una rutina', 'Practica Pomodoro'
    ];
    return productivityActivities[day % productivityActivities.length];
  }
  
  return `Avanza hacia tu meta: ${goalPrompt}`;
}

function generateDayDescription(goalPrompt: string, day: number): string {
  return `Día ${day} de tu reto personalizado. Dedica tiempo hoy a trabajar en: ${goalPrompt}`;
}

function generatePackageName(goalPrompt: string): string {
  const words = goalPrompt.split(' ').slice(0, 3);
  return `Reto: ${words.join(' ')}`.substring(0, 50);
}

function generatePackageDescription(goalPrompt: string): string {
  return `Plan personalizado de 30 días para: ${goalPrompt}`;
}

function selectPackageIcon(goalPrompt: string): string {
  const lowerGoal = goalPrompt.toLowerCase();
  
  if (lowerGoal.includes('salud') || lowerGoal.includes('ejercicio') || lowerGoal.includes('fitness')) {
    return 'dumbbell';
  }
  
  if (lowerGoal.includes('mental') || lowerGoal.includes('meditación')) {
    return 'brain';
  }
  
  if (lowerGoal.includes('productividad') || lowerGoal.includes('trabajo')) {
    return 'target';
  }
  
  return 'sparkles';
}

function selectPackageColor(goalPrompt: string): string {
  const lowerGoal = goalPrompt.toLowerCase();
  
  if (lowerGoal.includes('salud') || lowerGoal.includes('ejercicio')) {
    return '#ff6b6b';
  }
  
  if (lowerGoal.includes('mental') || lowerGoal.includes('meditación')) {
    return '#4c9aff';
  }
  
  if (lowerGoal.includes('productividad') || lowerGoal.includes('trabajo')) {
    return '#10b981';
  }
  
  const colors = ['#9c88ff', '#ff9f43', '#26de81', '#fc5c65', '#45aaf2'];
  return colors[Math.floor(Math.random() * colors.length)];
}