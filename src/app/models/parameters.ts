

export interface Parameters {
    startDatetime: Date;         
    endDatetime: Date;         
    symbol: string;           
    timeframe: string;    
    margin: number;        
    customParameters: {[ key:string ]: any};
  }


  export interface CustomizedParameterDefinition {
    name: string; 
    type: 'string' | 'boolean' | 'number';
    description: string;
    defaultValue: string | boolean | number;
    options?: string[]; // For dropdowns
  }