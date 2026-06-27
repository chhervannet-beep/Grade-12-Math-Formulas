import { Topic } from "../types";

export const CURVE_SKETCHING_TOPICS: Topic[] = [
  {
    id: "curve-asymptotes",
    category: "curve-sketching",
    titleKh: "១០.១ អាស៊ីមតូត (ឈរ ដេក និងទ្រេត)",
    title: "Asymptotes (Vertical, Horizontal & Oblique)",
    contentMarkdown: `### អាស៊ីមតូតនៃខ្សែកោង (Asymptotes of a Curve)
អាស៊ីមតូត គឺជាបន្ទាត់ដែលខ្សែកោងខិតជិតទៅរកនៅពេលដែលតម្លៃអថេរខិតជិតទៅរកតម្លៃដាច់ ឬខិតទៅរកអនន្ត។

#### ១. អាស៊ីមតូតឈរ (Vertical Asymptote)
បន្ទាត់ $x = a$ ជាអាស៊ីមតូតឈរនៃខ្សែកោងតាង $(C)$ លុះត្រាតែ៖
$$\\lim_{x \\to a^-} f(x) = \\pm\\infty \\quad \\text{ឬ} \\quad \\lim_{x \\to a^+} f(x) = \\pm\\infty$$

#### ២. អាស៊ីមតូតដេក (Horizontal Asymptote)
បន្ទាត់ $y = b$ ជាអាស៊ីមតូតដេកនៃខ្សែកោងតាង $(C)$ លុះត្រាតែ៖
$$\\lim_{x \\to \\pm\\infty} f(x) = b$$

#### ៣. អាស៊ីមតូតទ្រេត (Oblique Asymptote)
បន្ទាត់ $y = ax + b$ ($a \\neq 0$) ជាអាស៊ីមតូតទ្រេតនៃខ្សែកោងតាង $(C)$ កាលណា៖
$$\\lim_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0$$
*   **របៀបរកមេគុណ $a$ និង $b$**៖
    $$a = \\lim_{x \\to \\pm\\infty} \\frac{f(x)}{x} \\quad ; \\quad b = \\lim_{x \\to \\pm\\infty} [f(x) - ax]$$`,
    formulas: [
      { label: "អាស៊ីមតូតឈរ", formula: "lim_(x→a) f(x) = ±∞ ⇒ x = a", explanation: "បន្ទាត់ឈរ x = a ជាអាស៊ីមតូតឈរ" },
      { label: "អាស៊ីមតូតដេក", formula: "lim_(x→±∞) f(x) = b ⇒ y = b", explanation: "បន្ទាត់ដេក y = b ជាអាស៊ីមតូតដេក" },
      { label: "អាស៊ីមតូតទ្រេត", formula: "lim_(x→±∞) [f(x) - (ax+b)] = 0", explanation: "ខ្សែកោងខិតជិតបន្ទាត់ទ្រេត y = ax + b នៅអនន្ត" }
    ]
  },
  {
    id: "curve-symmetry",
    category: "curve-sketching",
    titleKh: "១០.២ ផ្ចិតឆ្លុះ អ័ក្សឆ្លុះ និងចំណុចរបត់",
    title: "Symmetry Elements & Inflection Point",
    contentMarkdown: `### ផ្ចិតឆ្លុះ អ័ក្សឆ្លុះ និងចំណុចរបត់ (Symmetry Elements & Inflection Point)
#### ១. ផ្ចិតឆ្លុះ (Center of Symmetry)
ចំណុច $I(a, b)$ ជាផ្ចិតឆ្លុះនៃខ្សែកោងតាងអនុគមន៍ $f$ លុះត្រាតែចំពោះគ្រប់ $x$ ក្នុងដែនកំណត់ នាំឱ្យ $2a - x$ ស្ថិតក្នុងដែនកំណត់ដែរ និងបំពេញ៖
$$f(2a - x) + f(x) = 2b$$

#### ២. អ័ក្សឆ្លុះ (Axis of Symmetry)
បន្ទាត់ $x = a$ ជាអ័ក្សឆ្លុះនៃខ្សែកោងតាងអនុគមន៍ $f$ លុះត្រាតែចំពោះគ្រប់ $x$ ក្នុងដែនកំណត់ នាំឱ្យ $2a - x$ ស្ថិតក្នុងដែនកំណត់ដែរ និងបំពេញ៖
$$f(2a - x) = f(x)$$

#### ៣. ចំណុចរបត់ (Inflection Point)
ចំណុច $U(x_0, y_0)$ ជាចំណុចរបត់នៃខ្សែកោងតាងអនុគមន៍ $f$ លុះត្រាតែដេរីវេទី២ $f''(x)$ ស្មើនឹងសូន្យត្រង់ $x_0$ ($f''(x_0) = 0$) ហើយប្តូរសញ្ញានៅសងខាង $x_0$។
*   ត្រង់ចំណុចរបត់ ខ្សែកោងផ្លាស់ប្តូរភាពផតពី **ផត (Concave up)** ទៅ **ប៉ោង (Concave down)** ឬច្រាសមកវិញ។`,
    formulas: [
      { label: "លក្ខខណ្ឌផ្ចិតឆ្លុះ I(a,b)", formula: "f(2a - x) + f(x) = 2b", explanation: "ចំណុចឆ្លុះស្មើគ្នារវាងពីរផ្នែកនៃក្រាប" },
      { label: "លក្ខខណ្ឌអ័ក្សឆ្លុះ x=a", formula: "f(2a - x) = f(x)", explanation: "ក្រាបឆ្លុះគ្នាចំពោះបន្ទាត់ឈរ x = a" },
      { label: "ចំណុចរបត់ (Inflection)", formula: "f''(x₀) = 0 & ប្តូរសញ្ញា", explanation: "ចំណុចដែលក្រាបប្តូរពីផតទៅប៉ោង" }
    ]
  },
  {
    id: "curve-rational-functions",
    category: "curve-sketching",
    titleKh: "១០.៣ ជំហានសិក្សា និងការសង់ក្រាបអនុគមន៍សនិទាន",
    title: "Rational Functions Study Steps",
    contentMarkdown: `### ជំហានក្នុងការសិក្សា និងសង់ក្រាបនៃអនុគមន៍ (Steps to Study and Sketch)
ដើម្បីសិក្សា និងសង់ខ្សែកោងតាងអនុគមន៍ យើងត្រូវអនុវត្តតាមលំដាប់លំដោយដូចខាងក្រោម៖

#### ជំហានទី១៖ សិក្សាទិសដៅអថេរភាព (Variation of Function)
1.  រកដែនកំណត់នៃអនុគមន៍ ($D$)
2.  គណនាលីមីតត្រង់ចុងដែនកំណត់ និងរកសមីការអាស៊ីមតូត (បើមាន)
3.  គណនាដេរីវេទី១ $f'(x)$ សិក្សាសញ្ញានៃ $f'(x)$ រួចកំណត់រកតម្លៃបរមា
4.  សង់តារាងអថេរភាព (Variation Table)

#### ជំហានទី២៖ សិក្សាធាតុឆ្លុះ និងចំណុចពិសេស
1.  រកផ្ចិតឆ្លុះ ឬអ័ក្សឆ្លុះ (បើមាន)
2.  រកចំណុចប្រសព្វរវាងខ្សែកោងជាមួយនឹងអ័ក្សកូអរដោនេ ($Ox: y=0$, $Oy: x=0$)
3.  រកចំណុចបន្ថែមខ្លះដើម្បីងាយស្រួលសង់ (បើចាំបាច់)

#### ជំហានទី៣៖ ការសង់ខ្សែកោង
1.  សង់ប្រព័ន្ធកូអរដោនេអរតូណរម៉ាល់ $xOy$
2.  សង់បន្ទាត់អាស៊ីមតូតទាំងអស់ និងចំណុចពិសេស (កំពូល ផ្ចិតឆ្លុះ ចំណុចប្រសព្វ)
3.  គូរខ្សែកោងដោយផ្អែកលើតារាងអថេរភាព`,
    formulas: [
      { label: "អនុគមន៍ឌឺក្រេទី១/ទី១", formula: "y = (ax+b)/(cx+d)", explanation: "មានអាស៊ីមតូតឈរ x = -d/c និងអាស៊ីមតូតដេក y = a/c" },
      { label: "អនុគមន៍ឌឺក្រេទី២/ទី១", formula: "y = (ax²+bx+c)/(dx+e)", explanation: "មានអាស៊ីមតូតឈរ x = -e/d និងអាស៊ីមតូតទ្រេត y = mx + n" }
    ]
  }
];
