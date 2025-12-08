/**
 * Brutalist Shadow System
 *
 * CSS変数ベースのシャドウスタイル定義
 * globals.cssで定義された変数を使用
 *
 * 使い方:
 * - シャドウ: shadow="right-md"
 * - インタラクション: interactive="press" または interactive="hover"
 */

// シャドウの方向
export type ShadowDirection = 'right' | 'left';

// シャドウのサイズ
export type ShadowSize = 'sm' | 'md' | 'lg';

// シャドウのカラーバリアント
export type ShadowColor = 'default' | 'light';

/**
 * シャドウクラス（静的・見た目のみ）
 */
export const shadowVariants = {
  none: '',
  // Right direction (default)
  'right-sm': 'shadow-brutal-sm',
  'right-md': 'shadow-brutal-md',
  'right-lg': 'shadow-brutal-lg',
  // Left direction
  'left-sm': 'shadow-brutal-left-sm',
  'left-md': 'shadow-brutal-left-md',
  'left-lg': 'shadow-brutal-left-lg',
  // Light color (for dark backgrounds)
  'light-sm': 'shadow-brutal-light-sm',
  'light-md': 'shadow-brutal-light-md',
  'light-lg': 'shadow-brutal-light-lg',
  // Legacy aliases
  sm: 'shadow-brutal-sm',
  md: 'shadow-brutal-md',
  lg: 'shadow-brutal-lg',
  left: 'shadow-brutal-left-md',
  white: 'shadow-brutal-light-md',
} as const;

export type ShadowVariant = keyof typeof shadowVariants;

/**
 * インタラクションクラス（アニメーション・挙動のみ）
 *
 * - false: なし
 * - 'press': active時に押し込み
 * - 'hover': hover時に押し込み（activeと同じ動作）
 */
export const interactiveVariants = {
  false: '',
  press: [
    'transition-all duration-100',
    'active:translate-x-1 active:translate-y-1',
    'active:shadow-none',
  ].join(' '),
  hover: [
    'transition-all duration-100',
    'hover:translate-x-1 hover:translate-y-1',
    'hover:shadow-none',
  ].join(' '),
} as const;

export type InteractiveVariant = keyof typeof interactiveVariants;
