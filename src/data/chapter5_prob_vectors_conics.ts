import { Topic } from "../types";

export const PROB_VECTORS_CONICS_TOPICS: Topic[] = [
  // --- CHAPTER 9: PROBABILITY ---
  {
    id: "probability-counting",
    category: "probability",
    titleKh: "៩.១ គោលការណ៍រាប់, ច្រាស់ និងបន្សំ",
    title: "Counting, Permutations & Combinations",
    contentMarkdown: `### គោលការណ៍រាប់, ច្រាស់ និងបន្សំ (Counting, Permutations & Combinations)
#### ១. គោលការណ៍រាប់ (Counting Principles)
*   **គោលការណ៍ផលបូក (Sum Rule)**៖ បើព្រឹត្តិការណ៍ $A$ មាន $m$ ករណី និង $B$ មាន $n$ ករណីគ្មានរួមគ្នា នោះករណី $A$ ឬ $B$ គឺ៖
    $$n(A \\cup B) = n(A) + n(B)$$
*   **គោលការណ៍ផលគុណ (Product Rule)**៖ បើដំណាក់កាលទី១ ធ្វើបាន $m$ របៀប និងដំណាក់កាលទី២ ធ្វើបាន $n$ របៀប នោះវិធីសរុបគឺ៖
    $$N = m \\times n$$

#### ២. ច្រាស់ (Permutations) - គិតលំដាប់
ការតម្រៀបវត្ថុផ្សេងៗគ្នាដោយ **គិតគូរពីលំដាប់**៖
*   **ច្រាស់នៃ $n$ ធាតុ**៖ $P_n = n! = n(n-1)\\dots 2 \\cdot 1$
*   **ច្រាស់យក $r$ ធាតុពី $n$ ធាតុ**៖ $P(n, r) = \\frac{n!}{(n - r)!}$
*   **ច្រាស់វង់នៃ $n$ ធាតុ**៖ $P_{\\text{circle}} = (n-1)!$
*   **ច្រាស់នៃវត្ថុមានផ្ទុកវត្ថុដូចគ្នា** ($r_1, r_2, \\dots, r_k$)៖ $P = \\frac{n!}{r_1! r_2! \\dots r_k!}$

#### ៣. បន្សំ (Combinations) - មិនគិតលំដាប់
ការជ្រើសរើសវត្ថុដោយ **មិនគិតលំដាប់** (ឧទាហរណ៍៖ ការចាប់ឆ្នោត ឬរើសគណៈកម្មការ)៖
$$C(n, r) = \\binom{n}{r} = \\frac{P(n, r)}{r!} = \\frac{n!}{(n-r)! r!}$$`,
    formulas: [
      { label: "រូបមន្តច្រាស់ P(n,r)", formula: "P(n, r) = n! / (n-r)!", explanation: "ចំនួនវិធីតម្រៀបវត្ថុ r ពី n ដោយគិតលំដាប់" },
      { label: "រូបមន្តបន្សំ C(n,r)", formula: "C(n, r) = n! / ((n-r)! r!)", explanation: "ចំនួនវិធីជ្រើសរើសវត្ថុ r ពី n ដោយមិនគិតលំដាប់" },
      { label: "លក្ខណៈ Pascal បន្សំ", formula: "C(n, r) = C(n-1, r) + C(n-1, r-1)", explanation: "រូបមន្តត្រីកោណ Pascal សម្រាប់មេគុណទ្វេធា" }
    ]
  },
  {
    id: "probability-concept",
    category: "probability",
    titleKh: "៩.២ និយមន័យ និងលក្ខណៈនៃប្រូបាប",
    title: "Probability Definition & Rules",
    contentMarkdown: `### និយមន័យ និងលក្ខណៈនៃប្រូបាប (Probability)
#### ១. និយមន័យប្រូបាប (Laplace Definition)
ប្រូបាបនៃព្រឹត្តិការណ៍ $E$ កើតឡើងក្នុងលំហសំណាក $S$ ដែលគ្រប់ករណីមានឱកាសស្មើគ្នា៖
$$P(E) = \\frac{n(E)}{n(S)} = \\frac{\\text{ចំនួនករណីស្រប}}{\\text{ចំនួនករណីអាច}}$$

#### ២. លក្ខណៈគ្រឹះនៃប្រូបាប
*   $0 \\leq P(E) \\leq 1$
*   $P(\\emptyset) = 0 \\quad$ (ព្រឹត្តិការណ៍មិនអាចកើតឡើង)
*   $P(S) = 1 \\quad$ (ព្រឹត្តិការណ៍ប្រាកដ)
*   $P(\\bar{E}) = 1 - P(E) \\quad$ (ប្រូបាបនៃព្រឹត្តិការណ៍ផ្ទុយ)

#### ៣. ប្រូបាបនៃព្រឹត្តិការណ៍សមាស (Addition & Multiplication Rules)
*   **រូបមន្តផលបូក**៖
    $$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$
    *   បើ $A$ និង $B$ ជាព្រឹត្តិការណ៍មិនចុះសម្រុងគ្នា ($A \\cap B = \\emptyset$)៖ $P(A \\cup B) = P(A) + P(B)$
*   **រូបមន្តផលគុណ (ទាក់ទង និងមិនទាក់ទងគ្នា)**៖
    *   បើ $A$ និង $B$ **មិនទាក់ទងគ្នា (ឯករាជ្យ/Independent)**៖ $P(A \\cap B) = P(A) \\times P(B)$
    *   បើ $A$ និង $B$ **ទាក់ទងគ្នា (Dependent)**៖ $P(A \\cap B) = P(A) \\times P(B|A)$`,
    formulas: [
      { label: "រូបមន្តប្រូបាប", formula: "P(E) = n(E) / n(S)", explanation: "ផលធៀបករណីស្រប និងករណីអាច" },
      { label: "ព្រឹត្តិការណ៍សមាស", formula: "P(A∪B) = P(A) + P(B) - P(A∩B)", explanation: "ប្រូបាបនៃផលបូកព្រឹត្តិការណ៍ពីរ" },
      { label: "ព្រឹត្តិការណ៍ផ្ទុយ", formula: "P(E̅) = 1 - P(E)", explanation: "ប្រូបាបនៃព្រឹត្តិការណ៍មិនកើតឡើង" }
    ]
  },
  {
    id: "probability-conditional-bayes",
    category: "probability",
    titleKh: "៩.៣ ប្រូបាបមានលក្ខខណ្ឌ និងទ្រឹស្តីបទបេយស",
    title: "Conditional Probability & Bayes' Theorem",
    contentMarkdown: `### ប្រូបាបមានលក្ខខណ្ឌ និងទ្រឹស្តីបទបេយស (Conditional & Bayes)
#### ១. ប្រូបាបមានលក្ខខណ្ឌ (Conditional Probability)
ប្រូបាបនៃព្រឹត្តិការណ៍ $A$ កើតឡើង ដោយដឹងថាព្រឹត្តិការណ៍ $B$ បានកើតឡើងរួចហើយ៖
$$P(A|B) = \\frac{P(A \\cap B)}{P(B)} \\quad (\\text{ចំពោះ } P(B) \\neq 0)$$

#### ២. រូបមន្តប្រូបាបសរុប (Total Probability Formula)
បើ $A_1 , A_2 , \\dots , A_n$ ជាព្រឹត្តិការណ៍មិនចុះសម្រុងគ្នាលំដាប់ៗដែលបង្កបានជាលំហសំណាក $S$ នោះចំពោះព្រឹត្តិការណ៍ $B$ ណាមួយ៖
$$P(B) = \\sum_{i=1}^{n} P(B|A_i) \\times P(A_i)$$

#### ៣. ទ្រឹស្តីបទបេយស (Bayes' Theorem)
$$P(A_i|B) = \\frac{P(B|A_i) \\times P(A_i)}{P(B)} = \\frac{P(B|A_i) \\times P(A_i)}{\\sum_{k=1}^{n} P(B|A_k) \\times P(A_k)}$$`,
    formulas: [
      { label: "ប្រូបាបមានលក្ខខណ្ឌ", formula: "P(A|B) = P(A∩B) / P(B)", explanation: "ប្រូបាបនៃ A ដោយដឹងថា B កើតឡើងរួចហើយ" },
      { label: "ទ្រឹស្តីបទបេយស", formula: "P(A_i|B) = P(B|A_i)P(A_i) / ΣP(B|A_k)P(A_k)", explanation: "រូបមន្តសម្រាប់គណនាប្រូបាបច្រាស" }
    ]
  },

  // --- CHAPTER 11: VECTORS IN SPACE ---
  {
    id: "vectors-basics",
    category: "vectors-space",
    titleKh: "១១.១ សញ្ញាណវ៉ិចទ័រ, ផលបូក-ដក និងតម្រុយក្នុងលំហ",
    title: "Vectors Concepts & Space Coordinates",
    contentMarkdown: `### សញ្ញាណវ៉ិចទ័រ និងតម្រុយក្នុងលំហ (Vectors & Coordinates in Space)
#### ១. សញ្ញាណវ៉ិចទ័រ (Vector Concept)
*   វ៉ិចទ័រ $\\overrightarrow{AB}$ កំណត់ដោយចំណុចចាប់ $A$ (គល់) និងចំណុចចុង $B$ (ចុង)។
*   **វ៉ិចទ័រឯកតាក្នុងលំហ**៖ $\\vec{i} = (1,0,0)$ , $\\vec{j} = (0,1,0)$ , $\\vec{k} = (0,0,1)$។
*   **វ៉ិចទ័រកូលីនេអ៊ែរ (Colinear)**៖ $\\vec{a} \\parallel \\vec{b} \\iff \\vec{a} = m \\cdot \\vec{b} \\quad (m \\in \\mathbb{R})$។
*   **វ៉ិចទ័រអរតូកូណាល់ (Orthogonal)**៖ $\\vec{a} \\perp \\vec{b} \\iff \\vec{a} \\cdot \\vec{b} = 0$。

#### ២. កូអរដោនេនៃចំណុច និងវ៉ិចទ័រក្នុងលំហ
*   ចំណុច $P(x, y, z)$ ក្នុងតម្រុយអរតូណរម៉ាល់ $(O, \\vec{i}, \\vec{j}, \\vec{k})$ មានវ៉ិចទ័រទីតាំង៖
    $$\\overrightarrow{OP} = x\\vec{i} + y\\vec{j} + z\\vec{k}$$
*   បើ $A(x_1, y_1, z_1)$ និង $B(x_2, y_2, z_2)$ នោះ៖
    *   $\\overrightarrow{AB} = (x_2 - x_1, y_2 - y_1, z_2 - z_1)$
    *   ចម្ងាយរវាងពីរចំណុច៖ $AB = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}$
    *   ចំណុចកណ្តាល $I$ នៃ $AB$៖ $I\\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}, \\frac{z_1 + z_2}{2}\\right)$`,
    formulas: [
      { label: "វ៉ិចទ័រ AB", formula: "AB = (x₂-x₁, y₂-y₁, z₂-z₁)", explanation: "កូអរដោនេវ៉ិចទ័រភ្ជាប់ពីចំណុច A ទៅ B" },
      { label: "ចម្ងាយក្នុងលំហ", formula: "d = √((x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²)", explanation: "ចម្ងាយរវាងពីរចំណុចក្នុងលំហ" }
    ]
  },
  {
    id: "vectors-products",
    category: "vectors-space",
    titleKh: "១១.២ ផលគុណស្កាលែ និងផលគុណវ៉ិចទ័រ",
    title: "Scalar & Cross Products in Space",
    contentMarkdown: `### ផលគុណស្កាលែ និងផលគុណវ៉ិចទ័រ (Dot & Cross Products)
គេមានវ៉ិចទ័រពីរ $\\vec{u} = (x, y, z)$ និង $\\vec{v} = (x', y', z')$៖

#### ១. ផលគុណស្កាលែ (Dot Product / Scalar Product)
លទ្ធផលជាចំនួនពិត៖
$$\\vec{u} \\cdot \\vec{v} = xx' + yy' + zz' = |\\vec{u}| \\cdot |\\vec{v}| \\cdot \\cos\\theta$$
*   ណមនៃវ៉ិចទ័រ៖ $|\\vec{u}| = \\sqrt{x^2 + y^2 + z^2}$
*   មុំរវាងពីរវ៉ិចទ័រ៖ $\\cos\\theta = \\frac{xx' + yy' + zz'}{\\sqrt{x^2+y^2+z^2}\\sqrt{x'^2+y'^2+z'^2}}$

#### ២. ផលគុណវ៉ិចទ័រ (Cross Product / Vector Product)
លទ្ធផលជាវ៉ិចទ័រថ្មីមួយកែងនឹងវ៉ិចទ័រទាំងពីរ $\\vec{u}$ និង $\\vec{v}$៖
$$\\vec{u} \\times \\vec{v} = \\det \\begin{pmatrix} \\vec{i} & \\vec{j} & \\vec{k} \\\\ x & y & z \\\\ x' & y' & z' \\end{pmatrix} = (yz' - zy')\\vec{i} - (xz' - zx')\\vec{j} + (xy' - yx')\\vec{k}$$
*   **ផ្ទៃក្រឡាប្រឡេឡូក្រាម** សង់លើ $\\vec{u}$ និង $\\vec{v}$៖ $S = |\\vec{u} \\times \\vec{v}|$
*   **ផ្ទៃក្រឡាត្រីកោណ**៖ $S_{\\Delta} = \\frac{1}{2} |\\vec{u} \\times \\vec{v}|$
*   **មាឌប្រឡេពីប៉ែត** សង់លើ $\\vec{u}, \\vec{v}, \\vec{w}$៖ $V = |\\vec{u} \\cdot (\\vec{v} \\times \\vec{w})|$ (ផលគុណចម្រុះ)`,
    formulas: [
      { label: "ផលគុណស្កាលែ", formula: "u · v = xx' + yy' + zz'", explanation: "គណនាផលគុណស្កាលែតាមកូអរដោនេ" },
      { label: "ផលគុណវ៉ិចទ័រ (Cross Product)", formula: "u × v = (yz'-zy', zx'-xz', xy'-yx')", explanation: "ផលគុណវ៉ិចទ័រលទ្ធផលជាវ៉ិចទ័រកែង" },
      { label: "ផ្ទៃក្រឡាប្រឡេឡូក្រាម", formula: "S = |u × v|", explanation: "ក្រឡាផ្ទៃបង្កើតដោយពីរវ៉ិចទ័រ" }
    ]
  },
  {
    id: "vectors-geometry-equations",
    category: "vectors-space",
    titleKh: "១១.៣ សមីការបន្ទាត់, ប្លង់ និងស្វ៊ែរ",
    title: "Lines, Planes & Spheres Equations",
    contentMarkdown: `### បន្ទាត់ ប្លង់ និងស្វ៊ែរក្នុងលំហ (Lines, Planes & Spheres)
#### ១. សមីការបន្ទាត់ក្នុងលំហ (Equation of a Line)
បន្ទាត់ $L$ កាត់តាម $P(x_0, y_0, z_0)$ និងមានវ៉ិចទ័រប្រាប់ទិស $\\vec{u} = (a, b, c)$៖
*   **សមីការប៉ារ៉ាម៉ែត្រ (Parametric Equations)**៖
    $$\\begin{cases} x = at + x_0 \\\\ y = bt + y_0 \\\\ z = ct + z_0 \\end{cases} \\quad (t \\in \\mathbb{R})$$
*   **សមីការឆ្លុះ (Symmetric Equations)**៖
    $$\\frac{x - x_0}{a} = \\frac{y - y_0}{b} = \\frac{z - z_0}{c} \\quad (a, b, c \\neq 0)$$

#### ២. សមីការប្លង់ក្នុងលំហ (Equation of a Plane)
ប្លង់ $\\alpha$ កាត់តាម $P(x_0, y_0, z_0)$ និងមានវ៉ិចទ័រណរម៉ាល់ $\\vec{n} = (a, b, c)$៖
*   **សមីការស្តង់ដា**៖ $a(x - x_0) + b(y - y_0) + c(z - z_0) = 0$
*   **សមីការទូទៅ**៖ $ax + by + cz + d = 0$
*   **ចម្ងាយពីចំណុច $Q(x_0, y_0, z_0)$ ទៅប្លង់ $\\alpha$**៖
    $$D = \\frac{|a x_0 + b y_0 + c z_0 + d|}{\\sqrt{a^2 + b^2 + c^2}}$$

#### ៣. សមីការស្វ៊ែរ (Equation of a Sphere)
ស្វ៊ែរដែលមានផ្ចិត $C(a, b, c)$ និងកាំ $r$៖
$$(x - a)^2 + (y - b)^2 + (z - c)^2 = r^2$$`,
    formulas: [
      { label: "សមីការទូទៅនៃប្លង់", formula: "ax + by + cz + d = 0", explanation: "មេគុណ (a, b, c) ជាកូអរដោនេវ៉ិចទ័រណរម៉ាល់" },
      { label: "ចម្ងាយពីចំណុចទៅប្លង់", formula: "D = |ax₀+by₀+cz₀+d| / √(a²+b²+c²)", explanation: "ចម្ងាយខ្លីបំផុតពីចំណុចមួយទៅប្លង់" },
      { label: "សមីការស្វ៊ែរ", formula: "(x-a)² + (y-b)² + (z-c)² = r²", explanation: "សមីការស្វ៊ែរផ្ចិត C(a,b,c) កាំ r" }
    ]
  },
  {
    id: "vectors-advanced-properties",
    category: "vectors-space",
    titleKh: "១១.៤ ទិសដៅកូស៊ីនុស មុំប្លង់ ចម្ងាយ និងមាឌ",
    title: "Direction Cosines, Angles & Distances",
    contentMarkdown: `### ទិសដៅកូស៊ីនុស មុំប្លង់ ចម្ងាយ និងមាឌ
#### ១. ទិសដៅកូស៊ីនុសនៃវ៉ិចទ័រ
បើ $\\vec{u} = (x, y, z)$ នោះកូស៊ីនុសប្រាប់ទិសរបស់វាជាមួយអ័ក្ស $Ox, Oy, Oz$ គឺ៖
$$\\cos \\alpha = \\frac{x}{|\\vec{u}|} \\quad , \\quad \\cos \\beta = \\frac{y}{|\\vec{u}|} \\quad , \\quad \\cos \\gamma = \\frac{z}{|\\vec{u}|}$$

#### ២. មុំផ្គុំដោយប្លង់ពីរ
បើប្លង់ទាំងពីរមានវ៉ិចទ័រណរម៉ាល់រៀងគ្នា $\\vec{n_1}$ និង $\\vec{n_2}$ នោះមុំ $\\theta$ រវាងប្លង់ទាំងពីរគឺ៖
$$\\cos \\theta = \\frac{|\\vec{n_1} \\cdot \\vec{n_2}|}{|\\vec{n_1}| |\\vec{n_2}|}$$

#### ៣. ចម្ងាយពីចំណុចមួយទៅបន្ទាត់មួយ
ចម្ងាយ $D$ ពីចំណុច $Q$ ទៅបន្ទាត់ $L$ ដែលឆ្លងកាត់ $P$ និងមានវ៉ិចទ័រប្រាប់ទិស $\\vec{u}$ គឺ៖
$$D = \\frac{|\\vec{PQ} \\times \\vec{u}|}{|\\vec{u}|}$$

#### ៤. មាឌចតុមុខ និងតំបន់ស្វ៊ែរ
*   **មាឌចតុមុខ (Tetrahedron)** ដែលសង់លើ $\\vec{u}, \\vec{v}, \\vec{w}$ គឺ៖ $V = \\frac{1}{6}|\\vec{u} \\cdot (\\vec{v} \\times \\vec{w})|$
*   **វិសមីការតំបន់ស្វ៊ែរ**៖ តំបន់ខាងក្នុងស្វ៊ែរគឺ $(x-a)^2 + (y-b)^2 + (z-c)^2 < r^2$ និងខាងក្រៅគឺ $> r^2$`,
    formulas: [
      { label: "មុំរវាងប្លង់ពីរ", formula: "cos θ = |n₁ · n₂| / (|n₁||n₂|)", explanation: "ទាញចេញពីមុំរវាងវ៉ិចទ័រណរម៉ាល់នៃប្លង់ទាំងពីរ" },
      { label: "ចម្ងាយពីចំណុចទៅបន្ទាត់", formula: "D = |PQ × u| / |u|", explanation: "P ជាចំណុចលើបន្ទាត់, u ជាវ៉ិចទ័រប្រាប់ទិស" },
      { label: "មាឌចតុមុខ", formula: "V = (1/6)|u · (v × w)|", explanation: "ស្មើមួយភាគប្រាំមួយនៃមាឌប្រឡេពីប៉ែត" }
    ]
  },

  // --- CHAPTER 12: CONICS ---
  {
    id: "conics-parabola",
    category: "conics",
    titleKh: "១២.១ ប៉ារ៉ាបូល",
    title: "Parabola",
    contentMarkdown: `### ប៉ារ៉ាបូល (Parabola)
ប៉ារ៉ាបូល គឺជាសំណុំចំណុចក្នុងប្លង់ដែលមានចម្ងាយស្មើគ្នាពីចំណុចនឹងមួយ $F$ (កំនុំ) និងបន្ទាត់នឹងមួយ $D$ (បន្ទាត់ប្រាប់ទិស)។

#### ១. ករណីកំពូលត្រង់គល់ $V(0,0)$៖
*   **អ័ក្សឆ្លុះជាអ័ក្សឈរ**៖ $x^2 = 4py$
    *   កំនុំ $F(0, p)$
    *   បន្ទាត់ប្រាប់ទិស $y = -p$
*   **អ័ក្សឆ្លុះជាអ័ក្សដេក**៖ $y^2 = 4px$
    *   កំនុំ $F(p, 0)$
    *   បន្ទាត់ប្រាប់ទិស $x = -p$

#### ២. ករណីកំពូលខុសពីគល់ $V(h,k)$៖
*   **អ័ក្សឆ្លុះជាបន្ទាត់ឈរ**៖ $(x - h)^2 = 4p(y - k)$
    *   កំនុំ $F(h, k+p)$
    *   បន្ទាត់ប្រាប់ទិស $y = k - p$
*   **អ័ក្សឆ្លុះជាបន្ទាត់ដេក**៖ $(y - k)^2 = 4p(x - h)$
    *   កំនុំ $F(h+p, k)$
    *   បន្ទាត់ប្រាប់ទិស $x = h - p$`,
    formulas: [
      { label: "ប៉ារ៉ាបូលឈរ (V(0,0))", formula: "x² = 4py", explanation: "កំពូលត្រង់គល់ អ័ក្សឆ្លុះឈរ" },
      { label: "ប៉ារ៉ាបូលឈរ (V(h,k))", formula: "(x-h)² = 4p(y-k)", explanation: "កំពូលត្រង់ (h,k) អ័ក្សឆ្លុះឈរ" },
      { label: "ប៉ារ៉ាបូលដេក (V(h,k))", formula: "(y-k)² = 4p(x-h)", explanation: "កំពូលត្រង់ (h,k) អ័ក្សឆ្លុះដេក" }
    ]
  },
  {
    id: "conics-ellipse",
    category: "conics",
    titleKh: "១២.២ អេលីប",
    title: "Ellipse",
    contentMarkdown: `### អេលីប (Ellipse)
អេលីប គឺជាសំណុំចំណុចក្នុងប្លង់ដែលមានផលបូកចម្ងាយទៅចំណុចនឹងពីរ $F_1, F_2$ (កំនុំទាំងពីរ) ថេរស្មើ $2a$ ($a > b > 0$)។

#### ១. ករណីផ្ចិតត្រង់គល់ $I(0,0)$៖
*   **អ័ក្សធំដេក**៖ $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$
    *   កំពូល $V_1(a, 0) , V_2(-a, 0)$
    *   កំនុំ $F_1(c, 0) , F_2(-c, 0)$ ដែល $c^2 = a^2 - b^2$
*   **អ័ក្សធំឈរ**៖ $\\frac{x^2}{b^2} + \\frac{y^2}{a^2} = 1$
    *   កំពូល $V_1(0, a) , V_2(0, -a)$
    *   កំនុំ $F_1(0, c) , F_2(0, -c)$

#### ២. ករណីផ្ចិតខុសពីគល់ $I(h,k)$៖
*   **អ័ក្សធំស្របនឹងអ័ក្សដេក**៖ $\\frac{(x - h)^2}{a^2} + \\frac{(y - k)^2}{b^2} = 1$
*   **អ័ក្សធំស្របនឹងអ័ក្សឈរ**៖ $\\frac{(x - h)^2}{b^2} + \\frac{(y - k)^2}{a^2} = 1$
*   **អុិចសង់ទ្រីស៊ីតេ (Eccentricity)**៖ $e = \\frac{c}{a} \\quad (0 < e < 1)$ (រាងទ្រវែងរបស់អេលីប)`,
    formulas: [
      { label: "សមីការអេលីប (អ័ក្សធំដេក)", formula: "x²/a² + y²/b² = 1", explanation: "ផ្ចិតត្រង់គល់ អ័ក្សធំនៅលើអ័ក្សដេក" },
      { label: "ទំនាក់ទំនងកំនុំអេលីប", formula: "c² = a² - b²", explanation: "ស្វែងរកចម្ងាយកំនុំ c នៃអេលីប" },
      { label: "អុិចសង់ទ្រីស៊ីតេ e", formula: "e = c/a", explanation: "សមាមាត្រកំនុំធៀបនឹងកន្លះអ័ក្សធំ (0 < e < 1)" }
    ]
  },
  {
    id: "conics-hyperbola",
    category: "conics",
    titleKh: "១២.៣ អ៊ីពែបូល",
    title: "Hyperbola",
    contentMarkdown: `### អ៊ីពែបូល (Hyperbola)
អ៊ីពែបូល គឺជាសំណុំចំណុចក្នុងប្លង់ដែលមានផលដកចម្ងាយដាច់ខាតទៅចំណុចនឹងពីរ $F_1, F_2$ (កំនុំទាំងពីរ) ថេរស្មើ $2a$ ($a, b > 0$)。

#### ១. ករណីផ្ចិតត្រង់គល់ $I(0,0)$៖
*   **អ័ក្សទទឹងដេក**៖ $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$
    *   កំពូល $V_1(a, 0) , V_2(-a, 0)$
    *   កំនុំ $F_1(c, 0) , F_2(-c, 0)$ ដែល $c^2 = a^2 + b^2$
    *   អាស៊ីមតូតទាំងពីរ៖ $y = \\pm \\frac{b}{a} x$
*   **អ័ក្សទទឹងឈរ**៖ $\\frac{y^2}{a^2} - \\frac{x^2}{b^2} = 1$
    *   កំពូល $V_1(0, a) , V_2(0, -a)$
    *   អាស៊ីមតូតទាំងពីរ៖ $y = \\pm \\frac{a}{b} x$

#### ២. ករណីផ្ចិតខុសពីគល់ $I(h,k)$៖
*   **អ័ក្សទទឹងស្របនឹងអ័ក្សដេក**៖ $\\frac{(x - h)^2}{a^2} - \\frac{(y - k)^2}{b^2} = 1$
*   **អុិចសង់ទ្រីស៊ីតេ (Eccentricity)**៖ $e = \\frac{c}{a} \\quad (e > 1)$`,
    formulas: [
      { label: "សមីការអ៊ីពែបូល (អ័ក្សទទឹងដេក)", formula: "x²/a² - y²/b² = 1", explanation: "ផ្ចិតត្រង់គល់ អ័ក្សទទឹងដេក" },
      { label: "ទំនាក់ទំនងកំនុំអ៊ីពែបូល", formula: "c² = a² + b²", explanation: "ចម្ងាយកំនុំ c នៃអ៊ីពែបូល" },
      { label: "អាស៊ីមតូតអ៊ីពែបូលដេក", formula: "y = ±(b/a)x", explanation: "បន្ទាត់លីមីតនៃខ្សែកោងអ៊ីពែបូល" }
    ]
  }
];
