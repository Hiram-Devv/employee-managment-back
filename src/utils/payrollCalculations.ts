export const calculatePayrollValues = (baseSalary: number) => {
  // Salario diario (6 días laborales por semana, incluyendo el día de descanso si se trabajan los 6 días)
  const dailySalary = baseSalary / 6;
  
  // Valor de hora normal (9 horas diarias * 6 días = 54 horas semanales)
  const hourlyRate = baseSalary / 54;
  
  // Valor de hora extra (1.5 veces el valor de la hora normal)
  const overtimeValue = hourlyRate * 1.5;

  return {
    dailySalary: Number(dailySalary.toFixed(2)),
    overtimeValue: Number(overtimeValue.toFixed(2))
  };
};

export const calculateTotal = (
  baseSalary: number,
  daysWorked: number,
  overtimeHours: number,
  overtimeValue: number,
  discount: number = 0,
  healthInsurance: number = 0,
  incentive: number = 0
) => {
  // Calculamos el salario diario
  const dailySalary = baseSalary / 6;
  
  // Si trabajó 6 días, se le paga la semana completa
  // Si trabajó 5 días, solo se le pagan los días trabajados
  const regularPay = daysWorked === 6 ? baseSalary : dailySalary * daysWorked;
  
  // Calculamos el pago por horas extra
  const overtimePay = overtimeHours * overtimeValue;
  
  // Calculamos el total
  const total = regularPay + overtimePay + incentive - discount - healthInsurance;
  
  return Number(total.toFixed(2));
}; 