/**
 * Validate code syntax and structure
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Basic JavaScript/TypeScript validation
 */
const validateJavaScript = (code: string): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for balanced brackets
  const brackets = { '{': 0, '[': 0, '(': 0 };
  for (const char of code) {
    if (char === '{') brackets['{']++;
    if (char === '}') brackets['{']--;
    if (char === '[') brackets['[']++;
    if (char === ']') brackets['[']--;
    if (char === '(') brackets['(']++;
    if (char === ')') brackets['(']--;
  }

  if (brackets['{'] !== 0) errors.push('Accolades non équilibrées');
  if (brackets['['] !== 0) errors.push('Crochets non équilibrés');
  if (brackets['('] !== 0) errors.push('Parenthèses non équilibrées');

  // Check for common syntax errors
  if (code.includes(';;')) warnings.push('Points-virgules doubles détectés');
  if (/var\s+\w+/.test(code)) warnings.push("Utilisation de 'var' détectée, préférez 'let' ou 'const'");

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Basic Python validation
 */
const validatePython = (code: string): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check indentation consistency
  const lines = code.split('\n').filter(line => line.trim());
  const indents = lines
    .map(line => line.match(/^\s*/)?.[0].length || 0)
    .filter(indent => indent > 0);

  if (indents.length > 0) {
    const firstIndent = indents[0];
    const inconsistent = indents.some(indent => indent % firstIndent !== 0);
    if (inconsistent) errors.push('Indentation inconsistante détectée');
  }

  // Check for balanced parentheses
  let parenCount = 0;
  for (const char of code) {
    if (char === '(') parenCount++;
    if (char === ')') parenCount--;
  }
  if (parenCount !== 0) errors.push('Parenthèses non équilibrées');

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Basic HTML validation
 */
const validateHTML = (code: string): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for DOCTYPE
  if (!code.toLowerCase().includes('<!doctype')) {
    warnings.push('DOCTYPE manquant');
  }

  // Check for basic structure
  if (!code.toLowerCase().includes('<html')) {
    errors.push('Balise <html> manquante');
  }
  if (!code.toLowerCase().includes('<head')) {
    warnings.push('Balise <head> manquante');
  }
  if (!code.toLowerCase().includes('<body')) {
    warnings.push('Balise <body> manquante');
  }

  // Check for balanced tags (simplified)
  const openTags = code.match(/<(\w+)[^>]*>/g) || [];
  const closeTags = code.match(/<\/(\w+)>/g) || [];
  
  const selfClosing = ['img', 'br', 'hr', 'input', 'meta', 'link'];
  const openTagNames = openTags
    .map(tag => tag.match(/<(\w+)/)?.[1])
    .filter(tag => tag && !selfClosing.includes(tag.toLowerCase()));
  
  const closeTagNames = closeTags.map(tag => tag.match(/<\/(\w+)>/)?.[1]);

  if (openTagNames.length !== closeTagNames.length) {
    warnings.push('Nombre de balises ouvrantes et fermantes différent');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Basic CSS validation
 */
const validateCSS = (code: string): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for balanced braces
  const openBraces = (code.match(/{/g) || []).length;
  const closeBraces = (code.match(/}/g) || []).length;

  if (openBraces !== closeBraces) {
    errors.push('Accolades non équilibrées');
  }

  // Check for semicolons after properties
  const properties = code.match(/[^{}]+{[^{}]*}/g) || [];
  properties.forEach(block => {
    const declarations = block.split('{')[1]?.split('}')[0];
    if (declarations) {
      const lines = declarations.split(';').filter(l => l.trim());
      if (lines.length > 0 && !declarations.trim().endsWith(';')) {
        warnings.push('Point-virgule manquant à la fin d\'une déclaration');
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Main validation function
 */
export const validateCode = (code: string, language: string): ValidationResult => {
  if (!code || code.trim().length === 0) {
    return {
      isValid: false,
      errors: ['Le code ne peut pas être vide'],
      warnings: [],
    };
  }

  const lang = language.toLowerCase();

  switch (lang) {
    case 'javascript':
    case 'typescript':
      return validateJavaScript(code);
    case 'python':
      return validatePython(code);
    case 'html':
      return validateHTML(code);
    case 'css':
      return validateCSS(code);
    default:
      // Generic validation for other languages
      return {
        isValid: true,
        errors: [],
        warnings: ['Validation non disponible pour ce langage'],
      };
  }
};

/**
 * Check if code meets minimum requirements
 */
export const meetsMinimumRequirements = (code: string, minLength: number = 10): boolean => {
  return code.trim().length >= minLength;
};