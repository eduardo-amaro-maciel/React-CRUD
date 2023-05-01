export default function formatDate(dateString) {
  if (!dateString) {
    return '';
  }

  // Verifica se a data já está no formato correto
  if (dateString.indexOf('/') !== -1) {
    return dateString;
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return '';
  }

  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}
