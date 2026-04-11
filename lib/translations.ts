export type SupportedLocale = 'es' | 'fr' | 'zh' | 'ja' | 'de' | 'pt'

export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  es: 'Español',
  fr: 'Français',
  zh: '中文',
  ja: '日本語',
  de: 'Deutsch',
  pt: 'Português',
}

export const ALLERGEN_TRANSLATIONS: Record<string, Partial<Record<SupportedLocale, string>>> = {
  // Nuts
  'Peanuts':        { es: 'Cacahuetes', fr: 'Arachides', zh: '花生', ja: 'ピーナッツ', de: 'Erdnüsse', pt: 'Amendoins' },
  'Tree Nuts':      { es: 'Frutos secos', fr: 'Fruits à coque', zh: '坚果', ja: 'ナッツ類', de: 'Baumnüsse', pt: 'Nozes' },
  'Almonds':        { es: 'Almendras', fr: 'Amandes', zh: '杏仁', ja: 'アーモンド', de: 'Mandeln', pt: 'Amêndoas' },
  'Cashews':        { es: 'Anacardos', fr: 'Noix de cajou', zh: '腰果', ja: 'カシューナッツ', de: 'Cashewnüsse', pt: 'Castanha de caju' },
  'Walnuts':        { es: 'Nueces', fr: 'Noix', zh: '核桃', ja: 'クルミ', de: 'Walnüsse', pt: 'Nozes' },
  'Pecans':         { es: 'Pacanas', fr: 'Noix de pécan', zh: '美洲山核桃', ja: 'ピーカンナッツ', de: 'Pekannüsse', pt: 'Nozes-pecã' },
  'Pistachios':     { es: 'Pistachos', fr: 'Pistaches', zh: '开心果', ja: 'ピスタチオ', de: 'Pistazien', pt: 'Pistácios' },
  'Hazelnuts':      { es: 'Avellanas', fr: 'Noisettes', zh: '榛子', ja: 'ヘーゼルナッツ', de: 'Haselnüsse', pt: 'Avelãs' },
  'Macadamia Nuts': { es: 'Nueces de macadamia', fr: 'Noix de macadamia', zh: '夏威夷果', ja: 'マカダミアナッツ', de: 'Macadamianüsse', pt: 'Nozes macadâmia' },
  'Brazil Nuts':    { es: 'Nueces de Brasil', fr: 'Noix du Brésil', zh: '巴西坚果', ja: 'ブラジルナッツ', de: 'Paranüsse', pt: 'Castanha-do-pará' },
  // Shellfish
  'Shrimp':         { es: 'Camarones', fr: 'Crevettes', zh: '虾', ja: 'エビ', de: 'Garnelen', pt: 'Camarão' },
  'Crab':           { es: 'Cangrejo', fr: 'Crabe', zh: '螃蟹', ja: 'カニ', de: 'Krabbe', pt: 'Caranguejo' },
  'Lobster':        { es: 'Langosta', fr: 'Homard', zh: '龙虾', ja: 'ロブスター', de: 'Hummer', pt: 'Lagosta' },
  'Crayfish':       { es: 'Cangrejo de río', fr: 'Écrevisse', zh: '小龙虾', ja: 'ザリガニ', de: 'Flusskrebs', pt: 'Lagostim' },
  'Scallops':       { es: 'Vieiras', fr: 'Pétoncles', zh: '扇贝', ja: 'ホタテ', de: 'Jakobsmuscheln', pt: 'Vieiras' },
  'Oysters':        { es: 'Ostras', fr: 'Huîtres', zh: '牡蛎', ja: 'カキ', de: 'Austern', pt: 'Ostras' },
  'Clams':          { es: 'Almejas', fr: 'Palourdes', zh: '蛤蜊', ja: 'アサリ', de: 'Muscheln', pt: 'Amêijoas' },
  'Mussels':        { es: 'Mejillones', fr: 'Moules', zh: '贻贝', ja: 'ムール貝', de: 'Miesmuscheln', pt: 'Mexilhões' },
  // Dairy
  'Milk':           { es: 'Leche', fr: 'Lait', zh: '牛奶', ja: '牛乳', de: 'Milch', pt: 'Leite' },
  'Cheese':         { es: 'Queso', fr: 'Fromage', zh: '奶酪', ja: 'チーズ', de: 'Käse', pt: 'Queijo' },
  'Butter':         { es: 'Mantequilla', fr: 'Beurre', zh: '黄油', ja: 'バター', de: 'Butter', pt: 'Manteiga' },
  'Cream':          { es: 'Crema', fr: 'Crème', zh: '奶油', ja: 'クリーム', de: 'Sahne', pt: 'Nata' },
  'Yogurt':         { es: 'Yogur', fr: 'Yaourt', zh: '酸奶', ja: 'ヨーグルト', de: 'Joghurt', pt: 'Iogurte' },
  'Whey':           { es: 'Suero de leche', fr: 'Lactosérum', zh: '乳清', ja: 'ホエイ', de: 'Molke', pt: 'Soro do leite' },
  'Casein':         { es: 'Caseína', fr: 'Caséine', zh: '酪蛋白', ja: 'カゼイン', de: 'Kasein', pt: 'Caseína' },
  // Eggs
  'Eggs':           { es: 'Huevos', fr: 'Œufs', zh: '鸡蛋', ja: '卵', de: 'Eier', pt: 'Ovos' },
  'Egg White':      { es: 'Clara de huevo', fr: 'Blanc d\'œuf', zh: '蛋白', ja: '卵白', de: 'Eiweiß', pt: 'Clara de ovo' },
  'Egg Yolk':       { es: 'Yema de huevo', fr: 'Jaune d\'œuf', zh: '蛋黄', ja: '卵黄', de: 'Eigelb', pt: 'Gema de ovo' },
  // Fish
  'Fish':           { es: 'Pescado', fr: 'Poisson', zh: '鱼', ja: '魚', de: 'Fisch', pt: 'Peixe' },
  'Salmon':         { es: 'Salmón', fr: 'Saumon', zh: '三文鱼', ja: 'サーモン', de: 'Lachs', pt: 'Salmão' },
  'Tuna':           { es: 'Atún', fr: 'Thon', zh: '金枪鱼', ja: 'マグロ', de: 'Thunfisch', pt: 'Atum' },
  'Cod':            { es: 'Bacalao', fr: 'Morue', zh: '鳕鱼', ja: 'タラ', de: 'Kabeljau', pt: 'Bacalhau' },
  'Tilapia':        { es: 'Tilapia', fr: 'Tilapia', zh: '罗非鱼', ja: 'ティラピア', de: 'Tilapia', pt: 'Tilápia' },
  'Halibut':        { es: 'Fletán', fr: 'Flétan', zh: '比目鱼', ja: 'ハリバット', de: 'Heilbutt', pt: 'Alabote' },
  'Swordfish':      { es: 'Pez espada', fr: 'Espadon', zh: '剑鱼', ja: 'メカジキ', de: 'Schwertfisch', pt: 'Peixe-espada' },
  'Anchovies':      { es: 'Anchoas', fr: 'Anchois', zh: '凤尾鱼', ja: 'アンチョビ', de: 'Sardellen', pt: 'Anchovas' },
  // Wheat/Gluten
  'Wheat':          { es: 'Trigo', fr: 'Blé', zh: '小麦', ja: '小麦', de: 'Weizen', pt: 'Trigo' },
  'Gluten':         { es: 'Gluten', fr: 'Gluten', zh: '麸质', ja: 'グルテン', de: 'Gluten', pt: 'Glúten' },
  'Barley':         { es: 'Cebada', fr: 'Orge', zh: '大麦', ja: '大麦', de: 'Gerste', pt: 'Cevada' },
  'Rye':            { es: 'Centeno', fr: 'Seigle', zh: '黑麦', ja: 'ライ麦', de: 'Roggen', pt: 'Centeio' },
  'Spelt':          { es: 'Espelta', fr: 'Épeautre', zh: '斯佩尔特小麦', ja: 'スペルト小麦', de: 'Dinkel', pt: 'Espelta' },
  'Oats':           { es: 'Avena', fr: 'Avoine', zh: '燕麦', ja: 'オーツ麦', de: 'Hafer', pt: 'Aveia' },
  // Soy
  'Soy':            { es: 'Soja', fr: 'Soja', zh: '大豆', ja: '大豆', de: 'Soja', pt: 'Soja' },
  'Edamame':        { es: 'Edamame', fr: 'Edamame', zh: '毛豆', ja: '枝豆', de: 'Edamame', pt: 'Edamame' },
  'Tofu':           { es: 'Tofu', fr: 'Tofu', zh: '豆腐', ja: '豆腐', de: 'Tofu', pt: 'Tofu' },
  'Miso':           { es: 'Miso', fr: 'Miso', zh: '味噌', ja: '味噌', de: 'Miso', pt: 'Miso' },
  'Tempeh':         { es: 'Tempeh', fr: 'Tempeh', zh: '天贝', ja: 'テンペ', de: 'Tempeh', pt: 'Tempeh' },
  // Seeds
  'Sesame':         { es: 'Sésamo', fr: 'Sésame', zh: '芝麻', ja: 'ゴマ', de: 'Sesam', pt: 'Sésamo' },
  'Sunflower Seeds':{ es: 'Pipas de girasol', fr: 'Graines de tournesol', zh: '葵花籽', ja: 'ひまわりの種', de: 'Sonnenblumenkerne', pt: 'Sementes de girassol' },
  'Pumpkin Seeds':  { es: 'Pepitas', fr: 'Graines de courge', zh: '南瓜籽', ja: 'かぼちゃの種', de: 'Kürbiskerne', pt: 'Sementes de abóbora' },
  'Poppy Seeds':    { es: 'Semillas de amapola', fr: 'Graines de pavot', zh: '罂粟籽', ja: 'けしの実', de: 'Mohnsamen', pt: 'Sementes de papoila' },
  'Flax Seeds':     { es: 'Semillas de lino', fr: 'Graines de lin', zh: '亚麻籽', ja: '亜麻仁', de: 'Leinsamen', pt: 'Sementes de linhaça' },
  'Chia Seeds':     { es: 'Semillas de chía', fr: 'Graines de chia', zh: '奇亚籽', ja: 'チアシード', de: 'Chiasamen', pt: 'Sementes de chia' },
  'Hemp Seeds':     { es: 'Semillas de cáñamo', fr: 'Graines de chanvre', zh: '大麻籽', ja: '麻の実', de: 'Hanfsamen', pt: 'Sementes de cânhamo' },
  'Mustard':        { es: 'Mostaza', fr: 'Moutarde', zh: '芥末', ja: 'マスタード', de: 'Senf', pt: 'Mostarda' },
  // Other
  'Corn':           { es: 'Maíz', fr: 'Maïs', zh: '玉米', ja: 'トウモロコシ', de: 'Mais', pt: 'Milho' },
  'Lupin':          { es: 'Altramuz', fr: 'Lupin', zh: '羽扇豆', ja: 'ルーピン', de: 'Lupine', pt: 'Tremoço' },
  'Sulfites':       { es: 'Sulfitos', fr: 'Sulfites', zh: '亚硫酸盐', ja: '亜硫酸塩', de: 'Sulfite', pt: 'Sulfitos' },
  'Celery':         { es: 'Apio', fr: 'Céleri', zh: '芹菜', ja: 'セロリ', de: 'Sellerie', pt: 'Aipo' },
  'Mollusks':       { es: 'Moluscos', fr: 'Mollusques', zh: '软体动物', ja: '軟体動物', de: 'Weichtiere', pt: 'Moluscos' },
  'Latex':          { es: 'Látex', fr: 'Latex', zh: '乳胶', ja: 'ラテックス', de: 'Latex', pt: 'Látex' },
}

export function translateAllergen(name: string, locale: SupportedLocale): string {
  return ALLERGEN_TRANSLATIONS[name]?.[locale] ?? name
}
