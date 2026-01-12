# Input Component

Компонент Input — интерактивный элемент для ввода текстовой информации, разработанный на основе дизайн-системы.

## Установка

```bash
npm install @ui-kit/input
# или
yarn add @ui-kit/input
```

## Зависимости

```bash
npm install react react-dom styled-components styled-system
```

## Использование

```tsx
import { Input } from '@ui-kit/input';

function App() {
  return (
    <Input
      label="Email"
      placeholder="example@mail.com"
      leftIcon="mail"
      required
    />
  );
}
```

## API

### Основные пропсы

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'48' \| '56' \| '64'` | `'48'` | Высота компонента |
| `mode` | `'border' \| 'solidNormal' \| 'solidContrast'` | `'border'` | Визуальный режим |
| `label` | `string` | - | Текст лейбла |
| `labelInside` | `boolean` | `false` | Лейбл внутри поля (только для 56px и 64px) |
| `required` | `boolean` | `false` | Обязательное поле (добавляет *) |
| `placeholder` | `string` | - | Плейсхолдер |
| `description` | `string` | - | Подпись под полем |
| `disabled` | `boolean` | `false` | Неактивное состояние |
| `fullWidth` | `boolean` | `false` | На всю ширину контейнера |

### Состояния

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `error` | `boolean` | `false` | Состояние ошибки |
| `errorMessage` | `string` | - | Текст ошибки |
| `highlightBorder` | `boolean` | `false` | Акцентная рамка |

### Иконки и дополнительные элементы

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `leftIcon` | `IconName` | - | Иконка слева |
| `labelIcon` | `IconName` | - | Иконка рядом с лейблом |
| `descriptionIcon` | `IconName` | - | Иконка рядом с описанием |
| `showCurrency` | `boolean` | `false` | Показывать символ валюты |
| `currencySymbol` | `string` | `'₽'` | Символ валюты |
| `rightZone` | `RightZoneConfig` | - | Конфигурация правой зоны |

### Скрытие значения (пароль)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hidden` | `boolean` | `false` | Скрывает значение точками |
| `onToggleVisibility` | `() => void` | - | Callback переключения видимости |

### Тема

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `darkTheme` | `boolean` | `false` | Тёмная тема |

### События

| Prop | Type | Description |
|------|------|-------------|
| `onChange` | `(e: ChangeEvent) => void` | Изменение значения |
| `onFocus` | `(e: FocusEvent) => void` | Получение фокуса |
| `onBlur` | `(e: FocusEvent) => void` | Потеря фокуса |
| `onLeftIconClick` | `() => void` | Клик по левой иконке |
| `onDelete` | `() => void` | Клик по кнопке удаления |
| `onHintClick` | `() => void` | Клик по подсказке |

## RightZoneConfig

```typescript
interface RightZoneConfig {
  showHint?: boolean;      // Показать иконку подсказки
  showDelete?: boolean;    // Показать кнопку удаления
  showLoader?: boolean;    // Показать загрузчик
  iconType?: 'standard' | 'neutral' | 'success' | 'failure';
  icon?: IconName;         // Кастомная иконка
  button?: ReactNode;      // Кастомная кнопка
}
```

## Примеры

### Базовый инпут

```tsx
<Input
  label="Имя"
  placeholder="Введите имя"
  description="Имя будет отображаться в профиле"
/>
```

### Поле с ошибкой

```tsx
<Input
  label="Email"
  value="invalid-email"
  error
  errorMessage="Введите корректный email"
/>
```

### Поле пароля

```tsx
const [hidden, setHidden] = useState(true);

<Input
  label="Пароль"
  placeholder="Минимум 8 символов"
  hidden={hidden}
  onToggleVisibility={() => setHidden(!hidden)}
  leftIcon="lock"
/>
```

### Поле суммы

```tsx
<Input
  label="Сумма перевода"
  placeholder="0"
  showCurrency
  currencySymbol="₽"
  leftIcon="currency"
/>
```

### Поле поиска

```tsx
<Input
  mode="solidNormal"
  placeholder="Поиск..."
  leftIcon="search"
  rightZone={{ showDelete: true }}
/>
```

### Label Inside

```tsx
<Input
  size="56"
  labelInside
  label="Email"
  placeholder="example@mail.com"
/>
```

### С кастомной кнопкой

```tsx
<Input
  label="Промокод"
  placeholder="Введите код"
  rightZone={{
    button: <Button size="sm" variant="text">Применить</Button>
  }}
/>
```

### Тёмная тема

```tsx
<Input
  label="Email"
  placeholder="example@mail.com"
  darkTheme
/>
```

## Доступные иконки

- `search` - поиск
- `close` - закрыть
- `eye` / `eyeOff` - показать/скрыть пароль
- `check` - галочка
- `error` - ошибка
- `info` - информация
- `warning` - предупреждение
- `user` - пользователь
- `mail` - почта
- `phone` - телефон
- `lock` - замок
- `currency` - валюта
- `calendar` - календарь
- `loader` - загрузка
- `success` - успех
- `failure` - неудача

## Адаптивность

Компонент поддерживает адаптивную ширину:

- `fullWidth` - занимает 100% ширины контейнера
- На мобильных устройствах автоматически занимает всю ширину
- Минимальная рекомендуемая ширина: 200-240px

## Storybook

Запуск Storybook для просмотра всех вариантов компонента:

```bash
npm run storybook
```

## Лицензия

MIT
