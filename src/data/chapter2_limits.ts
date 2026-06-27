import { Topic } from "../types";

export const LIMIT_TOPICS: Topic[] = [
  {
    id: "limit-review",
    category: "limit",
    titleKh: "២.១ រំលឹក (លីមីតនៃអនុគមន៍)",
    title: "Limits Review & Indeterminate Forms",
    contentMarkdown: `### រំលឹកឡើងវិញអំពី លីមីតនៃអនុគមន៍ (Limits Review)
លីមីតនៃអនុគមន៍ គឺជាគំនិតគន្លឹះគ្រឹះក្នុងការសិក្សាការវិវឌ្ឍន៍របស់អនុគមន៍។

#### ១. រូបមន្តគ្រឹះនៃលីមីត
បើ $\\lim_{x \\to a} f(x) = L$ និង $\\lim_{x \\to a} g(x) = M$៖
*   $\\lim_{x \\to a} [f(x) \\pm g(x)] = L \\pm M$
*   $\\lim_{x \\to a} [f(x) \\cdot g(x)] = L \\cdot M$
*   $\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\frac{L}{M} \\quad (M \\neq 0)$
*   $\\lim_{x \\to a} [f(x)]^n = L^n$
*   $\\lim_{x \\to a} \\sqrt[n]{f(x)} = \\sqrt[n]{L}$

#### ២. រាងមិនកំណត់គ្រឹះ (Indeterminate Forms)
ក្នុងសមីការលីមីត យើងតែងជួបប្រទះទម្រង់មិនទាន់កំណត់តម្លៃបានផ្ទាល់ភ្លាមៗ រួមមាន៖
$$\\frac{0}{0} \\quad , \\quad \\frac{\\infty}{\\infty} \\quad , \\quad +\\infty - \\infty \\quad , \\quad 0 \\cdot \\infty \\quad , \\quad 1^\\infty$$
យើងត្រូវបំប្លែងកន្សោមដោយសម្រួលកត្តារួម ឬប្រើកន្សោមឆ្លាស់មុននឹងគណនា។`,
    formulas: [
      { label: "លីមីតផលបូក", formula: "lim (f + g) = lim f + lim g", explanation: "លីមីតនៃផលបូកស្មើផលបូកលីមីត" },
      { label: "រាងមិនកំណត់គ្រឹះ", formula: "0/0, ∞/∞, +∞-∞", explanation: "ទម្រង់មិនទាន់អាចគណនាតម្លៃលីមីតបានភ្លាមៗ" }
    ]
  },
  {
    id: "limit-concept",
    category: "limit",
    titleKh: "២.២ សញ្ញាណនៃលីមីត និងលីមីតឆ្វេង-ស្តាំ",
    title: "Existence & Left/Right Limits",
    contentMarkdown: `### សញ្ញាណនៃលីមីត និងលីមីតឆ្វេង-ស្តាំ (Left & Right Limits)
លីមីតនៃអនុគមន៍ $f(x)$ កាលណា $x$ ខិតជិត $a$ មានតម្លៃស្មើ $L$ លុះត្រាតែលីមីតឆ្វេង និងលីមីតស្តាំមានតម្លៃស្មើគ្នា និងស្មើ $L$។

#### ១. លីមីតឆ្វេង (Left-hand Limit)
តម្លៃលីមីតនៅពេល $x$ ខិតជិត $a$ ពីខាងឆ្វេង ($x < a$)៖
$$\\lim_{x \\to a^-} f(x) = L$$

#### ២. លីមីតស្តាំ (Right-hand Limit)
តម្លៃលីមីតនៅពេល $x$ ខិតជិត $a$ ពីខាងស្តាំ ($x > a$)៖
$$\\lim_{x \\to a^+} f(x) = L$$

#### ៣. លក្ខខណ្ឌអត្ថិភាពនៃលីមីត (Existence of Limit)
$$\\lim_{x \\to a} f(x) = L \\iff \\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = L$$`,
    formulas: [
      { label: "អត្ថិភាពនៃលីមីត", formula: "lim_(x→a⁻) f(x) = lim_(x→a⁺) f(x) = L", explanation: "លីមីតឆ្វេងស្មើខាងស្តាំ ទើបមានលីមីតទូទៅ" }
    ]
  },
  {
    id: "limit-concept-def",
    category: "limit",
    titleKh: "២.៣ លីមីតតាមនិយមន័យ (ε-δ)",
    title: "Limits by Definition",
    contentMarkdown: `### លីមីតតាមនិយមន័យ (Limits by Definition)
ការបញ្ជាក់លីមីតឱ្យបានច្បាស់លាស់តាមបែបគណិតវិទ្យា គឺប្រើប្រាស់និយមន័យដែលទាក់ទងនឹងចំនួនតូច $\\epsilon$ (អេបស៊ីឡូន) និង $\\delta$ (ដែលតា)។

#### ១. លីមីតកាលណា $x \\to a$ មានតម្លៃស្មើ $L$៖
$$\\lim_{x \\to a} f(x) = L \\iff \\forall \\epsilon > 0 \\, , \\, \\exists \\delta > 0 : 0 < |x - a| < \\delta \\implies |f(x) - L| < \\epsilon$$

#### ២. លីមីតកាលណា $x \\to a$ មានតម្លៃស្មើ $\\pm\\infty$៖
$$\\lim_{x \\to a} f(x) = +\\infty \\iff \\forall M > 0 \\, , \\, \\exists \\delta > 0 : 0 < |x - a| < \\delta \\implies f(x) > M$$
$$\\lim_{x \\to a} f(x) = -\\infty \\iff \\forall M > 0 \\, , \\, \\exists \\delta > 0 : 0 < |x - a| < \\delta \\implies f(x) < -M$$`,
    formulas: [
      { label: "លីមីតចុងកំណត់ (ε-δ)", formula: "|x-a| < δ => |f(x)-L| < ε", explanation: "និយមន័យលីមីតចុងកំណត់" },
      { label: "លីមីតអនន្ត", formula: "|x-a| < δ => f(x) > M", explanation: "និយមន័យលីមីតខិតជិតរកវិជ្ជមានអនន្ត" }
    ]
  },
  {
    id: "limit-rules",
    category: "limit",
    titleKh: "២.៤ ប្រមាណវិធីលើលីមីត",
    title: "Limit Operations",
    contentMarkdown: `### ប្រមាណវិធីលើលីមីត (Operations on Limits)
ឧបមាថា $\\lim_{x \\to a} f(x) = L$ , $\\lim_{x \\to a} g(x) = M$ , $\\lim_{x \\to a} h(x) = N$ ដែល $L, M, N$ ជាចំនួនពិត៖

#### ១. លីមីតផលបូក ផលដក ផលគុណ និងផលចែក
*   $\\lim_{x \\to a} [f(x) \\pm g(x)] = L \\pm M$
*   $\\lim_{x \\to a} [f(x) + g(x) - h(x)] = L + M - N$
*   $\\lim_{x \\to a} [k \\cdot f(x)] = kL \\quad (k \\text{ ជាចំនួនថេរ})$
*   $\\lim_{x \\to a} [f(x) \\cdot g(x) \\cdot h(x)] = L \\cdot M \\cdot N$
*   $\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\frac{L}{M} \\quad (M \\neq 0 \\, , \\, g(a) \\neq 0)$
*   $\\lim_{x \\to a} [f(x)]^n = L^n$
*   $\\lim_{x \\to a} \\sqrt[n]{f(x)} = \\sqrt[n]{L} \\quad (\\text{បើ } n \\text{ គូ ត្រូវឱ្យ } L > 0)$
*   $\\lim_{x \\to a} f[g(x)] = f(M)$`,
    formulas: [
      { label: "លីមីតផលគុណ", formula: "lim (f · g) = L · M", explanation: "លីមីតនៃផលគុណស្មើផលគុណនៃលីមីត" },
      { label: "លីមីតផលចែក", formula: "lim (f / g) = L / M", explanation: "លីមីតនៃផលចែកស្មើផលចែកនៃលីមីត (ភាគបែងមិនសូន្យ)" },
      { label: "លីមីតអនុគមន៍បណ្តាក់", formula: "lim f[g(x)] = f(M)", explanation: "លីមីតនៃអនុគមន៍បណ្តាក់" }
    ]
  },
  {
    id: "limit-calculation-rational",
    category: "limit",
    titleKh: "២.៥ របៀបគណនាលីមីតរាងមិនកំណត់",
    title: "Techniques for Indeterminate Forms",
    contentMarkdown: `### របៀបគណនាលីមីតរាងមិនកំណត់ (How to calculate Indeterminate Limits)
#### ១. របៀបដោះស្រាយរាងមិនកំណត់ $\\frac{0}{0}$
*   **ចំពោះអនុគមន៍ពិជគណិត**៖ ត្រូវដាក់ភាគយក និងភាគបែងជាផលគុណកត្តា រួចសម្រួលកត្តារួម $(x - a)$ ចោល រួចគណនាលីមីតនៃកន្សោមថ្មី។
*   **ចំពោះអនុគមន៍មានរ៉ាឌីកាល់**៖ ត្រូវគុណភាគយក និងភាគបែងនឹងកន្សោមឆ្លាស់ រួចសម្រួលកត្តារួមចោល។

#### ២. របៀបដោះស្រាយរាងមិនកំណត់ $\\frac{\\infty}{\\infty}$
*   ត្រូវដាក់តួដែលមានដឺក្រេខ្ពស់ជាងគេបំផុតនៅភាគយក និងភាគបែងជាកត្តារួម រួចសម្រួលកត្តារួមចោល រួចគណនាលីមីតនៃកន្សោមថ្មី។

#### ៣. របៀបដោះស្រាយរាងមិនកំណត់ $+\\infty - \\infty$
*   ត្រូវដាក់តួដែលមានដឺក្រេខ្ពស់ជាងគេជាកត្តារួម ឬគុណនឹងកន្សោមឆ្លាស់ រួចគណនាលីមីតនៃកន្សោមថ្មី។`,
    formulas: [
      { label: "សម្រួលកត្តារួមរាង 0/0", formula: "P(x)/Q(x) = (x-a)P₁(x) / (x-a)Q₁(x) = P₁(x)/Q₁(x)", explanation: "សម្រួលចោលកត្តាដែលធ្វើឱ្យសូន្យ" },
      { label: "ដាក់ដឺក្រេខ្ពស់បំផុតរាង ∞/∞", formula: "lim xⁿ(a + b/x + ...) / xᵐ(c + d/x + ...)", explanation: "ប្រៀបធៀបដឺក្រេភាគយក និងភាគបែង" }
    ]
  },
  {
    id: "limit-trigonometric",
    category: "limit",
    titleKh: "២.៦ លីមីតនៃអនុគមន៍ត្រីកោណមាត្រ",
    title: "Trigonometric Limits",
    contentMarkdown: `### លីមីតនៃអនុគមន៍ត្រីកោណមាត្រ (Trigonometric Limits)
មេរៀនលីមីតត្រីកោណមាត្រផ្អែកលើទ្រឹស្តីបទស្នូលសំខាន់ៗខាងក្រោម៖

#### ១. ទ្រឹស្តីបទគ្រឹះ
បើ $x$ ជារង្វាស់មុំ ឬធ្នូគិតជារ៉ាដ្យង់ នោះ៖
*   $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$
*   $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = 0$
*   $\\lim_{x \\to 0} \\frac{\\tan x}{x} = 1$

#### ២. វិបាក (Corollaries)
បើ $x \\to 0 \\implies u(x) \\to 0$ នោះ៖
*   $\\lim_{u \\to 0} \\frac{\\sin u}{u} = 1$
*   $\\lim_{u \\to 0} \\frac{1 - \\cos u}{u} = 0$
*   $\\lim_{u \\to 0} \\frac{\\tan u}{u} = 1$`,
    formulas: [
      { label: "លីមីតស៉ីនុសគ្រឹះ", formula: "lim_(x→0) (sin x)/x = 1", explanation: "លីមីតស្នូលនៃត្រីកោណមាត្រ" },
      { label: "លីមីតកូស៉ីនុសដក", formula: "lim_(x→0) (1-cos x)/x = 0", explanation: "ដកកូស៉ីនុសលើ x ខិតជិតសូន្យ" },
      { label: "លីមីតតង់សង់", formula: "lim_(x→0) (tan x)/x = 1", explanation: "តង់សង់លើ x ខិតជិតសូន្យ" }
    ]
  },
  {
    id: "limit-exponential",
    category: "limit",
    titleKh: "២.៧ លីមីតនៃអនុគមន៍អិចស្ប៉ូណង់ស្យែល",
    title: "Exponential Limits",
    contentMarkdown: `### លីមីតនៃអនុគមន៍អិចស្ប៉ូណង់ស្យែល (Exponential Limits)
រូបមន្តលីមីតនៃអនុគមន៍អិចស្ប៉ូណង់ស្យែលដែលត្រូវចងចាំ៖

#### ១. លីមីតនៅអនន្ត (Limits at Infinity)
*   $\\lim_{x \\to +\\infty} e^x = +\\infty$
*   $\\lim_{x \\to -\\infty} e^x = 0$
*   $\\lim_{x \\to +\\infty} \\frac{e^x}{x} = +\\infty$
*   $\\lim_{x \\to +\\infty} \\frac{x}{e^x} = 0$
*   $\\lim_{x \\to +\\infty} \\frac{e^x}{x^n} = +\\infty \\quad (n > 0)$
*   $\\lim_{x \\to +\\infty} \\frac{x^n}{e^x} = 0 \\quad (n > 0)$

#### ២. លីមីតនៅជិតសូន្យ (Limits at 0)
*   $\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1$
*   $\\lim_{u \\to 0} \\frac{e^{u(x)} - 1}{u(x)} = 1 \\quad (\\text{បើ } x \\to 0 \\implies u(x) \\to 0)$`,
    formulas: [
      { label: "លីមីត e^x នៅអនន្ត", formula: "lim_(x→+∞) e^x = +∞", explanation: "កើនឡើងរកវិជ្ជមានអនន្ត" },
      { label: "លីមីត e^x/xⁿ", formula: "lim_(x→+∞) e^x/xⁿ = +∞", explanation: "អិចស្ប៉ូណង់ស្យែលកើនឡើងលឿនជាងពហុធា" },
      { label: "លីមីត (e^x-1)/x", formula: "lim_(x→0) (e^x-1)/x = 1", explanation: "ដោះស្រាយរាងមិនកំណត់ 0/0" }
    ]
  },
  {
    id: "limit-logarithmic",
    category: "limit",
    titleKh: "២.៨ លីមីតនៃអនុគមន៍ឡូការីត",
    title: "Logarithmic Limits",
    contentMarkdown: `### លីមីតនៃអនុគមន៍ឡូការីត (Logarithmic Limits)
ឡូការីតនេពែ (ឡូការីតគោល $e$ សរសេរ $\\ln x$) មានរូបមន្តលីមីតសំខាន់ៗ៖

#### ១. លីមីតនៅអនន្ត និងសូន្យបូក
*   $\\lim_{x \\to +\\infty} \\ln x = +\\infty$
*   $\\lim_{x \\to 0^+} \\ln x = -\\infty$
*   $\\lim_{x \\to 0^+} x \\ln x = 0$
*   $\\lim_{x \\to 0^+} x^n \\ln x = 0$
*   $\\lim_{x \\to +\\infty} \\frac{\\ln x}{x} = 0$
*   $\\lim_{x \\to +\\infty} \\frac{\\ln x}{x^n} = 0 \\quad (n > 0)$
*   $\\lim_{x \\to +\\infty} \\frac{x}{\\ln x} = +\\infty$
*   $\\lim_{x \\to +\\infty} \\frac{x^n}{\\ln x} = +\\infty \\quad (n > 0)$

#### ២. លីមីតនៅជិតសូន្យ និងមួយ
*   $\\lim_{x \\to 0} \\frac{\\ln(1 + x)}{x} = 1$
*   $\\lim_{u \\to 0} \\frac{\\ln[1 + u(x)]}{u(x)} = 1 \\quad (\\text{បើ } x \\to 0 \\implies u(x) \\to 0)$`,
    formulas: [
      { label: "លីមីត ln x/xⁿ", formula: "lim_(x→+∞) (ln x)/xⁿ = 0", explanation: "ឡូការីតកើនឡើងយឺតជាងពហុធា" },
      { label: "លីមីត ln(1+x)/x", formula: "lim_(x→0) ln(1+x)/x = 1", explanation: "ដោះស្រាយរាងមិនកំណត់ 0/0" }
    ]
  },
  {
    id: "limit-rational-formulas",
    category: "limit",
    titleKh: "២.៩ រូបមន្តលីមីតនៃអនុគមន៍សនិទាន",
    title: "Rational Function Limits Theorems",
    contentMarkdown: `### រូបមន្តលីមីតនៃអនុគមន៍សនិទាន (Rational Limits Formulas)
#### ទ្រឹស្តីបទគន្លឹះ៖
បើ $P(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_0$ និង $Q(x) = b_m x^m + b_{m-1} x^{m-1} + \\dots + b_0$ គឺជាពហុធាពីរ ដែល $a_i , b_i \\in \\mathbb{R}$ ជាចំនួនថេរ និង $\\lim_{x \\to \\alpha} \\frac{P(x)}{Q(x)} = \\frac{P(\\alpha)}{Q(\\alpha)} = \\frac{0}{0}$៖

នោះគេអាចសម្រួលកត្តារួម $(x - \\alpha)$ ចេញពីពហុធាទាំងពីរ៖
$$P(x) = (x - \\alpha)[a_n x^{n-1} + (\\alpha a_n + a_{n-1})x^{n-2} + \\dots]$$
$$Q(x) = (x - \\alpha)[b_m x^{m-1} + (\\alpha b_m + b_{m-1})x^{m-2} + \\dots]$$

រួចសម្រួលកត្តា $(x - \\alpha)$ ចោល៖
$$\\lim_{x \\to \\alpha} \\frac{P(x)}{Q(x)} = \\lim_{x \\to \\alpha} \\frac{a_n x^{n-1} + (\\alpha a_n + a_{n-1})x^{n-2} + \\dots}{b_m x^{m-1} + (\\alpha b_m + b_{m-1})x^{m-2} + \\dots}$$`,
    formulas: [
      { label: "បំបែកកត្តា (x-α)", formula: "P(x) = (x-α) · P₁(x)", explanation: "ការប្រើវិធីចែកពហុធា ឬវិធីសាស្ត្រ Horner" }
    ]
  },
  {
    id: "limit-sandwich-lhopital",
    category: "limit",
    titleKh: "២.១០ ទ្រឹស្តីបទសាំងវិច និងទ្រឹស្តីបទឡូពីតាល់",
    title: "Sandwich & L'Hôpital Theorems",
    contentMarkdown: `### ទ្រឹស្តីបទសាំងវិច និងទ្រឹស្តីបទឡូពីតាល់ (Sandwich & L'Hôpital)
#### ១. ទ្រឹស្តីបទសាំងវិច (Sandwich / Squeeze Theorem)
បើអនុគមន៍ $f$ , $g$ , $h$ និងចំនួនពិត $A$ ដែល $\\lim_{x \\to +\\infty} g(x) = \\lim_{x \\to +\\infty} h(x) = \\lambda$។
បើ $g(x) \\leq f(x) \\leq h(x)$ ចំពោះគ្រប់ $x \\geq A$ នោះ៖
$$\\lim_{x \\to +\\infty} f(x) = \\lambda$$

#### ២. ទ្រឹស្តីបទឡូពីតាល់ (L'Hôpital's Rule)
ទ្រឹស្តីបទឡូពីតាល់ត្រូវបានប្រើដើម្បីដោះស្រាយរាងមិនកំណត់ $\\frac{0}{0}$ ឬ $\\frac{\\infty}{\\infty}$ យ៉ាងឆាប់រហ័សដោយប្រើដេរីវេ។
បើអនុគមន៍ $f$ និង $g$ មានដេរីវេត្រង់ $x = a$ និង $g'(a) \\neq 0$ នោះ៖
$$\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)} = \\frac{f'(a)}{g'(a)}$$`,
    formulas: [
      { label: "ទ្រឹស្តីបទសាំងវិច", formula: "g(x) ≤ f(x) ≤ h(x) => lim f = λ", explanation: "លីមីតនៃអនុគមន៍កណ្តាលវិលទៅរកតម្លៃដូចគ្នានឹងសងខាង" },
      { label: "ទ្រឹស្តីបទឡូពីតាល់", formula: "lim f(x)/g(x) = lim f'(x)/g'(x)", explanation: "គណនាលីមីតដោយដេរីវេភាគយក និងដេរីវេភាគបែង" }
    ]
  }
];
