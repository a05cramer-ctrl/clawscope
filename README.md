# Claw Scope

Blockchain supply movement analytics terminal.

## Overview

Claw Scope monitors token supply movement over time and displays transfer velocity metrics in an institutional-grade dashboard interface.

## Features

- Token address input with scan functionality
- Supply movement metrics (1h, 6h, 24h windows)
- Supply tension meter with state indicators
- Timestamped observations log

## Layout

```
┌─────────────────────────────────────────────────────┐
│ Claw Scope                                    Idle  │
├─────────────────────────────────────────────────────┤
│ TOKEN ADDRESS                                       │
│ [________________________] [SCAN]                   │
├─────────────────────────────────────────────────────┤
│ 1H SUPPLY     │ 6H SUPPLY     │ 24H SUPPLY          │
│ 0.00%         │ 0.00%         │ 0.00%               │
├─────────────────────────────────────────────────────┤
│ SUPPLY TENSION                              Low     │
│ [████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]          │
├─────────────────────────────────────────────────────┤
│ OBSERVATIONS LOG                                    │
│ 12:34:56  No abnormal activity observed            │
│ 12:34:45  Supply movement increased over 6h window │
└─────────────────────────────────────────────────────┘
```

## Tech Stack

- React 18
- TypeScript
- Vite

## Commands

```bash
npm install    # Install dependencies
npm run dev    # Start dev server
npm run build  # Production build
```

## Design

- Dark matte UI
- Monospace typography
- Grid-based flat panels
- No gradients or animations
