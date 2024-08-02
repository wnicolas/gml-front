import { DatePipe } from '@angular/common';

// Función para formatear la fecha en formato dd/MM/yyyy
export function formatDate(dateString: string) {
  const datePipe = new DatePipe('en-US'); // Puedes cambiar el locale si lo necesitas
  return datePipe.transform(dateString, 'yyyy-MM-dd');
}
