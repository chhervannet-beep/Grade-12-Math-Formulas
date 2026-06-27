export interface Chapter {
  id: string;
  num: number;
  titleKh: string;
  titleEn: string;
}

export const CHAPTERS: Chapter[] = [
  { id: "complex", num: 1, titleKh: "ចំនួនកុំផ្លិច", titleEn: "Complex Numbers" },
  { id: "limit", num: 2, titleKh: "លីមីត", titleEn: "Limits" },
  { id: "continuity", num: 3, titleKh: "ភាពជាប់នៃអនុគមន៍", titleEn: "Function Continuity" },
  { id: "derivative", num: 4, titleKh: "ដេរីវេនៃអនុគមន៍", titleEn: "Derivatives" },
  { id: "indefinite-integral", num: 5, titleKh: "អាំងតេក្រាលមិនកំណត់", titleEn: "Indefinite Integrals" },
  { id: "definite-integral", num: 6, titleKh: "អាំងតេក្រាលកំណត់", titleEn: "Definite Integrals" },
  { id: "diff-eq-1", num: 7, titleKh: "សមីការឌីផេរ៉ង់ស្យែលលំដាប់ទី១", titleEn: "1st Order Differential Equations" },
  { id: "diff-eq-2", num: 8, titleKh: "សមីការឌីផេរ៉ង់ស្យែលលំដាប់ទី២", titleEn: "2nd Order Differential Equations" },
  { id: "probability", num: 9, titleKh: "ប្រូបាប", titleEn: "Probability" },
  { id: "curve-sketching", num: 10, titleKh: "សិក្សាអនុគមន៍ខ្សែគោល", titleEn: "Curve Sketching" },
  { id: "vectors-space", num: 11, titleKh: "វ៉ិចទ័រក្នុងលំហ", titleEn: "Vectors in Space" },
  { id: "conics", num: 12, titleKh: "កោនិក", titleEn: "Conics" }
];
