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

  const dailyMealPlan = [
    {
      day: 1,
      totalCalories: 1400,
      breakfast: { name: 'Овсянка с черникой и миндалём', items: 'Овсянка 50г, черника 100г, миндаль 15г, мёд 5г', kcal: 320 },
      snack1: { name: 'Зелёное яблоко', items: 'Яблоко среднее 150г', kcal: 80 },
      lunch: { name: 'Куриная грудка с гречкой', items: 'Грудка 150г, гречка 80г, салат из огурцов и помидоров с оливковым маслом', kcal: 450 },
      snack2: { name: 'Греческий йогурт', items: 'Йогурт 2% 150г, корица', kcal: 100 },
      dinner: { name: 'Запечённая рыба с овощами', items: 'Треска 150г, брокколи и цветная капуста 200г, лимон', kcal: 350 },
      water: '2.5 литра'
    },
    {
      day: 2,
      totalCalories: 1380,
      breakfast: { name: 'Омлет с овощами', items: 'Яйца 2шт, шпинат 50г, помидоры 100г, сыр фета 20г', kcal: 300 },
      snack1: { name: 'Горсть орехов', items: 'Грецкие орехи 20г', kcal: 130 },
      lunch: { name: 'Индейка с киноа', items: 'Филе индейки 140г, киноа 70г, стручковая фасоль 150г', kcal: 420 },
      snack2: { name: 'Морковные палочки с хумусом', items: 'Морковь 100г, хумус 30г', kcal: 80 },
      dinner: { name: 'Творожная запеканка', items: 'Творог 5% 200г, яйцо 1шт, яблоко 80г', kcal: 350 },
      water: '2.5 литра'
    },
    {
      day: 3,
      totalCalories: 1410,
      breakfast: { name: 'Гранола с йогуртом', items: 'Гранола без сахара 40г, йогурт натуральный 150г, клубника 100г', kcal: 330 },
      snack1: { name: 'Груша', items: 'Груша средняя 150г', kcal: 85 },
      lunch: { name: 'Говядина с булгуром', items: 'Говядина постная 130г, булгур 70г, салат из капусты', kcal: 440 },
      snack2: { name: 'Кефир с отрубями', items: 'Кефир 1% 200мл, отруби 10г', kcal: 95 },
      dinner: { name: 'Куриное филе с овощами гриль', items: 'Филе 140г, баклажан, кабачок, перец 200г', kcal: 360 },
      water: '2.5 литра'
    },
    {
      day: 4,
      totalCalories: 1390,
      breakfast: { name: 'Сырники на пару', items: 'Творог 9% 150г, яйцо 1шт, рисовая мука 20г, ягоды 50г', kcal: 310 },
      snack1: { name: 'Апельсин', items: 'Апельсин средний 180г', kcal: 70 },
      lunch: { name: 'Рыбный стейк с овощами', items: 'Лосось 140г, спаржа 100г, бурый рис 60г', kcal: 450 },
      snack2: { name: 'Протеиновый коктейль', items: 'Протеин 25г, миндальное молоко 200мл, банан половина', kcal: 150 },
      dinner: { name: 'Салат с тунцом', items: 'Тунец консервированный 120г, листья салата, огурец, авокадо 30г', kcal: 310 },
      water: '2.5 литра'
    },
    {
      day: 5,
      totalCalories: 1420,
      breakfast: { name: 'Тосты с авокадо и яйцом', items: 'Цельнозерновой хлеб 40г, авокадо 50г, яйцо пашот 1шт', kcal: 340 },
      snack1: { name: 'Ягодный микс', items: 'Черника, малина, голубика 120г', kcal: 60 },
      lunch: { name: 'Куриная грудка с чечевицей', items: 'Грудка 150г, красная чечевица 70г, овощной салат', kcal: 440 },
      snack2: { name: 'Творог с зеленью', items: 'Творог 2% 150г, укроп, петрушка', kcal: 120 },
      dinner: { name: 'Минтай запечённый', items: 'Минтай 180г, цветная капуста 200г, зелень', kcal: 360 },
      water: '2.5 литра'
    },
    {
      day: 6,
      totalCalories: 1400,
      breakfast: { name: 'Смузи-боул', items: 'Банан, шпинат, ягоды 150г, греческий йогурт 100г, семена чиа 10г', kcal: 320 },
      snack1: { name: 'Миндаль', items: 'Миндаль 20г', kcal: 115 },
      lunch: { name: 'Индейка с гречкой и грибами', items: 'Индейка 150г, гречка 70г, шампиньоны 100г', kcal: 430 },
      snack2: { name: 'Яблоко с корицей', items: 'Яблоко запечённое 150г, корица', kcal: 85 },
      dinner: { name: 'Креветки с овощами', items: 'Креветки 200г, микс овощей на пару 250г', kcal: 350 },
      water: '2.5 литра'
    },
    {
      day: 7,
      totalCalories: 1380,
      breakfast: { name: 'Каша киноа с ягодами', items: 'Киноа 50г, малина 100г, кокосовое молоко 50мл, мёд 5г', kcal: 310 },
      snack1: { name: 'Грейпфрут', items: 'Половина грейпфрута', kcal: 50 },
      lunch: { name: 'Говяжья котлета с овощами', items: 'Котлета постная 150г, салат из свеклы и моркови, перловка 60г', kcal: 440 },
      snack2: { name: 'Кефир', items: 'Кефир 1% 250мл', kcal: 100 },
      dinner: { name: 'Куриное филе с салатом', items: 'Филе 140г, микс салатных листьев, огурцы, редис, оливковое масло 5г', kcal: 380 },
      water: '2.5 литра'
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
            <div className="mb-6 p-4 bg-gradient-to-r from-fitness-orange/10 to-fitness-purple/10 rounded-lg border border-primary/20">
              <p className="text-center font-medium">
                📅 Подробный план на первую неделю • Повторяй цикл или комбинируй блюда по своему вкусу
              </p>
            </div>
            
            {dailyMealPlan.map((day, idx) => (
              <Card key={idx} className="animate-fade-in hover:shadow-lg transition-shadow overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Calendar" className="text-primary" size={24} />
                      День {day.day}
                    </CardTitle>
                    <div className="flex gap-2 items-center">
                      <Badge variant="secondary" className="text-base px-3 py-1">
                        {day.totalCalories} ккал
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <Icon name="Droplets" size={14} />
                        {day.water}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid gap-4">
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-lg border border-orange-200/50">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon name="Sunrise" className="text-fitness-orange" size={20} />
                            <h4 className="font-bold text-lg">Завтрак</h4>
                          </div>
                          <p className="font-semibold mb-1">{day.breakfast.name}</p>
                          <p className="text-sm text-muted-foreground">{day.breakfast.items}</p>
                        </div>
                        <Badge className="bg-fitness-orange text-white shrink-0">
                          {day.breakfast.kcal} ккал
                        </Badge>
                      </div>
                    </div>

                    <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Icon name="Cookie" className="text-fitness-purple" size={18} />
                            <h4 className="font-semibold">Перекус 1</h4>
                          </div>
                          <p className="text-sm">{day.snack1.name}</p>
                          <p className="text-xs text-muted-foreground">{day.snack1.items}</p>
                        </div>
                        <Badge variant="secondary" className="shrink-0 text-xs">
                          {day.snack1.kcal} ккал
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-lg border border-blue-200/50">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon name="Sun" className="text-fitness-blue" size={20} />
                            <h4 className="font-bold text-lg">Обед</h4>
                          </div>
                          <p className="font-semibold mb-1">{day.lunch.name}</p>
                          <p className="text-sm text-muted-foreground">{day.lunch.items}</p>
                        </div>
                        <Badge className="bg-fitness-blue text-white shrink-0">
                          {day.lunch.kcal} ккал
                        </Badge>
                      </div>
                    </div>

                    <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Icon name="Cookie" className="text-fitness-purple" size={18} />
                            <h4 className="font-semibold">Перекус 2</h4>
                          </div>
                          <p className="text-sm">{day.snack2.name}</p>
                          <p className="text-xs text-muted-foreground">{day.snack2.items}</p>
                        </div>
                        <Badge variant="secondary" className="shrink-0 text-xs">
                          {day.snack2.kcal} ккал
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100/50 rounded-lg border border-purple-200/50">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon name="Moon" className="text-fitness-purple" size={20} />
                            <h4 className="font-bold text-lg">Ужин</h4>
                          </div>
                          <p className="font-semibold mb-1">{day.dinner.name}</p>
                          <p className="text-sm text-muted-foreground">{day.dinner.items}</p>
                        </div>
                        <Badge className="bg-fitness-purple text-white shrink-0">
                          {day.dinner.kcal} ккал
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Icon name="Info" className="text-primary shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-2">Рекомендации по плану питания:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Повторяй этот 7-дневный цикл в течение месяца</li>
                      <li>• Можешь менять дни местами для разнообразия</li>
                      <li>• Пей воду за 30 минут до еды и через 1 час после</li>
                      <li>• Размер порций можно корректировать под свои потребности</li>
                      <li>• В выходные допустимо +100-150 ккал к дневной норме</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
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