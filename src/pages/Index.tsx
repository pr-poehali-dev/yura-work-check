import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [currentWeight, setCurrentWeight] = useState(61);
  const targetWeight = 55;
  const progressPercent = ((61 - currentWeight) / (61 - targetWeight)) * 100;

  const mealPlan = [
    {
      week: 'Неделя 1-2',
      calories: 1400,
      meals: [
        { name: 'Завтрак', items: 'Овсянка с ягодами, зелёный чай', kcal: 350 },
        { name: 'Обед', items: 'Куриная грудка, гречка, овощной салат', kcal: 450 },
        { name: 'Ужин', items: 'Рыба на пару, овощи', kcal: 400 },
        { name: 'Перекусы', items: 'Яблоко, орехи (20г)', kcal: 200 }
      ]
    },
    {
      week: 'Неделя 3-4',
      calories: 1350,
      meals: [
        { name: 'Завтрак', items: 'Омлет из 2 яиц, помидоры', kcal: 320 },
        { name: 'Обед', items: 'Индейка, киноа, брокколи', kcal: 430 },
        { name: 'Ужин', items: 'Творог 2%, огурцы', kcal: 380 },
        { name: 'Перекусы', items: 'Кефир 1%, морковь', kcal: 220 }
      ]
    }
  ];

  const recipes = [
    { 
      name: 'Куриная грудка с овощами', 
      kcal: 320, 
      protein: 38, 
      carbs: 12, 
      fat: 8,
      time: '25 мин',
      difficulty: 'Легко'
    },
    { 
      name: 'Овсянка с ягодами и орехами', 
      kcal: 280, 
      protein: 10, 
      carbs: 45, 
      fat: 7,
      time: '10 мин',
      difficulty: 'Очень легко'
    },
    { 
      name: 'Салат с тунцом', 
      kcal: 250, 
      protein: 25, 
      carbs: 8, 
      fat: 12,
      time: '15 мин',
      difficulty: 'Легко'
    }
  ];

  const workouts = [
    {
      name: 'Кардио-тренировка',
      duration: '30 мин',
      calories: 300,
      exercises: ['Бег', 'Прыжки со скакалкой', 'Берпи']
    },
    {
      name: 'Силовая тренировка',
      duration: '40 мин',
      calories: 250,
      exercises: ['Приседания', 'Отжимания', 'Планка']
    },
    {
      name: 'Йога и растяжка',
      duration: '30 мин',
      calories: 150,
      exercises: ['Асаны', 'Дыхательные упражнения', 'Медитация']
    }
  ];

  const tips = [
    { icon: 'Droplets', text: 'Пить 2-2.5 литра воды в день' },
    { icon: 'Moon', text: 'Спать 7-8 часов для восстановления' },
    { icon: 'Utensils', text: 'Есть 4-5 раз в день небольшими порциями' },
    { icon: 'Activity', text: 'Двигаться минимум 10000 шагов в день' },
    { icon: 'Apple', text: 'Избегать сахара и быстрых углеводов' },
    { icon: 'Timer', text: 'Не есть за 3 часа до сна' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-4 bg-gradient-to-r from-fitness-orange via-fitness-purple to-fitness-blue bg-clip-text text-transparent">
            FitLife
          </h1>
          <p className="text-xl text-muted-foreground">Твой путь к идеальной форме</p>
        </header>

        <div className="grid gap-6 mb-8 animate-scale-in">
          <Card className="border-2 border-primary/20 shadow-xl hover:shadow-2xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Icon name="Target" className="text-primary" size={28} />
                Твоя цель: 61 кг → 55 кг
              </CardTitle>
              <CardDescription>Осталось сбросить: {(currentWeight - targetWeight).toFixed(1)} кг</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Прогресс</span>
                  <span className="font-bold text-primary">{progressPercent.toFixed(0)}%</span>
                </div>
                <Progress value={progressPercent} className="h-3" />
              </div>
              <div className="flex gap-4 flex-wrap">
                <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
                  <Icon name="Flame" className="text-fitness-orange" size={20} />
                  <span className="font-medium">1400 ккал/день</span>
                </div>
                <div className="flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-lg">
                  <Icon name="Calendar" className="text-fitness-purple" size={20} />
                  <span className="font-medium">30 дней</span>
                </div>
                <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-lg">
                  <Icon name="TrendingDown" className="text-fitness-blue" size={20} />
                  <span className="font-medium">-6 кг</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="plan" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto gap-2">
            <TabsTrigger value="plan" className="gap-2">
              <Icon name="Calendar" size={18} />
              План питания
            </TabsTrigger>
            <TabsTrigger value="calculator" className="gap-2">
              <Icon name="Calculator" size={18} />
              Калькулятор
            </TabsTrigger>
            <TabsTrigger value="recipes" className="gap-2">
              <Icon name="ChefHat" size={18} />
              Рецепты
            </TabsTrigger>
            <TabsTrigger value="workouts" className="gap-2">
              <Icon name="Dumbbell" size={18} />
              Тренировки
            </TabsTrigger>
            <TabsTrigger value="tips" className="gap-2">
              <Icon name="Lightbulb" size={18} />
              Советы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plan" className="space-y-6">
            {mealPlan.map((week, idx) => (
              <Card key={idx} className="animate-fade-in hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                  <CardTitle className="flex items-center justify-between">
                    <span>{week.week}</span>
                    <Badge variant="secondary" className="text-lg px-4 py-1">
                      {week.calories} ккал/день
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {week.meals.map((meal, mealIdx) => (
                      <div key={mealIdx} className="flex items-start justify-between p-4 bg-card rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">{meal.name}</h4>
                          <p className="text-muted-foreground">{meal.items}</p>
                        </div>
                        <Badge className="ml-4 bg-gradient-to-r from-fitness-orange to-fitness-purple text-white">
                          {meal.kcal} ккал
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="calculator" className="space-y-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calculator" className="text-primary" size={24} />
                  Калькулятор калорий
                </CardTitle>
                <CardDescription>Рассчитай свою дневную норму для похудения</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Текущий вес (кг)</label>
                    <Input 
                      type="number" 
                      value={currentWeight} 
                      onChange={(e) => setCurrentWeight(Number(e.target.value))}
                      className="text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Целевой вес (кг)</label>
                    <Input type="number" value={targetWeight} disabled className="text-lg" />
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-lg border-2 border-primary/20">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Базовый обмен:</span>
                      <span className="text-2xl font-bold">1450 ккал</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Дефицит калорий:</span>
                      <span className="text-2xl font-bold text-primary">-300 ккал</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t-2 border-primary/20">
                      <span className="text-xl font-semibold">Твоя норма:</span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-fitness-orange to-fitness-purple bg-clip-text text-transparent">
                        1400 ккал
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-card rounded-lg border">
                    <Icon name="Beef" className="mx-auto mb-2 text-fitness-orange" size={32} />
                    <div className="text-2xl font-bold">95г</div>
                    <div className="text-sm text-muted-foreground">Белки</div>
                  </div>
                  <div className="text-center p-4 bg-card rounded-lg border">
                    <Icon name="Wheat" className="mx-auto mb-2 text-fitness-purple" size={32} />
                    <div className="text-2xl font-bold">140г</div>
                    <div className="text-sm text-muted-foreground">Углеводы</div>
                  </div>
                  <div className="text-center p-4 bg-card rounded-lg border">
                    <Icon name="Droplet" className="mx-auto mb-2 text-fitness-blue" size={32} />
                    <div className="text-2xl font-bold">45г</div>
                    <div className="text-sm text-muted-foreground">Жиры</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recipes" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe, idx) => (
                <Card key={idx} className="animate-scale-in hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="ChefHat" className="text-primary" size={20} />
                      {recipe.name}
                    </CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="gap-1">
                        <Icon name="Clock" size={14} />
                        {recipe.time}
                      </Badge>
                      <Badge variant="secondary">{recipe.difficulty}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
                      <div className="text-3xl font-bold text-primary">{recipe.kcal}</div>
                      <div className="text-sm text-muted-foreground">калорий</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div className="p-2 bg-card rounded border">
                        <div className="font-bold text-fitness-orange">{recipe.protein}г</div>
                        <div className="text-xs text-muted-foreground">Белки</div>
                      </div>
                      <div className="p-2 bg-card rounded border">
                        <div className="font-bold text-fitness-purple">{recipe.carbs}г</div>
                        <div className="text-xs text-muted-foreground">Углев.</div>
                      </div>
                      <div className="p-2 bg-card rounded border">
                        <div className="font-bold text-fitness-blue">{recipe.fat}г</div>
                        <div className="text-xs text-muted-foreground">Жиры</div>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      Посмотреть рецепт
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="workouts" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workouts.map((workout, idx) => (
                <Card key={idx} className="animate-fade-in hover:shadow-lg transition-all">
                  <CardHeader className="bg-gradient-to-br from-primary/5 to-accent/5">
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Dumbbell" className="text-primary" size={22} />
                      {workout.name}
                    </CardTitle>
                    <div className="flex gap-3 mt-2">
                      <Badge variant="secondary" className="gap-1">
                        <Icon name="Clock" size={14} />
                        {workout.duration}
                      </Badge>
                      <Badge className="gap-1 bg-fitness-orange text-white">
                        <Icon name="Flame" size={14} />
                        {workout.calories} ккал
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-2">
                      {workout.exercises.map((exercise, exIdx) => (
                        <li key={exIdx} className="flex items-center gap-2">
                          <Icon name="Check" className="text-primary" size={18} />
                          <span>{exercise}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-4">Начать тренировку</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tips" className="space-y-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Lightbulb" className="text-primary" size={24} />
                  Советы для эффективного похудения
                </CardTitle>
                <CardDescription>Следуй этим правилам для достижения цели</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {tips.map((tip, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border border-primary/10 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name={tip.icon} className="text-primary" size={24} />
                      </div>
                      <p className="font-medium">{tip.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-fitness-orange/10 via-fitness-purple/10 to-fitness-blue/10 border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Sparkles" className="text-primary" size={24} />
                  Мотивация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="text-lg italic border-l-4 border-primary pl-4">
                  "Твоё тело может выдержать почти всё. Это твой разум, который нужно убедить."
                </blockquote>
                <p className="text-muted-foreground">
                  Помни: каждый день приближает тебя к цели. Маленькие шаги ведут к большим результатам!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
