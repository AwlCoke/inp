import React, { useState, useCallback, useMemo, forwardRef, useId, useRef, useImperativeHandle } from 'react';
import { InputProps, InputState } from './types';
import { Icon } from '../ui/Icon';
import { theme } from '../../theme';
import {
  InputWrapper,
  LabelWrapper,
  StyledLabel,
  RequiredIndicator,
  InputContainer,
  InputContent,
  InsideLabel,
  NativeInput,
  CurrencySymbol,
  HiddenValue,
  HiddenDot,
  LeftIconWrapper,
  RightZoneWrapper,
  IconButton,
  DescriptionWrapper,
  StyledDescription,
} from './styles';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = '48',
      mode = 'border',
      label,
      labelInside = false,
      required = false,
      prelabel,
      labelIcon,
      description,
      descriptionIcon,
      error = false,
      errorMessage,
      highlightBorder = false,
      leftIcon,
      showCurrency = false,
      currencySymbol = '₽',
      rightZone,
      hidden = false,
      onToggleVisibility,
      fullWidth = false,
      darkTheme = false,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      onLeftIconClick,
      onDelete,
      onHintClick,
      className,
      disabled = false,
      placeholder,
      type = 'text',
      id: providedId,
      ...nativeProps
    },
    ref
  ) => {
    // Generate unique ID for accessibility
    const generatedId = useId();
    const inputId = providedId || `input-${generatedId}`;
    const descriptionId = `${inputId}-description`;

    // Use local ref and forward it to maintain proper ref handling
    const localRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => localRef.current!);

    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const controlledValue = value !== undefined ? value : internalValue;
    // Fix: safely check length with fallback to empty string
    const hasValue = (controlledValue || '').length > 0;

    // Determine current state
    const currentState: InputState = useMemo(() => {
      if (disabled) return 'disabled';
      if (isFocused && hasValue) return 'active';
      if (isFocused) return 'focus';
      if (hasValue && isHovered) return 'filledHover';
      if (hasValue) return 'filled';
      if (isHovered) return 'normalHover';
      return 'normal';
    }, [disabled, isFocused, hasValue, isHovered]);

    // Only allow labelInside for 56px and 64px sizes
    const effectiveLabelInside = labelInside && (size === '56' || size === '64');

    // Show currency only in active/filled states
    const showCurrencySymbol =
      showCurrency &&
      (currentState === 'active' ||
        currentState === 'filled' ||
        currentState === 'filledHover');

    // Handlers
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (value === undefined) {
          setInternalValue(e.target.value);
        }
        onChange?.(e);
      },
      [onChange, value]
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur]
    );

    const handleMouseEnter = useCallback(() => {
      setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false);
    }, []);

    const handleContainerClick = useCallback(() => {
      if (localRef.current && !disabled) {
        localRef.current.focus();
      }
    }, [disabled]);

    // Render hidden value (dots)
    const renderHiddenValue = () => {
      if (!hidden || !hasValue) return null;
      const dotsCount = Math.min((controlledValue || '').length, 12);
      return (
        <HiddenValue $darkTheme={darkTheme} $disabled={disabled}>
          {Array.from({ length: dotsCount }).map((_, i) => (
            <HiddenDot key={i} />
          ))}
        </HiddenValue>
      );
    };

    // Render right zone icons
    const renderRightZone = () => {
      if (!rightZone && !hidden) return null;

      const elements: React.ReactNode[] = [];

      // Password visibility toggle
      if (hidden !== undefined && onToggleVisibility) {
        elements.push(
          <IconButton
            key="visibility"
            type="button"
            onClick={onToggleVisibility}
            disabled={disabled}
            $darkTheme={darkTheme}
            aria-label={hidden ? 'Показать пароль' : 'Скрыть пароль'}
          >
            <Icon
              name={hidden ? 'eye' : 'eyeOff'}
              size="sm"
              disabled={disabled}
            />
          </IconButton>
        );
      }

      if (rightZone) {
        // Loader
        if (rightZone.showLoader) {
          elements.push(
            <Icon
              key="loader"
              name="loader"
              size="sm"
              color={
                darkTheme
                  ? theme.colors.dark.icon.default
                  : theme.colors.icon.default
              }
              aria-label="Загрузка"
            />
          );
        }

        // Hint icon
        if (rightZone.showHint) {
          elements.push(
            <IconButton
              key="hint"
              type="button"
              onClick={onHintClick}
              disabled={disabled}
              $darkTheme={darkTheme}
              aria-label="Подсказка"
            >
              <Icon name="info" size="sm" disabled={disabled} />
            </IconButton>
          );
        }

        // Delete icon
        if (rightZone.showDelete && hasValue) {
          elements.push(
            <IconButton
              key="delete"
              type="button"
              onClick={onDelete}
              disabled={disabled}
              $darkTheme={darkTheme}
              aria-label="Очистить"
            >
              <Icon name="close" size="sm" disabled={disabled} />
            </IconButton>
          );
        }

        // Status icons
        if (rightZone.iconType === 'success') {
          elements.push(
            <Icon
              key="status"
              name="success"
              size="sm"
              color={
                darkTheme
                  ? theme.colors.dark.icon.success
                  : theme.colors.icon.success
              }
              aria-label="Успешно"
            />
          );
        } else if (rightZone.iconType === 'failure') {
          elements.push(
            <Icon
              key="status"
              name="failure"
              size="sm"
              color={
                darkTheme
                  ? theme.colors.dark.icon.error
                  : theme.colors.icon.error
              }
              aria-label="Ошибка"
            />
          );
        } else if (rightZone.icon) {
          elements.push(
            <Icon
              key="custom-icon"
              name={rightZone.icon}
              size="sm"
              disabled={disabled}
            />
          );
        }

        // Custom button
        if (rightZone.button) {
          elements.push(
            <React.Fragment key="custom-button">{rightZone.button}</React.Fragment>
          );
        }
      }

      if (elements.length === 0) return null;

      return <RightZoneWrapper>{elements}</RightZoneWrapper>;
    };

    // Description text
    const descriptionText = error && errorMessage ? errorMessage : description;

    return (
      <InputWrapper $fullWidth={fullWidth} className={className}>
        {/* External label (when labelInside is false) */}
        {label && !effectiveLabelInside && (
          <LabelWrapper>
            {prelabel && (
              <StyledLabel
                variant="labelSmall"
                $darkTheme={darkTheme}
                $disabled={disabled}
              >
                {prelabel}
              </StyledLabel>
            )}
            <StyledLabel
              as="label"
              htmlFor={inputId}
              variant="label"
              $darkTheme={darkTheme}
              $disabled={disabled}
            >
              {label}
              {required && (
                <RequiredIndicator $darkTheme={darkTheme} aria-hidden="true">*</RequiredIndicator>
              )}
            </StyledLabel>
            {labelIcon && (
              <Icon name={labelIcon} size="sm" disabled={disabled} />
            )}
          </LabelWrapper>
        )}

        {/* Input container */}
        <InputContainer
          $size={size}
          $mode={mode}
          $state={currentState}
          $error={error}
          $highlightBorder={highlightBorder}
          $darkTheme={darkTheme}
          $hasLeftIcon={!!leftIcon}
          $hasRightZone={!!rightZone || hidden !== undefined}
          $labelInside={effectiveLabelInside}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleContainerClick}
        >
          {/* Left icon */}
          {leftIcon && !effectiveLabelInside && (
            <LeftIconWrapper
              $clickable={!!onLeftIconClick}
              onClick={onLeftIconClick}
            >
              <Icon name={leftIcon} size="md" disabled={disabled} />
            </LeftIconWrapper>
          )}

          <InputContent $labelInside={effectiveLabelInside}>
            {/* Inside label */}
            {effectiveLabelInside && label && (
              <InsideLabel
                as="label"
                htmlFor={inputId}
                $darkTheme={darkTheme}
                $hasValue={hasValue || isFocused}
              >
                {label}
                {required && (
                  <RequiredIndicator $darkTheme={darkTheme} aria-hidden="true">*</RequiredIndicator>
                )}
              </InsideLabel>
            )}

            {/* Native input or hidden value */}
            {hidden && hasValue ? (
              renderHiddenValue()
            ) : (
              <NativeInput
                ref={localRef}
                id={inputId}
                type={hidden ? 'password' : type}
                value={controlledValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={disabled}
                placeholder={
                  !effectiveLabelInside || isFocused || hasValue
                    ? placeholder
                    : ''
                }
                aria-invalid={error}
                aria-required={required}
                aria-describedby={descriptionText ? descriptionId : undefined}
                $size={size}
                $labelInside={effectiveLabelInside}
                $darkTheme={darkTheme}
                $hasValue={hasValue}
                {...nativeProps}
              />
            )}

            {/* Currency symbol */}
            {showCurrencySymbol && (
              <CurrencySymbol $darkTheme={darkTheme} $disabled={disabled}>
                {currencySymbol}
              </CurrencySymbol>
            )}
          </InputContent>

          {/* Right zone */}
          {renderRightZone()}
        </InputContainer>

        {/* Description */}
        {descriptionText && (
          <DescriptionWrapper>
            {descriptionIcon && (
              <Icon
                name={descriptionIcon}
                size="sm"
                color={
                  error
                    ? darkTheme
                      ? theme.colors.dark.text.error
                      : theme.colors.text.error
                    : undefined
                }
                disabled={disabled}
              />
            )}
            <StyledDescription
              id={descriptionId}
              variant="caption"
              maxLines={2}
              $darkTheme={darkTheme}
              $error={error}
              $disabled={disabled}
              role={error ? 'alert' : undefined}
            >
              {descriptionText}
            </StyledDescription>
          </DescriptionWrapper>
        )}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';
