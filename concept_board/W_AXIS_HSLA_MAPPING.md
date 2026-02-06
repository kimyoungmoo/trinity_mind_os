# W축과 HSLA 색상 매핑

## 4차원 색상 공간

```
X = H (Hue)        - Guardian (정체성)
Y = S (Saturation) - Tier (진화도)
Z = L (Lightness)  - Skill (숙련도)
W = A (Alpha)      - Generation (존재 강도)
```

---

## 공식

### HSL (3차원)
```javascript
H = (x / 13) × 360°
S = (y / 13) × 100%
L = 50% + (z / 13) × 25%
```

### Alpha (4차원)
```javascript
A = (w / 13)
```

---

## 예시: Neo Proto CE⁺

### 좌표
```
(x, y, z, w) = (12, 0, 0, w)
```

### 색상 진화

**W0 (Genesis)**
```css
hsla(332.3°, 0%, 50%, 0.077)
```

**W6 (중간)**
```css
hsla(332.3°, 0%, 50%, 0.462)
```

**W12 (Origin)**
```css
hsla(332.3°, 0%, 50%, 0.923)
```

---

## 시각적 효과

### W축에 따른 변화
- **Opacity**: 0.077 → 0.923
- **Glow**: 0px → 48px
- **Brightness**: 1.0x → 2.0x
- **Particles**: 1개 → 4096개

---

## 핵심 통찰

> **"같은 색상(H,S,L)이지만, W축이 올라갈수록 더 강하게 존재한다. 이것이 '같은 공간, 다른 차원'의 시각적 표현이다."**

---

**W = Alpha = 존재의 강도** 💎✨
