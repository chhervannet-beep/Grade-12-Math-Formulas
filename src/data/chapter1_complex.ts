import { Topic } from "../types";

export const COMPLEX_TOPICS: Topic[] = [
  {
    id: "complex-review",
    category: "complex",
    titleKh: "១.១ រំលឹក (រូបមន្តត្រីកោណមាត្រ)",
    title: "Trigonometric Formulas Review",
    contentMarkdown: `### រំលឹកឡើងវិញអំពី រូបមន្តត្រីកោណមាត្រ (Trigonometric Formulas Review)
នៅក្នុងមេរៀនចំនួនកុំផ្លិច ការយល់ដឹងពីត្រីកោណមាត្រគឺពិតជាមានសារៈសំខាន់ខ្លាំងណាស់សម្រាប់ការបំប្លែងទៅជាទម្រង់ត្រីកោណមាត្រ។

#### ១. ទំនាក់ទំនងរវាងមុំបំពេញគ្នា (Complementary Angles)
*   $\\cos\\left(\\frac{\\pi}{2} - \\alpha\\right) = \\sin\\alpha$
*   $\\sin\\left(\\frac{\\pi}{2} - \\alpha\\right) = \\cos\\alpha$

#### ២. ទំនាក់ទំនងរវាងមុំបន្ថែម (Supplementary Angles)
*   $\\cos(\\pi - \\alpha) = -\\cos\\alpha$
*   $\\sin(\\pi - \\alpha) = \\sin\\alpha$

#### ៣. មុំផ្ទុយគ្នា (Opposite Angles)
*   $\\cos(-\\alpha) = \\cos\\alpha$
*   $\\sin(-\\alpha) = -\\sin\\alpha$

#### ៤. រូបមន្តទ្វេមុំ និងរូបមន្តបន្ថយដឺក្រេ (Double Angle & Half Angle Formulas)
*   $\\sin\\alpha = 2\\sin\\frac{\\alpha}{2}\\cos\\frac{\\alpha}{2}$
*   $1 - \\cos\\alpha = 2\\sin^2\\frac{\\alpha}{2}$
*   $1 + \\cos\\alpha = 2\\cos^2\\frac{\\alpha}{2}$

#### ៥. ទំនាក់ទំនងគ្រឹះ (Fundamental Identities)
*   $\\sin^2\\alpha + \\cos^2\\alpha = 1$
*   $\\tan\\alpha \\cdot \\cot\\alpha = 1$`,
    formulas: [
      { label: "ស៉ីនុសការ៉េ + កូស៉ីនុសការ៉េ", formula: "sin²α + cos²α = 1", explanation: "ទំនាក់ទំនងគ្រឹះរវាងស៉ីនុស និងកូស៉ីនុស" },
      { label: "រូបមន្តមុំឌុប ស៉ីនុស", formula: "sin α = 2 sin(α/2) cos(α/2)", explanation: "បំបែកស៉ីនុសមុំ α ទៅជាកន្លះមុំ" },
      { label: "រូបមន្តមុំបន្ថយកូស៉ីនុសដក", formula: "1 - cos α = 2 sin²(α/2)", explanation: "បំប្លែងផលដកកូស៉ីនុសទៅជាស៉ីនុសការ៉េ" },
      { label: "រូបមន្តមុំបន្ថយកូស៉ីនុសបូក", formula: "1 + cos α = 2 cos²(α/2)", explanation: "បំប្លែងផលបូកកូស៉ីនុសទៅជាកូស៉ីនុសការ៉េ" }
    ]
  },
  {
    id: "complex-concept",
    category: "complex",
    titleKh: "១.២ សញ្ញាណចំនួនកុំផ្លិច និងកុំផ្លិចឆ្លាស់",
    title: "Concept of Complex & Conjugate",
    contentMarkdown: `### សញ្ញាណចំនួនកុំផ្លិច និងកុំផ្លិចឆ្លាស់ (Concept of Complex Numbers)
ចំនួនកុំផ្លិច គឺជាចំនួនដែលមានទម្រង់ $a + bi$ ដែល $a$ និង $b$ ជាចំនួនពិត ហើយ $i$ ជាឯកតានិម្មិត។

#### ១. ឯកតានិម្មិត (Imaginary Unit)
*   $i^2 = -1$

#### ២. ទម្រង់ពិជគណិត (Algebraic Form)
*   $z = a + bi$
*   $a = \\text{Re}(z)$ ហៅថា **ផ្នែកពិត (Real Part)**
*   $b = \\text{Im}(z)$ ហៅថា **ផ្នែកនិម្មិត (Imaginary Part)**

#### ៣. ចំនួនកុំផ្លិចឆ្លាស់ (Conjugate)
បើ $z = a + bi$ នោះចំនួនកុំផ្លិចឆ្លាស់នៃ $z$ គឺ៖
*   $\\bar{z} = a - bi$

#### ៤. ចំនួនកុំផ្លិចផ្ទុយ (Opposite)
បើ $z = a + bi$ នោះចំនួនកុំផ្លិចផ្ទុយនៃ $z$ គឺ៖
*   $-z = -a - bi$`,
    formulas: [
      { label: "ទម្រង់ពិជគណិត", formula: "z = a + bi", explanation: "a ជាផ្នែកពិត, b ជាផ្នែកនិម្មិត និង i² = -1" },
      { label: "ចំនួនកុំផ្លិចឆ្លាស់", formula: "z̅ = a - bi", explanation: "ប្តូរសញ្ញាផ្នែកនិម្មិតពីបូកទៅដក" },
      { label: "ចំនួនកុំផ្លិចផ្ទុយ", formula: "-z = -a - bi", explanation: "ប្តូរសញ្ញាទាំងផ្នែកពិត និងផ្នែកនិម្មិត" }
    ]
  },
  {
    id: "complex-equal-powers",
    category: "complex",
    titleKh: "១.៣ ចំនួនកុំផ្លិចស្មើគ្នា និងស្វ័យគុណនៃ i",
    title: "Equality & Powers of i",
    contentMarkdown: `### ចំនួនកុំផ្លិចស្មើគ្នា និងស្វ័យគុណនៃ $i$ (Equality & Powers of i)
#### ១. ចំនួនកុំផ្លិចស្មើគ្នា (Equality)
គេមានចំនួនកុំផ្លិចពីរ $z = a + bi$ និង $w = c + di$៖
*   $z = 0 \\iff a = 0$ និង $b = 0$
*   $z = w \\iff a = c$ និង $b = d$

#### ២. ស្វ័យគុណនៃ $i$ (Powers of $i$)
ស្វ័យគុណនៃឯកតានិម្មិត $i$ មានតម្លៃវិលជុំជាវដ្តដែលមាន ៤ តម្លៃផ្សេងគ្នាគឺ $\\{1, i, -1, -i\\}$ ចំពោះគ្រប់ $n \\in \\mathbb{N}$៖
*   បើ $n = 4k \\implies i^n = i^{4k} = 1$
*   បើ $n = 4k+1 \\implies i^n = i^{4k+1} = i$
*   បើ $n = 4k+2 \\implies i^n = i^{4k+2} = -1$
*   បើ $n = 4k+3 \\implies i^n = i^{4k+3} = -i$`,
    formulas: [
      { label: "លក្ខខណ្ឌស្មើគ្នា", formula: "a + bi = c + di ⇔ a = c, b = d", explanation: "ផ្នែកពិតស្មើគ្នា និងផ្នែកនិម្មិតស្មើគ្នា" },
      { label: "ស្វ័យគុណ i ចែកដាច់នឹង ៤", formula: "i^(4k) = 1", explanation: "សំណល់ ០ លទ្ធផល ១" },
      { label: "ស្វ័យគុណ i សំណល់ ១", formula: "i^(4k+1) = i", explanation: "សំណល់ ១ លទ្ធផល i" },
      { label: "ស្វ័យគុណ i សំណល់ ២", formula: "i^(4k+2) = -1", explanation: "សំណល់ ២ លទ្ធផល -1" },
      { label: "ស្វ័យគុណ i សំណល់ ៣", formula: "i^(4k+3) = -i", explanation: "សំណល់ ៣ លទ្ធផល -i" }
    ]
  },
  {
    id: "complex-equations",
    category: "complex",
    titleKh: "១.៤ ដំណោះស្រាយសមីការដឺក្រេទីពីរ",
    title: "Solving Quadratic Equations",
    contentMarkdown: `### ដំណោះស្រាយសមីការដឺក្រេទីពីរក្នុងសំណុំកុំផ្លិច (Solving Quadratic Equations)
សមីការដឺក្រេទីពីរមានទម្រង់ $ax^2 + bx + c = 0$ ដែល $a, b, c$ ជាចំនួនពិត និង $a \\neq 0$។

#### ករណីឌីស្រ្គីមីណង់ $\\Delta < 0$៖
សមីការមានឫសពីរជាចំនួនកុំផ្លិចឆ្លាស់គ្នា៖
$$z_1 = \\frac{-b + i\\sqrt{-\\Delta}}{2a} \\quad \\text{និង} \\quad z_2 = \\overline{z_1} = \\frac{-b - i\\sqrt{-\\Delta}}{2a}$$

#### ឧទាហរណ៍៖
ដោះស្រាយសមីការ $z^2 - 2z + 5 = 0$៖
$\\Delta = (-2)^2 - 4(1)(5) = 4 - 20 = -16 < 0$
ឫសទាំងពីរគឺ៖
$z_1 = \\frac{2 + i\\sqrt{16}}{2} = 1 + 2i$
$z_2 = 1 - 2i$`,
    formulas: [
      { label: "ឫសទី១ (Δ < 0)", formula: "z₁ = (-b + i√-Δ)/2a", explanation: "ឫសកុំផ្លិចទីមួយ" },
      { label: "ឫសទី២ (Δ < 0)", formula: "z₂ = (-b - i√-Δ)/2a", explanation: "ឫសកុំផ្លិចទីពីរ (ជាកុំផ្លិចឆ្លាស់នៃ z₁)" }
    ]
  },
  {
    id: "complex-operations",
    category: "complex",
    titleKh: "១.៥ ប្រមាណវិធីលើចំនួនកុំផ្លិច",
    title: "Arithmetic Operations",
    contentMarkdown: `### ប្រមាណវិធីលើចំនួនកុំផ្លិច (Arithmetic Operations on Complex Numbers)
ឧបមាថាគេមានចំនួនកុំផ្លិចពីរ $z = a + bi$ និង $w = c + di$ ដែល $a, b, c, d \\in \\mathbb{R}$។

#### ១. ផលបូក (Addition)
$$z + w = (a + c) + (b + d)i$$

#### ២. ផលដក (Subtraction)
$$z - w = (a - c) + (b - d)i$$

#### ៣. ផលគុណ (Multiplication)
$$z \\times w = (ac - bd) + (ad + bc)i$$

#### ៤. ផលចែក (Division)
$$\\frac{z}{w} = \\frac{a + bi}{c + di} = \\frac{(a + bi)(c - di)}{c^2 + d^2} = \\left(\\frac{ac + bd}{c^2 + d^2}\\right) + \\left(\\frac{bc - ad}{c^2 + d^2}\\right)i$$`,
    formulas: [
      { label: "ផលបូក", formula: "(a+bi) + (c+di) = (a+c) + (b+d)i", explanation: "បូកផ្នែកពិត និងផ្នែកនិម្មិតរៀងៗខ្លួន" },
      { label: "ផលគុណ", formula: "(a+bi)(c+di) = (ac-bd) + (ad+bc)i", explanation: "លទ្ធផលពង្រាត់ពិជគណិតដោយជំនួស i² = -1" },
      { label: "ផលចែក", formula: "z/w = (ac+bd)/(c²+d²) + i(bc-ad)/(c²+d²)", explanation: "គុណភាគបែងនឹងចំនួនកុំផ្លិចឆ្លាស់ w̅" }
    ]
  },
  {
    id: "complex-properties-modulus",
    category: "complex",
    titleKh: "១.៦ លក្ខណៈនៃកុំផ្លិចឆ្លាស់ និងម៉ូឌុល",
    title: "Conjugate Properties & Modulus",
    contentMarkdown: `### លក្ខណៈនៃចំនួនកុំផ្លិចឆ្លាស់ និងម៉ូឌុល (Properties & Modulus)
#### ១. លក្ខណៈនៃចំនួនកុំផ្លិចឆ្លាស់
*   $\\overline{W + Z} = \\bar{W} + \\bar{Z}$
*   $\\overline{W - Z} = \\bar{W} - \\bar{Z}$
*   $\\overline{W \\cdot Z} = \\bar{W} \\cdot \\bar{Z}$
*   $\\overline{\\left(\\frac{W}{Z}\\right)} = \\frac{\\bar{W}}{\\bar{Z}}$ (ចំពោះ $Z \\neq 0$)

#### ២. ម៉ូឌុលនៃចំនួនកុំផ្លិច (Modulus)
ម៉ូឌុលនៃចំនួនកុំផ្លិច $z = a + bi$ គឺជាចម្ងាយពីគល់តម្រុយ $O$ ទៅចំណុចរូបភាព $M(a, b)$៖
$$|z| = r = \\sqrt{a^2 + b^2}$$

#### ៣. លក្ខណៈនៃម៉ូឌុល
*   $|z| = |\\bar{z}|$ និង $|z|^2 = z \\cdot \\bar{z}$
*   $|z_1 \\cdot z_2| = |z_1| \\cdot |z_2|$
*   $\\left|\\frac{z_1}{z_2}\\right| = \\frac{|z_1|}{|z_2|}$
*   $|z_1 + z_2| \\leq |z_1| + |z_2|$ (វិសមភាពត្រីកោណ)`,
    formulas: [
      { label: "រូបមន្តម៉ូឌុល", formula: "|z| = √(a² + b²)", explanation: "គណនាចម្ងាយពីគល់តម្រុយទៅចំណុច z" },
      { label: "ទំនាក់ទំនងឆ្លាស់", formula: "|z|² = z · z̅", explanation: "ផលគុណនៃចំនួនកុំផ្លិចនឹងចំនួនកុំផ្លិចឆ្លាស់របស់វា" }
    ]
  },
  {
    id: "complex-polar",
    category: "complex",
    titleKh: "១.៧ អាគុយម៉ង់ និងទម្រង់ត្រីកោណមាត្រ",
    title: "Argument & Trigonometric Form",
    contentMarkdown: `### អាគុយម៉ង់ និងទម្រង់ត្រីកោណមាត្រ (Argument & Polar Form)
#### ១. អាគុយម៉ង់នៃចំនួនកុំផ្លិច (Argument)
មុំ $\\theta$ ដែលកំណត់ដោយវ៉ិចទ័រ $(\\vec{Ox}, \\overrightarrow{OM})$ ហៅថាអាគុយម៉ង់នៃ $z$ ($z \\neq 0$)៖
$$\\cos\\theta = \\frac{a}{r} \\quad ; \\quad \\sin\\theta = \\frac{b}{r}$$
ដែល $r = \\sqrt{a^2 + b^2}$។ គេសរសេរ $\\arg(z) = \\theta + 2k\\pi$ ($k \\in \\mathbb{Z}$)។

#### ២. ទម្រង់ត្រីកោណមាត្រ (Trigonometric Form)
$$z = r(\\cos\\theta + i\\sin\\theta)$$

#### ៣. លក្ខណៈពិសេសមួយចំនួន៖
*   បើ $z = \\cos A - i\\sin A \\implies z = \\cos(-A) + i\\sin(-A)$
*   បើ $z = -\\cos A + i\\sin A \\implies z = \\cos(\\pi - A) + i\\sin(\\pi - A)$
*   បើ $z = -\\cos A - i\\sin A \\implies z = \\cos(\\pi + A) + i\\sin(\\pi + A)$
*   បើ $z = \\sin A + i\\cos A \\implies z = \\cos\\left(\\frac{\\pi}{2} - A\\right) + i\\sin\\left(\\frac{\\pi}{2} - A\\right)$`,
    formulas: [
      { label: "ទម្រង់ត្រីកោណមាត្រ", formula: "z = r(cos θ + i sin θ)", explanation: "ទម្រង់ប៉ូលែនៃចំនួនកុំផ្លិច z" },
      { label: "កូស៉ីនុសមុំអាគុយម៉ង់", formula: "cos θ = a / r", explanation: "សមាមាត្រ Re(z) និងម៉ូឌុល r" },
      { label: "ស៉ីនុសមុំអាគុយម៉ង់", formula: "sin θ = b / r", explanation: "សមាមាត្រ Im(z) និងម៉ូឌុល r" }
    ]
  },
  {
    id: "complex-trig-ops",
    category: "complex",
    titleKh: "១.៨ ផលគុណ ផលចែក និងការវិលជុំ",
    title: "Trigonometric Operations & Rotation",
    contentMarkdown: `### ផលគុណ ផលចែក និងការវិលជុំក្នុងប្លង់កុំផ្លិច (Trig Operations & Rotation)
គេមាន $z_1 = r_1(\\cos\\theta_1 + i\\sin\\theta_1)$ និង $z_2 = r_2(\\cos\\theta_2 + i\\sin\\theta_2)$៖

#### ១. ផលគុណ (Product)
$$z_1 \\cdot z_2 = r_1 r_2 [\\cos(\\theta_1 + \\theta_2) + i\\sin(\\theta_1 + \\theta_2)]$$
*   $|z_1 z_2| = |z_1| \\cdot |z_2|$
*   $\\arg(z_1 z_2) = \\arg(z_1) + \\arg(z_2)$

#### ២. ផលចែក (Quotient)
$$\\frac{z_1}{z_2} = \\frac{r_1}{r_2} [\\cos(\\theta_1 - \\theta_2) + i\\sin(\\theta_1 - \\theta_2)]$$
*   $\\left|\\frac{z_1}{z_2}\\right| = \\frac{|z_1|}{|z_2|}$
*   $\\arg\\left(\\frac{z_1}{z_2}\\right) = \\arg(z_1) - \\arg(z_2)$

#### ៣. បំប្លែងវិលជុំវិញគល់តម្រុយ $O$ មុំ $\\alpha$
រូបភាព $M'(z')$ នៃចំណុច $M(z)$ តាមបំប្លែងវិលផ្ចិត $O$ និងមុំ $\\alpha$ កំណត់ដោយ៖
$$z' = (\\cos\\alpha + i\\sin\\alpha)z$$`,
    formulas: [
      { label: "ផលគុណត្រីកោណមាត្រ", formula: "z₁·z₂ = r₁r₂[cos(θ₁+θ₂) + i sin(θ₁+θ₂)]", explanation: "ម៉ូឌុលគុណគ្នា អាគុយម៉ង់បូកគ្នា" },
      { label: "ផលចែកត្រីកោណមាត្រ", formula: "z₁/z₂ = (r₁/r₂)[cos(θ₁-θ₂) + i sin(θ₁-θ₂)]", explanation: "ម៉ូឌុលចែកគ្នា អាគុយម៉ង់ដកគ្នា" },
      { label: "រូបមន្តបំប្លែងវិលជុំ", formula: "z' = (cos α + i sin α)z", explanation: "បង្វិលចំនួនកុំផ្លិច z ជុំវិញគល់ O មុំ α" }
    ]
  },
  {
    id: "complex-roots-powers",
    category: "complex",
    titleKh: "១.៩ ស្វ័យគុណទី n, រូបមន្តដឺម័រ និងឫសទី n",
    title: "Powers, De Moivre & n-th Roots",
    contentMarkdown: `### ស្វ័យគុណទី $n$, រូបមន្តដឺម័រ និងឫសទី $n$ (Powers & Roots)
#### ១. ស្វ័យគុណទី $n$ នៃចំនួនកុំផ្លិច
បើ $z = r(\\cos\\theta + i\\sin\\theta)$ នោះស្វ័យគុណទី $n$ គឺ៖
$$z^n = [r(\\cos\\theta + i\\sin\\theta)]^n = r^n(\\cos n\\theta + i\\sin n\\theta)$$

#### ២. រូបមន្តដឺម័រ (De Moivre's Formula)
$$(\\cos\\theta + i\\sin\\theta)^n = \\cos n\\theta + i\\sin n\\theta \\quad (\\text{គ្រប់ } n \\in \\mathbb{Z}^+)$$

#### ៣. ឫសទី $n$ នៃចំនួនកុំផ្លិច (n-th Roots)
បើ $z = r(\\cos\\theta + i\\sin\\theta)$ ជាចំនួនកុំផ្លិចមិនសូន្យ។ ឫសទី $n$ នៃ $z$ កំណត់ដោយ៖
$$w_k = \\sqrt[n]{r} \\left[ \\cos\\left(\\frac{\\theta + 2k\\pi}{n}\\right) + i\\sin\\left(\\frac{\\theta + 2k\\pi}{n}\\right) \\right]$$
ដែល $k = 0, 1, 2, \\dots, n-1$។`,
    formulas: [
      { label: "រូបមន្តដឺម័រ", formula: "(cos θ + i sin θ)ⁿ = cos(nθ) + i sin(nθ)", explanation: "រូបមន្តសម្រាប់គណនាស្វ័យគុណ" },
      { label: "ឫសទី n", formula: "w_k = ⁿ√r [cos((θ+2kπ)/n) + i sin((θ+2kπ)/n)]", explanation: "ឫសទាំង n ផ្សេងគ្នានៃ z" }
    ]
  },
  {
    id: "complex-geometry-triangle",
    category: "complex",
    titleKh: "១.១០ ចម្ងាយ ចំណុចចែកអង្កត់ និងផលធៀបត្រីកោណ",
    title: "Geometry in Complex Plane",
    contentMarkdown: `### ធរណីមាត្រក្នុងប្លង់កុំផ្លិច (Geometry in Complex Plane)
#### ១. ចម្ងាយរវាងពីរចំណុច
ចម្ងាយរវាងពីរចំណុច $A(z_1)$ និង $B(z_2)$ គឺ៖
$$AB = |z_2 - z_1| = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

#### ២. ចំណុចចែកអង្កត់តាមផលធៀប
បើចំណុច $P(z)$ ស្ថិតនៅលើបន្ទាត់ $AB$ ហើយចែក $AB$ តាមផលធៀប $m:n$ នោះ៖
$$z = \\frac{z_1 + \\lambda z_2}{1 + \\lambda} \\quad \\text{ដែល } \\lambda = \\frac{m}{n}$$
*   បើ $\\lambda = 1 \\implies P$ ស្ថិតនៅកណ្តាលអង្កត់ $AB$
*   បើ $\\lambda > 0 \\implies P$ ស្ថិតនៅចន្លោះ $A$ និង $B$
*   បើ $\\lambda < 0 \\implies P$ ស្ថិតនៅក្រៅអង្កត់ $AB$

#### ៣. ផលធៀបជ្រុង និងមុំនៃត្រីកោណ
បើកំពូលទាំងបីនៃត្រីកោណ $ABC$ មានកូអរដោនេរៀងគ្នា $A(z)$, $B(z_1)$ និង $C(z_2)$ នោះ៖
$$\\frac{AC}{BC} = \\left| \\frac{z_2 - z}{z_1 - z} \\right| \\quad \\text{និង} \\quad \\angle BAC = \\arg\\left( \\frac{z_2 - z}{z_1 - z} \\right)$$`,
    formulas: [
      { label: "រូបមន្តចម្ងាយ AB", formula: "AB = |z₂ - z₁|", explanation: "ចម្ងាយរវាងពីរចំណុច" },
      { label: "ចំណុចកណ្តាលអង្កត់", formula: "z_I = (z_A + z_B)/2", explanation: "ករណី λ = 1 ចំណុចកណ្តាល" },
      { label: "ផលធៀបមុំត្រីកោណ", formula: "∠BAC = arg((z₂-z)/(z₁-z))", explanation: "មុំ ∠BAC ក្នុងប្លង់កុំផ្លិច" }
    ]
  }
];
