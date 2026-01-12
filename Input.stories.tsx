import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/Input';
import { Button } from '../components/ui/Button';

const meta: Meta<typeof Input> = {
  title: 'UI Kit/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Input — интерактивный элемент, позволяющий вводить текстовую информацию.

## Основные возможности:
- 3 размера: 48px, 56px, 64px
- 3 визуальных режима: Border, Solid Normal, Solid Contrast
- Поддержка состояний: Normal, Hover, Focus, Active, Filled, Disabled
- Состояние ошибки с сообщением
- Лейбл внутри или снаружи поля
- Иконки слева и справа
- Валюта
- Скрытый режим (для паролей)
- Адаптивная ширина
- Поддержка тёмной темы
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['48', '56', '64'],
      description: 'Высота компонента',
    },
    mode: {
      control: 'select',
      options: ['border', 'solidNormal', 'solidContrast'],
      description: 'Визуальный режим',
    },
    label: {
      control: 'text',
      description: 'Текст лейбла',
    },
    labelInside: {
      control: 'boolean',
      description: 'Лейбл внутри поля (только для 56px и 64px)',
    },
    required: {
      control: 'boolean',
      description: 'Обязательное поле',
    },
    description: {
      control: 'text',
      description: 'Подпись под полем',
    },
    error: {
      control: 'boolean',
      description: 'Состояние ошибки',
    },
    errorMessage: {
      control: 'text',
      description: 'Сообщение об ошибке',
    },
    highlightBorder: {
      control: 'boolean',
      description: 'Акцентная рамка',
    },
    disabled: {
      control: 'boolean',
      description: 'Неактивное состояние',
    },
    fullWidth: {
      control: 'boolean',
      description: 'На всю ширину',
    },
    darkTheme: {
      control: 'boolean',
      description: 'Тёмная тема',
    },
    placeholder: {
      control: 'text',
      description: 'Плейсхолдер',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Базовые примеры
export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    description: 'Description',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Label',
    value: 'Value',
    description: 'Description',
  },
};

export const Required: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    required: true,
    description: 'Обязательное поле',
  },
};

// Размеры
export const Size48: Story = {
  args: {
    size: '48',
    label: 'Label',
    placeholder: 'Placeholder',
  },
  name: '48px',
};

export const Size56: Story = {
  args: {
    size: '56',
    label: 'Label',
    placeholder: 'Placeholder',
  },
  name: '56px',
};

export const Size64: Story = {
  args: {
    size: '64',
    label: 'Label',
    placeholder: 'Placeholder',
  },
  name: '64px',
};

// Режимы отображения
export const ModeBorder: Story = {
  args: {
    mode: 'border',
    label: 'Border',
    placeholder: 'Placeholder',
    description: 'Description',
  },
};

export const ModeSolidNormal: Story = {
  args: {
    mode: 'solidNormal',
    label: 'Solid Normal',
    placeholder: 'Placeholder',
    description: 'Description',
  },
};

export const ModeSolidContrast: Story = {
  args: {
    mode: 'solidContrast',
    label: 'Solid Contrast',
    placeholder: 'Placeholder',
    description: 'Description',
  },
};

// Label Inside
export const LabelInside56: Story = {
  args: {
    size: '56',
    labelInside: true,
    label: 'Label',
    placeholder: 'Placeholder',
  },
  name: 'Label Inside (56px)',
};

export const LabelInside64: Story = {
  args: {
    size: '64',
    labelInside: true,
    label: 'Label',
    placeholder: 'Placeholder',
  },
  name: 'Label Inside (64px)',
};

export const LabelInsideWithValue: Story = {
  args: {
    size: '56',
    labelInside: true,
    label: 'Label',
    value: 'Value',
  },
  name: 'Label Inside с значением',
};

// Состояния
export const ErrorState: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    error: true,
    errorMessage: 'Поле заполнено неверно',
  },
  name: 'Error',
};

export const ErrorWithValue: Story = {
  args: {
    label: 'Label',
    value: 'Неправильное значение',
    error: true,
    errorMessage: 'Поле заполнено неверно',
  },
  name: 'Error с значением',
};

export const Disabled: Story = {
  args: {
    label: 'Label',
    value: 'Value',
    description: 'Description',
    disabled: true,
  },
};

export const DisabledEmpty: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    description: 'Description',
    disabled: true,
  },
  name: 'Disabled пустой',
};

export const HighlightBorder: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    highlightBorder: true,
    description: 'С акцентной рамкой',
  },
};

export const HighlightBorderError: Story = {
  args: {
    label: 'Label',
    value: 'Value',
    highlightBorder: true,
    error: true,
    errorMessage: 'Ошибка с акцентной рамкой',
  },
  name: 'Highlight Border + Error',
};

// Иконки
export const WithLeftIcon: Story = {
  args: {
    label: 'Поиск',
    placeholder: 'Введите запрос',
    leftIcon: 'search',
  },
};

export const WithUserIcon: Story = {
  args: {
    label: 'Имя пользователя',
    placeholder: 'Введите имя',
    leftIcon: 'user',
  },
};

export const WithMailIcon: Story = {
  args: {
    label: 'Email',
    placeholder: 'example@mail.com',
    leftIcon: 'mail',
  },
};

// Валюта
export const WithCurrency: Story = {
  args: {
    label: 'Сумма',
    value: '1000',
    showCurrency: true,
    currencySymbol: '₽',
  },
};

export const WithCurrencyDollar: Story = {
  args: {
    label: 'Amount',
    value: '500',
    showCurrency: true,
    currencySymbol: '$',
  },
  name: 'С валютой ($)',
};

export const WithCurrencyEuro: Story = {
  args: {
    label: 'Betrag',
    value: '250',
    showCurrency: true,
    currencySymbol: '€',
  },
  name: 'С валютой (€)',
};

// Right Zone
export const WithDelete: Story = {
  args: {
    label: 'Label',
    value: 'Value',
    rightZone: {
      showDelete: true,
    },
  },
  name: 'С кнопкой удаления',
};

export const WithHint: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    rightZone: {
      showHint: true,
    },
    description: 'Нажмите на иконку для получения подсказки',
  },
  name: 'С подсказкой',
};

export const WithLoader: Story = {
  args: {
    label: 'Label',
    placeholder: 'Загрузка...',
    rightZone: {
      showLoader: true,
    },
  },
  name: 'С загрузчиком',
};

export const WithSuccessIcon: Story = {
  args: {
    label: 'Email',
    value: 'valid@email.com',
    rightZone: {
      iconType: 'success',
    },
    description: 'Email подтверждён',
  },
  name: 'Success иконка',
};

export const WithFailureIcon: Story = {
  args: {
    label: 'Email',
    value: 'invalid-email',
    rightZone: {
      iconType: 'failure',
    },
    error: true,
    errorMessage: 'Неверный формат email',
  },
  name: 'Failure иконка',
};

export const WithCustomButton: Story = {
  args: {
    label: 'Промокод',
    placeholder: 'Введите код',
    rightZone: {
      button: <Button size="sm" variant="text">Применить</Button>,
    },
  },
  name: 'С кнопкой',
};

// Пароль
export const Password: Story = {
  render: () => {
    const [hidden, setHidden] = useState(true);
    return (
      <Input
        label="Пароль"
        placeholder="Введите пароль"
        hidden={hidden}
        onToggleVisibility={() => setHidden(!hidden)}
        leftIcon="lock"
      />
    );
  },
  name: 'Поле пароля',
};

export const PasswordWithValue: Story = {
  render: () => {
    const [hidden, setHidden] = useState(true);
    return (
      <Input
        label="Пароль"
        value="secretpassword"
        hidden={hidden}
        onToggleVisibility={() => setHidden(!hidden)}
        leftIcon="lock"
      />
    );
  },
  name: 'Пароль с значением',
};

// Тёмная тема
export const DarkTheme: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    description: 'Description',
    darkTheme: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const DarkThemeWithValue: Story = {
  args: {
    label: 'Label',
    value: 'Value',
    description: 'Description',
    darkTheme: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  name: 'Тёмная тема с значением',
};

export const DarkThemeError: Story = {
  args: {
    label: 'Label',
    value: 'Value',
    error: true,
    errorMessage: 'Ошибка',
    darkTheme: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  name: 'Тёмная тема с ошибкой',
};

export const DarkThemeSolidNormal: Story = {
  args: {
    mode: 'solidNormal',
    label: 'Solid Normal',
    placeholder: 'Placeholder',
    description: 'Description',
    darkTheme: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  name: 'Тёмная тема Solid Normal',
};

// Ширина
export const FullWidth: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    description: 'Description',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// Комплексные примеры
export const CompleteExample: Story = {
  args: {
    size: '56',
    mode: 'border',
    label: 'Сумма перевода',
    placeholder: '0',
    required: true,
    leftIcon: 'currency',
    showCurrency: true,
    currencySymbol: '₽',
    rightZone: {
      showDelete: true,
      showHint: true,
    },
    description: 'Минимальная сумма 100 ₽',
  },
  name: 'Комплексный пример',
};

export const SearchInput: Story = {
  args: {
    size: '48',
    mode: 'solidNormal',
    placeholder: 'Поиск по сайту...',
    leftIcon: 'search',
    rightZone: {
      showDelete: true,
    },
  },
  name: 'Поле поиска',
};

export const EmailInput: Story = {
  args: {
    label: 'Email адрес',
    placeholder: 'example@company.com',
    required: true,
    leftIcon: 'mail',
    description: 'На этот адрес придёт подтверждение',
  },
  name: 'Поле email',
};

export const PhoneInput: Story = {
  args: {
    label: 'Телефон',
    placeholder: '+7 (___) ___-__-__',
    required: true,
    leftIcon: 'phone',
    description: 'Для связи с вами',
  },
  name: 'Поле телефона',
};

// Все размеры вместе
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <Input size="48" label="48px" placeholder="Placeholder" />
      <Input size="56" label="56px" placeholder="Placeholder" />
      <Input size="64" label="64px" placeholder="Placeholder" />
    </div>
  ),
  name: 'Все размеры',
};

// Все режимы вместе
export const AllModes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <Input mode="border" label="Border" placeholder="Placeholder" />
      <Input mode="solidNormal" label="Solid Normal" placeholder="Placeholder" />
      <Input mode="solidContrast" label="Solid Contrast" placeholder="Placeholder" />
    </div>
  ),
  name: 'Все режимы',
};

// Адаптивный пример
export const ResponsiveExample: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '16px',
      width: '100%',
      maxWidth: '400px',
      padding: '16px',
    }}>
      <Input
        label="Имя"
        placeholder="Введите имя"
        required
        fullWidth
      />
      <Input
        label="Email"
        placeholder="example@mail.com"
        required
        leftIcon="mail"
        fullWidth
      />
      <Input
        label="Пароль"
        placeholder="Минимум 8 символов"
        required
        leftIcon="lock"
        fullWidth
      />
      <Button fullWidth>Зарегистрироваться</Button>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
  name: 'Адаптивная форма',
};
