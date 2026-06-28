import { Topic } from "../types";

export const CONTINUITY_DERIVATIVE_TOPICS: Topic[] = [
  // --- CHAPTER 3: CONTINUITY OF FUNCTIONS ---
  {
    id: "continuity-concept",
    category: "continuity",
    titleKh: "៣.១ ភាពជាប់ត្រង់មួយចំណុច",
    title: "Continuity at a Point",
    contentMarkdown: `### ភាពជាប់ត្រង់មួយចំណុច (Continuity at a Point)
អនុគមន៍ $y = f(x)$ ជាប់ត្រង់ចំណុច $x = c$ លុះត្រាតែវាបំពេញលក្ខខណ្ឌទាំង ៣ ដូចខាងក្រោម៖

#### ១. លក្ខខណ្ឌទាំង ៣ នៃភាពជាប់៖
1.  $f(c)$ កំណត់ (មានន័យថា $c$ ស្ថិតក្នុងដែនកំណត់នៃ $f$)
2.  $\\lim_{x \\to c} f(x)$ មានអត្ថិភាព (លីមីតឆ្វេងស្មើនឹងលីមីតស្តាំ)
3.  $\\lim_{x \\to c} f(x) = f(c)$

#### ២. និយមន័យរួម៖
$$\\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = f(c)$$
*   បើអនុគមន៍ $f$ មិនជាប់ត្រង់ $x = c$ ទេ គេថា $f$ **ដាច់ត្រង់ $x = c$**។`,
    formulas: [
      { label: "លក្ខខណ្ឌភាពជាប់", formula: "lim_(x→c) f(x) = f(c)", explanation: "លីមីតនៅពេល x ខិតជិត c ស្មើនឹងតម្លៃអនុគមន៍ត្រង់ c" }
    ]
  },
  {
    id: "continuity-properties",
    category: "continuity",
    titleKh: "៣.២ លក្ខណៈនៃអនុគមន៍ជាប់ និងភាពជាប់លើចន្លោះ",
    title: "Properties & Interval Continuity",
    contentMarkdown: `### លក្ខណៈនៃអនុគមន៍ជាប់ និងភាពជាប់លើចន្លោះ (Properties & Interval Continuity)
#### ១. លក្ខណៈនៃអនុគមន៍ជាប់ (Properties of Continuous Functions)
បើអនុគមន៍ $f$ និង $g$ ជាប់ត្រង់ $x = c$ នោះ៖
*   $f(x) + g(x)$ ជាប់ត្រង់ $x = c$
*   $f(x) - g(x)$ ជាប់ត្រង់ $x = c$
*   $f(x) \\cdot g(x)$ ជាប់ត្រង់ $x = c$
*   $k \\cdot f(x)$ ជាប់ត្រង់ $x = c$ ($k$ ជាចំនួនថេរ)
*   $\\frac{f(x)}{g(x)}$ ជាប់ត្រង់ $x = c$ (ចំពោះ $g(c) \\neq 0$)

#### ២. អនុគមន៍ជាប់ជានិច្ច
*   អនុគមន៍លីនេអ៊ែរ និងពហុធា $P(x)$ ជាប់ជានិច្ចលើ $\\mathbb{R}$។
*   អនុគមន៍សនិទាន ជាប់គ្រប់តម្លៃ $x$ ដែលធ្វើឱ្យភាគបែងខុសពីសូន្យ។
*   អនុគមន៍ស៉ីនុស $\\sin x$ និងកូស៉ីនុស $\\cos x$ ជាប់ជានិច្ចលើ $\\mathbb{R}$។

#### ៣. ភាពជាប់លើចន្លោះ (Continuity on an Interval)
*   **លើចន្លោះបើក $(a, b)$**៖ លុះត្រាតែ $f$ ជាប់គ្រប់ចំណុចក្នុងចន្លោះបើកនោះ។
*   **លើចន្លោះបិទ $[a, b]$**៖ លុះត្រាតែ $f$ ជាប់លើចន្លោះបើក $(a, b)$ និងមាន $\\lim_{x \\to a^+} f(x) = f(a)$ ព្រមទាំង $\\lim_{x \\to b^-} f(x) = f(b)$。`,
    formulas: [
      { label: "ភាពជាប់លើចន្លោះបិទ", formula: "lim_(x→a⁺) f(x) = f(a) & lim_(x→b⁻) f(x) = f(b)", explanation: "លក្ខខណ្ឌជាបន្តត្រង់ចំណុចចុងនៃចន្លោះបិទ [a,b]" }
    ]
  },
  {
    id: "continuity-ivt",
    category: "continuity",
    titleKh: "៣.៣ ទ្រឹស្តីបទតម្លៃកណ្តាល",
    title: "Intermediate Value Theorem (IVT)",
    contentMarkdown: `### ទ្រឹស្តីបទតម្លៃកណ្តាល (Intermediate Value Theorem)
#### ១. ទ្រឹស្តីបទតម្លៃកណ្តាល (IVT)
បើអនុគមន៍ $f$ ជាប់លើចន្លោះបិទ $[a, b]$ និង $k$ ជាចំនួនមួយនៅចន្លោះ $f(a)$ និង $f(b)$ នោះមានចំនួនពិត $c$ យ៉ាងហោចណាស់មួយនៅក្នុងចន្លោះបើក $(a, b)$ ដែល៖
$$f(c) = k$$

#### ២. ករណីពិសេស (ឫសនៃសមីការ $f(x) = 0$)
បើអនុគមន៍ $f$ ជាប់លើចន្លោះបិទ $[a, b]$ ហើយមាន $f(a) \\cdot f(b) < 0$ (មានន័យថា $f(a)$ និង $f(b)$ មានសញ្ញាផ្ទុយគ្នា) នោះមានចំនួនពិត $c$ យ៉ាងហោចណាស់មួយនៅក្នុងចន្លោះ $(a, b)$ ដែល៖
$$f(c) = 0$$
*   មានន័យថាសមីការ $f(x) = 0$ មានឫសយ៉ាងហោចណាស់មួយនៅក្នុងចន្លោះ $(a, b)$។
*   បើ $f$ ជាប់ និងកើនដាច់ខាត ឬចុះដាច់ខាតលើ $[a, b]$ នោះសមីការ $f(x) = 0$ មាន **ឫសតែមួយគត់ (Unique Root)** ក្នុងចន្លោះនោះ។`,
    formulas: [
      { label: "អត្ថិភាពឫស (IVT)", formula: "f(a) · f(b) < 0 => f(c) = 0", explanation: "លក្ខខណ្ឌបញ្ជាក់ថាមានឫសយ៉ាងតិចមួយនៅក្នុងចន្លោះ (a, b)" }
    ]
  },
  {
    id: "continuity-extension",
    category: "continuity",
    titleKh: "៣.៦ អនុគមន៍បន្លាយតាមភាពជាប់",
    title: "Continuous Extension",
    contentMarkdown: `### អនុគមន៍បន្លាយតាមភាពជាប់ (Continuous Extension)
បើអនុគមន៍ $f$ មិនកំណត់ត្រង់ $x = a$ ប៉ុន្តែមានលីមីត $\\lim_{x \\to a} f(x) = L$ (ជាចំនួនពិត) នោះអនុគមន៍បន្លាយតាមភាពជាប់នៃ $f$ ត្រង់ $x = a$ កំណត់ដោយអនុគមន៍ថ្មី $g$ ដូចខាងក្រោម៖
$$
g(x) = 
\\begin{cases} 
f(x) & , x \\neq a \\\\
L & , x = a 
\\end{cases}
$$
អនុគមន៍ $g$ នេះជាអនុគមន៍ជាប់ត្រង់ $x = a$។`,
    formulas: [
      { label: "លក្ខខណ្ឌបន្លាយ", formula: "g(a) = lim_(x→a) f(x) = L", explanation: "បង្កើតអនុគមន៍ថ្មីឲ្យជាប់ត្រង់ចំណុចអវត្តមានតម្លៃ" }
    ]
  },

  // --- CHAPTER 4: DERIVATIVES OF FUNCTIONS ---
  {
    id: "derivative-concept",
    category: "derivative",
    titleKh: "៤.១ អត្រាបម្រែបម្រួល និងនិយមន័យដេរីវេ",
    title: "Rate of Change & Derivative Def",
    contentMarkdown: `### អត្រាបម្រែបម្រួល និងនិយមន័យដេរីវេ (Rate of Change & Definition)
#### ១. អត្រាបម្រែបម្រួលមធ្យម (Average Rate of Change)
បើអថេរ $x$ ប្រែប្រួលពី $a$ ទៅ $b$ នោះផលធៀបបម្រែបម្រួលគឺ៖
$$\\frac{\\Delta y}{\\Delta x} = \\frac{f(b) - f(a)}{b - a}$$

#### ២. និយមន័យដេរីវេត្រង់ចំណុច $x_0$ (Derivative at a Point)
ដេរីវេនៃអនុគមន៍ $y = f(x)$ ត្រង់ចំណុច $x_0$ កំណត់ដោយ៖
$$y'_0 = f'(x_0) = \\lim_{\\Delta x \\to 0} \\frac{\\Delta y}{\\Delta x} = \\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0}$$
ឬដោយតាង $h = x - x_0$ នាំឱ្យ $h \\to 0$ កាលណា $x \\to x_0$៖
$$f'(x_0) = \\lim_{h \\to 0} \\frac{f(x_0 + h) - f(x_0)}{h}$$`,
    formulas: [
      { label: "ដេរីវេត្រង់ x₀", formula: "f'(x_0) = lim_(h→0) (f(x₀+h) - f(x₀))/h", explanation: "និយមន័យដេរីវេដោយប្រើលីមីតនៃផលធៀបកំណើន" },
      { label: "អត្រាបម្រែបម្រួលមធ្យម", formula: "Δy/Δx = (f(b)-f(a))/(b-a)", explanation: "មេគុណប្រាប់ទិសនៃខ្សែកាត់តភ្ជាប់ចំណុចពីរ" }
    ]
  },
  {
    id: "derivative-algebraic-formulas",
    category: "derivative",
    titleKh: "៤.២ រូបមន្តដេរីវេនៃអនុគមន៍ពិជគណិត",
    title: "Algebraic Derivatives Formulas",
    contentMarkdown: `### រូបមន្តដេរីវេនៃអនុគមន៍ពិជគណិត (Algebraic Derivatives)
រូបមន្តដេរីវេគ្រឹះដែលត្រូវចងចាំចំពោះអនុគមន៍ $u$ និង $v$ ជាអនុគមន៍នៃ $x$៖

#### ១. ដេរីវេអនុគមន៍ស្វ័យគុណ និងផលធៀប
*   $(k)' = 0 \\quad (k \\text{ ជាចំនួនថេរ})$
*   $(ax + b)' = a$
*   $(x^n)' = n x^{n-1} \\quad \\implies \\quad (u^n)' = n u' u^{n-1}$
*   $\\left(\\frac{1}{x}\\right)' = -\\frac{1}{x^2} \\quad \\implies \\quad \\left(\\frac{1}{u^n}\\right)' = -\\frac{n u'}{u^{n+1}}$
*   $(\\sqrt{x})' = \\frac{1}{2\\sqrt{x}} \\quad \\implies \\quad (\\sqrt{u})' = \\frac{u'}{2\\sqrt{u}}$

#### ២. ដេរីវេផលបូក ផលគុណ និងផលចែក
*   $(u + v)' = u' + v'$
*   $(u \\cdot v)' = u'v + v'u$
*   $\\left(\\frac{u}{v}\\right)' = \\frac{u'v - v'u}{v^2}$
*   $\\left(\\frac{k}{v}\\right)' = -\\frac{k v'}{v^2}$`,
    formulas: [
      { label: "ដេរីវេ u·v", formula: "(uv)' = u'v + v'u", explanation: "ដេរីវេនៃផលគុណអនុគមន៍" },
      { label: "ដេរីវេ u/v", formula: "(u/v)' = (u'v - v'u)/v²", explanation: "ដេរីវេនៃផលចែកអនុគមន៍ (v មិនសូន្យ)" },
      { label: "ដេរីវេ sqrt(u)", formula: "(√u)' = u'/(2√u)", explanation: "ដេរីវេនៃឫសការ៉េនៃអនុគមន៍" }
    ]
  },
  {
    id: "derivative-trig-formulas",
    category: "derivative",
    titleKh: "៤.៣ ដេរីវេនៃអនុគមន៍ត្រីកោណមាត្រ",
    title: "Trigonometric Derivatives Formulas",
    contentMarkdown: `### ដេរីវេនៃអនុគមន៍ត្រីកោណមាត្រ (Trigonometric Derivatives)
រូបមន្តដេរីវេនៃអនុគមន៍ត្រីកោណមាត្រ និងអនុគមន៍ច្រាស (ចំពោះ $u$ ជាអនុគមន៍នៃ $x$)៖

#### ១. អនុគមន៍ត្រីកោណមាត្រគ្រឹះ
*   $(\\sin x)' = \\cos x \\quad \\implies \\quad (\\sin u)' = u' \\cos u$
*   $(\\cos x)' = -\\sin x \\quad \\implies \\quad (\\cos u)' = -u' \\sin u$
*   $(\\tan x)' = \\frac{1}{\\cos^2 x} = 1 + \\tan^2 x \\quad \\implies \\quad (\\tan u)' = u'\\left(1 + \\tan^2 u\\right) = \\frac{u'}{\\cos^2 u}$
*   $(\\cot x)' = -\\frac{1}{\\sin^2 x} = -\\left(1 + \\cot^2 x\\right) \\quad \\implies \\quad (\\cot u)' = -u'\\left(1 + \\cot^2 u\\right) = -\\frac{u'}{\\sin^2 u}$

#### ២. អនុគមន៍ច្រាសត្រីកោណមាត្រ (Inverse Trig)
*   $(\\arcsin u)' = \\frac{u'}{\\sqrt{1 - u^2}}$
*   $(\\arccos u)' = -\\frac{u'}{\\sqrt{1 - u^2}}$
*   $(\\arctan u)' = \\frac{u'}{1 + u^2}$
*   $(\\arccot u)' = -\\frac{u'}{1 + u^2}$`,
    formulas: [
      { label: "ដេរីវេ sin(u)", formula: "(sin u)' = u' cos u", explanation: "ដេរីវេនៃស៉ីនុសអនុគមន៍បណ្តាក់" },
      { label: "ដេរីវេ cos(u)", formula: "(cos u)' = -u' sin u", explanation: "ដេរីវេនៃកូស៉ីនុសអនុគមន៍បណ្តាក់" },
      { label: "ដេរីវេ tan(u)", formula: "(tan u)' = u'(1 + tan²u)", explanation: "ដេរីវេនៃតង់សង់អនុគមន៍បណ្តាក់" }
    ]
  },
  {
    id: "derivative-exp-log",
    category: "derivative",
    titleKh: "៤.៤ ដេរីវេនៃអនុគមន៍អិចស្ប៉ូណង់ស្យែល និងឡូការីត",
    title: "Exp & Log Derivatives Formulas",
    contentMarkdown: `### ដេរីវេនៃអិចស្ប៉ូណង់ស្យែល និងឡូការីត (Exp & Log Derivatives)
រូបមន្តដេរីវេដែលប្រើប្រាស់គោល $e$ និងគោល $a$ ទូទៅ៖

#### ១. អនុគមន៍អិចស្ប៉ូណង់ស្យែល (Exponential)
*   $(e^x)' = e^x \\quad \\implies \\quad (e^u)' = u' e^u$
*   $(a^x)' = a^x \\ln a \\quad \\implies \\quad (a^u)' = u' a^u \\ln a$ (ចំពោះ $a > 0$)

#### ២. អនុគមន៍ឡូការីត (Logarithmic)
*   $(\\ln x)' = \\frac{1}{x} \\quad \\implies \\quad (\\ln u)' = \\frac{u'}{u}$ (ចំពោះ $u > 0$)
*   $(\\log_a x)' = \\frac{1}{x \\ln a} \\quad \\implies \\quad (\\log_a u)' = \\frac{u'}{u \\ln a}$ (ចំពោះ $a > 0 , a \\neq 1$)`,
    formulas: [
      { label: "ដេរីវេ e^u", formula: "(e^u)' = u' e^u", explanation: "ដេរីវេអិចស្ប៉ូណង់ស្យែលបណ្តាក់គោល e" },
      { label: "ដេរីវេ ln u", formula: "(ln u)' = u'/u", explanation: "ដេរីវេឡូការីតនេពែនៃអនុគមន៍ u" }
    ]
  },
  {
    id: "derivative-higher-order",
    category: "derivative",
    titleKh: "៤.៥ ដេរីវេដឺក្រេខ្ពស់ និងដេរីវេទី n",
    title: "Higher-Order Derivatives",
    contentMarkdown: `### ដេរីវេដឺក្រេខ្ពស់ និងដេរីវេទី $n$ (Higher-Order Derivatives)
#### ១. និយមន័យដេរីវេបន្តបន្ទាប់
ដេរីវេដឺក្រេខ្ពស់ គឺជាដេរីវេដែលកើតឡើងពីការធ្វើដេរីវេបន្តបន្ទាប់លើអនុគមន៍ដេរីវេមុន៖
*   ដេរីវេទី២៖ $y'' = f''(x) = (f'(x))' = \\frac{d^2 y}{dx^2}$
*   ដេរីវេទី៣៖ $y''' = f'''(x) = (f''(x))' = \\frac{d^3 y}{dx^3}$
*   ដេរីវេទី $n$៖ $y^{(n)} = f^{(n)}(x) = (f^{(n-1)}(x))' = \\frac{d^n y}{dx^n}$

#### ២. រូបមន្តដេរីវេទី $n$ នៃអនុគមន៍ពិសេសមួយចំនួន៖
*   ចំពោះ $y = \\sin x \\implies y^{(n)} = \\sin\\left(x + \\frac{n\\pi}{2}\\right)$
*   ចំពោះ $y = \\cos x \\implies y^{(n)} = \\cos\\left(x + \\frac{n\\pi}{2}\\right)$
*   ចំពោះ $y = e^x \\implies y^{(n)} = e^x$
*   ចំពោះ $y = e^{ax+b} \\implies y^{(n)} = a^n e^{ax+b}$
*   ចំពោះ $y = \\frac{1}{x} \\implies y^{(n)} = (-1)^n \\frac{n!}{x^{n+1}}$`,
    formulas: [
      { label: "ដេរីវេទី n នៃ sin(x)", formula: "y⁽ⁿ⁾ = sin(x + nπ/2)", explanation: "រូបមន្តដេរីវេទី n វិលជុំជាវដ្តនៃស៉ីនុស" },
      { label: "ដេរីវេទី n នៃ e^(ax)", formula: "y⁽ⁿ⁾ = aⁿ e^(ax)", explanation: "រូបមន្តដេរីវេទី n នៃអនុគមន៍អិចស្ប៉ូណង់ស្យែល" }
    ]
  },
  {
    id: "derivative-theorems",
    category: "derivative",
    titleKh: "៤.៦ ទ្រឹស្តីបទដេរីវេ (រ៉ូល និងតម្លៃមធ្យម)",
    title: "Rolle & Mean Value Theorems",
    contentMarkdown: `### ទ្រឹស្តីបទដេរីវេ (Rolle's & Mean Value Theorems)
#### ១. ទ្រឹស្តីបទរ៉ូល (Rolle's Theorem)
បើអនុគមន៍ $f$ ជាប់លើចន្លោះបិទ $[a, b]$ មានដេរីវេលើចន្លោះបើក $(a, b)$ និងមាន $f(a) = f(b)$ នោះមានចំនួនពិត $c \\in (a, b)$ យ៉ាងហោចណាស់មួយដែល៖
$$f'(c) = 0$$

#### ២. ទ្រឹស្តីបទតម្លៃមធ្យម (Mean Value Theorem / Lagrange)
បើអនុគមន៍ $f$ ជាប់លើចន្លោះបិទ $[a, b]$ និងមានដេរីវេលើចន្លោះបើក $(a, b)$ នោះមានចំនួនពិត $c \\in (a, b)$ យ៉ាងហោចណាស់មួយដែល៖
$$f'(c) = \\frac{f(b) - f(a)}{b - a}$$

#### ៣. វិសមភាពកំណើនមានកំណត់
បើ $f$ មានដេរីវេលើចន្លោះ $I$៖
*   បើមាន $m$ និង $M$ ដែល $m \\leq f'(x) \\leq M$ នោះចំពោះគ្រប់ $a, b \\in I$ ($a < b$)៖
    $$m(b - a) \\leq f(b) - f(a) \\leq M(b - a)$$
*   បើមានចំនួនពិត $M > 0$ ដែល $|f'(x)| \\leq M$ នោះចំពោះគ្រប់ $a, b \\in I$៖
    $$|f(b) - f(a)| \\leq M |b - a|$$`,
    formulas: [
      { label: "ទ្រឹស្តីបទតម្លៃមធ្យម", formula: "f'(c) = (f(b)-f(a))/(b-a)", explanation: "មានចំណុច c ដែលបន្ទាត់ប៉ះក្រាបស្របនឹងខ្សែកាត់ AB" },
      { label: "វិសមភាពកំណើនមានកំណត់", formula: "|f(b)-f(a)| ≤ M|b-a|", explanation: "ការកំណត់ព្រំដែនផលដកនៃតម្លៃអនុគមន៍" }
    ]
  },
  {
    id: "derivative-applications",
    category: "derivative",
    titleKh: "៤.៧ អនុវត្តដេរីវេ (ល្បឿន សំទុះ និងបរមា)",
    title: "Velocity, Acceleration & Optimization",
    contentMarkdown: `### 應用ដេរីវេ (Velocity, Acceleration & Extremum)
#### ១. ល្បឿន និងសំទុះក្នុងរូបវិទ្យា (Velocity & Acceleration)
បើ $S(t)$ ជាសមីការចលនា (ចម្ងាយចរធៀបនឹងពេល $t$) នោះ៖
*   **ល្បឿនខណៈ $V(t)$** គឺជាដេរីវេទី ១ នៃចម្ងាយ៖
    $$V(t) = S'(t) = \\frac{dS}{dt}$$
*   **សំទុះខណៈ $a(t)$** គឺជាដេរីវេទី ១ នៃល្បឿន ឬដេរីវេទី ២ នៃចម្ងាយ៖
    $$a(t) = V'(t) = S''(t) = \\frac{d^2 S}{dt^2}$$

#### ២. តម្លៃបរមាធៀបនៃអនុគមន៍ (Extremum)
*   បើ $f'(x) > 0$ ចំពោះ $x < x_0$ , $f'(x_0) = 0$ , $f'(x) < 0$ ចំពោះ $x > x_0 \\implies f(x)$ មាន **អតិបរមាធៀបត្រង់ $x_0$** ដែលតម្លៃអតិបរមាគឺ $y = f(x_0)$។
*   បើ $f'(x) < 0$ ចំពោះ $x < x_0$ , $f'(x_0) = 0$ , $f'(x) > 0$ ចំពោះ $x > x_0 \\implies f(x)$ មាន **អប្បបរមាធៀបត្រង់ $x_0$** ដែលតម្លៃអប្បបរមាគឺ $y = f(x_0)$។
*   **ការប្រើដេរីវេទី ២**៖ បើ $f'(x_0) = 0$៖
    *   បើ $f''(x_0) < 0 \\implies f$ មានអតិបរមាធៀបត្រង់ $x_0$。
    *   បើ $f''(x_0) > 0 \\implies f$ មានអប្បបរមាធៀបត្រង់ $x_0$。`,
    formulas: [
      { label: "ល្បឿនខណៈ", formula: "V(t) = S'(t)", explanation: "អត្រាបម្រែបម្រួលចម្ងាយធៀបនឹងពេលវេលា" },
      { label: "សំទុះខណៈ", formula: "a(t) = V'(t) = S''(t)", explanation: "អត្រាបម្រែបម្រួលល្បឿនធៀបនឹងពេលវេលា" }
    ]
  },
  {
    id: "derivative-differential",
    category: "derivative",
    titleKh: "៤.១១ ឌីផេរ៉ង់ស្យែល",
    title: "Differential",
    contentMarkdown: `### ឌីផេរ៉ង់ស្យែល (Differential)
បើអនុគមន៍ $y = f(x)$ មានដេរីវេ នោះឌីផេរ៉ង់ស្យែល $dy$ នៃអនុគមន៍កំណត់តាងដោយ៖
$$dy = f'(x) dx$$

ឌីផេរ៉ង់ស្យែលត្រូវបានប្រើប្រាស់ជាទូទៅក្នុងគណិតវិទ្យាដើម្បីធ្វើការប៉ាន់ស្មានតម្លៃ (Linear Approximation) នៅពេលបម្រែបម្រួល $x$ មានទំហំតូច ($dx \\approx \\Delta x$)៖
$$f(x + \\Delta x) \\approx f(x) + f'(x) \\Delta x$$`,
    formulas: [
      { label: "ឌីផេរ៉ង់ស្យែល dy", formula: "dy = f'(x) dx", explanation: "រូបមន្តសម្រាប់គណនាឌីផេរ៉ង់ស្យែលនៃ y" }
    ]
  }
];
