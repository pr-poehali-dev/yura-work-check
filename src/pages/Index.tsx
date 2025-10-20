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
  const [selectedDay, setSelectedDay] = useState(1);
  const [weightLog, setWeightLog] = useState<{day: number, weight: number, date: string}[]>([
    { day: 1, weight: 61, date: '2025-10-20' },
    { day: 2, weight: 60.8, date: '2025-10-21' },
    { day: 3, weight: 60.5, date: '2025-10-22' },
    { day: 4, weight: 60.3, date: '2025-10-23' },
    { day: 5, weight: 60.0, date: '2025-10-24' },
  ]);
  const [newWeight, setNewWeight] = useState('');
  const [reminders, setReminders] = useState<{id: number, type: string, time: string, label: string, enabled: boolean}[]>([
    { id: 1, type: 'meal', time: '08:00', label: 'Завтрак', enabled: true },
    { id: 2, type: 'meal', time: '10:30', label: 'Перекус 1', enabled: true },
    { id: 3, type: 'meal', time: '13:00', label: 'Обед', enabled: true },
    { id: 4, type: 'meal', time: '16:00', label: 'Перекус 2', enabled: true },
    { id: 5, type: 'meal', time: '19:00', label: 'Ужин', enabled: true },
    { id: 6, type: 'workout', time: '07:00', label: 'Утренняя тренировка', enabled: false },
    { id: 7, type: 'workout', time: '18:00', label: 'Вечерняя тренировка', enabled: true },
    { id: 8, type: 'face', time: '09:00', label: 'Упражнения для лица (утро)', enabled: true },
    { id: 9, type: 'face', time: '21:00', label: 'Упражнения для лица (вечер)', enabled: true },
  ]);
  const [showReminderSettings, setShowReminderSettings] = useState(false);

  const toggleReminder = (id: number) => {
    setReminders(reminders.map(r => r.id === id ? {...r, enabled: !r.enabled} : r));
  };

  const updateReminderTime = (id: number, newTime: string) => {
    setReminders(reminders.map(r => r.id === id ? {...r, time: newTime} : r));
  };

  const [foodDiary, setFoodDiary] = useState<{id: number, meal: string, food: string, kcal: number, protein: number, carbs: number, fat: number, time: string, date: string}[]>([
    { id: 1, meal: 'Завтрак', food: 'Овсянка с черникой', kcal: 320, protein: 12, carbs: 55, fat: 8, time: '08:15', date: new Date().toISOString().split('T')[0] },
    { id: 2, meal: 'Перекус', food: 'Яблоко', kcal: 80, protein: 0, carbs: 20, fat: 0, time: '11:00', date: new Date().toISOString().split('T')[0] },
    { id: 3, meal: 'Обед', food: 'Куриная грудка с овощами', kcal: 380, protein: 45, carbs: 30, fat: 12, time: '14:20', date: new Date(Date.now() - 86400000).toISOString().split('T')[0] },
    { id: 4, meal: 'Завтрак', food: 'Творог с медом', kcal: 250, protein: 28, carbs: 25, fat: 6, time: '09:00', date: new Date(Date.now() - 86400000).toISOString().split('T')[0] },
    { id: 5, meal: 'Ужин', food: 'Запеченная рыба', kcal: 300, protein: 35, carbs: 15, fat: 10, time: '19:30', date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0] },
  ]);
  const [newFood, setNewFood] = useState({ meal: 'Завтрак', food: '', kcal: '', protein: '', carbs: '', fat: '' });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  
  const addFoodEntry = () => {
    if (newFood.food && newFood.kcal) {
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      setFoodDiary([...foodDiary, {
        id: Date.now(),
        meal: newFood.meal,
        food: newFood.food,
        kcal: parseFloat(newFood.kcal),
        protein: parseFloat(newFood.protein) || 0,
        carbs: parseFloat(newFood.carbs) || 0,
        fat: parseFloat(newFood.fat) || 0,
        time,
        date: selectedDate
      }]);
      setNewFood({ meal: 'Завтрак', food: '', kcal: '', protein: '', carbs: '', fat: '' });
    }
  };

  const deleteFoodEntry = (id: number) => {
    setFoodDiary(foodDiary.filter(entry => entry.id !== id));
  };

  const todayEntries = foodDiary.filter(entry => entry.date === selectedDate);
  const totalCalories = todayEntries.reduce((sum, entry) => sum + entry.kcal, 0);
  const totalProtein = todayEntries.reduce((sum, entry) => sum + entry.protein, 0);
  const totalCarbs = todayEntries.reduce((sum, entry) => sum + entry.carbs, 0);
  const totalFat = todayEntries.reduce((sum, entry) => sum + entry.fat, 0);
  const caloriesLeft = 1400 - totalCalories;

  const getWeekData = () => {
    const today = new Date(selectedDate);
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      return day.toISOString().split('T')[0];
    });

    return weekDays.map(date => {
      const dayEntries = foodDiary.filter(entry => entry.date === date);
      return {
        date,
        dayName: new Date(date).toLocaleDateString('ru-RU', { weekday: 'short' }),
        dayNum: new Date(date).getDate(),
        kcal: dayEntries.reduce((sum, entry) => sum + entry.kcal, 0),
        protein: dayEntries.reduce((sum, entry) => sum + entry.protein, 0),
        carbs: dayEntries.reduce((sum, entry) => sum + entry.carbs, 0),
        fat: dayEntries.reduce((sum, entry) => sum + entry.fat, 0),
      };
    });
  };

  const getMonthData = () => {
    const today = new Date(selectedDate);
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(year, month, i + 1).toISOString().split('T')[0];
      const dayEntries = foodDiary.filter(entry => entry.date === date);
      return {
        date,
        day: i + 1,
        kcal: dayEntries.reduce((sum, entry) => sum + entry.kcal, 0),
        protein: dayEntries.reduce((sum, entry) => sum + entry.protein, 0),
      };
    });
  };

  const weekData = getWeekData();
  const monthData = getMonthData();
  const weekAvgCalories = Math.round(weekData.reduce((sum, day) => sum + day.kcal, 0) / 7);
  const monthAvgCalories = Math.round(monthData.reduce((sum, day) => sum + day.kcal, 0) / monthData.length);

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

  const faceExercises = [
    {
      name: 'Подтяжка овала лица',
      duration: '5 мин',
      reps: '15-20 раз',
      description: 'Открой рот в форме буквы "О", затем улыбнись широко. Повторяй движение, чувствуя работу мышц щёк и подбородка.',
      benefit: 'Укрепляет мышцы щёк, подтягивает овал'
    },
    {
      name: 'Упражнение для скул',
      duration: '3 мин',
      reps: '20 раз',
      description: 'Надуй щёки воздухом и перекатывай его из одной стороны в другую. Задержи на 5 секунд в каждой позиции.',
      benefit: 'Тонизирует мышцы щёк, делает скулы выразительнее'
    },
    {
      name: 'Лифтинг подбородка',
      duration: '4 мин',
      reps: '10-15 раз',
      description: 'Запрокинь голову назад, смотри в потолок. Выдвинь нижнюю челюсть вперёд, почувствуй натяжение в области шеи и подбородка.',
      benefit: 'Убирает второй подбородок, подтягивает шею'
    },
    {
      name: 'Массаж лимфодренажный',
      duration: '5 мин',
      reps: '10 движений',
      description: 'Массируй лицо от центра к периферии лёгкими движениями. От носа к вискам, от подбородка к ушам.',
      benefit: 'Снимает отёчность, улучшает цвет лица'
    },
    {
      name: 'Упражнение "Рыбка"',
      duration: '3 мин',
      reps: '15 раз',
      description: 'Втяни щёки внутрь, как рыбка, и попробуй улыбнуться в этом положении. Задержи на 5 секунд.',
      benefit: 'Укрепляет мышцы щёк, создаёт чёткий контур'
    },
    {
      name: 'Подтяжка лба',
      duration: '3 мин',
      reps: '12 раз',
      description: 'Приложи пальцы ко лбу, тяни кожу вверх, одновременно пытаясь нахмуриться. Создавай сопротивление.',
      benefit: 'Разглаживает морщины на лбу, подтягивает верхнюю часть лица'
    }
  ];

  const addWeightEntry = () => {
    if (newWeight && parseFloat(newWeight) > 0) {
      const today = new Date().toISOString().split('T')[0];
      const nextDay = weightLog.length + 1;
      setWeightLog([...weightLog, { day: nextDay, weight: parseFloat(newWeight), date: today }]);
      setCurrentWeight(parseFloat(newWeight));
      setNewWeight('');
    }
  };

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
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Icon name="Target" className="text-primary" size={28} />
                    Твоя цель: 61 кг → 55 кг
                  </CardTitle>
                  <CardDescription>Осталось сбросить: {(currentWeight - targetWeight).toFixed(1)} кг</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowReminderSettings(!showReminderSettings)}
                  className="gap-2"
                >
                  <Icon name="Bell" size={18} />
                  Напоминания
                </Button>
              </div>
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

          {showReminderSettings && (
            <Card className="border-2 border-primary/20 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Bell" className="text-primary" size={24} />
                  Настройка напоминаний
                </CardTitle>
                <CardDescription>Включи уведомления для приёмов пищи и тренировок</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Utensils" className="text-fitness-orange" size={20} />
                      Приёмы пищи
                    </h4>
                    <div className="space-y-3">
                      {reminders.filter(r => r.type === 'meal').map((reminder) => (
                        <div key={reminder.id} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={reminder.enabled}
                              onChange={() => toggleReminder(reminder.id)}
                              className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                            />
                            <span className="font-medium">{reminder.label}</span>
                          </div>
                          <Input
                            type="time"
                            value={reminder.time}
                            onChange={(e) => updateReminderTime(reminder.id, e.target.value)}
                            className="w-32"
                            disabled={!reminder.enabled}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Dumbbell" className="text-fitness-purple" size={20} />
                      Тренировки
                    </h4>
                    <div className="space-y-3">
                      {reminders.filter(r => r.type === 'workout').map((reminder) => (
                        <div key={reminder.id} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={reminder.enabled}
                              onChange={() => toggleReminder(reminder.id)}
                              className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                            />
                            <span className="font-medium">{reminder.label}</span>
                          </div>
                          <Input
                            type="time"
                            value={reminder.time}
                            onChange={(e) => updateReminderTime(reminder.id, e.target.value)}
                            className="w-32"
                            disabled={!reminder.enabled}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Smile" className="text-fitness-blue" size={20} />
                      Упражнения для лица
                    </h4>
                    <div className="space-y-3">
                      {reminders.filter(r => r.type === 'face').map((reminder) => (
                        <div key={reminder.id} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={reminder.enabled}
                              onChange={() => toggleReminder(reminder.id)}
                              className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                            />
                            <span className="font-medium">{reminder.label}</span>
                          </div>
                          <Input
                            type="time"
                            value={reminder.time}
                            onChange={(e) => updateReminderTime(reminder.id, e.target.value)}
                            className="w-32"
                            disabled={!reminder.enabled}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20">
                    <div className="flex items-start gap-3">
                      <Icon name="Info" className="text-primary shrink-0 mt-0.5" size={20} />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Как работают напоминания?</p>
                        <p className="text-muted-foreground">
                          Браузер отправит тебе уведомление в указанное время. Разреши уведомления в настройках браузера, чтобы не пропустить важные моменты!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 gap-2" onClick={() => {
                      if ('Notification' in window && Notification.permission !== 'granted') {
                        Notification.requestPermission();
                      }
                    }}>
                      <Icon name="BellRing" size={18} />
                      Включить уведомления
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => setShowReminderSettings(false)}>
                      Закрыть
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Tabs defaultValue="diary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 h-auto gap-2">
            <TabsTrigger value="diary" className="gap-2">
              <Icon name="BookOpen" size={18} />
              Дневник
            </TabsTrigger>
            <TabsTrigger value="tracker" className="gap-2">
              <Icon name="TrendingDown" size={18} />
              Трекер веса
            </TabsTrigger>
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
            <TabsTrigger value="face" className="gap-2">
              <Icon name="Smile" size={18} />
              Лицо
            </TabsTrigger>
            <TabsTrigger value="tips" className="gap-2">
              <Icon name="Lightbulb" size={18} />
              Советы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="diary" className="space-y-6">
            <Card className="animate-fade-in">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const date = new Date(selectedDate);
                        date.setDate(date.getDate() - 1);
                        setSelectedDate(date.toISOString().split('T')[0]);
                      }}
                    >
                      <Icon name="ChevronLeft" size={18} />
                    </Button>
                    <Input 
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-40"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const date = new Date(selectedDate);
                        date.setDate(date.getDate() + 1);
                        setSelectedDate(date.toISOString().split('T')[0]);
                      }}
                    >
                      <Icon name="ChevronRight" size={18} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
                    >
                      Сегодня
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === 'day' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('day')}
                    >
                      День
                    </Button>
                    <Button
                      variant={viewMode === 'week' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('week')}
                    >
                      Неделя
                    </Button>
                    <Button
                      variant={viewMode === 'month' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('month')}
                    >
                      Месяц
                    </Button>
                  </div>
                </div>

                {viewMode === 'week' && (
                  <div className="grid grid-cols-7 gap-3 mb-6">
                    {weekData.map((day, idx) => (
                      <div 
                        key={idx}
                        className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${
                          day.date === selectedDate 
                            ? 'bg-gradient-to-br from-primary to-secondary text-white border-primary' 
                            : 'hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedDate(day.date)}
                      >
                        <div className="text-xs font-medium mb-1">{day.dayName}</div>
                        <div className="text-lg font-bold mb-1">{day.dayNum}</div>
                        <div className={`text-xs ${day.date === selectedDate ? 'text-white/90' : 'text-muted-foreground'}`}>
                          {day.kcal > 0 ? `${day.kcal} ккал` : '—'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {viewMode === 'month' && (
                  <div className="mb-6">
                    <div className="grid grid-cols-7 gap-2 mb-2">
                      {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                        <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {monthData.map((day, idx) => {
                        const dayOfWeek = new Date(day.date).getDay();
                        const offset = idx === 0 ? (dayOfWeek === 0 ? 6 : dayOfWeek - 1) : 0;
                        
                        return (
                          <React.Fragment key={idx}>
                            {idx === 0 && Array.from({ length: offset }).map((_, i) => (
                              <div key={`empty-${i}`} />
                            ))}
                            <div
                              className={`p-2 rounded-lg border text-center cursor-pointer transition-all ${
                                day.date === selectedDate
                                  ? 'bg-gradient-to-br from-primary to-secondary text-white border-primary'
                                  : day.kcal > 0
                                  ? 'bg-green-50 border-green-200 hover:border-green-400'
                                  : 'hover:border-primary/50'
                              }`}
                              onClick={() => setSelectedDate(day.date)}
                            >
                              <div className="font-bold text-sm mb-1">{day.day}</div>
                              <div className={`text-xs ${day.date === selectedDate ? 'text-white/90' : 'text-muted-foreground'}`}>
                                {day.kcal > 0 ? `${day.kcal}` : '—'}
                              </div>
                            </div>
                          </React.Fragment>
                        );
                      })}
                    </div>
                    <div className="mt-4 text-center text-sm text-muted-foreground">
                      Средняя калорийность: <span className="font-bold text-foreground">{monthAvgCalories} ккал/день</span>
                    </div>
                  </div>
                )}

                {viewMode === 'week' && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
                    <h3 className="font-semibold mb-3">Статистика за неделю</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Среднее</div>
                        <div className="text-2xl font-bold">{weekAvgCalories}</div>
                        <div className="text-xs text-muted-foreground">ккал/день</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Белки</div>
                        <div className="text-2xl font-bold text-fitness-orange">
                          {Math.round(weekData.reduce((s, d) => s + d.protein, 0) / 7)}г
                        </div>
                        <div className="text-xs text-muted-foreground">в среднем</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Углеводы</div>
                        <div className="text-2xl font-bold text-fitness-purple">
                          {Math.round(weekData.reduce((s, d) => s + d.carbs, 0) / 7)}г
                        </div>
                        <div className="text-xs text-muted-foreground">в среднем</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Жиры</div>
                        <div className="text-2xl font-bold text-fitness-blue">
                          {Math.round(weekData.reduce((s, d) => s + d.fat, 0) / 7)}г
                        </div>
                        <div className="text-xs text-muted-foreground">в среднем</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BookOpen" className="text-primary" size={24} />
                    Дневник питания
                  </CardTitle>
                  <CardDescription>
                    {selectedDate === new Date().toISOString().split('T')[0] 
                      ? 'Записывай всё, что съела сегодня' 
                      : `Дневник на ${new Date(selectedDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="text-sm font-medium mb-1 block">Приём пищи</label>
                      <select 
                        value={newFood.meal}
                        onChange={(e) => setNewFood({...newFood, meal: e.target.value})}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option>Завтрак</option>
                        <option>Перекус 1</option>
                        <option>Обед</option>
                        <option>Перекус 2</option>
                        <option>Ужин</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium mb-1 block">Название блюда</label>
                      <Input 
                        placeholder="Например: Салат с курицей"
                        value={newFood.food}
                        onChange={(e) => setNewFood({...newFood, food: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Калории</label>
                      <Input 
                        type="number"
                        placeholder="ккал"
                        value={newFood.kcal}
                        onChange={(e) => setNewFood({...newFood, kcal: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Белки (г)</label>
                      <Input 
                        type="number"
                        placeholder="г"
                        value={newFood.protein}
                        onChange={(e) => setNewFood({...newFood, protein: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Углеводы (г)</label>
                      <Input 
                        type="number"
                        placeholder="г"
                        value={newFood.carbs}
                        onChange={(e) => setNewFood({...newFood, carbs: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Жиры (г)</label>
                      <Input 
                        type="number"
                        placeholder="г"
                        value={newFood.fat}
                        onChange={(e) => setNewFood({...newFood, fat: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button onClick={addFoodEntry} className="w-full gap-2">
                    <Icon name="Plus" size={18} />
                    Добавить в дневник
                  </Button>
                </CardContent>
              </Card>

              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="PieChart" className="text-primary" size={24} />
                    {selectedDate === new Date().toISOString().split('T')[0] ? 'Сегодня' : 'Статистика'}
                  </CardTitle>
                  <CardDescription>
                    {selectedDate === new Date().toISOString().split('T')[0] 
                      ? 'Твоя статистика за день' 
                      : new Date(selectedDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
                    <div className="text-4xl font-bold mb-1 bg-gradient-to-r from-fitness-orange to-fitness-purple bg-clip-text text-transparent">
                      {totalCalories}
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">съедено ккал</div>
                    <div className={`text-lg font-semibold ${caloriesLeft >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {caloriesLeft >= 0 ? `Осталось ${caloriesLeft}` : `Перебор ${Math.abs(caloriesLeft)}`} ккал
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-card rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Белки</span>
                        <span className="font-bold text-fitness-orange">{totalProtein.toFixed(1)}г</span>
                      </div>
                      <Progress value={(totalProtein / 95) * 100} className="h-2 bg-orange-100" />
                      <div className="text-xs text-muted-foreground mt-1">Норма: 95г</div>
                    </div>

                    <div className="p-3 bg-card rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Углеводы</span>
                        <span className="font-bold text-fitness-purple">{totalCarbs.toFixed(1)}г</span>
                      </div>
                      <Progress value={(totalCarbs / 140) * 100} className="h-2 bg-purple-100" />
                      <div className="text-xs text-muted-foreground mt-1">Норма: 140г</div>
                    </div>

                    <div className="p-3 bg-card rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Жиры</span>
                        <span className="font-bold text-fitness-blue">{totalFat.toFixed(1)}г</span>
                      </div>
                      <Progress value={(totalFat / 45) * 100} className="h-2 bg-blue-100" />
                      <div className="text-xs text-muted-foreground mt-1">Норма: 45г</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="List" className="text-primary" size={24} />
                  История приёмов пищи
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todayEntries.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Icon name="Utensils" className="mx-auto mb-2 text-muted-foreground/50" size={48} />
                      <p>Нет записей за этот день. Добавь приём пищи!</p>
                    </div>
                  ) : (
                    todayEntries.map((entry) => (
                      <div key={entry.id} className="flex items-start justify-between p-4 bg-card rounded-lg border hover:border-primary/30 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">{entry.meal}</Badge>
                            <span className="text-xs text-muted-foreground">{entry.time}</span>
                          </div>
                          <h4 className="font-semibold mb-2">{entry.food}</h4>
                          <div className="flex gap-4 text-sm">
                            <span className="text-fitness-orange">Б: {entry.protein}г</span>
                            <span className="text-fitness-purple">У: {entry.carbs}г</span>
                            <span className="text-fitness-blue">Ж: {entry.fat}г</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-gradient-to-r from-fitness-orange to-fitness-purple text-white">
                            {entry.kcal} ккал
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deleteFoodEntry(entry.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Icon name="Trash2" size={18} />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracker" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Scale" className="text-primary" size={24} />
                    Добавить замер веса
                  </CardTitle>
                  <CardDescription>Записывай свой вес каждый день для отслеживания прогресса</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input 
                        type="number" 
                        placeholder="Введи вес (кг)" 
                        value={newWeight}
                        onChange={(e) => setNewWeight(e.target.value)}
                        className="text-lg"
                        step="0.1"
                      />
                    </div>
                    <Button onClick={addWeightEntry} className="gap-2">
                      <Icon name="Plus" size={18} />
                      Добавить
                    </Button>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <img 
                      src="https://cdn.poehali.dev/projects/c6a98cb2-0901-44eb-aac1-9c5339bc2279/files/07627325-3f5f-4765-b433-6059f99e8f46.jpg"
                      alt="Прогресс похудения"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="LineChart" className="text-primary" size={24} />
                    Статистика похудения
                  </CardTitle>
                  <CardDescription>Твой прогресс за последние дни</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-gradient-to-br from-fitness-orange/20 to-fitness-orange/10 rounded-lg">
                      <div className="text-2xl font-bold text-fitness-orange">{weightLog.length}</div>
                      <div className="text-xs text-muted-foreground">Дней</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-fitness-purple/20 to-fitness-purple/10 rounded-lg">
                      <div className="text-2xl font-bold text-fitness-purple">
                        {(weightLog[0].weight - weightLog[weightLog.length - 1].weight).toFixed(1)}
                      </div>
                      <div className="text-xs text-muted-foreground">Сброшено кг</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-fitness-blue/20 to-fitness-blue/10 rounded-lg">
                      <div className="text-2xl font-bold text-fitness-blue">
                        {((weightLog[0].weight - weightLog[weightLog.length - 1].weight) / weightLog.length * 30).toFixed(1)}
                      </div>
                      <div className="text-xs text-muted-foreground">Прогноз/мес</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {weightLog.slice().reverse().map((entry, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-card rounded-lg border hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="font-bold text-primary">{entry.day}</span>
                          </div>
                          <div>
                            <div className="font-semibold">{entry.weight} кг</div>
                            <div className="text-xs text-muted-foreground">{entry.date}</div>
                          </div>
                        </div>
                        {idx < weightLog.length - 1 && (
                          <Badge className={weightLog[weightLog.length - 1 - idx].weight - weightLog[weightLog.length - 2 - idx].weight < 0 ? 'bg-green-500' : 'bg-red-500'}>
                            {(weightLog[weightLog.length - 1 - idx].weight - weightLog[weightLog.length - 2 - idx].weight).toFixed(1)} кг
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Icon name="TrendingDown" className="text-primary shrink-0 mt-1" size={28} />
                  <div>
                    <h4 className="font-bold text-lg mb-2">График твоего прогресса</h4>
                    <div className="h-48 bg-white/50 rounded-lg p-4 border border-primary/20">
                      <div className="h-full flex items-end justify-around gap-2">
                        {weightLog.map((entry, idx) => {
                          const height = ((62 - entry.weight) / (62 - 54)) * 100;
                          return (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                              <div className="text-xs font-semibold text-primary">{entry.weight}</div>
                              <div 
                                className="w-full bg-gradient-to-t from-fitness-orange via-fitness-purple to-fitness-blue rounded-t-lg transition-all hover:opacity-80"
                                style={{ height: `${height}%` }}
                              />
                              <div className="text-xs text-muted-foreground">Д{entry.day}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      Цель: снижение веса до 55 кг. Текущий темп: отличный! Продолжай в том же духе 💪
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
            <Card className="animate-fade-in overflow-hidden border-0">
              <div className="relative h-48">
                <img 
                  src="https://cdn.poehali.dev/projects/c6a98cb2-0901-44eb-aac1-9c5339bc2279/files/131cdda3-cfba-46f1-9618-b365d165e53a.jpg"
                  alt="Здоровое питание"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <h2 className="text-2xl font-heading font-bold text-white">
                    🍽️ Вкусные рецепты для твоей цели
                  </h2>
                </div>
              </div>
            </Card>

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

          <TabsContent value="face" className="space-y-6">
            <Card className="animate-fade-in overflow-hidden">
              <div className="relative h-64 md:h-80">
                <img 
                  src="https://cdn.poehali.dev/projects/c6a98cb2-0901-44eb-aac1-9c5339bc2279/files/47df382d-2b9b-4224-a95d-1bf6806f698c.jpg"
                  alt="Упражнения для лица"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div>
                    <h2 className="text-3xl font-heading font-bold text-white mb-2">
                      Упражнения для овала лица
                    </h2>
                    <p className="text-white/90">
                      Подтяни кожу, убери второй подбородок и сделай скулы выразительнее
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {faceExercises.map((exercise, idx) => (
                <Card key={idx} className="animate-scale-in hover:shadow-xl transition-all">
                  <CardHeader className="bg-gradient-to-br from-fitness-purple/10 to-fitness-blue/10">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                        {idx + 1}
                      </div>
                      {exercise.name}
                    </CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary" className="gap-1">
                        <Icon name="Clock" size={14} />
                        {exercise.duration}
                      </Badge>
                      <Badge variant="outline">
                        {exercise.reps}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Icon name="Info" className="text-primary" size={18} />
                        Как делать:
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {exercise.description}
                      </p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-green-50 to-green-100/50 rounded-lg border border-green-200/50">
                      <h4 className="font-semibold mb-1 flex items-center gap-2 text-green-700">
                        <Icon name="Sparkles" size={16} />
                        Эффект:
                      </h4>
                      <p className="text-sm text-green-700">
                        {exercise.benefit}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-br from-fitness-orange/10 via-fitness-purple/10 to-fitness-blue/10 border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Icon name="Heart" className="text-primary shrink-0 mt-1" size={28} />
                  <div>
                    <h4 className="font-bold text-lg mb-3">Советы для максимального эффекта</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Icon name="Check" className="text-primary shrink-0 mt-0.5" size={16} />
                        <span>Выполняй упражнения 2 раза в день: утром и вечером</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" className="text-primary shrink-0 mt-0.5" size={16} />
                        <span>Перед упражнениями очисти лицо и нанеси лёгкий крем</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" className="text-primary shrink-0 mt-0.5" size={16} />
                        <span>Первые результаты заметны через 2-3 недели регулярных занятий</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" className="text-primary shrink-0 mt-0.5" size={16} />
                        <span>Комбинируй с массажем лица для усиления эффекта</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" className="text-primary shrink-0 mt-0.5" size={16} />
                        <span>Пей достаточно воды — это важно для упругости кожи</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
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