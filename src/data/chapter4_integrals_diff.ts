import { Topic } from "../types";

export const INTEGRAL_DIFF_TOPICS: Topic[] = [
  // --- CHAPTER 5: INDEFINITE INTEGRALS ---
  {
    id: "integral-indefinite-concept",
    category: "indefinite-integral",
    titleKh: "៥.១ ព្រីមីទីវ និងសញ្ញាណអាំងតេក្រាលមិនកំណត់",
    title: "Primitive & Indefinite Integral",
    contentMarkdown: `### ព្រីមីទីវ និងសញ្ញាណអាំងតេក្រាលមិនកំណត់ (Primitive & Indefinite Integral)
#### ១. ព្រីមីទីវ (Primitive / Antiderivative)
អនុគមន៍ $F(x)$ ជាព្រីមីទីវនៃអនុគមន៍ $f(x)$ លើចន្លោះ $I$ លុះត្រាតែគ្រប់ $x \\in I$៖
$$F'(x) = f(x)$$
*   បើ $F(x)$ ជាព្រីមីទីវមួយនៃ $f(x)$ នោះព្រីមីទីវទាំងអស់នៃ $f(x)$ មានទម្រង់ទូទៅ $F(x) + c$ ដែល $c \\in \\mathbb{R}$ ជាចំនួនពិតថេរ។

#### ២. អាំងតេក្រាលមិនកំណត់ (Indefinite Integral)
សំណុំព្រីមីទីវទាំងអស់នៃ $f(x)$ ហៅថាអាំងតេក្រាលមិនកំណត់នៃ $f(x)$ និមិត្តសញ្ញា៖
$$\\int f(x) dx = F(x) + c$$
ដែល៖
*   $\\int$ ជាសញ្ញាអាំងតេក្រាល
*   $f(x)$ ជាអនុគមន៍ក្រោមសញ្ញាអាំងតេក្រាល (Integrand)
*   $dx$ បញ្ជាក់ថាអថេរនៃអាំងតេក្រាលគឺ $x$
*   $c$ ជាថេរអាំងតេក្រាល`,
    formulas: [
      { label: "និយមន័យអាំងតេក្រាល", formula: "∫ f(x) dx = F(x) + c ⇔ F'(x) = f(x)", explanation: "ទំនាក់ទំនងបញ្ច្រាសគ្នាដ៏សំខាន់រវាងដេរីវេ និងអាំងតេក្រាល" }
    ]
  },
  {
    id: "integral-indefinite-rules",
    category: "indefinite-integral",
    titleKh: "៥.២ រូបមន្តគ្រឹះនៃអាំងតេក្រាលមិនកំណត់",
    title: "Basic Integration Formulas",
    contentMarkdown: `### រូបមន្តគ្រឹះនៃអាំងតេក្រាលមិនកំណត់ (Basic Integration Formulas)
លក្ខណៈ និងរូបមន្តគ្រឹះអាំងតេក្រាលមិនកំណត់ចំពោះថេរ $k, c$ និងអថេរ $x$៖

#### ១. លក្ខណៈគ្រឹះ (Properties)
*   $\\int k \\cdot f(x) dx = k \\int f(x) dx \\quad (k \\in \\mathbb{R})$
*   $\\int [f(x) + g(x) - h(x)] dx = \\int f(x) dx + \\int g(x) dx - \\int h(x) dx$

#### ២. រូបមន្តអាំងតេក្រាលអនុគមន៍ពិជគណិត និងពិសេសៗ
*   $\\int k dx = kx + c$
*   $\\int x^n dx = \\frac{x^{n+1}}{n + 1} + c \\quad (n \\neq -1)$
*   $\\int \\frac{1}{x^2} dx = -\\frac{1}{x} + c$
*   $\\int \\frac{1}{\\sqrt{x}} dx = 2\\sqrt{x} + c$
*   $\\int \\frac{1}{x} dx = \\ln|x| + c$
*   $\\int e^x dx = e^x + c$
*   $\\int a^x dx = \\frac{a^x}{\\ln a} + c \\quad (a > 0 , a \\neq 1)$`,
    formulas: [
      { label: "អាំងតេក្រាលស្វ័យគុណ", formula: "∫ xⁿ dx = xⁿ⁺¹/(n+1) + c", explanation: "រូបមន្តស្នូលសម្រាប់អនុគមន៍ពហុធា (n != -1)" },
      { label: "អាំងតេក្រាល 1/x", formula: "∫ 1/x dx = ln|x| + c", explanation: "លទ្ធផលជាឡូការីតនេពែនៃតម្លៃដាច់ខាត" },
      { label: "អាំងតេក្រាល e^x", formula: "∫ e^x dx = e^x + c", explanation: "អនុគមន៍អិចស្ប៉ូណង់ស្យែលរក្សាតម្លៃដដែល" }
    ]
  },
  {
    id: "integral-indefinite-trig",
    category: "indefinite-integral",
    titleKh: "៥.៣ រូបមន្តអាំងតេក្រាលត្រីកោណមាត្រ និងអ៊ីពែបូលីក",
    title: "Trigonometric & Hyperbolic Integration",
    contentMarkdown: `### រូបមន្តអាំងតេក្រាលត្រីកោណមាត្រ និងអ៊ីពែបូលីក (Trigonometric & Hyperbolic)
រូបមន្តអាំងតេក្រាលមិនកំណត់នៃអនុគមន៍ត្រីកោណមាត្រ និងអ៊ីពែបូលីក៖

#### ១. អនុគមន៍ត្រីកោណមាត្រ (Trigonometric)
*   $\\int \\sin x dx = -\\cos x + c$
*   $\\int \\cos x dx = \\sin x + c$
*   $\\int (1 + \\tan^2 x) dx = \\int \\frac{1}{\\cos^2 x} dx = \\tan x + c$
*   $\\int (1 + \\cot^2 x) dx = \\int \\frac{1}{\\sin^2 x} dx = -\\cot x + c$
*   $\\int \\tan x dx = -\\ln|\\cos x| + c$
*   $\\int \\cot x dx = \\ln|\\sin x| + c$

#### ២. អនុគមន៍អ៊ីពែបូលីក (Hyperbolic)
*   $\\int \\sinh x dx = \\cosh x + c$
*   $\\int \\cosh x dx = \\sinh x + c$
*   $\\int \\tanh x dx = \\ln|\\cosh x| + c$
*   $\\int \\coth x dx = \\ln|\\sinh x| + c$
*   $\\int \\frac{1}{1 + x^2} dx = \\arctan x + c$
*   $\\int \\frac{1}{\\sqrt{1 - x^2}} dx = \\arcsin x + c$`,
    formulas: [
      { label: "អាំងតេក្រាលស៉ីនុស", formula: "∫ sin x dx = -cos x + c", explanation: "លទ្ធផលជាដកកូស៉ីនុស" },
      { label: "អាំងតេក្រាលកូស៉ីនុស", formula: "∫ cos x dx = sin x + c", explanation: "លទ្ធផលជាស៉ីនុស" },
      { label: "អាំងតេក្រាល 1/(cos²x)", formula: "∫ 1/(cos²x) dx = tan x + c", explanation: "រូបមន្តបំប្លែងទៅជាតង់សង់" }
    ]
  },
  {
    id: "integral-indefinite-methods",
    category: "indefinite-integral",
    titleKh: "៥.៤ វិធីសាស្ត្រគណនា ( substitution, by parts, ILATE )",
    title: "Substitution & Integration by Parts",
    contentMarkdown: `### វិធីសាស្ត្រគណនាអាំងតេក្រាល (Integration Methods)
ដើម្បីដោះស្រាយអាំងតេក្រាលស្មុគស្មាញ យើងមានវិធីសាស្ត្រសំខាន់ៗពីរ៖

#### ១. វិធីសាស្ត្រប្តូរអថេរជំនួស (Integration by Substitution)
បើអាំងតេក្រាលមានរាង $I = \\int f[g(x)] \\cdot g'(x) dx$៖
1.  តាង $u = g(x)$ នាំឱ្យ $du = g'(x) dx$
2.  ជំនួសចូលក្នុងអាំងតេក្រាល៖ $I = \\int f(u) du = F(u) + c$
3.  ជំនួស $u = g(x)$ ត្រឡប់មកវិញ៖ $I = F[g(x)] + c$

#### ២. វិធីសាស្ត្រអាំងតេក្រាលដោយផ្នែក (Integration by Parts)
$$ \\int u dv = uv - \\int v du $$
*   **ច្បាប់ ILATE** សម្រាប់ជ្រើសរើសតាង $u$ (រាប់ពីឆ្វេងទៅស្តាំ អាទិភាពខ្ពស់ជាងគេជា $u$)៖
    *   **I** - Inverse Trig (arcsin, arccos, arctan)
    *   **L** - Logarithmic (ln, log)
    *   **A** - Algebraic (1, x, $x^2$, $3x$)
    *   **T** - Trigonometric (sin, cos, tan)
    *   **E** - Exponential ($e^x$, $3^x$)`,
    formulas: [
      { label: "រូបមន្តអាំងតេក្រាលដោយផ្នែក", formula: "∫ u dv = uv - ∫ v du", explanation: "វិធីសាស្ត្របំបែកផលគុណនៃអនុគមន៍ពីរផ្សេងគ្នា" },
      { label: "រូបមន្តប្តូរអថេរជំនួស u", formula: "∫ f(g(x))g'(x)dx = ∫ f(u)du", explanation: "វិធីសាស្ត្រសម្រួលកន្សោមដោយតាងអនុគមន៍ថ្មី" }
    ]
  },

  // --- CHAPTER 6: DEFINITE INTEGRALS ---
  {
    id: "integral-definite-concept",
    category: "definite-integral",
    titleKh: "៦.១ សញ្ញាណ និងលក្ខណៈនៃអាំងតេក្រាលកំណត់",
    title: "Concept of Definite Integrals",
    contentMarkdown: `### សញ្ញាណ និងលក្ខណៈនៃអាំងតេក្រាលកំណត់ (Definite Integrals)
#### ១. និយមន័យ
បើ $F(x)$ ជាព្រីមីទីវមួយនៃ $f(x)$ ជាប់លើ $[a, b]$ នោះអាំងតេក្រាលកំណត់ពី $a$ ទៅ $b$ នៃ $f(x)$ គឺ៖
$$\\int_{a}^{b} f(x) dx = [F(x)]_a^b = F(b) - F(a)$$

#### ២. លក្ខណៈនៃអាំងតេក្រាលកំណត់ (Properties)
*   $\\int_{a}^{a} f(x) dx = 0$
*   $\\int_{a}^{b} f(x) dx = -\\int_{b}^{a} f(x) dx$
*   $\\int_{a}^{b} f(x) dx = \\int_{a}^{c} f(x) dx + \\int_{c}^{b} f(x) dx$ (លក្ខណៈ Chasles)
*   $\\int_{-a}^{a} f(x) dx = 2\\int_{0}^{a} f(x) dx \\quad (\\text{បើ } f \\text{ ជាអនុគមន៍គូ})$
*   $\\int_{-a}^{a} f(x) dx = 0 \\quad (\\text{បើ } f \\text{ ជាអនុគមន៍សេស})$
*   $\\int_{a}^{b} f(x) dx = \\int_{a}^{b} f(a + b - x) dx$`,
    formulas: [
      { label: "រូបមន្ត Leibniz-Newton", formula: "∫_a^b f(x) dx = F(b) - F(a)", explanation: "ការគណនាតម្លៃអាំងតេក្រាលកំណត់ពី a ទៅ b" },
      { label: "លក្ខណៈ Chasles", formula: "∫_a^b + ∫_b^c = ∫_a^c", explanation: "ការបំបែកអាំងតេក្រាលតាមចំណុចកណ្តាល c" }
    ]
  },
  {
    id: "integral-applications-geometry",
    category: "definite-integral",
    titleKh: "៦.២ អនុវត្តអាំងតេក្រាល (ផ្ទៃក្រឡា និងមាឌសូលីត)",
    title: "Geometric Applications",
    contentMarkdown: `### អនុវត្តអាំងតេក្រាលកំណត់ក្នុងធរណីមាត្រ (Applications in Geometry)
#### ១. ផ្ទៃក្រឡានៃដែនប្លង់ (Area under Curve)
*   **ករណីខណ្ឌដោយក្រាប $y = f(x)$ និងអ័ក្ស $Ox$ ($x = a , x = b$)**៖
    *   បើ $f(x) \\geq 0 \\implies S = \\int_{a}^{b} f(x) dx$
    *   បើ $f(x) \\leq 0 \\implies S = -\\int_{a}^{b} f(x) dx$
*   **ករណីខណ្ឌដោយក្រាបពីរ $y = f(x)$ និង $y = g(x)$** ដែល $f(x) \\geq g(x)$៖
    $$S = \\int_{a}^{b} [f(x) - g(x)] dx$$

#### ២. មាឌសូលីតបដិវត្តន៍ (Volume of Solids of Revolution)
*   **តង្វិលជុំវិញអ័ក្សអាប់ស៊ីស $Ox$ ($y = f(x)$)**៖
    $$V = \\pi \\int_{a}^{b} [f(x)]^2 dx$$
*   **តង្វិលខណ្ឌដោយក្រាបពីរ $y = f(x)$ និង $y = g(x)$** ដែល $f(x) \\geq g(x)$៖
    $$V = \\pi \\int_{a}^{b} \\left([f(x)]^2 - [g(x)]^2\\right) dx$$
*   **តង្វិលជុំវិញអ័ក្សអរដោនេ $Oy$ ($x = f(y)$)**៖
    $$V = \\pi \\int_{c}^{d} [f(y)]^2 dy$$

#### ៣. ប្រវែងធ្នូនៃខ្សែគោង (Arc Length)
$$L = \\int_{a}^{b} \\sqrt{1 + [f'(x)]^2} dx$$`,
    formulas: [
      { label: "រូបមន្តផ្ទៃក្រឡា", formula: "S = ∫_a^b |f(x)| dx", explanation: "ផ្ទៃក្រឡាខណ្ឌដោយអនុគមន៍ f(x) និងអ័ក្ស Ox" },
      { label: "រូបមន្តមាឌ (ជុំវិញ Ox)", formula: "V = π ∫_a^b [f(x)]² dx", explanation: "មាឌសូលីតបដិវត្តន៍បង្កើតឡើងដោយបង្វិលក្រាបជុំវិញ Ox" },
      { label: "រូបមន្តប្រវែងធ្នូ", formula: "L = ∫_a^b √(1 + [f'(x)]²) dx", explanation: "ប្រវែងនៃខ្សែគោងលើចន្លោះ [a,b]" }
    ]
  },

  // --- CHAPTER 7 & 8: DIFFERENTIAL EQUATIONS ---
  {
    id: "diff-eq-first-order",
    category: "diff-eq-1",
    titleKh: "៧.១ សមីការឌីផេរ៉ង់ស្យែលលំដាប់ទី១ (ញែកអថេរ និងលីនេអ៊ែរ)",
    title: "1st Order Differential Equations",
    contentMarkdown: `### សមីការឌីផេរ៉ង់ស្យែលលំដាប់ទី១ (1st Order Differential Equations)
សមីការឌីផេរ៉ង់ស្យែលលំដាប់ទី១ គឺជាសមីការដែលទាក់ទងនឹងអនុគមន៍ $y$ និងដេរីវេទី១ $y' = \\frac{dy}{dx}$។

#### ១. សមីការញែកអថេរបាន (Separable Equations)
មានទម្រង់ $g(y) \\frac{dy}{dx} = f(x) \\implies g(y) dy = f(x) dx$
*   **ដំណោះស្រាយទូទៅ**៖ ធ្វើអាំងតេក្រាលលើអង្គទាំងពីរ៖
    $$\\int g(y) dy = \\int f(x) dx + c$$

#### ២. សមីការលីនេអ៊ែរលំដាប់ទី១ មេគុណថេរអូម៉ូសែន (Homogeneous)
មានទម្រង់ $y' + ay = 0$ (ដែល $a \\text{ ជាចំនួនពិត}$)៖
*   **ដំណោះស្រាយទូទៅ**៖
    $$y = A \\cdot e^{-ax} \\quad (A \\text{ ជាចំនួនពិតថេរ})$$

#### ៣. សមីការលីនេអ៊ែរលំដាប់ទី១ មេគុណថេរមិនអូម៉ូសែន (Non-Homogeneous)
មានទម្រង់ $y' + ay = p(x)$៖
*   **ដំណោះស្រាយទូទៅ**៖ ស្មើនឹងផលបូកចម្លើយអូម៉ូសែន $y_c$ និងចម្លើយពិសេស $y_p$៖
    $$y = y_c + y_p = c \\cdot e^{-ax} + e^{-ax} \\int e^{ax} p(x) dx$$`,
    formulas: [
      { label: "ចម្លើយ y' + ay = 0", formula: "y = A · e^(-ax)", explanation: "ដំណោះស្រាយនៃសមីការអូម៉ូសែនលំដាប់ទី១" },
      { label: "ចម្លើយ y' + ay = p(x)", formula: "y = ce^(-ax) + e^(-ax) ∫ e^(ax) p(x) dx", explanation: "ដំណោះស្រាយសមីការមិនអូម៉ូសែនដោយប្រើកត្តាសមាហរណកម្ម" }
    ]
  },
  {
    id: "diff-eq-second-order",
    category: "diff-eq-2",
    titleKh: "៨.១ សមីការឌីផេរ៉ង់ស្យែលលំដាប់ទី២ មេគុណថេរ",
    title: "2nd Order Differential Equations",
    contentMarkdown: `### សមីការឌីផេរ៉ង់ស្យែលលំដាប់ទី២ (2nd Order Differential Equations)
មានទម្រង់ទូទៅ $ay'' + by' + cy = 0$ ដែល $a, b, c$ ជាចំនួនពិត និង $a \\neq 0$។

#### ១. សមីការសម្គាល់ (Characteristic Equation)
$$ar^2 + br + c = 0 \\quad \\implies \\quad \\Delta = b^2 - 4ac$$

#### ២. ដំណោះស្រាយទូទៅតាមករណី $\\Delta$៖
*   **ករណី $\\Delta > 0$**៖ សមីការសម្គាល់មានឫសពិតពីរផ្សេងគ្នា $r_1 , r_2$៖
    $$y = A \\cdot e^{r_1 x} + B \\cdot e^{r_2 x} \\quad (A, B \\text{ ជាចំនួនពិតថេរ})$$
*   **ករណី $\\Delta = 0$**៖ សមីការសម្គាល់មានឫសឌុប $r_1 = r_2 = r = -\\frac{b}{2a}$៖
    $$y = (Ax + B)e^{rx}$$
*   **ករណី $\\Delta < 0$**៖ សមីការសម្គាល់មានឫសជាចំនួនកុំផ្លិចឆ្លាស់ $r = \\alpha \\pm i\\beta$៖
    $$y = e^{\\alpha x} (A \\cos \\beta x + B \\sin \\beta x)$$`,
    formulas: [
      { label: "ចម្លើយករណី Δ > 0", formula: "y = A·e^(r₁x) + B·e^(r₂x)", explanation: "ឫសសម្គាល់ផ្សេងគ្នាជាចំនួនពិតពីរ" },
      { label: "ចម្លើយករណី Δ = 0", formula: "y = (Ax + B)e^(rx)", explanation: "ឫសសម្គាល់ឌុបជាចំនួនពិត" },
      { label: "ចម្លើយករណី Δ < 0", formula: "y = e^(αx)(A cos βx + B sin βx)", explanation: "ឫសសម្គាល់ជាចំនួនកុំផ្លិចឆ្លាស់ α ± iβ" }
    ]
  }
];
