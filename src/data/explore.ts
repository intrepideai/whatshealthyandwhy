export interface Subcategory {
  name: string;
  slug: string;
  topicSlugs: string[];
}

export interface ExploreCategory {
  slug: string;
  title: string;
  description: string;
  tagline: string;
  subcategories: Subcategory[];
}

export const exploreCategories: ExploreCategory[] = [
  {
    slug: 'good-for-you',
    title: "What's Good For You",
    tagline: 'Supplements, foods, herbs, mushrooms, and natural compounds backed by research.',
    description:
      "Supplements, foods, herbs, mushrooms, teas, and natural compounds — all backed by peer-reviewed research.",
    subcategories: [
      {
        name: 'Supplements & Vitamins',
        slug: 'supplements',
        topicSlugs: ['turmeric', 'omega-3-fatty-acids', 'alpha-gpc', 'vitamin-a', 'vitamin-d', 'vitamin-c', 'vitamin-k2', 'vitamin-e', 'b-vitamins', 'vitamin-b12', 'riboflavin', 'thiamine', 'vitamin-b6', 'magnesium', 'zinc', 'iodine', 'selenium', 'iron', 'potassium', 'ashwagandha', 'probiotics', 'postbiotics', 'saccharomyces-boulardii', 'akkermansia-muciniphila', 'lactobacillus-reuteri', 'creatine', 'collagen', 'coq10', 'nac', 'berberine', 'melatonin', 'resveratrol', 'quercetin', 'l-theanine', 'astaxanthin', 'taurine', 'glycine', 'inositol', 'spermidine', 'sulforaphane', 'egcg', 'rhodiola', 'alpha-lipoic-acid', 'glutathione', 'choline', '5-htp', 'l-tryptophan', 'same', 'pqq', 'shilajit', 'boron', 'chromium', 'copper', 'dim', 'indole-3-carbinol', 'gaba', 'biotin', 'dhea', 'folate', 'pregnenolone', 'phosphatidylserine', 'nad-plus', 'nmn', 'nicotinamide-riboside', 'fisetin', 'carnosine', 'bovine-colostrum', 'manganese', 'nattokinase', 'lumbrokinase', 'lycopene', 'beta-carotene', 'bee-propolis', 'bee-pollen', 'royal-jelly', 'acetyl-l-carnitine', 'l-carnitine', 'butyrate', 'inulin', 'l-glutamine', 'psyllium-husk', 'glucomannan', 'urolithin-a', 'serrapeptase', 'msm', 'digestive-enzymes', 'bromelain', 'krill-oil', 'hyaluronic-acid', 'betaine', 'mct-oil', 'alpha-ketoglutarate', 'pine-bark-extract', 'grapeseed-extract', 'lactoferrin', 'beta-glucans', 'fucoidan', 'ergothioneine', 'luteolin', 'kaempferol', 'palmitoylethanolamide', 'apigenin', 'lithium-orotate', 'l-citrulline', 'phosphatidylcholine', 'lutein-and-zeaxanthin', 'chlorophyll', 'hesperidin', 'diosmin', 'evening-primrose-oil', 'tocotrienols', 'pterostilbene', 'benfotiamine', 'monolaurin', 'niacin', 'niacinamide', 'fulvic-acid', 'silica', 'conjugated-linoleic-acid', 'zinc-carnosine', 'red-yeast-rice', 'l-tyrosine', 'calcium', 'methylene-blue', 'rutin', 'beta-alanine', 'l-arginine', 'strontium', 'l-lysine', 'whey-protein', 'pea-protein', 'glucosamine-chondroitin', 'phytosterols', 'ursolic-acid', 'd-ribose', 'ferulic-acid', 'ellagic-acid', 'chlorogenic-acid', 'rosmarinic-acid', 'l-ornithine', 'agmatine', 'd-mannose', 'huperzine-a', 'fucoxanthin', 'calcium-d-glucarate', 'citicoline', 'vanadium', 'molybdenum', 'hmb', 'acacia-fiber', 'ecdysterone', 'epicatechin', 'pantethine', 'pantothenic-acid', 'cbd-oil', 'spore-based-probiotics', 'glynac', 'uridine-monophosphate', 'larch-arabinogalactan', 'psychobiotics', 'vinpocetine', 'ecklonia-cava', 'dihydromyricetin', 'sodium-bicarbonate', 'bcaas', 'exogenous-ketones', 'squalene', 'nobiletin', 'theacrine'],
      },
      {
        name: 'Foods & Drinks',
        slug: 'foods',
        topicSlugs: ['organic-food', 'tea', 'coffee', 'yerba-mate', 'anti-inflammatory-foods', 'olive-oil', 'avocado-oil', 'argan-oil', 'bone-broth', 'honey', 'manuka-honey', 'apple', 'pear', 'apple-cider-vinegar', 'fermented-foods', 'kombucha', 'kefir', 'yogurt', 'kimchi', 'sauerkraut', 'natto', 'tempeh', 'sourdough', 'eggs', 'berries', 'blueberries', 'raspberries', 'black-currant', 'aronia-berry', 'maqui-berry', 'beets', 'tart-cherry', 'dark-chocolate', 'raw-cacao', 'nuts-and-seeds', 'coconut-oil', 'organ-meats', 'bone-marrow', 'grass-fed-meat', 'raw-milk', 'electrolytes', 'flaxseed', 'chia-seeds', 'sardines', 'anchovies', 'mackerel', 'herring', 'wild-salmon', 'oysters', 'mussels', 'clams', 'scallops', 'fish-roe', 'avocado', 'sweet-potato', 'apricot', 'hemp-seeds', 'sea-vegetables', 'sprouts-and-microgreens', 'ghee', 'grass-fed-butter', 'pomegranate', 'bitter-melon', 'resistant-starch', 'amla', 'goji-berries', 'sea-buckthorn', 'pumpkin-seeds', 'pumpkin-seed-oil', 'cod-liver-oil', 'camu-camu', 'amaranth', 'baobab', 'chicory-root', 'papaya', 'cranberry', 'watercress', 'sea-moss', 'lentils', 'buckwheat', 'acai-berry', 'brazil-nuts', 'walnuts', 'almonds', 'hazelnuts', 'sesame-seeds', 'mediterranean-diet', 'nutritional-yeast', 'wheatgrass', 'mangosteen', 'grapefruit', 'mango', 'teff', 'kiwi', 'asparagus', 'kale', 'spinach', 'tiger-nuts', 'yacon', 'miso', 'dragon-fruit', 'jerusalem-artichoke', 'guava', 'hydrogen-water', 'celery', 'millet', 'oats', 'mung-beans', 'carob', 'chickpeas', 'coconut-water', 'prunes', 'sacha-inchi', 'sorghum', 'prickly-pear', 'purslane', 'dates', 'monk-fruit', 'stevia', 'xylitol', 'erythritol', 'allulose', 'jackfruit', 'black-rice', 'mulberry', 'okra', 'tamarind', 'carrot', 'quinoa', 'broccoli', 'figs', 'acerola', 'pineapple', 'brussels-sprouts', 'cauliflower', 'arugula', 'swiss-chard', 'red-cabbage', 'watermelon', 'lemon', 'banana', 'plantains', 'soursop', 'rye', 'lychee', 'wheat-germ', 'edamame', 'soy-isoflavones', 'fava-beans', 'taro-root', 'barley', 'leek', 'jicama', 'tomatoes', 'persimmon', 'lotus-root', 'jujube', 'pistachios', 'black-beans', 'loquat', 'bok-choy', 'pumpkin', 'farro', 'spelt', 'olives', 'capers', 'peanuts', 'sunflower-seeds', 'collard-greens', 'adzuki-beans', 'daikon-radish', 'macadamia-nuts', 'mustard-greens', 'kohlrabi', 'pine-nuts', 'cashews', 'pecans', 'passion-fruit', 'cassava', 'cabbage', 'sea-salt', 'bell-peppers', 'quince', 'rainbow-trout', 'yuzu', 'lingonberry', 'strawberries', 'blood-orange'],
      },
      {
        name: 'Herbs & Spices',
        slug: 'herbs',
        topicSlugs: ['garlic', 'goldenseal', 'black-garlic', 'black-pepper', 'onions', 'ginger', 'fennel', 'cinnamon', 'cardamom', 'sumac', 'cayenne-pepper', 'oregano-oil', 'black-seed-oil', 'elderberry', 'elderflower', 'bilberry', 'moringa', 'wormwood', 'cloves', 'holy-basil', 'cistanche', 'astragalus', 'rehmannia', 'echinacea', 'andrographis', 'chamomile', 'valerian', 'lemon-balm', 'lemon-verbena', 'passionflower', 'kava', 'triphala', 'saffron', 'cats-claw', 'devils-claw', 'neem', 'pau-darco', 'skullcap', 'fenugreek', 'marshmallow-root', 'slippery-elm', 'boswellia', 'maca-root', 'gotu-kola', 'schisandra', 'ginseng', 'eleuthero', 'ginkgo-biloba', 'bacopa-monnieri', 'hawthorn-berry', 'st-johns-wort', 'stinging-nettle', 'licorice-root', 'olive-leaf-extract', 'saw-palmetto', 'shatavari', 'tongkat-ali', 'tribulus-terrestris', 'epimedium', 'gymnema-sylvestre', 'mucuna-pruriens', 'jiaogulan', 'artichoke-extract', 'sage', 'spearmint', 'peppermint', 'hibiscus', 'calendula', 'vitex', 'red-clover', 'black-cohosh', 'rosemary', 'thyme', 'marjoram', 'burdock-root', 'mullein', 'butterbur', 'feverfew', 'horsetail', 'rosehip', 'horse-chestnut', 'mastic-gum', 'yarrow', 'cilantro', 'coriander-seed', 'willow-bark', 'guduchi', 'bergamot', 'hops', 'cumin', 'magnolia-bark', 'coleus-forskohlii', 'lavender', 'oat-straw', 'horseradish', 'parsley', 'lemongrass', 'butchers-broom', 'motherwort', 'perilla', 'chanca-piedra', 'kudzu', 'dong-quai', 'red-raspberry-leaf', 'danshen', 'star-anise', 'naringenin', 'goldenrod', 'terminalia-arjuna', 'noni', 'banaba-leaf', 'haritaki', 'dill', 'galangal', 'meadowsweet', 'alfalfa', 'pine-pollen', 'caraway-seeds', 'digestive-bitters', 'myrrh', 'linden-flower', 'uva-ursi', 'he-shou-wu', 'butterfly-pea-flower', 'beta-caryophyllene', 'bay-leaf', 'kanna', 'guggul', 'panax-notoginseng', 'cissus-quadrangularis', 'basil', 'wild-yam', 'ashitaba', 'wasabi', 'california-poppy', 'grains-of-paradise', 'arnica', 'gentian-root', 'damiana', 'pelargonium-sidoides', 'japanese-knotweed', 'agrimony', 'prunella-vulgaris', 'piper-longum', 'yellow-dock', 'hyssop', 'mugwort', 'bibhitaki', 'curry-leaf', 'nutmeg', 'tarragon', 'eucalyptus', 'comfrey', 'pygeum', 'allspice', 'annatto', 'asafoetida'],
      },
      {
        name: 'Medicinal Mushrooms',
        slug: 'mushrooms',
        topicSlugs: ['medicinal-mushrooms'],
      },
    ],
  },
  {
    slug: 'harming-you',
    title: "What's Harming You",
    tagline: 'Hidden dangers in food, personal care, your home, and the environment.',
    description:
      'Hidden dangers in your food, personal care products, home, and environment — and what to do about them.',
    subcategories: [
      {
        name: 'Hidden Dangers in Food',
        slug: 'food-dangers',
        topicSlugs: ['added-sugar', 'seed-oils', 'food-additives', 'artificial-sweeteners', 'farm-raised-fish', 'processed-meat', 'lectins', 'acrylamide', 'heterocyclic-amines', 'advanced-glycation-end-products', 'phytic-acid', 'gluten-sensitivity', 'carrageenan', 'potassium-bromate', 'mycotoxins'],
      },
      {
        name: 'Personal Care & Beauty',
        slug: 'personal-care',
        topicSlugs: ['sunscreen', 'personal-care-products'],
      },
      {
        name: 'Your Home',
        slug: 'home',
        topicSlugs: ['household-chemicals', 'indoor-air-quality', 'water-filtration', 'mattresses-&-furniture', 'non-stick-cookware', 'blue-light'],
      },
      {
        name: 'Environmental Toxins',
        slug: 'environment',
        topicSlugs: ['microplastics', 'pfas-(forever-chemicals)', 'phthalates', 'bpa', 'bps-and-bpf', 'triclosan', 'parabens', 'glyphosate-(roundup)', 'atrazine', 'arsenic-in-rice', 'lead-in-water', 'fluoride', 'chlorine-in-tap-water', 'mold', 'radon', 'emf', 'flame-retardants', 'formaldehyde', 'vocs', 'dioxins', 'perchlorate', 'mercury-exposure', 'cadmium-in-food', 'aluminum-exposure'],
      },
    ],
  },
  {
    slug: 'your-body',
    title: 'Your Body',
    tagline: 'How your immune system, hormones, and organs actually work.',
    description:
      'How your immune system, hormones, and organs actually work — and what medicine gets right and wrong.',
    subcategories: [
      {
        name: 'Medicine & Your Body',
        slug: 'medicine',
        topicSlugs: ['immune-system', 'antibiotics', 'pharmaceutical-side-effects', 'birth-control', 'natural-anti-inflammatories', 'essential-oils'],
      },
      {
        name: 'Body Systems',
        slug: 'systems',
        topicSlugs: ['thyroid-health', 'hashimotos-thyroiditis', 'hormone-balance', 'adrenal-health', 'cortisol', 'menopause', 'leaky-gut', 'dental-health', 'eye-health', 'seed-cycling', 'histamine-intolerance', 'mast-cell-activation-syndrome', 'insulin-resistance', 'metabolic-syndrome', 'uric-acid', 'blood-pressure', 'telomeres', 'epigenetics', 'circadian-rhythm', 'pcos', 'tinnitus', 'fibromyalgia', 'migraines', 'endometriosis', 'uterine-fibroids', 'chronic-fatigue', 'oxalate-issues', 'ibs', 'ibd', 'autophagy', 'lymphatic-system', 'glymphatic-system', 'autoimmune', 'fascia', 'mitochondrial-health', 'gut-brain-axis', 'heart-rate-variability', 'oral-microbiome', 'plasmalogens', 'kidney-stones', 'homocysteine', 'methylation', 'endocannabinoid-system', 'gallbladder-health', 'eczema', 'rosacea', 'stomach-acid', 'tmao', 'bdnf', 'adhd', 'fatty-liver', 'visceral-fat', 'acid-reflux', 'constipation', 'prostate-health', 'male-fertility', 'female-fertility', 'andropause', 'seasonal-allergies', 'restless-leg-syndrome', 'osteoporosis', 'sarcopenia', 'heat-shock-proteins', 'senolytics', 'peripheral-neuropathy', 'anxiety', 'depression', 'gout', 'arthritis', 'sirtuins', 'nrf2', 'nitric-oxide', 'sleep-apnea', 'glp-1', 'h.-pylori', 'alzheimers', 'asthma', 'macular-degeneration', 'glaucoma', 'cataracts', 'parkinsons-disease', 'lower-back-pain', 'bruxism', 'dry-eye-syndrome', 'raynaud-syndrome', 'plantar-fasciitis', 'insomnia', 'anemia', 'uti', 'seasonal-affective-disorder', 'sinusitis', 'vertigo', 'sciatica', 'erectile-dysfunction', 'dysmenorrhea', 'hemorrhoids', 'tendinopathy', 'carpal-tunnel-syndrome', 'canker-sores', 'cold-sores', 'shingles', 'pelvic-floor', 'varicose-veins', 'long-covid', 'interstitial-cystitis', 'pmdd', 'brown-adipose-tissue', 'perimenopause', 'diverticular-disease', 'lyme-disease', 'hearing-loss', 'multiple-sclerosis', 'lupus', 'atrial-fibrillation', 'lipoprotein-a', 'crohns-disease', 'celiac-disease', 'triglycerides', 'preeclampsia', 'tmj-disorder', 'atherosclerosis', 'common-cold'],
      },
    ],
  },
  {
    slug: 'how-to-live',
    title: 'How to Live',
    tagline: 'Exercise, sleep, fasting, breathwork, and daily practices.',
    description:
      'Exercise, sleep, fasting, breathwork, and daily practices for a healthier life.',
    subcategories: [
      {
        name: 'Exercise & Movement',
        slug: 'exercise',
        topicSlugs: ['resistance-training', 'walking', 'rucking', 'zone-2-cardio', 'hiit', 'vo2-max', 'stretching-mobility', 'rebounding', 'yoga', 'pilates', 'tai-chi', 'qigong'],
      },
      {
        name: 'Therapeutic Practices',
        slug: 'therapies',
        topicSlugs: ['sauna', 'cold-exposure', 'contrast-therapy', 'float-tanks', 'hyperbaric-oxygen', 'prp', 'red-light-therapy', 'grounding', 'dry-brushing', 'oil-pulling', 'acupuncture', 'acupressure', 'cupping-therapy', 'gua-sha', 'massage', 'forest-bathing', 'neurofeedback', 'pemf-therapy', 'biofeedback', 'halotherapy', 'music-therapy', 'binaural-beats', 'nasal-irrigation', 'eft-tapping', 'whole-body-vibration'],
      },
      {
        name: 'Wellness & Lifestyle',
        slug: 'lifestyle',
        topicSlugs: ['sleep', 'mouth-breathing', 'intermittent-fasting', 'fasting-mimicking-diet', 'ketogenic-diet', 'mediterranean-diet', 'mind-diet', 'paleo-diet', 'carnivore-diet', 'blue-zones', 'meditation-breathwork', 'yoga-nidra', 'vagus-nerve', 'sunlight', 'posture', 'digital-detox', 'journaling', 'social-connection', 'hormesis', 'fodmap-diet', 'jet-lag'],
      },
    ],
  },
  {
    slug: 'detox-and-heal',
    title: 'Detox & Heal',
    tagline: "Supporting your body's natural ability to cleanse and restore.",
    description:
      "Supporting your body's natural ability to cleanse, recover, and restore.",
    subcategories: [
      {
        name: 'Cleansing',
        slug: 'cleansing',
        topicSlugs: ['parasite-cleansing', 'liver-cleansing', 'heavy-metal-detox', 'black-walnut-hull'],
      },
      {
        name: 'Binders & Tools',
        slug: 'binders',
        topicSlugs: ['activated-charcoal', 'bentonite-clay', 'diatomaceous-earth', 'zeolite', 'spirulina-chlorella', 'modified-citrus-pectin'],
      },
      {
        name: 'Gut Healing',
        slug: 'gut',
        topicSlugs: ['leaky-gut', 'probiotics', 'fermented-foods', 'bone-broth', 'sibo', 'candida-overgrowth'],
      },
      {
        name: 'Liver & Kidney Support',
        slug: 'liver-kidney',
        topicSlugs: ['milk-thistle', 'dandelion-root', 'tudca'],
      },
    ],
  },
  {
    slug: 'skin-and-self-care',
    title: 'Skin & Self Care',
    tagline: 'Natural alternatives for what you put on your body.',
    description:
      'Natural alternatives for what you put on your body — from skincare to dental health to essential oils.',
    subcategories: [
      {
        name: 'Skin Conditions',
        slug: 'conditions',
        topicSlugs: ['acne', 'rosacea', 'eczema', 'psoriasis', 'hair-loss', 'vitiligo'],
      },
      {
        name: 'Natural Skincare',
        slug: 'skincare',
        topicSlugs: ['castor-oil', 'tallow', 'aloe-vera', 'coconut-oil', 'jojoba-oil', 'tamanu-oil', 'witch-hazel', 'skin-microbiome', 'bakuchiol', 'ghk-cu', 'ceramides', 'shea-butter'],
      },
      {
        name: 'Dental Health',
        slug: 'dental',
        topicSlugs: ['dental-health', 'fluoride', 'oil-pulling'],
      },
      {
        name: 'Medicinal Oils',
        slug: 'oils',
        topicSlugs: ['essential-oils', 'tea-tree-oil'],
      },
      {
        name: 'What to Avoid',
        slug: 'avoid',
        topicSlugs: ['sunscreen', 'personal-care-products'],
      },
    ],
  },
];

export function getCategory(slug: string): ExploreCategory | undefined {
  return exploreCategories.find((c) => c.slug === slug);
}

export function getSubcategory(
  category: ExploreCategory,
  subSlug: string,
): Subcategory | undefined {
  return category.subcategories.find((s) => s.slug === subSlug);
}
