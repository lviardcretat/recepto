/**
 * Seasonal data record type for ingredient seasonality
 */
export interface ISeasonalDataRecord {
  name: string;
  startMonth: number;
  endMonth: number;
  typeId: number;
  inactive: boolean;
}
