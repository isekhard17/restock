export const generateBarcode = () => {
  // Genera un código EAN-13
  const prefix = '200'; // Prefijo para productos internos
  const middle = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  const code = prefix + middle;
  
  // Calcula el dígito verificador
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(code[i]) * (i % 2 === 0 ? 1 : 3);
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  
  return code + checkDigit;
};