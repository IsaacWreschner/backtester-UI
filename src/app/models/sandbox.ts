import { Timeframes } from "./assets";
import { CustomizedParameterDefinition, Parameters } from "./parameters";


export interface TestSandbox {
   lockedParameters?: any,
   name: string, 
   parameters: Parameters,
   supportedSymbols: Symbol[], 
   supportedTimeframes: Timeframes[],
   customParametersDefinitions: CustomizedParameterDefinition[],
  }

  export type SandboxState = 'NOT_DEFINED' | 'DEFINED' |  'ERROR' | 'RUNNING' | 'STOPPED' | 'COMPLETED' | 'CANCELLED' | 'PAUSED' | 'RESUMED' ;

 